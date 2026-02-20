import Joi from 'joi';

const affiliateReferralsQuerySchema = Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10)
});

export { affiliateReferralsQuerySchema };