## Тестовое задание VNE

[Текст задания](https://github.com/DmitriyNov/test-task-VNE/blob/main/public/TestTask_WEAR.md)

Для запуска приложения локально скачайтие репозиторий и выполните в терминале следующие команды:
- `npm install`
- `npm run dev`

### Обоснование отступленй от задания

+ не использовал в проекте библиотеку `react-like-dislike-button`, так как не нашёл библиотеку с таким названием, решил написать всё сам, функционал не такой уж сложный;
+ немного поменял интерфейсы для используемых данных: 
  - сделал большую часть свойств обязательными,
  - заменил свойство `isLike: boolean` на `likes: number` и `dislikes: number` для подсчёта количества лайков/дизлайков,
  - добавил свойство `images: string[]` в котором будет записан массив с ссылками на приклеплённые изображения,
  - убрал свойство `userGuid: string`, не догадался, зачем оно нужно было(,

### Мои комментарии к решению

1. Суммарно на задание потратил около 16-18 часов. В начале возникли сложности с инициализацией через create-react-app, было очень много конфликтов версий библиотек, пытался решить, но плюнул и переделал через vite. Так же ранее не работал с Tailwind, поэтому пришлось долго изучать документацию.
2. Постарался максимально выполнить все требования, не сделал только тестирование, потому что и так потратил много времени на выполнение Вообще на курсах почти ко всем заданиям требовали делать тесты на jest, но с react+ts пока не пробовал тесты писать.
3. Сейчас смотрю на получившийся результат и понимаю, что нужно было сильнее разбивать всё на компоненты, некоторые получились достаточно громоздкими и сложными.
