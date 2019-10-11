({
    fetchallconversations : function(component, event, helper) {
        var action = component.get('c.getallconversation');
        action.setCallback(this, function(response) {
            var state = response.getState();
            //alert(state);
            //console.log('state ='+state);
            if (component.isValid() && state === "SUCCESS") {
                var result = response.getReturnValue();
                //alert(result);
                component.set("v.openallData", result.openConv);
                component.set("v.closeallData", result.closedConv);
                //console.log('v.accnList='+JSON.stringify(response.getReturnValue()));
            }
        })
        $A. enqueueAction(action);
    }
})