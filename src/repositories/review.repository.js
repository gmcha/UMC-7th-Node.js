// review.repository.js
import { pool } from "../db.config.js";

export const addReview = async (data) => {
  const conn = await pool.getConnection();

  try {
    const [result] = await pool.query(
      `INSERT INTO review (member_id, store_id, body, score, created_at) VALUES (?, ?, ?, ?, ?);`,
      [data.memberId, data.storeId, data.body, data.score, data.createdAt]
    );

    return { id: result.insertId, ...data };
  } catch (err) {
    throw new Error(`오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`);
  } finally {
    conn.release();
  }
};

export const checkStoreExists = async (storeId) => {
  const conn = await pool.getConnection();

  try {
    const [store] = await pool.query(`SELECT * FROM store WHERE id = ?;`, storeId);
    return store.length > 0;
  } catch (err) {
    throw new Error(`오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`);
  } finally {
    conn.release();
  }
};
