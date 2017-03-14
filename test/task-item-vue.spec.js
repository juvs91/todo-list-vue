import Vue from "vue";
import app from "../client/app.vue";
import taskItem from '../client/components/task-item.vue';	
import VueResource from 'vue-resource';
Vue.use(VueResource);

describe("task-list",()=>{
	// it should have the finish event 
	it("should finish a tasks",()=>{
		/*const ConstructorApp = Vue.extend(app);
		const compApp = new ConstructorApp({
    	});*/
    	const ConstructorItem = Vue.extend(taskItem);
    	const compItem = new ConstructorItem({
    		data : {
    			item : {id:1, text:"sample", state:0},
    			index : 0,
    			state : 0,
    			editable : false
    		}
    	});
    	compItem.$mount();
    	compItem.finishTask(compItem.$data.item);
    	setTimeout(function(){ expect(compItem.$data.item.state).toBe(1); }, 300);
 
	})
	//it should have a delete event
	it("should delete a task",()=>{
    	const ConstructorItem = Vue.extend(taskItem);
    	const compItem = new ConstructorItem({
    		data : {
    			item : {id:1, text:"sample", state:0},
    			index : 0,
    			state : 0,
    			editable : false
    		}
    	});
    	compItem.$mount();
    	compItem.deleteItem(compItem.$data.item);
    	setTimeout(function(){ expect(compItem.$data.item).toBe(null); }, 300);

	}) 



	// it should change teh task to editable on click
	it("should manage the state of editable ",()=>{
		const ConstructorItem = Vue.extend(taskItem);
    	const compItem = new ConstructorItem({
    		data : {
    			item : {id:1, text:"sample", state:0},
    			index : 0,
    			state : 0,
    			editable : false
    		}
    	});
    	compItem.$mount();
    	compItem.changeTaskToEditable({});
    	expect(compItem.$data.editable).toBe(true);
	})
});
