const moment = require("moment");
/*
const date = moment();
date.add(1, "year");
console.log(date.format("MMM Do, YYYY"));
*/
//10:35 am 

const someTimestamp = moment().valueOf();
console.log(someTimestamp);
const createdAt = 1234;
const date = moment(createdAt);
console.log(date.format("h:mm a"))