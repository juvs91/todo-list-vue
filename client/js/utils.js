((window,$)=>{
	let util = window.util || {};
	util.actions = {
		changeToInput : (e)=>{
			let $input = $("<input>",{
				val: $(e.target).text(),
        		type: "text"
			});
	        $(e.target).replaceWith($input);
	        $input.select();
	        return $input;
		},
		changeToSpan : (e)=>{
			var $span = $("<span>", {
	            text: $(e.target).val()
	        });
	        $(e.target).replaceWith($span);
	        return $span;
		}
	};
	if (typeof window.util === 'undefined') {
		window.util = util;
	};
})(window,$,undefined);