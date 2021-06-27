import { ISendEmailService } from "../../infra/emailNotification/ISendMailService";

class EmailNotificationsService {

  private emailService: ISendEmailService;
    constructor(emailService: ISendEmailService) {
  }

  execute({ to, subject, message }) {
    this.emailService.sendMail({
      to,
      subject,
      message
    })
  }
}

export {EmailNotificationsService}