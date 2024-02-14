class Producto{
    constructor(id,nombre,descripcion,imagen,precio){
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.imagen = imagen;
        this.precio = precio;
    }
}

const productosArray = [
    new Producto("1","pan","horneado","url",1400),
    new Producto("2","arroz","gallo","url",2000),
    new Producto("3","carne","3 arroyos","url",5000),
    new Producto("4","leche","la serenisima","url",1600),
]

let carrito = {}; 
let total = 0;

let continuar = true;
while (continuar) {
    let productoNombre = prompt("Ingrese el nombre del producto que desea comprar:");
    let cantidad = parseInt(prompt("Ingrese la cantidad de producto:"));

    let producto = productosArray.find(p => p.nombre.toLowerCase() === productoNombre.toLocaleLowerCase());

    if (producto) {
        if (carrito.hasOwnProperty(productoNombre)) {
            carrito[producto.id].cantidad += cantidad;
        } else {
            carrito[producto.id] = { producto: producto, cantidad: cantidad };
        }
        total += producto.precio * cantidad;
    } else {
        alert("El nombre del producto ingresado no existe.");
    }

    continuar = confirm("¿Desea agregar otro producto al carrito?");
}

let mensaje = "Carrito de compras:\n";
for (let key in carrito) {
    let item = carrito[key];
    mensaje += `- ${item.producto.nombre} x${item.cantidad}: $${item.producto.precio * item.cantidad}\n`;
}
mensaje += `Total: $${total.toFixed(2)}\n`;


let CUOTAS;    

function obtenerCuotas() {
    CUOTAS = parseInt(prompt(`El total de la compra es de $${total.toFixed(2)}\n Ingrese la cantidad de cuotas que desea hacer el pago (3, 6 o 12 cuotas)`));
}


function calcularCuotas(){
    if (CUOTAS === 3){
        return "El pago en 3 cuotas es de: " + (total / 3).toFixed(2);
    }else if (CUOTAS === 6){
        return "El pago en 6 cuotas es de: " + (total / 6).toFixed(2);
    } else if (CUOTAS === 12){
        return "El pago en 12 cuotas es de: " + (total / 12).toFixed(2);
    } else {
            return "ERROR: La cantidad de cuotas ingresadas no es valida";
        }
    } while (true) {

    obtenerCuotas();
    const resultadoCuotas = calcularCuotas();
    if (!resultadoCuotas.includes("ERROR")) {
        alert(resultadoCuotas);
        break;
    } else {
        alert(resultadoCuotas);
           }
    }
