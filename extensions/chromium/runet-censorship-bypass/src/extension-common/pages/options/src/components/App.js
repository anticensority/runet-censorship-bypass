import Inferno from 'inferno';
import Component from 'inferno-component';
import createElement from 'inferno-create-element';

import getNotControlledWarning from './NotControlledWarning';
import getTabPanel from './TabPanel';
import getPacChooser from './PacChooser';
import getFooter from './Footer';

export default function getApp(theState) {

  const NotControlledWarning = getNotControlledWarning(theState);
  const TabPanel = getTabPanel(theState);
  const PacChooser = getPacChooser(theState);
  const Footer = getFooter(theState);

  return class App extends Component {

    constructor(props) {

      super(props);
      this.state = {
        status: 'Загрузка...',
        areInputsDisabled: false,
      };

    }

    componentDidMount() {

      this.showErrors({ message: 'PANIC!' });

    }

    setStatusTo(msg) {

      this.setState(
        {
          status: msg,
        }
      );

    }

    showErrors(err, ...warns) {

      const warningHtml = warns
        .map(
          (w) => w && w.messageHtml || ''
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
          {err && <a href="" onClick={(evt) => {

            this.props.apis.errorHandlers.viewError('pup-ext-err', err);
            evt.preventDefault();

          }}> [Техн.детали]</a>}
        </span>)
      );

    }

    switchInputs(val) {

      this.setState({
        areInputsDisabled: val === 'off' ? true : false,
      });
      /*
      const inputs = document.querySelectorAll('input');
      for ( let i = 0; i < inputs.length; i++ ) {
        const input = inputs[i];
        if (val === 'off') {
          input.dataset.previousDisabledValue = input.disabled;
          input.disabled = true;
        } else {
          input.disabled = input.dataset.previousDisabledValue === 'true';
        }
      }
      */

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
          showErrors(err, ...warns);
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

    render(props) {

      props = Object.assign({}, props, {
        funs: {
          setStatusTo: this.setStatusTo,
          conduct: this.conduct,
        },
      });

      return createElement('div', null, [
        createElement(NotControlledWarning, props),
        createElement(TabPanel, {
          tabs:[
            {
              label: 'PAC-скрипт',
              content: createElement(PacChooser, props),
            },
            {
              label: 'Исключения',
              content: "Exceptions().render(this.props)",
            },
            {
              label: 'Свои прокси',
              content: "OwnProxies().render(this.props)",
            },
            {
              label: 'Модификаторы',
              content: "Modificators().render(this.props)",
            },
            {
              label: 'Уведомления',
              content: "Notifications().render(this.props)",
            }
          ]
        }),
        createElement(Footer, Object.assign({ status: this.state.status }, props)),
      ]);

    }

  }

};;
