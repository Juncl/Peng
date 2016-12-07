
var canvas = document.querySelector('#canvas'),
    ctx = canvas.getContext('2d');

canvas.width = 400;
canvas.height = 400;

var backDom = document.createElement('canvas'),
    backCtx = backDom.getContext('2d');
backDom.width = canvas.width;
backDom.height = canvas.height;

var btnPlay = document.getElementById("btnPlay"),
    t1 = document.getElementById("t1"),
    t2 = document.getElementById("t2"),
    t3 = document.getElementById("t3");

ctx.globalAlpha = 0.85; 

function draw(options) {

    var textPosX, textPosY;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var ball1 = new Ball(10, "#454121");
    var ball2 = new Ball(10, "#454121");
    var ball3 = new Ball(10, "#454121");
    var ball4 = new Ball(10, "#454121");
    ball1.x = 10;
    ball1.y = 10;
    ball1.draw(ctx);

    ball2.x = 10;
    ball2.y = 390;
    ball2.draw(ctx);

    ball3.x = 390;
    ball3.y = 10;
    ball3.draw(ctx);

    ball4.x = 390;
    ball4.y = 390;
    ball4.draw(ctx);

    ctx.beginPath();
    ctx.arc(options.x, options.y, options.r, 0, Math.PI * 2, true);
    // ctx.font = "48px serif";

    if(options.x > 355){
        textPosY = options.y + 4;
        textPosX = options.x - 90;
    }else if(options.x < 40){
        textPosY = options.y + 4;
        textPosX = options.x + 10;
    }
    else{
        if(options.y >= 40){
            textPosY = options.y - 15;
            textPosX = options.x - 35;
        }else {
            textPosY = parseFloat(options.y) + 25;
            textPosX = options.x - 35;
        }
        
    }
    ctx.fillText("("+parseFloat(options.x)+" "+options.y+")", textPosX, (textPosY));
    console.log(textPosX + " " + textPosY);
    ctx.closePath();
    ctx.fillStyle = 'rgba(7,120,249,1)';
    ctx.fill();
}

var start = {
    x: 200,
    y: 200,
    r: 10
};

var end = {
    x: 400,
    y: 400,
    r: 10
};

var timeArr = [];
var pos = {};

function render() {
    // if (start.x < end.x && start.y < end.y) {
    //     draw(start);
    //     start.x = Math.random()*400;
    //     start.y = Math.random()*400;
    //     setTimeout(arguments.callee, 500);
    // }
    
    if(pos){
        start.x = pos.x;
        start.y = pos.y;
    }else{
        start.x = 200;
        start.y = 200;
    }
    draw(start);
    setTimeout(arguments.callee, 500);
} 

// function Play(){
//     getJSON('./data.json', function(err, data) {
//         if (err != null) {
//             console.log('Something went wrong: ' + err);
//         } else {
//             console.log('Your Json result is:  ' + data.result);
//             result.innerText = data.result;
//         }
//     });

//     var n1 = randomNum()[0];
//     var n2 = randomNum()[1];
//     var n3 = randomNum()[2];

//     t1.innerHTML = n1+"ms";
//     t2.innerHTML = n1+"ms";
//     t3.innerHTML = n1+"ms";
// }

render();

function Location(x, y, z){
    this.x = x;
    this.y = y;
    this.z = z;
}

function randomNum(){
    var a = [];
    a.push(Math.floor(Math.random()*5+5));
    a.push(Math.floor(Math.random()*5+5));
    a.push(Math.floor(Math.random()*5+5));
    return a;
}

var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('get', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status == 200) {
        callback(null, xhr.response);
      } else {
        callback(status);
      }
    };
    xhr.send();
};

document.getElementById("btnPlay").onclick = function loadJSON(){
    // var data_file = "http://www.tutorialspoint.com/json/data.json";
    console.log('btn play');
    var data_file = "http://172.18.216.133:8080/location"
            
    var http_request = new XMLHttpRequest();
    try{
        // Opera 8.0+, Firefox, Chrome, Safari
        http_request = new XMLHttpRequest();
    }catch (e){
        // Internet Explorer Browsers
        try{
            http_request = new ActiveXObject("Msxml2.XMLHTTP");
                    
        }catch (e) {
                
            try{
                http_request = new ActiveXObject("Microsoft.XMLHTTP");
            }catch (e){
                // Something went wrong
                alert("Your browser broke!");
                return false;
            }
                    
        }
    }
            
    http_request.onreadystatechange = function(){
            
        if (http_request.readyState == 4  ){
            // Javascript function JSON.parse to parse JSON data
            var jsonObj = JSON.parse(http_request.responseText);

            console.log(jsonObj);
            console.log(jsonObj[0]);



            var t1 = parseFloat(jsonObj[0].synyTime.toFixed(2))+4,
                t2 = jsonObj[1].synyTime.toFixed(2),
                t3 = jsonObj[2].synyTime.toFixed(2)-11;

            timeArr.push(t1);
            timeArr.push(t2);
            timeArr.push(t3);

            pos = JuncUtil.getPosition(t1, t2, t3);
            console.log("x: "+pos.x);
            console.log("y: "+pos.y);

            var code1 = jsonObj[0].location.join(''),
                code2 = jsonObj[1].location.join(''),
                code3 = jsonObj[2].location.join('');


            document.getElementById("t1").innerHTML = t1+"ms";
            document.getElementById("t2").innerHTML = t2+"ms";
            document.getElementById("t3").innerHTML = t3+"ms";

            document.getElementById("code1").innerHTML = code1;
            document.getElementById("code2").innerHTML = code2;
            document.getElementById("code3").innerHTML = code3;
        }
    }

            
            
    http_request.open("GET", data_file, true);
    http_request.send();
}


function getElem(id){
    return document.getElementById(id);
}

function list() {
    return Array.prototype.slice.call(arguments);
}

// getElem("btnPlay").onclick = loadJSON();



// setInterval(loadJSON, 500);



