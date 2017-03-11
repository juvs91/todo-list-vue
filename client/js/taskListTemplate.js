((window,Vue,config,util,taskData)=>{
	let taskListTemplate = window.taskListTemplate || {};
	if(typeof window.taskListTemplate == "undefined"){
		window.taskListTemplate = taskListTemplate;
	}
	let callBacksForTask = {
		"deletedSuccess": (task) =>{
			//remove from dom the element
			$task = $("[data-id='"+task.id+"']");
			console.log($task[0]);
		},
		"deletedFail": ()=>{
			//print error message
			console.log("fail deleting the task");
		},
		"updatedSuccess":(e)=>{
			//update the dome element
			//$task = $("[data-id='"+task.id+"']");
			let $span = util.actions.changeToSpan(e);
			$span.on("click", eventsForTask.changeTaskToEditableEvent);
		},
		"updatedFail":()=>{
			//show error message
			console.log("");
		},
		"finishSuccess":()=>{
			//remove element or put it on green
			console.log("");
		},
		"finishFail":(task)=>{
			//show error message 
			$task = $("[data-id='"+task.id+"']");
			console.log("");
		}
	};
	let eventsForTask = {
		"deleteEvent":(task) => {
			//todo remove the element in the DB and if it's success remove it from DOM
			console.log("delete the dom element");
			$.when(taskData.fetchData.deleteTask(task)).then(callBacksForTask.deletedSuccess,callBacksForTask.deletedFail);
			
		},
		"updateTaskEvent": (e) => {
			console.log("update");
			$.when(taskData.fetchData.updateTask(e)).then(callBacksForTask.updatedSuccess,callBacksForTask.updatedFail);
		},
		"changeTaskToEditableEvent":(e) => {
			let $input = util.actions.changeToInput(e);
			$input.on("blur",eventsForTask.updateTaskEvent);
		},
		"finishTask":(task) => {
			console.log("finish");
			$.when(taskData.fetchData.updateTask(task)).then(callBacksForTask.finishSuccess,callBacksForTask.finishFail);
			
		},
	};

	config.vue.components["task-list"] = Vue.extend({
		props : ["task"],
		template : "<li  v-bind:data-id='task.id' class='js_taks'> <span @click='changeTaskToEditableEvent'> {{task.text}} </span>  <button class='js_finish' @click='finishTask(task)'>finish</button>   <button class='js_delete' @click='deleteEvent(task)'>delete</button> </li> ",
		methods : eventsForTask,
		created : function (e) {
			console.log("created");
		},
		mounted : function (e) {
			console.log("mounted");
		}
	});
})(window,Vue,config,util,taskData,undefined);