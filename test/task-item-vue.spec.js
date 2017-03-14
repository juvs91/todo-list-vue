import Vue from "vue";
import app from "../client/app.vue";
import taskItem from '../client/components/task-item.vue';	

describe("task-list",()=>{
	// it should have the finish event 
	it("should finish a tasks",()=>{
		const ConstructorApp = Vue.extend(app);
		const compApp = new ConstructorApp({
    	});
    	const ConstructorItem = Vue.extend(taskItem);
    	const compItem = new ConstructorItem({});
    	compItem.$mount();
    	compApp.$data.state = 2;
		compApp.$data.tasks = [{id:1,text:"sample",state:0},{id:1,text:"sample",state:0}];
    	compItem.$emit("finishTask",compApp.$data.tasks[0]);
    	expect(compApp.$data.tasks[0].state).toBe(1);
	})
	//it should have a delete event
	it("should have a delete a task",()=>{

	}) 
	// it should change teh task to editable on click
	it("should manage the state of editable ",()=>{
		const ConstructorItem = Vue.extend(taskItem);
    	const compItem = new ConstructorItem({});
    	compItem.$mount();
    	compItem.$emit("changeTaskToEditable",{});
    	expect(compItem.$data.editable).toBe(true);
	})
});
