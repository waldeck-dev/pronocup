export interface IAuthPayload {
  email: string;
  password: string;
}

export interface IAuthResponse {
  jwt: string;
  user: IUser;
}

export interface IUser {
  id: number;
}

export interface IGroup {
  id?: number;
  name?: string;
  owner?: number;
}

export interface IUserGroup {
  id?: number;
  confirmed?: boolean;
  createdAt?: string;
  updatedAt?: string;
  blocked?: boolean;
  group?: IGroup;
}
