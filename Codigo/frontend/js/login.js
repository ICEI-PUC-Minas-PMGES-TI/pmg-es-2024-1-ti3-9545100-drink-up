document.addEventListener('DOMContentLoaded', function () {

    const btnEntrar = document.getElementById('bntEntrar');
    const emailInput = document.getElementById('email');
    const senhaInput = document.getElementById('senha');
    const loginError = document.getElementById('loginError');

    btnEntrar.addEventListener('click', function (event) {
        event.preventDefault();
        login();
    });

    senhaInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            login();
        }
    });

    emailInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            login();
        }
    });

    function login() {
        const email = emailInput.value;
        const senha = senhaInput.value;

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
            if (!data.error) {
                const token = data.token;
                const parts = token.split('.');
                const payload = JSON.parse(atob(parts[1]));

                sessionStorage.setItem("authorization", data.token);
                sessionStorage.setItem("user_id", payload.user_id);
                
                payload.perfil === 'admin' ? window.location.href = "../views/PerfilAdmin.html" :
                                             window.location.href = "../views/Perfil.html";
            } else {
                loginError.textContent = "Email ou senha inválidos";
                loginError.style.display = "block";
            }
        })
        .catch(error => {
            console.log(error);
            loginError.textContent = "Email ou senha inválidos";
            loginError.style.display = "block";
        });
    }
});
