"use strict";(self.webpackChunkkniga_app=self.webpackChunkkniga_app||[]).push([[148],{5148:(Q,c,u)=>{u.r(c),u.d(c,{QuotesModule:()=>p});var a=u(177),d=u(1069),s=u(4341),t=u(4438),h=u(671);function m(i,g){if(1&i){const e=t.RV6();t.j41(0,"li",11)(1,"blockquote",12)(2,"p"),t.EFF(3),t.k0s(),t.j41(4,"footer",13),t.EFF(5),t.k0s()(),t.j41(6,"div",14)(7,"button",15),t.bIt("click",function(){const n=t.eBV(e).$implicit,l=t.XpG();return t.Njj(l.editQuote(n.id))}),t.EFF(8,"Redigera"),t.k0s(),t.j41(9,"button",16),t.bIt("click",function(){const n=t.eBV(e).$implicit,l=t.XpG();return t.Njj(l.deleteQuote(n.id))}),t.EFF(10,"Radera"),t.k0s()()()}if(2&i){const e=g.$implicit;t.R7$(3),t.JRh(e.text),t.R7$(2),t.JRh(e.author)}}const f=[{path:"",component:(()=>{class i{constructor(e,o){this.authService=e,this.router=o,this.quotes=[],this.newQuote={id:0,text:"",author:""},this.isEditMode=!1}ngOnInit(){this.authService.isAuthenticated()?this.loadQuotes():this.router.navigate(["/login"])}addQuote(){if(this.newQuote.text.trim()&&this.newQuote.author.trim()){if(this.isEditMode){const e=this.quotes.findIndex(o=>o.id===this.newQuote.id);-1!==e&&(this.quotes[e]={...this.newQuote})}else this.newQuote.id=this.quotes.length?Math.max(...this.quotes.map(e=>e.id))+1:1,this.quotes.push({...this.newQuote});this.newQuote={id:0,text:"",author:""},this.isEditMode=!1,this.saveQuotes()}else alert("All fields are required.")}editQuote(e){const o=this.quotes.find(n=>n.id===e);o&&(this.newQuote={...o},this.isEditMode=!0)}deleteQuote(e){this.quotes=this.quotes.filter(o=>o.id!==e),this.saveQuotes()}saveQuotes(){localStorage.setItem("quotes",JSON.stringify(this.quotes))}loadQuotes(){const e=localStorage.getItem("quotes");e&&(this.quotes=JSON.parse(e))}static{this.\u0275fac=function(o){return new(o||i)(t.rXU(h.u),t.rXU(d.Ix))}}static{this.\u0275cmp=t.VBU({type:i,selectors:[["app-quotes"]],standalone:!0,features:[t.aNF],decls:16,vars:4,consts:[[1,"container","mt-5"],[1,"text-center","mb-4"],[1,"mb-4",3,"ngSubmit"],[1,"mb-3"],["for","quoteText",1,"form-label"],["type","text","id","quoteText","name","text","required","",1,"form-control",3,"ngModelChange","ngModel"],["for","quoteAuthor",1,"form-label"],["type","text","id","quoteAuthor","name","author","required","",1,"form-control",3,"ngModelChange","ngModel"],["type","submit",1,"btn","btn-success"],[1,"list-group","mb-3"],["class","list-group-item d-flex justify-content-between align-items-center flex-wrap",4,"ngFor","ngForOf"],[1,"list-group-item","d-flex","justify-content-between","align-items-center","flex-wrap"],[1,"blockquote","mb-0"],[1,"blockquote-footer"],[1,"mt-2","mt-md-0"],[1,"btn","btn-primary","btn-sm","me-2",3,"click"],[1,"btn","btn-danger","btn-sm",3,"click"]],template:function(o,n){1&o&&(t.j41(0,"div",0)(1,"h2",1),t.EFF(2,"Mina citat"),t.k0s(),t.j41(3,"form",2),t.bIt("ngSubmit",function(){return n.addQuote()}),t.j41(4,"div",3)(5,"label",4),t.EFF(6,"Citat"),t.k0s(),t.j41(7,"input",5),t.mxI("ngModelChange",function(r){return t.DH7(n.newQuote.text,r)||(n.newQuote.text=r),r}),t.k0s()(),t.j41(8,"div",3)(9,"label",6),t.EFF(10,"F\xf6rfattare"),t.k0s(),t.j41(11,"input",7),t.mxI("ngModelChange",function(r){return t.DH7(n.newQuote.author,r)||(n.newQuote.author=r),r}),t.k0s()(),t.j41(12,"button",8),t.EFF(13),t.k0s()(),t.j41(14,"ul",9),t.DNE(15,m,11,2,"li",10),t.k0s()()),2&o&&(t.R7$(7),t.R50("ngModel",n.newQuote.text),t.R7$(4),t.R50("ngModel",n.newQuote.author),t.R7$(2),t.JRh(n.isEditMode?"Uppdatera":"L\xe4gg till"),t.R7$(2),t.Y8G("ngForOf",n.quotes))},dependencies:[a.MD,a.Sq,s.YN,s.qT,s.me,s.BC,s.cb,s.YS,s.vS,s.cV],styles:[".container[_ngcontent-%COMP%]{max-width:800px}.blockquote[_ngcontent-%COMP%]{font-size:1.2rem}.blockquote-author[_ngcontent-%COMP%]{font-size:.9rem;color:#6c757d}"]})}}return i})()}];let p=(()=>{class i{static{this.\u0275fac=function(o){return new(o||i)}}static{this.\u0275mod=t.$C({type:i})}static{this.\u0275inj=t.G2t({imports:[a.MD,d.iI.forChild(f)]})}}return i})()}}]);