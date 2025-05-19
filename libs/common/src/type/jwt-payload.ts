export type JwtPayload = {
  _id: string;
  role: string;
  iat?: number;
  exp?: number;
};
