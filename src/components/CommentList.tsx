import { useOutletContext } from 'react-router-dom'
import { CommentModel } from '../models/CommentModelDataResult'
import { useEffect, useState } from 'react';
import CommentItem from './CommentItem'
import Loader from './Loader'

export default function CommentList() {

    const [ commentList ] = useOutletContext<Context>(); //В документации React Router указан такой интерфейс для контекста, только непонятно, откуда его брать

    const [isReady, setReady] = useState<boolean>(false);
    // Имитация загрузки данных
    useEffect(() => {
        setTimeout(() => {
            setReady(true);
        }, 2 * 1000)
    }, []);

    if (!isReady) {
        return (
            <span>
                Загрузка<Loader />
            </span>
        )
    }

    return (
        <div className="comment_list__container">
            {commentList.data.map((item: CommentModel) => (
                <CommentItem key={item.id} item={item} />
            ))}
        </div>
    )
}