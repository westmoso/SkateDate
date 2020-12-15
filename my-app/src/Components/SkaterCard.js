// import { React } from 'react'
// import "./SkaterCard.css"

// function SkaterCard() {
//     const [skater, setSkater] = useState([
//         {
//             firstName: "first card name",
//             age: "35",
//             skateStatus: true,
//             url: "https://cdn.pixabay.com/photo/2016/09/17/07/03/instagram-1675670_960_720.png"
//         },
//         {
//             firstName: "second card name",
//             age: "26",
//             skateStatus: true,
//             url: "https://1000logos.net/wp-content/uploads/2020/11/Pokemon25.jpg"
//         }
//     ]);

//     const swiped = (direction, nameToDelete) => {
//         console.log("removing: " + nameToDelete);
//     };

//     const outOfFrame = (name) => {
//         console.log(name + " left the screen!");
//     };


//     return (
//         <div className="SkaterCard">
//             <div className="SkaterCard__cardcontainer">
//                 {skater.map((skater) => (
//                     <SkaterCard
//                         className="swipe"
//                         key={skater.firstName}
//                         preventSwipe={["up", "down"]}
//                         onSwipe={(dir) => swiped(dir, skater.firstName)}
//                         onCardLeftScreen={() => outOfFrame(skater.firstName)}
//                     >
//                         <div style={{
//                             backgroundImage: `url(${skater.url})`
//                         }}
//                             className="card"
//                         >
//                             <h3>{skater.firstName}</h3>
//                         </div>

//                     </SkaterCard>
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default SkaterCard;

// export default function SkaterCard() {
//     return (
//         <div>
//             <h1>skater card</h1>
//         </div>
//     )
// }


// import { boolean, string } from "joi";

// const mongoose = require("mongoose");

// const cardSchema = new mongoose.Schema({
//     firstName: string,
//     age: string,
//     skateStatus: boolean,
//     imgUrl: string
// })

// export default mongoose.model('cards', cardSchema)


// import { People } from '@material-ui/icons';
import React, { useState } from 'react';
import TinderCard from "react-tinder-card";

function skaterCard() {
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
    ])
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

export default skaterCard
