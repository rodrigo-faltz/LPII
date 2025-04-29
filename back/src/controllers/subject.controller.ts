import {Request, Response} from 'express';
import {AppError} from '../types/custom-error';
import {CustomRequest} from '../types/types';
import {SubjectCreateDTO, SubjectUpdateDTO} from '../models/subject.model';
import SubjectService from '../services/subject.service';
import {SubjectListDTO} from '../models/subject.model';
import {SubjectDeleteDTO} from '../models/subject.model';

import { Subject } from '../models/subject.model';

export default class SubjectController {
    private subjectService = new SubjectService();

    async createSubject(req: CustomRequest, res: Response) {
        try {
            const subjectData: SubjectCreateDTO = req.body;
            const newSubject = await this.subjectService.createSubject(subjectData);
            res.status(201).json(newSubject);
        } catch (error) {
            if (error instanceof AppError) {
                res.status(error.statusCode).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Internal server error' });
            }
        }
    }

    async getSubjectById(req: CustomRequest, res: Response) {
        try {
            const subjectId = parseInt(req.params.id, 10);
            const subject = await this.subjectService.getSubjectById(subjectId);
            res.json(subject);
        } catch (error) {
            if (error instanceof AppError) {
                res.status(error.statusCode).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Internal server error' });
            }
        }
    }

    async updateSubject(req: CustomRequest, res: Response) {
        try {
            const subjectId = parseInt(req.params.id, 10);
            const subjectData: SubjectUpdateDTO = req.body;
            const updatedSubject = await this.subjectService.updateSubject(subjectId, subjectData);
            res.json(updatedSubject);
        } catch (error) {
            if (error instanceof AppError) {
                res.status(error.statusCode).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Internal server error' });
            }
        }
    }

    async deleteSubject(req: CustomRequest, res: Response) {
        try {
            const subjectId = parseInt(req.params.id, 10);
            await this.subjectService.deleteSubject(subjectId);
            res.status(204).send();
        } catch (error) {
            if (error instanceof AppError) {
                res.status(error.statusCode).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Internal server error' });
            }
        }
    }

    async getAllSubjects(req: CustomRequest, res: Response) {
        try {
            const subjects = await this.subjectService.getAllSubjects();
            res.json(subjects);
        } catch (error) {
            if (error instanceof AppError) {
                res.status(error.statusCode).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Internal server error' });
            }
        }
    }

    async getSubjectsByUserId(req: CustomRequest, res: Response) {
        try {
            const userId = parseInt(req.params.userId, 10);
            const subjects = await this.subjectService.getSubjectsByUserId(userId);
            res.json(subjects);
        } catch (error) {
            if (error instanceof AppError) {
                res.status(error.statusCode).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Internal server error' });
            }
        }
    }

    async getSubjectsByChatId(req: CustomRequest, res: Response) {
        try {
            const chatId = parseInt(req.params.chatId, 10);
            const subjects = await this.subjectService.getSubjectsByChatId(chatId);
            res.json(subjects);
        } catch (error) {
            if (error instanceof AppError) {
                res.status(error.statusCode).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Internal server error' });
            }
        }
    }
    
}
