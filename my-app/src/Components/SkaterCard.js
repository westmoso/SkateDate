import React, { useState, useEffect } from 'react';
import TinderCard from "react-tinder-card";
import database from "../firebase"

function SkaterCard() {
    const [skater, setSkater] = useState([
        {
            name: "george daniel",
            url: "https://cdn.pixabay.com/photo/2016/09/17/07/03/instagram-1675670_960_720.png"
        },
        {
            name: "matty healy",
            url: "https://cdn.pixabay.com/photo/2016/09/17/07/03/instagram-1675670_960_720.png"
        },
        {
            name: "ross macdonald ",
            url: "https://cdn.pixabay.com/photo/2016/09/17/07/03/instagram-1675670_960_720.png"
        }
    ]);

    useEffect(() => {
        database
            .collection(`skater`)
            .onSnapshot(snapshot => {
                setSkater(snapshot.docs.map(doc => doc.data()))
            })
    }, [])

    return (
        <div>
            <h1>Skater cards</h1>
            <div className="SkaterCard__cardcontainer"></div>
            {skater.map(skater => (
                <TinderCard
                    className="swipe"
                    key={skater.name}
                    preventSwipe={['up', 'down']}>
                    <div style={{
                        backgroundImage: `url(${skater.url})`
                    }} className="card">
                        <h3>
                            {skater.name}
                        </h3>
                    </div>
                </TinderCard>



            ))}
        </div>
    )
}

export default SkaterCard
