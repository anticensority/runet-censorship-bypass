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

      this.setStatusTo = this.setStatusTo.bind(this);
      this.conduct = this.conduct.bind(this);
      this.showErrors = this.showErrors.bind(this);
      this.showNews = this.showNews.bind(this);

    }

    setStatusTo(msg, cb) {

      this.setState(
        {
          status: msg,
        },
        cb
      );

    }

    setNewsStatusTo(newsArr) {

      this.setStatusTo(
        <ol style="list-style-type: initial;">
          {newsArr.map(([title, url]) => (<li><a href={url}>{title}</a></li>))}
        </ol>
      );

    }

    async showNews() {

      const uiComDate = 'ui-last-comment-date';
      const uiComEtag = 'ui-last-comments-etag';
      const uiLastNewsArr = 'ui-last-news-arr';

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

      //const ghUrl = `https://api.github.com/repos/anticensorship-russia/for-testing-github-api/issues/1/comments${query}`;
      const ghUrl = `http://httpstat.us/418`;
      const [comments, etag] = await fetch(
        ghUrl,
        params
      ).then(
        (res) => !( res.status >= 200 && res.status < 300 || res.status === 304 )
                    ? Promise.reject(new Error(`Получен ответ с неудачным кодом ${res.status}.`))
                    : res
      ).then(
        (res) => Promise.all([
          res.status !== 304 ? res.json() : false,
          res.headers.get('ETag')
        ]),
        (err) => {

          this.showErrors({message: 'Не удалось достать новости: что-то не так с сетью.', wrapped: err});
          return [false, false];

        }
      );
      if (etag) {
        localStorage[uiComEtag] = etag;
      }


      const ifNews = (() => {

        if (!(comments && comments.length)) {
          const json = localStorage[uiLastNewsArr];
          const news = json && JSON.parse(json);
          if (news) {
            this.setNewsStatusTo(news);
            return true;
          }
          return false;
        }

        let minDate;
        const news = [];
        comments.forEach((comment) => {

          const curDate = comment.updated_at || comment.created_at;
          const newsTitle = this.getNewsHeadline( comment.body );
          if (newsTitle) {
            if (!minDate || curDate <= minDate) {
              minDate = curDate;
            }
            news.push([newsTitle, comment.html_url]);
          }

        });
        if (!news.length) {
          return false;
        }
        localStorage[uiComDate] = minDate;
        localStorage[uiLastNewsArr] = JSON.stringify(news);
        this.setNewsStatusTo(news);
        return true;

      })();
      if (!ifNews) {
        this.setStatusTo('Ничего нового.');
      }

    }

    componentDidMount() {

      if (!this.props.apis.antiCensorRu.ifFirstInstall) {
        this.showNews();
      }

    }

    getNewsHeadline(comBody) {

        const headline = comBody.split(/\r?\n/)[0];
        const ifOver = /#+\s*$/.test(headline);
        if (ifOver) {
          return false;
        }
        return headline.replace(/^\s*#+\s*/g, '');

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
          setStatusTo: this.setStatusTo,
          conduct: this.conduct,
          showErrors: this.showErrors,
          showNews: this.showNews,
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
