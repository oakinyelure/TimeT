const assert = require('assert');
const expect = require("chai").expect;
const TimeT = require("../TimeT.js");


(function() {
    describe("#VALIDATORS", () => {
        describe("#Supported Date String",() => {
            it("Should return an array",() => {
                let supportedRegex = new TimeT().Validators.getSupportedStringDateFormats();
                expect(supportedRegex).to.be.an("Array");
            })
        });
    
        describe("#Supported String array should contain only regular expressions", () => {
            var regularExpressions = new TimeT().Validators.getSupportedStringDateFormats();
            
            for(var i = 0; i < regularExpressions.length; i++) {
                var currentReg = regularExpressions[i];
                it("Index at "+i+ " should be a regular expression", () => {
                    let exp = Object.prototype.toString.call(currentReg);
                    expect(exp).to.equal("[object RegExp]")
                })
            }
        });
    
        describe("#Setting Date with setDateMethod", () => {
            it("Passing a date object should return true", () => {
                let time = new TimeT();
                expect(time.Validators.isValidDate(new Date())).to.be.true;
            }),
    
            it("Passing an integer should return false", () => {
                let time = new TimeT();
                expect(time.Validators.isValidDate(1)).to.be.false;
            })
    
            it("Passing an string should return false", () => {
                let time = new TimeT();
                expect(time.Validators.isValidDate("")).to.be.false;
            })   
            
            
            it("Passing an object should return false", () => {
                let time = new TimeT();
                expect(time.Validators.isValidDate({})).to.be.false;
            })
        });
    });
})();
