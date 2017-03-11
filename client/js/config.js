((window,Vue)=>{
	if(typeof Vue === "undefined"){
		console.error("need Vue to operate");
		throw "Vue undefined";
	}

	let config = window.config || {};

	config = {
		vue : {
			components : {},
		},
		server : "localhost:8080",
		jsonDataType : "application/json",
		httpGet : "GET",
		httpPost : "POST",
		httpDelete : "DELETE",
		httpUpdate : "UPDATE",
		httpPatch  : "PATCH"
	};
	if(typeof window.config == "undefined"){
		window.config = config;
	}
})(window,Vue,undefined);