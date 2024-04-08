import { getConfig } from './configs/get-config';
import { ProcessVariables } from './config.type';

it('read configs', () => {
	const localVar: ProcessVariables = { ENV: 'local' };
	const localConfig = getConfig(localVar);
	expect(localConfig).toEqual({
		environment: 'local',
		port: 1234,
		version: 'v1',
		db_host: 'localhost',
		db_port: 5432,
		db_username: 'postgres',
		db_pw: 'password',
		db_name: 'nexplore_test',
	});

	const prodVar: ProcessVariables = { ENV: 'production' };
	const prodConfig = getConfig(prodVar);
	expect(prodConfig).toEqual({
		environment: 'production',
		port: 8080,
		version: 'v1',
		db_host: 'localhost',
		db_port: 5432,
		db_username: 'postgres',
		db_pw: 'password',
		db_name: 'nexplore_test',
	});
});
