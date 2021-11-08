const EventEmitter = require("events");

module.exports = class DemoBot extends EventEmitter {



	constructor(client, config) {
		super();
		this._client=client;
		this._config=config;
	}

	createNewProjects(schedule) {


		Promise.all([this._client.listProjects(), this._client.listArchivedProjects()]).then((lists) => {



			var randomTime = (min, max) => {
				return Math.floor(((Math.random() * (max - min)) + min) * 1000);
			};
			var checkInterval = () => {

				var projectList = lists[0];

				console.log(projectList);


				var projectInfo = {
					metadata: {
						iam: this._config.iam
					},
					attributes: {
						proposalAttributes: {
							title: require('./companyNames').sort(() => (Math.random() > .5) ? 1 : -1).shift(),
							isDataset: false
						}
					}
				}


				this._client.createProject(projectInfo).then((data) => {

					console.log(data);

					this._client.listProjects().then((updatedProjectList) => {
						console.log(updatedProjectList);
					})
				});


			};



			//checkInterval();
			var next = (new Date()).getTime() + randomTime.apply(null,(schedule.intervals[0]));
			setInterval(() => {

				if ((new Date()).getTime() > next) {
					checkInterval();
					next = (new Date()).getTime() + randomTime.apply(null,(schedule.intervals[1]));
				} else {
					console.log((Math.round((next - (new Date()).getTime()) / 100) / 10) + 's');
				}


			}, 1000);



		});


	}
}