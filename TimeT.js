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

    /**
     * User may use different type of date instance. We want to check to know which 
     * version of TimeT to return
     */
    if(!date) {
        this.date = new Date();
    }
    if(typeof date === "string") {

        if(!this.Validators.isSupportedDateFormat(date)) {
            throw TypeError("Not a supported date format. Use YYYY-mm-dd");
        }
        var newTInstance = new TimeT();
        newTInstance.setDate(new Date(date));
        return newTInstance;
    }
    if(this.Validators.isValidDate(date)) {
        var newTInstance = new TimeT();
        newTInstance.setDate(date);
        return newTInstance;
    }
    
}

TimeT.prototype = {

    /**
     * sets the date in the current scope
     * @param {Date} date 
     * @returns void
     */
    setDate: function(date) {
        if(!this.Validators.isValidDate(date)) {
            throw TypeError("Not a supported date");
        }
        this.date = date;
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
                    return  (Object.prototype.toString.call(this) === '[object Function]');
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
    this.Helpers.applyPolyfill();

    /**
     * private method to sort date in  
     * @param {Array<TimeT>} arg 
     */
    var priotize = function(arg, toAscending) {
        return arg.sort(function(prev,next) {
            if(toAscending) {
                return prev.date.getTime() - next.date.getTime();
            }
            return next.date.getTime() - prev.date.getTime();
        });
    };

    if(!timeArg.isArray() && timeArg instanceof TimeT) {
        priorityList.push(this,timeArg);
    }
    if(timeArg.isArray()) {
        for(var timeIndex in timeArg) {
            if(timeArg[timeIndex] instanceof TimeT) {
                priorityList.push(timeArg[timeIndex]);
            }
        }
    }
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
            return this;
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
        }
    }
}


module.exports = TimeT;