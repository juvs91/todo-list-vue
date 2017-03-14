import Vue from "vue";
import app from "../client/app.vue";

describe("todo-app",()=>{
	// it should have the finish event 
	it("should render all the finished tasks ",()=>{

		const Constructor = Vue.extend(app);
		const comp = new Constructor({

    	});
		comp.$data.state = 1;
		comp.$data.tasks = [{id:1,text:"sample",state:1},{id:1,text:"sample",state:1}];
		comp.$mount();
		comp.$emit("changeDisplayTask",1);
		let elements = comp.$el.getElementsByTagName("li");
		let elementsFinished = [];
		for (var i = elements.length - 1; i >= 0; i--) {
			if (elements[i].style) {
				if ( elements[i].style.display == "") {
					elementsFinished.push(elements[i]);
				}
			}
		}
		expect(elementsFinished.length).toBe(2);
	})
	//it should have a delete event
	it("should render all tasks",()=>{
		const Constructor = Vue.extend(app);
		const comp = new Constructor({

    	});
		comp.$data.state = 1;
		comp.$data.tasks = [{id:1,text:"sample",state:0},{id:1,text:"sample",state:1}];
		comp.$mount();
		comp.$emit("changeDisplayTask",1);
		let elements = comp.$el.getElementsByTagName("li");
		expect(elements.length).toBe(2);
	}) 
	// it should change teh task to editable on click
	it("should render all pending tasks",()=>{
		const Constructor = Vue.extend(app);
		const comp = new Constructor({

    	});
		comp.$data.state = 1;
		comp.$data.tasks = [{id:1,text:"sample",state:0},{id:1,text:"sample",state:1}];
		comp.$mount();
		comp.$emit("changeDisplayTask",1);
		let elements = comp.$el.getElementsByTagName("li");
		let elementsFinished = [];
		for (var i = elements.length - 1; i >= 0; i--) {
			if (elements[i].style) {
				if ( elements[i].style.display == "none") {
					elementsFinished.push(elements[i]);
				}
			}
		}
		expect(elementsFinished.length).toBe(1);
	})
	//change to span when blur the editable task 
	/*it("should add a new task",()=>{
		const Constructor = Vue.extend(app);
		const comp = new Constructor({

    	});
		comp.$data.state = 1;
		comp.$data.tasks = [{id:1,text:"sample",state:0},{id:1,text:"sample",state:1}];
		comp.$mount();
		let input = comp.$el.getElementsByTagName("input")[0];
		input.value = "sample";
		input.keyup = 
		let elements = comp.$el.getElementsByTagName("li");
		expect(elements.length).toBe(3);
	})*/
	it("should have a task list data",()=>{
		let data = app.data();
		expect(typeof data.tasks.length).toBe(typeof 0);
	})
});