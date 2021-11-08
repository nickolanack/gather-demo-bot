const credentials = require("./credentials.json");
const config = require("./config.json")
const DemoBot = require("./src/DemoBot.js");



const GatherClient = require("gather-node-client");
const client = new GatherClient(credentials, config, () => {



	(new DemoBot(client, config)).createNewProjects({
		intervals:[[10, 60],[30, 300]]
	});



});