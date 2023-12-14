const { pool } = require('./pool');

const badgeModel = {
  getBadges: async ({ memberId }) => {
    const connection = await pool.getConnection();

    const [rows, fields] = await connection.query(
      'SELECT * FROM badge WHERE id IN (SELECT badge_id FROM member_badge WHERE member_id = ?)',
      [memberId]
    );
    return rows;
  },
};

module.exports = {
  badgeModel,
};
