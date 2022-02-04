import * as yup from 'yup';
import { useFormik } from 'formik';
import { useMessages } from '../SignUpFormMessages';
import { useRutValidator } from './useRutValidator';

export const useForm = () => {
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
    name: yup.string().required(messages.requiredError),
    lastName: yup.string().required(messages.requiredError),
    email: yup
      .string()
      .email(messages.emailError)
      .required(messages.requiredError),
    rut: yup.string().required(messages.requiredError),
    phone: yup
      .string()
      .min(4, messages.requiredError)
      .matches(/^(\+?56)?(\s?)(0?9)(\s?)[9876543]\d{7}$/, messages.phoneError),
    password: yup.string().required(messages.requiredError),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref('password')], messages.matchError)
      .required(messages.requiredError),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => console.log(values),
  });

  console.log(formik.values.phone);

  useRutValidator(formik);

  return formik;
};
