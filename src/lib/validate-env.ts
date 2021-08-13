import { cleanEnv, port, str, host } from 'envalid';

export const validateEnv = () => {
  cleanEnv(process.env, {
    HOST: host(),
    PORT: port(),
    MONGO_USER: str(),
    MONGO_PASSWORD: str(),
    MONGO_PATH: str(),
  });
};
