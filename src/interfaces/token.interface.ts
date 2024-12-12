export interface IActivationToken {
  activationToken: string;
  userId: string;
}

export interface ITokenPair {
  accessToken: string;
  refreshToken: string;
}

export interface IToken extends ITokenPair {
  _id?: string;
  userId: string;
  activationToken?: string;
  recoveryToken?: string;
}

export interface ITokenResponse extends ITokenPair {
  accessExpiresIn: string;
  refreshExpiresIn: string;
}
