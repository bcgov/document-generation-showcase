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
      console.error(`configService.get(${propertyName})... error = ${err}`);
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
      sessionStorage.removeItem(storageKey);
      throw new Error(`Failed to acquire configuration: ${err.message}`);
    }

    return this._config;
  }

}

export default new ConfigService();
