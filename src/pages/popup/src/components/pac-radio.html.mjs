const objToAttrs = (obj) =>
  Object.entries(obj).map(
    ([k, v]) => v === '' ? k : `${k}="${v}"`,
  ).join(' ');

export default ({ id, label, ...attrs }) => `
<pac-radio data-input-id="${id}">
  <template shadowrootmode="open">
    <style>
      label:has(input:checked) ~ .show-if-checked {
        display: unset;
      }
    </style>
    <label>
      <input type="radio" id="${id}" ${objToAttrs(attrs)}/>
      <span>${label}</span>
    </label>
    <span class="show-if-checked" hidden>
      <a href title="Обновить">[обновить]</a>
      <a href title="Приостановить">[⏸]</a>
    </span>
    <a href title="Информация о PAC-скрипте" style="float: right">[ℹ]</a>
  </template>
</pac-radio>
`.trim();
// <!--pac-radio name="pacScript" form="pacChooserForm" value="${value}"-->