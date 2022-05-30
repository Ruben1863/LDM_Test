/*
Simple users 'database' with all register and login funcs (if page is refreshed users registered will be deleted)
*/

var users = [] //Array of stored users

var loginIsShown = false
var registerIsShown = false

function showRegister() {
    var registerDiv = document.getElementById('registerDiv')

    if(registerDiv.classList.contains('registerDesplegado')) {
        registerDiv.classList.replace('registerDesplegado', 'registerLoginOculto')
        registerIsShown = false
    } else {
        if(loginIsShown) {
            showLogin()
        }
        registerIsShown = true
        registerDiv.classList.replace('registerLoginOculto', 'registerDesplegado')
    }
    showAside()
}

function showLogin() {
    var loginDiv = document.getElementById('loginDiv')

    if(loginDiv.classList.contains('registerDesplegado')) {
        loginDiv.classList.replace('registerDesplegado', 'registerLoginOculto')
        loginIsShown = false
    } else {
        if(registerIsShown) {
            showRegister()
        }
        loginIsShown = true
        loginDiv.classList.replace('registerLoginOculto', 'registerDesplegado')
    }
    showAside()
}

function register(username, password) {
    for(var i = 0; i < users.length; i++) {
        var parsedUser = users[i].user
        if(parsedUser === username) {
            return writeResultOnPage(false, 'Registro')
        }
    }

    users.push({user: username, password: password})
    return writeResultOnPage(true, 'Registro')
}

function login(username, password) {
    for(var i = 0; i < users.length; i++) {
        var parsedUser = users[i].user
        var parsedPass = users[i].password
        if(parsedUser === username && parsedPass === password) {
            //writeResultOnPage(true, 'Login')
            return loginCompleted(username)
        }
    }

    writeResultOnPage(false, 'Login')
}

function writeResultOnPage(result, tipo, msg) {
    var span = document.getElementById('login-span')

    if(msg != null) {
        if(result === true) {
            if(span.classList.contains('incorrecto')) {
                span.classList.remove('incorrecto')
            }
            span.classList.add('correcto')
            span.textContent = tipo + ' correcto: ' + msg
        } else {
            if(span.classList.contains('correcto')) {
                span.classList.remove('correcto')
            }
            span.classList.add('incorrecto')
            span.textContent = tipo + ' incorrecto: ' + msg
        }
    } else {
        if(result === true) {
            if(span.classList.contains('incorrecto')) {
                span.classList.remove('incorrecto')
            }
            span.classList.add('correcto')
            span.textContent = tipo + ' correcto'
        } else {
            if(span.classList.contains('correcto')) {
                span.classList.remove('correcto')
            }
            span.classList.add('incorrecto')
            span.textContent = tipo + ' incorrecto'
        }
    }
}

function enviar(type) {
    var usrReg = document.getElementById('inputUsuarioReg')
    var passwdReg = document.getElementById('inputPasswdReg')
    var passwdRepeatReg = document.getElementById('inputPasswdRepeatReg')

    var usrLog = document.getElementById('inputUsuarioLog')
    var passwdLog = document.getElementById('inputPasswdLog')

    if(type === 'reg') {
        if(usrReg != null && passwdReg != null && passwdRepeatReg != null) {
            if(passwdReg.value === passwdRepeatReg.value) {
                register(usrReg.value, passwdReg.value, passwdRepeatReg.value)
                reset(type)
                setTimeout(resetSpan, 4000)
            } else {
                writeResultOnPage(false, 'Registro', 'Las contraseñas no coinciden')
                reset(type)
                setTimeout(resetSpan, 4000)
            }
        } else {
            writeResultOnPage(false, 'Registro', 'Faltan campos por rellenar')
            reset(type)
            setTimeout(resetSpan, 4000)
        }
    } else {
        if(usrLog != null && passwdLog != null) {
            login(usrLog.value, passwdLog.value)
            reset(type)
            setTimeout(resetSpan, 4000)
        } else {
            writeResultOnPage(false, 'Login', 'Faltan campos por rellenar')
            reset(type)
            setTimeout(resetSpan, 4000)
        }
    }
}

function reset(type) {
    if(type == 'reg') {
        var usrReg = document.getElementById('inputUsuarioReg')
        var passwdReg = document.getElementById('inputPasswdReg')
        var passwdRepeatReg = document.getElementById('inputPasswdRepeatReg')

        showRegister()

        usrReg.value = null
        passwdReg.value = null
        passwdRepeatReg.value = null
    } else {
        var usrLog = document.getElementById('inputUsuarioLog')
        var passwdLog = document.getElementById('inputPasswdLog')
    
        showLogin()
    
        usrLog.value = null
        passwdLog.value = null
    }
}

function resetSpan() {
    var span = document.getElementById('login-span')
    span.textContent = null
}

function loginCompleted(username) {
    var loginButtons = document.getElementById('loginButtons')
    var spanLoggedUser = document.getElementById('logged-user')

    loginButtons.classList.remove('loginButtonsDesplegado')
    loginButtons.classList.add('loginButtonsOculto')
    // Doesnt work for some reason
    //loginButtons.classList.replace('loginButtonsDesplegado', 'loginButtonsOculto')
    spanLoggedUser.textContent = spanLoggedUser.textContent.concat(username)
    spanLoggedUser.removeAttribute('hidden')
    resetSpan()
}

function desplegarNav() {
    var navBar = document.getElementById('navBar')
    var boton = document.getElementById('boton-desplegar')

    if(navBar.classList.contains('desplegado')) {
        boton.classList.replace('boton-cerrar','boton-lista')
        navBar.classList.replace('desplegado','oculto')
        showAside()
    } else {
        boton.classList.replace('boton-lista','boton-cerrar')
        navBar.classList.replace('oculto','desplegado')
        showAside()
    }
}

function showAside() {
    var aside = document.getElementById('aside')
    var navBar = document.getElementById('navBar')
    var registerDiv = document.getElementById('registerDiv')
    var loginDiv = document.getElementById('loginDiv')

    var b1 = navBar.classList.contains('desplegado')
    var b2 = registerDiv.classList.contains('registerDesplegado')
    var b3 = loginDiv.classList.contains('registerDesplegado')

    if(b1 || b2 || b3) {
        return aside.classList.add('oculto')
    } else {
        return aside.classList.remove('oculto')
    }
}