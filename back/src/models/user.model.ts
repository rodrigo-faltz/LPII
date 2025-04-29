export interface User {
    id: number;
    username: string;
    password_hash: string;
    email: string;
    created_at: Date;
  }
  
  export interface UserCreateDTO {
    username: string;
    password: string;
    email: string;
  }
  
  export interface UserLoginDTO {
    email: string;
    password: string;
  }