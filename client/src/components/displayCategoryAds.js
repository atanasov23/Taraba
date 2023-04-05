import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { AdContainer } from "./adContainer";

export function DisplayAds() {

    const params = useParams();

    const [ads, setAds] = useState([]);

    useEffect(() => {

        fetch(`http://localhost:1000/ads/${params.electronic}`)
            .then(a => a.json())
            .then(a => {
                setAds(a);
            });

    }, [params.electronic]);

    return (
        <div className="contentView-container">

            {ads.map((data, i) => {

                return (
                    <AdContainer key={i} data={data} i={i} />
                )
            })}

            {ads.length === 0 ? <span >Няма обяви за показване...</span> : ''}

        </div>
    )


}