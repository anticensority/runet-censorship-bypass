console.log('The TOP script of the options page started.');

/*
<pac-record value="antizapret">
  <span slot="label">Антизапрет</span>
</pac-record>
*/

customElements.define('pac-record',
  class extends HTMLElement {

    static formAssociated = true;
    // static observedAttributes = ['data-checked'];

    constructor() {
      super();
      this.internals = this.attachInternals();
      const shadow = this.internals.shadowRoot;
      console.log('Constructor for PacRecord');
    }
  }
);

/*
<pac-record slot="pacRecords">
  <template shadowrootmode="open">
    <span class="template-inputs" hidden>
      <slot name="id">ID</slot>
      <slot name="value">VALUE</slot>
      <slot name="for">FOR</slot>
    </span>
    <div class="template-body">
      <slot name="inputElement">INPUT_ELEMENT</slot>
      <label for="for">
        <slot name="label">LABEL</slot>
      </label>
      <a href title="Обновить">[обновить]</a>
      <a href title="Приостановить">[⏸]</a>
      <a href title="Информация о PAC-скрипте" style="float: right">[ℹ]</a>
    </div>
  </template>
  <light-dom>

  </light-dom>
</pac-record>


<my-input slot="inputElement">
    <template shadowrootmode="open">
    <span class="template-inputs" hidden>
        <slot name="id">ID</slot>
        <slot name="value">VALUE</slot>
    </span>
    <slot name="input"></slot>
    </template>
    <input slot="input" type="radio" name="pacScript" form="pacChooserForm" id="id1" value="value1" />
    <span slot="id">antizapret</span>
    <span slot="value">antizapret</span>
</my-input>
<span slot="label">Антизапрет</span>
</pac-record>

class extends HTMLElement {
    static formAssociated = true;
    // static observedAttributes = ['data-checked'];
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: 'open' });
      // const shadow = this.internals.shadowRoot;
      console.log('Constructor');
      const fragment = pacRecordTemplate.content.cloneNode(true);
      shadow.appendChild(fragment);
      this.internals = this.attachInternals();

      const dataAttrs = shadow.querySelectorAll('*[data-attrs]');
      dataAttrs.forEach(
        (da) => {
          da.dataset.attrs.split(' ').forEach(
            (attr) => {
                console.log(shadow.querySelector(`#VARIABLES > slot[name=${attr}]`));
                da.setAttribute(
                  attr,
                  shadow.querySelector(`#VARIABLES > slot[name=${attr}]`).assignedNodes()?.[0]?.textContent,
                );
            },
          );
        }
      );
      //this.internals.setFormValue('');
      //this.internals.setFormValue('pacScript');
      //const templateAttrs = shadow.querySelectorAll('#attributes > slot[name]');
      const namedInputs = shadow.querySelectorAll('input[name]');
      console.log('NAMED INPUTS:', namedInputs);
      namedInputs.forEach((ni) => {
        //this.internals.setFormValue(ni.name);
        ni.addEventListener('input',
          (event) => {
            const t = event.target;
            const entries = new FormData();
            //entries.set(ni.getAttribute('name'), ni.getAttribute('value'));
            entries.append('pacScript', t.value);
            this.internals.setFormValue(entries);
            //this.value = t.value;
            //this.internals.setFormValue(t.value);
            //ni.toggleAttribute('checked');
            //this.internals.setFormValue(ni.value);
            //this.toggleAttribute('checked');
            //this.toggleAttribute('data-checked');
            //ni.toggleAttribute('checked');
            console.log('EVENT TARGET:', event.target);
            console.log('THIS', this);
            console.log(this.internals);
            console.log('EEEE', Array.from(...entries));
            console.log(`FFFF:${ni.name}=${ni.value}`);
            ni.click();
          })
      });

      /
      const input = fragment.querySelector('div > input');
      const label = fragment.querySelector('div > label');
      /*const node = pacRecordTemplate.content.cloneNode(true);
      const input = node.querySelector('div > input');
      const label = node.querySelector('div > label');
      input.id = input.value = label.htmlFor = this.dataset.id;
      /

    }
    attributeChangedCallback(name, oldValue, newValue) {
      console.log('attributeChangedCallback:', oldValue, '->', newValue);
      const entries = new FormData();
      entries.set('pacScript', 'antizapret');
      this.internals.setFormValue(entries);
    }
  }
);
/*


```
          <my-li>
          <template shadowrootmode="open">
            <slot name="pacRecords">PAC_RECORDS</slot>
          </template>
          <pac-record slot="pacRecords">
            <template shadowrootmode="open">
              <span class="template-inputs" hidden>
                <slot name="id">ID</slot>
                <slot name="value">VALUE</slot>
                <slot name="for">FOR</slot>
              </span>
              <div class="template-body">
                <slot name="inputElement">INPUT_ELEMENT</slot>
                <label for="for">
                  <slot name="label">LABEL</slot>
                </label>
                <a href title="Обновить">[обновить]</a>
                <a href title="Приостановить">[⏸]</a>
                <a href title="Информация о PAC-скрипте" style="float: right">[ℹ]</a>
              </div>
            </template>
            <my-input slot="inputElement">
              <template shadowrootmode="open">
                <span class="template-inputs" hidden>
                  <slot name="id">ID</slot>
                  <slot name="value">VALUE</slot>
                </span>
                <slot name="input"></slot>
              </template>
              <input slot="input" type="radio" name="pacScript" form="pacChooserForm" id="id1" value="value1" />
              <span slot="id">antizapret</span>
              <span slot="value">antizapret</span>
            </my-input>
            <span slot="label">Антизапрет</span>
          </pac-record>
          <pac-record slot="pacRecords">
            <template shadowrootmode="open">
              <span class="template-inputs" hidden>
                <slot name="id">ID</slot>
                <slot name="value">VALUE</slot>
                <slot name="for">FOR</slot>
              </span>
              <div class="template-body">
                <slot name="inputElement">INPUT_ELEMENT</slot>
                <label for="for">
                  <slot name="label">LABEL</slot>
                </label>
                <a href title="Обновить">[обновить]</a>
                <a href title="Приостановить">[⏸]</a>
                <a href title="Информация о PAC-скрипте" style="float: right">[ℹ]</a>
              </div>
            </template>
            <my-input slot="inputElement">
              <template shadowrootmode="open">
                <span id="templateInputs" hidden>
                  <slot name="id">ID</slot>
                  <slot name="value">VALUE</slot>
                </span>
                <slot name="input"></slot>
              </template>
              <input slot="input" type="radio" name="pacScript" form="pacChooserForm" id="id2" value="value2" />
              <span slot="id">anticensority</span>
              <span slot="value">anticensority</span>
            </my-input>
            <span slot="label">Антицензорити</span>
          </pac-record>
            <!--script src="./repeat.mjs?times=2" type="module"></script-->
            <!--Light DOM>
            <div>
              <span slot="label">Антизапрет</span>
              <span slot="id">antizapret</span>
              <span slot="value">antizapret</span>
              <span slot="for">antizapret</span>
              <input slot="input" type="radio" name="pacScript" form="pacChooserForm" data-attrs="id value" />
            </div>
            <div>
              <span slot="label">Антицензорити</span>
              <span slot="id">anticensority</span>
              <span slot="value">anticensority</span>
              <span slot="for">anticensority</span>
              <input slot="input" type="radio" name="pacScript" form="pacChooserForm" data-attrs="id value" />
            </div>
            <!--
            <div>
              <my-input slot="input" name="first" />
              <my-input slot="input" name="second" />
            </div>
            <!--/Light DOM>
          </pac-record>
          </template>
          <!--li>
            <pac-record>
              <span slot="label">Антизапрет</span>
              <span slot="id">antizapret</span>
              <span slot="value">antizapret</span>
              <span slot="for">antizapret</span>
              <input slot="input" attrs-line='type="radio" name="pacScript" form="pacChooserForm"' data-attrs="id value">
            </pac-record>
          </li>
          <li>
            <pac-record>
              <span slot="label">Антицензорити</span>
              <span slot="id">anticensority</span>
              <span slot="value">anticensority</span>
              <span slot="for">anticensority</span>
            </pac-record>
          </li-->
          </my-li>
```