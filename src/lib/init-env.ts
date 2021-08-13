import * as dotenv from 'dotenv';

export type IEnvironment = 'default' | 'development' | 'test' | 'production';

export const initEnv = (environment: IEnvironment = 'default') =>
  dotenv.config({ path: pathMap[environment] });

const pathMap: Record<NonNullable<IEnvironment>, string> = {
  default: '.env',
  development: '.env.development',
  test: '.env.test',
  production: '.env.production',
};
