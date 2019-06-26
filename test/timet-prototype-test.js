const assert = require('assert');
const expect = require("chai").expect;
const TimeT = require("../TimeT.js");


(function() {
    const TIME_INSTANCE = new TimeT("2017-01-01");

    describe("#Class Instantiation", () => {
        it('empty instantiation should create instance of TimeT', function() {
            expect(new TimeT()).to.be.an.instanceof(TimeT);
        }),
    
        it('string instantiation should create instance of TimeT', function()  {
            expect(new TimeT("2017-05-01")).to.be.an.instanceof(TimeT);
        }),
        
        it("date instantiation should create instance of TimeT", function() {
            expect(new TimeT(new Date)).to.be.an.instanceOf(TimeT);
        })
    });
    
    
    describe("#Instantiating with unsupported date argument", function() {
        it("unsupported string should throw an exception", ()=> {
            let wrongStringInstantiation = () => { new TimeT("hgdfhdgjff") };
            expect(wrongStringInstantiation).to.throw();
        })
    
        it("supported string should not throw an exception", ()=> {
            let wrongStringInstantiation = () => { new TimeT("2017-05-01") };
            expect(wrongStringInstantiation).to.not.throw();
        })
    });
    
    describe("#Date property", function() {
        let instanceDate = new Date("2014-05-04");
        let newTime = new TimeT(instanceDate);
        it("should not have an accessible date property", function() {
            expect((newTime.date == null)).to.be.true;
        }),
    
        it("private date property should equal date set from instance", function() {
            expect(newTime.getTimeInstance()).to.equal(instanceDate);
        }),
    
        it("date instance should equal instance set by setDate property", function() {
            let newDate = new Date("2018-01-05");
            newTime.setDate(newDate);
            expect(newTime.getTimeInstance()).to.equal(newDate);
        })
    });

    describe("#add()", function() {
        it("should throw an exception when you invoke with method with unsupported argument", function() {
            expect(function() { TIME_INSTANCE.add(new Date())}).to.throw();
            expect(function() { TIME_INSTANCE.add(2)}).to.throw();
            expect(function() { TIME_INSTANCE.add()}).to.throw();
            expect(function() { TIME_INSTANCE.add("1")}).to.throw();
            expect(function() { TIME_INSTANCE.add("e years")}).to.throw();
            expect(function() { TIME_INSTANCE.add("1 lightyears")}).to.throw();
        })
    })


})();

