import { defineMessages } from 'providers/Language';

const wrongDataMessageObject = {
  en: 'Wrong e-mail or password',
  es: 'Correo electrónico o contraseña incorrecta',
};

export const useLoginMessages = defineMessages({
  400: wrongDataMessageObject,
  401: wrongDataMessageObject,
  404: wrongDataMessageObject,
  430: {
    en: "You haven't confirmed your e-mail",
    es: 'No has confirmado tu correo electrónico',
  },
});

export const useSignUpMessages = defineMessages({
  409: {
    en: 'Previously registered e-mail',
    es: 'Correo electrónico registrado anteriormente',
  },
  400: {
    en: 'The sent data has errors',
    es: 'Los datos enviados contienen errores',
  },
  emailSent: {
    en: 'We have sent you a confirmation e-mail, please, open it and follow the instructions.',
    es: 'Le hemos enviado un correo electrónico de confirmación, por favor, ábralo y siga las instrucciones.',
  },
  accept: {
    en: 'Accept',
    es: 'Aceptar',
  },
});
