// Your code here
let createEmployeeRecord = function(attributes=[]) {
    return {
        firstName: attributes[0],
        familyName: attributes[1],
        title: attributes[2],
        payPerHour: attributes[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function(employees){
    return employees.map(function(data){
        return createEmployeeRecord(data)
    })
}

let createTimeInEvent = function(employee, timeStamp) {
    let [date, time] = timeStamp.split(' ')
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(time, 10),
        date: date
    })
    return employee
}

let createTimeOutEvent = function(employee, timeStamp) {
    let [date, time] = timeStamp.split(' ')
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(time, 10),
        date: date
    })
    return employee 
}

let hoursWorkedOnDate = function(employee, workDate){
    let start = employee.timeInEvents.find(function(e){
        return e.date === workDate
    })
    let end = employee.timeOutEvents.find(function(e){
        return e.date === workDate
    })

    return (end.hour - start.hour)/100
}

let wagesEarnedOnDate = function(employee, workDate) {
    let hours = hoursWorkedOnDate(employee, workDate);
    return hours * employee.payPerHour
}

let allWagesFor = function(employee) {
    let daysWorked = employee.timeOutEvents.map(function(e){
        return e.date
    })
    let wages = daysWorked.reduce(function(total, d) {
        return (total + wagesEarnedOnDate(employee, d))
    }, 0)

    return wages
}

let calculatePayroll = function(employees){
    return employees.reduce(function(total,e){
        return (total + allWagesFor(e))
    }, 0)
}

let findEmployeeByFirstName = function(array, firstName){
    return array.find(function(employee){
        return employee.firstName === firstName
    })
}