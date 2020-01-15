window.onload=function(){

    can = document.querySelector("canvas");
    q = can.getContext("2d");

    can.addEventListener('touchstart',startDotyku,true);
	can.addEventListener('touchend',stopDotyku,true);
    can.addEventListener('touchmove',ruchDotyku,true);
    can.addEventListener('mousedown',ruchDotyku,true);
    document.getElementById("resolution").innerHTML = window.innerWidth + "px x "+ window.innerHeight+"px";
    //sizeOfPen();
    sizeOfCanvas();
    loadFiles();

    controlPanel();
    changeMode();

}
var tablicaDotyk=[];
var q; //kontekst canvasu
var can; // canvas
var color;
//var avaibleMode = ['pen', 'line', 'rubber'];


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

        if(mode === 'pen'){
            q.beginPath(); //rozpoczecie sciezki malowania
            q.moveTo(tablicaDotyk[i].x-x1,tablicaDotyk[i].y-y1); 
            q.lineWidth=document.getElementById("sizePen").value; //pobranie lini
            q.lineTo(x-x1, y-y1); //deklaracja rysowania 
            q.strokeStyle = color;
            q.lineJoin = "round";
            q.lineCap = "round";
            q.stroke(); //rysowanie
            tablicaDotyk[i].x=x;
            tablicaDotyk[i].y=y;
        }

        if(mode === 'line')
        {  
            //q.clearRect(0, 0, tablicaDotyk[i].x,tablicaDotyk[i].y);
            q.beginPath();
            q.moveTo(tablicaDotyk[i].x-x1,tablicaDotyk[i].y-y1); 
            q.lineTo(x-x1, y-y1);
            q.strokeStyle = color;
            q.stroke();

        }
        if(mode ==='rubber')
        {
            document.getElementById("sizePen").value;
            q.clearRect(e.changedTouches[i].pageX-x1,e.changedTouches[i].pageY-y1,document.getElementById("sizePen").value,document.getElementById("sizePen").value);
        }
    }
    //brak odswiezania
	e.preventDefault();
	e.stopPropagation()
}

function controlPanel()
{
    //element pobierania wielkości pędzla
    var sliderPen = document.getElementById("sizePen"); //suwaczek
	var outputPen = document.getElementById("valuesPen"); //wartosc suwaczka
	outputPen.innerHTML = sliderPen.value;

    sliderPen.oninput = function() {
      outputPen.innerHTML = this.value;
    }
    console.log(sliderPen.value);

    //element do pobierania koloru
    color = document.getElementById("color").value; //pobranie koloru

    //przypisujemy przyciskom wartosc akcji
    this.btnsMode = [...document.querySelectorAll('.paint-buttons .button-mode')];

    //dla przycisku z trybem draw dodajemy klasę active
    this.btnsMode.filter(function(el) {
        return el.dataset.mode === 'pen'
    })[0].classList.add('active');
}

function changeMode()
{
    //po kliknięciu w przycisk zmiany trybu rysowania
    //wszystkim jego braciom wyłączamy klasę .active, a włączamy tylko temu klikniętemu
    //dodatkowo ustawiamy tryb rysowania na pobrany z dataset.mode klikniętego przycisku
    for (const el of this.btnsMode) {
        el.addEventListener('click', (e) => {
            e.currentTarget.classList.add('active');
            this.mode = e.currentTarget.dataset.mode;

            for (const el of this.btnsMode) {
                if (el !== e.currentTarget) {
                    el.classList.remove('active');
                }
            };
        });
    }
}

function enableMode()
{
    if (this.avaibleMode.indexOf(mode) !== -1) {
        this.mode = mode;
    }
}


function sizeOfCanvas(){
    console.log(Math.floor(window.innerWidth/1.25)+'px');
    console.log(Math.floor(window.innerHeight/1.25)+'px');
    document.getElementById("heightX").max = Math.floor(window.innerHeight/1.75);
    document.getElementById("heightY").max = Math.floor(window.innerWidth/1.75);

    var sliderY = document.getElementById("heightY");
    var outputY = document.getElementById("valuesY");
    
	outputY.innerHTML = sliderY.value;

    sliderY.oninput = function() {
        outputY.innerHTML = this.value;
        console.log(sliderY.value);
        console.log(sliderX.value);
    }

    var sliderX = document.getElementById("heightX");
	var outputX = document.getElementById("valuesX");
	outputX.innerHTML = sliderX.value;

    sliderX.oninput = function() {
      outputX.innerHTML = this.value;
      console.log(sliderY.value);
      console.log(sliderX.value);
    }
    ResizeCanvas(sliderX.value,sliderY.value)
}

function ResizeCanvas(width,height)
{
    localStorage.setItem(can,can.toDataURL());

    can.width = width;
    can.height = height;

    var img = new Image;
    img.src = localStorage.getItem(can);
    img.onload = function () {
    q.drawImage(img, 0, 0);
};
}
function ResizeCanvas2(width,height)
{
    can.width = width;
    can.height = height;
}
function loadFiles(){
    var request = new XMLHttpRequest();

    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("pliki").innerHTML = this.responseText;
        }
    };

    request.open("POST", "server.php", true);
    request.send(JSON.stringify({
        polecenie: 3
    }));
}

function load(){
    console.log("load");
    clearCanvas();
    var plik = document.getElementById('plik').value;
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var img = new Image;
            img.src = this.response;
            img.onload = function () 
            {
                ResizeCanvas2(img.width,img.height);
                q.drawImage(img,0,0);
            }
        }
    }
    request.open("POST", "server.php", true);
    request.send(JSON.stringify({
        polecenie: 4,
        plik: plik+".png"
    }));
}
function clearCanvas()
{
    q.clearRect(0, 0, can.width, can.height);
}
function save(){
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.response);
        }
    }
    request.open("POST", "server.php", true);
    request.send(JSON.stringify({
        polecenie: 1,
        dane: can.toDataURL()
    }));
}


function download(){
    console.log("download");
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            PutToFile(this.responseText.substring(0, this.responseText.indexOf("<option")),can.toDataURL())
        }
    }
    request.open("POST", "server.php", true);
    request.send(JSON.stringify({
        polecenie: 2,
    }));
}
function PutToFile(filename,source)
{
    var element = document.createElement('a');
    element.setAttribute('href', source);
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
}
