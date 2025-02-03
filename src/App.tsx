import './App.css'
import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { CommentModelDataResult } from './models/CommentModelDataResult'
import Header from './components/Header'

function App() {

  // При загрузке приложения сразу переходим на страницу с списком отзывов
  const navigation = useNavigate();
  useEffect(() => {
    navigation("/list");   
  }, []);

  // Возможно стоит создать отдельный файлик с данными и хранить их в JSON например, я для примера просто объявил локально
  const [commentList, setCommentList] = useState<CommentModelDataResult>({
    total: 5,
    data: [
      {
        id: "0",
        createDT: "20240618",
        user: {
          username: "Дядя Петя",
        },
        text: "Быстрая доставка. Девчёнки на пункте выдачи классные. Упаковка целая. Товар пока не открывал.",
        likes: 99,
      },
      {
        id: "1",
        createDT: "20250101",
        user: {
          username: "Тамара Ивановна",
        },
        text: "4 звезды за неприветливость! Только за неприветливость. А ещё повторно, такая петрушка будет , то будет минус 5 звёзд! (-5 звёзд) Поскольку в любой торговле гласит один принцип: ОБСЛУЖИ ПОКУПАТЕЛЯ КАК ЦАРЯ и может потом люди сюда потянутся! Ок?", // Рельный отзыв с WB (пунктуация и орфография автора сохранены)
        likes: 4,
        dislikes: 5,
      },
      {
        id: "2",
        createDT: "20241106",
        user: {
          username: "Колян",
        },
        text: "Пришли весы не того цвета, заказывали серебристые, пришли синие. Ещё наклейку эту налепили синимие защитную плёнку. Ковырял ковырял, так и не получилось наклейку отодрать...",
        likes: 13,
        dislikes: 47,
        images: ["./public/photo1.jpg"],
      },
      {
        id: "3",
        createDT: "20230814",
        user: {
          username: "Галина Бланка",
        },
        text: "Спасибо, муж доволен.",
        likes: 8,
      },
      {
        id: "4",
        createDT: "20250129",
        user: {
          username: "Kristina",
        },
        text: "Второй раз закзаываю и второй раз прислали не тот номер. Заказывала 6, пришло 9. Ещё 100 рублей за возврат списали. Мошенники! Никому не советую.",
        likes: 6,
        dislikes: 9,
      },
    ],
  });

  function handlerChangeComment(data: CommentModelDataResult) {
    setCommentList(data);
  };

  // Возможно, можно было реализовать передачу текущего выбранного отзыва в компонент редактирования отзыва по-другому.
  // При испольковании роутига и контекста я знаю только такой способ. Вообще, для такого маленького приложения я бы здесь роутинг не использовал
  const [currentCommentId, setCurrentCommentId] = useState<string | null>(null);

  function handlerChangeCurrentCommentId(data: string | null) {
    setCurrentCommentId(data);
  };

  return (
    <div className="app">
      <Header total={commentList.total} />
      <Outlet context={[commentList, handlerChangeComment, currentCommentId, handlerChangeCurrentCommentId]} />
    </div>
  )
}

export default App
