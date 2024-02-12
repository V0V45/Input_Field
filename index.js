// ПЕРЕМЕННЫЕ
const enterButton = document.getElementById('submitButton'); // кнопка Войти
const rememberButton = document.getElementById('rememberButton'); // кнопка Запомнить
const checkboxImage = document.getElementById('rememberButtonImage'); // картинка кнопки Запомнить
const loginInput = document.getElementById('login__input'); // поле логина
let isLoginSaved; // сохранен ли логин?

// ФУНКЦИИ
function makeCheckboxEmpty() { // меняет картинку чекбокса на пустую
    checkboxImage.src = "images/checkbox-empty.png";
}

function makeCheckboxWithMark() { // меняет картинку чекбокса на пустую с галочкой
    checkboxImage.src = "images/checkbox-hover.png";
}

function makeCheckboxActive() { // меняет картинку чекбокса на активную
    checkboxImage.src = "images/checkbox-active.png";
}

function makeCheckboxActiveWithoutBackground() { // меняет картинку чекбокса на активную, но пустую
    checkboxImage.src = 'images/checkbox-active-hover.png';
}

function saveData() { // сохранить данные в локальным хранилище о логине
    localStorage.setItem('savedLogin', loginInput.value);
}

function makeButtonActive() { // делает чекбокс активным
    rememberButton.removeEventListener('mouseleave', makeCheckboxEmpty); // удаляем старую анимацию
    rememberButton.removeEventListener('mouseenter', makeCheckboxWithMark); // удаляем старую анимацию
    rememberButton.removeEventListener('click', makeButtonActive); // удаляем старую анимацию
    makeCheckboxActive(); // меняем картинку на активную
    isLoginSaved = 'true'; // флажок о том, что логин сохраняется. Строка, потому что при загрузке страницы она преобразуется в boolean
    localStorage.setItem('isLoginSaved', isLoginSaved); // сохраняем данные о флажке в локальном хранилище
    saveData(); // сохраняем текущее значение (на случай, если оно уже было введено и изменяться не будет)
    loginInput.addEventListener('change', saveData); // сохраняем текущее значение (на случай, если сначала была нажата галочка, а потом значение будет меняться)
    rememberButton.addEventListener('mouseenter', makeCheckboxActiveWithoutBackground); // добавляем анимацию наведения
    rememberButton.addEventListener('mouseleave', makeCheckboxActive); // добавляем анимацию убирания мышки
    rememberButton.addEventListener('click', makeButtonUnactive); // при нажатии чекбокс снимается
}

function makeButtonUnactive() { // делает чекбокс неактивным
    rememberButton.removeEventListener('mouseenter', makeCheckboxActiveWithoutBackground); // удаляем старую анимацию
    rememberButton.removeEventListener('mouseleave', makeCheckboxActive); // удаляем старую анимацию
    rememberButton.removeEventListener('click', makeButtonUnactive); // удаляем старую анимацию
    loginInput.removeEventListener('change', saveData); // больше не следим за изменениями логина
    makeCheckboxEmpty(); // делаем чекбокс пустым
    localStorage.removeItem('savedLogin'); // из локального хранилища удаляем данные о сохраненном логине
    isLoginSaved = ''; // флажок о том, что логин не сохраняется. Строка, потому что при загрузке страницы она преобразуется в boolean
    localStorage.setItem('isLoginSaved', isLoginSaved); // сохраняем флажок в локальном хранилище
    rememberButton.addEventListener('mouseenter', makeCheckboxWithMark); // добавляем анимацию наведения
    rememberButton.addEventListener('mouseleave', makeCheckboxEmpty); // добавляем анимацию убирания мышки
    rememberButton.addEventListener('click', makeButtonActive); // при нажатии чекбокс появляется
}

function loadLogin() { // загрузка данных о состоянии чекбокса и данных о логине
    isLoginSaved = Boolean(localStorage.getItem('isLoginSaved')); // достаем данные о том, сохранен ли логин
    if (isLoginSaved === true) { // если сохранен
        loginInput.value = localStorage.getItem('savedLogin'); // получаем данные о логине
        makeCheckboxActive(); // чекбокс становится активным
        loginInput.addEventListener('change', saveData); // при любом изменении логина мы его заново сохраняем
        rememberButton.addEventListener('mouseenter', makeCheckboxActiveWithoutBackground); // добавляем анимацию наведения мыши на чекбокс
        rememberButton.addEventListener('mouseleave', makeCheckboxActive); // добавляем анимацию, когда мышь убегает с чекбокса
        rememberButton.addEventListener('click', makeButtonUnactive); // при нажатии делаем чекбокс неактивным
    } else { // если не сохранен
        loginInput.value = ''; // поле логина делаем пустым
        localStorage.setItem('savedLogin', null); // удаляем из памяти логин
        makeCheckboxEmpty(); // чекбокс становится неактивным
        loginInput.removeEventListener('change', saveData); // при изменении поле логина мы больше ничего не контроллируем
        rememberButton.addEventListener('mouseenter', makeCheckboxWithMark); // добавляем анимацию наведения мыши на чекбокс
        rememberButton.addEventListener('mouseleave', makeCheckboxEmpty); // добавляем анимацию, когда мышь убегает с чекбокса
        rememberButton.addEventListener('click', makeButtonActive); // при нажатии делаем чекбокс активным
    }
}

// ХОД СКРИПТА - НАЧАЛЬНЫЕ ЗНАЧЕНИЯ
loadLogin(); // загружаем данные о чекбоксе