const assert = require('assert');
const expect = require("chai").expect;
const TimeT = require("../TimeT.js");

(function() {
    describe("#Passing parameters to Priotize", function() {
        let tt = new TimeT("2017-04-01");
        it("should be able to accept one instance of TimeT",function() {
            let priorityInstance = new TimeT();
            let priorityList = new TimeT().Priotize(priorityInstance);
            expect(priorityList.getPrevious()[1]).to.be.equal(priorityInstance);
        }),

        it("should have two elements when one TimeT arg is passed. The inital element is the reference to the priority is created",function() {
            let priorityInstance = new TimeT();
            let priorityList = new TimeT().Priotize(priorityInstance);
            expect(priorityList.getPrevious().length).to.be.equal(2);
        })        

        it("should throw an excpetion when you pass multiple parameters", function() {
            expect(function() {
                new TimeT().Priotize(new TimeT(), new TimeT());
            }).to.throw();
        }),

        it("should accept an array of timeT", function() {
            let list = [new TimeT(), new TimeT(), new TimeT()];
            let pInstance = new TimeT().Priotize(list);

            /**
             * To Avoid writing long equality processes for object reference, I will
             * use length to test
             */
            expect(pInstance.getPrevious().length).to.equal(list.length);
        }),

        it("should retain only instance of Time T in the argument array", function() {
            let list = [new TimeT(), new String(), new BigUint64Array(), new Set(),new TimeT(), new TimeT(), new Date()];
            let pInstance = new TimeT().Priotize(list);

            let pResult = pInstance.getPrevious();

            for(var i = 0; i < pResult.length; i++) {
                expect(pResult[i]).to.be.an.instanceOf(TimeT);
            }
        })
    })
})();