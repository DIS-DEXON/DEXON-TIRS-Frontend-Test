"use strict";(self["webpackChunkai_portal"]=self["webpackChunkai_portal"]||[]).push([[8603],{67023:function(t,e,a){a.d(e,{Z:function(){return c}});var r=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},s=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"wrapper"},[a("div",{staticClass:"item"},[a("i",{staticClass:"las la-plug"}),a("h2",[t._v("Coming Soon")])])])}],i={name:"unavailable-feature-div"},n=i,o=a(1001),l=(0,o.Z)(n,r,s,!1,null,"4a78b7e4",null),c=l.exports},99986:function(t,e,a){a.d(e,{Z:function(){return c}});var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[t._t("default")],2)},s=[],i={name:"LayoutMain",components:{}},n=i,o=a(1001),l=(0,o.Z)(n,r,s,!1,null,null,null),c=l.exports},84720:function(t,e,a){a.d(e,{Z:function(){return p}});var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"layout"},[a("sidebar",{staticClass:"sidebar-panel"}),t._t("default")],2)},s=[],i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app-sidebar"},["ceo"==t.user.role||"manager"==t.user.role||"admin"==t.user.role?a("div",{staticClass:"item-container"},[t._m(0),t._l(t.sidebarMenu.executiveManagement,(function(e){return a("router-link",{key:e.id,attrs:{to:e.link}},[a("v-ons-toolbar-button",{staticClass:"item"},[a("img",{attrs:{src:e.icon}}),a("span",[t._v(t._s(e.name))])])],1)}))],2):t._e(),"staff"==t.user.role||"manager"==t.user.role||"admin"==t.user.role?a("div",{staticClass:"item-container"},[t._m(1),t._l(t.sidebarMenu.projectManager,(function(e){return a("router-link",{key:e.id,attrs:{to:e.link}},[a("v-ons-toolbar-button",{staticClass:"item"},[a("img",{attrs:{src:e.icon}}),a("span",[t._v(t._s(e.name))])])],1)}))],2):t._e(),"staff"==t.user.role||"manager"==t.user.role||"admin"==t.user.role?a("div",{staticClass:"item-container"},[t._m(2),t._l(t.sidebarMenu.record,(function(e){return a("router-link",{key:e.id,attrs:{to:e.link}},[a("v-ons-toolbar-button",{staticClass:"item"},[a("img",{attrs:{src:e.icon}}),a("span",[t._v(t._s(e.name))])])],1)}))],2):t._e(),"staff"==t.user.role||"manager"==t.user.role||"admin"==t.user.role?a("div",{staticClass:"item-container"},[t._m(3),t._l(t.sidebarMenu.contact,(function(e){return a("router-link",{key:e.id,attrs:{to:e.link}},[a("v-ons-toolbar-button",{staticClass:"item"},[a("img",{attrs:{src:e.icon}}),a("span",[t._v(t._s(e.name))])])],1)}))],2):t._e(),"staff"==t.user.role||"manager"==t.user.role||"admin"==t.user.role?a("div",{staticClass:"item-container"},[t._m(4),t._l(t.sidebarMenu.other,(function(e){return a("router-link",{key:e.id,attrs:{to:e.link}},[a("v-ons-toolbar-button",{staticClass:"item"},[a("img",{attrs:{src:e.icon}}),a("span",[t._v(t._s(e.name))])])],1)}))],2):t._e()])},n=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"section-label"},[a("label",[t._v("Executive Management")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"section-label"},[a("label",[t._v("Project Manager")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"section-label"},[a("label",[t._v("Record")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"section-label"},[a("label",[t._v("Contact")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"section-label"},[a("label",[t._v("Other")])])}],o={name:"sidebar",mounted:function(){},data:function(){return{currentPath:this.$route.path,currentPathAlias:this.$route.alias,sidebarMenu:this.$store.state.appsList}},computed:{user:function(){return this.$store.state.user}}},l=o,c=a(1001),u=(0,c.Z)(l,i,n,!1,null,"6d3f9d84",null),d=u.exports,h={name:"LayoutMain",components:{sidebar:d}},m=h,f=(0,c.Z)(m,r,s,!1,null,"6f20b45e",null),p=f.exports},69143:function(t,e,a){a.d(e,{Z:function(){return h}});var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"chart-item"},[this.chartData?a("highcharts",{attrs:{options:t.chartOptions}}):t._e(),this.chartData?t._e():a("div",{},[t._v("no data")])],1)},s=[],i=(a(56977),a(68309),a(41539),a(17133)),n=a.n(i),o=a(39477),l={name:"chart-forecast-sales-bar",created:function(){this.FETCH_DATA()},data:function(){return{chartData:{idb:[],rbi:[],ffs:[],itp:[]},chartOptions:{chart:{type:"column"},credits:{enabled:!1},title:{text:"THE QUARTERLY SUMMARY OF FORECAST REVENUE BY SERVICE TYPE IN 2023"},yAxis:{title:{text:"FORECAST REVENUE [MB]",style:{fontSize:"14"}},labels:{formatter:function(){return(this.value/1e6).toFixed(2)},style:{fontSize:"14"}}},xAxis:{crosshair:!0,categories:["Q1","Q2","Q3","Q4"],labels:{style:{fontSize:"14"}}},legend:{layout:"horizontal",align:"center",verticalAlign:"bottom"},plotOptions:{series:{label:{connectorAllowed:!1}}},series:[{name:"IDB",data:[],color:"#3a0ca3",dataLabels:{enabled:!0,rotation:-90,color:"#FFFFFF",align:"right",y:10,style:{fontSize:"10px"},formatter:function(){return(this.point.y/1e6).toFixed(2)}}},{name:"RBI",data:[],color:"#7209b7",dataLabels:{enabled:!0,rotation:-90,color:"#FFFFFF",align:"right",y:10,style:{fontSize:"10px"},formatter:function(){return(this.point.y/1e6).toFixed(2)}}},{name:"FFS",data:[],color:"#4cc9f0",dataLabels:{enabled:!0,rotation:-90,color:"#FFFFFF",align:"right",y:10,style:{fontSize:"10px"},formatter:function(){return(this.point.y/1e6).toFixed(2)}}},{name:"ITP",data:[],color:"#4361ee",dataLabels:{enabled:!0,rotation:-90,color:"#FFFFFF",align:"right",y:10,style:{fontSize:"10px"},formatter:function(){return(this.point.y/1e6).toFixed(2)}}}],tooltip:{formatter:function(){return"The <b>"+this.series.name+" </b>value for <b>"+this.x+"</b> is <b>"+(this.y/1e6).toFixed(2)+"MB"}},responsive:{rules:[{condition:{maxWidth:500},chartOptions:{legend:{layout:"horizontal",align:"center",verticalAlign:"bottom"}}}]}}}},methods:{FETCH_DATA:function(){var t=this;(0,o.Z)({method:"post",url:"forecast-sales/forecast-sales-group-sumbyyear",headers:{Authorization:"Bearer "+JSON.parse(localStorage.getItem("token"))},data:{year_no:n()().year()+1}}).then((function(e){if(e.data){for(var a=e.data,r=0;r<a.length;r++)1==a[r].service_type&&t.chartData.idb.push(a[r].y),2==a[r].service_type&&t.chartData.rbi.push(a[r].y),3==a[r].service_type&&t.chartData.ffs.push(a[r].y),4==a[r].service_type&&t.chartData.itp.push(a[r].y);t.chartData.idb.length>0&&(t.chartOptions.series[0].data=t.chartData.idb),t.chartData.rbi.length>0&&(t.chartOptions.series[1].data=t.chartData.rbi),t.chartData.ffs.length>0&&(t.chartOptions.series[2].data=t.chartData.ffs),t.chartData.itp.length>0&&(t.chartOptions.series[3].data=t.chartData.itp)}})).catch((function(t){console.log(t)})).finally((function(){}))}},computed:{}},c=l,u=a(1001),d=(0,u.Z)(c,r,s,!1,null,"79b3c19e",null),h=d.exports},88196:function(t,e,a){a.d(e,{Z:function(){return h}});var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"chart-item"},[this.chartData?a("highcharts",{attrs:{options:t.chartOptions}}):t._e(),this.chartData?t._e():a("div",{},[t._v("no data")])],1)},s=[],i=(a(68309),a(56977),a(41539),a(17133)),n=a.n(i),o=a(39477),l={name:"chart-forecast-sales-pie",created:function(){this.FETCH_DATA()},data:function(){return{chartData:{},chartOptions:{chart:{type:"pie"},credits:{enabled:!1},title:{text:"THE TOTAL FORECAST OF REVENUE BY SERVICE TYPE IN 2023"},yAxis:{title:{text:"Value (Baht)"}},xAxis:{title:{}},legend:{layout:"vertical",align:"right",verticalAlign:"middle"},plotOptions:{series:{label:{connectorAllowed:!1},pointStart:1},pie:{allowPointSelect:!0,cursor:"pointer",dataLabels:{enabled:!0,style:{fontSize:"14px"},formatter:function(){return this.point.name+": "+(this.point.y/1e6).toFixed(2)+"MB"}}}},series:[{name:"Service",colorByPoint:!0,data:[{name:"IDB",y:0,color:"#3a0ca3"},{name:"RBI",y:0,color:"#7209b7"},{name:"FFS",y:0,color:"#4cc9f0"},{name:"ITP",y:0,color:"#4361ee"}]}],tooltip:{formatter:function(){return"<b>"+this.point.name+"<br></b><br>Value: "+(this.y/1e6).toFixed(2)+"MB ("+this.point.percentage.toFixed(2)+"%)"}},responsive:{rules:[{condition:{maxWidth:500},chartOptions:{legend:{layout:"horizontal",align:"center",verticalAlign:"bottom"}}}]}}}},methods:{FETCH_DATA:function(){var t=this;(0,o.Z)({method:"post",url:"forecast-sales/forecast-sales-group-sumbytype",headers:{Authorization:"Bearer "+JSON.parse(localStorage.getItem("token"))},data:{year_no:n()().year()+1}}).then((function(e){e.data&&(t.chartData=e.data,t.chartData&&(t.chartOptions.series[0].data[0].y=t.chartData[0].y,t.chartOptions.series[0].data[1].y=t.chartData[1].y,t.chartOptions.series[0].data[2].y=t.chartData[2].y,t.chartOptions.series[0].data[3].y=t.chartData[3].y))})).catch((function(e){t.$ons.notification.alert(e.code+" "+e.response.status+" "+e.message)})).finally((function(){}))}},computed:{}},c=l,u=a(1001),d=(0,u.Z)(c,r,s,!1,null,"3b7a40ff",null),h=d.exports},67212:function(t,e,a){a.d(e,{Z:function(){return c}});var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"project-progress-wrapper chart-item"},[0==t.hideDetail?a("div",{staticClass:"detail-panel"},[a("div",{attrs:{id:"report-sheet"}},[a("div",{staticClass:"report-container"},[a("div",{staticClass:"sheet-body"},[t._m(0),t._m(1),a("div",{staticClass:"form-item-value"},[a("label",[t._v(t._s(t.info.project_no))])]),t._m(2),a("div",{staticClass:"form-item-value"},[a("label",[t._v(t._s(t.info.service_type))])]),t._m(3),a("div",{staticClass:"form-item-value"},[a("label",[t._v(t._s(t.info.client_name))])]),t._m(4),a("div",{staticClass:"form-item-value"},[a("label",[t._v(t._s((t.info.project_value/1e6).toFixed(2)))])]),t._m(5),a("div",{staticClass:"form-item-value"},[a("label",[t._v(t._s(t.info.last_progress.toFixed(2)))])]),t._m(6),"On plan"==t.info.status_cumulative?a("div",{staticClass:"form-item-value",staticStyle:{"background-color":"#ccffcc"}},[a("label",[t._v(t._s(t.info.status_cumulative))])]):t._e(),"Over plan"==t.info.status_cumulative?a("div",{staticClass:"form-item-value",staticStyle:{"background-color":"#66ff99"}},[a("label",[t._v(t._s(t.info.status_cumulative))])]):t._e(),"Lower plan"==t.info.status_cumulative?a("div",{staticClass:"form-item-value",staticStyle:{"background-color":"#ffff00"}},[a("label",[t._v(t._s(t.info.status_cumulative))])]):t._e(),"Done"==t.info.status_cumulative?a("div",{staticClass:"form-item-value",staticStyle:{"background-color":"#00cc00"}},[a("label",[t._v(t._s(t.info.status_cumulative))])]):t._e()])])])]):t._e(),a("highcharts",{staticClass:"chart-panel",attrs:{options:t.chartOptions}})],1)},s=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"section-label",staticStyle:{"grid-column":"span 2"}},[a("label",[t._v("project information")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"form-item-label"},[a("label",[t._v("Project No:")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"form-item-label"},[a("label",[t._v("Service Type:")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"form-item-label"},[a("label",[t._v("Client:")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"form-item-label"},[a("label",[t._v("Project Value (MB):")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"form-item-label"},[a("label",[t._v("Progress (%):")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"form-item-label"},[a("label",[t._v("Progress Status:")])])}],i=(a(56977),a(68309),{name:"chart-project-progress",props:{info:Object,hideDetail:Boolean},data:function(){return{chartData:{plan:[{month:1,y:1666666},{month:2,y:1666666},{month:3,y:1666666},{month:4,y:1666666},{month:5,y:1666666},{month:6,y:1666666},{month:7,y:1666666},{month:8,y:1666666},{month:9,y:1666666},{month:10,y:1666666},{month:11,y:1666666},{month:12,y:1666666}]},chartOptions:{chart:{type:"spline"},credits:{enabled:!1},title:{text:"PROJECT PROGRESS of "+this.info.project_no+" - "+this.info.client_name},yAxis:{title:{text:"PROGRESS (%)",style:{fontSize:"14"}},labels:{formatter:function(){return this.value+"%"},style:{fontSize:"14"}},max:100},xAxis:{title:{},labels:{style:{fontSize:"14"}},categories:[]},legend:{layout:"horizontal",align:"center",verticalAlign:"bottom"},plotOptions:{series:{label:{connectorAllowed:!1}},spline:{dataLabels:{enabled:!0,formatter:function(){return this.point.y.toFixed(2)+" %"}}}},series:[{name:"Planned",data:[],color:"#f00f78",lineWidth:2,marker:{symbol:"circle"},dataLabels:{enabled:!1}},{name:"Actual",data:[],color:"#1e1450",lineWidth:2,marker:{symbol:"circle"}}],tooltip:{formatter:function(){return"The <b>"+this.series.name+" </b>progress for month <b>"+this.x+"</b> is <b>"+this.y+"%"}},responsive:{rules:[{condition:{maxWidth:500},chartOptions:{legend:{layout:"horizontal",align:"center",verticalAlign:"bottom"}}}]}}}},methods:{},computed:{},mounted:function(){if(this.info)for(var t=0;t<this.info.progress_by_month.length;t++)this.chartOptions.series[0].data.push(this.info.progress_by_month[t].plan_cumulative),this.chartOptions.series[1].data.push(this.info.progress_by_month[t].actual_cumulative),this.chartOptions.xAxis.categories.push(this.info.progress_by_month[t].month_abbr)}}),n=i,o=a(1001),l=(0,o.Z)(n,r,s,!1,null,"737879ae",null),c=l.exports},40326:function(t,e,a){a.r(e),a.d(e,{default:function(){return k}});var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"pm-page"},[a("div",{staticClass:"pm-page-container"},[a("div",{staticClass:"page-header"},[t._m(0),a("div",[a("label",[t._v("report period:")]),a("label",[t._v(" "+t._s(t.weekly_start_date)+" to "+t._s(t.weekly_end_date))])]),t._m(1)]),a("div",{staticClass:"page-content"},[a("div",{staticClass:"page-report"},[a("div",{staticClass:"report-item"},[a("h2",[t._v("The Executive Summary")]),a("div",{staticClass:"report-item-card"},[a("div",{staticClass:"report-message-display",domProps:{innerHTML:t._s(t.report_message)}})])]),a("div",{staticClass:"report-item"},[a("h2",[t._v("The Current Revenue of "+t._s(t.current_year))]),a("div",{staticClass:"report-item-card"},[a("YearSetCurrent"),a("div",{staticClass:"chart-wrapper-grid"},[a("div",{staticClass:"chart-wrapper",staticStyle:{"grid-column":"span 2"}},[a("ChartCurrentSalesLine")],1),a("div",{staticClass:"chart-wrapper",staticStyle:{"grid-column":"span 2"}},[a("ChartCurrentSalesPie")],1),a("div",{staticClass:"chart-wrapper",staticStyle:{"grid-column":"span 2","margin-bottom":"0px"}},[a("ChartCurrentSalesBar")],1)])],1)]),a("div",{staticClass:"report-item"},[a("h2",[t._v("The Forecast Revenue of "+t._s(t.current_year+1))]),a("div",{staticClass:"report-item-card"},[a("YearSetForecast"),a("div",{staticClass:"chart-wrapper-grid"},[a("div",{staticClass:"chart-wrapper",staticStyle:{"grid-column":"span 2"}},[a("ChartForecastSalesBar")],1),a("div",{staticClass:"chart-wrapper",staticStyle:{"grid-column":"span 2"}},[a("ChartForecastSalesByMonthLine")],1),a("div",{staticClass:"chart-wrapper",staticStyle:{"grid-column":"span 2"}},[a("ChartForecastSalesPie")],1)]),a("div",{staticClass:"table-summary"},[a("div",{staticClass:"panel-head"},[t._v(" The Forecast Revenue Summary of 2023 ")]),a("DxDataGrid",{attrs:{id:"summary-forecast-revenue","data-source":t.forecast_project_list,selection:{mode:"single"},"hover-state-enabled":!0,"allow-column-reordering":!0,"show-borders":!0,"show-row-lines":!1,"row-alternation-enabled":!0},scopedSlots:t._u([{key:"service-header",fn:function(){return[a("div",[t._v("Service"),a("br"),t._v("Type")])]},proxy:!0},{key:"confidence-header",fn:function(){return[a("div",[t._v("Confident"),a("br"),t._v("Level(%)")])]},proxy:!0},{key:"forecast-header",fn:function(){return[a("div",[t._v("Forecast"),a("br"),t._v("Revenue(MB)")])]},proxy:!0},{key:"CELL_ROW_FORECAST",fn:function(e){var a=e.data;return[t._v(" "+t._s(a.rowIndex+1)+" ")]}}])},[a("DxPaging",{attrs:{"page-size":100}}),a("DxColumn",{attrs:{"data-field":"",width:50,alignment:"center",caption:"No.","cell-template":"CELL_ROW_FORECAST"}}),a("DxColumn",{attrs:{"data-field":"service_type_desc",alignment:"center",caption:"Service Type",width:100,"header-cell-template":"service-header"}}),a("DxColumn",{attrs:{"data-field":"project_name",alignment:"left",caption:"Project Name"}}),a("DxColumn",{attrs:{"data-field":"client_name",caption:"Client Name",width:400}}),a("DxColumn",{attrs:{"data-field":"confident_level",caption:"Confidence Level (%)",alignment:"right",width:120,"customize-text":t.FORECAST_CONFIDENCE_LEVEL,"header-cell-template":"confidence-header","css-class":"confidence-padding"}}),a("DxColumn",{attrs:{"data-field":"project_value",caption:"Forecast Revenue (MB)",alignment:"right",width:120,"customize-text":t.FORECAST_REVENUE,"header-cell-template":"forecast-header","css-class":"forecast-value-padding"}}),a("DxScrolling",{attrs:{mode:"standard"}})],1),a("div",{staticClass:"panel-summary"},[a("div",{staticClass:"label"},[t._v("total forecast revenue (Million Baht)")]),a("div",{staticClass:"total-count"},[t._v(t._s(t.forecast_revenue_total))])])],1)],1)]),a("div",{staticClass:"report-item"},[a("h2",[t._v("the current project progress")]),a("div",{staticClass:"report-item-card"},[a("div",{staticClass:"table-summary"},[a("div",{staticClass:"panel-head"},[t._v("Project Progress Summary")]),a("DxDataGrid",{attrs:{id:"summary-forecast-revenue","data-source":t.current_project_progress_chart,selection:{mode:"single"},"hover-state-enabled":!0,"allow-column-reordering":!0,"show-borders":!0,"show-row-lines":!1,"row-alternation-enabled":!0},on:{"cell-prepared":t.STATUS_PROJECT_CUMULATIVE},scopedSlots:t._u([{key:"service-header",fn:function(){return[a("div",[t._v("Service"),a("br"),t._v("Type")])]},proxy:!0},{key:"progress-header",fn:function(){return[a("div",[t._v("Progress"),a("br"),t._v("(%)")])]},proxy:!0},{key:"progress-status-header",fn:function(){return[a("div",[t._v("Progress"),a("br"),t._v("Status")])]},proxy:!0},{key:"CELL_ROW_CURRENT",fn:function(e){var a=e.data;return[t._v(" "+t._s(a.rowIndex+1)+" ")]}}])},[a("DxPaging",{attrs:{"page-size":100}}),a("DxColumn",{attrs:{"data-field":"",width:50,alignment:"center",caption:"No.","cell-template":"CELL_ROW_CURRENT"}}),a("DxColumn",{attrs:{"data-field":"project_no",alignment:"center",caption:"Project No.",width:120,"sort-order":"asc"}}),a("DxColumn",{attrs:{"data-field":"project_name",alignment:"left",caption:"Project Name"}}),a("DxColumn",{attrs:{"data-field":"service_type",alignment:"center",caption:"Service Type",width:100,"header-cell-template":"service-header"}}),a("DxColumn",{attrs:{"data-field":"client_name",width:400,caption:"Client Name"}}),a("DxColumn",{attrs:{"data-field":"actual_cumulative",caption:"Progress (%)",width:120,alignment:"right","customize-text":t.PROJECT_PROGRESS_PERCENT,"header-cell-template":"progress-header","css-class":"progress-padding"}}),a("DxColumn",{attrs:{"data-field":"status_cumulative",caption:"Progress Status",width:120,alignment:"center","header-cell-template":"progress-status-header"}}),a("DxScrolling",{attrs:{mode:"standard"}})],1)],1),a("div",{staticClass:"chart-wrpper-grid"},[a("div",{staticClass:"chart-wrapper"},t._l(t.current_project_progress_chart,(function(e,r){return a("div",{key:e.id_project},["Done"!=e.status_cumulative?a("ChartProjectProgress",{attrs:{info:t.current_project_progress_chart[r]}}):t._e()],1)})),0)])])]),a("div",{staticClass:"report-item"},[a("h2",[t._v("the sales and marketing")]),a("div",{staticClass:"report-item-card"},[a("UnderDevelopment")],1)]),a("label",{staticClass:"update-label"},[t._v("Information Updated on: "+t._s(t.current_date))])])])]),1==t.isLoading?a("contentLoading",{attrs:{text:"Loading, please wait...",color:"#fc9b21"}}):t._e()],1)},s=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("h1",[a("span",{staticStyle:{"font-size":"32px"}},[t._v("E")]),t._v("xecutive "),a("span",{staticStyle:{"font-size":"32px"}},[t._v("R")]),t._v("eport of "),a("span",{staticStyle:{"font-size":"32px"}},[t._v("a")]),t._v("sset "),a("span",{staticStyle:{"font-size":"32px"}},[t._v("i")]),t._v("ntegrity "),a("span",{staticStyle:{"font-size":"32px"}},[t._v("s")]),t._v("ection ")])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("label",[t._v("report by:")]),a("label",[t._v("Mr. Chawanat Kongthanakana")])])}],i=(a(74916),a(15306),a(56977),a(41539),a(48626)),n=a(74755),o=a(54513),l=a(87283),c=a(88196),u=a(69143),d=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"chart-item"},[this.chartData?a("highcharts",{attrs:{options:t.chartOptions}}):t._e(),this.chartData?t._e():a("div",{},[t._v("no data")])],1)},h=[],m=(a(68309),a(17133)),f=a.n(m),p=a(39477),_={name:"chart-forecast-sales-bymonth-line",created:function(){this.FETCH_DATA()},data:function(){return{chartData:{idb:[],rbi:[],ffs:[],itp:[]},chartOptions:{chart:{type:"spline"},credits:{enabled:!1},title:{text:"THE MONTHLY SUMMARY OF FORECAST REVENUE BY SERVICE TYPE IN 2023"},yAxis:{title:{text:"ACTUAL REVENUE [MB]",style:{fontSize:"14"}},labels:{formatter:function(){return(this.value/1e6).toFixed(2)},style:{fontSize:"14"}}},xAxis:{title:{},labels:{style:{fontSize:"14"}},categories:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]},legend:{layout:"horizontal",align:"center",verticalAlign:"bottom"},plotOptions:{series:{label:{connectorAllowed:!1}},spline:{dataLabels:{enabled:!0,formatter:function(){return(this.point.y/1e6).toFixed(2)+"MB"}}}},series:[{name:"IDB",data:[],color:"#3a0ca3",dataLabels:{enabled:!0,formatter:function(){return 0==this.point.y?"":this.point.y<1e4?(this.point.y/1e6).toFixed(3)+"MB":(this.point.y/1e6).toFixed(2)+"MB"}},marker:{symbol:"circle"}},{name:"RBI",data:[],color:"#7209b7",dataLabels:{formatter:function(){return 0==this.point.y?"":this.point.y<1e4?(this.point.y/1e6).toFixed(3)+"MB":(this.point.y/1e6).toFixed(2)+"MB"}},marker:{symbol:"circle"}},{name:"FFS",data:[],color:"#4cc9f0",dataLabels:{enabled:!0,formatter:function(){return 0==this.point.y?"":this.point.y<1e4?(this.point.y/1e6).toFixed(3)+"MB":(this.point.y/1e6).toFixed(2)+"MB"}},marker:{symbol:"circle"}},{name:"ITP",data:[],color:"#4361ee",dataLabels:{enabled:!0,formatter:function(){return 0==this.point.y?"":this.point.y<1e4?(this.point.y/1e6).toFixed(3)+"MB":(this.point.y/1e6).toFixed(2)+"MB"}},marker:{symbol:"circle"}}],tooltip:{formatter:function(){return"The <b>"+this.series.name+" </b>value for month <b>"+this.x+"</b> is <b>"+(this.y/1e6).toFixed(2)+"MB"}},responsive:{rules:[{condition:{maxWidth:500},chartOptions:{legend:{layout:"horizontal",align:"center",verticalAlign:"bottom"}}}]}}}},methods:{FETCH_DATA:function(){var t=this;(0,p.Z)({method:"post",url:"forecast-sales/forecast-sales-group-month-sumbyyear",headers:{Authorization:"Bearer "+JSON.parse(localStorage.getItem("token"))},data:{year_no:f()().year()+1}}).then((function(e){if(e.data){for(var a=e.data,r=0;r<a.length;r++)1==a[r].service_type&&t.chartData.idb.push(a[r].y),2==a[r].service_type&&t.chartData.rbi.push(a[r].y),3==a[r].service_type&&t.chartData.ffs.push(a[r].y),4==a[r].service_type&&t.chartData.itp.push(a[r].y);t.chartData.idb.length>0&&(t.chartOptions.series[0].data=t.chartData.idb),t.chartData.rbi.length>0&&(t.chartOptions.series[1].data=t.chartData.rbi),t.chartData.ffs.length>0&&(t.chartOptions.series[2].data=t.chartData.ffs),t.chartData.itp.length>0&&(t.chartOptions.series[3].data=t.chartData.itp)}})).catch((function(e){t.$ons.notification.alert(e.code+" "+e.response.status+" "+e.message)})).finally((function(){}))}},computed:{}},v=_,y=a(1001),g=(0,y.Z)(v,d,h,!1,null,"710c7a9b",null),b=g.exports,C=a(67212),E=a(36394),S=a(47768),x=a(49075),F=a(84720),D=a(99986),T=a(67023),O={name:"ViewSummaryReport",components:{UnderDevelopment:T.Z,contentLoading:x.Z,ChartCurrentSalesLine:n.Z,ChartCurrentSalesPie:o.Z,ChartCurrentSalesBar:l.Z,YearSetCurrent:E.Z,ChartForecastSalesPie:c.Z,ChartForecastSalesBar:u.Z,YearSetForecast:S.Z,ChartProjectProgress:C.Z,ChartForecastSalesByMonthLine:b,DxDataGrid:i.DxDataGrid,DxPaging:i.DxPaging,DxScrolling:i.DxScrolling,DxColumn:i.DxColumn},created:function(){this.$store.commit("CLEAR_CURRENT_INAPP"),this.$store.commit("UPDATE_CURRENT_INAPP",{name:"Executive Summary Report",icon:"/img/icon_menu/executive_management/summary.png"}),this.FETCH_INFO(),this.FETCH_DATA_PROJECT_FORECAST(),this.FETCH_DATA_PROJECT_PROGRESS();var t=JSON.parse(localStorage.getItem("user"));console.log(t),"ceo"==t.role?this.$emit("update:layout",D.Z):this.$emit("update:layout",F.Z)},data:function(){return{isLoading:!1,info:{weekly_report:{}},quarter:[{no:"Year 2023"},{no:"Q1"},{no:"Q2"},{no:"Q3"},{no:"Q4"},{no:"Total"}],forecast_project_list:[],current_project_progress_list:[],current_project_progress_chart:[]}},computed:{weekly_start_date:function(){return f()(this.info.weekly_report.start_date).format("ddd-MMM-DD-YY")},weekly_end_date:function(){return f()(this.info.weekly_report.end_date).format("ddd-MMM-DD-YY")},current_date:function(){return f()().format("dddd, LL, hh:mm:ss a")},current_year:function(){return f()().year()},report_message:function(){if(this.info.weekly_report.report_message){var t=this.info.weekly_report.report_message;return t.replace(/\\/g,"")}return this.$store.state.inAppMessage.noData},forecast_revenue_total:function(){for(var t=this.forecast_project_list,e=0,a=0;a<t.length;a++)e+=t[a].project_value;return(e/1e6).toFixed(2)}},methods:{FETCH_INFO:function(){var t=this;(0,p.Z)({method:"get",url:"weekly-report/get-last-weekly-report",headers:{Authorization:"Bearer "+JSON.parse(localStorage.getItem("token"))}}).then((function(e){e.data&&(t.info.weekly_report=e.data[0])})).catch((function(e){t.$ons.notification.alert(e.code+" "+e.response.status+" "+e.message)})).finally((function(){}))},FETCH_DATA_PROJECT_FORECAST:function(){var t=this;(0,p.Z)({method:"get",url:"/forecast-sales/forecast-sales-list",headers:{Authorization:"Bearer "+JSON.parse(localStorage.getItem("token"))}}).then((function(e){e.data&&(t.forecast_project_list=e.data)})).catch((function(e){t.$ons.notification.alert(e.code+" "+e.response.status+" "+e.message)})).finally((function(){}))},FETCH_DATA_PROJECT_PROGRESS:function(){var t=this;(0,p.Z)({method:"get",url:"/current-sales/project-current-sales-progress",headers:{Authorization:"Bearer "+JSON.parse(localStorage.getItem("token"))}}).then((function(e){e.data&&(t.current_project_progress_chart=e.data)})).catch((function(e){t.$ons.notification.alert(e.code+" "+e.response.status+" "+e.message)})).finally((function(){}))},PROJECT_PROGRESS_PERCENT:function(t){return t.value.toFixed(2)},FORECAST_CONFIDENCE_LEVEL:function(t){return t.value.toFixed(0)},FORECAST_REVENUE:function(t){return(t.value/1e6).toFixed(2)},STATUS_PROJECT_CUMULATIVE:function(t){"data"===t.rowType&&"status_cumulative"===t.column.dataField&&(t.cellElement.style.background="On plan"==t.data.status_cumulative?"#ccffcc":"Over plan"==t.data.status_cumulative?"#66ff99":"Lower plan"==t.data.status_cumulative?"#ffff00":"Done"==t.data.status_cumulative?"#00cc00":"")}},mounted:function(){}},A=O,R=(0,y.Z)(A,r,s,!1,null,"6f0fe244",null),k=R.exports},47768:function(t,e,a){a.d(e,{Z:function(){return h}});var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"card-set-year fix-six"},t._l(t.quarter,(function(e){return a("div",{key:e.no,staticClass:"card-item-month monthlabel"},[a("p",[t._v(t._s(e.no))])])})),0),a("div",{staticClass:"card-set-year fix-six"},[t._m(0),t._l(t.ForecastSalesYearSetData,(function(e){return a("div",{key:e.quarter_no,staticClass:"card-item-month actual"},[a("p",{staticClass:"label-value"},[t._v(t._s((e.y/1e6).toFixed(2)))]),a("p",{staticClass:"label-currency"},[t._v("MB")])])})),a("div",{staticClass:"card-item-month table-td"},[a("p",{staticClass:"label-value"},[t._v(" "+t._s((t.total_plan/1e6).toFixed(2))+" ")]),a("p",{staticClass:"label-currency"},[t._v("MB")])])],2)])},s=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"card-item-month table-td"},[a("p",[t._v("FORECAST REVENUE")])])}],i=(a(41539),a(17133)),n=a.n(i),o=a(39477),l={name:"yearset-forecast-sales",created:function(){this.FETCH_PLAN()},data:function(){return{quarter:[{no:"YEAR 2023"},{no:"Q1"},{no:"Q2"},{no:"Q3"},{no:"Q4"},{no:"TOTAL"}],ForecastSalesYearSetData:[]}},methods:{FETCH_PLAN:function(){var t=this;(0,o.Z)({method:"post",url:"forecast-sales/forecast-sales-sumbyquarter",headers:{Authorization:"Bearer "+JSON.parse(localStorage.getItem("token"))},data:{year_no:n()().year()+1}}).then((function(e){e.data&&(t.ForecastSalesYearSetData=e.data)})).catch((function(t){console.log(t)})).finally((function(){}))}},computed:{total_plan:function(){if(this.ForecastSalesYearSetData.length>0){for(var t=0,e=0;e<this.ForecastSalesYearSetData.length;e++)t+=this.ForecastSalesYearSetData[e].y;return t}return 0}}},c=l,u=a(1001),d=(0,u.Z)(c,r,s,!1,null,"43ae1375",null),h=d.exports}}]);
//# sourceMappingURL=8603-legacy.296ab16d.js.map