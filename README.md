
# Задание 1

## Уровень 1. Проектирование

В приложении Mesto нет требований использовать разные фреймворки отличные от React, а также в Single SPA может быть сложнее управлять общим состоянием и маршрутиризацией между микрофронтендами. Также здесь достаточно использовать клиентскую композицию в runtime, но подходит и buildtime.
Поэтому выберу Webpack Module Federation.

## Уровень 2. Планирование изменений

Здесь отлично подойдет метод вертикальной нарезки, так как можно выделить домены, которые имеют слабую связанность между друг другом: Авторизация/Регистрация, Профиль, Карточки мест.


### Структура проекта под спойлерами

<details>
<summary><b>host</b> для основной композиции</summary>

```
.
├── Dockerfile.frontend
├── package-lock.json
├── package.json
├── public
│   └── index.html
├── src
│   ├── blocks
│   │   ├── content
│   │   │   └── content.css
│   │   ├── footer
│   │   │   ├── __copyright
│   │   │   │   └── footer__copyright.css
│   │   │   ├── content
│   │   │   │   └── content.css
│   │   │   └── footer.css
│   │   ├── header
│   │   │   ├── __auth-link
│   │   │   │   └── header__auth-link.css
│   │   │   ├── __logo
│   │   │   │   └── header__logo.css
│   │   │   ├── __logout
│   │   │   │   └── header__logout.css
│   │   │   ├── __user
│   │   │   │   └── header__user.css
│   │   │   ├── __wrapper
│   │   │   │   └── header__wrapper.css
│   │   │   └── header.css
│   │   └── page
│   │       ├── __content
│   │       │   └── page__content.css
│   │       ├── __section
│   │       │   └── page__section.css
│   │       └── page.css
│   ├── components
│   │   ├── App.js // Основная композиция и маршрутизация тут
│   │   ├── Footer.js
│   │   ├── Header.js
│   │   ├── Login.js // Микрофронтенд Логина из Auth
│   │   ├── Main.js // Композиция из микрофронтендов Places и Profile
│   │   ├── Places.js // Микрофронтенд Places
│   │   ├── Profile.js // Микрофронтенд Profile
│   │   ├── ProtectedRoute.js
│   │   └── Register.js // Микрофронтенд Регистрации из Auth
│   ├── images
│   │   ├── avatar.jpg
│   │   ├── card_1.jpg
│   │   ├── card_2.jpg
│   │   ├── card_3.jpg
│   │   └── logo.svg
│   ├── index.css
│   ├── index.js
│   ├── utils
│   │   ├── api.js
│   │   └── auth.js
│   └── vendor
│       ├── fonts
│       │   ├── Inter-Black.woff2
│       │   └── Inter-Regular.woff2
│       ├── fonts.css
│       └── normalize.css
└── webpack.config.js
```
</details>

<details>
<summary><b>auth</b></summary>

```
.
├── Dockerfile.frontend
├── package-lock.json
├── package.json
├── public
│   └── index.html
├── src
│   ├── blocks
│   │   ├── auth-form
│   │   │   ├── __button
│   │   │   │   └── auth-form__button.css
│   │   │   ├── __form
│   │   │   │   └── auth-form__form.css
│   │   │   ├── __input
│   │   │   │   └── auth-form__input.css
│   │   │   ├── __link
│   │   │   │   └── auth-form__link.css
│   │   │   ├── __text
│   │   │   │   └── auth-form__text.css
│   │   │   ├── __textfield
│   │   │   │   └── auth-form__textfield.css
│   │   │   ├── __title
│   │   │   │   └── auth-form__title.css
│   │   │   └── auth-form.css
│   │   └── popup
│   │       ├── __button
│   │       │   ├── _disabled
│   │       │   │   └── popup__button_disabled.css
│   │       │   └── popup__button.css
│   │       ├── __caption
│   │       │   └── popup__caption.css
│   │       ├── __close
│   │       │   └── popup__close.css
│   │       ├── __content
│   │       │   ├── _content
│   │       │   │   └── popup__content_content_image.css
│   │       │   └── popup__content.css
│   │       ├── __error
│   │       │   ├── _visible
│   │       │   │   └── popup__error_visible.css
│   │       │   └── popup__error.css
│   │       ├── __form
│   │       │   └── popup__form.css
│   │       ├── __icon
│   │       │   └── popup__icon.css
│   │       ├── __image
│   │       │   └── popup__image.css
│   │       ├── __input
│   │       │   ├── _type
│   │       │   │   └── popup__input_type_error.css
│   │       │   └── popup__input.css
│   │       ├── __label
│   │       │   └── popup__label.css
│   │       ├── __status-message
│   │       │   └── popup__status-message.css
│   │       ├── __title
│   │       │   └── popup__title.css
│   │       ├── _is-opened
│   │       │   └── popup_is-opened.css
│   │       ├── _type
│   │       │   ├── popup_type_edit-avatar.css
│   │       │   └── popup_type_remove-card.css
│   │       └── popup.css
│   ├── components
│   │   ├── App.js
│   │   ├── InfoTooltip.js // Общий компонент popup
│   │   ├── Login.js
│   │   ├── Register.js
│   │   └── index.css
│   ├── images
│   │   ├── close.svg
│   │   ├── error-icon.svg
│   │   └── success-icon.svg
│   ├── index.js
│   └── utils
│       └── auth.js
└── webpack.config.js // Webpack, настроенный на Remote (exposes для Login, Register)
```
</details>

<details>
<summary><b>profile</b></summary>

```
.
├── Dockerfile.frontend
├── package-lock.json
├── package.json
├── public
│   └── index.html
├── src
│   ├── blocks
│   │   ├── popup
│   │   │   ├── __button
│   │   │   │   ├── _disabled
│   │   │   │   │   └── popup__button_disabled.css
│   │   │   │   └── popup__button.css
│   │   │   ├── __caption
│   │   │   │   └── popup__caption.css
│   │   │   ├── __close
│   │   │   │   └── popup__close.css
│   │   │   ├── __content
│   │   │   │   ├── _content
│   │   │   │   │   └── popup__content_content_image.css
│   │   │   │   └── popup__content.css
│   │   │   ├── __error
│   │   │   │   ├── _visible
│   │   │   │   │   └── popup__error_visible.css
│   │   │   │   └── popup__error.css
│   │   │   ├── __form
│   │   │   │   └── popup__form.css
│   │   │   ├── __icon
│   │   │   │   └── popup__icon.css
│   │   │   ├── __image
│   │   │   │   └── popup__image.css
│   │   │   ├── __input
│   │   │   │   ├── _type
│   │   │   │   │   └── popup__input_type_error.css
│   │   │   │   └── popup__input.css
│   │   │   ├── __label
│   │   │   │   └── popup__label.css
│   │   │   ├── __status-message
│   │   │   │   └── popup__status-message.css
│   │   │   ├── __title
│   │   │   │   └── popup__title.css
│   │   │   ├── _is-opened
│   │   │   │   └── popup_is-opened.css
│   │   │   ├── _type
│   │   │   │   ├── popup_type_edit-avatar.css
│   │   │   │   └── popup_type_remove-card.css
│   │   │   └── popup.css
│   │   └── profile
│   │       ├── __add-button
│   │       │   └── profile__add-button.css
│   │       ├── __description
│   │       │   └── profile__description.css
│   │       ├── __edit-button
│   │       │   └── profile__edit-button.css
│   │       ├── __image
│   │       │   └── profile__image.css
│   │       ├── __info
│   │       │   └── profile__info.css
│   │       ├── __title
│   │       │   └── profile__title.css
│   │       └── profile.css
│   ├── components
│   │   ├── AddPlacePopup.js
│   │   ├── App.js
│   │   ├── EditAvatarPopup.js
│   │   ├── EditProfilePopup.js
│   │   ├── PopupWithForm.js
│   │   └── Profile.js
│   ├── images
│   │   ├── add-icon.svg
│   │   ├── close.svg
│   │   └── edit-icon.svg
│   ├── index.js
│   └── utils
│       └── api.js
└── webpack.config.js // Webpack, настроенный на Remote (exposes для Profile)
```
</details>

<details>
<summary><b>places</b></summary>

```
.
├── Dockerfile.frontend
├── package-lock.json
├── package.json
├── public
│   └── index.html
├── src
│   ├── blocks
│   │   ├── card
│   │   │   ├── __delete-button
│   │   │   │   ├── _hidden
│   │   │   │   │   └── card__delete-button_hidden.css
│   │   │   │   ├── _visible
│   │   │   │   │   └── card__delete-button_visible.css
│   │   │   │   └── card__delete-button.css
│   │   │   ├── __description
│   │   │   │   └── card__description.css
│   │   │   ├── __image
│   │   │   │   └── card__image.css
│   │   │   ├── __like-button
│   │   │   │   ├── _is-active
│   │   │   │   │   └── card__like-button_is-active.css
│   │   │   │   └── card__like-button.css
│   │   │   ├── __like-count
│   │   │   │   └── card__like-count.css
│   │   │   ├── __title
│   │   │   │   └── card__title.css
│   │   │   └── card.css
│   │   ├── places
│   │   │   ├── __item
│   │   │   │   └── places__item.css
│   │   │   ├── __list
│   │   │   │   └── places__list.css
│   │   │   └── places.css
│   │   └── popup
│   │       ├── __button
│   │       │   ├── _disabled
│   │       │   │   └── popup__button_disabled.css
│   │       │   └── popup__button.css
│   │       ├── __caption
│   │       │   └── popup__caption.css
│   │       ├── __close
│   │       │   └── popup__close.css
│   │       ├── __content
│   │       │   ├── _content
│   │       │   │   └── popup__content_content_image.css
│   │       │   └── popup__content.css
│   │       ├── __error
│   │       │   ├── _visible
│   │       │   │   └── popup__error_visible.css
│   │       │   └── popup__error.css
│   │       ├── __form
│   │       │   └── popup__form.css
│   │       ├── __icon
│   │       │   └── popup__icon.css
│   │       ├── __image
│   │       │   └── popup__image.css
│   │       ├── __input
│   │       │   ├── _type
│   │       │   │   └── popup__input_type_error.css
│   │       │   └── popup__input.css
│   │       ├── __label
│   │       │   └── popup__label.css
│   │       ├── __status-message
│   │       │   └── popup__status-message.css
│   │       ├── __title
│   │       │   └── popup__title.css
│   │       ├── _is-opened
│   │       │   └── popup_is-opened.css
│   │       ├── _type
│   │       │   ├── popup_type_edit-avatar.css
│   │       │   └── popup_type_remove-card.css
│   │       └── popup.css
│   ├── components
│   │   ├── App.js
│   │   ├── Card.js
│   │   ├── ImagePopup.js
│   │   └── Places.js
│   ├── images
│   │   ├── close.svg
│   │   ├── delete-icon.svg
│   │   ├── like-active.svg
│   │   └── like-inactive.svg
│   ├── index.js
│   └── utils
│       └── api.js
└── webpack.config.js // Webpack, настроенный на Remote (exposes для Places)
```
</details>

Для упрощения между собой Микрофронтенды будут общаться на событийной основе, но в идеале стоит перейти на state management, например Redux.

### Проект будет запускаться следующим образом

Каждый микрофронтенд, будет являться отдельным проектом, который будет доступны внутри Remote.
Запуск происходит через сборку Webpack. Для учебного проекта достаточно настроить Jenkins, применить синезеленые билды и заменять собранный микрофронтенд, который будет доступен по одному и тому же адресу. Таким образом у нас будет непрерывная интеграция и обновление.
В реальности, было бы круто настроить ServiceMesh, который через заголовок в котором мы могли бы, например, указать номер задачи получать свой инкремент микрофронтенда, чтобы удобно развивать их большой командой разработки.

## Уровень 3. Реализация

Реализовал все 3 уровня, на Webpack Module Federation. 

Для запуска:

1. Перейти в директорию ./frontend/microfrontend
2. Запустить ```docker compose up```
3. Проект будет доступен по адресу http://localhost:3000/, микрофронтенды будут запущены на портах 3001, 3002, 3003

# Задание 2

Файл arch_task2.drawio, вторая страница "Decomposition"
Мне важно чтобы вы проверили разделение на микросервисы, описывание взаимодействий я реализовал только на одном из примеров, иначе если рассматривать все сценарии - это можно на неделю работы уйти.
