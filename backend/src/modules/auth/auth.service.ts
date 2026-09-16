import bcrypt from "bcrypt";

import User from "../users/user.model";

import { signToken } from "../../utils/jwt";

import AppError from "../../utils/AppError";

interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

interface LoginInput {
  email: string;
  password: string;
}

export const registerUser = async (
  input: RegisterInput
) => {
  const existingUser =
    await User.unscoped().findOne({
      where: {
        email: input.email,
      },
    });

  if (existingUser) {
    throw new AppError(
      "An account with this email already exists",409
    );
  }

  const passwordHash =
    await bcrypt.hash(
      input.password,
      12
    );

  const user = await User.create({
    name: input.name,
    email: input.email,
    passwordHash,
    role: "USER",
  });

  const token = signToken({
    userId: user.id,
    role: user.role,
  });

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatarUrl: user.avatarUrl,
    },

    token,
  };
};

export const loginUser = async (
  input: LoginInput
) => {
  const user =
    await User.scope(
      "withPassword"
    ).findOne({
      where: {
        email: input.email,
      },
    });

  if (!user) {
    throw new AppError(
      "Invalid email or password",401
    );
  }

  const passwordMatches =
    await bcrypt.compare(
      input.password,
      user.passwordHash
    );

  if (!passwordMatches) {
    throw new Error(
      "Invalid email or password"
    );
  }

  const token = signToken({
    userId: user.id,
    role: user.role,
  });

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatarUrl: user.avatarUrl,
    },

    token,
  };
};