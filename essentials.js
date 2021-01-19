const logger = require('@geek/logger').createLogger('@titanium/essentials', { meta: { filename: __filename } });

const essentials = {};

_.assign(essentials, require('./info'));
_.assign(essentials, require('./ux'));
essentials.feedback = require('./feedback');


Object.defineProperty(essentials, 'battery_monitoring', {
	get() {
		return Ti.Platform.batteryMonitoring;
	},
	set(value = false) {
		logger.trace(`📌  you are here → setting Ti.Platform.batteryMonitoring: ${value}`);
		Ti.Platform.batteryMonitoring = value;
	},
});


essentials.copyDeviceInfoToClipboard = () => {
	logger.trace(`📌  you are here → copyDeviceInfoToClipboard()`);
	let info = `
-------------------------------------------
App Name:  ${essentials.app_name}
App Display Name:  ${essentials.app_display_name}
App ID:  ${essentials.app_id}
App GUID:  ${essentials.app_guid}
App Version:  ${essentials.app_version}
App Deployment Type:  ${essentials.app_deploy_type}
Titanium SDK Version:  ${essentials.titanium_sdk_version}
Titanium Turbo Version:  ${essentials.version}
Report Date:  ${new Date().toISOString()}
-------------------------------------------
Operating System:  ${essentials.os_name_full} ${essentials.os_version}
Device Model:  ${essentials.device_model_name}
Device Manufacturer  ${essentials.device_manufacturer}
Virtual Device:  ${essentials.isVirtual}
Screen Width:  ${essentials.device_width} dp
Screen Height:  ${essentials.device_height} dp
Screen DPI:  ${essentials.dpi}
Logical Density Factor: ${essentials.device_logical_density_factor}
Device Density:  ${essentials.device_density}
Total Memory:  ${essentials.humanizeBytes(essentials.device_total_memory)}
Available Memory:  ${essentials.humanizeBytes(essentials.device_available_memory)}
Processor Count:  ${essentials.device_processor_count}
Network Type:  ${essentials.network_type_name}
Network Online:  ${essentials.online.toString()}
Battery Level:  ${essentials.battery_level}
Locale:  ${essentials.locale}
Language Code:  ${essentials.language_code}
Country Code:  ${essentials.country_code}
Device ID:  ${essentials.device_id}
Install ID:  ${essentials.install_id}
Session ID:  ${essentials.session_id}
Advertising ID:  ${essentials.advertising_id}
Vendor ID:  ${essentials.vendor_id}
First Launch Ever: ${essentials.isFirstLaunchEver}
First Launch After Update: ${essentials.isFirstLaunchAfterUpdate}
First Launch Current Version: ${essentials.isFirstLaunchForCurrentVersion}
First Launch For Major Version: ${essentials.isFirstLaunchForMajorVersion}
First Launch For Minor Version: ${essentials.isFirstLaunchForMinorVersion}
Previous App Version: ${essentials.app_version_previous}
App Install History: 
`;

	for (const property in essentials.app_version_history) {
		info += `    ${property}  -- ${essentials.app_version_history[property]}\n`;
	}
	info += '\n\n-------------------------------------------';

	essentials.setClipboardText(info);

};


// ---------------------------------------------------------
//    Configure Event Tracker
// ---------------------------------------------------------
essentials.tracker = {
	event: async (name, data = {}) => {
		await logger.event(name, data);
	},
	app_open:                       async () => essentials.tracker.event(`app_open`),
	app_close:                      async () => essentials.tracker.event(`app_close`),
	app_resume:                     async () => essentials.tracker.event(`app_resume`),
	app_resumed:                    async () => essentials.tracker.event(`app_resumed`),
	app_pause:                      async () => essentials.tracker.event(`app_pause`),
	app_paused:                     async () => essentials.tracker.event(`app_paused`),
	app_first_launch_ever:          async () => essentials.tracker.event(`app_first_launch_ever`),
	app_first_launch_version:       async () => essentials.tracker.event(`app_first_launch_version`),
	app_first_launch_major_version: async () => essentials.tracker.event(`app_first_launch_major_version`),
	app_first_launch_minor_version: async () => essentials.tracker.event(`app_first_launch_minor_version`),
	app_first_launch_update:        async () => essentials.tracker.event(`app_first_launch_update`),
	app_update_check:               async () => essentials.tracker.event(`app_update_check`),
	auth_prompt:                    async () => essentials.tracker.event(`auth_prompt`),
	auth_success:                   async () => essentials.tracker.event(`auth_success`),
	auth_refresh:                   async () => essentials.tracker.event(`auth_refresh`),
	auth_signout:                   async () => essentials.tracker.event(`auth_signout`),
	screen_view:                    async screen_name => essentials.tracker.event(`screen_view`, { screen_name,  event_value: screen_name }),
	error:                          async error => essentials.tracker.event(`error`, error),

};

essentials.isFirstLaunchEver && essentials.tracker.app_first_launch_ever();
essentials.isFirstLaunchForCurrentVersion && essentials.tracker.app_first_launch_version({ app_previous_version: essentials.app_version_previous, event_value: essentials.app_version_previous });
essentials.isFirstLaunchAfterUpdate && essentials.tracker.app_first_launch_update({ app_previous_version: essentials.app_version_previous, event_value: essentials.app_version_previous  });
essentials.isFirstLaunchForMajorVersion && essentials.tracker.app_first_launch_major_version({ app_previous_version: essentials.app_version_previous, event_value: essentials.app_version  });
essentials.isFirstLaunchForMinorVersion && essentials.tracker.app_first_launch_minor_version({ app_previous_version: essentials.app_version_previous, event_value: essentials.app_version  });

Ti.App.addEventListener(`close`, essentials.tracker.app_close);
Ti.App.addEventListener(`resume`, essentials.tracker.app_resume);
Ti.App.addEventListener(`resumed`, essentials.tracker.app_resumed);
Ti.App.addEventListener(`pause`, essentials.tracker.app_pause);
Ti.App.addEventListener(`paused`, essentials.tracker.app_paused);

// #endregion ---[ Configure Event Tracker ]---

logger.trace(`📌  you are here → Turbo.Essentials Initialized`);
module.exports = essentials;

