//dz2
// to start the programm: node dz2.js 2022-01-19 22:00:00

const EventEmitter = require('events');
const emitter = new EventEmitter();

const colors = require('colors');

emitter.on('tick', (days, hours, minutes, seconds) => {
    console.log(`${days} Days ${hours} Hours ${minutes} Minutes ${seconds} Seconds`);
})

emitter.on('stop', () => {
    console.log(colors.red('Time is up!'));
    clearInterval(myTimer);
})

let myTimer = setInterval(function () {

    let arg = process.argv.slice(2);
    let futureDate = arg.join(' ');
    let datetime = new Date(futureDate).getTime();
    let now = new Date().getTime();

    let milisec_diff = datetime - now;

    if (milisec_diff < 700) {
        emitter.emit('stop');
    }

    let days = Math.floor(milisec_diff / 1000 / 60 / (60 * 24));
    let date_diff = new Date(milisec_diff);

    if (milisec_diff > 700) {
        emitter.emit('tick', days, date_diff.getHours() - 1, date_diff.getMinutes(), date_diff.getSeconds());
    }
    
}, 1000)
