const moment = require('moment');

_.assign(turbo, require('./info'));
turbo.feedback = require('./feedback');
turbo.devices = require('./devices');


turbo.humanizeBytes = (bytes, b = 2) => {
	bytes = _.toInteger(parseInt(bytes));
	if (bytes === 0) { return '0 Bytes'; } const c = b < 0 ? 0 : b; const d = Math.floor(Math.log(bytes) / Math.log(1024)); return `${parseFloat((bytes / Math.pow(1024, d)).toFixed(c))} ${[ 'Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB' ][d]}`;
};

Object.defineProperty(turbo, 'battery_monitoring', {
	get() {
		return Ti.Platform.batteryMonitoring;
	},
	set(value = false) {
		turbo.trace(`📌  you are here → setting Ti.Platform.batteryMonitoring: ${value}`);
		Ti.Platform.batteryMonitoring = value;
	},
});


turbo.copyDeviceInfoToClipboard = () => {
	turbo.trace(`📌  you are here → copyDeviceInfoToClipboard()`);
	const info = `
-------------------------------------------
App Name:  ${turbo.app_name}
App ID:  ${turbo.app_id}
App GUID:  ${turbo.app_guid}
App Version:  ${turbo.app_version}
App Deployment Type:  ${turbo.app_deploy_type}
Titanium SDK Version:  ${turbo.titanium_sdk_version}
Titanium Turbo Version:  ${turbo.version}
Report Date:  ${moment().utc().format()}
-------------------------------------------
Operating System:  ${turbo.os_name_full} ${turbo.os_version}
Device Model:  ${turbo.model_name}
Device Manufacturer  ${turbo.manufacturer}
Screen Width:  ${turbo.device_width} dp
Screen Height:  ${turbo.device_height} dp
Screen DPI:  ${turbo.dpi}
Logical Density Factor: ${turbo.logical_density_factor}
Device Density:  ${turbo.density}
Total Memory:  ${turbo.humanizeBytes(turbo.total_memory)}
Available Memory:  ${turbo.humanizeBytes(turbo.available_memory)}
Processor Count:  ${turbo.processor_count}
Network Type:  ${turbo.network_type_name}
Network Online:  ${turbo.online.toString()}
Battery Level:  ${turbo.battery_level}
Locale:  ${turbo.locale}
Device ID:  ${turbo.device_id}
Install ID:  ${turbo.install_id}
Session ID:  ${turbo.session_id}
-------------------------------------------
`;

	turbo.setClipboardText(info);

};


module.exports = {};

