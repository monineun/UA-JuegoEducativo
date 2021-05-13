
var boton1 = document.getElementById('bt1');
boton1.onclick = function() {
       window.location.href = "clock.html";
};
var boton2 = document.getElementById('bt2');
boton2.onclick = function() {
       window.location.href = "menupoints.html";
};
var posicion=0;
boton1.onmouseover= function(){
  boton2.style.backgroundColor="LimeGreen";
  posicion=1;
}
boton1.onmouseleave= function(){
  posicion=0;
}
boton2.onmouseover= function(){
  boton1.style.backgroundColor="Red";
  posicion=2;
}
boton2.onmouseleave= function(){
  posicion=0;
}
document.onkeydown=function(e){
    if (e.keyCode == '37') {
       // left arrow
       if(posicion==0){
         posicion=1;
         boton1.style.backgroundColor="DarkRed";
         boton2.style.backgroundColor="LimeGreen";
       }
       if(posicion==2){
         posicion=1;
         boton1.style.backgroundColor="DarkRed";
         boton2.style.backgroundColor="LimeGreen";
       }
    }
    else if (e.keyCode == '39') {
       // right arrow
       if(posicion==0){
         posicion=2;
         boton2.style.backgroundColor="DarkGreen";
         boton1.style.backgroundColor="Red";
       }
       if(posicion==1){
         posicion=2;
         boton2.style.backgroundColor="DarkGreen";
         boton1.style.backgroundColor="Red";
       }
    }
    else if (e.keyCode == '9') {

      if(posicion==1){
        posicion=2;
        boton2.style.backgroundColor="DarkGreen";
        boton1.style.backgroundColor="Red";
      }
      else if(posicion==0){
        posicion=1;
        boton1.style.backgroundColor="DarkRed";
        boton2.style.backgroundColor="LimeGreen";
      }
      else if(posicion==2){
        posicion=1;
        boton1.style.backgroundColor="DarkRed";
        boton2.style.backgroundColor="LimeGreen";
      }
    }
    else if (e.keyCode == '13') {
      if(posicion==1){
         window.location.href = "clock.html";
      }
      if(posicion==2){
         window.location.href = "menupoints.html";
      }
    }
}
