var mqtt = require('mqtt');
//var client  = mqtt.connect('tcp://test.mosquitto.org');
var client = mqtt.connect('tcp://broker.hivemq.com');

var plate = document.getElementById("plate");
var temperature = document.getElementById("temperature");
var speed = document.getElementById("speed");
var latitude = document.getElementById("latitude");
var longitude = document.getElementById("longitude");
var direction = document.getElementById("direction");
var top = document.getElementById("topic");

action.addEventListener("click", connect());
/*reset.addEventListener("click", onReset);
*/

var text = document.getElementById("log");

client.on('connect', function () {                              
    client.subscribe('kitt/+/telemetry', function (err) {        
        if (err) {
            console.log(err);
            log(err);
        }
        if (!err) {
            console.log('sottoscritto al topic con successo');
            log("sottoscritto al topic con successo");
        }
    })
})

client.on('message', function (topic, message) {                //MQTT

    upload(topic, message);
    
})


function upload(topic, message) {

    var msg = JSON.parse(message);
    var arrTop = topic.split("/");
    var targa = arrTop[1];
    
    top.innerText = topic;
    plate.innerText = targa;
    temperature.innerText = msg.temperature;
    speed.innerText = msg.speed;
    latitude.innerText = msg.position.latitude;
    longitude.innerText = msg.position.longitude;
    direction.innerText = msg.direction;
    
    log("temperature "+msg.temperature);


    /*console.log('Targa: ' + targa);
    console.log("temperature "+msg.temperature);
    console.log("speed "+msg.speed);
    console.log("latitude "+msg.latitude);
    console.log("longitude "+msg.longitude);
    console.log("direction "+msg.direction);
    console.log("#####################################");
    */

}

function log(log){
    text.innerText = log;
    return log;
}

function connect(){
    client.on('connect', function () {                              
        client.subscribe('kitt/+/telemetry', function (err) {        
            if (err) {
                console.log(err);
                log(err);
            }
            if (!err) {
                console.log('sottoscritto al topic con successo');
                log("sottoscritto al topic con successo");
            }
        })
    })
}