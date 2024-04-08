import { Client, Result } from 'ts-postgres';
import { DBClient } from './dbClient';
import { DutyListItem } from './iDutyListItem';
import type { Pool, QueryResult } from 'pg';

export class DutyService {
	constructor() {}

	public static async getListItems(): Promise<DutyListItem[]> {
		let items: DutyListItem[] = new Array();

		try {
			const client: Pool = DBClient.getPool();

			const result: QueryResult<DutyListItem> =
				await client.query<DutyListItem>(
					'SELECT id,name FROM duty_list order by create_date',
				);
			items = result.rows;
		} catch (e) {
			console.log('catch in getListItems()');
			console.error(e);
			throw e;
		}
		return items;
	}

	public static async addListItem(name: string): Promise<boolean> {
		try {
			const client: Pool = DBClient.getPool();

			const query = {
				text: 'INSERT INTO duty_list (name) VALUES ($1)',
				values: [name],
			};

			const res = await client.query(query);

			console.log(res.rowCount);
			console.log(res.rows);

			return res.rowCount != null && res.rowCount > 0;
		} catch (e) {
			console.log('catch in addListItem()');
			console.error(e);
			throw e;
		}
	}

	public static async updateListItem(
		id: string,
		name: string,
	): Promise<boolean> {
		try {
			const client: Pool = DBClient.getPool();

			const query = {
				text: 'UPDATE duty_list SET name = $1 WHERE id = $2',
				values: [name, id],
			};

			const res = await client.query(query);

			console.log(res.rowCount);
			console.log(res.rows);

			return res.rowCount != null && res.rowCount > 0;
		} catch (e) {
			console.log('catch in addListItem()');
			console.error(e);
			throw e;
		}
	}

	public static async deleteListItem(id: string): Promise<boolean> {
		try {
			const client: Pool = DBClient.getPool();

			const query = {
				text: 'DELETE from duty_list WHERE id = $1',
				values: [id],
			};

			const res = await client.query(query);

			console.log(res.rowCount);
			console.log(res.rows);

			return res.rowCount != null && res.rowCount > 0;
		} catch (e) {
			console.log('catch in deleteListItem()');
			console.error(e);
			throw e;
		}
	}
}
