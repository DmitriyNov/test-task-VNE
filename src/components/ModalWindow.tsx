export default function ModalWindow(props: {text: string}) {

    const {text} = props;

    return (
        <div className="modal fixed h-30 w-100 top-[35%] left-[50%] translate-[-50%] bg-gray-200 rounded flex justify-center items-center">
            <span className="text-xl font-bold">
                {text}
            </span>
        </div>
    )
}