const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');
const signInBtn = document.getElementById('signInBtn');

const users = [];

// переключение экранов
registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

// регистрация
document.querySelector('.sign-up button').addEventListener('click', () => {
    const name = document.querySelector('.sign-up input[type="text"]').value.trim();
    const email = document.querySelector('.sign-up input[type="email"]').value.trim();
    const password = document.querySelector('.sign-up input[type="password"]').value.trim();

    if (!name || !email || !password) {
        alert("Заполни все поля");
        return;
    }

    if (users.some(u => u.email === email)) {
        alert("Email уже существует");
        return;
    }

    users.push({ name, email, password });
    alert("Успешная регистрация");
    container.classList.remove("active");
});

// вход
signInBtn.addEventListener('click', () => {
    const email = document.querySelector('.sign-in input[type="email"]').value.trim();
    const password = document.querySelector('.sign-in input[type="password"]').value.trim();

    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
        alert("Неверные данные");
        return;
    }

    openDashboard();
});

// ================= DASHBOARD =================

let dashboardScreen;

function openDashboard() {
    dashboardScreen = document.createElement('div');
    dashboardScreen.className = 'dashboard-screen';

    dashboardScreen.innerHTML = `
        <div class="dashboard-time" id="dashboardTime"></div>

        <div class="calculator-icon" id="openCalc"></div>
    `;

    document.body.appendChild(dashboardScreen);

    updateDashboardTime();
    setInterval(updateDashboardTime, 1000);

    document.getElementById('openCalc').addEventListener('click', openCalculatorScreen);
}

// ================= TIME =================

function updateDashboardTime() {
    const now = new Date().toLocaleString("ru-RU", {
        timeZone: "Asia/Bishkek",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        day: "2-digit",
        month: "long",
        year: "numeric"
    });
    document.getElementById("dashboardTime").innerText = now;
}

// ================= CALCULATOR SCREEN =================

function openCalculatorScreen() {
    const calcScreen = document.createElement('div');
    calcScreen.className = 'dashboard-screen';

    calcScreen.innerHTML = `
        <button id="backBtn" style="
            position:absolute;
            top:20px;
            left:20px;
            padding:10px 15px;
            border:none;
            border-radius:10px;
            background:#eee;
            cursor:pointer;
        ">⬅ Назад</button>

        <div class="calculator-icon" style="
            top:50%;
            left:50%;
            transform:translate(-50%,-50%);
        ">
            <div class="calc-display" id="calcDisplay">0</div>
            <div class="calc-buttons">
                <button>C</button>
                <button>/</button>
                <button>*</button>
                <button class="orange">-</button>

                <button>7</button>
                <button>8</button>
                <button>9</button>
                <button class="orange">+</button>

                <button>4</button>
                <button>5</button>
                <button>6</button>
                <button class="orange">=</button>

                <button>1</button>
                <button>2</button>
                <button>3</button>
                <button class="wide">0</button>

                <button>.</button>
            </div>
        </div>
    `;

    document.body.appendChild(calcScreen);

    document.getElementById('backBtn').addEventListener('click', () => {
        calcScreen.remove();
    });

    initCalculator();
}

// ================= CALCULATOR LOGIC =================

function initCalculator() {
    const display = document.getElementById('calcDisplay');
    const buttons = document.querySelectorAll('.calc-buttons button');

    let current = '';
    let previous = '';
    let operator = null;

    function update() {
        display.textContent = current || '0';
    }

    function clear() {
        current = '';
        previous = '';
        operator = null;
        update();
    }

    function calculate() {
        const a = parseFloat(previous);
        const b = parseFloat(current);
        if (isNaN(a) || isNaN(b)) return;

        let result;
        switch (operator) {
            case '+': result = a + b; break;
            case '-': result = a - b; break;
            case '*': result = a * b; break;
            case '/': result = b === 0 ? 'Error' : a / b; break;
        }

        current = result.toString();
        operator = null;
        previous = '';
        update();
    }

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const value = btn.textContent;

            if (!isNaN(value) || value === '.') {
                current += value;
                update();
                return;
            }

            if (value === 'C') {
                clear();
                return;
            }

            if (value === '=') {
                calculate();
                return;
            }

            if (operator && current !== '') {
                calculate();
            }

            operator = value;
            previous = current;
            current = '';
        });
    });

    clear();
}


