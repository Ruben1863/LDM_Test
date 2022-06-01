function loadPosts() {
    var botonAside = document.getElementById('boton-aside')
    var postsDiv = document.getElementById('div-posts')
    var posts = document.getElementById('posts').getElementsByTagName('article')
    var tmp = postsDiv.getElementsByTagName('a')

    if(tmp.length > 0) {
        if(postsDiv.classList.contains('oculto-posts')) {
            postsDiv.classList.replace('oculto-posts','div-posts')
            botonAside.classList.replace('asideDesplegar','asideReplegar')
            var width = postsDiv.offsetWidth
            botonAside.style.right = width + 'px'
            return;
        } else {
            postsDiv.classList.replace('div-posts','oculto-posts')
            botonAside.classList.replace('asideReplegar','asideDesplegar')
            botonAside.style.right = 0 + 'px'
            return;
        }
    }

    for(var i = 0; i < posts.length; i++) {
        var contenido = posts[i].getElementsByTagName('a')[0].outerHTML
        var htmlToWrite = document.createElement('div')
        htmlToWrite.innerHTML = contenido 
        postsDiv.append(htmlToWrite)
    }
    
    postsDiv.classList.replace('oculto-posts','div-posts')
    botonAside.classList.replace('asideDesplegar','asideReplegar')
    var width = postsDiv.offsetWidth
    botonAside.style.right = width + 'px'
}