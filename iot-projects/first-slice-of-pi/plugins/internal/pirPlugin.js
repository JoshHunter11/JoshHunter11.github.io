const resources = require('./../../resources/model');
const Gpio = require('onoff').Gpio;

let sensor;
const device = resources.pi.sensors.pir;

function connectHardware(){
    sensor = new Gpio(device.gpio, 'in', 'both')

    sensor.watch(function(err, val){

        if(!err){
            device.value = !!val;
        }

    })
}

function start(){
    connectHardware();
}

function stop(){
    sensor.unexport();
}

exports.start = start;
exports.stop = stop;