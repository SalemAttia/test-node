'use strict';

const request = require('supertest');
const container = require('../../index');
const expect = require('../Resources/chai').expect;

describe('Routes/todo', () => {
    let app;

    before(async() =>  {
        app = container.app;
    });

    describe('User/Search', () => {
        it('should Search For Book', () => 
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
    });
});
