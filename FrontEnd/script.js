import { config as config0, updateBubbleGraph, updateBubbleGraphAxis } from "./Charts/bubbleChart.js";
import { config as config1, updateLineGraph } from "./Charts/lineChart.js";

//divs to update on client
let loc_x = document.getElementById("loc-x");
let loc_y = document.getElementById("loc-y");
let rssiApara = document.getElementById("cirnum-a");
let rssiBpara = document.getElementById("cirnum-b");
let rssiCpara = document.getElementById("cirnum-c");

//web addresses
let device_ip = null;   //device
let webaddress = `http://localhost:3000`;   //cloud app

//actual data to request
let modes = ['Outdoor', 'Indoor'];
let mode = modes[0];

let rssiA = -73;
let rssiB = -65;
let rssiC = -50;

let nx = 0;
let ny = 0;
let gax = 0.26416;
let gay = 4.04368;
let gbx = 0.2794;
let gby = 5.31622;
let gcx = 3.67792;
let gcy = 8.11022;

//making graphs
//bubble chart
var myChart0 = new Chart(
  document.getElementById('myChart0'),
  config0
);

var myChart1 = new Chart(
    document.getElementById('myChart1'),
    config1
  );

//update divs on client
function updateLocation(a, b){
    loc_x.innerText = `${parseFloat(a).toFixed(1)}`;
    loc_y.innerText = `${parseFloat(b).toFixed(1)}`;
    // console.log("Updated location in div");
}

function updateRssi(){
    rssiApara.innerText = `${rssiA}`;
    rssiBpara.innerText = `${rssiB}`;
    rssiCpara.innerText = `${rssiC}`;
}

//main function that does everything
function getLocation(){
    // console.log(mode);
    fetch(`http://${device_ip}/`)
    .then(res => {
    // console.log(res);
        return res.json();})
    .then(json => {
        let data = JSON.parse(json);
        rssiA = data.a;
        rssiB = data.b;
        rssiC = data.c;
        updateRssi();
        updateLineGraph(myChart1, -rssiA, -rssiB, -rssiC);

        fetch(`${webaddress}/rssi?a=${rssiA}&b=${rssiB}&c=${rssiC}&d=${gax}&e=${gay}&f=${gbx}&g=${gby}&h=${gcx}&i=${gcy}&j=${mode}`)
        .then(res => res.json())
        .then(json => {
            let data = JSON.parse(json);
            nx = parseFloat(data[0]);
            ny = parseFloat(data[1]);
            updateLocation( nx, ny );
            updateBubbleGraph(myChart0, gax, gay, gbx, gby, gcx, gcy, nx, ny);
            updateBubbleGraphAxis(myChart0, Math.max(gax, gbx, gcx, nx), Math.min(gax, gbx, gcx, nx),Math.max(gay, gby, gcy, ny), Math.min(gay, gby, gcy, ny));
            updateConfig();
        })
    })

}

function ipValid(a,b,c,d){
    a = Math.abs(a);
    b = Math.abs(b);
    c = Math.abs(c);
    d = Math.abs(d);
    device_ip = `${a}.${b}.${c}.${d}`
    // console.log(a, b, c ,d, "valid ip");
}

function ipInvalid(invalid){
    Swal.fire(
        'not a valid ip',
        'Kindly enter another ip to start'
      )
}

//start and ip validation function
function start(){
    let ipValue = document.getElementById("device-ip").value;
    let ipValueArray = ipValue.split('.').map( x => parseInt(x));
    document.getElementById("device-ip").value = "";

    if(ipValueArray.length !== 4){
        ipInvalid(ipValue.split('.'));
    }
    else if( ipValueArray.map( x => isNaN(x) ).includes(true) ){
        ipInvalid(ipValueArray.map( x => isNaN(x) ));
    }
    else if(ipValueArray.map( x => ((x <= 255) && (x >=0)) ).includes(false)){
        ipInvalid(ipValueArray.map( x => ((x <= 255) && (x >=0)) ));
    }
    else{
        ipValid(...ipValueArray);
        setInterval(getLocation, 2000);
    }
}

document.getElementById("device-ip-btn").addEventListener('click', start);

document.getElementById("gateway-loc-btn").addEventListener('click', _ => {
    gax = document.getElementById("gax").value || gax;
    gay = document.getElementById("gay").value || gay;
    gbx = document.getElementById("gbx").value || gbx;
    gby = document.getElementById("gby").value || gby;
    gcx = document.getElementById("gcx").value || gcx;
    gcy = document.getElementById("gcy").value || gcy;

    document.getElementById("gax").value = "";
    document.getElementById("gay").value = "";
    document.getElementById("gbx").value = "";
    document.getElementById("gby").value = "";
    document.getElementById("gcx").value = "";
    document.getElementById("gcy").value = "";
});

document.getElementById('btnOut').addEventListener('click', _ => {
    mode = modes[0];
    console.log(mode);
});
document.getElementById('btnIn').addEventListener('click', _ => {
    mode = modes[1]
    console.log(mode);
});

function updateConfig(){
    document.getElementById('device-ip-thing').innerText = device_ip || 'None';
    document.getElementById('location-mode').innerText = mode;
}
