import { CommentModel } from '../models/CommentModelDataResult'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { useEffect, useState } from 'react'
import moment from 'moment'
import CommentData from './CommentData'
import LikeDislikeButton from './LikeDislikeButton'
import Loader from './Loader'

export default function Comment () {

    const [ commentList, handlerChangeComment, currentCommentId, handlerChangeCurrentCommentId] = useOutletContext<Context>();

    const currentComment: CommentModel = commentList.data.find((item: CommentModel) => item.id === currentCommentId);

    const navigation = useNavigate();
    function backToList() {
        navigation("/list"); 
    };

    const [isReady, setReady] = useState<boolean>(false);
    // Имитация загрузки данных
    useEffect(() => {
        setTimeout(() => {
            setReady(true);
        }, 1 * 1000)
    }, []);

    if (!isReady) {
        return (
            <span>
                Загрузка<Loader />
            </span>
        )
    }

    return (
        <div className="comment__container">
            <div className="comment__button-container">
                <button className="comment__button" onClick={backToList}>
                    Назад
                </button>
            </div>
            <div className="comment__header">
                <span className="comment__title">
                    {currentComment.user.username}
                </span>
                <div className="comment__date">
                    <span>
                        Создано: {moment(currentComment.createDT).calendar()}
                    </span>
                    {(currentComment.updateDT) && <span>
                        Обновлено: {moment(currentComment.updateDT).calendar()}
                    </span>}
                </div>
            </div>
            <CommentData text={currentComment.text} images={currentComment.images}/>
            <div className="comment__footer">
                <LikeDislikeButton type={true} count={currentComment.likes} />
                <LikeDislikeButton type={false} count={currentComment.dislikes} />
            </div>
        </div>
    )
}