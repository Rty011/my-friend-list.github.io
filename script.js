const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');
const signInBtn = document.getElementById('signInBtn');

// Заранее заданный список имён
const defaultNames = ["Абдыразак", "Эрхан", "Айсиф", "Салиев", "Сардор", "Азиз", "Абдумажит"];

// Список зарегистрированных пользователей
const users = [];

// Переключение форм
registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

// SIGN UP - регистрация нового пользователя
document.querySelector('.sign-up button').addEventListener('click', () => {
    const name = document.querySelector('.sign-up input[type="text"]').value.trim();
    const email = document.querySelector('.sign-up input[type="email"]').value.trim();
    const password = document.querySelector('.sign-up input[type="password"]').value.trim();

    if (!name || !email || !password) {
        alert("Пожалуйста, заполните все поля!");
        return;
    }

    if (users.some(u => u.email === email)) {
        alert("Пользователь с таким email уже существует!");
        return;
    }

    users.push({ name, email, password });
    alert("Регистрация успешна! Теперь можно войти.");

    // Очистка полей
    document.querySelector('.sign-up input[type="text"]').value = '';
    document.querySelector('.sign-up input[type="email"]').value = '';
    document.querySelector('.sign-up input[type="password"]').value = '';
});

// SIGN IN - проверка данных и показ списка имён
signInBtn.addEventListener('click', () => {
    const email = document.querySelector('.sign-in input[type="email"]').value.trim();
    const password = document.querySelector('.sign-in input[type="password"]').value.trim();

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        // Создаем overlay с именами всех пользователей + default
        const overlay = document.createElement('div');
        overlay.classList.add('fullscreen-name-list');
        const allNames = defaultNames.concat(users.map(u => u.name));
        overlay.innerHTML = "Здорова!<br>" + allNames.join(", ");

        document.body.appendChild(overlay);

        overlay.addEventListener('click', () => {
            document.body.removeChild(overlay);
        });

        // Очистка полей входа
        document.querySelector('.sign-in input[type="email"]').value = '';
        document.querySelector('.sign-in input[type="password"]').value = '';
    } else {
        alert("Неправильно, попробуйте еще!");
    }
});
