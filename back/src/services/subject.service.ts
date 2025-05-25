import SubjectRepository from "../repositories/subject.repository";
import { SubjectCreateDTO, SubjectUpdateDTO, SubjectDeleteDTO, SubjectListDTO } from "../models/subject.model";
import { MessageBus } from "../core/MessageBus";

export default class SubjectService {

    constructor(private subjectRepo: SubjectRepository = new SubjectRepository(), private messageBus: MessageBus) {}

    async createSubject(subjectData: SubjectCreateDTO): Promise<SubjectCreateDTO> {
        const subject = await this.subjectRepo.createSubject(subjectData);
        await this.messageBus.publish('subject.exchange', 'subject.created', subject);
        console.log('Subject created published to RabbitMQ:', subject);
        return subject;
    }

    async updateSubject(subjectId: number, subjectData: SubjectUpdateDTO): Promise<SubjectUpdateDTO> {
        console.log('Passa no serviço', subjectId); // Debugging line
        const subject = await this.subjectRepo.updateSubject(subjectId, subjectData);
        await this.messageBus.publish('subject.exchange', 'subject.updated', subject);
        console.log('Subject updated published to RabbitMQ:', subject);
        return subject;
    }

    async deleteSubject(subjectId: number): Promise<void> {
        const subject = await this.subjectRepo.getSubjectById(subjectId);
        if (!subject) {
            throw new Error(`Subject with ID ${subjectId} not found`);
        }
        await this.subjectRepo.deleteSubject(subjectId);
        await this.messageBus.publish('subject.exchange', 'subject.deleted', subject);
        console.log('Subject deleted published to RabbitMQ:', subject);
    }

    async getSubjectById(subjectId: number): Promise<SubjectCreateDTO> {
        //publish the subject to RabbitMQ
        const subjecta = {
            subjectId: subjectId
        };


        const subject = await this.subjectRepo.getSubjectById(subjectId);
        if (!subject) {
            throw new Error(`Subject with ID ${subjectId} not found`);
        }

        await this.messageBus.publish('subject.exchange', 'subject.retrieved', subjecta);
        console.log('Subject retrieved published to RabbitMQ:', subjecta);
        return subject;
    }

    async getAllSubjects(): Promise<SubjectListDTO> {

        const subjects = await this.subjectRepo.getAllSubjects();
        if (!subjects) {
            throw new Error(`No subjects found`);
        }
        //publish the subject to RabbitMQ
        const subject = {
            allSubjects: true
        };

        await this.messageBus.publish('subject.exchange', 'subject.retrieved', subject);
        console.log('Subject retrieved published to RabbitMQ:', subject);
        return subjects;
    }

    async getSubjectsByUserId(userId: number): Promise<SubjectListDTO> {
        const subjects = await this.subjectRepo.getSubjectsByUserId(userId);
        if (!subjects) {
            throw new Error(`No subjects found for user ID ${userId}`);
        }
        //publish the subject to RabbitMQ
        const subject = {
            userId: userId
        };
        await this.messageBus.publish('subject.exchange', 'subject.retrieved', subject);
        console.log('Subject retrieved published to RabbitMQ:', subject);
        return subjects;
    }

    async getSubjectsByChatId(chatId: number): Promise<SubjectListDTO> {
        const subjects = await this.subjectRepo.getSubjectsByChatId(chatId);
        if (!subjects) {
            throw new Error(`No subjects found for chat ID ${chatId}`);
        }
        //publish the subject to RabbitMQ
        const subject = {
            chatId: chatId
        };
        await this.messageBus.publish('subject.exchange', 'subject.retrieved', subject);
        console.log('Subject retrieved published to RabbitMQ:', subject);
        return subjects;
    }

}
