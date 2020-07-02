const log = require('npmlog');
const Problem = require('api-problem');

const ClientConnection = require('./clientConnection');

const errorToProblem = (e) => {
  if (e.response) {
    log.error(`Error from CDOGS: status = ${e.response.status}, data : ${e.response.data}`);
    // Validation Error
    if (e.response.status === 422) {
      throw new Problem(e.response.status, {
        detail: e.response.data.detail,
        errors: JSON.parse(e.response.data).errors
      });
    }
    // Something else happened but there's a response
    throw new Problem(e.response.status, { detail: e.response.data.toString() });
  } else {
    log.error(`Unknown error calling CDOGS: ${e.message}`);
    throw new Problem(502, 'Unknown CDOGS Error', { detail: e.message });
  }
};

class CdogsService {
  constructor({ tokenUrl, clientId, clientSecret, apiUrl }) {
    log.verbose('CdogsService', `Constructed with ${tokenUrl}, ${clientId}, clientSecret, ${apiUrl}`);
    if (!tokenUrl || !clientId || !clientSecret || !apiUrl) {
      log.error('CdogsService', 'Invalid configuration.');
      throw new Error('CdogsService is not configured. Check configuration.');
    }
    this.connection = new ClientConnection({ tokenUrl, clientId, clientSecret });
    this.axios = this.connection.axios;
    this.apiUrl = apiUrl;
  }

  async health() {
    try {
      const endpoint = `${this.apiUrl}/health`;
      log.debug('health', `GET to ${endpoint}`);

      const { data, status } = await this.axios.get(endpoint, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      return { data, status };
    } catch (e) {
      errorToProblem(e);
    }
  }

  async docGen(body) {

    // After change to CDOGS V2
    // The JSON data (replacements) shouldn't be enclosed in an array
    if(Array.isArray(body.data)) {
      body.data = body.data[0];
    }

    try {
      const endpoint = `${this.apiUrl}/template/render`;
      log.debug('docGen', `POST to ${endpoint}`);

      const { data, headers, status } = await this.axios.post(endpoint, body, {
        responseType: 'arraybuffer' // Needed for binaries unless you want pain
      });

      return { data, headers, status };
    } catch (e) {
      errorToProblem(e);
    }
  }
}

module.exports = CdogsService;
