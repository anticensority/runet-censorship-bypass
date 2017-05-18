import Inferno from 'inferno';
import css from 'csjs-inject';

export default function getPacChooser(theState) {

  const scopedCss = css`

    .listOfNotifiers {
      margin-left: 0.4em;
    }

  `;

  return function Notifications(props) {

    return (
      <section>
        <header>Я <span style="color: #f93a17">❤</span> yведомления:</header>
        <ul class={scopedCss.listOfNotifiers}>
        {
          Array.from(props.apis.errorHandlers.getEventsMap()).map(([ntfId, ntfName]) => {

            const iddy = `if-on-${ntfId}`;
            const ifChecked = props.apis.errorHandlers.isOn(ntfId);
            return (
              <li>
                <input
                  type="checkbox"
                  id={iddy}
                  checked={ifChecked}
                  disabled={props.ifInputsDisabled}
                  onClick={() => {

                    props.apis.errorHandlers.switch(
                      ifChecked ? 'off' : 'on', // Reverse.
                      ntfId
                    );

                  }}
                />
                {' '}
                <label for={iddy}>{ntfName}</label>
              </li>
            );

          })
        }
        </ul>
      </section>
    );

  };

};
