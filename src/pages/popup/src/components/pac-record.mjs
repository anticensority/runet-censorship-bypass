export default ({ id, value, label }) => `
<pac-record>
  <template shadowrootmode="open">
    <slot name="nativeInput"></slot>
    <slot name="label"></slot>
    <a href title="Обновить">[обновить]</a>
    <a href title="Приостановить">[⏸]</a>
    <a href title="Информация о PAC-скрипте" style="float: right">[ℹ]</a>
  </template>
  <input slot="nativeInput" type="radio" name="pacScript" form="pacChooserForm" id="${id}" value="${value}"/>
  <label slot="label" for="${id}">${label}</label>
</pac-record>
`.trim();