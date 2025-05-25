import UserRepository from '../repositories/user.repository';
import { comparePasswords, hashPassword } from '../utils/bcrypt';
import { generateToken } from '../utils/jwt';
import { UserCreateDTO, UserLoginDTO } from '../models/user.model';
import{ MessageBus } from '../core/MessageBus';
import  {BARRAMENTO}  from '../app';

export default class AuthService {

  
  private userRepo = new UserRepository();

  async register(userData: UserCreateDTO) {
    // publish the user to RabbitMQ
    const user = {
      username: userData.username,
      email: userData.email,
      password: userData.password
    };
    await BARRAMENTO.publish('user.exchange', 'user.created', user);
    console.log('User published to RabbitMQ:', user);

    const hashedPassword = await hashPassword(userData.password);
    return this.userRepo.create({
      ...userData,
      password: hashedPassword
    });
  }

  async login(credentials: UserLoginDTO) {
    // publish the user to RabbitMQ
    const userlogin = {
      email: credentials.email,
      password: credentials.password
    };

    await BARRAMENTO.publish('user.exchange', 'user.login', userlogin);
    console.log('User login published to RabbitMQ:', userlogin);

    const user = await this.userRepo.findByEmail(credentials.email);
    if (!user || !(await comparePasswords(credentials.password, user.password_hash))) {
      throw new Error('Invalid credentials');
    }
    return generateToken(user);
  }

  async getUserProfile(userId: number) {

    // publish the user to RabbitMQ
    const userProfile = {
      userId: userId
    };

    await BARRAMENTO.publish('user.exchange', 'user.profile', userProfile);
    console.log('User profile published to RabbitMQ:', userProfile);
    const user = await this.userRepo.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return {
        id: user.id,
        username: user.username,
        email: user.email,
        created_at: user.created_at,
    } ;
  }
}