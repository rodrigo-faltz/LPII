export interface Subject {
    id: number;
    name: string;
    description: string;
}

export interface SubjectCreateDTO {
    name: string;
    description: string;
}

export interface SubjectUpdateDTO {
    name?: string;
    description?: string;
}

export interface SubjectDeleteDTO {
    id: number;
}

export interface SubjectListDTO {
    subjects: Subject[];
}


