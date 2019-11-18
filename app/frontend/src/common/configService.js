import axios from 'axios';

const defaultResource = './runtime-config.json';

class ConfigService {
  constructor() {
    this._resource = defaultResource;
    this._config = {};
  }

  get config() {
    return this._config;
  }

  get resource() {
    return this._resource;
  }

  set resource(v) {
    this._config = (async() => await this.load(v))();
  }

  get(propertyName) {
    let result;
    if (!this.config) {
      this._config = (async() => await this.load())();
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
    this._config = await axios.get(this._resource)
      .then(response => {
        return response.data;
      });
    return this._config;
  }

}

const configService = new ConfigService();

export default configService;
