import { pool } from "../db.config.js";

// 미션 추가
export const addMissionToStore = async (data) => {
  const conn = await pool.getConnection();

  try {
    const [result] = await conn.query(
      `INSERT INTO mission (store_id, reward, deadline, mission_spec, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW());`,
      [data.storeId, data.reward, data.deadline, data.missionSpec]
    );

    return result.insertId; // 추가된 미션 ID 반환
  } catch (err) {
    throw new Error(`오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`);
  } finally {
    conn.release();
  }
};
