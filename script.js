const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');
const signInBtn = document.getElementById('signInBtn');

// получаем пользователей из localStorage
let users = JSON.parse(localStorage.getItem('users')) || [];

// переключение экранов
registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

// SIGN UP — регистрация
document.querySelector('.sign-up button').addEventListener('click', () => {
    const name = document.querySelector('.sign-up input[type="text"]').value.trim();
    const email = document.querySelector('.sign-up input[type="email"]').value.trim();
    const password = document.querySelector('.sign-up input[type="password"]').value.trim();

    if (!name || !email || !password) {
        alert("Заполните все поля!");
        return;
    }

    if (users.some(u => u.email === email)) {
        alert("Такой email уже зарегистрирован!");
        return;
    }

    const user = { name, email, password };
    users.push(user);

    // сохраняем в localStorage
    localStorage.setItem('users', JSON.stringify(users));

    // сохраняем последнего пользователя
    localStorage.setItem('lastUser', JSON.stringify(user));

    alert("Регистрация успешна!");

    container.classList.remove("active");
});

// SIGN IN — вход
signInBtn.addEventListener('click', () => {
    const email = document.querySelector('.sign-in input[type="email"]').value.trim();
    const password = document.querySelector('.sign-in input[type="password"]').value.trim();

    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        alert("Неправильный email или пароль!");
        return;
    }

    // сохраняем последнего вошедшего пользователя
    localStorage.setItem('lastUser', JSON.stringify(user));

    const overlay = document.createElement('div');
    overlay.className = 'fullscreen-name-list';
    overlay.innerHTML = `Здорова, ${user.name}! 👋`;

    document.body.appendChild(overlay);
    overlay.addEventListener('click', () => overlay.remove());
});

// 🔥 автозаполнение при загрузке страницы
window.addEventListener('load', () => {
    const lastUser = JSON.parse(localStorage.getItem('lastUser'));
    if (lastUser) {
        document.querySelector('.sign-in input[type="email"]').value = lastUser.email;
        document.querySelector('.sign-in input[type="password"]').value = lastUser.password;
    }
});
