function parseTime(timeUTC) {
    const regexp = /(\d+)(?::(\d{1,2}))(?::(\d{1,2}))/;
    let date = new Date();
    let time = timeUTC.match(regexp);
    date.setUTCHours(parseInt(time[1]));
    date.setUTCMinutes(parseInt(time[2]));
    date.setUTCSeconds(parseInt(time[3]));
    return date;
}
export function getParseTimeInString(timeUTC){
    const timeDate = parseTime(timeUTC);
    let hours = timeDate.getHours();
    let minutes = timeDate.getMinutes();
    let seconds = timeDate.getSeconds();
    if (hours < 10) {hours = '0' + hours;}
    if (minutes < 10) {minutes = '0' + minutes;}
    if (seconds < 10) {seconds = '0' + seconds;}
    return hours + ':' + minutes + ':' + seconds;
}