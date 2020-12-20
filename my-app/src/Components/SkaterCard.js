import React, { useState, useEffect } from 'react';
import TinderCard from "react-tinder-card";
import database from "../firebase"
import './SkaterCard.css';

function SkaterCard() {
    const [skater, setSkater] = useState([
        {
            age: "33",
            url: "https://images.freeimages.com/images/large-previews/611/bro-blading-1565212.jpg",
            name: "angus"

        },
        {
            age: "22",
            url: "https://images.freeimages.com/images/large-previews/611/bro-blading-1565212.jpg",
            name: "britney"

        },
    ]);


    useEffect(() => {
        const unsubscribe = database
            .collection(`skater`)
            .onSnapshot(snapshot => {
                setSkater(snapshot.docs.map(doc => doc.data()))
            });

        return () => {
            unsubscribe();
        };
    }, [])
    const swiped = (direction, nameToDelete) => {
        console.log("receiving " + nameToDelete)
    }


    const outOfFrame = (name) => {
        console.log(name + " was swiped off the screen!")
    }


    return (
        <div className="skaterCards">
            <div className="skaterCard__cardContainer">
                {skater.map(skater => (
                    <TinderCard
                        className="swipe"
                        key={skater.name}
                        preventSwipe={['up', 'down']}
                        onSwipe={(dir) => swiped(dir, skater.name)}
                        onCardLeftScreen={() => outOfFrame(skater.name)}>
                        <div style={{
                            backgroundImage: `url(${skater.url})`
                        }} className="card">
                            <h3>{skater.name} {skater.age}</h3>
                        </div>
                    </TinderCard>
                ))}
            </div>
        </div>
    )
}

export default SkaterCard
