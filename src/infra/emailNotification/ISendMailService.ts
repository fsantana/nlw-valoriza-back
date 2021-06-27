import { IMail } from "./IMail";

export interface ISendEmailService {
  sendMail(mail: IMail);
}