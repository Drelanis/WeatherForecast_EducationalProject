export class IUserErrorResponse {
  error: boolean;
  message: string;
  property: {
    email?: string;
    password?: string;
  };
}
