window.onload=preparar;

function preparar(){

  //Generación de datos locales si no se ha hecho

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
  if (localStorage.getItem("Dislexia") === null) {
    localStorage.setItem("Dislexia", "false");
  }
  if (localStorage.getItem("Daltonico") === null) {
    localStorage.setItem("Daltonico", "false");
  }

  //Archivos de audio para efectos de sonido
  var togglemenu = new Audio('toggle.mp3');
  var jugar = new Audio('jugar.ogg');
  var menusimple = new Audio('menusimple.wav');
  var goodnight = new Audio('konbanwa.mp3');
  var correct = new Audio('correct.wav');

  //Eventos de botones
  document.getElementById("volver").addEventListener("click", function(){
     menusimple.play();
     window.location.href='clock.html'
  });
  var comparar=localStorage.getItem("Mudo");
  if(comparar=="false"){
    document.getElementById("mudo").checked = false;
  }
  if(comparar=="true"){
    document.getElementById("mudo").checked = true;
  }
  document.getElementById("mudo").addEventListener("change", function(){
      var comparar2=localStorage.getItem("Mudo");
      if(comparar2=="false"){
        localStorage.setItem("Mudo", "true");
      }
      if(comparar2=="true"){
        localStorage.setItem("Mudo", "false");
      }
  });
  var comparar=localStorage.getItem("Dislexia");
  if(comparar=="false"){
    document.getElementById("dislexia").checked = false;
  }
  if(comparar=="true"){
    document.getElementById("dislexia").checked = true;
  }
  document.getElementById("dislexia").addEventListener("change", function(){
      var comparar2=localStorage.getItem("Dislexia");
      if(comparar2=="false"){
        localStorage.setItem("Dislexia", "true");
      }
      if(comparar2=="true"){
        localStorage.setItem("Dislexia", "false");
      }
  });
  var comparar=localStorage.getItem("Daltonico");
  if(comparar=="false"){
    document.getElementById("daltonico").checked = false;
  }
  if(comparar=="true"){
    document.getElementById("daltonico").checked = true;
  }
  document.getElementById("daltonico").addEventListener("change", function(){
      var comparar2=localStorage.getItem("Daltonico");
      if(comparar2=="false"){
        localStorage.setItem("Daltonico", "true");
      }
      if(comparar2=="true"){
        localStorage.setItem("Daltonico", "false");
      }
  });
  //Peligro
  document.getElementById("borrar").addEventListener("click", function(){
      goodnight.play();
  });
  goodnight.addEventListener("ended", function(){
     goodnight.currentTime = 0;
     localStorage.clear();
     window.location.href='teacher.html'
});

  //Creación dinámica de la tabla de datos
  var randommin=["en punto","y cinco","y diez","y cuarto","y veinte","y veinticinco","y media"
  ,"menos veinticinco","menos veinte","menos cuarto","menos diez","menos cinco"];
  var randomsky=["de la noche","de la mañana","de la tarde"];

  var body = document.getElementsByTagName("body")[0];
  var tabla   = document.createElement("table");
  var tblBody = document.createElement("tbody");
  var antes = document.getElementById("borrar");


    var hilera = document.createElement("tr");
      var celda = document.createElement("td");
      var textoCelda = document.createTextNode("Tiempo medio en responder");
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
      celda = document.createElement("td");
      var aux= parseFloat(localStorage.getItem("MeanAnswers")).toFixed(3);
      aux=aux.toString();
      textoCelda = document.createTextNode(aux);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
    tblBody.appendChild(hilera);

    hilera = document.createElement("tr");
    celda = document.createElement("td");
    textoCelda = document.createTextNode("Sección de los minutos que más tarda en responder");
    celda.appendChild(textoCelda);
    hilera.appendChild(celda);
    var jsonmin=JSON.parse(localStorage.getItem("Minutos"));
    var max=0;
    var max2=0;
    for(var i=0;i<jsonmin.length;i++){
      if(Number(jsonmin[i])>max){
        max=Number(jsonmin[i]);
        max2=i;
      }
    }
    celda = document.createElement("td");
    textoCelda = document.createTextNode(randommin[max2]);
    celda.appendChild(textoCelda);
    hilera.appendChild(celda);
    tblBody.appendChild(hilera);

    hilera = document.createElement("tr");
    celda = document.createElement("td");
    textoCelda = document.createTextNode("Sección del día más problemática");
    celda.appendChild(textoCelda);
    hilera.appendChild(celda);
    var jsonmin=JSON.parse(localStorage.getItem("Dia"));
    var max=0;
    var max2=0;
    for(var i=0;i<jsonmin.length;i++){
      if(Number(jsonmin[i])>max){
        max=Number(jsonmin[i]);
        max2=i;
      }
    }
    celda = document.createElement("td");
    textoCelda = document.createTextNode(randomsky[max2].substr(randomsky[max2].indexOf(' ')));
    celda.appendChild(textoCelda);
    hilera.appendChild(celda);
    tblBody.appendChild(hilera);

    var hilera = document.createElement("tr");
      var celda = document.createElement("td");
      var textoCelda = document.createTextNode("Aguja más utilizada");
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
      celda = document.createElement("td");
      var aux= parseFloat(localStorage.getItem("Usomin"));
      var aux2= parseFloat(localStorage.getItem("Usohora"));
      var max;
      if(aux>aux2){
        max="minutos";
      }
      if(aux<aux2){
        max="horas";
      }
      if(Math.abs(aux-aux2)<10){
        max="equilibrado";
      }
      textoCelda = document.createTextNode(max);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
    tblBody.appendChild(hilera);

    tabla.appendChild(tblBody);
    body.insertBefore(tabla,borrar);
    tabla.setAttribute("border", "2");
}
