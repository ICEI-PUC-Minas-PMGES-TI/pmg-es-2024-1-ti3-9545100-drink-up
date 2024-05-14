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

            if(!data.error){
                const token = data.token;
                const parts = token.split('.');
                const payload = JSON.parse(atob(parts[1]));

                sessionStorage.setItem("authorization", data.token);
                sessionStorage.setItem("user_id", payload.user_id);
                
                payload.perfil=='admin'?window.location.href = "../views/PerfilAdmin.html":
                                           window.location.href = "../views/Perfil.html";
            }      
        })
        .catch(error => { console.log(error); });
    });
});
