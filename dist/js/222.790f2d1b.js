"use strict";(self["webpackChunkai_portal"]=self["webpackChunkai_portal"]||[]).push([[222],{43222:function(t,e,a){a.r(e),a.d(e,{default:function(){return S}});var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"pm-page"},[a("div",{staticClass:"pm-toolbar"},[a("toolbar",{attrs:{pageName:"Project Manager",isNewBtn:!0,newBtnLabel:"New Project Info"},on:{refreshInfo:function(e){return t.FETCH_LIST()},newBtnFn:function(e){return t.TOGGLE_POPUP()}}})],1),a("div",{staticClass:"pm-page-container"},[a("div",{staticClass:"page-container"},[a("DxDataGrid",{attrs:{id:"project-manager-project-list","data-source":t.projectList,selection:{mode:"single"},"hover-state-enabled":!0,"allow-column-reordering":!0,"show-borders":!0,"show-row-lines":!1,"row-alternation-enabled":!0},on:{exporting:t.EXPORT_DATA},scopedSlots:t._u([{key:"cell-button-set",fn:function(e){var o=e.data;return[a("div",{staticClass:"table-btn-group"},[a("div",{staticClass:"table-btn",on:{click:function(e){return t.VIEW_INFO(o)}}},[a("i",{staticClass:"las la-search blue"})])])]}}])},[a("DxColumn",{attrs:{"data-field":"created_time",width:0,caption:"","sort-order":"asc"}}),a("DxColumn",{attrs:{"data-field":"project_no",width:120,caption:"Project No"}}),a("DxColumn",{attrs:{"data-field":"project_name",caption:"Project Name"}}),a("DxColumn",{attrs:{"data-field":"client_name",caption:"Client Name"}}),a("DxColumn",{attrs:{"data-field":"job_start_date","data-type":"date",format:"dd MMM, yyyy",width:120,caption:"Start Date"}}),a("DxColumn",{attrs:{"data-field":"job_end_date","data-type":"date",format:"dd MMM, yyyy",width:120,caption:"End Date"}}),a("DxColumn",{attrs:{"data-field":"status",caption:"Status"}}),a("DxColumn",{attrs:{width:50,caption:"","cell-template":"cell-button-set"}}),a("DxScrolling",{attrs:{mode:"standard"}}),a("DxSearchPanel",{attrs:{visible:!0}}),a("DxPaging",{attrs:{"page-size":10,"page-index":0}}),a("DxPager",{attrs:{"show-page-size-selector":!0,"allowed-page-sizes":[5,10,20],"show-navigation-buttons":!0,"show-info":!0,"info-text":"Page {0} of {1} ({2} items)"}}),a("DxExport",{attrs:{enabled:!0}})],1)],1)]),1==t.isAdd?a("popupAdd",{on:{closePopup:function(e){return t.TOGGLE_POPUP()}}}):t._e(),1==t.isLoading?a("contentLoading",{attrs:{text:"Loading, please wait...",color:"#fc9b21"}}):t._e()],1)},s=[],i=a(71642),n=a(53706),r=a.n(n),l=a(66262),c=a(48626),p=a(49075),m=a(85981),d=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"popup-wrapper"},[a("div",{staticClass:"popup-card"},[t._m(0),a("div",{staticClass:"popup-content form"},[a("div",{staticClass:"form-item-container"},[a("label",{staticClass:"section-text",staticStyle:{"grid-column":"span 2"}},[t._v("Project Informations")]),a("div",{staticClass:"input-set",staticStyle:{"grid-column":"span 2"}},[t._m(1),a("input",{directives:[{name:"model",rawName:"v-model",value:t.formData.project_name,expression:"formData.project_name"}],attrs:{type:"text",placeholder:"Project Name"},domProps:{value:t.formData.project_name},on:{input:function(e){e.target.composing||t.$set(t.formData,"project_name",e.target.value)}}})]),a("div",{staticClass:"input-set"},[t._m(2),a("input",{directives:[{name:"model",rawName:"v-model",value:t.formData.project_no,expression:"formData.project_no"}],attrs:{type:"text",placeholder:"Project Number"},domProps:{value:t.formData.project_no},on:{input:function(e){e.target.composing||t.$set(t.formData,"project_no",e.target.value)}}})]),a("div",{staticClass:"input-set"},[t._m(3),a("input",{directives:[{name:"model",rawName:"v-model",value:t.formData.project_value,expression:"formData.project_value"}],attrs:{type:"text",placeholder:"Project Value (Baht)"},domProps:{value:t.formData.project_value},on:{input:function(e){e.target.composing||t.$set(t.formData,"project_value",e.target.value)}}})]),a("div",{staticClass:"input-set"},[a("p",{staticClass:"label"},[t._v("Purchase Order No:")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.formData.po_no,expression:"formData.po_no"}],attrs:{type:"text",placeholder:"Purchase Order No"},domProps:{value:t.formData.po_no},on:{input:function(e){e.target.composing||t.$set(t.formData,"po_no",e.target.value)}}})]),a("div",{staticClass:"input-set"},[a("p",{staticClass:"label"},[t._v("Quotation No:")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.formData.quotation_no,expression:"formData.quotation_no"}],attrs:{type:"text",placeholder:"Quotation No"},domProps:{value:t.formData.quotation_no},on:{input:function(e){e.target.composing||t.$set(t.formData,"quotation_no",e.target.value)}}})]),a("div",{staticClass:"input-set"},[t._m(4),a("DxDateBox",{attrs:{value:t.formSelect.now,type:"date",placeholder:"Job Start Date"},model:{value:t.formData.job_start_date,callback:function(e){t.$set(t.formData,"job_start_date",e)},expression:"formData.job_start_date"}})],1),a("div",{staticClass:"input-set"},[t._m(5),a("DxDateBox",{attrs:{value:t.formSelect.now,type:"date",placeholder:"Job End Date"},model:{value:t.formData.job_end_date,callback:function(e){t.$set(t.formData,"job_end_date",e)},expression:"formData.job_end_date"}})],1),a("div",{staticClass:"input-set"},[a("p",{staticClass:"label"},[t._v("Job Type:")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.formData.job_type,expression:"formData.job_type"}],attrs:{type:"text",placeholder:"Ex: H-N-D-RBI"},domProps:{value:t.formData.job_type},on:{input:function(e){e.target.composing||t.$set(t.formData,"job_type",e.target.value)}}})]),a("div",{staticClass:"input-set"},[t._m(6),a("DxSelectBox",{staticStyle:{border:"0","font-size":"14px"},attrs:{"data-source":t.formSelect.serviceTypeList,"display-expr":"service_type_desc","value-expr":"id_service_type"},model:{value:t.formData.service_type,callback:function(e){t.$set(t.formData,"service_type",e)},expression:"formData.service_type"}})],1),a("hr",{staticStyle:{"grid-column":"span 2"}}),a("label",{staticClass:"section-text",staticStyle:{"grid-column":"span 2"}},[t._v("Client Informations")]),a("div",{staticClass:"input-set"},[t._m(7),a("DxLookup",{attrs:{items:t.formSelect.clientList,"formSelect.clientList":"",value:"Select Client","value-expr":"id_client","display-expr":"client_name"},model:{value:t.formData.id_client,callback:function(e){t.$set(t.formData,"id_client",e)},expression:"formData.id_client"}},[a("DxDropDownOptions",{attrs:{"show-title":!1}})],1)],1),a("div",{staticClass:"input-set"},[a("p",{staticClass:"label"},[t._v("Contact Name:")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.formData.client_contact_name,expression:"formData.client_contact_name"}],attrs:{type:"text",placeholder:"Contact Name"},domProps:{value:t.formData.client_contact_name},on:{input:function(e){e.target.composing||t.$set(t.formData,"client_contact_name",e.target.value)}}})]),a("div",{staticClass:"input-set"},[a("p",{staticClass:"label"},[t._v("Phone No:")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.formData.client_contact_phone_no,expression:"formData.client_contact_phone_no"}],attrs:{type:"text",placeholder:"Contact Phone No"},domProps:{value:t.formData.client_contact_phone_no},on:{input:function(e){e.target.composing||t.$set(t.formData,"client_contact_phone_no",e.target.value)}}})]),a("div",{staticClass:"input-set"},[a("p",{staticClass:"label"},[t._v("Email:")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.formData.client_contact_email,expression:"formData.client_contact_email"}],attrs:{type:"text",placeholder:"Contact Email"},domProps:{value:t.formData.client_contact_email},on:{input:function(e){e.target.composing||t.$set(t.formData,"client_contact_email",e.target.value)}}})])])]),a("div",{staticClass:"popup-footer"},[a("div",{staticClass:"button-set"},[a("button",{staticClass:"blue",on:{click:function(e){return t.SAVE()}}},[a("label",[t._v("Save")])]),a("button",{staticClass:"grey",on:{click:function(e){return t.CANCEL()}}},[a("label",[t._v("Cancel")])])])])])])},u=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"popup-header"},[a("label",[t._v("Add New Project Info")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"label-box"},[a("p",{staticClass:"label"},[t._v("Project Name:")]),a("label",{staticClass:"star-label"},[a("i",{staticClass:"las la-asterisk"})])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"label-box"},[a("p",{staticClass:"label"},[t._v("Project No:")]),a("label",{staticClass:"star-label"},[a("i",{staticClass:"las la-asterisk"})])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"label-box"},[a("p",{staticClass:"label"},[t._v("Project Value (Baht):")]),a("label",{staticClass:"star-label"},[a("i",{staticClass:"las la-asterisk"})])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"label-box"},[a("p",{staticClass:"label"},[t._v("Job Start Date:")]),a("label",{staticClass:"star-label"},[a("i",{staticClass:"las la-asterisk"})])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"label-box"},[a("p",{staticClass:"label"},[t._v("Job End Date:")]),a("label",{staticClass:"star-label"},[a("i",{staticClass:"las la-asterisk"})])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"label-box"},[a("p",{staticClass:"label"},[t._v("Service Type:")]),a("label",{staticClass:"star-label"},[a("i",{staticClass:"las la-asterisk"})])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"label-box"},[a("p",{staticClass:"label"},[t._v("Client:")]),a("label",{staticClass:"star-label"},[a("i",{staticClass:"las la-asterisk"})])])}],_=a(39477),f=a(56935),v=a.n(f),D=a(48176),h=a.n(D),b=a(18017),C={name:"popup-add-project",components:{DxSelectBox:v(),DxDateBox:h(),DxLookup:b.DxLookup,DxDropDownOptions:b.DxDropDownOptions},data(){return{formData:{project_no:"",project_name:"",po_no:"",quotation_no:"",job_type:"",job_confirm_date:"",job_start_date:"",job_end_date:"",job_start_hour:"",job_end_hour:"",est_work_finish:"",id_client:"",client_contact_name:"",client_contact_phone_no:"",client_contact_email:""},formSelect:{jobType:[],serviceTypeList:[],now:new Date,clientList:[{}]}}},created(){this.FETCH_DROPDOWN()},methods:{SAVE(){this.formData.project_name?this.formData.project_no?0==isNaN(this.formData.project_no)?this.formData.id_client?this.formData.project_value?this.formData.service_type?this.formData.job_start_date&&this.formData.job_end_date?this.$ons.notification.confirm("Confirm save?").then((t=>{if(1==t){const t=this.formData;(0,_.Z)({method:"post",url:"/project-manager/project-add",headers:{Authorization:"Bearer "+JSON.parse(localStorage.getItem("token"))},data:t}).then((t=>{if(console.log(t.data[0]),200==t.status){this.$ons.notification.alert("Project Add successful"),this.$emit("close-popup");const e=t.data[0].id_project;e&&this.$router.push("/projectmanager/projects/"+e)}})).catch((t=>{this.$ons.notification.alert(t.code+" "+t.response.status+" "+t.message)})).finally((()=>{}))}})):this.$ons.notification.alert('"Job Start Date and End Date" field cannot be empty'):this.$ons.notification.alert('"Service Type" field cannot be empty'):this.$ons.notification.alert('"Project Value" field cannot be empty'):this.$ons.notification.alert('"Client" field cannot be empty'):this.$ons.notification.alert('"Project No" must be a number.'):this.$ons.notification.alert('"Project No" field cannot be empty.'):this.$ons.notification.alert('"Project Name" field cannot be empty')},CANCEL(){this.formData!=this.formData?this.$ons.notification.confirm("Your unsaved changes will be lost").then((t=>{1==t&&this.$emit("closePopup")})):this.$emit("closePopup")},FETCH_DROPDOWN(){(0,_.Z)({method:"get",url:"/project-manager/client-list",headers:{Authorization:"Bearer "+JSON.parse(localStorage.getItem("token"))}}).then((t=>{t.data&&(this.formSelect.clientList=t.data)})),(0,_.Z)({method:"get",url:"/service-type/service-type-list",headers:{Authorization:"Bearer "+JSON.parse(localStorage.getItem("token"))}}).then((t=>{t.data&&(this.formSelect.serviceTypeList=t.data)}))}}},x=C,g=a(1001),j=(0,g.Z)(x,d,u,!1,null,"4b7bd0e4",null),P=j.exports,y={name:"ViewProjectList",components:{toolbar:m.Z,DxDataGrid:c.DxDataGrid,DxSearchPanel:c.DxSearchPanel,DxPaging:c.DxPaging,DxPager:c.DxPager,DxScrolling:c.DxScrolling,DxColumn:c.DxColumn,DxExport:c.DxExport,contentLoading:p.Z,popupAdd:P},created(){this.$store.commit("UPDATE_CURRENT_INAPP",{name:"Project Manager",icon:"/img/icon_menu/project_manager/project.png"}),1==this.$store.state.status.server&&this.FETCH_LIST()},data(){return{projectList:"",isAdd:!1,isEdit:!1,isLoading:!1,errorMessage:"",editInfo:""}},computed:{},methods:{VIEW_INFO(t){const e=t.data.id_project;null!=e&&this.$router.push("/projectmanager/projects/"+e)},EXPORT_DATA(t){const e=new i.Workbook,a=e.addWorksheet("Projects");(0,l.d)({worksheet:a,component:t.component}).then((function(){e.xlsx.writeBuffer().then((function(t){r()(new Blob([t],{type:"application/octet-stream"}),"Projects.xlsx")}))})),t.cancel=!0},TOGGLE_POPUP(){this.isAdd=!this.isAdd},FETCH_LIST(){this.isLoading=!0,(0,_.Z)({method:"get",url:"/project-manager/project-list",headers:{Authorization:"Bearer "+JSON.parse(localStorage.getItem("token"))}}).then((t=>{200==t.status&&t.data&&(this.projectList=t.data)})).catch((t=>{this.$ons.notification.alert(t.code+" "+t.response.status+" "+t.message)})).finally((()=>{this.isLoading=!1}))}}},w=y,N=(0,g.Z)(w,o,s,!1,null,"1a3b7049",null),S=N.exports}}]);
//# sourceMappingURL=222.790f2d1b.js.map