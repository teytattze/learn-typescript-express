import { cleanEnv, port, str } from 'envalid';

export const validateEnv = () => {
	cleanEnv(process.env, {
		PORT: port(),
		MONGO_USER: str(),
		MONGO_PASSWORD: str(),
		MONGO_PATH: str(),
	});
};
