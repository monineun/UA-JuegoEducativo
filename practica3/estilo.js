var movimientos = new Array();
var pulsado;
var mision = -1;

var marcada = false;

//Tamaño del canvas
var width = 585;
var height = 450;

//Tamaño de la cuadricula
var cwidth = 45;
var cheight = 45;

var x, y;

var currentx = 0, currenty = 0;

var primero = true;

var poligono = ['triángulo', 'rectángulo', 'cuadrado', 'pentágono'];
var opcion;
var lados;
var pinturatotal;
var pinturausada;

var ronda = 1;

//Archivos de audio para efectos de sonido
var togglemenu = new Audio('toggle.mp3');
var jugar = new Audio('jugar.ogg');
var menusimple = new Audio('menusimple.wav');
var goodnight = new Audio('konbanwa.mp3');
var correct = new Audio('correct.wav');
var inst = new Audio('inspo.mpeg');

function crearLienzo() {
	//jugar.play();
	var canvasDiv = document.getElementById('lienzo');
	canvas = document.createElement('canvas');
	canvas.setAttribute('width', width);
	canvas.setAttribute('height', height);
	canvas.setAttribute('id', 'canvas');
	canvasDiv.appendChild(canvas);
	if(typeof G_vmlCanvasManager != 'undefined') {
			canvas = G_vmlCanvasManager.initElement(canvas);
	}
	context = canvas.getContext("2d");

	var dsl = localStorage.getItem("Dislexia");
	if(dsl=='true'){
			$('*').css("font-family", "Comic Sans MS");
	}else{
			$('*').css("font-family", "Vibur");
	}



	comenzarjuego(0);


			//Al pulsar el raton
			$('#canvas').mousedown(function(e){
				if(pinturatotal>0){
					if(primero){
						pulsado = true;
						primero = false;
						x = e.pageX - this.offsetLeft;
						y = e.pageY - this.offsetTop;
						rectificard(x, y);
					}else{
						pulsado = true;
						x = e.pageX - this.offsetLeft;
						y = e.pageY - this.offsetTop;
						repinta(x,y);
					}
				}
				});

			//Al soltar el raton
			$('#canvas').mouseup(function(e){
				if(pinturatotal>0){
				canvas.width = canvas.width;
				pintacuadros();

				x = e.pageX - this.offsetLeft;
				y = e.pageY - this.offsetTop;

				if(!mismo(x, y) && !evitarinterseccion(x,y)){
					rectificaru(x, y);
					pinturatotal--;
					document.getElementById("opc").innerHTML = "Dibuja un <strong>" + poligono[opcion] + "</strong>.";
					if(pinturatotal==1) document.getElementById("num").innerHTML = "Falta <strong>" + pinturatotal + "</strong> lado";
					else document.getElementById("num").innerHTML = "Faltan <strong>" + pinturatotal + "</strong> lados";
				}

				pulsado = false;
				if(movimientos.length>0){
					pintarecta();
					pintapuntos();
					var por = pinturatotal/lados*100;
					document.getElementsByTagName("progress")[0].setAttribute("value", por);
					comprobar();
				}
				}
			});

			//Al mover el raton (pulsado)
			$('#canvas').mousemove(function(e){
          if(pulsado){
						x = e.pageX - this.offsetLeft;
						y = e.pageY - this.offsetTop;
            repinta(x,y);
          }
        });

			$('#canvas').mouseleave(function(e){
				pulsado = false;
			});

}
function evitarinterseccion(x, y){

		var long = movimientos.length;
		var cp = long - 2;
		var cortes = 0;

		if(long>2){
			var x1, x2, x3, x4, y1, y2, y3, y4;
			var px, py;
			var _1x, _1y, _2x, _2y;
			var r = x%cwidth;
			if(r<cwidth/2) x = x-r;
			else x = x+cwidth-r;

			r = y%cheight;
			if(r<cheight/2) y = y-r;
			else y = y+cheight-r;

			x1 = x; y1 = y;
			x2 = movimientos[long-1][0]; y2 = movimientos[long-1][1];

			for(var i=0; i <cp; i++){
				x3 = movimientos[0+i][0]; y3 = movimientos[0+i][1];
				x4 = movimientos[1+i][0]; y4 = movimientos[1+i][1];
				px = ( (((x1*y2) - (y1*x2))*(x3-x4)) - ((x1-x2)*((x3*y4) - (y3*x4)))) / (((x1-x2)*(y3-y4)) - ((y1-y2) * (x3-x4)));
				py = ( (((x1*y2) - (y1*x2))*(y3-y4)) - ((y1-y2)*((x3*y4) - (y3*x4)))) / (((x1-x2)*(y3-y4)) - ((y1-y2) * (x3-x4)));

				var dr = Math.sqrt(Math.pow((x1-x2) ,2) + Math.pow((y1-y2) ,2));
				var di = Math.sqrt(Math.pow((px-x2) ,2) + Math.pow((py-y2) ,2));

				if(dr>=di){
					if(x==movimientos[0][0] && y==movimientos[0][1]){}
					else{
						//comprobaremos si la distancia es en la misma direccion
						var s1, s2, s3, s4;

						if(x2-px > 0 ) s1 = true;
						else s1 = false;
						if(y2-py > 0 ) s2 = true;
						else s2 = false;

						if(x2-x1 > 0 ) s3 = true;
						else s3 = false;
						if(y2-y1 > 0 ) s4 = true;
						else s4 = false;

						if(s1==s3 && s2==s4) cortes++;

						}

					}

				}

			if(cortes>0){
				return true;
			}
			else{
				return false;
			}

		}
}

function mismo(x, y){

	var long = movimientos.length;

	var r = x%cwidth;
	if(r<cwidth/2) x = x-r;
	else x = x+cwidth-r;

	r = y%cheight;
	if(r<cheight/2) y = y-r;
	else y = y+cheight-r;

	if(long>1){

	if((movimientos[long-1][0]==x && movimientos[long-1][1]==y) || (movimientos[long-2][0]==x && movimientos[long-2][1]==y)){
		return true;
	} else return false;
	}else{
	if(movimientos[0][0]==x && movimientos[0][1]==y) {
		movimientos = new Array();
		primero = true;
		return true;
	}
	else return false;
}
}

function comprobar(){

	var long = movimientos.length;

	if(long>=3 && (movimientos[0][0]==movimientos[long-1][0]) && (movimientos[0][1]==movimientos[long-1][1])){
			canvas.width = canvas.width;
			pintacuadros();
			context.fillStyle="#1348c1";
			context.strokeStyle="#1348c1";
			context.lineWidth=6;
			context.beginPath();
			context.moveTo(movimientos[0][0], movimientos[0][1]);
			for(var i=0; i < movimientos.length-1; i++){
					context.lineTo(movimientos[i+1][0], movimientos[i+1][1]);
			}
			context.closePath();
			context.fill();
			context.stroke();

			//Tenemos la figura cerrada y comprobamos que es la que se nos pedia
			if(pinturatotal==0){
				switch (opcion) {
					case 0:
						//location.href= "#openModal1";
						context.font="80px Comic Sans MS";
				    context.textAlign = "center";
						context.fillStyle="red";
						context.strokeStyle="black";
				    context.lineWidth=2;
						context.fillText("¡Correcto!", 585/2,(450/2)-30);
				    context.strokeText("¡Correcto!", 585/2,(450/2)-30);
						correct.play();
						setTimeout(sig, 2000);
						break;
					case 1:
						if(comprobarangulos() && !comprobarlados()){
							context.font="80px Comic Sans MS";
					    context.textAlign = "center";
							context.fillStyle="red";
							context.strokeStyle="black";
					    context.lineWidth=2;
							context.fillText("¡Correcto!", 585/2,(450/2)-30);
					    context.strokeText("¡Correcto!", 585/2,(450/2)-30);
							correct.play();
							setTimeout(sig, 2000);
							}else{
								context.font="50px Comic Sans MS";
						    context.textAlign = "center";
						    context.fillStyle="red";
						    context.strokeStyle="black";
						    context.lineWidth=2;
								context.fillText("¡Vuelve a intentarlo!", 585/2,(450/2)-30);
						    context.strokeText("¡Vuelve a intentarlo!", 585/2,(450/2)-30);
								setTimeout(ret, 2000);
							}
						break;
					case 2:
						if(comprobarangulos() && comprobarlados()){
							context.font="80px Comic Sans MS";
					    context.textAlign = "center";
							context.fillStyle="red";
							context.strokeStyle="black";
					    context.lineWidth=2;
							context.fillText("¡Correcto!", 585/2,(450/2)-30);
					    context.strokeText("¡Correcto!", 585/2,(450/2)-30);
							correct.play();
							setTimeout(sig, 2000);
						}else{
							context.font="50px Comic Sans MS";
							context.textAlign = "center";
							context.fillStyle="red";
							context.strokeStyle="black";
							context.lineWidth=2;
							context.fillText("¡Vuelve a intentarlo!", 585/2,(450/2)-30);
							context.strokeText("¡Vuelve a intentarlo!", 585/2,(450/2)-30);
							setTimeout(ret, 2000);
						}
						break;
					case 3:
					context.font="80px Comic Sans MS";
					context.textAlign = "center";
					context.fillStyle="red";
					context.strokeStyle="black";
					context.lineWidth=2;
					context.fillText("¡Correcto!", 585/2,(450/2)-30);
					context.strokeText("¡Correcto!", 585/2,(450/2)-30);
					correct.play();
					setTimeout(sig, 2000);
						break;
				}

			} else{
				context.font="50px Comic Sans MS";
				context.textAlign = "center";
				context.fillStyle="red";
				context.strokeStyle="black";
				context.lineWidth=2;
				context.fillText("¡Vuelve a intentarlo!", 585/2,(450/2)-30);
				context.strokeText("¡Vuelve a intentarlo!", 585/2,(450/2)-30);
				setTimeout(ret, 2000);
			}
}else{
	if(pinturatotal==0){
		context.font="50px Comic Sans MS";
		context.textAlign = "center";
		context.fillStyle="red";
		context.strokeStyle="black";
		context.lineWidth=2;
		context.fillText("¡Vuelve a intentarlo!", 585/2,(450/2)-30);
		context.strokeText("¡Vuelve a intentarlo!", 585/2,(450/2)-30);
		setTimeout(ret, 2000);
	}
}

}

function comprobarlados(){
	var ret = false;
	var x1, x2, y1, y2, x3, y3, d1, d2;
			x1 = movimientos[0][0]; y1 = movimientos[0][1];
			x2 = movimientos[1][0]; y2 = movimientos[1][1];
			x3 = movimientos[2][0]; y3 = movimientos[2][1];

			d1 = Math.sqrt(Math.pow((x1-x2) ,2) + Math.pow((y1-y2) ,2));
			d2 = Math.sqrt(Math.pow((x2-x3) ,2) + Math.pow((y2-y3) ,2));

			if(d1 == d2) ret=true;
			else ret=false;

			return ret;
}

function comprobarangulos(){
	var cont = 0;
	var ret = false;
	var x1, x2, y1, y2, x3, x4, y3, y4, dx1, dy1, dx2, dy2, m1, m2;
			x1 = movimientos[0][0]; y1 = movimientos[0][1];
			x2 = movimientos[1][0]; y2 = movimientos[1][1];
			dx1 = x1 - x2; dy1 = y1 - y2;

			x3 = movimientos[3][0]; y3 = movimientos[3][1];
			x4 = movimientos[2][0]; y4 = movimientos[2][1];
			dx2 = x3 - x4; dy2 = y3 - y4;

			if(dx1 == dx2 && dy1 === dy2) cont++;


			x1 = movimientos[0][0]; y1 = movimientos[0][1];
			x2 = movimientos[3][0]; y2 = movimientos[3][1];
			dx1 = x1 - x2; dy1 = y1 - y2;

			x3 = movimientos[1][0]; y3 = movimientos[1][1];
			x4 = movimientos[2][0]; y4 = movimientos[2][1];
			dx2 = x3 - x4; dy2 = y3 - y4;

			if(dx1 == dx2 && dy1 === dy2) cont++;


			if(cont==2){
				m1=(y2-y1)/(x2-x1);
				m2=(y2-y4)/(x2-x4);
				if(!isFinite(m1) && m2==0){
					ret = true;
				}else if (!isFinite(m2) && m1==0) {
					ret = true;
				}else if (m1==(1/m2)*-1) {
					ret = true;
				}

			}

			return ret;

}

function rectificard(x, y){
		var r = x%cwidth;
		if(r<cwidth/2) x = x-r;
		else x = x+cwidth-r;

		r = y%cheight;
		if(r<cheight/2) y = y-r;
		else y = y+cheight-r;

		movimientos.push([x, y]);
		drawCoordinates(x,y);
}

function rectificaru(){
		var r = x%cwidth;
		if(r<cwidth/2) x = x-r;
		else x = x+cwidth-r;

		r = y%cheight;
		if(r<cheight/2) y = y-r;
		else y = y+cheight-r;
		movimientos.push([x, y]);
}

function pintapuntos(){
			var long = movimientos.length;

			for(var i=0; i < movimientos.length-1; i++){
				drawCoordinates(movimientos[i][0], movimientos[i][1]);
			}

    	var pointSize = 4;
			context.fillStyle = "#1396c1";
			context.beginPath();
			context.arc(movimientos[long-1][0], movimientos[long-1][1], pointSize, 0, Math.PI * 2, true);
			context.fill();

}

function pintarecta(){
		var long = movimientos.length;
		context.strokeStyle = "#1348c1";
		context.lineWidth=5;

		if(movimientos.length>1){
					context.beginPath();
					context.moveTo(movimientos[0][0], movimientos[0][1]);

					for(var i=0; i < movimientos.length-1; i++){
							context.lineTo(movimientos[i+1][0], movimientos[i+1][1]);
					}

					context.stroke();
		}
	}

function drawCoordinates(x,y){
    var pointSize = 4;
    context.fillStyle = "#1348c1";

    context.beginPath();
    context.arc(x, y, pointSize, 0, Math.PI * 2, true);
    context.fill();
}

function repinta(x, y){
	canvas.width = canvas.width;
	var long = movimientos.length;

		pintacuadros();
		pintarecta();
		pintapuntos();


	context.strokeStyle = "#1396c1";
	context.lineWidth=4;
	context.beginPath();
	context.moveTo(movimientos[long-1][0], movimientos[long-1][1]);
	context.lineTo(x, y);
	context.closePath();
	context.stroke();
}

function pintacuadros(){
	for (var x=0; x<=width; x=x+cwidth){
		context.moveTo(x,0);
		context.lineTo(x,height);
	}
	for (var y=0; y<=height; y=y+cheight){
		context.moveTo(0,y);
		context.lineTo(width,y);
	}
	context.strokeStyle = "#f18e00";
	context.stroke();
}

function comenzarjuego(n){

	movimientos = new Array();
	primero = true;
	canvas.width = canvas.width;
	pintacuadros();

/*
	var comparar=localStorage.getItem("Dislexia");
	if(comparar=="false"){
		 	$('*').css("font-family", "Vibur");
	}
	if(comparar=="true"){
			$('*').css("font-family", "Comic Sans MS");
	}
*/

	if(n==1){


	}else{
		marcada = false;
		document.getElementById("hep").innerHTML = "";
		$('#btn1').removeClass( "on" ).addClass("off");
		if(mision==3){
			mision=0;
			opcion=mision;
		}else{
			mision++;
			opcion=mision;
		}
	}

	switch (opcion) {
		case 0:
			pinturatotal = 3;
			lados=3;
			break;
		case 1:
			pinturatotal = 4;
			lados=4;
			break;
		case 2:
			pinturatotal = 4;
			lados=4;
			break;
		case 3:
			pinturatotal = 5;
			lados=5;
			break;
	}

	document.getElementById("opc").innerHTML = "Dibuja un <strong>" + poligono[opcion] + "</strong>.";
	if(pinturatotal==1) document.getElementById("num").innerHTML = "Falta <strong>" + pinturatotal + "</strong> lado";
	else document.getElementById("num").innerHTML = "Faltan <strong>" + pinturatotal + "</strong> lados";

	document.getElementsByTagName("progress")[0].setAttribute("value", "100");
}

function borra(){
	menusimple.play();
	comenzarjuego(1);
	if (localStorage.getItem("Borra") === null) {
		localStorage.setItem("Borra", "0");
	 }

	var sumar=Number(localStorage.getItem("Borra"));
	sumar+=1;
	localStorage.setItem("Borra",sumar.toString());
}

function mostrarimagen(){

		menusimple.play();

	if(!marcada){
		marcada = true;
		$( "#btn1" ).removeClass("off").addClass( "on" );
		switch (opcion) {
			case 0:
				document.getElementById("hep").innerHTML = "<img src='triangulo.jpg'>";
				break;
			case 1:
				document.getElementById("hep").innerHTML = "<img src='rectangulo.jpg'>";
				break;
			case 2:
				document.getElementById("hep").innerHTML = "<img src='cuadrado.jpg'>";
				break;
			case 3:
				document.getElementById("hep").innerHTML = "<img src='pentagono.jpg'>";
				break;
		}

		if (localStorage.getItem("Ayuda") === null) {
	    localStorage.setItem("Ayuda", "0");
	   }

		var sumaay=Number(localStorage.getItem("Ayuda"));
		sumaay+=1;
		localStorage.setItem("Ayuda",sumaay.toString());

	} else{
		marcada = false;
		$('#btn1').removeClass( "on" ).addClass("off");
		document.getElementById("hep").innerHTML = "";
	}

}

function sig(){
		comenzarjuego(0);
		if (localStorage.getItem("Acierto") === null) {
			localStorage.setItem("Acierto", "0");
		 }

		var sumaay=Number(localStorage.getItem("Acierto"));
		sumaay+=1;
		localStorage.setItem("Acierto",sumaay.toString());
}

function ret(){
		comenzarjuego(1);
		if (localStorage.getItem("Reintento") === null) {
			localStorage.setItem("Reintento", "0");
		 }

		var sumaay=Number(localStorage.getItem("Reintento"));
		sumaay+=1;
		localStorage.setItem("Reintento",sumaay.toString());
}

function ajugar(){
	location.href="points.html";
		menusimple.play();
}

function amaestro(){
	location.href="maestro.html";
	menusimple.play();
}

function amenu(){
	location.href="menupoints.html";
	menusimple.play();
}

function amenupr(){
	location.href="menu.html";
	menusimple.play();
}

var ventana;
function abrir() {
  ventana = window.open('tupagina.html');
  setTimeout('ventana.close()',3000);
}

function compruebaTecla (e) {
	var keyCode = document.all ? e.which : e.keyCode;

	if (keyCode == 39){
		if(currentx<=540) currentx = currentx + 45;
		dibujoteclado();
	}

	else if (keyCode == 40){
		if(currenty<=405) currenty = currenty + 45;
		dibujoteclado();
	}

	else if (keyCode == 38){
		if(currenty>=45) currenty = currenty - 45;
		dibujoteclado();
	}

	else if (keyCode == 37){
		if(currentx>=45) currentx = currentx - 45;
		dibujoteclado();
	}

	else if (keyCode == 83){
		tecladopunto();
	}
}

function dibujoteclado(){
	canvas.width = canvas.width;
	pintacuadros();
	drawCoordinates(currentx, currenty);
	if(movimientos.length>0) repinta(currentx, currenty);
}

function tecladopunto(){
	if(pinturatotal>0){
		if(primero){
			movimientos.push([currentx, currenty]);
			drawCoordinates(currentx,currenty);
			primero = false;
		}else{
			canvas.width = canvas.width;
			pintacuadros();

			if(!mismo(currentx, currenty) && !evitarinterseccion(currentx,currenty)){
				movimientos.push([currentx, currenty]);
				pinturatotal--;
				document.getElementById("opc").innerHTML = "Dibuja un <strong>" + poligono[opcion] + "</strong>.";
				if(pinturatotal==1) document.getElementById("num").innerHTML = "Falta <strong>" + pinturatotal + "</strong> lado";
				else document.getElementById("num").innerHTML = "Faltan <strong>" + pinturatotal + "</strong> lados";
			}

			pulsado = false;
			if(movimientos.length>0){
				pintarecta();
				pintapuntos();
				var por = pinturatotal/lados*100;
				document.getElementsByTagName("progress")[0].setAttribute("value", por);
				comprobar();
			}
		}

	}
}

function ins(){
		inst.play();
}
