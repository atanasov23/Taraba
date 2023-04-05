import { useEffect } from "react";

export const useFetchAll = (setAllAds) => {

    useEffect(() => {

        fetch("http://localhost:1000/all")
            .then(a => a.json())
            .then(a => {
                setAllAds(a);
            });

    }, [setAllAds]);

}