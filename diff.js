/*jslint esversion: 6, node: true */
'use strict';

let fs = require('fs');
let PNG = require('pngjs').PNG;
let request = require('request');

let r = require('./r');
let board = require('./board');


let targetBitmap;

exports.findDiffPixel = function(callback) {
	getTargetBitmap(function(bitmap) {
		targetBitmap = bitmap;
		findDiffPixel2(callback);
	});	
};

function findDiffPixel2(callback) {
	getBoardBitmap(function(bitmap) {
		let boardBitmap = bitmap;
		findDiffPixelInBmps(boardBitmap, targetBitmap, callback);
	});
}

function getTargetBitmap(callback) {
	let targetWriter = fs.createWriteStream('target.png');
	
	targetWriter.on('finish', function() {
		fs.createReadStream('target.png')
		.pipe(new PNG())
		.on('parsed', function() {
			let bitmap = PNG2bitmap(this);
			callback(bitmap);
		});
	});
	
	request('https://raw.githubusercontent.com/theitalyplace/reddit-place-italy/master/target.png')
	.pipe(targetWriter);
}

function getBoardBitmap(callback) {
	r.board(function(err, httpResponse, body) {
		// save the board locally
		board.saveBoardInPNG(body);
		
		let bitmap = new Array(1000 * 1000);
		let i = 4;
		for (let y = 0; y < 1000; y++) {
			for (let x = 0; x < 500; x++) {
				let b = body[i];
				let p1 = b >> 4;
				let p2 = b & 0xF;
				let idx = x * 2 + y * 1000;
				bitmap[idx] = p1;
				bitmap[idx + 1] = p2;
				i++;
			}
		}
		callback(bitmap);
	});
}

function findDiffPixelInBmps(bmpBoard, bmpTarget, callback) {
	let width = 1000;
	let height = 1000;
	let area = width * height;

	let differences = 0;

	for (let i = 0; i < area; i++) {
		if (bmpTarget[i] == -1) continue;

		if (bmpTarget[i] != bmpBoard[i]) differences++;
	}

	if (differences == 0) {
		callback(-1, -1, -1);

		return;
	}

	console.log("found " + differences + " different pixels");

	let selected = Math.floor(Math.random() * differences);
	let ignored = 0;

	for (let i = 0; i < area; i++) {
		if (bmpTarget[i] == -1 || bmpTarget[i] == bmpBoard[i]) continue;

		if (ignored == selected) {
			callback(i % width, Math.floor(i / width), bmpTarget[i]);

			return;
		} else {
			ignored++;
		}
	}
}

const colorsHex = [
	0xFFFFFF,
	0xE4E4E4,
	0x888888,
	0x222222,
	0xFFA7D1,
	0xE50000,
	0xE59500,
	0xA06A42,
	0xE5D900,
	0x94E044,
	0x02BE01,
	0x00D3DD,
	0x0083C7,
	0x0000EA,
	0xCF6EE4,
	0x820080
];

function PNG2bitmap(png) {
	let i = 0;
	let bitmap = new Array(1000 * 1000);
	for (let y = 0; y < 1000; y++) {
		for (let x = 0; x < 1000; x++) {
			let colorCode = -1;
			let idx = (x + y * 1000) << 2;
			let alpha = png.data[idx + 3];
			if (alpha == 255) {
				let c = png.data[idx] << 16 | png.data[idx + 1] << 8 | png.data[idx + 2];
				colorCode = colorsHex.indexOf(c);
			}
			bitmap[i] = colorCode;
			i++;
		}
	}
	return bitmap;
}

