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

    const currentIndex: number = commentList.data.findIndex((item: CommentModel) => item.id === currentCommentId);
    const currentComment: CommentModel = commentList.data[currentIndex];

    // Текущее значение текста комментария в поле ввода и обработчик для события onChange
    const [commentText, setCommentText] = useState<string | null>(text);
    function handlerChangeText(event: ChangeEvent<HTMLTextAreaElement>) {
        // Ограничение количества символов
        if (event.currentTarget.value.length > 500) {
            return;
        }
        setCommentText(event.currentTarget.value);
    }

    // Ссылки на загруженные изображения и обработчик для события onChange
    const [uploadImages, setUploadImages] = useState<string[]>([]);
    function uploadingImage(event: ChangeEventHandler<HTMLInputElement>) {
        const currentImages: FileList = event.currentTarget.files; // Линтёр пишет, что такое свойство не существует у типа ChangeEventHandler, но всё работет. 
        const currentURLs: string[] = [];
        // Ограничение количества изображений
        const limit: number = (((currentComment.images?.length || 0) + currentImages.length) <= 5) ? currentImages.length - (currentComment.images?.length || 0) : 5 - (currentComment.images?.length || 0);
        // FileList почему-то не итерируется функциями массива, поэтому прохожу циклом 
        for (let i: number = 0; i < limit; i++) {
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
                currentList[currentIndex].text = commentText;
                currentList[currentIndex].images = images?.concat(uploadImages) || uploadImages;
                currentList[currentIndex].updateDT = moment().format("YYYYMMDD"); //Формат даты не нравится, нужно переделать
                handlerChangeComment({...commentList, data: currentList});
                setUploadImages([]);
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
            <div className="comment_data__edit mb-5">
                <textarea className="w-full h-30 p-3 resize-none bg-gray-100" value={commentText} onChange={handlerChangeText} />
                <div className="relative">
                    <input className="invisible absolute" id="input_file" type="file" accept="image/*" multiple={true} onChange={uploadingImage} />
                    <label className="block w-40 my-5 py-1 cursor-pointer rounded bg-gray-100 hover:bg-gray-200 text-center" for="input_file">Добавить фото</label>
                </div>
                
                <div className="comment_data__images mb-3 flex flex-row gap-4">
                    {(!images) || images.map((item: string, i: number) => (
                        <img key={i} className="w-40 h-40 object-cover rounded" src={item} />
                    ))}
                    {uploadImages.map((item: string, i: number) => (
                        <img key={i} className="w-40 h-40 object-cover rounded" src={item} />
                    ))}
                </div>
            </div> :
            <div className="comment_data mb-5">
                <span>
                    {text}
                </span>
                <div className="comment_data__images my-3 flex flex-row gap-4">
                    {(!images) || images.map((item: string, i: number) => (
                        <img key={i} className="w-40 h-40 object-cover rounded" src={item} />
                    ))}
                </div>
            </div>
            }
            <button className={"comment_data__button text-lg font-medium w-40 py-1 flex justify-start align-middle cursor-pointer rounded bg-gray-100 hover:bg-gray-2000 " + ((isEdit) ? "pl-8.5" : "pl-4.5")} onClick={editComment}>
                {(isEdit) ? <span>Сохранить</span> : <span>Редактировать</span>}{(isLoading) && <Loader />}
            </button>
            {(showError) && <ModalWindow text="Произошла ошибка!!!!!!!" />}
            {/* Понимаю, что модалку лучше вставлять дочерним элементом куда-нибудь в body, но тогда нужно было бы выносить стейт для её показа на самый верхний компонент, здесь для примера решил сделать так */}
        </div>
    )
}