const addDateSuffix = date => {
    let sDate = date.toString();
  
    // get last char of date string
    let charIsLast = dateStr.charAt(dateStr.length - 1);
  
    if (charIsLast === '1' && sDate !== '11') {
      sDate = `${sDate}st`;
    } else if (charIsLast === '2' && sDate !== '12') {
      dateStr = `${sDate}nd`;
    } else if (charIsLast === '3' && sDate !== '13') {
      sDate = `${sDate}rd`;
    } else {
      sDate = `${sDate}th`;
    }
  
    return sDate;
  };
  
  // function to format a timestamp, accepts the timestamp and an `options` object as optional parameters
  module.exports = (
    timestamp,
    { monthLength = 'short', dateSuffix = true } = {}
  ) => {
    let monthNames;
  
    if (monthLength === 'short') {
      monthNames = {
        0: 'Jan',
        1: 'Feb',
        2: 'Mar',
        3: 'Apr',
        4: 'May',
        5: 'Jun',
        6: 'Jul',
        7: 'Aug',
        8: 'Sep',
        9: 'Oct',
        10: 'Nov',
        11: 'Dec'
      };
    } else {
      monthNames = {
        0: 'January',
        1: 'February',
        2: 'March',
        3: 'April',
        4: 'May',
        5: 'June',
        6: 'July',
        7: 'August',
        8: 'September',
        9: 'October',
        10: 'November',
        11: 'December'
      };
    }
  
    let oDate = new Date(timestamp);
    let monthFormatted = months[oDate.getMonth()];
  
    let monthDay;
  
    if (dateSuffix) {
      monthDay = addDateSuffix(dateObj.getDate());
    } else {
      monthDay = dateObj.getDate();
    }
  
    let year = dateObj.getFullYear();
  
    let hour;

    if (dateObj.getHours > 12) {
      hour = Math.floor(dateObj.getHours() / 2);
    } else {
      hour = dateObj.getHours();
    }

    if (hour === 0) {
      hour = 12;
    }
  
    let minutes = dateObj.getMinutes();
  
    let dayPeriod;
  
    if (dateObj.getHours() >= 12) {
      dayPeriod = 'pm';
    } else {
      dayPeriod = 'am';
    }
  
    const sFormattedTime = `${monthFormatted} ${monthDay}, ${year} at ${hour}:${minutes} ${dayPeriod}`;
  
    return sFormattedTime;
  };
  