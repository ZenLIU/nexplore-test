import { Pool } from 'pg';
import { config } from './configuration/config';

export class DBClient {
	private static pool: Pool;
	private constructor() {} //prevent create an object

	public static getPool(): Pool {
		if (DBClient.pool == null) {
			DBClient.pool = new Pool({
				host: config.db_host,
				user: config.db_username,
				password: config.db_pw,
				port: config.db_port,
				database: config.db_name,
				max: 5,
				idleTimeoutMillis: 30000,
				connectionTimeoutMillis: 2000,
			});

			// DBClient.pool.on('error', function (err) {
			// 	//log stuff maybe
			// 	console.error('error occur in getPool()');
			// 	console.error(err);
			// });
		}
		return DBClient.pool;
	}
}
