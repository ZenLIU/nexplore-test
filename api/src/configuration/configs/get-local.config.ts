import { Config, ProcessVariables } from '../config.type';

export function getLocalConfig(processVariables: ProcessVariables): Config {
	return {
		environment: 'local',
		port: 1234,
		version: 'v1',
		db_host: 'localhost',
		db_port: 5432,
		db_username: 'postgres',
		db_pw: 'password',
		db_name: 'nexplore_test',
	};
}
