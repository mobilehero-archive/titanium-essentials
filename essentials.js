const logger = require('@geek/logger').createLogger('@titanium/essentials', { meta: { filename: __filename } });

// ---------------------------------------------------------
//    Configure Event Emitter
// ---------------------------------------------------------
if (!turbo.events) {
	const EventEmitter = require('events');
	turbo.events = new EventEmitter({
		wildcard:          true,  // set this to `true` to use wildcards
		newListener:       true,  // set this to `true` if you want to emit the newListener event
		removeListener:    true,  // set this to `true` if you want to emit the removeListener event
		delimiter:         '::',  // the delimiter used to segment namespaces
		maxListeners:      20,  // the maximum amount of listeners that can be assigned to an event
		verboseMemoryLeak: false,  // show event name in memory leak message when more than maximum amount of listeners is assigned
		ignoreErrors:      true, // disable throwing uncaughtException if an error event is emitted and it has no listeners
	});
}

_.assign(turbo, require('./info'));
turbo.feedback = require('./feedback');


Object.defineProperty(turbo, 'battery_monitoring', {
	get() {
		return Ti.Platform.batteryMonitoring;
	},
	set(value = false) {
		logger.trace(`📌  you are here → setting Ti.Platform.batteryMonitoring: ${value}`);
		Ti.Platform.batteryMonitoring = value;
	},
});


turbo.copyDeviceInfoToClipboard = () => {
	logger.trace(`📌  you are here → copyDeviceInfoToClipboard()`);
	let info = `
-------------------------------------------
App Name:  ${turbo.app_name}
App Display Name:  ${turbo.app_display_name}
App ID:  ${turbo.app_id}
App GUID:  ${turbo.app_guid}
App Version:  ${turbo.app_version}
App Deployment Type:  ${turbo.app_deploy_type}
Titanium SDK Version:  ${turbo.titanium_sdk_version}
Titanium Turbo Version:  ${turbo.version}
Report Date:  ${new Date().toISOString()}
-------------------------------------------
Operating System:  ${turbo.os_name_full} ${turbo.os_version}
Device Model:  ${turbo.device_model_name}
Device Manufacturer  ${turbo.device_manufacturer}
Virtual Device:  ${turbo.isVirtual}
Screen Width:  ${turbo.device_width} dp
Screen Height:  ${turbo.device_height} dp
Screen DPI:  ${turbo.dpi}
Logical Density Factor: ${turbo.device_logical_density_factor}
Device Density:  ${turbo.device_density}
Total Memory:  ${turbo.humanizeBytes(turbo.device_total_memory)}
Available Memory:  ${turbo.humanizeBytes(turbo.device_available_memory)}
Processor Count:  ${turbo.device_processor_count}
Network Type:  ${turbo.network_type_name}
Network Online:  ${turbo.online.toString()}
Battery Level:  ${turbo.battery_level}
Locale:  ${turbo.locale}
Language Code:  ${turbo.language_code}
Country Code:  ${turbo.country_code}
Device ID:  ${turbo.device_id}
Install ID:  ${turbo.install_id}
Session ID:  ${turbo.session_id}
Advertising ID:  ${turbo.advertising_id}
Vendor ID:  ${turbo.vendor_id}
First Launch Ever: ${turbo.isFirstLaunchEver}
First Launch After Update: ${turbo.isFirstLaunchAfterUpdate}
First Launch Current Version: ${turbo.isFirstLaunchForCurrentVersion}
First Launch For Major Version: ${turbo.isFirstLaunchForMajorVersion}
First Launch For Minor Version: ${turbo.isFirstLaunchForMinorVersion}
Previous App Version: ${turbo.app_version_previous}
App Install History: 
`;

	for (const property in turbo.app_version_history) {
		info += `    ${property}  -- ${turbo.app_version_history[property]}\n`;
	}
	info += '\n\n-------------------------------------------';

	turbo.setClipboardText(info);

};


module.exports = {};

