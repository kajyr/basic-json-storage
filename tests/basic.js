'use strict';


const test = require('tape');
const fs = require('fs');
const storage = require('../index.js');


test('whitout file', function (t) {
	t.plan(1);
	t.throws(() => { storage(); })
});


test('get test', function (t) {
	t.plan(2);

    let firstDbFile = './tests/expected/first.db';

	let first = storage(firstDbFile);

	first.get('foo').then((value) => {
		t.equal(value, undefined, 'Asking for a non present key gets undefined');
	})

	first.get('foo', 'bar').then((value) => {
		t.equal(value, 'bar', 'Asking for a non present key gets the default value, if specified');
	})	
});

test('set test', function (t) {
	t.plan(3);

    let dbFile = './tests/expected/set.db';

	let db = storage(dbFile);

	db.set('foo', 'bar').then((value) => {

		t.doesNotThrow(() => { fs.statSync(dbFile) }, 'File has been created');

		db.get('foo').then((value) => {
			t.equal(value, 'bar', 'Asking for a present key gets the key value');
		})

		db.get('foo', 'rab').then((value) => {
			t.equal(value, 'bar', 'Asking for a present key gets the key value, even with default specified');
		})

	})

});
