
_.assign(turbo, require('./info'));
turbo.feedback = require('./feedback');
turbo.devices = require('./devices');

turbo.humanizeBytes = (bytes, b = 2) => {
	bytes = _.toInteger(parseInt(bytes));
	if (bytes === 0) { return '0 Bytes'; } const c = b < 0 ? 0 : b; const d = Math.floor(Math.log(bytes) / Math.log(1024)); return `${parseFloat((bytes / Math.pow(1024, d)).toFixed(c))} ${[ 'Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB' ][d]}`;
};

module.exports = {};

