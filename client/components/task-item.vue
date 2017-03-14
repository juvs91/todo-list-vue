<template>
	<li  class='js_taks' v-show="showItem"> 
		<span @click='changeTaskToEditable(item)' v-show:editable="!editable"> {{item.text}}</span> 
		<span v-if="item.state === 0"> doing</span>
		<span v-if="item.state !== 0"> finished</span>
		<input type="text" v-show:editable="editable" v-bind:value="item.text" v-on:blur="updateTask">
		<button class='js_finish' @click='finishTask(item)'>finish</button>   
		<button class='js_delete' @click='deleteItem(item)'>delete</button> 
	</li>
</template>
<script>
	import services from '../js/services.js'
	let taskListTemplate = {};

	taskListTemplate.buildTask = (id,state,text)=>{
		return {
			id:id,
			state:state,
			text:text
		};
	}
	taskListTemplate.removeTask = (index)=>{
		todoApp.vue.$data.tasks.splice(index,1);
	}
	let callBacksForTask = {
		deletedSuccess (){
			this.$emit("deleteTask",this.index);
		},
		deletedFail (){
			//print error message
			console.log("fail deleting the task");
		},
		updatedSuccess(){
			this.item.text  = this.$el.children[1].value
			//this.$emit("updateTask",{item : this.item, index : this.index});
			this.editable = false;
		},
		updatedFail(){
			//show error message
			console.log("update fail");
		},
		finishFail(){
			//remove element or put it on green
			console.log("finish fail");
		},
		finishSuccess(){
			//show error message 
			console.log("succes");
			this.item.state = 1;
		}
	};
	let eventsForTask = {
		deleteItem (t){
			//todo remove the element in the DB and if it's success remove it from DOM
			console.log("delete the dom element");
			console.log(t);
			services.deleteItem(t.id,callBacksForTask.deletedSuccess.bind(this),callBacksForTask.deletedFail);
			
		},
		updateTask (){
			console.log("update");
			services.updateItem(this.item,callBacksForTask.updatedSuccess.bind(this),callBacksForTask.updatedFail);
		},
		changeTaskToEditable(item) {
			this.editable = true;
		},
		finishTask (t) {
			console.log("finish");
			let task = taskListTemplate.buildTask(t.id,1,t.text.trim());
			services.updateItem(task,callBacksForTask.finishSuccess.bind(this),callBacksForTask.updatedFail);			
		}
	};
	let computedFunctions = {
		showItem(){
			return this.item.state === this.state || this.state === 2;
		}
	};
	export default{
		name : "task-item",
		props : ["item","index","state"],
		methods : eventsForTask,
		computed : computedFunctions,
		data (){
			return {
				editable : false

			};
		}
	}
</script>	
