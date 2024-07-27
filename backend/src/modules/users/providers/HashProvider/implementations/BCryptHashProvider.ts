import { compare, hash } from "bcryptjs";
import type { HashProvider } from "../models";
import { Injectable } from "@nestjs/common";

@Injectable()
export class BCryptHashProvider implements HashProvider {
    public async compareHash(
        payload: string,
        hashed: string,
    ): Promise<boolean> {
        return compare(payload, hashed);
    }

    public async generateHash(payload: string): Promise<string> {
        return hash(payload, 8);
    }
}
