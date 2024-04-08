import http from 'http';
import { config } from './configuration/config';
import {
	getDutyListItems,
	addDutyListItem,
	updateDutyListItem,
	deleteDutyListItem,
} from './controller';

const myServer = http.createServer((req, res) => {
	// Get list items
	if (
		req.method == 'GET' &&
		req.url == '/' + config.version + '/duty-list/items'
	) {
		return getDutyListItems(req, res);
	}

	// Creating item
	if (
		req.method == 'POST' &&
		req.url == '/' + config.version + '/duty-list/items'
	) {
		return addDutyListItem(req, res);
	}

	// Updating an item
	if (
		req.method == 'PUT' &&
		req.url != null &&
		req.url.indexOf('/' + config.version + '/duty-list/items') >= 0
	) {
		return updateDutyListItem(
			req,
			res,
			'/' + config.version + '/duty-list/items/',
		);
	}

	// Deleting an item
	if (
		req.method == 'DELETE' &&
		req.url != null &&
		req.url.indexOf('/' + config.version + '/duty-list/items') >= 0
	) {
		return deleteDutyListItem(
			req,
			res,
			'/' + config.version + '/duty-list/items/',
		);
	}

	//for preflight
	if (req.method == 'OPTIONS') {
		res.writeHead(200, {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': 'http://localhost:8080',
			'Access-Control-Allow-Methods': '*',
			'Access-Control-Allow-Headers': 'Content-Type',
		});
		res.end();
		return;
	}

	//not found
	res.writeHead(404, {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': 'http://localhost:8080',
		'Access-Control-Allow-Methods': '*',
	});
	res.end('resource not found.');
});

myServer.listen(config.port, () => {
	console.log(
		`Server is running on port ${config.port}. Go to http://localhost:${config.port}/`,
	);
});

// myServer.close();
