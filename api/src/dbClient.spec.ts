import { DBClient } from './dbClient';
import { Pool } from 'pg';

jest.mock('pg', () => {
	const mPool = {
		connect: function () {
			return { query: jest.fn() };
		},
		query: jest.fn(),
		end: jest.fn(),
		on: jest.fn(),
	};
	return { Pool: jest.fn(() => mPool) };
});

// jest.mock('pg', () => {
// 	return {
// 		Pool: jest.fn().mockImplementation(() => {
// 			return {};
// 		}),
// 	};
// });

const mockedPool = jest.mocked(Pool, { shallow: true });

beforeEach(() => {
	mockedPool.mockClear();
});
// beforeEach(() => {
// 	// Clear all instances and calls to constructor and all methods:
// 	Pool.mockClear();
// });

it('check getPool() invole new Pool()', () => {
	const pool = DBClient.getPool();
	expect(Pool).toHaveBeenCalledTimes(1);

	//check only create one Pool object for multiple calls
	const pool2 = DBClient.getPool();
	expect(Pool).toHaveBeenCalledTimes(1);
});
