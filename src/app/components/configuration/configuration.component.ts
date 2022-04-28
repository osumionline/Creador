import { Component } from '@angular/core';
import {
	ProjectDataResult,
	ProjectConfiguration,
	ProjectConfigurationLists,
	KeyValue
} from 'src/app/interfaces/interfaces';
import { CommonService } from 'src/app/services/common.service';

@Component({
	selector: 'app-configuration',
	templateUrl: './configuration.component.html',
	styleUrls: ['../../pages/project/project.component.scss']
})
export class ConfigurationComponent {
	projectConfiguration: ProjectConfiguration = {
		baseUrl: '',
		adminEmail: '',
		defaultTitle: '',
		lang: 'es',
		hasDB: false,
		dbHost: '',
		dbName: '',
		dbUser: '',
		dbPass: '',
		dbCharset: 'utf8mb4',
		dbCollate: 'utf8mb4_unicode_ci',
		cookiesPrefix: '',
		cookiesUrl: '',
		error403: '',
		error404: '',
		error500: ''
	};
	projectConfigurationLists: ProjectConfigurationLists = {
		css: [],
		cssExt: [],
		js: [],
		jsExt: [],
		libs: [],
		extra: [],
		dir: []
	};
	newItem = {
		css: '',
		cssExt: '',
		js: '',
		jsExt: '',
		libs: '',
		extraKey: '',
		extraValue: '',
		dirKey: '',
		dirValue: ''
	};
	row = {
		general: true,
		db: false,
		cookies: false,
		errors: false,
		css: false,
		js: false,
		libs: false,
		extra: false,
		dir: false
	};

	constructor(private cs: CommonService) {}

	load(data: ProjectDataResult) {
		this.projectConfiguration.baseUrl       = this.cs.urldecode(data.configuration.baseUrl);
		this.projectConfiguration.adminEmail    = this.cs.urldecode(data.configuration.adminEmail);
		this.projectConfiguration.defaultTitle  = this.cs.urldecode(data.configuration.defaultTitle);
		this.projectConfiguration.lang          = this.cs.urldecode(data.configuration.lang);
		this.projectConfiguration.hasDB         = data.configuration.hasDB;
		this.projectConfiguration.dbHost        = this.cs.urldecode(data.configuration.dbHost);
		this.projectConfiguration.dbName        = this.cs.urldecode(data.configuration.dbName);
		this.projectConfiguration.dbUser        = this.cs.urldecode(data.configuration.dbUser);
		this.projectConfiguration.dbPass        = null;
		this.projectConfiguration.dbCharset     = this.cs.urldecode(data.configuration.dbCharset);
		this.projectConfiguration.dbCollate     = this.cs.urldecode(data.configuration.dbCollate);
		this.projectConfiguration.cookiesPrefix = this.cs.urldecode(data.configuration.cookiesPrefix);
		this.projectConfiguration.cookiesUrl    = this.cs.urldecode(data.configuration.cookiesUrl);
		this.projectConfiguration.error403      = this.cs.urldecode(data.configuration.error403);
		this.projectConfiguration.error404      = this.cs.urldecode(data.configuration.error404);
		this.projectConfiguration.error500      = this.cs.urldecode(data.configuration.error500);

		this.projectConfigurationLists.css    = data.lists.css.map(this.cs.urldecode);
		this.projectConfigurationLists.cssExt = data.lists.cssExt.map(this.cs.urldecode);
		this.projectConfigurationLists.js     = data.lists.js.map(this.cs.urldecode);
		this.projectConfigurationLists.jsExt  = data.lists.jsExt.map(this.cs.urldecode);
		this.projectConfigurationLists.libs   = data.lists.libs.map(this.cs.urldecode);
		this.projectConfigurationLists.extra  = data.lists.extra.map((item) => { return this.urldecodeKeyValue(item); });
		this.projectConfigurationLists.dir    = data.lists.dir.map((item) => { return this.urldecodeKeyValue(item); });
	}

	getConfiguration() {
		return this.projectConfiguration;
	}

	getConfigurationLists() {
		return this.projectConfigurationLists;
	}

	urldecodeKeyValue(item) {
		return {key: this.cs.urldecode(item.key), value: this.cs.urldecode(item.value)};
	}

	deploy(ind) {
		this.row[ind] = !this.row[ind];
	}

	changeHasDB() {
		this.projectConfiguration.hasDB = !this.projectConfiguration.hasDB;
	}

	addNew(type) {
		switch(type) {
			case 'css':
			case 'cssExt':
			case 'js':
			case 'jsExt':
			case 'libs':
				this.projectConfigurationLists[type].push( this.newItem[type] );
				this.newItem[type] = '';
			break;
			case 'extra':
				this.projectConfigurationLists.extra.push( {key: this.newItem.extraKey, value: this.newItem.extraValue } as KeyValue );
				this.newItem.extraKey = '';
				this.newItem.extraValue = '';
			break;
			case 'dir':
				this.projectConfigurationLists.dir.push( {key: this.newItem.dirKey, value: this.newItem.dirValue } as KeyValue );
				this.newItem.dirKey = '';
				this.newItem.dirValue = '';
			break;
		}
	}

	deleteNew(type, ind) {
		this.projectConfigurationLists[type].splice(ind, 1);
	}
}