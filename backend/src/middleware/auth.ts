import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token no proporcionado' });
  try {
    const decoded = jwt.verify(token, 'secreto');
    (req as any).user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' });
  }
};