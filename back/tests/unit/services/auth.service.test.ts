import AuthService from '../../../src/services/auth.service';
import UserRepository from '../../../src/repositories/user.repository';
import { hashPassword } from '../../../src/utils/bcrypt';
import { jest } from '@jest/globals';
import { beforeEach, describe, expect, it } from '@jest/globals';
import {mocked} from 'jest-mock';
import { date } from 'joi';


// Create typed mocks
jest.mock('../../../src/repositories/user.repository');
jest.mock('../../../src/utils/bcrypt');

const mockUserRepository = UserRepository as jest.MockedClass<typeof UserRepository>;
const mockHashPassword = hashPassword as jest.MockedFunction<typeof hashPassword>;

describe('AuthService Unit Tests', () => {
  let authService: AuthService;
  
  const mockUser = {
    id: 1,
    username: 'testuser',
    password_hash: 'hashed_password',
    email: 'test@example.com',
    created_at: '2023-10-01T00:00:00Z' as unknown as Date // Mocked date
  };

  beforeEach(() => {
    authService = new AuthService();
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should register a new user', async () => {
      // Setup mocks with proper typing
      
      mockUserRepository.prototype.create.mockResolvedValue(mockUser);
      mockHashPassword.mockResolvedValue('hashed_password');

      // Test execution
      const result = await authService.register({
        username: 'testuser',
        password: 'Test@123',
        email: 'test@example.com'
      });

      // Assertions
      expect(result).toEqual(mockUser);
      expect(mockUserRepository.prototype.create).toHaveBeenCalledWith({
        username: 'testuser',
        password: 'hashed_password',
        email: 'test@example.com'
      });
      expect(mockHashPassword).toHaveBeenCalledWith('Test@123');
    });
  });
});