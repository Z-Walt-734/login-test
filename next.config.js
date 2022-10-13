const path = require('path');
const {parsed: localEnv} = require('dotenv').config({
	allowEmptyValues: false,
	path: path.resolve(__dirname, '.env.local'),
});

const nextConfig = {
	env: localEnv,
};

module.exports = nextConfig;

