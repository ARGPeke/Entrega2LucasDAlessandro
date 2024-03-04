class Producto {
    constructor(id, nombre, descripcion, imagen, precio) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.imagen = imagen;
        this.precio = precio;
    }
}

const productosArray = [
    new Producto("1", "pan", "horneado", "url", 1400),
    new Producto("2", "arroz", "gallo", "url", 2000),
    new Producto("3", "carne", "3 arroyos", "url", 5000),
    new Producto("4", "leche", "la serenisima", "url", 1600),
];

let carrito = {};
let total = 0;

const totalGuardado = localStorage.getItem("totalCarrito");
if (totalGuardado) {
    total = parseFloat(totalGuardado);
}

document.addEventListener("DOMContentLoaded", function() {
    const listaCarrito = document.getElementById("lista-carrito");
    const totalCarrito = document.getElementById("total-carrito");
    const botonCuotas = document.getElementById("boton-cuotas");
    const resultadoCuotas = document.getElementById("resultado-cuotas");
    const inputCuotas = document.getElementById("cuotas");

    const listaProductos = document.querySelectorAll("#productos li");
    listaProductos.forEach(function(item, index) {
        const botonAgregar = item.querySelector(".agregar");
        const producto = productosArray[index];
        botonAgregar.addEventListener("click", function() {
            agregarAlCarrito(producto);
        });
    });

    function agregarAlCarrito(producto) {
        const cantidad = 1; 
        if (carrito.hasOwnProperty(producto.id)) {
            carrito[producto.id].cantidad += cantidad;
        } else {
            carrito[producto.id] = { producto: producto, cantidad: cantidad };
        }
        total += producto.precio * cantidad;
        actualizarCarrito();
        localStorage.setItem("totalCarrito", total.toString());
    }

    function actualizarCarrito() {
        listaCarrito.innerHTML = "";
        let carritoHTML = "";
        for (let key in carrito) {
            const item = carrito[key];
            carritoHTML += `<li>${item.producto.nombre} x${item.cantidad}: $${item.producto.precio * item.cantidad}</li>`;
        }
        listaCarrito.innerHTML = carritoHTML;
        totalCarrito.textContent = `Total: $${total.toFixed(2)}`;
    }

    
    const limpiarCarritoBtn = document.getElementById("limpiar-carrito");
    limpiarCarritoBtn.addEventListener("click", function() {
        limpiarCarrito();
    });

    function limpiarCarrito() {
        carrito = {};
        total = 0;
        actualizarCarrito();
        document.getElementById("total-acumulado").textContent = "";
        localStorage.removeItem("totalCarrito");
    }

    const totalAcumulado = localStorage.getItem("totalCarrito");
    if (totalAcumulado) {
        document.getElementById("total-acumulado").textContent = "Total acumulado anteriormente: $" + totalAcumulado;
    }

    botonCuotas.addEventListener("click", function() {
        const cuotas = parseInt(inputCuotas.value);
        if ([3, 6, 12].includes(cuotas)) {
            calcularCuotas(cuotas);
        } else {
            resultadoCuotas.textContent = "ERROR: La cantidad de cuotas ingresadas no es válida.";
        }
    });

    function calcularCuotas(cuotas) {
        let mensaje = "";
        switch (cuotas) {
            case 3:
                mensaje = "El pago en 3 cuotas es de: " + (total / 3).toFixed(2);
                break;
            case 6:
                mensaje = "El pago en 6 cuotas es de: " + (total / 6).toFixed(2);
                break;
            case 12:
                mensaje = "El pago en 12 cuotas es de: " + (total / 12).toFixed(2);
                break;
        }
        resultadoCuotas.textContent = mensaje;
    }
});
