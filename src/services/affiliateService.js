// src/services/affiliateService.js

import { v4 as uuidv4 } from 'uuid';
import { PrismaClientSingleton } from '../prisma/prismaClientSingleton.js';

const prisma = PrismaClientSingleton.getInstance();

const getAffiliateInfo = async (userId) => {
  const affiliate = await prisma.affiliate.findUnique({
    where: { userId },
    include: {
      referrals: true,
    },
  });

  if (!affiliate) {
    return null;
  }

  return affiliate;
};

const getAffiliateReferrals = async (affiliateId, page = 1, pageSize = 10) => {
  const skip = (page - 1) * pageSize;

  const [referrals, totalCount] = await prisma.$transaction([
    prisma.referral.findMany({
      where: { affiliateId },
      skip,
      take: pageSize,
    }),
    prisma.referral.count({
      where: { affiliateId },
    }),
  ]);

  const totalPages = Math.ceil(totalCount / pageSize);

  return {
    referrals,
    page,
    pageSize,
    totalCount,
    totalPages,
  };
};

const generateReferralLink = (userId) => {
  // Simple example: using userId as part of the referral link
  return `${process.env.FRONTEND_URL}/register?referral=${userId}`;
};

const createAffiliate = async (userId) => {
  const referralLink = generateReferralLink(userId);
  const newAffiliate = await prisma.affiliate.create({
    data: {
      id: uuidv4(),
      userId,
      referralLink,
      totalEarnings: 0,
      nextPayout: 0,
      nextPayoutDate: new Date(), // Set to a default date
    },
  });
  return newAffiliate;
};

export default {
  getAffiliateInfo,
  getAffiliateReferrals,
  createAffiliate,
};
