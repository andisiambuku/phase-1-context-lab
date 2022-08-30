/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function createEmployeeRecord(worker){
    return{
        firstName:worker[0],
        familyName:worker[1],
        title: worker[2],
        payPerHour:worker[3],
        timeInEvents:[],
        timeOutEvents:[],
    }
}

function createEmployeeRecords(workerArrays){
    return workerArrays.map(worker => createEmployeeRecord(worker))
}

function createTimeInEvent(workerObj,timeInStamp){
    let [date, time] = timeInStamp.split(' ')
    workerObj.timeInEvents.push({
        type:"TimeIn",
        hour:parseInt(time,10),
        date:date
    })
    return workerObj;
}

function createTimeOutEvent(workerObj,timeOutStamp){
    let [date, time] = timeOutStamp.split(' ')
    workerObj.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(time,10),
        date:date,
    })
    return workerObj;
}

function hoursWorkedOnDate(workerObj,date){
    let timeIn = workerObj.timeInEvents.find(x => x.date === date)
    let timeOut = workerObj.timeInEvents.find(x => x.date === date)
    let totalHoursWorked = (timeOut.hour - timeIn.hour) /100

    return totalHoursWorked;
    
}

function wagesEarnedOnDate(workerObj,date){
    return hoursWorkedOnDate(workerObj,date) * workerObj.payPerHour
}

function allWagesFor(workerObj){
    let datesTheyworked = workerObj.timeInEvents.map(x=> x.date)
    let wageEarnedPerDate = datesTheyworked.map(date => wagesEarnedOnDate(workerObj,date))
    return wageEarnedPerDate.reduce((sum,wage) => sum +wage, 0)
    
}

function calculatePayroll(workerArrays){
    let payroll = 0;
    for(const wkr of workerArrays){
        payroll += allWagesFor(wkr)
    }
    return payroll;
    
}




