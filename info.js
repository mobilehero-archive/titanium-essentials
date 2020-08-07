Ti.Platform.batteryMonitoring = true;

const info = {
	get uptime() {
		return Ti.Platform.uptime;
	},
	get battery_level() {
		const battery_level = Ti.Platform.batteryLevel;
		if (battery_level === -1) {
			return 'Unknown';
		 }

		return battery_level;
	},
	get available_memory() {
		return Ti.Platform.availableMemory;
	},
};
module.exports = info;

const _ = require('lodash');


info.getClipboardText = () => {
	if (Ti.UI.Clipboard.hasText()) {
		return Ti.UI.Clipboard.getText();
	}
};

info.setClipboardText = (text = '') => {
	Ti.UI.Clipboard.setText(text);
	return text;
};

info.percent_height = (relative, plus) => {

	relative = relative || 100;
	plus = plus || 0;

	if (info.isIos) {
		return info.platform_height;
	} else {

		// const pointDp = measurement.pointPXToDP(relative);
		const px = info.platform_height * (relative / 100);
		const calcDp = Math.round(px / (info.dpi / 160));
		return (calcDp + parseInt(plus));
	}
};

info.percent_width = (relative, plus) => {

	relative = relative || 100;
	plus = plus || 0;

	if (info.isIos) {
		return info.platform_width * (relative / 100);
	} else {

		// const pointDp = measurement.pointPXToDP(relative);
		const px = info.platform_width * (relative / 100);
		const calcDp = Math.round(px / (info.dpi / 160));
		return (calcDp + parseInt(plus));
	}
};


info.recalculate = function () {
	const { platformWidth } = Ti.Platform.displayCaps;
	const { platformHeight } = Ti.Platform.displayCaps;
	// var deviceWidth = OS_IOS ? Ti.Platform.displayCaps.platformWidth : Math.round( Ti.Platform.displayCaps.platformWidth / ( Ti.Platform.displayCaps.dpi / 160 ) );

	const { orientation } = Ti.Gesture;
	info.isLandscape = orientation === (Ti.UI.LANDSCAPE_LEFT || orientation === Ti.UI.LANDSCAPE_RIGHT);
	info.isPortrait = !info.isLandscape;

	info.platform_width = info.isPortrait && platformWidth > platformHeight ? platformHeight : platformWidth;
	info.platform_height = info.isPortrait && platformWidth > platformHeight ? platformWidth : platformHeight;

	info.device_height_actual = info.percent_height();
	info.device_height = info.isIos7Plus ? info.device_height_actual - 20 : info.device_height_actual;
	info.device_width = info.percent_width();
	// console.log(device);

	// device.WIDTH_10 = device.width * 0.1;

	for (let i = 1; i <= 100; i++) {
		info[`WIDTH_${i}`] = info.device_width * (i / 100);
		info[`HEIGHT_${i}`] = info.device_height * (i / 100);
	}

	for (let i = 105; i <= 200; i += 5) {
		info[`WIDTH_${i}`] = info.device_width * (i / 100);
		info[`HEIGHT_${i}`] = info.device_height * (i / 100);
	}

};

const devices = require('./devices');
const manufacturers = require('./manufacturers');

info.ip_address = Ti.Platform.address;
info.architecture = Ti.Platform.architecture;
info.model = Ti.Platform.model;

info.density = Ti.Platform.displayCaps.density;
info.dpi = Ti.Platform.displayCaps.dpi;
info.session_id = Ti.App.sessionId;

info.device_id = Ti.Platform.id;
info.install_id = Ti.App.installId;
info.app_id = Ti.App.id;
info.app_guid = Ti.App.guid;
info.app_name = Ti.App.name;
info.app_description = Ti.App.description;
info.app_copyright = Ti.App.copyright;
info.app_publisher = Ti.App.publisher;
info.app_url = Ti.App.url;
info.app_deploy_type = Ti.App.deployType;
info.titanium_sdk_version = Ti.version;

// module.exports.id = device.id;
info.locale = Ti.Platform.locale;
info.language_code = info.locale.substring(0, 2);
info.country_code = info.locale.substring(3, 2);
info.mac_address = Ti.Platform.macaddress;
// info.manufacturer = _.startCase(_.toLower(Ti.Platform.manufacturer || ''));
info.manufacturer = _.get(manufacturers, Ti.Platform.manufacturer, (Ti.Platform.manufacturer || ''));
info.netmask = Ti.Platform.netmask;
info.os = Ti.Platform.osname;
info.os_type = Ti.Platform.ostype;
info.platform = Ti.Platform.name;
info.processor_count = Ti.Platform.processorCount;
info.runtime = Ti.Platform.runtime;
info.total_memory = Ti.Platform.totalMemory;
info.username = Ti.Platform.username;
info.os_version = Ti.Platform.version;
info.os_version_major = parseInt(info.os_version.split('.')[0], 10);
info.os_version_minor = parseInt(info.os_version.split('.')[1], 10);

info.logical_density_factor = Ti.Platform.displayCaps.logicalDensityFactor;

info.app_version = Ti.App.version;

// device.identifierForAdvertising  = device.ios ? Ti.Platform.identifierForAdvertising : device.id;
info.advertising_id  = Ti.Platform.identifierForAdvertising;
// device.identifierForVendor  = device.ios ? Ti.Platform.identifierForVendor : device.id;
info.vendor_id  = Ti.Platform.identifierForVendor;


info.isIos = info.platform === 'iPhone OS' || info.platform === 'iOS';
info.isAndroid = info.os === 'android';
info.isIphone = info.os === 'iphone';
info.isIpad = info.os === 'ipad';

// TIBUG: The variable OS_IOS is not working in node_modules
info.os_name = info.isIos ? 'ios' : 'android';
if (info.isIos) {
	if (info.isIpad && info.os_version_major >= 13) {
		info.os_name_full = 'iPadOS';
	} else {
		info.os_name_full = 'iOS';
 	}
} else {
	info.os_name_full = 'Android';
}

if (info.model.endsWith(' (Simulator)')) {
	info.model = info.model.substring(0, info.model.length - 12);
	info.isVirtual = true;
} else {
	info.isVirtual = info.model === 'Simulator' || info.model.indexOf('sdk') !== -1;
}

// const deviceModels = require('./deviceModels');
info.model_name = _.get(devices, info.model, info.model);

// device.test = deviceModels[device.model];

// console.error(`deviceModels: ${JSON.stringify(deviceModels, null, 2)}`);

info.isIos7Plus = info.isIos && info.os_version_major >= 7;
info.isIos8Plus = info.isIos && info.os_version_major >= 8;

info.online = !!Ti.Network.online;
info.network_type = Ti.Network.networkType;
info.network_type_name = Ti.Network.networkTypeName;
info.network_change_reason = 'Initial Network Connection';


Ti.Network.addEventListener('change', e => {
	info.network_type_name = e.networkTypeName;
	info.network_type = e.networkType;
	info.network_change_reason = e.reason;

	info.online = !!e.online;

	turbo.debug(`Ti.Network.onChange: ${JSON.stringify(e, null, 2)}`);
	turbo.events.fire('network::change');
	info.online && turbo.events.fire('network::online');
	!info.online && turbo.events.fire('network::offline');
});

Ti.Platform.addEventListener('battery', e => {

	const data = { level: e.level };

	switch (e.state) {
		case Ti.Platform.BATTERY_STATE_CHARGING:
			data.state = 'charging';
			break;

		case Ti.Platform.BATTERY_STATE_FULL:
			data.state = 'full';
			break;

		case Ti.Platform.BATTERY_STATE_UNPLUGGED:
			data.state = 'unplugged';
			break;

		default:
			data.state = 'unknown';

	}

	turbo.debug(`🦠  battery status change: ${JSON.stringify(data, null, 2)}`);

	turbo.events.fire('battery::changed', data);
});


info.recalculate();
