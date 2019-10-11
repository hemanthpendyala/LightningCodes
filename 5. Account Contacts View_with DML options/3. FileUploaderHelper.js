({
	fetchAllData : function(component, event, helper) {
		var action = component.get("c.fetchAllData");
        action.setParams({recId : component.get('v.recordId'), searchKey : component.get('v.searchData')});
        action.setCallback(this, function(a) {
            var result = a.getReturnValue();
        	component.set("v.allData", result);
        });
        $A.enqueueAction(action);
	},
    
    deleteContact : function(component, event, helper, conId) {
		var action = component.get("c.deleteContactApex");
        action.setParams({recId : component.get('v.recordId'), cId : conId});
        action.setCallback(this, function(a) {
            var result = a.getReturnValue();
            
        	component.set("v.allData", result.conList); // only 1 server call
            component.set("v.lastModifyDate", result.modifyDate);
        });
        $A.enqueueAction(action);
	},
    
    deleteContactNew : function(component, event, helper, conId) {
		var action = component.get("c.deleteContactApex");
        action.setParams({cId : conId});
        action.setCallback(this, function(a) {
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "type": "success",
                "message": "Contact Deleted Succesfully."
            });
            toastEvent.fire();
        });
        $A.enqueueAction(action);
        helper.fetchAllData(component, event, helper); // here you are doig two server call in same method
    },
    
	createRecord : function (component, event, helper) {
	var createRecordEvent = $A.get("e.force:createRecord");
	createRecordEvent.setParams({
    	"entityApiName": "Contact",
        "defaultFieldValues" : {
            'LastName' : 'Hemanth Pendyala'  //not sure how to add new contact. Permission issue on the page
        }
	});
	createRecordEvent.fire();
    helper.fetchAllData(component, event, helper);
    }
})