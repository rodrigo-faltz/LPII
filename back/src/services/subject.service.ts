import SubjectRepository from "../repositories/subject.repository";
import { SubjectCreateDTO, SubjectUpdateDTO, SubjectDeleteDTO, SubjectListDTO } from "../models/subject.model";

export default class SubjectService {

    constructor(private subjectRepo: SubjectRepository = new SubjectRepository()) {}

    async createSubject(subjectData: SubjectCreateDTO): Promise<SubjectCreateDTO> {
        return this.subjectRepo.createSubject(subjectData);
    }

    async updateSubject(subjectId: number, subjectData: SubjectUpdateDTO): Promise<SubjectUpdateDTO> {
        console.log('Passa no serviço', subjectId); // Debugging line
        return this.subjectRepo.updateSubject(subjectId, subjectData);
    }

    async deleteSubject(subjectId: number): Promise<void> {
        const subject = await this.subjectRepo.getSubjectById(subjectId);
        if (!subject) {
            throw new Error(`Subject with ID ${subjectId} not found`);
        }
        return this.subjectRepo.deleteSubject(subjectId);
    }

    async getSubjectById(subjectId: number): Promise<SubjectCreateDTO> {
        const subject = await this.subjectRepo.getSubjectById(subjectId);
        if (!subject) {
            throw new Error(`Subject with ID ${subjectId} not found`);
        }
        return subject;
    }

    async getAllSubjects(): Promise<SubjectListDTO> {
        return this.subjectRepo.getAllSubjects();
    }

    async getSubjectsByUserId(userId: number): Promise<SubjectListDTO> {
        return this.subjectRepo.getSubjectsByUserId(userId);
    }

    async getSubjectsByChatId(chatId: number): Promise<SubjectListDTO> {
        return this.subjectRepo.getSubjectsByChatId(chatId);
    }

}
