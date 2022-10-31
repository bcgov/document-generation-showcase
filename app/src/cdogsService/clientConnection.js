const axios = require('axios');
const log = require('../../src/components/log')(module.filename);
const oauth = require('axios-oauth-client');
const tokenProvider = require('axios-token-interceptor');

class ClientConnection {
  constructor({ tokenUrl, clientId, clientSecret }) {
    log.verbose('ClientConnection', `Constructed with ${tokenUrl}, ${clientId}, clientSecret`);
    if (!tokenUrl || !clientId || !clientSecret) {
      log.error('Invalid configuration.', { function: 'constructor' });
      throw new Error('ClientConnection is not configured. Check configuration.');
    }

    this.tokenUrl = tokenUrl;

    // get access token
    const getClientCredentials = oauth.clientCredentials(
      axios.create(),
      this.tokenUrl,
      clientId,
      clientSecret
    );

    // intercept axios calls with access token
    this.axios = axios.create();
    this.axios.interceptors.request.use(tokenProvider({
      getToken: () => getClientCredentials()
        .then(response => response.access_token)
    }));

  }
}

module.exports = ClientConnection;
