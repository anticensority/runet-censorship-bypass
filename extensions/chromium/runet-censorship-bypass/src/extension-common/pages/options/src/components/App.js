import Inferno from 'inferno';
import Component from 'inferno-component';
import createElement from 'inferno-create-element';

import getNotControlledWarning from './NotControlledWarning';
import getTabPannel from './TabPannel';
import getPacChooser from './PacChooser';

import getFooter from './Footer';

export default function getApp(theState) {

  return class App extends Component {

    render(props) {

      return createElement('div', {
        onClick: () => console.log('DDDDDCLICK'),
        onDick: () => console.log('DICK!'),
        ondick: () => console.log('dddDICK!'),
      }, [
        createElement(getNotControlledWarning(theState), props),
        createElement(getTabPannel(theState), {
          tabs:[
            {
              label: 'PAC-скрипт',
              content: createElement(getPacChooser(theState), props),
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
        createElement(getFooter(theState), props),
      ]);

    }

  }

};;
