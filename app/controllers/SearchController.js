const BaseController = require('./BaseController');
const SearchService = require('../services/SearchService');
const _  = require('lodash');
const FILTER_FIELDS = ['title', 'author'];

module.exports = class SearchController extends BaseController {

    /**
     * @param {Express} server
     * @param {SearchService} SearchService 
     */
    constructor(server, searchService) {
        super(server);
        this.SearchService = searchService || new SearchService();
    }

    /**
     * Register Controller
     */
    init() {
        this.server.get('/api/v1/search', (req, res, next) => this.searchAction(req, res, next));
    }
    
    /**
     * @api {get} /api/v1/search Search for books
     * @apiVersion 1.0.0
     * @apiName Search V1
     * @apiGroup Search
     * @ApiDescription V1 Search for books in goodreads API
     * @apiUse Response100
     */
    /**
     * Search Action
     * @param {Object} req 
     * @param {Object} res  
     */
    async searchAction(req, res) {
        try {
            const options = _.pick(req.query, ['q', 'filter', 'sort', 'limit']);
            const searchName = options.q;
            const filter = _.includes(FILTER_FIELDS, options.filter) ? req.query.filter : 'all';
            const isValid = this.validInput(options.q);
            if(!isValid) {
                return res.status(422).json(super.sendResponse('INVALID_INPUT', 'invalid input'));
            }
            const result = await  this.SearchService.search(searchName, filter);
            
            if(options.sort) {
                const sortkey = options.filter === 'author' ? 'best_book.author.name' : 'best_book.title';
                result.results.work = await this.sortResult(result, options.sort, sortkey);
            }
          
            if(options.limit) {
                result.results.work = _.slice(result.results.work, 0, options.limit);
            }

            return res.status(200).json(super.sendResponse('SUCCESS', result));
        } catch(error) {
            console.log('error', error);
            res.status(500).json(super.sendResponse('BACKEND_ERROR', error.message));
        }
    }
    /**
     * 
     * @param {String} text 
     */
    validInput(text) {
        const name = /^[0-9a-zA-Z]+$/.test(text);
        if(name) {
            return true;
        }
        return false;
    }

    /**
     * 
     * @param {Object} result 
     * @param {String} sortType 
     * @param {String} sortkey 
     */
    sortResult(result, sortType, sortkey = 'best_book.title') {
        const orderedData = _.orderBy(result.results.work, [sortkey], [sortType]);
        return orderedData;
    }

};
