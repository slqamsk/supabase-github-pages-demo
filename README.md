# supabase-github-pages-demo
A simple demo showing how to connect a GitHub Pages site with a Supabase database.  
Простой пример подключения сайта на GitHub Pages к базе данных Supabase.
GitHub https://github.com/
Supabase https://supabase.com/

## Шаг-1: GitHub - создать репозиторий

## Шаг-2: Supabase - создать аккаунт
Для упрощения можно использовать авторизацию через GitHub

## Шаг-3: Supabase - создать новый проект
GitHub (optional) - выбрать свой репозиторий
Data API — ✅ включить
Automatically expose new tables — ✅ включить (опционально, но удобно)
Automatic RLS — ❌ выключить

## Шаг-4: Supabase - включить интеграцию с GitHub
Supabase -> Зайти в проект -> Project Settings → Integrations → GitHub Integration
GitHub Repository: выбрать свой репозиторий
Включить опцию: Deploy to production

## Шаг-5: GitHub - напишите скрипт создания таблицы на GitHub
В файл:
supabase/migrations/20260520002656_create_example01_guests.sql
Напишите: 
```sql
CREATE TABLE example01_guests (
    guest_id   BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    guest_name VARCHAR(20) NOT NULL
);
```
## Шаг-6: Supabase - проверьте, что миграция успешно прошала и таблица создалась в Supabase
Database → Migrations
Database → Tables

## Шаг-7: Supabase - сохранить URL
Project Settings → Data API

Сохранить URL вида: https://dmqptpsxmzsianryeppw.supabase.co/rest/v1/

## Шаг-8: Supabase - cохранить ключ
Project Settings → API Keys
Publishable and secret API keys -> Publishable key
Скопировать ключ вида:
sb_publishable_-Vce0VdU5bALiNYq-_zQtw_ptyrrRvQ

## Шаг-9: GitHub - настроить GitHub Pages
Зайти в репозиторий
Settings → Pages
Build and deployment
Source: Deploy from a branch
Branch: main, папка /docs 
Save

## Шаг-10: GitHub - выложить index.html
Добавить новый файл:
Имя: docs/index.html




















