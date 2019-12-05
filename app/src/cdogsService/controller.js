const config = require('config');
const CdogsService = require('./cdogsService');

const getService = () => {
  const clientConfig = config.get('services.cdogs');
  return new CdogsService(clientConfig);
};

const healthCheck = async (_req, res, next) => {
  const svc = getService();
  try {
    const { data, status } = await svc.health();
    res.status(status).json(data);
  } catch (error) {
    next(error);
  }
};

const docGen = async (req, res, next) => {
  const svc = getService();
  try {
    const { data, status } = await svc.docGen(req.body);
    res.status(status).set({
      'Content-Disposition': 'attachment'
    }).send(data);
  } catch (error) {
    next(error);
  }
};

module.exports = { healthCheck, docGen };
