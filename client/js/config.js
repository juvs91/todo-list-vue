//the route buildedRoute is the one that should be updated dinamically to point to diferent services
let config = {
	vue : {
		components : {},
	},
	httpHeader : {
		"accept": "application/json",
		"content-type": "application/json",
		"cache-control": "no-cache",
	},
	httpCredentials : false,
	httpTimeout : 300,
	server : "http://localhost:3000/api",
	jsonDataType : "application/json",
	taskRoute : "/y",
	routes : {
		tasks : "",
		buildedRoute: ""
	}
}
config.routes.tasks = config.server+config.taskRoute;
config.routes.buildedRoute = config.routes.tasks;

export default config;