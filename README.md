# leaders_of_digital
## Установка и наполнение
После пулла репозитория выполняем в рабочей директории:
```docker-compose build
docker-compose up db
```
Ждём, пока не появится сообщение "ready for connections" (не более 20 секунд)
На WARN внимание можно не обращать
```
docker-compose run backend flask db upgrade
docker-compose run backend python parse_vacancies.py
docker-compose run backend python parse_having.py
docker-compose run backend python parse_free.py
```

## Запуск
После предыдущих операций выполняем
```
docker-compose up
```
Теперь на localhost:3000 доступен фронтенд проекта
