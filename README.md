# Wavy - Музыкальный стриминговый сервис


## Стек технологий

| Слой | Технологии |
|------|------------|
| Front | React, TypeScript, React Router, Zustand, Zod, TailwindCSS, React Hook Form, Axios, Web Audio API, Audio Context, |
| Backend | node.js, fastify, Redis, JWT, Prisma, Zod, fluent-ffmpeg, Multer |
| Database | PostgreSQL 16 |
| Инфраструктура | Docker |
| Документация	 | Swagger |
| Тесты | Jest, Supertest |
| Доп. API |  |

## Описание проекта

### Идея
    В 2026 веке все слушают музыку, и самый удобный способ - это пользоваться стриминговыми сервисами. Wavy предоставляет такую возможность пользователю.

### Целевая аудитория
* Лица любого пола от 20 до 50 лет которые увлекаются прослушиванием музыки или игрой на музыкальных инструментах 
* Водители приор которые любят включать музыку на всю среди ночи
## Ключевые экраны и функциональность
Для клиента 
| Экран | Что можно делать |
|-------|------------------|
| Главная | Навигационная панель, Кнопки перехода на страницы избранное/профиль/комнаты синхронного прослушивания/поиск исполнителей и треков по сайту. |
| Карточка исполнителя | Просматривать и включать треки исполнителя |
| Карточка трека | Управление играющим треком |
| Комната синхронного прослушивания | Вход/выход из режим синхронного прослушивания |
| Профиль пользователя | Редактирование информации о себе |
| Избранное | Список избранных треков, просмотр плейлистов, история прослушиваний |
| Станция по жанру | Выбор жанра и последующее прослушивание треков подобранных сервисом |


Для админа: Все вышеперечисленные экраны +
| Экран | Что можно делать |
|-------|------------------|
| Admin-панель | Администрирование треков, управление пользователями |

### Уникальные фичи 
1. Синхронное прослушивание
2. Поиск по исполнителям и трекам
3. Радио-станция по выбранному жанру
4. Создание плейлистов

## Сущности системы
| Сущность | Что можно делать |
|-------|------------------|
| Users | id, email, passwordHash, name, avatarUrl, createdAt, updatedAt |
| Track | id, uploadedById, title, artist, genre, duration, fileKey, coverUrl, waveform, playCount, createdAt |
| Playlist  | id, name, description, isPublic, coverUrl, userId, createdAt |
| PlaylistOnTracks | playlistId, trackId, order |
| Likes | userId, trackId, createdAt |
| SyncRoom | id, playlistId, currentTrackId, currentTime, isPlaying, leaderId, createdAt |
| Participant | id, roomId, userId, joinedAt |
| ListeningHistory  | id, userId, trackId, listenedAt, progress |
| RadioStation | id, userId, genre, name, lastPlayed |

## ER-диаграмма
[Диаграмма](./ER-диаграмма.drawio.svg)

## Архитектура системы + User story map + Road map (не вмещается в readme файл)
## https://miro.com/welcomeonboard/aGJOL2NxTEJGZThxWmNhbm1FNUM0QmQ2cDk4Rjg3K2dnMmZKWVhlYVl0ZWVXWjd5UC9YUGJ1OXBWcmlrVTFGbWdDUS9XclRaYTJUNkpiMTRJSy80cThleHhmSmQrbGgvUlE0SnhHVWozT3FiKzBVREVYNDh3NFduNWwxSFB1R3d0R2lncW1vRmFBVnlLcVJzTmdFdlNRPT0hdjE=?share_link_id=371525251382

## Переменные окружения 
## Как запустить проект
## Переменные окружения 

## Примерная структура проекта 
wavy/
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── stores/
│   │   ├── api/         
│   │   ├── types/       
│   └── ...
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
|   |   ├── errors/
│   │   ├── services/
│   │   ├── middleware/
│   │   ├── prisma/
│   │   └── utils/
│   └── ...
├── docker-compose.yml
└── README.md