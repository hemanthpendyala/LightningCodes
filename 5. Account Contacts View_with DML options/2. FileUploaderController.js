({
	doInit : function(component, event, helper) {
		helper.fetchAllData(component, event, helper);
	},
    
    searchKey : function(component, event, helper) {
        var myEvent = $A.get("e.c:FileUploaderSearchDataEvent");
        myEvent.setParams({"searchKey" : event.target.value});
        myEvent.fire();
    },
    
    searchKeyChange : function(component, event, helper) {
        var searchKey = event.getParam("searchKey");
        component.set("v.searchData", searchKey);
        helper.fetchAllData(component, event, helper);
    },
    
    Openbutton : function(component, event, helper) {
		// To open in a diff tab, use below syntax. Or use lightning defualt syntax as described.
		// window.open("/"+component.get("v.title"),'_blank');
		var conId = event.getSource().get("v.title");
        console.log("Hemanth Console");
        console.log(conId);
        var navEvt = $A.get("e.force:navigateToSObject"); //Lightning defualt syntax.
        navEvt.setParams({
            "recordId": conId,
            "slideDevName": "detail"
        });
        navEvt.fire();
	},
    
    Editbutton : function(component, event, helper) {
        var conId = event.getSource().get("v.title");
        var navEvt = $A.get("e.force:editRecord"); //Lightning defualt syntax.
        navEvt.setParams({
            "recordId": conId
        });
        navEvt.fire();
    },
    
    Deletebutton : function(component, event, helper) {
        var conId = event.getSource().get("v.title");
        helper.deleteContact(component, event, helper, conId);
        //helper.deleteContactNew(component, event, helper, conId);
        
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "type": "error",
            "message": "Done"
        });
        toastEvent.fire();
    },
    
    CreateContact : function(component, event, helper) {
       // var conId = event.getSource().get("v.title");
        helper.createRecord(component, event, helper);
    }
    
})