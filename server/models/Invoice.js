import mongoose from "mongoose"
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

//NOTE subtitle require? Quantity, orderId, invoiceId? Qty vs qty of books by title?
const Invoice = new Schema({
  date: { type: Date, required: true },
  bookId: { type: ObjectId, required: true },
  quantity: { type: Number, required: true },
  invoiceId: { type: ObjectId },
  creatorEmail: { type: String, required: true },
}, { timestamps: true, toJSON: { virtuals: true } })

Invoice.virtual("creator",
  {
    localField: "creatorEmail",
    ref: "Profile",
    foreignField: "email",
    justOne: true
  })

export default Invoice