import { getCustomRepository } from "typeorm";
import { SmtpSendMailService } from "../../infra/emailNotification/SmtpSendMailService";
import { IMail } from "../../infra/emailNotification/IMail";
import { ComplimentsRepositories } from "../../repositories/ComplimentsRepositories";
import { UsersRepositories } from "../../repositories/UsersRepositories";
import { TagsRepositories } from "../../repositories/TagsRepositories";

interface IComplimentRequest {
  tag_id: string;
  user_sender: string;
  user_receiver: string;
  message: string;
}
class CreateComplimentService {
  async execute({ tag_id, user_sender, user_receiver, message }: IComplimentRequest) {
    const complimentsRepository = getCustomRepository(ComplimentsRepositories);
    const usersRepository = getCustomRepository(UsersRepositories);
    const tagRepository = getCustomRepository(TagsRepositories);

    if (user_sender === user_receiver) {
      throw new Error("Incorrect user receiver")
    }

    const userReceiver = await usersRepository.findOne(user_receiver)

    if (!userReceiver) {
      throw new Error("User Receiver does not exists!")
    }

    const tag = await tagRepository.findOne(tag_id)

    const compliment = complimentsRepository.create({
      tag_id,
      user_sender,
      user_receiver,
      message
    })

    await complimentsRepository.save(compliment)

    const mail = {
      to: userReceiver.email,
      subject: 'Você recebeu um elogio',
      message: `<p>Você recebeu um elogio por ser: ${tag.nameCustom} </p>
      <p> ${message}</p>`
    } as IMail;
    const mailService = new SmtpSendMailService();
    mailService.sendMail(mail);

    return compliment;
  }
}

export { CreateComplimentService };