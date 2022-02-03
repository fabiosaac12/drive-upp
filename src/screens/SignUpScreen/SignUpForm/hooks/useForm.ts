import * as yup from 'yup';
import { useFormik } from 'formik';
import { useMessages } from '../SignUpFormMessages';

export const useForm = () => {
  const messages = useMessages();

  const initialValues = {
    name: '',
    email: '',
    rut: '',
    phone: '',
    password: '',
    passwordConfirmation: '',
  };

  const validationSchema = yup.object({
    name: yup.string().required(messages.requiredError),
    email: yup
      .string()
      .email(messages.emailError)
      .required(messages.requiredError),
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

  return formik;
};
