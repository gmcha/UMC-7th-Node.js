import { responseFromUser } from "../dtos/user.dto.js";
import { DuplicateUserEmailError, NonExistingMemberError } from "../errors.js";
import {
  addUser,
  getUser,
  getUserPreferencesByUserId,
  setPreference,
  getAllUserReviews,
  checkMemberExists
} from "../repositories/user.repository.js";
import { responseFromReviews } from '../dtos/store.dto.js';

export const userSignUp = async (data) => {
  const joinUserId = await addUser({
    email: data.email,
    name: data.name,
    gender: data.gender,
    address: data.address,
    phoneNum: data.phoneNumber,
  });

  if (joinUserId === null) {
    throw new DuplicateUserEmailError("이미 존재하는 이메일입니다.", data);
  }

  for (const preference of data.preferences) {
    await setPreference(joinUserId, preference);
  }

  const user = await getUser(joinUserId);
  const preferences = await getUserPreferencesByUserId(joinUserId);

  return responseFromUser({ user, preferences });
};

export const listUserReviews = async (userId, cursor) => {
  const memberExists = await checkMemberExists(userId);

  if (!memberExists) {
    throw new NonExistingMemberError("존재하지 않는 사용자입니다.");
}

  const reviews = await getAllUserReviews(userId, cursor);
  return responseFromReviews(reviews);
};