({
	Controller01 : function(component, event, helper) {
		var whichOne = event.getSource().getLocalId();
        alert(whichOne);
        var forAttributes = event.getSource().get("v.name");
        alert(forAttributes);
	}
})