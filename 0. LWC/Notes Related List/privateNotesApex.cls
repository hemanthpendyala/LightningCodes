public class privateNotesApex {

    @AuraEnabled(cacheable=true)
    public static list<Private_Notes__c> getAllPrivateNotes(String parentId, String searchFrom, String objName, Integer limits, Integer offsets){
		
        String Result = '';
        String ObjectName = '';
        String display = '';
        System.debug('limits'+limits +' Offset '+offsets + ' Api Name'+objName);
        searchFrom = '%'+ searchFrom + '%';
        System.debug('parentID '+parentId);
        if(searchFrom !=''){
           Result =  ' AND Subject__c LIKE : searchFrom ';
        }
        if(objName == 'Account'){
            
            ObjectName = ' Account__c=:parentId ';
            
        }else{
            ObjectName = ' Contact__c=:parentId ';
        }
        
        display = 'LIMIT: limits OFFSET : offsets';
        
        String query = 'Select Id,Name,Notes__c,Owner.Name,CreatedDate,Work_Phone__c,Account__c,Subject__c,Contact__c from Private_Notes__c where  '+ObjectName+Result+display;

        list<Private_Notes__c>notes = Database.query(query);

        return notes;

    }
    
      @AuraEnabled(cacheable=true)
    public static Integer countRecords(String objName, String parentId){
        
        String ObjectName = '';
        
         if(objName == 'Account'){
            
            ObjectName = ' Account__c=:parentId ';
            
        }else{
            ObjectName = ' Contact__c=:parentId ';
        }
        
        String query =  'Select count() from Private_Notes__c where '+ObjectName;
        
        
        return database.countQuery(query);        
    }
    
      @AuraEnabled
    public static list<Private_Notes__c> getAllPrivateNotess(String parentId, String objName, Integer limits, Integer offsets){
        
        String ObjectName = '';
        String display = '';
         if(objName == 'Account'){
            
            ObjectName = ' Account__c=:parentId ';
            
        }else{
            ObjectName = ' Contact__c=:parentId ';
        }
        
        display = ' LIMIT: limits OFFSET : offsets';
		
       
        String query = 'Select Id,Name,Notes__c,Owner.Name,CreatedDate,Work_Phone__c,Subject__c,Contact__c from Private_Notes__c where '+ObjectName + display;

        list<Private_Notes__c>notes = Database.query(query);
		System.debug('notes'+notes);
        return notes;

    }
    
    //Edit record
    @AuraEnabled
    public static Private_Notes__c privateNotesDetail(String recId){
        
        return [Select Id,Name,Notes__c,Owner.Name,CreatedDate,Work_Phone__c,Subject__c,Contact__c from Private_Notes__c where Id=:recId];
        
    }
    @AuraEnabled
    public static String privateNotesDelete(String recId){
        
        try{
            System.debug('recId'+recId);
            
            Delete [Select Id from Private_Notes__c where Id=:recId];
            
            return 'Success';
            
        }catch(Exception e){
            
            return 'Error';
        }
        
    }

}
