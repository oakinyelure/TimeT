const assert = require('assert');
const expect = require("chai").expect;
const TimeT = require("../TimeT.js");

(function() {

    describe("#Helpers", () => [
        describe("#IsAFunction prototype ", function() {
            it("should not exist without calling polyfill", function() {;
                let test = function(){};
                expect(function() {test.isAFunction()}).to.throw();
            })
        })
    ])

})();