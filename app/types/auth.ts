export interface LoginBody {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
}

export interface LoginResp {
  token: string;
  user: User;
}
