export default function Header(props: {total: number}) {

    const {total} = props;

    return (
        <header className="header bg-white">
            <span className="header__title">Тествое задание VNE</span>
            <span className="header__info">всего отзывов: {total}</span>
        </header>
    )
}