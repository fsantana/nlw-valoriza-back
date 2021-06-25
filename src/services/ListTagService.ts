import { getCustomRepository } from "typeorm";
import { TagsRepositories } from "../repositories/TagsRepositories";
import { classToPlain } from "class-transformer"

class ListTagService {
  async execute() {
    const tagsRepository = getCustomRepository(TagsRepositories);

    let tags = await tagsRepository.find();
    /*
    tags = tags.map(tag => ({ ...tag, nameCustom: `#${tag.name}`}))
    */
    return classToPlain(tags);
  }
}
export { ListTagService };