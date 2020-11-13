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

    // TODO
    api.post('/login', async function(req, res) {

    });
};