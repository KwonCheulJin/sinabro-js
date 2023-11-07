import { z } from 'zod';

const emailSchema = z.string().email();
const passwordSchema = z.string().min(12);

setupForm({
  form: document.querySelector('#login-form'),
  fields: {
    email: emailSchema,
    password: passwordSchema,
  },
  async onSubmit(data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('onSubmit', data);
        resolve();
      }, 3000);
    });
  },
});

function setupForm({ form, fields, onSubmit }) {
  let isSubmitting = false;
  form.addEventListener('submit', async e => {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }
    isSubmitting = true;
    form.setAttribute('data-submitting', true);
    const data = {};
    const errors = {};
    let valid = true;
    Object.keys(fields).forEach(key => {
      const value = form[key].value;
      const schema = fields[key];
      const result = schema.safeParse(value);
      const errorElement = form.querySelector(`#${key}-error`);

      if (result.success) {
        if (errorElement) {
          errorElement.innerHTML = '';
        }
      } else {
        valid = false;
        errors[key] = result.error;
        if (errorElement) {
          errorElement.innerHTML = result.error.issues[0].message;
        }
      }
      data[key] = value;
    });

    if (valid) {
      console.log('start submitting');
      await onSubmit(data);
      console.log('submit finished');
    } else {
      console.log('error!!', errors);
    }
    isSubmitting = false;
    form.setAttribute('data-submitting', false);
  });
}
