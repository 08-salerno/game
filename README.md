# game

# Heroku

https://salerno-08.herokuapp.com/

# Development

Для локальной разработки:

1) server/database/db-client
Переписать на localhost и порт, в todo подробности

2) Запустить базу
cd docker
sudo docker-compose up postgre (pgadmin)
или из package.json - compose:up:postgres

3) Идём в package.json и по очереди запускаем:
1. Собирай клиент `(watch | build):csr`
1. Собери SSR бандл `build:ssr`
   1. Придётся пересобирать вручную по необходимости, если пункт 1 = watch
1. Собери сервер `build:server`
1. Запусти сервер `start:server`

При разработке фронтовой части, пересобираем пункты 1 и 2<br>
Скорее всего надо будет пользовать жёсткой перезагрузкой (Ctrl+Shift+R), 
чтобы новые изменения точно загрузились

При разработке серверной части, нужно стопнуть серв, внести изменения, 
пересобрать (п. 3), запустить (п. 4)

Можно разрабатывать и в обход SSR, но черевато, что сломается SSR:<br>
`serve:csr` - если хочешь поднять клиентскую часть на webpack dev server, 
но тогда наше апи не будет работать


// При запуске из docker обязательно host: postgres; port: 5432
// При запуске с хостовой машины host: localhost; port: 5555
