import { useContext } from "react"
import { adsData } from "../context/adsData";
import { AdContainer } from "./adContainer";

export function MyAds() {

    const ads = useContext(adsData);

    return (

        <div className="contentView-container">

            <h3>Моите обяви {ads.myAds.length}</h3>

            {ads.myAds.map((data, i) => {

                return (
                  <AdContainer key={i} data={data} i={i}/>
                )
            })}

            {ads.myAds.length === 0 ? <span >Нямате обяви...</span> : ''}

        </div>
    )


}