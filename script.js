const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');
const signInBtn = document.getElementById('signInBtn');

// Храним ТОЛЬКО пользователей
const users = [];

// Переключение экранов
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

    users.push({ name, email, password });
    alert("Регистрация успешна!");

    // очистка
    document.querySelector('.sign-up input[type="text"]').value = '';
    document.querySelector('.sign-up input[type="email"]').value = '';
    document.querySelector('.sign-up input[type="password"]').value = '';

    container.classList.remove("active");
});

// SIGN IN — вход
signInBtn.addEventListener('click', () => {
    const email = document.querySelector('.sign-in input[type="email"]').value.trim();
    const password = document.querySelector('.sign-in input[type="password"]').value.trim();

    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        alert("Неправильно, попробуйте еще!");
        return;
    }

    // Показываем ТОЛЬКО имя пользователя
    const overlay = document.createElement('div');
    overlay.className = 'fullscreen-name-list';
    overlay.innerHTML = `Здорова, ${user.name}! 👋`;

    document.body.appendChild(overlay);

    overlay.addEventListener('click', () => overlay.remove());
});
