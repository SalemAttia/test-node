const config = require('./config/config.json');
const express = require('express');
const bodyParser = require('body-parser');
const InitControllers = require('./app/InitControllers');
const logger = require('./services/logger');

const app = express();

require('./middlewares')(app);
app.use(bodyParser.json());

let _resolve;
const readyPromise = new Promise(resolve => {
    _resolve = resolve;
});

const contr = new InitControllers();
contr.init(app);

const server = require('http').createServer(app);
const port = process.env.Node_ENV_PORT;
if(!port) {
    server.listen(config.serverPort, () => {
        logger.info(`> Listening at http://localhost:${port ? port : config.serverPort}\n`);
        _resolve();
    });
}

if(port) {
    app.listen(port);
    console.log(`listening on http://localhost:${port}`);
}

module.exports = {
    app,
    ready: readyPromise,
    close: done => {
        server.close(done);
    },
};
