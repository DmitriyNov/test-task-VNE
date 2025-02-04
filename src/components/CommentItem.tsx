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

    moment.locale(); // У меня почему-то не работает(
    const create: string = moment(item.createDT).format("LL");
    const update: string = moment(item.updateDT).format("LL");
          
    return (
        <div id={item.id} className="comment_item__container px-10 py-5 cursor-pointer rounded-xl bg-white" onClick={changeComment}>
            <div className="comment_item__header mb-3 flex justify-between">
                <span className="comment_item__title text-lg font-medium">
                    {item.user.username}
                </span>
                <div className="comment_item__date text-sm text-gray-500 flex flex-col">
                    <span>
                        Создано: {create}
                    </span>
                    {(item.updateDT) && <span>
                        Обновлено: {update}
                    </span>}
                </div>
            </div>
            <div className="comment_item__data">
                {item.text}
            </div>
            <div className="comment_item__images my-3 flex flex-row gap-4">
                {(!item.images) || item.images.map((item: string, i: number) => (
                    <img key={i} className="w-40 h-40 object-cover rounded" src={item} />
                ))}
            </div>
            <div className="comment_item__footer flex justify-end gap-5">
                <div className="comment_item__grade-container flex items-center gap-2">
                    <span className="material-symbols-outlined">
                        favorite
                    </span>
                    <span className="text-lg font-medium">{item.likes || 0}</span>
                </div>
                <div className="comment_item__grade-container flex items-center gap-2">
                    <span className="material-symbols-outlined">
                        thumb_down
                    </span>
                    <span className="text-lg font-medium">{item.dislikes || 0}</span>
                </div>
            </div>
        </div>
    )
}