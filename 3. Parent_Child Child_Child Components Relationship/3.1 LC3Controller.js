({
	changeStatus : function(component, event, helper) {
        var val = component.get("v.status");
        if(val == 'First'){
            component.set("v.status", "Second");
        }else{
            component.set("v.status", "First");
        }
	},
    changeStatususingevent : function(component, event, helper) {
        var appEvent = $A.get("e.c:compeventtest");
        var val = component.get("v.Eventsstatus");
        if(val == 'First') {
            appEvent.setParams({"message":"Third"});
        }else{
            appEvent.setParams({"message":"First"});
        }
        appEvent.fire();
    }
})