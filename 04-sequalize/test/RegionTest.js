import chai from "chai";
import chaiHttp from "chai-http";
import app from '../index.js';

//const should = chai.should();

chai.use(chaiHttp);

describe('/GET Regions', () => {
    // query all
    it('should fetch a more than one 5 rows regions', async () => {
        const res = await chai.request(app).get('/regions/');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBe(5);
    });
});


describe('/Post Regions', () => {
    // post
    it('should insert a one rows regions, then fetch 6 rows', async () => {
        const res = await chai.request(app).post('/regions/')
            .send({
                region_name: "Jest Unit"
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body.region_name).toEqual("Jest Unit");
    });
});



