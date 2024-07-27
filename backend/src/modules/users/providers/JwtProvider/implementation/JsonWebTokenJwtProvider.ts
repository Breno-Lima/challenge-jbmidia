import { sign, verify } from "jsonwebtoken";
import type { JwtProvider, SignJwt } from "../models";

export default class JsonWebTokenJwtProvider implements JwtProvider {
    public decode(jwt: string): Record<string, any> {
        const claims = verify(jwt, process.env.JWT_SECRET);

        return claims;
    }

    public sign({ expiresIn = "24h", payload = {}, subject }: SignJwt): string {
        const jwt = sign(payload, process.env.JWT_SECRET!, {
            expiresIn,
            subject,
        });

        return jwt;
    }
}
