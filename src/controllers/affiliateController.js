// src/controllers/affiliateController.js
import affiliateService from '../services/affiliateService.js';

const getAffiliate = async (req, res) => {
  try {
    const userId = req.user.id;
    const affiliate = await affiliateService.getAffiliateByUserId(userId);
    if (!affiliate) {
      return res.status(404).json({ error: { message: 'Affiliate not found' } });
    }
    res.status(200).json({ data: affiliate, message: 'Affiliate information retrieved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: { message: error.message || 'Failed to retrieve affiliate information' } });
  }
};

const getReferrals = async (req, res) => {
  try {
    const userId = req.user.id;
    const { page = 1, limit = 10 } = req.query;
    const referrals = await affiliateService.getReferralsByUserId(userId, parseInt(page), parseInt(limit));
    res.status(200).json({ data: referrals, message: 'Referrals retrieved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: { message: error.message || 'Failed to retrieve referrals' } });
  }
};

export default {
  getAffiliate,
  getReferrals,
};
