import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class OrdersService {

    async getAll(userEmail) {
        return await dbContext.Orders.find({ creatorEmail: userEmail })
    }

    async getById(id, userEmail) {
        let data = await dbContext.Orders.findOne({ id, creatorEmail: userEmail });
        return data;
    }

    async edit(id, userEmail, update) {
        let data = await dbContext.Orders.findOneAndUpdate({ id, creatorEmail: userEmail }, update, { new: true })
        if (!data) {
            throw new BadRequest("Invalid Id")
        }
        return data;
    }

    async delete(id, userEmail) {
        let data = await dbContext.Orders.findOneAndRemove({ id, creatorEmail: userEmail });
        if (!data) {
            throw new BadRequest("Invalid Id or you are not the owner")
        }
    }

}

export const ordersService = new OrdersService();