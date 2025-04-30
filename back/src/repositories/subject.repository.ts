import pool from '../config/db';
import { Subject } from '../models/subject.model';
import { SubjectCreateDTO } from '../models/subject.model';
import { SubjectUpdateDTO } from '../models/subject.model';
import { SubjectListDTO } from '../models/subject.model';



export default class SubjectRepository {
    async createSubject(subjectData: SubjectCreateDTO): Promise<Subject> {
        const [result] = await pool.query(
            'INSERT INTO subjects (name, description, image_link) VALUES (?, ?, ?)',
            [subjectData.name, subjectData.description, subjectData.image_link]
        );

        const createdSubject = await this.getSubjectById((result as any).insertId);
        if (!createdSubject) {
            throw new Error('Subject not found after creation');
        }
        return createdSubject;
    }

    async updateSubject(subjectId: number, subjectData: SubjectUpdateDTO): Promise<Subject> {
        const [result] = await pool.query(
            'UPDATE subjects SET name = ?, description = ?, image_link = ? WHERE id = ?',
            [subjectData.name, subjectData.description, subjectData.image_link, subjectId]
        );

        if ((result as any).affectedRows === 0) {
            throw new Error('Subject not found');
        }

        const updatedSubject = await this.getSubjectById(subjectId);
        if (!updatedSubject) {
            throw new Error('Subject not found after update');
        }

        return updatedSubject;
    }


    async getSubjectById(subjectId: number): Promise<Subject | null> {
        const [rows] = await pool.query(
            'SELECT * FROM subjects WHERE id = ?',
            [subjectId]
        );
        return (rows as Subject[])[0] || null;
    }

    async deleteSubject(subjectId: number): Promise<void> {
        const [result] = await pool.query(
            'DELETE FROM subjects WHERE id = ?',
            [subjectId]
        );
        if ((result as any).affectedRows === 0) {
            throw new Error('Subject not found');
        }
    }

    async getAllSubjects(): Promise<SubjectListDTO> {
        const [rows] = await pool.query(
            'SELECT * FROM subjects'
        );
        return { subjects: rows as Subject[] };
    }

    async getSubjectsByUserId(userId: number): Promise<SubjectListDTO> {
        const [rows] = await pool.query(
            'SELECT * FROM subjects WHERE user_id = ?',
            [userId]
        );
        return { subjects: rows as Subject[] };
    }


    async getSubjectsByChatId(chatId: number): Promise<SubjectListDTO> {
        const [rows] = await pool.query(
            'SELECT * FROM subjects WHERE chat_id = ?',
            [chatId]
        );
        return { subjects: rows as Subject[] };
    }

    

}