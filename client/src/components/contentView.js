import { useContext } from 'react';
import { AdContainer } from './adContainer';
import { adsData } from '../context/adsData';

export function ContentView() {

    const ads_data = useContext(adsData);

    return (

        <div className="contentView-container">

            <h3>Последнo добавени обяви</h3>

            {ads_data.lastAds.map((data, i) => {

                return (
                    <AdContainer key={i} data={data} i={i}/>
                )
            })}

            {ads_data.allAds.length === 0 ? <span >Няма обяви за показване...</span> : ''}

        </div>
    )

}