({
	fetchAllData : function(component, event, helper) {
		var action = component.get("c.fetchAllData");
        action.setParams({recId : component.get('v.recordId'), recLimit : component.get('v.recordLimit'), searchKey : component.get('v.searchData'),
                         sortOrder : component.get('v.sortingOrder'), sortType : component.get('v.sortType')});
        action.setCallback(this, function(a) {
            var wrapper = a.getReturnValue();
        	component.set("v.allData", wrapper.allData);
            component.set("v.imageData", wrapper.imageData);
            component.set("v.filesData", wrapper.filesData);
            component.set("v.noOfRecords", wrapper.noOfRecords);
        });
        $A.enqueueAction(action);
	},
    deleteSelectedHelper : function(component, event, helper, deleteRecordsIds ) {
        var action = component.get("c.deleteRecords");
        action.setParams({"lstRecordId" : deleteRecordsIds});
        action.setCallback(this, function(response) {
        	//store state of response
   			var state = response.getState();
   			if (state === "SUCCESS") {
    			alert('Record Deleted Successfully');
                helper.fetchAllData(component, event, helper);
   			}
  		});
  		$A.enqueueAction(action);
    }
})