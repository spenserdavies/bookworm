import express from 'express'
import BaseController from "../utils/BaseController";
import auth0provider from "@bcwdev/auth0provider";
import { booksService } from '../services/BooksService'



//PUBLIC
export class BooksController extends BaseController {

    constructor() {
        super("api/books")
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
            let data = await booksService.getAll()
            return res.send(data)
        } catch (error) {
            next(error)
        }
    }

    async getById(req, res, next) {
        try {
            let data = await booksService.getById(req.params.id, req.userInfo.email)
            return res.send(data)
        } catch (error) { next(error) }
    }

    async create(req, res, next) {
        try {
            let data = await booksService.create(req.body)
            return res.send(data)
        } catch (error) {
            console.error(error)
        }
    }

    async edit(req, res, next) {
        try {
            let data = await booksService.edit(req.params.id, req.body)
            return res.send(data)
        } catch (error) { next(error) }
    }

    async delete(req, res, next) {
        try {
            await booksService.delete(req.params.id)
            return res.send("Successfully deleted")
        } catch (error) { next(error) }
    }
}
