const assert = require('assert');
const expect = require("chai").expect;
const TimeT = require("../TimeT.js");

describe("#Class Instantiation", () => [
    it('empty instantiation should create instance of TimeT', () => {
        expect(new TimeT()).to.be.an.instanceof(TimeT);
    }),

    it('string instantiation should create instance of TimeT', () => {
        expect(new TimeT("2017-05-01")).to.be.an.instanceof(TimeT);
    }),
    
    it("date instantiation should create instance of TimeT", () => {
        expect(new TimeT(new Date)).to.be.an.instanceOf(TimeT);
    })
]);


describe("#Instantiating with unsupported date argument", () => {
    it("unsupported string should throw an exception", ()=> {
        let wrongStringInstantiation = () => { new TimeT("hgdfhdgjff") };
        expect(wrongStringInstantiation).to.throw();
    })

    it("supported string should not throw an exception", ()=> {
        let wrongStringInstantiation = () => { new TimeT("2017-05-01") };
        expect(wrongStringInstantiation).to.not.throw();
    })
});
