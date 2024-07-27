import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { JwtProvider, jwtProviders } from "../providers/JwtProvider";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    private jwtProvider: JwtProvider;

    constructor() {
        this.jwtProvider = new jwtProviders[process.env.JWT_DRIVER]();
    }

    use(req: Request, res: Response, next: NextFunction) {
        const { Authorization } = req.cookies;

        const jwt = Authorization.split("Bearer ")[1];

        const claims = this.jwtProvider.decode(jwt);
        if (!claims) {
            throw new HttpException(
                "Você não está autenticado",
                HttpStatus.FORBIDDEN,
            );
        }

        // @ts-ignore
        req.userId = claims.sub;

        next();
    }
}
