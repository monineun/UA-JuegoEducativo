window.onload=preparar;



function preparar(){

  //Generación de datos locales si no se ha hecho

  if (localStorage.getItem("Ayuda") === null) {
    localStorage.setItem("Ayuda", "0");
   }

   if (localStorage.getItem("Reintento") === null) {
     localStorage.setItem("Reintento", "0");
    }

    if (localStorage.getItem("Borra") === null) {
      localStorage.setItem("Borra", "0");
     }

     if (localStorage.getItem("Acierto") === null) {
       localStorage.setItem("Acierto", "0");
      }

      if (localStorage.getItem("Dislexia") === null) {
        localStorage.setItem("Dislexia", "false");
      }

  //Archivos de audio para efectos de sonido
  var togglemenu = new Audio('toggle.mp3');
  var jugar = new Audio('jugar.ogg');
  var menusimple = new Audio('menusimple.wav');
  var goodnight = new Audio('konbanwa.mp3');
  var correct = new Audio('correct.wav');

  //Eventos de botones
  document.getElementById("volver").addEventListener("click", function(){
     //menusimple.play();
     window.location.href='menupoints.html'
  });

  document.getElementById("borrar").addEventListener("click", function(){
      goodnight.play();
  });
  goodnight.addEventListener("ended", function(){
     goodnight.currentTime = 0;
     localStorage.clear();
     window.location.href='maestro.html'
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


  //Creación dinámica de la tabla de datos
  var body = document.getElementsByTagName("body")[0];
  var tabla   = document.createElement("table");
  var tblBody = document.createElement("tbody");
  var antes = document.getElementById("borrar");


    var hilera = document.createElement("tr");
      var celda = document.createElement("td");
      var textoCelda = document.createTextNode("Número de veces que se usa ayuda");
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
      celda = document.createElement("td");
      var aux= parseFloat(localStorage.getItem("Ayuda")).toFixed(3);
      aux=aux.toString();
      textoCelda = document.createTextNode(aux);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
    tblBody.appendChild(hilera);

      hilera = document.createElement("tr");
      celda = document.createElement("td");
      textoCelda = document.createTextNode("Número de fallos");
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
      celda = document.createElement("td");
      var aux= parseFloat(localStorage.getItem("Reintento")).toFixed(3);
      aux=aux.toString();
      textoCelda = document.createTextNode(aux);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
    tblBody.appendChild(hilera);

    hilera = document.createElement("tr");
    celda = document.createElement("td");
    textoCelda = document.createTextNode("Número de borrados");
    celda.appendChild(textoCelda);
    hilera.appendChild(celda);
    celda = document.createElement("td");
    var aux= parseFloat(localStorage.getItem("Borra")).toFixed(3);
    aux=aux.toString();
    textoCelda = document.createTextNode(aux);
    celda.appendChild(textoCelda);
    hilera.appendChild(celda);
  tblBody.appendChild(hilera);

  hilera = document.createElement("tr");
  celda = document.createElement("td");
  textoCelda = document.createTextNode("Número de aciertos");
  celda.appendChild(textoCelda);
  hilera.appendChild(celda);
  celda = document.createElement("td");
  var aux= parseFloat(localStorage.getItem("Acierto")).toFixed(3);
  aux=aux.toString();
  textoCelda = document.createTextNode(aux);
  celda.appendChild(textoCelda);
  hilera.appendChild(celda);
tblBody.appendChild(hilera);


    tabla.appendChild(tblBody);
    body.insertBefore(tabla,borrar);
    tabla.setAttribute("border", "2");
}
