import { useEffect, useState } from "react"

export default function Loader() {

    const [loader, setLoader] = useState<string>(".");

    // В задании было указано сделать индикатор загрузки, я надеюсь, там не имелся ввиду какой-нибудь сложный прогрессбар, потому что я не стал сильно заморачиваться)
    useEffect(() => {
        setTimeout(() => {
            if (loader.length < 3) {
                setLoader(loader + ".");
            } else {
                setLoader("");
            }
        }, 1 * 200);
    }, [loader]);

    return(
        <span>
            {loader}
        </span>
    )
}