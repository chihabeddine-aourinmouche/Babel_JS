const express = require("express");
const app = express();
const port = 3000;

/**
 * LE RÉPERTOIRE PUBLIC EST.. DEVINEZ.. PLUBLIQUE !
*/
app.use(express.static("public"));

/**
 * SERVIR LE FICHIER HTML INDEX.HTML
*/
app.get("/", (req, res) => {
	res.sendFile(`${__dirname}/public/index.html`);
});

app.listen(process.env.PORT || port, () => {
	console.log(`BabelJS listening on port ${port}!`);
});
