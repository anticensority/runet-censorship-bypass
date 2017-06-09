import Inferno from 'inferno';
import Component from 'inferno-component';

export default function getLastUpdateDate(theState) {

  return class LastUpdateDate extends Component {

    componentWillMount() {

      this.onStorageChangedHandler = (changes) =>
        changes.lastPacUpdateStamp.newValue && this.forceUpdate();

      chrome.storage.onChanged.addListener( this.onStorageChangedHandler );

    }

    componentWillUnmount() {

      chrome.storage.onChanged.removeListener( this.onStorageChangedHandler );

    }

    getDate(antiCensorRu) {

      let dateForUser = 'никогда';
      if( antiCensorRu.lastPacUpdateStamp ) {
        let diff = Date.now() - antiCensorRu.lastPacUpdateStamp;
        let units = 'мс';
        const gauges = [
          [1000, 'с'],
          [60, 'мин'],
          [60, 'ч'],
          [24, 'дн'],
          [7, ' недель'],
          [4, ' месяцев'],
        ];
        for(const g of gauges) {
          const diffy = Math.floor(diff / g[0]);
          if (!diffy)
            break;
          diff = diffy;
          units = g[1];
        }
        dateForUser = diff + units + ' назад';
      }
      return {
        text: `${dateForUser} / ${antiCensorRu.pacUpdatePeriodInMinutes/60}ч`,
        title: new Date(antiCensorRu.lastPacUpdateStamp).toLocaleString('ru-RU'),
      };

    }

    render(props) {

      const date = this.getDate(props.apis.antiCensorRu);
      return (<div>Обновлялись: <span class="updateDate" title={date.title}>{ date.text }</span></div>);

    }

  };

};
