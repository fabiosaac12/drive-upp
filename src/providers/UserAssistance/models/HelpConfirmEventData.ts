export type HelpConfirmEventData = {
  distance: number;
  idAssistance: string;
  mechanic: {
    idMechanic: string;
    latMechanic: number;
    lngMechanic: number;
  };
  user: {
    idUser: string;
    latUser: number;
    lngUser: number;
  };
};
