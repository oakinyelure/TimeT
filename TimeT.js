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
        let newTInstance = new TimeT();
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

        isAFunction.apply(null);
        isArray.apply(null);
    }
}

TimeT.prototype.Priotize = function(timeArg) {
    
}


module.exports = TimeT;