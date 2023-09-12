export interface ICityToUser {
  userId: number;
  cityId: number;
}

export interface IUser {
  id: number;
  email: string;
  password: string;
  cities?: ICityToUser[];
}
