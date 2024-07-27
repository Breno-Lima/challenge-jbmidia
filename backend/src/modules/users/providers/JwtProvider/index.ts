import JsonWebTokenJwtProvider from "./implementation/JsonWebTokenJwtProvider";

export * from "./models";

export const jwtProviders = {
    jsonwebtoken: JsonWebTokenJwtProvider,
};
