import { Config, ProcessVariables } from '../config.type';

export function getProductionConfig(
	processVariables: ProcessVariables,
): Config {
	return {
		environment: 'production',
		port: 8080,
		version: 'v1',
		db_host: 'localhost',
		db_port: 5432,
		db_username: 'postgres',
		db_pw: 'password',
		db_name: 'nexplore_test',
	};
}
