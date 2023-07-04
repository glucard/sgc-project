function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
token_r = token.replace(/%20/g, " ");
async function edit_curso(id, nome, imagem, ch, descricao, categories_ids){
    const fetch_json = {
        method: "PATCH",
        body: JSON.stringify({
            "nome": nome,
            "imagem": imagem,
            "ch": ch,
            "descricao": descricao,
            "categoria_ids": categories_ids,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "authorization": token_r,
        }
    };
    console.log(fetch_json.body);
    const response = await fetch(`http://localhost:3000/cursos/${id}`, fetch_json);
    console.log(token_r)
    alert("Editado com sucesso");
    location.reload()
}

const submit_edit = document.getElementById("submit-edit-curso");
submit_edit.addEventListener('click', (e) => {
    e.preventDefault();

    const edit_form = document.forms['form-edit-curso'];

    const id = edit_form['id-edit-curso'].value;
    const nome = edit_form['nome-edit-curso'].value;
    const imagem = edit_form['imagem-edit-curso'].value;
    const ch = parseInt(edit_form['ch-edit-curso'].value);
    const descricao = edit_form['descricao-edit-curso'].value;

    var course_categories = document.getElementsByName("categoria-edit-curso");

    categories_ids = []

    course_categories.forEach(category => {
        categories_ids.push(parseInt(category.value))
    });

    //update_course(course_name, course_ch, categories_ids)

    console.log("COISAS:");
    console.log(id, nome, imagem, ch, descricao, categories_ids);

    edit_curso(id, nome, imagem, ch, descricao, categories_ids);
});



// var submit_update_course = document.getElementById('submit-edit-curso');

// submit_update_course.addEventListener('click', function(event) {
//     event.preventDefault();
    
//     var course_form = document.forms["curso_edit"];
    
//     var course_name = course_form.elements["nome"].value;
//     var course_ch = course_form.elements["ch"].value;
//     var course_categories = document.getElementsByName("categoria");

//     console.log(course_name, course_ch)

//     categories_ids = []

//     course_categories.forEach(categorie => {
//         categories_ids.push(parseInt(categorie.value))
//     });

//     update_course(course_name, course_ch, categories_ids)
// });

// var submit_new_category = document.getElementById('submit_new_category');

// submit_new_category.addEventListener('click', function(event) {
//     event.preventDefault();

//     div_categories = document.getElementById('categorias')

//     var course_categories_len = document.getElementsByName("categoria").length;
    
//     new_html = `
//         <div>
//         <select name="categoria" id="categoria_${course_categories_len}" placeholder="Categoria" required>
//             ${categorias.map(
//                 c => 
//                     `<option value="${c.id}">${c.nome}</option>`
//                 ).join('')
//             }
//         </select>
//         <button id="submit_remove_category" class="btn-remove">Remove</button>
//         </div>
//     `
    
//     div_categories.innerHTML = div_categories.innerHTML + new_html;
    

    
//     var submit_delete_course = document.getElementsByClassName(`btn-remove`);
//     for (let submit of submit_delete_course) {
//         console.log(submit)
    
//         submit.addEventListener('click', function(e) {
//             e.preventDefault();
//             console.log(e.currentTarget.parentNode.remove())
//         })
//     }
// })

// var submit_delete_course = document.getElementsByClassName(`btn-remove`);
// for (let submit of submit_delete_course) {
//     console.log(submit)

//     submit.addEventListener('click', function(e) {
//         e.preventDefault();
//         console.log(e.currentTarget.parentNode.remove())
//     })
// }