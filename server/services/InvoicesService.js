import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class InvoicesService {

    async getAll(userEmail) {
        return await dbContext.Invoices.find({ creatorEmail: userEmail })
    }

    async getById(id, userEmail) {
        let invoices = await dbContext.Invoices.findOne({ id, creatorEmail: userEmail });
        return invoices;
    }

    async edit(id, userEmail, update) {
        let data = await dbContext.Invoices.findOneAndUpdate({ id, creatorEmail: userEmail }, update, { new: true })
        if (!data) {
            throw new BadRequest("Invalid Id")
        }
        return data;
    }

    async delete(id, userEmail) {
        let data = await dbContext.Invoices.findOneAndRemove({ id, creatorEmail: userEmail });
        if (!data) {
            throw new BadRequest("Invalid Id or you are not the owner")
        }
    }

}

export const invoicesService = new InvoicesService();