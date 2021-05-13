window.onload=empezar;

function empezar() {
    canvas = document.getElementById("thecanvas");
    if( canvas && canvas.getContext ) {
        //setInterval(reloj,50);
        requestAnimationFrame(dibujarmenu);
    }
}
//Antiguo metodo de inicilización del canvas
/*function reloj(){
    let canvas = document.getElementById("thecanvas");
    let ctx = canvas.getContext("2d");
  canvas.width=window.innerWidth;
  canvas.height=window.innerHeight;

  var scale1=canvas.width/850;
  var scale2=canvas.height/480;

  //console.log(scale1,scale2);

  //ctx.scale(scale1,scale2);

  //dibujar(ctx);

  //ctx.scale(-scale1,-scale2);

  dibujarreloj(ctx);
}*/

//Archivos de audio para efectos de sonido
var togglemenu = new Audio('toggle.mp3');
var jugar = new Audio('jugar.ogg');
var menusimple = new Audio('menusimple.wav');
var goodnight = new Audio('konbanwa.mp3');
var correct = new Audio('correct.wav');
var botonprobar= new Audio('botonprobar.wav');
var botonjuega=new Audio('botonjuega.wav');
var botonmaestro=new Audio('botonmaestro.wav');
var explainprueba=new Audio('explainprueba.wav');
var explainjuega=new Audio('explainjuego.wav');

var flagpulsando=false;
var flagpulsando2=false;

var angulo;
//Indicador de si deben aparecer los iconos de ayuda con sonido
var flagsonido=true;
var imgsonido1= new Image();
imgsonido1.src="sonido.png";
//Posicion de marcador en control por teclado
var posicionx=0;
var posiciony=0;

//Matriz con las posiciones posibles
var matrizteclas=new Array(3);
for(i=0;i<3;i++){
  matrizteclas[i]=new Array(2);
}
matrizteclas[0][0]=0;
matrizteclas[0][1]=1;
matrizteclas[1][0]=2;
matrizteclas[1][1]=3;
matrizteclas[2][0]=4;
matrizteclas[2][1]=5;

var marcadah=false;
var marcadamin=false;

//Está marcado uno de los sonidos?
var btsound1=false;
var btsound2=false;
var btsound3=false;

var btsoundclock=false;
//Comic Sans para dislexicos

var dislexia=false;
var daltonico=false;
//Al abrir el reloj al principio se muestra la hora actual
var date = new Date();
var hora=date.getHours();
var min=date.getMinutes();
//var hora=1;
//var min=0;
var lastmin;
var x;
var y;
var lastx;
var lasty;
var radio;

var estrella=new Array;
var estrella2=new Array;

var hierba=new Array;
var hierba2=new Array;
function grass(ctx){
  //120, 180
  var largo=0;
  var total=canvas.width/(canvas.width/7);
  var color="#01A611";
  if(!hierba.length){
    for(var i=0;i<40;i++){
      var x=Math.floor(Math.random() * (canvas.width)) + 0;
      var y=Math.floor(Math.random() * canvas.height) + Math.floor(canvas.height-(canvas.height/5.5));
      hierba.push(x);
      hierba2.push(y);
    }
  }

  for(var i=0;i<total+1;i++){
    if(color=="#01A611"){
      color="#018E0E";
    }
    else{
      color="#01A611";
    }
    ctx.strokeStyle="darkgreen";
    ctx.beginPath();
    ctx.ellipse(largo,canvas.height, canvas.height/5.5, canvas.width/7, Math.PI / 2, 0, 2 * Math.PI);
    ctx.fillStyle=color;
    ctx.fill();
    ctx.stroke();
    largo+=(canvas.width/7);
  }
    for(var i=0;i<40;i++){
      var x=hierba[i];
      var y=hierba2[i];

      ctx.beginPath();
      ctx.fillStyle="Violet";
      ctx.moveTo(x-4, y+4);
      ctx.lineTo(x-3, y+7);
      ctx.lineTo(x-1, y+7);
      ctx.lineTo(x-0, y+4);
      ctx.lineTo(x+4, y+3);
      ctx.lineTo(x+4, y+1);
      ctx.lineTo(x, y);
      ctx.lineTo(x-1, y-4);
      ctx.lineTo(x-3, y-4);
      ctx.lineTo(x-4, y+0);
      ctx.lineTo(x-8, y+1);
      ctx.lineTo(x-8, y+3);
      ctx.closePath();
      ctx.fill();
    }

}

function sunmoon(ctx){

  //Curva de bezier para el movimiento con t que indica el punto interpolado en la curva, cambiando según la hora
  var pcontrol=[(canvas.width/2),0];
  var p1=[-((canvas.width/18)*2),0+(canvas.width/18)+1+(canvas.height/4)];
  var p2=[canvas.width+((canvas.width/18)*2),0+(canvas.width/18)+1+(canvas.height/4)];

  //Calculo de t según la hora, pasando a sistema de minutos global e interpolando
  var total=(hora*60)+min;
  var t=0;
  if(total>360 && total<1080){
    t=(total-360)/(1080-360); //Formula para obtener el porcentaje del valor 'total' entre dos numeros

    var x = (1 - t) * (1 - t) * p1[0] + 2 * (1 - t) * t * pcontrol[0] + t * t * p2[0];
    var y = (1 - t) * (1 - t) * p1[1] + 2 * (1 - t) * t * pcontrol[1] + t * t * p2[1];


    var grd = ctx.createRadialGradient(x, y, canvas.width/18, x, y, (canvas.width/18)+30);
    grd.addColorStop(0, "rgb(255, 255, 0,0.5)"); //Tercera componente para darle transparencia al gradiente
    grd.addColorStop(1, "rgb(255, 255, 255,0)");
    ctx.beginPath();
    ctx.fillStyle = grd;
    ctx.arc(x, y, (canvas.width/18)+33, 0, 2 * Math.PI);
    ctx.fill();

    //#f9d71c
      ctx.beginPath();
      ctx.fillStyle="yellow";
      ctx.strokeStyle="orange";
      ctx.arc(x, y, canvas.width/18, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
  }
  if(total>1260 || total<300){
    var cambiar=0;
    if(total>=1260){
        cambiar=-1*(1439-total); //conversion de los minutos antes de medianoche a equivalente negativo para interpolar
    }
    else{
      cambiar=total;
    }
    t=(cambiar-(-179))/(300-(-179)); //Formula para obtener el porcentaje del valor 'total' entre dos numeros

    var x = (1 - t) * (1 - t) * p1[0] + 2 * (1 - t) * t * pcontrol[0] + t * t * p2[0];
    var y = (1 - t) * (1 - t) * p1[1] + 2 * (1 - t) * t * pcontrol[1] + t * t * p2[1];

    ctx.strokeStyle = "transparent"
    var grd = ctx.createRadialGradient(x, y, canvas.width/18, x, y, (canvas.width/18)+30);
    grd.addColorStop(0, "rgb(245,243,206,0.3)"); //#f5f3ce
    grd.addColorStop(1, "rgb(255, 255, 255,0)");
    ctx.beginPath();
    ctx.fillStyle = grd;
    ctx.arc(x, y, (canvas.width/18)+33, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();

    //#f9d71c
      ctx.beginPath();
      ctx.fillStyle="#dcdcdc";
      ctx.strokeStyle="darkgrey";
      ctx.arc(x, y, canvas.width/18, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.fillStyle="#c9c9c9";
      ctx.strokeStyle="darkgrey";
      ctx.arc(x+(canvas.width/18)/3, y+(canvas.width/18)/3, (canvas.width/18)/3, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.fillStyle="#c9c9c9";
      ctx.strokeStyle="darkgrey";
      ctx.arc(x-(canvas.width/18)/3, y+(canvas.width/18)/5, (canvas.width/18)/3.5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.fillStyle="#91a3b0";
      ctx.strokeStyle="darkgrey";
      ctx.arc(x+(canvas.width/18)/3, y-(canvas.width/18)/1.8, (canvas.width/18)/4.5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
  }

}

function sky(ctx){

//Array de colores derivados de https://codepen.io/zessx/pen/rDEAl como referencia
  var colores = [
    [{color:"rgb(0,0,12)",position:0},{color:"rgb(0,0,12)",position:0}],
    [{color:"rgb(2,1,17)",position:0.85},{color:"rgb(25,22,33)",position:1}],
    [{color:"rgb(2,1,17)",position:0.60},{color:"rgb(32,32,44)",position:1}],
    [{color:"rgb(2,1,17)",position:0.60},{color:"rgb(32,32,44)",position:1}], //[{color:"#020111",position:0.60},{color:"#20202c",position:1}],
    [{color:"rgb(2,1,17)",position:0.10},{color:"rgb(58,58,82)",position:1}], //[{color:"#020111",position:0.10},{color:"#3a3a52",position:1}]
    [{color:"rgb(32,32,44)",position:0},{color:"rgb(81,81,117)",position:1}],//fuera [{color:"#20202c",position:0},{color:"#515175",position:1}],
    [{color:"rgb(74,73,105)",position:0},{color:"rgb(112,114,171)",position:0.50}],
    [{color:"rgb(117,122,191)",position:0},{color:"rgb(133,131,190)",position:0.60}],
    [{color:"rgb(130,173,219)",position:0},{color:"rgb(235,178,177)",position:1}],
    [{color:"rgb(148,197,248)",position:0.1},{color:"rgb(166,230,255)",position:0.7}],
    [{color:"rgb(183,234,255)",position:0},{color:"rgb(148,223,255)",position:1}],
    [{color:"rgb(155,226,254)",position:0},{color:"rgb(103,209,251)",position:1}],
    [{color:"rgb(144,223,254)",position:0},{color:"rgb(56,163,209)",position:1}],
    [{color:"rgb(87,193,235)",position:0},{color:"rgb(36,111,168)",position:1}],
    [{color:"rgb(45,145,194)",position:0},{color:"rgb(30,82,142)",position:1}],
    [{color:"rgb(36,115,171)",position:0},{color:"rgb(30,82,142)",position:0.7}],
    [{color:"rgb(30,82,142)",position:0},{color:"rgb(38,88,137)",position:0.5}],
    [{color:"rgb(30,82,142)",position:0},{color:"rgb(114,138,124)",position:0.5}],
    [{color:"rgb(21,66,119)",position:0},{color:"rgb(225,196,94)",position:0.75}],
    [{color:"rgb(22,60,82)",position:0},{color:"rgb(197,117,45)",position:0.8}],
    [{color:"rgb(7,27,38)",position:0},{color:"rgb(138,59,18)",position:0.80}],
    [{color:"rgb(1,10,16)",position:0.30},{color:"rgb(89,35,11)",position:0.80}],
    [{color:"rgb(9,4,1)",position:0.50},{color:"rgb(75,29,6)",position:1}],
    [{color:"rgb(0,0,12)",position:0.80},{color:"rgb(21,8,0)",position:1}],
  ];

  //Una interpolacion de RGB para las transiciones entre horas no funciona porque puede general colores inesperados
    if(min==0){
      var grd = ctx.createLinearGradient(0, 0, 0, canvas.height);
      grd.addColorStop(colores[hora][0].position, colores[hora][0].color); //#f5f3ce
      grd.addColorStop(colores[hora][1].position, colores[hora][1].color);

      ctx.beginPath();
      ctx.fillStyle=grd;
      ctx.fillRect(0,0,canvas.width,canvas.height);
    }
    else{
    var t=(min-60)/(0-60); //Simetrico, 60 es un 0% y 0 es un 100%
    var color1=colores[hora][0].color;
    var color1=color1.substr(0, color1.indexOf(')'))+","+t+")";

    var color2=colores[hora][1].color;
    var color2=color2.substr(0, color2.indexOf(')'))+","+t+")";

    var grd = ctx.createLinearGradient(0, 0, 0, canvas.height);
    grd.addColorStop(colores[hora][0].position, color1); //#f5f3ce
    grd.addColorStop(colores[hora][1].position, color2);

    var siguiente=0;
    if(hora<23){
      siguiente=hora+1;
    }
    if(hora==23){
      siguiente=0;
    }

    var grd2 = ctx.createLinearGradient(0, 0, 0, canvas.height);
    grd2.addColorStop(colores[siguiente][0].position, colores[siguiente][0].color); //#f5f3ce
    grd2.addColorStop(colores[siguiente][1].position, colores[siguiente][1].color);

    ctx.beginPath();
    ctx.fillStyle=grd2;
    ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.beginPath();
    ctx.fillStyle=grd;
    ctx.fillRect(0,0,canvas.width,canvas.height);
  }

  //Cielo estrellado aleatorio
  if(!estrella.length){
    for(var i=0;i<30;i++){
      var x=Math.floor(Math.random() * (canvas.width)) + 0;
      var y=Math.floor(Math.random() * (canvas.height/2)) + 0;
      estrella.push(x);
      estrella2.push(y);
    }
  }
    var total=(hora*60)+min;
if(total>1260 || total<300){
  for(var i=0;i<30;i++){
    var x=estrella[i];
    var y=estrella2[i];
    var trans=1;
    if(hora==21){
      trans=(min-0)/(60-0);
    }
    if(hora==4){
      trans=(min-60)/(0-60);
    }
    ctx.save(); //guardar el estado anterior antes del glow
    ctx.fillStyle="rgb(255,250,134,"+trans+")";
    ctx.shadowColor = "rgb(245,243,206,"+trans+")"; //glow de la luna
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 10;
    ctx.fillRect(x,y,1,1);
    ctx.restore();
  }
}
}
//Variable de estado en el que nos encontramos, se utiliza para el control de eventos
//0: Menu 1:Probar 2:Jugar 3:Estadísticas Maestros
var estado=0;

//Flag colores botones
var bt1=false;
var bt2=false;
var bt3=false;
var btvolver=false;

var clock=0;
var clockid;
var clockwin=0;
var clockwinid;
function startclock(){
  clockid = setInterval("add()",1000);
}
function startclockwin(){
  clockwinid = setInterval("addwin()",1000);
}
function add(){
  clock++;
}
function addwin(){
  clockwin++;
}
function stopclock(){
  clearInterval(clockid);
  clock=0;
}
function stopclockwin(){
  clearInterval(clockwinid);
  clockwin=0;
}
var clockflag=false;

var loop;
var loopjugar;
//Variables de juego
var randomhora=["Las doce","La una","Las dos","Las tres","Las cuatro","Las cinco","Las seis"
,"Las siete","Las ocho","Las nueve","Las diez","Las once"];
var randommin=["en punto","y cinco","y diez","y cuarto","y veinte","y veinticinco","y media"
,"menos veinticinco","menos veinte","menos cuarto","menos diez","menos cinco"];
var randomsky=["de la noche","de la mañana","de la tarde"];
var enpregunta=false;
var rand1;
var rand2;
var rand3;
//var textopregunta;
var correcto=false;
var sizecorrecto=0;
var size2=false; //Variable de cambio de subida a bajada de tamaño
var sonidobien=false;

var usomin=0;
var usohora=0;
function dibujarjuego(){
  let canvas = document.getElementById("thecanvas");
  let ctx = canvas.getContext("2d");
  canvas.width=window.innerWidth;
  canvas.height=window.innerHeight;

  //Dibujar el reloj principal
  dibujarreloj();
  //Programacion de las 10 preguntas

  if(enpregunta==false){
    //paro de variables de juego por si se a quedado del juego anterior
    stopclockwin();
    stopclock();
    correcto=false;
    sizecorrecto=0;
    size2=false;
    clockflag=false;

    rand3=Math.floor(Math.random() * 3);
    rand2=Math.floor(Math.random() * 12);
    if(rand3==0){
      rand1=Math.floor(Math.random() * (6 - (-3))) + (-3);
      if(rand1<0){
        rand1=rand1+12;
      }
    }
    if(rand3==1){
      rand1=Math.floor(Math.random() * (3 - (-6))) + (-6);
      if(rand1<0){
        rand1=rand1+12;
      }
    }
    if(rand3==2){
      rand1=Math.floor(Math.random() * (9 - (3))) + (3);
    }
    enpregunta=true;
    //textopregunta=randomhora[rand1]+" "+randommin[rand2]+" "+randomsky[rand3];
    //console.log(textopregunta);
    startclock();
  }
  if(enpregunta==true){
  var hbien=rand1;
  if(rand3==0){
     if(rand1>=9){
       hbien=rand1+12;
     }
  }
  if(rand3==1){
    if(rand1>=0 && rand1<3){
      hbien=rand1+12;
    }
  }
  if(rand3==2){
    hbien=rand1+12;
  }
//Se resta una hora a la comparacion si es menos algo
  var hcom=hora;
    if(rand2<12 && rand2>6){
      hcom=hora+1;
      if(hora==23){
        hcom=0;
      }
    }
  if(min==rand2*5 && hcom==hbien){
       if(clockflag==false){
         clockwin=0;
         startclockwin();
         clockflag=true;
       }
       if(clockflag==true && clockwin==1){
         //console.log("Bien!");
         correcto=true;
       }
       if(sonidobien==false && clockwin==1){
         correct.play();
         sonidobien=true;
       }
       if(clockflag==true && clockwin==4){
         stopclockwin();
         //console.log(clock);
         //Recogida de datos para Maestros
         //Media aritmetica de tiempo por respuesta, minutos que más tarda en resolver, seccion del dia más problematica, aguja mas utilizada, reloj mudo
         if (localStorage.getItem("NumberAnswers") === null) {
           localStorage.setItem("NumberAnswers", "0");
          }
         if (localStorage.getItem("MeanAnswers") === null) {
           localStorage.setItem("MeanAnswers", "0");
           }
         if (localStorage.getItem("Nminutos") === null) {
           var minutos=new Array;
           for(var i=0;i<12;i++){
             minutos.push(0);
           }
           localStorage.setItem("Nminutos", JSON.stringify(minutos));
           }
         if (localStorage.getItem("Minutos") === null) {
           var minutos2=new Array;
           for(var i=0;i<12;i++){
             minutos2.push(0);
           }
           localStorage.setItem("Minutos", JSON.stringify(minutos2));
           }
         if (localStorage.getItem("Ndia") === null) {
           var dia=new Array;
           for(var i=0;i<3;i++){
             dia.push(0);
           }
           localStorage.setItem("Ndia", JSON.stringify(dia));
           }
         if (localStorage.getItem("Dia") === null) {
           var dia2=new Array;
           for(var i=0;i<3;i++){
             dia2.push(0);
           }
           localStorage.setItem("Dia", JSON.stringify(dia2));
           }
         if (localStorage.getItem("Usomin") === null) {
           localStorage.setItem("Usomin", "0");
         }
         if (localStorage.getItem("Usohora") === null) {
           localStorage.setItem("Usohora", "0");
         }
         if (localStorage.getItem("Mudo") === null) {
           localStorage.setItem("Mudo", "false");
         }
         var sumamin=Number(localStorage.getItem("Usomin"));
         sumamin+=usomin;
         localStorage.setItem("Usomin",sumamin.toString());
         var sumahora=Number(localStorage.getItem("Usohora"));
         sumahora+=usohora;
         localStorage.setItem("Usohora",sumahora.toString());

         var media=Number(localStorage.getItem("MeanAnswers"));
         var cantidadmedia=Number(localStorage.getItem("NumberAnswers"));
         var nuevototal=(media*cantidadmedia)+clock;
         cantidadmedia++;
         media=nuevototal/cantidadmedia;
         localStorage.setItem("NumberAnswers",cantidadmedia.toString());
         localStorage.setItem("MeanAnswers",media.toString());

         var jsonmin=JSON.parse(localStorage.getItem("Minutos"));
         var jsonminnum=JSON.parse(localStorage.getItem("Nminutos"));
         media=Number(jsonmin[rand2]);
         cantidadmedia=Number(jsonminnum[rand2]);
         nuevototal=(media*cantidadmedia)+clock;
         cantidadmedia++;
         media=nuevototal/cantidadmedia;
         jsonminnum[rand2]=cantidadmedia.toString();
         jsonmin[rand2]=media.toString();
         localStorage.setItem("Minutos", JSON.stringify(jsonmin));
         localStorage.setItem("Nminutos", JSON.stringify(jsonminnum));

         var jsondia=JSON.parse(localStorage.getItem("Dia"));
         var jsondianum=JSON.parse(localStorage.getItem("Ndia"));
         media=Number(jsondia[rand3]);
         cantidadmedia=Number(jsondianum[rand3]);
         nuevototal=(media*cantidadmedia)+clock;
         cantidadmedia++;
         media=nuevototal/cantidadmedia;
         jsondianum[rand3]=cantidadmedia.toString();
         jsondia[rand3]=media.toString();
         localStorage.setItem("Dia", JSON.stringify(jsondia));
         localStorage.setItem("Ndia", JSON.stringify(jsondianum));

         stopclock();
         usomin=0;
         usohora=0;
         sonidobien=false;
         correcto=false;
         sizecorrecto=0;
         size2=false;
         enpregunta=false;
         clockflag=false;
       }
    }
  else{
    stopclockwin();
    clockflag=false;
  }
  }
  //Dibujado del cartel de correcto
  if(correcto==true){
    if(sizecorrecto>=70){
      size2=true;
    }
    if(size2==false){
      sizecorrecto+=2;
    }
    if(size2==true){
      sizecorrecto-=2;
    }
    if(sizecorrecto>=0){
    ctx.font=sizecorrecto+"px Wendy One";
    ctx.textAlign = "center";
    ctx.fillStyle="black";
    ctx.strokeStyle="white";
    ctx.lineWidth=2;
    ctx.fillText("¡Correcto!",canvas.width/2,(canvas.height/2)-30);
    ctx.strokeText("¡Correcto!",canvas.width/2,(canvas.height/2)-30);
    }
  }
  //Dibujado del cartel de pregunta
  if(canvas.width>canvas.height){
    ctx.beginPath();
    ctx.lineWidth=8;
    ctx.lineJoin = "round";
    ctx.strokeStyle="#fdfd96";
    ctx.fillStyle="rgb(253, 253, 150,0.7)";
    ctx.moveTo(canvas.width-(canvas.width/3.9), (canvas.height-(canvas.height/10))-50);
    ctx.lineTo((canvas.width+20), (canvas.height-(canvas.height/10))-50);
    ctx.lineTo((canvas.width+20), canvas.height+20);
    ctx.lineTo(canvas.width-(canvas.width/3.9), canvas.height+20);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
    if(enpregunta==true){
      var size=canvas.height-(canvas.height-(canvas.height/10))-8;
      ctx.font=size+"px Vibur";
      if(dislexia==true){
        ctx.font=size+"px Comic Sans MS";
      }
      ctx.textAlign = "center";
      ctx.fillStyle="black";
      var lon=(canvas.width)-(canvas.width-(canvas.width/4));
      ctx.fillText("Marca "+randomhora[rand1],canvas.width-lon/2,((canvas.height-(canvas.height/10)/2)-8)-28,lon-8);
      ctx.fillText(randommin[rand2]+" "+randomsky[rand3],canvas.width-lon/2,(canvas.height)-20,lon-8);
    }
  }
  if(canvas.width<canvas.height){
    ctx.beginPath();
    ctx.lineWidth=8;
    ctx.lineJoin = "round";
    ctx.strokeStyle="#fdfd96";
    ctx.fillStyle="rgb(253, 253, 150,0.7)";
    ctx.moveTo(((canvas.height/10))+18, (canvas.height-(canvas.height/10))-50);
    ctx.lineTo((canvas.width+20),  (canvas.height-(canvas.height/10))-50);
    ctx.lineTo((canvas.width+20), canvas.height+20);
    ctx.lineTo(((canvas.height/10))+18, canvas.height+20);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
    if(enpregunta==true){
      var size=(canvas.height-(canvas.height-(canvas.height/10)))/1.5;
      ctx.font=size+"px Vibur";
      if(dislexia==true){
        ctx.font=size+"px Comic Sans MS";
      }
      ctx.textAlign = "center";
      ctx.fillStyle="black";
      var lon=(canvas.width)-((canvas.height/10)+18);
      ctx.fillText("Marca "+randomhora[rand1],canvas.width-lon/2,((canvas.height-(canvas.height/10)/2)-8)-28,lon-8);
      ctx.fillText(randommin[rand2]+" "+randomsky[rand3],canvas.width-lon/2,(canvas.height)-20,lon-8);
    }
  }

  loopjugar=requestAnimationFrame(dibujarjuego);
}
function dibujarmenu(){
  let canvas = document.getElementById("thecanvas");
  let ctx = canvas.getContext("2d");
  canvas.width=window.innerWidth;
  canvas.height=window.innerHeight;

  //Dibujado de cielo cambiante según la hora
  sky(ctx);
  //Dibujado de suelo de hierba y flores
  grass(ctx);
  //Dibujado de Sol o Luna
  sunmoon(ctx);


  //Dibujado del menu principal
  var x1=window.innerWidth/2;
  var y1=window.innerHeight/2;


  ctx.save();
  ctx.beginPath();
  ctx.lineWidth=8;
  ctx.lineJoin = "round";
  ctx.strokeStyle="#fdfd96";
  ctx.fillStyle="rgb(253, 253, 150,0.7)";

  if (localStorage.getItem("Dislexia") === null) {
    localStorage.setItem("Dislexia", "false");
  }

  if(localStorage.getItem("Dislexia") == "true"){
    dislexia=true;
  }
  if(localStorage.getItem("Dislexia") == "false"){
    dislexia=false;
  }

  if (localStorage.getItem("Daltonico") === null) {
    localStorage.setItem("Daltonico", "false");
  }

  if(localStorage.getItem("Daltonico") == "true"){
    daltonico=true;
  }
  if(localStorage.getItem("Daltonico") == "false"){
    daltonico=false;
  }

  if(canvas.width>canvas.height){
  ctx.moveTo((canvas.width/4), 0+20);
  ctx.lineTo((canvas.width/4)*3, 0+20);
  ctx.lineTo((canvas.width/4)*3, canvas.height-20);
  ctx.lineTo((canvas.width/4), canvas.height-20);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
  //Dibujado de botones y titulo
  ctx.beginPath();
  ctx.lineWidth=15;
  ctx.strokeStyle="black"; //darkorchid
  ctx.fillStyle="rgb(253, 253, 150)";
  ctx.moveTo((canvas.width/3), 0+20+(canvas.height/5));
  ctx.lineTo(((canvas.width/3)*2), 0+20+(canvas.height/5));
  ctx.lineTo(((canvas.width/3)*2), (canvas.height-20)-(canvas.height/1.6));
  ctx.lineTo((canvas.width/3), (canvas.height-20)-(canvas.height/1.6));
  ctx.closePath();
  ctx.stroke();
  ctx.fill();

  var size=(canvas.height-20)-(canvas.height/1.6)-(20+(canvas.height/5))-20;
  ctx.font=size+"px Vibur";
  if(dislexia==true){
    ctx.font=size+"px Comic Sans MS";
  }
  ctx.textAlign = "center";
  ctx.fillStyle="black";
  ctx.fillText("El paso del Tiempo",((((canvas.width/3)*2)-(canvas.width/3))/2)+(canvas.width/3),(canvas.height-20)-(canvas.height/1.6)-15,(((canvas.width/3)*2)-(canvas.width/3))-10);

  ctx.beginPath();
  ctx.lineWidth=10;
  ctx.strokeStyle="ForestGreen";
  ctx.fillStyle="LimeGreen";
  if(bt1==true){
    ctx.strokeStyle="DarkGreen";
    ctx.fillStyle="Green";
  }
  ctx.moveTo((canvas.width/3)+((((canvas.width/3)*2)-(canvas.width/3))/4), 0+20+(canvas.height/2.5));
  ctx.lineTo(((canvas.width/3)*2)-((((canvas.width/3)*2)-(canvas.width/3))/4), 0+20+(canvas.height/2.5));
  ctx.lineTo(((canvas.width/3)*2)-((((canvas.width/3)*2)-(canvas.width/3))/4), (canvas.height-20)-(canvas.height/2.3));
  ctx.lineTo((canvas.width/3)+((((canvas.width/3)*2)-(canvas.width/3))/4), (canvas.height-20)-(canvas.height/2.3));
  ctx.closePath();
  ctx.stroke();
  ctx.fill();

  var size=(canvas.height-20)-(canvas.height/2.3)-(20+(canvas.height/2.5))-10;
  ctx.font=size+"px Vibur";
  if(dislexia==true){
    ctx.font=size+"px Comic Sans MS";
  }
  ctx.textAlign = "center";
  ctx.fillStyle="white";
  ctx.fillText("Prueba",((canvas.width/3)+((((canvas.width/3)*2)-(canvas.width/3))/4))+(((((canvas.width/3)*2)-((((canvas.width/3)*2)-(canvas.width/3))/4))-((canvas.width/3)+((((canvas.width/3)*2)-(canvas.width/3))/4)))/2),
  (canvas.height-20)-(canvas.height/2.3)-15,((((canvas.width/3)*2)-((((canvas.width/3)*2)-(canvas.width/3))/4))-((canvas.width/3)+((((canvas.width/3)*2)-(canvas.width/3))/4)))-10);

  ctx.beginPath();
  ctx.lineWidth=10;
  ctx.strokeStyle="DarkRed";
  ctx.fillStyle="Red";
  if(bt2==true){
  ctx.strokeStyle="Black";
  ctx.fillStyle="DarkRed";
  }
  ctx.moveTo((canvas.width/3)+((((canvas.width/3)*2)-(canvas.width/3))/4), 0+20+(canvas.height/1.8));
  ctx.lineTo(((canvas.width/3)*2)-((((canvas.width/3)*2)-(canvas.width/3))/4), 0+20+(canvas.height/1.8));
  ctx.lineTo(((canvas.width/3)*2)-((((canvas.width/3)*2)-(canvas.width/3))/4), (canvas.height-20)-(canvas.height/3.6));
  ctx.lineTo((canvas.width/3)+((((canvas.width/3)*2)-(canvas.width/3))/4), (canvas.height-20)-(canvas.height/3.6));
  ctx.closePath();
  ctx.stroke();
  ctx.fill();

  var size=(canvas.height-20)-(canvas.height/2.3)-(20+(canvas.height/2.5))-10;
  ctx.font=size+"px Vibur";
  if(dislexia==true){
    ctx.font=size+"px Comic Sans MS";
  }
  ctx.textAlign = "center";
  ctx.fillStyle="white";
  ctx.fillText("Juega",((canvas.width/3)+((((canvas.width/3)*2)-(canvas.width/3))/4))+(((((canvas.width/3)*2)-((((canvas.width/3)*2)-(canvas.width/3))/4))-((canvas.width/3)+((((canvas.width/3)*2)-(canvas.width/3))/4)))/2),
  (canvas.height-20)-(canvas.height/3.6)-15,((((canvas.width/3)*2)-((((canvas.width/3)*2)-(canvas.width/3))/4))-((canvas.width/3)+((((canvas.width/3)*2)-(canvas.width/3))/4)))-10);

  ctx.beginPath();
  ctx.lineWidth=10;
  ctx.strokeStyle="DarkOrange";
  ctx.fillStyle="Orange";
  if(bt3==true){
    ctx.strokeStyle="OrangeRed";
    ctx.fillStyle="#cc7000";
  }
  ctx.moveTo((canvas.width/3)+((((canvas.width/3)*2)-(canvas.width/3))/4), 0+20+(canvas.height/1.4));
  ctx.lineTo(((canvas.width/3)*2)-((((canvas.width/3)*2)-(canvas.width/3))/4), 0+20+(canvas.height/1.4));
  ctx.lineTo(((canvas.width/3)*2)-((((canvas.width/3)*2)-(canvas.width/3))/4), (canvas.height-20)-(canvas.height/8));
  ctx.lineTo((canvas.width/3)+((((canvas.width/3)*2)-(canvas.width/3))/4), (canvas.height-20)-(canvas.height/8));
  ctx.closePath();
  ctx.stroke();
  ctx.fill();

  var size=(canvas.height-20)-(canvas.height/2.3)-(20+(canvas.height/2.5))-10;
  ctx.font=size+"px Vibur";
  if(dislexia==true){
    ctx.font=size+"px Comic Sans MS";
  }
  ctx.textAlign = "center";
  ctx.fillStyle="white";
  ctx.fillText("Maestro",((canvas.width/3)+((((canvas.width/3)*2)-(canvas.width/3))/4))+(((((canvas.width/3)*2)-((((canvas.width/3)*2)-(canvas.width/3))/4))-((canvas.width/3)+((((canvas.width/3)*2)-(canvas.width/3))/4)))/2),
  (canvas.height-20)-(canvas.height/8)-15,((((canvas.width/3)*2)-((((canvas.width/3)*2)-(canvas.width/3))/4))-((canvas.width/3)+((((canvas.width/3)*2)-(canvas.width/3))/4)))-10);

  }


  if(canvas.width<canvas.height){

  ctx.moveTo(0+20,(canvas.height/3));
  ctx.lineTo(canvas.width-20,(canvas.height/3));
  ctx.lineTo(canvas.width-20, (canvas.height/3)*2.5);
  ctx.lineTo(0+20, (canvas.height/3)*2.5);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();

  //Dibujado de botones y titulo
  ctx.beginPath();
  ctx.lineWidth=15;
  ctx.strokeStyle="black"; //darkorchid
  ctx.fillStyle="rgb(253, 253, 150)";
  ctx.moveTo((canvas.width/5), (canvas.height/3)+30);
  ctx.lineTo((canvas.width/5)*4, (canvas.height/3)+30);
  ctx.lineTo((canvas.width/5)*4, (canvas.height-20)-(canvas.height/1.8));
  ctx.lineTo((canvas.width/5), (canvas.height-20)-(canvas.height/1.8));
  ctx.closePath();
  ctx.stroke();
  ctx.fill();

  var size=(canvas.height-20)-(canvas.height/1.8)-((canvas.height/3)+30)-10;
  ctx.font=size+"px Vibur";
  if(dislexia==true){
    ctx.font=size+"px Comic Sans MS";
  }
  ctx.textAlign = "center";
  ctx.fillStyle="black";
  ctx.fillText("El paso del Tiempo",(canvas.width/5)+(((canvas.width/5)*4-(canvas.width/5))/2),(canvas.height-20)-(canvas.height/1.8)-10,((canvas.width/5)*4-(canvas.width/5))-10);

  ctx.beginPath();
  ctx.lineWidth=10;
  ctx.strokeStyle="ForestGreen";
  ctx.fillStyle="LimeGreen";
  if(bt1==true){
    ctx.strokeStyle="DarkGreen";
    ctx.fillStyle="Green";
  }
  ctx.moveTo((canvas.width/3.2),(canvas.height/2.1));
  ctx.lineTo(canvas.width-(canvas.width/3.2),(canvas.height/2.1));
  ctx.lineTo(canvas.width-(canvas.width/3.2),canvas.height-(canvas.height/2.2));
  ctx.lineTo((canvas.width/3.2),canvas.height-(canvas.height/2.2));
  ctx.closePath();
  ctx.stroke();
  ctx.fill();

  var size=(canvas.height-(canvas.height/2.2))-(canvas.height/2.1)-10;
  ctx.font=size+"px Vibur";
  if(dislexia==true){
    ctx.font=size+"px Comic Sans MS";
  }
  ctx.textAlign = "center";
  ctx.fillStyle="white";
  ctx.fillText("Prueba",(canvas.width/3.2)+((canvas.width-(canvas.width/3.2))-(canvas.width/3.2))/2,canvas.height-(canvas.height/2.2)-10,((canvas.width-(canvas.width/3.2))-(canvas.width/3.2))-10);

  ctx.beginPath();
  ctx.lineWidth=10;
  ctx.strokeStyle="DarkRed";
  ctx.fillStyle="Red";
  if(bt2==true){
  ctx.strokeStyle="Black";
  ctx.fillStyle="DarkRed";
  }
  ctx.moveTo((canvas.width/3.2),(canvas.height/1.7)); //bajar
  ctx.lineTo(canvas.width-(canvas.width/3.2),(canvas.height/1.7));
  ctx.lineTo(canvas.width-(canvas.width/3.2),canvas.height-(canvas.height/2.9)); //subir
  ctx.lineTo((canvas.width/3.2),canvas.height-(canvas.height/2.9));
  ctx.closePath();
  ctx.stroke();
  ctx.fill();

  var size=(canvas.height-(canvas.height/2.9))-(canvas.height/1.7)-10;
  ctx.font=size+"px Vibur";
  if(dislexia==true){
    ctx.font=size+"px Comic Sans MS";
  }
  ctx.textAlign = "center";
  ctx.fillStyle="white";
  ctx.fillText("Juega",(canvas.width/3.2)+(canvas.width-(canvas.width/3.2)-(canvas.width/3.2))/2,canvas.height-(canvas.height/2.9)-10,(canvas.width-(canvas.width/3.2))-(canvas.width/3.2)-10);

  ctx.beginPath();
  ctx.lineWidth=10;
  ctx.strokeStyle="DarkOrange";
  ctx.fillStyle="Orange";
  if(bt3==true){
    ctx.strokeStyle="OrangeRed";
    ctx.fillStyle="#cc7000";
  }
  ctx.moveTo((canvas.width/3.2),(canvas.height/1.43)); //bajar
  ctx.lineTo(canvas.width-(canvas.width/3.2),(canvas.height/1.43));
  ctx.lineTo(canvas.width-(canvas.width/3.2),canvas.height-(canvas.height/4.3)); //subir
  ctx.lineTo((canvas.width/3.2),canvas.height-(canvas.height/4.3));
  ctx.closePath();
  ctx.stroke();
  ctx.fill();

  var size=canvas.height-(canvas.height/4.3)-(canvas.height/1.43)-10;
  ctx.font=size+"px Vibur";
  if(dislexia==true){
    ctx.font=size+"px Comic Sans MS";
  }
  ctx.textAlign = "center";
  ctx.fillStyle="white";
  ctx.fillText("Maestro",(canvas.width/3.2)+((canvas.width-(canvas.width/3.2)-(canvas.width/3.2))/2),canvas.height-(canvas.height/4.3)-10,canvas.width-(canvas.width/3.2)-(canvas.width/3.2)-10);


  }

  if(flagsonido==true){
    if(canvas.width>canvas.height){
    ctx.drawImage(imgsonido1,((canvas.width/3)*2)-((((canvas.width/3)*2)-(canvas.width/3))/4)+15,20+(canvas.height/2.5),canvas.width/18,canvas.width/18);
    ctx.drawImage(imgsonido1,((canvas.width/3)*2)-((((canvas.width/3)*2)-(canvas.width/3))/4)+15,20+(canvas.height/1.8),canvas.width/18,canvas.width/18);
    ctx.drawImage(imgsonido1,((canvas.width/3)*2)-((((canvas.width/3)*2)-(canvas.width/3))/4)+15,20+(canvas.height/1.4),canvas.width/18,canvas.width/18);
    if(btsound1==true){
      ctx.lineWidth=5;
      ctx.strokeStyle="Red";
      ctx.beginPath();
      ctx.moveTo(((canvas.width/3)*2)-((((canvas.width/3)*2)-(canvas.width/3))/4)+15-5,20+(canvas.height/2.5)-5);
      ctx.lineTo(((canvas.width/3)*2)-((((canvas.width/3)*2)-(canvas.width/3))/4)+15+(canvas.width/18)+5,20+(canvas.height/2.5)-5);
      ctx.lineTo(((canvas.width/3)*2)-((((canvas.width/3)*2)-(canvas.width/3))/4)+15+(canvas.width/18)+5,20+(canvas.height/2.5)+(canvas.width/18)+5);
      ctx.lineTo(((canvas.width/3)*2)-((((canvas.width/3)*2)-(canvas.width/3))/4)+15-5,20+(canvas.height/2.5)+(canvas.width/18)+5);
      ctx.closePath();
      ctx.stroke();
    }
    if(btsound2==true){
      ctx.lineWidth=5;
      ctx.strokeStyle="Red";
      ctx.beginPath();
      ctx.moveTo(((canvas.width/3)*2)-((((canvas.width/3)*2)-(canvas.width/3))/4)+15-5,20+(canvas.height/1.8)-5);
      ctx.lineTo(((canvas.width/3)*2)-((((canvas.width/3)*2)-(canvas.width/3))/4)+15+(canvas.width/18)+5,20+(canvas.height/1.8)-5);
      ctx.lineTo(((canvas.width/3)*2)-((((canvas.width/3)*2)-(canvas.width/3))/4)+15+(canvas.width/18)+5,20+(canvas.height/1.8)+(canvas.width/18)+5);
      ctx.lineTo(((canvas.width/3)*2)-((((canvas.width/3)*2)-(canvas.width/3))/4)+15-5,20+(canvas.height/1.8)+(canvas.width/18)+5);
      ctx.closePath();
      ctx.stroke();
    }
    if(btsound3==true){
      ctx.lineWidth=5;
      ctx.strokeStyle="Red";
      ctx.beginPath();
      ctx.moveTo(((canvas.width/3)*2)-((((canvas.width/3)*2)-(canvas.width/3))/4)+15-5,20+(canvas.height/1.4)-5);
      ctx.lineTo(((canvas.width/3)*2)-((((canvas.width/3)*2)-(canvas.width/3))/4)+15+(canvas.width/18)+5,20+(canvas.height/1.4)-5);
      ctx.lineTo(((canvas.width/3)*2)-((((canvas.width/3)*2)-(canvas.width/3))/4)+15+(canvas.width/18)+5,20+(canvas.height/1.4)+(canvas.width/18)+5);
      ctx.lineTo(((canvas.width/3)*2)-((((canvas.width/3)*2)-(canvas.width/3))/4)+15-5,20+(canvas.height/1.4)+(canvas.width/18)+5);
      ctx.closePath();
      ctx.stroke();
    }
    }
    if(canvas.width<canvas.height){
      ctx.drawImage(imgsonido1,canvas.width-(canvas.width/3.2)+15,(canvas.height/2.1),canvas.width/9,canvas.width/9);
      ctx.drawImage(imgsonido1,canvas.width-(canvas.width/3.2)+15,(canvas.height/1.7),canvas.width/9,canvas.width/9);
      ctx.drawImage(imgsonido1,canvas.width-(canvas.width/3.2)+15,(canvas.height/1.43),canvas.width/9,canvas.width/9);
      if(btsound1==true){
        ctx.lineWidth=5;
        ctx.strokeStyle="Red";
        ctx.beginPath();
        ctx.moveTo(canvas.width-(canvas.width/3.2)+15-5,(canvas.height/2.1)-5);
        ctx.lineTo(canvas.width-(canvas.width/3.2)+15+(canvas.width/9)+5,(canvas.height/2.1)-5);
        ctx.lineTo(canvas.width-(canvas.width/3.2)+15+(canvas.width/9)+5,(canvas.height/2.1)+(canvas.width/9)+5);
        ctx.lineTo(canvas.width-(canvas.width/3.2)+15-5,(canvas.height/2.1)+(canvas.width/9)+5);
        ctx.closePath();
        ctx.stroke();
      }
      if(btsound2==true){
        ctx.lineWidth=5;
        ctx.strokeStyle="Red";
        ctx.beginPath();
        ctx.moveTo(canvas.width-(canvas.width/3.2)+15-5,(canvas.height/1.7)-5);
        ctx.lineTo(canvas.width-(canvas.width/3.2)+15+(canvas.width/9)+5,(canvas.height/1.7)-5);
        ctx.lineTo(canvas.width-(canvas.width/3.2)+15+(canvas.width/9)+5,(canvas.height/1.7)+(canvas.width/9)+5);
        ctx.lineTo(canvas.width-(canvas.width/3.2)+15-5,(canvas.height/1.7)+(canvas.width/9)+5);
        ctx.closePath();
        ctx.stroke();
      }
      if(btsound3==true){
        ctx.lineWidth=5;
        ctx.strokeStyle="Red";
        ctx.beginPath();
        ctx.moveTo(canvas.width-(canvas.width/3.2)+15-5,(canvas.height/1.43)-5);
        ctx.lineTo(canvas.width-(canvas.width/3.2)+15+(canvas.width/9)+5,(canvas.height/1.43)-5);
        ctx.lineTo(canvas.width-(canvas.width/3.2)+15+(canvas.width/9)+5,(canvas.height/1.43)+(canvas.width/9)+5);
        ctx.lineTo(canvas.width-(canvas.width/3.2)+15-5,(canvas.height/1.43)+(canvas.width/9)+5);
        ctx.closePath();
        ctx.stroke();
      }
    }
  }

  //Botón de volver
  ctx.beginPath();
  ctx.lineWidth=10;
  ctx.strokeStyle="DarkRed";
  ctx.fillStyle="Red";
  if(btvolver==true){
  ctx.strokeStyle="black";
  ctx.fillStyle="DarkRed";
  }
  ctx.arc(((canvas.height/10)/2)+8,(canvas.height-(canvas.height/10)/2)-8,(canvas.height/10)/2, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fill();
  var size=(((canvas.height/10)/2)*2)-10;
  ctx.font=size+"px FontAwesome";
  ctx.textAlign = "center";
  ctx.fillStyle="white";
  ctx.fillText('\uF0e2',((canvas.height/10)/2)+8,(canvas.height-(canvas.height/10)/2)-8+(canvas.height/10)/2-10);

  ctx.restore();


  loop=  requestAnimationFrame(dibujarmenu);
}
//0 reloj mudo solo con marcas, 1 reloj con numeros
var modo=1;

function dibujarreloj(){

  let canvas = document.getElementById("thecanvas");
  let ctx = canvas.getContext("2d");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

  ctx.strokeStyle="black";
  ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
  ctx.beginPath();
  ctx.stroke();

  var x1=window.innerWidth/2;
  var y1=window.innerHeight/2;

  if(window.innerWidth>=window.innerHeight){
    radio=(window.innerHeight/2)-20;
  }
  if(window.innerWidth<window.innerHeight){
    radio=(window.innerWidth/2)-20;
  }

  //Dibujado de cielo cambiante según la hora
  sky(ctx);
  //Dibujado de suelo de hierba y flores
  grass(ctx);
  //Dibujado de Sol o Luna
  sunmoon(ctx);

  //Color del reloj que cambia entre noche y día
  var maincolor="rgb(0,0,0)";
  var total=(hora*60)+min;
  if(total>1200 || total<360){
    maincolor="rgb(255,255,255)";
    if(hora==20){
      t=(min-0)/(60-0);
      var nivel=t*(255-0)+0; //Que numero corresponde a un porcentaje entre 0 y 255?
      maincolor="rgb("+nivel+","+nivel+","+nivel+")";
    }
    if(hora==5){
      t=(min-60)/(0-60);
      var nivel=t*(255-0)+0;
      maincolor="rgb("+nivel+","+nivel+","+nivel+")";
    }
  }

  ctx.strokeStyle=maincolor;
  ctx.beginPath();
  ctx.arc(x1, y1, radio, 0, 2 * Math.PI);
  ctx.stroke();

  ctx.lineWidth = 8;
  //console.log(hora,min);
  //Horas
  ctx.beginPath();
  ctx.strokeStyle="grey";
  var angh=30*hora+((min/60)*30); //la aguja de las horas está en posiciones intermedias entre dos numeros a veces
  var xorigen=(x1)-x1;
  var yorigen=(y1+(radio/10))-y1;
  var xorigen2=-yorigen*Math.sin(angh* Math.PI / 180) + xorigen*Math.cos(angh* Math.PI / 180);
  var yorigen2=yorigen*Math.cos(angh* Math.PI / 180) + xorigen*Math.sin(angh* Math.PI / 180);
  xorigen2=xorigen2+x1;
  yorigen2=yorigen2+y1;

  var xfinal=(x1)-x1;
  var yfinal=(y1-radio+(radio/2))-y1;
  var xfinal2=-yfinal*Math.sin(angh* Math.PI / 180) + xfinal*Math.cos(angh* Math.PI / 180);
  var yfinal2=yfinal*Math.cos(angh* Math.PI / 180) + xfinal*Math.sin(angh* Math.PI / 180);
  xfinal2=xfinal2+x1;
  yfinal2=yfinal2+y1;
  if(marcadah==true){
    ctx.lineWidth = 15;
    ctx.strokeStyle="red";
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(xorigen2, yorigen2);
    ctx.lineTo(xfinal2, yfinal2);
    ctx.stroke();
  }
  ctx.lineWidth = 8;
  ctx.strokeStyle="grey";
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(xorigen2, yorigen2);
  ctx.lineTo(xfinal2, yfinal2);
  ctx.stroke();

  //Minutos
  ctx.beginPath();
  ctx.strokeStyle=maincolor;
  var angmin=6*min;
  var xorigen=(x1)-x1;
  var yorigen=(y1+(radio/10))-y1;
  var xorigen2=-yorigen*Math.sin(angmin* Math.PI / 180) + xorigen*Math.cos(angmin* Math.PI / 180);
  var yorigen2=yorigen*Math.cos(angmin* Math.PI / 180) + xorigen*Math.sin(angmin* Math.PI / 180);
  xorigen2=xorigen2+x1;
  yorigen2=yorigen2+y1;

  var xfinal=(x1)-x1;
  var yfinal=(y1-radio+(radio/10))-y1;
  var xfinal2=-yfinal*Math.sin(angmin* Math.PI / 180) + xfinal*Math.cos(angmin* Math.PI / 180);
  var yfinal2=yfinal*Math.cos(angmin* Math.PI / 180) + xfinal*Math.sin(angmin* Math.PI / 180);
  xfinal2=xfinal2+x1;
  yfinal2=yfinal2+y1;
  if(marcadamin==true){
    ctx.lineWidth = 15;
    ctx.strokeStyle="red";
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(xorigen2, yorigen2);
    ctx.lineTo(xfinal2, yfinal2);
    ctx.stroke();
  }
  ctx.lineWidth = 8;
  ctx.strokeStyle=maincolor;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(xorigen2, yorigen2);
  ctx.lineTo(xfinal2, yfinal2);
  ctx.stroke();

  ctx.lineCap = "butt";

if(modo==0){
  //Marcas de horas del reloj
  ctx.lineWidth = 4;
  var angulo=0;
  for(var i=0;i<4;i++){
    var xorigen=(x1)-x1;
    var yorigen=(y1-(radio/3)-(radio/2.2))-y1;
    var xorigen2=-yorigen*Math.sin(angulo* Math.PI / 180) + xorigen*Math.cos(angulo* Math.PI / 180);
    var yorigen2=yorigen*Math.cos(angulo* Math.PI / 180) + xorigen*Math.sin(angulo* Math.PI / 180);
    xorigen2=xorigen2+x1;
    yorigen2=yorigen2+y1;

    var xfinal=(x1)-x1;
    var yfinal=(y1-(radio/2)-(radio/2.2))-y1;
    var xfinal2=-yfinal*Math.sin(angulo* Math.PI / 180) + xfinal*Math.cos(angulo* Math.PI / 180);
    var yfinal2=yfinal*Math.cos(angulo* Math.PI / 180) + xfinal*Math.sin(angulo* Math.PI / 180);
    xfinal2=xfinal2+x1;
    yfinal2=yfinal2+y1;
    ctx.moveTo(xorigen2, yorigen2);
    ctx.lineTo(xfinal2, yfinal2);
    ctx.stroke();
    angulo+=90;
  }
    ctx.lineWidth = 2;
    angulo=0;
    for(var i=0;i<12;i++){
      var xorigen=(x1)-x1;
      var yorigen=(y1-(radio/2.4)-(radio/2.2))-y1;
      var xorigen2=-yorigen*Math.sin(angulo* Math.PI / 180) + xorigen*Math.cos(angulo* Math.PI / 180);
      var yorigen2=yorigen*Math.cos(angulo* Math.PI / 180) + xorigen*Math.sin(angulo* Math.PI / 180);
      xorigen2=xorigen2+x1;
      yorigen2=yorigen2+y1;

      var xfinal=(x1)-x1;
      var yfinal=(y1-(radio/2)-(radio/2.2))-y1;
      var xfinal2=-yfinal*Math.sin(angulo* Math.PI / 180) + xfinal*Math.cos(angulo* Math.PI / 180);
      var yfinal2=yfinal*Math.cos(angulo* Math.PI / 180) + xfinal*Math.sin(angulo* Math.PI / 180);
      xfinal2=xfinal2+x1;
      yfinal2=yfinal2+y1;
      ctx.moveTo(xorigen2, yorigen2);
      ctx.lineTo(xfinal2, yfinal2);
      ctx.stroke();
      angulo+=30;
    }
}

if(modo==1){
  ctx.fillStyle=maincolor;
  ctx.lineWidth = 4;
  var angulo=0;
  for(var i=0;i<4;i++){
    var xorigen=(x1)-x1;
    var yorigen=(y1-(radio/2)-(radio/2.2))-y1;
    var xorigen2=-yorigen*Math.sin(angulo* Math.PI / 180) + xorigen*Math.cos(angulo* Math.PI / 180);
    var yorigen2=yorigen*Math.cos(angulo* Math.PI / 180) + xorigen*Math.sin(angulo* Math.PI / 180);
    xorigen2=xorigen2+x1;
    yorigen2=yorigen2+y1;

    var altura=canvas.height/9; //altura de la fuente
    if(canvas.height>canvas.width){
      altura=canvas.width/9;
    }
    ctx.font = altura+"px Varela Round";
    var numero=0;
    //ctx.measureText dios salve a canvas
    if(i==0){
      numero=12;
      ctx.fillText(numero, xorigen2-(ctx.measureText(numero).width/2), yorigen2+(altura/3)*2);
    }
    if(i==1){
      numero=3;
      ctx.fillText(numero, xorigen2-(ctx.measureText(numero).width), yorigen2+(altura/3));
    }
    if(i==2){
      numero=6;
      ctx.fillText(numero, xorigen2-(ctx.measureText(numero).width/2), yorigen2);
    }
    if(i==3){
      numero=9;
      ctx.fillText(numero, xorigen2, yorigen2+(altura/3));
    }
    angulo+=90;
    }

    angulo=0;
    for(var i=0;i<12;i++){
      if(i!=0,3,6,9){
        var xorigen=(x1)-x1;
        var yorigen=(y1-(radio/2)-(radio/2.2))-y1;
        var xorigen2=-yorigen*Math.sin(angulo* Math.PI / 180) + xorigen*Math.cos(angulo* Math.PI / 180);
        var yorigen2=yorigen*Math.cos(angulo* Math.PI / 180) + xorigen*Math.sin(angulo* Math.PI / 180);
        xorigen2=xorigen2+x1;
        yorigen2=yorigen2+y1;

        var altura=canvas.height/12; //altura de la fuente
        if(canvas.height>canvas.width){
          altura=canvas.width/12;
        }
        ctx.font = altura+"px Varela Round";
        var numero=0;

        if(i==1 || i==2){
          numero=i;
          ctx.fillText(numero, xorigen2-(ctx.measureText(numero).width/2), yorigen2+(altura/3)*2);
        }
        if(i==4 || i==5){
          numero=i;
          ctx.fillText(numero, xorigen2-(ctx.measureText(numero).width), yorigen2);
        }
        if(i==7 || i==8){
          numero=i;
          ctx.fillText(numero, xorigen2, yorigen2);
        }
        if(i==10 || i==11){
          numero=i;
          ctx.fillText(numero, xorigen2-(ctx.measureText(numero).width/4), yorigen2+(altura/3)*2);
        }
      }
      angulo+=30;
    }

}
  ctx.lineWidth = 4;
  //Circulo central
  ctx.beginPath();
  ctx.arc(x1, y1, radio/20, 0, 2 * Math.PI);
  ctx.fillStyle="black";
  ctx.fill();
  ctx.stroke();
  ctx.strokeStyle="black";

  //Botón de volver
  ctx.beginPath();
  ctx.lineWidth=10;
  ctx.strokeStyle="DarkRed";
  ctx.fillStyle="Red";
  if(btvolver==true){
  ctx.strokeStyle="black";
  ctx.fillStyle="DarkRed";
  }
  ctx.arc(((canvas.height/10)/2)+8,(canvas.height-(canvas.height/10)/2)-8,(canvas.height/10)/2, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fill();
  var size=(((canvas.height/10)/2)*2)-10;
  ctx.font=size+"px FontAwesome";
  ctx.textAlign = "center";
  ctx.fillStyle="white";
  ctx.fillText('\uF0e2',((canvas.height/10)/2)+8,(canvas.height-(canvas.height/10)/2)-8+(canvas.height/10)/2-10);

  //Icono de sonido

  ctx.drawImage(imgsonido1,((canvas.height/10)/2)+8-((canvas.height/10)/2),(canvas.height-(canvas.height/10)/2)-8-(((canvas.height/10)/2)*3)-10,((canvas.height/10)/2)*2,((canvas.height/10)/2)*2);

  if(btsoundclock==true){
    ctx.lineWidth=5;
    ctx.strokeStyle="Red";
    ctx.beginPath();
    ctx.moveTo(((canvas.height/10)/2)+8-((canvas.height/10)/2)-5,(canvas.height-(canvas.height/10)/2)-8-(((canvas.height/10)/2)*3)-10-5);
    ctx.lineTo(((canvas.height/10)/2)+8-((canvas.height/10)/2)+(((canvas.height/10)/2)*2)+5,(canvas.height-(canvas.height/10)/2)-8-(((canvas.height/10)/2)*3)-10-5);
    ctx.lineTo(((canvas.height/10)/2)+8-((canvas.height/10)/2)+(((canvas.height/10)/2)*2)+5,(canvas.height-(canvas.height/10)/2)-8-(((canvas.height/10)/2)*3)-10+(((canvas.height/10)/2)*2)+5);
    ctx.lineTo(((canvas.height/10)/2)+8-((canvas.height/10)/2)-5,(canvas.height-(canvas.height/10)/2)-8-(((canvas.height/10)/2)*3)-10+(((canvas.height/10)/2)*2)+5);
    ctx.closePath();
    ctx.stroke();
  }

  //Ayuda para daltonicos
  if(daltonico==true){
  var size=canvas.height/10;
  ctx.font=size+"px Vibur";
  if(dislexia==true){
    ctx.font=size+"px Comic Sans MS";
  }
  ctx.fillStyle="green";
  var texto;
  if(hora>=15 && hora<21){
    texto="Tarde";
  }
  if(hora>=6 && hora<15){
    texto="Mañana";
  }
  if(hora>=21 && hora<=23){
    texto="Noche";
  }
  if(hora>=0 && hora<6){
    texto="Noche";
  }
  ctx.textAlign="left";
  ctx.fillText(texto,canvas.width/10,canvas.height/10);
  }
  //requestAnimationFrame(dibujarreloj);
}

var canvas = document.getElementById("thecanvas");

//Redibujar también si el viewport cambia de tamaño
window.addEventListener('resize', function(){
  hierba=new Array;
  hierba2=new Array;
  estrella=new Array;
  estrella2=new Array;
  dibujarreloj();
}, true);

var saveX=0;
var saveY=0;
//Conversor de eventos de touch a eventos de raton
  canvas.addEventListener("touchstart", function (e) {
      e.preventDefault();
    var touch = e.touches[0];
    saveX= touch.clientX;
    saveY= touch.clientY;
    var mouseEvent = new MouseEvent("mousedown", {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
  }, false);
  canvas.addEventListener("touchmove", function (e) {
      e.preventDefault();
    var touch = e.touches[0];
    saveX= touch.clientX;
    saveY= touch.clientY;
    var mouseEvent = new MouseEvent("mousemove", {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
  }, false);
  canvas.addEventListener("touchend", function (e) {
      e.preventDefault();
    var mouseEvent = new MouseEvent("mouseup", {
      clientX: saveX,
      clientY: saveY
    });
    canvas.dispatchEvent(mouseEvent);
  }, false);

  //interaccion con el raton(minutos)
  canvas.onmousedown=function(e){
      e.preventDefault();
    if(estado==1 || estado==2){
    var startangle=(6*min)-5;
    var endangle=(6*min)+5;

    var auxhora=hora;
    if(hora>=12){
      auxhora=hora-12;
    }
    var startangle2=30*auxhora+((min/60)*30)-5;
    var endangle2=30*auxhora+((min/60)*30)+5;

    var x=e.x-(window.innerWidth/2);
    var y=(window.innerHeight/2)-e.y;

    var radiopolar=Math.sqrt((x*x)+(y*y));
    angulo=Math.atan2(x,y)*(180/Math.PI); //se tiene que pasar a grados el resultado en radianes de la funcion
    if(angulo<0){
      angulo=angulo+360; //para poner los angulos de 0 a 360 partiendo del eje +y
    }
    if(angulo>startangle && angulo<=endangle && radiopolar<radio){
          flagpulsando=true;
    }
    if(angulo>startangle2 && angulo<=endangle2 && radiopolar<radio){
          flagpulsando2=true;
    }
    //console.log(angulo,startangle,endangle,startangle2,endangle2);
    //Boton de volver
    var xcentro=((canvas.height/10)/2)+8;
    var ycentro=(canvas.height-(canvas.height/10)/2)-8;
    var distancia=Math.sqrt(Math.pow(e.x-xcentro,2)+Math.pow(e.y-ycentro,2));
    if(distancia<(canvas.height/10)/2){
      btvolver=true;
    }
    if(estado==1){
    requestAnimationFrame(dibujarreloj);}
    }
    //Estado del menu principal
    if(estado==0){
      //Boton de volver
      var xcentro=((canvas.height/10)/2)+8;
      var ycentro=(canvas.height-(canvas.height/10)/2)-8;
      var distancia=Math.sqrt(Math.pow(e.x-xcentro,2)+Math.pow(e.y-ycentro,2));
      if(distancia<(canvas.height/10)/2){
        menusimple.currentTime=0;
        btvolver=true;
      }
      if(canvas.width>canvas.height){
      //Botón modo prueba
      if(e.x>(canvas.width/3)+((((canvas.width/3)*2)-(canvas.width/3))/4)
       && e.x<((canvas.width/3)*2)-((((canvas.width/3)*2)-(canvas.width/3))/4)
        && e.y>20+(canvas.height/2.5)
         && e.y<(canvas.height-20)-(canvas.height/2.3)){
        bt1=true;
      }
      //Botón Jugar
      if(e.x>(canvas.width/3)+((((canvas.width/3)*2)-(canvas.width/3))/4)
      && e.x<((canvas.width/3)*2)-((((canvas.width/3)*2)-(canvas.width/3))/4)
        && e.y>20+(canvas.height/1.8)
          && e.y<(canvas.height-20)-(canvas.height/3.6)){
        bt2=true;
      }
      //Botón Maestros
      if(e.x>(canvas.width/3)+((((canvas.width/3)*2)-(canvas.width/3))/4)
      && e.x<((canvas.width/3)*2)-((((canvas.width/3)*2)-(canvas.width/3))/4)
        && e.y>20+(canvas.height/1.4)
          && e.y<(canvas.height-20)-(canvas.height/8)){
        bt3=true;
      }
    }
    if(canvas.width<canvas.height){
    //Botón modo Prueba
    if(e.x>(canvas.width/3.2) && e.x<canvas.width-(canvas.width/3.2)
      && e.y>(canvas.height/2.1) && e.y<canvas.height-(canvas.height/2.2)){
      bt1=true;
    }
    //Botón Juega
    if(e.x>(canvas.width/3.2) && e.x<canvas.width-(canvas.width/3.2)
      && e.y>(canvas.height/1.7) && e.y<canvas.height-(canvas.height/2.9)){
      bt2=true;
    }
    //Botón Maestro
    if(e.x>(canvas.width/3.2) && e.x<canvas.width-(canvas.width/3.2)
      && e.y>(canvas.height/1.43) && e.y<canvas.height-(canvas.height/4.3)){
      bt3=true;
    }

    }
    }
  }
  canvas.onmousemove=function(e){
    e.preventDefault();
    if(estado==1 || estado==2){
    var aux1=x;
    var aux2=y;
    x=e.x-(window.innerWidth/2);
    y=(window.innerHeight/2)-e.y;
    //Para evitar el cambio cuando el movimiento del raton es demasiado corto
    if(x>=0 && aux1<0){
      var lastx=aux1;
      var lasty=aux2;
    }
    if(x<0 && aux1>=0){
      var lastx=aux1;
      var lasty=aux2;
    }

    var radiopolar=Math.sqrt((x*x)+(y*y));
    angulo=Math.atan2(x,y)*(180/Math.PI); //se tiene que pasar a grados el resultado en radianes de la funcion
    if(angulo<0){
      angulo=angulo+360; //para poner los angulos de 0 a 360 partiendo del eje +y
    }

    if(flagpulsando){
      if(estado==2){
        usomin++;
      }
      var comparar=70;
      for(var i=0;i<60;i++){
        if(Math.abs((i*6)-angulo)<Math.abs((comparar*6)-angulo)){
          comparar=i;
        }
      }
      var aux=min;
      min=comparar;
      lastmin=aux;
      //Para una detección lo suficientemente rápida, utilizamos el raton para saber si se pasa por las 12 y se cambia de hora
      if(lastx<0 && lasty>0 && x>=0 && y>0){
        if(hora==23){
          hora=0;
        }
        else{
          hora++;
        }
      }
      if(lastx>=0 && lasty>0 && x<0 && y>0){
        if(hora==0){
          hora=23;
        }
        else{
          hora--;
        }
      }
    }
    if(flagpulsando2 && !flagpulsando){
      if(estado==2){
        usohora++;
      }
      var comparar=70;
      for(var i=0;i<720;i++){
        if(Math.abs((i*0.5)-angulo)<Math.abs((comparar*0.5)-angulo)){
          comparar=i;
        }
      }
      var aux=min;
      min=Math.round(((comparar/60)%1)*60); //operacion despejada de (1hora/60)*X=((comparar/60)%1)
      lastmin=aux;
      if(lastmin<=59 && lastmin>=45 && min>=0 && min<=15){
        if(hora==23){
          hora=0;
        }
        else{
          hora++;
        }
      }
      if(lastmin<=15 && lastmin>=0 && min<=59 && min>=45){
        if(hora==0){
          hora=23;
        }
        else{
          hora--;
        }
      }
    }
    if(estado==1){
    requestAnimationFrame(dibujarreloj);}
    }

  }
  canvas.onmouseup=function(e){
    e.preventDefault();

    //Estado del menu principal
    if(estado==0){
      bt1=false;
      bt2=false;
      bt3=false;
      //Boton de volver
      var xcentro=((canvas.height/10)/2)+8;
      var ycentro=(canvas.height-(canvas.height/10)/2)-8;
      var distancia=Math.sqrt(Math.pow(e.x-xcentro,2)+Math.pow(e.y-ycentro,2));
      if(distancia<(canvas.height/10)/2){
        menusimple.play();
        window.location.href = 'menu.html';
      }
      if(canvas.width>canvas.height){
      //Botón modo prueba
      if(e.x>(canvas.width/3)+((((canvas.width/3)*2)-(canvas.width/3))/4)
       && e.x<((canvas.width/3)*2)-((((canvas.width/3)*2)-(canvas.width/3))/4)
        && e.y>20+(canvas.height/2.5)
         && e.y<(canvas.height-20)-(canvas.height/2.3)){
              togglemenu.play();
              //Comprobación modo de reloj
              if (localStorage.getItem("Mudo") === null) {
                localStorage.setItem("Mudo", "false");
              }
              var aux = localStorage.getItem("Mudo");
             if(aux=="false"){
               modo=1;
             }
             if(aux=="true"){
               modo=0;
             }
             estado=1;
             cancelAnimationFrame(loop);
             requestAnimationFrame(dibujarreloj);
      }
      //Botón Jugar
      if(e.x>(canvas.width/3)+((((canvas.width/3)*2)-(canvas.width/3))/4)
      && e.x<((canvas.width/3)*2)-((((canvas.width/3)*2)-(canvas.width/3))/4)
        && e.y>20+(canvas.height/1.8)
          && e.y<(canvas.height-20)-(canvas.height/3.6)){
            jugar.play();
             //Comprobación modo de reloj
             if (localStorage.getItem("Mudo") === null) {
               localStorage.setItem("Mudo", "false");
             }
             var aux = localStorage.getItem("Mudo");
            if(aux=="false"){
              modo=1;
            }
            if(aux=="true"){
              modo=0;
            }
            estado=2;
            cancelAnimationFrame(loop);
            requestAnimationFrame(dibujarjuego);
      }
      //Botón Maestros
      if(e.x>(canvas.width/3)+((((canvas.width/3)*2)-(canvas.width/3))/4)
      && e.x<((canvas.width/3)*2)-((((canvas.width/3)*2)-(canvas.width/3))/4)
        && e.y>20+(canvas.height/1.4)
          && e.y<(canvas.height-20)-(canvas.height/8)){
            menusimple.play();
            window.location.href = 'teacher.html';
      }
      //Botones sonidos
        //Sonido de Prueba
        if(e.x>((canvas.width/3)*2)-((((canvas.width/3)*2)-(canvas.width/3))/4)+15-5
          && e.x<((canvas.width/3)*2)-((((canvas.width/3)*2)-(canvas.width/3))/4)+15+(canvas.width/18)+5
        && e.y>20+(canvas.height/2.5)-5
          && e.y<20+(canvas.height/2.5)+(canvas.width/18)+5){
            botonprobar.play();
          }
        //Sonido de Juego
        if(e.x>((canvas.width/3)*2)-((((canvas.width/3)*2)-(canvas.width/3))/4)+15-5
         && e.x<((canvas.width/3)*2)-((((canvas.width/3)*2)-(canvas.width/3))/4)+15+(canvas.width/18)+5
         && e.y>20+(canvas.height/1.8)-5
           && e.y<20+(canvas.height/1.8)+(canvas.width/18)+5){
             botonjuega.play();
           }
       //Sonido de Maestro
       if(e.x>((canvas.width/3)*2)-((((canvas.width/3)*2)-(canvas.width/3))/4)+15-5
        && e.x<((canvas.width/3)*2)-((((canvas.width/3)*2)-(canvas.width/3))/4)+15+(canvas.width/18)+5
        && e.y>20+(canvas.height/1.4)-5
          && e.y<20+(canvas.height/1.4)+(canvas.width/18)+5){
            botonmaestro.play();
          }

      }
      if(canvas.width<canvas.height){
      //Botón modo Prueba
      if(e.x>(canvas.width/3.2) && e.x<canvas.width-(canvas.width/3.2)
      && e.y>(canvas.height/2.1) && e.y<canvas.height-(canvas.height/2.2)){
          togglemenu.play();
         //Comprobación modo de reloj
         if (localStorage.getItem("Mudo") === null) {
           localStorage.setItem("Mudo", "false");
         }
         var aux = localStorage.getItem("Mudo");
        if(aux=="false"){
          modo=1;
        }
        if(aux=="true"){
          modo=0;
        }
        estado=1;
        cancelAnimationFrame(loop);
        requestAnimationFrame(dibujarreloj);
      }
      //Botón Juega
      if(e.x>(canvas.width/3.2) && e.x<canvas.width-(canvas.width/3.2)
      && e.y>(canvas.height/1.7) && e.y<canvas.height-(canvas.height/2.9)){
        jugar.play()
         //Comprobación modo de reloj
         if (localStorage.getItem("Mudo") === null) {
           localStorage.setItem("Mudo", "false");
         }
         var aux = localStorage.getItem("Mudo");
        if(aux=="false"){
          modo=1;
        }
        if(aux=="true"){
          modo=0;
        }
        estado=2;
        cancelAnimationFrame(loop);
        requestAnimationFrame(dibujarjuego);
      }
      //Botón Maestro
      if(e.x>(canvas.width/3.2) && e.x<canvas.width-(canvas.width/3.2)
      && e.y>(canvas.height/1.43) && e.y<canvas.height-(canvas.height/4.3)){
        menusimple.play();
        window.location.href = 'teacher.html';
      }
      //Botones de Sonido
      //Sonido de Prueba
      if(e.x>canvas.width-(canvas.width/3.2)+15-5
        && e.x<canvas.width-(canvas.width/3.2)+15+(canvas.width/9)+5
      && e.y>(canvas.height/2.1)-5
        && e.y<(canvas.height/2.1)+(canvas.width/9)+5){
          botonprobar.play();
      }
      //Sonido de Juego
      if(e.x>canvas.width-(canvas.width/3.2)+15-5
        && e.x<canvas.width-(canvas.width/3.2)+15+(canvas.width/9)+5
      && e.y>(canvas.height/1.7)-5
        && e.y<(canvas.height/1.7)+(canvas.width/9)+5){
          botonjuega.play();
      }
      //Sonido de Maestro
      if(e.x>canvas.width-(canvas.width/3.2)+15-5
        && e.x<canvas.width-(canvas.width/3.2)+15+(canvas.width/9)+5
      && e.y>(canvas.height/1.43)-5
        && e.y<(canvas.height/1.43)+(canvas.width/9)+5){
          botonmaestro.play();
      }

      }
    }
    //Estado de Prueba y Juega
    if(estado==1 || estado==2){
    btvolver=false;
    flagpulsando=false;
    flagpulsando2=false;
    //Boton de volver
    var xcentro=((canvas.height/10)/2)+8;
    var ycentro=(canvas.height-(canvas.height/10)/2)-8;
    var distancia=Math.sqrt(Math.pow(e.x-xcentro,2)+Math.pow(e.y-ycentro,2));
    if(distancia<(canvas.height/10)/2){
      menusimple.play();
      estado=0;
      stopclock();
      stopclockwin();
      enpregunta=false;
      cancelAnimationFrame(loopjugar);
      requestAnimationFrame(dibujarmenu);
    }
    //Sonidos de ayuda
    if(e.x>((canvas.height/10)/2)+8-((canvas.height/10)/2)-5
    && e.x<((canvas.height/10)/2)+8-((canvas.height/10)/2)+(((canvas.height/10)/2)*2)+5
    && e.y>(canvas.height-(canvas.height/10)/2)-8-(((canvas.height/10)/2)*3)-10-5
    && e.y<(canvas.height-(canvas.height/10)/2)-8-(((canvas.height/10)/2)*3)-10+(((canvas.height/10)/2)*2)+5){
    if(estado==1){
      explainprueba.play();
    }
    if(estado==2){
      explainjuega.play();
    }
  }
    if(estado==1){
    requestAnimationFrame(dibujarreloj);}
    }
  }

  document.onkeydown=function(e){

    if(estado==0){
      if (e.keyCode == '37') {
         // left arrow
         if(posicionx-1>=0){
           posicionx--;
         }
      }
      else if (e.keyCode == '39') {
         // right arrow
         if(posicionx+1<=1){
           posicionx++;
         }
      }
      else if (e.keyCode == '38') {
         // up arrow
         if(posiciony-1>=0){
           posiciony--;
         }
      }
      else if (e.keyCode == '40') {
         // down arrow
         if(posiciony+1<=2){
           posiciony++;
         }
      }

      else if (e.keyCode == '9') {
        if(posicion==1){
          posicion=2;
        }
        else if(posicion==0){
          posicion=1;
        }
        else if(posicion==2){
          posicion=1;
        }
      }
      else if (e.keyCode == '13') {
        if(matrizteclas[posiciony][posicionx]==0){
             posicionx=0;
             posiciony=0;
             togglemenu.play();
            //Comprobación modo de reloj
            if (localStorage.getItem("Mudo") === null) {
              localStorage.setItem("Mudo", "false");
            }
              var aux = localStorage.getItem("Mudo");
           if(aux=="false"){
             modo=1;
           }
           if(aux=="true"){
             modo=0;
           }
           estado=1;
           cancelAnimationFrame(loop);
           requestAnimationFrame(dibujarreloj);
        }
        if(matrizteclas[posiciony][posicionx]==2){
          posicionx=0;
          posiciony=0;
          jugar.play()
           //Comprobación modo de reloj
           if (localStorage.getItem("Mudo") === null) {
             localStorage.setItem("Mudo", "false");
           }
           var aux = localStorage.getItem("Mudo");
          if(aux=="false"){
            modo=1;
          }
          if(aux=="true"){
            modo=0;
          }
          estado=2;
          cancelAnimationFrame(loop);
          requestAnimationFrame(dibujarjuego);
        }
        if(matrizteclas[posiciony][posicionx]==4){
          posicionx=0;
          posiciony=0;
          menusimple.play();
          window.location.href = 'teacher.html';
        }
        if(matrizteclas[posiciony][posicionx]==1){
          botonprobar.play();
        }
        if(matrizteclas[posiciony][posicionx]==3){
          botonjuega.play();
        }
        if(matrizteclas[posiciony][posicionx]==5){
          botonmaestro.play();
        }
      }

      if(matrizteclas[posiciony][posicionx]==0){
        bt1=true;
        bt2=false;
        bt3=false;
        btsound1=false;
        btsound2=false;
        btsound3=false;
      }
      if(matrizteclas[posiciony][posicionx]==2){
        bt1=false;
        bt2=true;
        bt3=false;
        btsound1=false;
        btsound2=false;
        btsound3=false;
      }
      if(matrizteclas[posiciony][posicionx]==4){
        bt1=false;
        bt2=false;
        bt3=true;
        btsound1=false;
        btsound2=false;
        btsound3=false;
      }
      if(matrizteclas[posiciony][posicionx]==1){
        bt1=false;
        bt2=false;
        bt3=false;
        btsound1=true;
        btsound2=false;
        btsound3=false;
      }
      if(matrizteclas[posiciony][posicionx]==3){
        bt1=false;
        bt2=false;
        bt3=false;
        btsound1=false;
        btsound2=true;
        btsound3=false;
      }
      if(matrizteclas[posiciony][posicionx]==5){
        bt1=false;
        bt2=false;
        bt3=false;
        btsound1=false;
        btsound2=false;
        btsound3=true;
      }
    }
    if(estado==1 || estado==2){
      if (e.keyCode == '37') {
         // left arrow
         if(posiciony==0){
           if(min==0){
             min=59;
             hora--;
           }
           else{
             min--;
           }
         }
         if(posiciony==1){
           if(hora==0){
             hora=23;
           }
           else{
             hora--;
           }
         }
      }
      else if (e.keyCode == '39') {
         // right arrow
         if(posiciony==0){
           if(min==59){
             min=0;
             hora++;
           }
           else{
             min++;
           }
         }
         if(posiciony==1){
           if(hora==23){
             hora=0;
           }
           else{
             hora++;
           }
         }
      }
      else if (e.keyCode == '38') {
         // up arrow
         if(posiciony-1>=0){
           posiciony--;
         }
      }
      else if (e.keyCode == '40') {
         // down arrow
         if(posiciony+1<=3){
           posiciony++;
         }
      }
      if(posiciony==0){
        marcadamin=true;
        marcadah=false;
        btsoundclock=false;
        btvolver=false;
        if(estado==1){
        requestAnimationFrame(dibujarreloj);}
      }
      if(posiciony==1){
        marcadamin=false;
        marcadah=true;
        btsoundclock=false;
        btvolver=false;
        if(estado==1){
        requestAnimationFrame(dibujarreloj);}
      }
      if(posiciony==2){
        marcadamin=false;
        marcadah=false;
        btsoundclock=true;
        btvolver=false;
        if(estado==1){
        requestAnimationFrame(dibujarreloj);}
      }
      if(posiciony==3){
        marcadamin=false;
        marcadah=false;
        btsoundclock=false;
        btvolver=true;
        if(estado==1){
        requestAnimationFrame(dibujarreloj);}
      }

     if (e.keyCode == '13'){
        if(posiciony==2){
          if(estado==1){
            explainprueba.play();
          }
          if(estado==2){
            explainjuega.play();
          }
        }
        if(posiciony==3){
          menusimple.play();
          estado=0;
          btvolver=false;
          posiciony=0;
          stopclock();
          stopclockwin();
          enpregunta=false;
          cancelAnimationFrame(loopjugar);
          requestAnimationFrame(dibujarmenu);
        }
      }

    }

  }

//Interpolacion inadecuada entre colores de cielo en RGB
/*else{
  var t=(min-0)/(60-0);
  var rgb1=colores[hora][0].color;
  rgb1=rgb1.replace(/[^\d,]/g, '').split(',');
  var siguiente=0;
  if(hora<23){
    siguiente=hora+1;
  }
  if(hora==23){
    siguiente=0;
  }
  var rgb2=colores[siguiente][0].color;
  rgb2=rgb2.replace(/[^\d,]/g, '').split(',');

  var r1= Math.floor((rgb2[0]-rgb1[0]) * t + rgb1[0]);
  var g1=  Math.floor((rgb2[1]-rgb1[1]) * t + rgb1[1]);
  var b1=  Math.floor((rgb2[2]-rgb1[2]) * t + rgb1[2]);

  var primercolor= "rgb("+r1+","+g1+","+b1+")";

  var rgb3=colores[hora][1].color;
  rgb3=rgb3.replace(/[^\d,]/g, '').split(',');
  siguiente=0;
  if(hora<23){
    siguiente=hora+1;
  }
  if(hora==23){
    siguiente=0;
  }
  var rgb4=colores[siguiente][1].color;
  rgb4=rgb4.replace(/[^\d,]/g, '').split(',');

  var r2=  Math.floor((rgb4[0]-rgb3[0]) * t + rgb3[0]);
  var g2=  Math.floor((rgb4[1]-rgb3[1]) * t + rgb3[1]);
  var b2=  Math.floor((rgb4[2]-rgb3[2]) * t + rgb3[2]);

  var segundocolor= "rgb("+r2+","+g2+","+b2+")";

  console.log(primercolor,segundocolor,t);

  var grd = ctx.createLinearGradient(0, 0, 0, canvas.height);
  grd.addColorStop(colores[hora][0].position, primercolor); //#f5f3ce
  grd.addColorStop(colores[hora][1].position, segundocolor);

  ctx.beginPath();
  ctx.fillStyle=grd;
  ctx.fillRect(0,0,canvas.width,canvas.height);
}*/
