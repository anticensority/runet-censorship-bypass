import Inferno from 'inferno';
import getInfoLi from './InfoLi';

export default function getModList(theState) {

  const InfoLi = getInfoLi(theState);

  return function ModList(props) {

    return (
      <ol onChange={props.onChange}>
      {
        props.orderedConfigs.map((conf, index) => (
          <InfoLi
            conf={conf}
            type='checkbox'
            checked={conf.value}
            key={index}
            onClick={() => props.onClick({targetConf: conf, targetIndex: index, targetChildren: props.childrenOfMod})}
          >
            {props.childrenOfMod && props.childrenOfMod[conf.key]}
          </InfoLi>)
        )
      }
      </ol>
    );

  };

};
