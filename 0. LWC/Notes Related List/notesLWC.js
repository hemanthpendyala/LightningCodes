import { LightningElement,api,wire,track } from 'lwc';
import privateNotes from '@salesforce/apex/privateNotesApex.getAllPrivateNotes';
import privateNotesDetail from '@salesforce/apex/privateNotesApex.privateNotesDetail';
import getAllPrivateNotess from '@salesforce/apex/privateNotesApex.getAllPrivateNotess';
import privateNotesDelete from '@salesforce/apex/privateNotesApex.privateNotesDelete';
import countRecords from '@salesforce/apex/privateNotesApex.countRecords';
import LightningConfirm from "lightning/confirm";
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin,CurrentPageReference  } from "lightning/navigation";
import { RefreshEvent } from 'lightning/refresh';

export default class NotesLWC extends NavigationMixin(LightningElement) {
  @track showLoading = false;
  @track shows = false;
  @track hide = true;
  searchRes = '';
  startDis = true;
  subject;
  notes;
  phone;
  noteId;
  @api recordId;
  @api objectApiName;
  @track notesRecords;
  showModal = false;
  notesId='';
  contactId;
  header = 'Create Private Note';
  buttonlabel = 'Create';
  limit = 5;
  offset = 0;
  totalCount = 0;
  pageSize = 1;
  totalCountPage

  connectedCallback() {
    this.contactId = this.recordId;
  }

  handleclickReadMore(event){
    var target = event.target.dataset.id;
console.log('<<<<'+target);
    let element = this.notesRecords.find(ele  => ele.key === event.target.dataset.id);
     console.log('<<<<wwww'+element);
    element.show123 = true;
    element.hide123 = false;
    this.notesRecords = [...this.notesRecords];
}

  @wire(privateNotes, { parentId: '$recordId', searchFrom : '$searchRes', objName:'$objectApiName',limits:'$limit', offsets:'$offset' })
  wiredData({ error, data }) {
    if (data) {
    //  let b[];
      var templist = [];
      data.forEach(currentItem => {
        
      //  b.push(currentItem.Notes__c.slice(0, 2));
        let b = Object.assign( {}, currentItem ); 
        b.key =  Math.random().toString(36).substring(2, 15);
        b.show123 = false;
        b.hide123 = true;
        b.subnotes = b.Notes__c.slice(0,100);
        if(b.Notes__c.length>100){
          b.totalnote = b.Notes__c;
        }else{
          b.totalnote = '';
        }
        console.log('aaaaaa',JSON.stringify(b));
        templist.push(b);
      });
      this.notesRecords = templist;
     // this.notesRecords = data;
      console.log('Data', data);
    } else if (error) {
       console.error('Error:', error);
    }
  }

  @wire(countRecords,{objName:'$objectApiName', parentId: '$recordId'})counts({error,data}){

      if(data){
          this.totalCount = data;
          if(this.totalCount % this.limit != 0){
            this.totalCountPage = Math.floor(this.totalCount / this.limit)+1;
          }else{
            this.totalCountPage = this.totalCount / this.limit;
          }
      }
  }

  handleDialogClose(event){
      this.header = 'Create Private Note';
      this.showModal = false;
  }

  get PreviousData(){


     // alert(this.offset)
        if(this.offset > 0){
      //    alert('false')
          return false;
      }else{
        //alert('true');
          return true;

         
      }
  }

  get NextData(){


    if((parseInt(this.limit) + parseInt(this.offset) ) >=parseInt(this.totalCount) ){
      return true;

    }else{
      return false;
    }

  }

  handleNext(event){
      // alert('>>>>>'+this.offset+ '<<<<<<<'+this.limit);
      this.startDis = false;
      this.pageSize = this.pageSize + 1;

    this.offset = parseInt(this.offset)   + parseInt(this.limit);
   
    this.refreshDetails();

  }

  handlePre(event){

    this.pageSize = this.pageSize - 1;
    this.offset = this.offset - this.limit;
       this.refreshDetails();
  }

  startRec(event){
    this.pageSize = 1;
    this.startDis = true;
    this.limit = 5;
    this.offset = 0;
    this.refreshDetails();
  }

  endRec(event){
            console.log('totalcounts',this.totalCountPage - 1 +'limit'+ this.limit)
    this.offset = (this.totalCountPage - 1) * this.limit;
      this.pageSize = this.totalCountPage;
     this.refreshDetails();

  }



  createNotes(event){
    this.showLoading = true;
    this.noteId = null;
    this.subject = null;
    this.phone = null;
    this.notes = null;
    this.header = 'Create Private Notes'
    this.buttonlabel = 'Create';
    setTimeout(()=>{
      this.showLoading = false;
      this.showModal = true;
    },3000);
  }


   editRecords(event){
    this.showLoading = true;
    this.header = 'Edit Private Note';
    console.log(event.target.dataset.id);
    console.log(event.target.title);
    privateNotesDetail({recId:event.target.dataset.id}).then(result =>{
    var res = result;
    this.subject = res.Subject__c;
    this.notes = res.Notes__c;
    this.phone = res.Work_Phone__c;
    this.noteId = res.Id;
    this.buttonlabel = 'Update';
    setTimeout(()=>{
      this.showLoading = false;
      this.showModal = true;
    },3000);
    }).catch(error =>{
    }); 
}
  handleSubmit(){
     this.template.querySelector('lightning-record-edit-form').submit();
  }

  handleSuccess(event){
     this.limit = 5;
     this.offset = 0;
     if(this.noteId != null && this.noteId != ''){
       const event = new ShowToastEvent({
        title: 'Record Edit Successfully',
        message: 'Record Edit Successfully',
        variant: 'success',
        mode: 'dismissable'
    });
    this.dispatchEvent(event);

    }else{

         const event = new ShowToastEvent({
        title: 'Record Created Successfully',
        message: 'Record Created Successfully',
        variant: 'success',
        mode: 'dismissable'
    });
    this.dispatchEvent(event);

    }
    
    setTimeout(()=>{

       this.noteId = null;
    this.subject = null;
    this.phone = null;
    this.notes = null;
    this.buttonlabel = 'Create';
    //this.showModal = true;
    this.showModal = false;
    this.refreshDetails();

    },2000);

   
  }

  refreshDetails(){
    getAllPrivateNotess({parentId: this.recordId, objName : this.objectApiName, limits : this.limit, offsets : this.offset}).then(result => {
      this.notesRecords = [];
      console.log('ddd',JSON.stringify(result))
      var data = result;
 var templist = [];
      data.forEach(currentItem => {
        
      //  b.push(currentItem.Notes__c.slice(0, 2));
        let b = Object.assign( {}, currentItem ); 
        b.key =  Math.random().toString(36).substring(2, 15);
        b.show123 = false;
        b.hide123 = true;
        b.subnotes = b.Notes__c.slice(0,10);
        if(b.Notes__c.length>10){
          b.totalnote = b.Notes__c;
        }else{
          b.totalnote = '';
        }
        console.log('aaaaaa',JSON.stringify(b));
        templist.push(b);
      });
      this.notesRecords = templist;


     // this.notesRecords = data;
    }).catch(error=>{

      console.log('errro'+JSON.stringify(error));
    });
  }


  async handleConfirmClick(event) {
    var deleteId = event.target.dataset.id;
    console.log('delete',event.target.dataset.id);
    const result = await LightningConfirm.open({
    message: "Are you sure you want to delete this?",
    variant: "default", // headerless
    label: "Delete a record"
  });

  if (result) {
    privateNotesDelete({recId:deleteId}).then(result =>{
       const event = new ShowToastEvent({
        title: 'Record Deleted Successfully',
        message: 'Record Deleted Successfully',
        variant: 'success',
        mode: 'dismissable'
    });
    this.dispatchEvent(event);

    this.refreshDetails();
  }).catch(error =>{
  }); 

    } else {
    //do something else 
    }
    }

 searchRecords(event){
    this.searchRes = event.target.value;
  }
}
