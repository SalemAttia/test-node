const fetch = require('node-fetch');
const config = require('./../../config/config');
const parser = require('xml2json');

module.exports = class SearchService {

    constructor(configs) {
        this.configs = configs || config;
    }

    search(bookName, filter = 'all') {
        return new Promise((resolve, reject) => {
            fetch(`${config.goodreads.base_url + config.goodreads.search_resource + bookName}
            &key=${config.goodreads.key}&search[field]=${filter}`, 
            { 
                method: 'GET', 
                headers: { 'Content-Type': 'application/json' },
            },
            ).then(res => res.text(),
            ).then(xml => { 
                const json = JSON.parse(parser.toJson(xml));
                return resolve(json.GoodreadsResponse.search);
            })
                .catch(error => reject(error));
        });
    }

};
