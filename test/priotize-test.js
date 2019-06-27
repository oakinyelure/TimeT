const assert = require('assert');
const expect = require("chai").expect;
const TimeT = require("../TimeT.js");

(function() {

    describe("#Priotize", function() {

        describe("#Passing parameters to Priotize", function() {
            it("should be able to accept one instance of TimeT",function() {
                let priorityInstance = new TimeT();
                let priorityList = new TimeT().Priotize(priorityInstance);
                expect(priorityList.getPrevious()[1]).to.be.equal(priorityInstance);
            }),

            it("should have two elements when one TimeT arg is passed. The inital element is the reference to the priority is created",function() {
                let priorityInstance = new TimeT();
                let priorityList = new TimeT().Priotize(priorityInstance);
                expect(priorityList.getPrevious().length).to.be.equal(2);
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
                let list = [new TimeT("2017-04-01"), new String(), new BigUint64Array(), new Set(),new TimeT(), new TimeT("2019-04-01"), new Date()];
                let pInstance = new TimeT().Priotize(list);

                let pResult = pInstance.getPrevious();

                for(var i = 0; i < pResult.length; i++) {
                    expect(pResult[i]).to.be.an.instanceOf(TimeT);
                }
            }),

            it("should accept an empty array as an empty priority instance", function() {
                let inst = new TimeT().Priotize([]);
                expect(inst.getOrdered().length).equal(0);
                expect(inst.getPrevious().length).equal(0);
            })
        });

        describe("#getPrevious()", function() {
            let listToPriotize = [new TimeT("2017-01-04"), new TimeT("2018-01-04"), new TimeT("2019-01-04")];

            it("should return previous array content",function() {
                let tInstance = new TimeT().Priotize(listToPriotize);
                let previousDates = tInstance.getPrevious();
                for(var i = 0; i < previousDates.length; i++) {
                    expect(previousDates[i]).to.equal(listToPriotize[i]);
                }
            })
        });

        describe("#getOrdered()", function() {
            let listToPriotize = [new TimeT("2017-01-04"), new TimeT("2018-01-04"), new TimeT("2019-01-04")];

            it("should return ordered list by descending order",function() {
                let tInstance = new TimeT().Priotize(listToPriotize);
                let orderedDates = tInstance.getOrdered();

                expect(listToPriotize[2]).to.equal(orderedDates[0]);
            })
        });

        describe("#front()", function() {
            let listToPriotize = [new TimeT("2017-01-04"), new TimeT("2018-01-04"), new TimeT("2019-01-04")];
            let tInstance = new TimeT().Priotize(listToPriotize);
            it("should return the most recent date", function() {
                expect(tInstance.front()).to.equal(listToPriotize[2]);
            }),

            it("should throw an exception when list is empty", function() {
                expect(function() {
                    let inst = new TimeT().Priotize([]);
                    inst.front();
                }).to.throw()
            })
        });

        describe("#rear()", function() {
            let listToPriotize = [new TimeT("2017-01-04"), new TimeT("2018-01-04"), new TimeT("2019-01-04")];
            let tInstance = new TimeT().Priotize(listToPriotize);

            it("should return the least recent date", function() {
                expect(tInstance.rear()).to.equal(listToPriotize[0]);
            }),

            it("should throw an exception when list is empty", function() {
                expect(function() {
                    let inst = new TimeT().Priotize([]);
                    inst.rear();
                }).to.throw()
            })            
        });

        describe("#isEmpty()", function() {
            let inst = new TimeT().Priotize([]);
            it("should return false when priority list is empty", function() {
                expect(inst.isEmpty()).to.be.true;
            }),
            it("should return true when priority list is not empty", function() {
                inst = new TimeT().Priotize(new TimeT());
                expect(inst.isEmpty()).to.be.false;
            })        
        });

        describe("#toAscending()", function() {
            let listToPriotize = [new TimeT("2017-01-04"),  new TimeT("2014-01-04"), new TimeT("2049-06-01"),  new TimeT("2018-01-04"), new TimeT("2019-01-04")];
            it("should return the least recent date",function() {
                let inst = new TimeT().Priotize(listToPriotize);
                inst.toAscending();
                expect(inst.front()).to.equal(listToPriotize[1]);
            })
        });

        describe("#toDescending()", function() {
            let listToPriotize = [new TimeT("2017-01-04"),  new TimeT("2014-01-04"), new TimeT("2049-06-01"),  new TimeT("2018-01-04"), new TimeT("2019-01-04")];
            it("should return the recent date",function() {
                let inst = new TimeT().Priotize(listToPriotize);
                inst.toDescending();
                expect(inst.front()).to.equal(listToPriotize[2]);
                expect(inst.toAscending().toDescending().front()).to.equal(listToPriotize[2]);
            })
        });

        describe("#isDescending()", function() {
            let listToPriotize = [new TimeT("2017-01-04"),  new TimeT("2014-01-04"), new TimeT("2049-06-01"),  new TimeT("2018-01-04"), new TimeT("2019-01-04")];
            it("should return true by default",function() {
                let inst = new TimeT().Priotize(listToPriotize);
                expect(inst.isDescending()).to.be.true;
            }),
            it("should return false when toAscending method is called",function() {
                let inst = new TimeT().Priotize(listToPriotize);
                inst.toAscending();
                expect(inst.isDescending()).to.be.false;
            }),
            it("should return true when toAscending method is called and then toDescending method is called",function() {
                let inst = new TimeT().Priotize(listToPriotize);
                inst.toAscending();
                expect(inst.toDescending().isDescending()).to.be.true;
            })             
        });

        describe("#getAt()", function() {
            let listToPriotize = [new TimeT("2017-01-04"),  new TimeT("2014-01-04"), new TimeT("2049-06-01"),  new TimeT("2018-01-04"), new TimeT("2019-01-04")];

            let inst = new TimeT().Priotize(listToPriotize);

            it("should throw an exception when argument is not a supported type", function() {
                expect(function() {
                    inst.getAt("jhfjdf");
                    inst.getAt(new String());
                    inst.getAt(new Date());
                }).to.throw();
            }),
            it("should throw an exception when an invalid index is passed", function() {
                expect(function() {
                    inst.getAt(-9);
                    inst.getAt(8);
                }).to.throw();
            }),          
            it("should return TimeT at specified index", function() {
                expect(inst.getAt(1)).to.equal(listToPriotize[4]);
            })               
        });

        describe("#enQueue()", function() {
            let inst = new TimeT().Priotize([]);

            it("should throw an error when passed an instance of not TimeT", function() {
                let test = function() {
                    inst.enQueue(new Date());
                };
                expect(test).to.throw();
                expect(function() {
                    inst.enQueue();
                }).to.throw();
            }),

            it("should increase length of ordered and previous list when passed to a empty priority instantiation", function() {
                inst.enQueue(new TimeT("2013-01-06"));
                expect(inst.getOrdered().length).to.equal(1);
                expect(inst.getOrdered().length).to.equal(1);
            }),


            it("should add date in order when called in descending mode", function() {
                let dateToAdd = new TimeT("2019-01-04");
                inst.enQueue(dateToAdd);
                expect(inst.front()).to.equal(dateToAdd);
            }),

            it("should add date in order when called in ascending mode", function() {
                let dateToAdd = new TimeT("2049-01-04");
                inst.enQueue(dateToAdd);
                inst.toAscending();
                expect(inst.rear()).to.equal(dateToAdd);              
            }),
            
            it("should return the index of the new position of the the time instance passed", function() {
                let dToAdd = new TimeT(new Date("1992-01-08"));
                let index = inst.enQueue(dToAdd);
                expect(dToAdd).to.equal(inst.getAt(index));

            })
        })
    });
})();