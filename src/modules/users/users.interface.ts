export interface IUser {
  _id: object;
  name: string;
  email: string;
  password: string;
  address: IAddress;
}

export interface IAddress {
  _id: object;
  street: string;
  city: string;
  country: string;
}
