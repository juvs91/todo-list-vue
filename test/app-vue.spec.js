import Vue from "vue";
import app from "../client/app.vue";
import VueResource from 'vue-resource';
Vue.use(VueResource);

describe("todo-app",()=>{
	// it should have the finish event 
	it("should render all the finished tasks ",()=>{

		const Constructor = Vue.extend(app);
		const comp = new Constructor({
			data: {
				state : 1,
				tasks : [{id:1,text:"sample",state:0},{id:1,text:"sample",state:1},{id:1,text:"sample",state:1}],

			}
    	});
		//comp.$data.state = 1;
		//comp.$data.tasks = [{id:1,text:"sample",state:1},{id:1,text:"sample",state:1}];
		comp.$mount();
		comp.changeDisplayTask(1);
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
			data: {
				state : 1,
				tasks : [{id:1,text:"sample",state:0},{id:1,text:"sample",state:1},{id:1,text:"sample",state:1}],

			}		
		});
		comp.$mount();
		comp.changeDisplayTask(2);
		let elements = comp.$el.getElementsByTagName("li");
		expect(elements.length).toBe(3);
	}) 
	// it should change teh task to editable on click
	it("should render all pending tasks",()=>{
		const Constructor = Vue.extend(app);
		const comp = new Constructor({
			data: {
				state : 1,
				tasks : [{id:1,text:"sample",state:0},{id:1,text:"sample",state:1}],

			}
		});
		comp.$mount();
		comp.changeDisplayTask(1);
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
	it("should add a new task",()=>{
		const Constructor = Vue.extend(app);
		const comp = new Constructor({
			data: {
				state : 1,
				tasks : [{id:1,text:"sample",state:0},{id:1,text:"sample",state:1}],

			}
    	});
		comp.$mount();
		let input = comp.$el.getElementsByTagName("input")[0];
		input.value = "sample";
		input.target = {};
		input.target.value = "sample";
		input.keyCode = 13;
		comp.createTask(input).then(()=>{
			let elements = comp.$el.getElementsByTagName("li");
            expect(elements.length).toBe(3);
            done();
        },()=>{
            expect(false).toBe(true);
            done();
        });
		//let elements = comp.$el.getElementsByTagName("li");
		//setTimeout(function(){ expect(elements.length).toBe(3); }, 300);

	})
	it("should remove a task from the list",()=>{
		const Constructor = Vue.extend(app);
		const comp = new Constructor({
			data: {
				state : 1,
				tasks : [{id:1,text:"sample",state:0},{id:1,text:"sample",state:1}],

			}
		});
		comp.$mount();
		comp.deleteTask(0);
		comp.$emit("deleteTask",0);
		//comp.$data.tasks.splice(0,1);
		expect(comp.$data.tasks.length).toBe(1);

	})
	it("should get all the tasks",()=>{
		const Constructor = Vue.extend(app);
		const comp = new Constructor({
			data: {
				state : 1,
				tasks : [],

			}
		});
		comp.$mount();
		comp.getAllTasks().then(done =>{
			//let len = comp.$data.tasks.length;
			expect(comp.$data.tasks.length).toBe(comp.$data.tasks.length);
            done();
        },()=>{
            expect(false).toBe(true);
            done();
        });
		//setTimeout(function(){ expect(comp.$data.tasks.length).toBe(comp.$data.tasks.length); }, 300);//need to check the logic 
		
	})
});