import config from "./config.js";
import Vue from "vue";
export default{
		getItems (success,fail){
			let callBacks = this.checkCallCabckFunctions(success,fail);
			return Vue.http.get(config.routes.buildedRoute,
								{"headers" : config.httpHeader, "credentials" : config.httpCredentials, "timeout" : config.timeout}
								).then(callBacks[0],callBacks[1]);
		},
		getItem  (id,success,fail) {
			let callBacks = this.checkCallCabckFunctions(success,fail);
			return Vue.http.get(config.routes.buildedRoute+"/"+id,
								{"headers" : config.httpHeader, "credentials" : config.httpCredentials, "timeout" : config.timeout}
								).then(callBacks[0],callBacks[1]);
		},
		deleteItem  (id,success,fail) {
			let callBacks = this.checkCallCabckFunctions(success,fail);
			return Vue.http.delete(config.routes.buildedRoute+"/"+id,
									{"headers" : config.httpHeader, "credentials" : config.httpCredentials, "timeout" : config.timeout}
									).then(callBacks[0],callBacks[1]);
		},
		createItem (item,success,fail) {
			let callBacks = this.checkCallCabckFunctions(success,fail);
			return Vue.http.post(config.routes.buildedRoute,
								item,
								{"headers" : config.httpHeader, "credentials" : config.httpCredentials, "timeout" : config.timeout}
								).then(callBacks[0],callBacks[1]);
		},
		updateItem (item,success,fail){
			let callBacks = this.checkCallCabckFunctions(success,fail);
			return Vue.http.patch(config.routes.buildedRoute,
								 item,
								 {"headers" : config.httpHeader, "credentials" : config.httpCredentials, "timeout" : config.timeout}
								 ).then(callBacks[0],callBacks[1]);
		},
		checkCallCabckFunctions (success,fail){
			if (typeof success !== "function") {
				success = function () {
					console.log("the operation was a success");
				}
			}
			if (typeof fail !== "function") {
				fail = function () {
					console.log("the operation was a fail");
				}
			}
			return [success,fail];
		}
}