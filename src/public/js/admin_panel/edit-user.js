const submit_edit = document.getElementById("submit-edit-role");
submit_edit.addEventListener('click', (e) => {
    e.preventDefault();

    const edit_form = document.forms['form-edit-role'];

    const name = edit_form['name-edit-role'].value;
    const email = edit_form['email-edit-role'].value;
    const role = edit_form['role-edit-role'].value;
    const number = edit_form['number-edit-role'].value;
    const endereco = edit_form['endereco-edit-role'].value;
    console.log("COISAS:");
    console.log(name, email, role, number, endereco);
    // login(email, password);
});