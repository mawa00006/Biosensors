function convertUTCDateToLocalDate(date) {
    var newDate = new Date(date.getTime() - date.getTimezoneOffset()*60*1000);
    return newDate;
}

function preProcessAndAggregateData(data, variable){
        var range = getSelectedDateRange();
        var startDate = range.startDate._d; // Access the start date
        var endDate = new Date(range.startDate._d.getTime()); // Set end data to start date


        // Set year to 2015
        endDate.setUTCFullYear(2015);
        // Set year to 2015
        startDate.setUTCFullYear(2015);


        // We want to display all data from the start of the startDate till the end of endDay
        startDate.setUTCHours(0, 0, 0, 0);
        endDate.setUTCHours(23, 59, 0, 0);

        // When reading the data, format variables:
        var parseTime = d3.utcParse("%Y-%m-%dT%H:%M:%SZ");

        data.forEach(function(d) {
          d.date = parseTime(d.Time);
        });

        // Filter the data based on the selected date range
        data = data.filter(function (d) {
        return d.date >= startDate && d.date <= endDate;
        });

        // Create an array of time intervals
        var timeIntervals = d3.timeHours(d3.timeHour.offset(startDate, -2), d3.timeHour.offset(endDate, -2));

        // Add one hour before the start date to the time intervals
        var additionalTimeInterval = d3.timeHour.offset(startDate, -3);
        timeIntervals.unshift(additionalTimeInterval);

        // Aggregate data within each interval
       data = timeIntervals.map(function (intervalStart, i) {
            var intervalEnd = d3.timeHour.offset(intervalStart, 1);
            var valuesInInterval = data.filter(function (d) {
                return d3.timeHour.offset(d.date, -2) >= intervalStart && d3.timeHour.offset(d.date, -2) < intervalEnd;
            });

            // For the temperature we want the mean
            if(variable === 'Temperature')
            {return {
                date: intervalStart,
                [variable]: d3.mean(valuesInInterval, function (d) { return d[variable]; })
            };}
            // For steps and calories the sum
            else {
            return {
                date: intervalStart,
                [variable]: d3.sum(valuesInInterval, function (d) { return d[variable]; })
            };}
        });

       return data
}


// Custom tick formatter function that displays the date for the first tick
// and the hour for other ticks
function customTickFormat(date, tickValues) {
    if (date.getTime() === tickValues[0].getTime()) {
        // Display date for the first tick
        return d3.timeFormat("%d.%m")(date);
    } else {
        // Display hour for other ticks
        return d3.timeFormat("%H")(date);}
}