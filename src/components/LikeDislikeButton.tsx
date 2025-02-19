import { useOutletContext } from 'react-router-dom'
import { CommentModel } from '../models/CommentModelDataResult'

export default function LikeDislikeButton(props: {type: boolean, count: number | null}) {

    const {type, count} = props;

    const [ commentList, handlerChangeComment, currentCommentId, handlerChangeCurrentCommentId] = useOutletContext<Context>();

    function changeLikesDislikesCount() {
        const currentList: CommentModel[] = [...commentList.data];
        const currentIndex: number = currentList.findIndex((item: CommentModel) => item.id === currentCommentId);
        // Понимаю, что условная конструкция массивная и сложная для восприятия, но по-другому не придумал(
        if (type && "likes" in currentList[currentIndex]) {
            currentList[currentIndex].likes += 1;
        } else if (type) {
            currentList[currentIndex].likes = 1;
        } else if (!type && "dislikes" in currentList[currentIndex]) {
            currentList[currentIndex].dislikes += 1;
        } else {
            currentList[currentIndex].dislikes = 1;
        }
        handlerChangeComment({...commentList, data: currentList});
    }

    return(
        <button className="like_dislike_button w-20 p-1 flex justify-center items-center gap-2 cursor-pointer rounded bg-gray-100 hover:bg-gray-200" onClick={changeLikesDislikesCount}>
            {(type) ? 
            <span className="material-symbols-outlined">
                favorite
            </span> :
            <span className="material-symbols-outlined">
                thumb_down
            </span>}
            <span className="text-lg font-medium">{count || 0}</span>
        </button>
    )
}