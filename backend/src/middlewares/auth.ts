import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Extender la interfaz Request para incluir `user`
declare module 'express-serve-static-core' {
    interface Request {
        user?: DecodedToken;
    }
}

interface DecodedToken {
    id: string;
    role: string;
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // Obtener token del header
    const token = req.header('x-auth-token');

    // Verificar si no hay token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // Verificar token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;
        req.user = decoded; // ✅ Ahora TypeScript reconocerá req.user sin errores
        next();
    } catch (err) {
        return res.status(401).json({ msg: 'The token is not valid' });
    }
};


