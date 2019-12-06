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
      console.log(`configService.get(${propertyName})... error = ${err}`);
    }
    return result;
  }

  async load(resource = null) {
    const storageKey = 'config';

    try {
      if (resource) {
        this._resource = resource;
      }

      if (sessionStorage.getItem(storageKey) === null) {
        const { data } = await axios.get(this._resource);
        sessionStorage.setItem(storageKey, JSON.stringify(data));
      }

      this._config = JSON.parse(sessionStorage.getItem(storageKey));
    } catch (err) {
      console.log(`Failed to acquire configuration: ${err.message}`);
      sessionStorage.removeItem(storageKey);
    }

    return this._config;
  }

}

export default new ConfigService();
