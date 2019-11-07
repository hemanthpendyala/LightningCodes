({
	ParentController : function(component, event, helper) {
		var childCmp = component.find("ChildComp");
        var resut = childCmp.ChildMethod();
        //console.log(“Result: ” + result);
	}
})