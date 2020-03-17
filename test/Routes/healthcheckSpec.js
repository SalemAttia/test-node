'use strict';

const request = require('supertest');
const container = require('../../index');
const expect = require('../Resources/chai').expect;

describe('Routes/HealthCheck', () => {
    let app;

    before(async() =>  {
        app = container.app;
    });

    describe('api/v1', () => {
        it('should check for health', () => 
            request(app)
                .get('/api/v1/')
                .expect(200)
                .then(response => {
                    expect(response.body.code).to.be.equal('SUCCESS');
                    expect(response.body.response).to.be.equal('You know for search books');
                }),
        );
    });
});
