const { deleteAtFromUsername } = require('../../utils/fixUsername');
const logger = require('../../helpers/logger').logger.child({module: 'LoginController'});

const AuthService = require('./auth.service');

const signIn = async (req, res, next) => {
    let usernameOrEmail = deleteAtFromUsername(req.body.username);
    try {
        const data = await AuthService.signIn(usernameOrEmail, req.body.password);
        res.status(200).json({data});
    } catch (error) {
        logger.error('Login failed');
        next(error);
    }
};

const signUp = async (req, res, next) => {
    let birthday = new Date(req.body.year, req.body.month-1, req.body.day);
    let accountValues = {email: req.body.email, birthday: birthday, gender: req.body.gender};
    let profileValues = {profile_name: req.body.name, username: req.body.username};
    try {
        await AuthService.signUp(accountValues, profileValues, req.body.password);
        return res.status(204).end();
    } catch (error) {
        logger.error(error, 'Sign up failed.');
        next(error);
    }
};

module.exports = {signIn, signUp};
