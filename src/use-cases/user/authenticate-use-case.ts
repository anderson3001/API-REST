import { compare, hash } from "bcryptjs"
import { UsersRepository } from "../../repositories/users-repostory"
import { UserAlreadyExists } from "../@errors/user-already-exists-error"
import { User } from "@prisma/client"
import { InvalidCredentialsError } from "../@errors/invalid-credentials-error"

interface AuthenticateUseCaseRequest {
    email: string
    password: string   
}
interface AuthenticateUseCaseResponse {
    user: User
}

export class AuthenticateUseCase{

    constructor(private usersRepository: UsersRepository) {}

    async execute({email, password}: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse>{
        const user = await this.usersRepository.findByEmail(email)
    
        if (!user) {
            throw new InvalidCredentialsError()
        }

        const doesPasswordMatches = await compare(password, user.password)
        
        if (!doesPasswordMatches) {
            throw new InvalidCredentialsError()
        }
    
        return { user }
    }

    
    
}