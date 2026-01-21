export interface LoginModel{
  userName: string;
  password: string;
}

export interface RegisterModel{
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export interface TokenContainer{
  accessToken: string;
  refreshToken: string;
}


