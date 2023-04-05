import { useEffect } from "react";

export const useFetchMyads = (setMyFavorites, setMyAds, user, myAds) => {

    useEffect(() => {

        if (user) {

            fetch(`http://localhost:1000/fav/${user._id}`)
                .then(a => a.json())
                .then(a => setMyFavorites(a));

            fetch(`http://localhost:1000/myAds/${user._id}`)
                .then(a => a.json())
                .then(a => setMyAds(a));

        }

    }, [user, setMyAds, setMyFavorites, myAds]);
}