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
    log.info('CdogsService ', `${tokenUrl}, ${clientId}, secret, ${apiUrl}`);
    if (!tokenUrl || !clientId || !clientSecret || !apiUrl) {
      log.error('CdogsService - invalid configuration.');
      throw new Error('CdogsService is not configured.  Check configuration.');
    }
    this.connection = new ClientConnection({tokenUrl, clientId, clientSecret});
    this.axios = this.connection.axios;
    this.apiUrl = apiUrl;
  }

  async health() {
    try {
      const response = await this.axios.get(
        `${this.apiUrl}/health`,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data;
    } catch (e) {
      errorToProblem(e);
    }
  }

}

module.exports = CdogsService;
