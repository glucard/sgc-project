function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

async function edit_role(id, name, email, role, number, endereco){
    const fetch_json = {
        method: "PATCH",
        body: JSON.stringify({
            "name": name,
            "email": email,
            "role": role,
            "number": number,
            "endereco": endereco,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "authorization": token,
        }
    };
    console.log(fetch_json);
    const response = await fetch(`http://localhost:3000/users/${id}`, fetch_json);
    console.log(response)
    alert("Editado com sucesso");
    location.reload()
}

const submit_edit = document.getElementById("submit-edit-role");
submit_edit.addEventListener('click', (e) => {
    e.preventDefault();

    const edit_form = document.forms['form-edit-role'];

    const id = edit_form['id-edit-role'].value;
    const name = edit_form['name-edit-role'].value;
    const email = edit_form['email-edit-role'].value;
    const role = edit_form['role-edit-role'].value;
    const number = edit_form['number-edit-role'].value;
    const endereco = edit_form['endereco-edit-role'].value;

    console.log("COISAS:");
    console.log(id, name, email, role, number, endereco);

    edit_role(id, name, email, role, number, endereco);
});
