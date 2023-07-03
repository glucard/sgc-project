function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
const access_token = getCookie('access_token');

async function create_curso(name, ch){

    const fetch_json = {
        method: "POST",
        body: JSON.stringify({
            "nome": name,
            "ch": ch,
            "categoria_ids": [],
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "authorization": `Bearer ${access_token}`,
        }
    };
    const response = await fetch(`http://localhost:3000/cursos`, fetch_json);
    console.log(response)
    if (response.status == 201){
        alert("Criado com sucesso");
    }else {
        alert("error")
    }
    location.reload()
}

async function fill_screen(){
    const submit_create_course = document.getElementById("submit_criar_curso");
    console.log(submit_create_course);
    submit_create_course.addEventListener('click', (e) => {
        e.preventDefault();
    
        const course_form = document.forms["criar_curso"];
        
        const name = course_form.elements["nome"].value;
        const ch = course_form.elements["ch"].value;
        console.log(name, ch);
        create_curso(name, ch);
    });
}

fill_screen()