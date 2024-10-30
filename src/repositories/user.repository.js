// 
import { pool } from "../db.config.js";

// 사용자 데이터 삽입
export const addUser = async (data) => {
  const conn = await pool.getConnection();

  try {
    const [confirm] = await conn.query(
      `SELECT EXISTS(SELECT 1 FROM member WHERE email = ?) as isExistEmail;`,
      [data.email]
    );

    if (confirm[0].isExistEmail) {
      return null; // 이미 존재하는 이메일
    }

    const [result] = await conn.query(
      `INSERT INTO member (name, gender, age, address, spec_address, status, created_at, updated_at, email, point, phone_num) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW(), ?, 0, ?);`,
      [
        data.name,
        data.gender,
        data.age, // age가 추가됨
        data.address,
        data.detailAddress,
        "active", // 기본 상태
        data.email,
        data.phoneNumber,
      ]
    );

    return result.insertId; // 추가된 사용자 ID 반환
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};

// 사용자 정보 얻기
export const getUser = async (userId) => {
  const conn = await pool.getConnection();

  try {
    const [user] = await conn.query(`SELECT * FROM member WHERE id = ?;`, [userId]);

    if (user.length === 0) {
      return null; // 사용자 없음
    }

    return user[0]; // 사용자 정보를 반환
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};

// 사용자 선호 카테고리 추가
export const setPreference = async (userId, categoryId) => {
  const conn = await pool.getConnection();

  try {
    await conn.query(
      `INSERT INTO member_prefer (member_id, category_id, created_at, updated_at) VALUES (?, ?, NOW(), NOW());`,
      [userId, categoryId]
    );
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};

// 사용자 선호 카테고리 반환
export const getUserPreferencesByUserId = async (userId) => {
  const conn = await pool.getConnection();

  try {
    const [preferences] = await conn.query(
      `SELECT * FROM member_prefer WHERE member_id = ?;`,
      [userId]
    );

    return preferences;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};
