import express from 'express'
import BaseController from "../utils/BaseController";
import auth0provider from "@bcwdev/auth0provider";
import { invoicesService } from '../services/InvoicesService'



//PUBLIC
export class InvoicesController extends BaseController {

  constructor() {
    super("api/invoices")
    this.router
      .use(auth0provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .get('/:id', this.getById)
      .put('/:id', this.edit)
      .delete('/:id', this.delete)
  }

  async getAll(req, res, next) {
    try {
      let data = await invoicesService.getAll(req.userInfo.email)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      let data = await invoicesService.getById(req.params.id, req.userInfo.email)
      return res.send(data)
    } catch (error) { next(error) }
  }


  async edit(req, res, next) {
    try {
      let data = await invoicesService.edit(req.params.id, req.userInfo.email, req.body)
      return res.send(data)
    } catch (error) { next(error) }
  }

  async delete(req, res, next) {
    try {
      await invoicesService.delete(req.params.id, req.userInfo.email)
      return res.send("Successfully deleted")
    } catch (error) { next(error) }
  }
}


