# TimeT
TimeT is a Date object wrapper that enables easy manipulation of the javascript object

## Background
Date operations can be complex. Yes, we have libraries like moment.js. The library is powerful and can do a lot of things but not all things. This library provides some of the functionalities provided by moment.js with an easy to use API and also some vital functionalities that might be missing from the Moment library. To keep date format standard, we use UTC date format. We can get result by passing in other formats as necessary


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
    export interface ITimeT {
        setDate(date: Date): void;
        getTimeInstance(): Date;
        add(argument: string | TimeT);
        Validators: ValidatorInterface; // Create this interface
        Helpers: HelpersInterface; // create this interface
        Priotize(): IPriotize; // Check section on using Priotize for API
    }
 ```

- Create typings.d.ts in the src folder
- Add TimeT package
    - ``` declare var TimeT: ITimeT | any ```
- Include project in your component or directives
    - ``` import * as TimeT from "path to TimeT" ```

## Usage
**Creating TimeT instance**
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


**Using the Priotize API**
The Priotize method works like a priority queue. It helps sort TimeT object based on a priority. We only pass TimeT instances. The priority is gotten from the Eposh milliseconds. The amazing thing about this is that the priority queue works in both ascending and descending order. Developers do have freedom to choose what priority to use. By the fault, the queue is in descending order. 

-  Angular interface
    ```typescript
        export interface IPriotize {
            getPrevious(): Array<TimeT> // returns an unordered copy of the argument you passed to the object
            getOrdered(): Array<TimeT> // returns priotized list
            front(): TimeT // returns element at the top whether descending or ascending
            rear(): TimeT // returns element at the bottom of the queue
            isEmpty(): boolean // Checks whether the priority list is empty
            toAscending(): IPriotize // Reverses queue to ascending
            toDescending(): IPriotize // Reverses queue to descending
            isDescending(): boolean // checks if list is in descending order
            getAt(index: number): TimeT //returns index at specified index
            enQueue(item: TimeT): number // adds item to the list considering the order you have set. Returns the index which that element was placed
        }
    ```

- Use Cases
    - Create tasks ordered by the create date
    - **IMPLEMENTATION**
        - ```javascript
            let timeInstance = new TimeT();
            let priorityQ = timeInstance.Priotize([]);
            let tasks = [
                {title: 'Graduate', isCompleted: false, implementationDate: new Date("2020-01-10")},
                {title: 'Start Work', isCompleted: false, implementationDate: new Date("2020-03-05")},
                {title: 'Enroll in Udacity', isCompleted: false, implementationDate: new Date("2019-01-04")},                
            ];

            for(var i = 0; i < tasks.length; i++) {
                let currentTask = tasks[i];
                let tInstance = new TimeT(currentTask.implementationDate);
                tInstance["data"] = currentTask; // Assign to self to have access to the task
                let indexOfTask = priorityQ.enQueue(tInstance);
                console.log(indexOfTask);
            }
            // Expected output
            // 1 0 3

            // By default it is going to add in descending order. Recent date first. In this case it is the task[2] being at the top 
            if(priorityQ.isDescending()) {
                priorityQ.toAscending(); // reverse the order. //Oldest date first 
            }

            let orderedQueue = priorityQ.getOrdered();
            for(var i = 0; i < orderedQueue.length; i++) {
                console.log(orderedQueue[i]['data'].title);
            }
            // Expected output
            // Enroll in Udacity | Graduate | Start work

        ```


