import { Request, Response } from 'express';
import messageServices from '../services/messageServices.js';

export const createMessage = async (req: Request, res: Response) => {
    try {
        const message = await messageServices.createMessage(req.body);
        res.status(201).json(message);
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(400).json({ error: errorMessage });
    }
};

export const getMessages = async (req: Request, res: Response) => {
    try {
        const messages = await messageServices.getMessages();
        res.status(200).json(messages);
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(400).json({ error: errorMessage });
    }
};
