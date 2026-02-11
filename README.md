# EShop - интернет-магазин девайсов</h1>

![](https://github.com/whytsy/eshop/actions/workflows/ci.yml/badge.svg)  
![](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![](https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white)
![](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

## Стек
### Backend:
- Node.js + Express + Typescript
- Postgres + Sequelize
- JWT
- Nodemailer
- Express validator
- Winston + Morgan
- Jest + Supertest
- Swagger

### Frontend:
- React + Typescript
- React router
- Vite
- Axios
- MobX
- Tailwind

### Инфраструктура:
- Github Actions - CI
- Docker

## Как запустить локально:
### С помощью Docker:
1. Клонировать репозиторий
2. Открыть терминал в директории проекта
3. Запустить команду  
`docker-compose -f docker-compose.dev.yml up --build` (для development версии)  
или  
`docker-compose -f docker-compose.prod.yml up --build` (для production версии)  

*Рекомендукется запускать development версию, так как имеется заполнение базы данных сидерами, а также отключен функционал отправки сообщений на электронную почту*  
*При запуске production версии для корректной работы **необходимо заполнить в файле .evn.production** переменные для отправки электронных писем по протоколу SMTP*  

Приложение будет доступно:
- Frontend: <http://localhost:5173>
- Backend: <http://localhost:5000>
- Api Docs: <http://localhost:5000/api-docs>

## Особенности реализации:
### Backend
- Реализация на Typescript
- Работа с базой данных осуществляется с использованием транзакций
- Сидеры для базы данных
- JWT-аутентификация
- Валидация всех входных данных
- RBAC-метод управления доступом к системе
- Описанное api с использованием swagger
- Логирование операций, а также отдельно ошибок и запросов

### Frontend
- Реализация на typescript
- Использование MobX для управления состоянием
- Tailwind и react-bootstrap для стилизации
- Пагинация для ускорения загрузки запросов
- Адаптивная верстка
- График для статистики в админ-панели
- Обработка ошибок и отображение их пользователю


### Тестирование
**Покрытие**
<table style="width: 100%; border-collapse: collapse; font-family: monospace;">
  <thead>
    <tr style="background-color: #f2f2f2;">
      <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">File</th>
      <th style="border: 1px solid #ddd; padding: 8px; text-align: center;">% Stmts</th>
      <th style="border: 1px solid #ddd; padding: 8px; text-align: center;">% Branch</th>
      <th style="border: 1px solid #ddd; padding: 8px; text-align: center;">% Funcs</th>
      <th style="border: 1px solid #ddd; padding: 8px; text-align: center;">% Lines</th>
      <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Uncovered Line #s</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background-color: #f9f9f9;">
      <td colspan="6" style="border: 1px solid #ddd; padding: 8px; text-align: center; font-weight: bold;">
        All files
      </td>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">middleware</td>
      <td style="border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #e6ffe6;">74.74</td>
      <td style="border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #e6ffe6;">69.44</td>
      <td style="border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #e6ffe6;">75</td>
      <td style="border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #e6ffe6;">75</td>
      <td style="border: 1px solid #ddd; padding: 8px;"></td>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd; padding: 8px; padding-left: 20px;">authMiddleware.ts</td>
      <td style="border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #b3ffb3; font-weight: bold;">89.47</td>
      <td style="border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #e6ffe6;">75</td>
      <td style="border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #b3ffb3; font-weight: bold;">100</td>
      <td style="border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #e6ffe6;">88.88</td>
      <td style="border: 1px solid #ddd; padding: 8px;">46-52</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd; padding: 8px; padding-left: 20px;">errorMiddleware.ts</td>
      <td style="border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #00cc00; font-weight: bold;">100</td>
      <td style="border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #00cc00; font-weight: bold;">100</td>
      <td style="border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #00cc00; font-weight: bold;">100</td>
      <td style="border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #00cc00; font-weight: bold;">100</td>
      <td style="border: 1px solid #ddd; padding: 8px;"></td>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd; padding: 8px; padding-left: 20px;">loggingMiddleware.ts</td>
      <td style="border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #ffcccc; font-weight: bold;">0</td>
      <td style="border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #ffcccc; font-weight: bold;">0</td>
      <td style="border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #ffcccc; font-weight: bold;">0</td>
      <td style="border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #ffcccc; font-weight: bold;">0</td>
      <td style="border: 1px solid #ddd; padding: 8px;">2-30</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd; padding: 8px; padding-left: 20px;">roleMiddleware.ts</td>
      <td style="border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #e6ffe6;">83.33</td>
      <td style="border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #e6ffe6;">68.18</td>
      <td style="border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #b3ffb3; font-weight: bold;">100</td>
      <td style="border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #e6ffe6;">82.35</td>
      <td style="border: 1px solid #ddd; padding: 8px;">91-97,105,115-121,125-131,145-151</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">service</td>
      <td style="border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #ffffcc;">50.63</td>
      <td style="border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #ffffcc;">40.71</td>
      <td style="border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #ffffcc;">52.56</td>
      <td style="border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #ffffcc;">50.97</td>
      <td style="border: 1px solid #ddd; padding: 8px;"></td>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd; padding: 8px; padding-left: 20px;">brandService.ts</td>
      <td style="border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #b3ffb3; font-weight: bold;">97.05</td>
      <td style="border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #00cc00; font-weight: bold;">100</td>
      <td style="border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #b3ffb3; font-weight: bold;">100</td>
      <td style="border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #b3ffb3; font-weight: bold;">96.96</td>
      <td style="border: 1px solid #ddd; padding: 8px;">40</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd; padding: 8px; padding-left: 20px;">deviceService.ts</td>
      <td style="border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #ffcccc; font-weight: bold;">0</td>
      <td style="border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #ffcccc; font-weight: bold;">0</td>
      <td style="border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #ffcccc; font-weight: bold;">0</td>
      <td style="border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #ffcccc; font-weight: bold;">0</td>
      <td style="border: 1px solid #ddd; padding: 8px;">1-400</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd; padding: 8px; padding-left: 20px;">mailService.ts</td>
      <td style="border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #ffcccc; font-weight: bold;">0</td>
      <td style="border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #ffcccc; font-weight: bold;">0</td>
      <td style="border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #ffcccc; font-weight: bold;">0</td>
      <td style="border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #ffcccc; font-weight: bold;">0</td>
      <td style="border: 1px solid #ddd; padding: 8px;">1-132</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd; padding: 8px; padding-left: 20px;">orderService.ts</td>
      <td style="border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #00cc00; font-weight: bold;">100</td>
      <td style="border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #00cc00; font-weight: bold;">100</td>
      <td style="border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #00cc00; font-weight: bold;">100</td>
      <td style="border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #00cc00; font-weight: bold;">100</td>
      <td style="border: 1px solid #ddd; padding: 8px;"></td>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd; padding: 8px; padding-left: 20px;">tokenService.ts</td>
      <td style="border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #e6ffe6;">89.74</td>
      <td style="border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #00cc00; font-weight: bold;">100</td>
      <td style="border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #b3ffb3; font-weight: bold;">100</td>
      <td style="border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #e6ffe6;">89.74</td>
      <td style="border: 1px solid #ddd; padding: 8px;">58,73,81,89</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd; padding: 8px; padding-left: 20px;">typeService.ts</td>
      <td style="border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #b3ffb3; font-weight: bold;">97.05</td>
      <td style="border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #e6ffe6;">75</td>
      <td style="border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #b3ffb3; font-weight: bold;">100</td>
      <td style="border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #b3ffb3; font-weight: bold;">96.96</td>
      <td style="border: 1px solid #ddd; padding: 8px;">59</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd; padding: 8px; padding-left: 20px;">userService.ts</td>
      <td style="border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #ffffcc;">59.11</td>
      <td style="border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #ffffcc;">52.63</td>
      <td style="border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #ffffcc;">46.42</td>
      <td style="border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #ffffcc;">59.77</td>
      <td style="border: 1px solid #ddd; padding: 8px;">67,127,199-230,270,276-457</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">validation</td>
      <td style="border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #e6ffe6;">90.62</td>
      <td style="border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #e6ffe6;">80</td>
      <td style="border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #ffffcc;">57.14</td>
      <td style="border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #00cc00; font-weight: bold;">100</td>
      <td style="border: 1px solid #ddd; padding: 8px;"></td>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd; padding: 8px; padding-left: 20px;">validation.ts</td>
      <td style="border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #e6ffe6;">90.62</td>
      <td style="border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #e6ffe6;">80</td>
      <td style="border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #ffffcc;">57.14</td>
      <td style="border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #00cc00; font-weight: bold;">100</td>
      <td style="border: 1px solid #ddd; padding: 8px;">17</td>
    </tr>
  </tbody>
</table>
Unit-тесты использовались при работе с middleware и service. Для тестирования валидации использовались интеграционные тесты.

### Continious Integration
Используется GitHub Actions для работы CI пайплайна при каждом пуше и пулл-реквесте.
Пайплайн включает следующие задачи:
- Тестирование (unit + integration)
- Проверка типов Typescript
- Сборка проекта для проверки наличия ошибок
