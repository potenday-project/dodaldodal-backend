const { challengeModel } = require('../models/challengeModel');
const { challengeParticipantModel } = require('../models/challengeParticipantModel');
const { challengeCertificationModel } = require('../models/challengeCertificationModel');
const { memberModel } = require('../models/memberModel');

const challengeService = {
  createChallenge: async ({ userId, name, category, authenticationMethod, reward, targetCount }) => {
    try {
      const result = await challengeModel.createChallenge({
        name,
        category,
        authenticationMethod,
        reward,
        targetCount,
      });

      await challengeParticipantModel.createChallengeParticipant({
        memberId: userId,
        challengeId: result.insertId,
        role: 'OWNER',
      });

      return {
        success: true,
        data: {
          challengeId: result.insertId,
        },
      };
    } catch (error) {
      return {
        success: false,
        err: error,
      };
    }
  },
  approveChallenge: async ({ memberId, challengeId }) => {
    try {
      const result = await challengeModel.approveChallenge({
        memberId,
        challengeId,
      });

      await challengeModel.startChallenge({
        challengeId,
      });

      return {
        success: true,
        data: {
          challengeId: result.insertId,
        },
      };
    } catch (error) {
      return {
        success: false,
        err: error,
      };
    }
  },
  getUpcomingChallenge: async ({ challengeId }) => {
    try {
      const result = await challengeModel.getUpcomingChallenge({
        challengeId,
      });

      return {
        success: true,
        data: {
          challenge: result,
        },
      };
    } catch (error) {
      return {
        success: false,
        err: error,
      };
    }
  },
  getInProgressChallenge: async ({ challengeId }) => {
    try {
      const result = await memberModel.getChallengeProgressInfo({
        challengeId,
      });

      return {
        success: true,
        data: result,
      };
    } catch (error) {
      return {
        success: false,
        err: error,
      };
    }
  },

  submitImage: async (req, res) => {
    try {
      const fileUrl = req.file.location;

      console.log(fileUrl);

      return {
        success: true,
        message: '이미지 업로드에 성공했습니다.',
        data: fileUrl,
      };
    } catch (error) {
      return {
        success: false,
        message: '이미지 업로드에 실패했습니다.',
        err: error,
      };
    }
  },

  findNullApproved: async ({ memberId, challengeId }) => {
    try {
      const result = await challengeCertificationModel.findNullApproved({
        memberId,
        challengeId,
      });

      return {
        success: true,
        data: result,
      };
    } catch (err) {
      return {
        success: false,
        err,
      };
    }
  },

  createChallengeCertification: async ({
    memberId,
    challengeId,
    authenticateImageUrl,
    is_authenticate,
    participationCount,
  }) => {
    try {
      const result = await challengeCertificationModel.createChallengeCertification({
        memberId,
        challengeId,
        authenticateImageUrl,
        is_authenticate,
        participationCount,
      });

      return {
        success: true,
        data: result,
      };
    } catch (err) {
      return {
        success: false,
        err,
      };
    }
  },

  getChallenges: async ({ memberId }) => {
    try {
      const result = await challengeModel.findChallengesByMemberId({
        memberId,
      });

      console.log(result);

      return {
        success: true,
        data: result,
      };
    } catch (err) {
      return {
        success: false,
        err,
      };
    }
  },

  getTodayChallengeStatus: async ({ memberId }) => {
    try {
      const result = await challengeModel.findExplorationCountByMemberId({
        memberId,
      });

      console.log(result);

      return {
        success: true,
        data: result,
      };
    } catch (err) {
      return {
        success: false,
        err,
      };
    }
  },
};

module.exports = {
  challengeService,
};
