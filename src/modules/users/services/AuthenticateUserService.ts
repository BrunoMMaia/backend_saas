import { inject, injectable } from 'tsyringe';

//import CustomerUser from '@modules/customers/infra/typeorm/entities/CustomerUser';
// import IPartnerUsersRepository from '@modules/partners/repositories/IPartnerUsersRepository';
// import ICustomerUsersRepository from '@modules/customers/repositories/ICustomerUsersRepository';


import { sign } from 'jsonwebtoken';
import authConfig from '../../../config/auth';
import User from '../infra/typeorm/entities/User';
import AppError from '../../../shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProviders';


interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  //customerUser?: CustomerUser;
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    // @inject('CustomerUsersRepository')
    // private customerUsersRepository: ICustomerUsersRepository,

    // @inject('PartnerUsersRepository')
    // private partnerUsersRepository: IPartnerUsersRepository,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordMatched = await this.hashProvider.comparaHash(
      password,
      user.password,
    );

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    // if (
    //   !user.groups.find(
    //     g =>
    //       g.name === 'Administrator' ||
    //       g.name === 'Partner' ||
    //       g.name === 'Customer',
    //   )
    // ) {
    //   throw new AppError('Incorrect email/password combination.', 401);
    // }

    // const customerUser = await this.customerUsersRepository.findByUserId(
    //   user.id,
    // );

    // const partnerUser = await this.partnerUsersRepository.findByUserId(user.id);

    // if (
    //   customerUser &&
    //   !customerUser?.customerGroups.find(
    //     cg =>
    //       cg.name === 'DPO' ||
    //       cg.name === 'DPL' ||
    //       cg.name === 'Responsable Directorate' ||
    //       cg.name === 'Responsable Department' ||
    //       cg.name === 'Responsable Process',
    //   )
    // ) {
    //   throw new AppError('Incorrect email/password combination.', 401);
    // }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign(
      {

      },
      secret,
      {
        subject: user.id,
        expiresIn,
      },
    );

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
