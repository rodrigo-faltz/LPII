import { QueryResult } from '@/config/db';
import {User} from '../models/user.model';
import {Request, Response} from 'express';

export interface CustomRequest extends Request {
  user?: any;
}
export interface CustomResponse extends Response {
  user?: any;
}

export interface CustomQuery extends QueryResult{
  rows: any;
} 