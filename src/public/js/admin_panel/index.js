function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

const role = getCookie('role');

const users_role_panel = document.getElementById("users-role-panel");

if (role){
    if (role == 1){
        users_role_panel.innerHTML += `

        `
    }
}