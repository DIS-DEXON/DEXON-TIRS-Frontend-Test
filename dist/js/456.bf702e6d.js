(self["webpackChunkai_portal"]=self["webpackChunkai_portal"]||[]).push([[456],{67023:function(t,e,n){"use strict";n.d(e,{Z:function(){return d}});var i=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},o=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"wrapper"},[n("div",{staticClass:"item"},[n("i",{staticClass:"las la-plug"}),n("h2",[t._v("Coming Soon")])])])}],r={name:"unavailable-feature-div"},s=r,a=n(1001),c=(0,a.Z)(s,i,o,!1,null,"4a78b7e4",null),d=c.exports},25930:function(t,e,n){n(21703),n(82801),function(e,n){t.exports=n()}("undefined"!==typeof self&&self,(function(){return function(t){var e={};function n(i){if(e[i])return e[i].exports;var o=e[i]={i:i,l:!1,exports:{}};return t[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(i,o,function(e){return t[e]}.bind(null,o));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s="112a")}({"112a":function(t,e,n){"use strict";var i;n.r(e),n.d(e,"VueTabsChrome",(function(){return w})),"undefined"!==typeof window&&(n("e67d"),(i=window.document.currentScript)&&(i=i.src.match(/(.+\/)[^/]+\.js(\?.*)?$/))&&(n.p=i[1]));var o,r,s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"vue-tabs-chrome",class:t.theme?"theme-"+t.theme:""},[n("div",{ref:"content",staticClass:"tabs-content"},[t._l(t.tabs.length,(function(e){return n("div",{key:e,staticClass:"tabs-divider",style:{left:(t.tabWidth-2*t.gap)*e+t.gap+"px"}})})),t._l(t.tabs,(function(e,i){return n("div",{key:t.getKey(e),ref:"item",refInFor:!0,staticClass:"tabs-item",class:[{active:t.getKey(e)===t.value},"tab-"+t.getKey(e),e.class].filter((function(t){return t})),style:{width:t.tabWidth+"px"},on:{contextmenu:function(n){return t.handleMenu(n,e,i)}}},[n("div",{staticClass:"tabs-background"},[n("div",{staticClass:"tabs-background-content"}),n("svg",{staticClass:"tabs-background-before",attrs:{width:"7",height:"7"}},[n("path",{attrs:{d:"M 0 7 A 7 7 0 0 0 7 0 L 7 7 Z"}})]),n("svg",{staticClass:"tabs-background-after",attrs:{width:"7",height:"7"}},[n("path",{attrs:{d:"M 0 0 A 7 7 0 0 0 7 7 L 0 7 Z"}})])]),n("div",{directives:[{name:"show",rawName:"v-show",value:t.canShowTabClose(e),expression:"canShowTabClose(tab)"}],staticClass:"tabs-close",on:{click:function(n){return n.stopPropagation(),t.handleDelete(e,i)}}},[t.$slots["close-icon"]?t._t("close-icon"):n("svg",{staticClass:"tabs-close-icon",attrs:{width:"16",height:"16",stroke:"#595959"}},[n("path",{attrs:{d:"M 4 4 L 12 12 M 12 4 L 4 12"}})])],2),n("div",{staticClass:"tabs-main",attrs:{title:t._f("tabLabelText")(e,t.tabLabel,t.renderLabel)}},[e.favicon?n("span",{staticClass:"tabs-favicon"},["function"===typeof e.favicon?n("render-temp",{attrs:{render:e.favicon,params:{tab:e,index:i}}}):e.favicon?n("img",{attrs:{height:"32",width:"32",src:e.favicon}}):t._e()],1):t._e(),n("span",{staticClass:"tabs-label",class:{"no-close":!t.canShowTabClose(e)}},[t._v(t._s(t._f("tabLabelText")(e,t.tabLabel,t.renderLabel)))])])])})),n("span",{ref:"after",staticClass:"tabs-after",style:{left:(t.tabWidth-2*t.gap)*t.tabs.length+2*t.gap+"px"}},[t._t("after")],2)],2),n("div",{staticClass:"tabs-footer"})])},a=[],c=n("7c66"),d=n.n(c),h={name:"render-temp",props:{render:{type:Function,default:()=>{}},params:{type:Object,default:()=>({})}},render(t){return this.render&&this.render(t,{...this.params})}},u=h;function l(t,e,n,i,o,r,s,a){var c,d="function"===typeof t?t.options:t;if(e&&(d.render=e,d.staticRenderFns=n,d._compiled=!0),i&&(d.functional=!0),r&&(d._scopeId="data-v-"+r),s?(c=function(t){t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,t||"undefined"===typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),o&&o.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(s)},d._ssrRegister=c):o&&(c=a?function(){o.call(this,(d.functional?this.parent:this).$root.$options.shadowRoot)}:o),c)if(d.functional){d._injectStyles=c;var h=d.render;d.render=function(t,e){return c.call(e),h(t,e)}}else{var u=d.beforeCreate;d.beforeCreate=u?[].concat(u,c):[c]}return{exports:t,options:d}}var f=l(u,o,r,!1,null,null,null),p=f.exports;const b=(t,e,n,i,o)=>{let r=(n-o)/2,s=e._instance.position.x;for(let a=0;a<t.length;a++){let n=t[a]._x-1;if(v(e,i)!==v(t[a],i)){if(n<=s&&s<n+r/2)return{direction:"left",instance:t[a]._instance,targetTab:t[a]};if(n+r/2<=s&&s<n+r)return{direction:"right",instance:t[a]._instance,targetTab:t[a]}}}return{direction:null,instance:null,targetTab:e}},g=(t,e)=>{let n=e.split("."),i=t;return n.forEach((t=>{i=i[t]})),i},v=(t,e)=>g(t,e);var m={name:"vue-tabs-chrome",components:{RenderTemp:p},props:{value:{type:[String,Number],default:""},tabs:{type:Array,default:()=>[]},props:{type:Object,default:()=>({})},minWidth:{type:Number,default:40},autoHiddenCloseIconWidth:{type:Number,default:120},maxWidth:{type:Number,default:245},gap:{type:Number,default:7},insertToAfter:{type:Boolean,default:!1},theme:{type:String,default:""},isMousedownActive:{type:Boolean,default:!0},renderLabel:{type:Function},onClose:{type:Function}},data(){return{tabWidth:null}},filters:{tabLabelText(t,e="",n){return n?n(t):g(t,e)}},computed:{tabKey(){return this.props.key||"key"},tabLabel(){return this.props.label||"label"}},mounted(){this.calcTabWidth(),window.addEventListener("resize",this.handleResize),this.setup()},destroyed(){window.removeEventListener("resize",this.handleResize)},methods:{canShowTabClose(t){return!1!==t.closable&&(t[this.tabKey]===this.value||!(this.autoHiddenCloseIconWidth>this.tabWidth))},calcTabWidth(){let{tabs:t,maxWidth:e,minWidth:n,gap:i}=this,o=this.$refs.content,r=this.$refs.after,s=r.getBoundingClientRect().width;if(!o)return Math.max(e,n);let a=o.clientWidth-3*i-s,c=a/t.length;c+=2*i,c>e&&(c=e),c<n&&(c=n),this.tabWidth=c},setup(){let{tabs:t}=this;t.forEach(((t,e)=>{this.addInstance(t,e)}))},addInstance(t,e){let{tabWidth:n,tabKey:i,gap:o}=this;if(t._instance)return void t._instance.setPosition(t._x,0);let r=this.$refs.content,s=this.$refs.item,a=s.find((e=>e.classList.contains("tab-"+v(t,i))));t._instance=new d.a(a,{axis:"x",containment:r,handle:".tabs-main"}),!1===t.dragable&&(t._instance.disable(),a.addEventListener("mousedown",(n=>this.handlePointerDown(n,t,e))),a.addEventListener("click",(n=>this.handleClick(n,t,e))));let c=(n-2*o)*e;t._x=c,t._instance.setPosition(c,0),t._instance.on("pointerDown",(n=>this.handlePointerDown(n,t,e))),t._instance.on("dragMove",(n=>this.handleDragMove(n,t,e))),t._instance.on("dragEnd",(n=>this.handleDragEnd(n,t,e))),t._instance.on("staticClick",(n=>this.handleClick(n,t,e)))},addTab(...t){let{insertToAfter:e,value:n,tabKey:i}=this;if(e){let e=this.tabs.findIndex((t=>v(t,i)===n));this.tabs.splice(e+1,0,...t)}else this.tabs.push(...t);this.$nextTick((()=>{this.setup(),this.doLayout()}))},removeTab(t){let{tabKey:e,tabs:n}=this,i=-1,o=null;"number"===typeof tab?(i=t,o=this.tabs[i]):n.forEach(((n,r)=>{v(n,e)===t&&(i=r,o=n)})),i>=0&&o&&this.handleDelete(o,i)},doLayout(){this.calcTabWidth();let{tabWidth:t,tabs:e,gap:n}=this;e.forEach(((e,i)=>{let o=e._instance,r=(t-2*n)*i;e._x=r,o.setPosition(r,0)}))},handleDelete(t,e){if("function"===typeof this.onClose&&!this.onClose(t,t[this.tabKey],e))return!1;let n,i,{tabKey:o,tabs:r,value:s}=this,a=r.findIndex((t=>v(t,o)===s));e===a&&(n=r[e+1],i=r[e-1]),n?this.$emit("input",v(n,o)):i?this.$emit("input",v(i,o)):r.length<=1&&this.$emit("input",null),r.splice(e,1),this.$emit("remove",t,e),this.$nextTick((()=>{this.doLayout()}))},handleResize(t){this.timer&&clearTimeout(this.timer),this.timer=setTimeout((()=>{this.doLayout()}),100)},handlePointerDown(t,e,n){let{tabKey:i,isMousedownActive:o}=this;o&&this.$emit("input",v(e,i)),this.$emit("dragstart",t,e,n)},handleDragMove(t,e,n){let{tabWidth:i,tabs:o,tabKey:r,gap:s}=this,{instance:a,targetTab:c}=b(o,e,i,r,s);a&&this.swapTab(e,c),this.$emit("dragging",t,c,n)},handleDragEnd(t,e){let n=e._instance;n.position.x<0||(setTimeout((()=>{n.element.classList.add("move"),n.setPosition(e._x,0)}),50),setTimeout((()=>{this.$emit("dragend",t,e),n.element.classList.remove("move")}),200))},handleClick(t,e,n){this.$emit("click",t,e,n)},handleMenu(t,e,n){this.$emit("contextmenu",t,e,n)},swapTab(t,e){let n,i,{tabKey:o,tabs:r}=this;if(!1===e.swappable)return;for(let c=0;c<r.length;c++)v(t,o)===v(r[c],o)&&(n=c),v(e,o)===v(r[c],o)&&(i=c);n!==i&&([r[n],r[i]]=[r[i],r[n]]);let s=t._x;t._x=e._x,e._x=s;let a=e._instance;setTimeout((()=>{a.element.classList.add("move"),a.setPosition(s,a.position.y)}),50),setTimeout((()=>{a.element.classList.remove("move"),this.$emit("swap",t,e)}),200),this.tabs.splice(0,0)},getTabs(){return this.tabs.map((t=>{let e={...t};return delete e._instance,delete e._x,e}))},getKey(t){return v(t,this.tabKey)}}},y=m,x=(n("9f0c"),l(y,s,a,!1,null,null,null)),w=x.exports;const _=function(t){_.installed||(_.installed=!0,t.component(w.name,w))};"undefined"!==typeof window&&window.Vue&&_(window.Vue),w.install=_;var k=w;e["default"]=k},"2d0b":function(t,e,n){var i,o;
/*!
       * Unidragger v2.3.1
       * Draggable base class
       * MIT license
       */(function(r,s){i=[n("b246")],o=function(t){return s(r,t)}.apply(e,i),void 0===o||(t.exports=o)})(window,(function(t,e){"use strict";function n(){}var i=n.prototype=Object.create(e.prototype);i.bindHandles=function(){this._bindHandles(!0)},i.unbindHandles=function(){this._bindHandles(!1)},i._bindHandles=function(e){e=void 0===e||e;for(var n=e?"addEventListener":"removeEventListener",i=e?this._touchActionValue:"",o=0;o<this.handles.length;o++){var r=this.handles[o];this._bindStartEvent(r,e),r[n]("click",this),t.PointerEvent&&(r.style.touchAction=i)}},i._touchActionValue="none",i.pointerDown=function(t,e){var n=this.okayPointerDown(t);n&&(this.pointerDownPointer={pageX:e.pageX,pageY:e.pageY},t.preventDefault(),this.pointerDownBlur(),this._bindPostStartEvents(t),this.emitEvent("pointerDown",[t,e]))};var o={TEXTAREA:!0,INPUT:!0,SELECT:!0,OPTION:!0},r={radio:!0,checkbox:!0,button:!0,submit:!0,image:!0,file:!0};return i.okayPointerDown=function(t){var e=o[t.target.nodeName],n=r[t.target.type],i=!e||n;return i||this._pointerReset(),i},i.pointerDownBlur=function(){var t=document.activeElement,e=t&&t.blur&&t!=document.body;e&&t.blur()},i.pointerMove=function(t,e){var n=this._dragPointerMove(t,e);this.emitEvent("pointerMove",[t,e,n]),this._dragMove(t,e,n)},i._dragPointerMove=function(t,e){var n={x:e.pageX-this.pointerDownPointer.pageX,y:e.pageY-this.pointerDownPointer.pageY};return!this.isDragging&&this.hasDragStarted(n)&&this._dragStart(t,e),n},i.hasDragStarted=function(t){return Math.abs(t.x)>3||Math.abs(t.y)>3},i.pointerUp=function(t,e){this.emitEvent("pointerUp",[t,e]),this._dragPointerUp(t,e)},i._dragPointerUp=function(t,e){this.isDragging?this._dragEnd(t,e):this._staticClick(t,e)},i._dragStart=function(t,e){this.isDragging=!0,this.isPreventingClicks=!0,this.dragStart(t,e)},i.dragStart=function(t,e){this.emitEvent("dragStart",[t,e])},i._dragMove=function(t,e,n){this.isDragging&&this.dragMove(t,e,n)},i.dragMove=function(t,e,n){t.preventDefault(),this.emitEvent("dragMove",[t,e,n])},i._dragEnd=function(t,e){this.isDragging=!1,setTimeout(function(){delete this.isPreventingClicks}.bind(this)),this.dragEnd(t,e)},i.dragEnd=function(t,e){this.emitEvent("dragEnd",[t,e])},i.onclick=function(t){this.isPreventingClicks&&t.preventDefault()},i._staticClick=function(t,e){this.isIgnoringMouseUp&&"mouseup"==t.type||(this.staticClick(t,e),"mouseup"!=t.type&&(this.isIgnoringMouseUp=!0,setTimeout(function(){delete this.isIgnoringMouseUp}.bind(this),400)))},i.staticClick=function(t,e){this.emitEvent("staticClick",[t,e])},n.getPointerPoint=e.getPointerPoint,n}))},4882:function(t,e,n){var i,o;(function(r,s){i=s,o="function"===typeof i?i.call(e,n,e,t):i,void 0===o||(t.exports=o)})("undefined"!=typeof window&&window,(function(){"use strict";function t(){}var e=t.prototype;return e.on=function(t,e){if(t&&e){var n=this._events=this._events||{},i=n[t]=n[t]||[];return-1==i.indexOf(e)&&i.push(e),this}},e.once=function(t,e){if(t&&e){this.on(t,e);var n=this._onceEvents=this._onceEvents||{},i=n[t]=n[t]||{};return i[e]=!0,this}},e.off=function(t,e){var n=this._events&&this._events[t];if(n&&n.length){var i=n.indexOf(e);return-1!=i&&n.splice(i,1),this}},e.emitEvent=function(t,e){var n=this._events&&this._events[t];if(n&&n.length){n=n.slice(0),e=e||[];for(var i=this._onceEvents&&this._onceEvents[t],o=0;o<n.length;o++){var r=n[o],s=i&&i[r];s&&(this.off(t,r),delete i[r]),r.apply(this,e)}return this}},e.allOff=function(){delete this._events,delete this._onceEvents},t}))},5925:function(t,e,n){"use strict";function i(t,e){for(var n=[],i={},o=0;o<e.length;o++){var r=e[o],s=r[0],a=r[1],c=r[2],d=r[3],h={id:t+":"+o,css:a,media:c,sourceMap:d};i[s]?i[s].parts.push(h):n.push(i[s]={id:s,parts:[h]})}return n}n.r(e),n.d(e,"default",(function(){return p}));var o="undefined"!==typeof document;if("undefined"!==typeof DEBUG&&DEBUG&&!o)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var r={},s=o&&(document.head||document.getElementsByTagName("head")[0]),a=null,c=0,d=!1,h=function(){},u=null,l="data-vue-ssr-id",f="undefined"!==typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());function p(t,e,n,o){d=n,u=o||{};var s=i(t,e);return b(s),function(e){for(var n=[],o=0;o<s.length;o++){var a=s[o],c=r[a.id];c.refs--,n.push(c)}for(e?(s=i(t,e),b(s)):s=[],o=0;o<n.length;o++)if(c=n[o],0===c.refs){for(var d=0;d<c.parts.length;d++)c.parts[d]();delete r[c.id]}}}function b(t){for(var e=0;e<t.length;e++){var n=t[e],i=r[n.id];if(i){i.refs++;for(var o=0;o<i.parts.length;o++)i.parts[o](n.parts[o]);for(;o<n.parts.length;o++)i.parts.push(v(n.parts[o]));i.parts.length>n.parts.length&&(i.parts.length=n.parts.length)}else{var s=[];for(o=0;o<n.parts.length;o++)s.push(v(n.parts[o]));r[n.id]={id:n.id,refs:1,parts:s}}}}function g(){var t=document.createElement("style");return t.type="text/css",s.appendChild(t),t}function v(t){var e,n,i=document.querySelector("style["+l+'~="'+t.id+'"]');if(i){if(d)return h;i.parentNode.removeChild(i)}if(f){var o=c++;i=a||(a=g()),e=y.bind(null,i,o,!1),n=y.bind(null,i,o,!0)}else i=g(),e=x.bind(null,i),n=function(){i.parentNode.removeChild(i)};return e(t),function(i){if(i){if(i.css===t.css&&i.media===t.media&&i.sourceMap===t.sourceMap)return;e(t=i)}else n()}}var m=function(){var t=[];return function(e,n){return t[e]=n,t.filter(Boolean).join("\n")}}();function y(t,e,n,i){var o=n?"":i.css;if(t.styleSheet)t.styleSheet.cssText=m(e,o);else{var r=document.createTextNode(o),s=t.childNodes;s[e]&&t.removeChild(s[e]),s.length?t.insertBefore(r,s[e]):t.appendChild(r)}}function x(t,e){var n=e.css,i=e.media,o=e.sourceMap;if(i&&t.setAttribute("media",i),u.ssrId&&t.setAttribute(l,e.id),o&&(n+="\n/*# sourceURL="+o.sources[0]+" */",n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */"),t.styleSheet)t.styleSheet.cssText=n;else{while(t.firstChild)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}},5997:function(t,e,n){var i=n("f2c7");i.__esModule&&(i=i.default),"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var o=n("5925").default;o("78eeea22",i,!0,{sourceMap:!1,shadowMode:!1})},"690e":function(t,e){function n(t,e){var n=t[1]||"",o=t[3];if(!o)return n;if(e&&"function"===typeof btoa){var r=i(o),s=o.sources.map((function(t){return"/*# sourceURL="+o.sourceRoot+t+" */"}));return[n].concat(s).concat([r]).join("\n")}return[n].join("\n")}function i(t){var e=btoa(unescape(encodeURIComponent(JSON.stringify(t)))),n="sourceMappingURL=data:application/json;charset=utf-8;base64,"+e;return"/*# "+n+" */"}t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var i=n(e,t);return e[2]?"@media "+e[2]+"{"+i+"}":i})).join("")},e.i=function(t,n){"string"===typeof t&&(t=[[null,t,""]]);for(var i={},o=0;o<this.length;o++){var r=this[o][0];"number"===typeof r&&(i[r]=!0)}for(o=0;o<t.length;o++){var s=t[o];"number"===typeof s[0]&&i[s[0]]||(n&&!s[2]?s[2]=n:n&&(s[2]="("+s[2]+") and ("+n+")"),e.push(s))}},e}},"7c66":function(t,e,n){var i,o;
/*!
       * Draggabilly v2.3.0
       * Make that shiz draggable
       * https://draggabilly.desandro.com
       * MIT license
       */(function(r,s){i=[n("ebc9"),n("2d0b")],o=function(t,e){return s(r,t,e)}.apply(e,i),void 0===o||(t.exports=o)})(window,(function(t,e,n){function i(t,e){for(var n in e)t[n]=e[n];return t}function o(){}var r=t.jQuery;function s(t,e){this.element="string"==typeof t?document.querySelector(t):t,r&&(this.$element=r(this.element)),this.options=i({},this.constructor.defaults),this.option(e),this._create()}var a=s.prototype=Object.create(n.prototype);s.defaults={},a.option=function(t){i(this.options,t)};var c={relative:!0,absolute:!0,fixed:!0};function d(t,e,n){return n=n||"round",e?Math[n](t/e)*e:t}return a._create=function(){this.position={},this._getPosition(),this.startPoint={x:0,y:0},this.dragPoint={x:0,y:0},this.startPosition=i({},this.position);var t=getComputedStyle(this.element);c[t.position]||(this.element.style.position="relative"),this.on("pointerMove",this.onPointerMove),this.on("pointerUp",this.onPointerUp),this.enable(),this.setHandles()},a.setHandles=function(){this.handles=this.options.handle?this.element.querySelectorAll(this.options.handle):[this.element],this.bindHandles()},a.dispatchEvent=function(t,e,n){var i=[e].concat(n);this.emitEvent(t,i),this.dispatchJQueryEvent(t,e,n)},a.dispatchJQueryEvent=function(e,n,i){var o=t.jQuery;if(o&&this.$element){var r=o.Event(n);r.type=e,this.$element.trigger(r,i)}},a._getPosition=function(){var t=getComputedStyle(this.element),e=this._getPositionCoord(t.left,"width"),n=this._getPositionCoord(t.top,"height");this.position.x=isNaN(e)?0:e,this.position.y=isNaN(n)?0:n,this._addTransformPosition(t)},a._getPositionCoord=function(t,n){if(-1!=t.indexOf("%")){var i=e(this.element.parentNode);return i?parseFloat(t)/100*i[n]:0}return parseInt(t,10)},a._addTransformPosition=function(t){var e=t.transform;if(0===e.indexOf("matrix")){var n=e.split(","),i=0===e.indexOf("matrix3d")?12:4,o=parseInt(n[i],10),r=parseInt(n[i+1],10);this.position.x+=o,this.position.y+=r}},a.onPointerDown=function(t,e){this.element.classList.add("is-pointer-down"),this.dispatchJQueryEvent("pointerDown",t,[e])},a.pointerDown=function(t,e){var n=this.okayPointerDown(t);n&&this.isEnabled?(this.pointerDownPointer={pageX:e.pageX,pageY:e.pageY},t.preventDefault(),this.pointerDownBlur(),this._bindPostStartEvents(t),this.element.classList.add("is-pointer-down"),this.dispatchEvent("pointerDown",t,[e])):this._pointerReset()},a.dragStart=function(t,e){this.isEnabled&&(this._getPosition(),this.measureContainment(),this.startPosition.x=this.position.x,this.startPosition.y=this.position.y,this.setLeftTop(),this.dragPoint.x=0,this.dragPoint.y=0,this.element.classList.add("is-dragging"),this.dispatchEvent("dragStart",t,[e]),this.animate())},a.measureContainment=function(){var t=this.getContainer();if(t){var n=e(this.element),i=e(t),o=this.element.getBoundingClientRect(),r=t.getBoundingClientRect(),s=i.borderLeftWidth+i.borderRightWidth,a=i.borderTopWidth+i.borderBottomWidth,c=this.relativeStartPosition={x:o.left-(r.left+i.borderLeftWidth),y:o.top-(r.top+i.borderTopWidth)};this.containSize={width:i.width-s-c.x-n.width,height:i.height-a-c.y-n.height}}},a.getContainer=function(){var t=this.options.containment;if(t){var e=t instanceof HTMLElement;return e?t:"string"==typeof t?document.querySelector(t):this.element.parentNode}},a.onPointerMove=function(t,e,n){this.dispatchJQueryEvent("pointerMove",t,[e,n])},a.dragMove=function(t,e,n){if(this.isEnabled){var i=n.x,o=n.y,r=this.options.grid,s=r&&r[0],a=r&&r[1];i=d(i,s),o=d(o,a),i=this.containDrag("x",i,s),o=this.containDrag("y",o,a),i="y"==this.options.axis?0:i,o="x"==this.options.axis?0:o,this.position.x=this.startPosition.x+i,this.position.y=this.startPosition.y+o,this.dragPoint.x=i,this.dragPoint.y=o,this.dispatchEvent("dragMove",t,[e,n])}},a.containDrag=function(t,e,n){if(!this.options.containment)return e;var i="x"==t?"width":"height",o=this.relativeStartPosition[t],r=d(-o,n,"ceil"),s=this.containSize[i];return s=d(s,n,"floor"),Math.max(r,Math.min(s,e))},a.onPointerUp=function(t,e){this.element.classList.remove("is-pointer-down"),this.dispatchJQueryEvent("pointerUp",t,[e])},a.dragEnd=function(t,e){this.isEnabled&&(this.element.style.transform="",this.setLeftTop(),this.element.classList.remove("is-dragging"),this.dispatchEvent("dragEnd",t,[e]))},a.animate=function(){if(this.isDragging){this.positionDrag();var t=this;requestAnimationFrame((function(){t.animate()}))}},a.setLeftTop=function(){this.element.style.left=this.position.x+"px",this.element.style.top=this.position.y+"px"},a.positionDrag=function(){this.element.style.transform="translate3d( "+this.dragPoint.x+"px, "+this.dragPoint.y+"px, 0)"},a.staticClick=function(t,e){this.dispatchEvent("staticClick",t,[e])},a.setPosition=function(t,e){this.position.x=t,this.position.y=e,this.setLeftTop()},a.enable=function(){this.isEnabled=!0},a.disable=function(){this.isEnabled=!1,this.isDragging&&this.dragEnd()},a.destroy=function(){this.disable(),this.element.style.transform="",this.element.style.left="",this.element.style.top="",this.element.style.position="",this.unbindHandles(),this.$element&&this.$element.removeData("draggabilly")},a._init=o,r&&r.bridget&&r.bridget("draggabilly",s),s}))},"9f0c":function(t,e,n){"use strict";n("5997")},b246:function(t,e,n){var i,o;
/*!
       * Unipointer v2.3.0
       * base class for doing one thing with pointer event
       * MIT license
       */(function(r,s){i=[n("4882")],o=function(t){return s(r,t)}.apply(e,i),void 0===o||(t.exports=o)})(window,(function(t,e){"use strict";function n(){}function i(){}var o=i.prototype=Object.create(e.prototype);o.bindStartEvent=function(t){this._bindStartEvent(t,!0)},o.unbindStartEvent=function(t){this._bindStartEvent(t,!1)},o._bindStartEvent=function(e,n){n=void 0===n||n;var i=n?"addEventListener":"removeEventListener",o="mousedown";t.PointerEvent?o="pointerdown":"ontouchstart"in t&&(o="touchstart"),e[i](o,this)},o.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},o.getTouch=function(t){for(var e=0;e<t.length;e++){var n=t[e];if(n.identifier==this.pointerIdentifier)return n}},o.onmousedown=function(t){var e=t.button;e&&0!==e&&1!==e||this._pointerDown(t,t)},o.ontouchstart=function(t){this._pointerDown(t,t.changedTouches[0])},o.onpointerdown=function(t){this._pointerDown(t,t)},o._pointerDown=function(t,e){t.button||this.isPointerDown||(this.isPointerDown=!0,this.pointerIdentifier=void 0!==e.pointerId?e.pointerId:e.identifier,this.pointerDown(t,e))},o.pointerDown=function(t,e){this._bindPostStartEvents(t),this.emitEvent("pointerDown",[t,e])};var r={mousedown:["mousemove","mouseup"],touchstart:["touchmove","touchend","touchcancel"],pointerdown:["pointermove","pointerup","pointercancel"]};return o._bindPostStartEvents=function(e){if(e){var n=r[e.type];n.forEach((function(e){t.addEventListener(e,this)}),this),this._boundPointerEvents=n}},o._unbindPostStartEvents=function(){this._boundPointerEvents&&(this._boundPointerEvents.forEach((function(e){t.removeEventListener(e,this)}),this),delete this._boundPointerEvents)},o.onmousemove=function(t){this._pointerMove(t,t)},o.onpointermove=function(t){t.pointerId==this.pointerIdentifier&&this._pointerMove(t,t)},o.ontouchmove=function(t){var e=this.getTouch(t.changedTouches);e&&this._pointerMove(t,e)},o._pointerMove=function(t,e){this.pointerMove(t,e)},o.pointerMove=function(t,e){this.emitEvent("pointerMove",[t,e])},o.onmouseup=function(t){this._pointerUp(t,t)},o.onpointerup=function(t){t.pointerId==this.pointerIdentifier&&this._pointerUp(t,t)},o.ontouchend=function(t){var e=this.getTouch(t.changedTouches);e&&this._pointerUp(t,e)},o._pointerUp=function(t,e){this._pointerDone(),this.pointerUp(t,e)},o.pointerUp=function(t,e){this.emitEvent("pointerUp",[t,e])},o._pointerDone=function(){this._pointerReset(),this._unbindPostStartEvents(),this.pointerDone()},o._pointerReset=function(){this.isPointerDown=!1,delete this.pointerIdentifier},o.pointerDone=n,o.onpointercancel=function(t){t.pointerId==this.pointerIdentifier&&this._pointerCancel(t,t)},o.ontouchcancel=function(t){var e=this.getTouch(t.changedTouches);e&&this._pointerCancel(t,e)},o._pointerCancel=function(t,e){this._pointerDone(),this.pointerCancel(t,e)},o.pointerCancel=function(t,e){this.emitEvent("pointerCancel",[t,e])},i.getPointerPoint=function(t){return{x:t.pageX,y:t.pageY}},i}))},e67d:function(t,e){(function(t){var e="currentScript",n=t.getElementsByTagName("script");e in t||Object.defineProperty(t,e,{get:function(){try{throw new Error}catch(i){var t,e=(/.*at [^\(]*\((.*):.+:.+\)$/gi.exec(i.stack)||[!1])[1];for(t in n)if(n[t].src==e||"interactive"==n[t].readyState)return n[t];return null}}})})(document)},ebc9:function(t,e,n){var i,o;
/*!
       * getSize v2.0.3
       * measure size of elements
       * MIT license
       */(function(r,s){i=s,o="function"===typeof i?i.call(e,n,e,t):i,void 0===o||(t.exports=o)})(window,(function(){"use strict";function t(t){var e=parseFloat(t),n=-1==t.indexOf("%")&&!isNaN(e);return n&&e}function e(){}var n="undefined"==typeof console?e:function(t){console.error(t)},i=["paddingLeft","paddingRight","paddingTop","paddingBottom","marginLeft","marginRight","marginTop","marginBottom","borderLeftWidth","borderRightWidth","borderTopWidth","borderBottomWidth"],o=i.length;function r(){for(var t={width:0,height:0,innerWidth:0,innerHeight:0,outerWidth:0,outerHeight:0},e=0;e<o;e++){var n=i[e];t[n]=0}return t}function s(t){var e=getComputedStyle(t);return e||n("Style returned "+e+". Are you running this code in a hidden iframe on Firefox? See https://bit.ly/getsizebug1"),e}var a,c=!1;function d(){if(!c){c=!0;var e=document.createElement("div");e.style.width="200px",e.style.padding="1px 2px 3px 4px",e.style.borderStyle="solid",e.style.borderWidth="1px 2px 3px 4px",e.style.boxSizing="border-box";var n=document.body||document.documentElement;n.appendChild(e);var i=s(e);a=200==Math.round(t(i.width)),h.isBoxSizeOuter=a,n.removeChild(e)}}function h(e){if(d(),"string"==typeof e&&(e=document.querySelector(e)),e&&"object"==typeof e&&e.nodeType){var n=s(e);if("none"==n.display)return r();var c={};c.width=e.offsetWidth,c.height=e.offsetHeight;for(var h=c.isBorderBox="border-box"==n.boxSizing,u=0;u<o;u++){var l=i[u],f=n[l],p=parseFloat(f);c[l]=isNaN(p)?0:p}var b=c.paddingLeft+c.paddingRight,g=c.paddingTop+c.paddingBottom,v=c.marginLeft+c.marginRight,m=c.marginTop+c.marginBottom,y=c.borderLeftWidth+c.borderRightWidth,x=c.borderTopWidth+c.borderBottomWidth,w=h&&a,_=t(n.width);!1!==_&&(c.width=_+(w?0:b+y));var k=t(n.height);return!1!==k&&(c.height=k+(w?0:g+x)),c.innerWidth=c.width-(b+y),c.innerHeight=c.height-(g+x),c.outerWidth=c.width+v,c.outerHeight=c.height+m,c}}return h}))},f2c7:function(t,e,n){e=t.exports=n("690e")(!1),e.push([t.i,".vue-tabs-chrome{padding-top:10px;background-color:#dee1e6;position:relative}.vue-tabs-chrome .tabs-content{height:34px;position:relative;overflow:hidden}.vue-tabs-chrome .tabs-divider{left:0;top:50%;width:1px;height:20px;background-color:#a9adb0;position:absolute;-webkit-transform:translateY(-50%);transform:translateY(-50%)}.vue-tabs-chrome .tabs-item{height:100%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-transition:width .15s;transition:width .15s;position:absolute}.vue-tabs-chrome .tabs-item:hover .tabs-background-content{background-color:#f2f3f5}.vue-tabs-chrome .tabs-item:hover .tabs-background-after,.vue-tabs-chrome .tabs-item:hover .tabs-background-before{fill:#f2f3f5}.vue-tabs-chrome .tabs-item.move{-webkit-transition:.15s;transition:.15s}.vue-tabs-chrome .tabs-item.is-dragging{z-index:3}.vue-tabs-chrome .tabs-item.is-dragging .tabs-background-content{background-color:#f2f3f5}.vue-tabs-chrome .tabs-item.is-dragging .tabs-background-after,.vue-tabs-chrome .tabs-item.is-dragging .tabs-background-before{fill:#f2f3f5}.vue-tabs-chrome .tabs-item.active{z-index:2}.vue-tabs-chrome .tabs-item.active .tabs-background{opacity:1}.vue-tabs-chrome .tabs-item.active .tabs-background-content{background-color:#fff}.vue-tabs-chrome .tabs-item.active .tabs-background-after,.vue-tabs-chrome .tabs-item.active .tabs-background-before{fill:#fff}.vue-tabs-chrome .tabs-item:first-of-type .tabs-dividers:before,.vue-tabs-chrome .tabs-item:last-of-type .tabs-dividers:after{opacity:0}.vue-tabs-chrome .tabs-main{height:100%;left:0;right:0;margin:0 14px;border-top-left-radius:5px;border-top-right-radius:5px;-webkit-transition:.15s;transition:.15s;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;position:absolute;-webkit-box-sizing:border-box;box-sizing:border-box;overflow:hidden}.vue-tabs-chrome .tabs-close{top:50%;right:14px;width:16px;height:16px;z-index:1;position:absolute;-webkit-transform:translateY(-50%);transform:translateY(-50%)}.vue-tabs-chrome .tabs-close-icon{width:100%;height:100%;border-radius:50%}.vue-tabs-chrome .tabs-close-icon:hover{stroke:#000;background-color:#e8eaed}.vue-tabs-chrome .tabs-favicon{height:16px;width:16px;margin-left:7px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;overflow:hidden}.vue-tabs-chrome .tabs-favicon img{height:100%}.vue-tabs-chrome .tabs-label{-webkit-box-flex:1;-ms-flex:1;flex:1;margin-left:7px;margin-right:16px;-webkit-box-sizing:border-box;box-sizing:border-box;overflow:hidden;white-space:nowrap}.vue-tabs-chrome .tabs-label.no-close{margin-right:7px}.vue-tabs-chrome .tabs-background{width:100%;height:100%;padding:0 6px;position:absolute;-webkit-transition:opacity .3s;transition:opacity .3s;-webkit-box-sizing:border-box;box-sizing:border-box}.vue-tabs-chrome .tabs-background-content{height:100%;border-top-left-radius:7px;border-top-right-radius:7px;-webkit-transition:background .15s;transition:background .15s}.vue-tabs-chrome .tabs-background-after,.vue-tabs-chrome .tabs-background-before{bottom:-1px;position:absolute;fill:transparent;-webkit-transition:background .15s;transition:background .15s}.vue-tabs-chrome .tabs-background-before{left:-1px}.vue-tabs-chrome .tabs-background-after{right:-1px}.vue-tabs-chrome .tabs-footer{height:4px;background-color:#fff}.vue-tabs-chrome .tabs-after{top:50%;display:-webkit-box;display:-ms-flexbox;display:flex;position:absolute;overflow:hidden;-webkit-transform:translateY(-50%);transform:translateY(-50%)}@-webkit-keyframes tab-show{0%{-webkit-transform:scaleX(0);transform:scaleX(0)}to{-webkit-transform:scaleX(1);transform:scaleX(1)}}@keyframes tab-show{0%{-webkit-transform:scaleX(0);transform:scaleX(0)}to{-webkit-transform:scaleX(1);transform:scaleX(1)}}.theme-dark{color:#9ca1a7}.theme-dark,.theme-dark .tabs-item:hover .tabs-background-content{background-color:#202124}.theme-dark .tabs-item:hover .tabs-background-after,.theme-dark .tabs-item:hover .tabs-background-before{fill:transparent}.theme-dark .tabs-item.is-dragging .tabs-background-content{background-color:#202124}.theme-dark .tabs-item.is-dragging .tabs-background-after,.theme-dark .tabs-item.is-dragging .tabs-background-before{fill:transparent}.theme-dark .tabs-item.active{color:#fff}.theme-dark .tabs-item.active .tabs-background-content{background-color:#323639}.theme-dark .tabs-item.active .tabs-background-after,.theme-dark .tabs-item.active .tabs-background-before{fill:#323639}.theme-dark .tabs-item .tabs-close-icon{stroke:#81878c}.theme-dark .tabs-item .tabs-close-icon:hover{stroke:#cfd1d2;background-color:#5f6368}.theme-dark .tabs-divider{background-color:#4a4d51}.theme-dark .tabs-footer{background-color:#323639}",""])}})}))}}]);
//# sourceMappingURL=456.bf702e6d.js.map