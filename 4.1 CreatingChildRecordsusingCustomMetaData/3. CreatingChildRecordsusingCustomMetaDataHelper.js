({
    getCustomMetadataRec : function(component, event, helper) {
        var action = component.get("c.CMDRecords");
        action.setCallback(this, function(a) {
            var result = a.getReturnValue();
            var objresult = result.ObjectList__c;
            //alert(objresult);
            component.set("v.Obj", result);
            component.set("v.Objlist",objresult.split(","));
            //alert(objresult.split(","));
        });
        $A.enqueueAction(action);
    },
    createAccHelper : function(component, event, helper, recordId, inpNumber) {
        var action = component.get("c.createAccChildRec");
        action.setParams({ "recId" : recordId, "inputNumber" : inpNumber });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                alert('Account Child Records Created Successfully');
                component.set("v.Reclist", response.getReturnValue());
            }
            else if (state === "ERROR") {
                var errors = response.getError();
                console.log("Error message: " +errors[0].message);
            }
        });
        $A.enqueueAction(action);
    },
    createConHelper : function(component, event, helper, recordId, inpNumber) {
        var action = component.get("c.createConChildRec");
        action.setParams({ "recId" : recordId, "inputNumber" : inpNumber });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                alert('Contact Child Records Created Successfully');
                component.set("v.Reclist", response.getReturnValue());
            }
            else if (state === "ERROR") {
                var errors = response.getError();
                console.log("Error message: " +errors[0].message);
            }
        });
        $A.enqueueAction(action);
    }
})