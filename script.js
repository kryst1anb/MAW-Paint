window.onload=function(){
    document.getElementById("resolution").innerHTML = window.innerWidth + "px x "+ window.innerHeight+"px";
    sizeOfPen();
    sizeOfCanvas();
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