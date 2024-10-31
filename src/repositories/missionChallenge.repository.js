import { pool } from "../db.config.js";

// 이미 도전 중인 미션 확인
export const getMemberMission = async (memberId, missionId) => {
  const conn = await pool.getConnection();
  try {
    const [result] = await pool.query(
      `SELECT * FROM member_mission WHERE member_id = ? AND mission_id = ?;`,
      [memberId, missionId]
    );
    return result.length > 0 ? result[0] : null; // 도전 중인 미션이 있다면 반환
  } catch (err) {
    throw new Error(`오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`);
  } finally {
    conn.release();
  }
};

// 미션 도전 추가
export const addMemberMission = async (memberId, missionId) => {
  const conn = await pool.getConnection();
  try {
    const [result] = await pool.query(
      `INSERT INTO member_mission (member_id, mission_id, status, created_at, updated_at) VALUES (?, ?, '진행중', NOW(), NOW());`,
      [memberId, missionId]
    );
    return result.insertId; // 추가된 미션의 ID 반환
  } catch (err) {
    throw new Error(`오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`);
  } finally {
    conn.release();
  }
};
