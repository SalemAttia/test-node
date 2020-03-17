'use strict';

const request = require('supertest');
const container = require('../../index');
const expect = require('../Resources/chai').expect;

describe('Routes/api/v1/search', () => {
    let app;

    before(async() =>  {
        app = container.app;
    });

    describe('/api/v1/search', () => {
        it('should Search For Book with valid input', () => 
            request(app)
                .get('/api/v1/search?q=a')
                .expect(200)
                .then(response => {
                    expect(response.body.code).to.be.equal('SUCCESS');
                    expect(response.body).to.contain.keys([
                        'code', 'response',
                    ]);
                }),
        );

        it('should return INVALID_INPUT with invalid input', () => 
            request(app)
                .get('/api/v1/search?q=<>')
                .expect(422)
                .then(response => {
                    expect(response.body.code).to.be.equal('INVALID_INPUT');
                }),
        );

        it('should return data with filter and name', () => 
            request(app)
                .get('/api/v1/search?q=any&filter=title')
                .expect(200)
                .then(response => {
                    expect(response.body.code).to.be.equal('SUCCESS');
                }),
        );
    });
});
