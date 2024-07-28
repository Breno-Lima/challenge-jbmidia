import {
    HttpException,
    HttpStatus,
    Injectable,
    NestMiddleware,
} from "@nestjs/common";
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

        if (!Authorization) {
            throw new HttpException(
                "Você não está autenticado",
                HttpStatus.FORBIDDEN,
            );
        }

        const jwt = Authorization.split("Bearer ")[1];
        console.log(jwt);

        const claims = this.jwtProvider.decode(jwt);
        if (!claims) {
            throw new HttpException(
                "Você não está autenticado",
                HttpStatus.FORBIDDEN,
            );
        }
        console.log(req.cookies);
        console.log(claims);
        req.userId = claims.sub;
        console.log(req.userId);
        next();
    }
}
