// ОСНОВНАЯ ЛОГИКА РАБОТЫ СТРАНИЦЫ РЕГИСТРАЦИИ
// ПЕРЕМЕННЫЕ
const emailInput = document.getElementsByClassName('registrationForm__emailLabel__inputField')[0]; // поле ввода e-mail
const nameInput = document.getElementsByClassName('registrationForm__nameLabel__inputField')[0]; // поле ввода имени
const passwordInput = document.getElementsByClassName('registrationForm__passwordLabel__inputField')[0]; // поле ввода пароля
const passwordCheckInput = document.getElementsByClassName('registrationForm__passwordCheckLabel__inputField')[0]; // поле повторного ввода пароля
const emailRegExp = new RegExp('[A-Za-z0-9._-]+@[A-Za-z0-9._-]+\\.[A-Za-z]{2,4}'); // регулярное выражение для почты
const nameRegExp = /^[А-Яа-я-\s]+$/; // регулярное выражение для имени
let emailIsCorrect = false; // правильно ли введен e-mail?
let nameIsCorrect = false; // правильно ли введено имя?
let passwordIs8Characters = false; // пароль больше 8 символов?
let passwordsAreCorresponding = false; // пароли совпадают?
const emailCheckoutP = document.getElementsByClassName('checkout_email')[0]; // строка о том, что почта введена неверно
const nameCheckoutP = document.getElementsByClassName('checkout_name')[0]; // строка о том, что имя введено неверно
const checkoutPassword8P = document.getElementsByClassName('checkout_password8')[0]; // строка о том, что пароль не содержит 8 символов
const checkoutPasswordsCorrespondingP = document.getElementsByClassName('checkout_passwordsCorresponding')[0]; // строка о том, что пароли не совпадают
const theWholeCSS = document.styleSheets[0]; // стили всего документа

// ФУНКЦИИ
function emailValidation(event) { // проверка почты
    if (emailRegExp.test(event.target.value) === true) { // если соответствует регулярному выражению
        emailIsCorrect = true; // ставим флажок что почта верна
        emailInput.classList.remove('invalid'); // убираем "красный" стиль
        emailInput.classList.add('valid'); // добавляем "зеленый стиль"
        emailCheckout(); // убираем текст о том, что почта не верна
    } else { // если не соответствует
        emailIsCorrect = false; // ставим флажок что почта не верна
        emailInput.classList.remove('valid'); // убираем "зеленый" стиль
        emailInput.classList.add('invalid'); // добавляем "красный" стиль
        emailCheckout(); // оставляем или возвращаем текст о том, что почта не верна
    }
}

function nameValidation(event) { // проверка имени
    if (nameRegExp.test(event.target.value) === true) { // если соответствует регулярному выражению
        nameIsCorrect = true; // ставим флажок что имя верное
        nameInput.classList.remove('invalid'); // убираем "красный" стиль
        nameInput.classList.add('valid'); // добавляем "зеленый стиль"
        nameCheckout(); // убираем текст о том, что имя неверное
    } else { // если не соответствует
        nameIsCorrect = false; // ставим флажок что имя неверное
        nameInput.classList.remove('valid'); // убираем "зеленый" стиль
        nameInput.classList.add('invalid'); // добавляем "красный" стиль
        nameCheckout(); // оставляем или возвращаем текст о том, что имя неверное
    }
}

function password8CharactersValidation(event) { // проверка 8-символьного пароля
    if (event.target.value.length >= 8) { // если символов больше или равно 8
        passwordIs8Characters = true; // ставим флажок что пароль верный
        passwordInput.classList.remove('invalid'); // убираем "красный" стиль
        passwordInput.classList.add('valid'); // добавляем "зеленый стиль"
        password8Checkout(); // убираем текст о том, что пароль меньше 8 символов
    } else { // если не соответствует
        passwordIs8Characters = false; // ставим флажок что пароль неверный
        passwordInput.classList.remove('valid'); // убираем "зеленый" стиль
        passwordInput.classList.add('invalid'); // добавляем "красный" стиль
        password8Checkout(); // оставляем или возвращаем текст о том, что пароль меньше 8 символов
    }
}

function passwordsAreCorrespondingValidation(event) { // проверка совпадения паролей
    if (event.target.value === passwordInput.value) { // если пароли двух полей совпадают
        passwordsAreCorresponding = true; // ставим флажок что пароли совпадают
        passwordCheckInput.classList.remove('invalid'); // убираем "красный" стиль
        passwordCheckInput.classList.add('valid'); // добавляем "зеленый стиль"
        passwordCorrespondsCheckout(); // убираем текст о том, что пароли не совпадают
    } else { // если не соответствует
        passwordsAreCorresponding = false; // ставим флажок что пароли не совпадают
        passwordCheckInput.classList.remove('valid'); // убираем "зеленый" стиль
        passwordCheckInput.classList.add('invalid'); // добавляем "красный" стиль
        passwordCorrespondsCheckout(); // оставляем или возвращаем текст о том, что пароли не совпадают
    }
}

function emailCheckout() { // проверяем, надо ли убрать текст о том, что почта неверна, или нет
    if (emailIsCorrect === true) { // если (в соответствии с флажком) почта введена верно
        emailCheckoutP.classList.remove('checkoutInvalid'); // убираем стиль красного текста
        emailCheckoutP.classList.add('checkoutValid'); // убираем текст в принципе (см. стиль)
        fullCheckout(); // делаем полную проверку всех флажков полей для активации/деактивации кнопки "зарегистрироваться"
    } else { // если пока рано удалять текст
        emailCheckoutP.classList.remove('checkoutValid'); // возвращаем видимость текста (см. стиль)
        emailCheckoutP.classList.add('checkoutInvalid'); // возвращаем ему красный стиль
        fullCheckout(); // делаем полную проверку всех флажков полей для активации/деактивации кнопки "зарегистрироваться"
    }
}

function nameCheckout() { // проверяем, надо ли убрать текст о том, что имя введено неверно или нет
    if (nameIsCorrect === true) { // если (в соответствии с флажком) имя введено верно
        nameCheckoutP.classList.remove('checkoutInvalid'); // убираем стиль красного текста
        nameCheckoutP.classList.add('checkoutValid'); // убираем текст в принципе (см. стиль)
        fullCheckout(); // делаем полную проверку всех флажков полей для активации/деактивации кнопки "зарегистрироваться"
    } else { // если пока рано удалять текст
        nameCheckoutP.classList.remove('checkoutValid'); // возвращаем видимость текста (см. стиль)
        nameCheckoutP.classList.add('checkoutInvalid'); // возвращаем ему красный стиль
        fullCheckout(); // делаем полную проверку всех флажков полей для активации/деактивации кнопки "зарегистрироваться"
    }
}

function password8Checkout() { // проверяем, надо ли убрать текст о том, что пароль меньше 8 символов
    if (passwordIs8Characters === true) { // если (в соответствии с флажком) пароль как минимум 8 символов
        checkoutPassword8P.classList.remove('checkoutInvalid'); // убираем стиль красного текста
        checkoutPassword8P.classList.add('checkoutValid'); // убираем текст в принципе (см. стиль)
        fullCheckout(); // делаем полную проверку всех флажков полей для активации/деактивации кнопки "зарегистрироваться"
    } else { // если пока рано удалять текст
        checkoutPassword8P.classList.remove('checkoutValid'); // возвращаем видимость текста (см. стиль)
        checkoutPassword8P.classList.add('checkoutInvalid'); // возвращаем ему красный стиль
        fullCheckout(); // делаем полную проверку всех флажков полей для активации/деактивации кнопки "зарегистрироваться"
    }
}

function passwordCorrespondsCheckout() { // проверяем, надо ли убрать текст о том, что пароли не совпадают
    if (passwordsAreCorresponding === true) { // если (в соответствии с флажком) пароли совпадают
        checkoutPasswordsCorrespondingP.classList.remove('checkoutInvalid'); // убираем стиль красного текста
        checkoutPasswordsCorrespondingP.classList.add('checkoutValid'); // убираем текст в принципе (см. стиль)
        fullCheckout(); // делаем полную проверку всех флажков полей для активации/деактивации кнопки "зарегистрироваться"
    } else { // если пока рано удалять текст
        checkoutPasswordsCorrespondingP.classList.remove('checkoutValid'); // возвращаем видимость текста (см. стиль)
        checkoutPasswordsCorrespondingP.classList.add('checkoutInvalid'); // возвращаем ему красный стиль
        fullCheckout(); // делаем полную проверку всех флажков полей для активации/деактивации кнопки "зарегистрироваться"
    }
}

function fullCheckout() { // проверяем, все ли поля прошли валидацию, чтобы активировать кнопку
    if (emailIsCorrect === true && nameIsCorrect === true && passwordIs8Characters === true && passwordsAreCorresponding === true) {
    // если все поля прошли валидацию
        theWholeCSS.cssRules[0].style.setProperty('--buttonColor', 'rgb(255, 69, 0)'); // изменяем цвет кнопки в CSS на оранжевый
        theWholeCSS.cssRules[0].style.setProperty('--buttonHoverColor', 'rgb(0, 255, 0)'); // изменяем цвет наведения в CSS на зеленый
    } else { // если хотя бы одно поле сломалось
        theWholeCSS.cssRules[0].style.setProperty('--buttonColor', 'rgb(45, 45, 45)'); // изменяем цвет кнопки в CSS на серый
        theWholeCSS.cssRules[0].style.setProperty('--buttonHoverColor', 'rgb(45, 45, 45)'); // и цвет наведения тоже на серый
    }
}

// ХОД ПРОГРАММЫ - НАЧАЛЬНЫЕ ЗНАЧЕНИЯ
emailInput.addEventListener('input', emailValidation); // вешаем обработчик событий на ввод в поле почты (валидация)
nameInput.addEventListener('input', nameValidation); // вешаем обработчик событий на ввод в поле имени (валидация)
passwordInput.addEventListener('input', password8CharactersValidation); // вешаем обработчик событий на ввод в поле пароля (мин. 8 символов)
passwordCheckInput.addEventListener('input', passwordsAreCorrespondingValidation); // вешаем обработчик событий на ввод в поле проверки пароля