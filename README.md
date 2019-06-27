# TimeT
TimeT is a Date object wrapper that enables easy manipulation of the javascript object

## Background
Date operations can be complex. Yes, we have libraries like moment.js. The library is powerful and can do a lot of things but not all things. This library provides some of the functionalities provided by moment.js with an easy to use API. To keep date format standard, we use UTC date format. We can get result by passing in other formats as necessary


## Installation
Create your project directory
``` mkdir myProjectDir  ```
Navigate to your project directory
``` cd myProjectDir ```
Clone TimeT from the master branch
``` https://github.com/oakinyelure/TimeT.git ```

### Including project into your node project
``` var TimeT = require("path to TimeT") ```

### Including project into pure javascript project
``` <script type="text/javascript" src="path to TimeT"></script> ```

### Including project into your Angular 2 project
Create TimeT wrapper interface
```typescript 
    export interface TimeT {
        setDate(date: Date): void;
        getTimeInstance(): Date;
        add(argument: string | TimeT);
        Validators: ValidatorInterface;
        Helpers: HelpersInterface;
        Priotize(): PriotizeInterface;
    }
 ```

Create typings.d.ts in the src folder
Create declaration file
``` declare var TimeT: interface | any ```
Include project in your component or directives
``` import * as TimeT from "path to TimeT" ```

## Usage
Creating TimeT instance
```javascript 
    // Create with Date Object
    let timeInstance = new TimeT(new Date());
    // Create with only string. The only supported string format is YYYY-mm-dd
    let timeInstance = new TimeT("2014-04-09");
    // Create with no argument. Date instance will be current date
    let timeInstance = new TimeT();
 ```
 Setting date through the setDate method
 ```javascript 
    timeInstance.setDate(new Date()); // Note, only accepts date object
```

Getting TimeT date instance
```javascript
    var dateInstance = timeInstance.getTimeInstance(); // Returns a Date Object
```

Incrementing the date object
```javascript
    // adding years
    timeInstance.add("5 year"); // Can also accept timeInstance.add("5 years");
    // adding months
    timeInstance.add("3 months");
    // adding days
    timeInstance.add("6 days");
    // adding hours
    timeInstance.add("2 hour");
    // adding minutes
    timeInstance.add("60 minutes");
    // adding seconds
    timeInstance.add("20 seconds");
```
Subtracting from date object
``` // add negative values```
```javascript 
    timeInstance.add("-5 days");
```

