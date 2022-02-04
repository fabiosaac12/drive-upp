import { defineMessages } from 'providers/Language';
import { FormattedMessages } from 'providers/Language/models/FormattedMessages';
import { useLoader } from 'providers/Loader';
import _ from 'lodash';

const useDefaultMessages = defineMessages({
  404: {
    en: 'Resource not found',
    es: 'Recurso no encontrado',
  },
  409: {
    en: 'Duplicate record',
    es: 'El registro ya existe',
  },
  500: {
    en: 'An error has occured on the server',
    es: 'Ha ocurrido un problema en el servidor',
  },
  401: {
    en: 'Wrong credentials',
    es: 'Credenciales incorrectas',
  },
  error: {
    en: 'An error has occured',
    es: 'Ha ocurrido un error',
  },
});

export const useRequest = <T, U>(
  request: (props: T) => Promise<U>,
  customMessages: FormattedMessages<string> = {},
): ((props: T) => Promise<U | undefined>) => {
  const loader = useLoader();
  const defaultMessages = useDefaultMessages();
  const messages = _.defaultsDeep(customMessages, defaultMessages);

  return async (props: T) => {
    loader.handleShow();

    try {
      const response = await request(props);

      loader.handleHide();

      return response;
    } catch (_code) {
      loader.handleHide();

      const code = _code as number;

      console.log(code in messages ? messages[code] : messages.error);
    }
  };
};
