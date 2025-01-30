import { useOutletContext } from 'react-router-dom'
import { useState, ChangeEvent } from "react"
import { CommentModel } from '../models/CommentModelDataResult'

export default function CommentData(props: {text: string | null}) {

    const {text} = props;

    const [ commentList, handlerChangeComment, currentCommentId, handlerChangeCurrentCommentId ] = useOutletContext<Context>();

    // Текущее значение текста комментария в поле ввода и обработчик для события onChange
    const [commentText, setCommentText] = useState<string | null>(text);
    function handlerChangeText(event: ChangeEvent<HTMLTextAreaElement>) {
        setCommentText(event.currentTarget.value);
    }

    const [edit, setEdit] = useState<boolean>(false);

    function editComment() {
        if (edit) {
            const currentList: CommentModel[] = [...commentList.data];
            const currentIndex: number = currentList.findIndex((item: CommentModel) => item.id === currentCommentId);
            currentList[currentIndex].text = commentText;
            handlerChangeComment({...commentList, data: currentList});
            setEdit(false);
        } else {
            setEdit(true);
        }
    }

    return (
        <div className="comment__data-container">
            {(edit) ?
            <textarea value={commentText} onChange={handlerChangeText}>
            </textarea> :
            <div className="comment__data-text">
                <span>
                    {text}
                </span>
            </div>
            }
            <button className="comment__data-button" onClick={editComment}>
                {(edit) ? "Сохранить" : "Редактировать"}
            </button>
        </div>
    )
}