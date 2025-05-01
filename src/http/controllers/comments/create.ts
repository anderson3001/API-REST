import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { PrismaCommentsRepository } from "../../../repositories/prisma/prisma-comments-repository"
import { CreateCommentUseCase } from "../../../use-cases/comments/create-comment-use-case"
import { prisma } from "../../../lib/prisma"
import { ResourceNotFoundError } from "../../../use-cases/@errors/resource-not-found-error"

export async function create(request: FastifyRequest,reply: FastifyReply) {
    const createBodySchema = z.object({
        content: z.string(),
        postId: z.string().uuid(),
    })

    const { content, postId } = createBodySchema.parse(request.body)

    const userId = request.user.sub

    try {
        
    // Verifica se o post existe
    const postExists = await prisma.post.findUnique({
        where: { id: postId },
        select: { id: true },
      })
  
      if (!postExists) {
        return reply.status(404).send("Post não encontrado!")
      }
        const prismaCommentsRepository = new PrismaCommentsRepository()
        const createCommentUseCase = new CreateCommentUseCase(prismaCommentsRepository)

        await createCommentUseCase.execute({
            content,
            userId,
            postId
        })

        
    } catch (err) {
        throw err
    }

    return reply.status(201).send("Comentário criado com sucesso!")
}