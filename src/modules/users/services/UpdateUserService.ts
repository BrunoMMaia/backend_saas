import { injectable, inject } from 'tsyringe';
import IUsersRepository from '../repositories/IUsersRepository';
import User from '../infra/typeorm/entities/User';

import AppError from '../../../shared/errors/AppError';
// import IHashProvider from '../providers/HashProvider/models/IHashProviders';

interface IRequest {
    id: string;
    password?: string;
}

@injectable()
class UpdateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository, // @inject('HashProvider') // private hashProvider: IHashProvider,
    ) {}

    public async execute({ id, password }: IRequest): Promise<User> {
        const user = await this.usersRepository.findById(id);
        if (!user) {
            throw new AppError('User not found');
        }

        if (password) {
            // const hashedPassword = await this.hashProvider.generateHash(
            //     password,
            // );
            // user.password = hashedPassword;
            user.password = password;
        }

        await this.usersRepository.save(user);

        return user;
    }
}

export default UpdateUserService;
