'use strict'

async function validarLogin() {
    const email = document.getElementById('email').value
    const senha = document.getElementById('senha').value
    console.log(senha);
    if (email == '' || senha == '' || email==null || email==undefined  || senha==null || senha==undefined ) {
        alert('Preencha os campos corretamente')
    }
    else{
    try {
        // const responseApi = await fetch('http://localhost:5080/funcionario')
        // const listUsers = await responseApi.json()
        
        
        // listUsers.forEach((usuario) => {
            if (email ==! /*usuario.email*/'adm@adm' || email==!''|| senha ==! /*usuario.senha*/'123' || senha==!'') {
                alert('Email ou senha incorretos')
            }
            else {
                // localStorage.setItem('idusuario', usuario.id)
                window.location.href = './html/home.html'
            }
        // })
    }
    catch (error) {
        console.error(error)
    }
}
}