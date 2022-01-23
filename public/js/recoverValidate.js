const regExEmail = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/
const regPassword = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/

window.addEventListener("load", function(){

    let errores = [];
    let emailErrors = [];
    let passwordErrors = [];

    let loginForm = document.querySelector('form');

    //Email
        let email = document.querySelector('#email');

        function emailValidator(email, emailErrors){
            emailErrors = [];
            if(email.value == ''){
                emailErrors.push('Debe ingresar un email');
            } else if (email.value != "" && !regExEmail.test(email.value)){
                emailErrors.push('Debe ser un email valido');
            } else {
                emailErrors = [];
            }

            email.addEventListener('blur', function() {
                let error = document.querySelector('.emailInput .frontError p');
                if(emailErrors.length > 0){
                    emailErrors = emailErrors.filter( function( item, index, inputArray ) {
                        return inputArray.indexOf(item) == index;
                    });
                    error.innerHTML = emailErrors;
                }
                else
                    error.innerHTML = "";
            });
        }

        email.addEventListener('focus', function(){
            emailValidator(email, emailErrors);
        });
        email.addEventListener('change', function(){
            emailValidator(email, emailErrors);
        });


    //Password
        let password = document.querySelector('#password');

        function passwordValidator(password, passwordErrors){
            passwordErrors = [];
            if(password.value == ''){
                passwordErrors.push('Debe ingresar una contraseña');
            } else if (password.value != "" && !regPassword.test(password.value)){
                passwordErrors.push('La contraseña debe contener entre 8 y 16 caracteres y al menos un número y una mayúscula');
            } else {
                passwordErrors = [];
            }

            password.addEventListener('blur', function() {
                let error = document.querySelector('.passwordInput .frontError p');
                if(passwordErrors.length > 0){
                    passwordErrors = passwordErrors.filter( function( item, index, inputArray ) {
                        return inputArray.indexOf(item) == index;
                    });
                    error.innerHTML = passwordErrors;
                }
                else
                    error.innerHTML = "";
            });
        }

        password.addEventListener('focus', function(){
            passwordValidator(password, passwordErrors);
        });
        password.addEventListener('change', function(){
            passwordValidator(password, passwordErrors);
        });



    loginForm.addEventListener('submit', function(e) {
        errores = [];

        let frontErrors = document.querySelectorAll('.frontError p');
        frontErrors.forEach(function(item, index) {
            if(frontErrors[index].innerText != "")
                errores.push(frontErrors[index].innerText);
        })

        errores = errores.filter( function( item, index, inputArray ) {
            return inputArray.indexOf(item) == index;
        });

        if(errores.length > 0){
            e.preventDefault();
            errores.forEach(function(item, index) {
                errores[index] = item + "\n";
            })
            alert(errores.join(""));
        }
    });

})