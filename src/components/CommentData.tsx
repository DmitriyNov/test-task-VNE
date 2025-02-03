import { useOutletContext } from 'react-router-dom'
import { useState, ChangeEvent, ChangeEventHandler } from "react"
import { CommentModel } from '../models/CommentModelDataResult'
import moment from 'moment'
import Loader from './Loader'
import { errorChance } from '../handlers/handlers'
import ModalWindow from './ModalWindow'

export default function CommentData(props: {text: string | null, images: string[] | null}) {

    const {text, images} = props;

    const [ commentList, handlerChangeComment, currentCommentId, handlerChangeCurrentCommentId ] = useOutletContext<Context>();

    // Текущее значение текста комментария в поле ввода и обработчик для события onChange
    const [commentText, setCommentText] = useState<string | null>(text);
    function handlerChangeText(event: ChangeEvent<HTMLTextAreaElement>) {
        setCommentText(event.currentTarget.value);
    }

    // Ссылки на загруженные изображения и обработчик для события onChange
    const [uploadImages, setUploadImages] = useState<string[]>([]);
    function uploadingImage(event: ChangeEventHandler<HTMLInputElement>) {
        const currentImages: FileList = event.currentTarget.files; // Линтёр пишет, что такое свойство не существует у типа ChangeEventHandler, но всё работет. 
        const currentURLs: string[] = [];
        // FileList почему-то не итерируется функциями массива, поэтому прохожу циклом 
        for (let i: number = 0; i < currentImages.length; i++) {
            currentURLs.push(URL.createObjectURL(currentImages[i]));
        }
        setUploadImages(currentURLs);
    }

    const [isEdit, setEdit] = useState<boolean>(false);
    const [isLoading , setIsLoading] = useState<boolean>(false);
    const [showError, setShowError] = useState<boolean>(false);
    function editComment() {
        if (isEdit) {
            // Колбэк в случае отсутствия ошибок
            function handlerEditComment(): void {
                const currentList: CommentModel[] = [...commentList.data];
                const currentIndex: number = currentList.findIndex((item: CommentModel) => item.id === currentCommentId);
                currentList[currentIndex].text = commentText;
                currentList[currentIndex].images = images?.concat(uploadImages) || uploadImages;
                currentList[currentIndex].updateDT = moment().format("YYYYMMDD"); //Формат даты не нравится, нужно переделать
                handlerChangeComment({...commentList, data: currentList});
                setIsLoading(false);
                setEdit(false);
            }
            // Колбэк при наличии ошибки
            function handlerEror(): void {
                setIsLoading(false);
                setShowError(true);
                setTimeout(() => {
                    setShowError(false);
                }, 3 * 1000);
            }
            setIsLoading(true);
            // Имитация загрузки данных
            setTimeout(() => {
                // Функция, с некоторой долей вероятности выбрасывающая ошибку
                errorChance(handlerEditComment, handlerEror);
            }, 1.5 * 1000);
            
        } else {
            setEdit(true);
        }
    }

    return (
        <div className="comment_data__container">
            {(isEdit) ?
            <div>
                <textarea value={commentText} onChange={handlerChangeText} />
                <input type="file" accept="image/*" multiple={true} onChange={uploadingImage} />
                <div className="comment_data__images">
                    {(!images) || images.map((item: string) => (
                        <img src={item} />
                    ))}
                    {uploadImages.map((item: string) => (
                        <img src={item} />
                    ))}
                </div>
            </div> :
            <div className="comment_data">
                <span>
                    {text}
                </span>
                <div className="comment_data__images">
                    {(!images) || images.map((item: string) => (
                        <img src={item} />
                    ))}
                </div>
            </div>
            }
            <button className="comment_data__button" onClick={editComment}>
                {(isEdit) ? "Сохранить" : "Редактировать"}{(isLoading) && <Loader />}
            </button>
            {(showError) && <ModalWindow text="Произошла ошибка!!!!!!!" />}
            {/* Понимаю, что модалку лучше вставлять дочерним элементом куда-нибудь в body, но тогда нужно было бы выносить стейт для её показа на самый верхний компонент, здесь для примера решил сделать так */}
        </div>
    )
}