export default ({ id, value, label }) => `
<pac-record name="pacScript" form="pacChooserForm" value="${value}">
  <template shadowrootmode="open">
    <style>
      input:checked ~ .show-if-checked {
        color: red !important;
        display: unset;
      }
    </style>
    <input type="radio" id="${id}"/>
    <label for="${id}">${label}</label>
    <span class="show-if-checked" hidden>
      <a href title="Обновить">[обновить]</a>
      <a href title="Приостановить">[⏸]</a>
    </span>
    <a href title="Информация о PAC-скрипте" style="float: right">[ℹ]</a>
  </template>
</pac-record>
`.trim();