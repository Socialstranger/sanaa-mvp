import jwt from "jsonwebtoken";

import { JwtPayload } from "../modules/auth/auth.types";

const getJwtSecret = (): string => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error(
      "JWT_SECRET is not defined"
    );
  }

  return secret;
};

export const signToken = (
  payload: JwtPayload
): string => {
  const secret = getJwtSecret();

  return jwt.sign(
    payload,
    secret,
    {
      expiresIn: "7d",
    }
  );
};
  


export const verifyToken = (
  token: string
): JwtPayload => {
  const secret = getJwtSecret();

  return jwt.verify(
    token,
    secret
  ) as JwtPayload;
};