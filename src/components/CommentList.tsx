import { useOutletContext } from 'react-router-dom'
import { CommentModel } from '../models/CommentModelDataResult'
import CommentItem from './CommentItem'
import { useEffect, useState } from 'react';

export default function CommentList() {

    const [ commentList ] = useOutletContext<Context>(); //В документации React Router указан такой интерфейс для контекста, только непонятно, откуда его брать

    const [ready, setReady] = useState<boolean>(false);
    useEffect(() => {
        setTimeout(() => {
            setReady(true);
        }, 2 * 1000)
    }, []);

    if (!ready) {
        return (
            <>
            <span>Загрузка</span>
            </>
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