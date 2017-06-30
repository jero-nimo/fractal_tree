//Creo el canvas
var canvas = document.createElement("canvas");
var canvasContext = canvas.getContext("2d");
canvas.id = "BackgroundCanvas";
canvas.width = 800;
canvas.height = 600;
//Añado el canvas
var body = document.getElementsByTagName("body")[0];
body.appendChild(canvas);

//Creo mi objeto rama
function RamaObject(beginX, beginY, endX, endY)
{
	this.beginX = beginX;
	this.beginY = beginY;
	this.endX = endX;
	this.endY = endY;
	this.finished = false;

	//Funcion para que se dibuje la rama
	this.Show = function()
	{
		DrawLine(beginX, beginY, endX, endY, "white");
	}

	//Funcion para crear nuevas ramas al final de la creada
	this.RamasNuevasDerecha = function()
	{
		//Busco la magnitud de la rama previa
		var magnitude = Math.sqrt(Math.pow(this.endX - this.beginX,2) + Math.pow(this.endY - this.beginY,2));
		magnitude *= 0.67;
		var anguloThis = Math.atan2((this.endY - this.beginY), (this.endX - this.beginX));
		//Creo la direccion de la nueva rama
		//Roto la nueva rama
		var angulo = Math.PI/4//Angulo de rotacion
		var dir = [Math.cos(anguloThis+angulo)*magnitude, Math.sin(anguloThis+angulo)*magnitude];
		//Creo el nuevo punto final
		var newEndX = this.endX + dir[0];
		var newEndY = this.endY + dir[1];
		//Añado la rama de la derecha
		var right = new RamaObject(this.endX, this.endY, newEndX, newEndY);
		return right
	}
	this.RamasNuevasIzquierda = function()
	{
		//Busco la magnitud de la rama previa
		var magnitude = Math.sqrt(Math.pow(this.endX - this.beginX,2) + Math.pow(this.endY - this.beginY,2));
		magnitude *= 0.67;
		var anguloThis = Math.atan2((this.endY - this.beginY), (this.endX - this.beginX));
		//Creo la direccion de la nueva rama
		//Roto la nueva rama
		var angulo = -Math.PI/4//Angulo de rotacion
		var dir = [Math.cos(anguloThis+angulo)*magnitude, Math.sin(anguloThis+angulo)*magnitude];
		//Creo el nuevo punto final
		var newEndX = this.endX + dir[0];
		var newEndY = this.endY + dir[1];
		//Añado la rama de la derecha
		var left = new RamaObject(this.endX, this.endY, newEndX, newEndY);
		return left
	}
}

var tree = [];

//	Inicio el programa que dibujara todo en si
window.onload = function()
{	
	//Creo la raiz
	var raiz = new RamaObject(canvas.width/2, canvas.height, canvas.width/2, canvas.height-100);
	tree[0] = raiz;

	//Creo el eventlistener
	document.addEventListener("mousedown", MousePressed);

	//Llamo a la funcion update a 60fps
	setInterval(Update, 1000/60);
}

//Funcion update
function Update()
{
	DrawAll();
}

//Funcion para dibuar todo
function DrawAll()
{
	//Dibujo el canvas
	DrawRect(0, 0, canvas.width, canvas.height, "black");

	//Dibujo todas las ramas
	for (var i = 0; i<tree.length; i++)
	{
		tree[i].Show();
	}
}

//Funcion al presionar el mouse
function MousePressed()
{
	for (var i = tree.length-1; i >= 0; i--)
	{
		if (!tree[i].finished)
		{
			tree.push(tree[i].RamasNuevasDerecha());
			tree.push(tree[i].RamasNuevasIzquierda());
			tree[i].finished = true;
		}
	}
}

//Funcion para dibujar rectangulos
function DrawRect(topLeftX, topLeftY, boxWidth, boxHeight, color)
{
	canvasContext.fillStyle = color;
	canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}

//Funcion para dibujar una linea
function DrawLine(x1, y1, x2, y2, color)
{
	canvasContext.beginPath();
	canvasContext.moveTo(x1,y1);
	canvasContext.lineTo(x2,y2);
	canvasContext.strokeStyle = color;
	canvasContext.stroke();
}