# supabase-github-pages-demo
A simple demo showing how to connect a GitHub Pages site with a Supabase database.  
Простой пример подключения сайта на GitHub Pages к базе данных Supabase.


## Шаг-1: Создать репозиторий на GitHub https://github.com/

## Шаг-2: Создать аккаунт на Supabase https://supabase.com/
Для упрощения можно использовать авторизацию через GitHub

## Шаг-3: Создать новый проект на Supabase
GitHub (optional) - выбрать свой репозиторий
Data API — ✅ включить
Automatically expose new tables — ✅ включить (опционально, но удобно)
Automatic RLS — ❌ выключить

## Шаг-4: Создать миграцию из GitHub в Supabase
Supabase -> Зайти в проект -> SQL Editor

```sql
CREATE TABLE example01_guests (
    guest_id   BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    guest_name VARCHAR(20) NOT NULL
);
```
