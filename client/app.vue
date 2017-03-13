<template>
  <div id="app">
  		<header>
			<h1>Todo list</h1>
			{{message}}
		</header>
		<section id="container">
			<input type="text" class="js_task_input" placeholder="enter a new task" v-on:keyup.enter="createTask">
			<button class="js_filter_all_tasks" v-on:click="changeDisplayTask(2)">all tasks</button>
			<button class="js_filter_finished_tasks" v-on:click="changeDisplayTask(1)">finished tasks</button>
			<button class="js_filter_doing_tasks" v-on:click="changeDisplayTask(0)">doing tasks</button>
			<ul class="todo-list">
				<task-item v-for="(item, index) in tasks" v-bind:item="item" v-bind:index="index" v-bind:state="state" @deleteTask="deleteTask"></task-item>
			</ul>
		</section>
  </div>
</template>
<script>
import taskItem from './components/task-item.vue';
import services from './js/services.js'
let todoApp = {};
todoApp.callBacks = {
	successGetAllTasks (tasks) {
		this.tasks = tasks.body;
		/*for (var i = tasks.body.length - 1; i >= 0; i--) {
			this.todoApp.vue.$data.tasks.push(tasks.body[i]);
		}*/
		console.log("success, get all task");
	},
	failGetAllTasks() {
		console.log("fail, get all task");	
	},
	successCreateTask(task){
		this.tasks.push(task.body);
	},
	failCreateTask(){
		console.log("fail creating the task");
	}
};
todoApp.generalFunctions = {
	createTask(e){
		if(e.keyCode === 13){
			let text = e.target.value.trim();
			services.createItem({"text" : text, "state":0},todoApp.callBacks.successCreateTask.bind(this),todoApp.callBacks.failCreateTask.bind(this));
		}
	},
	deleteTask (index){
	 	this.tasks.splice(index,1);
  	},
  	updateTask({task,index}){
  		this.tasks[index] = task;
  	},
  	changeDisplayTask(state){
  		this.state = state;
  	}
};
let set = "asdfsad";
export default {
  name: 'app',
  data () {
    return {
      tasks : [],
      state : 2,
      message: 'Welcome to Your Vue.js App'
    }
  },
  components : {taskItem},
  methods : todoApp.generalFunctions,
  mounted () {
	services.getItems(todoApp.callBacks.successGetAllTasks.bind(this),todoApp.callBacks.failGetAllTasks.bind(this));
   }
}
</script>





