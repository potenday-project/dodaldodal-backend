const express = require('express');

const router = express.Router();

const { badgeController } = require('../controllers/badgeController');

/**
 * @swagger
 * paths:
 *   /api/badges:
 *     get:
 *       tags: [Badges]
 *       summary: "뱃지 조회"
 *       description: "뱃지 조회"
 *       parameters:
 *         - name: "Authorization"
 *           in: "header"
 *           description: "Access Token"
 *           required: true
 *           schema:
 *             type: "string"
 *       responses:
 *         "200":
 *           description: "뱃지 조회 요청에 성공했습니다."
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                   message:
 *                     type: string
 */
router.get('/', badgeController.getBadges);

module.exports = router;
