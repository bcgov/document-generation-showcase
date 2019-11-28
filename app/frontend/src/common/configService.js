import axios from 'axios';

class ConfigService {
  constructor() {
    this._config = {};
  }

  get config() {
    return this._config;
  }

  get resource() {
    return this._resource;
  }

  set resource(v) {
    this._config = (async () => await this.load(v))();
  }

  get(propertyName) {
    let result;
    if (!this.config) {
      this._config = (async () => await this.load())();
    }
    try {
      result = this.config[propertyName];
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(`configService.get(${propertyName})... error = ${err}`);
    }
    return result;
  }

  async load(resource = null) {
    if (resource) {
      this._resource = resource;
    }
    try {
      const response = await axios.get(this._resource);
      this._config = response.data;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(`Failed to acquire configuration: ${err.message}`);
    }
    return this._config;
  }

}

const configService = new ConfigService();

export default configService;
