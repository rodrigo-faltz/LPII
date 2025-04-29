//Chat has id, subject_id, message, user_id
//Message should be all the messages of the chat


export interface Chat {
    id: number;
    subject_id: number;
    user_id: number;
}

export interface ChatCreateDTO {
    user_id: number;
    subject_id: number;
}

export interface ChatUpdateDTO {
    id: number;
    message?: string;
    user_id?: number;
    subject_id?: number;  
}

export interface ChatResponseDTO {
    id: number;
    message: string;
    user_id: number;
    subject_id: number;
}
