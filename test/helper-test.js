const assert = require('assert');
const expect = require("chai").expect;
const TimeT = require("../TimeT.js");

(function() {

    describe("#Helpers", () => {
        describe("#IsAFunction prototype ", function() {
            let timeInstance = new TimeT();

            it("should not exist without calling polyfill", function() {;
                let test = function(){};
                expect(function() {test.isAFunction()}).to.throw();
            }),

            it("should exist after calling polyfill", function() {  
                timeInstance.Helpers.applyPolyfill();
                expect(new Object.isAFunction() != null).to.be.true;
            }),

            it("should return false when used on an object that is not a function", function() {
                let testArray = [new TimeT(), new TimeT(), new TimeT()];
                expect(testArray.isAFunction()).to.be.false;
            }),

            it("should return true when used on legacy function declaration", function() {
                let fn = function(){};
                expect(fn.isAFunction()).to.be.true;
            }),

            it("should return true when used on ES6 function declaration", function() {
                let fn = () => {};
                expect(fn.isAFunction()).to.be.true;
            }),
            
            it("should return true if compared with other function comparison methods", function() {
                let fn = () => {};
                expect(fn.isAFunction() == (typeof fn == "function")).to.be.true;
            })
        });

        describe("#IsArray prototype", function() {
            let inst = new String("This is a test string");
            it("should return false if used on objects that are not arrays", function() {
                expect(inst.isArray()).to.be.false;
            }),

            it("should return true if used on array objects", function() {
                let instArray = inst.split(" ");
                expect(instArray.isArray()).to.be.true;
            }),

            it("should return true on legacy array objects", function() {
                expect(new Array().isArray()).to.be.true;
            }),

            it("should return true on new array objects", function() {
                expect([].isArray()).to.be.true;
            })            
        })
       
    })

})();