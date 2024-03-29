/* eslint-disable promise/avoid-new */
// const { observable } = require('@titanium/observer');
const Alloy = require('/alloy');
const _ = require('lodash');
const path = require('path');

const fs = require('fs');
if (!fs.patched) {
	fs.readFileSync = _.wrap(fs.readFileSync, (func, filename, options) => {
		if (_.isString(filename)) {
			if (!filename.startsWith('/')) {
				filename = path.join(Ti.Filesystem.resourcesDirectory, filename);
			}
		} else {
			throw new Error(`TypeError [ERR_INVALID_ARG_TYPE]: The "path" argument must be of type string or an instance of Buffer or URL. Received ${filename}`);
		}
		return func(filename, options);
	});
	fs.patched = true;
}

// Titanium does not use the standard #RRGGBBAA format for color by default
// Defaulting to #AARRGGBB for now but this will change in near future.
const color_format = Titanium.App.Properties.getString('color-format', 'AARRGGBB').toUpperCase();
const rgba = color_format === 'RRGGBBAA';

const ux = {
	globals:       {},
	fonts:         {},
	colors:        {},
	api:           {},
	DEBUG_MODE:    false,
	DEBUG_UI_MODE: false,
	version:       Alloy.version,
};
ux.switchColorFormat = color => {

	if (typeof color !== 'string' || ! rgba) {
		return color;
	}
	// console.error(`🦠 before color: ${JSON.stringify(color, null, 2)}`);
	const converted = color.replace(/(#?)((?:[A-Fa-f0-9][A-Fa-f0-9]){3})([A-Fa-f0-9]{2})/, '$1$3$2').toLowerCase();
	// console.error(`🦠 after color: ${JSON.stringify(converted, null, 2)}`);
	return converted;
};

ux.openLoadingScreen = () => {};
ux.closeLoadingScreen = () => {};

ux.createStack = ux.createStackLayout = (params = {}) => {
	const orientation = params.orientation || params.layout || 'vertical';
	params.layout = params.orientation = orientation;
	_.defaults(params, { height: 'size' });
	const view = ux.createView(params);
	return view;
};

ux.createAbsolute = ux.createAbsoluteLayout =  (params = {})  => {
	params.layout = params.orientation = 'composite';
	_.defaults(params, { height: 'size' });
	if (params.debugColor && ux.DEBUG_MODE && ux.DEBUG_UI_MODE) {
		params.backgroundColor = params.debugColor;
	}

	const view = ux.createView(params);
	return view;
};

ux.createVertical = ux.createVerticalLayout =  (params = {})  => {
	params.layout = params.orientation = 'vertical';
	_.defaults(params, { height: 'size' });
	if (params.debugColor && ux.DEBUG_MODE && ux.DEBUG_UI_MODE) {
		params.backgroundColor = params.debugColor;
	}

	const view = ux.createView(params);
	return view;
};

ux.createHorizontal = ux.createHorizontalLayout =  (params = {})  => {
	params.layout = params.orientation = 'horizontal';
	_.defaults(params, { height: 'size' });
	if (params.debugColor && ux.DEBUG_MODE && ux.DEBUG_UI_MODE) {
		params.backgroundColor = params.debugColor;
	}
	const view = ux.createView(params);
	return view;
};

ux.createImageView = (params = {}) => {
	params.image = params.image || params.src;
	params.backgroundColor = ux.switchColorFormat(params.backgroundColor);
	const view = Ti.UI.createImageView(params);
	return view;
};

const processFontParameters =  params => {
	if (params && (params.fontSize || params.fontStyle || params.fontFamily || params.fontWeight || params.textStyle)) {

		params.font = params.font || {};

		_.defaults(params.font, {
			fontSize:   params.font.fontSize || params.fontSize,
			fontStyle:  params.font.fontStyle || params.fontStyle,
			fontFamily: params.font.fontFamily || params.fontFamily,
			fontWeight: params.font.fontWeight || params.fontWeight,
			textStyle:  params.font.textStyle || params.textStyle,
		});

		delete params['fontSize'];
		delete params['fontStyle'];
		delete params['fontFamily'];
		delete params['fontWeight'];
		delete params['textStyle'];
	}
};

ux.expand = ux.expandContainer =  e  => {

	if (!e) {
		return;
	}
	const container = e.source || e;

	if (container.expandedHeight || container.expandedWidth || container.expandedTop || container.expandedRight || container.expandedBottom || container.expandedLeft) {
		container.height = !_.isNil(container.expandedHeight) ? container.expandedHeight : container.height;
		container.width = !_.isNil(container.expandedWidth) ? container.expandedWidth : container.width;
		if (container.collapseMargins) {
			container.top = !_.isNil(container.expandedTop) ?  container.expandedTop : container.top;
			container.right = !_.isNil(container.expandedRight) ?  container.expandedRight : container.right;
			container.bottom = !_.isNil(container.expandedBottom) ?  container.expandedBottom : container.bottom;
			container.left = !_.isNil(container.expandedLeft) ?  container.expandedLeft : container.left;
		}

		container.visible = true;
	}
};

ux.toggleContainer =  e  => {

	if (!e) {
		return;
	}
	const container = e.source || e;

	if (container.expandedHeight || container.expandedWidth || container.expandedTop || container.expandedRight || container.expandedBottom || container.expandedLeft) {

		if (container.visible) {
			ux.collapseContainer(container);
		} else {
			ux.expandContainer(container);
		}

	}

};

ux.collapse = ux.collapseContainer =  e  => {
	if (!e) {
		return;
	}
	const container = e.source || e;
	if (container.expandedHeight || container.expandedWidth || container.expandedTop || container.expandedRight || container.expandedBottom || container.expandedLeft) {
		container.height = !_.isNil(container.expandedHeight) ? 0 : container.height;
		container.width = !_.isNil(container.expandedWidth) ? 0 : container.width;

		if (container.collapseMargins) {
			container.top = !_.isNil(container.expandedTop) ?  0 : container.top;
			container.right = !_.isNil(container.expandedRight) ?  0 : container.right;
			container.bottom = !_.isNil(container.expandedBottom) ?  0 : container.bottom;
			container.left = !_.isNil(container.expandedLeft) ?  0 : container.left;
		}

		container.visible = false;
	}
};

ux.createLabel =  (params = {})  => {
	if (params.debugColor && ux.DEBUG_MODE && ux.DEBUG_UI_MODE) {
		params.backgroundColor = params.debugColor;
	}
	params.backgroundColor = ux.switchColorFormat(params.backgroundColor);
	params.color = ux.switchColorFormat(params.color);

	if (! _.isNil(params.verticalAlign)) {
		params.verticalAlign = _.get(ux.TEXT_VERTICAL_ALIGNMENTS, params.verticalAlign, params.verticalAlign);
	}

	processFontParameters(params);

	const view = Ti.UI.createLabel(params);
	return view;
};

ux.createView =  (params = {})  => {
	if (params.debugColor && ux.DEBUG_MODE && ux.DEBUG_UI_MODE) {
		params.backgroundColor = params.debugColor;
	}
	params.backgroundColor = ux.switchColorFormat(params.backgroundColor);
	const view = Ti.UI.createView(params);
	return view;
};

ux.createWindow =  (params = {})  => {
	if (params.debugColor && ux.DEBUG_MODE && ux.DEBUG_UI_MODE) {
		params.backgroundColor = params.debugColor;
	}
	// if ( OS_ANDROID ) {
	// 	delete params.largeTitleEnabled;
	// 	delete params.largeTitleDisplayMode;
	// }
	params.backgroundColor = ux.switchColorFormat(params.backgroundColor);
	const view = Ti.UI.createWindow(params);
	return view;
};

ux.KEYBOARD_TYPES = {
	ascii:               Ti.UI.KEYBOARD_TYPE_ASCII,  // 0
	numbers_punctuation: Ti.UI.KEYBOARD_TYPE_NUMBERS_PUNCTUATION,  // 1
	url:                 Ti.UI.KEYBOARD_TYPE_URL,  // 2
	number:              Ti.UI.KEYBOARD_TYPE_NUMBER_PAD,  // 3
	phone:               Ti.UI.KEYBOARD_TYPE_PHONE_PAD,  // 4
	email:               Ti.UI.KEYBOARD_TYPE_EMAIL,  // 5
	name_phone:          Ti.UI.KEYBOARD_TYPE_NAMEPHONE_PAD,  // 6
	default:             Ti.UI.KEYBOARD_TYPE_DEFAULT,  // 7
	decimal:             Ti.UI.KEYBOARD_TYPE_DECIMAL_PAD,  // 8
};

ux.TEXT_VERTICAL_ALIGNMENTS = {
	bottom: Ti.UI.TEXT_VERTICAL_ALIGNMENT_BOTTOM,
	center: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
	top:    Ti.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
};

ux.AUTOCAPITALIZATION_TYPES = {
	none:      Ti.UI.TEXT_AUTOCAPITALIZATION_NONE,  // 0
	sentences: Ti.UI.TEXT_AUTOCAPITALIZATION_SENTENCES,  // 1
	words:     Ti.UI.TEXT_AUTOCAPITALIZATION_WORDS,  // 2
	all:       Ti.UI.TEXT_AUTOCAPITALIZATION_ALL,  // 3
};

ux.AUTOFILL_TYPES = {
	address:     Ti.UI.AUTOFILL_TYPE_ADDRESS,
	phone:       Ti.UI.AUTOFILL_TYPE_PHONE,
	name:        Ti.UI.AUTOFILL_TYPE_NAME,
	cc_year:     Ti.UI.AUTOFILL_TYPE_CARD_EXPIRATION_YEAR,
	cc_month:    Ti.UI.AUTOFILL_TYPE_CARD_EXPIRATION_MONTH,
	username:    Ti.UI.AUTOFILL_TYPE_USERNAME,
	postal_code: Ti.UI.AUTOFILL_TYPE_POSTAL_CODE,
	cc_day:      Ti.UI.AUTOFILL_TYPE_CARD_EXPIRATION_DAY,
	cc_date:     Ti.UI.AUTOFILL_TYPE_CARD_EXPIRATION_DATE,
	password:    Ti.UI.AUTOFILL_TYPE_PASSWORD,
	cc_code:     Ti.UI.AUTOFILL_TYPE_CARD_SECURITY_CODE,
	cc_number:   Ti.UI.AUTOFILL_TYPE_CARD_NUMBER,
	email:       Ti.UI.AUTOFILL_TYPE_EMAIL,
};

ux.createTextField =  (params = {})  => {
	if (params.debugColor && ux.DEBUG_MODE && ux.DEBUG_UI_MODE) {
		params.backgroundColor = params.debugColor;
	}

	if (! _.isNil(params.keyboardType)) {
		params.keyboardType = _.get(ux.KEYBOARD_TYPES, params.keyboardType, params.keyboardType);
	}

	if (! _.isNil(params.autocapitalization)) {
		params.autocapitalization = _.get(ux.AUTOCAPITALIZATION_TYPES, params.autocapitalization, params.autocapitalization);
	}

	if (! _.isNil(params.autofillType)) {
		params.autofillType = _.get(ux.AUTOFILL_TYPES, params.autofillType, params.autofillType);
	}

	processFontParameters(params);
	params.backgroundColor = ux.switchColorFormat(params.backgroundColor);
	params.color = ux.switchColorFormat(params.color);
	const view = Ti.UI.createTextField(params);
	return view;
};

ux.createIcon =  (params = {})  => {
	params.font = params.font || {};
	const heightInt = _.toInteger(params.height);
	params.font.fontSize = params.size || params.font.size || params.font.fontSize || ((heightInt > 0) ? heightInt : undefined);
	if (params.type) {
		params.font.fontFamily = `FontAwesome-${_.capitalize(params.type)}`;
	}

	params.font.fontFamily = params.font.fontFamily || 'FontAwesome-Regular';
	params.text = _.get(ux, [ 'fonts', params.font.fontFamily, params.name ], '');
	// if( params.text === ''){
	// 	console.error('Could not find font name');
	// }
	params.textAlign = params.textAlign || Ti.UI.TEXT_ALIGNMENT_CENTER;
	params.verticalAlign = params.verticalAlign || Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER;

	delete params.type;
	delete params.size;
	params.backgroundColor = ux.switchColorFormat(params.backgroundColor);
	params.color = ux.switchColorFormat(params.color);
	// console.error(`🦠 icon params: ${JSON.stringify(params, null, 2)}`);
	const view = Ti.UI.createLabel(params);
	return view;
};

ux.createInput =  (params = {})  => {
	const view = ux.createTextField(params);
	return view;
};

ux.noop = () => {};


ux.hasAudioRecorderPermissions = () => {
	return Titanium.Media.hasAudioRecorderPermissions();
};

ux.hasCameraPermissions = () => {
	return Titanium.Media.hasCameraPermissions();
};

ux.hasPhotoGalleryPermissions = () => {
	return Titanium.Media.hasPhotoGalleryPermissions();
};

ux.hasMusicLibraryPermissions = () => {
	return OS_IOS ? Titanium.Media.hasMusicLibraryPermissions() : true;
};

ux.USER_NOTIFICATION_AUTHORIZATION_STATUS = {

	NOT_DETERMINED: 0,
	DENIED:         1,
	AUTHORIZED:     2,
	PROVISIONAL:    3,
	EPHEMERAL:      4,
};

ux.USER_NOTIFICATION_ALERT_STYLE = {

	NONE:        0,
	BANNER:      1,
	AUTHORIZED:  2,
	PROVISIONAL: 3,
	EPHEMERAL:   4,
};


ux.getNotificationPermissions = async () => {

	return new Promise(
		(resolve, reject) => {

			if (OS_IOS) {
				Ti.App.iOS.UserNotificationCenter.requestUserNotificationSettings(
					settings => {
						// logger.debug(`🦠  settings: ${JSON.stringify(settings, null, 2)}`);

						return resolve(settings);

					}
				);
			} else {
				return resolve({
					showPreviewsSetting:             ux.USER_NOTIFICATION_AUTHORIZATION_STATUS.NOT_DETERMINED,
					badgeSetting:                    ux.USER_NOTIFICATION_AUTHORIZATION_STATUS.NOT_DETERMINED,
					criticalAlertSetting:            ux.USER_NOTIFICATION_AUTHORIZATION_STATUS.NOT_DETERMINED,
					authorizationStatus:             ux.USER_NOTIFICATION_AUTHORIZATION_STATUS.AUTHORIZED,
					soundSetting:                    ux.USER_NOTIFICATION_AUTHORIZATION_STATUS.NOT_DETERMINED,
					notificationCenterSetting:       ux.USER_NOTIFICATION_AUTHORIZATION_STATUS.NOT_DETERMINED,
					alertStyle:                      1,
					lockScreenSetting:               ux.USER_NOTIFICATION_AUTHORIZATION_STATUS.NOT_DETERMINED,
					alertSetting:                    ux.USER_NOTIFICATION_AUTHORIZATION_STATUS.NOT_DETERMINED,
					providesAppNotificationSettings: ux.USER_NOTIFICATION_AUTHORIZATION_STATUS.NOT_DETERMINED,
					carPlaySetting:                  ux.USER_NOTIFICATION_AUTHORIZATION_STATUS.NOT_DETERMINED,

				});
			}
		});

};

ux.hasNotificationPermissions = async () => {

	return new Promise(
		(resolve, reject) => {

			if (OS_IOS) {
				Ti.App.iOS.UserNotificationCenter.requestUserNotificationSettings(
					settings => {
						// logger.debug(`🦠  settings: ${JSON.stringify(settings, null, 2)}`);

						return resolve([ ux.USER_NOTIFICATION_AUTHORIZATION_STATUS.AUTHORIZED, ux.USER_NOTIFICATION_AUTHORIZATION_STATUS.PROVISIONAL, ux.USER_NOTIFICATION_AUTHORIZATION_STATUS.EPHEMERAL ].includes(settings.authorizationStatus));

					}
				);
			} else {
				return resolve(true);
			}
		});

};


// module.exports = observable(ux);
module.exports = ux;
