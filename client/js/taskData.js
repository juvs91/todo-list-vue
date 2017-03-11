((window,services,$)=>{
	let taskData = window.taskData || {};
	//TODO   link the data fetch data with the service layer 
	taskData.fetchData = {
		"getTasks" : ()  =>  {
			console.log("all tasks");
			return $.when($.Deferred().resolve("yes").promise()).promise();
			//return $.when(services.actions.getItems(todoApp.callBacks.successGetAllTasks,todoApp.callBacks.failGetAllTasks)).promise();
		},
		"getTask" : (data)  =>  {
			console.log("one task");
			console.log(data);
			return $.when($.Deferred().resolve(data).promise()).promise();
			//services.actions.getItem(id,todoApp.callBacks.successGetAllTasks,todoApp.callBacks.failGetAllTasks);
		},
		"deleteTask":(data)  =>  {
			console.log("delete task");
			console.log(data);
			return $.when($.Deferred().resolve(data).promise()).promise();
			//services.actions.deleteTask(id,todoApp.callBacks.successGetAllTasks,todoApp.callBacks.failGetAllTasks);
		},
		"updateTask":(data)  =>  {
			console.log("update task");
			console.log(data);
			return $.when($.Deferred().resolve(data).promise()).promise();
			//services.actions.updateTask(item,todoApp.callBacks.successGetAllTasks,todoApp.callBacks.failGetAllTasks);

		},
		"createTask":(data)  =>  {
			console.log("create tasks");
			console.log(data);
			return $.when($.Deferred().resolve(data).promise()).promise();
			//services.actions.updateTask(item,todoApp.callBacks.successGetAllTasks,todoApp.callBacks.failGetAllTasks);

		}
	};

	if (typeof window.taskData === "undefined") {
		window.taskData = taskData;
	}
})(window,services,$,undefined);