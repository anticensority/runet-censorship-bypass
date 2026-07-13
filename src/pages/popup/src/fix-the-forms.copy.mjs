console.log('Fixing forms...');
window.customElements.define('pac-radio', class extends HTMLElement {
  static formAssociated = true;

  constructor() {
    super();
    console.log('pac-radio\'s constructor.');
    this.internals_ = this.attachInternals();
  }

  connectedCallback() {
    console.log('pac-radio connected.');
    this.theInputEl = this.shadowRoot.getElementById(this.dataset.inputId);
    console.log('this:', this);
    console.log('theInputEl:', this.theInputEl);
    this.setAttribute('name', this.name);
    this.setAttribute('value', this.value);
    this.theInputEl.addEventListener('change', (event) => {
      console.log('TheInputEl change event handler...');
      console.log('THISSS:', this);
      //const input = event.target;
      console.log('EV TARGET:', event.target);
      //this.name = this.theInputEl.name;
      console.log('SET FORM VALUE TO:', this.value);
      //const formData = new FormData(this.form);
      //const formData = new FormData();
      //formData.delete(this.name);
      //formData.set(this.name, this.value);
      //console.log('FDATA2:', ...formData.entries());
      this.internals_.setFormValue(null); // Doesn't work. Probably a bug.
      this.internals_.setFormValue(this.value);
      //console.log('FDATA3:', ...formData.entries());

      const newChangeEvent = new event.constructor(event.type, event);
      this.dispatchEvent(newChangeEvent);
    });
  }

  // The following properties and methods aren't strictly required,
  // but browser-level form controls provide them. Providing them helps
  // ensure consistency with browser-provided controls.
  get form() { return this.internals_.form; }
  get name() { return this.theInputEl.name; }
  get type() { return this.localName; }
  get value() { return this.theInputEl.value; }
  set value(newValue) {
    // TODO: explore what may happen if the value comes from an attacker.
    this.theInputEl.value = newValue;
    this.setAttribute('value', newValue);
  }
  get checked() { return this.theInputEl.checked; }
  set checked(newValue) { this.theInputEl.checked = newValue; }

  get validity() { return this.internals_.validity; }
  get validationMessage() { return this.internals_.validationMessage; }
  get willValidate() { return this.internals_.willValidate; }

  checkValidity() { return this.internals_.checkValidity(); }
  reportValidity() { return this.internals_.reportValidity(); }
});

const pacForm = pacChooserForm;
pacForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.target;
  console.log('Submit event target:', form);
  const formData = new FormData(form);
  const chosenPacRadio = [...form.elements['pacScriptRadio']].filter((pr) => pr.checked)[0];
  console.log('CHOSEN:', chosenPacRadio);
  /*
  const entries = [...formData.entries()]
    .filter(([name, value]) => form.elements[name]);
  //formData.delete()
  const data = Object.fromEntries(entries);
  console.log('Submit event with data:', data);
  */
});

pacForm.addEventListener(
  'formdata',
  (event) => {
    console.log('Form data event:');
    console.log(...event.formData.entries());
  },
);

const pacRadios = [...pacForm.elements]
  .filter((el) => el.name == 'pacScriptRadio');
console.log('pacRadios:', pacRadios);
pacRadios.forEach((self) =>
  self.addEventListener(
    'change',
    (event) => {
      console.log('REQUESTING SUBMIT... Event target checked:', event.target.checked);
      pacRadios.forEach((pr) => { pr.checked = false; });
      self.checked = true;
      pacForm.requestSubmit();
    },
  ),
);

console.log('All forms fixed.');
