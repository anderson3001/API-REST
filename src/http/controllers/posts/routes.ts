import { FastifyInstance } from "fastify";
import { create } from "./create";
import { get } from "./get";
import { deletePost } from "./delete";
import { update } from "./update";
import { getAll } from "./get-all";
import { getByUser } from "./get-by-user";
import { verifyJWT } from "../../middlewares/verify-jwt";
import multer from 'fastify-multer'

const upload = multer({ dest: 'uploads/posts' })

export function postsRoutes(app: FastifyInstance) {
    app.post('/posts', { preHandler: [verifyJWT, upload.single('photo')]}, create)//autentificado

    app.get('/posts/:postId', get)
    app.get('/posts', getAll)
    app.get('/posts/user/:userId', getByUser)

    app.delete('/posts/:postId', { preHandler: [verifyJWT]}, deletePost)//antentifcado

    app.patch('/posts/:postId', { preHandler: [verifyJWT]}, update)//autentificado
}