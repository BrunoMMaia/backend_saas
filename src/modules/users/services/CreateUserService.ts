import { injectable, inject } from 'tsyringe';
// import { hash } from 'bcryptjs';
import AppError from '../../../shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

import User from '../infra/typeorm/entities/User';

import IHashProvider from '../providers/HashProvider/models/IHashProviders';

interface IRequest {
    id: string;
    name: string;
    email: string;
    password: string;
}

@injectable()
class CreateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}

    public async execute({
        id,
        name,
        email,
        password,
    }: IRequest): Promise<User> {
        const checkUserExists = await this.usersRepository.findByEmail(email);
        if (checkUserExists) {
            throw new AppError('E-mail address already taken');
        }

        const hashedPassword = await this.hashProvider.generateHash(password);


        const user = await this.usersRepository.create({
            id,
            name,
            email,
            password: hashedPassword,
        });

        const userReturn = {
            id: user.id,
            name: user.name,
            email: user.email,
            password: '',
            created_at: user.created_at,
            updated_at: user.updated_at,
        };

        return userReturn;
    }
}

export default CreateUserService;
