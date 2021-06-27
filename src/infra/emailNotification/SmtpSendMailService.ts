import nodemailer from "nodemailer";
import { ISendEmailService } from "./ISendMailService";
import { IMail } from "./IMail";
import config from "../../config/MailConfig";

class SmtpSendMailService implements ISendEmailService {

  sendMail(mail: IMail) {

    const mailOptions = {
      from: config.from,
      to: mail.to,
      subject: mail.subject,
      html: mail.message
    };

    const transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: false,
      auth: {
        user: config.user,
        pass: config.password
      },
      tls: { rejectUnauthorized: false }
    });

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        //implementar sistema de log
        console.log(`Erro ao enviar email ${error}`)
      } else {
        console.log("Email enviado")
      }
    });
  }
}

export { SmtpSendMailService}