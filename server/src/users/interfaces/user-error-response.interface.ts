export class IUserErrorResponse {
  error: boolean;
  property: {
    email?: string;
    password?: string;
  };
}
