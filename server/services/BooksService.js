import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"


class BookService {

  async getAll() {
    let data = await dbContext.Books.find()
    return data
  }

  async getById(id, userEmail) {
    let data = await dbContext.Books.findOne({ _id: id, creatorEmail: userEmail })
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this board")
    }
    return data
  }

    async create(book){
      let data = await dbContext.Books.create(book)
      return data
    }

  async edit(id, update) {
    let data = await dbContext.Books.findOneAndUpdate({ _id: id }, update, { new: true })
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this board");
    }
    return data;
  }

  async delete(id) {
    let data = await dbContext.Books.findOneAndRemove( id );
    if (!data) {
      throw new BadRequest("Invalid Id or you are not the owner")
    }
  }


}


export const booksService = new BookService()