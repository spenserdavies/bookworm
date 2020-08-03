import mongoose from "mongoose"
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

const Order = new Schema({
  date: { type: Date, required: true },
  bookId: { type: ObjectId, required: true },
  quantity: { type: Number, required: true },
  orderId: { type: ObjectId },
  creatorEmail: { type: String, required: true },

}, { timestamps: true, toJSON: { virtuals: true } })



Order.virtual("creator",
  {
    localField: "creatorEmail",
    ref: "Profile",
    foreignField: "email",
    justOne: true
  })



export default Order