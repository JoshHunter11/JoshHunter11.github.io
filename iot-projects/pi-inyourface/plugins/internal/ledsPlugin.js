const resources = require("./../../resources/model");
const Gpio = require("onoff").Gpio;

let actuator1, actuator2;
let model = resources.pi.actuators.leds;
let pluginName =
  resources.pi.actuators.leds[1].name +
  ", " +
  resources.pi.actuators.leds[2].name;

exports.start = function (params) {
  connectHardware();
  console.log("starting " + pluginName + " plugin");
};

// TODO 1: Complete the ledsPlugin!

function connectHardware() {
  sensor.watch(function (err, val) {});
  actuator1 = new Gpio(device.gpio, "out");
  actuator2 = new Gpio(device.gpio, "out");
}

function stop() {
  actuator1.write(0);
  actuator2.write(0);

  actuator1.unexport();
  actuator2.unexport();
}

exports.switchOnOff = {
  1: function (value) {
    // turn LED 1 on or off based on value
    if (actuator1.value === true) {
      actuator1.write(1);
    }
    if (actuator1.value === false) {
      actuator1.write(0);
    }
  },
  2: function (value) {
    // turn LED 2 on or off based on value
    if (actuator2.value === true) {
      actuator2.write(1);
    }
    if (actuator2.value === false) {
      actuator2.write(0);
    }
  },
};
