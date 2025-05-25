export interface Message
{
    id: number;
    content: string;
    chat_id: number;
    author_id: number;
    created_at: Date;
}

export interface MessageCreateDTO
{
    content: string;
    chat_id: number;
    author_id: number;
}

export interface MessageUpdateDTO
{
    content: string;
    chat_id: number;
    author_id: number;
}

export interface MessageDeleteDTO
{
    id: number;
}

export interface MesssageGetByChatIdDTO
{
    chat_id: number;
}

export interface MessageGetTopByChatIdDTO{
    chat_id: number;
}
