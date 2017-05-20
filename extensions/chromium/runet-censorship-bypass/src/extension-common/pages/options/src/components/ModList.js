import Inferno from 'inferno';
import getInfoLi from './InfoLi';

export default function getModList(theState) {

  const InfoLi = getInfoLi(theState);

  return function ModList(props) {

    return (
      <ol onChange={props.onChange}>
      {
        props.orderedConfigs.map((conf, index) => (
          <InfoLi conf={conf} type='checkbox' checked={conf.value} key={index} data-category={conf.category} data-index={index} onClick={props.onClick}>
            {props.childrenOfMod && props.childrenOfMod[conf.key]}
          </InfoLi>)
        )
      }
      </ol>
    );

  };

};
