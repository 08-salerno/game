# Важно

Вся эта мишура с compose в действительности лишь для production развёртки на каком-нибудь хероку.

Папку docker, пожалуйста, не трогаем, файлы из неё в корень перемещать не надо.

Запуск команды `docker-compose` возможен из папкм /docker

# Как разрабатывать локально

Можно запустить только контейнер с базой
`sudo docker-compose up postgres`<br>
В server.js поменять настройки подключения клиента postgres:<br>
host -> localhost<br>
port -> 5555<br>
И запускать `node server.js`

Далее лишь информация по тому как запускать compose полностью.

# Файлы
* __Dockerfile__ - файл образа нашего приложения
* __docker-compose.yml__ - файл сборки с базой данных postgres и pgAdmin, и нашим Dockerfile
* __папка postgres-db__ - пока что там лежит база данных, которая зеркалится с базы в контейнере
 и наоборот подтягивается в него при запуске
  
# Запуск

```
# Если вы в руте
cd docker

sudo docker-compose up

# можно в фоне, чтобы освободить консоль
sudo docker-compose up -d
```

# Остановка

Ctrl+C в захваченной консоли после up или
```
sudo docker-compose stop
```

# Пересборка нашего образа

Сначала надо остановить, можно отдельно контейнер `sudo docker-compose stop salerno-app`
```
sudo docker-compose build salerno-app
```
Потом снова запустить, можно отдельно контейнер `sudo docker-compose start salerno-app`


# База

Добавлены на данный момент две таблицы: themes и users_themes.

После первого запуска нужно зайти на http://localhost:5656/ - pgAdmin
<br>Подключить сервер по [инструкции практикума](https://practicum.yandex.ru/learn/middle-frontend/courses/ce1c09fb-f189-4b3d-9662-9dde4d271257/sprints/13399/topics/428a6267-bda5-449e-b346-30adaff7084c/lessons/e7625f0a-33bd-4493-b7a6-b3926e9e18e6/)
<br>Посмотреть на существующие таблицы
<br>По необходимости вносить изменения

Все изменения попадут в папку postgres-db, которая должна быть залита на гит. 
Таким образом у нас у всех всегда будет одна общая база. Пока так.
