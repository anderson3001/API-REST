import { FastifyInstance } from "fastify";
import multer from 'fastify-multer'
import { register } from "./register";
import { authenticate } from "./authenticate";
import { get } from "./get";
import { deleteUser } from "./delete";
import { update } from "./update";
import { getAll } from "./get-all";
import { profile } from "./profile";
import { verifyJWT } from "../../middlewares/verify-jwt";
import { refresh } from "./refresh";
import { updatePhoto } from "./update-photo";

const upload = multer({ dest: './uploads' })

export function userRoutes(app: FastifyInstance) {
    app.post('/users', register)
    app.post('/authenticate', authenticate)

    app.get('/users/:userId', get)
    app.get('/users', getAll)

    app.delete('/users/:userId', { preHandler: [verifyJWT]}, deleteUser)//autenticado

    app.patch('/users/:userId', { preHandler: [verifyJWT]}, update) //autentifcado

    app.patch('/token/refresh', refresh)

    //autenitcados
    app.get('/profile',{ onRequest: [verifyJWT]}, profile)

    app.patch('/users/:userId/avatar', {preHandler: [verifyJWT, upload.single('photo')]}, updatePhoto)
}