// CORRECT DECLARATION
import { User } from '../models/user.model';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        username: string;
      };
    }
  }
}