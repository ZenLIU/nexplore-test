import { DutyService } from './dutyService';
import { DBClient } from './dbClient';
import { Pool, QueryResult } from 'pg';
import { DutyListItem } from './iDutyListItem';

// const mockedPool = jest.mocked(Pool, { shallow: true });

// beforeEach(() => {
// 	mockedPool.mockClear();
// });

jest.mock('pg', () => {
	const mPool = {
		connect: jest.fn(),
		query: jest
			.fn()
			.mockImplementationOnce(() => {
				const items: DutyListItem[] = [
					{ id: '1', name: 'test1' },
					{ id: '2', name: 'test2' },
				];
				var obj = { rows: items };
				return obj;
			})
			.mockImplementationOnce(() => {
				throw new Error('query error');
			})
			.mockImplementationOnce(() => {
				return { rowCount: 1 };
			})
			.mockImplementationOnce(() => {
				throw new Error('query error');
			})
			.mockImplementationOnce(() => {
				return { rowCount: 1 };
			})
			.mockImplementationOnce(() => {
				throw new Error('query error');
			})
			.mockImplementationOnce(() => {
				return { rowCount: 1 };
			})
			.mockImplementationOnce(() => {
				throw new Error('query error');
			}),
		end: jest.fn(),
		on: jest.fn(),
	};
	return { Pool: jest.fn(() => mPool) };
});

it('get items', async () => {
	const result = await DutyService.getListItems();
	console.log(result);
	expect(result.length).toBeGreaterThan(0);
});

it('get items with error', async () => {
	expect(async () => {
		await DutyService.getListItems();
	}).rejects.toThrow('query error');
});

it('add items', async () => {
	const result = await DutyService.addListItem('test');
	expect(result).toBeTruthy();
});

it('add items with error', async () => {
	expect(async () => {
		await DutyService.addListItem('test-error');
	}).rejects.toThrow('query error');
});

it('update items', async () => {
	const result = await DutyService.updateListItem('uuid', 'test');
	expect(result).toBeTruthy();
});

it('update items with error', async () => {
	expect(async () => {
		await DutyService.updateListItem('uuid', 'test-error');
	}).rejects.toThrow('query error');
});

it('delete items', async () => {
	const result = await DutyService.deleteListItem('uuid');
	expect(result).toBeTruthy();
});

it('delete items with error', async () => {
	expect(async () => {
		await DutyService.deleteListItem('uuid');
	}).rejects.toThrow('query error');
});
