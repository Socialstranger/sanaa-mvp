import { UserRole } from "../users/user.model";

export interface JwtPayload {
  userId: string;
  role: UserRole;
}