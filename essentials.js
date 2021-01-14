const logger = require('@geek/logger').createLogger('@titanium/essentials', { meta: { filename: __filename } });

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


// ---------------------------------------------------------
//    Configure Event Tracker
// ---------------------------------------------------------
turbo.tracker = {
	event: async (name, data = {}) => {
		await logger.event(name, data);
	},
	app_open:                       async () => turbo.tracker.event(`app_open`),
	app_close:                      async () => turbo.tracker.event(`app_close`),
	app_resume:                     async () => turbo.tracker.event(`app_resume`),
	app_resumed:                    async () => turbo.tracker.event(`app_resumed`),
	app_pause:                      async () => turbo.tracker.event(`app_pause`),
	app_paused:                     async () => turbo.tracker.event(`app_paused`),
	app_first_launch_ever:          async () => turbo.tracker.event(`app_first_launch_ever`),
	app_first_launch_version:       async () => turbo.tracker.event(`app_first_launch_version`),
	app_first_launch_major_version: async () => turbo.tracker.event(`app_first_launch_major_version`),
	app_first_launch_minor_version: async () => turbo.tracker.event(`app_first_launch_minor_version`),
	app_first_launch_update:        async () => turbo.tracker.event(`app_first_launch_update`),
	app_update_check:               async () => turbo.tracker.event(`app_update_check`),
	auth_prompt:                    async () => turbo.tracker.event(`auth_prompt`),
	auth_success:                   async () => turbo.tracker.event(`auth_success`),
	auth_refresh:                   async () => turbo.tracker.event(`auth_refresh`),
	auth_signout:                   async () => turbo.tracker.event(`auth_signout`),
	screen_view:                    async screen_name => turbo.tracker.event(`screen_view`, { screen_name,  event_value: screen_name }),
	error:                          async error => turbo.tracker.event(`error`, error),

};

turbo.isFirstLaunchEver && turbo.tracker.app_first_launch_ever();
turbo.isFirstLaunchForCurrentVersion && turbo.tracker.app_first_launch_version({ app_previous_version: turbo.app_version_previous, event_value: turbo.app_version_previous });
turbo.isFirstLaunchAfterUpdate && turbo.tracker.app_first_launch_update({ app_previous_version: turbo.app_version_previous, event_value: turbo.app_version_previous  });
turbo.isFirstLaunchForMajorVersion && turbo.tracker.app_first_launch_major_version({ app_previous_version: turbo.app_version_previous, event_value: turbo.app_version  });
turbo.isFirstLaunchForMinorVersion && turbo.tracker.app_first_launch_minor_version({ app_previous_version: turbo.app_version_previous, event_value: turbo.app_version  });

Ti.App.addEventListener(`close`, turbo.tracker.app_close);
Ti.App.addEventListener(`resume`, turbo.tracker.app_resume);
Ti.App.addEventListener(`resumed`, turbo.tracker.app_resumed);
Ti.App.addEventListener(`pause`, turbo.tracker.app_pause);
Ti.App.addEventListener(`paused`, turbo.tracker.app_paused);

// #endregion ---[ Configure Event Tracker ]---

logger.trace(`📌  you are here → Turbo.Essentials Initialized`);
module.exports = {};

