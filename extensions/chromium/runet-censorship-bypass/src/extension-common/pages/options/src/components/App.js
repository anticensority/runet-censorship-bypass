import Inferno from 'inferno';
import Component from 'inferno-component';
import createElement from 'inferno-create-element';

import getNotControlledWarning from './NotControlledWarning';
import getMain from './Main';
import getFooter from './Footer';

export default function getApp(theState) {

  const NotControlledWarning = getNotControlledWarning(theState);
  const Main = getMain(theState);
  const Footer = getFooter(theState);

  return class App extends Component {

    constructor(props) {

      super(props);
      const hash = window.location.hash.substr(1);
      const hashParams = new URLSearchParams(hash);
      this.state = {
        status: 'Загрузка...',
        ifInputsDisabled: false,
        hashParams: hashParams,
      };

    }

    setStatusTo(msg, cb) {

      this.setState(
        {
          status: msg,
        },
        cb
      );

    }

    async componentDidMount() {

      const uiComDate = 'ui-last-comment-date';
      const uiComEtag = 'ui-last-comments-etag';
      const uiLastNews = 'ui-last-news';

      const statusFromHash = this.state.hashParams.get('status');
      if (statusFromHash) {
        return this.setStatusTo(statusFromHash);
      }

      const comDate = localStorage[uiComDate];
      const query = comDate ? `?since=${comDate}` : '';
      const oldEtag = localStorage[uiComEtag];
      const headers = {
        'User-Agent': 'anticensorship-russia',
      };
      if (oldEtag) {

        Object.assign(headers, {
          'If-None-Match': oldEtag,
        });

      };
      const params = {
        headers: new Headers(headers),
      };

      console.log('headers', headers);
      const [comments, etag] = await fetch(
        `https://api.github.com/repos/edge-ware/edge-ware.github.io/issues/1/comments${query}`,
        params
      ).then(
        (res) => Promise.all([
          res.status !== 304 ? res.json() : false,
          res.headers.get('ETag')
        ]),
        (err) => this.showError({message: 'Что-то не так с сетью. Не удалось достать новости.'})
      );
      if (etag) {
        console.log('new ETag', etag);
        localStorage[uiComEtag] = etag;
      }
      if (!(comments && comments.length)) {
        const news = localStorage[uiLastNews];
        if (news) {
          this.setStatusTo(news);
        } else {
          this.setStatusTo('У нас ничего нового.');
        }
        return;
      }

      const lastComment = comments.pop();
      if (lastComment) {
        const lastDate = lastComment.updated_at || lastComment.created_at;
        localStorage[uiComDate] = lastDate;
        const newsText = lastComment.body.split(/\r?\n/)[0].replace(/^\s*#+\s*/g, '');
        localStorage[uiLastNews] = newsText;
        this.setStatusTo(newsText);
      }

    }

    showErrors(err, ...args/* ...warns, cb */) {

      const lastArg = args[args.length - 1];
      const cb = (lastArg && typeof lastArg === 'function')
        ? args.pop()
        : () => {};
      const warns = args;

      const warningHtml = warns
        .map(
          (w) => w && w.message || ''
        )
        .filter( (m) => m )
        .map( (m) => '✘ ' + m )
        .join('<br/>');

      let messageHtml = '';
      if (err) {
        let wrapped = err.wrapped;
        messageHtml = err.message || '';

        while( wrapped ) {
          const deeperMsg = wrapped && wrapped.message;
          if (deeperMsg) {
            messageHtml = messageHtml + ' &gt; ' + deeperMsg;
          }
          wrapped = wrapped.wrapped;
        }
      }
      messageHtml = messageHtml.trim();
      if (warningHtml) {
        messageHtml = messageHtml ? messageHtml + '<br/>' + warningHtml : warningHtml;
      }
      this.setStatusTo(
        (<span>
          <span style="color:red">
            {err ? <span><span class="emoji">🔥</span> Ошибка!</span> : 'Некритичная oшибка.'}
          </span>
          <br/>
          <span style="font-size: 0.9em; color: darkred" dangerouslySetInnerHTML={{__html: messageHtml}}></span>
          {' '}
          {err && <a href="" onClick={(evt) => {

            this.props.apis.errorHandlers.viewError('pup-ext-err', err);
            evt.preventDefault();

          }}>[Техн.детали]</a>}
        </span>),
        cb
      );

    }

    switchInputs(val) {

      this.setState({
        ifInputsDisabled: val === 'off' ? true : false,
      });

    }

    conduct(
      beforeStatus, operation, afterStatus,
      onSuccess = () => {}, onError = () => {}
    ) {

      this.setStatusTo(beforeStatus);
      this.switchInputs('off');
      operation((err, res, ...warns) => {

        warns = warns.filter( (w) => w );
        if (err || warns.length) {
          this.showErrors(err, ...warns);
        } else {
          this.setStatusTo(afterStatus);
        }
        this.switchInputs('on');
        if (!err) {
          onSuccess(res);
        } else {
          onError(err);
        }

      });

    }

    render(originalProps) {

      const props = Object.assign({}, originalProps, {
        funs: {
          setStatusTo: this.setStatusTo.bind(this),
          conduct: this.conduct.bind(this),
          showErrors: this.showErrors.bind(this),
        },
        ifInputsDisabled: this.state.ifInputsDisabled,
        hashParams: this.state.hashParams,
      });

      return createElement('div', null, [
        ...( props.flags.ifNotControlled ? [createElement(NotControlledWarning, props)] : [] ),
        createElement(Main, props),
        createElement(Footer, Object.assign({ status: this.state.status }, props)),
      ]);

    }

  }

};
