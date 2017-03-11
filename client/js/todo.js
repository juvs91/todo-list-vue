((window,config,taskData,$,undefined) => {
	let todoApp = window.todoApp || {};
	/*todoApp.actions = {
		filters : {},
	};*/
	todoApp.callBacks = {
		"successGetAllTasks": ()  => {
			console.log("success, get all task");
		},
		"failGetAllTasks":()  =>  {
			console.log("fail, get all task");	
		}
	};
	todoApp.generalEvents = {
		"createTask":(e) => {
			if(e.keyCode === 13){
				let task = {
					text : e.target.value.trim()
				};
				console.log(task);
				let context = this;
				$.when(taskData.fetchData.createTask(task)).then(function (task) {
					// success
					context.todoApp.vue.tasks.push(task);
				},function (msg) {
					console.log("upsyyy")
				});
			}
		}
	};

	$(document).ready(() => {

		//render all the components that are set in the config vue 
		for (let element in config.vue.components) {
			Vue.component(element,config.vue.components[element]);
		}


		todoApp.vue = new Vue({
			el : "#container",
			data :{
				tasks : [
					{ id : "1", text : "todo 1"},
					{ id : "2",text : "todo 2"}
				],
			},
			methods:todoApp.generalEvents,
			components : config.vue.components,
		});
	});
	if(typeof window.todoApp == "undefined"){
		window.todoApp = todoApp;
	}
})(window,config,taskData,$,undefined);