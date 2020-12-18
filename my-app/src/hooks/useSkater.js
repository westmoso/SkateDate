import React, { createContext, useContext, useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import AuthProvider from "../Providers/AuthProvider";

function getCurrentSkater(token) {
	const skaterDecoded = jwt.decode(token);
	return skaterDecoded;
}

const SkaterContext = createContext({
	skater: null,
	token: null
});

export function SkaterProvider([children]) {
	const getToken = AuthProvider.provider.token;
	const [token, setToken] = useState(getToken);
	const [skater, setSkater] = useState(null);

	useEffect((skater) => {
		if (!skater && token) {
			const skater = getCurrentSkater(token);
			AuthProvider.provider.token = token;
			setSkater(skater);
		} else if (!token) {
			AuthProvider.provider.logout();
			setSkater(null);
		}
	}, [token]);

	return <SkaterContext.Provider value={(skater, token, setToken)}>{[children]}</SkaterContext.Provider>;
}
const useSkater = () => useContext(SkaterContext);

export default useSkater;