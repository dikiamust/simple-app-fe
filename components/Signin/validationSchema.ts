import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('This field can not be empty'),
  password: Yup.string().required('This field can not be empty'),
  confirmPassword: Yup.string().required('This field can not be empty'),
});
