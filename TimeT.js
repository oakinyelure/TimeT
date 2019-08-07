/**
 * Author: Olusegun Akinyelure
 * Date: 6/5/2019
 * Library provides an API for API manipulation. I saw 
 */


"use strict"

/**
 * Constructor
 * @param {Date} date 
 */
function TimeT(date) {

    var GLOBAL_DATE = new Date();

    /**
     * returns the date used to instantiate TimeT
     * To make sure instance of the date cannot be directly 
     * manipulated, we return a different object.
     * @returns {Date} GLOBAL_DATE
     */
    this.getTimeInstance = function() {
        return new Date(GLOBAL_DATE.toString());
    }

    /**
     * sets the global date object
     * @return {void}
     */
    this.setDate = function(date) {
        if(!this.Validators.isValidDate(date)) {
            throw TypeError("Not a supported date");
        }
        GLOBAL_DATE = date;
    }    

    /**
     * User may use different type of date instance. We want to check to know which 
     * version of TimeT to return
     */
    if(!date) {
        this.setDate(GLOBAL_DATE);
    }
    if(typeof date === "string") {

        if(!this.Validators.isSupportedDateFormat(date)) {
            throw TypeError("Not a supported date format. Use YYYY-mm-dd");
        }
        this.setDate(new Date(date));
    }
    if(this.Validators.isValidDate(date)) {
        this.setDate(date);
    }
    
}

TimeT.prototype = {
    /**
     * Method adds the parsed argument to the Date context.
     * Year, day, hours, month, minutes or TimeT
     * @param {string} arg 
     */
    add: function(arg) {
        if(typeof arg !== 'string' && !(arg instanceof TimeT)) {
            throw new TypeError("Only supports strings and TimeT instances.");
        }
        if(typeof arg === 'string') {
            var argValues = arg.split(" ");
            if(argValues.length < 2) {
                throw ReferenceError("Invalid format. Format should be (number dateParam.) ... 1 year");
            }
            var operand = Number(argValues[0]);
            var operation = argValues[1];
            if(isNaN(operand)) {
                throw TypeError("Operand must be a number");
            }
            var currentDate = this.getTimeInstance();
            switch(operation.toLowerCase()) {
                case 'year': case 'years':
                    var newYear = currentDate.getUTCFullYear() + operand;
                    currentDate.setUTCFullYear(newYear);
                    this.setDate(currentDate);
                break;
                case 'day': case 'days':
                    var newDay = currentDate.getUTCDate() + operand;
                    currentDate.setUTCDate(newDay);
                    this.setDate(currentDate);
                break;
                case 'months': case 'month':
                    var newMonth = currentDate.getUTCMonth() + operand;
                    currentDate.setUTCMonth(newMonth);
                    this.setDate(currentDate);
                break;
                case 'hour': case 'hours':
                    var newHours = currentDate.getUTCHours() + operand;
                    currentDate.setUTCHours(newHours);
                    this.setDate(currentDate);
                break;
                case 'minute': case 'minutes':
                    var newMinutes = currentDate.getUTCMinutes() + operand;
                    currentDate.setUTCMinutes(newMinutes);
                    this.setDate(currentDate);
                break;
                case 'second': case 'seconds': 
                    var newSeconds = currentDate.getUTCSeconds() + operand;
                    currentDate.setUTCSeconds(newSeconds);
                    this.setDate(currentDate);
                break;
                case 'milliseconds': case 'millisecond':
                    var newMil = currentDate.getUTCMilliseconds() + operand;
                    currentDate.setUTCMilliseconds(newMil);
                    this.setDate(currentDate);
                break;
                default :
                    throw new Error("Not supported date part");
            }
        }

        if(arg instanceof TimeT) {

        }
    }
}


TimeT.prototype.Validators = {

    /**
     * @param {void} void
     * @returns Array<RegExp>
     */
    getSupportedStringDateFormats: function() {
        return [
            /^\d{4}\-\d{1,2}\-\d{1,2}$/,
            /(\d{4})-(\d{2})-(\d{2})/,
            /^\d{4}[\/.]\d{1,2}[\/.]\d{1,2}$/
        ];
    },

    /**
     * Checks to see if the argument is a supported date string
     * @returns {boolean}
     * @param {string} date 
     */
    isSupportedDateFormat: function(date) {
        var allSupportedFormatInRegex = this.getSupportedStringDateFormats();
        for(var i = 0; i <= allSupportedFormatInRegex.length; i++) {
            if(allSupportedFormatInRegex[i].test(date)) {
                return true;
            }
        }
        return false;
    },

    
    /**
     * Returns a boolean checking if date is a valid date or not
     * @param {Date} date 
     * @returns boolean
     */
    isValidDate: function(date) {
        return (Object.prototype.toString.call(date) === '[object Date]');
    },

    /**
     * Method returns supported operation params. This is used within the math object to validate 
     * what type of operation a user wants to perform
     * @returns {Array<string>}
     */
    getSupportedOperationParams: function() {
        return ["year", "years", "minute", "minutes", "hours", "hour", "day", "days", "second", "seconds"];
    }
}

/**
 * Object holds helper methods
 */
TimeT.prototype.Helpers = {

    applyPolyfill: function() {

        /**
         * Method checks if an object is a function. Can be used with any object
         */
        var isAFunction = function() {
            if(!Object.isAFunction) {
                Object.prototype.isAFunction = function() {
                    return (Object.prototype.toString.call(this) === '[object Function]');
                 };
            }
        }

        /**
         * Checks whether an object is an array. Array prototype has an implementation but cannnot be used 
         * against objects that are not type of array
         */
        var isArray = function() {
            if(!Object.isArray) {
                Object.prototype.isArray = function() {
                    return (Object.prototype.toString.call(this) == '[object Array]');
                }
            }

        }

        var isNumber = function() {
            if(!Object.isNumber) {
                Object.prototype.isNumber = function() {
                    return (Object.prototype.toString.call(this) == '[object Number]');
                }
            }
        }

        isAFunction.apply(null);
        isArray.apply(null);
        isNumber.apply(null);
    }
}

/**
 * @param {TimeT | Array<TimeT>} timeArg
 * @returns {Object}
 * 
 * Method rearranges TimeT in descending order. We only want to compute 
 * TimeT object. Every other objects are ommitted. 
 * 
 * NOTE: It is assumed that when only an argument is passed to this function,
 * the user wants to priotize between the date of current instance and the date 
 * of passed argument. passing an array of TimeT object will priotize the objects in 
 * the arguments.
 * 
 * This is not a priority queue as we are not solving data structure problem in this context. Implementing
 * priority queue may proove sufficient but the work effort underweigh the value 
 */
TimeT.prototype.Priotize = function(timeArg) {
    // making sure all polyfill are ready to go before they are being used
    var priorityList = [];
    var orderedList = [];
    var inAscending = false;

    var _self = this;

    this.Helpers.applyPolyfill();

    /**
     * private method to sort date in  
     * @param {Array<TimeT>} arg 
     */
    var priotize = function(arg, toAscending) {
        return arg.sort(function(prev,next) {
            if(toAscending) {
                return prev.getTimeInstance().getTime() - next.getTimeInstance().getTime();
            }
            return next.getTimeInstance().getTime() - prev.getTimeInstance().getTime();
        });
    };

    var assigner = function(args) {
        if(!args.isArray() && args instanceof TimeT) {
            priorityList.push(_self,args);
        }
        if(args.isArray()) {
            for(var timeIndex in args) {
                if(args[timeIndex] instanceof TimeT) {
                    priorityList.push(args[timeIndex]);
                }
            }
        }
    };

    assigner.call(null,timeArg);

    /**
     * We will assign by value not reference so that we have access 
     * to previous array. The sort method will sort the argument too.
     * concat method will avoid that
     */
    orderedList = priotize.call(null, priorityList.concat());

    /**
     * Public API
     */
    return {

        /**
         * returns a cleaned version of original 
         * list to priotize. Expected to return a list of TimeT
         * object
         * @returns {Array<TimeT} priorityList
         */
        getPrevious: function() {
            return priorityList;
        },

        /**
         * retuns an ordered or priotized version of the list
         * @returns {Array<TimeT>} orderedList
         */
        getOrdered: function() {
            return orderedList;
        },

        /**
         * returns object at the top of the ordered list
         * @returns {TimeT}
         */
        front: function() {
            if(!this.isEmpty()) {
                return orderedList[0];
            }
            throw new ReferenceError("Error pointing to invalid reference");
        },

        /**
         * returns object at the end of the ordered list
         * @returns {TimeT}
         */
        rear: function() {
            if(!this.isEmpty()) {
                return orderedList[orderedList.length - 1];
            }
            throw new ReferenceError("Error pointing to invalid reference");
        },

        /**
         * Checks whether the orderedList is empty
         * @returns {boolean}
         */
        isEmpty: function() {
            return !orderedList.length;
        },

        /**
         * Changes the sort order of the ordered list. 
         * @returns {TimeT}
         */
        toAscending: function() {
            orderedList = priotize.call(null, priorityList, true);
            inAscending = true;
            return this;
        },

        /**
         * Changes the sort order to descending. It is descending by default but order changes when 
         * toAscending is called
         */
        toDescending: function() {
            orderedList = priotize.call(null, priorityList);
            inAscending = false;
            return this;
        },

        /**
         * Returns the sort state
         * @returns {Boolean} inAscending
         */
        isDescending: function() {
            return !inAscending;
        },
        

        /**
         * Gets an ordered Time
         * @param {Number} index 
         */
        getAt: function(index) {
            if(!index.isNumber()) {
                throw new Error("Not A Number");
            }
            if(index < 0 || index > orderedList.length - 1) {
                throw new ReferenceError("Error pointing to invalid reference");
            }
            return orderedList[index];
        },
        
        /**
         * Method adds another TimeT instance to the queue and returns the index it is inserted 
         * to. We have to put all these logic to be able to get the index. A sort would have done the job but will not
         * return the index
         * @param {TimeT} queue 
         * @returns {Number} indexOfNewQueue
         */
        enQueue: function(queue) {
            var indexOfNewQueue = -1;

            // check if arg is an instance of TimeT. 
            if(!(queue instanceof TimeT)) {
                throw new TypeError("Expected " + Object.prototype.toString.call(queue) + " to be instance of TimeT");
            }
            priorityList.push(queue);

            /**
             * Since the queue can be in both ascending and descending order,
             * we have to know what order to insert the new Time. This is needed as we need to return 
             */
            var inserted = false;
            if(inAscending) {
                for(var i = 0; i < orderedList.length; i++) {
                    if(queue.getTimeInstance().getTime() < orderedList[i].getTimeInstance().getTime()) {
                        orderedList.splice(i,0,queue);
                        indexOfNewQueue = i;
                        inserted = true;
                        break;
                    }
                }
                if(!inserted) {
                    orderedList.push(queue);
                    indexOfNewQueue = orderedList.length - 1;
                }

            }
            else {
                for(var i = 0; i < orderedList.length; i++) {
                    if(queue.getTimeInstance().getTime() > orderedList[i].getTimeInstance().getTime()) {
                        orderedList.splice(i,0,queue);
                        indexOfNewQueue = i;
                        inserted = true;
                        break;
                    }
                }
                if(!inserted) {
                    orderedList.push(queue);
                    indexOfNewQueue = orderedList.length - 1;
                }
            }
        
            return indexOfNewQueue;
        }
 
    }
}



module.exports = TimeT;