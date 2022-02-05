import * as yup from 'yup';
import { useFormik } from 'formik';
import { useMessages } from '../SignUpFormMessages';
import { useRutValidator } from './useRutValidator';
import { useAuth } from 'providers/Auth';

export const useForm = () => {
  const auth = useAuth();
  const messages = useMessages();

  const initialValues = {
    name: '',
    lastName: '',
    email: '',
    rut: '',
    phone: '+56',
    password: '',
    passwordConfirmation: '',
  };

  const validationSchema = yup.object({
    name: yup
      .string()
      .min(3, messages.min3Error)
      .max(30, messages.max30Error)
      .required(messages.requiredError),
    lastName: yup
      .string()
      .min(3, messages.min3Error)
      .max(30, messages.max30Error)
      .required(messages.requiredError),
    email: yup
      .string()
      .email(messages.emailError)
      .required(messages.requiredError),
    rut: yup.string().required(messages.requiredError),
    phone: yup
      .string()
      .min(4, messages.requiredError)
      .matches(/^(\+?56)?(\s?)(0?9)(\s?)[9876543]\d{7}$/, messages.phoneError),
    password: yup
      .string()
      .required(messages.requiredError)
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!¿@(.)$=%^/&¡*-]).{8,}$/,
        messages.passwordError,
      ),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref('password')], messages.matchError)
      .required(messages.requiredError),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => auth.handleSignUp(values),
  });

  useRutValidator(formik);

  return formik;
};
