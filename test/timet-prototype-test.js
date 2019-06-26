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
        describe("#Invocation", function() {
            it("should throw an exception when you invoke with method with unsupported argument", function() {
                expect(function() { TIME_INSTANCE.add(new Date())}).to.throw();
                expect(function() { TIME_INSTANCE.add(2)}).to.throw();
                expect(function() { TIME_INSTANCE.add()}).to.throw();
                expect(function() { TIME_INSTANCE.add("1")}).to.throw();
                expect(function() { TIME_INSTANCE.add("e years")}).to.throw();
                expect(function() { TIME_INSTANCE.add("1 lightyears")}).to.throw();
            })
        });

        describe("#years", function() {
            it("should add the number of years in the parameter to the date object",function() {
                let expectedDate = new Date("2019-01-01");
                TIME_INSTANCE.add("2 years");
                expect(TIME_INSTANCE.getTimeInstance().toString()).to.equal(expectedDate.toString());
            }),
            it("should not add any years if 0 is passed to the parameter", function() {
                let instance = new TimeT("2013-01-04");
                let instanceOfDateAdded = new Date("2013-01-04");
                
                instance.add("0 year");
                expect(instance.getTimeInstance().toString()).to.equal(instanceOfDateAdded.toString());
            }),
            it("should subtract years when you pass negative year param", function() {
                let expectedDate = new Date("2003-01-04");
                let instance = new TimeT("2005-01-04");
                instance.add("-2 years");
                expect(instance.getTimeInstance().toString()).to.equal(expectedDate.toString());
            })
        });

        describe("#days", function() {
            it("should add the number of days in the parametr to the date object", function() {
                let tInstance = new TimeT(new Date("2017-05-04"));
                tInstance.add("4 days");
                expect(tInstance.getTimeInstance().getUTCDate()).equal(8);
            }),

            it("should subtract the number of days passd to the parameter when a negative argument", function() {
                let tInstance = new TimeT("2017-05-10");
                tInstance.add("-2 days");
                expect(tInstance.getTimeInstance().getUTCDate()).to.equal(8);
            }),
            it("should increase month if added days exceed the current month", function() {
                let instance = new TimeT("2019-06-26");
                instance.add("9 days");
                expect(instance.getTimeInstance().getUTCMonth()).to.equal(6);
            }),
            it("should increase to march if february is increased by 1", function() {
                let instance = new TimeT("2019-02-28");
                instance.add("1 days");
                expect(instance.getTimeInstance().getUTCMonth()).to.equal(2);
            }),
            it("should decrease to february if march 2nd is reduced by 2 days", function() {
                let instance = new TimeT("2019-03-02");
                instance.add("-2 days");
                expect(instance.getTimeInstance().getUTCMonth()).to.equal(1);
                expect(instance.getTimeInstance().getUTCDate()).to.equal(28);
            })
        });

        describe("#months",function() {
            it("should add the number of months in the parametr to the date object", function() {
                let tInstance = new TimeT(new Date("2017-05-04"));
                tInstance.add("4 months");
                expect(tInstance.getTimeInstance().getUTCMonth()).equal(8);
            })
        });

    })


})();

