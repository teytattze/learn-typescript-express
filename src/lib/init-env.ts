import * as dotenv from 'dotenv';

export type IEnvironment = 'development' | 'test' | 'production';

export const initEnv = (environment: IEnvironment) => dotenv.config({ path: pathMap[environment] });

const pathMap: Record<NonNullable<IEnvironment>, string> = {
	development: '.env.development',
	test: '.env.test',
	production: '.env.production',
};
