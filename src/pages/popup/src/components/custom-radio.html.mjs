const objToAttrs = (obj) =>
  Object.entries(obj).map(
    ([k, v]) => v === '' ? k : `${k}="${v}"`,
  ).join(' ');

export default ({ id, label, value, customStyles='', afterLabel='', attrs={} }) => `
<custom-radio data-input-id="${id}">
  <template shadowrootmode="open">
    <style>
      input {
        vertical-align: top;
      }
      :host([checked]) .show-if-checked {
        display: unset;
      }
      .after-label a,
      .after-label a:visited {
        --ribbon-color: #0075ff;
        color: var(--ribbon-color);
      }
      ${customStyles}
    </style>
    <label>
      <input type="radio" id="${id}" value="${value}" ${objToAttrs(attrs)}/>
      <span>${label}</span>
    </label>
    ${afterLabel}
  </template>
</custom-radio>
`.trim();