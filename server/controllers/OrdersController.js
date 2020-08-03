import express from 'express'
import BaseController from "../utils/BaseController";
import auth0provider from "@bcwdev/auth0provider";
import { ordersService } from '../services/OrdersService'



//PUBLIC
export class OrdersController extends BaseController {

    constructor() {
        super("api/orders")
        this.router
            .use(auth0provider.getAuthorizedUserInfo)
            .get('', this.getAll)
            .get('/:id', this.getById)
            .post('', this.create)
            .put('/:id', this.edit)
            .delete('/:id', this.delete)
    }

    async getAll(req, res, next) {
        try {
            let data = await ordersService.getAll(req.userInfo.email)
            return res.send(data)
        } catch (error) {
            next(error)
        }
    }

    async getById(req, res, next) {
        try {
            let data = await ordersService.getById(req.params.id, req.userInfo.email)
            return res.send(data)
        } catch (error) { next(error) }
    }

    async create(req, res, next) {
        try {
            let data = await ordersService.create(req.body)
            return res.send(data)
        } catch (error) { next(error) }
    }

    async edit(req, res, next) {
        try {
            let data = await ordersService.edit(req.params.id, req.userInfo.email, req.body)
            return res.send(data)
        } catch (error) { next(error) }
    }

    async delete(req, res, next) {
        try {
            await ordersService.delete(req.params.id, req.userInfo.email)
            return res.send("Successfully deleted")
        } catch (error) { next(error) }
    }
}