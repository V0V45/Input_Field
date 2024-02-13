// ЛОГИКА СМЕНЫ ЯЗЫКА
import ru from "../languages/ru.js"; // импортируем русский язык
import en from "../languages/en.js"; // импортируем английский язык
import i18next from 'https://unpkg.com/i18next@23.8.2/dist/esm/i18next.js'; // подключаем библиотеку i18next

// первичная инициализация
i18next.init({
    lng: 'ru', // первоначальный язык - русский
    fallbackLng: ['en', 'ru'], // список языков - русский и английский
    resources: {
        en, // с импорта
        ru, // с импорта
    }
});

const languageButton = document.getElementById('changeLanguage__btn'); // кнопка смены языка
let language; // переменная языка, на который будем менять
let loginIsSavedText = i18next.t('loginIsSaved'); // первоначальное значение сохраненного логина
let loginIsNotSavedText = i18next.t('loginIsNotSaved'); // первоначальное значение несохраненного логина

function allKeys(t) { // перебираем все данные, которые нам нужно перевести, и назначаем им ключи
    document.getElementById('changeLanguage__btn').innerHTML = t('changeLanguage');
    document.getElementsByClassName('popup__header')[0].innerHTML = t('popupHeader');
    document.getElementsByClassName('popup__caption')[0].innerHTML = t('popupCaption');
    document.getElementsByClassName('login__label')[0].innerHTML = t('loginLabel');
    document.getElementById('login__input').placeholder = t('loginPlaceholder');
    document.getElementsByClassName('password__label')[0].innerHTML = t('passwordLabel');
    document.getElementById('password__input').placeholder = t('passwordPlaceholder');
    document.getElementById('submitButton').innerHTML = t('submitButton');
    document.getElementsByClassName('rememberPrompt__label')[0].innerHTML = t('saveLogin');
    document.getElementsByClassName('registrationPrompt__text')[0].innerHTML = t('registrationPrompt');
    document.getElementsByClassName('registrationPrompt__link')[0].innerHTML = t('registrationLink');
    t('loginIsSaved');
    t('loginIsNotSaved');
}

// обработчик событий на кнопку смены языка
languageButton.onclick = () => {
    if (i18next.language === 'en') { // если текущий язык английский то мы хотим русский после нажатия
        language = 'ru';
    } else { // если текущий язык русский то мы хотим английский после нажатия
        language = 'en';
    }
    i18next.changeLanguage(language, (err, t) => {
        if (err) { // если что-то пошло не так, функция резко прерываетсяс
            return console.log('something went wrong loading', err);
        }
        // назначаем ключи
        allKeys(t);
        // подготавливаем ключи к экспорту
        loginIsSavedText = i18next.t('loginIsSaved'); // так как язык был изменен, то переменные надо перезаписать
        loginIsNotSavedText = i18next.t('loginIsNotSaved');
    });
}

export {loginIsSavedText, loginIsNotSavedText}; // экспортируем в index.js