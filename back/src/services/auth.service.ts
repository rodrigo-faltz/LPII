import UserRepository from '../repositories/user.repository';
import { comparePasswords, hashPassword } from '../utils/bcrypt';
import { generateToken } from '../utils/jwt';
import { UserCreateDTO, UserLoginDTO } from '../models/user.model';


export default class AuthService {
  private userRepo = new UserRepository();

  async register(userData: UserCreateDTO) {
    const hashedPassword = await hashPassword(userData.password);
    return this.userRepo.create({
      ...userData,
      password: hashedPassword
    });
  }

  async login(credentials: UserLoginDTO) {
    const user = await this.userRepo.findByEmail(credentials.email);
    if (!user || !(await comparePasswords(credentials.password, user.password_hash))) {
      throw new Error('Invalid credentials');
    }
    return generateToken(user);
  }

  async getUserProfile(userId: number) {
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