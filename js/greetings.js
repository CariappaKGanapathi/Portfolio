var today= new Date();
var hourNow = today.getHours();
var greeting;

if (hourNow >= 18) {
	greeting = 'Good evening, I am';}
else if (hourNow >= 12) {
	console.log(hourNow)
	greeting = ' Good afternoon, I am';}
else if (hourNow >= 0) {
	greeting = 'Good morning, I am';}
else {
	greeting = 'Welcome, I am' ;}

document .write( ' <h3>' +greeting + ' </ h3>');