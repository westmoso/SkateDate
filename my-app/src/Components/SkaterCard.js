import { React, useState } from 'react'
import "./SkaterCard.css"

function SkaterCard() {
    const [skater, setSkater] = useState([
        {
            firstName: "first card name",
            age: "35",
            skateStatus: true,
            url: "https://cdn.pixabay.com/photo/2016/09/17/07/03/instagram-1675670_960_720.png"
        },
        {
            firstName: "second card name",
            age: "26",
            skateStatus: true,
            url: "https://1000logos.net/wp-content/uploads/2020/11/Pokemon25.jpg"
        }
    ]);

    const swiped = (direction, nameToDelete) => {
        console.log("removing: " + nameToDelete);
    };

    const outOfFrame = (name) => {
        console.log(name + " left the screen!");
    };


    return (
        <div className="SkaterCard">
            <div className="SkaterCard__cardcontainer">
                {skater.map((skater) => (
                    <SkaterCard
                        className="swipe"
                        key={skater.firstName}
                        preventSwipe={["up", "down"]}
                        onSwipe={(dir) => swiped(dir, skater.firstName)}
                        onCardLeftScreen={() => outOfFrame(skater.firstName)}
                    >
                        <div style={{
                            backgroundImage: `url(${skater.url})`
                        }}
                            className="card"
                        >
                            <h3>{skater.firstName}</h3>
                        </div>

                    </SkaterCard>
                ))}
            </div>
        </div>
    );
}

export default SkaterCard;
