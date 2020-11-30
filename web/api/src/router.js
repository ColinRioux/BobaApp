/**
 * Authentication Routes
 *
 * @author Colin Rioux <crioux@scu.edu>
 * @author Horatio Xiao <hxiao@scu.edu>
 * @author Chris Tian <ctian@scu.edu>
 */

const bcrypt = require('bcrypt');
const passport = require('fastify-passport').default;
const LocalStrategy = require('passport-local');

passport.registerUserSerializer = async function(user, done) {
    return done(null, user.id);
}

//TODO
// passport.registerUserDeserializer = async function(serialized, request) {

// }

module.exports = async function (api, opts) {
    // Configure passport js
    api.register(passport.initialize());
    api.register(passport.secureSession());

    // api.db.dbList().run().then(function (result) {
    //     console.log(result);
    // });

    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function(req, email, password, done) {
            // req.body.email
            // req.body.password
            // req.body.accountType ==> customer, owner, admin
            api.db.db('users')
                .table(req.body.accountType)
                .filter(api.db.row('email').eq(email))
                .run().then(function (err, user) {
                    if (err) {
                        return done(err);
                    }

                    if (!user) {
                        return done(null, false);
                    }

                    user.toArray(function(err, result) {
                        if (err || result.length == 0) {
                            // error handling
                            return done(null, false);
                        }
                        
                        if (!bcrypt.compareSync(password, result[0].password)) {
                            return done(null, false);
                        }

                        return done(null, result[0]);
                    });
                });
        }
    ));
    

    api.get('/ping', async function (req, res) {
        return { hello: 'colin' };
    });

    api.get('/', { 
        preValidation: passport.authenticate('local', { successRedirect: '/', failureRedirect: '/auth' })
    }, async function (req, res) {
        return { hi: 'colin' };
    });

    
    /**
     * Used to log a user into the platform
     */
    api.post('/login', async function(req, res) {
        // TODO
    });

    /**
     * Used to register a user
     */
    api.post('/register', async function(req, res) {
        // TODO
    });

    /**
     * Used to authenticate a user's access to the API
     */
    api.get('/auth', async function(req, res) {
        // TODO (this might just be a simple redirect to /login)
    });

    /**
     * Used to search for boba restaurants based on a search query
     */
    api.get('/search/:query', async function(req, res) {
        var query = req.params['query'];

        // TODO
        // 1. Make a call to the database fetching all entries in the 
        //    restaurants table whose name exactly matches or starts with "query"
        // 2. Return response of the json format:
        // var response = { 
        //     results: [{
        //         name: "Restaurant A",
        //         //...
        //     }, {
        //         name: "Restaurant B",
        //         //...
        //     }]
        // }
    });

    /**
     * Used to search for boba restaurants relative to the requester's location
     */
    api.get('/search/:lat/:lng', async function(req, res) {
        var lat = req.params['lat'];
        var lng = req.params['lng'];

		// initiliazing some variables to help with calculations
		radius=6371e3;
		var bounds = [];
		distance = 20 / 0.6214 * 1000;
		var bearings = [0,180,90,270];

		// convert lat / long to Radians
		lat1 = lat * Math.PI / 180;
		lon1 = long * Math.PI / 180;
		delta = distance / radius;

		// loop through north, south, east, west
		for (x of bearings) {
			// convert bearing to Radians
			theta = x * Math.PI / 180;

			lat2 = Math.asin(Math.sin(lat1) * Math.cos(delta) + Math.cos(lat1) * Math.sin(delta) * Math.cos(theta) );

			y = Math.sin(theta) * Math.sin(delta) * Math.cos(lat1);
			x = Math.cos(delta) - Math.sin(lat1) * Math.sin(lat2);

			lon2 = lon1 + Math.atan2(y,x);
			
			// store only lats of north and south bound
			if( x == 0 || x == 90 ) {
				bounds.push(lat2);
			}
			// store only lons of west and east bounds
			else {
				bounds.push(lon2);
			};

		};
		
        // TODO
        // 1. Determine range of lat/lng coordinates that are in a radius of MAX 25 miles
        // 2. Make a call to the database fetching all entries within the range
        // 3. Return a response of the json format:
        // var response = { 
        //     results: [{
        //         name: "Restaurant A",
        //         //...
        //     }, {
        //         name: "Restaurant B",
        //         //...
        //     }]
        // }
    });

    /**
     * Used to bookmark a location
     */
    api.put('/bookmark/add/:lat/:lng', async function(req, res) {
        var lat = req.params['lat'];
        var lng = req.params['lng'];

        // TODO
        // 1. Get the user via their api session cookie
        // 2. Update the user's db save to include the lat/lng of their new bookmark
        // 2.a. If lat/lng bookmark already exists, success = false, message = "exists"
        // 3. Return a json response: { success: true/false, message: "" }
    });

    /**
     * Used to remove a bookmark
     */
    api.delete('/bookmark/remove/:lat/:lng', async function(req, res) {
        var lat = req.params['lat'];
        var lng = req.params['lng'];

        // TODO
        // 1. Get the user via their api session cookie
        // 2. Update the user's db save to remove the bookmark of lat/lng
        // 3. Return a json response: { success: true/false, message: "" }
    });

    /**
     * Used to get a restaurant at an exact location
     * - Useful for bookmarks / other requests requiring a lat/lng ==> name translation
     */
    api.get('/restaurant/get/:lat/:lng', async function(req, res) {
        var lat = req.params['lat'];
        var lng = req.params['lng'];

        // TODO
        // 1. Make a call to the database fetching the entry which matches that lat/lng
        // 2. Return a response of the json format:
        // var response = { 
        //     result: {
        //         name: "Restaurant A",
        //         //...
        //     }
        // }
    });

    /**
     * Used to add a restaurant at lat/lng
     */
    api.post('/restaurant/add/:lat/:lng', async function (req, res) {
        var lat = req.params['lat'];
        var lng = req.params['lng'];

        // TODO
        // use req.body for other data
        // req.body => { name: ..., hours: ..., address: ..., owner: ... }
    });

    /**
     * Used to submit feedback to the restaurant at lat/lng
     */
    api.post('/feedback/add/:lat/:lng', async function(req, res) {
        var lat = req.params['lat'];
        var lng = req.params['lng'];

        // TODO
        // 1. Read req.body for the form data
        // 2. Save the feedback intuitively into the restaurant (of lat/lng) db
    });

    /**
     * Used to get the feedback for a restaurant at lat/lng
     */
    api.get('/feedback/list/:lat/:lng', async function(req, res) {
        var lat = req.params['lat'];
        var lng = req.params['lng'];

        // TODO
        // 1. Verify if the user via user session cookie is restaurant owner
        // 2. Verify if the user is this restaurant's owner (comparing lat/lng)
        // 3. Return a response json similar to /search which lists out the feedback (parsable by frontend)
    });
};
