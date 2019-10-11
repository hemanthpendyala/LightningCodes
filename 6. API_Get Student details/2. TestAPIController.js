({
	handleClick : function(component, event, helper) {
		var stdIds = component.find('stdId').get('v.value');
        var action = component.get("c.fetchdata");
        action.setParams({stdId : stdIds});
        action.setCallback(this,function(response) {
            var state = response.getState();
            if(state == 'SUCCESS'){
                var alldata = response.getReturnValue();
                alert(alldata);
                component.set("v.stdData", alldata);
            }
        });
        $A.enqueueAction(action);
	}
})