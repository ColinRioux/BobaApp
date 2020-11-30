/**
 * SBE API
 *
 * @author Colin Rioux <crioux@scu.edu>
 * @author Horatio Xiao <hxiao@scu.edu>
 * @author Chris Tian <ctian@scu.edu>
 */

const fastify = require('fastify');
const api = fastify();
const config = require('./config.json');
const db = require('rethinkdbdash')();
const session = require('fastify-secure-session');
const fs = require('fs');
const path = require('path');

// Enable secure stateless session cookies to verify authentication
// For usage, see src/authentication.js
api.register(session, { key: fs.readFileSync(path.join(__dirname, 'secret_key')) });

// Router
api.register(require('./src/router'), { prefix: '/' });

// Configure database
db.dbList().run().then(function (result) {
    if (!result.includes('users')) {
        console.log('Created users database');
        db.dbCreate('users').run();
        db.db('users').tableCreate('customer').run();
        db.db('users').tableCreate('owner').run();
        db.db('users').tableCreate('admin').run();
    }

    if (!result.includes('restaurants')) {
        console.log('Created restaurants database');
        db.dbCreate('restaurants').run();
        db.db('restaurants').tableCreate('locations').run();
    }
});

// Decorate fastify with a db object so we can use it across files
api.decorate('db', db);

// Start the server
api.listen(config.port, function (err, address) {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`SBE API server listening on ${address}`);
});