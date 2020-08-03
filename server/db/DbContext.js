import mongoose from "mongoose";
import OrderSchema from "../models/Order";
import ProfileSchema from "../models/Profile";
import BookSchema from '../models/Book'
import InvoiceSchema from '../models/Invoice'
class DbContext {
  Orders = mongoose.model("Order", OrderSchema);
  Profile = mongoose.model("Profile", ProfileSchema);
  Books = mongoose.model("Book", BookSchema)
  Invoices = mongoose.model("Invoice", InvoiceSchema)
}

export const dbContext = new DbContext();
