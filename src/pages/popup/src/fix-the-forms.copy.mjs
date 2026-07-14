window.customElements.define('custom-radio', class extends HTMLElement {
  static formAssociated = true;

  constructor() {
    super();
    console.log('custom-radio\'s constructor.');
    this.internals_ = this.attachInternals();
  }

  connectedCallback() {
    console.log('<custom-radio> connected.');
    this.theInputEl = this.shadowRoot.getElementById(this.dataset.inputId);
    this.setAttribute('name', this.name);
    this.setAttribute('value', this.value);
    this.theInputEl.addEventListener('change', (event) => {
      this.internals_.setFormValue(null); // Doesn't work. Probably a bug.
      this.internals_.setFormValue(this.value);
      const newChangeEvent = new event.constructor(event.type, event);
      this.dispatchEvent(newChangeEvent);
    });
  }

  get form() { return this.internals_.form; }
  get name() { return this.theInputEl.name; }
  get type() { return this.theInputEl.type; }
  get value() { return this.theInputEl.value; }
  set value(newValue) {
    // TODO: explore what may happen if the value comes from an attacker.
    this.theInputEl.value = newValue;
    this.setAttribute('value', newValue);
  }
  get checked() { return this.theInputEl.checked; }
  set checked(newValue) {
    this.theInputEl.checked = newValue;
    this.setAttribute('checked', newValue);
  }

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
  console.log('Submit event with target:', form);
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  console.log('Submit event with data:', data);
});

pacForm.addEventListener(
  'formdata',
  (event) => {
    const formData = event.formData;
    const form = event.target;
    // Circumvent the bug with `setFormValue(null)`.
    const radios = [...form.elements].filter((fel) => fel.type === 'radio' && fel.checked)
      .forEach((checkedRadio) => formData.set(checkedRadio.name, checkedRadio.value));
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
