"use strict";(self.webpackChunkkniga_app=self.webpackChunkkniga_app||[]).push([[123],{9123:(f,l,s)=>{s.r(l),s.d(l,{BookListModule:()=>g});var c=s(177),a=s(1069),d=s(4341),t=s(4438),k=s(2536),m=s(671);function u(e,p){if(1&e){const o=t.RV6();t.j41(0,"li",5)(1,"span",6),t.EFF(2),t.k0s(),t.j41(3,"div",7)(4,"button",8),t.bIt("click",function(){const i=t.eBV(o).$implicit,r=t.XpG();return t.Njj(void 0!==i.id&&r.editBook(i.id))}),t.EFF(5,"Redigera"),t.k0s(),t.j41(6,"button",9),t.bIt("click",function(){const i=t.eBV(o).$implicit,r=t.XpG();return t.Njj(r.deleteBook(i.id))}),t.EFF(7,"Radera"),t.k0s()()()}if(2&e){const o=p.$implicit,n=t.XpG();t.R7$(2),t.E5c("",o.title," by ",o.author," (publicerad den ",n.formatDate(o.publishDate),")")}}const b=[{path:"",component:(()=>{class e{constructor(o,n,i){this.bookService=o,this.router=n,this.authService=i,this.books=[]}ngOnInit(){this.authService.isAuthenticated()?this.loadBooks():this.router.navigate(["/login"])}loadBooks(){this.bookService.getBooks().subscribe(o=>{this.books=o})}navigateToAddBook(){this.router.navigate(["/book-form"])}editBook(o){this.router.navigate(["/book-form",o])}deleteBook(o){void 0!==o&&this.bookService.deleteBook(o).subscribe(()=>{this.books=this.books.filter(n=>n.id!==o)})}formatDate(o){return o.split("T")[0]}static{this.\u0275fac=function(n){return new(n||e)(t.rXU(k.l),t.rXU(a.Ix),t.rXU(m.u))}}static{this.\u0275cmp=t.VBU({type:e,selectors:[["app-book-list"]],standalone:!0,features:[t.aNF],decls:7,vars:1,consts:[[1,"container","book-list-container","mt-3"],[1,"text-center","mb-4"],[1,"btn","btn-success","mb-4",3,"click"],[1,"list-group","mb-4"],["class","list-group-item d-flex flex-column align-items-start",4,"ngFor","ngForOf"],[1,"list-group-item","d-flex","flex-column","align-items-start"],[1,"book-list-text"],[1,"book-buttons","mt-2"],[1,"btn","btn-primary","btn-sm","redigera-btn",3,"click"],[1,"btn","btn-danger","btn-sm","radera-btn",3,"click"]],template:function(n,i){1&n&&(t.j41(0,"div",0)(1,"h2",1),t.EFF(2,"Book List"),t.k0s(),t.j41(3,"button",2),t.bIt("click",function(){return i.navigateToAddBook()}),t.EFF(4,"L\xe4gg till ny bok"),t.k0s(),t.j41(5,"ul",3),t.DNE(6,u,8,3,"li",4),t.k0s()()),2&n&&(t.R7$(6),t.Y8G("ngForOf",i.books))},dependencies:[c.MD,c.Sq,d.YN],styles:[".book-list-container[_ngcontent-%COMP%]{max-width:600px;margin:0 auto;padding:1em;border:1px solid #ccc;border-radius:5px}.book-list-container[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{text-align:center}.book-list-container[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{list-style-type:none;padding:0}.book-list-container[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:flex-start;padding:.5em 0;border-bottom:1px solid #ccc}.book-list-text[_ngcontent-%COMP%]{margin-left:6px}.book-buttons[_ngcontent-%COMP%]{display:flex;gap:.5rem;margin-top:.5rem}.redigera-btn[_ngcontent-%COMP%]{margin-right:.5em;margin-left:15px}@media (max-width: 768px){.book-list-container[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{flex-direction:column;align-items:flex-start}.book-buttons[_ngcontent-%COMP%]{width:100%;justify-content:flex-start}}"]})}}return e})()}];let g=(()=>{class e{static{this.\u0275fac=function(n){return new(n||e)}}static{this.\u0275mod=t.$C({type:e})}static{this.\u0275inj=t.G2t({imports:[c.MD,a.iI.forChild(b)]})}}return e})()}}]);