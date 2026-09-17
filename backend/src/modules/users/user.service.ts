import User from "./user.model";
import AppError from "../../utils/AppError";

export const getUserProfile = async (
  userId: string
) => {
  const user = await User.findByPk(userId);

  if (!user) {
    throw new AppError(
      "User not found",
      404
    );
  }

  return user;
};

interface UpdateUserInput {
  name?: string;
  avatarUrl?: string | null;
}

export const updateUserProfile = async (
  userId: string,
  input: UpdateUserInput
) => {
  const user = await User.findByPk(userId);

  if (!user) {
    throw new AppError(
      "User not found",
      404
    );
  }

  if (input.name !== undefined) {
    user.name = input.name;
  }

  if (input.avatarUrl !== undefined) {
    user.avatarUrl = input.avatarUrl;
  }

  await user.save();

  return user;
};