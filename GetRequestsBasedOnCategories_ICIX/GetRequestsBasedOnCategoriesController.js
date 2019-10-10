({
    doInit : function(component, event, helper) {
    	
	},
 
    LoadRequests : function(component, event, helper) {
        var allCategories = component.find("CatID").get("v.value");
        //alert(allCategories);
		var action = component.get("c.RequestsForCategory");
        action.setParams({Category : allCategories});
        action.setCallback(this, function(a) {
            var result = a.getReturnValue();
        	component.set("v.requests", result.requests);
            //alert(result.requests);
        	component.set("v.workflows", result.workflows);
        });
        $A.enqueueAction(action);
	}
})