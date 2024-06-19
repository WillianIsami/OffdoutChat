import { Request, Response } from 'express';
import authServices from '../services/authServices.js';

export const register = async (req: Request, res: Response) => {
    try {
        const user = await authServices.register(req.body);
        res.status(201).json(user);
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(400).json({ error: errorMessage });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const token = await authServices.login(req.body);
        res.status(200).json({ token });
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(400).json({ error: errorMessage });
    }
};
