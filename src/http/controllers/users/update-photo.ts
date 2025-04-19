import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { PrismaUsersRepository } from "../../../repositories/prisma/prisma-users-repository"
import { ResourceNotFoundError } from "../../../use-cases/@errors/resource-not-found-error"
import { UpdateUserUseCase } from "../../../use-cases/user/update-user-use-case"
import { UploadService } from "../../../services/upload-photo"
import { MultipartFile } from "@fastify/multipart"

export async function updatePhoto(request: FastifyRequest,reply: FastifyReply) {
    const updateParamsSchema = z.object({
        userId: z.string().uuid()
    })


    const { userId } = updateParamsSchema.parse(request.params)

    const authenticatedUserId = request.user.sub

    if (authenticatedUserId !== userId) {
        return reply.status(403).send({ message: "Você não tem permissão para atualizar este usuário." });
    }

    

    const file = (request as any).file;
    if (!file) {
        return reply.status(400).send({
            message: "Nenhuma imagem foi enviada.",
        })
    }
    const avatar = file.filename 
    

    try { 
        const prismaUserRepository = new PrismaUsersRepository()
        const updateUserUseCase = new UpdateUserUseCase(prismaUserRepository)

        const user = await prismaUserRepository.findById(userId)

        if (!user) {
        throw new ResourceNotFoundError()
        }

        if (user.photo) {
        UploadService.deleteImage(user.photo)
        }
        const updatedUser = await updateUserUseCase.execute({
            userId,
            data: { photo: avatar },
        })

        return reply.status(200).send({ updatedUser })

    } catch (err) {
        if (err instanceof ResourceNotFoundError){
            return reply.status(404).send({message: err.message})
        }
        return reply.status(500).send({message:"deu ruim"})
    }
}