const regExEmail = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/
const regPassword = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/

window.addEventListener("load", function(){

    let errores = [];
    let nameErrors = [];
    let lastNameErrors = [];
    let emailErrors = [];
    let passwordErrors = [];
    let imageErrors = [];

    let loginForm = document.querySelector('form');

    //Name
        let name = document.querySelector('#name');

        function nameValidator(name, nameErrors){
            if(name.value == ''){
                nameErrors.push('Debe ingresar un nombre');
            } else {
                nameErrors = [];
            }

            name.addEventListener('blur', function() {
                let error = document.querySelector('.fields .frontError p');
                if(nameErrors.length > 0){
                    nameErrors = nameErrors.filter( function( item, index, inputArray ) {
                        return inputArray.indexOf(item) == index;
                    });
                    error.innerHTML = nameErrors;
                }
                else
                    error.innerHTML = "";
            });
        }

        name.addEventListener('focus', function(){
            nameValidator(name, nameErrors);
        });
        name.addEventListener('change', function(){
            nameValidator(name, nameErrors);
        });


    //lastName
        let lastName = document.querySelector('#lastName');

        function lastNameValidator(lastName, lastNameErrors){
            if(lastName.value == ''){
                lastNameErrors.push('Debe ingresar un apellido');
            } else {
                lastNameErrors = [];
            }

            lastName.addEventListener('blur', function() {
                let error = document.querySelector('.fields .frontError2 p');
                if(lastNameErrors.length > 0){
                    lastNameErrors = lastNameErrors.filter( function( item, index, inputArray ) {
                        return inputArray.indexOf(item) == index;
                    });
                    error.innerHTML = lastNameErrors;
                }
                else
                    error.innerHTML = "";
            });
        }

        lastName.addEventListener('focus', function(){
            lastNameValidator(lastName, lastNameErrors);
        });
        lastName.addEventListener('change', function(){
            lastNameValidator(lastName, lastNameErrors);
        });

    
    //Email
    let email = document.querySelector('#email');

    function emailValidator(email, emailErrors){
        if(email.value == ''){
            emailErrors.push('Debe ingresar un email');
        } else if (emailErrors.length > 0 && !regExEmail.test(email.value)){
            emailErrors = [];
            emailErrors.push('Debe ser un email valido');
        } else {
            emailErrors = [];
        }

        email.addEventListener('blur', function() {
            let error = document.querySelector('.fields .frontError3 p');
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
        if(password.value == ''){
            passwordErrors.push('Debe ingresar una contraseña');
        } else if (passwordErrors.length > 0 && !regPassword.test(password.value)){
            passwordErrors = [];
            passwordErrors.push('La contraseña debe contener entre 8 y 16 caracteres, al menos un digito y al menos una mayuscula');
        } else {
            passwordErrors = [];
        }

        password.addEventListener('blur', function() {
            let error = document.querySelector('.fields .frontError4 p');
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


   //Image
   let imagen = document.querySelector('#image');
   function imageValidator(imagen, imageErrors) {
       if(imagen.value == "")
           imageErrors.push("Debe seleccionar una imagen");
       else
           imageErrors = [];

       imagen.addEventListener('blur', function() {
           let error = document.querySelector('.crudImage .frontError5 p');
           if(imageErrors.length > 0){
               imageErrors = imageErrors.filter( function( item, index, inputArray ) {
                   return inputArray.indexOf(item) == index;
               });
               error.innerHTML = imageErrors;
           }
           else
               error.innerHTML = "";
       });
   }
   imagen.addEventListener('focus', function() {
       imageValidator(imagen, imageErrors);
   });
   imagen.addEventListener('change', function() {
       imageValidator(imagen, imageErrors);
   });


    loginForm.addEventListener('submit', function(e) {
        errores = [];
        errores.push.apply(errores, nameErrors);
        errores.push.apply(errores, lastNameErrors);
        errores.push.apply(errores, emailErrors);
        errores.push.apply(errores, passwordErrors);
        errores.push.apply(errores, imageErrors);

        if(errores.length > 0){
            e.preventDefault();
            errores.forEach(function(item, index) {
                errores[index] = item + "\n";
            })
            alert(errores.join(""));
        }
    });

})