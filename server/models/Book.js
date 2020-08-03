import mongoose from "mongoose"
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

//NOTE subtitle require? Quantity, orderId, invoiceId? 
const Book = new Schema({
  title: { type: String, required: true },
  subTitle: { type: String },
  authors: { type: String, required: true },
  ISBN: { type: String, required: true },
  pageCount: { type: Number },
  publisher: { type: String, required: true },
  description: { type: String, required: true },
  quantity: { type: Number },
  orderQuantity: {type: Number},
  saleQuantity: {type: Number},
  img: {type: String},
  price: {type: Number}
}, { timestamps: true, toJSON: { virtuals: true } })


export default Book