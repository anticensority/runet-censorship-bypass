const objToAttrs = (obj) =>
  Object.entries(obj).map(
    ([k, v]) => v === '' ? k : `${k}="${v}"`,
  ).join(' ');

export default ({ id, label, value, customStyles='', slots='', attrs={} }) => `
<custom-radio data-input-id="${id}">
  <template shadowrootmode="open">
    <style>
      input {
        vertical-align: top;
      }
      label:has(input:checked) ~ .show-if-checked {
        display: unset;
      }
      ${customStyles}
    </style>
    <label>
      <input type="radio" id="${id}" value="${value}" ${objToAttrs(attrs)}/>
      <span>${label}</span>
    </label>
    <slot name="after-label"></slot>
  </template>
  ${slots}
</custom-radio>
`.trim();