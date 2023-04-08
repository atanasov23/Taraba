import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AdContainer } from "./adContainer";
import { adsData } from "../context/adsData";

export function DisplayAds() {

    const params = useParams();

    const [ads, setAds] = useState([]);

    const ads_data = useContext(adsData);

    useEffect(() => {

        if (params.electronic === 'all') {

            setAds(ads_data.allAds);

        } else {

            const filter = ads_data.allAds.filter(ads => {

                if (ads.category === params.electronic) {

                    return ads;
                }

                
            });

            setAds(filter);
        }

    }, [params.electronic, ads_data.allAds]);

    return (
        <div className="contentView-container">

            <h3>{ads.length} обяви</h3>

            {ads.map((data, i) => {

                return (
                    <AdContainer key={i} data={data} i={i} />
                )
            })}

            {ads.length === 0 ? <span >Няма обяви за показване...</span> : ''}

        </div>
    )


}