window.onload=function(){
    can = document.querySelector("canvas");
    q = can.getContext("2d");
    can.addEventListener('touchstart',startDotyku,true);
	can.addEventListener('touchend',stopDotyku,true);
	can.addEventListener('touchmove',ruchDotyku,true);
    document.getElementById("resolution").innerHTML = window.innerWidth + "px x "+ window.innerHeight+"px";
    sizeOfPen();
    sizeOfCanvas();
}
var tablicaDotyk=[];
var q;
var can;
function startDotyku(e)
{
    tablicaDotyk.length=0;	
	for(var i=0; i<e.changedTouches.length; i++)
	{
		var x=e.changedTouches[i].clientX;
	    var y=e.changedTouches[i].clientY;
        tablicaDotyk.push({x:x,y:y});
	}
	e.preventDefault();
	e.stopPropagation()
}
function stopDotyku()
{
    tablicaDotyk.length=0;
}
function ruchDotyku(e)
{
    var x1=can.getBoundingClientRect().left;
	var y1=can.getBoundingClientRect().top;
	
	for(var i=0; i<e.changedTouches.length && i<tablicaDotyk.length; i++)
	{
		var x=e.changedTouches[i].pageX;
		var y=e.changedTouches[i].pageY;
		q.beginPath();
		q.moveTo(tablicaDotyk[i].x-x1,tablicaDotyk[i].y-y1);
		q.lineWidth=7;
		q.lineTo(x-x1, y-y1);
		q.stroke();
		tablicaDotyk[i].x=x;
		tablicaDotyk[i].y=y;
	}
	e.preventDefault();
	e.stopPropagation()
}
function sizeOfPen(){
    var sliderPen = document.getElementById("sizePen");
	var outputPen = document.getElementById("valuesPen");
	outputPen.innerHTML = sliderPen.value;

    sliderPen.oninput = function() {
      outputPen.innerHTML = this.value;
    }
    console.log(sliderPen.value);
}

function sizeOfCanvas(){
    console.log(Math.floor(window.innerWidth/1.25)+'px');
    console.log(Math.floor(window.innerHeight/1.25)+'px');
    document.getElementById("heightX").max = Math.floor(window.innerHeight/1.25);
    document.getElementById("heightY").max = Math.floor(window.innerWidth/1.25);

    var sliderY = document.getElementById("heightY");
    var outputY = document.getElementById("valuesY");
    
	outputY.innerHTML = sliderY.value;

    sliderY.oninput = function() {
      outputY.innerHTML = this.value;
      document.getElementById("canvas").setAttribute("style","height:"+sliderY.value+"px;width:"+sliderX.value+"px;");
        console.log(sliderY.value);
        console.log(sliderX.value);
    }

    var sliderX = document.getElementById("heightX");
	var outputX = document.getElementById("valuesX");
	outputX.innerHTML = sliderX.value;

    sliderX.oninput = function() {
      outputX.innerHTML = this.value;
      document.getElementById("canvas").setAttribute("style","height:"+sliderY.value+"px;width:"+sliderX.value+"px;");
      console.log(sliderY.value);
      console.log(sliderX.value);
    }
}

function load(){
    console.log("load");
}

function save(){
    console.log("save");
}

function download(){
    console.log("download");
}