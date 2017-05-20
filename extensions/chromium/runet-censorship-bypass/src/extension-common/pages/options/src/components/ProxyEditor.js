import Inferno from 'inferno';
import css from 'csjs-inject';

export default function getProxyEditor(theState) {

  const scopedCss = css`

    .texty {
      width: 100%;
      max-width: 38.5em; /* ~418px, layout breaks if more */
      height: 7em;
      margin-top: 0.3em;
      font-size: 0.9em;
    }

  `;

  const uiRaw = 'ui-proxy-string-raw';

  return function ProxyEditor(props) {

    return (<textarea class={scopedCss.texty}
      spellcheck={false}
      placeholder={
`SOCKS5 localhost:9050; # Tor Expert
SOCKS5 localhost:9150; # Tor Browser
HTTPS 11.22.33.44:3143;
PROXY foobar.com:8080; # Not HTTP!`.trim()}
      value={props.value || localStorage.getItem(uiRaw) || ''}
    />);

  };

};
