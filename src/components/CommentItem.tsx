import { CommentModel } from '../models/CommentModelDataResult'
import { useNavigate, useOutletContext } from 'react-router-dom'
import moment from 'moment'

export default function CommentItem(props: {item: CommentModel}) {

    const {item} = props;

    const [ commentList, handlerChangeComment, currentCommentId, handlerChangeCurrentCommentId] = useOutletContext<Context>();

    const navigation = useNavigate();
    // Устанавливаем ID текущего отзыва и переходим на страницу его редактирования
    function changeComment() {
        handlerChangeCurrentCommentId(item.id);
        navigation("/comment"); 
    };
          
    return (
        <div id={item.id} className="comment_item__container" onClick={changeComment}>
            <div className="comment_item__header">
                <span className="comment_item__title">
                    {item.user.username}
                </span>
                <div className="comment_item__date">
                    <span>
                        Создано: {moment(item.createDT).calendar()}
                    </span>
                    {(item.updateDT) && <span>
                        Обновлено: {moment(item.updateDT).calendar()}
                    </span>}
                </div>
            </div>
            <div className="comment_item__data">
                {item.text}
            </div>
            <div className="comment_item__footer">
                <div className="comment_item__grade-container">
                    <span className="material-symbols-outlined">
                        favorite
                    </span>
                    <span>{item.likes || 0}</span>
                </div>
                <div className="comment_item__grade-container">
                    <span className="material-symbols-outlined">
                        thumb_down
                    </span>
                    <span>{item.dislikes || 0}</span>
                </div>
            </div>
        </div>
    )
}