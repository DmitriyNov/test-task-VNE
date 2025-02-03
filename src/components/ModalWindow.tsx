export default function ModalWindow(props: {text: string}) {

    const {text} = props;

    return (
        <div className="modal">
            <span>
                {text}
            </span>
        </div>
    )
}