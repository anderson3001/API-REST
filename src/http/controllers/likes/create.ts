import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { PrismaLikesRepository } from "../../../repositories/prisma/prisma-likes-repository"
import { CreateLikeUseCase } from "../../../use-cases/likes/create-like-use-case"
import { ResourceNotFoundError } from "../../../use-cases/@errors/resource-not-found-error"

export async function create(request: FastifyRequest,reply: FastifyReply) {
    const createBodySchema = z.object({
        postId: z.string().optional(),
        commentId: z.string().optional()
    })

    const {postId, commentId } = createBodySchema.parse(request.body)

    const userId = request.user.sub

    try {
        const prismaLikesRepository = new PrismaLikesRepository()

        const existingLike = await prismaLikesRepository.findByUserAndTarget({
            userId,
            postId,
            commentId
        })

        if (existingLike) {
            return reply.status(400).send({
                message: "Você já curtiu esse post ou comentário."
            })
        }

        const createLikeUseCase = new CreateLikeUseCase(prismaLikesRepository)

        if (!postId && !commentId) {
            throw new Error("O like deve estar associado a um post ou a um comentário.");
        }
        if (postId && commentId) {
        throw new Error("O like não pode estar associado a um post e um comentário ao mesmo tempo.");
        }

        const { like } = await createLikeUseCase.execute({
            userId,
            postId,
            commentId
        })
        return reply.status(201).send(like)
    } catch (err) {
        if (err instanceof ResourceNotFoundError){
                return reply.status(404).send({message: err.message})
            }
        throw err
    }


}