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
            <div className="mx-auto mt-50 w-20 flex justify-start align-middle">
                <span className="text-xl font-bold">
                    Загрузка<Loader />
                </span>
            </div>
        )
    }

    moment.locale(); // У меня почему-то не работает(
    const create: string = moment(currentComment.createDT).format("LL");
    const update: string = moment(currentComment.updateDT).format("LL");

    return (
        <div className="comment__container w-240 m-auto px-10 py-5 rounded-xl bg-white relative">
            <div className="comment__button-container mb-5">
                <button className="comment__button text-lg font-medium w-20 py-1 flex justify-center align-middle gap-2 cursor-pointer rounded bg-gray-100 hover:bg-gray-200" onClick={backToList}>
                    Назад
                </button>
            </div>
            <div className="comment__header mb-3 flex justify-between">
                <span className="comment__title text-lg font-medium">
                    {currentComment.user.username}
                </span>
                <div className="comment__date text-sm text-gray-500 flex flex-col">
                    <span>
                        Создано: {create}
                    </span>
                    {(currentComment.updateDT) && <span>
                        Обновлено: {update}
                    </span>}
                </div>
            </div>
            <CommentData text={currentComment.text} images={currentComment.images}/>
            <div className="comment__footer flex justify-end gap-3">
                <LikeDislikeButton type={true} count={currentComment.likes} />
                <LikeDislikeButton type={false} count={currentComment.dislikes} />
            </div>
        </div>
    )
}