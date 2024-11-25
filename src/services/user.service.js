import { responseFromUser } from "../dtos/user.dto.js";
import { DuplicateUserEmailError, NonExistingMemberError } from "../errors.js";
import {
  addUser,
  getUser,
  getUserPreferencesByUserId,
  setPreference,
  getAllUserReviews,
  checkMemberExists, 
  updateMemberInfo
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

export const updateUser = async (userId, updateData) => {
  // 아래 유효성 검사 추후에 수정하기 (로직 다른 곳으로 배치, 에러 통일)
  if (!updateData || Object.keys(updateData).length === 0) {
    return res.error({
      errorCode: "invalid_request",
      reason: "No data provided for update.",
    });
  }

  const updatedMember = await updateMemberInfo(userId, updateData);
  return updatedMember;  // 추가 구현할 것: DTO
};