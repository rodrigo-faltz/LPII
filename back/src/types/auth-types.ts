// src/types/auth-types.ts
export interface AuthUser {
    id: number;
    username: string;
  }
  
  export interface AuthenticatedRequest extends Express.Request {
    authUser?: AuthUser;
  }