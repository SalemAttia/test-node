'use strict';

const request = require('supertest');
const container = require('../../index');

describe('Routes/Home', () => {
    let app;

    before(async() =>  {
        app = container.app;
    });

    describe('/', () => {
        it('should get home page', () => 
            request(app)
                .get('/')
                .expect(200),
        );
    });
});
