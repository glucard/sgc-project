const btns = document.querySelectorAll('.btns-login button')
const allInputs = document.querySelectorAll('.ct-input input')
const inputsCriarConta = document.querySelectorAll('#criar .ct-input input')
const alertas = document.querySelectorAll('.alert')
const submitBtn = document.querySelector('#submit-conta')
const inputSenhaRpt = document.querySelector('#senharpt')
const termosInput = document.querySelector('#termos')
const btnDarkmode = document.querySelector('.lightdarkmode')
let inputField

//A senha deve possuir, ao menos, 10 caracteres. Letras maiusculas e minusculas (obrigatorio), caracteres especiais (@:;<.>/*-+_+(*%¨&*()||\'"!@#$$%"), e umnumero, 
const regex = {
    usuario: /^\w{5,}/,
    email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    senha: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
    senharpt: undefined
}

allInputs.forEach((item) => {
item.addEventListener('keydown', (k) => {
    if (k.keyCode === 32) {
        k.preventDefault()
    }
})
})

function changeForm(i){

    for (let form of document.forms) form.classList.remove('ativo')
    for (let btn of btns) btn.classList.remove('ativo')

    document.forms[i].classList.add('ativo')
    btns[i].classList.add('ativo')

}

btns.forEach((item, index) => {

    item.addEventListener('click', () => {
        changeForm(index)
    })

})


function contemClasse(classe) {
    return inputField.classList.contains(classe);
}

function eliminarClasse(classe) {
    inputField.classList.remove(classe);
}    


function validateInput(input, index) {

    const { value, id } = input;
    inputField = input.parentElement;

    if (contemClasse('invalido')) eliminarClasse('invalido');
    if (contemClasse('valido')) eliminarClasse('valido');

    if (regex[id]) {
        if (!(value).match(regex[id])) {
            alertas[index].style.display = 'block';
            inputField.classList.add('invalido');
        } else {
            alertas[index].style.display = 'none';
            inputField.classList.add('valido');
        }
    }

    if (id === 'senha') {
        regex.senharpt = new RegExp('^' + value + '$');
        validateInput(inputSenhaRpt, 3)
    }
}

inputsCriarConta.forEach((input, index) => 
    input.addEventListener('change', (event) =>
        validateInput(event.target, index)
    )
)


async function create_account(name, email, password){
    const fetch_json = {
        method: "POST",
        body: JSON.stringify({
            "name": name,
            "email": email,
            "password": password,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
    };
    console.log(fetch_json);
    const response = await fetch(`http://localhost:3000/users/create`, fetch_json);
    const reponse_json = await response.json()
    if (reponse_json.name){
        alert("Conta criada com sucesso");
        window.location.replace("/users/page/login");
    }else {
        alert("Não foi possivel criar conta.")
    }
}

function submitForm(event) {
    event.preventDefault()  

    inputsCriarConta.forEach((input,index) => validateInput(input, index));

    const arrayInputs = Array.from(inputsCriarConta)

    function isInvalid(element) {
        return element.parentElement.classList.contains('invalido')
    }

    console.log(arrayInputs)
    if (arrayInputs.some(isInvalid) || !termosInput.checked) {
        console.log("invalid")
    } else {

        const criar_form = document.forms['criar-conta'];
    
        const name = criar_form['usuario'].value;
        const email = criar_form['email'].value;
        const password = criar_form['senha'].value;
        
        create_account(name, email, password);
        
    }
}

submitBtn.addEventListener('click', submitForm)


// lightmode e darkmode 


/*
function changeMode() {
    document.body.classList.toggle('darkmode');
}

btnDarkmode.addEventListener('click', changeMode)
*/

async function login(email, password){
    const fetch_json = {
        method: "POST",
        body: JSON.stringify({
            "email": email,
            "password": password,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
    };
    console.log(fetch_json);
    const response = await fetch(`http://localhost:3000/users/login`, fetch_json);
    const reponse_json = await response.json()
    if (reponse_json.token){
        alert("logado com sucesso");
        window.location.replace("/");
    }else {
        alert("Conta invalida.")
    }
}

const submit_login = document.getElementById("submit-entrar");
submit_login.addEventListener('click', (e) => {
    e.preventDefault();

    const login_form = document.forms['login'];

    const email = login_form['usuario-entrar'].value;
    const password = login_form['senha-entrar'].value;
    console.log("COISAS:");
    console.log(email, password);
    login(email, password);
});