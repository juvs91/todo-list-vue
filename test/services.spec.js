import Vue from "vue";
import VueResource from 'vue-resource';
import services from '../client/js/services.js'
Vue.use(VueResource);

describe("services",()=>{
	it("should get all items",done=>{
		services.getItems((response)=>{
			expect(typeof response.body.length).toBe(typeof 0);
		},()=>{
			expect(true).toBe(false);
		})
	})
	it("should get an item",()=>{
		services.getItem(1,(response)=>{
			expect(response.body.length).toBe(1);
		},()=>{
			expect(true).toBe(false);
		})	
	})
	it("should update an item",()=>{
		services.updateItem({id : 1, text : "updating", state:1},(response)=>{
			console.log(response.body);
			expect(response.body.length).toBe(1);
		},()=>{
			expect(true).toBe(false);
		})	
	})
	it("should delete an item",()=>{
		services.deleteItem(2,(response)=>{
			console.log(response.body);
			expect(response.body.length).toBe(1);
		},()=>{
			expect(true).toBe(false);
		})	
	})
	it("should create an item",()=>{
		services.createItem({id : 1, text : "updating", state:1},(response)=>{
			console.log(response.body);
			expect(response.body.length).toBe(1);
		},()=>{
			expect(true).toBe(false);
		})	
	})
});