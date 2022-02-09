export type User = {
  _id: string;
  email: string;
  name: string;
  lastName: string;
  phone: string;
  rut: string;
  photo: string;
  role: 'mechanic' | 'user';
  createdAt: string;
};
