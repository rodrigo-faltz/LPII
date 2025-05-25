import {Request, Response} from 'express';
import {AppError} from '../types/custom-error';
import {CustomRequest} from '../types/types';
import {SubjectCreateDTO, SubjectUpdateDTO} from '../models/subject.model';
import SubjectService from '../services/subject.service';


export default class SubjectController {
    constructor(private subjectService: SubjectService) {}

    async createSubject(req: CustomRequest, res: Response) {
        try {
            const subjectData: SubjectCreateDTO = req.body;
            const newSubject = await this.subjectService.createSubject(subjectData);
            res.status(201).json(newSubject);
        } catch (error) {
            if (error instanceof AppError) {
                res.status(error.statusCode).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Erro interno do servidor: createSubject' });
            }
        }
    }

    async getSubjectById(req: CustomRequest, res: Response) {
        try {
            const subjectId = parseInt(req.params.id, 10);
            if (isNaN(subjectId)) {
                return res.status(400).json({ message: 'Invalid subject ID' });
            }
            const subject = await this.subjectService.getSubjectById(subjectId);
            res.json(subject);
        } catch (error) {
            if (error instanceof AppError) {
                res.status(error.statusCode).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Erro interno do servidor: getSubjectById' });
            }
        }
    }

    async updateSubject(req: CustomRequest, res: Response) {
        try {
            const subjectId = parseInt(req.params.id, 10);
            console.log('Subject ID:', subjectId); // Debugging line
            const subjectData: SubjectUpdateDTO = req.body;
            console.log('Subject Data:', subjectData); // Debugging line
            const updatedSubject = await this.subjectService.updateSubject(subjectId, subjectData);
            if (!updatedSubject) {
                return res.status(404).json({ message: 'Subject not found' });
            }
            res.json(updatedSubject);
        } catch (error) {
            if (error instanceof AppError) {
                res.status(error.statusCode).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Erro interno do servidor: updateSubject' });
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
                res.status(500).json({ message: 'Erro interno do servidor: deleteSubject' });
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
                res.status(500).json({ message: 'Erro interno do servidor: getAllSubjects' });
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
                res.status(500).json({ message: 'Erro interno do servidor: getSubjectsByUserId' });
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
                res.status(500).json({ message: 'Erro interno do servidor: getSubjectsByChatId' });
            }
        }
    }
    
}
