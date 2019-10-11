({
    doInit : function(component, event, helper) {
        helper.fetchAllData(component, event, helper);
    },
    showAll : function(component, event, helper) {
        component.set('v.recordLimit', 'All');
        helper.fetchAllData(component, event, helper);
    },
    preview : function(component, event, helper) {
        var documentId = event.target.getAttribute('title');
        var type = event.target.getAttribute('type');
        //alert(type);
        var data = [];
        if(type == 'All')
        {
            data = component.get("v.allData");
        }       
        var docIds = [];
        data.forEach(function(element) 
                     {
                         docIds.push(element.Id);
                     });
        $A.get('e.lightning:openFiles').fire({ recordIds : docIds, selectedRecordId : documentId});        
    },
    searchKey : function(component, event, helper) {
        var myEvent = $A.get("e.c:SearchKeyChange");
        myEvent.setParams({"searchkey" : event.target.value});
        myEvent.fire();
    },
    searchKeyChange : function(component, event, helper) {
        var searchkey = event.getParam("searchkey");
        component.set("v.searchData", searchkey);
        helper.fetchAllData(component, event, helper);
    },
    
    sortDataByName : function(component, event, helper) {
        component.set("v.sortType", 'Title');
        
        var order = component.get("v.sortingOrder");
        if(order == 'asc') {
            component.set("v.sortingOrder", 'desc');
        } else {
            component.set("v.sortingOrder", 'asc');
        }
        helper.fetchAllData(component, event, helper);
    },
    
    sortDataByDate : function(component, event, helper) {
        component.set("v.sortType", 'CreatedDate'); 
        var order = component.get("v.sortingOrder");
        if(order == 'asc'){
            component.set("v.sortingOrder", 'desc');
        } else {
            component.set("v.sortingOrder", 'asc');
        }
        
        helper.fetchAllData(component, event, helper);
    },
    sortDataBySize : function(component, event, helper) {
        component.set("v.sortType", 'ContentSize'); 
        var order = component.get("v.sortingOrder");
        if(order == 'asc'){
            component.set("v.sortingOrder", 'desc');
        } else {
            component.set("v.sortingOrder", 'asc');
        }
        
        helper.fetchAllData(component, event, helper);
    },
    sortDataByType : function(component, event, helper) {
        component.set("v.sortType", 'FileType'); 
        var order = component.get("v.sortingOrder");
        if(order == 'asc'){
            component.set("v.sortingOrder", 'desc');
        } else {
            component.set("v.sortingOrder", 'asc');
        }
        
        helper.fetchAllData(component, event, helper);
    },
    selectAll : function(component, event, helper) {
        var val = component.find("chkAll").get("v.value");
        var allChk = component.find("allDataChk");
        //var allId = [];
        for(var i=0; i<allChk.length; i++){
            allChk[i].set("v.value", val);
            //var id = allChk[i].get("v.name");
            //allId.push(id);
        }
    },
    selectIndv : function(component, event, helper) {
        //var docId = event.target.name;
        //alert(docId);
    },
    
    deleteSelected : function(component, event, helper) {
        var delId = [];
        var val = component.find("allDataChk");
        for(var i=0; i<val.length; i++){
            if(val[i].get("v.value") == true){
                delId.push(val[i].get("v.name"));
            }
        }
        helper.deleteSelectedHelper(component, event, helper, delId);
    },
    
    downloadSelected : function(component, event, helper) {
        var delId = [];
        var val = component.find("allDataChk");
        for(var i=0; i<val.length; i++){
            if(val[i].get("v.value") == true){
                window.open('/sfc/servlet.shepherd/document/download/'+val[i].get("v.name"));
            }
        }
    }
})