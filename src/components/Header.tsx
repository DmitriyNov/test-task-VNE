export default function Header(props: {total: number}) {

    const {total} = props;

    return (
        <header className="header py-10 w-240 mx-auto flex justify-between">
            <span className="header__title text-2xl font-bold">Тествое задание VNE</span>
            <span className="header__info text-lg font-medium">всего отзывов: {total}</span>
        </header>
    )
}