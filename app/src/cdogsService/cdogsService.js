const log = require('../../src/components/log')(module.filename);

const Problem = require('api-problem');
const ClientConnection = require('./clientConnection');

const errorToProblem = (e) => {
  if (e.response) {
    log.error(`Error from CDOGS: status = ${e.response.status}, data : ${e.response.data}`, { function: 'errorToProblem' });
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
    log.error(`Unknown error calling CDOGS: ${e.message}`, { function: 'errorToProblem' });
    throw new Problem(502, 'Unknown CDOGS Error', { detail: e.message });
  }
};

class CdogsService {
  constructor({ tokenUrl, clientId, clientSecret, apiUrl }) {
    log.verbose(`Constructed with ${tokenUrl}, ${clientId}, clientSecret, ${apiUrl}`, { function: 'constructor' });
    if (!tokenUrl || !clientId || !clientSecret || !apiUrl) {
      log.error('Invalid configuration.', { function: 'constructor' });
      throw new Error('CdogsService is not configured. Check configuration.');
    }
    this.connection = new ClientConnection({ tokenUrl, clientId, clientSecret });
    this.axios = this.connection.axios;
    this.apiUrl = apiUrl;
  }

  async health() {
    try {
      const endpoint = `${this.apiUrl}/health`;
      log.debug(`GET to ${endpoint}`, { function: 'health' });

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
    try {
      const endpoint = `${this.apiUrl}/template/render`;
      log.debug(`POST to ${endpoint}`, { function: 'docGen' });

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
