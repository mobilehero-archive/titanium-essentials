# @titanium/essentials

[![@titanium/essentials](https://img.shields.io/npm/v/@titanium/essentials.png)](https://www.npmjs.com/package/@titanium/essentials)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=brentonhouse/titanium-essentials)](https://dependabot.com)

> Essential Toolkit for Titanium Turbo Native Mobile Apps

* [📝 Description](#-description)
* [🚀 Getting Started](#-getting-started)
* [✨Features](#features)
	* [Adds properties to the global `turbo` object](#adds-properties-to-the-global-turbo-object)
* [📚Learn More](#learn-more)
* [📣 Feedback](#-feedback)
* [©️ Legal](#️-legal)


## 📝 Description

Essential Toolkit for Titanium Turbo Native Mobile Apps

## 🚀 Getting Started

1. Install `@titanium/essentials` in root of project

```bash
npm install @titanium/essentials
```

2. Initialize module in `alloy.js`

```JavaScript
require('@titanium/essentials');
```

## ✨Features

### Adds properties to the global `turbo` object

> These properties are set on initialization

* [x] app_copyright
* [x] app_deploy_type
* [x] app_description
* [x] app_display_name
* [x] app_first_installed_version
* [x] app_guid
* [x] app_id
* [x] app_name
* [x] app_publisher
* [x] app_url
* [x] app_version
* [x] app_version_build
* [x] app_version_history
* [x] app_version_major
* [x] app_version_minor
* [x] app_version_previous
* [x] country_code
* [x] device_architecture
* [x] device_density
* [x] device_dpi
* [x] device_id
* [x] device_logical_density_factor
* [x] device_manufacturer
* [x] device_model
* [x] device_model_name
* [x] device_processor_count
* [x] device_total_memory
* [x] device_total_memory_formatted
* [x] install_id
* [x] ip_address
* [x] isAndroid
* [x] isFirstLaunchAfterUpdate
* [x] isFirstLaunchEver
* [x] isFirstLaunchForCurrentVersion
* [x] isIos
* [x] isIos10Plus
* [x] isIos11Plus
* [x] isIos12Plus
* [x] isIos13Plus
* [x] isIos14Plus
* [x] isIos7Plus
* [x] isIos8Plus
* [x] isIos9Plus
* [x] isIpad
* [x] isIphone
* [x] isVirtual
* [x] language_code
* [x] locale
* [x] mac_address
* [x] netmask
* [x] network_change_reason
* [x] network_type
* [x] network_type_name
* [x] online
* [x] os
* [x] os_name
* [x] os_name_full
* [x] os_type
* [x] os_version
* [x] os_version_build
* [x] os_version_major
* [x] os_version_minor
* [x] platform
* [x] runtime
* [x] session_id
* [x] titanium_sdk_version
* [x] username

> These properties are set on initialization and orientation change


* [x] device_height_actual
* [x] device_width
* [x] isLandscape
* [x] isPortrait
* [x] platform_height
* [x] platform_width


> These properties are calculated on-the-fly

* [x] device_available_memory
* [x] device_available_memory_formatted
* [x] battery_level
* [x] uptime
* [x] uptime_formatted

> These functions are available

* [x] getClipboardText()
* [x] setClipboardText()


## 📚Learn More

- [@titanium/essentials GitHub Repo](https://github.com/brentonhouse/titanium-essentials)
- [@titanium/essentials npm page](https://npmjs.com/packages/@titanium/essentials)

## 📣 Feedback

Have an idea or a comment?  [Join in the conversation here](https://github.com/brentonhouse/titanium-essentials/issues)! 

## ©️ Legal

Code is licensed under MIT

Alloy is developed by Appcelerator and the community and is Copyright © 2012-Present by Appcelerator, Inc. All Rights Reserved.

Alloy is made available under the Apache Public License, version 2. See their license file for more information.

Appcelerator is a registered trademark of Appcelerator, Inc. Titanium is a registered trademark of Appcelerator, Inc. Please see the LEGAL information about using trademarks, privacy policy, terms of usage and other legal information at http://www.appcelerator.com/legal.