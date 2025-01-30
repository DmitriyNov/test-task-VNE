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
    total: 2,
    data: [
      {
        id: "0",
        createDT: "20240618",
        user: {
          username: "Дядя Петя",
        },
        text: "Быстрая доставка. Девчёнки на пункте выдачи классные. Товар пока не открывал.",
        likes: 99,
      },
      {
        id: "1",
        createDT: "20250101",
        user: {
          username: "Тамара Ивановна",
        },
        text: "4 звезды за неприветливость! Только за неприветливость. А ещё повторно, такая петрушка будет , то будет минус 5 звёзд! (-5 звёзд) Поскольку в любой торговле гласит один принцип: ОБСЛУЖИ ПОКУПАТЕЛЯ КАК ЦАРЯ и может потом люди сюда потянутся! Ок?", // Рельный отзыв с WB (пунктуация и орфография автора сохранены)
        likes: 5,
        dislikes: 1,
      },
      // {
      //   id: "2",
      //   createDT: "",
      //   user: {
      //     username: "",
      //   },
      //   text: "",
      //   likes: 0,
      //   dislikes: 0,
      // },
      // {
      //   id: "3",
      //   createDT: "",
      //   user: {
      //     username: "",
      //   },
      //   text: "",
      //   likes: 0,
      //   dislikes: 0,
      // },
      // {
      //   id: "4",
      //   createDT: "",
      //   user: {
      //     username: "",
      //   },
      //   text: "",
      //   likes: 0,
      //   dislikes: 0,
      // },
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
