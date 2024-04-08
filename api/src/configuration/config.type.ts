export type Environment =
	// The service running in a production cluster available for customers
	| 'production'
	// The service running locally on a development machine
	| 'local';

export interface Config {
	environment: Environment;
	port: number;
	version: string;
	db_host: string;
	db_port: number;
	db_username: string;
	db_pw: string;
	db_name: string;
}

export interface ProcessVariables {
	ENV?: Environment;
}
