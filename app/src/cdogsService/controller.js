const config = require('config');
const CdogsService = require('./cdogsService');

const getService = () => {
  const clientConfig = config.get('services.cdogs');
  const cdogsService = new CdogsService(clientConfig);
  return cdogsService;
};

const healthCheck = async (req, res, next) => {
  const svc = getService();
  try {
    const response = await svc.health();
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = {healthCheck};
