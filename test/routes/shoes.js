const request = require('../support/http');


describe('routes/shoes', function() {

    context('GET', function() {

        it('should return an array of shoes', function() {
            return request
            .get('/shoes')
            .expect(200)
            .then( (res) => {
                expect(res.body).is.an('Array');
                expect(res.body[0]).to.have.property('shoe_id');
                expect(res.body[0]).to.have.property('shoe_name');
            });
        });

        it('should return one shoe based on the search', function() {
            return request
            .get('/shoes?search=vegeta')
            .expect(200)
            .then( (res) => {
                expect(res.body).is.an('Array');
                expect(res.body).to.have.lengthOf(1);
            });
        });
    });

    context('POST', function() {

        context('passing in shoe_name', function() {

            it('should return 201', function() {
                return request
                .post('/shoes')
                .send({ shoe_name: 'testShoe' })
                .expect(201);
            });
        });

        context('not passing in shoe_name', function() {

            it('should return 400', function() {
                return request
                .post('/shoes')
                .send()
                .expect(400);
            });
        });

    });
    context('PUT fit/ratings', function() {

        context('passing in id param and no rank', function() {

            it('should return 400', function() {
                return request
                .put('/shoes/1/fit/ratings')
                .send()
                .expect(400);
            });
        });

        context('passing in id param and rank', function() {

            it('should return 200', function() {
                return request
                .put('/shoes/1/fit/ratings')
                .send({ rank: 5 })
                .expect(200);
            });
        });

        context('passing in id that does not exist', function() {

            it('should return 500', function() {
                return request
                .put('/shoes/100/fit/ratings')
                .send({ rank: 5 })
                .expect(500);
            });
        });

    });

    context('GET shoe fit rank', function() {

        context('passing in an id that exists', function() {

            it('should return an object with trueToSizeCalculation', function() {
                return request
                .get('/shoes/1/fit')
                .expect(200)
                .then( (res) => {
                    expect(res.body).to.be.an('Object');
                    expect(res.body).to.have.property('trueToSizeCalculation');
                });
            });
        });

        context('passing in and id that does not exist', function() {

            it('should return 400', function() {
                return request
                .get('/shoes/100/fit')
                .expect(400);
            });
        });
    });

});
