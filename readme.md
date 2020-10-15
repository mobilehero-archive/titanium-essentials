# @titanium/essentials  <sup><sup><sub><a name="brenton-house" href="#brenton-house">🚀</a></sub></sup></sup> 

![GitHub stars](https://img.shields.io/github/stars/brentonhouse/titanium-essentials?style=social)
![GitHub forks](https://img.shields.io/github/forks/brentonhouse/titanium-essentials?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/brentonhouse/titanium-essentials?style=social)
[![@titanium/essentials](https://img.shields.io/npm/v/@titanium/essentials.png)](https://www.npmjs.com/package/@titanium/essentials)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=brentonhouse/titanium-essentials)](https://dependabot.com)

> Essential Toolkit for Titanium Turbo Native Mobile Apps

* [�   &nbsp; Description](#--description)
* [🚀   &nbsp; Getting Started](#--getting-started)
* [✨  &nbsp; Features](#--features)
	* [Adds properties to the global `turbo` object](#adds-properties-to-the-global-turbo-object)
* [🎓  &nbsp;  Learn More](#--learn-more)
	* [📚  &nbsp;  Related projects](#--related-projects)
		* [🎟️  &nbsp; Modules for Node.js](#️--modules-for-nodejs)
		* [🎟️  &nbsp; Modules for Node.js and Titanium Mobile](#️--modules-for-nodejs-and-titanium-mobile)
* [📣  &nbsp; Feedback](#--feedback)
* [Follow Brenton House](#follow-brenton-house)
* [©️ Legal](#️-legal)


## 📓   &nbsp; Description

Essential Toolkit for Titanium Turbo Native Mobile Apps

## 🚀   &nbsp; Getting Started

1. Install `@titanium/essentials` in root of project

```bash
npm install @titanium/essentials
```

2. Initialize module in `alloy.js`

```JavaScript
require('@titanium/essentials');
```

## ✨  &nbsp; Features

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
* [x] battery_level_formatted
* [x] uptime
* [x] uptime_formatted

> These functions are available

* [x] getClipboardText()
* [x] setClipboardText()


## 🎓  &nbsp;  Learn More

- [@titanium/essentials GitHub Repo](https://github.com/brentonhouse/titanium-essentials)
- [@titanium/essentials npm page](https://npmjs.com/packages/@titanium/essentials)

### 📚  &nbsp;  Related projects

#### 🎟️  &nbsp; Modules for Node.js


| project  	|  description 	|  npm	|
|---	|---  |---	|
| [@geek/google-sheets](https://www.npmjs.com/package/@geek/google-sheets)  	| Easy way to manage Google Sheets API from Node.js  	| [![@geek/google-sheets](https://img.shields.io/npm/v/@geek/google-sheets.png)](https://www.npmjs.com/package/@geek/google-sheets)      |


#### 🎟️  &nbsp; Modules for Node.js and Titanium Mobile

| project  	|  description 	|  npm	|
|---	|---  |---	|
| [@geek/cache](https://www.npmjs.com/package/@geek/cache)  	| Caching module for Node.js and Axway Titanium  	| [![@geek/cache](https://img.shields.io/npm/v/@geek/cache.png)](https://www.npmjs.com/package/@geek/cache)      |
| [@geek/jsonc](https://www.npmjs.com/package/@geek/cache)  	| JSONC and JSON utilities for JavaScript with Node.js and Axway Titanium.  	| [![@geek/jsonc](https://img.shields.io/npm/v/@geek/jsonc.png)](https://www.npmjs.com/package/@geek/jsonc)      |
|  [@geek/jwt](https://www.npmjs.com/package/@geek/jwt) 	| JWT parser for JavaScript Node.js and Titanium native mobile  |  [![@geek/jwt](https://img.shields.io/npm/v/@geek/jwt.png)](https://www.npmjs.com/package/@geek/jwt)     |
|  [@geek/logger](https://www.npmjs.com/package/@geek/logger) 	| Logging module for Node.js and Axway Titanium  |   [![@geek/logger](https://img.shields.io/npm/v/@geek/logger.png)](https://www.npmjs.com/package/@geek/logger)        |
| [@geek/mobile](https://www.npmjs.com/package/@geek/mobile)  	| Toolkit for creating, building, and managing mobile app projects.  	| [![@geek/mobile](https://img.shields.io/npm/v/@geek/mobile.png)](https://www.npmjs.com/package/@geek/mobile)    	|
|  [@geek/retry](https://www.npmjs.com/package/@geek/retry) 	| Retry JavaScript functions and promises in Node.js and Axway Titanium  |   [![@geek/retry](https://img.shields.io/npm/v/@geek/retry.png)](https://www.npmjs.com/package/@geek/retry)        |



## 📣  &nbsp; Feedback

Have an idea or a comment?  [Join in the conversation here](https://github.com/brentonhouse/titanium-essentials/issues)! 


-----

## Follow Brenton House 

> Follow [`Brenton House`](https://brenton.house) for the latest on great modules and libraries!

[![Twitter Follow](https://img.shields.io/twitter/follow/brentonhouse?label=Follow%20%40brentonhouse%20on%20twitter&style=social)](https://twitter.com/brentonhouse)
[![LinkedIn Follow](https://img.shields.io/badge/LinkedIn-_Connect_with_%40brentonhouse_-blue?logo=linkedin&style=flat-square)](https://www.linkedin.com/in/brentonhouse/)
![Github Followers](https://img.shields.io/github/followers/brentonhouse?label=Follow%20%40brentonhouse%20on%20GitHub&style=social)

-----

## ©️ Legal

Code is licensed under MIT

Alloy is developed by Appcelerator and the community and is Copyright © 2012-Present by Appcelerator, Inc. All Rights Reserved.

Alloy is made available under the Apache Public License, version 2. See their license file for more information.

Appcelerator is a registered trademark of Appcelerator, Inc. Titanium is a registered trademark of Appcelerator, Inc. Please see the LEGAL information about using trademarks, privacy policy, terms of usage and other legal information at http://www.appcelerator.com/legal.