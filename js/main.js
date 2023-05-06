let nuevo_usuario, usuario_name, usuario_surname, usuario_email, usuario_contrasenia, usuario_email_confirm, actividad = ""
let pago, largo_texto = 0
let id = 2
let clientes = []

/* clientes hardcodeados para probar */

let cliente1 = new Registro(1, "Coder", "House", "test@coderhouse.com", "123", "La Web 404", "HTML", "2014/01/01", "", "")
let cliente2 = new Registro(2, "Pablo", "Galeano", "pablogaleano88@hotmail.com", "456", "Los Pozos 370", "Ituzaingó", "1988/09/16", "", "")

clientes.push(cliente1, cliente2)
console.table(clientes)


/* precios - si los modificas acá por InnerHTML se modifican en la pagina */

let precio_musculacion = 2000
let precio_spinning = 2500
let precio_yoga = 3000
let precio_todo = 5000

/* Esto es para capturar la interacción con los botones y el carrito */

let texto_ingreso = document.getElementById("texto_ingreso")
let btn_soy_socio = document.getElementById("btn_soy_socio")
let btn_nuevo_socio = document.getElementById("btn_nuevo_socio")
let carrito = document.getElementById("carrito_compras")
let carrito_cantidad = document.getElementById("carrito_cantidad")
let boton_ingresar = document.getElementById("boton_ingresar");

/* esto es el segundo modal que reemplaza a los alert, reacciona si la contraseñas no coindcide, los usuarios que se buscan no existen */

let titulo = document.getElementById("titulo2_modal")
let texto = document.getElementById("texto2_modal")
let boton_volver = document.getElementById("boton_volver")

/* función constructora para los clientes - todavia no agregué que guarde en el usuario la actividad que realiza, pero si relaciona el mail con las actividades del carrito */

function Registro(id, nombre, apellido, email, contrasenia, direccion, ciudad, fecha_nac, actividad, precio) {
    this.id = id
    this.nombre = nombre
    this.apellido = apellido
    this.email = email
    this.contrasenia = contrasenia
    this.direccion = direccion
    this.ciudad = ciudad
    this.fecha_nac = fecha_nac
    this.actividad = actividad || ""
    this.precio_apagar = precio || 0
}

/* funcion de alta de usaurio - guardar_clientes lo envía a LocalStorage */

function alta_usuario(nombre, apellido, email, contrasenia, direccion, ciudad, fecha_nac) {
    id = id + Math.round(Math.random() * 9 + 1)
    let cliente = new Registro(id, nombre, apellido, email, contrasenia, direccion, ciudad, fecha_nac)
    clientes.push(cliente)
    console.table(clientes)
    guardar_clientes(clientes)
}

/* esta función guarda en el LocalStorage */

function guardar_clientes(array_clientes) {
    const guardarLocal = (clave, valor) => { localStorage.setItem(clave, valor) };
    guardarLocal("clientes", JSON.stringify(array_clientes));
}

/* acá comienza el ingreso de usuario registrado, habilito el carrito y bloqueo los botones de registro*/

function socio_in(id, nombre, apellido) {
    carrito_cantidad.style.display = 'block'
    carrito.style.backgroundColor = "white"
    btn_soy_socio.style.display = "none"
    btn_nuevo_socio.style.display = "none"
    texto_ingreso.innerText = `Socio: ${nombre} ${apellido}\n Número de Socio: #${id} `
    chequeo_carrito()
}

/* aca activo las cards una vez que el usuario se logueó */   

function mostrar_cards() {

    let cards = document.getElementById("contenedor_cards")
    cards.style.opacity = "1";

    /* acá pongo las descripciones de las tarjetas */

    let titulo_musculacion = document.getElementById("titulo_card_musculacion")
    let titulo_spinning = document.getElementById("titulo_card_spinning")
    let titulo_yoga = document.getElementById("titulo_card_yoga")
    let titulo_todo = document.getElementById("titulo_card_todo")
    let card_musculacion = document.getElementById("texto_card_musculacion")
    let card_spinning = document.getElementById("texto_card_spinning")
    let card_yoga = document.getElementById("texto_card_yoga")
    let card_todo = document.getElementById("texto_card_todo")

    titulo_musculacion.innerHTML = `<h5 class="card-title" id="titulo_card_musculacion">Musculación</h5><div><h5>Por mes: $<span>${precio_musculacion}</span></h5></div>`
    titulo_spinning.innerHTML = `<h5 class="card-title" id="titulo_card_spinning">Spinning</h5><div><h5>Por mes: $<span>${precio_spinning}</span></h5></div>`
    titulo_yoga.innerHTML = `<h5 class="card-title" id="titulo_card_yoga">Yoga</h5><div><h5>Por mes: $<span>${precio_yoga}</span></h5></div>`
    titulo_todo.innerHTML = `<h5 class="card-title" id="titulo_card_todo">Todas las actividades</h5><div><h5>Por mes: $<span>${precio_todo}</span></h5></div>`

    card_musculacion.innerText = `Clases a toda hora!!\nPersonal a toda hora!! `
    card_spinning.innerText = `Tenemos 8 clases por día!!!!\nTe las vas a perder??`
    card_yoga.innerText = `Liberate del estrés del día!!\nVení a relajarte y también a ejercitarte `
    card_todo.innerText = `Anotate a todas las actividades!!!\nAprovechá esta promo y ejercitá a full!!! `

}

/* Cuando hago click en ingresar como socio luego de poner la contraseña ejecuta el segundo modal */

boton_ingresar.onclick = () => {
    let socio_email = document.getElementById("socio_email").value
    let socio_pass = document.getElementById("socio_pass").value
    /* check_clientes busca en el localStorage */
    check_clientes()

    /* ejecuto el codigo para buscar si algun cliente coincide con el mail , caso afirmativo lo busco con find y traigo sus datos */

    if (clientes.some((c) => c.email === socio_email)) {
        const buscar_cliente = clientes.find(usuario => usuario.email === socio_email)
        let contrasenia = buscar_cliente.contrasenia
        /* checkeo que la contraseña coincide con la del socio, si esta todo ok ,traigo datos */
        if (contrasenia === socio_pass) {
            let id = buscar_cliente.id
            let nombre = buscar_cliente.nombre
            let apellido = buscar_cliente.apellido
            /* este botón desaparece si ya nos logueamos, porque no sería necesario volver atrás */
            boton_volver.style.display = "none"
            /* titulo y texto son los del modal que aparece al clickear ingresar luego de poner el mail y el password */
            titulo.innerText = "Bienvenido/a !!!"
            texto.innerText = `${nombre}, te estabamos esperando!!!`
            socio_in(id, nombre, apellido)
            mostrar_cards()
            /* si la contraseña no coincide modifico el model y muestro el mensaje, y muestro el boton de volver, para que reingrese la contraseña */
        }
        else {
            titulo.innerText = "Contraseña incorrecta"
            texto.innerText = "Por favor, verifique sus datos y vuelva a intentarlo"
            boton_volver.style.display = "block"
        }
        /* si el mail no coincide con los guardados informo */
    }
    else {
        titulo.innerText = "Email no registrado"
        texto.innerText = 'El email proporcionado no está registrado, por favor, vuelve a intentar o hacé click en "Quiero registrarme" y asociate!!! 😉.'
    }
}

/* esta funcion trae del LocalStorage los clientes */

function check_clientes() {
    const clientesLocalStorage = localStorage.getItem("clientes");
    if (clientesLocalStorage !== null) {
        clientes = JSON.parse(clientesLocalStorage);
    }
}

/* acá empieza el boton de nuevo usuario, donde abre el form */

let boton_registro = document.getElementById("boton_registro");

boton_registro.onclick = () => {
    let nuevo_nombre = document.getElementById("nuevo_nombre").value
    let nuevo_apellido = document.getElementById("nuevo_apellido").value
    let nuevo_email = document.getElementById("nuevo_email").value
    let nuevo_contrasenia = document.getElementById("nuevo_contrasenia").value
    let nuevo_contrasenia_confirm = document.getElementById("nuevo_contrasenia_confirmacion").value
    let nuevo_direccion = document.getElementById("nuevo_direccion").value
    let nuevo_ciudad = document.getElementById("nuevo_ciudad").value
    let nuevo_fechan = document.getElementById("nuevo_fecha_nac").value

    /* ejecuto check clientes por si ya está registrado y guardado en el LocalStorage */
    check_clientes() 
    
    nuevo_email = nuevo_email.toLowerCase()
    if (clientes.some((c) => c.email === nuevo_email)) {
        titulo.innerText = "El Email que ingresaste ya existe !!!"
        texto.innerText = 'El email que ingresaste ya está registrado\n\nPor favor, ingresá al botón "Ya soy socio"\n\nEn caso de tener algún problema contactate con nosotros!'
        boton_volver.dataset.bsTarget = "#staticBackdropRegister"
        return;
    }
    else {
        if (nuevo_contrasenia !== nuevo_contrasenia_confirm) {
            titulo.innerText = "Las contraseñas no coinciden 🔐"
            texto.innerText = 'las contraseñas que proporcionaste no coincide\nPor favor volvé a ingresarlas '
            boton_volver.dataset.bsTarget = "#staticBackdropRegister"
            return;
        }
    }
    titulo.innerText = "Bienvenido/a"
    texto.innerText = `Desde SportFit te damos la Bienvenida ${nuevo_nombre}\nTu usuario ya está creado\nHaciendo click en "Ya soy Socio" podres elegir la actividad!!!`
    boton_volver.style.display = "none"
    alta_usuario(nuevo_nombre, nuevo_apellido, nuevo_email, nuevo_contrasenia, nuevo_direccion, nuevo_ciudad, nuevo_fechan)
}


/* estas funciónes la dispara desde el HTML con onclick cuando clickeamos el numero del carrito */
function mostrar_carrito(x) {
    document.getElementById("products-id").style.display = "block";
}
function closeBtn() {
    document.getElementById("products-id").style.display = "none";
}


/* aca comienza el carrito */
let num_cart = document.getElementById("carrito_cantidad")
let elementos_de_cards = document.querySelector('.container');
let contenedor_carrito = document.querySelector('.card-items');
let precio_total = document.querySelector('.price-total')
let amountProduct = document.querySelector('.count-product');

let check_carrito = false
let compras_en_carrito = [];
let total = 0;
let contador_items = 0;

/* levanto el eventlistner  */
loadEventListeners(); 

function loadEventListeners() {
    elementos_de_cards.addEventListener('click', addProduct);
    contenedor_carrito.addEventListener('click', deleteProduct);
}

/* esta es la funcion para agregar el item al carrito*/
function addProduct(e) {
    e.preventDefault();
    if (e.target.classList.contains('add-to-cart')) {
        const selectProduct = e.target.parentElement;
        console.log(selectProduct.parentElement.parentElement)
        readTheContent(selectProduct.parentElement.parentElement);
    }
}

/* cuando hacemos click en la x del item del carrito ejecuta esto, busca el item por nombre y lo elimina */
function deleteProduct(e) {
    if (e.target.classList.contains('delete-product')) {
        const deleteP = e.target.getAttribute('data-id');
        compras_en_carrito.forEach(value => {
            if (value.title === deleteP) {
                let resta = parseFloat(value.price);
                total = total - resta;
                total = total.toFixed(2);
            }
        });
        compras_en_carrito = compras_en_carrito.filter(product => product.title !== deleteP);
        contador_items--;
        if (compras_en_carrito.length === 0) {
            carrito_cantidad.innerText = 0;
            precio_total.innerText = 0;
            localStorage.clear()
        }
        loadHtml();
    }
}

/*  cada vez que hacemos click en el botón de agregar al carrito busca en el HTML los datos como titulo, precio e imagen */
function readTheContent(product) {
    const infoProduct = {
        image: product.querySelector('img').src,
        title: product.querySelector('div h5 h5').textContent,
        price: product.querySelector('div h5 div h5 span').textContent,
    }

    const index = compras_en_carrito.findIndex(product => product.title === infoProduct.title);
    if (index !== -1) {
        alert("ya agregó esta actividad")
        return;
    }

    compras_en_carrito.push(infoProduct);
    contador_items++

    total = parseFloat(total) + parseFloat(infoProduct.price);
    total = total.toFixed(2)

    loadHtml();
}

/* para limpiar el carrito y volverlo a armar cada vez que agregamos o sacamos un item */
function loadHtml() {
    clearHtml();
    compras_en_carrito.forEach(product => {
        const { image, title, price, } = product;
        const row = document.createElement('div');
        row.classList.add('item');
        row.innerHTML = `
        <div class="line_div">
            <div><span class="delete-product" data-id="${title}">x</span></div>
            <img src="${image}" alt="" style="width: 150px;>
            <div class="item-content">
                <h6>${title}</h6>
                <h6 class="cart-price">${price}$</h6>
            
            </div>
        </div>   
        `;

        contenedor_carrito.appendChild(row);

        precio_total.innerHTML = total;

        carrito_cantidad.innerText = contador_items

        if (check_carrito == true) {
            enviar_localstorage(compras_en_carrito)
        }
        check_carrito = true
    });

/* para limpiar el carrito */    
}
function clearHtml() {
    contenedor_carrito.innerHTML = '';
}

/* esta es la funcion que envia al localstorage del carrito, para que cuando nos desloguiemos siga guardado en el usuario lo que quedó en le carrito */
function enviar_localstorage(compras) {
    const guardarLocal = (clave, valor) => { localStorage.setItem(clave, valor) };
    guardarLocal(socio_email.value, JSON.stringify(compras));
}

/* cuando volvemos a loguearnos con el usuario consulta si hay items en el carrito del localstorage segun el email */
function chequeo_carrito() {
    const recu_compras = JSON.parse(localStorage.getItem(socio_email.value));
    compras_en_carrito = recu_compras || [];
    total = 0;
    contador_items = 0;
    compras_en_carrito.forEach((compra) => {
        const { price } = compra;
        total = parseFloat(total) + parseFloat(price);
        contador_items++;
    });
    total = total.toFixed(2);
    loadHtml();
}
