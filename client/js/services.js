((window,$)=>{
	let services = window.services || {};
	services.actions = {
		createAjaxCall : (contentType, data, url, method) => {
				return $.ajax({
					"headers" : {

					},
					"method": method,
					"contentType": contentType,
					"url": url,
					"data": data
				}).promise();
		},
		getItems : (success,fail)=>{
			let callBacks = services.actions.checkCallCabckFunctions(success,fail);
			$.when(createAjaxCall("application/json", {}, "localhost:8080/items", "GET")).then(callBacks[0],callBacks[1]);
		},
		getItem : (id,success,fail) =>{
			let callBacks = services.actions.checkCallCabckFunctions(success,fail);
			$.when(createAjaxCall("application/json", id, "localhost:8080/item", "GET")).then(callBacks[0],callBacks[1]);
		},
		deleItem : (id,success,fail) =>{
			let callBacks = services.actions.checkCallCabckFunctions(success,fail);
			$.when(createAjaxCall("application/json", id, "localhost:8080/item", "DELETE")).then(callBacks[0],callBacks[1]);
		},
		createItem : (item,success,fail) =>{
			let callBacks = services.actions.checkCallCabckFunctions(success,fail);
			$.when(createAjaxCall("application/json", item, "localhost:8080/item","POST")).then(callBacks[0],callBacks[1]);
		},
		updateItem : (item,success,fail) =>{
			let callBacks = services.actions.checkCallCabckFunctions(success,fail);
			$.when(createAjaxCall("application/json", item, "localhost:8080/item", "PATCH")).then(callBacks[0],callBacks[1]);
		},
		checkCallCabckFunctions : (success,fail)=>{
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
	if(typeof window.services == "undefined"){
		window.services = services;
	}
})(window,$,undefined);