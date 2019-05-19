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



});
