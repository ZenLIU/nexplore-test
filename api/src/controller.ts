import { DutyService } from './dutyService';
import { DutyListItem } from './iDutyListItem';
import { parse as uuidParse } from 'uuid';

// handle requests and reponses
import { ServerResponse, IncomingMessage } from 'http';

const getDutyListItems = async (req: IncomingMessage, res: ServerResponse) => {
	try {
		//get data from db
		const items: DutyListItem[] = await DutyService.getListItems();
		res.writeHead(200, { 'Content-Type': 'application/json' });
		res.write(JSON.stringify(items));
	} catch (e) {
		console.log('catch in getDutyListItems()');
		console.error(e);
		res.writeHead(500, { 'Content-Type': 'application/json' });
		res.write(JSON.stringify({ err_msg: 'Internal error' }));
	}
	res.end();
	return;
};

const addDutyListItem = async (req: IncomingMessage, res: ServerResponse) => {
	// Read the data from the request
	let data: string = '';
	req.on('data', (chunk) => {
		data += chunk.toString();
	});

	req.on('end', async () => {
		//add data to db
		try {
			const body = JSON.parse(data);
			// console.log(body.name);
			if (body.name != null && body.name != '') {
				try {
					await DutyService.addListItem(body.name);
					res.writeHead(200, { 'Content-Type': 'application/json' });
					res.write(JSON.stringify({ success: true, errMsg: '' }));
				} catch (addErr) {
					console.log('catch in addDutyListItem()');
					console.error(addErr);
					res.writeHead(500, { 'Content-Type': 'application/json' });
					res.write(
						JSON.stringify({ success: false, err_msg: 'Internal error' }),
					);
				}
			} else {
				throw new Error('Empty name');
			}
		} catch (err) {
			console.log('catch in addDutyListItem()');
			console.error(err);
			res.writeHead(403, { 'Content-Type': 'application/json' });
			res.write(JSON.stringify({ success: false, err_msg: 'Invalid input' }));
		}
		res.end();
	});

	return;
};

const updateDutyListItem = async (
	req: IncomingMessage,
	res: ServerResponse,
	path: string,
) => {
	const itemId = getItemIdFromPath(req, path);
	if (validateItemId(itemId, res)) {
		// Read the data from the request
		let data: string = '';
		req.on('data', (chunk) => {
			data += chunk.toString();
		});

		req.on('end', async () => {
			//update data in db
			try {
				const body = JSON.parse(data);
				// console.log(body.name);
				if (body.name != null && body.name != '') {
					try {
						if (await DutyService.updateListItem(itemId!, body.name)) {
							res.writeHead(200, { 'Content-Type': 'application/json' });
							res.write(JSON.stringify({ success: true, errMsg: '' }));
						} else {
							res.writeHead(200, { 'Content-Type': 'application/json' });
							res.write(
								JSON.stringify({ success: false, errMsg: 'Item id not found' }),
							);
						}
					} catch (addErr) {
						console.log('catch in updateDutyListItem()');
						console.error(addErr);
						res.writeHead(500, { 'Content-Type': 'application/json' });
						res.write(
							JSON.stringify({ success: false, err_msg: 'Internal error' }),
						);
					}
				} else {
					throw new Error('Empty name');
				}
			} catch (err) {
				console.log('catch in updateDutyListItem()');
				console.error(err);
				res.writeHead(403, { 'Content-Type': 'application/json' });
				res.write(JSON.stringify({ success: false, err_msg: 'Invalid input' }));
			}
			res.end();
		});
	}
	return;
};

const deleteDutyListItem = async (
	req: IncomingMessage,
	res: ServerResponse,
	path: string,
) => {
	//get params id
	const itemId = getItemIdFromPath(req, path);
	if (validateItemId(itemId, res)) {
		//delete data from db
		try {
			if (await DutyService.deleteListItem(itemId!)) {
				res.writeHead(200, { 'Content-Type': 'application/json' });
				res.write(JSON.stringify({ success: true, errMsg: '' }));
			} else {
				res.writeHead(200, { 'Content-Type': 'application/json' });
				res.write(
					JSON.stringify({ success: false, errMsg: 'Item id not found' }),
				);
			}
		} catch (err) {
			console.log('catch in deleteDutyListItem()');
			console.error(err);
			res.writeHead(500, { 'Content-Type': 'application/json' });
			res.write(JSON.stringify({ success: false, err_msg: 'Internal error' }));
		}
		res.end();
		return;
	}
};

const getItemIdFromPath = (
	req: IncomingMessage,
	path: string,
): string | undefined => {
	const itemId = req.url
		?.substring(req.url.indexOf(path) + path.length)
		.split('/')[0];

	return itemId;
};

const validateItemId = (
	itemId: string | undefined,
	res: ServerResponse,
): boolean => {
	if (itemId == null || itemId == '') {
		//invalid item id
		res.writeHead(403, { 'Content-Type': 'application/json' });
		res.write(JSON.stringify({ success: false, err_msg: 'Invalid input' }));
		res.end();
		return false;
	} else {
		try {
			uuidParse(itemId);
		} catch (err) {
			//invalid item id
			res.writeHead(403, { 'Content-Type': 'application/json' });
			res.write(
				JSON.stringify({
					success: false,
					err_msg: 'Item id is invalid format',
				}),
			);
			res.end();
			return false;
		}
	}
	return true;
};

export {
	getDutyListItems,
	addDutyListItem,
	updateDutyListItem,
	deleteDutyListItem,
};
