({
	update : function(component, event, helper) {
		component.find("editForm").submit();
        var stdIds = component.get("{!v.recordid}");
        var action = component.get("c.updateaccountfield");
        action.setParams({Id : stdIds});
        action.setCallback(this,function(response) {
            var state = response.getState();
        });
        $A.enqueueAction(action);
	}
})