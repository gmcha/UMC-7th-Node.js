import { pool } from "../db.config.js";

// 가게 존재 여부 확인
export const getStoreById = async (storeId) => {
  const conn = await pool.getConnection();

  try {
    const [store] = await conn.query(
      `SELECT * FROM store WHERE id = ?;`,
      [storeId]
    );

    if (store.length === 0) {
      return null; // 가게가 존재하지 않음
    }

    return store[0]; // 가게 정보 반환
  } catch (err) {
    throw new Error(`오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`);
  } finally {
    conn.release();
  }
};

// 다른 가게 관련 작업을 추가할 수 있는 공간
// 예: 가게 추가, 수정, 삭제 등
