console.log('Fixing forms...');
window.customElements.define('pac-record', class extends HTMLElement {
  static formAssociated = true;

  constructor() {
    super();
    this.internals_ = this.attachInternals();
    // internal value for this control
    this.value_ = this.getAttribute('value');
    this.internals_.setFormValue(this.value_);
    console.log(this.internals_);
    this.shadowRoot.querySelectorAll('input[type="radio"]').forEach((shadowedRadio) => {
      shadowedRadio.name = this.name;
      shadowedRadio.value = this.value;
      shadowedRadio.addEventListener('change', (event) => {
        const t = event.target;
        console.log(`SH! Radio button named "${t.name}" with value "${t.value}" is checked: ${t.checked}`);
        //const radios = this.form.querySelectorAll(`input[name="${this.name}"]`);
        //console.log('SH! Same name radios:', radios);
        //radios.forEach((radio) => {
        //  radio.checked = false;
        //});
        //t.checked = true;
      });
    });
  }

  connectedCallback() {
    // Listen for the 'formdata' event on the parent form
    this.form.addEventListener('formdata', this.handleFormData);
  }

  handleFormData(event) {
    const formData = event.formData;
    console.log('FORM DATA EVENT:', formData);
    //const myInput = this.shadowRoot.getElementById('myInput');
    //formData.append(myInput.name, myInput.value);
  }

  // Form controls usually expose a "value" property
  get value() { return this.value_; }
  set value(v) { this.value_ = v; }

  // The following properties and methods aren't strictly required,
  // but browser-level form controls provide them. Providing them helps
  // ensure consistency with browser-provided controls.
  get form() { return this.internals_.form; }
  get name() { return this.getAttribute('name'); }
  get type() { return 'radio'; }
  get validity() { return this.internals_.validity; }
  get validationMessage() { return this.internals_.validationMessage; }
  get willValidate() { return this.internals_.willValidate; }

  checkValidity() { return this.internals_.checkValidity(); }
  reportValidity() { return this.internals_.reportValidity(); }
});

//console.log('ELEMENTS:', pacChooserForm.elements);
const pacRadios = [...pacChooserForm.elements]
  .filter((e) => e.type == 'radio' && e.name == 'pacScript');
console.log('RADIOS:', pacRadios);
pacRadios.forEach((pradio) => {
  console.log('ADD EVENT LISTENER FOR:', pradio);
  console.log('ITS SHADOW:', pradio.shadowRoot);
  pradio.addEventListener('change', (event) => {
    const t = event.target;
    console.log('EVENT TARGET:', t);
    console.log(`Radio button named "${t.name}" with value "${t.value}" is checked: ${t.checked}`);
    console.log('Same name radios:', pacRadios);
    pacRadios.forEach((radio) => {
      radio.checked = false;
    });
    t.checked = true;
  });
});
console.log('All forms fixed.');