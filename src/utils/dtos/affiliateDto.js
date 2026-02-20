class AffiliateDto {
    constructor(affiliate) {
        this.id = affiliate.id;
        this.userId = affiliate.userId;
        this.referralLink = affiliate.referralLink;
        this.totalEarnings = affiliate.totalEarnings;
        this.nextPayout = affiliate.nextPayout;
        this.nextPayoutDate = affiliate.nextPayoutDate;
        this.createdAt = affiliate.createdAt;
        this.updatedAt = affiliate.updatedAt;
    }
}

export default AffiliateDto;