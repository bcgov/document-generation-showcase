const log = require('npmlog');
const Problem = require('api-problem');

const ClientConnection = require('./clientConnection');

const errorToProblem = (e) => {
  if (e.response) {
    log.error(`Error from CDOGS: status = ${e.response.status}, data : ${JSON.stringify(e.response.data, null, 2)}`);
    let errors = [];
    if (e.response.status === 422) {
      errors = e.response.data.errors;
    }
    throw new Problem(e.response.status, {detail: e.response.data.detail, errors: errors});
  } else {
    log.error(`Unknown error calling CDOGS: ${e.message}`);
    throw new Problem(500, 'Unknown CDOGS Error', {detail: e.message});
  }
};

class CdogsService {
  constructor({tokenUrl, clientId, clientSecret, apiUrl}) {
    log.verbose('CdogsService', `Constructed with ${tokenUrl}, ${clientId}, clientSecret, ${apiUrl}`);
    if (!tokenUrl || !clientId || !clientSecret || !apiUrl) {
      log.error('CdogsService', 'Invalid configuration.');
      throw new Error('CdogsService is not configured. Check configuration.');
    }
    this.connection = new ClientConnection({tokenUrl, clientId, clientSecret});
    this.axios = this.connection.axios;
    this.apiUrl = apiUrl;
  }

  async health() {
    try {
      const { data, status } = await this.axios.get(`${this.apiUrl}/health`, {
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
      const { data, status } = await this.axios.post(`${this.apiUrl}/docGen`, body, {
        responseType: 'arraybuffer' // Needed for binaries unless you want pain
      });

      return { data, status };
    } catch (e) {
      errorToProblem(e);
    }
  }

}

module.exports = CdogsService;
