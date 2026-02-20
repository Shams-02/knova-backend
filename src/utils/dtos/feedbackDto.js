class FeedbackDto {
    constructor(feedback) {
        this.id = feedback.id;
        this.userId = feedback.userId;
        this.userName = feedback.userName;
        this.userEmail = feedback.userEmail;
        this.type = feedback.type;
        this.message = feedback.message;
        this.timestamp = feedback.timestamp;
        this.status = feedback.status;
        this.userAgent = feedback.userAgent;
    }
}

export default FeedbackDto;