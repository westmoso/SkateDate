const mongoose = require('mongoose');
const express = require('express');
const app = express();
const config = require('config');

try {
	mongoose
		.connect(config.get("mongoURI"), {
			useNewUrlParser: true,
			useUnifiedTopology: true
		})
		.then(() => console.log("Connected to MongoDB."));
} catch (err) {
	console.log(`Could not connect to MongoDB.\nError: ${err}`);
	process.exit(24);
}

//ROUTES
const SkaterRoute = require('./server/routes/skater');


app.use(express.json());
app.use('/api/skater');

app.use("/api/skater", SkaterRoute)

// const port = process.env.PORT||5000;
// app.listen(port, () => {
//     console.log(`Server started on port:${port}`)
// });

app.all("*", (req, res) => {
	res.status(404).send(`Cannot find ${req.method} method for route ${req.path}`);
});

app.listen(process.env.PORT || 5000, () =>
	console.log(`Listening on port http://localhost:${process.env.PORT || 5000}/`)
);