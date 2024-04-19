document.addEventListener('DOMContentLoaded', function () {

    document.getElementById('bntEntrar').addEventListener('click', function (event) {
        event.preventDefault();

        const email = document.getElementById('email').value
        const senha = document.getElementById('senha').value
        
        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                senha: senha
            })
        })
        .then(response => response.json())
        .then(data => { 
            console.log(data);

            if (!data.error && data.token.perfil=='admin' ) {
                console.log('teste 1');
                window.location.href = "../views/PerfilAdmin.html";
            }
            else if (!data.error && data.token.perfil=='cliente' ) {
                console.log('teste 1');
                window.location.href = "../views/Perfil.html";
            }
            
        })
        .catch(error => { console.log(error); });
    });
});
