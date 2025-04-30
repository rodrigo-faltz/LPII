export interface Subject {
    id: number;
    name: string;
    description: string;
    image_link: string;
}

export interface SubjectCreateDTO {
    name: string;
    description: string;
    image_link?: string;  
}

export interface SubjectUpdateDTO {
    id: number;
    name?: string;
    description?: string;
    image_link?: string;
}

export interface SubjectDeleteDTO {
    id: number;
}

export interface SubjectListDTO {
    subjects: Subject[];
}


