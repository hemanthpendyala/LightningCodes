({
	passidtochild : function(component, event, helper) {
		var setatt = component.get("v.showhidechildcomp");
        if(setatt == false) {
            component.set("v.showhidechildcomp",true);
        }
        else {
            component.set("v.showhidechildcomp",false);      
        }
		
        var stdIds = component.get("{!v.recordId}");
        var action = component.get("c.getaccountusermodfield"); //use like "getAccountUserModField"
        action.setParams({Id : stdIds});
        action.setCallback(this,function(response) {
            var state = response.getReturnValue();
            if(state == 'true') {
               component.set("v.accusermodstatus", false); 
            } else {
               component.set("v.accusermodstatus", true);  
            }
            
        });
        $A.enqueueAction(action);
	}
})
