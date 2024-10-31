import { pool } from "../db.config.js";

// 미션 도전 추가
export const addMissionChallenge = async ({ memberId, missionId }) => {
  const conn = await pool.getConnection();

  try {
    const [result] = await conn.query(
      `INSERT INTO member_mission (member_id, mission_id, status, created_at, updated_at) VALUES (?, ?, '진행중', NOW(), NOW());`,
      [memberId, missionId]
    );

    return result.insertId; 
  } catch (err) {
    throw new Error(`오류가 발생했습니다. (${err})`);
  } finally {
    conn.release();
  }
};

// 도전 중인 미션 체크
export const checkMissionInProgress = async (memberId, missionId) => {
  const conn = await pool.getConnection();

  try {
    const [rows] = await conn.query(
      `SELECT COUNT(*) as count FROM member_mission WHERE member_id = ? AND mission_id = ? AND status = '진행중';`,
      [memberId, missionId]
    );

    return rows[0].count > 0; 
  } catch (err) {
    throw new Error(`오류가 발생했습니다. (${err})`);
  } finally {
    conn.release();
  }
};
