// import React from 'react'
// import { GoogleMap, LoadScript } from '@react-google-maps/api';

// const API_kEY = process.env.REACT_APP_API_KEY;
// console.log("Key is", API_KEY);

// const containerStyle = {
//     width: '400px',
//     height: '400px'
// };

// const center = {
//     lat: -3.745,
//     lng: -38.523
// };

// function MapPage() {
//     const [map, setMap] = React.useState(null)

//     const onLoad = React.useCallback(function callback(map) {
//         const bounds = new window.google.maps.LatLngBounds();
//         map.fitBounds(bounds);
//         setMap(map)
//     }, [])

//     const onUnmount = React.useCallback(function callback(map) {
//         setMap(null)
//     }, [])

//     return (
//         <LoadScript
//             googleMapsApiKey= API_kEY
//         >
//             <GoogleMap
//                 mapContainerStyle={containerStyle}
//                 center={center}
//                 zoom={10}
//                 onLoad={onLoad}
//                 onUnmount={onUnmount}
//             >
//                 <></>
//             </GoogleMap>
//         </LoadScript>
//     )
// }

// export default MapPage

