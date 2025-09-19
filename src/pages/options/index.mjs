console.log('Options page is opening...');

customElements.define('pac-record',
  class extends HTMLElement {
    static formAssociated = true;
    // static observedAttributes = ['data-checked'];
    constructor() {
      super();
      this.internals = this.attachInternals();
      const shadow = this.attachShadow({ mode: 'open' });
      // const shadow = this.internals.shadowRoot;
      console.log('Constructor');
      const fragment = pacRecordTemplate.content.cloneNode(true);
      shadow.appendChild(fragment);
      //const templateAttrs = shadow.querySelectorAll('#attributes > slot[name]');
      const dataAttrs = shadow.querySelectorAll('*[data-attrs]');
      dataAttrs.forEach(
        (da) => {
          da.dataset.attrs.split(' ').forEach(
            (attr) => {
                console.log(shadow.querySelector(`#attributes > slot[name=${attr}]`));
                da.setAttribute(
                  attr,
                  shadow.querySelector(`#attributes > slot[name=${attr}]`).assignedNodes()?.[0].textContent,
                );
            },
          );
        }
      );
      const namedInputs = shadow.querySelectorAll('input[name]');
      namedInputs.forEach((ni) => {
        //this.internals.setFormValue(ni.name);
        ni.addEventListener('click',
          (event) => {
            const t = event.target;
            const entries = new FormData();
            //entries.set(ni.getAttribute('name'), ni.getAttribute('value'));
            entries.set('pacScript', 'antizapret');
            this.internals.setFormValue(t.checked ? t.value : null);
            ni.toggleAttribute('checked');
            //this.internals.setFormValue(ni.value);
            //this.toggleAttribute('checked');
            //this.toggleAttribute('data-checked');
            //ni.toggleAttribute('checked');
            console.log('EVENT TARGET:', event.target);
            console.log('THIS', this);
            console.log(this.internals);
            console.log('EEEE', entries);
            console.log(`FFFF:${ni.name}=${ni.value}`);
            return true;
          })
      });

      /*
      const input = fragment.querySelector('div > input');
      const label = fragment.querySelector('div > label');
      /*const node = pacRecordTemplate.content.cloneNode(true);
      const input = node.querySelector('div > input');
      const label = node.querySelector('div > label');
      input.id = input.value = label.htmlFor = this.dataset.id;*/

    }
    /*
    attributeChangedCallback(name, oldValue, newValue) {
      console.log('attributeChangedCallback:', oldValue, '->', newValue);
      const entries = new FormData();
      entries.set('pacScript', 'antizapret');
      this.internals.setFormValue(entries);
    }*/
  }
);
/*
customPacUrl.addEventListener('change', function (event) {
  console.log('ON CHANGE:', event);
  pacChooserForm.reportValidity();
});
/*
pacChooserForm.addEventListener('formdata', (event) => {
  event.preventDefault();
  console.log('ON FORMDATA', event);
  return false; // Prevent default action.
});
*//*

let LAST_LOCKED_URL = '';
const lockUrl = () => {
  const ifUrlValid = customPacUrl.checkValidity();
  if (ifUrlValid) {
    LAST_LOCKED_URL = customPacUrl.value;
    customPacUrl.disabled = true;
    ownRadio.disabled = false;
    // TODO: Save to storage.
  } else {
    //pacChooserForm.reportValidity();
    ownRadio.disabled = true; // `ownRadio.checked` doesn't matter here.
  }
};
const unlockUrl = () => {
  customPacUrl.disabled = false;
  customPacUrl.focus();
  ownRadio.disabled = true;
};  

const suppressDefaultHandler = (f) =>
  (event) => {
    event.preventDefault();
    f(event);
    return false;
  };

savePacUrlButton.onclick = suppressDefaultHandler(lockUrl);

cancelPacUrlButton.onclick = suppressDefaultHandler(
  () => {
    customPacUrl.value = LAST_LOCKED_URL;
    lockUrl();
  },
);

editPacUrlButton.onclick = suppressDefaultHandler(unlockUrl);
*//*
import { storage } from '../../lib/common-apis.mjs';

donate.href = await storage.getAsync('donateUrl');
const options = await storage.getAsync('options');

options.forEach(([key, value], i) => {
  const li = document.createElement('li');
  li.innerHTML = `<input type="checkbox"
    id="${key}"> <label for="${key}" data-localize="__MSG_${key}__">${key}</label>`;
  const input = li.querySelector('input');
  input.checked = value;
  listOfOptions.appendChild(li);
  input.onclick = async ({ target }) => {
    options[i] = [ key, target.checked ];
    await storage.setAsync({ options });
    chrome.contextMenus.update(key, { checked: target.checked });
  };
});
*/
/*
await chrome.storage.local.get('options');

const textElements = document.querySelectorAll('[data-localize]');
textElements.forEach((e) => {
  const ref = e.dataset.localize;
  if (ref) {
     const translated= ref.replace(/__MSG_(\w+)__/g, (match, theGroup) => chrome.i18n.getMessage(theGroup));
    if (translated) {
      e.innerText = translated;
    }
  }
});*/