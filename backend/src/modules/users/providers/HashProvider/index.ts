import { BCryptHashProvider } from "./implementations/BCryptHashProvider";
export { HashProvider } from "./models";

export const hashProviders = {
    bcrypt: BCryptHashProvider,
};
