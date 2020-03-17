module.exports = class InitControllers {

    /**
     * Register all Controllers to the server Object
     * @param {Object} server 
     */
    init(server) {
        const controllerPath = require('path').join(__dirname, '/controllers');
        let _HomepageController;

        require('fs').readdirSync(controllerPath).forEach(file => {
            if('BaseController.js' !== file && 'HomeController.js' !== file) {
                const Controller = require(`./controllers/${file}`);
                (new Controller(server)).init();
            } else if('HomeController.js' === file) {
                _HomepageController = require(`./controllers/${file}`);
            }
        });

        if(_HomepageController) {
            (new _HomepageController(server)).init();
        }
        
        return server;
    }

};
