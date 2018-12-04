const {
    app
} = require('./config/config');
const home = require('./router/home');
const login = require('./router/login');
const register = require('./router/register');
const config = require('./router/config');
const user = require('./router/user');
const router = () => {
    app.use('/', home);
    app.use('/register', register);
    app.use('/login', login);
    app.use('/config', config);
    app.use('/user', user);
};
module.exports = router;