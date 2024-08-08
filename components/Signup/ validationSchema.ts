import * as Yup from 'yup';

const passwordRules =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\x20-\x2F\x3A-\x40\x5B-\x60\x7B-\x7E]{8,16}$/;

export const validationSchema = Yup.object().shape({
  name: Yup.string().required('This field can not be empty'),
  email: Yup.string()
    .email('Invalid email')
    .required('This field can not be empty'),
  password: Yup.string()
    .min(8)
    .matches(passwordRules, {
      message:
        'Password should be min 8 characters, 1 Upper case letter, 1 lower case letter, 1 numeric digit and 1 special character',
    })
    .required('This field can not be empty'),
  confirmPassword: Yup.string().required('This field can not be empty'),
});
