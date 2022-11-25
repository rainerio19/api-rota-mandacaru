const functions = require("firebase-functions");
admin = require("firebase-admin");
express = require("express");
cors = require("cors");
app = express();
app.use(cors({ origin: true }));

var serviceAccount = require("./ChaveAcesso.json");
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://rota-mandacaru.firebaseio.com",
});
const db = admin.firestore();

// read vehicles
app.get("/vehicles", (req, res) => {
	(async () => {
		try {
			let query = db.collection("vehicles");
			let response = [];
			await query.get().then((querySnapshot) => {
				let docs = querySnapshot.docs;
				for (let doc of docs) {
					const selectedItem = {
						// id: doc.id,
						value: doc.data().value,
						label: doc.data().label,
						tank: doc.data().tank,
						performance: doc.data().performance,
					};
					response.push(selectedItem);
				}
			});
			return res.status(200).send(response);
		} catch (error) {
			console.log(error);
			return res.status(500).send(error);
		}
	})();
});

app.get("/trips", (req, res) => {
	(async () => {
		try {
			let query = db.collection("trips");
			let response = [];
			await query.get().then((querySnapshot) => {
				let docs = querySnapshot.docs;
				for (let doc of docs) {
					const selectedItem = {
						// id: doc.id,
						value: doc.data().value,
						label: doc.data().label,
						start_coords: doc.data().start_coords,
						destination_coords: doc.data().destination_coords,
					};
					response.push(selectedItem);
				}
			});
			return res.status(200).send(response);
		} catch (error) {
			console.log(error);
			return res.status(500).send(error);
		}
	})();
});

app.get("/fuels", (req, res) => {
	(async () => {
		try {
			let query = db.collection("fuels");
			let response = [];
			await query.get().then((querySnapshot) => {
				let docs = querySnapshot.docs;
				for (let doc of docs) {
					const selectedItem = {
						// id: doc.id,
						value: doc.data().value,
						label: doc.data().label,
						city: doc.data().city,
						coords: doc.data().coords,
					};
					response.push(selectedItem);
				}
			});
			return res.status(200).send(response);
		} catch (error) {
			console.log(error);
			return res.status(500).send(error);
		}
	})();
});

exports.app = functions.https.onRequest(app);
