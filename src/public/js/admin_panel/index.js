function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

token_r = token.replace(/%20/g, " ");

async function add_curso(nome, imagem, ch, descricao, categories_ids){
  const fetch_json = {
      method: "POST",
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
  const response = await fetch(`http://0.0.0.0:3000/cursos/`, fetch_json);
  console.log(token_r)
  alert("Criado com sucesso");
  location.reload()
}

const submit_add = document.getElementById("submit-create-curso");
submit_add.addEventListener('click', (e) => {
  e.preventDefault();

  const add_form = document.forms['form-create-curso'];

  const nome = add_form['nome-create-curso'].value;
  const imagem = add_form['imagem-create-curso'].value;
  const ch = parseInt(add_form['ch-create-curso'].value);
  const descricao = add_form['descricao-create-curso'].value;

  var course_categories = document.getElementsByName("categoria-create-curso");

  categories_ids = [];

  course_categories.forEach(category => {
      categories_ids.push(parseInt(category.value))
  });

  //update_course(course_name, course_ch, categories_ids)

  console.log("COISAS:");
  console.log(nome, imagem, ch, descricao, categories_ids);

  add_curso(nome, imagem, ch, descricao, categories_ids);
});


async function add_categoria(nome, descricao){
  const fetch_json = {
      method: "POST",
      body: JSON.stringify({
          "nome": nome,
          "descricao": descricao,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "authorization": token_r,
      }
  };
  console.log(fetch_json.body);
  const response = await fetch(`http://0.0.0.0:3000/categoria/create`, fetch_json);
  console.log(token_r)
  alert("Criado com sucesso");
  location.reload()
}

const submit_add_categoria = document.getElementById("submit-create-categoria");
submit_add_categoria.addEventListener('click', (e) => {
  e.preventDefault();

  const add_form = document.forms['form-create-categoria'];

  const nome = add_form['nome-create-categoria'].value;
  const descricao = add_form['descricao-create-categoria'].value;

  console.log("COISAS:");
  console.log(nome, descricao);

  add_categoria(nome, descricao);
});

