import { Location } from 'providers/Location/models/Location';
import { Assistance } from 'providers/UserAssistance/models/Assistance';
import { instance } from '../instance';
import { ApiResponse } from './models/ApiResponse';

type GetCurrentAssistanceResponse = {
  _id: string;
  createdAt: string;
  destination: { lat: number; lng: number };
  mechanicId: string;
  score: { mechanic: number; user: number };
  status: 'InProcess' | 'Aborted' | 'Cancelled' | 'Completed';
  updatedAt: string;
  userId: string;
};

export const getCurrentAssistance = async (): Promise<
  (Assistance & { userLocation: Location }) | void
> => {
  const response = await instance.get<
    ApiResponse<GetCurrentAssistanceResponse>
  >('assistance/current');

  const {
    data: {
      headerResponse: { code },
      payload,
    },
  } = response;

  if (code !== 200) {
    throw code;
  }

  if (payload.status !== 'InProcess') {
    return;
  }

  return {
    idAssistance: payload._id,
    idMechanic: payload.mechanicId,
    idUser: payload.userId,
    userLocation: {
      latitude: payload.destination.lat,
      longitude: payload.destination.lng,
    },
  };
};

type RateAssistanceResponse = {
  destination: {
    lat: number;
    lng: number;
  };
  destinationAddress: {
    city: string;
    postcode: string;
    country: string;
    country_code: string;
  };
  score: {
    user: number;
    mechanic: number;
  };
  _id: string;
  userId: string;
  mechanicId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export const rateAssistance = async ({
  data: { assistanceId, punctuation },
}: {
  data: { assistanceId: string; punctuation: number };
}) => {
  const response = await instance.post<ApiResponse<RateAssistanceResponse>>(
    'assistance/rate',
    {
      score: punctuation,
      id_assistance: assistanceId,
    },
  );

  const {
    data: {
      headerResponse: { code },
    },
  } = response;

  if (code !== 200) {
    throw code;
  }

  return true;
};
