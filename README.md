# moviesapp
250 лучших фильмов по версии IMDb
Оригинал: https://www.imdb.com/chart/top/

Первый учебный проект, сделанный в курсе по обучению Vue.js.

Демо: http://portfolio.easyservs.ru/moviesapp/

По сути, меня нельзя считать автором кода, но писал все сам, ничего не копируя + переделывал, то что не нравилось.

Источником выступает массив идентификаторов фильмов IMDB. Далее работа идет через API http://www.omdbapi.com/

Сделано:
- вывод списка фильмов
- поиск фильмов по названию
- удаление фильма из списка
- смена бэграунда всей страницы при наведении на карточку фильма
- пагинация, с отображением номера страницы в адресной строке
- лоадер при загрузке
- вывод уведомлений, например при удалении

Не сделано:
- просмотр карточки фильма
- редактирование карточки фильма

Использовал:
- vue
- vue cli
- vuex
- vue-router


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
