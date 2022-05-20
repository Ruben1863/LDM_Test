function desplegarNav() {
    var navBar = document.getElementById('navBar')
    var boton = document.getElementById('boton-desplegar')

    if(navBar.classList.contains('desplegado')) {
        boton.classList.remove('boton-cerrar')
        boton.classList.add('boton-lista')
        navBar.classList.remove('desplegado')
        navBar.classList.add('oculto')
    } else {
        boton.classList.remove('boton-lista')
        boton.classList.add('boton-cerrar')
        navBar.classList.remove('oculto')
        navBar.classList.add('desplegado')
    }
}