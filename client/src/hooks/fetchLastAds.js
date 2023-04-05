import { useEffect } from "react";

export const useLastAds = (setLastAds, allAds) => {

    useEffect(() => {

        fetch("http://localhost:1000/lastAds")
            .then(a => a.json())
            .then(a => {
                setLastAds(a);
            });

    }, [allAds, setLastAds]);
}