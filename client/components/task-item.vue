<template>
	<li  class='js_taks' v-show="showItem"> 
		<span @click='changeTaskToEditable(item)' v-show:editable="!editable"> {{item.text}}</span> 
		<input type="text" v-show:editable="editable" v-bind:value="item.text" v-on:blur="updateTask">
		<span v-if="item.state === 0"> doing</span>
		<span v-if="item.state !== 0"> finished</span>
		<button class='js_finish' @click='finishTask(item)'>finish</button>   
		<button class='js_delete' @click='deleteItem(item)'>delete</button> 
	</li>
</template>
<script>
	import services from '../js/services.js'
	let itemListTemplate = {};

	itemListTemplate.buildItem = (id,state,text)=>{
		return {
			id:id,
			state:state,
			text:text
		};
	}
	let callBacksForTask = {
		deletedSuccess (){
			this.$emit("deleteTask",this.index);
		},
		deletedFail (){
			//print error message
			console.log("fail deleting the task");
		},
		updatedSuccess(response){
			console.log(response.body);
			this.item.text  = response.body.text;
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
			console.log("finish succes");
			this.item.state = 1;
		}
	};
	let eventsForTask = {
		deleteItem (t){
			//todo remove the element in the DB and if it's success remove it from DOM
			return services.deleteItem(t.id,callBacksForTask.deletedSuccess.bind(this),callBacksForTask.deletedFail);
			
		},
		updateTask (e){
			console.log("update");
			let task = itemListTemplate.buildItem(this.item.id,1,e.target.value.trim());
			return services.updateItem(task,callBacksForTask.updatedSuccess.bind(this),callBacksForTask.updatedFail);
		},
		changeTaskToEditable(item) {
			this.editable = true;
		},
		finishTask (t) {
			let task = itemListTemplate.buildItem(t.id,1,t.text.trim());
			return services.updateItem(task,callBacksForTask.finishSuccess.bind(this),callBacksForTask.finishFail);			
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
