({
    doInit : function(component, event, helper) {
        helper.getCustomMetadataRec(component, event, helper);
    },
    handleAccountSuccess: function(component, event, helper) {
        var params = event.getParams(); //Gets the parameter we submitted in the form. Component Event
        var recordId = params.response.id;
        var inpNumber = component.find("inputNumber").get("v.value");
        var createchkbox = component.find("checkbox").get("v.value");
        alert('Account Saved Successfully');
        if(createchkbox == true) {
            helper.createAccHelper(component, event, helper, recordId, inpNumber);
        }
    },
    OnSelect: function(component, event, helper) {
        var Objectname = component.find("picValue").get("v.value");
        component.set("v.Objvalue", Objectname);
        component.set("v.setChkBox", false);
    },
    handleContactSuccess: function(component, event, helper) {
        var params = event.getParams(); //Gets the parameter we submitted in the form. Component Event
        var recordId = params.response.id;
        var inpNumber = component.find("inputNumber").get("v.value");
        var createchkbox = component.find("checkbox").get("v.value");
        alert('Contact Saved Successfully');
        if(createchkbox == true) {
            helper.createConHelper(component, event, helper, recordId, inpNumber);
        }
    },
})