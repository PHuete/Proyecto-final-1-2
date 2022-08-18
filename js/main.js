//ESTIM - Pagina de venta de videojuegos

const CATEGORIAS = ['Shooter', 'RPG', 'Deportes', 'Terror', 'Indie']

const TITULOS = ['Call of Duty: Modern Warfare 2 Remastered', 'Elden Ring', 'NBA2k23', 'Madison', 'Stardew Valley']

const PRECIOS = [59.95, 69.95, 44.99, 50.00, 18.99]

const VIDEOJUEGOS = []

const CODIGOSPROMO = ['ESTIM_WELLCOME', 'ESTIM_10']

const TIPOUSUARIO = ['PREMIUM', 'BASICO'] // Posteriormente incluire que si el usuario es PREMIUM tiene un % de descuento.

const USUARIOS = []

const IVA = 1.21

let USUARIOLOGADO = false


class Videojuego {
    constructor(id, nombre, precio, categoria) {
        id = parseInt(Math.random() * 100000)
        this.id = id
        this.nombre = nombre
        this.precio = precio
        this.categoria = categoria
    }
}


class Usuario {
    constructor(nombre, apellido, nombreUsuario, tipo) {
        this.id = parseInt(Math.random() * 100000)
        this.nombre = nombre
        this.apellido = apellido
        this.nombreUsuario = nombreUsuario
        this.tipo = tipo
        this.biblioteca = []
        //this.promociones = CODIGOSPROMO
    }
}

generadorAutomaticoJuegos()
console.table(VIDEOJUEGOS)
generadorAutomaticoUsuarios()
console.table(USUARIOS)
cargarJuegosHTML()


function generadorAutomaticoJuegos() {
    VIDEOJUEGOS.push(new Videojuego(1234, "Call of Duty: Modern Warfare 2 Remastered", 59.95, "Shooter"))
    VIDEOJUEGOS.push(new Videojuego(2345, "Elden Ring", 69.95, "RPG"))
    VIDEOJUEGOS.push(new Videojuego(3456, "NBA2k23", 44.99, "Deportes"))
    VIDEOJUEGOS.push(new Videojuego(4567, "Madison", 50.00, "Terror"))
    VIDEOJUEGOS.push(new Videojuego(4567, "Stardew Valley", 18.99, "Indie"))
}

function generadorAutomaticoUsuarios() {
    USUARIOS.push(new Usuario("Antonio", "Sanz", "Sanz33", TIPOUSUARIO[0]))
    USUARIOS.push(new Usuario("Margarita", "Rodriguez", "Marga89", TIPOUSUARIO[1]))
}

function login() {
    let usuarioExiste = false

    while (!usuarioExiste) {
        let nombreUsuario = prompt("Bienvenido a ESTIM. Introduce un nombre de usuario ")
        USUARIOS.forEach(usuario => {
            if (usuario.nombreUsuario === nombreUsuario) {
                usuarioExiste = true
            }
        });
        if (!usuarioExiste) {
            let alta = confirm("No existe ningun usuario con el nombre " + nombreUsuario + ". ¿Deseas darlo de alta?")
            if (alta === true) {
                let nuevoUsuario = registroUsuario(nombreUsuario)
                USUARIOS.push(nuevoUsuario)
            }
            else {
                alert("Intenta introducir un usuario registrado")
            }
        }
        else {
            prompt("Introduzca la contraseña:")
            alert("Bienvenido, '" + nombreUsuario + "'")
            USUARIOLOGADO = true
        }
    }

}

// Funcion para logearte en la pagina. Si el usuario introducido no esta registrado te da la opcion de registrarlo.

function registroUsuario(nombreUsuario) {
    let nombre = prompt("Introduce tu nombre para el usuario '" + nombreUsuario + "':")
    while (nombre === "" || nombre === null) {
        nombre = prompt("Introduce un nombre valido")
    }
    let apellido = prompt("Introduce tu apellido:")
    while (apellido === "" || apellido === null) {
        apellido = prompt("Introduce un apellido valido")
    }
    let contrasenya = prompt("Introduce una contraseña")
    while (contrasenya === "" || contrasenya === null) {
        contrasenya = prompt("Introduce una contraseña valida")
    }
    let tipo = prompt("¿Que tipo de plan deseas adquirir? (BASICO o PREMIUM)")
    while (tipo === "" || tipo === null) {
        tipo = prompt("Introduce un plan valido (BASICO o PREMIUM")
    }
    alert("Usuario '" + nombreUsuario + "' ha sido creado con éxito")
    USUARIOS.push(new Usuario(nombre, apellido, nombreUsuario, tipo))
}

function añadirAlCarrito(juegos) {
    if (!USUARIOLOGADO) {
        alert("Inicia sesión antes de continuar")
        return
    }
    let carrito = []
    let juegoExiste = false
    let repetir = true
    while (repetir) {
        let juegosDisponibles = juegos
        let conCategoria = confirm("¿Deseas filtrar los juegos por categorias?")

        if (conCategoria) {
            let categoria = prompt("Ingresa la categoria a filtrar: " + CATEGORIAS)
            juegosDisponibles = juegos.filter(juego => juego.categoria == categoria)
        }

        let nombreJuego = prompt("Añada nombre del juego: (" + obtenerNombreJuegos(juegosDisponibles) + ")")

        juegosDisponibles.forEach(juego => {
            if (juego.nombre === nombreJuego) {
                carrito.push(juego)
                juegoExiste = true
            }
        });
        if (!juegoExiste) {
            alert("El juego con nombre '" + nombreJuego + "' no existe")
        }
        else {
            alert(nombreJuego + " añadido al carrito")
        }
        juegoExiste = false
        repetir = confirm("¿Deseas añadir otro juego?")

    }

    return carrito

}
//Funcion para añadir los juegos al carrito. El usuario puede elegir si filtrar juegos por categoria o no.

function compra(carrito) {

    let realizarCompra = confirm("¿Deseas realizar el pago de los articulos? [" + obtenerNombreJuegos(carrito) + "]")
    if (realizarCompra = true) {
        //print(descuento()) 
        alert("Has realizado correctamente la compra de " + obtenerNombreJuegos(carrito))
    }
    else {
        delete [carrito]
        alert("Vuelve cuando quieras")
    }
    return carrito
}
//Funcion para realizar la compra de los articulos del carrito. 

function descuento() {
    let codigoPromo = prompt("¿Tienes un codigo de descuento? Introducelo aqui:")
    if (codigoPromo === "") {
        codigoPromo = prompt("Codigo de descuento invalido. Inteoduce otro codigo valido:")
        if (codigoPromo === CODIGOSPROMO[0]) {
            Videojuego.precio * 0.85

        }
        if (codigoPromo === CODIGOSPROMO[1]) {
            Videojuego.precio * 0.9

        }
    }
}
//Esta funcion descontara el importe del codigo de descuento al carro final. Tambien realizare codigos de 1 solo uso.

function obtenerNombreJuegos(juegos) {
    return juegos.map(juego => { return juego.nombre })
}

//DOM

function cargarJuegosHTML() {
    console.log("ENTRO")
    const cuerpo = document.getElementById("cuerpo")
    VIDEOJUEGOS.forEach(videojuego => {
        cuerpo.innerHTML += ` <tr>
                                <td>${videojuego.id}</td>
                                <td>${videojuego.nombre}</td>
                                <td>${videojuego.categoria}</td>
                                <td>${videojuego.precio}</td>
                             </tr>`

    })
}

// EVENTOS

let iniciarSesionBtn = document.getElementById("iniciarSesionBtn")
iniciarSesionBtn.onclick = () => login()

let aniadirJuegosBtn = document.getElementById("aniadirJuegosBtn")
aniadirJuegosBtn.onclick = () => añadirAlCarrito()




