export interface ICityToUser {
  userId: string;
  cityId: number;
}

export interface IUser {
  id: string;
  email: string;
  password: string;
  cities?: ICityToUser[];
}
