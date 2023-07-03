function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

const right_nav = document.getElementById("right_nav");


const token = getCookie('token');
if (token){
    const user_name = getCookie('user_name');
    const new_html = `
        <a href="/users/page/perfil">${user_name}</a>
        <a href="/users/page/logout">Logout</a>
    `;
    right_nav.innerHTML = right_nav.innerHTML + new_html;
} else {
    const new_html = `<a href="/users/page/login">Login</a>`;
    right_nav.innerHTML = right_nav.innerHTML + new_html;
}

const role = getCookie('role');
if (role < 3) {
    const new_html = `<a href="admin">AdminPanel</a>`;
    right_nav.innerHTML = right_nav.innerHTML + new_html;
}