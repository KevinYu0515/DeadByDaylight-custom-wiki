(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-vendors"],{"00ee":function(e,t,n){var r=n("b622"),i=r("toStringTag"),s={};s[i]="z",e.exports="[object z]"===String(s)},"0100":function(e,t,n){"use strict";n.d(t,"a",(function(){return p}));var r=n("dd76"),i=Object(r["c"])(),s=n("0393"),o=n("216d"),a=n("7a23"),c={name:"VirtualScroller",emits:["update:numToleratedItems","scroll","scroll-index-change","lazy-load"],props:{id:{type:String,default:null},style:null,class:null,items:{type:Array,default:null},itemSize:{type:[Number,Array],default:0},scrollHeight:null,scrollWidth:null,orientation:{type:String,default:"vertical"},numToleratedItems:{type:Number,default:null},delay:{type:Number,default:0},lazy:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},loaderDisabled:{type:Boolean,default:!1},columns:{type:Array,default:null},loading:{type:Boolean,default:!1},showSpacer:{type:Boolean,default:!0},showLoader:{type:Boolean,default:!1}},data(){return{first:this.isBoth()?{rows:0,cols:0}:0,last:this.isBoth()?{rows:0,cols:0}:0,numItemsInViewport:this.isBoth()?{rows:0,cols:0}:0,lastScrollPos:this.isBoth()?{top:0,left:0}:0,d_numToleratedItems:this.numToleratedItems,d_loading:this.loading,loaderArr:[],spacerStyle:{},contentStyle:{}}},element:null,content:null,lastScrollPos:null,scrollTimeout:null,mounted(){this.init(),this.lastScrollPos=this.isBoth()?{top:0,left:0}:0},watch:{numToleratedItems(e){this.d_numToleratedItems=e},loading(e){this.d_loading=e},items(e,t){t&&t.length===(e||[]).length||this.init()},orientation(){this.lastScrollPos=this.isBoth()?{top:0,left:0}:0}},methods:{init(){this.setSize(),this.calculateOptions(),this.setSpacerSize()},isVertical(){return"vertical"===this.orientation},isHorizontal(){return"horizontal"===this.orientation},isBoth(){return"both"===this.orientation},scrollTo(e){this.element&&this.element.scrollTo(e)},scrollToIndex(e,t="auto"){const n=this.isBoth(),r=this.isHorizontal(),i=this.first,{numToleratedItems:s}=this.calculateNumItems(),o=this.itemSize,a=this.getContentPosition(),c=(e=0,t)=>e<=t?0:e,l=(e,t,n)=>e*t+n,u=(e=0,n=0)=>this.scrollTo({left:e,top:n,behavior:t});if(n){const t={rows:c(e[0],s[0]),cols:c(e[1],s[1])};t.rows===i.rows&&t.cols===i.cols||(u(l(t.cols,o[1],a.left),l(t.rows,o[0],a.top)),this.first=t)}else{const t=c(e,s);t!==i&&(r?u(l(t,o,a.left),0):u(0,l(t,o,a.top)),this.first=t)}},scrollInView(e,t,n="auto"){if(t){const r=this.isBoth(),i=this.isHorizontal(),{first:s,viewport:o}=this.getRenderedRange(),a=(e=0,t=0)=>this.scrollTo({left:e,top:t,behavior:n}),c="to-start"===t,l="to-end"===t;if(c){if(r)o.first.rows-s.rows>e[0]?a(o.first.cols*this.itemSize[1],(o.first.rows-1)*this.itemSize[0]):o.first.cols-s.cols>e[1]&&a((o.first.cols-1)*this.itemSize[1],o.first.rows*this.itemSize[0]);else if(o.first-s>e){const e=(o.first-1)*this.itemSize;i?a(e,0):a(0,e)}}else if(l)if(r)o.last.rows-s.rows<=e[0]+1?a(o.first.cols*this.itemSize[1],(o.first.rows+1)*this.itemSize[0]):o.last.cols-s.cols<=e[1]+1&&a((o.first.cols+1)*this.itemSize[1],o.first.rows*this.itemSize[0]);else if(o.last-s<=e+1){const e=(o.first+1)*this.itemSize;i?a(e,0):a(0,e)}}else this.scrollToIndex(e,n)},getRenderedRange(){const e=(e,t)=>Math.floor(e/(t||e));let t=this.first,n=0;if(this.element){const r=this.isBoth(),i=this.isHorizontal(),s=this.element.scrollTop,o=this.element.scrollLeft;if(r)t={rows:e(s,this.itemSize[0]),cols:e(o,this.itemSize[1])},n={rows:t.rows+this.numItemsInViewport.rows,cols:t.cols+this.numItemsInViewport.cols};else{const r=i?o:s;t=e(r,this.itemSize),n=t+this.numItemsInViewport}}return{first:this.first,last:this.last,viewport:{first:t,last:n}}},calculateNumItems(){const e=this.isBoth(),t=this.isHorizontal(),n=this.itemSize,r=this.getContentPosition(),i=this.element?this.element.offsetWidth-r.left:0,s=this.element?this.element.offsetHeight-r.top:0,o=(e,t)=>Math.ceil(e/(t||e)),a=e=>Math.ceil(e/2),c=e?{rows:o(s,n[0]),cols:o(i,n[1])}:o(t?i:s,n),l=this.d_numToleratedItems||(e?[a(c.rows),a(c.cols)]:a(c));return{numItemsInViewport:c,numToleratedItems:l}},calculateOptions(){const e=this.isBoth(),t=this.first,{numItemsInViewport:n,numToleratedItems:r}=this.calculateNumItems(),i=(e,t,n,r)=>this.getLast(e+t+(e<n?2:3)*n,r),s=e?{rows:i(t.rows,n.rows,r[0]),cols:i(t.cols,n.cols,r[1],!0)}:i(t,n,r);this.last=s,this.numItemsInViewport=n,this.d_numToleratedItems=r,this.$emit("update:numToleratedItems",this.d_numToleratedItems),this.showLoader&&(this.loaderArr=e?Array.from({length:n.rows}).map(()=>Array.from({length:n.cols})):Array.from({length:n})),this.lazy&&this.$emit("lazy-load",{first:t,last:s})},getLast(e=0,t){return this.items?Math.min(t?(this.columns||this.items[0]).length:this.items.length,e):0},getContentPosition(){if(this.content){const e=getComputedStyle(this.content),t=parseInt(e.paddingLeft,10)+Math.max(parseInt(e.left,10),0),n=parseInt(e.paddingRight,10)+Math.max(parseInt(e.right,10),0),r=parseInt(e.paddingTop,10)+Math.max(parseInt(e.top,10),0),i=parseInt(e.paddingBottom,10)+Math.max(parseInt(e.bottom,10),0);return{left:t,right:n,top:r,bottom:i,x:t+n,y:r+i}}return{left:0,right:0,top:0,bottom:0,x:0,y:0}},setSize(){if(this.element){const e=this.isBoth(),t=this.isHorizontal(),n=this.element.parentElement,r=this.scrollWidth||(this.element.offsetWidth||n.offsetWidth)+"px",i=this.scrollHeight||(this.element.offsetHeight||n.offsetHeight)+"px",s=(e,t)=>this.element.style[e]=t;e||t?(s("height",i),s("width",r)):s("height",i)}},setSpacerSize(){const e=this.items;if(e){const t=this.isBoth(),n=this.isHorizontal(),r=this.getContentPosition(),i=(e,t,n,r=0)=>this.spacerStyle={...this.spacerStyle,[""+e]:(t||[]).length*n+r+"px"};t?(i("height",e,this.itemSize[0],r.y),i("width",this.columns||e[1],this.itemSize[1],r.x)):n?i("width",this.columns||e,this.itemSize,r.x):i("height",e,this.itemSize,r.y)}},setContentPosition(e){if(this.content){const t=this.isBoth(),n=this.isHorizontal(),r=e?e.first:this.first,i=(e,t)=>e*t,s=(e=0,t=0)=>{this.contentStyle={...this.contentStyle,transform:`translate3d(${e}px, ${t}px, 0)`}};if(t)s(i(r.cols,this.itemSize[1]),i(r.rows,this.itemSize[0]));else{const e=i(r,this.itemSize);n?s(e,0):s(0,e)}}},onScrollPositionChange(e){const t=e.target,n=this.isBoth(),r=this.isHorizontal(),i=this.getContentPosition(),s=(e,t)=>e?e>t?e-t:e:0,o=(e,t)=>Math.floor(e/(t||e)),a=(e,t,n,r,i,s)=>e<=i?i:s?n-r-i:t+i-1,c=(e,t,n,r,i,s,o)=>e<=s?0:Math.max(0,o?e<t?n:e-s:e>t?n:e-2*s),l=(e,t,n,r,i,s)=>{let o=t+r+2*i;return e>=i&&(o+=i+1),this.getLast(o,s)},u=s(t.scrollTop,i.top),h=s(t.scrollLeft,i.left);let d=0,f=this.last,p=!1;if(n){const e=this.lastScrollPos.top<=u,t=this.lastScrollPos.left<=h,n={rows:o(u,this.itemSize[0]),cols:o(h,this.itemSize[1])},r={rows:a(n.rows,this.first.rows,this.last.rows,this.numItemsInViewport.rows,this.d_numToleratedItems[0],e),cols:a(n.cols,this.first.cols,this.last.cols,this.numItemsInViewport.cols,this.d_numToleratedItems[1],t)};d={rows:c(n.rows,r.rows,this.first.rows,this.last.rows,this.numItemsInViewport.rows,this.d_numToleratedItems[0],e),cols:c(n.cols,r.cols,this.first.cols,this.last.cols,this.numItemsInViewport.cols,this.d_numToleratedItems[1],t)},f={rows:l(n.rows,d.rows,this.last.rows,this.numItemsInViewport.rows,this.d_numToleratedItems[0]),cols:l(n.cols,d.cols,this.last.cols,this.numItemsInViewport.cols,this.d_numToleratedItems[1],!0)},p=d.rows!==this.first.rows&&f.rows!==this.last.rows||d.cols!==this.first.cols&&f.cols!==this.last.cols,this.lastScrollPos={top:u,left:h}}else{const e=r?h:u,t=this.lastScrollPos<=e,n=o(e,this.itemSize),i=a(n,this.first,this.last,this.numItemsInViewport,this.d_numToleratedItems,t);d=c(n,i,this.first,this.last,this.numItemsInViewport,this.d_numToleratedItems,t),f=l(n,d,this.last,this.numItemsInViewport,this.d_numToleratedItems),p=d!==this.first&&f!==this.last,this.lastScrollPos=e}return{first:d,last:f,isRangeChanged:p}},onScrollChange(e){const{first:t,last:n,isRangeChanged:r}=this.onScrollPositionChange(e);if(r){const e={first:t,last:n};this.setContentPosition(e),this.first=t,this.last=n,this.$emit("scroll-index-change",e),this.lazy&&this.$emit("lazy-load",e)}},onScroll(e){if(this.$emit("scroll",e),this.delay){if(this.scrollTimeout&&clearTimeout(this.scrollTimeout),!this.d_loading&&this.showLoader){const{isRangeChanged:t}=this.onScrollPositionChange(e);t&&(this.d_loading=!0)}this.scrollTimeout=setTimeout(()=>{this.onScrollChange(e),this.d_loading&&this.showLoader&&!this.lazy&&(this.d_loading=!1)},this.delay)}else this.onScrollChange(e)},getOptions(e){const t=(this.items||[]).length,n=this.isBoth()?this.first.rows+e:this.first+e;return{index:n,count:t,first:0===n,last:n===t-1,even:n%2===0,odd:n%2!==0}},getLoaderOptions(e,t){let n=this.loaderArr.length;return{index:e,count:n,first:0===e,last:e===n-1,even:e%2===0,odd:e%2!==0,...t}},elementRef(e){this.element=e},contentRef(e){this.content=e}},computed:{containerClass(){return["p-virtualscroller",{"p-both-scroll":this.isBoth(),"p-horizontal-scroll":this.isHorizontal()},this.class]},contentClass(){return["p-virtualscroller-content",{"p-virtualscroller-loading":this.d_loading}]},loaderClass(){return["p-virtualscroller-loader",{"p-component-overlay":!this.$slots.loader}]},loadedItems(){const e=this.items;return e&&!this.d_loading?this.isBoth()?e.slice(this.first.rows,this.last.rows).map(e=>this.columns?e:e.slice(this.first.cols,this.last.cols)):this.isHorizontal()&&this.columns?e:e.slice(this.first,this.last):[]},loadedRows(){return this.d_loading?this.loaderDisabled?this.loaderArr:[]:this.loadedItems},loadedColumns(){if(this.columns){const e=this.isBoth(),t=this.isHorizontal();if(e||t)return this.d_loading&&this.loaderDisabled?e?this.loaderArr[0]:this.loaderArr:this.columns.slice(e?this.first.cols:this.first,e?this.last.cols:this.last)}return this.columns}}};const l={key:1,class:"p-virtualscroller-loading-icon pi pi-spinner pi-spin"};function u(e,t,n,r,i,s){return n.disabled?(Object(a["B"])(),Object(a["h"])(a["a"],{key:1},[Object(a["I"])(e.$slots,"default"),Object(a["I"])(e.$slots,"content",{items:n.items,rows:n.items,columns:s.loadedColumns})],64)):(Object(a["B"])(),Object(a["h"])("div",{key:0,ref:s.elementRef,class:Object(a["u"])(s.containerClass),tabindex:0,style:Object(a["v"])(n.style),onScroll:t[0]||(t[0]=(...e)=>s.onScroll&&s.onScroll(...e))},[Object(a["I"])(e.$slots,"content",{styleClass:s.contentClass,items:s.loadedItems,getItemOptions:s.getOptions,loading:i.d_loading,getLoaderOptions:s.getLoaderOptions,itemSize:n.itemSize,rows:s.loadedRows,columns:s.loadedColumns,contentRef:s.contentRef,spacerStyle:i.spacerStyle,contentStyle:i.contentStyle,vertical:s.isVertical(),horizontal:s.isHorizontal(),both:s.isBoth()},()=>[Object(a["i"])("div",{ref:s.contentRef,class:Object(a["u"])(s.contentClass),style:Object(a["v"])(i.contentStyle)},[(Object(a["B"])(!0),Object(a["h"])(a["a"],null,Object(a["H"])(s.loadedItems,(t,n)=>Object(a["I"])(e.$slots,"item",{key:n,item:t,options:s.getOptions(n)})),128))],6)]),n.showSpacer?(Object(a["B"])(),Object(a["h"])("div",{key:0,class:"p-virtualscroller-spacer",style:Object(a["v"])(i.spacerStyle)},null,4)):Object(a["g"])("",!0),!n.loaderDisabled&&n.showLoader&&i.d_loading?(Object(a["B"])(),Object(a["h"])("div",{key:1,class:Object(a["u"])(s.loaderClass)},[e.$slots&&e.$slots.loader?(Object(a["B"])(!0),Object(a["h"])(a["a"],{key:0},Object(a["H"])(i.loaderArr,(t,n)=>Object(a["I"])(e.$slots,"loader",{key:n,options:s.getLoaderOptions(n,s.isBoth()&&{numCols:e.d_numItemsInViewport.cols})})),128)):(Object(a["B"])(),Object(a["h"])("i",l))],2)):Object(a["g"])("",!0)],38))}function h(e,t){void 0===t&&(t={});var n=t.insertAt;if(e&&"undefined"!==typeof document){var r=document.head||document.getElementsByTagName("head")[0],i=document.createElement("style");i.type="text/css","top"===n&&r.firstChild?r.insertBefore(i,r.firstChild):r.appendChild(i),i.styleSheet?i.styleSheet.cssText=e:i.appendChild(document.createTextNode(e))}}var d="\n.p-virtualscroller {\n    position: relative;\n    overflow: auto;\n    contain: strict;\n    -webkit-transform: translateZ(0);\n            transform: translateZ(0);\n    will-change: scroll-position;\n    outline: 0 none;\n}\n.p-virtualscroller-content {\n    position: absolute;\n    top: 0;\n    left: 0;\n    contain: content;\n    min-height: 100%;\n    min-width: 100%;\n    will-change: transform;\n}\n.p-virtualscroller-spacer {\n    position: absolute;\n    top: 0;\n    left: 0;\n    height: 1px;\n    width: 1px;\n    -webkit-transform-origin: 0 0;\n            transform-origin: 0 0;\n    pointer-events: none;\n}\n.p-virtualscroller .p-virtualscroller-loader {\n    position: sticky;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n}\n.p-virtualscroller-loader.p-component-overlay {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n}\n";h(d),c.render=u;var f=n("c5e1"),p={name:"Dropdown",emits:["update:modelValue","before-show","before-hide","show","hide","change","filter","focus","blur"],props:{modelValue:null,options:Array,optionLabel:null,optionValue:null,optionDisabled:null,optionGroupLabel:null,optionGroupChildren:null,scrollHeight:{type:String,default:"200px"},filter:Boolean,filterPlaceholder:String,filterLocale:String,filterMatchMode:{type:String,default:"contains"},filterFields:{type:Array,default:null},editable:Boolean,placeholder:String,disabled:Boolean,dataKey:null,showClear:Boolean,inputId:String,tabindex:String,ariaLabelledBy:null,appendTo:{type:String,default:"body"},emptyFilterMessage:{type:String,default:null},emptyMessage:{type:String,default:null},panelClass:null,loading:{type:Boolean,default:!1},loadingIcon:{type:String,default:"pi pi-spinner pi-spin"},virtualScrollerOptions:{type:Object,default:null}},data(){return{focused:!1,filterValue:null,overlayVisible:!1}},watch:{modelValue(){this.isModelValueChanged=!0}},outsideClickListener:null,scrollHandler:null,resizeListener:null,searchTimeout:null,currentSearchChar:null,previousSearchChar:null,searchValue:null,overlay:null,itemsWrapper:null,virtualScroller:null,isModelValueChanged:!1,updated(){this.overlayVisible&&this.isModelValueChanged&&this.scrollValueInView(),this.isModelValueChanged=!1},beforeUnmount(){this.unbindOutsideClickListener(),this.unbindResizeListener(),this.scrollHandler&&(this.scrollHandler.destroy(),this.scrollHandler=null),this.itemsWrapper=null,this.overlay&&(r["f"].clear(this.overlay),this.overlay=null)},methods:{getOptionIndex(e,t){return this.virtualScrollerDisabled?e:t&&t(e)["index"]},getOptionLabel(e){return this.optionLabel?r["d"].resolveFieldData(e,this.optionLabel):e},getOptionValue(e){return this.optionValue?r["d"].resolveFieldData(e,this.optionValue):e},getOptionRenderKey(e,t){return this.dataKey?r["d"].resolveFieldData(e,this.dataKey):this.getOptionLabel(e)+"_"+t.toString()},isOptionDisabled(e){return!!this.optionDisabled&&r["d"].resolveFieldData(e,this.optionDisabled)},getOptionGroupRenderKey(e){return r["d"].resolveFieldData(e,this.optionGroupLabel)},getOptionGroupLabel(e){return r["d"].resolveFieldData(e,this.optionGroupLabel)},getOptionGroupChildren(e){return r["d"].resolveFieldData(e,this.optionGroupChildren)},getSelectedOption(){let e=this.getSelectedOptionIndex();return-1!==e?this.optionGroupLabel?this.getOptionGroupChildren(this.visibleOptions[e.group])[e.option]:this.visibleOptions[e]:null},getSelectedOptionIndex(){if(null!=this.modelValue&&this.visibleOptions){if(!this.optionGroupLabel)return this.findOptionIndexInList(this.modelValue,this.visibleOptions);for(let e=0;e<this.visibleOptions.length;e++){let t=this.findOptionIndexInList(this.modelValue,this.getOptionGroupChildren(this.visibleOptions[e]));if(-1!==t)return{group:e,option:t}}}return-1},findOptionIndexInList(e,t){for(let n=0;n<t.length;n++)if(r["d"].equals(e,this.getOptionValue(t[n]),this.equalityKey))return n;return-1},isSelected(e){return r["d"].equals(this.modelValue,this.getOptionValue(e),this.equalityKey)},show(e){this.$emit("before-show"),this.overlayVisible=!0,e&&this.$refs.focusInput.focus()},hide(){this.$emit("before-hide"),this.overlayVisible=!1},onFocus(e){this.focused=!0,this.$emit("focus",e)},onBlur(e){this.focused=!1,this.$emit("blur",e)},onKeyDown(e){switch(e.which){case 40:this.onDownKey(e);break;case 38:this.onUpKey(e);break;case 32:this.overlayVisible||(this.show(),e.preventDefault());break;case 13:case 27:this.overlayVisible&&(this.hide(),e.preventDefault());break;case 9:this.hide();break;default:this.search(e);break}},onFilterKeyDown(e){switch(e.which){case 40:this.onDownKey(e);break;case 38:this.onUpKey(e);break;case 13:case 27:this.overlayVisible=!1,e.preventDefault();break}},onDownKey(e){if(this.visibleOptions)if(!this.overlayVisible&&e.altKey)this.show();else{let t=this.visibleOptions&&this.visibleOptions.length>0?this.findNextOption(this.getSelectedOptionIndex()):null;t&&this.updateModel(e,this.getOptionValue(t))}e.preventDefault()},onUpKey(e){if(this.visibleOptions){let t=this.findPrevOption(this.getSelectedOptionIndex());t&&this.updateModel(e,this.getOptionValue(t))}e.preventDefault()},findNextOption(e){if(this.optionGroupLabel){let t=-1===e?0:e.group,n=-1===e?-1:e.option,r=this.findNextOptionInList(this.getOptionGroupChildren(this.visibleOptions[t]),n);return r||(t+1!==this.visibleOptions.length?this.findNextOption({group:t+1,option:-1}):null)}return this.findNextOptionInList(this.visibleOptions,e)},findNextOptionInList(e,t){let n=t+1;if(n===e.length)return null;let r=e[n];return this.isOptionDisabled(r)?this.findNextOptionInList(n):r},findPrevOption(e){if(-1===e)return null;if(this.optionGroupLabel){let t=e.group,n=e.option,r=this.findPrevOptionInList(this.getOptionGroupChildren(this.visibleOptions[t]),n);return r||(t>0?this.findPrevOption({group:t-1,option:this.getOptionGroupChildren(this.visibleOptions[t-1]).length}):null)}return this.findPrevOptionInList(this.visibleOptions,e)},findPrevOptionInList(e,t){let n=t-1;if(n<0)return null;let r=e[n];return this.isOptionDisabled(r)?this.findPrevOption(n):r},onClearClick(e){this.updateModel(e,null)},onClick(e){this.disabled||this.loading||r["b"].hasClass(e.target,"p-dropdown-clear-icon")||"INPUT"===e.target.tagName||this.overlay&&this.overlay.contains(e.target)||(this.overlayVisible?this.hide():this.show(),this.$refs.focusInput.focus())},onOptionSelect(e,t){let n=this.getOptionValue(t);this.updateModel(e,n),this.$refs.focusInput.focus(),setTimeout(()=>{this.hide()},200)},onEditableInput(e){this.$emit("update:modelValue",e.target.value)},onOverlayEnter(e){if(r["f"].set("overlay",e,this.$primevue.config.zIndex.overlay),this.alignOverlay(),this.scrollValueInView(),!this.virtualScrollerDisabled){const e=this.getSelectedOptionIndex();-1!==e&&setTimeout(()=>{this.virtualScroller&&this.virtualScroller.scrollToIndex(e)},0)}},onOverlayAfterEnter(){this.filter&&this.$refs.filterInput.focus(),this.bindOutsideClickListener(),this.bindScrollListener(),this.bindResizeListener(),this.$emit("show")},onOverlayLeave(){this.unbindOutsideClickListener(),this.unbindScrollListener(),this.unbindResizeListener(),this.$emit("hide"),this.itemsWrapper=null,this.overlay=null},onOverlayAfterLeave(e){r["f"].clear(e)},alignOverlay(){"self"===this.appendTo?r["b"].relativePosition(this.overlay,this.$el):(this.overlay.style.minWidth=r["b"].getOuterWidth(this.$el)+"px",r["b"].absolutePosition(this.overlay,this.$el))},updateModel(e,t){this.$emit("update:modelValue",t),this.$emit("change",{originalEvent:e,value:t})},bindOutsideClickListener(){this.outsideClickListener||(this.outsideClickListener=e=>{this.overlayVisible&&this.overlay&&!this.$el.contains(e.target)&&!this.overlay.contains(e.target)&&this.hide()},document.addEventListener("click",this.outsideClickListener))},unbindOutsideClickListener(){this.outsideClickListener&&(document.removeEventListener("click",this.outsideClickListener),this.outsideClickListener=null)},bindScrollListener(){this.scrollHandler||(this.scrollHandler=new r["a"](this.$refs.container,()=>{this.overlayVisible&&this.hide()})),this.scrollHandler.bindScrollListener()},unbindScrollListener(){this.scrollHandler&&this.scrollHandler.unbindScrollListener()},bindResizeListener(){this.resizeListener||(this.resizeListener=()=>{this.overlayVisible&&!r["b"].isTouchDevice()&&this.hide()},window.addEventListener("resize",this.resizeListener))},unbindResizeListener(){this.resizeListener&&(window.removeEventListener("resize",this.resizeListener),this.resizeListener=null)},search(e){if(!this.visibleOptions)return;this.searchTimeout&&clearTimeout(this.searchTimeout);const t=e.key;if(this.previousSearchChar=this.currentSearchChar,this.currentSearchChar=t,this.previousSearchChar===this.currentSearchChar?this.searchValue=this.currentSearchChar:this.searchValue=this.searchValue?this.searchValue+t:t,this.searchValue){let t=this.getSelectedOptionIndex(),n=this.optionGroupLabel?this.searchOptionInGroup(t):this.searchOption(++t);n&&this.updateModel(e,this.getOptionValue(n))}this.searchTimeout=setTimeout(()=>{this.searchValue=null},250)},searchOption(e){let t;return this.searchValue&&(t=this.searchOptionInRange(e,this.visibleOptions.length),t||(t=this.searchOptionInRange(0,e))),t},searchOptionInRange(e,t){for(let n=e;n<t;n++){let e=this.visibleOptions[n];if(this.matchesSearchValue(e))return e}return null},searchOptionInGroup(e){let t=-1===e?{group:0,option:-1}:e;for(let n=t.group;n<this.visibleOptions.length;n++){let e=this.getOptionGroupChildren(this.visibleOptions[n]);for(let r=t.group===n?t.option+1:0;r<e.length;r++)if(this.matchesSearchValue(e[r]))return e[r]}for(let n=0;n<=t.group;n++){let e=this.getOptionGroupChildren(this.visibleOptions[n]);for(let r=0;r<(t.group===n?t.option:e.length);r++)if(this.matchesSearchValue(e[r]))return e[r]}return null},matchesSearchValue(e){let t=this.getOptionLabel(e).toLocaleLowerCase(this.filterLocale);return t.startsWith(this.searchValue.toLocaleLowerCase(this.filterLocale))},onFilterChange(e){this.filterValue=e.target.value,this.$emit("filter",{originalEvent:e,value:e.target.value})},onFilterUpdated(){this.overlayVisible&&this.alignOverlay()},overlayRef(e){this.overlay=e},itemsWrapperRef(e){this.itemsWrapper=e},virtualScrollerRef(e){this.virtualScroller=e},scrollValueInView(){if(this.overlay){let e=r["b"].findSingle(this.overlay,"li.p-highlight");e&&e.scrollIntoView({block:"nearest",inline:"start"})}},onOverlayClick(e){i.emit("overlay-click",{originalEvent:e,target:this.$el})}},computed:{visibleOptions(){if(this.filterValue){if(this.optionGroupLabel){let e=[];for(let t of this.options){let n=s["b"].filter(this.getOptionGroupChildren(t),this.searchFields,this.filterValue,this.filterMatchMode,this.filterLocale);if(n&&n.length){let r={...t};r[this.optionGroupChildren]=n,e.push(r)}}return e}return s["b"].filter(this.options,this.searchFields,this.filterValue,this.filterMatchMode,this.filterLocale)}return this.options},containerClass(){return["p-dropdown p-component p-inputwrapper",{"p-disabled":this.disabled,"p-dropdown-clearable":this.showClear&&!this.disabled,"p-focus":this.focused,"p-inputwrapper-filled":this.modelValue,"p-inputwrapper-focus":this.focused||this.overlayVisible}]},labelClass(){return["p-dropdown-label p-inputtext",{"p-placeholder":this.label===this.placeholder,"p-dropdown-label-empty":!this.$slots["value"]&&("p-emptylabel"===this.label||0===this.label.length)}]},panelStyleClass(){return["p-dropdown-panel p-component",this.panelClass,{"p-input-filled":"filled"===this.$primevue.config.inputStyle,"p-ripple-disabled":!1===this.$primevue.config.ripple}]},label(){let e=this.getSelectedOption();return null!==e?this.getOptionLabel(e):this.placeholder||"p-emptylabel"},editableInputValue(){let e=this.getSelectedOption();return e?this.getOptionLabel(e):this.modelValue},equalityKey(){return this.optionValue?null:this.dataKey},searchFields(){return this.filterFields||[this.optionLabel]},emptyFilterMessageText(){return this.emptyFilterMessage||this.$primevue.config.locale.emptyFilterMessage},emptyMessageText(){return this.emptyMessage||this.$primevue.config.locale.emptyMessage},virtualScrollerDisabled(){return!this.virtualScrollerOptions},dropdownIconClass(){return["p-dropdown-trigger-icon",this.loading?this.loadingIcon:"pi pi-chevron-down"]}},directives:{ripple:o["a"]},components:{VirtualScroller:c,Portal:f["a"]}};const g={class:"p-hidden-accessible"},m=["id","disabled","tabindex","aria-expanded","aria-labelledby"],v=["disabled","placeholder","value","aria-expanded"],y=["aria-expanded"],b={key:0,class:"p-dropdown-header"},w={class:"p-dropdown-filter-container"},_=["value","placeholder"],E=Object(a["i"])("span",{class:"p-dropdown-filter-icon pi pi-search"},null,-1),O=["onClick","aria-label","aria-selected"],T={class:"p-dropdown-item-group"},I=["onClick","aria-label","aria-selected"],S={key:2,class:"p-dropdown-empty-message"},k={key:3,class:"p-dropdown-empty-message"};function C(e,t,n,r,i,s){const o=Object(a["J"])("VirtualScroller"),c=Object(a["J"])("Portal"),l=Object(a["K"])("ripple");return Object(a["B"])(),Object(a["h"])("div",{ref:"container",class:Object(a["u"])(s.containerClass),onClick:t[11]||(t[11]=e=>s.onClick(e))},[Object(a["i"])("div",g,[Object(a["i"])("input",{ref:"focusInput",type:"text",id:n.inputId,readonly:"",disabled:n.disabled,onFocus:t[0]||(t[0]=(...e)=>s.onFocus&&s.onFocus(...e)),onBlur:t[1]||(t[1]=(...e)=>s.onBlur&&s.onBlur(...e)),onKeydown:t[2]||(t[2]=(...e)=>s.onKeyDown&&s.onKeyDown(...e)),tabindex:n.tabindex,"aria-haspopup":"true","aria-expanded":i.overlayVisible,"aria-labelledby":n.ariaLabelledBy},null,40,m)]),n.editable?(Object(a["B"])(),Object(a["h"])("input",{key:0,type:"text",class:"p-dropdown-label p-inputtext",disabled:n.disabled,onFocus:t[3]||(t[3]=(...e)=>s.onFocus&&s.onFocus(...e)),onBlur:t[4]||(t[4]=(...e)=>s.onBlur&&s.onBlur(...e)),placeholder:n.placeholder,value:s.editableInputValue,onInput:t[5]||(t[5]=(...e)=>s.onEditableInput&&s.onEditableInput(...e)),"aria-haspopup":"listbox","aria-expanded":i.overlayVisible},null,40,v)):Object(a["g"])("",!0),n.editable?Object(a["g"])("",!0):(Object(a["B"])(),Object(a["h"])("span",{key:1,class:Object(a["u"])(s.labelClass)},[Object(a["I"])(e.$slots,"value",{value:n.modelValue,placeholder:n.placeholder},()=>[Object(a["l"])(Object(a["M"])(s.label||"empty"),1)])],2)),n.showClear&&null!=n.modelValue?(Object(a["B"])(),Object(a["h"])("i",{key:2,class:"p-dropdown-clear-icon pi pi-times",onClick:t[6]||(t[6]=e=>s.onClearClick(e))})):Object(a["g"])("",!0),Object(a["i"])("div",{class:"p-dropdown-trigger",role:"button","aria-haspopup":"listbox","aria-expanded":i.overlayVisible},[Object(a["I"])(e.$slots,"indicator",{},()=>[Object(a["i"])("span",{class:Object(a["u"])(s.dropdownIconClass)},null,2)])],8,y),Object(a["m"])(c,{appendTo:n.appendTo},{default:Object(a["R"])(()=>[Object(a["m"])(a["c"],{name:"p-connected-overlay",onEnter:s.onOverlayEnter,onAfterEnter:s.onOverlayAfterEnter,onLeave:s.onOverlayLeave,onAfterLeave:s.onOverlayAfterLeave},{default:Object(a["R"])(()=>[i.overlayVisible?(Object(a["B"])(),Object(a["h"])("div",{key:0,ref:s.overlayRef,class:Object(a["u"])(s.panelStyleClass),onClick:t[10]||(t[10]=(...e)=>s.onOverlayClick&&s.onOverlayClick(...e))},[Object(a["I"])(e.$slots,"header",{value:n.modelValue,options:s.visibleOptions}),n.filter?(Object(a["B"])(),Object(a["h"])("div",b,[Object(a["i"])("div",w,[Object(a["i"])("input",{type:"text",ref:"filterInput",value:i.filterValue,onVnodeUpdated:t[7]||(t[7]=(...e)=>s.onFilterUpdated&&s.onFilterUpdated(...e)),autoComplete:"off",class:"p-dropdown-filter p-inputtext p-component",placeholder:n.filterPlaceholder,onKeydown:t[8]||(t[8]=(...e)=>s.onFilterKeyDown&&s.onFilterKeyDown(...e)),onInput:t[9]||(t[9]=(...e)=>s.onFilterChange&&s.onFilterChange(...e))},null,40,_),E])])):Object(a["g"])("",!0),Object(a["i"])("div",{ref:s.itemsWrapperRef,class:"p-dropdown-items-wrapper",style:Object(a["v"])({"max-height":s.virtualScrollerDisabled?n.scrollHeight:""})},[Object(a["m"])(o,Object(a["s"])({ref:s.virtualScrollerRef},n.virtualScrollerOptions,{items:s.visibleOptions,style:{height:n.scrollHeight},disabled:s.virtualScrollerDisabled}),Object(a["j"])({content:Object(a["R"])(({styleClass:t,contentRef:r,items:o,getItemOptions:c,contentStyle:u})=>[Object(a["i"])("ul",{ref:r,class:Object(a["u"])(["p-dropdown-items",t]),style:Object(a["v"])(u),role:"listbox"},[n.optionGroupLabel?(Object(a["B"])(!0),Object(a["h"])(a["a"],{key:1},Object(a["H"])(o,(t,n)=>(Object(a["B"])(),Object(a["h"])(a["a"],{key:s.getOptionGroupRenderKey(t)},[Object(a["i"])("li",T,[Object(a["I"])(e.$slots,"optiongroup",{option:t,index:s.getOptionIndex(n,c)},()=>[Object(a["l"])(Object(a["M"])(s.getOptionGroupLabel(t)),1)])]),(Object(a["B"])(!0),Object(a["h"])(a["a"],null,Object(a["H"])(s.getOptionGroupChildren(t),(t,n)=>Object(a["S"])((Object(a["B"])(),Object(a["h"])("li",{class:Object(a["u"])(["p-dropdown-item",{"p-highlight":s.isSelected(t),"p-disabled":s.isOptionDisabled(t)}]),key:s.getOptionRenderKey(t,n),onClick:e=>s.onOptionSelect(e,t),role:"option","aria-label":s.getOptionLabel(t),"aria-selected":s.isSelected(t)},[Object(a["I"])(e.$slots,"option",{option:t,index:s.getOptionIndex(n,c)},()=>[Object(a["l"])(Object(a["M"])(s.getOptionLabel(t)),1)])],10,I)),[[l]])),128))],64))),128)):(Object(a["B"])(!0),Object(a["h"])(a["a"],{key:0},Object(a["H"])(o,(t,n)=>Object(a["S"])((Object(a["B"])(),Object(a["h"])("li",{class:Object(a["u"])(["p-dropdown-item",{"p-highlight":s.isSelected(t),"p-disabled":s.isOptionDisabled(t)}]),key:s.getOptionRenderKey(t,n),onClick:e=>s.onOptionSelect(e,t),role:"option","aria-label":s.getOptionLabel(t),"aria-selected":s.isSelected(t)},[Object(a["I"])(e.$slots,"option",{option:t,index:s.getOptionIndex(n,c)},()=>[Object(a["l"])(Object(a["M"])(s.getOptionLabel(t)),1)])],10,O)),[[l]])),128)),i.filterValue&&(!o||o&&0===o.length)?(Object(a["B"])(),Object(a["h"])("li",S,[Object(a["I"])(e.$slots,"emptyfilter",{},()=>[Object(a["l"])(Object(a["M"])(s.emptyFilterMessageText),1)])])):!n.options||n.options&&0===n.options.length?(Object(a["B"])(),Object(a["h"])("li",k,[Object(a["I"])(e.$slots,"empty",{},()=>[Object(a["l"])(Object(a["M"])(s.emptyMessageText),1)])])):Object(a["g"])("",!0)],6)]),_:2},[e.$slots.loader?{name:"loader",fn:Object(a["R"])(({options:t})=>[Object(a["I"])(e.$slots,"loader",{options:t})])}:void 0]),1040,["items","style","disabled"])],4),Object(a["I"])(e.$slots,"footer",{value:n.modelValue,options:s.visibleOptions})],2)):Object(a["g"])("",!0)]),_:3},8,["onEnter","onAfterEnter","onLeave","onAfterLeave"])]),_:3},8,["appendTo"])],2)}function A(e,t){void 0===t&&(t={});var n=t.insertAt;if(e&&"undefined"!==typeof document){var r=document.head||document.getElementsByTagName("head")[0],i=document.createElement("style");i.type="text/css","top"===n&&r.firstChild?r.insertBefore(i,r.firstChild):r.appendChild(i),i.styleSheet?i.styleSheet.cssText=e:i.appendChild(document.createTextNode(e))}}var x="\n.p-dropdown {\n    display: -webkit-inline-box;\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n    cursor: pointer;\n    position: relative;\n    -webkit-user-select: none;\n       -moz-user-select: none;\n        -ms-user-select: none;\n            user-select: none;\n}\n.p-dropdown-clear-icon {\n    position: absolute;\n    top: 50%;\n    margin-top: -.5rem;\n}\n.p-dropdown-trigger {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    -ms-flex-negative: 0;\n        flex-shrink: 0;\n}\n.p-dropdown-label {\n    display: block;\n    white-space: nowrap;\n    overflow: hidden;\n    -webkit-box-flex: 1;\n        -ms-flex: 1 1 auto;\n            flex: 1 1 auto;\n    width: 1%;\n    text-overflow: ellipsis;\n    cursor: pointer;\n}\n.p-dropdown-label-empty {\n    overflow: hidden;\n    visibility: hidden;\n}\ninput.p-dropdown-label  {\n    cursor: default;\n}\n.p-dropdown .p-dropdown-panel {\n    min-width: 100%;\n}\n.p-dropdown-panel {\n    position: absolute;\n    top: 0;\n    left: 0;\n}\n.p-dropdown-items-wrapper {\n    overflow: auto;\n}\n.p-dropdown-item {\n    cursor: pointer;\n    font-weight: normal;\n    white-space: nowrap;\n    position: relative;\n    overflow: hidden;\n}\n.p-dropdown-item-group {\n    cursor: auto;\n}\n.p-dropdown-items {\n    margin: 0;\n    padding: 0;\n    list-style-type: none;\n}\n.p-dropdown-filter {\n    width: 100%;\n}\n.p-dropdown-filter-container {\n    position: relative;\n}\n.p-dropdown-filter-icon {\n    position: absolute;\n    top: 50%;\n    margin-top: -.5rem;\n}\n.p-fluid .p-dropdown {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n}\n.p-fluid .p-dropdown .p-dropdown-label {\n    width: 1%;\n}\n";A(x),p.render=C},"01b4":function(e,t){var n=function(){this.head=null,this.tail=null};n.prototype={add:function(e){var t={item:e,next:null};this.head?this.tail.next=t:this.head=t,this.tail=t},get:function(){var e=this.head;if(e)return this.head=e.next,this.tail===e&&(this.tail=null),e.item}},e.exports=n},"0366":function(e,t,n){var r=n("e330"),i=n("59ed"),s=n("40d5"),o=r(r.bind);e.exports=function(e,t){return i(e),void 0===t?e:s?o(e,t):function(){return e.apply(t,arguments)}}},"0393":function(e,t,n){"use strict";n.d(t,"a",(function(){return i})),n.d(t,"b",(function(){return s}));var r=n("dd76");const i={STARTS_WITH:"startsWith",CONTAINS:"contains",NOT_CONTAINS:"notContains",ENDS_WITH:"endsWith",EQUALS:"equals",NOT_EQUALS:"notEquals",IN:"in",LESS_THAN:"lt",LESS_THAN_OR_EQUAL_TO:"lte",GREATER_THAN:"gt",GREATER_THAN_OR_EQUAL_TO:"gte",BETWEEN:"between",DATE_IS:"dateIs",DATE_IS_NOT:"dateIsNot",DATE_BEFORE:"dateBefore",DATE_AFTER:"dateAfter"},s={filter(e,t,n,i,s){let o=[];if(e)for(let a of e)for(let e of t){let t=r["d"].resolveFieldData(a,e);if(this.filters[i](t,n,s)){o.push(a);break}}return o},filters:{startsWith(e,t,n){if(void 0===t||null===t||""===t.trim())return!0;if(void 0===e||null===e)return!1;let i=r["d"].removeAccents(t.toString()).toLocaleLowerCase(n),s=r["d"].removeAccents(e.toString()).toLocaleLowerCase(n);return s.slice(0,i.length)===i},contains(e,t,n){if(void 0===t||null===t||"string"===typeof t&&""===t.trim())return!0;if(void 0===e||null===e)return!1;let i=r["d"].removeAccents(t.toString()).toLocaleLowerCase(n),s=r["d"].removeAccents(e.toString()).toLocaleLowerCase(n);return-1!==s.indexOf(i)},notContains(e,t,n){if(void 0===t||null===t||"string"===typeof t&&""===t.trim())return!0;if(void 0===e||null===e)return!1;let i=r["d"].removeAccents(t.toString()).toLocaleLowerCase(n),s=r["d"].removeAccents(e.toString()).toLocaleLowerCase(n);return-1===s.indexOf(i)},endsWith(e,t,n){if(void 0===t||null===t||""===t.trim())return!0;if(void 0===e||null===e)return!1;let i=r["d"].removeAccents(t.toString()).toLocaleLowerCase(n),s=r["d"].removeAccents(e.toString()).toLocaleLowerCase(n);return-1!==s.indexOf(i,s.length-i.length)},equals(e,t,n){return void 0===t||null===t||"string"===typeof t&&""===t.trim()||void 0!==e&&null!==e&&(e.getTime&&t.getTime?e.getTime()===t.getTime():r["d"].removeAccents(e.toString()).toLocaleLowerCase(n)==r["d"].removeAccents(t.toString()).toLocaleLowerCase(n))},notEquals(e,t,n){return void 0!==t&&null!==t&&("string"!==typeof t||""!==t.trim())&&(void 0===e||null===e||(e.getTime&&t.getTime?e.getTime()!==t.getTime():r["d"].removeAccents(e.toString()).toLocaleLowerCase(n)!=r["d"].removeAccents(t.toString()).toLocaleLowerCase(n)))},in(e,t){if(void 0===t||null===t||0===t.length)return!0;for(let n=0;n<t.length;n++)if(r["d"].equals(e,t[n]))return!0;return!1},between(e,t){return null==t||null==t[0]||null==t[1]||void 0!==e&&null!==e&&(e.getTime?t[0].getTime()<=e.getTime()&&e.getTime()<=t[1].getTime():t[0]<=e&&e<=t[1])},lt(e,t){return void 0===t||null===t||void 0!==e&&null!==e&&(e.getTime&&t.getTime?e.getTime()<t.getTime():e<t)},lte(e,t){return void 0===t||null===t||void 0!==e&&null!==e&&(e.getTime&&t.getTime?e.getTime()<=t.getTime():e<=t)},gt(e,t){return void 0===t||null===t||void 0!==e&&null!==e&&(e.getTime&&t.getTime?e.getTime()>t.getTime():e>t)},gte(e,t){return void 0===t||null===t||void 0!==e&&null!==e&&(e.getTime&&t.getTime?e.getTime()>=t.getTime():e>=t)},dateIs(e,t){return void 0===t||null===t||void 0!==e&&null!==e&&e.toDateString()===t.toDateString()},dateIsNot(e,t){return void 0===t||null===t||void 0!==e&&null!==e&&e.toDateString()!==t.toDateString()},dateBefore(e,t){return void 0===t||null===t||void 0!==e&&null!==e&&e.getTime()<t.getTime()},dateAfter(e,t){return void 0===t||null===t||void 0!==e&&null!==e&&e.getTime()>t.getTime()}},register(e,t){this.filters[e]=t}}},"06cf":function(e,t,n){var r=n("83ab"),i=n("c65b"),s=n("d1e7"),o=n("5c6c"),a=n("fc6a"),c=n("a04b"),l=n("1a2d"),u=n("0cfb"),h=Object.getOwnPropertyDescriptor;t.f=r?h:function(e,t){if(e=a(e),t=c(t),u)try{return h(e,t)}catch(n){}if(l(e,t))return o(!i(s.f,e,t),e[t])}},"07fa":function(e,t,n){var r=n("50c4");e.exports=function(e){return r(e.length)}},"0829":function(e,t,n){"use strict";(function(e){n.d(t,"a",(function(){return Uo})),n.d(t,"b",(function(){return Ws})),n.d(t,"c",(function(){return Fo})),n.d(t,"d",(function(){return Gs})),n.d(t,"e",(function(){return Xs})),n.d(t,"f",(function(){return Vo})),n.d(t,"g",(function(){return Mo}));var r=n("589b"),i=n("22e5"),s=n("e691"),o=n("1fd5"),a=n("8f6b");const c="@firebase/firestore";
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class l{constructor(e){this.uid=e}isAuthenticated(){return null!=this.uid}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}l.UNAUTHENTICATED=new l(null),l.GOOGLE_CREDENTIALS=new l("google-credentials-uid"),l.FIRST_PARTY=new l("first-party-uid"),l.MOCK_USER=new l("mock-user");
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
let u="9.9.2";
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const h=new s["b"]("@firebase/firestore");function d(){return h.logLevel}function f(e,...t){if(h.logLevel<=s["a"].DEBUG){const n=t.map(m);h.debug(`Firestore (${u}): ${e}`,...n)}}function p(e,...t){if(h.logLevel<=s["a"].ERROR){const n=t.map(m);h.error(`Firestore (${u}): ${e}`,...n)}}function g(e,...t){if(h.logLevel<=s["a"].WARN){const n=t.map(m);h.warn(`Firestore (${u}): ${e}`,...n)}}function m(e){if("string"==typeof e)return e;try{return t=e,JSON.stringify(t)}catch(t){return e}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var t}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function v(e="Unexpected state"){const t=`FIRESTORE (${u}) INTERNAL ASSERTION FAILED: `+e;throw p(t),new Error(t)}function y(e,t){e||v()}function b(e,t){return e}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const w={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class _ extends o["c"]{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class E{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class O{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization","Bearer "+e)}}class T{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(l.UNAUTHENTICATED))}shutdown(){}}class I{constructor(e){this.t=e,this.currentUser=l.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){let n=this.i;const r=e=>this.i!==n?(n=this.i,t(e)):Promise.resolve();let i=new E;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new E,e.enqueueRetryable(()=>r(this.currentUser))};const s=()=>{const t=i;e.enqueueRetryable(async()=>{await t.promise,await r(this.currentUser)})},o=e=>{f("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=e,this.auth.addAuthTokenListener(this.o),s()};this.t.onInit(e=>o(e)),setTimeout(()=>{if(!this.auth){const e=this.t.getImmediate({optional:!0});e?o(e):(f("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new E)}},0),s()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(t=>this.i!==e?(f("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):t?(y("string"==typeof t.accessToken),new O(t.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.auth.removeAuthTokenListener(this.o)}u(){const e=this.auth&&this.auth.getUid();return y(null===e||"string"==typeof e),new l(e)}}class S{constructor(e,t,n){this.type="FirstParty",this.user=l.FIRST_PARTY,this.headers=new Map,this.headers.set("X-Goog-AuthUser",t);const r=e.auth.getAuthHeaderValueForFirstParty([]);r&&this.headers.set("Authorization",r),n&&this.headers.set("X-Goog-Iam-Authorization-Token",n)}}class k{constructor(e,t,n){this.h=e,this.l=t,this.m=n}getToken(){return Promise.resolve(new S(this.h,this.l,this.m))}start(e,t){e.enqueueRetryable(()=>t(l.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class C{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class A{constructor(e){this.g=e,this.forceRefresh=!1,this.appCheck=null,this.p=null}start(e,t){const n=e=>{null!=e.error&&f("FirebaseAppCheckTokenProvider","Error getting App Check token; using placeholder token instead. Error: "+e.error.message);const n=e.token!==this.p;return this.p=e.token,f("FirebaseAppCheckTokenProvider",`Received ${n?"new":"existing"} token.`),n?t(e.token):Promise.resolve()};this.o=t=>{e.enqueueRetryable(()=>n(t))};const r=e=>{f("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=e,this.appCheck.addTokenListener(this.o)};this.g.onInit(e=>r(e)),setTimeout(()=>{if(!this.appCheck){const e=this.g.getImmediate({optional:!0});e?r(e):f("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(e=>e?(y("string"==typeof e.token),this.p=e.token,new C(e.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.appCheck.removeTokenListener(this.o)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function x(e){const t="undefined"!=typeof self&&(self.crypto||self.msCrypto),n=new Uint8Array(e);if(t&&"function"==typeof t.getRandomValues)t.getRandomValues(n);else for(let r=0;r<e;r++)n[r]=Math.floor(256*Math.random());return n}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class R{static I(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=Math.floor(256/e.length)*e.length;let n="";for(;n.length<20;){const r=x(40);for(let i=0;i<r.length;++i)n.length<20&&r[i]<t&&(n+=e.charAt(r[i]%e.length))}return n}}function N(e,t){return e<t?-1:e>t?1:0}function j(e,t,n){return e.length===t.length&&e.every((e,r)=>n(e,t[r]))}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class L{constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new _(w.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new _(w.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<-62135596800)throw new _(w.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new _(w.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return L.fromMillis(Date.now())}static fromDate(e){return L.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),n=Math.floor(1e6*(e-1e3*t));return new L(t,n)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?N(this.nanoseconds,e.nanoseconds):N(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class D{constructor(e){this.timestamp=e}static fromTimestamp(e){return new D(e)}static min(){return new D(new L(0,0))}static max(){return new D(new L(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class P{constructor(e,t,n){void 0===t?t=0:t>e.length&&v(),void 0===n?n=e.length-t:n>e.length-t&&v(),this.segments=e,this.offset=t,this.len=n}get length(){return this.len}isEqual(e){return 0===P.comparator(this,e)}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof P?e.forEach(e=>{t.push(e)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=void 0===e?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return 0===this.length}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,n=this.limit();t<n;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const n=Math.min(e.length,t.length);for(let r=0;r<n;r++){const n=e.get(r),i=t.get(r);if(n<i)return-1;if(n>i)return 1}return e.length<t.length?-1:e.length>t.length?1:0}}class M extends P{construct(e,t,n){return new M(e,t,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}static fromString(...e){const t=[];for(const n of e){if(n.indexOf("//")>=0)throw new _(w.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);t.push(...n.split("/").filter(e=>e.length>0))}return new M(t)}static emptyPath(){return new M([])}}const F=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class U extends P{construct(e,t,n){return new U(e,t,n)}static isValidIdentifier(e){return F.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),U.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return 1===this.length&&"__name__"===this.get(0)}static keyField(){return new U(["__name__"])}static fromServerFormat(e){const t=[];let n="",r=0;const i=()=>{if(0===n.length)throw new _(w.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(n),n=""};let s=!1;for(;r<e.length;){const t=e[r];if("\\"===t){if(r+1===e.length)throw new _(w.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const t=e[r+1];if("\\"!==t&&"."!==t&&"`"!==t)throw new _(w.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);n+=t,r+=2}else"`"===t?(s=!s,r++):"."!==t||s?(n+=t,r++):(i(),r++)}if(i(),s)throw new _(w.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new U(t)}static emptyPath(){return new U([])}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class V{constructor(e){this.path=e}static fromPath(e){return new V(M.fromString(e))}static fromName(e){return new V(M.fromString(e).popFirst(5))}static empty(){return new V(M.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return null!==e&&0===M.comparator(this.path,e.path)}toString(){return this.path.toString()}static comparator(e,t){return M.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new V(new M(e.slice()))}}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class B{constructor(e,t,n,r){this.indexId=e,this.collectionGroup=t,this.fields=n,this.indexState=r}}B.UNKNOWN_ID=-1;function z(e,t){const n=e.toTimestamp().seconds,r=e.toTimestamp().nanoseconds+1,i=D.fromTimestamp(1e9===r?new L(n+1,0):new L(n,r));return new q(i,V.empty(),t)}function $(e){return new q(e.readTime,e.key,-1)}class q{constructor(e,t,n){this.readTime=e,this.documentKey=t,this.largestBatchId=n}static min(){return new q(D.min(),V.empty(),-1)}static max(){return new q(D.max(),V.empty(),-1)}}function H(e,t){let n=e.readTime.compareTo(t.readTime);return 0!==n?n:(n=V.comparator(e.documentKey,t.documentKey),0!==n?n:N(e.largestBatchId,t.largestBatchId))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const W="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class G{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function K(e){if(e.code!==w.FAILED_PRECONDITION||e.message!==W)throw e;f("LocalStore","Unexpectedly lost primary lease")}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Y{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)},e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&v(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new Y((n,r)=>{this.nextCallback=t=>{this.wrapSuccess(e,t).next(n,r)},this.catchCallback=e=>{this.wrapFailure(t,e).next(n,r)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof Y?t:Y.resolve(t)}catch(e){return Y.reject(e)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):Y.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):Y.reject(t)}static resolve(e){return new Y((t,n)=>{t(e)})}static reject(e){return new Y((t,n)=>{n(e)})}static waitFor(e){return new Y((t,n)=>{let r=0,i=0,s=!1;e.forEach(e=>{++r,e.next(()=>{++i,s&&i===r&&t()},e=>n(e))}),s=!0,i===r&&t()})}static or(e){let t=Y.resolve(!1);for(const n of e)t=t.next(e=>e?Y.resolve(e):n());return t}static forEach(e,t){const n=[];return e.forEach((e,r)=>{n.push(t.call(this,e,r))}),this.waitFor(n)}static mapArray(e,t){return new Y((n,r)=>{const i=e.length,s=new Array(i);let o=0;for(let a=0;a<i;a++){const c=a;t(e[c]).next(e=>{s[c]=e,++o,o===i&&n(s)},e=>r(e))}})}static doWhile(e,t){return new Y((n,r)=>{const i=()=>{!0===e()?t().next(()=>{i()},r):n()};i()})}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Q(e){return"IndexedDbTransactionError"===e.name}
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class X{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=e=>this.it(e),this.rt=e=>t.writeSequenceNumber(e))}it(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.rt&&this.rt(e),e}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function J(e){let t=0;for(const n in e)Object.prototype.hasOwnProperty.call(e,n)&&t++;return t}function Z(e,t){for(const n in e)Object.prototype.hasOwnProperty.call(e,n)&&t(n,e[n])}function ee(e){for(const t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */X.ot=-1;class te{constructor(e,t){this.comparator=e,this.root=t||re.EMPTY}insert(e,t){return new te(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,re.BLACK,null,null))}remove(e){return new te(this.comparator,this.root.remove(e,this.comparator).copy(null,null,re.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const n=this.comparator(e,t.key);if(0===n)return t.value;n<0?t=t.left:n>0&&(t=t.right)}return null}indexOf(e){let t=0,n=this.root;for(;!n.isEmpty();){const r=this.comparator(e,n.key);if(0===r)return t+n.left.size;r<0?n=n.left:(t+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,n)=>(e(t,n),!1))}toString(){const e=[];return this.inorderTraversal((t,n)=>(e.push(`${t}:${n}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new ne(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new ne(this.root,e,this.comparator,!1)}getReverseIterator(){return new ne(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new ne(this.root,e,this.comparator,!0)}}class ne{constructor(e,t,n,r){this.isReverse=r,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?n(e.key,t):1,t&&r&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(0===i){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(0===this.nodeStack.length)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class re{constructor(e,t,n,r,i){this.key=e,this.value=t,this.color=null!=n?n:re.RED,this.left=null!=r?r:re.EMPTY,this.right=null!=i?i:re.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,n,r,i){return new re(null!=e?e:this.key,null!=t?t:this.value,null!=n?n:this.color,null!=r?r:this.left,null!=i?i:this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,n){let r=this;const i=n(e,r.key);return r=i<0?r.copy(null,null,null,r.left.insert(e,t,n),null):0===i?r.copy(null,t,null,null,null):r.copy(null,null,null,null,r.right.insert(e,t,n)),r.fixUp()}removeMin(){if(this.left.isEmpty())return re.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let n,r=this;if(t(e,r.key)<0)r.left.isEmpty()||r.left.isRed()||r.left.left.isRed()||(r=r.moveRedLeft()),r=r.copy(null,null,null,r.left.remove(e,t),null);else{if(r.left.isRed()&&(r=r.rotateRight()),r.right.isEmpty()||r.right.isRed()||r.right.left.isRed()||(r=r.moveRedRight()),0===t(e,r.key)){if(r.right.isEmpty())return re.EMPTY;n=r.right.min(),r=r.copy(n.key,n.value,null,null,r.right.removeMin())}r=r.copy(null,null,null,null,r.right.remove(e,t))}return r.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,re.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,re.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw v();if(this.right.isRed())throw v();const e=this.left.check();if(e!==this.right.check())throw v();return e+(this.isRed()?0:1)}}re.EMPTY=null,re.RED=!0,re.BLACK=!1,re.EMPTY=new class{constructor(){this.size=0}get key(){throw v()}get value(){throw v()}get color(){throw v()}get left(){throw v()}get right(){throw v()}copy(e,t,n,r,i){return this}insert(e,t,n){return new re(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ie{constructor(e){this.comparator=e,this.data=new te(this.comparator)}has(e){return null!==this.data.get(e)}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,n)=>(e(t),!1))}forEachInRange(e,t){const n=this.data.getIteratorFrom(e[0]);for(;n.hasNext();){const r=n.getNext();if(this.comparator(r.key,e[1])>=0)return;t(r.key)}}forEachWhile(e,t){let n;for(n=void 0!==t?this.data.getIteratorFrom(t):this.data.getIterator();n.hasNext();)if(!e(n.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new se(this.data.getIterator())}getIteratorFrom(e){return new se(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(e=>{t=t.add(e)}),t}isEqual(e){if(!(e instanceof ie))return!1;if(this.size!==e.size)return!1;const t=this.data.getIterator(),n=e.data.getIterator();for(;t.hasNext();){const e=t.getNext().key,r=n.getNext().key;if(0!==this.comparator(e,r))return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new ie(this.comparator);return t.data=e,t}}class se{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class oe{constructor(e){this.fields=e,e.sort(U.comparator)}static empty(){return new oe([])}unionWith(e){let t=new ie(U.comparator);for(const n of this.fields)t=t.add(n);for(const n of e)t=t.add(n);return new oe(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return j(this.fields,e.fields,(e,t)=>e.isEqual(t))}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ae{constructor(e){this.binaryString=e}static fromBase64String(e){const t=atob(e);return new ae(t)}static fromUint8Array(e){const t=function(e){let t="";for(let n=0;n<e.length;++n)t+=String.fromCharCode(e[n]);return t}(e);return new ae(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return e=this.binaryString,btoa(e);var e}toUint8Array(){return function(e){const t=new Uint8Array(e.length);for(let n=0;n<e.length;n++)t[n]=e.charCodeAt(n);return t}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return N(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}ae.EMPTY_BYTE_STRING=new ae("");const ce=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function le(e){if(y(!!e),"string"==typeof e){let t=0;const n=ce.exec(e);if(y(!!n),n[1]){let e=n[1];e=(e+"000000000").substr(0,9),t=Number(e)}const r=new Date(e);return{seconds:Math.floor(r.getTime()/1e3),nanos:t}}return{seconds:ue(e.seconds),nanos:ue(e.nanos)}}function ue(e){return"number"==typeof e?e:"string"==typeof e?Number(e):0}function he(e){return"string"==typeof e?ae.fromBase64String(e):ae.fromUint8Array(e)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function de(e){var t,n;return"server_timestamp"===(null===(n=((null===(t=null==e?void 0:e.mapValue)||void 0===t?void 0:t.fields)||{}).__type__)||void 0===n?void 0:n.stringValue)}function fe(e){const t=e.mapValue.fields.__previous_value__;return de(t)?fe(t):t}function pe(e){const t=le(e.mapValue.fields.__local_write_time__.timestampValue);return new L(t.seconds,t.nanos)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ge{constructor(e,t,n,r,i,s,o,a){this.databaseId=e,this.appId=t,this.persistenceKey=n,this.host=r,this.ssl=i,this.forceLongPolling=s,this.autoDetectLongPolling=o,this.useFetchStreams=a}}class me{constructor(e,t){this.projectId=e,this.database=t||"(default)"}static empty(){return new me("","")}get isDefaultDatabase(){return"(default)"===this.database}isEqual(e){return e instanceof me&&e.projectId===this.projectId&&e.database===this.database}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ve(e){return null==e}function ye(e){return 0===e&&1/e==-1/0}function be(e){return"number"==typeof e&&Number.isInteger(e)&&!ye(e)&&e<=Number.MAX_SAFE_INTEGER&&e>=Number.MIN_SAFE_INTEGER}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const we={mapValue:{fields:{__type__:{stringValue:"__max__"}}}};function _e(e){return"nullValue"in e?0:"booleanValue"in e?1:"integerValue"in e||"doubleValue"in e?2:"timestampValue"in e?3:"stringValue"in e?5:"bytesValue"in e?6:"referenceValue"in e?7:"geoPointValue"in e?8:"arrayValue"in e?9:"mapValue"in e?de(e)?4:Le(e)?9007199254740991:10:v()}function Ee(e,t){if(e===t)return!0;const n=_e(e);if(n!==_e(t))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return e.booleanValue===t.booleanValue;case 4:return pe(e).isEqual(pe(t));case 3:return function(e,t){if("string"==typeof e.timestampValue&&"string"==typeof t.timestampValue&&e.timestampValue.length===t.timestampValue.length)return e.timestampValue===t.timestampValue;const n=le(e.timestampValue),r=le(t.timestampValue);return n.seconds===r.seconds&&n.nanos===r.nanos}(e,t);case 5:return e.stringValue===t.stringValue;case 6:return function(e,t){return he(e.bytesValue).isEqual(he(t.bytesValue))}(e,t);case 7:return e.referenceValue===t.referenceValue;case 8:return function(e,t){return ue(e.geoPointValue.latitude)===ue(t.geoPointValue.latitude)&&ue(e.geoPointValue.longitude)===ue(t.geoPointValue.longitude)}(e,t);case 2:return function(e,t){if("integerValue"in e&&"integerValue"in t)return ue(e.integerValue)===ue(t.integerValue);if("doubleValue"in e&&"doubleValue"in t){const n=ue(e.doubleValue),r=ue(t.doubleValue);return n===r?ye(n)===ye(r):isNaN(n)&&isNaN(r)}return!1}(e,t);case 9:return j(e.arrayValue.values||[],t.arrayValue.values||[],Ee);case 10:return function(e,t){const n=e.mapValue.fields||{},r=t.mapValue.fields||{};if(J(n)!==J(r))return!1;for(const i in n)if(n.hasOwnProperty(i)&&(void 0===r[i]||!Ee(n[i],r[i])))return!1;return!0}(e,t);default:return v()}}function Oe(e,t){return void 0!==(e.values||[]).find(e=>Ee(e,t))}function Te(e,t){if(e===t)return 0;const n=_e(e),r=_e(t);if(n!==r)return N(n,r);switch(n){case 0:case 9007199254740991:return 0;case 1:return N(e.booleanValue,t.booleanValue);case 2:return function(e,t){const n=ue(e.integerValue||e.doubleValue),r=ue(t.integerValue||t.doubleValue);return n<r?-1:n>r?1:n===r?0:isNaN(n)?isNaN(r)?0:-1:1}(e,t);case 3:return Ie(e.timestampValue,t.timestampValue);case 4:return Ie(pe(e),pe(t));case 5:return N(e.stringValue,t.stringValue);case 6:return function(e,t){const n=he(e),r=he(t);return n.compareTo(r)}(e.bytesValue,t.bytesValue);case 7:return function(e,t){const n=e.split("/"),r=t.split("/");for(let i=0;i<n.length&&i<r.length;i++){const e=N(n[i],r[i]);if(0!==e)return e}return N(n.length,r.length)}(e.referenceValue,t.referenceValue);case 8:return function(e,t){const n=N(ue(e.latitude),ue(t.latitude));return 0!==n?n:N(ue(e.longitude),ue(t.longitude))}(e.geoPointValue,t.geoPointValue);case 9:return function(e,t){const n=e.values||[],r=t.values||[];for(let i=0;i<n.length&&i<r.length;++i){const e=Te(n[i],r[i]);if(e)return e}return N(n.length,r.length)}(e.arrayValue,t.arrayValue);case 10:return function(e,t){if(e===we.mapValue&&t===we.mapValue)return 0;if(e===we.mapValue)return 1;if(t===we.mapValue)return-1;const n=e.fields||{},r=Object.keys(n),i=t.fields||{},s=Object.keys(i);r.sort(),s.sort();for(let o=0;o<r.length&&o<s.length;++o){const e=N(r[o],s[o]);if(0!==e)return e;const t=Te(n[r[o]],i[s[o]]);if(0!==t)return t}return N(r.length,s.length)}(e.mapValue,t.mapValue);default:throw v()}}function Ie(e,t){if("string"==typeof e&&"string"==typeof t&&e.length===t.length)return N(e,t);const n=le(e),r=le(t),i=N(n.seconds,r.seconds);return 0!==i?i:N(n.nanos,r.nanos)}function Se(e){return ke(e)}function ke(e){return"nullValue"in e?"null":"booleanValue"in e?""+e.booleanValue:"integerValue"in e?""+e.integerValue:"doubleValue"in e?""+e.doubleValue:"timestampValue"in e?function(e){const t=le(e);return`time(${t.seconds},${t.nanos})`}(e.timestampValue):"stringValue"in e?e.stringValue:"bytesValue"in e?he(e.bytesValue).toBase64():"referenceValue"in e?(n=e.referenceValue,V.fromName(n).toString()):"geoPointValue"in e?`geo(${(t=e.geoPointValue).latitude},${t.longitude})`:"arrayValue"in e?function(e){let t="[",n=!0;for(const r of e.values||[])n?n=!1:t+=",",t+=ke(r);return t+"]"}(e.arrayValue):"mapValue"in e?function(e){const t=Object.keys(e.fields||{}).sort();let n="{",r=!0;for(const i of t)r?r=!1:n+=",",n+=`${i}:${ke(e.fields[i])}`;return n+"}"}(e.mapValue):v();var t,n}function Ce(e){return!!e&&"integerValue"in e}function Ae(e){return!!e&&"arrayValue"in e}function xe(e){return!!e&&"nullValue"in e}function Re(e){return!!e&&"doubleValue"in e&&isNaN(Number(e.doubleValue))}function Ne(e){return!!e&&"mapValue"in e}function je(e){if(e.geoPointValue)return{geoPointValue:Object.assign({},e.geoPointValue)};if(e.timestampValue&&"object"==typeof e.timestampValue)return{timestampValue:Object.assign({},e.timestampValue)};if(e.mapValue){const t={mapValue:{fields:{}}};return Z(e.mapValue.fields,(e,n)=>t.mapValue.fields[e]=je(n)),t}if(e.arrayValue){const t={arrayValue:{values:[]}};for(let n=0;n<(e.arrayValue.values||[]).length;++n)t.arrayValue.values[n]=je(e.arrayValue.values[n]);return t}return Object.assign({},e)}function Le(e){return"__max__"===(((e.mapValue||{}).fields||{}).__type__||{}).stringValue}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class De{constructor(e){this.value=e}static empty(){return new De({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let n=0;n<e.length-1;++n)if(t=(t.mapValue.fields||{})[e.get(n)],!Ne(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=je(t)}setAll(e){let t=U.emptyPath(),n={},r=[];e.forEach((e,i)=>{if(!t.isImmediateParentOf(i)){const e=this.getFieldsMap(t);this.applyChanges(e,n,r),n={},r=[],t=i.popLast()}e?n[i.lastSegment()]=je(e):r.push(i.lastSegment())});const i=this.getFieldsMap(t);this.applyChanges(i,n,r)}delete(e){const t=this.field(e.popLast());Ne(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return Ee(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let n=0;n<e.length;++n){let r=t.mapValue.fields[e.get(n)];Ne(r)&&r.mapValue.fields||(r={mapValue:{fields:{}}},t.mapValue.fields[e.get(n)]=r),t=r}return t.mapValue.fields}applyChanges(e,t,n){Z(t,(t,n)=>e[t]=n);for(const r of n)delete e[r]}clone(){return new De(je(this.value))}}function Pe(e){const t=[];return Z(e.fields,(e,n)=>{const r=new U([e]);if(Ne(n)){const e=Pe(n.mapValue).fields;if(0===e.length)t.push(r);else for(const n of e)t.push(r.child(n))}else t.push(r)}),new oe(t)
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}class Me{constructor(e,t,n,r,i,s){this.key=e,this.documentType=t,this.version=n,this.readTime=r,this.data=i,this.documentState=s}static newInvalidDocument(e){return new Me(e,0,D.min(),D.min(),De.empty(),0)}static newFoundDocument(e,t,n){return new Me(e,1,t,D.min(),n,0)}static newNoDocument(e,t){return new Me(e,2,t,D.min(),De.empty(),0)}static newUnknownDocument(e,t){return new Me(e,3,t,D.min(),De.empty(),2)}convertToFoundDocument(e,t){return this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=De.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=De.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=D.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return 1===this.documentState}get hasCommittedMutations(){return 2===this.documentState}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return 0!==this.documentType}isFoundDocument(){return 1===this.documentType}isNoDocument(){return 2===this.documentType}isUnknownDocument(){return 3===this.documentType}isEqual(e){return e instanceof Me&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Me(this.key,this.documentType,this.version,this.readTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fe{constructor(e,t=null,n=[],r=[],i=null,s=null,o=null){this.path=e,this.collectionGroup=t,this.orderBy=n,this.filters=r,this.limit=i,this.startAt=s,this.endAt=o,this.ut=null}}function Ue(e,t=null,n=[],r=[],i=null,s=null,o=null){return new Fe(e,t,n,r,i,s,o)}function Ve(e){const t=b(e);if(null===t.ut){let e=t.path.canonicalString();null!==t.collectionGroup&&(e+="|cg:"+t.collectionGroup),e+="|f:",e+=t.filters.map(e=>{return(t=e).field.canonicalString()+t.op.toString()+Se(t.value);var t}).join(","),e+="|ob:",e+=t.orderBy.map(e=>function(e){return e.field.canonicalString()+e.dir}(e)).join(","),ve(t.limit)||(e+="|l:",e+=t.limit),t.startAt&&(e+="|lb:",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map(e=>Se(e)).join(",")),t.endAt&&(e+="|ub:",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map(e=>Se(e)).join(",")),t.ut=e}return t.ut}function Be(e){let t=e.path.canonicalString();return null!==e.collectionGroup&&(t+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(t+=`, filters: [${e.filters.map(e=>{return`${(t=e).field.canonicalString()} ${t.op} ${Se(t.value)}`;var t}).join(", ")}]`),ve(e.limit)||(t+=", limit: "+e.limit),e.orderBy.length>0&&(t+=`, orderBy: [${e.orderBy.map(e=>function(e){return`${e.field.canonicalString()} (${e.dir})`}(e)).join(", ")}]`),e.startAt&&(t+=", startAt: ",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(e=>Se(e)).join(",")),e.endAt&&(t+=", endAt: ",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(e=>Se(e)).join(",")),`Target(${t})`}function ze(e,t){if(e.limit!==t.limit)return!1;if(e.orderBy.length!==t.orderBy.length)return!1;for(let i=0;i<e.orderBy.length;i++)if(!tt(e.orderBy[i],t.orderBy[i]))return!1;if(e.filters.length!==t.filters.length)return!1;for(let i=0;i<e.filters.length;i++)if(n=e.filters[i],r=t.filters[i],n.op!==r.op||!n.field.isEqual(r.field)||!Ee(n.value,r.value))return!1;var n,r;return e.collectionGroup===t.collectionGroup&&!!e.path.isEqual(t.path)&&!!rt(e.startAt,t.startAt)&&rt(e.endAt,t.endAt)}function $e(e){return V.isDocumentKey(e.path)&&null===e.collectionGroup&&0===e.filters.length}class qe extends class{}{constructor(e,t,n){super(),this.field=e,this.op=t,this.value=n}static create(e,t,n){return e.isKeyField()?"in"===t||"not-in"===t?this.ct(e,t,n):new He(e,t,n):"array-contains"===t?new Ye(e,n):"in"===t?new Qe(e,n):"not-in"===t?new Xe(e,n):"array-contains-any"===t?new Je(e,n):new qe(e,t,n)}static ct(e,t,n){return"in"===t?new We(e,n):new Ge(e,n)}matches(e){const t=e.data.field(this.field);return"!="===this.op?null!==t&&this.at(Te(t,this.value)):null!==t&&_e(this.value)===_e(t)&&this.at(Te(t,this.value))}at(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return 0===e;case"!=":return 0!==e;case">":return e>0;case">=":return e>=0;default:return v()}}ht(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}}class He extends qe{constructor(e,t,n){super(e,t,n),this.key=V.fromName(n.referenceValue)}matches(e){const t=V.comparator(e.key,this.key);return this.at(t)}}class We extends qe{constructor(e,t){super(e,"in",t),this.keys=Ke("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class Ge extends qe{constructor(e,t){super(e,"not-in",t),this.keys=Ke("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function Ke(e,t){var n;return((null===(n=t.arrayValue)||void 0===n?void 0:n.values)||[]).map(e=>V.fromName(e.referenceValue))}class Ye extends qe{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return Ae(t)&&Oe(t.arrayValue,this.value)}}class Qe extends qe{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return null!==t&&Oe(this.value.arrayValue,t)}}class Xe extends qe{constructor(e,t){super(e,"not-in",t)}matches(e){if(Oe(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return null!==t&&!Oe(this.value.arrayValue,t)}}class Je extends qe{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!Ae(t)||!t.arrayValue.values)&&t.arrayValue.values.some(e=>Oe(this.value.arrayValue,e))}}class Ze{constructor(e,t){this.position=e,this.inclusive=t}}class et{constructor(e,t="asc"){this.field=e,this.dir=t}}function tt(e,t){return e.dir===t.dir&&e.field.isEqual(t.field)}function nt(e,t,n){let r=0;for(let i=0;i<e.position.length;i++){const s=t[i],o=e.position[i];if(r=s.field.isKeyField()?V.comparator(V.fromName(o.referenceValue),n.key):Te(o,n.data.field(s.field)),"desc"===s.dir&&(r*=-1),0!==r)break}return r}function rt(e,t){if(null===e)return null===t;if(null===t)return!1;if(e.inclusive!==t.inclusive||e.position.length!==t.position.length)return!1;for(let n=0;n<e.position.length;n++)if(!Ee(e.position[n],t.position[n]))return!1;return!0}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class it{constructor(e,t=null,n=[],r=[],i=null,s="F",o=null,a=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=n,this.filters=r,this.limit=i,this.limitType=s,this.startAt=o,this.endAt=a,this.lt=null,this.ft=null,this.startAt,this.endAt}}function st(e,t,n,r,i,s,o,a){return new it(e,t,n,r,i,s,o,a)}function ot(e){return new it(e)}function at(e){return 0===e.filters.length&&null===e.limit&&null==e.startAt&&null==e.endAt&&(0===e.explicitOrderBy.length||1===e.explicitOrderBy.length&&e.explicitOrderBy[0].field.isKeyField())}function ct(e){return e.explicitOrderBy.length>0?e.explicitOrderBy[0].field:null}function lt(e){for(const t of e.filters)if(t.ht())return t.field;return null}function ut(e){return null!==e.collectionGroup}function ht(e){const t=b(e);if(null===t.lt){t.lt=[];const e=lt(t),n=ct(t);if(null!==e&&null===n)e.isKeyField()||t.lt.push(new et(e)),t.lt.push(new et(U.keyField(),"asc"));else{let e=!1;for(const n of t.explicitOrderBy)t.lt.push(n),n.field.isKeyField()&&(e=!0);if(!e){const e=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc";t.lt.push(new et(U.keyField(),e))}}}return t.lt}function dt(e){const t=b(e);if(!t.ft)if("F"===t.limitType)t.ft=Ue(t.path,t.collectionGroup,ht(t),t.filters,t.limit,t.startAt,t.endAt);else{const e=[];for(const i of ht(t)){const t="desc"===i.dir?"asc":"desc";e.push(new et(i.field,t))}const n=t.endAt?new Ze(t.endAt.position,t.endAt.inclusive):null,r=t.startAt?new Ze(t.startAt.position,t.startAt.inclusive):null;t.ft=Ue(t.path,t.collectionGroup,e,t.filters,t.limit,n,r)}return t.ft}function ft(e,t,n){return new it(e.path,e.collectionGroup,e.explicitOrderBy.slice(),e.filters.slice(),t,n,e.startAt,e.endAt)}function pt(e,t){return ze(dt(e),dt(t))&&e.limitType===t.limitType}function gt(e){return`${Ve(dt(e))}|lt:${e.limitType}`}function mt(e){return`Query(target=${Be(dt(e))}; limitType=${e.limitType})`}function vt(e,t){return t.isFoundDocument()&&function(e,t){const n=t.key.path;return null!==e.collectionGroup?t.key.hasCollectionId(e.collectionGroup)&&e.path.isPrefixOf(n):V.isDocumentKey(e.path)?e.path.isEqual(n):e.path.isImmediateParentOf(n)}(e,t)&&function(e,t){for(const n of e.explicitOrderBy)if(!n.field.isKeyField()&&null===t.data.field(n.field))return!1;return!0}(e,t)&&function(e,t){for(const n of e.filters)if(!n.matches(t))return!1;return!0}(e,t)&&function(e,t){return!(e.startAt&&!function(e,t,n){const r=nt(e,t,n);return e.inclusive?r<=0:r<0}(e.startAt,ht(e),t))&&!(e.endAt&&!function(e,t,n){const r=nt(e,t,n);return e.inclusive?r>=0:r>0}(e.endAt,ht(e),t))}(e,t)}function yt(e){return e.collectionGroup||(e.path.length%2==1?e.path.lastSegment():e.path.get(e.path.length-2))}function bt(e){return(t,n)=>{let r=!1;for(const i of ht(e)){const e=wt(i,t,n);if(0!==e)return e;r=r||i.field.isKeyField()}return 0}}function wt(e,t,n){const r=e.field.isKeyField()?V.comparator(t.key,n.key):function(e,t,n){const r=t.data.field(e),i=n.data.field(e);return null!==r&&null!==i?Te(r,i):v()}(e.field,t,n);switch(e.dir){case"asc":return r;case"desc":return-1*r;default:return v()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _t(e,t){if(e.dt){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:ye(t)?"-0":t}}function Et(e){return{integerValue:""+e}}function Ot(e,t){return be(t)?Et(t):_t(e,t)}
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tt{constructor(){this._=void 0}}function It(e,t,n){return e instanceof Ct?function(e,t){const n={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:e.seconds,nanos:e.nanoseconds}}}};return t&&(n.fields.__previous_value__=t),{mapValue:n}}(n,t):e instanceof At?xt(e,t):e instanceof Rt?Nt(e,t):function(e,t){const n=kt(e,t),r=Lt(n)+Lt(e._t);return Ce(n)&&Ce(e._t)?Et(r):_t(e.wt,r)}(e,t)}function St(e,t,n){return e instanceof At?xt(e,t):e instanceof Rt?Nt(e,t):n}function kt(e,t){return e instanceof jt?Ce(n=t)||function(e){return!!e&&"doubleValue"in e}(n)?t:{integerValue:0}:null;var n}class Ct extends Tt{}class At extends Tt{constructor(e){super(),this.elements=e}}function xt(e,t){const n=Dt(t);for(const r of e.elements)n.some(e=>Ee(e,r))||n.push(r);return{arrayValue:{values:n}}}class Rt extends Tt{constructor(e){super(),this.elements=e}}function Nt(e,t){let n=Dt(t);for(const r of e.elements)n=n.filter(e=>!Ee(e,r));return{arrayValue:{values:n}}}class jt extends Tt{constructor(e,t){super(),this.wt=e,this._t=t}}function Lt(e){return ue(e.integerValue||e.doubleValue)}function Dt(e){return Ae(e)&&e.arrayValue.values?e.arrayValue.values.slice():[]}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pt(e,t){return e.field.isEqual(t.field)&&function(e,t){return e instanceof At&&t instanceof At||e instanceof Rt&&t instanceof Rt?j(e.elements,t.elements,Ee):e instanceof jt&&t instanceof jt?Ee(e._t,t._t):e instanceof Ct&&t instanceof Ct}(e.transform,t.transform)}class Mt{constructor(e,t){this.version=e,this.transformResults=t}}class Ft{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new Ft}static exists(e){return new Ft(void 0,e)}static updateTime(e){return new Ft(e)}get isNone(){return void 0===this.updateTime&&void 0===this.exists}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Ut(e,t){return void 0!==e.updateTime?t.isFoundDocument()&&t.version.isEqual(e.updateTime):void 0===e.exists||e.exists===t.isFoundDocument()}class Vt{}function Bt(e,t){if(!e.hasLocalMutations||t&&0===t.fields.length)return null;if(null===t)return e.isNoDocument()?new Xt(e.key,Ft.none()):new Wt(e.key,e.data,Ft.none());{const n=e.data,r=De.empty();let i=new ie(U.comparator);for(let e of t.fields)if(!i.has(e)){let t=n.field(e);null===t&&e.length>1&&(e=e.popLast(),t=n.field(e)),null===t?r.delete(e):r.set(e,t),i=i.add(e)}return new Gt(e.key,r,new oe(i.toArray()),Ft.none())}}function zt(e,t,n){e instanceof Wt?function(e,t,n){const r=e.value.clone(),i=Yt(e.fieldTransforms,t,n.transformResults);r.setAll(i),t.convertToFoundDocument(n.version,r).setHasCommittedMutations()}(e,t,n):e instanceof Gt?function(e,t,n){if(!Ut(e.precondition,t))return void t.convertToUnknownDocument(n.version);const r=Yt(e.fieldTransforms,t,n.transformResults),i=t.data;i.setAll(Kt(e)),i.setAll(r),t.convertToFoundDocument(n.version,i).setHasCommittedMutations()}(e,t,n):function(e,t,n){t.convertToNoDocument(n.version).setHasCommittedMutations()}(0,t,n)}function $t(e,t,n,r){return e instanceof Wt?function(e,t,n,r){if(!Ut(e.precondition,t))return n;const i=e.value.clone(),s=Qt(e.fieldTransforms,r,t);return i.setAll(s),t.convertToFoundDocument(t.version,i).setHasLocalMutations(),null}(e,t,n,r):e instanceof Gt?function(e,t,n,r){if(!Ut(e.precondition,t))return n;const i=Qt(e.fieldTransforms,r,t),s=t.data;return s.setAll(Kt(e)),s.setAll(i),t.convertToFoundDocument(t.version,s).setHasLocalMutations(),null===n?null:n.unionWith(e.fieldMask.fields).unionWith(e.fieldTransforms.map(e=>e.field))}(e,t,n,r):function(e,t,n){return Ut(e.precondition,t)?(t.convertToNoDocument(t.version).setHasLocalMutations(),null):n}(e,t,n)}function qt(e,t){let n=null;for(const r of e.fieldTransforms){const e=t.data.field(r.field),i=kt(r.transform,e||null);null!=i&&(null===n&&(n=De.empty()),n.set(r.field,i))}return n||null}function Ht(e,t){return e.type===t.type&&!!e.key.isEqual(t.key)&&!!e.precondition.isEqual(t.precondition)&&!!function(e,t){return void 0===e&&void 0===t||!(!e||!t)&&j(e,t,(e,t)=>Pt(e,t))}(e.fieldTransforms,t.fieldTransforms)&&(0===e.type?e.value.isEqual(t.value):1!==e.type||e.data.isEqual(t.data)&&e.fieldMask.isEqual(t.fieldMask))}class Wt extends Vt{constructor(e,t,n,r=[]){super(),this.key=e,this.value=t,this.precondition=n,this.fieldTransforms=r,this.type=0}getFieldMask(){return null}}class Gt extends Vt{constructor(e,t,n,r,i=[]){super(),this.key=e,this.data=t,this.fieldMask=n,this.precondition=r,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function Kt(e){const t=new Map;return e.fieldMask.fields.forEach(n=>{if(!n.isEmpty()){const r=e.data.field(n);t.set(n,r)}}),t}function Yt(e,t,n){const r=new Map;y(e.length===n.length);for(let i=0;i<n.length;i++){const s=e[i],o=s.transform,a=t.data.field(s.field);r.set(s.field,St(o,a,n[i]))}return r}function Qt(e,t,n){const r=new Map;for(const i of e){const e=i.transform,s=n.data.field(i.field);r.set(i.field,It(e,s,t))}return r}class Xt extends Vt{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class Jt extends Vt{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zt{constructor(e){this.count=e}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var en,tn;function nn(e){switch(e){default:return v();case w.CANCELLED:case w.UNKNOWN:case w.DEADLINE_EXCEEDED:case w.RESOURCE_EXHAUSTED:case w.INTERNAL:case w.UNAVAILABLE:case w.UNAUTHENTICATED:return!1;case w.INVALID_ARGUMENT:case w.NOT_FOUND:case w.ALREADY_EXISTS:case w.PERMISSION_DENIED:case w.FAILED_PRECONDITION:case w.ABORTED:case w.OUT_OF_RANGE:case w.UNIMPLEMENTED:case w.DATA_LOSS:return!0}}function rn(e){if(void 0===e)return p("GRPC error has no .code"),w.UNKNOWN;switch(e){case en.OK:return w.OK;case en.CANCELLED:return w.CANCELLED;case en.UNKNOWN:return w.UNKNOWN;case en.DEADLINE_EXCEEDED:return w.DEADLINE_EXCEEDED;case en.RESOURCE_EXHAUSTED:return w.RESOURCE_EXHAUSTED;case en.INTERNAL:return w.INTERNAL;case en.UNAVAILABLE:return w.UNAVAILABLE;case en.UNAUTHENTICATED:return w.UNAUTHENTICATED;case en.INVALID_ARGUMENT:return w.INVALID_ARGUMENT;case en.NOT_FOUND:return w.NOT_FOUND;case en.ALREADY_EXISTS:return w.ALREADY_EXISTS;case en.PERMISSION_DENIED:return w.PERMISSION_DENIED;case en.FAILED_PRECONDITION:return w.FAILED_PRECONDITION;case en.ABORTED:return w.ABORTED;case en.OUT_OF_RANGE:return w.OUT_OF_RANGE;case en.UNIMPLEMENTED:return w.UNIMPLEMENTED;case en.DATA_LOSS:return w.DATA_LOSS;default:return v()}}(tn=en||(en={}))[tn.OK=0]="OK",tn[tn.CANCELLED=1]="CANCELLED",tn[tn.UNKNOWN=2]="UNKNOWN",tn[tn.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",tn[tn.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",tn[tn.NOT_FOUND=5]="NOT_FOUND",tn[tn.ALREADY_EXISTS=6]="ALREADY_EXISTS",tn[tn.PERMISSION_DENIED=7]="PERMISSION_DENIED",tn[tn.UNAUTHENTICATED=16]="UNAUTHENTICATED",tn[tn.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",tn[tn.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",tn[tn.ABORTED=10]="ABORTED",tn[tn.OUT_OF_RANGE=11]="OUT_OF_RANGE",tn[tn.UNIMPLEMENTED=12]="UNIMPLEMENTED",tn[tn.INTERNAL=13]="INTERNAL",tn[tn.UNAVAILABLE=14]="UNAVAILABLE",tn[tn.DATA_LOSS=15]="DATA_LOSS";
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class sn{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),n=this.inner[t];if(void 0!==n)for(const[r,i]of n)if(this.equalsFn(r,e))return i}has(e){return void 0!==this.get(e)}set(e,t){const n=this.mapKeyFn(e),r=this.inner[n];if(void 0===r)return this.inner[n]=[[e,t]],void this.innerSize++;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],e))return void(r[i]=[e,t]);r.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),n=this.inner[t];if(void 0===n)return!1;for(let r=0;r<n.length;r++)if(this.equalsFn(n[r][0],e))return 1===n.length?delete this.inner[t]:n.splice(r,1),this.innerSize--,!0;return!1}forEach(e){Z(this.inner,(t,n)=>{for(const[r,i]of n)e(r,i)})}isEmpty(){return ee(this.inner)}size(){return this.innerSize}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const on=new te(V.comparator);function an(){return on}const cn=new te(V.comparator);function ln(...e){let t=cn;for(const n of e)t=t.insert(n.key,n);return t}function un(e){let t=cn;return e.forEach((e,n)=>t=t.insert(e,n.overlayedDocument)),t}function hn(){return fn()}function dn(){return fn()}function fn(){return new sn(e=>e.toString(),(e,t)=>e.isEqual(t))}const pn=new te(V.comparator),gn=new ie(V.comparator);function mn(...e){let t=gn;for(const n of e)t=t.add(n);return t}const vn=new ie(N);function yn(){return vn}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bn{constructor(e,t,n,r,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=n,this.documentUpdates=r,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t){const n=new Map;return n.set(e,wn.createSynthesizedTargetChangeForCurrentChange(e,t)),new bn(D.min(),n,yn(),an(),mn())}}class wn{constructor(e,t,n,r,i){this.resumeToken=e,this.current=t,this.addedDocuments=n,this.modifiedDocuments=r,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t){return new wn(ae.EMPTY_BYTE_STRING,t,mn(),mn(),mn())}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _n{constructor(e,t,n,r){this.gt=e,this.removedTargetIds=t,this.key=n,this.yt=r}}class En{constructor(e,t){this.targetId=e,this.It=t}}class On{constructor(e,t,n=ae.EMPTY_BYTE_STRING,r=null){this.state=e,this.targetIds=t,this.resumeToken=n,this.cause=r}}class Tn{constructor(){this.Tt=0,this.Et=kn(),this.At=ae.EMPTY_BYTE_STRING,this.Rt=!1,this.bt=!0}get current(){return this.Rt}get resumeToken(){return this.At}get Pt(){return 0!==this.Tt}get vt(){return this.bt}Vt(e){e.approximateByteSize()>0&&(this.bt=!0,this.At=e)}St(){let e=mn(),t=mn(),n=mn();return this.Et.forEach((r,i)=>{switch(i){case 0:e=e.add(r);break;case 2:t=t.add(r);break;case 1:n=n.add(r);break;default:v()}}),new wn(this.At,this.Rt,e,t,n)}Dt(){this.bt=!1,this.Et=kn()}Ct(e,t){this.bt=!0,this.Et=this.Et.insert(e,t)}xt(e){this.bt=!0,this.Et=this.Et.remove(e)}Nt(){this.Tt+=1}kt(){this.Tt-=1}Mt(){this.bt=!0,this.Rt=!0}}class In{constructor(e){this.Ot=e,this.Ft=new Map,this.$t=an(),this.Bt=Sn(),this.Lt=new ie(N)}Ut(e){for(const t of e.gt)e.yt&&e.yt.isFoundDocument()?this.qt(t,e.yt):this.Kt(t,e.key,e.yt);for(const t of e.removedTargetIds)this.Kt(t,e.key,e.yt)}Gt(e){this.forEachTarget(e,t=>{const n=this.Qt(t);switch(e.state){case 0:this.jt(t)&&n.Vt(e.resumeToken);break;case 1:n.kt(),n.Pt||n.Dt(),n.Vt(e.resumeToken);break;case 2:n.kt(),n.Pt||this.removeTarget(t);break;case 3:this.jt(t)&&(n.Mt(),n.Vt(e.resumeToken));break;case 4:this.jt(t)&&(this.Wt(t),n.Vt(e.resumeToken));break;default:v()}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.Ft.forEach((e,n)=>{this.jt(n)&&t(n)})}zt(e){const t=e.targetId,n=e.It.count,r=this.Ht(t);if(r){const e=r.target;if($e(e))if(0===n){const n=new V(e.path);this.Kt(t,n,Me.newNoDocument(n,D.min()))}else y(1===n);else this.Jt(t)!==n&&(this.Wt(t),this.Lt=this.Lt.add(t))}}Yt(e){const t=new Map;this.Ft.forEach((n,r)=>{const i=this.Ht(r);if(i){if(n.current&&$e(i.target)){const t=new V(i.target.path);null!==this.$t.get(t)||this.Xt(r,t)||this.Kt(r,t,Me.newNoDocument(t,e))}n.vt&&(t.set(r,n.St()),n.Dt())}});let n=mn();this.Bt.forEach((e,t)=>{let r=!0;t.forEachWhile(e=>{const t=this.Ht(e);return!t||2===t.purpose||(r=!1,!1)}),r&&(n=n.add(e))}),this.$t.forEach((t,n)=>n.setReadTime(e));const r=new bn(e,t,this.Lt,this.$t,n);return this.$t=an(),this.Bt=Sn(),this.Lt=new ie(N),r}qt(e,t){if(!this.jt(e))return;const n=this.Xt(e,t.key)?2:0;this.Qt(e).Ct(t.key,n),this.$t=this.$t.insert(t.key,t),this.Bt=this.Bt.insert(t.key,this.Zt(t.key).add(e))}Kt(e,t,n){if(!this.jt(e))return;const r=this.Qt(e);this.Xt(e,t)?r.Ct(t,1):r.xt(t),this.Bt=this.Bt.insert(t,this.Zt(t).delete(e)),n&&(this.$t=this.$t.insert(t,n))}removeTarget(e){this.Ft.delete(e)}Jt(e){const t=this.Qt(e).St();return this.Ot.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}Nt(e){this.Qt(e).Nt()}Qt(e){let t=this.Ft.get(e);return t||(t=new Tn,this.Ft.set(e,t)),t}Zt(e){let t=this.Bt.get(e);return t||(t=new ie(N),this.Bt=this.Bt.insert(e,t)),t}jt(e){const t=null!==this.Ht(e);return t||f("WatchChangeAggregator","Detected inactive target",e),t}Ht(e){const t=this.Ft.get(e);return t&&t.Pt?null:this.Ot.te(e)}Wt(e){this.Ft.set(e,new Tn),this.Ot.getRemoteKeysForTarget(e).forEach(t=>{this.Kt(e,t,null)})}Xt(e,t){return this.Ot.getRemoteKeysForTarget(e).has(t)}}function Sn(){return new te(V.comparator)}function kn(){return new te(V.comparator)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cn=(()=>{const e={asc:"ASCENDING",desc:"DESCENDING"};return e})(),An=(()=>{const e={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"};return e})();class xn{constructor(e,t){this.databaseId=e,this.dt=t}}function Rn(e,t){return e.dt?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function Nn(e,t){return e.dt?t.toBase64():t.toUint8Array()}function jn(e,t){return Rn(e,t.toTimestamp())}function Ln(e){return y(!!e),D.fromTimestamp(function(e){const t=le(e);return new L(t.seconds,t.nanos)}(e))}function Dn(e,t){return function(e){return new M(["projects",e.projectId,"databases",e.database])}(e).child("documents").child(t).canonicalString()}function Pn(e){const t=M.fromString(e);return y(sr(t)),t}function Mn(e,t){return Dn(e.databaseId,t.path)}function Fn(e,t){const n=Pn(t);if(n.get(1)!==e.databaseId.projectId)throw new _(w.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+e.databaseId.projectId);if(n.get(3)!==e.databaseId.database)throw new _(w.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+e.databaseId.database);return new V(zn(n))}function Un(e,t){return Dn(e.databaseId,t)}function Vn(e){const t=Pn(e);return 4===t.length?M.emptyPath():zn(t)}function Bn(e){return new M(["projects",e.databaseId.projectId,"databases",e.databaseId.database]).canonicalString()}function zn(e){return y(e.length>4&&"documents"===e.get(4)),e.popFirst(5)}function $n(e,t,n){return{name:Mn(e,t),fields:n.value.mapValue.fields}}function qn(e,t){let n;if("targetChange"in t){t.targetChange;const r=function(e){return"NO_CHANGE"===e?0:"ADD"===e?1:"REMOVE"===e?2:"CURRENT"===e?3:"RESET"===e?4:v()}(t.targetChange.targetChangeType||"NO_CHANGE"),i=t.targetChange.targetIds||[],s=function(e,t){return e.dt?(y(void 0===t||"string"==typeof t),ae.fromBase64String(t||"")):(y(void 0===t||t instanceof Uint8Array),ae.fromUint8Array(t||new Uint8Array))}(e,t.targetChange.resumeToken),o=t.targetChange.cause,a=o&&function(e){const t=void 0===e.code?w.UNKNOWN:rn(e.code);return new _(t,e.message||"")}(o);n=new On(r,i,s,a||null)}else if("documentChange"in t){t.documentChange;const r=t.documentChange;r.document,r.document.name,r.document.updateTime;const i=Fn(e,r.document.name),s=Ln(r.document.updateTime),o=new De({mapValue:{fields:r.document.fields}}),a=Me.newFoundDocument(i,s,o),c=r.targetIds||[],l=r.removedTargetIds||[];n=new _n(c,l,a.key,a)}else if("documentDelete"in t){t.documentDelete;const r=t.documentDelete;r.document;const i=Fn(e,r.document),s=r.readTime?Ln(r.readTime):D.min(),o=Me.newNoDocument(i,s),a=r.removedTargetIds||[];n=new _n([],a,o.key,o)}else if("documentRemove"in t){t.documentRemove;const r=t.documentRemove;r.document;const i=Fn(e,r.document),s=r.removedTargetIds||[];n=new _n([],s,i,null)}else{if(!("filter"in t))return v();{t.filter;const e=t.filter;e.targetId;const r=e.count||0,i=new Zt(r),s=e.targetId;n=new En(s,i)}}return n}function Hn(e,t){let n;if(t instanceof Wt)n={update:$n(e,t.key,t.value)};else if(t instanceof Xt)n={delete:Mn(e,t.key)};else if(t instanceof Gt)n={update:$n(e,t.key,t.data),updateMask:ir(t.fieldMask)};else{if(!(t instanceof Jt))return v();n={verify:Mn(e,t.key)}}return t.fieldTransforms.length>0&&(n.updateTransforms=t.fieldTransforms.map(e=>function(e,t){const n=t.transform;if(n instanceof Ct)return{fieldPath:t.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(n instanceof At)return{fieldPath:t.field.canonicalString(),appendMissingElements:{values:n.elements}};if(n instanceof Rt)return{fieldPath:t.field.canonicalString(),removeAllFromArray:{values:n.elements}};if(n instanceof jt)return{fieldPath:t.field.canonicalString(),increment:n._t};throw v()}(0,e))),t.precondition.isNone||(n.currentDocument=function(e,t){return void 0!==t.updateTime?{updateTime:jn(e,t.updateTime)}:void 0!==t.exists?{exists:t.exists}:v()}(e,t.precondition)),n}function Wn(e,t){return e&&e.length>0?(y(void 0!==t),e.map(e=>function(e,t){let n=e.updateTime?Ln(e.updateTime):Ln(t);return n.isEqual(D.min())&&(n=Ln(t)),new Mt(n,e.transformResults||[])}(e,t))):[]}function Gn(e,t){return{documents:[Un(e,t.path)]}}function Kn(e,t){const n={structuredQuery:{}},r=t.path;null!==t.collectionGroup?(n.parent=Un(e,r),n.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(n.parent=Un(e,r.popLast()),n.structuredQuery.from=[{collectionId:r.lastSegment()}]);const i=function(e){if(0===e.length)return;const t=e.map(e=>function(e){if("=="===e.op){if(Re(e.value))return{unaryFilter:{field:er(e.field),op:"IS_NAN"}};if(xe(e.value))return{unaryFilter:{field:er(e.field),op:"IS_NULL"}}}else if("!="===e.op){if(Re(e.value))return{unaryFilter:{field:er(e.field),op:"IS_NOT_NAN"}};if(xe(e.value))return{unaryFilter:{field:er(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:er(e.field),op:Zn(e.op),value:e.value}}}(e));return 1===t.length?t[0]:{compositeFilter:{op:"AND",filters:t}}}(t.filters);i&&(n.structuredQuery.where=i);const s=function(e){if(0!==e.length)return e.map(e=>function(e){return{field:er(e.field),direction:Jn(e.dir)}}(e))}(t.orderBy);s&&(n.structuredQuery.orderBy=s);const o=function(e,t){return e.dt||ve(t)?t:{value:t}}(e,t.limit);var a;return null!==o&&(n.structuredQuery.limit=o),t.startAt&&(n.structuredQuery.startAt={before:(a=t.startAt).inclusive,values:a.position}),t.endAt&&(n.structuredQuery.endAt=function(e){return{before:!e.inclusive,values:e.position}}(t.endAt)),n}function Yn(e){let t=Vn(e.parent);const n=e.structuredQuery,r=n.from?n.from.length:0;let i=null;if(r>0){y(1===r);const e=n.from[0];e.allDescendants?i=e.collectionId:t=t.child(e.collectionId)}let s=[];n.where&&(s=Xn(n.where));let o=[];n.orderBy&&(o=n.orderBy.map(e=>function(e){return new et(tr(e.field),function(e){switch(e){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(e.direction))}(e)));let a=null;n.limit&&(a=function(e){let t;return t="object"==typeof e?e.value:e,ve(t)?null:t}(n.limit));let c=null;n.startAt&&(c=function(e){const t=!!e.before,n=e.values||[];return new Ze(n,t)}(n.startAt));let l=null;return n.endAt&&(l=function(e){const t=!e.before,n=e.values||[];return new Ze(n,t)}(n.endAt)),st(t,i,o,s,a,"F",c,l)}function Qn(e,t){const n=function(e,t){switch(t){case 0:return null;case 1:return"existence-filter-mismatch";case 2:return"limbo-document";default:return v()}}(0,t.purpose);return null==n?null:{"goog-listen-tags":n}}function Xn(e){return e?void 0!==e.unaryFilter?[rr(e)]:void 0!==e.fieldFilter?[nr(e)]:void 0!==e.compositeFilter?e.compositeFilter.filters.map(e=>Xn(e)).reduce((e,t)=>e.concat(t)):v():[]}function Jn(e){return Cn[e]}function Zn(e){return An[e]}function er(e){return{fieldPath:e.canonicalString()}}function tr(e){return U.fromServerFormat(e.fieldPath)}function nr(e){return qe.create(tr(e.fieldFilter.field),function(e){switch(e){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return v()}}(e.fieldFilter.op),e.fieldFilter.value)}function rr(e){switch(e.unaryFilter.op){case"IS_NAN":const t=tr(e.unaryFilter.field);return qe.create(t,"==",{doubleValue:NaN});case"IS_NULL":const n=tr(e.unaryFilter.field);return qe.create(n,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const r=tr(e.unaryFilter.field);return qe.create(r,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const i=tr(e.unaryFilter.field);return qe.create(i,"!=",{nullValue:"NULL_VALUE"});default:return v()}}function ir(e){const t=[];return e.fields.forEach(e=>t.push(e.canonicalString())),{fieldPaths:t}}function sr(e){return e.length>=4&&"projects"===e.get(0)&&"databases"===e.get(2)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const or=["mutationQueues","mutations","documentMutations","remoteDocuments","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries"],ar=["mutationQueues","mutations","documentMutations","remoteDocumentsV14","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries","documentOverlays"],cr=ar;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class lr{constructor(e,t,n,r){this.batchId=e,this.localWriteTime=t,this.baseMutations=n,this.mutations=r}applyToRemoteDocument(e,t){const n=t.mutationResults;for(let r=0;r<this.mutations.length;r++){const t=this.mutations[r];t.key.isEqual(e.key)&&zt(t,e,n[r])}}applyToLocalView(e,t){for(const n of this.baseMutations)n.key.isEqual(e.key)&&(t=$t(n,e,t,this.localWriteTime));for(const n of this.mutations)n.key.isEqual(e.key)&&(t=$t(n,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const n=dn();return this.mutations.forEach(r=>{const i=e.get(r.key),s=i.overlayedDocument;let o=this.applyToLocalView(s,i.mutatedFields);o=t.has(r.key)?null:o;const a=Bt(s,o);null!==a&&n.set(r.key,a),s.isValidDocument()||s.convertToNoDocument(D.min())}),n}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),mn())}isEqual(e){return this.batchId===e.batchId&&j(this.mutations,e.mutations,(e,t)=>Ht(e,t))&&j(this.baseMutations,e.baseMutations,(e,t)=>Ht(e,t))}}class ur{constructor(e,t,n,r){this.batch=e,this.commitVersion=t,this.mutationResults=n,this.docVersions=r}static from(e,t,n){y(e.mutations.length===n.length);let r=pn;const i=e.mutations;for(let s=0;s<i.length;s++)r=r.insert(i[s].key,n[s].version);return new ur(e,t,n,r)}}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hr{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return null!==e&&this.mutation===e.mutation}toString(){return`Overlay{\n      largestBatchId: ${this.largestBatchId},\n      mutation: ${this.mutation.toString()}\n    }`}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dr{constructor(e,t,n,r,i=D.min(),s=D.min(),o=ae.EMPTY_BYTE_STRING){this.target=e,this.targetId=t,this.purpose=n,this.sequenceNumber=r,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=s,this.resumeToken=o}withSequenceNumber(e){return new dr(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken)}withResumeToken(e,t){return new dr(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e)}withLastLimboFreeSnapshotVersion(e){return new dr(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fr{constructor(e){this.ne=e}}function pr(e){const t=Yn({parent:e.parent,structuredQuery:e.structuredQuery});return"LAST"===e.limitType?ft(t,t.limit,"L"):t}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class gr{constructor(){}re(e,t){this.oe(e,t),t.ue()}oe(e,t){if("nullValue"in e)this.ce(t,5);else if("booleanValue"in e)this.ce(t,10),t.ae(e.booleanValue?1:0);else if("integerValue"in e)this.ce(t,15),t.ae(ue(e.integerValue));else if("doubleValue"in e){const n=ue(e.doubleValue);isNaN(n)?this.ce(t,13):(this.ce(t,15),ye(n)?t.ae(0):t.ae(n))}else if("timestampValue"in e){const n=e.timestampValue;this.ce(t,20),"string"==typeof n?t.he(n):(t.he(""+(n.seconds||"")),t.ae(n.nanos||0))}else if("stringValue"in e)this.le(e.stringValue,t),this.fe(t);else if("bytesValue"in e)this.ce(t,30),t.de(he(e.bytesValue)),this.fe(t);else if("referenceValue"in e)this._e(e.referenceValue,t);else if("geoPointValue"in e){const n=e.geoPointValue;this.ce(t,45),t.ae(n.latitude||0),t.ae(n.longitude||0)}else"mapValue"in e?Le(e)?this.ce(t,Number.MAX_SAFE_INTEGER):(this.we(e.mapValue,t),this.fe(t)):"arrayValue"in e?(this.me(e.arrayValue,t),this.fe(t)):v()}le(e,t){this.ce(t,25),this.ge(e,t)}ge(e,t){t.he(e)}we(e,t){const n=e.fields||{};this.ce(t,55);for(const r of Object.keys(n))this.le(r,t),this.oe(n[r],t)}me(e,t){const n=e.values||[];this.ce(t,50);for(const r of n)this.oe(r,t)}_e(e,t){this.ce(t,37),V.fromName(e).path.forEach(e=>{this.ce(t,60),this.ge(e,t)})}ce(e,t){e.ae(t)}fe(e){e.ae(2)}}gr.ye=new gr;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class mr{constructor(){this.ze=new vr}addToCollectionParentIndex(e,t){return this.ze.add(t),Y.resolve()}getCollectionParents(e,t){return Y.resolve(this.ze.getEntries(t))}addFieldIndex(e,t){return Y.resolve()}deleteFieldIndex(e,t){return Y.resolve()}getDocumentsMatchingTarget(e,t){return Y.resolve(null)}getIndexType(e,t){return Y.resolve(0)}getFieldIndexes(e,t){return Y.resolve([])}getNextCollectionGroupToUpdate(e){return Y.resolve(null)}getMinOffset(e,t){return Y.resolve(q.min())}getMinOffsetFromCollectionGroup(e,t){return Y.resolve(q.min())}updateCollectionGroup(e,t,n){return Y.resolve()}updateIndexEntries(e,t){return Y.resolve()}}class vr{constructor(){this.index={}}add(e){const t=e.lastSegment(),n=e.popLast(),r=this.index[t]||new ie(M.comparator),i=!r.has(n);return this.index[t]=r.add(n),i}has(e){const t=e.lastSegment(),n=e.popLast(),r=this.index[t];return r&&r.has(n)}getEntries(e){return(this.index[e]||new ie(M.comparator)).toArray()}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */new Uint8Array(0);class yr{constructor(e,t,n){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=n}static withCacheSize(e){return new yr(e,yr.DEFAULT_COLLECTION_PERCENTILE,yr.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */yr.DEFAULT_COLLECTION_PERCENTILE=10,yr.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,yr.DEFAULT=new yr(41943040,yr.DEFAULT_COLLECTION_PERCENTILE,yr.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),yr.DISABLED=new yr(-1,0,0);
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class br{constructor(e){this.En=e}next(){return this.En+=2,this.En}static An(){return new br(0)}static Rn(){return new br(-1)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class wr{constructor(){this.changes=new sn(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Me.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const n=this.changes.get(t);return void 0!==n?Y.resolve(n):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class _r{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Er{constructor(e,t,n,r){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=n,this.indexManager=r}getDocument(e,t){let n=null;return this.documentOverlayCache.getOverlay(e,t).next(r=>(n=r,this.getBaseDocument(e,t,n))).next(e=>(null!==n&&$t(n.mutation,e,oe.empty(),L.now()),e))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(t=>this.getLocalViewOfDocuments(e,t,mn()).next(()=>t))}getLocalViewOfDocuments(e,t,n=mn()){const r=hn();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,n).next(e=>{let t=ln();return e.forEach((e,n)=>{t=t.insert(e,n.overlayedDocument)}),t}))}getOverlayedDocuments(e,t){const n=hn();return this.populateOverlays(e,n,t).next(()=>this.computeViews(e,t,n,mn()))}populateOverlays(e,t,n){const r=[];return n.forEach(e=>{t.has(e)||r.push(e)}),this.documentOverlayCache.getOverlays(e,r).next(e=>{e.forEach((e,n)=>{t.set(e,n)})})}computeViews(e,t,n,r){let i=an();const s=fn(),o=fn();return t.forEach((e,t)=>{const o=n.get(t.key);r.has(t.key)&&(void 0===o||o.mutation instanceof Gt)?i=i.insert(t.key,t):void 0!==o&&(s.set(t.key,o.mutation.getFieldMask()),$t(o.mutation,t,o.mutation.getFieldMask(),L.now()))}),this.recalculateAndSaveOverlays(e,i).next(e=>(e.forEach((e,t)=>s.set(e,t)),t.forEach((e,t)=>{var n;return o.set(e,new _r(t,null!==(n=s.get(e))&&void 0!==n?n:null))}),o))}recalculateAndSaveOverlays(e,t){const n=fn();let r=new te((e,t)=>e-t),i=mn();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(e=>{for(const i of e)i.keys().forEach(e=>{const s=t.get(e);if(null===s)return;let o=n.get(e)||oe.empty();o=i.applyToLocalView(s,o),n.set(e,o);const a=(r.get(i.batchId)||mn()).add(e);r=r.insert(i.batchId,a)})}).next(()=>{const s=[],o=r.getReverseIterator();for(;o.hasNext();){const r=o.getNext(),a=r.key,c=r.value,l=dn();c.forEach(e=>{if(!i.has(e)){const r=Bt(t.get(e),n.get(e));null!==r&&l.set(e,r),i=i.add(e)}}),s.push(this.documentOverlayCache.saveOverlays(e,a,l))}return Y.waitFor(s)}).next(()=>n)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(t=>this.recalculateAndSaveOverlays(e,t))}getDocumentsMatchingQuery(e,t,n){return function(e){return V.isDocumentKey(e.path)&&null===e.collectionGroup&&0===e.filters.length}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):ut(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,n):this.getDocumentsMatchingCollectionQuery(e,t,n)}getNextDocuments(e,t,n,r){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,n,r).next(i=>{const s=r-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,n.largestBatchId,r-i.size):Y.resolve(hn());let o=-1,a=i;return s.next(t=>Y.forEach(t,(t,n)=>(o<n.largestBatchId&&(o=n.largestBatchId),i.get(t)?Y.resolve():this.getBaseDocument(e,t,n).next(e=>{a=a.insert(t,e)}))).next(()=>this.populateOverlays(e,t,i)).next(()=>this.computeViews(e,a,t,mn())).next(e=>({batchId:o,changes:un(e)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new V(t)).next(e=>{let t=ln();return e.isFoundDocument()&&(t=t.insert(e.key,e)),t})}getDocumentsMatchingCollectionGroupQuery(e,t,n){const r=t.collectionGroup;let i=ln();return this.indexManager.getCollectionParents(e,r).next(s=>Y.forEach(s,s=>{const o=function(e,t){return new it(t,null,e.explicitOrderBy.slice(),e.filters.slice(),e.limit,e.limitType,e.startAt,e.endAt)}(t,s.child(r));return this.getDocumentsMatchingCollectionQuery(e,o,n).next(e=>{e.forEach((e,t)=>{i=i.insert(e,t)})})}).next(()=>i))}getDocumentsMatchingCollectionQuery(e,t,n){let r;return this.remoteDocumentCache.getAllFromCollection(e,t.path,n).next(i=>(r=i,this.documentOverlayCache.getOverlaysForCollection(e,t.path,n.largestBatchId))).next(e=>{e.forEach((e,t)=>{const n=t.getKey();null===r.get(n)&&(r=r.insert(n,Me.newInvalidDocument(n)))});let n=ln();return r.forEach((r,i)=>{const s=e.get(r);void 0!==s&&$t(s.mutation,i,oe.empty(),L.now()),vt(t,i)&&(n=n.insert(r,i))}),n})}getBaseDocument(e,t,n){return null===n||1===n.mutation.type?this.remoteDocumentCache.getEntry(e,t):Y.resolve(Me.newInvalidDocument(t))}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Or{constructor(e){this.wt=e,this.Jn=new Map,this.Yn=new Map}getBundleMetadata(e,t){return Y.resolve(this.Jn.get(t))}saveBundleMetadata(e,t){var n;return this.Jn.set(t.id,{id:(n=t).id,version:n.version,createTime:Ln(n.createTime)}),Y.resolve()}getNamedQuery(e,t){return Y.resolve(this.Yn.get(t))}saveNamedQuery(e,t){return this.Yn.set(t.name,function(e){return{name:e.name,query:pr(e.bundledQuery),readTime:Ln(e.readTime)}}(t)),Y.resolve()}}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tr{constructor(){this.overlays=new te(V.comparator),this.Xn=new Map}getOverlay(e,t){return Y.resolve(this.overlays.get(t))}getOverlays(e,t){const n=hn();return Y.forEach(t,t=>this.getOverlay(e,t).next(e=>{null!==e&&n.set(t,e)})).next(()=>n)}saveOverlays(e,t,n){return n.forEach((n,r)=>{this.ie(e,t,r)}),Y.resolve()}removeOverlaysForBatchId(e,t,n){const r=this.Xn.get(n);return void 0!==r&&(r.forEach(e=>this.overlays=this.overlays.remove(e)),this.Xn.delete(n)),Y.resolve()}getOverlaysForCollection(e,t,n){const r=hn(),i=t.length+1,s=new V(t.child("")),o=this.overlays.getIteratorFrom(s);for(;o.hasNext();){const e=o.getNext().value,s=e.getKey();if(!t.isPrefixOf(s.path))break;s.path.length===i&&e.largestBatchId>n&&r.set(e.getKey(),e)}return Y.resolve(r)}getOverlaysForCollectionGroup(e,t,n,r){let i=new te((e,t)=>e-t);const s=this.overlays.getIterator();for(;s.hasNext();){const e=s.getNext().value;if(e.getKey().getCollectionGroup()===t&&e.largestBatchId>n){let t=i.get(e.largestBatchId);null===t&&(t=hn(),i=i.insert(e.largestBatchId,t)),t.set(e.getKey(),e)}}const o=hn(),a=i.getIterator();for(;a.hasNext();)if(a.getNext().value.forEach((e,t)=>o.set(e,t)),o.size()>=r)break;return Y.resolve(o)}ie(e,t,n){const r=this.overlays.get(n.key);if(null!==r){const e=this.Xn.get(r.largestBatchId).delete(n.key);this.Xn.set(r.largestBatchId,e)}this.overlays=this.overlays.insert(n.key,new hr(t,n));let i=this.Xn.get(t);void 0===i&&(i=mn(),this.Xn.set(t,i)),this.Xn.set(t,i.add(n.key))}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ir{constructor(){this.Zn=new ie(Sr.ts),this.es=new ie(Sr.ns)}isEmpty(){return this.Zn.isEmpty()}addReference(e,t){const n=new Sr(e,t);this.Zn=this.Zn.add(n),this.es=this.es.add(n)}ss(e,t){e.forEach(e=>this.addReference(e,t))}removeReference(e,t){this.rs(new Sr(e,t))}os(e,t){e.forEach(e=>this.removeReference(e,t))}us(e){const t=new V(new M([])),n=new Sr(t,e),r=new Sr(t,e+1),i=[];return this.es.forEachInRange([n,r],e=>{this.rs(e),i.push(e.key)}),i}cs(){this.Zn.forEach(e=>this.rs(e))}rs(e){this.Zn=this.Zn.delete(e),this.es=this.es.delete(e)}hs(e){const t=new V(new M([])),n=new Sr(t,e),r=new Sr(t,e+1);let i=mn();return this.es.forEachInRange([n,r],e=>{i=i.add(e.key)}),i}containsKey(e){const t=new Sr(e,0),n=this.Zn.firstAfterOrEqual(t);return null!==n&&e.isEqual(n.key)}}class Sr{constructor(e,t){this.key=e,this.ls=t}static ts(e,t){return V.comparator(e.key,t.key)||N(e.ls,t.ls)}static ns(e,t){return N(e.ls,t.ls)||V.comparator(e.key,t.key)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kr{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.fs=1,this.ds=new ie(Sr.ts)}checkEmpty(e){return Y.resolve(0===this.mutationQueue.length)}addMutationBatch(e,t,n,r){const i=this.fs;this.fs++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const s=new lr(i,t,n,r);this.mutationQueue.push(s);for(const o of r)this.ds=this.ds.add(new Sr(o.key,i)),this.indexManager.addToCollectionParentIndex(e,o.key.path.popLast());return Y.resolve(s)}lookupMutationBatch(e,t){return Y.resolve(this._s(t))}getNextMutationBatchAfterBatchId(e,t){const n=t+1,r=this.ws(n),i=r<0?0:r;return Y.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return Y.resolve(0===this.mutationQueue.length?-1:this.fs-1)}getAllMutationBatches(e){return Y.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const n=new Sr(t,0),r=new Sr(t,Number.POSITIVE_INFINITY),i=[];return this.ds.forEachInRange([n,r],e=>{const t=this._s(e.ls);i.push(t)}),Y.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new ie(N);return t.forEach(e=>{const t=new Sr(e,0),r=new Sr(e,Number.POSITIVE_INFINITY);this.ds.forEachInRange([t,r],e=>{n=n.add(e.ls)})}),Y.resolve(this.gs(n))}getAllMutationBatchesAffectingQuery(e,t){const n=t.path,r=n.length+1;let i=n;V.isDocumentKey(i)||(i=i.child(""));const s=new Sr(new V(i),0);let o=new ie(N);return this.ds.forEachWhile(e=>{const t=e.key.path;return!!n.isPrefixOf(t)&&(t.length===r&&(o=o.add(e.ls)),!0)},s),Y.resolve(this.gs(o))}gs(e){const t=[];return e.forEach(e=>{const n=this._s(e);null!==n&&t.push(n)}),t}removeMutationBatch(e,t){y(0===this.ys(t.batchId,"removed")),this.mutationQueue.shift();let n=this.ds;return Y.forEach(t.mutations,r=>{const i=new Sr(r.key,t.batchId);return n=n.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,r.key)}).next(()=>{this.ds=n})}In(e){}containsKey(e,t){const n=new Sr(t,0),r=this.ds.firstAfterOrEqual(n);return Y.resolve(t.isEqual(r&&r.key))}performConsistencyCheck(e){return this.mutationQueue.length,Y.resolve()}ys(e,t){return this.ws(e)}ws(e){return 0===this.mutationQueue.length?0:e-this.mutationQueue[0].batchId}_s(e){const t=this.ws(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cr{constructor(e){this.ps=e,this.docs=new te(V.comparator),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const n=t.key,r=this.docs.get(n),i=r?r.size:0,s=this.ps(t);return this.docs=this.docs.insert(n,{document:t.mutableCopy(),size:s}),this.size+=s-i,this.indexManager.addToCollectionParentIndex(e,n.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const n=this.docs.get(t);return Y.resolve(n?n.document.mutableCopy():Me.newInvalidDocument(t))}getEntries(e,t){let n=an();return t.forEach(e=>{const t=this.docs.get(e);n=n.insert(e,t?t.document.mutableCopy():Me.newInvalidDocument(e))}),Y.resolve(n)}getAllFromCollection(e,t,n){let r=an();const i=new V(t.child("")),s=this.docs.getIteratorFrom(i);for(;s.hasNext();){const{key:e,value:{document:i}}=s.getNext();if(!t.isPrefixOf(e.path))break;e.path.length>t.length+1||H($(i),n)<=0||(r=r.insert(i.key,i.mutableCopy()))}return Y.resolve(r)}getAllFromCollectionGroup(e,t,n,r){v()}Is(e,t){return Y.forEach(this.docs,e=>t(e))}newChangeBuffer(e){return new Ar(this)}getSize(e){return Y.resolve(this.size)}}class Ar extends wr{constructor(e){super(),this.zn=e}applyChanges(e){const t=[];return this.changes.forEach((n,r)=>{r.isValidDocument()?t.push(this.zn.addEntry(e,r)):this.zn.removeEntry(n)}),Y.waitFor(t)}getFromCache(e,t){return this.zn.getEntry(e,t)}getAllFromCache(e,t){return this.zn.getEntries(e,t)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xr{constructor(e){this.persistence=e,this.Ts=new sn(e=>Ve(e),ze),this.lastRemoteSnapshotVersion=D.min(),this.highestTargetId=0,this.Es=0,this.As=new Ir,this.targetCount=0,this.Rs=br.An()}forEachTarget(e,t){return this.Ts.forEach((e,n)=>t(n)),Y.resolve()}getLastRemoteSnapshotVersion(e){return Y.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return Y.resolve(this.Es)}allocateTargetId(e){return this.highestTargetId=this.Rs.next(),Y.resolve(this.highestTargetId)}setTargetsMetadata(e,t,n){return n&&(this.lastRemoteSnapshotVersion=n),t>this.Es&&(this.Es=t),Y.resolve()}vn(e){this.Ts.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.Rs=new br(t),this.highestTargetId=t),e.sequenceNumber>this.Es&&(this.Es=e.sequenceNumber)}addTargetData(e,t){return this.vn(t),this.targetCount+=1,Y.resolve()}updateTargetData(e,t){return this.vn(t),Y.resolve()}removeTargetData(e,t){return this.Ts.delete(t.target),this.As.us(t.targetId),this.targetCount-=1,Y.resolve()}removeTargets(e,t,n){let r=0;const i=[];return this.Ts.forEach((s,o)=>{o.sequenceNumber<=t&&null===n.get(o.targetId)&&(this.Ts.delete(s),i.push(this.removeMatchingKeysForTargetId(e,o.targetId)),r++)}),Y.waitFor(i).next(()=>r)}getTargetCount(e){return Y.resolve(this.targetCount)}getTargetData(e,t){const n=this.Ts.get(t)||null;return Y.resolve(n)}addMatchingKeys(e,t,n){return this.As.ss(t,n),Y.resolve()}removeMatchingKeys(e,t,n){this.As.os(t,n);const r=this.persistence.referenceDelegate,i=[];return r&&t.forEach(t=>{i.push(r.markPotentiallyOrphaned(e,t))}),Y.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this.As.us(t),Y.resolve()}getMatchingKeysForTargetId(e,t){const n=this.As.hs(t);return Y.resolve(n)}containsKey(e,t){return Y.resolve(this.As.containsKey(t))}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rr{constructor(e,t){this.bs={},this.overlays={},this.Ps=new X(0),this.vs=!1,this.vs=!0,this.referenceDelegate=e(this),this.Vs=new xr(this),this.indexManager=new mr,this.remoteDocumentCache=function(e){return new Cr(e)}(e=>this.referenceDelegate.Ss(e)),this.wt=new fr(t),this.Ds=new Or(this.wt)}start(){return Promise.resolve()}shutdown(){return this.vs=!1,Promise.resolve()}get started(){return this.vs}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new Tr,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let n=this.bs[e.toKey()];return n||(n=new kr(t,this.referenceDelegate),this.bs[e.toKey()]=n),n}getTargetCache(){return this.Vs}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ds}runTransaction(e,t,n){f("MemoryPersistence","Starting transaction:",e);const r=new Nr(this.Ps.next());return this.referenceDelegate.Cs(),n(r).next(e=>this.referenceDelegate.xs(r).next(()=>e)).toPromise().then(e=>(r.raiseOnCommittedEvent(),e))}Ns(e,t){return Y.or(Object.values(this.bs).map(n=>()=>n.containsKey(e,t)))}}class Nr extends G{constructor(e){super(),this.currentSequenceNumber=e}}class jr{constructor(e){this.persistence=e,this.ks=new Ir,this.Ms=null}static Os(e){return new jr(e)}get Fs(){if(this.Ms)return this.Ms;throw v()}addReference(e,t,n){return this.ks.addReference(n,t),this.Fs.delete(n.toString()),Y.resolve()}removeReference(e,t,n){return this.ks.removeReference(n,t),this.Fs.add(n.toString()),Y.resolve()}markPotentiallyOrphaned(e,t){return this.Fs.add(t.toString()),Y.resolve()}removeTarget(e,t){this.ks.us(t.targetId).forEach(e=>this.Fs.add(e.toString()));const n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(e,t.targetId).next(e=>{e.forEach(e=>this.Fs.add(e.toString()))}).next(()=>n.removeTargetData(e,t))}Cs(){this.Ms=new Set}xs(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return Y.forEach(this.Fs,n=>{const r=V.fromPath(n);return this.$s(e,r).next(e=>{e||t.removeEntry(r,D.min())})}).next(()=>(this.Ms=null,t.apply(e)))}updateLimboDocument(e,t){return this.$s(e,t).next(e=>{e?this.Fs.delete(t.toString()):this.Fs.add(t.toString())})}Ss(e){return 0}$s(e,t){return Y.or([()=>Y.resolve(this.ks.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ns(e,t)])}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Lr{constructor(e,t,n,r){this.targetId=e,this.fromCache=t,this.Pi=n,this.vi=r}static Vi(e,t){let n=mn(),r=mn();for(const i of t.docChanges)switch(i.type){case 0:n=n.add(i.doc.key);break;case 1:r=r.add(i.doc.key)}return new Lr(e,t.fromCache,n,r)}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dr{constructor(){this.Si=!1}initialize(e,t){this.Di=e,this.indexManager=t,this.Si=!0}getDocumentsMatchingQuery(e,t,n,r){return this.Ci(e,t).next(i=>i||this.xi(e,t,r,n)).next(n=>n||this.Ni(e,t))}Ci(e,t){if(at(t))return Y.resolve(null);let n=dt(t);return this.indexManager.getIndexType(e,n).next(r=>0===r?null:(null!==t.limit&&1===r&&(t=ft(t,null,"F"),n=dt(t)),this.indexManager.getDocumentsMatchingTarget(e,n).next(r=>{const i=mn(...r);return this.Di.getDocuments(e,i).next(r=>this.indexManager.getMinOffset(e,n).next(n=>{const s=this.ki(t,r);return this.Mi(t,s,i,n.readTime)?this.Ci(e,ft(t,null,"F")):this.Oi(e,s,t,n)}))})))}xi(e,t,n,r){return at(t)||r.isEqual(D.min())?this.Ni(e,t):this.Di.getDocuments(e,n).next(i=>{const o=this.ki(t,i);return this.Mi(t,o,n,r)?this.Ni(e,t):(d()<=s["a"].DEBUG&&f("QueryEngine","Re-using previous result from %s to execute query: %s",r.toString(),mt(t)),this.Oi(e,o,t,z(r,-1)))})}ki(e,t){let n=new ie(bt(e));return t.forEach((t,r)=>{vt(e,r)&&(n=n.add(r))}),n}Mi(e,t,n,r){if(null===e.limit)return!1;if(n.size!==t.size)return!0;const i="F"===e.limitType?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(r)>0)}Ni(e,t){return d()<=s["a"].DEBUG&&f("QueryEngine","Using full collection scan to execute query:",mt(t)),this.Di.getDocumentsMatchingQuery(e,t,q.min())}Oi(e,t,n,r){return this.Di.getDocumentsMatchingQuery(e,n,r).next(e=>(t.forEach(t=>{e=e.insert(t.key,t)}),e))}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pr{constructor(e,t,n,r){this.persistence=e,this.Fi=t,this.wt=r,this.$i=new te(N),this.Bi=new sn(e=>Ve(e),ze),this.Li=new Map,this.Ui=e.getRemoteDocumentCache(),this.Vs=e.getTargetCache(),this.Ds=e.getBundleCache(),this.qi(n)}qi(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new Er(this.Ui,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Ui.setIndexManager(this.indexManager),this.Fi.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.$i))}}function Mr(e,t,n,r){return new Pr(e,t,n,r)}async function Fr(e,t){const n=b(e);return await n.persistence.runTransaction("Handle user change","readonly",e=>{let r;return n.mutationQueue.getAllMutationBatches(e).next(i=>(r=i,n.qi(t),n.mutationQueue.getAllMutationBatches(e))).next(t=>{const i=[],s=[];let o=mn();for(const e of r){i.push(e.batchId);for(const t of e.mutations)o=o.add(t.key)}for(const e of t){s.push(e.batchId);for(const t of e.mutations)o=o.add(t.key)}return n.localDocuments.getDocuments(e,o).next(e=>({Ki:e,removedBatchIds:i,addedBatchIds:s}))})})}function Ur(e,t){const n=b(e);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",e=>{const r=t.batch.keys(),i=n.Ui.newChangeBuffer({trackRemovals:!0});return function(e,t,n,r){const i=n.batch,s=i.keys();let o=Y.resolve();return s.forEach(e=>{o=o.next(()=>r.getEntry(t,e)).next(t=>{const s=n.docVersions.get(e);y(null!==s),t.version.compareTo(s)<0&&(i.applyToRemoteDocument(t,n),t.isValidDocument()&&(t.setReadTime(n.commitVersion),r.addEntry(t)))})}),o.next(()=>e.mutationQueue.removeMutationBatch(t,i))}(n,e,t,i).next(()=>i.apply(e)).next(()=>n.mutationQueue.performConsistencyCheck(e)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(e,r,t.batch.batchId)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(e,function(e){let t=mn();for(let n=0;n<e.mutationResults.length;++n)e.mutationResults[n].transformResults.length>0&&(t=t.add(e.batch.mutations[n].key));return t}(t))).next(()=>n.localDocuments.getDocuments(e,r))})}function Vr(e){const t=b(e);return t.persistence.runTransaction("Get last remote snapshot version","readonly",e=>t.Vs.getLastRemoteSnapshotVersion(e))}function Br(e,t){const n=b(e),r=t.snapshotVersion;let i=n.$i;return n.persistence.runTransaction("Apply remote event","readwrite-primary",e=>{const s=n.Ui.newChangeBuffer({trackRemovals:!0});i=n.$i;const o=[];t.targetChanges.forEach((s,a)=>{const c=i.get(a);if(!c)return;o.push(n.Vs.removeMatchingKeys(e,s.removedDocuments,a).next(()=>n.Vs.addMatchingKeys(e,s.addedDocuments,a)));let l=c.withSequenceNumber(e.currentSequenceNumber);t.targetMismatches.has(a)?l=l.withResumeToken(ae.EMPTY_BYTE_STRING,D.min()).withLastLimboFreeSnapshotVersion(D.min()):s.resumeToken.approximateByteSize()>0&&(l=l.withResumeToken(s.resumeToken,r)),i=i.insert(a,l),function(e,t,n){return 0===e.resumeToken.approximateByteSize()||(t.snapshotVersion.toMicroseconds()-e.snapshotVersion.toMicroseconds()>=3e8||n.addedDocuments.size+n.modifiedDocuments.size+n.removedDocuments.size>0)}(c,l,s)&&o.push(n.Vs.updateTargetData(e,l))});let a=an(),c=mn();if(t.documentUpdates.forEach(r=>{t.resolvedLimboDocuments.has(r)&&o.push(n.persistence.referenceDelegate.updateLimboDocument(e,r))}),o.push(zr(e,s,t.documentUpdates).next(e=>{a=e.Gi,c=e.Qi})),!r.isEqual(D.min())){const t=n.Vs.getLastRemoteSnapshotVersion(e).next(t=>n.Vs.setTargetsMetadata(e,e.currentSequenceNumber,r));o.push(t)}return Y.waitFor(o).next(()=>s.apply(e)).next(()=>n.localDocuments.getLocalViewOfDocuments(e,a,c)).next(()=>a)}).then(e=>(n.$i=i,e))}function zr(e,t,n){let r=mn(),i=mn();return n.forEach(e=>r=r.add(e)),t.getEntries(e,r).next(e=>{let r=an();return n.forEach((n,s)=>{const o=e.get(n);s.isFoundDocument()!==o.isFoundDocument()&&(i=i.add(n)),s.isNoDocument()&&s.version.isEqual(D.min())?(t.removeEntry(n,s.readTime),r=r.insert(n,s)):!o.isValidDocument()||s.version.compareTo(o.version)>0||0===s.version.compareTo(o.version)&&o.hasPendingWrites?(t.addEntry(s),r=r.insert(n,s)):f("LocalStore","Ignoring outdated watch update for ",n,". Current version:",o.version," Watch version:",s.version)}),{Gi:r,Qi:i}})}function $r(e,t){const n=b(e);return n.persistence.runTransaction("Get next mutation batch","readonly",e=>(void 0===t&&(t=-1),n.mutationQueue.getNextMutationBatchAfterBatchId(e,t)))}function qr(e,t){const n=b(e);return n.persistence.runTransaction("Allocate target","readwrite",e=>{let r;return n.Vs.getTargetData(e,t).next(i=>i?(r=i,Y.resolve(r)):n.Vs.allocateTargetId(e).next(i=>(r=new dr(t,i,0,e.currentSequenceNumber),n.Vs.addTargetData(e,r).next(()=>r))))}).then(e=>{const r=n.$i.get(e.targetId);return(null===r||e.snapshotVersion.compareTo(r.snapshotVersion)>0)&&(n.$i=n.$i.insert(e.targetId,e),n.Bi.set(t,e.targetId)),e})}async function Hr(e,t,n){const r=b(e),i=r.$i.get(t),s=n?"readwrite":"readwrite-primary";try{n||await r.persistence.runTransaction("Release target",s,e=>r.persistence.referenceDelegate.removeTarget(e,i))}catch(e){if(!Q(e))throw e;f("LocalStore",`Failed to update sequence numbers for target ${t}: ${e}`)}r.$i=r.$i.remove(t),r.Bi.delete(i.target)}function Wr(e,t,n){const r=b(e);let i=D.min(),s=mn();return r.persistence.runTransaction("Execute query","readonly",e=>function(e,t,n){const r=b(e),i=r.Bi.get(n);return void 0!==i?Y.resolve(r.$i.get(i)):r.Vs.getTargetData(t,n)}(r,e,dt(t)).next(t=>{if(t)return i=t.lastLimboFreeSnapshotVersion,r.Vs.getMatchingKeysForTargetId(e,t.targetId).next(e=>{s=e})}).next(()=>r.Fi.getDocumentsMatchingQuery(e,t,n?i:D.min(),n?s:mn())).next(e=>(Gr(r,yt(t),e),{documents:e,ji:s})))}function Gr(e,t,n){let r=D.min();n.forEach((e,t)=>{t.readTime.compareTo(r)>0&&(r=t.readTime)}),e.Li.set(t,r)}class Kr{constructor(){this.activeTargetIds=yn()}Xi(e){this.activeTargetIds=this.activeTargetIds.add(e)}Zi(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Yi(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class Yr{constructor(){this.Fr=new Kr,this.$r={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,n){}addLocalQueryTarget(e){return this.Fr.Xi(e),this.$r[e]||"not-current"}updateQueryState(e,t,n){this.$r[e]=t}removeLocalQueryTarget(e){this.Fr.Zi(e)}isLocalQueryTarget(e){return this.Fr.activeTargetIds.has(e)}clearQueryState(e){delete this.$r[e]}getAllActiveQueryTargets(){return this.Fr.activeTargetIds}isActiveQueryTarget(e){return this.Fr.activeTargetIds.has(e)}start(){return this.Fr=new Kr,Promise.resolve()}handleUserChange(e,t,n){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qr{Br(e){}shutdown(){}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xr{constructor(){this.Lr=()=>this.Ur(),this.qr=()=>this.Kr(),this.Gr=[],this.Qr()}Br(e){this.Gr.push(e)}shutdown(){window.removeEventListener("online",this.Lr),window.removeEventListener("offline",this.qr)}Qr(){window.addEventListener("online",this.Lr),window.addEventListener("offline",this.qr)}Ur(){f("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const e of this.Gr)e(0)}Kr(){f("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const e of this.Gr)e(1)}static V(){return"undefined"!=typeof window&&void 0!==window.addEventListener&&void 0!==window.removeEventListener}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jr={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery"};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zr{constructor(e){this.jr=e.jr,this.Wr=e.Wr}zr(e){this.Hr=e}Jr(e){this.Yr=e}onMessage(e){this.Xr=e}close(){this.Wr()}send(e){this.jr(e)}Zr(){this.Hr()}eo(e){this.Yr(e)}no(e){this.Xr(e)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ei extends class{constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http";this.so=t+"://"+e.host,this.io="projects/"+this.databaseId.projectId+"/databases/"+this.databaseId.database+"/documents"}ro(e,t,n,r,i){const s=this.oo(e,t);f("RestConnection","Sending: ",s,n);const o={};return this.uo(o,r,i),this.co(e,s,o,n).then(e=>(f("RestConnection","Received: ",e),e),t=>{throw g("RestConnection",e+" failed with error: ",t,"url: ",s,"request:",n),t})}ao(e,t,n,r,i,s){return this.ro(e,t,n,r,i)}uo(e,t,n){e["X-Goog-Api-Client"]="gl-js/ fire/"+u,e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((t,n)=>e[n]=t),n&&n.headers.forEach((t,n)=>e[n]=t)}oo(e,t){const n=Jr[e];return`${this.so}/v1/${t}:${n}`}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams}co(e,t,n,r){return new Promise((i,s)=>{const o=new a["g"];o.listenOnce(a["c"].COMPLETE,()=>{try{switch(o.getLastErrorCode()){case a["a"].NO_ERROR:const t=o.getResponseJson();f("Connection","XHR received:",JSON.stringify(t)),i(t);break;case a["a"].TIMEOUT:f("Connection",'RPC "'+e+'" timed out'),s(new _(w.DEADLINE_EXCEEDED,"Request time out"));break;case a["a"].HTTP_ERROR:const n=o.getStatus();if(f("Connection",'RPC "'+e+'" failed with status:',n,"response text:",o.getResponseText()),n>0){const e=o.getResponseJson().error;if(e&&e.status&&e.message){const t=function(e){const t=e.toLowerCase().replace(/_/g,"-");return Object.values(w).indexOf(t)>=0?t:w.UNKNOWN}(e.status);s(new _(t,e.message))}else s(new _(w.UNKNOWN,"Server responded with status "+o.getStatus()))}else s(new _(w.UNAVAILABLE,"Connection failed."));break;default:v()}}finally{f("Connection",'RPC "'+e+'" completed.')}});const c=JSON.stringify(r);o.send(t,"POST",c,n,15)})}ho(e,t,n){const r=[this.so,"/","google.firestore.v1.Firestore","/",e,"/channel"],i=Object(a["h"])(),s=Object(a["i"])(),c={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling};this.useFetchStreams&&(c.xmlHttpFactory=new a["d"]({})),this.uo(c.initMessageHeaders,t,n),Object(o["t"])()||Object(o["v"])()||Object(o["p"])()||Object(o["r"])()||Object(o["x"])()||Object(o["o"])()||(c.httpHeadersOverwriteParam="$httpHeaders");const l=r.join("");f("Connection","Creating WebChannel: "+l,c);const u=i.createWebChannel(l,c);let h=!1,d=!1;const p=new Zr({jr:e=>{d?f("Connection","Not sending because WebChannel is closed:",e):(h||(f("Connection","Opening WebChannel transport."),u.open(),h=!0),f("Connection","WebChannel sending:",e),u.send(e))},Wr:()=>u.close()}),m=(e,t,n)=>{e.listen(t,e=>{try{n(e)}catch(e){setTimeout(()=>{throw e},0)}})};return m(u,a["f"].EventType.OPEN,()=>{d||f("Connection","WebChannel transport opened.")}),m(u,a["f"].EventType.CLOSE,()=>{d||(d=!0,f("Connection","WebChannel transport closed"),p.eo())}),m(u,a["f"].EventType.ERROR,e=>{d||(d=!0,g("Connection","WebChannel transport errored:",e),p.eo(new _(w.UNAVAILABLE,"The operation could not be completed")))}),m(u,a["f"].EventType.MESSAGE,e=>{var t;if(!d){const n=e.data[0];y(!!n);const r=n,i=r.error||(null===(t=r[0])||void 0===t?void 0:t.error);if(i){f("Connection","WebChannel received error:",i);const e=i.status;let t=function(e){const t=en[e];if(void 0!==t)return rn(t)}(e),n=i.message;void 0===t&&(t=w.INTERNAL,n="Unknown error status: "+e+" with message "+i.message),d=!0,p.eo(new _(t,n)),u.close()}else f("Connection","WebChannel received:",n),p.no(n)}}),m(s,a["b"].STAT_EVENT,e=>{e.stat===a["e"].PROXY?f("Connection","Detected buffering proxy"):e.stat===a["e"].NOPROXY&&f("Connection","Detected no buffering proxy")}),setTimeout(()=>{p.Zr()},0),p}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ti(){return"undefined"!=typeof document?document:null}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ni(e){return new xn(e,!0)}class ri{constructor(e,t,n=1e3,r=1.5,i=6e4){this.js=e,this.timerId=t,this.lo=n,this.fo=r,this._o=i,this.wo=0,this.mo=null,this.yo=Date.now(),this.reset()}reset(){this.wo=0}po(){this.wo=this._o}Io(e){this.cancel();const t=Math.floor(this.wo+this.To()),n=Math.max(0,Date.now()-this.yo),r=Math.max(0,t-n);r>0&&f("ExponentialBackoff",`Backing off for ${r} ms (base delay: ${this.wo} ms, delay with jitter: ${t} ms, last attempt: ${n} ms ago)`),this.mo=this.js.enqueueAfterDelay(this.timerId,r,()=>(this.yo=Date.now(),e())),this.wo*=this.fo,this.wo<this.lo&&(this.wo=this.lo),this.wo>this._o&&(this.wo=this._o)}Eo(){null!==this.mo&&(this.mo.skipDelay(),this.mo=null)}cancel(){null!==this.mo&&(this.mo.cancel(),this.mo=null)}To(){return(Math.random()-.5)*this.wo}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ii{constructor(e,t,n,r,i,s,o,a){this.js=e,this.Ao=n,this.Ro=r,this.bo=i,this.authCredentialsProvider=s,this.appCheckCredentialsProvider=o,this.listener=a,this.state=0,this.Po=0,this.vo=null,this.Vo=null,this.stream=null,this.So=new ri(e,t)}Do(){return 1===this.state||5===this.state||this.Co()}Co(){return 2===this.state||3===this.state}start(){4!==this.state?this.auth():this.xo()}async stop(){this.Do()&&await this.close(0)}No(){this.state=0,this.So.reset()}ko(){this.Co()&&null===this.vo&&(this.vo=this.js.enqueueAfterDelay(this.Ao,6e4,()=>this.Mo()))}Oo(e){this.Fo(),this.stream.send(e)}async Mo(){if(this.Co())return this.close(0)}Fo(){this.vo&&(this.vo.cancel(),this.vo=null)}$o(){this.Vo&&(this.Vo.cancel(),this.Vo=null)}async close(e,t){this.Fo(),this.$o(),this.So.cancel(),this.Po++,4!==e?this.So.reset():t&&t.code===w.RESOURCE_EXHAUSTED?(p(t.toString()),p("Using maximum backoff delay to prevent overloading the backend."),this.So.po()):t&&t.code===w.UNAUTHENTICATED&&3!==this.state&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),null!==this.stream&&(this.Bo(),this.stream.close(),this.stream=null),this.state=e,await this.listener.Jr(t)}Bo(){}auth(){this.state=1;const e=this.Lo(this.Po),t=this.Po;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([e,n])=>{this.Po===t&&this.Uo(e,n)},t=>{e(()=>{const e=new _(w.UNKNOWN,"Fetching auth token failed: "+t.message);return this.qo(e)})})}Uo(e,t){const n=this.Lo(this.Po);this.stream=this.Ko(e,t),this.stream.zr(()=>{n(()=>(this.state=2,this.Vo=this.js.enqueueAfterDelay(this.Ro,1e4,()=>(this.Co()&&(this.state=3),Promise.resolve())),this.listener.zr()))}),this.stream.Jr(e=>{n(()=>this.qo(e))}),this.stream.onMessage(e=>{n(()=>this.onMessage(e))})}xo(){this.state=5,this.So.Io(async()=>{this.state=0,this.start()})}qo(e){return f("PersistentStream","close with error: "+e),this.stream=null,this.close(4,e)}Lo(e){return t=>{this.js.enqueueAndForget(()=>this.Po===e?t():(f("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class si extends ii{constructor(e,t,n,r,i,s){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,n,r,s),this.wt=i}Ko(e,t){return this.bo.ho("Listen",e,t)}onMessage(e){this.So.reset();const t=qn(this.wt,e),n=function(e){if(!("targetChange"in e))return D.min();const t=e.targetChange;return t.targetIds&&t.targetIds.length?D.min():t.readTime?Ln(t.readTime):D.min()}(e);return this.listener.Go(t,n)}Qo(e){const t={};t.database=Bn(this.wt),t.addTarget=function(e,t){let n;const r=t.target;return n=$e(r)?{documents:Gn(e,r)}:{query:Kn(e,r)},n.targetId=t.targetId,t.resumeToken.approximateByteSize()>0?n.resumeToken=Nn(e,t.resumeToken):t.snapshotVersion.compareTo(D.min())>0&&(n.readTime=Rn(e,t.snapshotVersion.toTimestamp())),n}(this.wt,e);const n=Qn(this.wt,e);n&&(t.labels=n),this.Oo(t)}jo(e){const t={};t.database=Bn(this.wt),t.removeTarget=e,this.Oo(t)}}class oi extends ii{constructor(e,t,n,r,i,s){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,n,r,s),this.wt=i,this.Wo=!1}get zo(){return this.Wo}start(){this.Wo=!1,this.lastStreamToken=void 0,super.start()}Bo(){this.Wo&&this.Ho([])}Ko(e,t){return this.bo.ho("Write",e,t)}onMessage(e){if(y(!!e.streamToken),this.lastStreamToken=e.streamToken,this.Wo){this.So.reset();const t=Wn(e.writeResults,e.commitTime),n=Ln(e.commitTime);return this.listener.Jo(n,t)}return y(!e.writeResults||0===e.writeResults.length),this.Wo=!0,this.listener.Yo()}Xo(){const e={};e.database=Bn(this.wt),this.Oo(e)}Ho(e){const t={streamToken:this.lastStreamToken,writes:e.map(e=>Hn(this.wt,e))};this.Oo(t)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ai extends class{}{constructor(e,t,n,r){super(),this.authCredentials=e,this.appCheckCredentials=t,this.bo=n,this.wt=r,this.Zo=!1}tu(){if(this.Zo)throw new _(w.FAILED_PRECONDITION,"The client has already been terminated.")}ro(e,t,n){return this.tu(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([r,i])=>this.bo.ro(e,t,n,r,i)).catch(e=>{throw"FirebaseError"===e.name?(e.code===w.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),e):new _(w.UNKNOWN,e.toString())})}ao(e,t,n,r){return this.tu(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,s])=>this.bo.ao(e,t,n,i,s,r)).catch(e=>{throw"FirebaseError"===e.name?(e.code===w.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),e):new _(w.UNKNOWN,e.toString())})}terminate(){this.Zo=!0}}class ci{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.eu=0,this.nu=null,this.su=!0}iu(){0===this.eu&&(this.ru("Unknown"),this.nu=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.nu=null,this.ou("Backend didn't respond within 10 seconds."),this.ru("Offline"),Promise.resolve())))}uu(e){"Online"===this.state?this.ru("Unknown"):(this.eu++,this.eu>=1&&(this.cu(),this.ou("Connection failed 1 times. Most recent error: "+e.toString()),this.ru("Offline")))}set(e){this.cu(),this.eu=0,"Online"===e&&(this.su=!1),this.ru(e)}ru(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}ou(e){const t=`Could not reach Cloud Firestore backend. ${e}\nThis typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.su?(p(t),this.su=!1):f("OnlineStateTracker",t)}cu(){null!==this.nu&&(this.nu.cancel(),this.nu=null)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class li{constructor(e,t,n,r,i){this.localStore=e,this.datastore=t,this.asyncQueue=n,this.remoteSyncer={},this.au=[],this.hu=new Map,this.lu=new Set,this.fu=[],this.du=i,this.du.Br(e=>{n.enqueueAndForget(async()=>{yi(this)&&(f("RemoteStore","Restarting streams for network reachability change."),await async function(e){const t=b(e);t.lu.add(4),await hi(t),t._u.set("Unknown"),t.lu.delete(4),await ui(t)}(this))})}),this._u=new ci(n,r)}}async function ui(e){if(yi(e))for(const t of e.fu)await t(!0)}async function hi(e){for(const t of e.fu)await t(!1)}function di(e,t){const n=b(e);n.hu.has(t.targetId)||(n.hu.set(t.targetId,t),vi(n)?mi(n):Pi(n).Co()&&pi(n,t))}function fi(e,t){const n=b(e),r=Pi(n);n.hu.delete(t),r.Co()&&gi(n,t),0===n.hu.size&&(r.Co()?r.ko():yi(n)&&n._u.set("Unknown"))}function pi(e,t){e.wu.Nt(t.targetId),Pi(e).Qo(t)}function gi(e,t){e.wu.Nt(t),Pi(e).jo(t)}function mi(e){e.wu=new In({getRemoteKeysForTarget:t=>e.remoteSyncer.getRemoteKeysForTarget(t),te:t=>e.hu.get(t)||null}),Pi(e).start(),e._u.iu()}function vi(e){return yi(e)&&!Pi(e).Do()&&e.hu.size>0}function yi(e){return 0===b(e).lu.size}function bi(e){e.wu=void 0}async function wi(e){e.hu.forEach((t,n)=>{pi(e,t)})}async function _i(e,t){bi(e),vi(e)?(e._u.uu(t),mi(e)):e._u.set("Unknown")}async function Ei(e,t,n){if(e._u.set("Online"),t instanceof On&&2===t.state&&t.cause)try{await async function(e,t){const n=t.cause;for(const r of t.targetIds)e.hu.has(r)&&(await e.remoteSyncer.rejectListen(r,n),e.hu.delete(r),e.wu.removeTarget(r))}(e,t)}catch(n){f("RemoteStore","Failed to remove targets %s: %s ",t.targetIds.join(","),n),await Oi(e,n)}else if(t instanceof _n?e.wu.Ut(t):t instanceof En?e.wu.zt(t):e.wu.Gt(t),!n.isEqual(D.min()))try{const t=await Vr(e.localStore);n.compareTo(t)>=0&&await function(e,t){const n=e.wu.Yt(t);return n.targetChanges.forEach((n,r)=>{if(n.resumeToken.approximateByteSize()>0){const i=e.hu.get(r);i&&e.hu.set(r,i.withResumeToken(n.resumeToken,t))}}),n.targetMismatches.forEach(t=>{const n=e.hu.get(t);if(!n)return;e.hu.set(t,n.withResumeToken(ae.EMPTY_BYTE_STRING,n.snapshotVersion)),gi(e,t);const r=new dr(n.target,t,1,n.sequenceNumber);pi(e,r)}),e.remoteSyncer.applyRemoteEvent(n)}(e,n)}catch(t){f("RemoteStore","Failed to raise snapshot:",t),await Oi(e,t)}}async function Oi(e,t,n){if(!Q(t))throw t;e.lu.add(1),await hi(e),e._u.set("Offline"),n||(n=()=>Vr(e.localStore)),e.asyncQueue.enqueueRetryable(async()=>{f("RemoteStore","Retrying IndexedDB access"),await n(),e.lu.delete(1),await ui(e)})}function Ti(e,t){return t().catch(n=>Oi(e,n,t))}async function Ii(e){const t=b(e),n=Mi(t);let r=t.au.length>0?t.au[t.au.length-1].batchId:-1;for(;Si(t);)try{const e=await $r(t.localStore,r);if(null===e){0===t.au.length&&n.ko();break}r=e.batchId,ki(t,e)}catch(e){await Oi(t,e)}Ci(t)&&Ai(t)}function Si(e){return yi(e)&&e.au.length<10}function ki(e,t){e.au.push(t);const n=Mi(e);n.Co()&&n.zo&&n.Ho(t.mutations)}function Ci(e){return yi(e)&&!Mi(e).Do()&&e.au.length>0}function Ai(e){Mi(e).start()}async function xi(e){Mi(e).Xo()}async function Ri(e){const t=Mi(e);for(const n of e.au)t.Ho(n.mutations)}async function Ni(e,t,n){const r=e.au.shift(),i=ur.from(r,t,n);await Ti(e,()=>e.remoteSyncer.applySuccessfulWrite(i)),await Ii(e)}async function ji(e,t){t&&Mi(e).zo&&await async function(e,t){if(n=t.code,nn(n)&&n!==w.ABORTED){const n=e.au.shift();Mi(e).No(),await Ti(e,()=>e.remoteSyncer.rejectFailedWrite(n.batchId,t)),await Ii(e)}var n}(e,t),Ci(e)&&Ai(e)}async function Li(e,t){const n=b(e);n.asyncQueue.verifyOperationInProgress(),f("RemoteStore","RemoteStore received new credentials");const r=yi(n);n.lu.add(3),await hi(n),r&&n._u.set("Unknown"),await n.remoteSyncer.handleCredentialChange(t),n.lu.delete(3),await ui(n)}async function Di(e,t){const n=b(e);t?(n.lu.delete(2),await ui(n)):t||(n.lu.add(2),await hi(n),n._u.set("Unknown"))}function Pi(e){return e.mu||(e.mu=function(e,t,n){const r=b(e);return r.tu(),new si(t,r.bo,r.authCredentials,r.appCheckCredentials,r.wt,n)
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}(e.datastore,e.asyncQueue,{zr:wi.bind(null,e),Jr:_i.bind(null,e),Go:Ei.bind(null,e)}),e.fu.push(async t=>{t?(e.mu.No(),vi(e)?mi(e):e._u.set("Unknown")):(await e.mu.stop(),bi(e))})),e.mu}function Mi(e){return e.gu||(e.gu=function(e,t,n){const r=b(e);return r.tu(),new oi(t,r.bo,r.authCredentials,r.appCheckCredentials,r.wt,n)}(e.datastore,e.asyncQueue,{zr:xi.bind(null,e),Jr:ji.bind(null,e),Yo:Ri.bind(null,e),Jo:Ni.bind(null,e)}),e.fu.push(async t=>{t?(e.gu.No(),await Ii(e)):(await e.gu.stop(),e.au.length>0&&(f("RemoteStore",`Stopping write stream with ${e.au.length} pending writes`),e.au=[]))})),e.gu
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}class Fi{constructor(e,t,n,r,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=n,this.op=r,this.removalCallback=i,this.deferred=new E,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(e=>{})}static createAndSchedule(e,t,n,r,i){const s=Date.now()+n,o=new Fi(e,t,s,r,i);return o.start(n),o}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){null!==this.timerHandle&&(this.clearTimeout(),this.deferred.reject(new _(w.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>null!==this.timerHandle?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){null!==this.timerHandle&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Ui(e,t){if(p("AsyncQueue",`${t}: ${e}`),Q(e))return new _(w.UNAVAILABLE,`${t}: ${e}`);throw e}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vi{constructor(e){this.comparator=e?(t,n)=>e(t,n)||V.comparator(t.key,n.key):(e,t)=>V.comparator(e.key,t.key),this.keyedMap=ln(),this.sortedSet=new te(this.comparator)}static emptySet(e){return new Vi(e.comparator)}has(e){return null!=this.keyedMap.get(e)}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,n)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof Vi))return!1;if(this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),n=e.sortedSet.getIterator();for(;t.hasNext();){const e=t.getNext().key,r=n.getNext().key;if(!e.isEqual(r))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),0===e.length?"DocumentSet ()":"DocumentSet (\n  "+e.join("  \n")+"\n)"}copy(e,t){const n=new Vi;return n.comparator=this.comparator,n.keyedMap=e,n.sortedSet=t,n}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bi{constructor(){this.yu=new te(V.comparator)}track(e){const t=e.doc.key,n=this.yu.get(t);n?0!==e.type&&3===n.type?this.yu=this.yu.insert(t,e):3===e.type&&1!==n.type?this.yu=this.yu.insert(t,{type:n.type,doc:e.doc}):2===e.type&&2===n.type?this.yu=this.yu.insert(t,{type:2,doc:e.doc}):2===e.type&&0===n.type?this.yu=this.yu.insert(t,{type:0,doc:e.doc}):1===e.type&&0===n.type?this.yu=this.yu.remove(t):1===e.type&&2===n.type?this.yu=this.yu.insert(t,{type:1,doc:n.doc}):0===e.type&&1===n.type?this.yu=this.yu.insert(t,{type:2,doc:e.doc}):v():this.yu=this.yu.insert(t,e)}pu(){const e=[];return this.yu.inorderTraversal((t,n)=>{e.push(n)}),e}}class zi{constructor(e,t,n,r,i,s,o,a){this.query=e,this.docs=t,this.oldDocs=n,this.docChanges=r,this.mutatedKeys=i,this.fromCache=s,this.syncStateChanged=o,this.excludesMetadataChanges=a}static fromInitialDocuments(e,t,n,r){const i=[];return t.forEach(e=>{i.push({type:0,doc:e})}),new zi(e,t,Vi.emptySet(t),i,n,r,!0,!1)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&pt(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,n=e.docChanges;if(t.length!==n.length)return!1;for(let r=0;r<t.length;r++)if(t[r].type!==n[r].type||!t[r].doc.isEqual(n[r].doc))return!1;return!0}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $i{constructor(){this.Iu=void 0,this.listeners=[]}}class qi{constructor(){this.queries=new sn(e=>gt(e),pt),this.onlineState="Unknown",this.Tu=new Set}}async function Hi(e,t){const n=b(e),r=t.query;let i=!1,s=n.queries.get(r);if(s||(i=!0,s=new $i),i)try{s.Iu=await n.onListen(r)}catch(e){const n=Ui(e,`Initialization of query '${mt(t.query)}' failed`);return void t.onError(n)}n.queries.set(r,s),s.listeners.push(t),t.Eu(n.onlineState),s.Iu&&t.Au(s.Iu)&&Yi(n)}async function Wi(e,t){const n=b(e),r=t.query;let i=!1;const s=n.queries.get(r);if(s){const e=s.listeners.indexOf(t);e>=0&&(s.listeners.splice(e,1),i=0===s.listeners.length)}if(i)return n.queries.delete(r),n.onUnlisten(r)}function Gi(e,t){const n=b(e);let r=!1;for(const i of t){const e=i.query,t=n.queries.get(e);if(t){for(const e of t.listeners)e.Au(i)&&(r=!0);t.Iu=i}}r&&Yi(n)}function Ki(e,t,n){const r=b(e),i=r.queries.get(t);if(i)for(const s of i.listeners)s.onError(n);r.queries.delete(t)}function Yi(e){e.Tu.forEach(e=>{e.next()})}class Qi{constructor(e,t,n){this.query=e,this.Ru=t,this.bu=!1,this.Pu=null,this.onlineState="Unknown",this.options=n||{}}Au(e){if(!this.options.includeMetadataChanges){const t=[];for(const n of e.docChanges)3!==n.type&&t.push(n);e=new zi(e.query,e.docs,e.oldDocs,t,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0)}let t=!1;return this.bu?this.vu(e)&&(this.Ru.next(e),t=!0):this.Vu(e,this.onlineState)&&(this.Su(e),t=!0),this.Pu=e,t}onError(e){this.Ru.error(e)}Eu(e){this.onlineState=e;let t=!1;return this.Pu&&!this.bu&&this.Vu(this.Pu,e)&&(this.Su(this.Pu),t=!0),t}Vu(e,t){if(!e.fromCache)return!0;const n="Offline"!==t;return(!this.options.Du||!n)&&(!e.docs.isEmpty()||"Offline"===t)}vu(e){if(e.docChanges.length>0)return!0;const t=this.Pu&&this.Pu.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&!0===this.options.includeMetadataChanges}Su(e){e=zi.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache),this.bu=!0,this.Ru.next(e)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Xi{constructor(e){this.key=e}}class Ji{constructor(e){this.key=e}}class Zi{constructor(e,t){this.query=e,this.Fu=t,this.$u=null,this.current=!1,this.Bu=mn(),this.mutatedKeys=mn(),this.Lu=bt(e),this.Uu=new Vi(this.Lu)}get qu(){return this.Fu}Ku(e,t){const n=t?t.Gu:new Bi,r=t?t.Uu:this.Uu;let i=t?t.mutatedKeys:this.mutatedKeys,s=r,o=!1;const a="F"===this.query.limitType&&r.size===this.query.limit?r.last():null,c="L"===this.query.limitType&&r.size===this.query.limit?r.first():null;if(e.inorderTraversal((e,t)=>{const l=r.get(e),u=vt(this.query,t)?t:null,h=!!l&&this.mutatedKeys.has(l.key),d=!!u&&(u.hasLocalMutations||this.mutatedKeys.has(u.key)&&u.hasCommittedMutations);let f=!1;l&&u?l.data.isEqual(u.data)?h!==d&&(n.track({type:3,doc:u}),f=!0):this.Qu(l,u)||(n.track({type:2,doc:u}),f=!0,(a&&this.Lu(u,a)>0||c&&this.Lu(u,c)<0)&&(o=!0)):!l&&u?(n.track({type:0,doc:u}),f=!0):l&&!u&&(n.track({type:1,doc:l}),f=!0,(a||c)&&(o=!0)),f&&(u?(s=s.add(u),i=d?i.add(e):i.delete(e)):(s=s.delete(e),i=i.delete(e)))}),null!==this.query.limit)for(;s.size>this.query.limit;){const e="F"===this.query.limitType?s.last():s.first();s=s.delete(e.key),i=i.delete(e.key),n.track({type:1,doc:e})}return{Uu:s,Gu:n,Mi:o,mutatedKeys:i}}Qu(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,n){const r=this.Uu;this.Uu=e.Uu,this.mutatedKeys=e.mutatedKeys;const i=e.Gu.pu();i.sort((e,t)=>function(e,t){const n=e=>{switch(e){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return v()}};return n(e)-n(t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e.type,t.type)||this.Lu(e.doc,t.doc)),this.ju(n);const s=t?this.Wu():[],o=0===this.Bu.size&&this.current?1:0,a=o!==this.$u;return this.$u=o,0!==i.length||a?{snapshot:new zi(this.query,e.Uu,r,i,e.mutatedKeys,0===o,a,!1),zu:s}:{zu:s}}Eu(e){return this.current&&"Offline"===e?(this.current=!1,this.applyChanges({Uu:this.Uu,Gu:new Bi,mutatedKeys:this.mutatedKeys,Mi:!1},!1)):{zu:[]}}Hu(e){return!this.Fu.has(e)&&!!this.Uu.has(e)&&!this.Uu.get(e).hasLocalMutations}ju(e){e&&(e.addedDocuments.forEach(e=>this.Fu=this.Fu.add(e)),e.modifiedDocuments.forEach(e=>{}),e.removedDocuments.forEach(e=>this.Fu=this.Fu.delete(e)),this.current=e.current)}Wu(){if(!this.current)return[];const e=this.Bu;this.Bu=mn(),this.Uu.forEach(e=>{this.Hu(e.key)&&(this.Bu=this.Bu.add(e.key))});const t=[];return e.forEach(e=>{this.Bu.has(e)||t.push(new Ji(e))}),this.Bu.forEach(n=>{e.has(n)||t.push(new Xi(n))}),t}Ju(e){this.Fu=e.ji,this.Bu=mn();const t=this.Ku(e.documents);return this.applyChanges(t,!0)}Yu(){return zi.fromInitialDocuments(this.query,this.Uu,this.mutatedKeys,0===this.$u)}}class es{constructor(e,t,n){this.query=e,this.targetId=t,this.view=n}}class ts{constructor(e){this.key=e,this.Xu=!1}}class ns{constructor(e,t,n,r,i,s){this.localStore=e,this.remoteStore=t,this.eventManager=n,this.sharedClientState=r,this.currentUser=i,this.maxConcurrentLimboResolutions=s,this.Zu={},this.tc=new sn(e=>gt(e),pt),this.ec=new Map,this.nc=new Set,this.sc=new te(V.comparator),this.ic=new Map,this.rc=new Ir,this.oc={},this.uc=new Map,this.cc=br.Rn(),this.onlineState="Unknown",this.ac=void 0}get isPrimaryClient(){return!0===this.ac}}async function rs(e,t){const n=Es(e);let r,i;const s=n.tc.get(t);if(s)r=s.targetId,n.sharedClientState.addLocalQueryTarget(r),i=s.view.Yu();else{const e=await qr(n.localStore,dt(t));n.isPrimaryClient&&di(n.remoteStore,e);const s=n.sharedClientState.addLocalQueryTarget(e.targetId);r=e.targetId,i=await is(n,t,r,"current"===s)}return i}async function is(e,t,n,r){e.hc=(t,n,r)=>async function(e,t,n,r){let i=t.view.Ku(n);i.Mi&&(i=await Wr(e.localStore,t.query,!1).then(({documents:e})=>t.view.Ku(e,i)));const s=r&&r.targetChanges.get(t.targetId),o=t.view.applyChanges(i,e.isPrimaryClient,s);return ms(e,t.targetId,o.zu),o.snapshot}(e,t,n,r);const i=await Wr(e.localStore,t,!0),s=new Zi(t,i.ji),o=s.Ku(i.documents),a=wn.createSynthesizedTargetChangeForCurrentChange(n,r&&"Offline"!==e.onlineState),c=s.applyChanges(o,e.isPrimaryClient,a);ms(e,n,c.zu);const l=new es(t,n,s);return e.tc.set(t,l),e.ec.has(n)?e.ec.get(n).push(t):e.ec.set(n,[t]),c.snapshot}async function ss(e,t){const n=b(e),r=n.tc.get(t),i=n.ec.get(r.targetId);if(i.length>1)return n.ec.set(r.targetId,i.filter(e=>!pt(e,t))),void n.tc.delete(t);n.isPrimaryClient?(n.sharedClientState.removeLocalQueryTarget(r.targetId),n.sharedClientState.isActiveQueryTarget(r.targetId)||await Hr(n.localStore,r.targetId,!1).then(()=>{n.sharedClientState.clearQueryState(r.targetId),fi(n.remoteStore,r.targetId),ps(n,r.targetId)}).catch(K)):(ps(n,r.targetId),await Hr(n.localStore,r.targetId,!0))}async function os(e,t,n){const r=Os(e);try{const e=await function(e,t){const n=b(e),r=L.now(),i=t.reduce((e,t)=>e.add(t.key),mn());let s,o;return n.persistence.runTransaction("Locally write mutations","readwrite",e=>{let a=an(),c=mn();return n.Ui.getEntries(e,i).next(e=>{a=e,a.forEach((e,t)=>{t.isValidDocument()||(c=c.add(e))})}).next(()=>n.localDocuments.getOverlayedDocuments(e,a)).next(i=>{s=i;const o=[];for(const e of t){const t=qt(e,s.get(e.key).overlayedDocument);null!=t&&o.push(new Gt(e.key,t,Pe(t.value.mapValue),Ft.exists(!0)))}return n.mutationQueue.addMutationBatch(e,r,o,t)}).next(t=>{o=t;const r=t.applyToLocalDocumentSet(s,c);return n.documentOverlayCache.saveOverlays(e,t.batchId,r)})}).then(()=>({batchId:o.batchId,changes:un(s)}))}(r.localStore,t);r.sharedClientState.addPendingMutation(e.batchId),function(e,t,n){let r=e.oc[e.currentUser.toKey()];r||(r=new te(N)),r=r.insert(t,n),e.oc[e.currentUser.toKey()]=r}(r,e.batchId,n),await bs(r,e.changes),await Ii(r.remoteStore)}catch(e){const t=Ui(e,"Failed to persist write");n.reject(t)}}async function as(e,t){const n=b(e);try{const e=await Br(n.localStore,t);t.targetChanges.forEach((e,t)=>{const r=n.ic.get(t);r&&(y(e.addedDocuments.size+e.modifiedDocuments.size+e.removedDocuments.size<=1),e.addedDocuments.size>0?r.Xu=!0:e.modifiedDocuments.size>0?y(r.Xu):e.removedDocuments.size>0&&(y(r.Xu),r.Xu=!1))}),await bs(n,e,t)}catch(e){await K(e)}}function cs(e,t,n){const r=b(e);if(r.isPrimaryClient&&0===n||!r.isPrimaryClient&&1===n){const e=[];r.tc.forEach((n,r)=>{const i=r.view.Eu(t);i.snapshot&&e.push(i.snapshot)}),function(e,t){const n=b(e);n.onlineState=t;let r=!1;n.queries.forEach((e,n)=>{for(const i of n.listeners)i.Eu(t)&&(r=!0)}),r&&Yi(n)}(r.eventManager,t),e.length&&r.Zu.Go(e),r.onlineState=t,r.isPrimaryClient&&r.sharedClientState.setOnlineState(t)}}async function ls(e,t,n){const r=b(e);r.sharedClientState.updateQueryState(t,"rejected",n);const i=r.ic.get(t),s=i&&i.key;if(s){let e=new te(V.comparator);e=e.insert(s,Me.newNoDocument(s,D.min()));const n=mn().add(s),i=new bn(D.min(),new Map,new ie(N),e,n);await as(r,i),r.sc=r.sc.remove(s),r.ic.delete(t),ys(r)}else await Hr(r.localStore,t,!1).then(()=>ps(r,t,n)).catch(K)}async function us(e,t){const n=b(e),r=t.batch.batchId;try{const e=await Ur(n.localStore,t);fs(n,r,null),ds(n,r),n.sharedClientState.updateMutationState(r,"acknowledged"),await bs(n,e)}catch(e){await K(e)}}async function hs(e,t,n){const r=b(e);try{const e=await function(e,t){const n=b(e);return n.persistence.runTransaction("Reject batch","readwrite-primary",e=>{let r;return n.mutationQueue.lookupMutationBatch(e,t).next(t=>(y(null!==t),r=t.keys(),n.mutationQueue.removeMutationBatch(e,t))).next(()=>n.mutationQueue.performConsistencyCheck(e)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(e,r,t)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(e,r)).next(()=>n.localDocuments.getDocuments(e,r))})}(r.localStore,t);fs(r,t,n),ds(r,t),r.sharedClientState.updateMutationState(t,"rejected",n),await bs(r,e)}catch(n){await K(n)}}function ds(e,t){(e.uc.get(t)||[]).forEach(e=>{e.resolve()}),e.uc.delete(t)}function fs(e,t,n){const r=b(e);let i=r.oc[r.currentUser.toKey()];if(i){const e=i.get(t);e&&(n?e.reject(n):e.resolve(),i=i.remove(t)),r.oc[r.currentUser.toKey()]=i}}function ps(e,t,n=null){e.sharedClientState.removeLocalQueryTarget(t);for(const r of e.ec.get(t))e.tc.delete(r),n&&e.Zu.lc(r,n);e.ec.delete(t),e.isPrimaryClient&&e.rc.us(t).forEach(t=>{e.rc.containsKey(t)||gs(e,t)})}function gs(e,t){e.nc.delete(t.path.canonicalString());const n=e.sc.get(t);null!==n&&(fi(e.remoteStore,n),e.sc=e.sc.remove(t),e.ic.delete(n),ys(e))}function ms(e,t,n){for(const r of n)r instanceof Xi?(e.rc.addReference(r.key,t),vs(e,r)):r instanceof Ji?(f("SyncEngine","Document no longer in limbo: "+r.key),e.rc.removeReference(r.key,t),e.rc.containsKey(r.key)||gs(e,r.key)):v()}function vs(e,t){const n=t.key,r=n.path.canonicalString();e.sc.get(n)||e.nc.has(r)||(f("SyncEngine","New document in limbo: "+n),e.nc.add(r),ys(e))}function ys(e){for(;e.nc.size>0&&e.sc.size<e.maxConcurrentLimboResolutions;){const t=e.nc.values().next().value;e.nc.delete(t);const n=new V(M.fromString(t)),r=e.cc.next();e.ic.set(r,new ts(n)),e.sc=e.sc.insert(n,r),di(e.remoteStore,new dr(dt(ot(n.path)),r,2,X.ot))}}async function bs(e,t,n){const r=b(e),i=[],s=[],o=[];r.tc.isEmpty()||(r.tc.forEach((e,a)=>{o.push(r.hc(a,t,n).then(e=>{if(e){r.isPrimaryClient&&r.sharedClientState.updateQueryState(a.targetId,e.fromCache?"not-current":"current"),i.push(e);const t=Lr.Vi(a.targetId,e);s.push(t)}}))}),await Promise.all(o),r.Zu.Go(i),await async function(e,t){const n=b(e);try{await n.persistence.runTransaction("notifyLocalViewChanges","readwrite",e=>Y.forEach(t,t=>Y.forEach(t.Pi,r=>n.persistence.referenceDelegate.addReference(e,t.targetId,r)).next(()=>Y.forEach(t.vi,r=>n.persistence.referenceDelegate.removeReference(e,t.targetId,r)))))}catch(e){if(!Q(e))throw e;f("LocalStore","Failed to update sequence numbers: "+e)}for(const r of t){const e=r.targetId;if(!r.fromCache){const t=n.$i.get(e),r=t.snapshotVersion,i=t.withLastLimboFreeSnapshotVersion(r);n.$i=n.$i.insert(e,i)}}}(r.localStore,s))}async function ws(e,t){const n=b(e);if(!n.currentUser.isEqual(t)){f("SyncEngine","User change. New user:",t.toKey());const e=await Fr(n.localStore,t);n.currentUser=t,function(e,t){e.uc.forEach(e=>{e.forEach(e=>{e.reject(new _(w.CANCELLED,t))})}),e.uc.clear()}(n,"'waitForPendingWrites' promise is rejected due to a user change."),n.sharedClientState.handleUserChange(t,e.removedBatchIds,e.addedBatchIds),await bs(n,e.Ki)}}function _s(e,t){const n=b(e),r=n.ic.get(t);if(r&&r.Xu)return mn().add(r.key);{let e=mn();const r=n.ec.get(t);if(!r)return e;for(const t of r){const r=n.tc.get(t);e=e.unionWith(r.view.qu)}return e}}function Es(e){const t=b(e);return t.remoteStore.remoteSyncer.applyRemoteEvent=as.bind(null,t),t.remoteStore.remoteSyncer.getRemoteKeysForTarget=_s.bind(null,t),t.remoteStore.remoteSyncer.rejectListen=ls.bind(null,t),t.Zu.Go=Gi.bind(null,t.eventManager),t.Zu.lc=Ki.bind(null,t.eventManager),t}function Os(e){const t=b(e);return t.remoteStore.remoteSyncer.applySuccessfulWrite=us.bind(null,t),t.remoteStore.remoteSyncer.rejectFailedWrite=hs.bind(null,t),t}class Ts{constructor(){this.synchronizeTabs=!1}async initialize(e){this.wt=ni(e.databaseInfo.databaseId),this.sharedClientState=this.dc(e),this.persistence=this._c(e),await this.persistence.start(),this.localStore=this.wc(e),this.gcScheduler=this.mc(e,this.localStore),this.indexBackfillerScheduler=this.gc(e,this.localStore)}mc(e,t){return null}gc(e,t){return null}wc(e){return Mr(this.persistence,new Dr,e.initialUser,this.wt)}_c(e){return new Rr(jr.Os,this.wt)}dc(e){return new Yr}async terminate(){this.gcScheduler&&this.gcScheduler.stop(),await this.sharedClientState.shutdown(),await this.persistence.shutdown()}}class Is{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=e=>cs(this.syncEngine,e,1),this.remoteStore.remoteSyncer.handleCredentialChange=ws.bind(null,this.syncEngine),await Di(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return new qi}createDatastore(e){const t=ni(e.databaseInfo.databaseId),n=(r=e.databaseInfo,new ei(r));var r;return function(e,t,n,r){return new ai(e,t,n,r)}(e.authCredentials,e.appCheckCredentials,n,t)}createRemoteStore(e){return t=this.localStore,n=this.datastore,r=e.asyncQueue,i=e=>cs(this.syncEngine,e,0),s=Xr.V()?new Xr:new Qr,new li(t,n,r,i,s);var t,n,r,i,s}createSyncEngine(e,t){return function(e,t,n,r,i,s,o){const a=new ns(e,t,n,r,i,s);return o&&(a.ac=!0),a}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}terminate(){return async function(e){const t=b(e);f("RemoteStore","RemoteStore shutting down."),t.lu.add(5),await hi(t),t.du.shutdown(),t._u.set("Unknown")}(this.remoteStore)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Ss{constructor(e){this.observer=e,this.muted=!1}next(e){this.observer.next&&this.Ic(this.observer.next,e)}error(e){this.observer.error?this.Ic(this.observer.error,e):p("Uncaught Error in snapshot listener:",e)}Tc(){this.muted=!0}Ic(e,t){this.muted||setTimeout(()=>{this.muted||e(t)},0)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ks{constructor(e,t,n,r){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=n,this.databaseInfo=r,this.user=l.UNAUTHENTICATED,this.clientId=R.I(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this.authCredentials.start(n,async e=>{f("FirestoreClient","Received user=",e.uid),await this.authCredentialListener(e),this.user=e}),this.appCheckCredentials.start(n,e=>(f("FirestoreClient","Received new app check token=",e),this.appCheckCredentialListener(e,this.user)))}async getConfiguration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}verifyNotTerminated(){if(this.asyncQueue.isShuttingDown)throw new _(w.FAILED_PRECONDITION,"The client has already been terminated.")}terminate(){this.asyncQueue.enterRestrictedMode();const e=new E;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this.onlineComponents&&await this.onlineComponents.terminate(),this.offlineComponents&&await this.offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const n=Ui(t,"Failed to shutdown persistence");e.reject(n)}}),e.promise}}async function Cs(e,t){e.asyncQueue.verifyOperationInProgress(),f("FirestoreClient","Initializing OfflineComponentProvider");const n=await e.getConfiguration();await t.initialize(n);let r=n.initialUser;e.setCredentialChangeListener(async e=>{r.isEqual(e)||(await Fr(t.localStore,e),r=e)}),t.persistence.setDatabaseDeletedListener(()=>e.terminate()),e.offlineComponents=t}async function As(e,t){e.asyncQueue.verifyOperationInProgress();const n=await xs(e);f("FirestoreClient","Initializing OnlineComponentProvider");const r=await e.getConfiguration();await t.initialize(n,r),e.setCredentialChangeListener(e=>Li(t.remoteStore,e)),e.setAppCheckTokenChangeListener((e,n)=>Li(t.remoteStore,n)),e.onlineComponents=t}async function xs(e){return e.offlineComponents||(f("FirestoreClient","Using default OfflineComponentProvider"),await Cs(e,new Ts)),e.offlineComponents}async function Rs(e){return e.onlineComponents||(f("FirestoreClient","Using default OnlineComponentProvider"),await As(e,new Is)),e.onlineComponents}function Ns(e){return Rs(e).then(e=>e.syncEngine)}async function js(e){const t=await Rs(e),n=t.eventManager;return n.onListen=rs.bind(null,t.syncEngine),n.onUnlisten=ss.bind(null,t.syncEngine),n}const Ls=new Map;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ds(e,t,n){if(!n)throw new _(w.INVALID_ARGUMENT,`Function ${e}() cannot be called with an empty ${t}.`)}function Ps(e,t,n,r){if(!0===t&&!0===r)throw new _(w.INVALID_ARGUMENT,`${e} and ${n} cannot be used together.`)}function Ms(e){if(!V.isDocumentKey(e))throw new _(w.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${e} has ${e.length}.`)}function Fs(e){if(V.isDocumentKey(e))throw new _(w.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${e} has ${e.length}.`)}function Us(e){if(void 0===e)return"undefined";if(null===e)return"null";if("string"==typeof e)return e.length>20&&(e=e.substring(0,20)+"..."),JSON.stringify(e);if("number"==typeof e||"boolean"==typeof e)return""+e;if("object"==typeof e){if(e instanceof Array)return"an array";{const t=function(e){return e.constructor?e.constructor.name:null}(e);return t?`a custom ${t} object`:"an object"}}return"function"==typeof e?"a function":v()}function Vs(e,t){if("_delegate"in e&&(e=e._delegate),!(e instanceof t)){if(t.name===e.constructor.name)throw new _(w.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=Us(e);throw new _(w.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${n}`)}}return e}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Bs{constructor(e){var t;if(void 0===e.host){if(void 0!==e.ssl)throw new _(w.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=null===(t=e.ssl)||void 0===t||t;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,void 0===e.cacheSizeBytes)this.cacheSizeBytes=41943040;else{if(-1!==e.cacheSizeBytes&&e.cacheSizeBytes<1048576)throw new _(w.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.useFetchStreams=!!e.useFetchStreams,Ps("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling)}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zs{constructor(e,t,n){this._authCredentials=t,this._appCheckCredentials=n,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Bs({}),this._settingsFrozen=!1,e instanceof me?this._databaseId=e:(this._app=e,this._databaseId=function(e){if(!Object.prototype.hasOwnProperty.apply(e.options,["projectId"]))throw new _(w.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new me(e.options.projectId)}(e))}get app(){if(!this._app)throw new _(w.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return void 0!==this._terminateTask}_setSettings(e){if(this._settingsFrozen)throw new _(w.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Bs(e),void 0!==e.credentials&&(this._authCredentials=function(e){if(!e)return new T;switch(e.type){case"gapi":const t=e.client;return y(!("object"!=typeof t||null===t||!t.auth||!t.auth.getAuthHeaderValueForFirstParty)),new k(t,e.sessionIndex||"0",e.iamToken||null);case"provider":return e.client;default:throw new _(w.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask||(this._terminateTask=this._terminate()),this._terminateTask}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){const t=Ls.get(e);t&&(f("ComponentProvider","Removing Datastore"),Ls.delete(e),t.terminate())}(this),Promise.resolve()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class $s{constructor(e,t,n){this.converter=t,this._key=n,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Hs(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new $s(this.firestore,e,this._key)}}class qs{constructor(e,t,n){this.converter=t,this._query=n,this.type="query",this.firestore=e}withConverter(e){return new qs(this.firestore,e,this._query)}}class Hs extends qs{constructor(e,t,n){super(e,t,ot(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new $s(this.firestore,null,new V(e))}withConverter(e){return new Hs(this.firestore,e,this._path)}}function Ws(e,t,...n){if(e=Object(o["l"])(e),Ds("collection","path",t),e instanceof zs){const r=M.fromString(t,...n);return Fs(r),new Hs(e,null,r)}{if(!(e instanceof $s||e instanceof Hs))throw new _(w.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=e._path.child(M.fromString(t,...n));return Fs(r),new Hs(e.firestore,null,r)}}function Gs(e,t,...n){if(e=Object(o["l"])(e),1===arguments.length&&(t=R.I()),Ds("doc","path",t),e instanceof zs){const r=M.fromString(t,...n);return Ms(r),new $s(e,null,new V(r))}{if(!(e instanceof $s||e instanceof Hs))throw new _(w.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=e._path.child(M.fromString(t,...n));return Ms(r),new $s(e.firestore,e instanceof Hs?e.converter:null,new V(r))}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Ks{constructor(){this.Mc=Promise.resolve(),this.Oc=[],this.Fc=!1,this.$c=[],this.Bc=null,this.Lc=!1,this.Uc=!1,this.qc=[],this.So=new ri(this,"async_queue_retry"),this.Kc=()=>{const e=ti();e&&f("AsyncQueue","Visibility state changed to "+e.visibilityState),this.So.Eo()};const e=ti();e&&"function"==typeof e.addEventListener&&e.addEventListener("visibilitychange",this.Kc)}get isShuttingDown(){return this.Fc}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.Gc(),this.Qc(e)}enterRestrictedMode(e){if(!this.Fc){this.Fc=!0,this.Uc=e||!1;const t=ti();t&&"function"==typeof t.removeEventListener&&t.removeEventListener("visibilitychange",this.Kc)}}enqueue(e){if(this.Gc(),this.Fc)return new Promise(()=>{});const t=new E;return this.Qc(()=>this.Fc&&this.Uc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Oc.push(e),this.jc()))}async jc(){if(0!==this.Oc.length){try{await this.Oc[0](),this.Oc.shift(),this.So.reset()}catch(e){if(!Q(e))throw e;f("AsyncQueue","Operation failed with retryable error: "+e)}this.Oc.length>0&&this.So.Io(()=>this.jc())}}Qc(e){const t=this.Mc.then(()=>(this.Lc=!0,e().catch(e=>{this.Bc=e,this.Lc=!1;const t=function(e){let t=e.message||"";return e.stack&&(t=e.stack.includes(e.message)?e.stack:e.message+"\n"+e.stack),t}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e);throw p("INTERNAL UNHANDLED ERROR: ",t),e}).then(e=>(this.Lc=!1,e))));return this.Mc=t,t}enqueueAfterDelay(e,t,n){this.Gc(),this.qc.indexOf(e)>-1&&(t=0);const r=Fi.createAndSchedule(this,e,t,n,e=>this.Wc(e));return this.$c.push(r),r}Gc(){this.Bc&&v()}verifyOperationInProgress(){}async zc(){let e;do{e=this.Mc,await e}while(e!==this.Mc)}Hc(e){for(const t of this.$c)if(t.timerId===e)return!0;return!1}Jc(e){return this.zc().then(()=>{this.$c.sort((e,t)=>e.targetTimeMs-t.targetTimeMs);for(const t of this.$c)if(t.skipDelay(),"all"!==e&&t.timerId===e)break;return this.zc()})}Yc(e){this.qc.push(e)}Wc(e){const t=this.$c.indexOf(e);this.$c.splice(t,1)}}function Ys(e){return function(e,t){if("object"!=typeof e||null===e)return!1;const n=e;for(const r of t)if(r in n&&"function"==typeof n[r])return!0;return!1}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e,["next","error","complete"])}class Qs extends zs{constructor(e,t,n){super(e,t,n),this.type="firestore",this._queue=new Ks,this._persistenceKey="name"in e?e.name:"[DEFAULT]"}_terminate(){return this._firestoreClient||Zs(this),this._firestoreClient.terminate()}}function Xs(e=Object(r["getApp"])()){return Object(r["_getProvider"])(e,"firestore").getImmediate()}function Js(e){return e._firestoreClient||Zs(e),e._firestoreClient.verifyNotTerminated(),e._firestoreClient}function Zs(e){var t;const n=e._freezeSettings(),r=function(e,t,n,r){return new ge(e,t,n,r.host,r.ssl,r.experimentalForceLongPolling,r.experimentalAutoDetectLongPolling,r.useFetchStreams)}(e._databaseId,(null===(t=e._app)||void 0===t?void 0:t.options.appId)||"",e._persistenceKey,n);e._firestoreClient=new ks(e._authCredentials,e._appCheckCredentials,e._queue,r)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class eo{constructor(...e){for(let t=0;t<e.length;++t)if(0===e[t].length)throw new _(w.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new U(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class to{constructor(e){this._byteString=e}static fromBase64String(e){try{return new to(ae.fromBase64String(e))}catch(e){throw new _(w.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(e){return new to(ae.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class no{constructor(e){this._methodName=e}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ro{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new _(w.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new _(w.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return N(this._lat,e._lat)||N(this._long,e._long)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const io=/^__.*__$/;class so{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return null!==this.fieldMask?new Gt(e,this.data,this.fieldMask,t,this.fieldTransforms):new Wt(e,this.data,t,this.fieldTransforms)}}class oo{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return new Gt(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function ao(e){switch(e){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw v()}}class co{constructor(e,t,n,r,i,s){this.settings=e,this.databaseId=t,this.wt=n,this.ignoreUndefinedProperties=r,void 0===i&&this.Xc(),this.fieldTransforms=i||[],this.fieldMask=s||[]}get path(){return this.settings.path}get Zc(){return this.settings.Zc}ta(e){return new co(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.wt,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}ea(e){var t;const n=null===(t=this.path)||void 0===t?void 0:t.child(e),r=this.ta({path:n,na:!1});return r.sa(e),r}ia(e){var t;const n=null===(t=this.path)||void 0===t?void 0:t.child(e),r=this.ta({path:n,na:!1});return r.Xc(),r}ra(e){return this.ta({path:void 0,na:!0})}oa(e){return Oo(e,this.settings.methodName,this.settings.ua||!1,this.path,this.settings.ca)}contains(e){return void 0!==this.fieldMask.find(t=>e.isPrefixOf(t))||void 0!==this.fieldTransforms.find(t=>e.isPrefixOf(t.field))}Xc(){if(this.path)for(let e=0;e<this.path.length;e++)this.sa(this.path.get(e))}sa(e){if(0===e.length)throw this.oa("Document fields must not be empty");if(ao(this.Zc)&&io.test(e))throw this.oa('Document fields cannot begin and end with "__"')}}class lo{constructor(e,t,n){this.databaseId=e,this.ignoreUndefinedProperties=t,this.wt=n||ni(e)}aa(e,t,n,r=!1){return new co({Zc:e,methodName:t,ca:n,path:U.emptyPath(),na:!1,ua:r},this.databaseId,this.wt,this.ignoreUndefinedProperties)}}function uo(e){const t=e._freezeSettings(),n=ni(e._databaseId);return new lo(e._databaseId,!!t.ignoreUndefinedProperties,n)}function ho(e,t,n,r,i,s={}){const o=e.aa(s.merge||s.mergeFields?2:0,t,n,i);bo("Data must be an object, but it was:",o,r);const a=vo(r,o);let c,l;if(s.merge)c=new oe(o.fieldMask),l=o.fieldTransforms;else if(s.mergeFields){const e=[];for(const r of s.mergeFields){const i=wo(t,r,n);if(!o.contains(i))throw new _(w.INVALID_ARGUMENT,`Field '${i}' is specified in your field mask but missing from your input data.`);To(e,i)||e.push(i)}c=new oe(e),l=o.fieldTransforms.filter(e=>c.covers(e.field))}else c=null,l=o.fieldTransforms;return new so(new De(a),c,l)}class fo extends no{_toFieldTransform(e){if(2!==e.Zc)throw 1===e.Zc?e.oa(this._methodName+"() can only appear at the top level of your update data"):e.oa(this._methodName+"() cannot be used with set() unless you pass {merge:true}");return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof fo}}function po(e,t,n,r){const i=e.aa(1,t,n);bo("Data must be an object, but it was:",i,r);const s=[],a=De.empty();Z(r,(e,r)=>{const c=Eo(t,e,n);r=Object(o["l"])(r);const l=i.ia(c);if(r instanceof fo)s.push(c);else{const e=mo(r,l);null!=e&&(s.push(c),a.set(c,e))}});const c=new oe(s);return new oo(a,c,i.fieldTransforms)}function go(e,t,n,r,i,s){const a=e.aa(1,t,n),c=[wo(t,r,n)],l=[i];if(s.length%2!=0)throw new _(w.INVALID_ARGUMENT,`Function ${t}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let o=0;o<s.length;o+=2)c.push(wo(t,s[o])),l.push(s[o+1]);const u=[],h=De.empty();for(let f=c.length-1;f>=0;--f)if(!To(u,c[f])){const e=c[f];let t=l[f];t=Object(o["l"])(t);const n=a.ia(e);if(t instanceof fo)u.push(e);else{const r=mo(t,n);null!=r&&(u.push(e),h.set(e,r))}}const d=new oe(u);return new oo(h,d,a.fieldTransforms)}function mo(e,t){if(yo(e=Object(o["l"])(e)))return bo("Unsupported field value:",t,e),vo(e,t);if(e instanceof no)return function(e,t){if(!ao(t.Zc))throw t.oa(e._methodName+"() can only be used with update() and set()");if(!t.path)throw t.oa(e._methodName+"() is not currently supported inside arrays");const n=e._toFieldTransform(t);n&&t.fieldTransforms.push(n)}(e,t),null;if(void 0===e&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),e instanceof Array){if(t.settings.na&&4!==t.Zc)throw t.oa("Nested arrays are not supported");return function(e,t){const n=[];let r=0;for(const i of e){let e=mo(i,t.ra(r));null==e&&(e={nullValue:"NULL_VALUE"}),n.push(e),r++}return{arrayValue:{values:n}}}(e,t)}return function(e,t){if(null===(e=Object(o["l"])(e)))return{nullValue:"NULL_VALUE"};if("number"==typeof e)return Ot(t.wt,e);if("boolean"==typeof e)return{booleanValue:e};if("string"==typeof e)return{stringValue:e};if(e instanceof Date){const n=L.fromDate(e);return{timestampValue:Rn(t.wt,n)}}if(e instanceof L){const n=new L(e.seconds,1e3*Math.floor(e.nanoseconds/1e3));return{timestampValue:Rn(t.wt,n)}}if(e instanceof ro)return{geoPointValue:{latitude:e.latitude,longitude:e.longitude}};if(e instanceof to)return{bytesValue:Nn(t.wt,e._byteString)};if(e instanceof $s){const n=t.databaseId,r=e.firestore._databaseId;if(!r.isEqual(n))throw t.oa(`Document reference is for database ${r.projectId}/${r.database} but should be for database ${n.projectId}/${n.database}`);return{referenceValue:Dn(e.firestore._databaseId||t.databaseId,e._key.path)}}throw t.oa("Unsupported field value: "+Us(e))}(e,t)}function vo(e,t){const n={};return ee(e)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):Z(e,(e,r)=>{const i=mo(r,t.ea(e));null!=i&&(n[e]=i)}),{mapValue:{fields:n}}}function yo(e){return!("object"!=typeof e||null===e||e instanceof Array||e instanceof Date||e instanceof L||e instanceof ro||e instanceof to||e instanceof $s||e instanceof no)}function bo(e,t,n){if(!yo(n)||!function(e){return"object"==typeof e&&null!==e&&(Object.getPrototypeOf(e)===Object.prototype||null===Object.getPrototypeOf(e))}(n)){const r=Us(n);throw"an object"===r?t.oa(e+" a custom object"):t.oa(e+" "+r)}}function wo(e,t,n){if((t=Object(o["l"])(t))instanceof eo)return t._internalPath;if("string"==typeof t)return Eo(e,t);throw Oo("Field path arguments must be of type string or ",e,!1,void 0,n)}const _o=new RegExp("[~\\*/\\[\\]]");function Eo(e,t,n){if(t.search(_o)>=0)throw Oo(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,e,!1,void 0,n);try{return new eo(...t.split("."))._internalPath}catch(r){throw Oo(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,e,!1,void 0,n)}}function Oo(e,t,n,r,i){const s=r&&!r.isEmpty(),o=void 0!==i;let a=`Function ${t}() called with invalid data`;n&&(a+=" (via `toFirestore()`)"),a+=". ";let c="";return(s||o)&&(c+=" (found",s&&(c+=" in field "+r),o&&(c+=" in document "+i),c+=")"),new _(w.INVALID_ARGUMENT,a+e+c)}function To(e,t){return e.some(e=>e.isEqual(t))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Io{constructor(e,t,n,r,i){this._firestore=e,this._userDataWriter=t,this._key=n,this._document=r,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new $s(this._firestore,this._converter,this._key)}exists(){return null!==this._document}data(){if(this._document){if(this._converter){const e=new So(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(ko("DocumentSnapshot.get",e));if(null!==t)return this._userDataWriter.convertValue(t)}}}class So extends Io{data(){return super.data()}}function ko(e,t){return"string"==typeof t?Eo(e,t):t instanceof eo?t._internalPath:t._delegate._internalPath}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Co{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class Ao extends Io{constructor(e,t,n,r,i,s){super(e,t,n,r,s),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new xo(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const n=this._document.data.field(ko("DocumentSnapshot.get",e));if(null!==n)return this._userDataWriter.convertValue(n,t.serverTimestamps)}}}class xo extends Ao{data(e={}){return super.data(e)}}class Ro{constructor(e,t,n,r){this._firestore=e,this._userDataWriter=t,this._snapshot=r,this.metadata=new Co(r.hasPendingWrites,r.fromCache),this.query=n}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return 0===this.size}forEach(e,t){this._snapshot.docs.forEach(n=>{e.call(t,new xo(this._firestore,this._userDataWriter,n.key,n,new Co(this._snapshot.mutatedKeys.has(n.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new _(w.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(e,t){if(e._snapshot.oldDocs.isEmpty()){let t=0;return e._snapshot.docChanges.map(n=>({type:"added",doc:new xo(e._firestore,e._userDataWriter,n.doc.key,n.doc,new Co(e._snapshot.mutatedKeys.has(n.doc.key),e._snapshot.fromCache),e.query.converter),oldIndex:-1,newIndex:t++}))}{let n=e._snapshot.oldDocs;return e._snapshot.docChanges.filter(e=>t||3!==e.type).map(t=>{const r=new xo(e._firestore,e._userDataWriter,t.doc.key,t.doc,new Co(e._snapshot.mutatedKeys.has(t.doc.key),e._snapshot.fromCache),e.query.converter);let i=-1,s=-1;return 0!==t.type&&(i=n.indexOf(t.doc.key),n=n.delete(t.doc.key)),1!==t.type&&(n=n.add(t.doc),s=n.indexOf(t.doc.key)),{type:No(t.type),doc:r,oldIndex:i,newIndex:s}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}}function No(e){switch(e){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return v()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function jo(e){if("L"===e.limitType&&0===e.explicitOrderBy.length)throw new _(w.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Lo{convertValue(e,t="none"){switch(_e(e)){case 0:return null;case 1:return e.booleanValue;case 2:return ue(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(he(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 10:return this.convertObject(e.mapValue,t);default:throw v()}}convertObject(e,t){const n={};return Z(e.fields,(e,r)=>{n[e]=this.convertValue(r,t)}),n}convertGeoPoint(e){return new ro(ue(e.latitude),ue(e.longitude))}convertArray(e,t){return(e.values||[]).map(e=>this.convertValue(e,t))}convertServerTimestamp(e,t){switch(t){case"previous":const n=fe(e);return null==n?null:this.convertValue(n,t);case"estimate":return this.convertTimestamp(pe(e));default:return null}}convertTimestamp(e){const t=le(e);return new L(t.seconds,t.nanos)}convertDocumentKey(e,t){const n=M.fromString(e);y(sr(n));const r=new me(n.get(1),n.get(3)),i=new V(n.popFirst(5));return r.isEqual(t)||p(`Document ${i} contains a document reference within a different database (${r.projectId}/${r.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Do(e,t,n){let r;return r=e?n&&(n.merge||n.mergeFields)?e.toFirestore(t,n):e.toFirestore(t):t,r}class Po extends Lo{constructor(e){super(),this.firestore=e}convertBytes(e){return new to(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new $s(this.firestore,null,t)}}function Mo(e,t,n,...r){e=Vs(e,$s);const i=Vs(e.firestore,Qs),s=uo(i);let a;return a="string"==typeof(t=Object(o["l"])(t))||t instanceof eo?go(s,"updateDoc",e._key,t,n,r):po(s,"updateDoc",e._key,t),Bo(i,[a.toMutation(e._key,Ft.exists(!0))])}function Fo(e){return Bo(Vs(e.firestore,Qs),[new Xt(e._key,Ft.none())])}function Uo(e,t){const n=Vs(e.firestore,Qs),r=Gs(e),i=Do(e.converter,t);return Bo(n,[ho(uo(e.firestore),"addDoc",r._key,i,null!==e.converter,{}).toMutation(r._key,Ft.exists(!1))]).then(()=>r)}function Vo(e,...t){var n,r,i;e=Object(o["l"])(e);let s={includeMetadataChanges:!1},a=0;"object"!=typeof t[a]||Ys(t[a])||(s=t[a],a++);const c={includeMetadataChanges:s.includeMetadataChanges};if(Ys(t[a])){const e=t[a];t[a]=null===(n=e.next)||void 0===n?void 0:n.bind(e),t[a+1]=null===(r=e.error)||void 0===r?void 0:r.bind(e),t[a+2]=null===(i=e.complete)||void 0===i?void 0:i.bind(e)}let l,u,h;if(e instanceof $s)u=Vs(e.firestore,Qs),h=ot(e._key.path),l={next:n=>{t[a]&&t[a](zo(u,e,n))},error:t[a+1],complete:t[a+2]};else{const n=Vs(e,qs);u=Vs(n.firestore,Qs),h=n._query;const r=new Po(u);l={next:e=>{t[a]&&t[a](new Ro(u,r,n,e))},error:t[a+1],complete:t[a+2]},jo(e._query)}return function(e,t,n,r){const i=new Ss(r),s=new Qi(t,i,n);return e.asyncQueue.enqueueAndForget(async()=>Hi(await js(e),s)),()=>{i.Tc(),e.asyncQueue.enqueueAndForget(async()=>Wi(await js(e),s))}}(Js(u),h,c,l)}function Bo(e,t){return function(e,t){const n=new E;return e.asyncQueue.enqueueAndForget(async()=>os(await Ns(e),t,n)),n.promise}(Js(e),t)}function zo(e,t,n){const r=n.docs.get(t._key),i=new Po(e);return new Ao(e,i,t._key,r,new Co(n.hasPendingWrites,n.fromCache),t.converter)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */!function(e,t=!0){!function(e){u=e}(r["SDK_VERSION"]),Object(r["_registerComponent"])(new i["a"]("firestore",(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),i=new Qs(r,new I(e.getProvider("auth-internal")),new A(e.getProvider("app-check-internal")));return n=Object.assign({useFetchStreams:t},n),i._setSettings(n),i},"PUBLIC")),Object(r["registerVersion"])(c,"3.4.14",e),Object(r["registerVersion"])(c,"3.4.14","esm2017")}()}).call(this,n("4362"))},"098b":function(e,t,n){},"0a06":function(e,t,n){"use strict";var r=n("c532"),i=n("30b5"),s=n("f6b4"),o=n("5270"),a=n("4a7b"),c=n("83b9"),l=n("848b"),u=l.validators;function h(e){this.defaults=e,this.interceptors={request:new s,response:new s}}h.prototype.request=function(e,t){"string"===typeof e?(t=t||{},t.url=e):t=e||{},t=a(this.defaults,t),t.method?t.method=t.method.toLowerCase():this.defaults.method?t.method=this.defaults.method.toLowerCase():t.method="get";var n=t.transitional;void 0!==n&&l.assertOptions(n,{silentJSONParsing:u.transitional(u.boolean),forcedJSONParsing:u.transitional(u.boolean),clarifyTimeoutError:u.transitional(u.boolean)},!1);var r=[],i=!0;this.interceptors.request.forEach((function(e){"function"===typeof e.runWhen&&!1===e.runWhen(t)||(i=i&&e.synchronous,r.unshift(e.fulfilled,e.rejected))}));var s,c=[];if(this.interceptors.response.forEach((function(e){c.push(e.fulfilled,e.rejected)})),!i){var h=[o,void 0];Array.prototype.unshift.apply(h,r),h=h.concat(c),s=Promise.resolve(t);while(h.length)s=s.then(h.shift(),h.shift());return s}var d=t;while(r.length){var f=r.shift(),p=r.shift();try{d=f(d)}catch(g){p(g);break}}try{s=o(d)}catch(g){return Promise.reject(g)}while(c.length)s=s.then(c.shift(),c.shift());return s},h.prototype.getUri=function(e){e=a(this.defaults,e);var t=c(e.baseURL,e.url);return i(t,e.params,e.paramsSerializer)},r.forEach(["delete","get","head","options"],(function(e){h.prototype[e]=function(t,n){return this.request(a(n||{},{method:e,url:t,data:(n||{}).data}))}})),r.forEach(["post","put","patch"],(function(e){function t(t){return function(n,r,i){return this.request(a(i||{},{method:e,headers:t?{"Content-Type":"multipart/form-data"}:{},url:n,data:r}))}}h.prototype[e]=t(),h.prototype[e+"Form"]=t(!0)})),e.exports=h},"0b42":function(e,t,n){var r=n("da84"),i=n("e8b5"),s=n("68ee"),o=n("861d"),a=n("b622"),c=a("species"),l=r.Array;e.exports=function(e){var t;return i(e)&&(t=e.constructor,s(t)&&(t===l||i(t.prototype))?t=void 0:o(t)&&(t=t[c],null===t&&(t=void 0))),void 0===t?l:t}},"0cfb":function(e,t,n){var r=n("83ab"),i=n("d039"),s=n("cc12");e.exports=!r&&!i((function(){return 7!=Object.defineProperty(s("div"),"a",{get:function(){return 7}}).a}))},"0d51":function(e,t,n){var r=n("da84"),i=r.String;e.exports=function(e){try{return i(e)}catch(t){return"Object"}}},"0df6":function(e,t,n){"use strict";e.exports=function(e){return function(t){return e.apply(null,t)}}},"159b":function(e,t,n){var r=n("da84"),i=n("fdbc"),s=n("785a"),o=n("17c2"),a=n("9112"),c=function(e){if(e&&e.forEach!==o)try{a(e,"forEach",o)}catch(t){e.forEach=o}};for(var l in i)i[l]&&c(r[l]&&r[l].prototype);c(s)},1626:function(e,t){e.exports=function(e){return"function"==typeof e}},"17c2":function(e,t,n){"use strict";var r=n("b727").forEach,i=n("a640"),s=i("forEach");e.exports=s?[].forEach:function(e){return r(this,e,arguments.length>1?arguments[1]:void 0)}},"19aa":function(e,t,n){var r=n("da84"),i=n("3a9b"),s=r.TypeError;e.exports=function(e,t){if(i(t,e))return e;throw s("Incorrect invocation")}},"1a2d":function(e,t,n){var r=n("e330"),i=n("7b0b"),s=r({}.hasOwnProperty);e.exports=Object.hasOwn||function(e,t){return s(i(e),t)}},"1be4":function(e,t,n){var r=n("d066");e.exports=r("document","documentElement")},"1c7e":function(e,t,n){var r=n("b622"),i=r("iterator"),s=!1;try{var o=0,a={next:function(){return{done:!!o++}},return:function(){s=!0}};a[i]=function(){return this},Array.from(a,(function(){throw 2}))}catch(c){}e.exports=function(e,t){if(!t&&!s)return!1;var n=!1;try{var r={};r[i]=function(){return{next:function(){return{done:n=!0}}}},e(r)}catch(c){}return n}},"1cdc":function(e,t,n){var r=n("342f");e.exports=/(?:ipad|iphone|ipod).*applewebkit/i.test(r)},"1d2b":function(e,t,n){"use strict";e.exports=function(e,t){return function(){for(var n=new Array(arguments.length),r=0;r<n.length;r++)n[r]=arguments[r];return e.apply(t,n)}}},"1d80":function(e,t,n){var r=n("da84"),i=r.TypeError;e.exports=function(e){if(void 0==e)throw i("Can't call method on "+e);return e}},"1da1":function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));n("d3b7");function r(e,t,n,r,i,s,o){try{var a=e[s](o),c=a.value}catch(l){return void n(l)}a.done?t(c):Promise.resolve(c).then(r,i)}function i(e){return function(){var t=this,n=arguments;return new Promise((function(i,s){var o=e.apply(t,n);function a(e){r(o,i,s,a,c,"next",e)}function c(e){r(o,i,s,a,c,"throw",e)}a(void 0)}))}}},"1f5a":function(e,t,n){"use strict";n.d(t,"a",(function(){return l})),n.d(t,"b",(function(){return Ue})),n.d(t,"c",(function(){return ut})),n.d(t,"d",(function(){return pt})),n.d(t,"e",(function(){return mt})),n.d(t,"f",(function(){return gt})),n.d(t,"g",(function(){return et})),n.d(t,"h",(function(){return ft})),n.d(t,"i",(function(){return jr})),n.d(t,"j",(function(){return Ki})),n.d(t,"k",(function(){return c})),n.d(t,"l",(function(){return Ir})),n.d(t,"m",(function(){return yt})),n.d(t,"n",(function(){return wt})),n.d(t,"o",(function(){return _t})),n.d(t,"p",(function(){return E})),n.d(t,"q",(function(){return Ne})),n.d(t,"r",(function(){return v})),n.d(t,"s",(function(){return Pn})),n.d(t,"t",(function(){return S})),n.d(t,"u",(function(){return ai})),n.d(t,"v",(function(){return Xr})),n.d(t,"w",(function(){return fe})),n.d(t,"y",(function(){return qt})),n.d(t,"z",(function(){return Rn})),n.d(t,"A",(function(){return Hi})),n.d(t,"B",(function(){return jn})),n.d(t,"C",(function(){return Ht})),n.d(t,"D",(function(){return $t})),n.d(t,"E",(function(){return Le})),n.d(t,"G",(function(){return Gt})),n.d(t,"H",(function(){return d})),n.d(t,"I",(function(){return Zt})),n.d(t,"J",(function(){return gn})),n.d(t,"K",(function(){return yn})),n.d(t,"L",(function(){return oi})),n.d(t,"M",(function(){return de})),n.d(t,"N",(function(){return ir})),n.d(t,"O",(function(){return Qt})),n.d(t,"P",(function(){return Dt})),n.d(t,"Q",(function(){return Ar})),n.d(t,"R",(function(){return $r})),n.d(t,"S",(function(){return ii})),n.d(t,"T",(function(){return Tn})),n.d(t,"U",(function(){return Pt})),n.d(t,"V",(function(){return xr})),n.d(t,"W",(function(){return zr})),n.d(t,"X",(function(){return ni})),n.d(t,"Y",(function(){return en})),n.d(t,"Z",(function(){return zt})),n.d(t,"ab",(function(){return Yt})),n.d(t,"bb",(function(){return It})),n.d(t,"cb",(function(){return Lt})),n.d(t,"db",(function(){return Ft})),n.d(t,"eb",(function(){return Kt})),n.d(t,"fb",(function(){return Xt})),n.d(t,"gb",(function(){return Cr})),n.d(t,"hb",(function(){return Br})),n.d(t,"ib",(function(){return ei})),n.d(t,"jb",(function(){return At})),n.d(t,"kb",(function(){return sn})),n.d(t,"lb",(function(){return on})),n.d(t,"mb",(function(){return Nr})),n.d(t,"nb",(function(){return rn})),n.d(t,"ob",(function(){return tn})),n.d(t,"pb",(function(){return Wt})),n.d(t,"x",(function(){return Is})),n.d(t,"F",(function(){return Os}));var r=n("1fd5"),i=n("589b");function s(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var i=0;for(r=Object.getOwnPropertySymbols(e);i<r.length;i++)t.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(e,r[i])&&(n[r[i]]=e[r[i]])}return n}Object.create;Object.create;var o=n("e691"),a=n("22e5");
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const c={FACEBOOK:"facebook.com",GITHUB:"github.com",GOOGLE:"google.com",PASSWORD:"password",PHONE:"phone",TWITTER:"twitter.com"},l={EMAIL_SIGNIN:"EMAIL_SIGNIN",PASSWORD_RESET:"PASSWORD_RESET",RECOVER_EMAIL:"RECOVER_EMAIL",REVERT_SECOND_FACTOR_ADDITION:"REVERT_SECOND_FACTOR_ADDITION",VERIFY_AND_CHANGE_EMAIL:"VERIFY_AND_CHANGE_EMAIL",VERIFY_EMAIL:"VERIFY_EMAIL"};
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function u(){return{["admin-restricted-operation"]:"This operation is restricted to administrators only.",["argument-error"]:"",["app-not-authorized"]:"This app, identified by the domain where it's hosted, is not authorized to use Firebase Authentication with the provided API key. Review your key configuration in the Google API console.",["app-not-installed"]:"The requested mobile application corresponding to the identifier (Android package name or iOS bundle ID) provided is not installed on this device.",["captcha-check-failed"]:"The reCAPTCHA response token provided is either invalid, expired, already used or the domain associated with it does not match the list of whitelisted domains.",["code-expired"]:"The SMS code has expired. Please re-send the verification code to try again.",["cordova-not-ready"]:"Cordova framework is not ready.",["cors-unsupported"]:"This browser is not supported.",["credential-already-in-use"]:"This credential is already associated with a different user account.",["custom-token-mismatch"]:"The custom token corresponds to a different audience.",["requires-recent-login"]:"This operation is sensitive and requires recent authentication. Log in again before retrying this request.",["dependent-sdk-initialized-before-auth"]:"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK.",["dynamic-link-not-activated"]:"Please activate Dynamic Links in the Firebase Console and agree to the terms and conditions.",["email-change-needs-verification"]:"Multi-factor users must always have a verified email.",["email-already-in-use"]:"The email address is already in use by another account.",["emulator-config-failed"]:'Auth instance has already been used to make a network call. Auth can no longer be configured to use the emulator. Try calling "connectAuthEmulator()" sooner.',["expired-action-code"]:"The action code has expired.",["cancelled-popup-request"]:"This operation has been cancelled due to another conflicting popup being opened.",["internal-error"]:"An internal AuthError has occurred.",["invalid-app-credential"]:"The phone verification request contains an invalid application verifier. The reCAPTCHA token response is either invalid or expired.",["invalid-app-id"]:"The mobile app identifier is not registed for the current project.",["invalid-user-token"]:"This user's credential isn't valid for this project. This can happen if the user's token has been tampered with, or if the user isn't for the project associated with this API key.",["invalid-auth-event"]:"An internal AuthError has occurred.",["invalid-verification-code"]:"The SMS verification code used to create the phone auth credential is invalid. Please resend the verification code sms and be sure to use the verification code provided by the user.",["invalid-continue-uri"]:"The continue URL provided in the request is invalid.",["invalid-cordova-configuration"]:"The following Cordova plugins must be installed to enable OAuth sign-in: cordova-plugin-buildinfo, cordova-universal-links-plugin, cordova-plugin-browsertab, cordova-plugin-inappbrowser and cordova-plugin-customurlscheme.",["invalid-custom-token"]:"The custom token format is incorrect. Please check the documentation.",["invalid-dynamic-link-domain"]:"The provided dynamic link domain is not configured or authorized for the current project.",["invalid-email"]:"The email address is badly formatted.",["invalid-emulator-scheme"]:"Emulator URL must start with a valid scheme (http:// or https://).",["invalid-api-key"]:"Your API key is invalid, please check you have copied it correctly.",["invalid-cert-hash"]:"The SHA-1 certificate hash provided is invalid.",["invalid-credential"]:"The supplied auth credential is malformed or has expired.",["invalid-message-payload"]:"The email template corresponding to this action contains invalid characters in its message. Please fix by going to the Auth email templates section in the Firebase Console.",["invalid-multi-factor-session"]:"The request does not contain a valid proof of first factor successful sign-in.",["invalid-oauth-provider"]:"EmailAuthProvider is not supported for this operation. This operation only supports OAuth providers.",["invalid-oauth-client-id"]:"The OAuth client ID provided is either invalid or does not match the specified API key.",["unauthorized-domain"]:"This domain is not authorized for OAuth operations for your Firebase project. Edit the list of authorized domains from the Firebase console.",["invalid-action-code"]:"The action code is invalid. This can happen if the code is malformed, expired, or has already been used.",["wrong-password"]:"The password is invalid or the user does not have a password.",["invalid-persistence-type"]:"The specified persistence type is invalid. It can only be local, session or none.",["invalid-phone-number"]:"The format of the phone number provided is incorrect. Please enter the phone number in a format that can be parsed into E.164 format. E.164 phone numbers are written in the format [+][country code][subscriber number including area code].",["invalid-provider-id"]:"The specified provider ID is invalid.",["invalid-recipient-email"]:"The email corresponding to this action failed to send as the provided recipient email address is invalid.",["invalid-sender"]:"The email template corresponding to this action contains an invalid sender email or name. Please fix by going to the Auth email templates section in the Firebase Console.",["invalid-verification-id"]:"The verification ID used to create the phone auth credential is invalid.",["invalid-tenant-id"]:"The Auth instance's tenant ID is invalid.",["login-blocked"]:"Login blocked by user-provided method: {$originalMessage}",["missing-android-pkg-name"]:"An Android Package Name must be provided if the Android App is required to be installed.",["auth-domain-config-required"]:"Be sure to include authDomain when calling firebase.initializeApp(), by following the instructions in the Firebase console.",["missing-app-credential"]:"The phone verification request is missing an application verifier assertion. A reCAPTCHA response token needs to be provided.",["missing-verification-code"]:"The phone auth credential was created with an empty SMS verification code.",["missing-continue-uri"]:"A continue URL must be provided in the request.",["missing-iframe-start"]:"An internal AuthError has occurred.",["missing-ios-bundle-id"]:"An iOS Bundle ID must be provided if an App Store ID is provided.",["missing-or-invalid-nonce"]:"The request does not contain a valid nonce. This can occur if the SHA-256 hash of the provided raw nonce does not match the hashed nonce in the ID token payload.",["missing-multi-factor-info"]:"No second factor identifier is provided.",["missing-multi-factor-session"]:"The request is missing proof of first factor successful sign-in.",["missing-phone-number"]:"To send verification codes, provide a phone number for the recipient.",["missing-verification-id"]:"The phone auth credential was created with an empty verification ID.",["app-deleted"]:"This instance of FirebaseApp has been deleted.",["multi-factor-info-not-found"]:"The user does not have a second factor matching the identifier provided.",["multi-factor-auth-required"]:"Proof of ownership of a second factor is required to complete sign-in.",["account-exists-with-different-credential"]:"An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.",["network-request-failed"]:"A network AuthError (such as timeout, interrupted connection or unreachable host) has occurred.",["no-auth-event"]:"An internal AuthError has occurred.",["no-such-provider"]:"User was not linked to an account with the given provider.",["null-user"]:"A null user object was provided as the argument for an operation which requires a non-null user object.",["operation-not-allowed"]:"The given sign-in provider is disabled for this Firebase project. Enable it in the Firebase console, under the sign-in method tab of the Auth section.",["operation-not-supported-in-this-environment"]:'This operation is not supported in the environment this application is running on. "location.protocol" must be http, https or chrome-extension and web storage must be enabled.',["popup-blocked"]:"Unable to establish a connection with the popup. It may have been blocked by the browser.",["popup-closed-by-user"]:"The popup has been closed by the user before finalizing the operation.",["provider-already-linked"]:"User can only be linked to one identity for the given provider.",["quota-exceeded"]:"The project's quota for this operation has been exceeded.",["redirect-cancelled-by-user"]:"The redirect operation has been cancelled by the user before finalizing.",["redirect-operation-pending"]:"A redirect sign-in operation is already pending.",["rejected-credential"]:"The request contains malformed or mismatching credentials.",["second-factor-already-in-use"]:"The second factor is already enrolled on this account.",["maximum-second-factor-count-exceeded"]:"The maximum allowed number of second factors on a user has been exceeded.",["tenant-id-mismatch"]:"The provided tenant ID does not match the Auth instance's tenant ID",["timeout"]:"The operation has timed out.",["user-token-expired"]:"The user's credential is no longer valid. The user must sign in again.",["too-many-requests"]:"We have blocked all requests from this device due to unusual activity. Try again later.",["unauthorized-continue-uri"]:"The domain of the continue URL is not whitelisted.  Please whitelist the domain in the Firebase console.",["unsupported-first-factor"]:"Enrolling a second factor or signing in with a multi-factor account requires sign-in with a supported first factor.",["unsupported-persistence-type"]:"The current environment does not support the specified persistence type.",["unsupported-tenant-operation"]:"This operation is not supported in a multi-tenant context.",["unverified-email"]:"The operation requires a verified email.",["user-cancelled"]:"The user did not grant your application the permissions it requested.",["user-not-found"]:"There is no user record corresponding to this identifier. The user may have been deleted.",["user-disabled"]:"The user account has been disabled by an administrator.",["user-mismatch"]:"The supplied credentials do not correspond to the previously signed in user.",["user-signed-out"]:"",["weak-password"]:"The password must be 6 characters long or more.",["web-storage-unsupported"]:"This browser is not supported or 3rd party cookies and data may be disabled.",["already-initialized"]:"initializeAuth() has already been called with different options. To avoid this error, call initializeAuth() with the same options as when it was originally called, or call getAuth() to return the already initialized instance."}}function h(){return{["dependent-sdk-initialized-before-auth"]:"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const d=u,f=h,p=new r["b"]("auth","Firebase",h()),g=new o["b"]("@firebase/auth");function m(e,...t){g.logLevel<=o["a"].ERROR&&g.error(`Auth (${i["SDK_VERSION"]}): ${e}`,...t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function v(e,...t){throw _(e,...t)}function y(e,...t){return _(e,...t)}function b(e,t,n){const i=Object.assign(Object.assign({},f()),{[t]:n}),s=new r["b"]("auth","Firebase",i);return s.create(t,{appName:e.name})}function w(e,t,n){const r=n;if(!(t instanceof r))throw r.name!==t.constructor.name&&v(e,"argument-error"),b(e,"argument-error",`Type of ${t.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function _(e,...t){if("string"!==typeof e){const n=t[0],r=[...t.slice(1)];return r[0]&&(r[0].appName=e.name),e._errorFactory.create(n,...r)}return p.create(e,...t)}function E(e,t,...n){if(!e)throw _(t,...n)}function O(e){const t="INTERNAL ASSERTION FAILED: "+e;throw m(t),new Error(t)}function T(e,t){e||O(t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const I=new Map;function S(e){T(e instanceof Function,"Expected a class definition");let t=I.get(e);return t?(T(t instanceof e,"Instance stored in cache mismatched with class"),t):(t=new e,I.set(e,t),t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function k(e,t){const n=(null===t||void 0===t?void 0:t.persistence)||[],r=(Array.isArray(n)?n:[n]).map(S);(null===t||void 0===t?void 0:t.errorMap)&&e._updateErrorMap(t.errorMap),e._initializeWithPersistence(r,null===t||void 0===t?void 0:t.popupRedirectResolver)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function C(){var e;return"undefined"!==typeof self&&(null===(e=self.location)||void 0===e?void 0:e.href)||""}function A(){return"http:"===x()||"https:"===x()}function x(){var e;return"undefined"!==typeof self&&(null===(e=self.location)||void 0===e?void 0:e.protocol)||null}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function R(){return!("undefined"!==typeof navigator&&navigator&&"onLine"in navigator&&"boolean"===typeof navigator.onLine&&(A()||Object(r["o"])()||"connection"in navigator))||navigator.onLine}function N(){if("undefined"===typeof navigator)return null;const e=navigator;return e.languages&&e.languages[0]||e.language||null}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class j{constructor(e,t){this.shortDelay=e,this.longDelay=t,T(t>e,"Short delay should be less than long delay!"),this.isMobile=Object(r["t"])()||Object(r["v"])()}get(){return R()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function L(e,t){T(e.emulator,"Emulator should always be set here");const{url:n}=e.emulator;return t?`${n}${t.startsWith("/")?t.slice(1):t}`:n}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class D{static initialize(e,t,n){this.fetchImpl=e,t&&(this.headersImpl=t),n&&(this.responseImpl=n)}static fetch(){return this.fetchImpl?this.fetchImpl:"undefined"!==typeof self&&"fetch"in self?self.fetch:void O("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){return this.headersImpl?this.headersImpl:"undefined"!==typeof self&&"Headers"in self?self.Headers:void O("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){return this.responseImpl?this.responseImpl:"undefined"!==typeof self&&"Response"in self?self.Response:void O("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const P={["CREDENTIAL_MISMATCH"]:"custom-token-mismatch",["MISSING_CUSTOM_TOKEN"]:"internal-error",["INVALID_IDENTIFIER"]:"invalid-email",["MISSING_CONTINUE_URI"]:"internal-error",["INVALID_PASSWORD"]:"wrong-password",["MISSING_PASSWORD"]:"internal-error",["EMAIL_EXISTS"]:"email-already-in-use",["PASSWORD_LOGIN_DISABLED"]:"operation-not-allowed",["INVALID_IDP_RESPONSE"]:"invalid-credential",["INVALID_PENDING_TOKEN"]:"invalid-credential",["FEDERATED_USER_ID_ALREADY_LINKED"]:"credential-already-in-use",["MISSING_REQ_TYPE"]:"internal-error",["EMAIL_NOT_FOUND"]:"user-not-found",["RESET_PASSWORD_EXCEED_LIMIT"]:"too-many-requests",["EXPIRED_OOB_CODE"]:"expired-action-code",["INVALID_OOB_CODE"]:"invalid-action-code",["MISSING_OOB_CODE"]:"internal-error",["CREDENTIAL_TOO_OLD_LOGIN_AGAIN"]:"requires-recent-login",["INVALID_ID_TOKEN"]:"invalid-user-token",["TOKEN_EXPIRED"]:"user-token-expired",["USER_NOT_FOUND"]:"user-token-expired",["TOO_MANY_ATTEMPTS_TRY_LATER"]:"too-many-requests",["INVALID_CODE"]:"invalid-verification-code",["INVALID_SESSION_INFO"]:"invalid-verification-id",["INVALID_TEMPORARY_PROOF"]:"invalid-credential",["MISSING_SESSION_INFO"]:"missing-verification-id",["SESSION_EXPIRED"]:"code-expired",["MISSING_ANDROID_PACKAGE_NAME"]:"missing-android-pkg-name",["UNAUTHORIZED_DOMAIN"]:"unauthorized-continue-uri",["INVALID_OAUTH_CLIENT_ID"]:"invalid-oauth-client-id",["ADMIN_ONLY_OPERATION"]:"admin-restricted-operation",["INVALID_MFA_PENDING_CREDENTIAL"]:"invalid-multi-factor-session",["MFA_ENROLLMENT_NOT_FOUND"]:"multi-factor-info-not-found",["MISSING_MFA_ENROLLMENT_ID"]:"missing-multi-factor-info",["MISSING_MFA_PENDING_CREDENTIAL"]:"missing-multi-factor-session",["SECOND_FACTOR_EXISTS"]:"second-factor-already-in-use",["SECOND_FACTOR_LIMIT_EXCEEDED"]:"maximum-second-factor-count-exceeded",["BLOCKING_FUNCTION_ERROR_RESPONSE"]:"internal-error"},M=new j(3e4,6e4);
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function F(e,t){return e.tenantId&&!t.tenantId?Object.assign(Object.assign({},t),{tenantId:e.tenantId}):t}async function U(e,t,n,i,s={}){return V(e,s,async()=>{let s={},o={};i&&("GET"===t?o=i:s={body:JSON.stringify(i)});const a=Object(r["y"])(Object.assign({key:e.config.apiKey},o)).slice(1),c=await e._getAdditionalHeaders();return c["Content-Type"]="application/json",e.languageCode&&(c["X-Firebase-Locale"]=e.languageCode),D.fetch()(z(e,e.config.apiHost,n,a),Object.assign({method:t,headers:c,referrerPolicy:"no-referrer"},s))})}async function V(e,t,n){e._canInitEmulator=!1;const i=Object.assign(Object.assign({},P),t);try{const t=new $(e),r=await Promise.race([n(),t.promise]);t.clearNetworkTimeout();const s=await r.json();if("needConfirmation"in s)throw q(e,"account-exists-with-different-credential",s);if(r.ok&&!("errorMessage"in s))return s;{const t=r.ok?s.errorMessage:s.error.message,[n,o]=t.split(" : ");if("FEDERATED_USER_ID_ALREADY_LINKED"===n)throw q(e,"credential-already-in-use",s);if("EMAIL_EXISTS"===n)throw q(e,"email-already-in-use",s);if("USER_DISABLED"===n)throw q(e,"user-disabled",s);const a=i[n]||n.toLowerCase().replace(/[_\s]+/g,"-");if(o)throw b(e,a,o);v(e,a)}}catch(s){if(s instanceof r["c"])throw s;v(e,"network-request-failed")}}async function B(e,t,n,r,i={}){const s=await U(e,t,n,r,i);return"mfaPendingCredential"in s&&v(e,"multi-factor-auth-required",{_serverResponse:s}),s}function z(e,t,n,r){const i=`${t}${n}?${r}`;return e.config.emulator?L(e.config,i):`${e.config.apiScheme}://${i}`}class ${constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((e,t)=>{this.timer=setTimeout(()=>t(y(this.auth,"network-request-failed")),M.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function q(e,t,n){const r={appName:e.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const i=y(e,t,r);return i.customData._tokenResponse=n,i}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function H(e,t){return U(e,"POST","/v1/accounts:delete",t)}async function W(e,t){return U(e,"POST","/v1/accounts:update",t)}async function G(e,t){return U(e,"POST","/v1/accounts:lookup",t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function K(e){if(e)try{const t=new Date(Number(e));if(!isNaN(t.getTime()))return t.toUTCString()}catch(t){}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Y(e,t=!1){const n=Object(r["l"])(e),i=await n.getIdToken(t),s=X(i);E(s&&s.exp&&s.auth_time&&s.iat,n.auth,"internal-error");const o="object"===typeof s.firebase?s.firebase:void 0,a=null===o||void 0===o?void 0:o["sign_in_provider"];return{claims:s,token:i,authTime:K(Q(s.auth_time)),issuedAtTime:K(Q(s.iat)),expirationTime:K(Q(s.exp)),signInProvider:a||null,signInSecondFactor:(null===o||void 0===o?void 0:o["sign_in_second_factor"])||null}}function Q(e){return 1e3*Number(e)}function X(e){var t;const[n,i,s]=e.split(".");if(void 0===n||void 0===i||void 0===s)return m("JWT malformed, contained fewer than 3 sections"),null;try{const e=Object(r["d"])(i);return e?JSON.parse(e):(m("Failed to decode base64 JWT payload"),null)}catch(o){return m("Caught error parsing JWT payload as JSON",null===(t=o)||void 0===t?void 0:t.toString()),null}}function J(e){const t=X(e);return E(t,"internal-error"),E("undefined"!==typeof t.exp,"internal-error"),E("undefined"!==typeof t.iat,"internal-error"),Number(t.exp)-Number(t.iat)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Z(e,t,n=!1){if(n)return t;try{return await t}catch(i){throw i instanceof r["c"]&&ee(i)&&e.auth.currentUser===e&&await e.auth.signOut(),i}}function ee({code:e}){return"auth/user-disabled"===e||"auth/user-token-expired"===e}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class te{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,null!==this.timerId&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const e=this.errorBackoff;return this.errorBackoff=Math.min(2*this.errorBackoff,96e4),e}{this.errorBackoff=3e4;const e=null!==(t=this.user.stsTokenManager.expirationTime)&&void 0!==t?t:0,n=e-Date.now()-3e5;return Math.max(0,n)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){var e;try{await this.user.getIdToken(!0)}catch(t){return void("auth/network-request-failed"===(null===(e=t)||void 0===e?void 0:e.code)&&this.schedule(!0))}this.schedule()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ne{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=K(this.lastLoginAt),this.creationTime=K(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function re(e){var t;const n=e.auth,r=await e.getIdToken(),i=await Z(e,G(n,{idToken:r}));E(null===i||void 0===i?void 0:i.users.length,n,"internal-error");const s=i.users[0];e._notifyReloadListener(s);const o=(null===(t=s.providerUserInfo)||void 0===t?void 0:t.length)?oe(s.providerUserInfo):[],a=se(e.providerData,o),c=e.isAnonymous,l=!(e.email&&s.passwordHash)&&!(null===a||void 0===a?void 0:a.length),u=!!c&&l,h={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:a,metadata:new ne(s.createdAt,s.lastLoginAt),isAnonymous:u};Object.assign(e,h)}async function ie(e){const t=Object(r["l"])(e);await re(t),await t.auth._persistUserIfCurrent(t),t.auth._notifyListenersIfCurrent(t)}function se(e,t){const n=e.filter(e=>!t.some(t=>t.providerId===e.providerId));return[...n,...t]}function oe(e){return e.map(e=>{var{providerId:t}=e,n=s(e,["providerId"]);return{providerId:t,uid:n.rawId||"",displayName:n.displayName||null,email:n.email||null,phoneNumber:n.phoneNumber||null,photoURL:n.photoUrl||null}})}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ae(e,t){const n=await V(e,{},async()=>{const n=Object(r["y"])({grant_type:"refresh_token",refresh_token:t}).slice(1),{tokenApiHost:i,apiKey:s}=e.config,o=z(e,i,"/v1/token","key="+s),a=await e._getAdditionalHeaders();return a["Content-Type"]="application/x-www-form-urlencoded",D.fetch()(o,{method:"POST",headers:a,body:n})});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ce{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){E(e.idToken,"internal-error"),E("undefined"!==typeof e.idToken,"internal-error"),E("undefined"!==typeof e.refreshToken,"internal-error");const t="expiresIn"in e&&"undefined"!==typeof e.expiresIn?Number(e.expiresIn):J(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}async getToken(e,t=!1){return E(!this.accessToken||this.refreshToken,e,"user-token-expired"),t||!this.accessToken||this.isExpired?this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null:this.accessToken}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:n,refreshToken:r,expiresIn:i}=await ae(e,t);this.updateTokensAndExpiration(n,r,Number(i))}updateTokensAndExpiration(e,t,n){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+1e3*n}static fromJSON(e,t){const{refreshToken:n,accessToken:r,expirationTime:i}=t,s=new ce;return n&&(E("string"===typeof n,"internal-error",{appName:e}),s.refreshToken=n),r&&(E("string"===typeof r,"internal-error",{appName:e}),s.accessToken=r),i&&(E("number"===typeof i,"internal-error",{appName:e}),s.expirationTime=i),s}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new ce,this.toJSON())}_performRefresh(){return O("not implemented")}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function le(e,t){E("string"===typeof e||"undefined"===typeof e,"internal-error",{appName:t})}class ue{constructor(e){var{uid:t,auth:n,stsTokenManager:r}=e,i=s(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new te(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=n,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new ne(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const t=await Z(this,this.stsTokenManager.getToken(this.auth,e));return E(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return Y(this,e)}reload(){return ie(this)}_assign(e){this!==e&&(E(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(e=>Object.assign({},e)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){return new ue(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}))}_onReload(e){E(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let n=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),n=!0),t&&await re(this),await this.auth._persistUserIfCurrent(this),n&&this.auth._notifyListenersIfCurrent(this)}async delete(){const e=await this.getIdToken();return await Z(this,H(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var n,r,i,s,o,a,c,l;const u=null!==(n=t.displayName)&&void 0!==n?n:void 0,h=null!==(r=t.email)&&void 0!==r?r:void 0,d=null!==(i=t.phoneNumber)&&void 0!==i?i:void 0,f=null!==(s=t.photoURL)&&void 0!==s?s:void 0,p=null!==(o=t.tenantId)&&void 0!==o?o:void 0,g=null!==(a=t._redirectEventId)&&void 0!==a?a:void 0,m=null!==(c=t.createdAt)&&void 0!==c?c:void 0,v=null!==(l=t.lastLoginAt)&&void 0!==l?l:void 0,{uid:y,emailVerified:b,isAnonymous:w,providerData:_,stsTokenManager:O}=t;E(y&&O,e,"internal-error");const T=ce.fromJSON(this.name,O);E("string"===typeof y,e,"internal-error"),le(u,e.name),le(h,e.name),E("boolean"===typeof b,e,"internal-error"),E("boolean"===typeof w,e,"internal-error"),le(d,e.name),le(f,e.name),le(p,e.name),le(g,e.name),le(m,e.name),le(v,e.name);const I=new ue({uid:y,auth:e,email:h,emailVerified:b,displayName:u,isAnonymous:w,photoURL:f,phoneNumber:d,tenantId:p,stsTokenManager:T,createdAt:m,lastLoginAt:v});return _&&Array.isArray(_)&&(I.providerData=_.map(e=>Object.assign({},e))),g&&(I._redirectEventId=g),I}static async _fromIdTokenResponse(e,t,n=!1){const r=new ce;r.updateFromServerResponse(t);const i=new ue({uid:t.localId,auth:e,stsTokenManager:r,isAnonymous:n});return await re(i),i}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class he{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return void 0===t?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}he.type="NONE";const de=he;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fe(e,t,n){return`firebase:${e}:${t}:${n}`}class pe{constructor(e,t,n){this.persistence=e,this.auth=t,this.userKey=n;const{config:r,name:i}=this.auth;this.fullUserKey=fe(this.userKey,r.apiKey,i),this.fullPersistenceKey=fe("persistence",r.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?ue._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();return await this.removeCurrentUser(),this.persistence=e,t?this.setCurrentUser(t):void 0}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,n="authUser"){if(!t.length)return new pe(S(de),e,n);const r=(await Promise.all(t.map(async e=>{if(await e._isAvailable())return e}))).filter(e=>e);let i=r[0]||S(de);const s=fe(n,e.config.apiKey,e.name);let o=null;for(const l of t)try{const t=await l._get(s);if(t){const n=ue._fromJSON(e,t);l!==i&&(o=n),i=l;break}}catch(c){}const a=r.filter(e=>e._shouldAllowMigration);return i._shouldAllowMigration&&a.length?(i=a[0],o&&await i._set(s,o.toJSON()),await Promise.all(t.map(async e=>{if(e!==i)try{await e._remove(s)}catch(c){}})),new pe(i,e,n)):new pe(i,e,n)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ge(e){const t=e.toLowerCase();if(t.includes("opera/")||t.includes("opr/")||t.includes("opios/"))return"Opera";if(be(t))return"IEMobile";if(t.includes("msie")||t.includes("trident/"))return"IE";if(t.includes("edge/"))return"Edge";if(me(t))return"Firefox";if(t.includes("silk/"))return"Silk";if(_e(t))return"Blackberry";if(Ee(t))return"Webos";if(ve(t))return"Safari";if((t.includes("chrome/")||ye(t))&&!t.includes("edge/"))return"Chrome";if(we(t))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,n=e.match(t);if(2===(null===n||void 0===n?void 0:n.length))return n[1]}return"Other"}function me(e=Object(r["m"])()){return/firefox\//i.test(e)}function ve(e=Object(r["m"])()){const t=e.toLowerCase();return t.includes("safari/")&&!t.includes("chrome/")&&!t.includes("crios/")&&!t.includes("android")}function ye(e=Object(r["m"])()){return/crios\//i.test(e)}function be(e=Object(r["m"])()){return/iemobile/i.test(e)}function we(e=Object(r["m"])()){return/android/i.test(e)}function _e(e=Object(r["m"])()){return/blackberry/i.test(e)}function Ee(e=Object(r["m"])()){return/webos/i.test(e)}function Oe(e=Object(r["m"])()){return/iphone|ipad|ipod/i.test(e)||/macintosh/i.test(e)&&/mobile/i.test(e)}function Te(e=Object(r["m"])()){return/(iPad|iPhone|iPod).*OS 7_\d/i.test(e)||/(iPad|iPhone|iPod).*OS 8_\d/i.test(e)}function Ie(e=Object(r["m"])()){var t;return Oe(e)&&!!(null===(t=window.navigator)||void 0===t?void 0:t.standalone)}function Se(){return Object(r["r"])()&&10===document.documentMode}function ke(e=Object(r["m"])()){return Oe(e)||we(e)||Ee(e)||_e(e)||/windows phone/i.test(e)||be(e)}function Ce(){try{return!(!window||window===window.top)}catch(e){return!1}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ae(e,t=[]){let n;switch(e){case"Browser":n=ge(Object(r["m"])());break;case"Worker":n=`${ge(Object(r["m"])())}-${e}`;break;default:n=e}const s=t.length?t.join(","):"FirebaseCore-web";return`${n}/JsCore/${i["SDK_VERSION"]}/${s}`}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xe{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const n=t=>new Promise((n,r)=>{try{const r=e(t);n(r)}catch(i){r(i)}});n.onAbort=t,this.queue.push(n);const r=this.queue.length-1;return()=>{this.queue[r]=()=>Promise.resolve()}}async runMiddleware(e){var t;if(this.auth.currentUser===e)return;const n=[];try{for(const t of this.queue)await t(e),t.onAbort&&n.push(t.onAbort)}catch(r){n.reverse();for(const e of n)try{e()}catch(i){}throw this.auth._errorFactory.create("login-blocked",{originalMessage:null===(t=r)||void 0===t?void 0:t.message})}}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Re{constructor(e,t,n){this.app=e,this.heartbeatServiceProvider=t,this.config=n,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new je(this),this.idTokenSubscription=new je(this),this.beforeStateQueue=new xe(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=p,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=n.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=S(t)),this._initializationPromise=this.queue(async()=>{var n,r;if(!this._deleted&&(this.persistenceManager=await pe.create(this,e),!this._deleted)){if(null===(n=this._popupRedirectResolver)||void 0===n?void 0:n._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch(i){}await this.initializeCurrentUser(t),this.lastNotifiedUid=(null===(r=this.currentUser)||void 0===r?void 0:r.uid)||null,this._deleted||(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();return this.currentUser||e?this.currentUser&&e&&this.currentUser.uid===e.uid?(this._currentUser._assign(e),void await this.currentUser.getIdToken()):void await this._updateCurrentUser(e,!0):void 0}async initializeCurrentUser(e){var t;const n=await this.assertedPersistence.getCurrentUser();let r=n,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const n=null===(t=this.redirectUser)||void 0===t?void 0:t._redirectEventId,s=null===r||void 0===r?void 0:r._redirectEventId,o=await this.tryRedirectSignIn(e);n&&n!==s||!(null===o||void 0===o?void 0:o.user)||(r=o.user,i=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(r)}catch(s){r=n,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(s))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return E(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch(n){await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){var t;try{await re(e)}catch(n){if("auth/network-request-failed"!==(null===(t=n)||void 0===t?void 0:t.code))return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=N()}async _delete(){this._deleted=!0}async updateCurrentUser(e){const t=e?Object(r["l"])(e):null;return t&&E(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&E(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0)}setPersistence(e){return this.queue(async()=>{await this.assertedPersistence.setPersistence(S(e))})}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new r["b"]("auth","Firebase",e())}onAuthStateChanged(e,t,n){return this.registerStateListener(this.authStateSubscription,e,t,n)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,n){return this.registerStateListener(this.idTokenSubscription,e,t,n)}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:null===(e=this._currentUser)||void 0===e?void 0:e.toJSON()}}async _setRedirectUser(e,t){const n=await this.getOrInitRedirectPersistenceManager(t);return null===e?n.removeCurrentUser():n.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&S(e)||this._popupRedirectResolver;E(t,this,"argument-error"),this.redirectPersistenceManager=await pe.create(this,[S(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,n;return this._isInitialized&&await this.queue(async()=>{}),(null===(t=this._currentUser)||void 0===t?void 0:t._redirectEventId)===e?this._currentUser:(null===(n=this.redirectUser)||void 0===n?void 0:n._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const n=null!==(t=null===(e=this.currentUser)||void 0===e?void 0:e.uid)&&void 0!==t?t:null;this.lastNotifiedUid!==n&&(this.lastNotifiedUid=n,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,n,r){if(this._deleted)return()=>{};const i="function"===typeof t?t:t.next.bind(t),s=this._isInitialized?Promise.resolve():this._initializationPromise;return E(s,this,"internal-error"),s.then(()=>i(this.currentUser)),"function"===typeof t?e.addObserver(t,n,r):e.addObserver(t)}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&(this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh()),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return E(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){e&&!this.frameworks.includes(e)&&(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Ae(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={["X-Client-Version"]:this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const n=await(null===(e=this.heartbeatServiceProvider.getImmediate({optional:!0}))||void 0===e?void 0:e.getHeartbeatsHeader());return n&&(t["X-Firebase-Client"]=n),t}}function Ne(e){return Object(r["l"])(e)}class je{constructor(e){this.auth=e,this.observer=null,this.addObserver=Object(r["h"])(e=>this.observer=e)}get next(){return E(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}function Le(e,t,n){const r=Ne(e);E(r._canInitEmulator,r,"emulator-config-failed"),E(/^https?:\/\//.test(t),r,"invalid-emulator-scheme");const i=!!(null===n||void 0===n?void 0:n.disableWarnings),s=De(t),{host:o,port:a}=Pe(t),c=null===a?"":":"+a;r.config.emulator={url:`${s}//${o}${c}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:o,port:a,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:i})}),i||Fe()}function De(e){const t=e.indexOf(":");return t<0?"":e.substr(0,t+1)}function Pe(e){const t=De(e),n=/(\/\/)?([^?#/]+)/.exec(e.substr(t.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){const e=i[1];return{host:e,port:Me(r.substr(e.length+1))}}{const[e,t]=r.split(":");return{host:e,port:Me(t)}}}function Me(e){if(!e)return null;const t=Number(e);return isNaN(t)?null:t}function Fe(){function e(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}"undefined"!==typeof console&&"function"===typeof console.info&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),"undefined"!==typeof window&&"undefined"!==typeof document&&("loading"===document.readyState?window.addEventListener("DOMContentLoaded",e):e())}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ue{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return O("not implemented")}_getIdTokenResponse(e){return O("not implemented")}_linkToIdToken(e,t){return O("not implemented")}_getReauthenticationResolver(e){return O("not implemented")}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ve(e,t){return U(e,"POST","/v1/accounts:resetPassword",F(e,t))}async function Be(e,t){return U(e,"POST","/v1/accounts:update",t)}async function ze(e,t){return U(e,"POST","/v1/accounts:update",F(e,t))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function $e(e,t){return B(e,"POST","/v1/accounts:signInWithPassword",F(e,t))}async function qe(e,t){return U(e,"POST","/v1/accounts:sendOobCode",F(e,t))}async function He(e,t){return qe(e,t)}async function We(e,t){return qe(e,t)}async function Ge(e,t){return qe(e,t)}async function Ke(e,t){return qe(e,t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ye(e,t){return B(e,"POST","/v1/accounts:signInWithEmailLink",F(e,t))}async function Qe(e,t){return B(e,"POST","/v1/accounts:signInWithEmailLink",F(e,t))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xe extends Ue{constructor(e,t,n,r=null){super("password",n),this._email=e,this._password=t,this._tenantId=r}static _fromEmailAndPassword(e,t){return new Xe(e,t,"password")}static _fromEmailAndCode(e,t,n=null){return new Xe(e,t,"emailLink",n)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t="string"===typeof e?JSON.parse(e):e;if((null===t||void 0===t?void 0:t.email)&&(null===t||void 0===t?void 0:t.password)){if("password"===t.signInMethod)return this._fromEmailAndPassword(t.email,t.password);if("emailLink"===t.signInMethod)return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":return $e(e,{returnSecureToken:!0,email:this._email,password:this._password});case"emailLink":return Ye(e,{email:this._email,oobCode:this._password});default:v(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":return Be(e,{idToken:t,returnSecureToken:!0,email:this._email,password:this._password});case"emailLink":return Qe(e,{idToken:t,email:this._email,oobCode:this._password});default:v(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Je(e,t){return B(e,"POST","/v1/accounts:signInWithIdp",F(e,t))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ze="http://localhost";class et extends Ue{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new et(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):v("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t="string"===typeof e?JSON.parse(e):e,{providerId:n,signInMethod:r}=t,i=s(t,["providerId","signInMethod"]);if(!n||!r)return null;const o=new et(n,r);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){const t=this.buildRequest();return Je(e,t)}_linkToIdToken(e,t){const n=this.buildRequest();return n.idToken=t,Je(e,n)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Je(e,t)}buildRequest(){const e={requestUri:Ze,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t["id_token"]=this.idToken),this.accessToken&&(t["access_token"]=this.accessToken),this.secret&&(t["oauth_token_secret"]=this.secret),t["providerId"]=this.providerId,this.nonce&&!this.pendingToken&&(t["nonce"]=this.nonce),e.postBody=Object(r["y"])(t)}return e}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function tt(e,t){return U(e,"POST","/v1/accounts:sendVerificationCode",F(e,t))}async function nt(e,t){return B(e,"POST","/v1/accounts:signInWithPhoneNumber",F(e,t))}async function rt(e,t){const n=await B(e,"POST","/v1/accounts:signInWithPhoneNumber",F(e,t));if(n.temporaryProof)throw q(e,"account-exists-with-different-credential",n);return n}const it={["USER_NOT_FOUND"]:"user-not-found"};async function st(e,t){const n=Object.assign(Object.assign({},t),{operation:"REAUTH"});return B(e,"POST","/v1/accounts:signInWithPhoneNumber",F(e,n),it)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ot extends Ue{constructor(e){super("phone","phone"),this.params=e}static _fromVerification(e,t){return new ot({verificationId:e,verificationCode:t})}static _fromTokenResponse(e,t){return new ot({phoneNumber:e,temporaryProof:t})}_getIdTokenResponse(e){return nt(e,this._makeVerificationRequest())}_linkToIdToken(e,t){return rt(e,Object.assign({idToken:t},this._makeVerificationRequest()))}_getReauthenticationResolver(e){return st(e,this._makeVerificationRequest())}_makeVerificationRequest(){const{temporaryProof:e,phoneNumber:t,verificationId:n,verificationCode:r}=this.params;return e&&t?{temporaryProof:e,phoneNumber:t}:{sessionInfo:n,code:r}}toJSON(){const e={providerId:this.providerId};return this.params.phoneNumber&&(e.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(e.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(e.verificationCode=this.params.verificationCode),this.params.verificationId&&(e.verificationId=this.params.verificationId),e}static fromJSON(e){"string"===typeof e&&(e=JSON.parse(e));const{verificationId:t,verificationCode:n,phoneNumber:r,temporaryProof:i}=e;return n||t||r||i?new ot({verificationId:t,verificationCode:n,phoneNumber:r,temporaryProof:i}):null}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function at(e){switch(e){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function ct(e){const t=Object(r["z"])(Object(r["k"])(e))["link"],n=t?Object(r["z"])(Object(r["k"])(t))["deep_link_id"]:null,i=Object(r["z"])(Object(r["k"])(e))["deep_link_id"],s=i?Object(r["z"])(Object(r["k"])(i))["link"]:null;return s||i||n||t||e}class lt{constructor(e){var t,n,i,s,o,a;const c=Object(r["z"])(Object(r["k"])(e)),l=null!==(t=c["apiKey"])&&void 0!==t?t:null,u=null!==(n=c["oobCode"])&&void 0!==n?n:null,h=at(null!==(i=c["mode"])&&void 0!==i?i:null);E(l&&u&&h,"argument-error"),this.apiKey=l,this.operation=h,this.code=u,this.continueUrl=null!==(s=c["continueUrl"])&&void 0!==s?s:null,this.languageCode=null!==(o=c["languageCode"])&&void 0!==o?o:null,this.tenantId=null!==(a=c["tenantId"])&&void 0!==a?a:null}static parseLink(e){const t=ct(e);try{return new lt(t)}catch(n){return null}}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ut{constructor(){this.providerId=ut.PROVIDER_ID}static credential(e,t){return Xe._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const n=lt.parseLink(t);return E(n,"argument-error"),Xe._fromEmailAndCode(e,n.code,n.tenantId)}}ut.PROVIDER_ID="password",ut.EMAIL_PASSWORD_SIGN_IN_METHOD="password",ut.EMAIL_LINK_SIGN_IN_METHOD="emailLink";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ht{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dt extends ht{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}class ft extends dt{static credentialFromJSON(e){const t="string"===typeof e?JSON.parse(e):e;return E("providerId"in t&&"signInMethod"in t,"argument-error"),et._fromParams(t)}credential(e){return this._credential(Object.assign(Object.assign({},e),{nonce:e.rawNonce}))}_credential(e){return E(e.idToken||e.accessToken,"argument-error"),et._fromParams(Object.assign(Object.assign({},e),{providerId:this.providerId,signInMethod:this.providerId}))}static credentialFromResult(e){return ft.oauthCredentialFromTaggedObject(e)}static credentialFromError(e){return ft.oauthCredentialFromTaggedObject(e.customData||{})}static oauthCredentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:n,oauthTokenSecret:r,pendingToken:i,nonce:s,providerId:o}=e;if(!n&&!r&&!t&&!i)return null;if(!o)return null;try{return new ft(o)._credential({idToken:t,accessToken:n,nonce:s,pendingToken:i})}catch(a){return null}}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pt extends dt{constructor(){super("facebook.com")}static credential(e){return et._fromParams({providerId:pt.PROVIDER_ID,signInMethod:pt.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return pt.credentialFromTaggedObject(e)}static credentialFromError(e){return pt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e))return null;if(!e.oauthAccessToken)return null;try{return pt.credential(e.oauthAccessToken)}catch(t){return null}}}pt.FACEBOOK_SIGN_IN_METHOD="facebook.com",pt.PROVIDER_ID="facebook.com";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class gt extends dt{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return et._fromParams({providerId:gt.PROVIDER_ID,signInMethod:gt.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return gt.credentialFromTaggedObject(e)}static credentialFromError(e){return gt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:n}=e;if(!t&&!n)return null;try{return gt.credential(t,n)}catch(r){return null}}}gt.GOOGLE_SIGN_IN_METHOD="google.com",gt.PROVIDER_ID="google.com";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class mt extends dt{constructor(){super("github.com")}static credential(e){return et._fromParams({providerId:mt.PROVIDER_ID,signInMethod:mt.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return mt.credentialFromTaggedObject(e)}static credentialFromError(e){return mt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e))return null;if(!e.oauthAccessToken)return null;try{return mt.credential(e.oauthAccessToken)}catch(t){return null}}}mt.GITHUB_SIGN_IN_METHOD="github.com",mt.PROVIDER_ID="github.com";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const vt="http://localhost";class yt extends Ue{constructor(e,t){super(e,e),this.pendingToken=t}_getIdTokenResponse(e){const t=this.buildRequest();return Je(e,t)}_linkToIdToken(e,t){const n=this.buildRequest();return n.idToken=t,Je(e,n)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Je(e,t)}toJSON(){return{signInMethod:this.signInMethod,providerId:this.providerId,pendingToken:this.pendingToken}}static fromJSON(e){const t="string"===typeof e?JSON.parse(e):e,{providerId:n,signInMethod:r,pendingToken:i}=t;return n&&r&&i&&n===r?new yt(n,i):null}static _create(e,t){return new yt(e,t)}buildRequest(){return{requestUri:vt,returnSecureToken:!0,pendingToken:this.pendingToken}}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bt="saml.";class wt extends ht{constructor(e){E(e.startsWith(bt),"argument-error"),super(e)}static credentialFromResult(e){return wt.samlCredentialFromTaggedObject(e)}static credentialFromError(e){return wt.samlCredentialFromTaggedObject(e.customData||{})}static credentialFromJSON(e){const t=yt.fromJSON(e);return E(t,"argument-error"),t}static samlCredentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{pendingToken:t,providerId:n}=e;if(!t||!n)return null;try{return yt._create(n,t)}catch(r){return null}}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _t extends dt{constructor(){super("twitter.com")}static credential(e,t){return et._fromParams({providerId:_t.PROVIDER_ID,signInMethod:_t.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return _t.credentialFromTaggedObject(e)}static credentialFromError(e){return _t.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:n}=e;if(!t||!n)return null;try{return _t.credential(t,n)}catch(r){return null}}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function Et(e,t){return B(e,"POST","/v1/accounts:signUp",F(e,t))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */_t.TWITTER_SIGN_IN_METHOD="twitter.com",_t.PROVIDER_ID="twitter.com";class Ot{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,n,r=!1){const i=await ue._fromIdTokenResponse(e,n,r),s=Tt(n),o=new Ot({user:i,providerId:s,_tokenResponse:n,operationType:t});return o}static async _forOperation(e,t,n){await e._updateTokensIfNecessary(n,!0);const r=Tt(n);return new Ot({user:e,providerId:r,_tokenResponse:n,operationType:t})}}function Tt(e){return e.providerId?e.providerId:"phoneNumber"in e?"phone":null}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function It(e){var t;const n=Ne(e);if(await n._initializationPromise,null===(t=n.currentUser)||void 0===t?void 0:t.isAnonymous)return new Ot({user:n.currentUser,providerId:null,operationType:"signIn"});const r=await Et(n,{returnSecureToken:!0}),i=await Ot._fromIdTokenResponse(n,"signIn",r,!0);return await n._updateCurrentUser(i.user),i}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class St extends r["c"]{constructor(e,t,n,r){var i;super(t.code,t.message),this.operationType=n,this.user=r,Object.setPrototypeOf(this,St.prototype),this.customData={appName:e.name,tenantId:null!==(i=e.tenantId)&&void 0!==i?i:void 0,_serverResponse:t.customData._serverResponse,operationType:n}}static _fromErrorAndOperation(e,t,n,r){return new St(e,t,n,r)}}function kt(e,t,n,r){const i="reauthenticate"===t?n._getReauthenticationResolver(e):n._getIdTokenResponse(e);return i.catch(n=>{if("auth/multi-factor-auth-required"===n.code)throw St._fromErrorAndOperation(e,n,t,r);throw n})}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ct(e){return new Set(e.map(({providerId:e})=>e).filter(e=>!!e))}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function At(e,t){const n=Object(r["l"])(e);await Rt(!0,n,t);const{providerUserInfo:i}=await W(n.auth,{idToken:await n.getIdToken(),deleteProvider:[t]}),s=Ct(i||[]);return n.providerData=n.providerData.filter(e=>s.has(e.providerId)),s.has("phone")||(n.phoneNumber=null),await n.auth._persistUserIfCurrent(n),n}async function xt(e,t,n=!1){const r=await Z(e,t._linkToIdToken(e.auth,await e.getIdToken()),n);return Ot._forOperation(e,"link",r)}async function Rt(e,t,n){await re(t);const r=Ct(t.providerData),i=!1===e?"provider-already-linked":"no-such-provider";E(r.has(n)===e,t.auth,i)}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Nt(e,t,n=!1){var r;const{auth:i}=e,s="reauthenticate";try{const r=await Z(e,kt(i,s,t,e),n);E(r.idToken,i,"internal-error");const o=X(r.idToken);E(o,i,"internal-error");const{sub:a}=o;return E(e.uid===a,i,"user-mismatch"),Ot._forOperation(e,s,r)}catch(o){throw"auth/user-not-found"===(null===(r=o)||void 0===r?void 0:r.code)&&v(i,"user-mismatch"),o}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function jt(e,t,n=!1){const r="signIn",i=await kt(e,r,t),s=await Ot._fromIdTokenResponse(e,r,i);return n||await e._updateCurrentUser(s.user),s}async function Lt(e,t){return jt(Ne(e),t)}async function Dt(e,t){const n=Object(r["l"])(e);return await Rt(!1,n,t.providerId),xt(n,t)}async function Pt(e,t){return Nt(Object(r["l"])(e),t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Mt(e,t){return B(e,"POST","/v1/accounts:signInWithCustomToken",F(e,t))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ft(e,t){const n=Ne(e),r=await Mt(n,{token:t,returnSecureToken:!0}),i=await Ot._fromIdTokenResponse(n,"signIn",r);return await n._updateCurrentUser(i.user),i}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ut{constructor(e,t){this.factorId=e,this.uid=t.mfaEnrollmentId,this.enrollmentTime=new Date(t.enrolledAt).toUTCString(),this.displayName=t.displayName}static _fromServerResponse(e,t){return"phoneInfo"in t?Vt._fromServerResponse(e,t):v(e,"internal-error")}}class Vt extends Ut{constructor(e){super("phone",e),this.phoneNumber=e.phoneInfo}static _fromServerResponse(e,t){return new Vt(t)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bt(e,t,n){var r;E((null===(r=n.url)||void 0===r?void 0:r.length)>0,e,"invalid-continue-uri"),E("undefined"===typeof n.dynamicLinkDomain||n.dynamicLinkDomain.length>0,e,"invalid-dynamic-link-domain"),t.continueUrl=n.url,t.dynamicLinkDomain=n.dynamicLinkDomain,t.canHandleCodeInApp=n.handleCodeInApp,n.iOS&&(E(n.iOS.bundleId.length>0,e,"missing-ios-bundle-id"),t.iOSBundleId=n.iOS.bundleId),n.android&&(E(n.android.packageName.length>0,e,"missing-android-pkg-name"),t.androidInstallApp=n.android.installApp,t.androidMinimumVersionCode=n.android.minimumVersion,t.androidPackageName=n.android.packageName)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function zt(e,t,n){const i=Object(r["l"])(e),s={requestType:"PASSWORD_RESET",email:t};n&&Bt(i,s,n),await We(i,s)}async function $t(e,t,n){await Ve(Object(r["l"])(e),{oobCode:t,newPassword:n})}async function qt(e,t){await ze(Object(r["l"])(e),{oobCode:t})}async function Ht(e,t){const n=Object(r["l"])(e),i=await Ve(n,{oobCode:t}),s=i.requestType;switch(E(s,n,"internal-error"),s){case"EMAIL_SIGNIN":break;case"VERIFY_AND_CHANGE_EMAIL":E(i.newEmail,n,"internal-error");break;case"REVERT_SECOND_FACTOR_ADDITION":E(i.mfaInfo,n,"internal-error");default:E(i.email,n,"internal-error")}let o=null;return i.mfaInfo&&(o=Ut._fromServerResponse(Ne(n),i.mfaInfo)),{data:{email:("VERIFY_AND_CHANGE_EMAIL"===i.requestType?i.newEmail:i.email)||null,previousEmail:("VERIFY_AND_CHANGE_EMAIL"===i.requestType?i.email:i.newEmail)||null,multiFactorInfo:o},operation:s}}async function Wt(e,t){const{data:n}=await Ht(Object(r["l"])(e),t);return n.email}async function Gt(e,t,n){const r=Ne(e),i=await Et(r,{returnSecureToken:!0,email:t,password:n}),s=await Ot._fromIdTokenResponse(r,"signIn",i);return await r._updateCurrentUser(s.user),s}function Kt(e,t,n){return Lt(Object(r["l"])(e),ut.credential(t,n))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Yt(e,t,n){const i=Object(r["l"])(e),s={requestType:"EMAIL_SIGNIN",email:t};E(n.handleCodeInApp,i,"argument-error"),n&&Bt(i,s,n),await Ge(i,s)}function Qt(e,t){const n=lt.parseLink(t);return"EMAIL_SIGNIN"===(null===n||void 0===n?void 0:n.operation)}async function Xt(e,t,n){const i=Object(r["l"])(e),s=ut.credentialWithLink(t,n||C());return E(s._tenantId===(i.tenantId||null),i,"tenant-id-mismatch"),Lt(i,s)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Jt(e,t){return U(e,"POST","/v1/accounts:createAuthUri",F(e,t))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Zt(e,t){const n=A()?C():"http://localhost",i={identifier:t,continueUri:n},{signinMethods:s}=await Jt(Object(r["l"])(e),i);return s||[]}async function en(e,t){const n=Object(r["l"])(e),i=await e.getIdToken(),s={requestType:"VERIFY_EMAIL",idToken:i};t&&Bt(n.auth,s,t);const{email:o}=await He(n.auth,s);o!==e.email&&await e.reload()}async function tn(e,t,n){const i=Object(r["l"])(e),s=await e.getIdToken(),o={requestType:"VERIFY_AND_CHANGE_EMAIL",idToken:s,newEmail:t};n&&Bt(i.auth,o,n);const{email:a}=await Ke(i.auth,o);a!==e.email&&await e.reload()}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function nn(e,t){return U(e,"POST","/v1/accounts:update",t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function rn(e,{displayName:t,photoURL:n}){if(void 0===t&&void 0===n)return;const i=Object(r["l"])(e),s=await i.getIdToken(),o={idToken:s,displayName:t,photoUrl:n,returnSecureToken:!0},a=await Z(i,nn(i.auth,o));i.displayName=a.displayName||null,i.photoURL=a.photoUrl||null;const c=i.providerData.find(({providerId:e})=>"password"===e);c&&(c.displayName=i.displayName,c.photoURL=i.photoURL),await i._updateTokensIfNecessary(a)}function sn(e,t){return an(Object(r["l"])(e),t,null)}function on(e,t){return an(Object(r["l"])(e),null,t)}async function an(e,t,n){const{auth:r}=e,i=await e.getIdToken(),s={idToken:i,returnSecureToken:!0};t&&(s.email=t),n&&(s.password=n);const o=await Z(e,Be(r,s));await e._updateTokensIfNecessary(o,!0)}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cn(e){var t,n;if(!e)return null;const{providerId:r}=e,i=e.rawUserInfo?JSON.parse(e.rawUserInfo):{},s=e.isNewUser||"identitytoolkit#SignupNewUserResponse"===e.kind;if(!r&&(null===e||void 0===e?void 0:e.idToken)){const r=null===(n=null===(t=X(e.idToken))||void 0===t?void 0:t.firebase)||void 0===n?void 0:n["sign_in_provider"];if(r){const e="anonymous"!==r&&"custom"!==r?r:null;return new ln(s,e)}}if(!r)return null;switch(r){case"facebook.com":return new hn(s,i);case"github.com":return new dn(s,i);case"google.com":return new fn(s,i);case"twitter.com":return new pn(s,i,e.screenName||null);case"custom":case"anonymous":return new ln(s,null);default:return new ln(s,r,i)}}class ln{constructor(e,t,n={}){this.isNewUser=e,this.providerId=t,this.profile=n}}class un extends ln{constructor(e,t,n,r){super(e,t,n),this.username=r}}class hn extends ln{constructor(e,t){super(e,"facebook.com",t)}}class dn extends un{constructor(e,t){super(e,"github.com",t,"string"===typeof(null===t||void 0===t?void 0:t.login)?null===t||void 0===t?void 0:t.login:null)}}class fn extends ln{constructor(e,t){super(e,"google.com",t)}}class pn extends un{constructor(e,t,n){super(e,"twitter.com",t,n)}}function gn(e){const{user:t,_tokenResponse:n}=e;return t.isAnonymous&&!n?{providerId:null,isNewUser:!1,profile:null}:cn(n)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mn{constructor(e,t){this.type=e,this.credential=t}static _fromIdtoken(e){return new mn("enroll",e)}static _fromMfaPendingCredential(e){return new mn("signin",e)}toJSON(){const e="enroll"===this.type?"idToken":"pendingCredential";return{multiFactorSession:{[e]:this.credential}}}static fromJSON(e){var t,n;if(null===e||void 0===e?void 0:e.multiFactorSession){if(null===(t=e.multiFactorSession)||void 0===t?void 0:t.pendingCredential)return mn._fromMfaPendingCredential(e.multiFactorSession.pendingCredential);if(null===(n=e.multiFactorSession)||void 0===n?void 0:n.idToken)return mn._fromIdtoken(e.multiFactorSession.idToken)}return null}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vn{constructor(e,t,n){this.session=e,this.hints=t,this.signInResolver=n}static _fromError(e,t){const n=Ne(e),r=t.customData._serverResponse,i=(r.mfaInfo||[]).map(e=>Ut._fromServerResponse(n,e));E(r.mfaPendingCredential,n,"internal-error");const s=mn._fromMfaPendingCredential(r.mfaPendingCredential);return new vn(s,i,async e=>{const i=await e._process(n,s);delete r.mfaInfo,delete r.mfaPendingCredential;const o=Object.assign(Object.assign({},r),{idToken:i.idToken,refreshToken:i.refreshToken});switch(t.operationType){case"signIn":const e=await Ot._fromIdTokenResponse(n,t.operationType,o);return await n._updateCurrentUser(e.user),e;case"reauthenticate":return E(t.user,n,"internal-error"),Ot._forOperation(t.user,t.operationType,o);default:v(n,"internal-error")}})}async resolveSignIn(e){const t=e;return this.signInResolver(t)}}function yn(e,t){var n;const i=Object(r["l"])(e),s=t;return E(t.customData.operationType,i,"argument-error"),E(null===(n=s.customData._serverResponse)||void 0===n?void 0:n.mfaPendingCredential,i,"argument-error"),vn._fromError(i,s)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bn(e,t){return U(e,"POST","/v2/accounts/mfaEnrollment:start",F(e,t))}function wn(e,t){return U(e,"POST","/v2/accounts/mfaEnrollment:finalize",F(e,t))}function _n(e,t){return U(e,"POST","/v2/accounts/mfaEnrollment:withdraw",F(e,t))}class En{constructor(e){this.user=e,this.enrolledFactors=[],e._onReload(t=>{t.mfaInfo&&(this.enrolledFactors=t.mfaInfo.map(t=>Ut._fromServerResponse(e.auth,t)))})}static _fromUser(e){return new En(e)}async getSession(){return mn._fromIdtoken(await this.user.getIdToken())}async enroll(e,t){const n=e,r=await this.getSession(),i=await Z(this.user,n._process(this.user.auth,r,t));return await this.user._updateTokensIfNecessary(i),this.user.reload()}async unenroll(e){var t;const n="string"===typeof e?e:e.uid,r=await this.user.getIdToken(),i=await Z(this.user,_n(this.user.auth,{idToken:r,mfaEnrollmentId:n}));this.enrolledFactors=this.enrolledFactors.filter(({uid:e})=>e!==n),await this.user._updateTokensIfNecessary(i);try{await this.user.reload()}catch(s){if("auth/user-token-expired"!==(null===(t=s)||void 0===t?void 0:t.code))throw s}}}const On=new WeakMap;function Tn(e){const t=Object(r["l"])(e);return On.has(t)||On.set(t,En._fromUser(t)),On.get(t)}const In="__sak";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sn{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(In,"1"),this.storage.removeItem(In),Promise.resolve(!0)):Promise.resolve(!1)}catch(e){return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kn(){const e=Object(r["m"])();return ve(e)||Oe(e)}const Cn=1e3,An=10;class xn extends Sn{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.safariLocalStorageNotSynced=kn()&&Ce(),this.fallbackToPolling=ke(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const n=this.storage.getItem(t),r=this.localCache[t];n!==r&&e(t,r,n)}}onStorageEvent(e,t=!1){if(!e.key)return void this.forAllChangedKeys((e,t,n)=>{this.notifyListeners(e,n)});const n=e.key;if(t?this.detachListener():this.stopPolling(),this.safariLocalStorageNotSynced){const r=this.storage.getItem(n);if(e.newValue!==r)null!==e.newValue?this.storage.setItem(n,e.newValue):this.storage.removeItem(n);else if(this.localCache[n]===e.newValue&&!t)return}const r=()=>{const e=this.storage.getItem(n);(t||this.localCache[n]!==e)&&this.notifyListeners(n,e)},i=this.storage.getItem(n);Se()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(r,An):r()}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const r of Array.from(n))r(t?JSON.parse(t):t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,n)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:n}),!0)})},Cn)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){0===Object.keys(this.listeners).length&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),0===this.listeners[e].size&&delete this.listeners[e]),0===Object.keys(this.listeners).length&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}xn.type="LOCAL";const Rn=xn;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nn extends Sn{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}Nn.type="SESSION";const jn=Nn;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ln(e){return Promise.all(e.map(async e=>{try{const t=await e;return{fulfilled:!0,value:t}}catch(t){return{fulfilled:!1,reason:t}}}))}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dn{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(t=>t.isListeningto(e));if(t)return t;const n=new Dn(e);return this.receivers.push(n),n}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:n,eventType:r,data:i}=t.data,s=this.handlersMap[r];if(!(null===s||void 0===s?void 0:s.size))return;t.ports[0].postMessage({status:"ack",eventId:n,eventType:r});const o=Array.from(s).map(async e=>e(t.origin,i)),a=await Ln(o);t.ports[0].postMessage({status:"done",eventId:n,eventType:r,response:a})}_subscribe(e,t){0===Object.keys(this.handlersMap).length&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),t&&0!==this.handlersMap[e].size||delete this.handlersMap[e],0===Object.keys(this.handlersMap).length&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Pn(e="",t=10){let n="";for(let r=0;r<t;r++)n+=Math.floor(10*Math.random());return e+n}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Dn.receivers=[];class Mn{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,n=50){const r="undefined"!==typeof MessageChannel?new MessageChannel:null;if(!r)throw new Error("connection_unavailable");let i,s;return new Promise((o,a)=>{const c=Pn("",20);r.port1.start();const l=setTimeout(()=>{a(new Error("unsupported_event"))},n);s={messageChannel:r,onMessage(e){const t=e;if(t.data.eventId===c)switch(t.data.status){case"ack":clearTimeout(l),i=setTimeout(()=>{a(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),o(t.data.response);break;default:clearTimeout(l),clearTimeout(i),a(new Error("invalid_response"));break}}},this.handlers.add(s),r.port1.addEventListener("message",s.onMessage),this.target.postMessage({eventType:e,eventId:c,data:t},[r.port2])}).finally(()=>{s&&this.removeMessageHandler(s)})}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fn(){return window}function Un(e){Fn().location.href=e}
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vn(){return"undefined"!==typeof Fn()["WorkerGlobalScope"]&&"function"===typeof Fn()["importScripts"]}async function Bn(){if(!(null===navigator||void 0===navigator?void 0:navigator.serviceWorker))return null;try{const e=await navigator.serviceWorker.ready;return e.active}catch(e){return null}}function zn(){var e;return(null===(e=null===navigator||void 0===navigator?void 0:navigator.serviceWorker)||void 0===e?void 0:e.controller)||null}function $n(){return Vn()?self:null}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qn="firebaseLocalStorageDb",Hn=1,Wn="firebaseLocalStorage",Gn="fbase_key";class Kn{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Yn(e,t){return e.transaction([Wn],t?"readwrite":"readonly").objectStore(Wn)}function Qn(){const e=indexedDB.deleteDatabase(qn);return new Kn(e).toPromise()}function Xn(){const e=indexedDB.open(qn,Hn);return new Promise((t,n)=>{e.addEventListener("error",()=>{n(e.error)}),e.addEventListener("upgradeneeded",()=>{const t=e.result;try{t.createObjectStore(Wn,{keyPath:Gn})}catch(r){n(r)}}),e.addEventListener("success",async()=>{const n=e.result;n.objectStoreNames.contains(Wn)?t(n):(n.close(),await Qn(),t(await Xn()))})})}async function Jn(e,t,n){const r=Yn(e,!0).put({[Gn]:t,value:n});return new Kn(r).toPromise()}async function Zn(e,t){const n=Yn(e,!1).get(t),r=await new Kn(n).toPromise();return void 0===r?null:r.value}function er(e,t){const n=Yn(e,!0).delete(t);return new Kn(n).toPromise()}const tr=800,nr=3;class rr{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db||(this.db=await Xn()),this.db}async _withRetries(e){let t=0;while(1)try{const t=await this._openDb();return await e(t)}catch(n){if(t++>nr)throw n;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Vn()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Dn._getInstance($n()),this.receiver._subscribe("keyChanged",async(e,t)=>{const n=await this._poll();return{keyProcessed:n.includes(t.key)}}),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await Bn(),!this.activeServiceWorker)return;this.sender=new Mn(this.activeServiceWorker);const n=await this.sender._send("ping",{},800);n&&(null===(e=n[0])||void 0===e?void 0:e.fulfilled)&&(null===(t=n[0])||void 0===t?void 0:t.value.includes("keyChanged"))&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(this.sender&&this.activeServiceWorker&&zn()===this.activeServiceWorker)try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch(t){}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Xn();return await Jn(e,In,"1"),await er(e,In),!0}catch(e){}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(n=>Jn(n,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(t=>Zn(t,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>er(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(e=>{const t=Yn(e,!1).getAll();return new Kn(t).toPromise()});if(!e)return[];if(0!==this.pendingWrites)return[];const t=[],n=new Set;for(const{fbase_key:r,value:i}of e)n.add(r),JSON.stringify(this.localCache[r])!==JSON.stringify(i)&&(this.notifyListeners(r,i),t.push(r));for(const r of Object.keys(this.localCache))this.localCache[r]&&!n.has(r)&&(this.notifyListeners(r,null),t.push(r));return t}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const r of Array.from(n))r(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),tr)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){0===Object.keys(this.listeners).length&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),0===this.listeners[e].size&&delete this.listeners[e]),0===Object.keys(this.listeners).length&&this.stopPolling()}}rr.type="LOCAL";const ir=rr;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sr(e,t){return U(e,"POST","/v2/accounts/mfaSignIn:start",F(e,t))}function or(e,t){return U(e,"POST","/v2/accounts/mfaSignIn:finalize",F(e,t))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ar(e){return(await U(e,"GET","/v1/recaptchaParams")).recaptchaSiteKey||""}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cr(){var e,t;return null!==(t=null===(e=document.getElementsByTagName("head"))||void 0===e?void 0:e[0])&&void 0!==t?t:document}function lr(e){return new Promise((t,n)=>{const r=document.createElement("script");r.setAttribute("src",e),r.onload=t,r.onerror=e=>{const t=y("internal-error");t.customData=e,n(t)},r.type="text/javascript",r.charset="UTF-8",cr().appendChild(r)})}function ur(e){return`__${e}${Math.floor(1e6*Math.random())}`}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hr=500,dr=6e4,fr=1e12;class pr{constructor(e){this.auth=e,this.counter=fr,this._widgets=new Map}render(e,t){const n=this.counter;return this._widgets.set(n,new gr(e,this.auth.name,t||{})),this.counter++,n}reset(e){var t;const n=e||fr;null===(t=this._widgets.get(n))||void 0===t||t.delete(),this._widgets.delete(n)}getResponse(e){var t;const n=e||fr;return(null===(t=this._widgets.get(n))||void 0===t?void 0:t.getResponse())||""}async execute(e){var t;const n=e||fr;return null===(t=this._widgets.get(n))||void 0===t||t.execute(),""}}class gr{constructor(e,t,n){this.params=n,this.timerId=null,this.deleted=!1,this.responseToken=null,this.clickHandler=()=>{this.execute()};const r="string"===typeof e?document.getElementById(e):e;E(r,"argument-error",{appName:t}),this.container=r,this.isVisible="invisible"!==this.params.size,this.isVisible?this.execute():this.container.addEventListener("click",this.clickHandler)}getResponse(){return this.checkIfDeleted(),this.responseToken}delete(){this.checkIfDeleted(),this.deleted=!0,this.timerId&&(clearTimeout(this.timerId),this.timerId=null),this.container.removeEventListener("click",this.clickHandler)}execute(){this.checkIfDeleted(),this.timerId||(this.timerId=window.setTimeout(()=>{this.responseToken=mr(50);const{callback:e,"expired-callback":t}=this.params;if(e)try{e(this.responseToken)}catch(n){}this.timerId=window.setTimeout(()=>{if(this.timerId=null,this.responseToken=null,t)try{t()}catch(n){}this.isVisible&&this.execute()},dr)},hr))}checkIfDeleted(){if(this.deleted)throw new Error("reCAPTCHA mock was already deleted!")}}function mr(e){const t=[],n="1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";for(let r=0;r<e;r++)t.push(n.charAt(Math.floor(Math.random()*n.length)));return t.join("")}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vr=ur("rcb"),yr=new j(3e4,6e4),br="https://www.google.com/recaptcha/api.js?";class wr{constructor(){var e;this.hostLanguage="",this.counter=0,this.librarySeparatelyLoaded=!!(null===(e=Fn().grecaptcha)||void 0===e?void 0:e.render)}load(e,t=""){return E(_r(t),e,"argument-error"),this.shouldResolveImmediately(t)?Promise.resolve(Fn().grecaptcha):new Promise((n,i)=>{const s=Fn().setTimeout(()=>{i(y(e,"network-request-failed"))},yr.get());Fn()[vr]=()=>{Fn().clearTimeout(s),delete Fn()[vr];const r=Fn().grecaptcha;if(!r)return void i(y(e,"internal-error"));const o=r.render;r.render=(e,t)=>{const n=o(e,t);return this.counter++,n},this.hostLanguage=t,n(r)};const o=`${br}?${Object(r["y"])({onload:vr,render:"explicit",hl:t})}`;lr(o).catch(()=>{clearTimeout(s),i(y(e,"internal-error"))})})}clearedOneInstance(){this.counter--}shouldResolveImmediately(e){var t;return!!(null===(t=Fn().grecaptcha)||void 0===t?void 0:t.render)&&(e===this.hostLanguage||this.counter>0||this.librarySeparatelyLoaded)}}function _r(e){return e.length<=6&&/^\s*[a-zA-Z0-9\-]*\s*$/.test(e)}class Er{async load(e){return new pr(e)}clearedOneInstance(){}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Or="recaptcha",Tr={theme:"light",type:"image"};class Ir{constructor(e,t=Object.assign({},Tr),n){this.parameters=t,this.type=Or,this.destroyed=!1,this.widgetId=null,this.tokenChangeListeners=new Set,this.renderPromise=null,this.recaptcha=null,this.auth=Ne(n),this.isInvisible="invisible"===this.parameters.size,E("undefined"!==typeof document,this.auth,"operation-not-supported-in-this-environment");const r="string"===typeof e?document.getElementById(e):e;E(r,this.auth,"argument-error"),this.container=r,this.parameters.callback=this.makeTokenCallback(this.parameters.callback),this._recaptchaLoader=this.auth.settings.appVerificationDisabledForTesting?new Er:new wr,this.validateStartingState()}async verify(){this.assertNotDestroyed();const e=await this.render(),t=this.getAssertedRecaptcha(),n=t.getResponse(e);return n||new Promise(n=>{const r=e=>{e&&(this.tokenChangeListeners.delete(r),n(e))};this.tokenChangeListeners.add(r),this.isInvisible&&t.execute(e)})}render(){try{this.assertNotDestroyed()}catch(e){return Promise.reject(e)}return this.renderPromise||(this.renderPromise=this.makeRenderPromise().catch(e=>{throw this.renderPromise=null,e})),this.renderPromise}_reset(){this.assertNotDestroyed(),null!==this.widgetId&&this.getAssertedRecaptcha().reset(this.widgetId)}clear(){this.assertNotDestroyed(),this.destroyed=!0,this._recaptchaLoader.clearedOneInstance(),this.isInvisible||this.container.childNodes.forEach(e=>{this.container.removeChild(e)})}validateStartingState(){E(!this.parameters.sitekey,this.auth,"argument-error"),E(this.isInvisible||!this.container.hasChildNodes(),this.auth,"argument-error"),E("undefined"!==typeof document,this.auth,"operation-not-supported-in-this-environment")}makeTokenCallback(e){return t=>{if(this.tokenChangeListeners.forEach(e=>e(t)),"function"===typeof e)e(t);else if("string"===typeof e){const n=Fn()[e];"function"===typeof n&&n(t)}}}assertNotDestroyed(){E(!this.destroyed,this.auth,"internal-error")}async makeRenderPromise(){if(await this.init(),!this.widgetId){let e=this.container;if(!this.isInvisible){const t=document.createElement("div");e.appendChild(t),e=t}this.widgetId=this.getAssertedRecaptcha().render(e,this.parameters)}return this.widgetId}async init(){E(A()&&!Vn(),this.auth,"internal-error"),await Sr(),this.recaptcha=await this._recaptchaLoader.load(this.auth,this.auth.languageCode||void 0);const e=await ar(this.auth);E(e,this.auth,"internal-error"),this.parameters.sitekey=e}getAssertedRecaptcha(){return E(this.recaptcha,this.auth,"internal-error"),this.recaptcha}}function Sr(){let e=null;return new Promise(t=>{"complete"!==document.readyState?(e=()=>t(),window.addEventListener("load",e)):t()}).catch(t=>{throw e&&window.removeEventListener("load",e),t})}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kr{constructor(e,t){this.verificationId=e,this.onConfirmation=t}confirm(e){const t=ot._fromVerification(this.verificationId,e);return this.onConfirmation(t)}}async function Cr(e,t,n){const i=Ne(e),s=await Rr(i,t,Object(r["l"])(n));return new kr(s,e=>Lt(i,e))}async function Ar(e,t,n){const i=Object(r["l"])(e);await Rt(!1,i,"phone");const s=await Rr(i.auth,t,Object(r["l"])(n));return new kr(s,e=>Dt(i,e))}async function xr(e,t,n){const i=Object(r["l"])(e),s=await Rr(i.auth,t,Object(r["l"])(n));return new kr(s,e=>Pt(i,e))}async function Rr(e,t,n){var r;const i=await n.verify();try{let s;if(E("string"===typeof i,e,"argument-error"),E(n.type===Or,e,"argument-error"),s="string"===typeof t?{phoneNumber:t}:t,"session"in s){const t=s.session;if("phoneNumber"in s){E("enroll"===t.type,e,"internal-error");const n=await bn(e,{idToken:t.credential,phoneEnrollmentInfo:{phoneNumber:s.phoneNumber,recaptchaToken:i}});return n.phoneSessionInfo.sessionInfo}{E("signin"===t.type,e,"internal-error");const n=(null===(r=s.multiFactorHint)||void 0===r?void 0:r.uid)||s.multiFactorUid;E(n,e,"missing-multi-factor-info");const o=await sr(e,{mfaPendingCredential:t.credential,mfaEnrollmentId:n,phoneSignInInfo:{recaptchaToken:i}});return o.phoneResponseInfo.sessionInfo}}{const{sessionInfo:t}=await tt(e,{phoneNumber:s.phoneNumber,recaptchaToken:i});return t}}finally{n._reset()}}async function Nr(e,t){await xt(Object(r["l"])(e),t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jr{constructor(e){this.providerId=jr.PROVIDER_ID,this.auth=Ne(e)}verifyPhoneNumber(e,t){return Rr(this.auth,e,Object(r["l"])(t))}static credential(e,t){return ot._fromVerification(e,t)}static credentialFromResult(e){const t=e;return jr.credentialFromTaggedObject(t)}static credentialFromError(e){return jr.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{phoneNumber:t,temporaryProof:n}=e;return t&&n?ot._fromTokenResponse(t,n):null}}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Lr(e,t){return t?S(t):(E(e._popupRedirectResolver,e,"argument-error"),e._popupRedirectResolver)}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */jr.PROVIDER_ID="phone",jr.PHONE_SIGN_IN_METHOD="phone";class Dr extends Ue{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Je(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Je(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Je(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function Pr(e){return jt(e.auth,new Dr(e),e.bypassAuthState)}function Mr(e){const{auth:t,user:n}=e;return E(n,t,"internal-error"),Nt(n,new Dr(e),e.bypassAuthState)}async function Fr(e){const{auth:t,user:n}=e;return E(n,t,"internal-error"),xt(n,new Dr(e),e.bypassAuthState)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ur{constructor(e,t,n,r,i=!1){this.auth=e,this.resolver=n,this.user=r,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(n){this.reject(n)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:n,postBody:r,tenantId:i,error:s,type:o}=e;if(s)return void this.reject(s);const a={auth:this.auth,requestUri:t,sessionId:n,tenantId:i||void 0,postBody:r||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(o)(a))}catch(c){this.reject(c)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Pr;case"linkViaPopup":case"linkViaRedirect":return Fr;case"reauthViaPopup":case"reauthViaRedirect":return Mr;default:v(this.auth,"internal-error")}}resolve(e){T(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){T(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vr=new j(2e3,1e4);async function Br(e,t,n){const r=Ne(e);w(e,t,ht);const i=Lr(r,n),s=new qr(r,"signInViaPopup",t,i);return s.executeNotNull()}async function zr(e,t,n){const i=Object(r["l"])(e);w(i.auth,t,ht);const s=Lr(i.auth,n),o=new qr(i.auth,"reauthViaPopup",t,s,i);return o.executeNotNull()}async function $r(e,t,n){const i=Object(r["l"])(e);w(i.auth,t,ht);const s=Lr(i.auth,n),o=new qr(i.auth,"linkViaPopup",t,s,i);return o.executeNotNull()}class qr extends Ur{constructor(e,t,n,r,i){super(e,t,r,i),this.provider=n,this.authWindow=null,this.pollId=null,qr.currentPopupAction&&qr.currentPopupAction.cancel(),qr.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return E(e,this.auth,"internal-error"),e}async onExecution(){T(1===this.filter.length,"Popup operations only handle one event");const e=Pn();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(e=>{this.reject(e)}),this.resolver._isIframeWebStorageSupported(this.auth,e=>{e||this.reject(y(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return(null===(e=this.authWindow)||void 0===e?void 0:e.associatedEvent)||null}cancel(){this.reject(y(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,qr.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,n;(null===(n=null===(t=this.authWindow)||void 0===t?void 0:t.window)||void 0===n?void 0:n.closed)?this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(y(this.auth,"popup-closed-by-user"))},2e3):this.pollId=window.setTimeout(e,Vr.get())};e()}}qr.currentPopupAction=null;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Hr="pendingRedirect",Wr=new Map;class Gr extends Ur{constructor(e,t,n=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,n),this.eventId=null}async execute(){let e=Wr.get(this.auth._key());if(!e){try{const t=await Kr(this.resolver,this.auth),n=t?await super.execute():null;e=()=>Promise.resolve(n)}catch(t){e=()=>Promise.reject(t)}Wr.set(this.auth._key(),e)}return this.bypassAuthState||Wr.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if("signInViaRedirect"===e.type)return super.onAuthEvent(e);if("unknown"!==e.type){if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}else this.resolve(null)}async onExecution(){}cleanUp(){}}async function Kr(e,t){const n=Zr(t),r=Jr(e);if(!await r._isAvailable())return!1;const i="true"===await r._get(n);return await r._remove(n),i}async function Yr(e,t){return Jr(e)._set(Zr(t),"true")}function Qr(){Wr.clear()}function Xr(e,t){Wr.set(e._key(),t)}function Jr(e){return S(e._redirectPersistence)}function Zr(e){return fe(Hr,e.config.apiKey,e.name)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ei(e,t,n){return ti(e,t,n)}async function ti(e,t,n){const r=Ne(e);w(e,t,ht);const i=Lr(r,n);return await Yr(i,r),i._openRedirect(r,t,"signInViaRedirect")}function ni(e,t,n){return ri(e,t,n)}async function ri(e,t,n){const i=Object(r["l"])(e);w(i.auth,t,ht);const s=Lr(i.auth,n);await Yr(s,i.auth);const o=await ci(i);return s._openRedirect(i.auth,t,"reauthViaRedirect",o)}function ii(e,t,n){return si(e,t,n)}async function si(e,t,n){const i=Object(r["l"])(e);w(i.auth,t,ht);const s=Lr(i.auth,n);await Rt(!1,i,t.providerId),await Yr(s,i.auth);const o=await ci(i);return s._openRedirect(i.auth,t,"linkViaRedirect",o)}async function oi(e,t){return await Ne(e)._initializationPromise,ai(e,t,!1)}async function ai(e,t,n=!1){const r=Ne(e),i=Lr(r,t),s=new Gr(r,i,n),o=await s.execute();return o&&!n&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,t)),o}async function ci(e){const t=Pn(e.uid+":::");return e._redirectEventId=t,await e.auth._setRedirectUser(e),await e.auth._persistUserIfCurrent(e),t}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const li=6e5;class ui{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(n=>{this.isEventForConsumer(e,n)&&(t=!0,this.sendToConsumer(e,n),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!fi(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var n;if(e.error&&!di(e)){const r=(null===(n=e.error.code)||void 0===n?void 0:n.split("auth/")[1])||"internal-error";t.onError(y(this.auth,r))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const n=null===t.eventId||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&n}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=li&&this.cachedEventUids.clear(),this.cachedEventUids.has(hi(e))}saveEventToCache(e){this.cachedEventUids.add(hi(e)),this.lastProcessedEventTime=Date.now()}}function hi(e){return[e.type,e.eventId,e.sessionId,e.tenantId].filter(e=>e).join("-")}function di({type:e,error:t}){return"unknown"===e&&"auth/no-auth-event"===(null===t||void 0===t?void 0:t.code)}function fi(e){switch(e.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return di(e);default:return!1}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function pi(e,t={}){return U(e,"GET","/v1/projects",t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gi=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,mi=/^https?/;async function vi(e){if(e.config.emulator)return;const{authorizedDomains:t}=await pi(e);for(const r of t)try{if(yi(r))return}catch(n){}v(e,"unauthorized-domain")}function yi(e){const t=C(),{protocol:n,hostname:r}=new URL(t);if(e.startsWith("chrome-extension://")){const i=new URL(e);return""===i.hostname&&""===r?"chrome-extension:"===n&&e.replace("chrome-extension://","")===t.replace("chrome-extension://",""):"chrome-extension:"===n&&i.hostname===r}if(!mi.test(n))return!1;if(gi.test(e))return r===e;const i=e.replace(/\./g,"\\."),s=new RegExp("^(.+\\."+i+"|"+i+")$","i");return s.test(r)}
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bi=new j(3e4,6e4);function wi(){const e=Fn().___jsl;if(null===e||void 0===e?void 0:e.H)for(const t of Object.keys(e.H))if(e.H[t].r=e.H[t].r||[],e.H[t].L=e.H[t].L||[],e.H[t].r=[...e.H[t].L],e.CP)for(let n=0;n<e.CP.length;n++)e.CP[n]=null}function _i(e){return new Promise((t,n)=>{var r,i,s;function o(){wi(),gapi.load("gapi.iframes",{callback:()=>{t(gapi.iframes.getContext())},ontimeout:()=>{wi(),n(y(e,"network-request-failed"))},timeout:bi.get()})}if(null===(i=null===(r=Fn().gapi)||void 0===r?void 0:r.iframes)||void 0===i?void 0:i.Iframe)t(gapi.iframes.getContext());else{if(!(null===(s=Fn().gapi)||void 0===s?void 0:s.load)){const t=ur("iframefcb");return Fn()[t]=()=>{gapi.load?o():n(y(e,"network-request-failed"))},lr("https://apis.google.com/js/api.js?onload="+t).catch(e=>n(e))}o()}}).catch(e=>{throw Ei=null,e})}let Ei=null;function Oi(e){return Ei=Ei||_i(e),Ei}
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ti=new j(5e3,15e3),Ii="__/auth/iframe",Si="emulator/auth/iframe",ki={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Ci=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Ai(e){const t=e.config;E(t.authDomain,e,"auth-domain-config-required");const n=t.emulator?L(t,Si):`https://${e.config.authDomain}/${Ii}`,s={apiKey:t.apiKey,appName:e.name,v:i["SDK_VERSION"]},o=Ci.get(e.config.apiHost);o&&(s.eid=o);const a=e._getFrameworks();return a.length&&(s.fw=a.join(",")),`${n}?${Object(r["y"])(s).slice(1)}`}async function xi(e){const t=await Oi(e),n=Fn().gapi;return E(n,e,"internal-error"),t.open({where:document.body,url:Ai(e),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:ki,dontclear:!0},t=>new Promise(async(n,r)=>{await t.restyle({setHideOnLeave:!1});const i=y(e,"network-request-failed"),s=Fn().setTimeout(()=>{r(i)},Ti.get());function o(){Fn().clearTimeout(s),n(t)}t.ping(o).then(o,()=>{r(i)})}))}
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ri={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Ni=500,ji=600,Li="_blank",Di="http://localhost";class Pi{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch(e){}}}function Mi(e,t,n,i=Ni,s=ji){const o=Math.max((window.screen.availHeight-s)/2,0).toString(),a=Math.max((window.screen.availWidth-i)/2,0).toString();let c="";const l=Object.assign(Object.assign({},Ri),{width:i.toString(),height:s.toString(),top:o,left:a}),u=Object(r["m"])().toLowerCase();n&&(c=ye(u)?Li:n),me(u)&&(t=t||Di,l.scrollbars="yes");const h=Object.entries(l).reduce((e,[t,n])=>`${e}${t}=${n},`,"");if(Ie(u)&&"_self"!==c)return Fi(t||"",c),new Pi(null);const d=window.open(t||"",c,h);E(d,e,"popup-blocked");try{d.focus()}catch(f){}return new Pi(d)}function Fi(e,t){const n=document.createElement("a");n.href=e,n.target=t;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ui="__/auth/handler",Vi="emulator/auth/handler";function Bi(e,t,n,s,o,a){E(e.config.authDomain,e,"auth-domain-config-required"),E(e.config.apiKey,e,"invalid-api-key");const c={apiKey:e.config.apiKey,appName:e.name,authType:n,redirectUrl:s,v:i["SDK_VERSION"],eventId:o};if(t instanceof ht){t.setDefaultLanguage(e.languageCode),c.providerId=t.providerId||"",Object(r["q"])(t.getCustomParameters())||(c.customParameters=JSON.stringify(t.getCustomParameters()));for(const[e,t]of Object.entries(a||{}))c[e]=t}if(t instanceof dt){const e=t.getScopes().filter(e=>""!==e);e.length>0&&(c.scopes=e.join(","))}e.tenantId&&(c.tid=e.tenantId);const l=c;for(const r of Object.keys(l))void 0===l[r]&&delete l[r];return`${zi(e)}?${Object(r["y"])(l).slice(1)}`}function zi({config:e}){return e.emulator?L(e,Vi):`https://${e.authDomain}/${Ui}`}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $i="webStorageSupport";class qi{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=jn,this._completeRedirectFn=ai,this._overrideRedirectResult=Xr}async _openPopup(e,t,n,r){var i;T(null===(i=this.eventManagers[e._key()])||void 0===i?void 0:i.manager,"_initialize() not called before _openPopup()");const s=Bi(e,t,n,C(),r);return Mi(e,s,Pn())}async _openRedirect(e,t,n,r){return await this._originValidation(e),Un(Bi(e,t,n,C(),r)),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:e,promise:n}=this.eventManagers[t];return e?Promise.resolve(e):(T(n,"If manager is not set, promise should be"),n)}const n=this.initAndGetManager(e);return this.eventManagers[t]={promise:n},n.catch(()=>{delete this.eventManagers[t]}),n}async initAndGetManager(e){const t=await xi(e),n=new ui(e);return t.register("authEvent",t=>{E(null===t||void 0===t?void 0:t.authEvent,e,"invalid-auth-event");const r=n.onEvent(t.authEvent);return{status:r?"ACK":"ERROR"}},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:n},this.iframes[e._key()]=t,n}_isIframeWebStorageSupported(e,t){const n=this.iframes[e._key()];n.send($i,{type:$i},n=>{var r;const i=null===(r=null===n||void 0===n?void 0:n[0])||void 0===r?void 0:r[$i];void 0!==i&&t(!!i),v(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=vi(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return ke()||ve()||Oe()}}const Hi=qi;class Wi{constructor(e){this.factorId=e}_process(e,t,n){switch(t.type){case"enroll":return this._finalizeEnroll(e,t.credential,n);case"signin":return this._finalizeSignIn(e,t.credential);default:return O("unexpected MultiFactorSessionType")}}}class Gi extends Wi{constructor(e){super("phone"),this.credential=e}static _fromCredential(e){return new Gi(e)}_finalizeEnroll(e,t,n){return wn(e,{idToken:t,displayName:n,phoneVerificationInfo:this.credential._makeVerificationRequest()})}_finalizeSignIn(e,t){return or(e,{mfaPendingCredential:t,phoneVerificationInfo:this.credential._makeVerificationRequest()})}}class Ki{constructor(){}static assertion(e){return Gi._fromCredential(e)}}Ki.FACTOR_ID="phone";var Yi="@firebase/auth",Qi="0.20.5";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Xi{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),(null===(e=this.auth.currentUser)||void 0===e?void 0:e.uid)||null}async getToken(e){if(this.assertAuthConfigured(),await this.auth._initializationPromise,!this.auth.currentUser)return null;const t=await this.auth.currentUser.getIdToken(e);return{accessToken:t}}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(t=>{var n;e((null===(n=t)||void 0===n?void 0:n.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){E(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ji(e){switch(e){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";default:return}}function Zi(e){Object(i["_registerComponent"])(new a["a"]("auth",(t,{options:n})=>{const r=t.getProvider("app").getImmediate(),i=t.getProvider("heartbeat"),{apiKey:s,authDomain:o}=r.options;return((t,r)=>{E(s&&!s.includes(":"),"invalid-api-key",{appName:t.name}),E(!(null===o||void 0===o?void 0:o.includes(":")),"argument-error",{appName:t.name});const i={apiKey:s,authDomain:o,clientPlatform:e,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Ae(e)},a=new Re(t,r,i);return k(a,n),a})(r,i)},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,n)=>{const r=e.getProvider("auth-internal");r.initialize()})),Object(i["_registerComponent"])(new a["a"]("auth-internal",e=>{const t=Ne(e.getProvider("auth").getImmediate());return(e=>new Xi(e))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),Object(i["registerVersion"])(Yi,Qi,Ji(e)),Object(i["registerVersion"])(Yi,Qi,"esm2017")}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function es(){return window}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Zi("Browser");const ts=2e3;async function ns(e,t,n){var r;const{BuildInfo:i}=es();T(t.sessionId,"AuthEvent did not contain a session ID");const s=await as(t.sessionId),o={};return Oe()?o["ibi"]=i.packageName:we()?o["apn"]=i.packageName:v(e,"operation-not-supported-in-this-environment"),i.displayName&&(o["appDisplayName"]=i.displayName),o["sessionId"]=s,Bi(e,n,t.type,void 0,null!==(r=t.eventId)&&void 0!==r?r:void 0,o)}async function rs(e){const{BuildInfo:t}=es(),n={};Oe()?n.iosBundleId=t.packageName:we()?n.androidPackageName=t.packageName:v(e,"operation-not-supported-in-this-environment"),await pi(e,n)}function is(e){const{cordova:t}=es();return new Promise(n=>{t.plugins.browsertab.isAvailable(r=>{let i=null;r?t.plugins.browsertab.openUrl(e):i=t.InAppBrowser.open(e,Te()?"_blank":"_system","location=yes"),n(i)})})}async function ss(e,t,n){const{cordova:r}=es();let i=()=>{};try{await new Promise((s,o)=>{let a=null;function c(){var e;s();const t=null===(e=r.plugins.browsertab)||void 0===e?void 0:e.close;"function"===typeof t&&t(),"function"===typeof(null===n||void 0===n?void 0:n.close)&&n.close()}function l(){a||(a=window.setTimeout(()=>{o(y(e,"redirect-cancelled-by-user"))},ts))}function u(){"visible"===(null===document||void 0===document?void 0:document.visibilityState)&&l()}t.addPassiveListener(c),document.addEventListener("resume",l,!1),we()&&document.addEventListener("visibilitychange",u,!1),i=()=>{t.removePassiveListener(c),document.removeEventListener("resume",l,!1),document.removeEventListener("visibilitychange",u,!1),a&&window.clearTimeout(a)}})}finally{i()}}function os(e){var t,n,r,i,s,o,a,c,l,u;const h=es();E("function"===typeof(null===(t=null===h||void 0===h?void 0:h.universalLinks)||void 0===t?void 0:t.subscribe),e,"invalid-cordova-configuration",{missingPlugin:"cordova-universal-links-plugin-fix"}),E("undefined"!==typeof(null===(n=null===h||void 0===h?void 0:h.BuildInfo)||void 0===n?void 0:n.packageName),e,"invalid-cordova-configuration",{missingPlugin:"cordova-plugin-buildInfo"}),E("function"===typeof(null===(s=null===(i=null===(r=null===h||void 0===h?void 0:h.cordova)||void 0===r?void 0:r.plugins)||void 0===i?void 0:i.browsertab)||void 0===s?void 0:s.openUrl),e,"invalid-cordova-configuration",{missingPlugin:"cordova-plugin-browsertab"}),E("function"===typeof(null===(c=null===(a=null===(o=null===h||void 0===h?void 0:h.cordova)||void 0===o?void 0:o.plugins)||void 0===a?void 0:a.browsertab)||void 0===c?void 0:c.isAvailable),e,"invalid-cordova-configuration",{missingPlugin:"cordova-plugin-browsertab"}),E("function"===typeof(null===(u=null===(l=null===h||void 0===h?void 0:h.cordova)||void 0===l?void 0:l.InAppBrowser)||void 0===u?void 0:u.open),e,"invalid-cordova-configuration",{missingPlugin:"cordova-plugin-inappbrowser"})}async function as(e){const t=cs(e),n=await crypto.subtle.digest("SHA-256",t),r=Array.from(new Uint8Array(n));return r.map(e=>e.toString(16).padStart(2,"0")).join("")}function cs(e){if(T(/[0-9a-zA-Z]+/.test(e),"Can only convert alpha-numeric strings"),"undefined"!==typeof TextEncoder)return(new TextEncoder).encode(e);const t=new ArrayBuffer(e.length),n=new Uint8Array(t);for(let r=0;r<e.length;r++)n[r]=e.charCodeAt(r);return n}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ls=20;class us extends ui{constructor(){super(...arguments),this.passiveListeners=new Set,this.initPromise=new Promise(e=>{this.resolveInialized=e})}addPassiveListener(e){this.passiveListeners.add(e)}removePassiveListener(e){this.passiveListeners.delete(e)}resetRedirect(){this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1}onEvent(e){return this.resolveInialized(),this.passiveListeners.forEach(t=>t(e)),super.onEvent(e)}async initialized(){await this.initPromise}}function hs(e,t,n=null){return{type:t,eventId:n,urlResponse:null,sessionId:gs(),postBody:null,tenantId:e.tenantId,error:y(e,"no-auth-event")}}function ds(e,t){return ms()._set(vs(e),t)}async function fs(e){const t=await ms()._get(vs(e));return t&&await ms()._remove(vs(e)),t}function ps(e,t){var n,r;const i=bs(t);if(i.includes("/__/auth/callback")){const t=ws(i),s=t["firebaseError"]?ys(decodeURIComponent(t["firebaseError"])):null,o=null===(r=null===(n=null===s||void 0===s?void 0:s["code"])||void 0===n?void 0:n.split("auth/"))||void 0===r?void 0:r[1],a=o?y(o):null;return a?{type:e.type,eventId:e.eventId,tenantId:e.tenantId,error:a,urlResponse:null,sessionId:null,postBody:null}:{type:e.type,eventId:e.eventId,tenantId:e.tenantId,sessionId:e.sessionId,urlResponse:i,postBody:null}}return null}function gs(){const e=[],t="1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";for(let n=0;n<ls;n++){const n=Math.floor(Math.random()*t.length);e.push(t.charAt(n))}return e.join("")}function ms(){return S(Rn)}function vs(e){return fe("authEvent",e.config.apiKey,e.name)}function ys(e){try{return JSON.parse(e)}catch(t){return null}}function bs(e){const t=ws(e),n=t["link"]?decodeURIComponent(t["link"]):void 0,r=ws(n)["link"],i=t["deep_link_id"]?decodeURIComponent(t["deep_link_id"]):void 0,s=ws(i)["link"];return s||i||r||n||e}function ws(e){if(!(null===e||void 0===e?void 0:e.includes("?")))return{};const[t,...n]=e.split("?");return Object(r["z"])(n.join("?"))}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _s=500;class Es{constructor(){this._redirectPersistence=jn,this._shouldInitProactively=!0,this.eventManagers=new Map,this.originValidationPromises={},this._completeRedirectFn=ai,this._overrideRedirectResult=Xr}async _initialize(e){const t=e._key();let n=this.eventManagers.get(t);return n||(n=new us(e),this.eventManagers.set(t,n),this.attachCallbackListeners(e,n)),n}_openPopup(e){v(e,"operation-not-supported-in-this-environment")}async _openRedirect(e,t,n,r){os(e);const i=await this._initialize(e);await i.initialized(),i.resetRedirect(),Qr(),await this._originValidation(e);const s=hs(e,n,r);await ds(e,s);const o=await ns(e,s,t),a=await is(o);return ss(e,i,a)}_isIframeWebStorageSupported(e,t){throw new Error("Method not implemented.")}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=rs(e)),this.originValidationPromises[t]}attachCallbackListeners(e,t){const{universalLinks:n,handleOpenURL:r,BuildInfo:i}=es(),s=setTimeout(async()=>{await fs(e),t.onEvent(Ts())},_s),o=async n=>{clearTimeout(s);const r=await fs(e);let i=null;r&&(null===n||void 0===n?void 0:n["url"])&&(i=ps(r,n["url"])),t.onEvent(i||Ts())};"undefined"!==typeof n&&"function"===typeof n.subscribe&&n.subscribe(null,o);const a=r,c=i.packageName.toLowerCase()+"://";es().handleOpenURL=async e=>{if(e.toLowerCase().startsWith(c)&&o({url:e}),"function"===typeof a)try{a(e)}catch(t){console.error(t)}}}}const Os=Es;function Ts(){return{type:"unknown",eventId:null,sessionId:null,urlResponse:null,postBody:null,tenantId:null,error:y("no-auth-event")}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Is(e,t){Ne(e)._logFramework(t)}},"1fb5":function(e,t,n){"use strict";t.byteLength=u,t.toByteArray=d,t.fromByteArray=g;for(var r=[],i=[],s="undefined"!==typeof Uint8Array?Uint8Array:Array,o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",a=0,c=o.length;a<c;++a)r[a]=o[a],i[o.charCodeAt(a)]=a;function l(e){var t=e.length;if(t%4>0)throw new Error("Invalid string. Length must be a multiple of 4");var n=e.indexOf("=");-1===n&&(n=t);var r=n===t?0:4-n%4;return[n,r]}function u(e){var t=l(e),n=t[0],r=t[1];return 3*(n+r)/4-r}function h(e,t,n){return 3*(t+n)/4-n}function d(e){var t,n,r=l(e),o=r[0],a=r[1],c=new s(h(e,o,a)),u=0,d=a>0?o-4:o;for(n=0;n<d;n+=4)t=i[e.charCodeAt(n)]<<18|i[e.charCodeAt(n+1)]<<12|i[e.charCodeAt(n+2)]<<6|i[e.charCodeAt(n+3)],c[u++]=t>>16&255,c[u++]=t>>8&255,c[u++]=255&t;return 2===a&&(t=i[e.charCodeAt(n)]<<2|i[e.charCodeAt(n+1)]>>4,c[u++]=255&t),1===a&&(t=i[e.charCodeAt(n)]<<10|i[e.charCodeAt(n+1)]<<4|i[e.charCodeAt(n+2)]>>2,c[u++]=t>>8&255,c[u++]=255&t),c}function f(e){return r[e>>18&63]+r[e>>12&63]+r[e>>6&63]+r[63&e]}function p(e,t,n){for(var r,i=[],s=t;s<n;s+=3)r=(e[s]<<16&16711680)+(e[s+1]<<8&65280)+(255&e[s+2]),i.push(f(r));return i.join("")}function g(e){for(var t,n=e.length,i=n%3,s=[],o=16383,a=0,c=n-i;a<c;a+=o)s.push(p(e,a,a+o>c?c:a+o));return 1===i?(t=e[n-1],s.push(r[t>>2]+r[t<<4&63]+"==")):2===i&&(t=(e[n-2]<<8)+e[n-1],s.push(r[t>>10]+r[t>>4&63]+r[t<<2&63]+"=")),s.join("")}i["-".charCodeAt(0)]=62,i["_".charCodeAt(0)]=63},"1fd5":function(e,t,n){"use strict";(function(e){n.d(t,"a",(function(){return h})),n.d(t,"b",(function(){return k})),n.d(t,"c",(function(){return S})),n.d(t,"d",(function(){return c})),n.d(t,"e",(function(){return a})),n.d(t,"f",(function(){return x})),n.d(t,"g",(function(){return d})),n.d(t,"h",(function(){return M})),n.d(t,"i",(function(){return N})),n.d(t,"j",(function(){return l})),n.d(t,"k",(function(){return P})),n.d(t,"l",(function(){return B})),n.d(t,"m",(function(){return f})),n.d(t,"n",(function(){return m})),n.d(t,"o",(function(){return v})),n.d(t,"p",(function(){return b})),n.d(t,"q",(function(){return R})),n.d(t,"r",(function(){return w})),n.d(t,"s",(function(){return O})),n.d(t,"t",(function(){return p})),n.d(t,"u",(function(){return g})),n.d(t,"v",(function(){return y})),n.d(t,"w",(function(){return E})),n.d(t,"x",(function(){return _})),n.d(t,"y",(function(){return L})),n.d(t,"z",(function(){return D})),n.d(t,"A",(function(){return T}));
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const r=function(e){const t=[];let n=0;for(let r=0;r<e.length;r++){let i=e.charCodeAt(r);i<128?t[n++]=i:i<2048?(t[n++]=i>>6|192,t[n++]=63&i|128):55296===(64512&i)&&r+1<e.length&&56320===(64512&e.charCodeAt(r+1))?(i=65536+((1023&i)<<10)+(1023&e.charCodeAt(++r)),t[n++]=i>>18|240,t[n++]=i>>12&63|128,t[n++]=i>>6&63|128,t[n++]=63&i|128):(t[n++]=i>>12|224,t[n++]=i>>6&63|128,t[n++]=63&i|128)}return t},i=function(e){const t=[];let n=0,r=0;while(n<e.length){const i=e[n++];if(i<128)t[r++]=String.fromCharCode(i);else if(i>191&&i<224){const s=e[n++];t[r++]=String.fromCharCode((31&i)<<6|63&s)}else if(i>239&&i<365){const s=e[n++],o=e[n++],a=e[n++],c=((7&i)<<18|(63&s)<<12|(63&o)<<6|63&a)-65536;t[r++]=String.fromCharCode(55296+(c>>10)),t[r++]=String.fromCharCode(56320+(1023&c))}else{const s=e[n++],o=e[n++];t[r++]=String.fromCharCode((15&i)<<12|(63&s)<<6|63&o)}}return t.join("")},s={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:"function"===typeof atob,encodeByteArray(e,t){if(!Array.isArray(e))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<e.length;i+=3){const t=e[i],s=i+1<e.length,o=s?e[i+1]:0,a=i+2<e.length,c=a?e[i+2]:0,l=t>>2,u=(3&t)<<4|o>>4;let h=(15&o)<<2|c>>6,d=63&c;a||(d=64,s||(h=64)),r.push(n[l],n[u],n[h],n[d])}return r.join("")},encodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(e):this.encodeByteArray(r(e),t)},decodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(e):i(this.decodeStringToByteArray(e,t))},decodeStringToByteArray(e,t){this.init_();const n=t?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<e.length;){const t=n[e.charAt(i++)],s=i<e.length,o=s?n[e.charAt(i)]:0;++i;const a=i<e.length,c=a?n[e.charAt(i)]:64;++i;const l=i<e.length,u=l?n[e.charAt(i)]:64;if(++i,null==t||null==o||null==c||null==u)throw Error();const h=t<<2|o>>4;if(r.push(h),64!==c){const e=o<<4&240|c>>2;if(r.push(e),64!==u){const e=c<<6&192|u;r.push(e)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let e=0;e<this.ENCODED_VALS.length;e++)this.byteToCharMap_[e]=this.ENCODED_VALS.charAt(e),this.charToByteMap_[this.byteToCharMap_[e]]=e,this.byteToCharMapWebSafe_[e]=this.ENCODED_VALS_WEBSAFE.charAt(e),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]]=e,e>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)]=e,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)]=e)}}},o=function(e){const t=r(e);return s.encodeByteArray(t,!0)},a=function(e){return o(e).replace(/\./g,"")},c=function(e){try{return s.decodeString(e,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function l(e,t){if(!(t instanceof Object))return t;switch(t.constructor){case Date:const n=t;return new Date(n.getTime());case Object:void 0===e&&(e={});break;case Array:e=[];break;default:return t}for(const n in t)t.hasOwnProperty(n)&&u(n)&&(e[n]=l(e[n],t[n]));return e}function u(e){return"__proto__"!==e}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class h{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,n)=>{t?this.reject(t):this.resolve(n),"function"===typeof e&&(this.promise.catch(()=>{}),1===e.length?e(t):e(t,n))}}}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function d(e,t){if(e.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},r=t||"demo-project",i=e.iat||0,s=e.sub||e.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:"https://securetoken.google.com/"+r,aud:r,iat:i,exp:i+3600,auth_time:i,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}}},e),c="";return[a(JSON.stringify(n)),a(JSON.stringify(o)),c].join(".")}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function f(){return"undefined"!==typeof navigator&&"string"===typeof navigator["userAgent"]?navigator["userAgent"]:""}function p(){return"undefined"!==typeof window&&!!(window["cordova"]||window["phonegap"]||window["PhoneGap"])&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(f())}function g(){try{return"[object process]"===Object.prototype.toString.call(e.process)}catch(t){return!1}}function m(){return"object"===typeof self&&self.self===self}function v(){const e="object"===typeof chrome?chrome.runtime:"object"===typeof browser?browser.runtime:void 0;return"object"===typeof e&&void 0!==e.id}function y(){return"object"===typeof navigator&&"ReactNative"===navigator["product"]}function b(){return f().indexOf("Electron/")>=0}function w(){const e=f();return e.indexOf("MSIE ")>=0||e.indexOf("Trident/")>=0}function _(){return f().indexOf("MSAppHost/")>=0}function E(){return!g()&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function O(){return"object"===typeof indexedDB}function T(){return new Promise((e,t)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(r),e(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{var e;t((null===(e=i.error)||void 0===e?void 0:e.message)||"")}}catch(n){t(n)}})}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const I="FirebaseError";class S extends Error{constructor(e,t,n){super(t),this.code=e,this.customData=n,this.name=I,Object.setPrototypeOf(this,S.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,k.prototype.create)}}class k{constructor(e,t,n){this.service=e,this.serviceName=t,this.errors=n}create(e,...t){const n=t[0]||{},r=`${this.service}/${e}`,i=this.errors[e],s=i?C(i,n):"Error",o=`${this.serviceName}: ${s} (${r}).`,a=new S(r,o,n);return a}}function C(e,t){return e.replace(A,(e,n)=>{const r=t[n];return null!=r?String(r):`<${n}?>`})}const A=/\{\$([^}]+)}/g;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function x(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function R(e){for(const t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}function N(e,t){if(e===t)return!0;const n=Object.keys(e),r=Object.keys(t);for(const i of n){if(!r.includes(i))return!1;const n=e[i],s=t[i];if(j(n)&&j(s)){if(!N(n,s))return!1}else if(n!==s)return!1}for(const i of r)if(!n.includes(i))return!1;return!0}function j(e){return null!==e&&"object"===typeof e}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function L(e){const t=[];for(const[n,r]of Object.entries(e))Array.isArray(r)?r.forEach(e=>{t.push(encodeURIComponent(n)+"="+encodeURIComponent(e))}):t.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return t.length?"&"+t.join("&"):""}function D(e){const t={},n=e.replace(/^\?/,"").split("&");return n.forEach(e=>{if(e){const[n,r]=e.split("=");t[decodeURIComponent(n)]=decodeURIComponent(r)}}),t}function P(e){const t=e.indexOf("?");if(!t)return"";const n=e.indexOf("#",t);return e.substring(t,n>0?n:void 0)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function M(e,t){const n=new F(e,t);return n.subscribe.bind(n)}class F{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(e=>{this.error(e)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,n){let r;if(void 0===e&&void 0===t&&void 0===n)throw new Error("Missing Observer.");r=U(e,["next","error","complete"])?e:{next:e,error:t,complete:n},void 0===r.next&&(r.next=V),void 0===r.error&&(r.error=V),void 0===r.complete&&(r.complete=V);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?r.error(this.finalError):r.complete()}catch(e){}}),this.observers.push(r),i}unsubscribeOne(e){void 0!==this.observers&&void 0!==this.observers[e]&&(delete this.observers[e],this.observerCount-=1,0===this.observerCount&&void 0!==this.onNoObservers&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(void 0!==this.observers&&void 0!==this.observers[e])try{t(this.observers[e])}catch(n){"undefined"!==typeof console&&console.error&&console.error(n)}})}close(e){this.finalized||(this.finalized=!0,void 0!==e&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function U(e,t){if("object"!==typeof e||null===e)return!1;for(const n of t)if(n in e&&"function"===typeof e[n])return!0;return!1}function V(){}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function B(e){return e&&e._delegate?e._delegate:e}}).call(this,n("c8ba"))},"216d":function(e,t,n){"use strict";n.d(t,"a",(function(){return h}));var r=n("dd76");function i(e){e.addEventListener("mousedown",c)}function s(e){e.removeEventListener("mousedown",c)}function o(e){let t=document.createElement("span");t.className="p-ink",e.appendChild(t),t.addEventListener("animationend",l)}function a(e){let t=u(e);t&&(s(e),t.removeEventListener("animationend",l),t.remove())}function c(e){let t=e.currentTarget,n=u(t);if(!n||"none"===getComputedStyle(n,null).display)return;if(r["b"].removeClass(n,"p-ink-active"),!r["b"].getHeight(n)&&!r["b"].getWidth(n)){let e=Math.max(r["b"].getOuterWidth(t),r["b"].getOuterHeight(t));n.style.height=e+"px",n.style.width=e+"px"}let i=r["b"].getOffset(t),s=e.pageX-i.left+document.body.scrollTop-r["b"].getWidth(n)/2,o=e.pageY-i.top+document.body.scrollLeft-r["b"].getHeight(n)/2;n.style.top=o+"px",n.style.left=s+"px",r["b"].addClass(n,"p-ink-active")}function l(e){r["b"].removeClass(e.currentTarget,"p-ink-active")}function u(e){for(let t=0;t<e.children.length;t++)if("string"===typeof e.children[t].className&&-1!==e.children[t].className.indexOf("p-ink"))return e.children[t];return null}const h={mounted(e,t){t.instance.$primevue&&t.instance.$primevue.config&&t.instance.$primevue.config.ripple&&(o(e),i(e))},unmounted(e){a(e)}}},2266:function(e,t,n){var r=n("da84"),i=n("0366"),s=n("c65b"),o=n("825a"),a=n("0d51"),c=n("e95a"),l=n("07fa"),u=n("3a9b"),h=n("9a1f"),d=n("35a1"),f=n("2a62"),p=r.TypeError,g=function(e,t){this.stopped=e,this.result=t},m=g.prototype;e.exports=function(e,t,n){var r,v,y,b,w,_,E,O=n&&n.that,T=!(!n||!n.AS_ENTRIES),I=!(!n||!n.IS_ITERATOR),S=!(!n||!n.INTERRUPTED),k=i(t,O),C=function(e){return r&&f(r,"normal",e),new g(!0,e)},A=function(e){return T?(o(e),S?k(e[0],e[1],C):k(e[0],e[1])):S?k(e,C):k(e)};if(I)r=e;else{if(v=d(e),!v)throw p(a(e)+" is not iterable");if(c(v)){for(y=0,b=l(e);b>y;y++)if(w=A(e[y]),w&&u(m,w))return w;return new g(!1)}r=h(e,v)}_=r.next;while(!(E=s(_,r)).done){try{w=A(E.value)}catch(x){f(r,"throw",x)}if("object"==typeof w&&w&&u(m,w))return w}return new g(!1)}},"22e5":function(e,t,n){"use strict";n.d(t,"a",(function(){return i})),n.d(t,"b",(function(){return l}));var r=n("1fd5");class i{constructor(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const s="[DEFAULT]";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class o{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const e=new r["a"];if(this.instancesDeferred.set(t,e),this.isInitialized(t)||this.shouldAutoInitialize())try{const n=this.getOrInitializeService({instanceIdentifier:t});n&&e.resolve(n)}catch(n){}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const n=this.normalizeInstanceIdentifier(null===e||void 0===e?void 0:e.identifier),r=null!==(t=null===e||void 0===e?void 0:e.optional)&&void 0!==t&&t;if(!this.isInitialized(n)&&!this.shouldAutoInitialize()){if(r)return null;throw Error(`Service ${this.name} is not available`)}try{return this.getOrInitializeService({instanceIdentifier:n})}catch(i){if(r)return null;throw i}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,this.shouldAutoInitialize()){if(c(e))try{this.getOrInitializeService({instanceIdentifier:s})}catch(t){}for(const[e,n]of this.instancesDeferred.entries()){const r=this.normalizeInstanceIdentifier(e);try{const e=this.getOrInitializeService({instanceIdentifier:r});n.resolve(e)}catch(t){}}}}clearInstance(e=s){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(e=>"INTERNAL"in e).map(e=>e.INTERNAL.delete()),...e.filter(e=>"_delete"in e).map(e=>e._delete())])}isComponentSet(){return null!=this.component}isInitialized(e=s){return this.instances.has(e)}getOptions(e=s){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,n=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const r=this.getOrInitializeService({instanceIdentifier:n,options:t});for(const[i,s]of this.instancesDeferred.entries()){const e=this.normalizeInstanceIdentifier(i);n===e&&s.resolve(r)}return r}onInit(e,t){var n;const r=this.normalizeInstanceIdentifier(t),i=null!==(n=this.onInitCallbacks.get(r))&&void 0!==n?n:new Set;i.add(e),this.onInitCallbacks.set(r,i);const s=this.instances.get(r);return s&&e(s,r),()=>{i.delete(e)}}invokeOnInitCallbacks(e,t){const n=this.onInitCallbacks.get(t);if(n)for(const i of n)try{i(e,t)}catch(r){}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let n=this.instances.get(e);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:a(e),options:t}),this.instances.set(e,n),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(n,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,n)}catch(r){}return n||null}normalizeInstanceIdentifier(e=s){return this.component?this.component.multipleInstances?e:s:e}shouldAutoInitialize(){return!!this.component&&"EXPLICIT"!==this.component.instantiationMode}}function a(e){return e===s?void 0:e}function c(e){return"EAGER"===e.instantiationMode}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class l{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){const t=this.getProvider(e.name);t.isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new o(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}},"23cb":function(e,t,n){var r=n("5926"),i=Math.max,s=Math.min;e.exports=function(e,t){var n=r(e);return n<0?i(n+t,0):s(n,t)}},"23e7":function(e,t,n){var r=n("da84"),i=n("06cf").f,s=n("9112"),o=n("6eeb"),a=n("ce4e"),c=n("e893"),l=n("94ca");e.exports=function(e,t){var n,u,h,d,f,p,g=e.target,m=e.global,v=e.stat;if(u=m?r:v?r[g]||a(g,{}):(r[g]||{}).prototype,u)for(h in t){if(f=t[h],e.noTargetGet?(p=i(u,h),d=p&&p.value):d=u[h],n=l(m?h:g+(v?".":"#")+h,e.forced),!n&&void 0!==d){if(typeof f==typeof d)continue;c(f,d)}(e.sham||d&&d.sham)&&s(f,"sham",!0),o(u,h,f,e)}}},"241c":function(e,t,n){var r=n("ca84"),i=n("7839"),s=i.concat("length","prototype");t.f=Object.getOwnPropertyNames||function(e){return r(e,s)}},"256a":function(e,t,n){"use strict";n("5994")},2626:function(e,t,n){"use strict";var r=n("d066"),i=n("9bf2"),s=n("b622"),o=n("83ab"),a=s("species");e.exports=function(e){var t=r(e),n=i.f;o&&t&&!t[a]&&n(t,a,{configurable:!0,get:function(){return this}})}},"2a62":function(e,t,n){var r=n("c65b"),i=n("825a"),s=n("dc4a");e.exports=function(e,t,n){var o,a;i(e);try{if(o=s(e,"return"),!o){if("throw"===t)throw n;return n}o=r(o,e)}catch(c){a=!0,o=c}if("throw"===t)throw n;if(a)throw o;return i(o),n}},"2ba4":function(e,t,n){var r=n("40d5"),i=Function.prototype,s=i.apply,o=i.call;e.exports="object"==typeof Reflect&&Reflect.apply||(r?o.bind(s):function(){return o.apply(s,arguments)})},"2cf4":function(e,t,n){var r,i,s,o,a=n("da84"),c=n("2ba4"),l=n("0366"),u=n("1626"),h=n("1a2d"),d=n("d039"),f=n("1be4"),p=n("f36a"),g=n("cc12"),m=n("d6d6"),v=n("1cdc"),y=n("605d"),b=a.setImmediate,w=a.clearImmediate,_=a.process,E=a.Dispatch,O=a.Function,T=a.MessageChannel,I=a.String,S=0,k={},C="onreadystatechange";try{r=a.location}catch(j){}var A=function(e){if(h(k,e)){var t=k[e];delete k[e],t()}},x=function(e){return function(){A(e)}},R=function(e){A(e.data)},N=function(e){a.postMessage(I(e),r.protocol+"//"+r.host)};b&&w||(b=function(e){m(arguments.length,1);var t=u(e)?e:O(e),n=p(arguments,1);return k[++S]=function(){c(t,void 0,n)},i(S),S},w=function(e){delete k[e]},y?i=function(e){_.nextTick(x(e))}:E&&E.now?i=function(e){E.now(x(e))}:T&&!v?(s=new T,o=s.port2,s.port1.onmessage=R,i=l(o.postMessage,o)):a.addEventListener&&u(a.postMessage)&&!a.importScripts&&r&&"file:"!==r.protocol&&!d(N)?(i=N,a.addEventListener("message",R,!1)):i=C in g("script")?function(e){f.appendChild(g("script"))[C]=function(){f.removeChild(this),A(e)}}:function(e){setTimeout(x(e),0)}),e.exports={set:b,clear:w}},"2d00":function(e,t,n){var r,i,s=n("da84"),o=n("342f"),a=s.process,c=s.Deno,l=a&&a.versions||c&&c.version,u=l&&l.v8;u&&(r=u.split("."),i=r[0]>0&&r[0]<4?1:+(r[0]+r[1])),!i&&o&&(r=o.match(/Edge\/(\d+)/),(!r||r[1]>=74)&&(r=o.match(/Chrome\/(\d+)/),r&&(i=+r[1]))),e.exports=i},"2e67":function(e,t,n){"use strict";e.exports=function(e){return!(!e||!e.__CANCEL__)}},"30b5":function(e,t,n){"use strict";var r=n("c532");function i(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}e.exports=function(e,t,n){if(!t)return e;var s;if(n)s=n(t);else if(r.isURLSearchParams(t))s=t.toString();else{var o=[];r.forEach(t,(function(e,t){null!==e&&"undefined"!==typeof e&&(r.isArray(e)?t+="[]":e=[e],r.forEach(e,(function(e){r.isDate(e)?e=e.toISOString():r.isObject(e)&&(e=JSON.stringify(e)),o.push(i(t)+"="+i(e))})))})),s=o.join("&")}if(s){var a=e.indexOf("#");-1!==a&&(e=e.slice(0,a)),e+=(-1===e.indexOf("?")?"?":"&")+s}return e}},"32e0":function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));var r=n("7a23"),i={name:"Divider",props:{align:{type:String,default:null},layout:{type:String,default:"horizontal"},type:{type:String,default:"solid"}},computed:{containerClass(){return["p-divider p-component","p-divider-"+this.layout,"p-divider-"+this.type,{"p-divider-left":"horizontal"===this.layout&&(!this.align||"left"===this.align)},{"p-divider-center":"horizontal"===this.layout&&"center"===this.align},{"p-divider-right":"horizontal"===this.layout&&"right"===this.align},{"p-divider-top":"vertical"===this.layout&&"top"===this.align},{"p-divider-center":"vertical"===this.layout&&(!this.align||"center"===this.align)},{"p-divider-bottom":"vertical"===this.layout&&"bottom"===this.align}]}}};const s={key:0,class:"p-divider-content"};function o(e,t,n,i,o,a){return Object(r["B"])(),Object(r["h"])("div",{class:Object(r["u"])(a.containerClass),role:"separator"},[e.$slots.default?(Object(r["B"])(),Object(r["h"])("div",s,[Object(r["I"])(e.$slots,"default")])):Object(r["g"])("",!0)],2)}function a(e,t){void 0===t&&(t={});var n=t.insertAt;if(e&&"undefined"!==typeof document){var r=document.head||document.getElementsByTagName("head")[0],i=document.createElement("style");i.type="text/css","top"===n&&r.firstChild?r.insertBefore(i,r.firstChild):r.appendChild(i),i.styleSheet?i.styleSheet.cssText=e:i.appendChild(document.createTextNode(e))}}var c='\n.p-divider-horizontal {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    width: 100%;\n    position: relative;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n}\n.p-divider-horizontal:before {\n    position: absolute;\n    display: block;\n    top: 50%;\n    left: 0;\n    width: 100%;\n    content: "";\n}\n.p-divider-horizontal.p-divider-left {\n    -webkit-box-pack: start;\n        -ms-flex-pack: start;\n            justify-content: flex-start;\n}\n.p-divider-horizontal.p-divider-right {\n    -webkit-box-pack: end;\n        -ms-flex-pack: end;\n            justify-content: flex-end;\n}\n.p-divider-horizontal.p-divider-center {\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n}\n.p-divider-content {\n    z-index: 1;\n}\n.p-divider-vertical {\n    min-height: 100%;\n    margin: 0 1rem;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    position: relative;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n}\n.p-divider-vertical:before {\n    position: absolute;\n    display: block;\n    top: 0;\n    left: 50%;\n    height: 100%;\n    content: "";\n}\n.p-divider-vertical.p-divider-top {\n    -webkit-box-align: start;\n        -ms-flex-align: start;\n            align-items: flex-start;\n}\n.p-divider-vertical.p-divider-center {\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n}\n.p-divider-vertical.p-divider-bottom {\n    -webkit-box-align: end;\n        -ms-flex-align: end;\n            align-items: flex-end;\n}\n.p-divider-solid.p-divider-horizontal:before {\n    border-top-style: solid;\n}\n.p-divider-solid.p-divider-vertical:before {\n    border-left-style: solid;\n}\n.p-divider-dashed.p-divider-horizontal:before {\n    border-top-style: dashed;\n}\n.p-divider-dashed.p-divider-vertical:before {\n    border-left-style: dashed;\n}\n.p-divider-dotted.p-divider-horizontal:before {\n    border-top-style: dotted;\n}\n.p-divider-dotted.p-divider-horizontal:before {\n    border-left-style: dotted;\n}\n';a(c),i.render=o},"342f":function(e,t,n){var r=n("d066");e.exports=r("navigator","userAgent")||""},"35a1":function(e,t,n){var r=n("f5df"),i=n("dc4a"),s=n("3f8c"),o=n("b622"),a=o("iterator");e.exports=function(e){if(void 0!=e)return i(e,a)||i(e,"@@iterator")||s[r(e)]}},"37e8":function(e,t,n){var r=n("83ab"),i=n("aed9"),s=n("9bf2"),o=n("825a"),a=n("fc6a"),c=n("df75");t.f=r&&!i?Object.defineProperties:function(e,t){o(e);var n,r=a(t),i=c(t),l=i.length,u=0;while(l>u)s.f(e,n=i[u++],r[n]);return e}},3934:function(e,t,n){"use strict";var r=n("c532");e.exports=r.isStandardBrowserEnv()?function(){var e,t=/(msie|trident)/i.test(navigator.userAgent),n=document.createElement("a");function i(e){var r=e;return t&&(n.setAttribute("href",r),r=n.href),n.setAttribute("href",r),{href:n.href,protocol:n.protocol?n.protocol.replace(/:$/,""):"",host:n.host,search:n.search?n.search.replace(/^\?/,""):"",hash:n.hash?n.hash.replace(/^#/,""):"",hostname:n.hostname,port:n.port,pathname:"/"===n.pathname.charAt(0)?n.pathname:"/"+n.pathname}}return e=i(window.location.href),function(t){var n=r.isString(t)?i(t):t;return n.protocol===e.protocol&&n.host===e.host}}():function(){return function(){return!0}}()},"3a9b":function(e,t,n){var r=n("e330");e.exports=r({}.isPrototypeOf)},"3bbe":function(e,t,n){var r=n("da84"),i=n("1626"),s=r.String,o=r.TypeError;e.exports=function(e){if("object"==typeof e||i(e))return e;throw o("Can't set "+s(e)+" as a prototype")}},"3ca3":function(e,t,n){"use strict";var r=n("6547").charAt,i=n("577e"),s=n("69f3"),o=n("7dd0"),a="String Iterator",c=s.set,l=s.getterFor(a);o(String,"String",(function(e){c(this,{type:a,string:i(e),index:0})}),(function(){var e,t=l(this),n=t.string,i=t.index;return i>=n.length?{value:void 0,done:!0}:(e=r(n,i),t.index+=e.length,{value:e,done:!1})}))},"3f8c":function(e,t){e.exports={}},"40d5":function(e,t,n){var r=n("d039");e.exports=!r((function(){var e=function(){}.bind();return"function"!=typeof e||e.hasOwnProperty("prototype")}))},4121:function(e,t,n){},4362:function(e,t,n){t.nextTick=function(e){var t=Array.prototype.slice.call(arguments);t.shift(),setTimeout((function(){e.apply(null,t)}),0)},t.platform=t.arch=t.execPath=t.title="browser",t.pid=1,t.browser=!0,t.env={},t.argv=[],t.binding=function(e){throw new Error("No such module. (Possibly not yet loaded)")},function(){var e,r="/";t.cwd=function(){return r},t.chdir=function(t){e||(e=n("df7c")),r=e.resolve(t,r)}}(),t.exit=t.kill=t.umask=t.dlopen=t.uptime=t.memoryUsage=t.uvCounters=function(){},t.features={}},"44ad":function(e,t,n){var r=n("da84"),i=n("e330"),s=n("d039"),o=n("c6b6"),a=r.Object,c=i("".split);e.exports=s((function(){return!a("z").propertyIsEnumerable(0)}))?function(e){return"String"==o(e)?c(e,""):a(e)}:a},"44d2":function(e,t,n){var r=n("b622"),i=n("7c73"),s=n("9bf2"),o=r("unscopables"),a=Array.prototype;void 0==a[o]&&s.f(a,o,{configurable:!0,value:i(null)}),e.exports=function(e){a[o][e]=!0}},"44de":function(e,t,n){var r=n("da84");e.exports=function(e,t){var n=r.console;n&&n.error&&(1==arguments.length?n.error(e):n.error(e,t))}},4581:function(e,t){e.exports=null},"467f":function(e,t,n){"use strict";var r=n("7917");e.exports=function(e,t,n){var i=n.config.validateStatus;n.status&&i&&!i(n.status)?t(new r("Request failed with status code "+n.status,[r.ERR_BAD_REQUEST,r.ERR_BAD_RESPONSE][Math.floor(n.status/100)-4],n.config,n.request,n)):e(n)}},4840:function(e,t,n){var r=n("825a"),i=n("5087"),s=n("b622"),o=s("species");e.exports=function(e,t){var n,s=r(e).constructor;return void 0===s||void 0==(n=r(s)[o])?t:i(n)}},"485a":function(e,t,n){var r=n("da84"),i=n("c65b"),s=n("1626"),o=n("861d"),a=r.TypeError;e.exports=function(e,t){var n,r;if("string"===t&&s(n=e.toString)&&!o(r=i(n,e)))return r;if(s(n=e.valueOf)&&!o(r=i(n,e)))return r;if("string"!==t&&s(n=e.toString)&&!o(r=i(n,e)))return r;throw a("Can't convert object to primitive value")}},4930:function(e,t,n){var r=n("2d00"),i=n("d039");e.exports=!!Object.getOwnPropertySymbols&&!i((function(){var e=Symbol();return!String(e)||!(Object(e)instanceof Symbol)||!Symbol.sham&&r&&r<41}))},"4a7b":function(e,t,n){"use strict";var r=n("c532");e.exports=function(e,t){t=t||{};var n={};function i(e,t){return r.isPlainObject(e)&&r.isPlainObject(t)?r.merge(e,t):r.isPlainObject(t)?r.merge({},t):r.isArray(t)?t.slice():t}function s(n){return r.isUndefined(t[n])?r.isUndefined(e[n])?void 0:i(void 0,e[n]):i(e[n],t[n])}function o(e){if(!r.isUndefined(t[e]))return i(void 0,t[e])}function a(n){return r.isUndefined(t[n])?r.isUndefined(e[n])?void 0:i(void 0,e[n]):i(void 0,t[n])}function c(n){return n in t?i(e[n],t[n]):n in e?i(void 0,e[n]):void 0}var l={url:o,method:o,data:o,baseURL:a,transformRequest:a,transformResponse:a,paramsSerializer:a,timeout:a,timeoutMessage:a,withCredentials:a,adapter:a,responseType:a,xsrfCookieName:a,xsrfHeaderName:a,onUploadProgress:a,onDownloadProgress:a,decompress:a,maxContentLength:a,maxBodyLength:a,beforeRedirect:a,transport:a,httpAgent:a,httpsAgent:a,cancelToken:a,socketPath:a,responseEncoding:a,validateStatus:c};return r.forEach(Object.keys(e).concat(Object.keys(t)),(function(e){var t=l[e]||s,i=t(e);r.isUndefined(i)&&t!==c||(n[e]=i)})),n}},"4c3d":function(e,t,n){"use strict";(function(t){var r=n("c532"),i=n("c8af"),s=n("7917"),o=n("cafa"),a=n("e467"),c={"Content-Type":"application/x-www-form-urlencoded"};function l(e,t){!r.isUndefined(e)&&r.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}function u(){var e;return("undefined"!==typeof XMLHttpRequest||"undefined"!==typeof t&&"[object process]"===Object.prototype.toString.call(t))&&(e=n("b50d")),e}function h(e,t,n){if(r.isString(e))try{return(t||JSON.parse)(e),r.trim(e)}catch(i){if("SyntaxError"!==i.name)throw i}return(n||JSON.stringify)(e)}var d={transitional:o,adapter:u(),transformRequest:[function(e,t){if(i(t,"Accept"),i(t,"Content-Type"),r.isFormData(e)||r.isArrayBuffer(e)||r.isBuffer(e)||r.isStream(e)||r.isFile(e)||r.isBlob(e))return e;if(r.isArrayBufferView(e))return e.buffer;if(r.isURLSearchParams(e))return l(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString();var n,s=r.isObject(e),o=t&&t["Content-Type"];if((n=r.isFileList(e))||s&&"multipart/form-data"===o){var c=this.env&&this.env.FormData;return a(n?{"files[]":e}:e,c&&new c)}return s||"application/json"===o?(l(t,"application/json"),h(e)):e}],transformResponse:[function(e){var t=this.transitional||d.transitional,n=t&&t.silentJSONParsing,i=t&&t.forcedJSONParsing,o=!n&&"json"===this.responseType;if(o||i&&r.isString(e)&&e.length)try{return JSON.parse(e)}catch(a){if(o){if("SyntaxError"===a.name)throw s.from(a,s.ERR_BAD_RESPONSE,this,null,this.response);throw a}}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:n("4581")},validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:"application/json, text/plain, */*"}}};r.forEach(["delete","get","head"],(function(e){d.headers[e]={}})),r.forEach(["post","put","patch"],(function(e){d.headers[e]=r.merge(c)})),e.exports=d}).call(this,n("4362"))},"4c62":function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));var r=n("7a23"),i={name:"Textarea",inheritAttrs:!1,emits:["update:modelValue"],props:{modelValue:null,autoResize:Boolean},mounted(){this.$el.offsetParent&&this.autoResize&&this.resize()},updated(){this.$el.offsetParent&&this.autoResize&&this.resize()},methods:{resize(){const e=window.getComputedStyle(this.$el);this.$el.style.height="auto",this.$el.style.height=`calc(${e.borderTopWidth} + ${e.borderBottomWidth} + ${this.$el.scrollHeight}px)`,parseFloat(this.$el.style.height)>=parseFloat(this.$el.style.maxHeight)?(this.$el.style.overflowY="scroll",this.$el.style.height=this.$el.style.maxHeight):this.$el.style.overflow="hidden"},onInput(e){this.autoResize&&this.resize(),this.$emit("update:modelValue",e.target.value)}},computed:{filled(){return null!=this.modelValue&&this.modelValue.toString().length>0}}};const s=["value"];function o(e,t,n,i,o,a){return Object(r["B"])(),Object(r["h"])("textarea",Object(r["s"])({class:["p-inputtextarea p-inputtext p-component",{"p-filled":a.filled,"p-inputtextarea-resizable ":n.autoResize}]},e.$attrs,{value:n.modelValue,onInput:t[0]||(t[0]=(...e)=>a.onInput&&a.onInput(...e))}),null,16,s)}function a(e,t){void 0===t&&(t={});var n=t.insertAt;if(e&&"undefined"!==typeof document){var r=document.head||document.getElementsByTagName("head")[0],i=document.createElement("style");i.type="text/css","top"===n&&r.firstChild?r.insertBefore(i,r.firstChild):r.appendChild(i),i.styleSheet?i.styleSheet.cssText=e:i.appendChild(document.createTextNode(e))}}var c="\n.p-inputtextarea-resizable {\n    overflow: hidden;\n    resize: none;\n}\n.p-fluid .p-inputtextarea {\n    width: 100%;\n}\n";a(c),i.render=o},"4d64":function(e,t,n){var r=n("fc6a"),i=n("23cb"),s=n("07fa"),o=function(e){return function(t,n,o){var a,c=r(t),l=s(c),u=i(o,l);if(e&&n!=n){while(l>u)if(a=c[u++],a!=a)return!0}else for(;l>u;u++)if((e||u in c)&&c[u]===n)return e||u||0;return!e&&-1}};e.exports={includes:o(!0),indexOf:o(!1)}},"4f60":function(e,t,n){"use strict";var r=n("7ded");n.d(t,"a",(function(){return r["a"]}));var i="firebase",s="9.9.3";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
r["a"].registerVersion(i,s,"app-compat")},5087:function(e,t,n){var r=n("da84"),i=n("68ee"),s=n("0d51"),o=r.TypeError;e.exports=function(e){if(i(e))return e;throw o(s(e)+" is not a constructor")}},"50c4":function(e,t,n){var r=n("5926"),i=Math.min;e.exports=function(e){return e>0?i(r(e),9007199254740991):0}},5270:function(e,t,n){"use strict";var r=n("c532"),i=n("c401"),s=n("2e67"),o=n("4c3d"),a=n("fb60");function c(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new a}e.exports=function(e){c(e),e.headers=e.headers||{},e.data=i.call(e,e.data,e.headers,e.transformRequest),e.headers=r.merge(e.headers.common||{},e.headers[e.method]||{},e.headers),r.forEach(["delete","get","head","post","put","patch","common"],(function(t){delete e.headers[t]}));var t=e.adapter||o.adapter;return t(e).then((function(t){return c(e),t.data=i.call(e,t.data,t.headers,e.transformResponse),t}),(function(t){return s(t)||(c(e),t&&t.response&&(t.response.data=i.call(e,t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)}))}},5692:function(e,t,n){var r=n("c430"),i=n("c6cd");(e.exports=function(e,t){return i[e]||(i[e]=void 0!==t?t:{})})("versions",[]).push({version:"3.21.0",mode:r?"pure":"global",copyright:"© 2014-2022 Denis Pushkarev (zloirock.ru)",license:"https://github.com/zloirock/core-js/blob/v3.21.0/LICENSE",source:"https://github.com/zloirock/core-js"})},"56ef":function(e,t,n){var r=n("d066"),i=n("e330"),s=n("241c"),o=n("7418"),a=n("825a"),c=i([].concat);e.exports=r("Reflect","ownKeys")||function(e){var t=s.f(a(e)),n=o.f;return n?c(t,n(e)):t}},"577e":function(e,t,n){var r=n("da84"),i=n("f5df"),s=r.String;e.exports=function(e){if("Symbol"===i(e))throw TypeError("Cannot convert a Symbol value to a string");return s(e)}},"588e":function(e,t,n){"use strict";n.d(t,"a",(function(){return Ge})),n.d(t,"b",(function(){return We})),n.d(t,"c",(function(){return He}));var r=n("589b"),i=n("1fd5"),s=n("22e5");
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const o="firebasestorage.googleapis.com",a="storageBucket",c=12e4,l=6e5;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class u extends i["c"]{constructor(e,t){super(h(e),`Firebase Storage: ${t} (${h(e)})`),this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,u.prototype)}_codeEquals(e){return h(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}\n${this.customData.serverResponse}`:this.message=this._baseMessage}}function h(e){return"storage/"+e}function d(){const e="An unknown error occurred, please check the error payload for server response.";return new u("unknown",e)}function f(e){return new u("quota-exceeded","Quota for bucket '"+e+"' exceeded, please view quota on https://firebase.google.com/pricing/.")}function p(){const e="User is not authenticated, please authenticate using Firebase Authentication and try again.";return new u("unauthenticated",e)}function g(){return new u("unauthorized-app","This app does not have permission to access Firebase Storage on this project.")}function m(e){return new u("unauthorized","User does not have permission to access '"+e+"'.")}function v(){return new u("retry-limit-exceeded","Max retry time for operation exceeded, please try again.")}function y(){return new u("canceled","User canceled the upload/download.")}function b(e){return new u("invalid-url","Invalid URL '"+e+"'.")}function w(e){return new u("invalid-default-bucket","Invalid default bucket '"+e+"'.")}function _(){return new u("no-default-bucket","No default bucket found. Did you set the '"+a+"' property when initializing the app?")}function E(){return new u("cannot-slice-blob","Cannot slice blob for upload. Please retry the upload.")}function O(e){return new u("invalid-argument",e)}function T(){return new u("app-deleted","The Firebase app was deleted.")}function I(e){return new u("invalid-root-operation","The operation '"+e+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}function S(e,t){return new u("invalid-format","String does not match format '"+e+"': "+t)}function k(e){throw new u("internal-error","Internal error: "+e)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class C{constructor(e,t){this.bucket=e,this.path_=t}get path(){return this.path_}get isRoot(){return 0===this.path.length}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o"}static makeFromBucketSpec(e,t){let n;try{n=C.makeFromUrl(e,t)}catch(r){return new C(e,"")}if(""===n.path)return n;throw w(e)}static makeFromUrl(e,t){let n=null;const r="([A-Za-z0-9.\\-_]+)";function i(e){"/"===e.path.charAt(e.path.length-1)&&(e.path_=e.path_.slice(0,-1))}const s="(/(.*))?$",a=new RegExp("^gs://"+r+s,"i"),c={bucket:1,path:3};function l(e){e.path_=decodeURIComponent(e.path)}const u="v[A-Za-z0-9_]+",h=t.replace(/[.]/g,"\\."),d="(/([^?#]*).*)?$",f=new RegExp(`^https?://${h}/${u}/b/${r}/o${d}`,"i"),p={bucket:1,path:3},g=t===o?"(?:storage.googleapis.com|storage.cloud.google.com)":t,m="([^?#]*)",v=new RegExp(`^https?://${g}/${r}/${m}`,"i"),y={bucket:1,path:2},w=[{regex:a,indices:c,postModify:i},{regex:f,indices:p,postModify:l},{regex:v,indices:y,postModify:l}];for(let o=0;o<w.length;o++){const t=w[o],r=t.regex.exec(e);if(r){const e=r[t.indices.bucket];let i=r[t.indices.path];i||(i=""),n=new C(e,i),t.postModify(n);break}}if(null==n)throw b(e);return n}}class A{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function x(e,t,n){let r=1,i=null,s=null,o=!1,a=0;function c(){return 2===a}let l=!1;function u(...e){l||(l=!0,t.apply(null,e))}function h(t){i=setTimeout(()=>{i=null,e(f,c())},t)}function d(){s&&clearTimeout(s)}function f(e,...t){if(l)return void d();if(e)return d(),void u.call(null,e,...t);const n=c()||o;if(n)return d(),void u.call(null,e,...t);let i;r<64&&(r*=2),1===a?(a=2,i=0):i=1e3*(r+Math.random()),h(i)}let p=!1;function g(e){p||(p=!0,d(),l||(null!==i?(e||(a=2),clearTimeout(i),h(0)):e||(a=1)))}return h(0),s=setTimeout(()=>{o=!0,g(!0)},n),g}function R(e){e(!1)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function N(e){return void 0!==e}function j(e){return"object"===typeof e&&!Array.isArray(e)}function L(e){return"string"===typeof e||e instanceof String}function D(e){return P()&&e instanceof Blob}function P(){return"undefined"!==typeof Blob}function M(e,t,n,r){if(r<t)throw O(`Invalid value for '${e}'. Expected ${t} or greater.`);if(r>n)throw O(`Invalid value for '${e}'. Expected ${n} or less.`)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function F(e,t,n){let r=t;return null==n&&(r="https://"+t),`${n}://${r}/v0${e}`}function U(e){const t=encodeURIComponent;let n="?";for(const r in e)if(e.hasOwnProperty(r)){const i=t(r)+"="+t(e[r]);n=n+i+"&"}return n=n.slice(0,-1),n}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var V;(function(e){e[e["NO_ERROR"]=0]="NO_ERROR",e[e["NETWORK_ERROR"]=1]="NETWORK_ERROR",e[e["ABORT"]=2]="ABORT"})(V||(V={}));
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class B{constructor(e,t,n,r,i,s,o,a,c,l,u){this.url_=e,this.method_=t,this.headers_=n,this.body_=r,this.successCodes_=i,this.additionalRetryCodes_=s,this.callback_=o,this.errorCallback_=a,this.timeout_=c,this.progressCallback_=l,this.connectionFactory_=u,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((e,t)=>{this.resolve_=e,this.reject_=t,this.start_()})}start_(){const e=(e,t)=>{if(t)return void e(!1,new z(!1,null,!0));const n=this.connectionFactory_();this.pendingConnection_=n;const r=e=>{const t=e.loaded,n=e.lengthComputable?e.total:-1;null!==this.progressCallback_&&this.progressCallback_(t,n)};null!==this.progressCallback_&&n.addUploadProgressListener(r),n.send(this.url_,this.method_,this.body_,this.headers_).then(()=>{null!==this.progressCallback_&&n.removeUploadProgressListener(r),this.pendingConnection_=null;const t=n.getErrorCode()===V.NO_ERROR,i=n.getStatus();if(!t||this.isRetryStatusCode_(i)){const t=n.getErrorCode()===V.ABORT;return void e(!1,new z(!1,null,t))}const s=-1!==this.successCodes_.indexOf(i);e(!0,new z(s,n))})},t=(e,t)=>{const n=this.resolve_,r=this.reject_,i=t.connection;if(t.wasSuccessCode)try{const e=this.callback_(i,i.getResponse());N(e)?n(e):n()}catch(s){r(s)}else if(null!==i){const e=d();e.serverResponse=i.getErrorText(),this.errorCallback_?r(this.errorCallback_(i,e)):r(e)}else if(t.canceled){const e=this.appDelete_?T():y();r(e)}else{const e=v();r(e)}};this.canceled_?t(!1,new z(!1,null,!0)):this.backoffId_=x(e,t,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,null!==this.backoffId_&&R(this.backoffId_),null!==this.pendingConnection_&&this.pendingConnection_.abort()}isRetryStatusCode_(e){const t=e>=500&&e<600,n=[408,429],r=-1!==n.indexOf(e),i=-1!==this.additionalRetryCodes_.indexOf(e);return t||r||i}}class z{constructor(e,t,n){this.wasSuccessCode=e,this.connection=t,this.canceled=!!n}}function $(e,t){null!==t&&t.length>0&&(e["Authorization"]="Firebase "+t)}function q(e,t){e["X-Firebase-Storage-Version"]="webjs/"+(null!==t&&void 0!==t?t:"AppManager")}function H(e,t){t&&(e["X-Firebase-GMPID"]=t)}function W(e,t){null!==t&&(e["X-Firebase-AppCheck"]=t)}function G(e,t,n,r,i,s){const o=U(e.urlParams),a=e.url+o,c=Object.assign({},e.headers);return H(c,t),$(c,n),q(c,s),W(c,r),new B(a,e.method,c,e.body,e.successCodes,e.additionalRetryCodes,e.handler,e.errorHandler,e.timeout,e.progressCallback,i)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function K(){return"undefined"!==typeof BlobBuilder?BlobBuilder:"undefined"!==typeof WebKitBlobBuilder?WebKitBlobBuilder:void 0}function Y(...e){const t=K();if(void 0!==t){const n=new t;for(let t=0;t<e.length;t++)n.append(e[t]);return n.getBlob()}if(P())return new Blob(e);throw new u("unsupported-environment","This browser doesn't seem to support creating Blobs")}function Q(e,t,n){return e.webkitSlice?e.webkitSlice(t,n):e.mozSlice?e.mozSlice(t,n):e.slice?e.slice(t,n):null}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function X(e){return atob(e)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const J={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"};class Z{constructor(e,t){this.data=e,this.contentType=t||null}}function ee(e,t){switch(e){case J.RAW:return new Z(te(t));case J.BASE64:case J.BASE64URL:return new Z(re(e,t));case J.DATA_URL:return new Z(se(t),oe(t))}throw d()}function te(e){const t=[];for(let n=0;n<e.length;n++){let r=e.charCodeAt(n);if(r<=127)t.push(r);else if(r<=2047)t.push(192|r>>6,128|63&r);else if(55296===(64512&r)){const i=n<e.length-1&&56320===(64512&e.charCodeAt(n+1));if(i){const i=r,s=e.charCodeAt(++n);r=65536|(1023&i)<<10|1023&s,t.push(240|r>>18,128|r>>12&63,128|r>>6&63,128|63&r)}else t.push(239,191,189)}else 56320===(64512&r)?t.push(239,191,189):t.push(224|r>>12,128|r>>6&63,128|63&r)}return new Uint8Array(t)}function ne(e){let t;try{t=decodeURIComponent(e)}catch(n){throw S(J.DATA_URL,"Malformed data URL.")}return te(t)}function re(e,t){switch(e){case J.BASE64:{const n=-1!==t.indexOf("-"),r=-1!==t.indexOf("_");if(n||r){const t=n?"-":"_";throw S(e,"Invalid character '"+t+"' found: is it base64url encoded?")}break}case J.BASE64URL:{const n=-1!==t.indexOf("+"),r=-1!==t.indexOf("/");if(n||r){const t=n?"+":"/";throw S(e,"Invalid character '"+t+"' found: is it base64 encoded?")}t=t.replace(/-/g,"+").replace(/_/g,"/");break}}let n;try{n=X(t)}catch(i){throw S(e,"Invalid character found")}const r=new Uint8Array(n.length);for(let s=0;s<n.length;s++)r[s]=n.charCodeAt(s);return r}class ie{constructor(e){this.base64=!1,this.contentType=null;const t=e.match(/^data:([^,]+)?,/);if(null===t)throw S(J.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");const n=t[1]||null;null!=n&&(this.base64=ae(n,";base64"),this.contentType=this.base64?n.substring(0,n.length-";base64".length):n),this.rest=e.substring(e.indexOf(",")+1)}}function se(e){const t=new ie(e);return t.base64?re(J.BASE64,t.rest):ne(t.rest)}function oe(e){const t=new ie(e);return t.contentType}function ae(e,t){const n=e.length>=t.length;return!!n&&e.substring(e.length-t.length)===t}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ce{constructor(e,t){let n=0,r="";D(e)?(this.data_=e,n=e.size,r=e.type):e instanceof ArrayBuffer?(t?this.data_=new Uint8Array(e):(this.data_=new Uint8Array(e.byteLength),this.data_.set(new Uint8Array(e))),n=this.data_.length):e instanceof Uint8Array&&(t?this.data_=e:(this.data_=new Uint8Array(e.length),this.data_.set(e)),n=e.length),this.size_=n,this.type_=r}size(){return this.size_}type(){return this.type_}slice(e,t){if(D(this.data_)){const n=this.data_,r=Q(n,e,t);return null===r?null:new ce(r)}{const n=new Uint8Array(this.data_.buffer,e,t-e);return new ce(n,!0)}}static getBlob(...e){if(P()){const t=e.map(e=>e instanceof ce?e.data_:e);return new ce(Y.apply(null,t))}{const t=e.map(e=>L(e)?ee(J.RAW,e).data:e.data_);let n=0;t.forEach(e=>{n+=e.byteLength});const r=new Uint8Array(n);let i=0;return t.forEach(e=>{for(let t=0;t<e.length;t++)r[i++]=e[t]}),new ce(r,!0)}}uploadData(){return this.data_}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function le(e){let t;try{t=JSON.parse(e)}catch(n){return null}return j(t)?t:null}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ue(e){if(0===e.length)return null;const t=e.lastIndexOf("/");if(-1===t)return"";const n=e.slice(0,t);return n}function he(e,t){const n=t.split("/").filter(e=>e.length>0).join("/");return 0===e.length?n:e+"/"+n}function de(e){const t=e.lastIndexOf("/",e.length-2);return-1===t?e:e.slice(t+1)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fe(e,t){return t}class pe{constructor(e,t,n,r){this.server=e,this.local=t||e,this.writable=!!n,this.xform=r||fe}}let ge=null;function me(e){return!L(e)||e.length<2?e:de(e)}function ve(){if(ge)return ge;const e=[];function t(e,t){return me(t)}e.push(new pe("bucket")),e.push(new pe("generation")),e.push(new pe("metageneration")),e.push(new pe("name","fullPath",!0));const n=new pe("name");function r(e,t){return void 0!==t?Number(t):t}n.xform=t,e.push(n);const i=new pe("size");return i.xform=r,e.push(i),e.push(new pe("timeCreated")),e.push(new pe("updated")),e.push(new pe("md5Hash",null,!0)),e.push(new pe("cacheControl",null,!0)),e.push(new pe("contentDisposition",null,!0)),e.push(new pe("contentEncoding",null,!0)),e.push(new pe("contentLanguage",null,!0)),e.push(new pe("contentType",null,!0)),e.push(new pe("metadata","customMetadata",!0)),ge=e,ge}function ye(e,t){function n(){const n=e["bucket"],r=e["fullPath"],i=new C(n,r);return t._makeStorageReference(i)}Object.defineProperty(e,"ref",{get:n})}function be(e,t,n){const r={type:"file"},i=n.length;for(let s=0;s<i;s++){const e=n[s];r[e.local]=e.xform(r,t[e.server])}return ye(r,e),r}function we(e,t,n){const r=le(t);if(null===r)return null;const i=r;return be(e,i,n)}function _e(e,t){const n={},r=t.length;for(let i=0;i<r;i++){const r=t[i];r.writable&&(n[r.server]=e[r.local])}return JSON.stringify(n)}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ee{constructor(e,t,n,r){this.url=e,this.method=t,this.handler=n,this.timeout=r,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Oe(e){if(!e)throw d()}function Te(e,t){function n(n,r){const i=we(e,r,t);return Oe(null!==i),i}return n}function Ie(e){function t(t,n){let r;return r=401===t.getStatus()?t.getErrorText().includes("Firebase App Check token is invalid")?g():p():402===t.getStatus()?f(e.bucket):403===t.getStatus()?m(e.path):n,r.serverResponse=n.serverResponse,r}return t}function Se(e,t){return e&&e["contentType"]||t&&t.type()||"application/octet-stream"}function ke(e,t,n){const r=Object.assign({},n);return r["fullPath"]=e.path,r["size"]=t.size(),r["contentType"]||(r["contentType"]=Se(null,t)),r}function Ce(e,t,n,r,i){const s=t.bucketOnlyServerUrl(),o={"X-Goog-Upload-Protocol":"multipart"};function a(){let e="";for(let t=0;t<2;t++)e+=Math.random().toString().slice(2);return e}const c=a();o["Content-Type"]="multipart/related; boundary="+c;const l=ke(t,r,i),u=_e(l,n),h="--"+c+"\r\nContent-Type: application/json; charset=utf-8\r\n\r\n"+u+"\r\n--"+c+"\r\nContent-Type: "+l["contentType"]+"\r\n\r\n",d="\r\n--"+c+"--",f=ce.getBlob(h,r,d);if(null===f)throw E();const p={name:l["fullPath"]},g=F(s,e.host,e._protocol),m="POST",v=e.maxUploadRetryTime,y=new Ee(g,m,Te(e,n),v);return y.urlParams=p,y.headers=o,y.body=f.uploadData(),y.errorHandler=Ie(t),y}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
let Ae=null;class xe{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=V.NO_ERROR,this.sendPromise_=new Promise(e=>{this.xhr_.addEventListener("abort",()=>{this.errorCode_=V.ABORT,e()}),this.xhr_.addEventListener("error",()=>{this.errorCode_=V.NETWORK_ERROR,e()}),this.xhr_.addEventListener("load",()=>{e()})})}send(e,t,n,r){if(this.sent_)throw k("cannot .send() more than once");if(this.sent_=!0,this.xhr_.open(t,e,!0),void 0!==r)for(const i in r)r.hasOwnProperty(i)&&this.xhr_.setRequestHeader(i,r[i].toString());return void 0!==n?this.xhr_.send(n):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw k("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw k("cannot .getStatus() before sending");try{return this.xhr_.status}catch(e){return-1}}getResponse(){if(!this.sent_)throw k("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw k("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(e){return this.xhr_.getResponseHeader(e)}addUploadProgressListener(e){null!=this.xhr_.upload&&this.xhr_.upload.addEventListener("progress",e)}removeUploadProgressListener(e){null!=this.xhr_.upload&&this.xhr_.upload.removeEventListener("progress",e)}}class Re extends xe{initXhr(){this.xhr_.responseType="text"}}function Ne(){return Ae?Ae():new Re}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class je{constructor(e,t){this._service=e,this._location=t instanceof C?t:C.makeFromUrl(t,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,t){return new je(e,t)}get root(){const e=new C(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return de(this._location.path)}get storage(){return this._service}get parent(){const e=ue(this._location.path);if(null===e)return null;const t=new C(this._location.bucket,e);return new je(this._service,t)}_throwIfRoot(e){if(""===this._location.path)throw I(e)}}function Le(e,t,n){e._throwIfRoot("uploadBytes");const r=Ce(e.storage,e._location,ve(),new ce(t,!0),n);return e.storage.makeRequestWithTokens(r,Ne).then(t=>({metadata:t,ref:e}))}function De(e,t){const n=he(e._location.path,t),r=new C(e._location.bucket,n);return new je(e.storage,r)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pe(e){return/^[A-Za-z]+:\/\//.test(e)}function Me(e,t){return new je(e,t)}function Fe(e,t){if(e instanceof Be){const n=e;if(null==n._bucket)throw _();const r=new je(n,n._bucket);return null!=t?Fe(r,t):r}return void 0!==t?De(e,t):e}function Ue(e,t){if(t&&Pe(t)){if(e instanceof Be)return Me(e,t);throw O("To use ref(service, url), the first argument must be a Storage instance.")}return Fe(e,t)}function Ve(e,t){const n=null===t||void 0===t?void 0:t[a];return null==n?null:C.makeFromBucketSpec(n,e)}class Be{constructor(e,t,n,r,i){this.app=e,this._authProvider=t,this._appCheckProvider=n,this._url=r,this._firebaseVersion=i,this._bucket=null,this._host=o,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=c,this._maxUploadRetryTime=l,this._requests=new Set,this._bucket=null!=r?C.makeFromBucketSpec(r,this._host):Ve(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,null!=this._url?this._bucket=C.makeFromBucketSpec(this._url,e):this._bucket=Ve(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){M("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){M("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const t=await e.getToken();if(null!==t)return t.accessToken}return null}async _getAppCheckToken(){const e=this._appCheckProvider.getImmediate({optional:!0});if(e){const t=await e.getToken();return t.token}return null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new je(this,e)}_makeRequest(e,t,n,r){if(this._deleted)return new A(T());{const i=G(e,this._appId,n,r,t,this._firebaseVersion);return this._requests.add(i),i.getPromise().then(()=>this._requests.delete(i),()=>this._requests.delete(i)),i}}async makeRequestWithTokens(e,t){const[n,r]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,t,n,r).getPromise()}}const ze="@firebase/storage",$e="0.9.9",qe="storage";function He(e,t,n){return e=Object(i["l"])(e),Le(e,t,n)}function We(e,t){return e=Object(i["l"])(e),Ue(e,t)}function Ge(e=Object(r["getApp"])(),t){e=Object(i["l"])(e);const n=Object(r["_getProvider"])(e,qe),s=n.getImmediate({identifier:t});return s}function Ke(e,{instanceIdentifier:t}){const n=e.getProvider("app").getImmediate(),i=e.getProvider("auth-internal"),s=e.getProvider("app-check-internal");return new Be(n,i,s,t,r["SDK_VERSION"])}function Ye(){Object(r["_registerComponent"])(new s["a"](qe,Ke,"PUBLIC").setMultipleInstances(!0)),Object(r["registerVersion"])(ze,$e,""),Object(r["registerVersion"])(ze,$e,"esm2017")}Ye()},"589b":function(e,t,n){"use strict";n.r(t),n.d(t,"FirebaseError",(function(){return s["c"]})),n.d(t,"SDK_VERSION",(function(){return ye})),n.d(t,"_DEFAULT_ENTRY_NAME",(function(){return se})),n.d(t,"_addComponent",(function(){return le})),n.d(t,"_addOrOverwriteComponent",(function(){return ue})),n.d(t,"_apps",(function(){return ae})),n.d(t,"_clearComponents",(function(){return pe})),n.d(t,"_components",(function(){return ce})),n.d(t,"_getProvider",(function(){return de})),n.d(t,"_registerComponent",(function(){return he})),n.d(t,"_removeServiceInstance",(function(){return fe})),n.d(t,"deleteApp",(function(){return Ee})),n.d(t,"getApp",(function(){return we})),n.d(t,"getApps",(function(){return _e})),n.d(t,"initializeApp",(function(){return be})),n.d(t,"onLog",(function(){return Te})),n.d(t,"registerVersion",(function(){return Oe})),n.d(t,"setLogLevel",(function(){return Ie}));var r=n("22e5"),i=n("e691"),s=n("1fd5");const o=(e,t)=>t.some(t=>e instanceof t);let a,c;function l(){return a||(a=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function u(){return c||(c=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const h=new WeakMap,d=new WeakMap,f=new WeakMap,p=new WeakMap,g=new WeakMap;function m(e){const t=new Promise((t,n)=>{const r=()=>{e.removeEventListener("success",i),e.removeEventListener("error",s)},i=()=>{t(E(e.result)),r()},s=()=>{n(e.error),r()};e.addEventListener("success",i),e.addEventListener("error",s)});return t.then(t=>{t instanceof IDBCursor&&h.set(t,e)}).catch(()=>{}),g.set(t,e),t}function v(e){if(d.has(e))return;const t=new Promise((t,n)=>{const r=()=>{e.removeEventListener("complete",i),e.removeEventListener("error",s),e.removeEventListener("abort",s)},i=()=>{t(),r()},s=()=>{n(e.error||new DOMException("AbortError","AbortError")),r()};e.addEventListener("complete",i),e.addEventListener("error",s),e.addEventListener("abort",s)});d.set(e,t)}let y={get(e,t,n){if(e instanceof IDBTransaction){if("done"===t)return d.get(e);if("objectStoreNames"===t)return e.objectStoreNames||f.get(e);if("store"===t)return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return E(e[t])},set(e,t,n){return e[t]=n,!0},has(e,t){return e instanceof IDBTransaction&&("done"===t||"store"===t)||t in e}};function b(e){y=e(y)}function w(e){return e!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?u().includes(e)?function(...t){return e.apply(O(this),t),E(h.get(this))}:function(...t){return E(e.apply(O(this),t))}:function(t,...n){const r=e.call(O(this),t,...n);return f.set(r,t.sort?t.sort():[t]),E(r)}}function _(e){return"function"===typeof e?w(e):(e instanceof IDBTransaction&&v(e),o(e,l())?new Proxy(e,y):e)}function E(e){if(e instanceof IDBRequest)return m(e);if(p.has(e))return p.get(e);const t=_(e);return t!==e&&(p.set(e,t),g.set(t,e)),t}const O=e=>g.get(e);function T(e,t,{blocked:n,upgrade:r,blocking:i,terminated:s}={}){const o=indexedDB.open(e,t),a=E(o);return r&&o.addEventListener("upgradeneeded",e=>{r(E(o.result),e.oldVersion,e.newVersion,E(o.transaction))}),n&&o.addEventListener("blocked",()=>n()),a.then(e=>{s&&e.addEventListener("close",()=>s()),i&&e.addEventListener("versionchange",()=>i())}).catch(()=>{}),a}const I=["get","getKey","getAll","getAllKeys","count"],S=["put","add","delete","clear"],k=new Map;function C(e,t){if(!(e instanceof IDBDatabase)||t in e||"string"!==typeof t)return;if(k.get(t))return k.get(t);const n=t.replace(/FromIndex$/,""),r=t!==n,i=S.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!i&&!I.includes(n))return;const s=async function(e,...t){const s=this.transaction(e,i?"readwrite":"readonly");let o=s.store;return r&&(o=o.index(t.shift())),(await Promise.all([o[n](...t),i&&s.done]))[0]};return k.set(t,s),s}b(e=>({...e,get:(t,n,r)=>C(t,n)||e.get(t,n,r),has:(t,n)=>!!C(t,n)||e.has(t,n)}));
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class A{constructor(e){this.container=e}getPlatformInfoString(){const e=this.container.getProviders();return e.map(e=>{if(x(e)){const t=e.getImmediate();return`${t.library}/${t.version}`}return null}).filter(e=>e).join(" ")}}function x(e){const t=e.getComponent();return"VERSION"===(null===t||void 0===t?void 0:t.type)}const R="@firebase/app",N="0.7.31",j=new i["b"]("@firebase/app"),L="@firebase/app-compat",D="@firebase/analytics-compat",P="@firebase/analytics",M="@firebase/app-check-compat",F="@firebase/app-check",U="@firebase/auth",V="@firebase/auth-compat",B="@firebase/database",z="@firebase/database-compat",$="@firebase/functions",q="@firebase/functions-compat",H="@firebase/installations",W="@firebase/installations-compat",G="@firebase/messaging",K="@firebase/messaging-compat",Y="@firebase/performance",Q="@firebase/performance-compat",X="@firebase/remote-config",J="@firebase/remote-config-compat",Z="@firebase/storage",ee="@firebase/storage-compat",te="@firebase/firestore",ne="@firebase/firestore-compat",re="firebase",ie="9.9.3",se="[DEFAULT]",oe={[R]:"fire-core",[L]:"fire-core-compat",[P]:"fire-analytics",[D]:"fire-analytics-compat",[F]:"fire-app-check",[M]:"fire-app-check-compat",[U]:"fire-auth",[V]:"fire-auth-compat",[B]:"fire-rtdb",[z]:"fire-rtdb-compat",[$]:"fire-fn",[q]:"fire-fn-compat",[H]:"fire-iid",[W]:"fire-iid-compat",[G]:"fire-fcm",[K]:"fire-fcm-compat",[Y]:"fire-perf",[Q]:"fire-perf-compat",[X]:"fire-rc",[J]:"fire-rc-compat",[Z]:"fire-gcs",[ee]:"fire-gcs-compat",[te]:"fire-fst",[ne]:"fire-fst-compat","fire-js":"fire-js",[re]:"fire-js-all"},ae=new Map,ce=new Map;function le(e,t){try{e.container.addComponent(t)}catch(n){j.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`,n)}}function ue(e,t){e.container.addOrOverwriteComponent(t)}function he(e){const t=e.name;if(ce.has(t))return j.debug(`There were multiple attempts to register component ${t}.`),!1;ce.set(t,e);for(const n of ae.values())le(n,e);return!0}function de(e,t){const n=e.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),e.container.getProvider(t)}function fe(e,t,n=se){de(e,t).clearInstance(n)}function pe(){ce.clear()}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ge={["no-app"]:"No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()",["bad-app-name"]:"Illegal App name: '{$appName}",["duplicate-app"]:"Firebase App named '{$appName}' already exists with different options or config",["app-deleted"]:"Firebase App named '{$appName}' already deleted",["invalid-app-argument"]:"firebase.{$appName}() takes either no argument or a Firebase App instance.",["invalid-log-argument"]:"First argument to `onLog` must be null or a function.",["idb-open"]:"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.",["idb-get"]:"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.",["idb-set"]:"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.",["idb-delete"]:"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}."},me=new s["b"]("app","Firebase",ge);
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ve{constructor(e,t,n){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new r["a"]("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw me.create("app-deleted",{appName:this._name})}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ye=ie;function be(e,t={}){if("object"!==typeof t){const e=t;t={name:e}}const n=Object.assign({name:se,automaticDataCollectionEnabled:!1},t),i=n.name;if("string"!==typeof i||!i)throw me.create("bad-app-name",{appName:String(i)});const o=ae.get(i);if(o){if(Object(s["i"])(e,o.options)&&Object(s["i"])(n,o.config))return o;throw me.create("duplicate-app",{appName:i})}const a=new r["b"](i);for(const r of ce.values())a.addComponent(r);const c=new ve(e,n,a);return ae.set(i,c),c}function we(e=se){const t=ae.get(e);if(!t)throw me.create("no-app",{appName:e});return t}function _e(){return Array.from(ae.values())}async function Ee(e){const t=e.name;ae.has(t)&&(ae.delete(t),await Promise.all(e.container.getProviders().map(e=>e.delete())),e.isDeleted=!0)}function Oe(e,t,n){var i;let s=null!==(i=oe[e])&&void 0!==i?i:e;n&&(s+="-"+n);const o=s.match(/\s|\//),a=t.match(/\s|\//);if(o||a){const e=[`Unable to register library "${s}" with version "${t}":`];return o&&e.push(`library name "${s}" contains illegal characters (whitespace or "/")`),o&&a&&e.push("and"),a&&e.push(`version name "${t}" contains illegal characters (whitespace or "/")`),void j.warn(e.join(" "))}he(new r["a"](s+"-version",()=>({library:s,version:t}),"VERSION"))}function Te(e,t){if(null!==e&&"function"!==typeof e)throw me.create("invalid-log-argument");Object(i["d"])(e,t)}function Ie(e){Object(i["c"])(e)}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Se="firebase-heartbeat-database",ke=1,Ce="firebase-heartbeat-store";let Ae=null;function xe(){return Ae||(Ae=T(Se,ke,{upgrade:(e,t)=>{switch(t){case 0:e.createObjectStore(Ce)}}}).catch(e=>{throw me.create("idb-open",{originalErrorMessage:e.message})})),Ae}async function Re(e){var t;try{const t=await xe();return t.transaction(Ce).objectStore(Ce).get(je(e))}catch(n){if(n instanceof s["c"])j.warn(n.message);else{const e=me.create("idb-get",{originalErrorMessage:null===(t=n)||void 0===t?void 0:t.message});j.warn(e.message)}}}async function Ne(e,t){var n;try{const n=await xe(),r=n.transaction(Ce,"readwrite"),i=r.objectStore(Ce);return await i.put(t,je(e)),r.done}catch(r){if(r instanceof s["c"])j.warn(r.message);else{const e=me.create("idb-set",{originalErrorMessage:null===(n=r)||void 0===n?void 0:n.message});j.warn(e.message)}}}function je(e){return`${e.name}!${e.options.appId}`}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Le=1024,De=2592e6;class Pe{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new Ue(t),this._heartbeatsCachePromise=this._storage.read().then(e=>(this._heartbeatsCache=e,e))}async triggerHeartbeat(){const e=this.container.getProvider("platform-logger").getImmediate(),t=e.getPlatformInfoString(),n=Me();if(null===this._heartbeatsCache&&(this._heartbeatsCache=await this._heartbeatsCachePromise),this._heartbeatsCache.lastSentHeartbeatDate!==n&&!this._heartbeatsCache.heartbeats.some(e=>e.date===n))return this._heartbeatsCache.heartbeats.push({date:n,agent:t}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(e=>{const t=new Date(e.date).valueOf(),n=Date.now();return n-t<=De}),this._storage.overwrite(this._heartbeatsCache)}async getHeartbeatsHeader(){if(null===this._heartbeatsCache&&await this._heartbeatsCachePromise,null===this._heartbeatsCache||0===this._heartbeatsCache.heartbeats.length)return"";const e=Me(),{heartbeatsToSend:t,unsentEntries:n}=Fe(this._heartbeatsCache.heartbeats),r=Object(s["e"])(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,n.length>0?(this._heartbeatsCache.heartbeats=n,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}}function Me(){const e=new Date;return e.toISOString().substring(0,10)}function Fe(e,t=Le){const n=[];let r=e.slice();for(const i of e){const e=n.find(e=>e.agent===i.agent);if(e){if(e.dates.push(i.date),Ve(n)>t){e.dates.pop();break}}else if(n.push({agent:i.agent,dates:[i.date]}),Ve(n)>t){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class Ue{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return!!Object(s["s"])()&&Object(s["A"])().then(()=>!0).catch(()=>!1)}async read(){const e=await this._canUseIndexedDBPromise;if(e){const e=await Re(this.app);return e||{heartbeats:[]}}return{heartbeats:[]}}async overwrite(e){var t;const n=await this._canUseIndexedDBPromise;if(n){const n=await this.read();return Ne(this.app,{lastSentHeartbeatDate:null!==(t=e.lastSentHeartbeatDate)&&void 0!==t?t:n.lastSentHeartbeatDate,heartbeats:e.heartbeats})}}async add(e){var t;const n=await this._canUseIndexedDBPromise;if(n){const n=await this.read();return Ne(this.app,{lastSentHeartbeatDate:null!==(t=e.lastSentHeartbeatDate)&&void 0!==t?t:n.lastSentHeartbeatDate,heartbeats:[...n.heartbeats,...e.heartbeats]})}}}function Ve(e){return Object(s["e"])(JSON.stringify({version:2,heartbeats:e})).length}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Be(e){he(new r["a"]("platform-logger",e=>new A(e),"PRIVATE")),he(new r["a"]("heartbeat",e=>new Pe(e),"PRIVATE")),Oe(R,N,e),Oe(R,N,"esm2017"),Oe("fire-js","")}Be("")},5926:function(e,t){var n=Math.ceil,r=Math.floor;e.exports=function(e){var t=+e;return t!==t||0===t?0:(t>0?r:n)(t)}},5994:function(e,t,n){"use strict";(function(e){var t=n("7ded"),r=n("1f5a"),i=n("22e5"),s=n("1fd5"),o="@firebase/auth-compat",a="0.2.18";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const c=1e3;function l(){var e;return(null===(e=null===self||void 0===self?void 0:self.location)||void 0===e?void 0:e.protocol)||null}function u(){return"http:"===l()||"https:"===l()}function h(e=Object(s["m"])()){return!("file:"!==l()&&"ionic:"!==l()&&"capacitor:"!==l()||!e.toLowerCase().match(/iphone|ipad|ipod|android/))}function d(){return Object(s["v"])()||Object(s["u"])()}function f(){return Object(s["r"])()&&11===(null===document||void 0===document?void 0:document.documentMode)}function p(e=Object(s["m"])()){return/Edge\/\d+/.test(e)}function g(e=Object(s["m"])()){return f()||p(e)}function m(){try{const e=self.localStorage,t=r["s"]();if(e)return e["setItem"](t,"1"),e["removeItem"](t),!g()||Object(s["s"])()}catch(e){return v()&&Object(s["s"])()}return!1}function v(){return"undefined"!==typeof e&&"WorkerGlobalScope"in e&&"importScripts"in e}function y(){return(u()||Object(s["o"])()||h())&&!d()&&m()&&!v()}function b(){return h()&&"undefined"!==typeof document}async function w(){return!!b()&&new Promise(e=>{const t=setTimeout(()=>{e(!1)},c);document.addEventListener("deviceready",()=>{clearTimeout(t),e(!0)})})}function _(){return"undefined"!==typeof window?window:null}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const E={LOCAL:"local",NONE:"none",SESSION:"session"},O=r["p"],T="persistence";function I(e,t){O(Object.values(E).includes(t),e,"invalid-persistence-type"),Object(s["v"])()?O(t!==E.SESSION,e,"unsupported-persistence-type"):Object(s["u"])()?O(t===E.NONE,e,"unsupported-persistence-type"):v()?O(t===E.NONE||t===E.LOCAL&&Object(s["s"])(),e,"unsupported-persistence-type"):O(t===E.NONE||m(),e,"unsupported-persistence-type")}async function S(e){await e._initializationPromise;const t=C(),n=r["w"](T,e.config.apiKey,e.name);t&&t.setItem(n,e._getPersistence())}function k(e,t){const n=C();if(!n)return[];const i=r["w"](T,e,t),s=n.getItem(i);switch(s){case E.NONE:return[r["M"]];case E.LOCAL:return[r["N"],r["B"]];case E.SESSION:return[r["B"]];default:return[]}}function C(){var e;try{return(null===(e=_())||void 0===e?void 0:e.sessionStorage)||null}catch(t){return null}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const A=r["p"];class x{constructor(){this.browserResolver=r["t"](r["A"]),this.cordovaResolver=r["t"](r["F"]),this.underlyingResolver=null,this._redirectPersistence=r["B"],this._completeRedirectFn=r["u"],this._overrideRedirectResult=r["v"]}async _initialize(e){return await this.selectUnderlyingResolver(),this.assertedUnderlyingResolver._initialize(e)}async _openPopup(e,t,n,r){return await this.selectUnderlyingResolver(),this.assertedUnderlyingResolver._openPopup(e,t,n,r)}async _openRedirect(e,t,n,r){return await this.selectUnderlyingResolver(),this.assertedUnderlyingResolver._openRedirect(e,t,n,r)}_isIframeWebStorageSupported(e,t){this.assertedUnderlyingResolver._isIframeWebStorageSupported(e,t)}_originValidation(e){return this.assertedUnderlyingResolver._originValidation(e)}get _shouldInitProactively(){return b()||this.browserResolver._shouldInitProactively}get assertedUnderlyingResolver(){return A(this.underlyingResolver,"internal-error"),this.underlyingResolver}async selectUnderlyingResolver(){if(this.underlyingResolver)return;const e=await w();this.underlyingResolver=e?this.cordovaResolver:this.browserResolver}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function R(e){return e.unwrap()}function N(e){return e.wrapped()}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function j(e){return D(e)}function L(e,t){var n,i;const s=null===(n=t.customData)||void 0===n?void 0:n._tokenResponse;if("auth/multi-factor-auth-required"===(null===(i=t)||void 0===i?void 0:i.code)){const n=t;n.resolver=new F(e,r["K"](e,t))}else if(s){const e=D(t),n=t;e&&(n.credential=e,n.tenantId=s.tenantId||void 0,n.email=s.email||void 0,n.phoneNumber=s.phoneNumber||void 0)}}function D(e){const{_tokenResponse:t}=e instanceof s["c"]?e.customData:e;if(!t)return null;if(!(e instanceof s["c"])&&"temporaryProof"in t&&"phoneNumber"in t)return r["i"].credentialFromResult(e);const n=t.providerId;if(!n||n===r["k"].PASSWORD)return null;let i;switch(n){case r["k"].GOOGLE:i=r["f"];break;case r["k"].FACEBOOK:i=r["d"];break;case r["k"].GITHUB:i=r["e"];break;case r["k"].TWITTER:i=r["o"];break;default:const{oauthIdToken:e,oauthAccessToken:s,oauthTokenSecret:o,pendingToken:a,nonce:c}=t;return s||o||e||a?a?n.startsWith("saml.")?r["m"]._create(n,a):r["g"]._fromParams({providerId:n,signInMethod:n,pendingToken:a,idToken:e,accessToken:s}):new r["h"](n).credential({idToken:e,accessToken:s,rawNonce:c}):null}return e instanceof s["c"]?i.credentialFromError(e):i.credentialFromResult(e)}function P(e,t){return t.catch(t=>{throw t instanceof s["c"]&&L(e,t),t}).then(e=>{const t=e.operationType,n=e.user;return{operationType:t,credential:j(e),additionalUserInfo:r["J"](e),user:U.getOrCreate(n)}})}async function M(e,t){const n=await t;return{verificationId:n.verificationId,confirm:t=>P(e,n.confirm(t))}}class F{constructor(e,t){this.resolver=t,this.auth=N(e)}get session(){return this.resolver.session}get hints(){return this.resolver.hints}resolveSignIn(e){return P(R(this.auth),this.resolver.resolveSignIn(e))}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class U{constructor(e){this._delegate=e,this.multiFactor=r["T"](e)}static getOrCreate(e){return U.USER_MAP.has(e)||U.USER_MAP.set(e,new U(e)),U.USER_MAP.get(e)}delete(){return this._delegate.delete()}reload(){return this._delegate.reload()}toJSON(){return this._delegate.toJSON()}getIdTokenResult(e){return this._delegate.getIdTokenResult(e)}getIdToken(e){return this._delegate.getIdToken(e)}linkAndRetrieveDataWithCredential(e){return this.linkWithCredential(e)}async linkWithCredential(e){return P(this.auth,r["P"](this._delegate,e))}async linkWithPhoneNumber(e,t){return M(this.auth,r["Q"](this._delegate,e,t))}async linkWithPopup(e){return P(this.auth,r["R"](this._delegate,e,x))}async linkWithRedirect(e){return await S(r["q"](this.auth)),r["S"](this._delegate,e,x)}reauthenticateAndRetrieveDataWithCredential(e){return this.reauthenticateWithCredential(e)}async reauthenticateWithCredential(e){return P(this.auth,r["U"](this._delegate,e))}reauthenticateWithPhoneNumber(e,t){return M(this.auth,r["V"](this._delegate,e,t))}reauthenticateWithPopup(e){return P(this.auth,r["W"](this._delegate,e,x))}async reauthenticateWithRedirect(e){return await S(r["q"](this.auth)),r["X"](this._delegate,e,x)}sendEmailVerification(e){return r["Y"](this._delegate,e)}async unlink(e){return await r["jb"](this._delegate,e),this}updateEmail(e){return r["kb"](this._delegate,e)}updatePassword(e){return r["lb"](this._delegate,e)}updatePhoneNumber(e){return r["mb"](this._delegate,e)}updateProfile(e){return r["nb"](this._delegate,e)}verifyBeforeUpdateEmail(e,t){return r["ob"](this._delegate,e,t)}get emailVerified(){return this._delegate.emailVerified}get isAnonymous(){return this._delegate.isAnonymous}get metadata(){return this._delegate.metadata}get phoneNumber(){return this._delegate.phoneNumber}get providerData(){return this._delegate.providerData}get refreshToken(){return this._delegate.refreshToken}get tenantId(){return this._delegate.tenantId}get displayName(){return this._delegate.displayName}get email(){return this._delegate.email}get photoURL(){return this._delegate.photoURL}get providerId(){return this._delegate.providerId}get uid(){return this._delegate.uid}get auth(){return this._delegate.auth}}U.USER_MAP=new WeakMap;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const V=r["p"];class B{constructor(e,t){if(this.app=e,t.isInitialized())return this._delegate=t.getImmediate(),void this.linkUnderlyingAuth();const{apiKey:n}=e.options;V(n,"invalid-api-key",{appName:e.name}),V(n,"invalid-api-key",{appName:e.name});const i="undefined"!==typeof window?x:void 0;this._delegate=t.initialize({options:{persistence:$(n,e.name),popupRedirectResolver:i}}),this._delegate._updateErrorMap(r["H"]),this.linkUnderlyingAuth()}get emulatorConfig(){return this._delegate.emulatorConfig}get currentUser(){return this._delegate.currentUser?U.getOrCreate(this._delegate.currentUser):null}get languageCode(){return this._delegate.languageCode}set languageCode(e){this._delegate.languageCode=e}get settings(){return this._delegate.settings}get tenantId(){return this._delegate.tenantId}set tenantId(e){this._delegate.tenantId=e}useDeviceLanguage(){this._delegate.useDeviceLanguage()}signOut(){return this._delegate.signOut()}useEmulator(e,t){r["E"](this._delegate,e,t)}applyActionCode(e){return r["y"](this._delegate,e)}checkActionCode(e){return r["C"](this._delegate,e)}confirmPasswordReset(e,t){return r["D"](this._delegate,e,t)}async createUserWithEmailAndPassword(e,t){return P(this._delegate,r["G"](this._delegate,e,t))}fetchProvidersForEmail(e){return this.fetchSignInMethodsForEmail(e)}fetchSignInMethodsForEmail(e){return r["I"](this._delegate,e)}isSignInWithEmailLink(e){return r["O"](this._delegate,e)}async getRedirectResult(){V(y(),this._delegate,"operation-not-supported-in-this-environment");const e=await r["L"](this._delegate,x);return e?P(this._delegate,Promise.resolve(e)):{credential:null,user:null}}addFrameworkForLogging(e){r["x"](this._delegate,e)}onAuthStateChanged(e,t,n){const{next:r,error:i,complete:s}=z(e,t,n);return this._delegate.onAuthStateChanged(r,i,s)}onIdTokenChanged(e,t,n){const{next:r,error:i,complete:s}=z(e,t,n);return this._delegate.onIdTokenChanged(r,i,s)}sendSignInLinkToEmail(e,t){return r["ab"](this._delegate,e,t)}sendPasswordResetEmail(e,t){return r["Z"](this._delegate,e,t||void 0)}async setPersistence(e){let t;switch(I(this._delegate,e),e){case E.SESSION:t=r["B"];break;case E.LOCAL:const e=await r["t"](r["N"])._isAvailable();t=e?r["N"]:r["z"];break;case E.NONE:t=r["M"];break;default:return r["r"]("argument-error",{appName:this._delegate.name})}return this._delegate.setPersistence(t)}signInAndRetrieveDataWithCredential(e){return this.signInWithCredential(e)}signInAnonymously(){return P(this._delegate,r["bb"](this._delegate))}signInWithCredential(e){return P(this._delegate,r["cb"](this._delegate,e))}signInWithCustomToken(e){return P(this._delegate,r["db"](this._delegate,e))}signInWithEmailAndPassword(e,t){return P(this._delegate,r["eb"](this._delegate,e,t))}signInWithEmailLink(e,t){return P(this._delegate,r["fb"](this._delegate,e,t))}signInWithPhoneNumber(e,t){return M(this._delegate,r["gb"](this._delegate,e,t))}async signInWithPopup(e){return V(y(),this._delegate,"operation-not-supported-in-this-environment"),P(this._delegate,r["hb"](this._delegate,e,x))}async signInWithRedirect(e){return V(y(),this._delegate,"operation-not-supported-in-this-environment"),await S(this._delegate),r["ib"](this._delegate,e,x)}updateCurrentUser(e){return this._delegate.updateCurrentUser(e)}verifyPasswordResetCode(e){return r["pb"](this._delegate,e)}unwrap(){return this._delegate}_delete(){return this._delegate._delete()}linkUnderlyingAuth(){this._delegate.wrapped=()=>this}}function z(e,t,n){let r=e;"function"!==typeof e&&({next:r,error:t,complete:n}=e);const i=r,s=e=>i(e&&U.getOrCreate(e));return{next:s,error:t,complete:n}}function $(e,t){const n=k(e,t);if("undefined"===typeof self||n.includes(r["N"])||n.push(r["N"]),"undefined"!==typeof window)for(const i of[r["z"],r["B"]])n.includes(i)||n.push(i);return n.includes(r["M"])||n.push(r["M"]),n}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */B.Persistence=E;class q{constructor(){this.providerId="phone",this._delegate=new r["i"](R(t["a"].auth()))}static credential(e,t){return r["i"].credential(e,t)}verifyPhoneNumber(e,t){return this._delegate.verifyPhoneNumber(e,t)}unwrap(){return this._delegate}}q.PHONE_SIGN_IN_METHOD=r["i"].PHONE_SIGN_IN_METHOD,q.PROVIDER_ID=r["i"].PROVIDER_ID;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const H=r["p"];class W{constructor(e,n,i=t["a"].app()){var s;H(null===(s=i.options)||void 0===s?void 0:s.apiKey,"invalid-api-key",{appName:i.name}),this._delegate=new r["l"](e,n,i.auth()),this.type=this._delegate.type}clear(){this._delegate.clear()}render(){return this._delegate.render()}verify(){return this._delegate.verify()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const G="auth-compat";function K(e){e.INTERNAL.registerComponent(new i["a"](G,e=>{const t=e.getProvider("app-compat").getImmediate(),n=e.getProvider("auth");return new B(t,n)},"PUBLIC").setServiceProps({ActionCodeInfo:{Operation:{EMAIL_SIGNIN:r["a"].EMAIL_SIGNIN,PASSWORD_RESET:r["a"].PASSWORD_RESET,RECOVER_EMAIL:r["a"].RECOVER_EMAIL,REVERT_SECOND_FACTOR_ADDITION:r["a"].REVERT_SECOND_FACTOR_ADDITION,VERIFY_AND_CHANGE_EMAIL:r["a"].VERIFY_AND_CHANGE_EMAIL,VERIFY_EMAIL:r["a"].VERIFY_EMAIL}},EmailAuthProvider:r["c"],FacebookAuthProvider:r["d"],GithubAuthProvider:r["e"],GoogleAuthProvider:r["f"],OAuthProvider:r["h"],SAMLAuthProvider:r["n"],PhoneAuthProvider:q,PhoneMultiFactorGenerator:r["j"],RecaptchaVerifier:W,TwitterAuthProvider:r["o"],Auth:B,AuthCredential:r["b"],Error:s["c"]}).setInstantiationMode("LAZY").setMultipleInstances(!1)),e.registerVersion(o,a)}K(t["a"])}).call(this,n("c8ba"))},"59ed":function(e,t,n){var r=n("da84"),i=n("1626"),s=n("0d51"),o=r.TypeError;e.exports=function(e){if(i(e))return e;throw o(s(e)+" is not a function")}},"5bd2":function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var r=n("dd76"),i=n("216d"),s=n("c5e1"),o=n("7a23"),a={name:"Dialog",inheritAttrs:!1,emits:["update:visible","show","hide","maximize","unmaximize","dragend"],props:{header:null,footer:null,visible:Boolean,modal:Boolean,contentStyle:null,contentClass:String,rtl:Boolean,maximizable:Boolean,dismissableMask:Boolean,closable:{type:Boolean,default:!0},closeOnEscape:{type:Boolean,default:!0},showHeader:{type:Boolean,default:!0},baseZIndex:{type:Number,default:0},autoZIndex:{type:Boolean,default:!0},ariaCloseLabel:{type:String,default:"close"},position:{type:String,default:"center"},breakpoints:{type:Object,default:null},draggable:{type:Boolean,default:!0},keepInViewport:{type:Boolean,default:!0},minX:{type:Number,default:0},minY:{type:Number,default:0},appendTo:{type:String,default:"body"}},data(){return{containerVisible:this.visible,maximized:!1}},documentKeydownListener:null,container:null,mask:null,styleElement:null,dragging:null,documentDragListener:null,documentDragEndListener:null,lastPageX:null,lastPageY:null,updated(){this.visible&&(this.containerVisible=this.visible)},beforeUnmount(){this.unbindDocumentState(),this.unbindGlobalListeners(),this.destroyStyle(),this.mask=null,this.container&&this.autoZIndex&&r["f"].clear(this.container),this.container=null},mounted(){this.breakpoints&&this.createStyle()},methods:{close(){this.$emit("update:visible",!1)},onBeforeEnter(e){this.autoZIndex&&r["f"].set("modal",e,this.baseZIndex+this.$primevue.config.zIndex.modal),e.setAttribute(this.attributeSelector,"")},onEnter(){this.mask.style.zIndex=String(parseInt(this.container.style.zIndex,10)-1),this.$emit("show"),this.focus(),this.enableDocumentSettings(),this.bindGlobalListeners()},onBeforeLeave(){this.modal&&r["b"].addClass(this.mask,"p-component-overlay-leave")},onLeave(){this.$emit("hide")},onAfterLeave(e){this.autoZIndex&&r["f"].clear(e),this.containerVisible=!1,this.unbindDocumentState(),this.unbindGlobalListeners()},onMaskClick(e){this.dismissableMask&&this.closable&&this.modal&&this.mask===e.target&&this.close()},focus(){let e=this.container.querySelector("[autofocus]");e&&e.focus()},maximize(e){this.maximized?(this.maximized=!1,this.$emit("unmaximize",e)):(this.maximized=!0,this.$emit("maximize",e)),this.modal||(this.maximized?r["b"].addClass(document.body,"p-overflow-hidden"):r["b"].removeClass(document.body,"p-overflow-hidden"))},enableDocumentSettings(){(this.modal||this.maximizable&&this.maximized)&&r["b"].addClass(document.body,"p-overflow-hidden")},unbindDocumentState(){(this.modal||this.maximizable&&this.maximized)&&r["b"].removeClass(document.body,"p-overflow-hidden")},onKeyDown(e){if(9===e.which){e.preventDefault();let t=r["b"].getFocusableElements(this.container);if(t&&t.length>0)if(document.activeElement){let n=t.indexOf(document.activeElement);e.shiftKey?-1==n||0===n?t[t.length-1].focus():t[n-1].focus():-1==n||n===t.length-1?t[0].focus():t[n+1].focus()}else t[0].focus()}else 27===e.which&&this.closeOnEscape&&this.close()},bindDocumentKeyDownListener(){this.documentKeydownListener||(this.documentKeydownListener=this.onKeyDown.bind(this),window.document.addEventListener("keydown",this.documentKeydownListener))},unbindDocumentKeyDownListener(){this.documentKeydownListener&&(window.document.removeEventListener("keydown",this.documentKeydownListener),this.documentKeydownListener=null)},getPositionClass(){const e=["left","right","top","topleft","topright","bottom","bottomleft","bottomright"],t=e.find(e=>e===this.position);return t?"p-dialog-"+t:""},containerRef(e){this.container=e},maskRef(e){this.mask=e},createStyle(){if(!this.styleElement){this.styleElement=document.createElement("style"),this.styleElement.type="text/css",document.head.appendChild(this.styleElement);let e="";for(let t in this.breakpoints)e+=`\n                        @media screen and (max-width: ${t}) {\n                            .p-dialog[${this.attributeSelector}] {\n                                width: ${this.breakpoints[t]} !important;\n                            }\n                        }\n                    `;this.styleElement.innerHTML=e}},destroyStyle(){this.styleElement&&(document.head.removeChild(this.styleElement),this.styleElement=null)},initDrag(e){r["b"].hasClass(e.target,"p-dialog-header-icon")||r["b"].hasClass(e.target.parentElement,"p-dialog-header-icon")||this.draggable&&(this.dragging=!0,this.lastPageX=e.pageX,this.lastPageY=e.pageY,this.container.style.margin="0",r["b"].addClass(document.body,"p-unselectable-text"))},bindGlobalListeners(){this.draggable&&(this.bindDocumentDragListener(),this.bindDocumentDragEndListener()),this.closeOnEscape&&this.closable&&this.bindDocumentKeyDownListener()},unbindGlobalListeners(){this.unbindDocumentDragListener(),this.unbindDocumentDragEndListener(),this.unbindDocumentKeyDownListener()},bindDocumentDragListener(){this.documentDragListener=e=>{if(this.dragging){let t=r["b"].getOuterWidth(this.container),n=r["b"].getOuterHeight(this.container),i=e.pageX-this.lastPageX,s=e.pageY-this.lastPageY,o=this.container.getBoundingClientRect(),a=o.left+i,c=o.top+s,l=r["b"].getViewport();this.container.style.position="fixed",this.keepInViewport?(a>=this.minX&&a+t<l.width&&(this.lastPageX=e.pageX,this.container.style.left=a+"px"),c>=this.minY&&c+n<l.height&&(this.lastPageY=e.pageY,this.container.style.top=c+"px")):(this.lastPageX=e.pageX,this.container.style.left=a+"px",this.lastPageY=e.pageY,this.container.style.top=c+"px")}},window.document.addEventListener("mousemove",this.documentDragListener)},unbindDocumentDragListener(){this.documentDragListener&&(window.document.removeEventListener("mousemove",this.documentDragListener),this.documentDragListener=null)},bindDocumentDragEndListener(){this.documentDragEndListener=e=>{this.dragging&&(this.dragging=!1,r["b"].removeClass(document.body,"p-unselectable-text"),this.$emit("dragend",e))},window.document.addEventListener("mouseup",this.documentDragEndListener)},unbindDocumentDragEndListener(){this.documentDragEndListener&&(window.document.removeEventListener("mouseup",this.documentDragEndListener),this.documentDragEndListener=null)}},computed:{maskClass(){return["p-dialog-mask",{"p-component-overlay p-component-overlay-enter":this.modal},this.getPositionClass()]},dialogClass(){return["p-dialog p-component",{"p-dialog-rtl":this.rtl,"p-dialog-maximized":this.maximizable&&this.maximized,"p-input-filled":"filled"===this.$primevue.config.inputStyle,"p-ripple-disabled":!1===this.$primevue.config.ripple}]},maximizeIconClass(){return["p-dialog-header-maximize-icon pi",{"pi-window-maximize":!this.maximized,"pi-window-minimize":this.maximized}]},ariaId(){return Object(r["e"])()},ariaLabelledById(){return null!=this.header?this.ariaId+"_header":null},attributeSelector(){return Object(r["e"])()},contentStyleClass(){return["p-dialog-content",this.contentClass]}},directives:{ripple:i["a"]},components:{Portal:s["a"]}};const c=["aria-labelledby","aria-modal"],l=["id"],u={class:"p-dialog-header-icons"},h=["aria-label"],d=Object(o["i"])("span",{class:"p-dialog-header-close-icon pi pi-times"},null,-1),f=[d],p={key:1,class:"p-dialog-footer"};function g(e,t,n,r,i,s){const a=Object(o["J"])("Portal"),d=Object(o["K"])("ripple");return Object(o["B"])(),Object(o["f"])(a,{appendTo:n.appendTo},{default:Object(o["R"])(()=>[i.containerVisible?(Object(o["B"])(),Object(o["h"])("div",{key:0,ref:s.maskRef,class:Object(o["u"])(s.maskClass),onClick:t[3]||(t[3]=(...e)=>s.onMaskClick&&s.onMaskClick(...e))},[Object(o["m"])(o["c"],{name:"p-dialog",onBeforeEnter:s.onBeforeEnter,onEnter:s.onEnter,onBeforeLeave:s.onBeforeLeave,onLeave:s.onLeave,onAfterLeave:s.onAfterLeave,appear:""},{default:Object(o["R"])(()=>[n.visible?(Object(o["B"])(),Object(o["h"])("div",Object(o["s"])({key:0,ref:s.containerRef,class:s.dialogClass},e.$attrs,{role:"dialog","aria-labelledby":s.ariaLabelledById,"aria-modal":n.modal}),[n.showHeader?(Object(o["B"])(),Object(o["h"])("div",{key:0,class:"p-dialog-header",onMousedown:t[2]||(t[2]=(...e)=>s.initDrag&&s.initDrag(...e))},[Object(o["I"])(e.$slots,"header",{},()=>[n.header?(Object(o["B"])(),Object(o["h"])("span",{key:0,id:s.ariaLabelledById,class:"p-dialog-title"},Object(o["M"])(n.header),9,l)):Object(o["g"])("",!0)]),Object(o["i"])("div",u,[n.maximizable?Object(o["S"])((Object(o["B"])(),Object(o["h"])("button",{key:0,class:"p-dialog-header-icon p-dialog-header-maximize p-link",onClick:t[0]||(t[0]=(...e)=>s.maximize&&s.maximize(...e)),type:"button",tabindex:"-1"},[Object(o["i"])("span",{class:Object(o["u"])(s.maximizeIconClass)},null,2)])),[[d]]):Object(o["g"])("",!0),n.closable?Object(o["S"])((Object(o["B"])(),Object(o["h"])("button",{key:1,class:"p-dialog-header-icon p-dialog-header-close p-link",onClick:t[1]||(t[1]=(...e)=>s.close&&s.close(...e)),"aria-label":n.ariaCloseLabel,type:"button"},f,8,h)),[[d]]):Object(o["g"])("",!0)])],32)):Object(o["g"])("",!0),Object(o["i"])("div",{class:Object(o["u"])(s.contentStyleClass),style:Object(o["v"])(n.contentStyle)},[Object(o["I"])(e.$slots,"default")],6),n.footer||e.$slots.footer?(Object(o["B"])(),Object(o["h"])("div",p,[Object(o["I"])(e.$slots,"footer",{},()=>[Object(o["l"])(Object(o["M"])(n.footer),1)])])):Object(o["g"])("",!0)],16,c)):Object(o["g"])("",!0)]),_:3},8,["onBeforeEnter","onEnter","onBeforeLeave","onLeave","onAfterLeave"])],2)):Object(o["g"])("",!0)]),_:3},8,["appendTo"])}function m(e,t){void 0===t&&(t={});var n=t.insertAt;if(e&&"undefined"!==typeof document){var r=document.head||document.getElementsByTagName("head")[0],i=document.createElement("style");i.type="text/css","top"===n&&r.firstChild?r.insertBefore(i,r.firstChild):r.appendChild(i),i.styleSheet?i.styleSheet.cssText=e:i.appendChild(document.createTextNode(e))}}var v="\n.p-dialog-mask {\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    pointer-events: none;\n}\n.p-dialog-mask.p-component-overlay {\n    pointer-events: auto;\n}\n.p-dialog {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    pointer-events: auto;\n    max-height: 90%;\n    -webkit-transform: scale(1);\n            transform: scale(1);\n}\n.p-dialog-content {\n    overflow-y: auto;\n}\n.p-dialog-header {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: justify;\n        -ms-flex-pack: justify;\n            justify-content: space-between;\n    -ms-flex-negative: 0;\n        flex-shrink: 0;\n}\n.p-dialog-footer {\n    -ms-flex-negative: 0;\n        flex-shrink: 0;\n}\n.p-dialog .p-dialog-header-icons {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n}\n.p-dialog .p-dialog-header-icon {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    overflow: hidden;\n    position: relative;\n}\n\n/* Fluid */\n.p-fluid .p-dialog-footer .p-button {\n    width: auto;\n}\n\n/* Animation */\n/* Center */\n.p-dialog-enter-active {\n    -webkit-transition: all 150ms cubic-bezier(0, 0, 0.2, 1);\n    transition: all 150ms cubic-bezier(0, 0, 0.2, 1);\n}\n.p-dialog-leave-active {\n    -webkit-transition: all 150ms cubic-bezier(0.4, 0.0, 0.2, 1);\n    transition: all 150ms cubic-bezier(0.4, 0.0, 0.2, 1);\n}\n.p-dialog-enter-from,\n.p-dialog-leave-to {\n    opacity: 0;\n    -webkit-transform: scale(0.7);\n            transform: scale(0.7);\n}\n\n/* Top, Bottom, Left, Right, Top* and Bottom* */\n.p-dialog-top .p-dialog,\n.p-dialog-bottom .p-dialog,\n.p-dialog-left .p-dialog,\n.p-dialog-right .p-dialog,\n.p-dialog-topleft .p-dialog,\n.p-dialog-topright .p-dialog,\n.p-dialog-bottomleft .p-dialog,\n.p-dialog-bottomright .p-dialog {\n    margin: .75rem;\n    -webkit-transform: translate3d(0px, 0px, 0px);\n            transform: translate3d(0px, 0px, 0px);\n}\n.p-dialog-top .p-dialog-enter-active,\n.p-dialog-top .p-dialog-leave-active,\n.p-dialog-bottom .p-dialog-enter-active,\n.p-dialog-bottom .p-dialog-leave-active,\n.p-dialog-left .p-dialog-enter-active,\n.p-dialog-left .p-dialog-leave-active,\n.p-dialog-right .p-dialog-enter-active,\n.p-dialog-right .p-dialog-leave-active,\n.p-dialog-topleft .p-dialog-enter-active,\n.p-dialog-topleft .p-dialog-leave-active,\n.p-dialog-topright .p-dialog-enter-active,\n.p-dialog-topright .p-dialog-leave-active,\n.p-dialog-bottomleft .p-dialog-enter-active,\n.p-dialog-bottomleft .p-dialog-leave-active,\n.p-dialog-bottomright .p-dialog-enter-active,\n.p-dialog-bottomright .p-dialog-leave-active {\n    -webkit-transition: all .3s ease-out;\n    transition: all .3s ease-out;\n}\n.p-dialog-top .p-dialog-enter-from,\n.p-dialog-top .p-dialog-leave-to {\n    -webkit-transform: translate3d(0px, -100%, 0px);\n            transform: translate3d(0px, -100%, 0px);\n}\n.p-dialog-bottom .p-dialog-enter-from,\n.p-dialog-bottom .p-dialog-leave-to {\n    -webkit-transform: translate3d(0px, 100%, 0px);\n            transform: translate3d(0px, 100%, 0px);\n}\n.p-dialog-left .p-dialog-enter-from,\n.p-dialog-left .p-dialog-leave-to,\n.p-dialog-topleft .p-dialog-enter-from,\n.p-dialog-topleft .p-dialog-leave-to,\n.p-dialog-bottomleft .p-dialog-enter-from,\n.p-dialog-bottomleft .p-dialog-leave-to {\n    -webkit-transform: translate3d(-100%, 0px, 0px);\n            transform: translate3d(-100%, 0px, 0px);\n}\n.p-dialog-right .p-dialog-enter-from,\n.p-dialog-right .p-dialog-leave-to,\n.p-dialog-topright .p-dialog-enter-from,\n.p-dialog-topright .p-dialog-leave-to,\n.p-dialog-bottomright .p-dialog-enter-from,\n.p-dialog-bottomright .p-dialog-leave-to {\n    -webkit-transform: translate3d(100%, 0px, 0px);\n            transform: translate3d(100%, 0px, 0px);\n}\n\n/* Maximize */\n.p-dialog-maximized {\n    -webkit-transition: none;\n    transition: none;\n    -webkit-transform: none;\n            transform: none;\n    width: 100vw !important;\n    height: 100vh !important;\n    top: 0px !important;\n    left: 0px !important;\n    max-height: 100%;\n    height: 100%;\n}\n.p-dialog-maximized .p-dialog-content {\n    -webkit-box-flex: 1;\n        -ms-flex-positive: 1;\n            flex-grow: 1;\n}\n\n/* Position */\n.p-dialog-left {\n    -webkit-box-pack: start;\n        -ms-flex-pack: start;\n            justify-content: flex-start;\n}\n.p-dialog-right {\n    -webkit-box-pack: end;\n        -ms-flex-pack: end;\n            justify-content: flex-end;\n}\n.p-dialog-top {\n    -webkit-box-align: start;\n        -ms-flex-align: start;\n            align-items: flex-start;\n}\n.p-dialog-topleft {\n    -webkit-box-pack: start;\n        -ms-flex-pack: start;\n            justify-content: flex-start;\n    -webkit-box-align: start;\n        -ms-flex-align: start;\n            align-items: flex-start;\n}\n.p-dialog-topright {\n    -webkit-box-pack: end;\n        -ms-flex-pack: end;\n            justify-content: flex-end;\n    -webkit-box-align: start;\n        -ms-flex-align: start;\n            align-items: flex-start;\n}\n.p-dialog-bottom {\n    -webkit-box-align: end;\n        -ms-flex-align: end;\n            align-items: flex-end;\n}\n.p-dialog-bottomleft {\n    -webkit-box-pack: start;\n        -ms-flex-pack: start;\n            justify-content: flex-start;\n    -webkit-box-align: end;\n        -ms-flex-align: end;\n            align-items: flex-end;\n}\n.p-dialog-bottomright {\n    -webkit-box-pack: end;\n        -ms-flex-pack: end;\n            justify-content: flex-end;\n    -webkit-box-align: end;\n        -ms-flex-align: end;\n            align-items: flex-end;\n}\n.p-confirm-dialog .p-dialog-content {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n}\n";m(v),a.render=g},"5c6c":function(e,t){e.exports=function(e,t){return{enumerable:!(1&e),configurable:!(2&e),writable:!(4&e),value:t}}},"5cce":function(e,t){e.exports={version:"0.27.2"}},"5e77":function(e,t,n){var r=n("83ab"),i=n("1a2d"),s=Function.prototype,o=r&&Object.getOwnPropertyDescriptor,a=i(s,"name"),c=a&&"something"===function(){}.name,l=a&&(!r||r&&o(s,"name").configurable);e.exports={EXISTS:a,PROPER:c,CONFIGURABLE:l}},"5f02":function(e,t,n){"use strict";var r=n("c532");e.exports=function(e){return r.isObject(e)&&!0===e.isAxiosError}},"605d":function(e,t,n){var r=n("c6b6"),i=n("da84");e.exports="process"==r(i.process)},6069:function(e,t){e.exports="object"==typeof window},"60da":function(e,t,n){"use strict";var r=n("83ab"),i=n("e330"),s=n("c65b"),o=n("d039"),a=n("df75"),c=n("7418"),l=n("d1e7"),u=n("7b0b"),h=n("44ad"),d=Object.assign,f=Object.defineProperty,p=i([].concat);e.exports=!d||o((function(){if(r&&1!==d({b:1},d(f({},"a",{enumerable:!0,get:function(){f(this,"b",{value:3,enumerable:!1})}}),{b:2})).b)return!0;var e={},t={},n=Symbol(),i="abcdefghijklmnopqrst";return e[n]=7,i.split("").forEach((function(e){t[e]=e})),7!=d({},e)[n]||a(d({},t)).join("")!=i}))?function(e,t){var n=u(e),i=arguments.length,o=1,d=c.f,f=l.f;while(i>o){var g,m=h(arguments[o++]),v=d?p(a(m),d(m)):a(m),y=v.length,b=0;while(y>b)g=v[b++],r&&!s(f,m,g)||(n[g]=m[g])}return n}:d},6547:function(e,t,n){var r=n("e330"),i=n("5926"),s=n("577e"),o=n("1d80"),a=r("".charAt),c=r("".charCodeAt),l=r("".slice),u=function(e){return function(t,n){var r,u,h=s(o(t)),d=i(n),f=h.length;return d<0||d>=f?e?"":void 0:(r=c(h,d),r<55296||r>56319||d+1===f||(u=c(h,d+1))<56320||u>57343?e?a(h,d):r:e?l(h,d,d+2):u-56320+(r-55296<<10)+65536)}};e.exports={codeAt:u(!1),charAt:u(!0)}},"65f0":function(e,t,n){var r=n("0b42");e.exports=function(e,t){return new(r(e))(0===t?0:t)}},"68ee":function(e,t,n){var r=n("e330"),i=n("d039"),s=n("1626"),o=n("f5df"),a=n("d066"),c=n("8925"),l=function(){},u=[],h=a("Reflect","construct"),d=/^\s*(?:class|function)\b/,f=r(d.exec),p=!d.exec(l),g=function(e){if(!s(e))return!1;try{return h(l,u,e),!0}catch(t){return!1}},m=function(e){if(!s(e))return!1;switch(o(e)){case"AsyncFunction":case"GeneratorFunction":case"AsyncGeneratorFunction":return!1}try{return p||!!f(d,c(e))}catch(t){return!0}};m.sham=!0,e.exports=!h||i((function(){var e;return g(g.call)||!g(Object)||!g((function(){e=!0}))||e}))?m:g},"69f3":function(e,t,n){var r,i,s,o=n("7f9a"),a=n("da84"),c=n("e330"),l=n("861d"),u=n("9112"),h=n("1a2d"),d=n("c6cd"),f=n("f772"),p=n("d012"),g="Object already initialized",m=a.TypeError,v=a.WeakMap,y=function(e){return s(e)?i(e):r(e,{})},b=function(e){return function(t){var n;if(!l(t)||(n=i(t)).type!==e)throw m("Incompatible receiver, "+e+" required");return n}};if(o||d.state){var w=d.state||(d.state=new v),_=c(w.get),E=c(w.has),O=c(w.set);r=function(e,t){if(E(w,e))throw new m(g);return t.facade=e,O(w,e,t),t},i=function(e){return _(w,e)||{}},s=function(e){return E(w,e)}}else{var T=f("state");p[T]=!0,r=function(e,t){if(h(e,T))throw new m(g);return t.facade=e,u(e,T,t),t},i=function(e){return h(e,T)?e[T]:{}},s=function(e){return h(e,T)}}e.exports={set:r,get:i,has:s,enforce:y,getterFor:b}},"6b0d":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=(e,t)=>{const n=e.__vccOpts||e;for(const[r,i]of t)n[r]=i;return n}},"6b8c":function(e,t,n){"use strict";n.d(t,"a",(function(){return C}));var r=n("dd76");function i(e){const t=e.$_ptooltipModifiers;t.focus?(e.addEventListener("focus",u),e.addEventListener("blur",h)):(e.addEventListener("mouseenter",c),e.addEventListener("mouseleave",l),e.addEventListener("click",d))}function s(e){const t=e.$_ptooltipModifiers;t.focus?(e.removeEventListener("focus",u),e.removeEventListener("blur",h)):(e.removeEventListener("mouseenter",c),e.removeEventListener("mouseleave",l),e.removeEventListener("click",d))}function o(e){e.$_ptooltipScrollHandler||(e.$_ptooltipScrollHandler=new r["a"](e,(function(){p(e)}))),e.$_ptooltipScrollHandler.bindScrollListener()}function a(e){e.$_ptooltipScrollHandler&&e.$_ptooltipScrollHandler.unbindScrollListener()}function c(e){f(e.currentTarget)}function l(e){p(e.currentTarget)}function u(e){f(e.currentTarget)}function h(e){p(e.currentTarget)}function d(e){p(e.currentTarget)}function f(e){if(e.$_ptooltipDisabled)return;let t=m(e);y(e),r["b"].fadeIn(t,250),window.addEventListener("resize",(function t(){r["b"].isTouchDevice()||p(e),this.removeEventListener("resize",t)})),o(e),r["f"].set("tooltip",t,e.$_ptooltipZIndex)}function p(e){v(e),a(e),r["f"].clear(e)}function g(e){return document.getElementById(e.$_ptooltipId)}function m(e){const t=Object(r["e"])()+"_tooltip";e.$_ptooltipId=t;let n=document.createElement("div");n.id=t;let i=document.createElement("div");i.className="p-tooltip-arrow",n.appendChild(i);let s=document.createElement("div");return s.className="p-tooltip-text",e.$_ptooltipEscape?s.innerHTML=e.$_ptooltipValue:(s.innerHTML="",s.appendChild(document.createTextNode(e.$_ptooltipValue))),n.appendChild(s),document.body.appendChild(n),n.style.display="inline-block",e.$_ptooltipFitContent&&(n.style.width="fit-content"),n}function v(e){if(e){let t=g(e);t&&t.parentElement&&document.body.removeChild(t),e.$_ptooltipId=null}}function y(e){const t=e.$_ptooltipModifiers;t.top?(E(e),I(e)&&(O(e),I(e)&&E(e))):t.left?(_(e),I(e)&&(w(e),I(e)&&(E(e),I(e)&&(O(e),I(e)&&_(e))))):t.bottom?(O(e),I(e)&&(E(e),I(e)&&O(e))):(w(e),I(e)&&(_(e),I(e)&&(E(e),I(e)&&(O(e),I(e)&&w(e)))))}function b(e){let t=e.getBoundingClientRect(),n=t.left+r["b"].getWindowScrollLeft(),i=t.top+r["b"].getWindowScrollTop();return{left:n,top:i}}function w(e){T(e,"right");let t=g(e),n=b(e),i=n.left+r["b"].getOuterWidth(e),s=n.top+(r["b"].getOuterHeight(e)-r["b"].getOuterHeight(t))/2;t.style.left=i+"px",t.style.top=s+"px"}function _(e){T(e,"left");let t=g(e),n=b(e),i=n.left-r["b"].getOuterWidth(t),s=n.top+(r["b"].getOuterHeight(e)-r["b"].getOuterHeight(t))/2;t.style.left=i+"px",t.style.top=s+"px"}function E(e){T(e,"top");let t=g(e),n=b(e),i=n.left+(r["b"].getOuterWidth(e)-r["b"].getOuterWidth(t))/2,s=n.top-r["b"].getOuterHeight(t);t.style.left=i+"px",t.style.top=s+"px"}function O(e){T(e,"bottom");let t=g(e),n=b(e),i=n.left+(r["b"].getOuterWidth(e)-r["b"].getOuterWidth(t))/2,s=n.top+r["b"].getOuterHeight(e);t.style.left=i+"px",t.style.top=s+"px"}function T(e,t){let n=g(e);n.style.left="-999px",n.style.top="-999px",n.className=`p-tooltip p-component p-tooltip-${t} ${e.$_ptooltipClass||""}`}function I(e){let t=g(e),n=t.getBoundingClientRect(),i=n.top,s=n.left,o=r["b"].getOuterWidth(t),a=r["b"].getOuterHeight(t),c=r["b"].getViewport();return s+o>c.width||s<0||i<0||i+a>c.height}function S(e){return r["b"].hasClass(e,"p-inputwrapper")?r["b"].findSingle(e,"input"):e}function k(e){return e.modifiers&&Object.keys(e.modifiers).length?e.modifiers:e.arg&&"object"===typeof e.arg?Object.entries(e.arg).reduce((e,[t,n])=>("event"!==t&&"position"!==t||(e[n]=!0),e),{}):{}}const C={beforeMount(e,t){let n=S(e);n.$_ptooltipModifiers=k(t),t.value&&("string"===typeof t.value?(n.$_ptooltipValue=t.value,n.$_ptooltipDisabled=!1,n.$_ptooltipEscape=!1,n.$_ptooltipClass=null,n.$_ptooltipFitContent=!0):(n.$_ptooltipValue=t.value.value,n.$_ptooltipDisabled=t.value.disabled||!1,n.$_ptooltipEscape=t.value.escape||!1,n.$_ptooltipClass=t.value.class,n.$_ptooltipFitContent=t.value.fitContent||!0),n.$_ptooltipZIndex=t.instance.$primevue&&t.instance.$primevue.config&&t.instance.$primevue.config.zIndex.tooltip,i(n))},unmounted(e){let t=S(e);v(t),s(t),t.$_ptooltipScrollHandler&&(t.$_ptooltipScrollHandler.destroy(),t.$_ptooltipScrollHandler=null),r["f"].clear(e)},updated(e,t){let n=S(e);n.$_ptooltipModifiers=k(t),t.value&&("string"===typeof t.value?(n.$_ptooltipValue=t.value,n.$_ptooltipDisabled=!1,n.$_ptooltipEscape=!1,n.$_ptooltipClass=null):(n.$_ptooltipValue=t.value.value,n.$_ptooltipDisabled=t.value.disabled||!1,n.$_ptooltipEscape=t.value.escape||!1,n.$_ptooltipClass=t.value.class))}}},"6c02":function(e,t,n){"use strict";n.d(t,"a",(function(){return Ze})),n.d(t,"b",(function(){return q})),n.d(t,"c",(function(){return nt}));var r=n("7a23");n("abc5");
/*!
  * vue-router v4.0.12
  * (c) 2021 Eduardo San Martin Morote
  * @license MIT
  */
const i="function"===typeof Symbol&&"symbol"===typeof Symbol.toStringTag,s=e=>i?Symbol(e):"_vr_"+e,o=s("rvlm"),a=s("rvd"),c=s("r"),l=s("rl"),u=s("rvl"),h="undefined"!==typeof window;function d(e){return e.__esModule||i&&"Module"===e[Symbol.toStringTag]}const f=Object.assign;function p(e,t){const n={};for(const r in t){const i=t[r];n[r]=Array.isArray(i)?i.map(e):e(i)}return n}const g=()=>{};const m=/\/$/,v=e=>e.replace(m,"");function y(e,t,n="/"){let r,i={},s="",o="";const a=t.indexOf("?"),c=t.indexOf("#",a>-1?a:0);return a>-1&&(r=t.slice(0,a),s=t.slice(a+1,c>-1?c:t.length),i=e(s)),c>-1&&(r=r||t.slice(0,c),o=t.slice(c,t.length)),r=S(null!=r?r:t,n),{fullPath:r+(s&&"?")+s+o,path:r,query:i,hash:o}}function b(e,t){const n=t.query?e(t.query):"";return t.path+(n&&"?")+n+(t.hash||"")}function w(e,t){return t&&e.toLowerCase().startsWith(t.toLowerCase())?e.slice(t.length)||"/":e}function _(e,t,n){const r=t.matched.length-1,i=n.matched.length-1;return r>-1&&r===i&&E(t.matched[r],n.matched[i])&&O(t.params,n.params)&&e(t.query)===e(n.query)&&t.hash===n.hash}function E(e,t){return(e.aliasOf||e)===(t.aliasOf||t)}function O(e,t){if(Object.keys(e).length!==Object.keys(t).length)return!1;for(const n in e)if(!T(e[n],t[n]))return!1;return!0}function T(e,t){return Array.isArray(e)?I(e,t):Array.isArray(t)?I(t,e):e===t}function I(e,t){return Array.isArray(t)?e.length===t.length&&e.every((e,n)=>e===t[n]):1===e.length&&e[0]===t}function S(e,t){if(e.startsWith("/"))return e;if(!e)return t;const n=t.split("/"),r=e.split("/");let i,s,o=n.length-1;for(i=0;i<r.length;i++)if(s=r[i],1!==o&&"."!==s){if(".."!==s)break;o--}return n.slice(0,o).join("/")+"/"+r.slice(i-(i===r.length?1:0)).join("/")}var k,C;(function(e){e["pop"]="pop",e["push"]="push"})(k||(k={})),function(e){e["back"]="back",e["forward"]="forward",e["unknown"]=""}(C||(C={}));function A(e){if(!e)if(h){const t=document.querySelector("base");e=t&&t.getAttribute("href")||"/",e=e.replace(/^\w+:\/\/[^\/]+/,"")}else e="/";return"/"!==e[0]&&"#"!==e[0]&&(e="/"+e),v(e)}const x=/^[^#]+#/;function R(e,t){return e.replace(x,"#")+t}function N(e,t){const n=document.documentElement.getBoundingClientRect(),r=e.getBoundingClientRect();return{behavior:t.behavior,left:r.left-n.left-(t.left||0),top:r.top-n.top-(t.top||0)}}const j=()=>({left:window.pageXOffset,top:window.pageYOffset});function L(e){let t;if("el"in e){const n=e.el,r="string"===typeof n&&n.startsWith("#");0;const i="string"===typeof n?r?document.getElementById(n.slice(1)):document.querySelector(n):n;if(!i)return;t=N(i,e)}else t=e;"scrollBehavior"in document.documentElement.style?window.scrollTo(t):window.scrollTo(null!=t.left?t.left:window.pageXOffset,null!=t.top?t.top:window.pageYOffset)}function D(e,t){const n=history.state?history.state.position-t:-1;return n+e}const P=new Map;function M(e,t){P.set(e,t)}function F(e){const t=P.get(e);return P.delete(e),t}let U=()=>location.protocol+"//"+location.host;function V(e,t){const{pathname:n,search:r,hash:i}=t,s=e.indexOf("#");if(s>-1){let t=i.includes(e.slice(s))?e.slice(s).length:1,n=i.slice(t);return"/"!==n[0]&&(n="/"+n),w(n,"")}const o=w(n,e);return o+r+i}function B(e,t,n,r){let i=[],s=[],o=null;const a=({state:s})=>{const a=V(e,location),c=n.value,l=t.value;let u=0;if(s){if(n.value=a,t.value=s,o&&o===c)return void(o=null);u=l?s.position-l.position:0}else r(a);i.forEach(e=>{e(n.value,c,{delta:u,type:k.pop,direction:u?u>0?C.forward:C.back:C.unknown})})};function c(){o=n.value}function l(e){i.push(e);const t=()=>{const t=i.indexOf(e);t>-1&&i.splice(t,1)};return s.push(t),t}function u(){const{history:e}=window;e.state&&e.replaceState(f({},e.state,{scroll:j()}),"")}function h(){for(const e of s)e();s=[],window.removeEventListener("popstate",a),window.removeEventListener("beforeunload",u)}return window.addEventListener("popstate",a),window.addEventListener("beforeunload",u),{pauseListeners:c,listen:l,destroy:h}}function z(e,t,n,r=!1,i=!1){return{back:e,current:t,forward:n,replaced:r,position:window.history.length,scroll:i?j():null}}function $(e){const{history:t,location:n}=window,r={value:V(e,n)},i={value:t.state};function s(r,s,o){const a=e.indexOf("#"),c=a>-1?(n.host&&document.querySelector("base")?e:e.slice(a))+r:U()+e+r;try{t[o?"replaceState":"pushState"](s,"",c),i.value=s}catch(l){console.error(l),n[o?"replace":"assign"](c)}}function o(e,n){const o=f({},t.state,z(i.value.back,e,i.value.forward,!0),n,{position:i.value.position});s(e,o,!0),r.value=e}function a(e,n){const o=f({},i.value,t.state,{forward:e,scroll:j()});s(o.current,o,!0);const a=f({},z(r.value,e,null),{position:o.position+1},n);s(e,a,!1),r.value=e}return i.value||s(r.value,{back:null,current:r.value,forward:null,position:t.length-1,replaced:!0,scroll:null},!0),{location:r,state:i,push:a,replace:o}}function q(e){e=A(e);const t=$(e),n=B(e,t.state,t.location,t.replace);function r(e,t=!0){t||n.pauseListeners(),history.go(e)}const i=f({location:"",base:e,go:r,createHref:R.bind(null,e)},t,n);return Object.defineProperty(i,"location",{enumerable:!0,get:()=>t.location.value}),Object.defineProperty(i,"state",{enumerable:!0,get:()=>t.state.value}),i}function H(e){return"string"===typeof e||e&&"object"===typeof e}function W(e){return"string"===typeof e||"symbol"===typeof e}const G={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0},K=s("nf");var Y;(function(e){e[e["aborted"]=4]="aborted",e[e["cancelled"]=8]="cancelled",e[e["duplicated"]=16]="duplicated"})(Y||(Y={}));function Q(e,t){return f(new Error,{type:e,[K]:!0},t)}function X(e,t){return e instanceof Error&&K in e&&(null==t||!!(e.type&t))}const J="[^/]+?",Z={sensitive:!1,strict:!1,start:!0,end:!0},ee=/[.+*?^${}()[\]/\\]/g;function te(e,t){const n=f({},Z,t),r=[];let i=n.start?"^":"";const s=[];for(const u of e){const e=u.length?[]:[90];n.strict&&!u.length&&(i+="/");for(let t=0;t<u.length;t++){const r=u[t];let o=40+(n.sensitive?.25:0);if(0===r.type)t||(i+="/"),i+=r.value.replace(ee,"\\$&"),o+=40;else if(1===r.type){const{value:e,repeatable:n,optional:a,regexp:c}=r;s.push({name:e,repeatable:n,optional:a});const h=c||J;if(h!==J){o+=10;try{new RegExp(`(${h})`)}catch(l){throw new Error(`Invalid custom RegExp for param "${e}" (${h}): `+l.message)}}let d=n?`((?:${h})(?:/(?:${h}))*)`:`(${h})`;t||(d=a&&u.length<2?`(?:/${d})`:"/"+d),a&&(d+="?"),i+=d,o+=20,a&&(o+=-8),n&&(o+=-20),".*"===h&&(o+=-50)}e.push(o)}r.push(e)}if(n.strict&&n.end){const e=r.length-1;r[e][r[e].length-1]+=.7000000000000001}n.strict||(i+="/?"),n.end?i+="$":n.strict&&(i+="(?:/|$)");const o=new RegExp(i,n.sensitive?"":"i");function a(e){const t=e.match(o),n={};if(!t)return null;for(let r=1;r<t.length;r++){const e=t[r]||"",i=s[r-1];n[i.name]=e&&i.repeatable?e.split("/"):e}return n}function c(t){let n="",r=!1;for(const i of e){r&&n.endsWith("/")||(n+="/"),r=!1;for(const e of i)if(0===e.type)n+=e.value;else if(1===e.type){const{value:s,repeatable:o,optional:a}=e,c=s in t?t[s]:"";if(Array.isArray(c)&&!o)throw new Error(`Provided param "${s}" is an array but it is not repeatable (* or + modifiers)`);const l=Array.isArray(c)?c.join("/"):c;if(!l){if(!a)throw new Error(`Missing required param "${s}"`);i.length<2&&(n.endsWith("/")?n=n.slice(0,-1):r=!0)}n+=l}}return n}return{re:o,score:r,keys:s,parse:a,stringify:c}}function ne(e,t){let n=0;while(n<e.length&&n<t.length){const r=t[n]-e[n];if(r)return r;n++}return e.length<t.length?1===e.length&&80===e[0]?-1:1:e.length>t.length?1===t.length&&80===t[0]?1:-1:0}function re(e,t){let n=0;const r=e.score,i=t.score;while(n<r.length&&n<i.length){const e=ne(r[n],i[n]);if(e)return e;n++}return i.length-r.length}const ie={type:0,value:""},se=/[a-zA-Z0-9_]/;function oe(e){if(!e)return[[]];if("/"===e)return[[ie]];if(!e.startsWith("/"))throw new Error(`Invalid path "${e}"`);function t(e){throw new Error(`ERR (${n})/"${l}": ${e}`)}let n=0,r=n;const i=[];let s;function o(){s&&i.push(s),s=[]}let a,c=0,l="",u="";function h(){l&&(0===n?s.push({type:0,value:l}):1===n||2===n||3===n?(s.length>1&&("*"===a||"+"===a)&&t(`A repeatable param (${l}) must be alone in its segment. eg: '/:ids+.`),s.push({type:1,value:l,regexp:u,repeatable:"*"===a||"+"===a,optional:"*"===a||"?"===a})):t("Invalid state to consume buffer"),l="")}function d(){l+=a}while(c<e.length)if(a=e[c++],"\\"!==a||2===n)switch(n){case 0:"/"===a?(l&&h(),o()):":"===a?(h(),n=1):d();break;case 4:d(),n=r;break;case 1:"("===a?n=2:se.test(a)?d():(h(),n=0,"*"!==a&&"?"!==a&&"+"!==a&&c--);break;case 2:")"===a?"\\"==u[u.length-1]?u=u.slice(0,-1)+a:n=3:u+=a;break;case 3:h(),n=0,"*"!==a&&"?"!==a&&"+"!==a&&c--,u="";break;default:t("Unknown state");break}else r=n,n=4;return 2===n&&t(`Unfinished custom RegExp for param "${l}"`),h(),o(),i}function ae(e,t,n){const r=te(oe(e.path),n);const i=f(r,{record:e,parent:t,children:[],alias:[]});return t&&!i.record.aliasOf===!t.record.aliasOf&&t.children.push(i),i}function ce(e,t){const n=[],r=new Map;function i(e){return r.get(e)}function s(e,n,r){const i=!r,a=ue(e);a.aliasOf=r&&r.record;const l=pe(t,e),u=[a];if("alias"in e){const t="string"===typeof e.alias?[e.alias]:e.alias;for(const e of t)u.push(f({},a,{components:r?r.record.components:a.components,path:e,aliasOf:r?r.record:a}))}let h,d;for(const t of u){const{path:u}=t;if(n&&"/"!==u[0]){const e=n.record.path,r="/"===e[e.length-1]?"":"/";t.path=n.record.path+(u&&r+u)}if(h=ae(t,n,l),r?r.alias.push(h):(d=d||h,d!==h&&d.alias.push(h),i&&e.name&&!de(h)&&o(e.name)),"children"in a){const e=a.children;for(let t=0;t<e.length;t++)s(e[t],h,r&&r.children[t])}r=r||h,c(h)}return d?()=>{o(d)}:g}function o(e){if(W(e)){const t=r.get(e);t&&(r.delete(e),n.splice(n.indexOf(t),1),t.children.forEach(o),t.alias.forEach(o))}else{const t=n.indexOf(e);t>-1&&(n.splice(t,1),e.record.name&&r.delete(e.record.name),e.children.forEach(o),e.alias.forEach(o))}}function a(){return n}function c(e){let t=0;while(t<n.length&&re(e,n[t])>=0)t++;n.splice(t,0,e),e.record.name&&!de(e)&&r.set(e.record.name,e)}function l(e,t){let i,s,o,a={};if("name"in e&&e.name){if(i=r.get(e.name),!i)throw Q(1,{location:e});o=i.record.name,a=f(le(t.params,i.keys.filter(e=>!e.optional).map(e=>e.name)),e.params),s=i.stringify(a)}else if("path"in e)s=e.path,i=n.find(e=>e.re.test(s)),i&&(a=i.parse(s),o=i.record.name);else{if(i=t.name?r.get(t.name):n.find(e=>e.re.test(t.path)),!i)throw Q(1,{location:e,currentLocation:t});o=i.record.name,a=f({},t.params,e.params),s=i.stringify(a)}const c=[];let l=i;while(l)c.unshift(l.record),l=l.parent;return{name:o,path:s,params:a,matched:c,meta:fe(c)}}return t=pe({strict:!1,end:!0,sensitive:!1},t),e.forEach(e=>s(e)),{addRoute:s,resolve:l,removeRoute:o,getRoutes:a,getRecordMatcher:i}}function le(e,t){const n={};for(const r of t)r in e&&(n[r]=e[r]);return n}function ue(e){return{path:e.path,redirect:e.redirect,name:e.name,meta:e.meta||{},aliasOf:void 0,beforeEnter:e.beforeEnter,props:he(e),children:e.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in e?e.components||{}:{default:e.component}}}function he(e){const t={},n=e.props||!1;if("component"in e)t.default=n;else for(const r in e.components)t[r]="boolean"===typeof n?n:n[r];return t}function de(e){while(e){if(e.record.aliasOf)return!0;e=e.parent}return!1}function fe(e){return e.reduce((e,t)=>f(e,t.meta),{})}function pe(e,t){const n={};for(const r in e)n[r]=r in t?t[r]:e[r];return n}const ge=/#/g,me=/&/g,ve=/\//g,ye=/=/g,be=/\?/g,we=/\+/g,_e=/%5B/g,Ee=/%5D/g,Oe=/%5E/g,Te=/%60/g,Ie=/%7B/g,Se=/%7C/g,ke=/%7D/g,Ce=/%20/g;function Ae(e){return encodeURI(""+e).replace(Se,"|").replace(_e,"[").replace(Ee,"]")}function xe(e){return Ae(e).replace(Ie,"{").replace(ke,"}").replace(Oe,"^")}function Re(e){return Ae(e).replace(we,"%2B").replace(Ce,"+").replace(ge,"%23").replace(me,"%26").replace(Te,"`").replace(Ie,"{").replace(ke,"}").replace(Oe,"^")}function Ne(e){return Re(e).replace(ye,"%3D")}function je(e){return Ae(e).replace(ge,"%23").replace(be,"%3F")}function Le(e){return null==e?"":je(e).replace(ve,"%2F")}function De(e){try{return decodeURIComponent(""+e)}catch(t){}return""+e}function Pe(e){const t={};if(""===e||"?"===e)return t;const n="?"===e[0],r=(n?e.slice(1):e).split("&");for(let i=0;i<r.length;++i){const e=r[i].replace(we," "),n=e.indexOf("="),s=De(n<0?e:e.slice(0,n)),o=n<0?null:De(e.slice(n+1));if(s in t){let e=t[s];Array.isArray(e)||(e=t[s]=[e]),e.push(o)}else t[s]=o}return t}function Me(e){let t="";for(let n in e){const r=e[n];if(n=Ne(n),null==r){void 0!==r&&(t+=(t.length?"&":"")+n);continue}const i=Array.isArray(r)?r.map(e=>e&&Re(e)):[r&&Re(r)];i.forEach(e=>{void 0!==e&&(t+=(t.length?"&":"")+n,null!=e&&(t+="="+e))})}return t}function Fe(e){const t={};for(const n in e){const r=e[n];void 0!==r&&(t[n]=Array.isArray(r)?r.map(e=>null==e?null:""+e):null==r?r:""+r)}return t}function Ue(){let e=[];function t(t){return e.push(t),()=>{const n=e.indexOf(t);n>-1&&e.splice(n,1)}}function n(){e=[]}return{add:t,list:()=>e,reset:n}}function Ve(e,t,n,r,i){const s=r&&(r.enterCallbacks[i]=r.enterCallbacks[i]||[]);return()=>new Promise((o,a)=>{const c=e=>{!1===e?a(Q(4,{from:n,to:t})):e instanceof Error?a(e):H(e)?a(Q(2,{from:t,to:e})):(s&&r.enterCallbacks[i]===s&&"function"===typeof e&&s.push(e),o())},l=e.call(r&&r.instances[i],t,n,c);let u=Promise.resolve(l);e.length<3&&(u=u.then(c)),u.catch(e=>a(e))})}function Be(e,t,n,r){const i=[];for(const s of e)for(const e in s.components){let o=s.components[e];if("beforeRouteEnter"===t||s.instances[e])if(ze(o)){const a=o.__vccOpts||o,c=a[t];c&&i.push(Ve(c,n,r,s,e))}else{let a=o();0,i.push(()=>a.then(i=>{if(!i)return Promise.reject(new Error(`Couldn't resolve component "${e}" at "${s.path}"`));const o=d(i)?i.default:i;s.components[e]=o;const a=o.__vccOpts||o,c=a[t];return c&&Ve(c,n,r,s,e)()}))}}return i}function ze(e){return"object"===typeof e||"displayName"in e||"props"in e||"__vccOpts"in e}function $e(e){const t=Object(r["q"])(c),n=Object(r["q"])(l),i=Object(r["d"])(()=>t.resolve(Object(r["N"])(e.to))),s=Object(r["d"])(()=>{const{matched:e}=i.value,{length:t}=e,r=e[t-1],s=n.matched;if(!r||!s.length)return-1;const o=s.findIndex(E.bind(null,r));if(o>-1)return o;const a=Ke(e[t-2]);return t>1&&Ke(r)===a&&s[s.length-1].path!==a?s.findIndex(E.bind(null,e[t-2])):o}),o=Object(r["d"])(()=>s.value>-1&&Ge(n.params,i.value.params)),a=Object(r["d"])(()=>s.value>-1&&s.value===n.matched.length-1&&O(n.params,i.value.params));function u(n={}){return We(n)?t[Object(r["N"])(e.replace)?"replace":"push"](Object(r["N"])(e.to)).catch(g):Promise.resolve()}return{route:i,href:Object(r["d"])(()=>i.value.href),isActive:o,isExactActive:a,navigate:u}}const qe=Object(r["n"])({name:"RouterLink",props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"}},useLink:$e,setup(e,{slots:t}){const n=Object(r["F"])($e(e)),{options:i}=Object(r["q"])(c),s=Object(r["d"])(()=>({[Ye(e.activeClass,i.linkActiveClass,"router-link-active")]:n.isActive,[Ye(e.exactActiveClass,i.linkExactActiveClass,"router-link-exact-active")]:n.isExactActive}));return()=>{const i=t.default&&t.default(n);return e.custom?i:Object(r["p"])("a",{"aria-current":n.isExactActive?e.ariaCurrentValue:null,href:n.href,onClick:n.navigate,class:s.value},i)}}}),He=qe;function We(e){if(!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)&&!e.defaultPrevented&&(void 0===e.button||0===e.button)){if(e.currentTarget&&e.currentTarget.getAttribute){const t=e.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(t))return}return e.preventDefault&&e.preventDefault(),!0}}function Ge(e,t){for(const n in t){const r=t[n],i=e[n];if("string"===typeof r){if(r!==i)return!1}else if(!Array.isArray(i)||i.length!==r.length||r.some((e,t)=>e!==i[t]))return!1}return!0}function Ke(e){return e?e.aliasOf?e.aliasOf.path:e.path:""}const Ye=(e,t,n)=>null!=e?e:null!=t?t:n,Qe=Object(r["n"])({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},setup(e,{attrs:t,slots:n}){const i=Object(r["q"])(u),s=Object(r["d"])(()=>e.route||i.value),c=Object(r["q"])(a,0),l=Object(r["d"])(()=>s.value.matched[c]);Object(r["D"])(a,c+1),Object(r["D"])(o,l),Object(r["D"])(u,s);const h=Object(r["G"])();return Object(r["Q"])(()=>[h.value,l.value,e.name],([e,t,n],[r,i,s])=>{t&&(t.instances[n]=e,i&&i!==t&&e&&e===r&&(t.leaveGuards.size||(t.leaveGuards=i.leaveGuards),t.updateGuards.size||(t.updateGuards=i.updateGuards))),!e||!t||i&&E(t,i)&&r||(t.enterCallbacks[n]||[]).forEach(t=>t(e))},{flush:"post"}),()=>{const i=s.value,o=l.value,a=o&&o.components[e.name],c=e.name;if(!a)return Xe(n.default,{Component:a,route:i});const u=o.props[e.name],d=u?!0===u?i.params:"function"===typeof u?u(i):u:null,p=e=>{e.component.isUnmounted&&(o.instances[c]=null)},g=Object(r["p"])(a,f({},d,t,{onVnodeUnmounted:p,ref:h}));return Xe(n.default,{Component:g,route:i})||g}}});function Xe(e,t){if(!e)return null;const n=e(t);return 1===n.length?n[0]:n}const Je=Qe;function Ze(e){const t=ce(e.routes,e),n=e.parseQuery||Pe,i=e.stringifyQuery||Me,s=e.history;const o=Ue(),a=Ue(),d=Ue(),m=Object(r["L"])(G);let v=G;h&&e.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const w=p.bind(null,e=>""+e),E=p.bind(null,Le),O=p.bind(null,De);function T(e,n){let r,i;return W(e)?(r=t.getRecordMatcher(e),i=n):i=e,t.addRoute(i,r)}function I(e){const n=t.getRecordMatcher(e);n&&t.removeRoute(n)}function S(){return t.getRoutes().map(e=>e.record)}function C(e){return!!t.getRecordMatcher(e)}function A(e,r){if(r=f({},r||m.value),"string"===typeof e){const i=y(n,e,r.path),o=t.resolve({path:i.path},r),a=s.createHref(i.fullPath);return f(i,o,{params:O(o.params),hash:De(i.hash),redirectedFrom:void 0,href:a})}let o;if("path"in e)o=f({},e,{path:y(n,e.path,r.path).path});else{const t=f({},e.params);for(const e in t)null==t[e]&&delete t[e];o=f({},e,{params:E(e.params)}),r.params=E(r.params)}const a=t.resolve(o,r),c=e.hash||"";a.params=w(O(a.params));const l=b(i,f({},e,{hash:xe(c),path:a.path})),u=s.createHref(l);return f({fullPath:l,hash:c,query:i===Me?Fe(e.query):e.query||{}},a,{redirectedFrom:void 0,href:u})}function x(e){return"string"===typeof e?y(n,e,m.value.path):f({},e)}function R(e,t){if(v!==e)return Q(8,{from:t,to:e})}function N(e){return V(e)}function P(e){return N(f(x(e),{replace:!0}))}function U(e){const t=e.matched[e.matched.length-1];if(t&&t.redirect){const{redirect:n}=t;let r="function"===typeof n?n(e):n;return"string"===typeof r&&(r=r.includes("?")||r.includes("#")?r=x(r):{path:r},r.params={}),f({query:e.query,hash:e.hash,params:e.params},r)}}function V(e,t){const n=v=A(e),r=m.value,s=e.state,o=e.force,a=!0===e.replace,c=U(n);if(c)return V(f(x(c),{state:s,force:o,replace:a}),t||n);const l=n;let u;return l.redirectedFrom=t,!o&&_(i,r,n)&&(u=Q(16,{to:l,from:r}),re(r,r,!0,!1)),(u?Promise.resolve(u):z(l,r)).catch(e=>X(e)?e:ee(e,l,r)).then(e=>{if(e){if(X(e,2))return V(f(x(e.to),{state:s,force:o,replace:a}),t||l)}else e=q(l,r,!0,a,s);return $(l,r,e),e})}function B(e,t){const n=R(e,t);return n?Promise.reject(n):Promise.resolve()}function z(e,t){let n;const[r,i,s]=tt(e,t);n=Be(r.reverse(),"beforeRouteLeave",e,t);for(const o of r)o.leaveGuards.forEach(r=>{n.push(Ve(r,e,t))});const c=B.bind(null,e,t);return n.push(c),et(n).then(()=>{n=[];for(const r of o.list())n.push(Ve(r,e,t));return n.push(c),et(n)}).then(()=>{n=Be(i,"beforeRouteUpdate",e,t);for(const r of i)r.updateGuards.forEach(r=>{n.push(Ve(r,e,t))});return n.push(c),et(n)}).then(()=>{n=[];for(const r of e.matched)if(r.beforeEnter&&!t.matched.includes(r))if(Array.isArray(r.beforeEnter))for(const i of r.beforeEnter)n.push(Ve(i,e,t));else n.push(Ve(r.beforeEnter,e,t));return n.push(c),et(n)}).then(()=>(e.matched.forEach(e=>e.enterCallbacks={}),n=Be(s,"beforeRouteEnter",e,t),n.push(c),et(n))).then(()=>{n=[];for(const r of a.list())n.push(Ve(r,e,t));return n.push(c),et(n)}).catch(e=>X(e,8)?e:Promise.reject(e))}function $(e,t,n){for(const r of d.list())r(e,t,n)}function q(e,t,n,r,i){const o=R(e,t);if(o)return o;const a=t===G,c=h?history.state:{};n&&(r||a?s.replace(e.fullPath,f({scroll:a&&c&&c.scroll},i)):s.push(e.fullPath,i)),m.value=e,re(e,t,n,a),ne()}let H;function K(){H=s.listen((e,t,n)=>{const r=A(e),i=U(r);if(i)return void V(f(i,{replace:!0}),r).catch(g);v=r;const o=m.value;h&&M(D(o.fullPath,n.delta),j()),z(r,o).catch(e=>X(e,12)?e:X(e,2)?(V(e.to,r).then(e=>{X(e,20)&&!n.delta&&n.type===k.pop&&s.go(-1,!1)}).catch(g),Promise.reject()):(n.delta&&s.go(-n.delta,!1),ee(e,r,o))).then(e=>{e=e||q(r,o,!1),e&&(n.delta?s.go(-n.delta,!1):n.type===k.pop&&X(e,20)&&s.go(-1,!1)),$(r,o,e)}).catch(g)})}let Y,J=Ue(),Z=Ue();function ee(e,t,n){ne(e);const r=Z.list();return r.length?r.forEach(r=>r(e,t,n)):console.error(e),Promise.reject(e)}function te(){return Y&&m.value!==G?Promise.resolve():new Promise((e,t)=>{J.add([e,t])})}function ne(e){Y||(Y=!0,K(),J.list().forEach(([t,n])=>e?n(e):t()),J.reset())}function re(t,n,i,s){const{scrollBehavior:o}=e;if(!h||!o)return Promise.resolve();const a=!i&&F(D(t.fullPath,0))||(s||!i)&&history.state&&history.state.scroll||null;return Object(r["t"])().then(()=>o(t,n,a)).then(e=>e&&L(e)).catch(e=>ee(e,t,n))}const ie=e=>s.go(e);let se;const oe=new Set,ae={currentRoute:m,addRoute:T,removeRoute:I,hasRoute:C,getRoutes:S,resolve:A,options:e,push:N,replace:P,go:ie,back:()=>ie(-1),forward:()=>ie(1),beforeEach:o.add,beforeResolve:a.add,afterEach:d.add,onError:Z.add,isReady:te,install(e){const t=this;e.component("RouterLink",He),e.component("RouterView",Je),e.config.globalProperties.$router=t,Object.defineProperty(e.config.globalProperties,"$route",{enumerable:!0,get:()=>Object(r["N"])(m)}),h&&!se&&m.value===G&&(se=!0,N(s.location).catch(e=>{0}));const n={};for(const s in G)n[s]=Object(r["d"])(()=>m.value[s]);e.provide(c,t),e.provide(l,Object(r["F"])(n)),e.provide(u,m);const i=e.unmount;oe.add(e),e.unmount=function(){oe.delete(e),oe.size<1&&(v=G,H&&H(),m.value=G,se=!1,Y=!1),i()}}};return ae}function et(e){return e.reduce((e,t)=>e.then(()=>t()),Promise.resolve())}function tt(e,t){const n=[],r=[],i=[],s=Math.max(t.matched.length,e.matched.length);for(let o=0;o<s;o++){const s=t.matched[o];s&&(e.matched.find(e=>E(e,s))?r.push(s):n.push(s));const a=e.matched[o];a&&(t.matched.find(e=>E(e,a))||i.push(a))}return[n,r,i]}function nt(){return Object(r["q"])(c)}},"6eeb":function(e,t,n){var r=n("da84"),i=n("1626"),s=n("1a2d"),o=n("9112"),a=n("ce4e"),c=n("8925"),l=n("69f3"),u=n("5e77").CONFIGURABLE,h=l.get,d=l.enforce,f=String(String).split("String");(e.exports=function(e,t,n,c){var l,h=!!c&&!!c.unsafe,p=!!c&&!!c.enumerable,g=!!c&&!!c.noTargetGet,m=c&&void 0!==c.name?c.name:t;i(n)&&("Symbol("===String(m).slice(0,7)&&(m="["+String(m).replace(/^Symbol\(([^)]*)\)/,"$1")+"]"),(!s(n,"name")||u&&n.name!==m)&&o(n,"name",m),l=d(n),l.source||(l.source=f.join("string"==typeof m?m:""))),e!==r?(h?!g&&e[t]&&(p=!0):delete e[t],p?e[t]=n:o(e,t,n)):p?e[t]=n:a(t,n)})(Function.prototype,"toString",(function(){return i(this)&&h(this).source||c(this)}))},7418:function(e,t){t.f=Object.getOwnPropertySymbols},7839:function(e,t){e.exports=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"]},"785a":function(e,t,n){var r=n("cc12"),i=r("span").classList,s=i&&i.constructor&&i.constructor.prototype;e.exports=s===Object.prototype?void 0:s},7917:function(e,t,n){"use strict";var r=n("c532");function i(e,t,n,r,i){Error.call(this),this.message=e,this.name="AxiosError",t&&(this.code=t),n&&(this.config=n),r&&(this.request=r),i&&(this.response=i)}r.inherits(i,Error,{toJSON:function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code,status:this.response&&this.response.status?this.response.status:null}}});var s=i.prototype,o={};["ERR_BAD_OPTION_VALUE","ERR_BAD_OPTION","ECONNABORTED","ETIMEDOUT","ERR_NETWORK","ERR_FR_TOO_MANY_REDIRECTS","ERR_DEPRECATED","ERR_BAD_RESPONSE","ERR_BAD_REQUEST","ERR_CANCELED"].forEach((function(e){o[e]={value:e}})),Object.defineProperties(i,o),Object.defineProperty(s,"isAxiosError",{value:!0}),i.from=function(e,t,n,o,a,c){var l=Object.create(s);return r.toFlatObject(e,l,(function(e){return e!==Error.prototype})),i.call(l,e.message,t,n,o,a),l.name=e.name,c&&Object.assign(l,c),l},e.exports=i},"7a23":function(e,t,n){"use strict";n.d(t,"r",(function(){return je})),n.d(t,"F",(function(){return be})),n.d(t,"G",(function(){return Le})),n.d(t,"L",(function(){return De})),n.d(t,"N",(function(){return Fe})),n.d(t,"u",(function(){return r["J"]})),n.d(t,"v",(function(){return r["K"]})),n.d(t,"M",(function(){return r["M"]})),n.d(t,"a",(function(){return Sr})),n.d(t,"b",(function(){return yr})),n.d(t,"d",(function(){return xi})),n.d(t,"f",(function(){return Fr})),n.d(t,"g",(function(){return Xr})),n.d(t,"h",(function(){return Mr})),n.d(t,"i",(function(){return qr})),n.d(t,"j",(function(){return ii})),n.d(t,"k",(function(){return Qr})),n.d(t,"l",(function(){return Yr})),n.d(t,"m",(function(){return Hr})),n.d(t,"n",(function(){return Zt})),n.d(t,"o",(function(){return pi})),n.d(t,"p",(function(){return Ri})),n.d(t,"q",(function(){return Pt})),n.d(t,"s",(function(){return ti})),n.d(t,"t",(function(){return ot})),n.d(t,"w",(function(){return rn})),n.d(t,"x",(function(){return sn})),n.d(t,"y",(function(){return fn})),n.d(t,"z",(function(){return vn})),n.d(t,"A",(function(){return gn})),n.d(t,"B",(function(){return Nr})),n.d(t,"C",(function(){return It})),n.d(t,"D",(function(){return Dt})),n.d(t,"E",(function(){return Tt})),n.d(t,"H",(function(){return ri})),n.d(t,"I",(function(){return si})),n.d(t,"J",(function(){return _r})),n.d(t,"K",(function(){return Or})),n.d(t,"Q",(function(){return Ft})),n.d(t,"R",(function(){return St})),n.d(t,"S",(function(){return Jn})),n.d(t,"c",(function(){return hs})),n.d(t,"e",(function(){return Vs})),n.d(t,"O",(function(){return Rs})),n.d(t,"P",(function(){return Ds})),n.d(t,"T",(function(){return Ls}));var r=n("9ff4");let i;class s{constructor(e=!1){this.active=!0,this.effects=[],this.cleanups=[],!e&&i&&(this.parent=i,this.index=(i.scopes||(i.scopes=[])).push(this)-1)}run(e){if(this.active)try{return i=this,e()}finally{i=this.parent}else 0}on(){i=this}off(){i=this.parent}stop(e){if(this.active){let t,n;for(t=0,n=this.effects.length;t<n;t++)this.effects[t].stop();for(t=0,n=this.cleanups.length;t<n;t++)this.cleanups[t]();if(this.scopes)for(t=0,n=this.scopes.length;t<n;t++)this.scopes[t].stop(!0);if(this.parent&&!e){const e=this.parent.scopes.pop();e&&e!==this&&(this.parent.scopes[this.index]=e,e.index=this.index)}this.active=!1}}}function o(e,t=i){t&&t.active&&t.effects.push(e)}const a=e=>{const t=new Set(e);return t.w=0,t.n=0,t},c=e=>(e.w&p)>0,l=e=>(e.n&p)>0,u=({deps:e})=>{if(e.length)for(let t=0;t<e.length;t++)e[t].w|=p},h=e=>{const{deps:t}=e;if(t.length){let n=0;for(let r=0;r<t.length;r++){const i=t[r];c(i)&&!l(i)?i.delete(e):t[n++]=i,i.w&=~p,i.n&=~p}t.length=n}},d=new WeakMap;let f=0,p=1;const g=30;let m;const v=Symbol(""),y=Symbol("");class b{constructor(e,t=null,n){this.fn=e,this.scheduler=t,this.active=!0,this.deps=[],this.parent=void 0,o(this,n)}run(){if(!this.active)return this.fn();let e=m,t=_;while(e){if(e===this)return;e=e.parent}try{return this.parent=m,m=this,_=!0,p=1<<++f,f<=g?u(this):w(this),this.fn()}finally{f<=g&&h(this),p=1<<--f,m=this.parent,_=t,this.parent=void 0}}stop(){this.active&&(w(this),this.onStop&&this.onStop(),this.active=!1)}}function w(e){const{deps:t}=e;if(t.length){for(let n=0;n<t.length;n++)t[n].delete(e);t.length=0}}let _=!0;const E=[];function O(){E.push(_),_=!1}function T(){const e=E.pop();_=void 0===e||e}function I(e,t,n){if(_&&m){let t=d.get(e);t||d.set(e,t=new Map);let r=t.get(n);r||t.set(n,r=a());const i=void 0;S(r,i)}}function S(e,t){let n=!1;f<=g?l(e)||(e.n|=p,n=!c(e)):n=!e.has(m),n&&(e.add(m),m.deps.push(e))}function k(e,t,n,i,s,o){const c=d.get(e);if(!c)return;let l=[];if("clear"===t)l=[...c.values()];else if("length"===n&&Object(r["o"])(e))c.forEach((e,t)=>{("length"===t||t>=i)&&l.push(e)});else switch(void 0!==n&&l.push(c.get(n)),t){case"add":Object(r["o"])(e)?Object(r["t"])(n)&&l.push(c.get("length")):(l.push(c.get(v)),Object(r["u"])(e)&&l.push(c.get(y)));break;case"delete":Object(r["o"])(e)||(l.push(c.get(v)),Object(r["u"])(e)&&l.push(c.get(y)));break;case"set":Object(r["u"])(e)&&l.push(c.get(v));break}if(1===l.length)l[0]&&C(l[0]);else{const e=[];for(const t of l)t&&e.push(...t);C(a(e))}}function C(e,t){for(const n of Object(r["o"])(e)?e:[...e])(n!==m||n.allowRecurse)&&(n.scheduler?n.scheduler():n.run())}const A=Object(r["I"])("__proto__,__v_isRef,__isVue"),x=new Set(Object.getOwnPropertyNames(Symbol).map(e=>Symbol[e]).filter(r["F"])),R=P(),N=P(!1,!0),j=P(!0),L=D();function D(){const e={};return["includes","indexOf","lastIndexOf"].forEach(t=>{e[t]=function(...e){const n=ke(this);for(let t=0,i=this.length;t<i;t++)I(n,"get",t+"");const r=n[t](...e);return-1===r||!1===r?n[t](...e.map(ke)):r}}),["push","pop","shift","unshift","splice"].forEach(t=>{e[t]=function(...e){O();const n=ke(this)[t].apply(this,e);return T(),n}}),e}function P(e=!1,t=!1){return function(n,i,s){if("__v_isReactive"===i)return!e;if("__v_isReadonly"===i)return e;if("__v_isShallow"===i)return t;if("__v_raw"===i&&s===(e?t?me:ge:t?pe:fe).get(n))return n;const o=Object(r["o"])(n);if(!e&&o&&Object(r["k"])(L,i))return Reflect.get(L,i,s);const a=Reflect.get(n,i,s);if(Object(r["F"])(i)?x.has(i):A(i))return a;if(e||I(n,"get",i),t)return a;if(je(a)){const e=!o||!Object(r["t"])(i);return e?a.value:a}return Object(r["w"])(a)?e?_e(a):be(a):a}}const M=U(),F=U(!0);function U(e=!1){return function(t,n,i,s){let o=t[n];if(Te(o)&&je(o)&&!je(i))return!1;if(!e&&!Te(i)&&(Ie(i)||(i=ke(i),o=ke(o)),!Object(r["o"])(t)&&je(o)&&!je(i)))return o.value=i,!0;const a=Object(r["o"])(t)&&Object(r["t"])(n)?Number(n)<t.length:Object(r["k"])(t,n),c=Reflect.set(t,n,i,s);return t===ke(s)&&(a?Object(r["j"])(i,o)&&k(t,"set",n,i,o):k(t,"add",n,i)),c}}function V(e,t){const n=Object(r["k"])(e,t),i=e[t],s=Reflect.deleteProperty(e,t);return s&&n&&k(e,"delete",t,void 0,i),s}function B(e,t){const n=Reflect.has(e,t);return Object(r["F"])(t)&&x.has(t)||I(e,"has",t),n}function z(e){return I(e,"iterate",Object(r["o"])(e)?"length":v),Reflect.ownKeys(e)}const $={get:R,set:M,deleteProperty:V,has:B,ownKeys:z},q={get:j,set(e,t){return!0},deleteProperty(e,t){return!0}},H=Object(r["h"])({},$,{get:N,set:F}),W=e=>e,G=e=>Reflect.getPrototypeOf(e);function K(e,t,n=!1,r=!1){e=e["__v_raw"];const i=ke(e),s=ke(t);t!==s&&!n&&I(i,"get",t),!n&&I(i,"get",s);const{has:o}=G(i),a=r?W:n?xe:Ae;return o.call(i,t)?a(e.get(t)):o.call(i,s)?a(e.get(s)):void(e!==i&&e.get(t))}function Y(e,t=!1){const n=this["__v_raw"],r=ke(n),i=ke(e);return e!==i&&!t&&I(r,"has",e),!t&&I(r,"has",i),e===i?n.has(e):n.has(e)||n.has(i)}function Q(e,t=!1){return e=e["__v_raw"],!t&&I(ke(e),"iterate",v),Reflect.get(e,"size",e)}function X(e){e=ke(e);const t=ke(this),n=G(t),r=n.has.call(t,e);return r||(t.add(e),k(t,"add",e,e)),this}function J(e,t){t=ke(t);const n=ke(this),{has:i,get:s}=G(n);let o=i.call(n,e);o||(e=ke(e),o=i.call(n,e));const a=s.call(n,e);return n.set(e,t),o?Object(r["j"])(t,a)&&k(n,"set",e,t,a):k(n,"add",e,t),this}function Z(e){const t=ke(this),{has:n,get:r}=G(t);let i=n.call(t,e);i||(e=ke(e),i=n.call(t,e));const s=r?r.call(t,e):void 0,o=t.delete(e);return i&&k(t,"delete",e,void 0,s),o}function ee(){const e=ke(this),t=0!==e.size,n=void 0,r=e.clear();return t&&k(e,"clear",void 0,void 0,n),r}function te(e,t){return function(n,r){const i=this,s=i["__v_raw"],o=ke(s),a=t?W:e?xe:Ae;return!e&&I(o,"iterate",v),s.forEach((e,t)=>n.call(r,a(e),a(t),i))}}function ne(e,t,n){return function(...i){const s=this["__v_raw"],o=ke(s),a=Object(r["u"])(o),c="entries"===e||e===Symbol.iterator&&a,l="keys"===e&&a,u=s[e](...i),h=n?W:t?xe:Ae;return!t&&I(o,"iterate",l?y:v),{next(){const{value:e,done:t}=u.next();return t?{value:e,done:t}:{value:c?[h(e[0]),h(e[1])]:h(e),done:t}},[Symbol.iterator](){return this}}}}function re(e){return function(...t){return"delete"!==e&&this}}function ie(){const e={get(e){return K(this,e)},get size(){return Q(this)},has:Y,add:X,set:J,delete:Z,clear:ee,forEach:te(!1,!1)},t={get(e){return K(this,e,!1,!0)},get size(){return Q(this)},has:Y,add:X,set:J,delete:Z,clear:ee,forEach:te(!1,!0)},n={get(e){return K(this,e,!0)},get size(){return Q(this,!0)},has(e){return Y.call(this,e,!0)},add:re("add"),set:re("set"),delete:re("delete"),clear:re("clear"),forEach:te(!0,!1)},r={get(e){return K(this,e,!0,!0)},get size(){return Q(this,!0)},has(e){return Y.call(this,e,!0)},add:re("add"),set:re("set"),delete:re("delete"),clear:re("clear"),forEach:te(!0,!0)},i=["keys","values","entries",Symbol.iterator];return i.forEach(i=>{e[i]=ne(i,!1,!1),n[i]=ne(i,!0,!1),t[i]=ne(i,!1,!0),r[i]=ne(i,!0,!0)}),[e,n,t,r]}const[se,oe,ae,ce]=ie();function le(e,t){const n=t?e?ce:ae:e?oe:se;return(t,i,s)=>"__v_isReactive"===i?!e:"__v_isReadonly"===i?e:"__v_raw"===i?t:Reflect.get(Object(r["k"])(n,i)&&i in t?n:t,i,s)}const ue={get:le(!1,!1)},he={get:le(!1,!0)},de={get:le(!0,!1)};const fe=new WeakMap,pe=new WeakMap,ge=new WeakMap,me=new WeakMap;function ve(e){switch(e){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function ye(e){return e["__v_skip"]||!Object.isExtensible(e)?0:ve(Object(r["P"])(e))}function be(e){return Te(e)?e:Ee(e,!1,$,ue,fe)}function we(e){return Ee(e,!1,H,he,pe)}function _e(e){return Ee(e,!0,q,de,ge)}function Ee(e,t,n,i,s){if(!Object(r["w"])(e))return e;if(e["__v_raw"]&&(!t||!e["__v_isReactive"]))return e;const o=s.get(e);if(o)return o;const a=ye(e);if(0===a)return e;const c=new Proxy(e,2===a?i:n);return s.set(e,c),c}function Oe(e){return Te(e)?Oe(e["__v_raw"]):!(!e||!e["__v_isReactive"])}function Te(e){return!(!e||!e["__v_isReadonly"])}function Ie(e){return!(!e||!e["__v_isShallow"])}function Se(e){return Oe(e)||Te(e)}function ke(e){const t=e&&e["__v_raw"];return t?ke(t):e}function Ce(e){return Object(r["g"])(e,"__v_skip",!0),e}const Ae=e=>Object(r["w"])(e)?be(e):e,xe=e=>Object(r["w"])(e)?_e(e):e;function Re(e){_&&m&&(e=ke(e),S(e.dep||(e.dep=a())))}function Ne(e,t){e=ke(e),e.dep&&C(e.dep)}function je(e){return!(!e||!0!==e.__v_isRef)}function Le(e){return Pe(e,!1)}function De(e){return Pe(e,!0)}function Pe(e,t){return je(e)?e:new Me(e,t)}class Me{constructor(e,t){this.__v_isShallow=t,this.dep=void 0,this.__v_isRef=!0,this._rawValue=t?e:ke(e),this._value=t?e:Ae(e)}get value(){return Re(this),this._value}set value(e){e=this.__v_isShallow?e:ke(e),Object(r["j"])(e,this._rawValue)&&(this._rawValue=e,this._value=this.__v_isShallow?e:Ae(e),Ne(this,e))}}function Fe(e){return je(e)?e.value:e}const Ue={get:(e,t,n)=>Fe(Reflect.get(e,t,n)),set:(e,t,n,r)=>{const i=e[t];return je(i)&&!je(n)?(i.value=n,!0):Reflect.set(e,t,n,r)}};function Ve(e){return Oe(e)?e:new Proxy(e,Ue)}class Be{constructor(e,t,n,r){this._setter=t,this.dep=void 0,this.__v_isRef=!0,this._dirty=!0,this.effect=new b(e,()=>{this._dirty||(this._dirty=!0,Ne(this))}),this.effect.computed=this,this.effect.active=this._cacheable=!r,this["__v_isReadonly"]=n}get value(){const e=ke(this);return Re(e),!e._dirty&&e._cacheable||(e._dirty=!1,e._value=e.effect.run()),e._value}set value(e){this._setter(e)}}function ze(e,t,n=!1){let i,s;const o=Object(r["q"])(e);o?(i=e,s=r["d"]):(i=e.get,s=e.set);const a=new Be(i,s,o||!s,n);return a}Promise.resolve();function $e(e,t,n,r){let i;try{i=r?e(...r):e()}catch(s){He(s,t,n)}return i}function qe(e,t,n,i){if(Object(r["q"])(e)){const s=$e(e,t,n,i);return s&&Object(r["z"])(s)&&s.catch(e=>{He(e,t,n)}),s}const s=[];for(let r=0;r<e.length;r++)s.push(qe(e[r],t,n,i));return s}function He(e,t,n,r=!0){const i=t?t.vnode:null;if(t){let r=t.parent;const i=t.proxy,s=n;while(r){const t=r.ec;if(t)for(let n=0;n<t.length;n++)if(!1===t[n](e,i,s))return;r=r.parent}const o=t.appContext.config.errorHandler;if(o)return void $e(o,null,10,[e,i,s])}We(e,n,i,r)}function We(e,t,n,r=!0){console.error(e)}let Ge=!1,Ke=!1;const Ye=[];let Qe=0;const Xe=[];let Je=null,Ze=0;const et=[];let tt=null,nt=0;const rt=Promise.resolve();let it=null,st=null;function ot(e){const t=it||rt;return e?t.then(this?e.bind(this):e):t}function at(e){let t=Qe+1,n=Ye.length;while(t<n){const r=t+n>>>1,i=mt(Ye[r]);i<e?t=r+1:n=r}return t}function ct(e){Ye.length&&Ye.includes(e,Ge&&e.allowRecurse?Qe+1:Qe)||e===st||(null==e.id?Ye.push(e):Ye.splice(at(e.id),0,e),lt())}function lt(){Ge||Ke||(Ke=!0,it=rt.then(vt))}function ut(e){const t=Ye.indexOf(e);t>Qe&&Ye.splice(t,1)}function ht(e,t,n,i){Object(r["o"])(e)?n.push(...e):t&&t.includes(e,e.allowRecurse?i+1:i)||n.push(e),lt()}function dt(e){ht(e,Je,Xe,Ze)}function ft(e){ht(e,tt,et,nt)}function pt(e,t=null){if(Xe.length){for(st=t,Je=[...new Set(Xe)],Xe.length=0,Ze=0;Ze<Je.length;Ze++)Je[Ze]();Je=null,Ze=0,st=null,pt(e,t)}}function gt(e){if(et.length){const e=[...new Set(et)];if(et.length=0,tt)return void tt.push(...e);for(tt=e,tt.sort((e,t)=>mt(e)-mt(t)),nt=0;nt<tt.length;nt++)tt[nt]();tt=null,nt=0}}const mt=e=>null==e.id?1/0:e.id;function vt(e){Ke=!1,Ge=!0,pt(e),Ye.sort((e,t)=>mt(e)-mt(t));r["d"];try{for(Qe=0;Qe<Ye.length;Qe++){const e=Ye[Qe];e&&!1!==e.active&&$e(e,null,14)}}finally{Qe=0,Ye.length=0,gt(e),Ge=!1,it=null,(Ye.length||Xe.length||et.length)&&vt(e)}}new Set;new Map;function yt(e,t,...n){const i=e.vnode.props||r["b"];let s=n;const o=t.startsWith("update:"),a=o&&t.slice(7);if(a&&a in i){const e=("modelValue"===a?"model":a)+"Modifiers",{number:t,trim:o}=i[e]||r["b"];o?s=n.map(e=>e.trim()):t&&(s=n.map(r["O"]))}let c;let l=i[c=Object(r["N"])(t)]||i[c=Object(r["N"])(Object(r["e"])(t))];!l&&o&&(l=i[c=Object(r["N"])(Object(r["l"])(t))]),l&&qe(l,e,6,s);const u=i[c+"Once"];if(u){if(e.emitted){if(e.emitted[c])return}else e.emitted={};e.emitted[c]=!0,qe(u,e,6,s)}}function bt(e,t,n=!1){const i=t.emitsCache,s=i.get(e);if(void 0!==s)return s;const o=e.emits;let a={},c=!1;if(!Object(r["q"])(e)){const i=e=>{const n=bt(e,t,!0);n&&(c=!0,Object(r["h"])(a,n))};!n&&t.mixins.length&&t.mixins.forEach(i),e.extends&&i(e.extends),e.mixins&&e.mixins.forEach(i)}return o||c?(Object(r["o"])(o)?o.forEach(e=>a[e]=null):Object(r["h"])(a,o),i.set(e,a),a):(i.set(e,null),null)}function wt(e,t){return!(!e||!Object(r["x"])(t))&&(t=t.slice(2).replace(/Once$/,""),Object(r["k"])(e,t[0].toLowerCase()+t.slice(1))||Object(r["k"])(e,Object(r["l"])(t))||Object(r["k"])(e,t))}let _t=null,Et=null;function Ot(e){const t=_t;return _t=e,Et=e&&e.type.__scopeId||null,t}function Tt(e){Et=e}function It(){Et=null}function St(e,t=_t,n){if(!t)return e;if(e._n)return e;const r=(...n)=>{r._d&&Dr(-1);const i=Ot(t),s=e(...n);return Ot(i),r._d&&Dr(1),s};return r._n=!0,r._c=!0,r._d=!0,r}function kt(e){const{type:t,vnode:n,proxy:i,withProxy:s,props:o,propsOptions:[a],slots:c,attrs:l,emit:u,render:h,renderCache:d,data:f,setupState:p,ctx:g,inheritAttrs:m}=e;let v,y;const b=Ot(e);try{if(4&n.shapeFlag){const e=s||i;v=Jr(h.call(e,e,d,o,p,f,g)),y=l}else{const e=t;0,v=Jr(e.length>1?e(o,{attrs:l,slots:c,emit:u}):e(o,null)),y=t.props?l:Ct(l)}}catch(_){xr.length=0,He(_,e,1),v=Hr(Cr)}let w=v;if(y&&!1!==m){const e=Object.keys(y),{shapeFlag:t}=w;e.length&&7&t&&(a&&e.some(r["v"])&&(y=At(y,a)),w=Kr(w,y))}return n.dirs&&(w.dirs=w.dirs?w.dirs.concat(n.dirs):n.dirs),n.transition&&(w.transition=n.transition),v=w,Ot(b),v}const Ct=e=>{let t;for(const n in e)("class"===n||"style"===n||Object(r["x"])(n))&&((t||(t={}))[n]=e[n]);return t},At=(e,t)=>{const n={};for(const i in e)Object(r["v"])(i)&&i.slice(9)in t||(n[i]=e[i]);return n};function xt(e,t,n){const{props:r,children:i,component:s}=e,{props:o,children:a,patchFlag:c}=t,l=s.emitsOptions;if(t.dirs||t.transition)return!0;if(!(n&&c>=0))return!(!i&&!a||a&&a.$stable)||r!==o&&(r?!o||Rt(r,o,l):!!o);if(1024&c)return!0;if(16&c)return r?Rt(r,o,l):!!o;if(8&c){const e=t.dynamicProps;for(let t=0;t<e.length;t++){const n=e[t];if(o[n]!==r[n]&&!wt(l,n))return!0}}return!1}function Rt(e,t,n){const r=Object.keys(t);if(r.length!==Object.keys(e).length)return!0;for(let i=0;i<r.length;i++){const s=r[i];if(t[s]!==e[s]&&!wt(n,s))return!0}return!1}function Nt({vnode:e,parent:t},n){while(t&&t.subTree===e)(e=t.vnode).el=n,t=t.parent}const jt=e=>e.__isSuspense;function Lt(e,t){t&&t.pendingBranch?Object(r["o"])(e)?t.effects.push(...e):t.effects.push(e):ft(e)}function Dt(e,t){if(fi){let n=fi.provides;const r=fi.parent&&fi.parent.provides;r===n&&(n=fi.provides=Object.create(r)),n[e]=t}else 0}function Pt(e,t,n=!1){const i=fi||_t;if(i){const s=null==i.parent?i.vnode.appContext&&i.vnode.appContext.provides:i.parent.provides;if(s&&e in s)return s[e];if(arguments.length>1)return n&&Object(r["q"])(t)?t.call(i.proxy):t}else 0}const Mt={};function Ft(e,t,n){return Ut(e,t,n)}function Ut(e,t,{immediate:n,deep:i,flush:s,onTrack:o,onTrigger:a}=r["b"]){const c=fi;let l,u,h=!1,d=!1;if(je(e)?(l=()=>e.value,h=Ie(e)):Oe(e)?(l=()=>e,i=!0):Object(r["o"])(e)?(d=!0,h=e.some(Oe),l=()=>e.map(e=>je(e)?e.value:Oe(e)?zt(e):Object(r["q"])(e)?$e(e,c,2):void 0)):l=Object(r["q"])(e)?t?()=>$e(e,c,2):()=>{if(!c||!c.isUnmounted)return u&&u(),qe(e,c,3,[f])}:r["d"],t&&i){const e=l;l=()=>zt(e())}let f=e=>{u=v.onStop=()=>{$e(e,c,4)}};if(wi)return f=r["d"],t?n&&qe(t,c,3,[l(),d?[]:void 0,f]):l(),r["d"];let p=d?[]:Mt;const g=()=>{if(v.active)if(t){const e=v.run();(i||h||(d?e.some((e,t)=>Object(r["j"])(e,p[t])):Object(r["j"])(e,p)))&&(u&&u(),qe(t,c,3,[e,p===Mt?void 0:p,f]),p=e)}else v.run()};let m;g.allowRecurse=!!t,m="sync"===s?g:"post"===s?()=>sr(g,c&&c.suspense):()=>{!c||c.isMounted?dt(g):g()};const v=new b(l,m);return t?n?g():p=v.run():"post"===s?sr(v.run.bind(v),c&&c.suspense):v.run(),()=>{v.stop(),c&&c.scope&&Object(r["L"])(c.scope.effects,v)}}function Vt(e,t,n){const i=this.proxy,s=Object(r["E"])(e)?e.includes(".")?Bt(i,e):()=>i[e]:e.bind(i,i);let o;Object(r["q"])(t)?o=t:(o=t.handler,n=t);const a=fi;gi(this);const c=Ut(s,o.bind(i),n);return a?gi(a):mi(),c}function Bt(e,t){const n=t.split(".");return()=>{let t=e;for(let e=0;e<n.length&&t;e++)t=t[n[e]];return t}}function zt(e,t){if(!Object(r["w"])(e)||e["__v_skip"])return e;if(t=t||new Set,t.has(e))return e;if(t.add(e),je(e))zt(e.value,t);else if(Object(r["o"])(e))for(let n=0;n<e.length;n++)zt(e[n],t);else if(Object(r["C"])(e)||Object(r["u"])(e))e.forEach(e=>{zt(e,t)});else if(Object(r["y"])(e))for(const n in e)zt(e[n],t);return e}function $t(){const e={isMounted:!1,isLeaving:!1,isUnmounting:!1,leavingVNodes:new Map};return fn(()=>{e.isMounted=!0}),mn(()=>{e.isUnmounting=!0}),e}const qt=[Function,Array],Ht={name:"BaseTransition",props:{mode:String,appear:Boolean,persisted:Boolean,onBeforeEnter:qt,onEnter:qt,onAfterEnter:qt,onEnterCancelled:qt,onBeforeLeave:qt,onLeave:qt,onAfterLeave:qt,onLeaveCancelled:qt,onBeforeAppear:qt,onAppear:qt,onAfterAppear:qt,onAppearCancelled:qt},setup(e,{slots:t}){const n=pi(),r=$t();let i;return()=>{const s=t.default&&Jt(t.default(),!0);if(!s||!s.length)return;const o=ke(e),{mode:a}=o;const c=s[0];if(r.isLeaving)return Yt(c);const l=Qt(c);if(!l)return Yt(c);const u=Kt(l,o,r,n);Xt(l,u);const h=n.subTree,d=h&&Qt(h);let f=!1;const{getTransitionKey:p}=l.type;if(p){const e=p();void 0===i?i=e:e!==i&&(i=e,f=!0)}if(d&&d.type!==Cr&&(!Vr(l,d)||f)){const e=Kt(d,o,r,n);if(Xt(d,e),"out-in"===a)return r.isLeaving=!0,e.afterLeave=()=>{r.isLeaving=!1,n.update()},Yt(c);"in-out"===a&&l.type!==Cr&&(e.delayLeave=(e,t,n)=>{const i=Gt(r,d);i[String(d.key)]=d,e._leaveCb=()=>{t(),e._leaveCb=void 0,delete u.delayedLeave},u.delayedLeave=n})}return c}}},Wt=Ht;function Gt(e,t){const{leavingVNodes:n}=e;let r=n.get(t.type);return r||(r=Object.create(null),n.set(t.type,r)),r}function Kt(e,t,n,r){const{appear:i,mode:s,persisted:o=!1,onBeforeEnter:a,onEnter:c,onAfterEnter:l,onEnterCancelled:u,onBeforeLeave:h,onLeave:d,onAfterLeave:f,onLeaveCancelled:p,onBeforeAppear:g,onAppear:m,onAfterAppear:v,onAppearCancelled:y}=t,b=String(e.key),w=Gt(n,e),_=(e,t)=>{e&&qe(e,r,9,t)},E={mode:s,persisted:o,beforeEnter(t){let r=a;if(!n.isMounted){if(!i)return;r=g||a}t._leaveCb&&t._leaveCb(!0);const s=w[b];s&&Vr(e,s)&&s.el._leaveCb&&s.el._leaveCb(),_(r,[t])},enter(e){let t=c,r=l,s=u;if(!n.isMounted){if(!i)return;t=m||c,r=v||l,s=y||u}let o=!1;const a=e._enterCb=t=>{o||(o=!0,_(t?s:r,[e]),E.delayedLeave&&E.delayedLeave(),e._enterCb=void 0)};t?(t(e,a),t.length<=1&&a()):a()},leave(t,r){const i=String(e.key);if(t._enterCb&&t._enterCb(!0),n.isUnmounting)return r();_(h,[t]);let s=!1;const o=t._leaveCb=n=>{s||(s=!0,r(),_(n?p:f,[t]),t._leaveCb=void 0,w[i]===e&&delete w[i])};w[i]=e,d?(d(t,o),d.length<=1&&o()):o()},clone(e){return Kt(e,t,n,r)}};return E}function Yt(e){if(tn(e))return e=Kr(e),e.children=null,e}function Qt(e){return tn(e)?e.children?e.children[0]:void 0:e}function Xt(e,t){6&e.shapeFlag&&e.component?Xt(e.component.subTree,t):128&e.shapeFlag?(e.ssContent.transition=t.clone(e.ssContent),e.ssFallback.transition=t.clone(e.ssFallback)):e.transition=t}function Jt(e,t=!1){let n=[],r=0;for(let i=0;i<e.length;i++){const s=e[i];s.type===Sr?(128&s.patchFlag&&r++,n=n.concat(Jt(s.children,t))):(t||s.type!==Cr)&&n.push(s)}if(r>1)for(let i=0;i<n.length;i++)n[i].patchFlag=-2;return n}function Zt(e){return Object(r["q"])(e)?{setup:e,name:e.name}:e}const en=e=>!!e.type.__asyncLoader;const tn=e=>e.type.__isKeepAlive;RegExp,RegExp;function nn(e,t){return Object(r["o"])(e)?e.some(e=>nn(e,t)):Object(r["E"])(e)?e.split(",").includes(t):!!e.test&&e.test(t)}function rn(e,t){on(e,"a",t)}function sn(e,t){on(e,"da",t)}function on(e,t,n=fi){const r=e.__wdc||(e.__wdc=()=>{let t=n;while(t){if(t.isDeactivated)return;t=t.parent}return e()});if(un(t,r,n),n){let e=n.parent;while(e&&e.parent)tn(e.parent.vnode)&&an(r,t,n,e),e=e.parent}}function an(e,t,n,i){const s=un(t,e,i,!0);vn(()=>{Object(r["L"])(i[t],s)},n)}function cn(e){let t=e.shapeFlag;256&t&&(t-=256),512&t&&(t-=512),e.shapeFlag=t}function ln(e){return 128&e.shapeFlag?e.ssContent:e}function un(e,t,n=fi,r=!1){if(n){const i=n[e]||(n[e]=[]),s=t.__weh||(t.__weh=(...r)=>{if(n.isUnmounted)return;O(),gi(n);const i=qe(t,n,e,r);return mi(),T(),i});return r?i.unshift(s):i.push(s),s}}const hn=e=>(t,n=fi)=>(!wi||"sp"===e)&&un(e,t,n),dn=hn("bm"),fn=hn("m"),pn=hn("bu"),gn=hn("u"),mn=hn("bum"),vn=hn("um"),yn=hn("sp"),bn=hn("rtg"),wn=hn("rtc");function _n(e,t=fi){un("ec",e,t)}let En=!0;function On(e){const t=kn(e),n=e.proxy,i=e.ctx;En=!1,t.beforeCreate&&In(t.beforeCreate,e,"bc");const{data:s,computed:o,methods:a,watch:c,provide:l,inject:u,created:h,beforeMount:d,mounted:f,beforeUpdate:p,updated:g,activated:m,deactivated:v,beforeDestroy:y,beforeUnmount:b,destroyed:w,unmounted:_,render:E,renderTracked:O,renderTriggered:T,errorCaptured:I,serverPrefetch:S,expose:k,inheritAttrs:C,components:A,directives:x,filters:R}=t,N=null;if(u&&Tn(u,i,N,e.appContext.config.unwrapInjectedRef),a)for(const L in a){const e=a[L];Object(r["q"])(e)&&(i[L]=e.bind(n))}if(s){0;const t=s.call(n,n);0,Object(r["w"])(t)&&(e.data=be(t))}if(En=!0,o)for(const L in o){const e=o[L],t=Object(r["q"])(e)?e.bind(n,n):Object(r["q"])(e.get)?e.get.bind(n,n):r["d"];0;const s=!Object(r["q"])(e)&&Object(r["q"])(e.set)?e.set.bind(n):r["d"],a=xi({get:t,set:s});Object.defineProperty(i,L,{enumerable:!0,configurable:!0,get:()=>a.value,set:e=>a.value=e})}if(c)for(const r in c)Sn(c[r],i,n,r);if(l){const e=Object(r["q"])(l)?l.call(n):l;Reflect.ownKeys(e).forEach(t=>{Dt(t,e[t])})}function j(e,t){Object(r["o"])(t)?t.forEach(t=>e(t.bind(n))):t&&e(t.bind(n))}if(h&&In(h,e,"c"),j(dn,d),j(fn,f),j(pn,p),j(gn,g),j(rn,m),j(sn,v),j(_n,I),j(wn,O),j(bn,T),j(mn,b),j(vn,_),j(yn,S),Object(r["o"])(k))if(k.length){const t=e.exposed||(e.exposed={});k.forEach(e=>{Object.defineProperty(t,e,{get:()=>n[e],set:t=>n[e]=t})})}else e.exposed||(e.exposed={});E&&e.render===r["d"]&&(e.render=E),null!=C&&(e.inheritAttrs=C),A&&(e.components=A),x&&(e.directives=x)}function Tn(e,t,n=r["d"],i=!1){Object(r["o"])(e)&&(e=Nn(e));for(const s in e){const n=e[s];let o;o=Object(r["w"])(n)?"default"in n?Pt(n.from||s,n.default,!0):Pt(n.from||s):Pt(n),je(o)&&i?Object.defineProperty(t,s,{enumerable:!0,configurable:!0,get:()=>o.value,set:e=>o.value=e}):t[s]=o}}function In(e,t,n){qe(Object(r["o"])(e)?e.map(e=>e.bind(t.proxy)):e.bind(t.proxy),t,n)}function Sn(e,t,n,i){const s=i.includes(".")?Bt(n,i):()=>n[i];if(Object(r["E"])(e)){const n=t[e];Object(r["q"])(n)&&Ft(s,n)}else if(Object(r["q"])(e))Ft(s,e.bind(n));else if(Object(r["w"])(e))if(Object(r["o"])(e))e.forEach(e=>Sn(e,t,n,i));else{const i=Object(r["q"])(e.handler)?e.handler.bind(n):t[e.handler];Object(r["q"])(i)&&Ft(s,i,e)}else 0}function kn(e){const t=e.type,{mixins:n,extends:r}=t,{mixins:i,optionsCache:s,config:{optionMergeStrategies:o}}=e.appContext,a=s.get(t);let c;return a?c=a:i.length||n||r?(c={},i.length&&i.forEach(e=>Cn(c,e,o,!0)),Cn(c,t,o)):c=t,s.set(t,c),c}function Cn(e,t,n,r=!1){const{mixins:i,extends:s}=t;s&&Cn(e,s,n,!0),i&&i.forEach(t=>Cn(e,t,n,!0));for(const o in t)if(r&&"expose"===o);else{const r=An[o]||n&&n[o];e[o]=r?r(e[o],t[o]):t[o]}return e}const An={data:xn,props:Ln,emits:Ln,methods:Ln,computed:Ln,beforeCreate:jn,created:jn,beforeMount:jn,mounted:jn,beforeUpdate:jn,updated:jn,beforeDestroy:jn,beforeUnmount:jn,destroyed:jn,unmounted:jn,activated:jn,deactivated:jn,errorCaptured:jn,serverPrefetch:jn,components:Ln,directives:Ln,watch:Dn,provide:xn,inject:Rn};function xn(e,t){return t?e?function(){return Object(r["h"])(Object(r["q"])(e)?e.call(this,this):e,Object(r["q"])(t)?t.call(this,this):t)}:t:e}function Rn(e,t){return Ln(Nn(e),Nn(t))}function Nn(e){if(Object(r["o"])(e)){const t={};for(let n=0;n<e.length;n++)t[e[n]]=e[n];return t}return e}function jn(e,t){return e?[...new Set([].concat(e,t))]:t}function Ln(e,t){return e?Object(r["h"])(Object(r["h"])(Object.create(null),e),t):t}function Dn(e,t){if(!e)return t;if(!t)return e;const n=Object(r["h"])(Object.create(null),e);for(const r in t)n[r]=jn(e[r],t[r]);return n}function Pn(e,t,n,i=!1){const s={},o={};Object(r["g"])(o,Br,1),e.propsDefaults=Object.create(null),Fn(e,t,s,o);for(const r in e.propsOptions[0])r in s||(s[r]=void 0);n?e.props=i?s:we(s):e.type.props?e.props=s:e.props=o,e.attrs=o}function Mn(e,t,n,i){const{props:s,attrs:o,vnode:{patchFlag:a}}=e,c=ke(s),[l]=e.propsOptions;let u=!1;if(!(i||a>0)||16&a){let i;Fn(e,t,s,o)&&(u=!0);for(const o in c)t&&(Object(r["k"])(t,o)||(i=Object(r["l"])(o))!==o&&Object(r["k"])(t,i))||(l?!n||void 0===n[o]&&void 0===n[i]||(s[o]=Un(l,c,o,void 0,e,!0)):delete s[o]);if(o!==c)for(const e in o)t&&Object(r["k"])(t,e)||(delete o[e],u=!0)}else if(8&a){const n=e.vnode.dynamicProps;for(let i=0;i<n.length;i++){let a=n[i];const h=t[a];if(l)if(Object(r["k"])(o,a))h!==o[a]&&(o[a]=h,u=!0);else{const t=Object(r["e"])(a);s[t]=Un(l,c,t,h,e,!1)}else h!==o[a]&&(o[a]=h,u=!0)}}u&&k(e,"set","$attrs")}function Fn(e,t,n,i){const[s,o]=e.propsOptions;let a,c=!1;if(t)for(let l in t){if(Object(r["A"])(l))continue;const u=t[l];let h;s&&Object(r["k"])(s,h=Object(r["e"])(l))?o&&o.includes(h)?(a||(a={}))[h]=u:n[h]=u:wt(e.emitsOptions,l)||l in i&&u===i[l]||(i[l]=u,c=!0)}if(o){const t=ke(n),i=a||r["b"];for(let a=0;a<o.length;a++){const c=o[a];n[c]=Un(s,t,c,i[c],e,!Object(r["k"])(i,c))}}return c}function Un(e,t,n,i,s,o){const a=e[n];if(null!=a){const e=Object(r["k"])(a,"default");if(e&&void 0===i){const e=a.default;if(a.type!==Function&&Object(r["q"])(e)){const{propsDefaults:r}=s;n in r?i=r[n]:(gi(s),i=r[n]=e.call(null,t),mi())}else i=e}a[0]&&(o&&!e?i=!1:!a[1]||""!==i&&i!==Object(r["l"])(n)||(i=!0))}return i}function Vn(e,t,n=!1){const i=t.propsCache,s=i.get(e);if(s)return s;const o=e.props,a={},c=[];let l=!1;if(!Object(r["q"])(e)){const i=e=>{l=!0;const[n,i]=Vn(e,t,!0);Object(r["h"])(a,n),i&&c.push(...i)};!n&&t.mixins.length&&t.mixins.forEach(i),e.extends&&i(e.extends),e.mixins&&e.mixins.forEach(i)}if(!o&&!l)return i.set(e,r["a"]),r["a"];if(Object(r["o"])(o))for(let h=0;h<o.length;h++){0;const e=Object(r["e"])(o[h]);Bn(e)&&(a[e]=r["b"])}else if(o){0;for(const e in o){const t=Object(r["e"])(e);if(Bn(t)){const n=o[e],i=a[t]=Object(r["o"])(n)||Object(r["q"])(n)?{type:n}:n;if(i){const e=qn(Boolean,i.type),n=qn(String,i.type);i[0]=e>-1,i[1]=n<0||e<n,(e>-1||Object(r["k"])(i,"default"))&&c.push(t)}}}}const u=[a,c];return i.set(e,u),u}function Bn(e){return"$"!==e[0]}function zn(e){const t=e&&e.toString().match(/^\s*function (\w+)/);return t?t[1]:null===e?"null":""}function $n(e,t){return zn(e)===zn(t)}function qn(e,t){return Object(r["o"])(t)?t.findIndex(t=>$n(t,e)):Object(r["q"])(t)&&$n(t,e)?0:-1}const Hn=e=>"_"===e[0]||"$stable"===e,Wn=e=>Object(r["o"])(e)?e.map(Jr):[Jr(e)],Gn=(e,t,n)=>{const r=St((...e)=>Wn(t(...e)),n);return r._c=!1,r},Kn=(e,t,n)=>{const i=e._ctx;for(const s in e){if(Hn(s))continue;const n=e[s];if(Object(r["q"])(n))t[s]=Gn(s,n,i);else if(null!=n){0;const e=Wn(n);t[s]=()=>e}}},Yn=(e,t)=>{const n=Wn(t);e.slots.default=()=>n},Qn=(e,t)=>{if(32&e.vnode.shapeFlag){const n=t._;n?(e.slots=ke(t),Object(r["g"])(t,"_",n)):Kn(t,e.slots={})}else e.slots={},t&&Yn(e,t);Object(r["g"])(e.slots,Br,1)},Xn=(e,t,n)=>{const{vnode:i,slots:s}=e;let o=!0,a=r["b"];if(32&i.shapeFlag){const e=t._;e?n&&1===e?o=!1:(Object(r["h"])(s,t),n||1!==e||delete s._):(o=!t.$stable,Kn(t,s)),a=t}else t&&(Yn(e,t),a={default:1});if(o)for(const r in s)Hn(r)||r in a||delete s[r]};function Jn(e,t){const n=_t;if(null===n)return e;const i=n.proxy,s=e.dirs||(e.dirs=[]);for(let o=0;o<t.length;o++){let[e,n,a,c=r["b"]]=t[o];Object(r["q"])(e)&&(e={mounted:e,updated:e}),e.deep&&zt(n),s.push({dir:e,instance:i,value:n,oldValue:void 0,arg:a,modifiers:c})}return e}function Zn(e,t,n,r){const i=e.dirs,s=t&&t.dirs;for(let o=0;o<i.length;o++){const a=i[o];s&&(a.oldValue=s[o].value);let c=a.dir[r];c&&(O(),qe(c,n,8,[e.el,a,e,t]),T())}}function er(){return{app:null,config:{isNativeTag:r["c"],performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let tr=0;function nr(e,t){return function(n,i=null){null==i||Object(r["w"])(i)||(i=null);const s=er(),o=new Set;let a=!1;const c=s.app={_uid:tr++,_component:n,_props:i,_container:null,_context:s,_instance:null,version:Ni,get config(){return s.config},set config(e){0},use(e,...t){return o.has(e)||(e&&Object(r["q"])(e.install)?(o.add(e),e.install(c,...t)):Object(r["q"])(e)&&(o.add(e),e(c,...t))),c},mixin(e){return s.mixins.includes(e)||s.mixins.push(e),c},component(e,t){return t?(s.components[e]=t,c):s.components[e]},directive(e,t){return t?(s.directives[e]=t,c):s.directives[e]},mount(r,o,l){if(!a){const u=Hr(n,i);return u.appContext=s,o&&t?t(u,r):e(u,r,l),a=!0,c._container=r,r.__vue_app__=c,ki(u.component)||u.component.proxy}},unmount(){a&&(e(null,c._container),delete c._container.__vue_app__)},provide(e,t){return s.provides[e]=t,c}};return c}}function rr(e,t,n,i,s=!1){if(Object(r["o"])(e))return void e.forEach((e,o)=>rr(e,t&&(Object(r["o"])(t)?t[o]:t),n,i,s));if(en(i)&&!s)return;const o=4&i.shapeFlag?ki(i.component)||i.component.proxy:i.el,a=s?null:o,{i:c,r:l}=e;const u=t&&t.r,h=c.refs===r["b"]?c.refs={}:c.refs,d=c.setupState;if(null!=u&&u!==l&&(Object(r["E"])(u)?(h[u]=null,Object(r["k"])(d,u)&&(d[u]=null)):je(u)&&(u.value=null)),Object(r["q"])(l))$e(l,c,12,[a,h]);else{const t=Object(r["E"])(l),i=je(l);if(t||i){const i=()=>{if(e.f){const n=t?h[l]:l.value;s?Object(r["o"])(n)&&Object(r["L"])(n,o):Object(r["o"])(n)?n.includes(o)||n.push(o):t?h[l]=[o]:(l.value=[o],e.k&&(h[e.k]=l.value))}else t?(h[l]=a,Object(r["k"])(d,l)&&(d[l]=a)):je(l)&&(l.value=a,e.k&&(h[e.k]=a))};a?(i.id=-1,sr(i,n)):i()}else 0}}function ir(){}const sr=Lt;function or(e){return ar(e)}function ar(e,t){ir();const n=Object(r["i"])();n.__VUE__=!0;const{insert:i,remove:s,patchProp:o,createElement:a,createText:c,createComment:l,setText:u,setElementText:h,parentNode:d,nextSibling:f,setScopeId:p=r["d"],cloneNode:g,insertStaticContent:m}=e,v=(e,t,n,r=null,i=null,s=null,o=!1,a=null,c=!!t.dynamicChildren)=>{if(e===t)return;e&&!Vr(e,t)&&(r=K(e),$(e,i,s,!0),e=null),-2===t.patchFlag&&(c=!1,t.dynamicChildren=null);const{type:l,ref:u,shapeFlag:h}=t;switch(l){case kr:y(e,t,n,r);break;case Cr:w(e,t,n,r);break;case Ar:null==e&&_(t,n,r,o);break;case Sr:j(e,t,n,r,i,s,o,a,c);break;default:1&h?S(e,t,n,r,i,s,o,a,c):6&h?L(e,t,n,r,i,s,o,a,c):(64&h||128&h)&&l.process(e,t,n,r,i,s,o,a,c,Q)}null!=u&&i&&rr(u,e&&e.ref,s,t||e,!t)},y=(e,t,n,r)=>{if(null==e)i(t.el=c(t.children),n,r);else{const n=t.el=e.el;t.children!==e.children&&u(n,t.children)}},w=(e,t,n,r)=>{null==e?i(t.el=l(t.children||""),n,r):t.el=e.el},_=(e,t,n,r)=>{[e.el,e.anchor]=m(e.children,t,n,r,e.el,e.anchor)},E=({el:e,anchor:t},n,r)=>{let s;while(e&&e!==t)s=f(e),i(e,n,r),e=s;i(t,n,r)},I=({el:e,anchor:t})=>{let n;while(e&&e!==t)n=f(e),s(e),e=n;s(t)},S=(e,t,n,r,i,s,o,a,c)=>{o=o||"svg"===t.type,null==e?k(t,n,r,i,s,o,a,c):x(e,t,i,s,o,a,c)},k=(e,t,n,s,c,l,u,d)=>{let f,p;const{type:m,props:v,shapeFlag:y,transition:b,patchFlag:w,dirs:_}=e;if(e.el&&void 0!==g&&-1===w)f=e.el=g(e.el);else{if(f=e.el=a(e.type,l,v&&v.is,v),8&y?h(f,e.children):16&y&&A(e.children,f,null,s,c,l&&"foreignObject"!==m,u,d),_&&Zn(e,null,s,"created"),v){for(const t in v)"value"===t||Object(r["A"])(t)||o(f,t,null,v[t],l,e.children,s,c,G);"value"in v&&o(f,"value",null,v.value),(p=v.onVnodeBeforeMount)&&ni(p,s,e)}C(f,e,e.scopeId,u,s)}_&&Zn(e,null,s,"beforeMount");const E=(!c||c&&!c.pendingBranch)&&b&&!b.persisted;E&&b.beforeEnter(f),i(f,t,n),((p=v&&v.onVnodeMounted)||E||_)&&sr(()=>{p&&ni(p,s,e),E&&b.enter(f),_&&Zn(e,null,s,"mounted")},c)},C=(e,t,n,r,i)=>{if(n&&p(e,n),r)for(let s=0;s<r.length;s++)p(e,r[s]);if(i){let n=i.subTree;if(t===n){const t=i.vnode;C(e,t,t.scopeId,t.slotScopeIds,i.parent)}}},A=(e,t,n,r,i,s,o,a,c=0)=>{for(let l=c;l<e.length;l++){const c=e[l]=a?Zr(e[l]):Jr(e[l]);v(null,c,t,n,r,i,s,o,a)}},x=(e,t,n,i,s,a,c)=>{const l=t.el=e.el;let{patchFlag:u,dynamicChildren:d,dirs:f}=t;u|=16&e.patchFlag;const p=e.props||r["b"],g=t.props||r["b"];let m;n&&cr(n,!1),(m=g.onVnodeBeforeUpdate)&&ni(m,n,t,e),f&&Zn(t,e,n,"beforeUpdate"),n&&cr(n,!0);const v=s&&"foreignObject"!==t.type;if(d?R(e.dynamicChildren,d,l,n,i,v,a):c||U(e,t,l,null,n,i,v,a,!1),u>0){if(16&u)N(l,t,p,g,n,i,s);else if(2&u&&p.class!==g.class&&o(l,"class",null,g.class,s),4&u&&o(l,"style",p.style,g.style,s),8&u){const r=t.dynamicProps;for(let t=0;t<r.length;t++){const a=r[t],c=p[a],u=g[a];u===c&&"value"!==a||o(l,a,c,u,s,e.children,n,i,G)}}1&u&&e.children!==t.children&&h(l,t.children)}else c||null!=d||N(l,t,p,g,n,i,s);((m=g.onVnodeUpdated)||f)&&sr(()=>{m&&ni(m,n,t,e),f&&Zn(t,e,n,"updated")},i)},R=(e,t,n,r,i,s,o)=>{for(let a=0;a<t.length;a++){const c=e[a],l=t[a],u=c.el&&(c.type===Sr||!Vr(c,l)||70&c.shapeFlag)?d(c.el):n;v(c,l,u,null,r,i,s,o,!0)}},N=(e,t,n,i,s,a,c)=>{if(n!==i){for(const l in i){if(Object(r["A"])(l))continue;const u=i[l],h=n[l];u!==h&&"value"!==l&&o(e,l,h,u,c,t.children,s,a,G)}if(n!==r["b"])for(const l in n)Object(r["A"])(l)||l in i||o(e,l,n[l],null,c,t.children,s,a,G);"value"in i&&o(e,"value",n.value,i.value)}},j=(e,t,n,r,s,o,a,l,u)=>{const h=t.el=e?e.el:c(""),d=t.anchor=e?e.anchor:c("");let{patchFlag:f,dynamicChildren:p,slotScopeIds:g}=t;g&&(l=l?l.concat(g):g),null==e?(i(h,n,r),i(d,n,r),A(t.children,n,d,s,o,a,l,u)):f>0&&64&f&&p&&e.dynamicChildren?(R(e.dynamicChildren,p,n,s,o,a,l),(null!=t.key||s&&t===s.subTree)&&lr(e,t,!0)):U(e,t,n,d,s,o,a,l,u)},L=(e,t,n,r,i,s,o,a,c)=>{t.slotScopeIds=a,null==e?512&t.shapeFlag?i.ctx.activate(t,n,r,o,c):D(t,n,r,i,s,o,c):P(e,t,c)},D=(e,t,n,r,i,s,o)=>{const a=e.component=di(e,r,i);if(tn(e)&&(a.ctx.renderer=Q),_i(a),a.asyncDep){if(i&&i.registerDep(a,M),!e.el){const e=a.subTree=Hr(Cr);w(null,e,t,n)}}else M(a,e,t,n,i,s,o)},P=(e,t,n)=>{const r=t.component=e.component;if(xt(e,t,n)){if(r.asyncDep&&!r.asyncResolved)return void F(r,t,n);r.next=t,ut(r.update),r.update()}else t.component=e.component,t.el=e.el,r.vnode=t},M=(e,t,n,i,s,o,a)=>{const c=()=>{if(e.isMounted){let t,{next:n,bu:i,u:c,parent:l,vnode:u}=e,h=n;0,cr(e,!1),n?(n.el=u.el,F(e,n,a)):n=u,i&&Object(r["n"])(i),(t=n.props&&n.props.onVnodeBeforeUpdate)&&ni(t,l,n,u),cr(e,!0);const f=kt(e);0;const p=e.subTree;e.subTree=f,v(p,f,d(p.el),K(p),e,s,o),n.el=f.el,null===h&&Nt(e,f.el),c&&sr(c,s),(t=n.props&&n.props.onVnodeUpdated)&&sr(()=>ni(t,l,n,u),s)}else{let a;const{el:c,props:l}=t,{bm:u,m:h,parent:d}=e,f=en(t);if(cr(e,!1),u&&Object(r["n"])(u),!f&&(a=l&&l.onVnodeBeforeMount)&&ni(a,d,t),cr(e,!0),c&&J){const n=()=>{e.subTree=kt(e),J(c,e.subTree,e,s,null)};f?t.type.__asyncLoader().then(()=>!e.isUnmounted&&n()):n()}else{0;const r=e.subTree=kt(e);0,v(null,r,n,i,e,s,o),t.el=r.el}if(h&&sr(h,s),!f&&(a=l&&l.onVnodeMounted)){const e=t;sr(()=>ni(a,d,e),s)}256&t.shapeFlag&&e.a&&sr(e.a,s),e.isMounted=!0,t=n=i=null}},l=e.effect=new b(c,()=>ct(e.update),e.scope),u=e.update=l.run.bind(l);u.id=e.uid,cr(e,!0),u()},F=(e,t,n)=>{t.component=e;const r=e.vnode.props;e.vnode=t,e.next=null,Mn(e,t.props,r,n),Xn(e,t.children,n),O(),pt(void 0,e.update),T()},U=(e,t,n,r,i,s,o,a,c=!1)=>{const l=e&&e.children,u=e?e.shapeFlag:0,d=t.children,{patchFlag:f,shapeFlag:p}=t;if(f>0){if(128&f)return void B(l,d,n,r,i,s,o,a,c);if(256&f)return void V(l,d,n,r,i,s,o,a,c)}8&p?(16&u&&G(l,i,s),d!==l&&h(n,d)):16&u?16&p?B(l,d,n,r,i,s,o,a,c):G(l,i,s,!0):(8&u&&h(n,""),16&p&&A(d,n,r,i,s,o,a,c))},V=(e,t,n,i,s,o,a,c,l)=>{e=e||r["a"],t=t||r["a"];const u=e.length,h=t.length,d=Math.min(u,h);let f;for(f=0;f<d;f++){const r=t[f]=l?Zr(t[f]):Jr(t[f]);v(e[f],r,n,null,s,o,a,c,l)}u>h?G(e,s,o,!0,!1,d):A(t,n,i,s,o,a,c,l,d)},B=(e,t,n,i,s,o,a,c,l)=>{let u=0;const h=t.length;let d=e.length-1,f=h-1;while(u<=d&&u<=f){const r=e[u],i=t[u]=l?Zr(t[u]):Jr(t[u]);if(!Vr(r,i))break;v(r,i,n,null,s,o,a,c,l),u++}while(u<=d&&u<=f){const r=e[d],i=t[f]=l?Zr(t[f]):Jr(t[f]);if(!Vr(r,i))break;v(r,i,n,null,s,o,a,c,l),d--,f--}if(u>d){if(u<=f){const e=f+1,r=e<h?t[e].el:i;while(u<=f)v(null,t[u]=l?Zr(t[u]):Jr(t[u]),n,r,s,o,a,c,l),u++}}else if(u>f)while(u<=d)$(e[u],s,o,!0),u++;else{const p=u,g=u,m=new Map;for(u=g;u<=f;u++){const e=t[u]=l?Zr(t[u]):Jr(t[u]);null!=e.key&&m.set(e.key,u)}let y,b=0;const w=f-g+1;let _=!1,E=0;const O=new Array(w);for(u=0;u<w;u++)O[u]=0;for(u=p;u<=d;u++){const r=e[u];if(b>=w){$(r,s,o,!0);continue}let i;if(null!=r.key)i=m.get(r.key);else for(y=g;y<=f;y++)if(0===O[y-g]&&Vr(r,t[y])){i=y;break}void 0===i?$(r,s,o,!0):(O[i-g]=u+1,i>=E?E=i:_=!0,v(r,t[i],n,null,s,o,a,c,l),b++)}const T=_?ur(O):r["a"];for(y=T.length-1,u=w-1;u>=0;u--){const e=g+u,r=t[e],d=e+1<h?t[e+1].el:i;0===O[u]?v(null,r,n,d,s,o,a,c,l):_&&(y<0||u!==T[y]?z(r,n,d,2):y--)}}},z=(e,t,n,r,s=null)=>{const{el:o,type:a,transition:c,children:l,shapeFlag:u}=e;if(6&u)return void z(e.component.subTree,t,n,r);if(128&u)return void e.suspense.move(t,n,r);if(64&u)return void a.move(e,t,n,Q);if(a===Sr){i(o,t,n);for(let e=0;e<l.length;e++)z(l[e],t,n,r);return void i(e.anchor,t,n)}if(a===Ar)return void E(e,t,n);const h=2!==r&&1&u&&c;if(h)if(0===r)c.beforeEnter(o),i(o,t,n),sr(()=>c.enter(o),s);else{const{leave:e,delayLeave:r,afterLeave:s}=c,a=()=>i(o,t,n),l=()=>{e(o,()=>{a(),s&&s()})};r?r(o,a,l):l()}else i(o,t,n)},$=(e,t,n,r=!1,i=!1)=>{const{type:s,props:o,ref:a,children:c,dynamicChildren:l,shapeFlag:u,patchFlag:h,dirs:d}=e;if(null!=a&&rr(a,null,n,e,!0),256&u)return void t.ctx.deactivate(e);const f=1&u&&d,p=!en(e);let g;if(p&&(g=o&&o.onVnodeBeforeUnmount)&&ni(g,t,e),6&u)W(e.component,n,r);else{if(128&u)return void e.suspense.unmount(n,r);f&&Zn(e,null,t,"beforeUnmount"),64&u?e.type.remove(e,t,n,i,Q,r):l&&(s!==Sr||h>0&&64&h)?G(l,t,n,!1,!0):(s===Sr&&384&h||!i&&16&u)&&G(c,t,n),r&&q(e)}(p&&(g=o&&o.onVnodeUnmounted)||f)&&sr(()=>{g&&ni(g,t,e),f&&Zn(e,null,t,"unmounted")},n)},q=e=>{const{type:t,el:n,anchor:r,transition:i}=e;if(t===Sr)return void H(n,r);if(t===Ar)return void I(e);const o=()=>{s(n),i&&!i.persisted&&i.afterLeave&&i.afterLeave()};if(1&e.shapeFlag&&i&&!i.persisted){const{leave:t,delayLeave:r}=i,s=()=>t(n,o);r?r(e.el,o,s):s()}else o()},H=(e,t)=>{let n;while(e!==t)n=f(e),s(e),e=n;s(t)},W=(e,t,n)=>{const{bum:i,scope:s,update:o,subTree:a,um:c}=e;i&&Object(r["n"])(i),s.stop(),o&&(o.active=!1,$(a,e,t,n)),c&&sr(c,t),sr(()=>{e.isUnmounted=!0},t),t&&t.pendingBranch&&!t.isUnmounted&&e.asyncDep&&!e.asyncResolved&&e.suspenseId===t.pendingId&&(t.deps--,0===t.deps&&t.resolve())},G=(e,t,n,r=!1,i=!1,s=0)=>{for(let o=s;o<e.length;o++)$(e[o],t,n,r,i)},K=e=>6&e.shapeFlag?K(e.component.subTree):128&e.shapeFlag?e.suspense.next():f(e.anchor||e.el),Y=(e,t,n)=>{null==e?t._vnode&&$(t._vnode,null,null,!0):v(t._vnode||null,e,t,null,null,null,n),gt(),t._vnode=e},Q={p:v,um:$,m:z,r:q,mt:D,mc:A,pc:U,pbc:R,n:K,o:e};let X,J;return t&&([X,J]=t(Q)),{render:Y,hydrate:X,createApp:nr(Y,X)}}function cr({effect:e,update:t},n){e.allowRecurse=t.allowRecurse=n}function lr(e,t,n=!1){const i=e.children,s=t.children;if(Object(r["o"])(i)&&Object(r["o"])(s))for(let r=0;r<i.length;r++){const e=i[r];let t=s[r];1&t.shapeFlag&&!t.dynamicChildren&&((t.patchFlag<=0||32===t.patchFlag)&&(t=s[r]=Zr(s[r]),t.el=e.el),n||lr(e,t))}}function ur(e){const t=e.slice(),n=[0];let r,i,s,o,a;const c=e.length;for(r=0;r<c;r++){const c=e[r];if(0!==c){if(i=n[n.length-1],e[i]<c){t[r]=i,n.push(r);continue}s=0,o=n.length-1;while(s<o)a=s+o>>1,e[n[a]]<c?s=a+1:o=a;c<e[n[s]]&&(s>0&&(t[r]=n[s-1]),n[s]=r)}}s=n.length,o=n[s-1];while(s-- >0)n[s]=o,o=t[o];return n}const hr=e=>e.__isTeleport,dr=e=>e&&(e.disabled||""===e.disabled),fr=e=>"undefined"!==typeof SVGElement&&e instanceof SVGElement,pr=(e,t)=>{const n=e&&e.to;if(Object(r["E"])(n)){if(t){const e=t(n);return e}return null}return n},gr={__isTeleport:!0,process(e,t,n,r,i,s,o,a,c,l){const{mc:u,pc:h,pbc:d,o:{insert:f,querySelector:p,createText:g,createComment:m}}=l,v=dr(t.props);let{shapeFlag:y,children:b,dynamicChildren:w}=t;if(null==e){const e=t.el=g(""),l=t.anchor=g("");f(e,n,r),f(l,n,r);const h=t.target=pr(t.props,p),d=t.targetAnchor=g("");h&&(f(d,h),o=o||fr(h));const m=(e,t)=>{16&y&&u(b,e,t,i,s,o,a,c)};v?m(n,l):h&&m(h,d)}else{t.el=e.el;const r=t.anchor=e.anchor,u=t.target=e.target,f=t.targetAnchor=e.targetAnchor,g=dr(e.props),m=g?n:u,y=g?r:f;if(o=o||fr(u),w?(d(e.dynamicChildren,w,m,i,s,o,a),lr(e,t,!0)):c||h(e,t,m,y,i,s,o,a,!1),v)g||mr(t,n,r,l,1);else if((t.props&&t.props.to)!==(e.props&&e.props.to)){const e=t.target=pr(t.props,p);e&&mr(t,e,null,l,0)}else g&&mr(t,u,f,l,1)}},remove(e,t,n,r,{um:i,o:{remove:s}},o){const{shapeFlag:a,children:c,anchor:l,targetAnchor:u,target:h,props:d}=e;if(h&&s(u),(o||!dr(d))&&(s(l),16&a))for(let f=0;f<c.length;f++){const e=c[f];i(e,t,n,!0,!!e.dynamicChildren)}},move:mr,hydrate:vr};function mr(e,t,n,{o:{insert:r},m:i},s=2){0===s&&r(e.targetAnchor,t,n);const{el:o,anchor:a,shapeFlag:c,children:l,props:u}=e,h=2===s;if(h&&r(o,t,n),(!h||dr(u))&&16&c)for(let d=0;d<l.length;d++)i(l[d],t,n,2);h&&r(a,t,n)}function vr(e,t,n,r,i,s,{o:{nextSibling:o,parentNode:a,querySelector:c}},l){const u=t.target=pr(t.props,c);if(u){const c=u._lpa||u.firstChild;16&t.shapeFlag&&(dr(t.props)?(t.anchor=l(o(e),t,a(e),n,r,i,s),t.targetAnchor=c):(t.anchor=o(e),t.targetAnchor=l(c,t,u,n,r,i,s)),u._lpa=t.targetAnchor&&o(t.targetAnchor))}return t.anchor&&o(t.anchor)}const yr=gr,br="components",wr="directives";function _r(e,t){return Tr(br,e,!0,t)||e}const Er=Symbol();function Or(e){return Tr(wr,e)}function Tr(e,t,n=!0,i=!1){const s=_t||fi;if(s){const n=s.type;if(e===br){const e=Ci(n);if(e&&(e===t||e===Object(r["e"])(t)||e===Object(r["f"])(Object(r["e"])(t))))return n}const o=Ir(s[e]||n[e],t)||Ir(s.appContext[e],t);return!o&&i?n:o}}function Ir(e,t){return e&&(e[t]||e[Object(r["e"])(t)]||e[Object(r["f"])(Object(r["e"])(t))])}const Sr=Symbol(void 0),kr=Symbol(void 0),Cr=Symbol(void 0),Ar=Symbol(void 0),xr=[];let Rr=null;function Nr(e=!1){xr.push(Rr=e?null:[])}function jr(){xr.pop(),Rr=xr[xr.length-1]||null}let Lr=1;function Dr(e){Lr+=e}function Pr(e){return e.dynamicChildren=Lr>0?Rr||r["a"]:null,jr(),Lr>0&&Rr&&Rr.push(e),e}function Mr(e,t,n,r,i,s){return Pr(qr(e,t,n,r,i,s,!0))}function Fr(e,t,n,r,i){return Pr(Hr(e,t,n,r,i,!0))}function Ur(e){return!!e&&!0===e.__v_isVNode}function Vr(e,t){return e.type===t.type&&e.key===t.key}const Br="__vInternal",zr=({key:e})=>null!=e?e:null,$r=({ref:e,ref_key:t,ref_for:n})=>null!=e?Object(r["E"])(e)||je(e)||Object(r["q"])(e)?{i:_t,r:e,k:t,f:!!n}:e:null;function qr(e,t=null,n=null,i=0,s=null,o=(e===Sr?0:1),a=!1,c=!1){const l={__v_isVNode:!0,__v_skip:!0,type:e,props:t,key:t&&zr(t),ref:t&&$r(t),scopeId:Et,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetAnchor:null,staticCount:0,shapeFlag:o,patchFlag:i,dynamicProps:s,dynamicChildren:null,appContext:null};return c?(ei(l,n),128&o&&e.normalize(l)):n&&(l.shapeFlag|=Object(r["E"])(n)?8:16),Lr>0&&!a&&Rr&&(l.patchFlag>0||6&o)&&32!==l.patchFlag&&Rr.push(l),l}const Hr=Wr;function Wr(e,t=null,n=null,i=0,s=null,o=!1){if(e&&e!==Er||(e=Cr),Ur(e)){const r=Kr(e,t,!0);return n&&ei(r,n),r}if(Ai(e)&&(e=e.__vccOpts),t){t=Gr(t);let{class:e,style:n}=t;e&&!Object(r["E"])(e)&&(t.class=Object(r["J"])(e)),Object(r["w"])(n)&&(Se(n)&&!Object(r["o"])(n)&&(n=Object(r["h"])({},n)),t.style=Object(r["K"])(n))}const a=Object(r["E"])(e)?1:jt(e)?128:hr(e)?64:Object(r["w"])(e)?4:Object(r["q"])(e)?2:0;return qr(e,t,n,i,s,a,o,!0)}function Gr(e){return e?Se(e)||Br in e?Object(r["h"])({},e):e:null}function Kr(e,t,n=!1){const{props:i,ref:s,patchFlag:o,children:a}=e,c=t?ti(i||{},t):i,l={__v_isVNode:!0,__v_skip:!0,type:e.type,props:c,key:c&&zr(c),ref:t&&t.ref?n&&s?Object(r["o"])(s)?s.concat($r(t)):[s,$r(t)]:$r(t):s,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:a,target:e.target,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:t&&e.type!==Sr?-1===o?16:16|o:o,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:e.transition,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&Kr(e.ssContent),ssFallback:e.ssFallback&&Kr(e.ssFallback),el:e.el,anchor:e.anchor};return l}function Yr(e=" ",t=0){return Hr(kr,null,e,t)}function Qr(e,t){const n=Hr(Ar,null,e);return n.staticCount=t,n}function Xr(e="",t=!1){return t?(Nr(),Fr(Cr,null,e)):Hr(Cr,null,e)}function Jr(e){return null==e||"boolean"===typeof e?Hr(Cr):Object(r["o"])(e)?Hr(Sr,null,e.slice()):"object"===typeof e?Zr(e):Hr(kr,null,String(e))}function Zr(e){return null===e.el||e.memo?e:Kr(e)}function ei(e,t){let n=0;const{shapeFlag:i}=e;if(null==t)t=null;else if(Object(r["o"])(t))n=16;else if("object"===typeof t){if(65&i){const n=t.default;return void(n&&(n._c&&(n._d=!1),ei(e,n()),n._c&&(n._d=!0)))}{n=32;const r=t._;r||Br in t?3===r&&_t&&(1===_t.slots._?t._=1:(t._=2,e.patchFlag|=1024)):t._ctx=_t}}else Object(r["q"])(t)?(t={default:t,_ctx:_t},n=32):(t=String(t),64&i?(n=16,t=[Yr(t)]):n=8);e.children=t,e.shapeFlag|=n}function ti(...e){const t={};for(let n=0;n<e.length;n++){const i=e[n];for(const e in i)if("class"===e)t.class!==i.class&&(t.class=Object(r["J"])([t.class,i.class]));else if("style"===e)t.style=Object(r["K"])([t.style,i.style]);else if(Object(r["x"])(e)){const n=t[e],s=i[e];!s||n===s||Object(r["o"])(n)&&n.includes(s)||(t[e]=n?[].concat(n,s):s)}else""!==e&&(t[e]=i[e])}return t}function ni(e,t,n,r=null){qe(e,t,7,[n,r])}function ri(e,t,n,i){let s;const o=n&&n[i];if(Object(r["o"])(e)||Object(r["E"])(e)){s=new Array(e.length);for(let n=0,r=e.length;n<r;n++)s[n]=t(e[n],n,void 0,o&&o[n])}else if("number"===typeof e){0,s=new Array(e);for(let n=0;n<e;n++)s[n]=t(n+1,n,void 0,o&&o[n])}else if(Object(r["w"])(e))if(e[Symbol.iterator])s=Array.from(e,(e,n)=>t(e,n,void 0,o&&o[n]));else{const n=Object.keys(e);s=new Array(n.length);for(let r=0,i=n.length;r<i;r++){const i=n[r];s[r]=t(e[i],i,r,o&&o[r])}}else s=[];return n&&(n[i]=s),s}function ii(e,t){for(let n=0;n<t.length;n++){const i=t[n];if(Object(r["o"])(i))for(let t=0;t<i.length;t++)e[i[t].name]=i[t].fn;else i&&(e[i.name]=i.fn)}return e}function si(e,t,n={},r,i){if(_t.isCE)return Hr("slot","default"===t?null:{name:t},r&&r());let s=e[t];s&&s._c&&(s._d=!1),Nr();const o=s&&oi(s(n)),a=Fr(Sr,{key:n.key||"_"+t},o||(r?r():[]),o&&1===e._?64:-2);return!i&&a.scopeId&&(a.slotScopeIds=[a.scopeId+"-s"]),s&&s._c&&(s._d=!0),a}function oi(e){return e.some(e=>!Ur(e)||e.type!==Cr&&!(e.type===Sr&&!oi(e.children)))?e:null}const ai=e=>e?vi(e)?ki(e)||e.proxy:ai(e.parent):null,ci=Object(r["h"])(Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>e.props,$attrs:e=>e.attrs,$slots:e=>e.slots,$refs:e=>e.refs,$parent:e=>ai(e.parent),$root:e=>ai(e.root),$emit:e=>e.emit,$options:e=>kn(e),$forceUpdate:e=>()=>ct(e.update),$nextTick:e=>ot.bind(e.proxy),$watch:e=>Vt.bind(e)}),li={get({_:e},t){const{ctx:n,setupState:i,data:s,props:o,accessCache:a,type:c,appContext:l}=e;let u;if("$"!==t[0]){const c=a[t];if(void 0!==c)switch(c){case 1:return i[t];case 2:return s[t];case 4:return n[t];case 3:return o[t]}else{if(i!==r["b"]&&Object(r["k"])(i,t))return a[t]=1,i[t];if(s!==r["b"]&&Object(r["k"])(s,t))return a[t]=2,s[t];if((u=e.propsOptions[0])&&Object(r["k"])(u,t))return a[t]=3,o[t];if(n!==r["b"]&&Object(r["k"])(n,t))return a[t]=4,n[t];En&&(a[t]=0)}}const h=ci[t];let d,f;return h?("$attrs"===t&&I(e,"get",t),h(e)):(d=c.__cssModules)&&(d=d[t])?d:n!==r["b"]&&Object(r["k"])(n,t)?(a[t]=4,n[t]):(f=l.config.globalProperties,Object(r["k"])(f,t)?f[t]:void 0)},set({_:e},t,n){const{data:i,setupState:s,ctx:o}=e;return s!==r["b"]&&Object(r["k"])(s,t)?(s[t]=n,!0):i!==r["b"]&&Object(r["k"])(i,t)?(i[t]=n,!0):!Object(r["k"])(e.props,t)&&(("$"!==t[0]||!(t.slice(1)in e))&&(o[t]=n,!0))},has({_:{data:e,setupState:t,accessCache:n,ctx:i,appContext:s,propsOptions:o}},a){let c;return!!n[a]||e!==r["b"]&&Object(r["k"])(e,a)||t!==r["b"]&&Object(r["k"])(t,a)||(c=o[0])&&Object(r["k"])(c,a)||Object(r["k"])(i,a)||Object(r["k"])(ci,a)||Object(r["k"])(s.config.globalProperties,a)},defineProperty(e,t,n){return null!=n.get?this.set(e,t,n.get(),null):null!=n.value&&this.set(e,t,n.value,null),Reflect.defineProperty(e,t,n)}};const ui=er();let hi=0;function di(e,t,n){const i=e.type,o=(t?t.appContext:e.appContext)||ui,a={uid:hi++,vnode:e,type:i,parent:t,appContext:o,root:null,next:null,subTree:null,effect:null,update:null,scope:new s(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(o.provides),accessCache:null,renderCache:[],components:null,directives:null,propsOptions:Vn(i,o),emitsOptions:bt(i,o),emit:null,emitted:null,propsDefaults:r["b"],inheritAttrs:i.inheritAttrs,ctx:r["b"],data:r["b"],props:r["b"],attrs:r["b"],slots:r["b"],refs:r["b"],setupState:r["b"],setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return a.ctx={_:a},a.root=t?t.root:a,a.emit=yt.bind(null,a),e.ce&&e.ce(a),a}let fi=null;const pi=()=>fi||_t,gi=e=>{fi=e,e.scope.on()},mi=()=>{fi&&fi.scope.off(),fi=null};function vi(e){return 4&e.vnode.shapeFlag}let yi,bi,wi=!1;function _i(e,t=!1){wi=t;const{props:n,children:r}=e.vnode,i=vi(e);Pn(e,n,i,t),Qn(e,r);const s=i?Ei(e,t):void 0;return wi=!1,s}function Ei(e,t){const n=e.type;e.accessCache=Object.create(null),e.proxy=Ce(new Proxy(e.ctx,li));const{setup:i}=n;if(i){const n=e.setupContext=i.length>1?Si(e):null;gi(e),O();const s=$e(i,e,0,[e.props,n]);if(T(),mi(),Object(r["z"])(s)){if(s.then(mi,mi),t)return s.then(n=>{Oi(e,n,t)}).catch(t=>{He(t,e,0)});e.asyncDep=s}else Oi(e,s,t)}else Ti(e,t)}function Oi(e,t,n){Object(r["q"])(t)?e.type.__ssrInlineRender?e.ssrRender=t:e.render=t:Object(r["w"])(t)&&(e.setupState=Ve(t)),Ti(e,n)}function Ti(e,t,n){const i=e.type;if(!e.render){if(!t&&yi&&!i.render){const t=i.template;if(t){0;const{isCustomElement:n,compilerOptions:s}=e.appContext.config,{delimiters:o,compilerOptions:a}=i,c=Object(r["h"])(Object(r["h"])({isCustomElement:n,delimiters:o},s),a);i.render=yi(t,c)}}e.render=i.render||r["d"],bi&&bi(e)}gi(e),O(),On(e),T(),mi()}function Ii(e){return new Proxy(e.attrs,{get(t,n){return I(e,"get","$attrs"),t[n]}})}function Si(e){const t=t=>{e.exposed=t||{}};let n;return{get attrs(){return n||(n=Ii(e))},slots:e.slots,emit:e.emit,expose:t}}function ki(e){if(e.exposed)return e.exposeProxy||(e.exposeProxy=new Proxy(Ve(Ce(e.exposed)),{get(t,n){return n in t?t[n]:n in ci?ci[n](e):void 0}}))}function Ci(e){return Object(r["q"])(e)&&e.displayName||e.name}function Ai(e){return Object(r["q"])(e)&&"__vccOpts"in e}const xi=(e,t)=>ze(e,t,wi);function Ri(e,t,n){const i=arguments.length;return 2===i?Object(r["w"])(t)&&!Object(r["o"])(t)?Ur(t)?Hr(e,null,[t]):Hr(e,t):Hr(e,null,t):(i>3?n=Array.prototype.slice.call(arguments,2):3===i&&Ur(n)&&(n=[n]),Hr(e,t,n))}Symbol("");const Ni="3.2.31",ji="http://www.w3.org/2000/svg",Li="undefined"!==typeof document?document:null,Di=Li&&Li.createElement("template"),Pi={insert:(e,t,n)=>{t.insertBefore(e,n||null)},remove:e=>{const t=e.parentNode;t&&t.removeChild(e)},createElement:(e,t,n,r)=>{const i=t?Li.createElementNS(ji,e):Li.createElement(e,n?{is:n}:void 0);return"select"===e&&r&&null!=r.multiple&&i.setAttribute("multiple",r.multiple),i},createText:e=>Li.createTextNode(e),createComment:e=>Li.createComment(e),setText:(e,t)=>{e.nodeValue=t},setElementText:(e,t)=>{e.textContent=t},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>Li.querySelector(e),setScopeId(e,t){e.setAttribute(t,"")},cloneNode(e){const t=e.cloneNode(!0);return"_value"in e&&(t._value=e._value),t},insertStaticContent(e,t,n,r,i,s){const o=n?n.previousSibling:t.lastChild;if(i&&(i===s||i.nextSibling)){while(1)if(t.insertBefore(i.cloneNode(!0),n),i===s||!(i=i.nextSibling))break}else{Di.innerHTML=r?`<svg>${e}</svg>`:e;const i=Di.content;if(r){const e=i.firstChild;while(e.firstChild)i.appendChild(e.firstChild);i.removeChild(e)}t.insertBefore(i,n)}return[o?o.nextSibling:t.firstChild,n?n.previousSibling:t.lastChild]}};function Mi(e,t,n){const r=e._vtc;r&&(t=(t?[t,...r]:[...r]).join(" ")),null==t?e.removeAttribute("class"):n?e.setAttribute("class",t):e.className=t}function Fi(e,t,n){const i=e.style,s=Object(r["E"])(n);if(n&&!s){for(const e in n)Vi(i,e,n[e]);if(t&&!Object(r["E"])(t))for(const e in t)null==n[e]&&Vi(i,e,"")}else{const r=i.display;s?t!==n&&(i.cssText=n):t&&e.removeAttribute("style"),"_vod"in e&&(i.display=r)}}const Ui=/\s*!important$/;function Vi(e,t,n){if(Object(r["o"])(n))n.forEach(n=>Vi(e,t,n));else if(t.startsWith("--"))e.setProperty(t,n);else{const i=$i(e,t);Ui.test(n)?e.setProperty(Object(r["l"])(i),n.replace(Ui,""),"important"):e[i]=n}}const Bi=["Webkit","Moz","ms"],zi={};function $i(e,t){const n=zi[t];if(n)return n;let i=Object(r["e"])(t);if("filter"!==i&&i in e)return zi[t]=i;i=Object(r["f"])(i);for(let r=0;r<Bi.length;r++){const n=Bi[r]+i;if(n in e)return zi[t]=n}return t}const qi="http://www.w3.org/1999/xlink";function Hi(e,t,n,i,s){if(i&&t.startsWith("xlink:"))null==n?e.removeAttributeNS(qi,t.slice(6,t.length)):e.setAttributeNS(qi,t,n);else{const i=Object(r["D"])(t);null==n||i&&!Object(r["m"])(n)?e.removeAttribute(t):e.setAttribute(t,i?"":n)}}function Wi(e,t,n,i,s,o,a){if("innerHTML"===t||"textContent"===t)return i&&a(i,s,o),void(e[t]=null==n?"":n);if("value"===t&&"PROGRESS"!==e.tagName&&!e.tagName.includes("-")){e._value=n;const r=null==n?"":n;return e.value===r&&"OPTION"!==e.tagName||(e.value=r),void(null==n&&e.removeAttribute(t))}if(""===n||null==n){const i=typeof e[t];if("boolean"===i)return void(e[t]=Object(r["m"])(n));if(null==n&&"string"===i)return e[t]="",void e.removeAttribute(t);if("number"===i){try{e[t]=0}catch(c){}return void e.removeAttribute(t)}}try{e[t]=n}catch(l){0}}let Gi=Date.now,Ki=!1;if("undefined"!==typeof window){Gi()>document.createEvent("Event").timeStamp&&(Gi=()=>performance.now());const e=navigator.userAgent.match(/firefox\/(\d+)/i);Ki=!!(e&&Number(e[1])<=53)}let Yi=0;const Qi=Promise.resolve(),Xi=()=>{Yi=0},Ji=()=>Yi||(Qi.then(Xi),Yi=Gi());function Zi(e,t,n,r){e.addEventListener(t,n,r)}function es(e,t,n,r){e.removeEventListener(t,n,r)}function ts(e,t,n,r,i=null){const s=e._vei||(e._vei={}),o=s[t];if(r&&o)o.value=r;else{const[n,a]=rs(t);if(r){const o=s[t]=is(r,i);Zi(e,n,o,a)}else o&&(es(e,n,o,a),s[t]=void 0)}}const ns=/(?:Once|Passive|Capture)$/;function rs(e){let t;if(ns.test(e)){let n;t={};while(n=e.match(ns))e=e.slice(0,e.length-n[0].length),t[n[0].toLowerCase()]=!0}return[Object(r["l"])(e.slice(2)),t]}function is(e,t){const n=e=>{const r=e.timeStamp||Gi();(Ki||r>=n.attached-1)&&qe(ss(e,n.value),t,5,[e])};return n.value=e,n.attached=Ji(),n}function ss(e,t){if(Object(r["o"])(t)){const n=e.stopImmediatePropagation;return e.stopImmediatePropagation=()=>{n.call(e),e._stopped=!0},t.map(e=>t=>!t._stopped&&e&&e(t))}return t}const os=/^on[a-z]/,as=(e,t,n,i,s=!1,o,a,c,l)=>{"class"===t?Mi(e,i,s):"style"===t?Fi(e,n,i):Object(r["x"])(t)?Object(r["v"])(t)||ts(e,t,n,i,a):("."===t[0]?(t=t.slice(1),1):"^"===t[0]?(t=t.slice(1),0):cs(e,t,i,s))?Wi(e,t,i,o,a,c,l):("true-value"===t?e._trueValue=i:"false-value"===t&&(e._falseValue=i),Hi(e,t,i,s))};function cs(e,t,n,i){return i?"innerHTML"===t||"textContent"===t||!!(t in e&&os.test(t)&&Object(r["q"])(n)):"spellcheck"!==t&&"draggable"!==t&&("form"!==t&&(("list"!==t||"INPUT"!==e.tagName)&&(("type"!==t||"TEXTAREA"!==e.tagName)&&((!os.test(t)||!Object(r["E"])(n))&&t in e))))}"undefined"!==typeof HTMLElement&&HTMLElement;const ls="transition",us="animation",hs=(e,{slots:t})=>Ri(Wt,gs(e),t);hs.displayName="Transition";const ds={name:String,type:String,css:{type:Boolean,default:!0},duration:[String,Number,Object],enterFromClass:String,enterActiveClass:String,enterToClass:String,appearFromClass:String,appearActiveClass:String,appearToClass:String,leaveFromClass:String,leaveActiveClass:String,leaveToClass:String},fs=(hs.props=Object(r["h"])({},Wt.props,ds),(e,t=[])=>{Object(r["o"])(e)?e.forEach(e=>e(...t)):e&&e(...t)}),ps=e=>!!e&&(Object(r["o"])(e)?e.some(e=>e.length>1):e.length>1);function gs(e){const t={};for(const r in e)r in ds||(t[r]=e[r]);if(!1===e.css)return t;const{name:n="v",type:i,duration:s,enterFromClass:o=n+"-enter-from",enterActiveClass:a=n+"-enter-active",enterToClass:c=n+"-enter-to",appearFromClass:l=o,appearActiveClass:u=a,appearToClass:h=c,leaveFromClass:d=n+"-leave-from",leaveActiveClass:f=n+"-leave-active",leaveToClass:p=n+"-leave-to"}=e,g=ms(s),m=g&&g[0],v=g&&g[1],{onBeforeEnter:y,onEnter:b,onEnterCancelled:w,onLeave:_,onLeaveCancelled:E,onBeforeAppear:O=y,onAppear:T=b,onAppearCancelled:I=w}=t,S=(e,t,n)=>{bs(e,t?h:c),bs(e,t?u:a),n&&n()},k=(e,t)=>{bs(e,p),bs(e,f),t&&t()},C=e=>(t,n)=>{const r=e?T:b,s=()=>S(t,e,n);fs(r,[t,s]),ws(()=>{bs(t,e?l:o),ys(t,e?h:c),ps(r)||Es(t,i,m,s)})};return Object(r["h"])(t,{onBeforeEnter(e){fs(y,[e]),ys(e,o),ys(e,a)},onBeforeAppear(e){fs(O,[e]),ys(e,l),ys(e,u)},onEnter:C(!1),onAppear:C(!0),onLeave(e,t){const n=()=>k(e,t);ys(e,d),Ss(),ys(e,f),ws(()=>{bs(e,d),ys(e,p),ps(_)||Es(e,i,v,n)}),fs(_,[e,n])},onEnterCancelled(e){S(e,!1),fs(w,[e])},onAppearCancelled(e){S(e,!0),fs(I,[e])},onLeaveCancelled(e){k(e),fs(E,[e])}})}function ms(e){if(null==e)return null;if(Object(r["w"])(e))return[vs(e.enter),vs(e.leave)];{const t=vs(e);return[t,t]}}function vs(e){const t=Object(r["O"])(e);return t}function ys(e,t){t.split(/\s+/).forEach(t=>t&&e.classList.add(t)),(e._vtc||(e._vtc=new Set)).add(t)}function bs(e,t){t.split(/\s+/).forEach(t=>t&&e.classList.remove(t));const{_vtc:n}=e;n&&(n.delete(t),n.size||(e._vtc=void 0))}function ws(e){requestAnimationFrame(()=>{requestAnimationFrame(e)})}let _s=0;function Es(e,t,n,r){const i=e._endId=++_s,s=()=>{i===e._endId&&r()};if(n)return setTimeout(s,n);const{type:o,timeout:a,propCount:c}=Os(e,t);if(!o)return r();const l=o+"end";let u=0;const h=()=>{e.removeEventListener(l,d),s()},d=t=>{t.target===e&&++u>=c&&h()};setTimeout(()=>{u<c&&h()},a+1),e.addEventListener(l,d)}function Os(e,t){const n=window.getComputedStyle(e),r=e=>(n[e]||"").split(", "),i=r(ls+"Delay"),s=r(ls+"Duration"),o=Ts(i,s),a=r(us+"Delay"),c=r(us+"Duration"),l=Ts(a,c);let u=null,h=0,d=0;t===ls?o>0&&(u=ls,h=o,d=s.length):t===us?l>0&&(u=us,h=l,d=c.length):(h=Math.max(o,l),u=h>0?o>l?ls:us:null,d=u?u===ls?s.length:c.length:0);const f=u===ls&&/\b(transform|all)(,|$)/.test(n[ls+"Property"]);return{type:u,timeout:h,propCount:d,hasTransform:f}}function Ts(e,t){while(e.length<t.length)e=e.concat(e);return Math.max(...t.map((t,n)=>Is(t)+Is(e[n])))}function Is(e){return 1e3*Number(e.slice(0,-1).replace(",","."))}function Ss(){return document.body.offsetHeight}new WeakMap,new WeakMap;const ks=e=>{const t=e.props["onUpdate:modelValue"];return Object(r["o"])(t)?e=>Object(r["n"])(t,e):t};function Cs(e){e.target.composing=!0}function As(e){const t=e.target;t.composing&&(t.composing=!1,xs(t,"input"))}function xs(e,t){const n=document.createEvent("HTMLEvents");n.initEvent(t,!0,!0),e.dispatchEvent(n)}const Rs={created(e,{modifiers:{lazy:t,trim:n,number:i}},s){e._assign=ks(s);const o=i||s.props&&"number"===s.props.type;Zi(e,t?"change":"input",t=>{if(t.target.composing)return;let i=e.value;n?i=i.trim():o&&(i=Object(r["O"])(i)),e._assign(i)}),n&&Zi(e,"change",()=>{e.value=e.value.trim()}),t||(Zi(e,"compositionstart",Cs),Zi(e,"compositionend",As),Zi(e,"change",As))},mounted(e,{value:t}){e.value=null==t?"":t},beforeUpdate(e,{value:t,modifiers:{lazy:n,trim:i,number:s}},o){if(e._assign=ks(o),e.composing)return;if(document.activeElement===e){if(n)return;if(i&&e.value.trim()===t)return;if((s||"number"===e.type)&&Object(r["O"])(e.value)===t)return}const a=null==t?"":t;e.value!==a&&(e.value=a)}};const Ns=["ctrl","shift","alt","meta"],js={stop:e=>e.stopPropagation(),prevent:e=>e.preventDefault(),self:e=>e.target!==e.currentTarget,ctrl:e=>!e.ctrlKey,shift:e=>!e.shiftKey,alt:e=>!e.altKey,meta:e=>!e.metaKey,left:e=>"button"in e&&0!==e.button,middle:e=>"button"in e&&1!==e.button,right:e=>"button"in e&&2!==e.button,exact:(e,t)=>Ns.some(n=>e[n+"Key"]&&!t.includes(n))},Ls=(e,t)=>(n,...r)=>{for(let e=0;e<t.length;e++){const r=js[t[e]];if(r&&r(n,t))return}return e(n,...r)},Ds={beforeMount(e,{value:t},{transition:n}){e._vod="none"===e.style.display?"":e.style.display,n&&t?n.beforeEnter(e):Ps(e,t)},mounted(e,{value:t},{transition:n}){n&&t&&n.enter(e)},updated(e,{value:t,oldValue:n},{transition:r}){!t!==!n&&(r?t?(r.beforeEnter(e),Ps(e,!0),r.enter(e)):r.leave(e,()=>{Ps(e,!1)}):Ps(e,t))},beforeUnmount(e,{value:t}){Ps(e,t)}};function Ps(e,t){e.style.display=t?e._vod:"none"}const Ms=Object(r["h"])({patchProp:as},Pi);let Fs;function Us(){return Fs||(Fs=or(Ms))}const Vs=(...e)=>{const t=Us().createApp(...e);const{mount:n}=t;return t.mount=e=>{const i=Bs(e);if(!i)return;const s=t._component;Object(r["q"])(s)||s.render||s.template||(s.template=i.innerHTML),i.innerHTML="";const o=n(i,!1,i instanceof SVGElement);return i instanceof Element&&(i.removeAttribute("v-cloak"),i.setAttribute("data-v-app","")),o},t};function Bs(e){if(Object(r["E"])(e)){const t=document.querySelector(e);return t}return e}},"7aac":function(e,t,n){"use strict";var r=n("c532");e.exports=r.isStandardBrowserEnv()?function(){return{write:function(e,t,n,i,s,o){var a=[];a.push(e+"="+encodeURIComponent(t)),r.isNumber(n)&&a.push("expires="+new Date(n).toGMTString()),r.isString(i)&&a.push("path="+i),r.isString(s)&&a.push("domain="+s),!0===o&&a.push("secure"),document.cookie=a.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}}():function(){return{write:function(){},read:function(){return null},remove:function(){}}}()},"7b0b":function(e,t,n){var r=n("da84"),i=n("1d80"),s=r.Object;e.exports=function(e){return s(i(e))}},"7c73":function(e,t,n){var r,i=n("825a"),s=n("37e8"),o=n("7839"),a=n("d012"),c=n("1be4"),l=n("cc12"),u=n("f772"),h=">",d="<",f="prototype",p="script",g=u("IE_PROTO"),m=function(){},v=function(e){return d+p+h+e+d+"/"+p+h},y=function(e){e.write(v("")),e.close();var t=e.parentWindow.Object;return e=null,t},b=function(){var e,t=l("iframe"),n="java"+p+":";return t.style.display="none",c.appendChild(t),t.src=String(n),e=t.contentWindow.document,e.open(),e.write(v("document.F=Object")),e.close(),e.F},w=function(){try{r=new ActiveXObject("htmlfile")}catch(t){}w="undefined"!=typeof document?document.domain&&r?y(r):b():y(r);var e=o.length;while(e--)delete w[f][o[e]];return w()};a[g]=!0,e.exports=Object.create||function(e,t){var n;return null!==e?(m[f]=i(e),n=new m,m[f]=null,n[g]=e):n=w(),void 0===t?n:s.f(n,t)}},"7dd0":function(e,t,n){"use strict";var r=n("23e7"),i=n("c65b"),s=n("c430"),o=n("5e77"),a=n("1626"),c=n("9ed3"),l=n("e163"),u=n("d2bb"),h=n("d44e"),d=n("9112"),f=n("6eeb"),p=n("b622"),g=n("3f8c"),m=n("ae93"),v=o.PROPER,y=o.CONFIGURABLE,b=m.IteratorPrototype,w=m.BUGGY_SAFARI_ITERATORS,_=p("iterator"),E="keys",O="values",T="entries",I=function(){return this};e.exports=function(e,t,n,o,p,m,S){c(n,t,o);var k,C,A,x=function(e){if(e===p&&D)return D;if(!w&&e in j)return j[e];switch(e){case E:return function(){return new n(this,e)};case O:return function(){return new n(this,e)};case T:return function(){return new n(this,e)}}return function(){return new n(this)}},R=t+" Iterator",N=!1,j=e.prototype,L=j[_]||j["@@iterator"]||p&&j[p],D=!w&&L||x(p),P="Array"==t&&j.entries||L;if(P&&(k=l(P.call(new e)),k!==Object.prototype&&k.next&&(s||l(k)===b||(u?u(k,b):a(k[_])||f(k,_,I)),h(k,R,!0,!0),s&&(g[R]=I))),v&&p==O&&L&&L.name!==O&&(!s&&y?d(j,"name",O):(N=!0,D=function(){return i(L,this)})),p)if(C={values:x(O),keys:m?D:x(E),entries:x(T)},S)for(A in C)(w||N||!(A in j))&&f(j,A,C[A]);else r({target:t,proto:!0,forced:w||N},C);return s&&!S||j[_]===D||f(j,_,D,{name:p}),g[t]=D,C}},"7ded":function(e,t,n){"use strict";n.d(t,"a",(function(){return v}));var r=n("1fd5"),i=n("22e5"),s=n("589b"),o=n("e691");
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class a{constructor(e,t){this._delegate=e,this.firebase=t,Object(s["_addComponent"])(e,new i["a"]("app-compat",()=>this,"PUBLIC")),this.container=e.container}get automaticDataCollectionEnabled(){return this._delegate.automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this._delegate.automaticDataCollectionEnabled=e}get name(){return this._delegate.name}get options(){return this._delegate.options}delete(){return new Promise(e=>{this._delegate.checkDestroyed(),e()}).then(()=>(this.firebase.INTERNAL.removeApp(this.name),Object(s["deleteApp"])(this._delegate)))}_getService(e,t=s["_DEFAULT_ENTRY_NAME"]){var n;this._delegate.checkDestroyed();const r=this._delegate.container.getProvider(e);return r.isInitialized()||"EXPLICIT"!==(null===(n=r.getComponent())||void 0===n?void 0:n.instantiationMode)||r.initialize(),r.getImmediate({identifier:t})}_removeServiceInstance(e,t=s["_DEFAULT_ENTRY_NAME"]){this._delegate.container.getProvider(e).clearInstance(t)}_addComponent(e){Object(s["_addComponent"])(this._delegate,e)}_addOrOverwriteComponent(e){Object(s["_addOrOverwriteComponent"])(this._delegate,e)}toJSON(){return{name:this.name,automaticDataCollectionEnabled:this.automaticDataCollectionEnabled,options:this.options}}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const c={["no-app"]:"No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()",["invalid-app-argument"]:"firebase.{$appName}() takes either no argument or a Firebase App instance."},l=new r["b"]("app-compat","Firebase",c);
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function u(e){const t={},n={__esModule:!0,initializeApp:a,app:o,registerVersion:s["registerVersion"],setLogLevel:s["setLogLevel"],onLog:s["onLog"],apps:null,SDK_VERSION:s["SDK_VERSION"],INTERNAL:{registerComponent:u,removeApp:i,useAsService:h,modularAPIs:s}};function i(e){delete t[e]}function o(e){if(e=e||s["_DEFAULT_ENTRY_NAME"],!Object(r["f"])(t,e))throw l.create("no-app",{appName:e});return t[e]}function a(i,o={}){const a=s["initializeApp"](i,o);if(Object(r["f"])(t,a.name))return t[a.name];const c=new e(a,n);return t[a.name]=c,c}function c(){return Object.keys(t).map(e=>t[e])}function u(t){const i=t.name,a=i.replace("-compat","");if(s["_registerComponent"](t)&&"PUBLIC"===t.type){const s=(e=o())=>{if("function"!==typeof e[a])throw l.create("invalid-app-argument",{appName:i});return e[a]()};void 0!==t.serviceProps&&Object(r["j"])(s,t.serviceProps),n[a]=s,e.prototype[a]=function(...e){const n=this._getService.bind(this,i);return n.apply(this,t.multipleInstances?e:[])}}return"PUBLIC"===t.type?n[a]:null}function h(e,t){if("serverAuth"===t)return null;const n=t;return n}return n["default"]=n,Object.defineProperty(n,"apps",{get:c}),o["App"]=e,n}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function h(){const e=u(a);function t(t){Object(r["j"])(e,t)}return e.INTERNAL=Object.assign(Object.assign({},e.INTERNAL),{createFirebaseNamespace:h,extendNamespace:t,createSubscribe:r["h"],ErrorFactory:r["b"],deepExtend:r["j"]}),e}const d=h(),f=new o["b"]("@firebase/app-compat"),p="@firebase/app-compat",g="0.1.32";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function m(e){Object(s["registerVersion"])(p,g,e)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */if(Object(r["n"])()&&void 0!==self.firebase){f.warn("\n    Warning: Firebase is already defined in the global scope. Please make sure\n    Firebase library is only loaded once.\n  ");const e=self.firebase.SDK_VERSION;e&&e.indexOf("LITE")>=0&&f.warn("\n    Warning: You are trying to load Firebase while using Firebase Performance standalone script.\n    You should load Firebase Performance with this instance of Firebase to avoid loading duplicate code.\n    ")}const v=d;m()},"7f9a":function(e,t,n){var r=n("da84"),i=n("1626"),s=n("8925"),o=r.WeakMap;e.exports=i(o)&&/native code/.test(s(o))},"825a":function(e,t,n){var r=n("da84"),i=n("861d"),s=r.String,o=r.TypeError;e.exports=function(e){if(i(e))return e;throw o(s(e)+" is not an object")}},8398:function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));var r=n("7a23"),i={name:"InputText",inheritAttrs:!1,emits:["update:modelValue"],props:{modelValue:null},methods:{onInput(e){this.$emit("update:modelValue",e.target.value)}},computed:{filled(){return null!=this.modelValue&&this.modelValue.toString().length>0}}};const s=["value"];function o(e,t,n,i,o,a){return Object(r["B"])(),Object(r["h"])("input",Object(r["s"])({class:["p-inputtext p-component",{"p-filled":a.filled}],value:n.modelValue,onInput:t[0]||(t[0]=(...e)=>a.onInput&&a.onInput(...e))},e.$attrs),null,16,s)}i.render=o},"83ab":function(e,t,n){var r=n("d039");e.exports=!r((function(){return 7!=Object.defineProperty({},1,{get:function(){return 7}})[1]}))},"83b9":function(e,t,n){"use strict";var r=n("d925"),i=n("e683");e.exports=function(e,t){return e&&!r(t)?i(e,t):t}},"848b":function(e,t,n){"use strict";var r=n("5cce").version,i=n("7917"),s={};["object","boolean","number","function","string","symbol"].forEach((function(e,t){s[e]=function(n){return typeof n===e||"a"+(t<1?"n ":" ")+e}}));var o={};function a(e,t,n){if("object"!==typeof e)throw new i("options must be an object",i.ERR_BAD_OPTION_VALUE);var r=Object.keys(e),s=r.length;while(s-- >0){var o=r[s],a=t[o];if(a){var c=e[o],l=void 0===c||a(c,o,e);if(!0!==l)throw new i("option "+o+" must be "+l,i.ERR_BAD_OPTION_VALUE)}else if(!0!==n)throw new i("Unknown option "+o,i.ERR_BAD_OPTION)}}s.transitional=function(e,t,n){function s(e,t){return"[Axios v"+r+"] Transitional option '"+e+"'"+t+(n?". "+n:"")}return function(n,r,a){if(!1===e)throw new i(s(r," has been removed"+(t?" in "+t:"")),i.ERR_DEPRECATED);return t&&!o[r]&&(o[r]=!0,console.warn(s(r," has been deprecated since v"+t+" and will be removed in the near future"))),!e||e(n,r,a)}},e.exports={assertOptions:a,validators:s}},"861d":function(e,t,n){var r=n("1626");e.exports=function(e){return"object"==typeof e?null!==e:r(e)}},8925:function(e,t,n){var r=n("e330"),i=n("1626"),s=n("c6cd"),o=r(Function.toString);i(s.inspectSource)||(s.inspectSource=function(e){return o(e)}),e.exports=s.inspectSource},"8df4":function(e,t,n){"use strict";var r=n("fb60");function i(e){if("function"!==typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise((function(e){t=e}));var n=this;this.promise.then((function(e){if(n._listeners){var t,r=n._listeners.length;for(t=0;t<r;t++)n._listeners[t](e);n._listeners=null}})),this.promise.then=function(e){var t,r=new Promise((function(e){n.subscribe(e),t=e})).then(e);return r.cancel=function(){n.unsubscribe(t)},r},e((function(e){n.reason||(n.reason=new r(e),t(n.reason))}))}i.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},i.prototype.subscribe=function(e){this.reason?e(this.reason):this._listeners?this._listeners.push(e):this._listeners=[e]},i.prototype.unsubscribe=function(e){if(this._listeners){var t=this._listeners.indexOf(e);-1!==t&&this._listeners.splice(t,1)}},i.source=function(){var e,t=new i((function(t){e=t}));return{token:t,cancel:e}},e.exports=i},"8f6b":function(e,t,n){"use strict";(function(e){n.d(t,"a",(function(){return Cr})),n.d(t,"b",(function(){return xr})),n.d(t,"c",(function(){return Ar})),n.d(t,"d",(function(){return Nr})),n.d(t,"e",(function(){return Rr})),n.d(t,"f",(function(){return jr})),n.d(t,"g",(function(){return Lr})),n.d(t,"h",(function(){return Sr})),n.d(t,"i",(function(){return kr}));var r,i="undefined"!==typeof globalThis?globalThis:"undefined"!==typeof window?window:"undefined"!==typeof e?e:"undefined"!==typeof self?self:{},s={},o=o||{},a=i||self;function c(){}function l(e){var t=typeof e;return t="object"!=t?t:e?Array.isArray(e)?"array":t:"null","array"==t||"object"==t&&"number"==typeof e.length}function u(e){var t=typeof e;return"object"==t&&null!=e||"function"==t}function h(e){return Object.prototype.hasOwnProperty.call(e,d)&&e[d]||(e[d]=++f)}var d="closure_uid_"+(1e9*Math.random()>>>0),f=0;function p(e,t,n){return e.call.apply(e.bind,arguments)}function g(e,t,n){if(!e)throw Error();if(2<arguments.length){var r=Array.prototype.slice.call(arguments,2);return function(){var n=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(n,r),e.apply(t,n)}}return function(){return e.apply(t,arguments)}}function m(e,t,n){return m=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?p:g,m.apply(null,arguments)}function v(e,t){var n=Array.prototype.slice.call(arguments,1);return function(){var t=n.slice();return t.push.apply(t,arguments),e.apply(this,t)}}function y(e,t){function n(){}n.prototype=t.prototype,e.Z=t.prototype,e.prototype=new n,e.prototype.constructor=e,e.Vb=function(e,n,r){for(var i=Array(arguments.length-2),s=2;s<arguments.length;s++)i[s-2]=arguments[s];return t.prototype[n].apply(e,i)}}function b(){this.s=this.s,this.o=this.o}var w=0,_={};b.prototype.s=!1,b.prototype.na=function(){if(!this.s&&(this.s=!0,this.M(),0!=w)){var e=h(this);delete _[e]}},b.prototype.M=function(){if(this.o)for(;this.o.length;)this.o.shift()()};const E=Array.prototype.indexOf?function(e,t){return Array.prototype.indexOf.call(e,t,void 0)}:function(e,t){if("string"===typeof e)return"string"!==typeof t||1!=t.length?-1:e.indexOf(t,0);for(let n=0;n<e.length;n++)if(n in e&&e[n]===t)return n;return-1},O=Array.prototype.forEach?function(e,t,n){Array.prototype.forEach.call(e,t,n)}:function(e,t,n){const r=e.length,i="string"===typeof e?e.split(""):e;for(let s=0;s<r;s++)s in i&&t.call(n,i[s],s,e)};function T(e){e:{var t=zn;const n=e.length,r="string"===typeof e?e.split(""):e;for(let i=0;i<n;i++)if(i in r&&t.call(void 0,r[i],i,e)){t=i;break e}t=-1}return 0>t?null:"string"===typeof e?e.charAt(t):e[t]}function I(e){return Array.prototype.concat.apply([],arguments)}function S(e){const t=e.length;if(0<t){const n=Array(t);for(let r=0;r<t;r++)n[r]=e[r];return n}return[]}function k(e){return/^[\s\xa0]*$/.test(e)}var C,A=String.prototype.trim?function(e){return e.trim()}:function(e){return/^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(e)[1]};function x(e,t){return-1!=e.indexOf(t)}function R(e,t){return e<t?-1:e>t?1:0}e:{var N=a.navigator;if(N){var j=N.userAgent;if(j){C=j;break e}}C=""}function L(e,t,n){for(const r in e)t.call(n,e[r],r,e)}function D(e){const t={};for(const n in e)t[n]=e[n];return t}var P="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function M(e,t){let n,r;for(let i=1;i<arguments.length;i++){for(n in r=arguments[i],r)e[n]=r[n];for(let t=0;t<P.length;t++)n=P[t],Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}}function F(e){return F[" "](e),e}function U(e){var t=J;return Object.prototype.hasOwnProperty.call(t,9)?t[9]:t[9]=e(9)}F[" "]=c;var V,B=x(C,"Opera"),z=x(C,"Trident")||x(C,"MSIE"),$=x(C,"Edge"),q=$||z,H=x(C,"Gecko")&&!(x(C.toLowerCase(),"webkit")&&!x(C,"Edge"))&&!(x(C,"Trident")||x(C,"MSIE"))&&!x(C,"Edge"),W=x(C.toLowerCase(),"webkit")&&!x(C,"Edge");function G(){var e=a.document;return e?e.documentMode:void 0}e:{var K="",Y=function(){var e=C;return H?/rv:([^\);]+)(\)|;)/.exec(e):$?/Edge\/([\d\.]+)/.exec(e):z?/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(e):W?/WebKit\/(\S+)/.exec(e):B?/(?:Version)[ \/]?(\S+)/.exec(e):void 0}();if(Y&&(K=Y?Y[1]:""),z){var Q=G();if(null!=Q&&Q>parseFloat(K)){V=String(Q);break e}}V=K}var X,J={};function Z(){return U((function(){let e=0;const t=A(String(V)).split("."),n=A("9").split("."),r=Math.max(t.length,n.length);for(let o=0;0==e&&o<r;o++){var i=t[o]||"",s=n[o]||"";do{if(i=/(\d*)(\D*)(.*)/.exec(i)||["","","",""],s=/(\d*)(\D*)(.*)/.exec(s)||["","","",""],0==i[0].length&&0==s[0].length)break;e=R(0==i[1].length?0:parseInt(i[1],10),0==s[1].length?0:parseInt(s[1],10))||R(0==i[2].length,0==s[2].length)||R(i[2],s[2]),i=i[3],s=s[3]}while(0==e)}return 0<=e}))}if(a.document&&z){var ee=G();X=ee||(parseInt(V,10)||void 0)}else X=void 0;var te=X,ne=function(){if(!a.addEventListener||!Object.defineProperty)return!1;var e=!1,t=Object.defineProperty({},"passive",{get:function(){e=!0}});try{a.addEventListener("test",c,t),a.removeEventListener("test",c,t)}catch(n){}return e}();function re(e,t){this.type=e,this.g=this.target=t,this.defaultPrevented=!1}function ie(e,t){if(re.call(this,e?e.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,e){var n=this.type=e.type,r=e.changedTouches&&e.changedTouches.length?e.changedTouches[0]:null;if(this.target=e.target||e.srcElement,this.g=t,t=e.relatedTarget){if(H){e:{try{F(t.nodeName);var i=!0;break e}catch(s){}i=!1}i||(t=null)}}else"mouseover"==n?t=e.fromElement:"mouseout"==n&&(t=e.toElement);this.relatedTarget=t,r?(this.clientX=void 0!==r.clientX?r.clientX:r.pageX,this.clientY=void 0!==r.clientY?r.clientY:r.pageY,this.screenX=r.screenX||0,this.screenY=r.screenY||0):(this.clientX=void 0!==e.clientX?e.clientX:e.pageX,this.clientY=void 0!==e.clientY?e.clientY:e.pageY,this.screenX=e.screenX||0,this.screenY=e.screenY||0),this.button=e.button,this.key=e.key||"",this.ctrlKey=e.ctrlKey,this.altKey=e.altKey,this.shiftKey=e.shiftKey,this.metaKey=e.metaKey,this.pointerId=e.pointerId||0,this.pointerType="string"===typeof e.pointerType?e.pointerType:se[e.pointerType]||"",this.state=e.state,this.i=e,e.defaultPrevented&&ie.Z.h.call(this)}}re.prototype.h=function(){this.defaultPrevented=!0},y(ie,re);var se={2:"touch",3:"pen",4:"mouse"};ie.prototype.h=function(){ie.Z.h.call(this);var e=this.i;e.preventDefault?e.preventDefault():e.returnValue=!1};var oe="closure_listenable_"+(1e6*Math.random()|0),ae=0;function ce(e,t,n,r,i){this.listener=e,this.proxy=null,this.src=t,this.type=n,this.capture=!!r,this.ia=i,this.key=++ae,this.ca=this.fa=!1}function le(e){e.ca=!0,e.listener=null,e.proxy=null,e.src=null,e.ia=null}function ue(e){this.src=e,this.g={},this.h=0}function he(e,t){var n=t.type;if(n in e.g){var r,i=e.g[n],s=E(i,t);(r=0<=s)&&Array.prototype.splice.call(i,s,1),r&&(le(t),0==e.g[n].length&&(delete e.g[n],e.h--))}}function de(e,t,n,r){for(var i=0;i<e.length;++i){var s=e[i];if(!s.ca&&s.listener==t&&s.capture==!!n&&s.ia==r)return i}return-1}ue.prototype.add=function(e,t,n,r,i){var s=e.toString();e=this.g[s],e||(e=this.g[s]=[],this.h++);var o=de(e,t,r,i);return-1<o?(t=e[o],n||(t.fa=!1)):(t=new ce(t,this.src,s,!!r,i),t.fa=n,e.push(t)),t};var fe="closure_lm_"+(1e6*Math.random()|0),pe={};function ge(e,t,n,r,i){if(r&&r.once)return ye(e,t,n,r,i);if(Array.isArray(t)){for(var s=0;s<t.length;s++)ge(e,t[s],n,r,i);return null}return n=Ie(n),e&&e[oe]?e.N(t,n,u(r)?!!r.capture:!!r,i):me(e,t,n,!1,r,i)}function me(e,t,n,r,i,s){if(!t)throw Error("Invalid event type");var o=u(i)?!!i.capture:!!i,a=Oe(e);if(a||(e[fe]=a=new ue(e)),n=a.add(t,n,r,o,s),n.proxy)return n;if(r=ve(),n.proxy=r,r.src=e,r.listener=n,e.addEventListener)ne||(i=o),void 0===i&&(i=!1),e.addEventListener(t.toString(),r,i);else if(e.attachEvent)e.attachEvent(_e(t.toString()),r);else{if(!e.addListener||!e.removeListener)throw Error("addEventListener and attachEvent are unavailable.");e.addListener(r)}return n}function ve(){function e(n){return t.call(e.src,e.listener,n)}var t=Ee;return e}function ye(e,t,n,r,i){if(Array.isArray(t)){for(var s=0;s<t.length;s++)ye(e,t[s],n,r,i);return null}return n=Ie(n),e&&e[oe]?e.O(t,n,u(r)?!!r.capture:!!r,i):me(e,t,n,!0,r,i)}function be(e,t,n,r,i){if(Array.isArray(t))for(var s=0;s<t.length;s++)be(e,t[s],n,r,i);else r=u(r)?!!r.capture:!!r,n=Ie(n),e&&e[oe]?(e=e.i,t=String(t).toString(),t in e.g&&(s=e.g[t],n=de(s,n,r,i),-1<n&&(le(s[n]),Array.prototype.splice.call(s,n,1),0==s.length&&(delete e.g[t],e.h--)))):e&&(e=Oe(e))&&(t=e.g[t.toString()],e=-1,t&&(e=de(t,n,r,i)),(n=-1<e?t[e]:null)&&we(n))}function we(e){if("number"!==typeof e&&e&&!e.ca){var t=e.src;if(t&&t[oe])he(t.i,e);else{var n=e.type,r=e.proxy;t.removeEventListener?t.removeEventListener(n,r,e.capture):t.detachEvent?t.detachEvent(_e(n),r):t.addListener&&t.removeListener&&t.removeListener(r),(n=Oe(t))?(he(n,e),0==n.h&&(n.src=null,t[fe]=null)):le(e)}}}function _e(e){return e in pe?pe[e]:pe[e]="on"+e}function Ee(e,t){if(e.ca)e=!0;else{t=new ie(t,this);var n=e.listener,r=e.ia||e.src;e.fa&&we(e),e=n.call(r,t)}return e}function Oe(e){return e=e[fe],e instanceof ue?e:null}var Te="__closure_events_fn_"+(1e9*Math.random()>>>0);function Ie(e){return"function"===typeof e?e:(e[Te]||(e[Te]=function(t){return e.handleEvent(t)}),e[Te])}function Se(){b.call(this),this.i=new ue(this),this.P=this,this.I=null}function ke(e,t){var n,r=e.I;if(r)for(n=[];r;r=r.I)n.push(r);if(e=e.P,r=t.type||t,"string"===typeof t)t=new re(t,e);else if(t instanceof re)t.target=t.target||e;else{var i=t;t=new re(r,e),M(t,i)}if(i=!0,n)for(var s=n.length-1;0<=s;s--){var o=t.g=n[s];i=Ce(o,r,!0,t)&&i}if(o=t.g=e,i=Ce(o,r,!0,t)&&i,i=Ce(o,r,!1,t)&&i,n)for(s=0;s<n.length;s++)o=t.g=n[s],i=Ce(o,r,!1,t)&&i}function Ce(e,t,n,r){if(t=e.i.g[String(t)],!t)return!0;t=t.concat();for(var i=!0,s=0;s<t.length;++s){var o=t[s];if(o&&!o.ca&&o.capture==n){var a=o.listener,c=o.ia||o.src;o.fa&&he(e.i,o),i=!1!==a.call(c,r)&&i}}return i&&!r.defaultPrevented}y(Se,b),Se.prototype[oe]=!0,Se.prototype.removeEventListener=function(e,t,n,r){be(this,e,t,n,r)},Se.prototype.M=function(){if(Se.Z.M.call(this),this.i){var e,t=this.i;for(e in t.g){for(var n=t.g[e],r=0;r<n.length;r++)le(n[r]);delete t.g[e],t.h--}}this.I=null},Se.prototype.N=function(e,t,n,r){return this.i.add(String(e),t,!1,n,r)},Se.prototype.O=function(e,t,n,r){return this.i.add(String(e),t,!0,n,r)};var Ae=a.JSON.stringify;function xe(){var e=Ue;let t=null;return e.g&&(t=e.g,e.g=e.g.next,e.g||(e.h=null),t.next=null),t}class Re{constructor(){this.h=this.g=null}add(e,t){const n=je.get();n.set(e,t),this.h?this.h.next=n:this.g=n,this.h=n}}var Ne,je=new class{constructor(e,t){this.i=e,this.j=t,this.h=0,this.g=null}get(){let e;return 0<this.h?(this.h--,e=this.g,this.g=e.next,e.next=null):e=this.i(),e}}(()=>new Le,e=>e.reset());class Le{constructor(){this.next=this.g=this.h=null}set(e,t){this.h=e,this.g=t,this.next=null}reset(){this.next=this.g=this.h=null}}function De(e){a.setTimeout(()=>{throw e},0)}function Pe(e,t){Ne||Me(),Fe||(Ne(),Fe=!0),Ue.add(e,t)}function Me(){var e=a.Promise.resolve(void 0);Ne=function(){e.then(Ve)}}var Fe=!1,Ue=new Re;function Ve(){for(var e;e=xe();){try{e.h.call(e.g)}catch(n){De(n)}var t=je;t.j(e),100>t.h&&(t.h++,e.next=t.g,t.g=e)}Fe=!1}function Be(e,t){Se.call(this),this.h=e||1,this.g=t||a,this.j=m(this.kb,this),this.l=Date.now()}function ze(e){e.da=!1,e.S&&(e.g.clearTimeout(e.S),e.S=null)}function $e(e,t,n){if("function"===typeof e)n&&(e=m(e,n));else{if(!e||"function"!=typeof e.handleEvent)throw Error("Invalid listener argument");e=m(e.handleEvent,e)}return 2147483647<Number(t)?-1:a.setTimeout(e,t||0)}function qe(e){e.g=$e(()=>{e.g=null,e.i&&(e.i=!1,qe(e))},e.j);const t=e.h;e.h=null,e.m.apply(null,t)}y(Be,Se),r=Be.prototype,r.da=!1,r.S=null,r.kb=function(){if(this.da){var e=Date.now()-this.l;0<e&&e<.8*this.h?this.S=this.g.setTimeout(this.j,this.h-e):(this.S&&(this.g.clearTimeout(this.S),this.S=null),ke(this,"tick"),this.da&&(ze(this),this.start()))}},r.start=function(){this.da=!0,this.S||(this.S=this.g.setTimeout(this.j,this.h),this.l=Date.now())},r.M=function(){Be.Z.M.call(this),ze(this),delete this.g};class He extends b{constructor(e,t){super(),this.m=e,this.j=t,this.h=null,this.i=!1,this.g=null}l(e){this.h=arguments,this.g?this.i=!0:qe(this)}M(){super.M(),this.g&&(a.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function We(e){b.call(this),this.h=e,this.g={}}y(We,b);var Ge=[];function Ke(e,t,n,r){Array.isArray(n)||(n&&(Ge[0]=n.toString()),n=Ge);for(var i=0;i<n.length;i++){var s=ge(t,n[i],r||e.handleEvent,!1,e.h||e);if(!s)break;e.g[s.key]=s}}function Ye(e){L(e.g,(function(e,t){this.g.hasOwnProperty(t)&&we(e)}),e),e.g={}}function Qe(){this.g=!0}function Xe(e,t,n,r,i,s){e.info((function(){if(e.g)if(s)for(var o="",a=s.split("&"),c=0;c<a.length;c++){var l=a[c].split("=");if(1<l.length){var u=l[0];l=l[1];var h=u.split("_");o=2<=h.length&&"type"==h[1]?o+(u+"=")+l+"&":o+(u+"=redacted&")}}else o=null;else o=s;return"XMLHTTP REQ ("+r+") [attempt "+i+"]: "+t+"\n"+n+"\n"+o}))}function Je(e,t,n,r,i,s,o){e.info((function(){return"XMLHTTP RESP ("+r+") [ attempt "+i+"]: "+t+"\n"+n+"\n"+s+" "+o}))}function Ze(e,t,n,r){e.info((function(){return"XMLHTTP TEXT ("+t+"): "+tt(e,n)+(r?" "+r:"")}))}function et(e,t){e.info((function(){return"TIMEOUT: "+t}))}function tt(e,t){if(!e.g)return t;if(!t)return null;try{var n=JSON.parse(t);if(n)for(e=0;e<n.length;e++)if(Array.isArray(n[e])){var r=n[e];if(!(2>r.length)){var i=r[1];if(Array.isArray(i)&&!(1>i.length)){var s=i[0];if("noop"!=s&&"stop"!=s&&"close"!=s)for(var o=1;o<i.length;o++)i[o]=""}}}return Ae(n)}catch(a){return t}}We.prototype.M=function(){We.Z.M.call(this),Ye(this)},We.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")},Qe.prototype.Aa=function(){this.g=!1},Qe.prototype.info=function(){};var nt={},rt=null;function it(){return rt=rt||new Se}function st(e){re.call(this,nt.Ma,e)}function ot(e){const t=it();ke(t,new st(t,e))}function at(e,t){re.call(this,nt.STAT_EVENT,e),this.stat=t}function ct(e){const t=it();ke(t,new at(t,e))}function lt(e,t){re.call(this,nt.Na,e),this.size=t}function ut(e,t){if("function"!==typeof e)throw Error("Fn must not be null and must be a function");return a.setTimeout((function(){e()}),t)}nt.Ma="serverreachability",y(st,re),nt.STAT_EVENT="statevent",y(at,re),nt.Na="timingevent",y(lt,re);var ht={NO_ERROR:0,lb:1,yb:2,xb:3,sb:4,wb:5,zb:6,Ja:7,TIMEOUT:8,Cb:9},dt={qb:"complete",Mb:"success",Ka:"error",Ja:"abort",Eb:"ready",Fb:"readystatechange",TIMEOUT:"timeout",Ab:"incrementaldata",Db:"progress",tb:"downloadprogress",Ub:"uploadprogress"};function ft(){}function pt(e){return e.h||(e.h=e.i())}function gt(){}ft.prototype.h=null;var mt,vt={OPEN:"a",pb:"b",Ka:"c",Bb:"d"};function yt(){re.call(this,"d")}function bt(){re.call(this,"c")}function wt(){}function _t(e,t,n,r){this.l=e,this.j=t,this.m=n,this.X=r||1,this.V=new We(this),this.P=Ot,e=q?125:void 0,this.W=new Be(e),this.H=null,this.i=!1,this.s=this.A=this.v=this.K=this.F=this.Y=this.B=null,this.D=[],this.g=null,this.C=0,this.o=this.u=null,this.N=-1,this.I=!1,this.O=0,this.L=null,this.aa=this.J=this.$=this.U=!1,this.h=new Et}function Et(){this.i=null,this.g="",this.h=!1}y(yt,re),y(bt,re),y(wt,ft),wt.prototype.g=function(){return new XMLHttpRequest},wt.prototype.i=function(){return{}},mt=new wt;var Ot=45e3,Tt={},It={};function St(e,t,n){e.K=1,e.v=Xt(Ht(t)),e.s=n,e.U=!0,kt(e,null)}function kt(e,t){e.F=Date.now(),Rt(e),e.A=Ht(e.v);var n=e.A,r=e.X;Array.isArray(r)||(r=[String(r)]),fn(n.h,"t",r),e.C=0,n=e.l.H,e.h=new Et,e.g=br(e.l,n?t:null,!e.s),0<e.O&&(e.L=new He(m(e.Ia,e,e.g),e.O)),Ke(e.V,e.g,"readystatechange",e.gb),t=e.H?D(e.H):{},e.s?(e.u||(e.u="POST"),t["Content-Type"]="application/x-www-form-urlencoded",e.g.ea(e.A,e.u,e.s,t)):(e.u="GET",e.g.ea(e.A,e.u,null,t)),ot(1),Xe(e.j,e.u,e.A,e.m,e.X,e.s)}function Ct(e){return!!e.g&&("GET"==e.u&&2!=e.K&&e.l.Ba)}function At(e,t,n){let r,i=!0;for(;!e.I&&e.C<n.length;){if(r=xt(e,n),r==It){4==t&&(e.o=4,ct(14),i=!1),Ze(e.j,e.m,null,"[Incomplete Response]");break}if(r==Tt){e.o=4,ct(15),Ze(e.j,e.m,n,"[Invalid Chunk]"),i=!1;break}Ze(e.j,e.m,r,null),Pt(e,r)}Ct(e)&&r!=It&&r!=Tt&&(e.h.g="",e.C=0),4!=t||0!=n.length||e.h.h||(e.o=1,ct(16),i=!1),e.i=e.i&&i,i?0<n.length&&!e.aa&&(e.aa=!0,t=e.l,t.g==e&&t.$&&!t.L&&(t.h.info("Great, no buffering proxy detected. Bytes received: "+n.length),hr(t),t.L=!0,ct(11))):(Ze(e.j,e.m,n,"[Invalid Chunked Response]"),Dt(e),Lt(e))}function xt(e,t){var n=e.C,r=t.indexOf("\n",n);return-1==r?It:(n=Number(t.substring(n,r)),isNaN(n)?Tt:(r+=1,r+n>t.length?It:(t=t.substr(r,n),e.C=r+n,t)))}function Rt(e){e.Y=Date.now()+e.P,Nt(e,e.P)}function Nt(e,t){if(null!=e.B)throw Error("WatchDog timer not null");e.B=ut(m(e.eb,e),t)}function jt(e){e.B&&(a.clearTimeout(e.B),e.B=null)}function Lt(e){0==e.l.G||e.I||pr(e.l,e)}function Dt(e){jt(e);var t=e.L;t&&"function"==typeof t.na&&t.na(),e.L=null,ze(e.W),Ye(e.V),e.g&&(t=e.g,e.g=null,t.abort(),t.na())}function Pt(e,t){try{var n=e.l;if(0!=n.G&&(n.g==e||_n(n.i,e)))if(n.I=e.N,!e.J&&_n(n.i,e)&&3==n.G){try{var r=n.Ca.g.parse(t)}catch(l){r=null}if(Array.isArray(r)&&3==r.length){var i=r;if(0==i[0]){e:if(!n.u){if(n.g){if(!(n.g.F+3e3<e.F))break e;fr(n),tr(n)}ur(n),ct(18)}}else n.ta=i[1],0<n.ta-n.U&&37500>i[2]&&n.N&&0==n.A&&!n.v&&(n.v=ut(m(n.ab,n),6e3));if(1>=wn(n.i)&&n.ka){try{n.ka()}catch(l){}n.ka=void 0}}else mr(n,11)}else if((e.J||n.g==e)&&fr(n),!k(t))for(i=n.Ca.g.parse(t),t=0;t<i.length;t++){let l=i[t];if(n.U=l[0],l=l[1],2==n.G)if("c"==l[0]){n.J=l[1],n.la=l[2];const t=l[3];null!=t&&(n.ma=t,n.h.info("VER="+n.ma));const i=l[4];null!=i&&(n.za=i,n.h.info("SVER="+n.za));const u=l[5];null!=u&&"number"===typeof u&&0<u&&(r=1.5*u,n.K=r,n.h.info("backChannelRequestTimeoutMs_="+r)),r=n;const h=e.g;if(h){const e=h.g?h.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(e){var s=r.i;!s.g&&(x(e,"spdy")||x(e,"quic")||x(e,"h2"))&&(s.j=s.l,s.g=new Set,s.h&&(En(s,s.h),s.h=null))}if(r.D){const e=h.g?h.g.getResponseHeader("X-HTTP-Session-Id"):null;e&&(r.sa=e,Qt(r.F,r.D,e))}}n.G=3,n.j&&n.j.xa(),n.$&&(n.O=Date.now()-e.F,n.h.info("Handshake RTT: "+n.O+"ms")),r=n;var o=e;if(r.oa=yr(r,r.H?r.la:null,r.W),o.J){On(r.i,o);var a=o,c=r.K;c&&a.setTimeout(c),a.B&&(jt(a),Rt(a)),r.g=o}else lr(r);0<n.l.length&&ir(n)}else"stop"!=l[0]&&"close"!=l[0]||mr(n,7);else 3==n.G&&("stop"==l[0]||"close"==l[0]?"stop"==l[0]?mr(n,7):er(n):"noop"!=l[0]&&n.j&&n.j.wa(l),n.A=0)}ot(4)}catch(l){}}function Mt(e){if(e.R&&"function"==typeof e.R)return e.R();if("string"===typeof e)return e.split("");if(l(e)){for(var t=[],n=e.length,r=0;r<n;r++)t.push(e[r]);return t}for(r in t=[],n=0,e)t[n++]=e[r];return t}function Ft(e,t){if(e.forEach&&"function"==typeof e.forEach)e.forEach(t,void 0);else if(l(e)||"string"===typeof e)O(e,t,void 0);else{if(e.T&&"function"==typeof e.T)var n=e.T();else if(e.R&&"function"==typeof e.R)n=void 0;else if(l(e)||"string"===typeof e){n=[];for(var r=e.length,i=0;i<r;i++)n.push(i)}else for(i in n=[],r=0,e)n[r++]=i;r=Mt(e),i=r.length;for(var s=0;s<i;s++)t.call(void 0,r[s],n&&n[s],e)}}function Ut(e,t){this.h={},this.g=[],this.i=0;var n=arguments.length;if(1<n){if(n%2)throw Error("Uneven number of arguments");for(var r=0;r<n;r+=2)this.set(arguments[r],arguments[r+1])}else if(e)if(e instanceof Ut)for(n=e.T(),r=0;r<n.length;r++)this.set(n[r],e.get(n[r]));else for(r in e)this.set(r,e[r])}function Vt(e){if(e.i!=e.g.length){for(var t=0,n=0;t<e.g.length;){var r=e.g[t];Bt(e.h,r)&&(e.g[n++]=r),t++}e.g.length=n}if(e.i!=e.g.length){var i={};for(n=t=0;t<e.g.length;)r=e.g[t],Bt(i,r)||(e.g[n++]=r,i[r]=1),t++;e.g.length=n}}function Bt(e,t){return Object.prototype.hasOwnProperty.call(e,t)}r=_t.prototype,r.setTimeout=function(e){this.P=e},r.gb=function(e){e=e.target;const t=this.L;t&&3==Kn(e)?t.l():this.Ia(e)},r.Ia=function(e){try{if(e==this.g)e:{const h=Kn(this.g);var t=this.g.Da();const d=this.g.ba();if(!(3>h)&&(3!=h||q||this.g&&(this.h.h||this.g.ga()||Yn(this.g)))){this.I||4!=h||7==t||ot(8==t||0>=d?3:2),jt(this);var n=this.g.ba();this.N=n;t:if(Ct(this)){var r=Yn(this.g);e="";var i=r.length,s=4==Kn(this.g);if(!this.h.i){if("undefined"===typeof TextDecoder){Dt(this),Lt(this);var o="";break t}this.h.i=new a.TextDecoder}for(t=0;t<i;t++)this.h.h=!0,e+=this.h.i.decode(r[t],{stream:s&&t==i-1});r.splice(0,i),this.h.g+=e,this.C=0,o=this.h.g}else o=this.g.ga();if(this.i=200==n,Je(this.j,this.u,this.A,this.m,this.X,h,n),this.i){if(this.$&&!this.J){t:{if(this.g){var c,l=this.g;if((c=l.g?l.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!k(c)){var u=c;break t}}u=null}if(!(n=u)){this.i=!1,this.o=3,ct(12),Dt(this),Lt(this);break e}Ze(this.j,this.m,n,"Initial handshake response via X-HTTP-Initial-Response"),this.J=!0,Pt(this,n)}this.U?(At(this,h,o),q&&this.i&&3==h&&(Ke(this.V,this.W,"tick",this.fb),this.W.start())):(Ze(this.j,this.m,o,null),Pt(this,o)),4==h&&Dt(this),this.i&&!this.I&&(4==h?pr(this.l,this):(this.i=!1,Rt(this)))}else 400==n&&0<o.indexOf("Unknown SID")?(this.o=3,ct(12)):(this.o=0,ct(13)),Dt(this),Lt(this)}}}catch(h){}},r.fb=function(){if(this.g){var e=Kn(this.g),t=this.g.ga();this.C<t.length&&(jt(this),At(this,e,t),this.i&&4!=e&&Rt(this))}},r.cancel=function(){this.I=!0,Dt(this)},r.eb=function(){this.B=null;const e=Date.now();0<=e-this.Y?(et(this.j,this.A),2!=this.K&&(ot(3),ct(17)),Dt(this),this.o=2,Lt(this)):Nt(this,this.Y-e)},r=Ut.prototype,r.R=function(){Vt(this);for(var e=[],t=0;t<this.g.length;t++)e.push(this.h[this.g[t]]);return e},r.T=function(){return Vt(this),this.g.concat()},r.get=function(e,t){return Bt(this.h,e)?this.h[e]:t},r.set=function(e,t){Bt(this.h,e)||(this.i++,this.g.push(e)),this.h[e]=t},r.forEach=function(e,t){for(var n=this.T(),r=0;r<n.length;r++){var i=n[r],s=this.get(i);e.call(t,s,i,this)}};var zt=/^(?:([^:/?#.]+):)?(?:\/\/(?:([^\\/?#]*)@)?([^\\/?#]*?)(?::([0-9]+))?(?=[\\/?#]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/;function $t(e,t){if(e){e=e.split("&");for(var n=0;n<e.length;n++){var r=e[n].indexOf("="),i=null;if(0<=r){var s=e[n].substring(0,r);i=e[n].substring(r+1)}else s=e[n];t(s,i?decodeURIComponent(i.replace(/\+/g," ")):"")}}}function qt(e,t){if(this.i=this.s=this.j="",this.m=null,this.o=this.l="",this.g=!1,e instanceof qt){this.g=void 0!==t?t:e.g,Wt(this,e.j),this.s=e.s,Gt(this,e.i),Kt(this,e.m),this.l=e.l,t=e.h;var n=new ln;n.i=t.i,t.g&&(n.g=new Ut(t.g),n.h=t.h),Yt(this,n),this.o=e.o}else e&&(n=String(e).match(zt))?(this.g=!!t,Wt(this,n[1]||"",!0),this.s=en(n[2]||""),Gt(this,n[3]||"",!0),Kt(this,n[4]),this.l=en(n[5]||"",!0),Yt(this,n[6]||"",!0),this.o=en(n[7]||"")):(this.g=!!t,this.h=new ln(null,this.g))}function Ht(e){return new qt(e)}function Wt(e,t,n){e.j=n?en(t,!0):t,e.j&&(e.j=e.j.replace(/:$/,""))}function Gt(e,t,n){e.i=n?en(t,!0):t}function Kt(e,t){if(t){if(t=Number(t),isNaN(t)||0>t)throw Error("Bad port number "+t);e.m=t}else e.m=null}function Yt(e,t,n){t instanceof ln?(e.h=t,gn(e.h,e.g)):(n||(t=tn(t,an)),e.h=new ln(t,e.g))}function Qt(e,t,n){e.h.set(t,n)}function Xt(e){return Qt(e,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),e}function Jt(e){return e instanceof qt?Ht(e):new qt(e,void 0)}function Zt(e,t,n,r){var i=new qt(null,void 0);return e&&Wt(i,e),t&&Gt(i,t),n&&Kt(i,n),r&&(i.l=r),i}function en(e,t){return e?t?decodeURI(e.replace(/%25/g,"%2525")):decodeURIComponent(e):""}function tn(e,t,n){return"string"===typeof e?(e=encodeURI(e).replace(t,nn),n&&(e=e.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),e):null}function nn(e){return e=e.charCodeAt(0),"%"+(e>>4&15).toString(16)+(15&e).toString(16)}qt.prototype.toString=function(){var e=[],t=this.j;t&&e.push(tn(t,rn,!0),":");var n=this.i;return(n||"file"==t)&&(e.push("//"),(t=this.s)&&e.push(tn(t,rn,!0),"@"),e.push(encodeURIComponent(String(n)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),n=this.m,null!=n&&e.push(":",String(n))),(n=this.l)&&(this.i&&"/"!=n.charAt(0)&&e.push("/"),e.push(tn(n,"/"==n.charAt(0)?on:sn,!0))),(n=this.h.toString())&&e.push("?",n),(n=this.o)&&e.push("#",tn(n,cn)),e.join("")};var rn=/[#\/\?@]/g,sn=/[#\?:]/g,on=/[#\?]/g,an=/[#\?@]/g,cn=/#/g;function ln(e,t){this.h=this.g=null,this.i=e||null,this.j=!!t}function un(e){e.g||(e.g=new Ut,e.h=0,e.i&&$t(e.i,(function(t,n){e.add(decodeURIComponent(t.replace(/\+/g," ")),n)})))}function hn(e,t){un(e),t=pn(e,t),Bt(e.g.h,t)&&(e.i=null,e.h-=e.g.get(t).length,e=e.g,Bt(e.h,t)&&(delete e.h[t],e.i--,e.g.length>2*e.i&&Vt(e)))}function dn(e,t){return un(e),t=pn(e,t),Bt(e.g.h,t)}function fn(e,t,n){hn(e,t),0<n.length&&(e.i=null,e.g.set(pn(e,t),S(n)),e.h+=n.length)}function pn(e,t){return t=String(t),e.j&&(t=t.toLowerCase()),t}function gn(e,t){t&&!e.j&&(un(e),e.i=null,e.g.forEach((function(e,t){var n=t.toLowerCase();t!=n&&(hn(this,t),fn(this,n,e))}),e)),e.j=t}r=ln.prototype,r.add=function(e,t){un(this),this.i=null,e=pn(this,e);var n=this.g.get(e);return n||this.g.set(e,n=[]),n.push(t),this.h+=1,this},r.forEach=function(e,t){un(this),this.g.forEach((function(n,r){O(n,(function(n){e.call(t,n,r,this)}),this)}),this)},r.T=function(){un(this);for(var e=this.g.R(),t=this.g.T(),n=[],r=0;r<t.length;r++)for(var i=e[r],s=0;s<i.length;s++)n.push(t[r]);return n},r.R=function(e){un(this);var t=[];if("string"===typeof e)dn(this,e)&&(t=I(t,this.g.get(pn(this,e))));else{e=this.g.R();for(var n=0;n<e.length;n++)t=I(t,e[n])}return t},r.set=function(e,t){return un(this),this.i=null,e=pn(this,e),dn(this,e)&&(this.h-=this.g.get(e).length),this.g.set(e,[t]),this.h+=1,this},r.get=function(e,t){return e?(e=this.R(e),0<e.length?String(e[0]):t):t},r.toString=function(){if(this.i)return this.i;if(!this.g)return"";for(var e=[],t=this.g.T(),n=0;n<t.length;n++){var r=t[n],i=encodeURIComponent(String(r));r=this.R(r);for(var s=0;s<r.length;s++){var o=i;""!==r[s]&&(o+="="+encodeURIComponent(String(r[s]))),e.push(o)}}return this.i=e.join("&")};var mn=class{constructor(e,t){this.h=e,this.g=t}};function vn(e){this.l=e||yn,a.PerformanceNavigationTiming?(e=a.performance.getEntriesByType("navigation"),e=0<e.length&&("hq"==e[0].nextHopProtocol||"h2"==e[0].nextHopProtocol)):e=!!(a.g&&a.g.Ea&&a.g.Ea()&&a.g.Ea().Zb),this.j=e?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}var yn=10;function bn(e){return!!e.h||!!e.g&&e.g.size>=e.j}function wn(e){return e.h?1:e.g?e.g.size:0}function _n(e,t){return e.h?e.h==t:!!e.g&&e.g.has(t)}function En(e,t){e.g?e.g.add(t):e.h=t}function On(e,t){e.h&&e.h==t?e.h=null:e.g&&e.g.has(t)&&e.g.delete(t)}function Tn(e){if(null!=e.h)return e.i.concat(e.h.D);if(null!=e.g&&0!==e.g.size){let t=e.i;for(const n of e.g.values())t=t.concat(n.D);return t}return S(e.i)}function In(){}function Sn(){this.g=new In}function kn(e,t,n){const r=n||"";try{Ft(e,(function(e,n){let i=e;u(e)&&(i=Ae(e)),t.push(r+n+"="+encodeURIComponent(i))}))}catch(i){throw t.push(r+"type="+encodeURIComponent("_badmap")),i}}function Cn(e,t){const n=new Qe;if(a.Image){const r=new Image;r.onload=v(An,n,r,"TestLoadImage: loaded",!0,t),r.onerror=v(An,n,r,"TestLoadImage: error",!1,t),r.onabort=v(An,n,r,"TestLoadImage: abort",!1,t),r.ontimeout=v(An,n,r,"TestLoadImage: timeout",!1,t),a.setTimeout((function(){r.ontimeout&&r.ontimeout()}),1e4),r.src=e}else t(!1)}function An(e,t,n,r,i){try{t.onload=null,t.onerror=null,t.onabort=null,t.ontimeout=null,i(r)}catch(s){}}function xn(e){this.l=e.$b||null,this.j=e.ib||!1}function Rn(e,t){Se.call(this),this.D=e,this.u=t,this.m=void 0,this.readyState=Nn,this.status=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.v=new Headers,this.h=null,this.C="GET",this.B="",this.g=!1,this.A=this.j=this.l=null}vn.prototype.cancel=function(){if(this.i=Tn(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&0!==this.g.size){for(const e of this.g.values())e.cancel();this.g.clear()}},In.prototype.stringify=function(e){return a.JSON.stringify(e,void 0)},In.prototype.parse=function(e){return a.JSON.parse(e,void 0)},y(xn,ft),xn.prototype.g=function(){return new Rn(this.l,this.j)},xn.prototype.i=function(e){return function(){return e}}({}),y(Rn,Se);var Nn=0;function jn(e){e.j.read().then(e.Sa.bind(e)).catch(e.ha.bind(e))}function Ln(e){e.readyState=4,e.l=null,e.j=null,e.A=null,Dn(e)}function Dn(e){e.onreadystatechange&&e.onreadystatechange.call(e)}r=Rn.prototype,r.open=function(e,t){if(this.readyState!=Nn)throw this.abort(),Error("Error reopening a connection");this.C=e,this.B=t,this.readyState=1,Dn(this)},r.send=function(e){if(1!=this.readyState)throw this.abort(),Error("need to call open() first. ");this.g=!0;const t={headers:this.v,method:this.C,credentials:this.m,cache:void 0};e&&(t.body=e),(this.D||a).fetch(new Request(this.B,t)).then(this.Va.bind(this),this.ha.bind(this))},r.abort=function(){this.response=this.responseText="",this.v=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted."),1<=this.readyState&&this.g&&4!=this.readyState&&(this.g=!1,Ln(this)),this.readyState=Nn},r.Va=function(e){if(this.g&&(this.l=e,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=e.headers,this.readyState=2,Dn(this)),this.g&&(this.readyState=3,Dn(this),this.g)))if("arraybuffer"===this.responseType)e.arrayBuffer().then(this.Ta.bind(this),this.ha.bind(this));else if("undefined"!==typeof a.ReadableStream&&"body"in e){if(this.j=e.body.getReader(),this.u){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.A=new TextDecoder;jn(this)}else e.text().then(this.Ua.bind(this),this.ha.bind(this))},r.Sa=function(e){if(this.g){if(this.u&&e.value)this.response.push(e.value);else if(!this.u){var t=e.value?e.value:new Uint8Array(0);(t=this.A.decode(t,{stream:!e.done}))&&(this.response=this.responseText+=t)}e.done?Ln(this):Dn(this),3==this.readyState&&jn(this)}},r.Ua=function(e){this.g&&(this.response=this.responseText=e,Ln(this))},r.Ta=function(e){this.g&&(this.response=e,Ln(this))},r.ha=function(){this.g&&Ln(this)},r.setRequestHeader=function(e,t){this.v.append(e,t)},r.getResponseHeader=function(e){return this.h&&this.h.get(e.toLowerCase())||""},r.getAllResponseHeaders=function(){if(!this.h)return"";const e=[],t=this.h.entries();for(var n=t.next();!n.done;)n=n.value,e.push(n[0]+": "+n[1]),n=t.next();return e.join("\r\n")},Object.defineProperty(Rn.prototype,"withCredentials",{get:function(){return"include"===this.m},set:function(e){this.m=e?"include":"same-origin"}});var Pn=a.JSON.parse;function Mn(e){Se.call(this),this.headers=new Ut,this.u=e||null,this.h=!1,this.C=this.g=null,this.H="",this.m=0,this.j="",this.l=this.F=this.v=this.D=!1,this.B=0,this.A=null,this.J=Fn,this.K=this.L=!1}y(Mn,Se);var Fn="",Un=/^https?$/i,Vn=["POST","PUT"];function Bn(e){return z&&Z()&&"number"===typeof e.timeout&&void 0!==e.ontimeout}function zn(e){return"content-type"==e.toLowerCase()}function $n(e,t){e.h=!1,e.g&&(e.l=!0,e.g.abort(),e.l=!1),e.j=t,e.m=5,qn(e),Wn(e)}function qn(e){e.D||(e.D=!0,ke(e,"complete"),ke(e,"error"))}function Hn(e){if(e.h&&"undefined"!=typeof o&&(!e.C[1]||4!=Kn(e)||2!=e.ba()))if(e.v&&4==Kn(e))$e(e.Fa,0,e);else if(ke(e,"readystatechange"),4==Kn(e)){e.h=!1;try{const o=e.ba();e:switch(o){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var t=!0;break e;default:t=!1}var n;if(!(n=t)){var r;if(r=0===o){var i=String(e.H).match(zt)[1]||null;if(!i&&a.self&&a.self.location){var s=a.self.location.protocol;i=s.substr(0,s.length-1)}r=!Un.test(i?i.toLowerCase():"")}n=r}if(n)ke(e,"complete"),ke(e,"success");else{e.m=6;try{var c=2<Kn(e)?e.g.statusText:""}catch(l){c=""}e.j=c+" ["+e.ba()+"]",qn(e)}}finally{Wn(e)}}}function Wn(e,t){if(e.g){Gn(e);const r=e.g,i=e.C[0]?c:null;e.g=null,e.C=null,t||ke(e,"ready");try{r.onreadystatechange=i}catch(n){}}}function Gn(e){e.g&&e.K&&(e.g.ontimeout=null),e.A&&(a.clearTimeout(e.A),e.A=null)}function Kn(e){return e.g?e.g.readyState:0}function Yn(e){try{if(!e.g)return null;if("response"in e.g)return e.g.response;switch(e.J){case Fn:case"text":return e.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in e.g)return e.g.mozResponseArrayBuffer}return null}catch(t){return null}}function Qn(e){let t="";return L(e,(function(e,n){t+=n,t+=":",t+=e,t+="\r\n"})),t}function Xn(e,t,n){e:{for(r in n){var r=!1;break e}r=!0}r||(n=Qn(n),"string"===typeof e?null!=n&&encodeURIComponent(String(n)):Qt(e,t,n))}function Jn(e,t,n){return n&&n.internalChannelParams&&n.internalChannelParams[e]||t}function Zn(e){this.za=0,this.l=[],this.h=new Qe,this.la=this.oa=this.F=this.W=this.g=this.sa=this.D=this.aa=this.o=this.P=this.s=null,this.Za=this.V=0,this.Xa=Jn("failFast",!1,e),this.N=this.v=this.u=this.m=this.j=null,this.X=!0,this.I=this.ta=this.U=-1,this.Y=this.A=this.C=0,this.Pa=Jn("baseRetryDelayMs",5e3,e),this.$a=Jn("retryDelaySeedMs",1e4,e),this.Ya=Jn("forwardChannelMaxRetries",2,e),this.ra=Jn("forwardChannelRequestTimeoutMs",2e4,e),this.qa=e&&e.xmlHttpFactory||void 0,this.Ba=e&&e.Yb||!1,this.K=void 0,this.H=e&&e.supportsCrossDomainXhr||!1,this.J="",this.i=new vn(e&&e.concurrentRequestLimit),this.Ca=new Sn,this.ja=e&&e.fastHandshake||!1,this.Ra=e&&e.Wb||!1,e&&e.Aa&&this.h.Aa(),e&&e.forceLongPolling&&(this.X=!1),this.$=!this.ja&&this.X&&e&&e.detectBufferingProxy||!1,this.ka=void 0,this.O=0,this.L=!1,this.B=null,this.Wa=!e||!1!==e.Xb}function er(e){if(nr(e),3==e.G){var t=e.V++,n=Ht(e.F);Qt(n,"SID",e.J),Qt(n,"RID",t),Qt(n,"TYPE","terminate"),ar(e,n),t=new _t(e,e.h,t,void 0),t.K=2,t.v=Xt(Ht(n)),n=!1,a.navigator&&a.navigator.sendBeacon&&(n=a.navigator.sendBeacon(t.v.toString(),"")),!n&&a.Image&&((new Image).src=t.v,n=!0),n||(t.g=br(t.l,null),t.g.ea(t.v)),t.F=Date.now(),Rt(t)}vr(e)}function tr(e){e.g&&(hr(e),e.g.cancel(),e.g=null)}function nr(e){tr(e),e.u&&(a.clearTimeout(e.u),e.u=null),fr(e),e.i.cancel(),e.m&&("number"===typeof e.m&&a.clearTimeout(e.m),e.m=null)}function rr(e,t){e.l.push(new mn(e.Za++,t)),3==e.G&&ir(e)}function ir(e){bn(e.i)||e.m||(e.m=!0,Pe(e.Ha,e),e.C=0)}function sr(e,t){return!(wn(e.i)>=e.i.j-(e.m?1:0))&&(e.m?(e.l=t.D.concat(e.l),!0):!(1==e.G||2==e.G||e.C>=(e.Xa?0:e.Ya))&&(e.m=ut(m(e.Ha,e,t),gr(e,e.C)),e.C++,!0))}function or(e,t){var n;n=t?t.m:e.V++;const r=Ht(e.F);Qt(r,"SID",e.J),Qt(r,"RID",n),Qt(r,"AID",e.U),ar(e,r),e.o&&e.s&&Xn(r,e.o,e.s),n=new _t(e,e.h,n,e.C+1),null===e.o&&(n.H=e.s),t&&(e.l=t.D.concat(e.l)),t=cr(e,n,1e3),n.setTimeout(Math.round(.5*e.ra)+Math.round(.5*e.ra*Math.random())),En(e.i,n),St(n,r,t)}function ar(e,t){e.j&&Ft({},(function(e,n){Qt(t,n,e)}))}function cr(e,t,n){n=Math.min(e.l.length,n);var r=e.j?m(e.j.Oa,e.j,e):null;e:{var i=e.l;let t=-1;for(;;){const e=["count="+n];-1==t?0<n?(t=i[0].h,e.push("ofs="+t)):t=0:e.push("ofs="+t);let o=!0;for(let a=0;a<n;a++){let n=i[a].h;const c=i[a].g;if(n-=t,0>n)t=Math.max(0,i[a].h-100),o=!1;else try{kn(c,e,"req"+n+"_")}catch(s){r&&r(c)}}if(o){r=e.join("&");break e}}}return e=e.l.splice(0,n),t.D=e,r}function lr(e){e.g||e.u||(e.Y=1,Pe(e.Ga,e),e.A=0)}function ur(e){return!(e.g||e.u||3<=e.A)&&(e.Y++,e.u=ut(m(e.Ga,e),gr(e,e.A)),e.A++,!0)}function hr(e){null!=e.B&&(a.clearTimeout(e.B),e.B=null)}function dr(e){e.g=new _t(e,e.h,"rpc",e.Y),null===e.o&&(e.g.H=e.s),e.g.O=0;var t=Ht(e.oa);Qt(t,"RID","rpc"),Qt(t,"SID",e.J),Qt(t,"CI",e.N?"0":"1"),Qt(t,"AID",e.U),ar(e,t),Qt(t,"TYPE","xmlhttp"),e.o&&e.s&&Xn(t,e.o,e.s),e.K&&e.g.setTimeout(e.K);var n=e.g;e=e.la,n.K=1,n.v=Xt(Ht(t)),n.s=null,n.U=!0,kt(n,e)}function fr(e){null!=e.v&&(a.clearTimeout(e.v),e.v=null)}function pr(e,t){var n=null;if(e.g==t){fr(e),hr(e),e.g=null;var r=2}else{if(!_n(e.i,t))return;n=t.D,On(e.i,t),r=1}if(e.I=t.N,0!=e.G)if(t.i)if(1==r){n=t.s?t.s.length:0,t=Date.now()-t.F;var i=e.C;r=it(),ke(r,new lt(r,n,t,i)),ir(e)}else lr(e);else if(i=t.o,3==i||0==i&&0<e.I||!(1==r&&sr(e,t)||2==r&&ur(e)))switch(n&&0<n.length&&(t=e.i,t.i=t.i.concat(n)),i){case 1:mr(e,5);break;case 4:mr(e,10);break;case 3:mr(e,6);break;default:mr(e,2)}}function gr(e,t){let n=e.Pa+Math.floor(Math.random()*e.$a);return e.j||(n*=2),n*t}function mr(e,t){if(e.h.info("Error code "+t),2==t){var n=null;e.j&&(n=null);var r=m(e.jb,e);n||(n=new qt("//www.google.com/images/cleardot.gif"),a.location&&"http"==a.location.protocol||Wt(n,"https"),Xt(n)),Cn(n.toString(),r)}else ct(2);e.G=0,e.j&&e.j.va(t),vr(e),nr(e)}function vr(e){e.G=0,e.I=-1,e.j&&(0==Tn(e.i).length&&0==e.l.length||(e.i.i.length=0,S(e.l),e.l.length=0),e.j.ua())}function yr(e,t,n){let r=Jt(n);if(""!=r.i)t&&Gt(r,t+"."+r.i),Kt(r,r.m);else{const e=a.location;r=Zt(e.protocol,t?t+"."+e.hostname:e.hostname,+e.port,n)}return e.aa&&L(e.aa,(function(e,t){Qt(r,t,e)})),t=e.D,n=e.sa,t&&n&&Qt(r,t,n),Qt(r,"VER",e.ma),ar(e,r),r}function br(e,t,n){if(t&&!e.H)throw Error("Can't create secondary domain capable XhrIo object.");return t=n&&e.Ba&&!e.qa?new Mn(new xn({ib:!0})):new Mn(e.qa),t.L=e.H,t}function wr(){}function _r(){if(z&&!(10<=Number(te)))throw Error("Environmental error: no available transport.")}function Er(e,t){Se.call(this),this.g=new Zn(t),this.l=e,this.h=t&&t.messageUrlParams||null,e=t&&t.messageHeaders||null,t&&t.clientProtocolHeaderRequired&&(e?e["X-Client-Protocol"]="webchannel":e={"X-Client-Protocol":"webchannel"}),this.g.s=e,e=t&&t.initMessageHeaders||null,t&&t.messageContentType&&(e?e["X-WebChannel-Content-Type"]=t.messageContentType:e={"X-WebChannel-Content-Type":t.messageContentType}),t&&t.ya&&(e?e["X-WebChannel-Client-Profile"]=t.ya:e={"X-WebChannel-Client-Profile":t.ya}),this.g.P=e,(e=t&&t.httpHeadersOverwriteParam)&&!k(e)&&(this.g.o=e),this.A=t&&t.supportsCrossDomainXhr||!1,this.v=t&&t.sendRawJson||!1,(t=t&&t.httpSessionIdParam)&&!k(t)&&(this.g.D=t,e=this.h,null!==e&&t in e&&(e=this.h,t in e&&delete e[t])),this.j=new Ir(this)}function Or(e){yt.call(this);var t=e.__sm__;if(t){e:{for(const n in t){e=n;break e}e=void 0}(this.i=e)&&(e=this.i,t=null!==t&&e in t?t[e]:void 0),this.data=t}else this.data=e}function Tr(){bt.call(this),this.status=1}function Ir(e){this.g=e}r=Mn.prototype,r.ea=function(e,t,n,r){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.H+"; newUri="+e);t=t?t.toUpperCase():"GET",this.H=e,this.j="",this.m=0,this.D=!1,this.h=!0,this.g=this.u?this.u.g():mt.g(),this.C=this.u?pt(this.u):pt(mt),this.g.onreadystatechange=m(this.Fa,this);try{this.F=!0,this.g.open(t,String(e),!0),this.F=!1}catch(s){return void $n(this,s)}e=n||"";const i=new Ut(this.headers);r&&Ft(r,(function(e,t){i.set(t,e)})),r=T(i.T()),n=a.FormData&&e instanceof a.FormData,!(0<=E(Vn,t))||r||n||i.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8"),i.forEach((function(e,t){this.g.setRequestHeader(t,e)}),this),this.J&&(this.g.responseType=this.J),"withCredentials"in this.g&&this.g.withCredentials!==this.L&&(this.g.withCredentials=this.L);try{Gn(this),0<this.B&&((this.K=Bn(this.g))?(this.g.timeout=this.B,this.g.ontimeout=m(this.pa,this)):this.A=$e(this.pa,this.B,this)),this.v=!0,this.g.send(e),this.v=!1}catch(s){$n(this,s)}},r.pa=function(){"undefined"!=typeof o&&this.g&&(this.j="Timed out after "+this.B+"ms, aborting",this.m=8,ke(this,"timeout"),this.abort(8))},r.abort=function(e){this.g&&this.h&&(this.h=!1,this.l=!0,this.g.abort(),this.l=!1,this.m=e||7,ke(this,"complete"),ke(this,"abort"),Wn(this))},r.M=function(){this.g&&(this.h&&(this.h=!1,this.l=!0,this.g.abort(),this.l=!1),Wn(this,!0)),Mn.Z.M.call(this)},r.Fa=function(){this.s||(this.F||this.v||this.l?Hn(this):this.cb())},r.cb=function(){Hn(this)},r.ba=function(){try{return 2<Kn(this)?this.g.status:-1}catch(e){return-1}},r.ga=function(){try{return this.g?this.g.responseText:""}catch(e){return""}},r.Qa=function(e){if(this.g){var t=this.g.responseText;return e&&0==t.indexOf(e)&&(t=t.substring(e.length)),Pn(t)}},r.Da=function(){return this.m},r.La=function(){return"string"===typeof this.j?this.j:String(this.j)},r=Zn.prototype,r.ma=8,r.G=1,r.hb=function(e){try{this.h.info("Origin Trials invoked: "+e)}catch(t){}},r.Ha=function(e){if(this.m)if(this.m=null,1==this.G){if(!e){this.V=Math.floor(1e5*Math.random()),e=this.V++;const i=new _t(this,this.h,e,void 0);let s=this.s;if(this.P&&(s?(s=D(s),M(s,this.P)):s=this.P),null===this.o&&(i.H=s),this.ja)e:{for(var t=0,n=0;n<this.l.length;n++){var r=this.l[n];if(r="__data__"in r.g&&(r=r.g.__data__,"string"===typeof r)?r.length:void 0,void 0===r)break;if(t+=r,4096<t){t=n;break e}if(4096===t||n===this.l.length-1){t=n+1;break e}}t=1e3}else t=1e3;t=cr(this,i,t),n=Ht(this.F),Qt(n,"RID",e),Qt(n,"CVER",22),this.D&&Qt(n,"X-HTTP-Session-Id",this.D),ar(this,n),this.o&&s&&Xn(n,this.o,s),En(this.i,i),this.Ra&&Qt(n,"TYPE","init"),this.ja?(Qt(n,"$req",t),Qt(n,"SID","null"),i.$=!0,St(i,n,null)):St(i,n,t),this.G=2}}else 3==this.G&&(e?or(this,e):0==this.l.length||bn(this.i)||or(this))},r.Ga=function(){if(this.u=null,dr(this),this.$&&!(this.L||null==this.g||0>=this.O)){var e=2*this.O;this.h.info("BP detection timer enabled: "+e),this.B=ut(m(this.bb,this),e)}},r.bb=function(){this.B&&(this.B=null,this.h.info("BP detection timeout reached."),this.h.info("Buffering proxy detected and switch to long-polling!"),this.N=!1,this.L=!0,ct(10),tr(this),dr(this))},r.ab=function(){null!=this.v&&(this.v=null,tr(this),ur(this),ct(19))},r.jb=function(e){e?(this.h.info("Successfully pinged google.com"),ct(2)):(this.h.info("Failed to ping google.com"),ct(1))},r=wr.prototype,r.xa=function(){},r.wa=function(){},r.va=function(){},r.ua=function(){},r.Oa=function(){},_r.prototype.g=function(e,t){return new Er(e,t)},y(Er,Se),Er.prototype.m=function(){this.g.j=this.j,this.A&&(this.g.H=!0);var e=this.g,t=this.l,n=this.h||void 0;e.Wa&&(e.h.info("Origin Trials enabled."),Pe(m(e.hb,e,t))),ct(0),e.W=t,e.aa=n||{},e.N=e.X,e.F=yr(e,null,e.W),ir(e)},Er.prototype.close=function(){er(this.g)},Er.prototype.u=function(e){if("string"===typeof e){var t={};t.__data__=e,rr(this.g,t)}else this.v?(t={},t.__data__=Ae(e),rr(this.g,t)):rr(this.g,e)},Er.prototype.M=function(){this.g.j=null,delete this.j,er(this.g),delete this.g,Er.Z.M.call(this)},y(Or,yt),y(Tr,bt),y(Ir,wr),Ir.prototype.xa=function(){ke(this.g,"a")},Ir.prototype.wa=function(e){ke(this.g,new Or(e))},Ir.prototype.va=function(e){ke(this.g,new Tr(e))},Ir.prototype.ua=function(){ke(this.g,"b")},_r.prototype.createWebChannel=_r.prototype.g,Er.prototype.send=Er.prototype.u,Er.prototype.open=Er.prototype.m,Er.prototype.close=Er.prototype.close,ht.NO_ERROR=0,ht.TIMEOUT=8,ht.HTTP_ERROR=6,dt.COMPLETE="complete",gt.EventType=vt,vt.OPEN="a",vt.CLOSE="b",vt.ERROR="c",vt.MESSAGE="d",Se.prototype.listen=Se.prototype.N,Mn.prototype.listenOnce=Mn.prototype.O,Mn.prototype.getLastError=Mn.prototype.La,Mn.prototype.getLastErrorCode=Mn.prototype.Da,Mn.prototype.getStatus=Mn.prototype.ba,Mn.prototype.getResponseJson=Mn.prototype.Qa,Mn.prototype.getResponseText=Mn.prototype.ga,Mn.prototype.send=Mn.prototype.ea;var Sr=s.createWebChannelTransport=function(){return new _r},kr=s.getStatEventTarget=function(){return it()},Cr=s.ErrorCode=ht,Ar=s.EventType=dt,xr=s.Event=nt,Rr=s.Stat={rb:0,ub:1,vb:2,Ob:3,Tb:4,Qb:5,Rb:6,Pb:7,Nb:8,Sb:9,PROXY:10,NOPROXY:11,Lb:12,Hb:13,Ib:14,Gb:15,Jb:16,Kb:17,nb:18,mb:19,ob:20},Nr=s.FetchXmlHttpFactory=xn,jr=s.WebChannel=gt,Lr=s.XhrIo=Mn}).call(this,n("c8ba"))},"90e3":function(e,t,n){var r=n("e330"),i=0,s=Math.random(),o=r(1..toString);e.exports=function(e){return"Symbol("+(void 0===e?"":e)+")_"+o(++i+s,36)}},9112:function(e,t,n){var r=n("83ab"),i=n("9bf2"),s=n("5c6c");e.exports=r?function(e,t,n){return i.f(e,t,s(1,n))}:function(e,t,n){return e[t]=n,e}},9152:function(e,t){
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
t.read=function(e,t,n,r,i){var s,o,a=8*i-r-1,c=(1<<a)-1,l=c>>1,u=-7,h=n?i-1:0,d=n?-1:1,f=e[t+h];for(h+=d,s=f&(1<<-u)-1,f>>=-u,u+=a;u>0;s=256*s+e[t+h],h+=d,u-=8);for(o=s&(1<<-u)-1,s>>=-u,u+=r;u>0;o=256*o+e[t+h],h+=d,u-=8);if(0===s)s=1-l;else{if(s===c)return o?NaN:1/0*(f?-1:1);o+=Math.pow(2,r),s-=l}return(f?-1:1)*o*Math.pow(2,s-r)},t.write=function(e,t,n,r,i,s){var o,a,c,l=8*s-i-1,u=(1<<l)-1,h=u>>1,d=23===i?Math.pow(2,-24)-Math.pow(2,-77):0,f=r?0:s-1,p=r?1:-1,g=t<0||0===t&&1/t<0?1:0;for(t=Math.abs(t),isNaN(t)||t===1/0?(a=isNaN(t)?1:0,o=u):(o=Math.floor(Math.log(t)/Math.LN2),t*(c=Math.pow(2,-o))<1&&(o--,c*=2),t+=o+h>=1?d/c:d*Math.pow(2,1-h),t*c>=2&&(o++,c/=2),o+h>=u?(a=0,o=u):o+h>=1?(a=(t*c-1)*Math.pow(2,i),o+=h):(a=t*Math.pow(2,h-1)*Math.pow(2,i),o=0));i>=8;e[n+f]=255&a,f+=p,a/=256,i-=8);for(o=o<<i|a,l+=i;l>0;e[n+f]=255&o,f+=p,o/=256,l-=8);e[n+f-p]|=128*g}},9319:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var r=n("7a23"),i=n("0393");const s={ripple:!1,inputStyle:"outlined",locale:{startsWith:"Starts with",contains:"Contains",notContains:"Not contains",endsWith:"Ends with",equals:"Equals",notEquals:"Not equals",noFilter:"No Filter",lt:"Less than",lte:"Less than or equal to",gt:"Greater than",gte:"Greater than or equal to",dateIs:"Date is",dateIsNot:"Date is not",dateBefore:"Date is before",dateAfter:"Date is after",clear:"Clear",apply:"Apply",matchAll:"Match All",matchAny:"Match Any",addRule:"Add Rule",removeRule:"Remove Rule",accept:"Yes",reject:"No",choose:"Choose",upload:"Upload",cancel:"Cancel",dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],dayNamesShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],dayNamesMin:["Su","Mo","Tu","We","Th","Fr","Sa"],monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],monthNamesShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],today:"Today",weekHeader:"Wk",firstDayOfWeek:0,dateFormat:"mm/dd/yy",weak:"Weak",medium:"Medium",strong:"Strong",passwordPrompt:"Enter a password",emptyFilterMessage:"No results found",emptyMessage:"No available options"},filterMatchModeOptions:{text:[i["a"].STARTS_WITH,i["a"].CONTAINS,i["a"].NOT_CONTAINS,i["a"].ENDS_WITH,i["a"].EQUALS,i["a"].NOT_EQUALS],numeric:[i["a"].EQUALS,i["a"].NOT_EQUALS,i["a"].LESS_THAN,i["a"].LESS_THAN_OR_EQUAL_TO,i["a"].GREATER_THAN,i["a"].GREATER_THAN_OR_EQUAL_TO],date:[i["a"].DATE_IS,i["a"].DATE_IS_NOT,i["a"].DATE_BEFORE,i["a"].DATE_AFTER]},zIndex:{modal:1100,overlay:1e3,menu:1e3,tooltip:1100}},o=Symbol();var a={install:(e,t)=>{let n=t?{...s,...t}:{...s};const i={config:Object(r["F"])(n)};e.config.globalProperties.$primevue=i,e.provide(o,i)}}},"94ca":function(e,t,n){var r=n("d039"),i=n("1626"),s=/#|\.prototype\./,o=function(e,t){var n=c[a(e)];return n==u||n!=l&&(i(t)?r(t):!!t)},a=o.normalize=function(e){return String(e).replace(s,".").toLowerCase()},c=o.data={},l=o.NATIVE="N",u=o.POLYFILL="P";e.exports=o},"96cf":function(e,t,n){var r=function(e){"use strict";var t,n=Object.prototype,r=n.hasOwnProperty,i="function"===typeof Symbol?Symbol:{},s=i.iterator||"@@iterator",o=i.asyncIterator||"@@asyncIterator",a=i.toStringTag||"@@toStringTag";function c(e,t,n){return Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{c({},"")}catch(N){c=function(e,t,n){return e[t]=n}}function l(e,t,n,r){var i=t&&t.prototype instanceof m?t:m,s=Object.create(i.prototype),o=new A(r||[]);return s._invoke=I(e,n,o),s}function u(e,t,n){try{return{type:"normal",arg:e.call(t,n)}}catch(N){return{type:"throw",arg:N}}}e.wrap=l;var h="suspendedStart",d="suspendedYield",f="executing",p="completed",g={};function m(){}function v(){}function y(){}var b={};c(b,s,(function(){return this}));var w=Object.getPrototypeOf,_=w&&w(w(x([])));_&&_!==n&&r.call(_,s)&&(b=_);var E=y.prototype=m.prototype=Object.create(b);function O(e){["next","throw","return"].forEach((function(t){c(e,t,(function(e){return this._invoke(t,e)}))}))}function T(e,t){function n(i,s,o,a){var c=u(e[i],e,s);if("throw"!==c.type){var l=c.arg,h=l.value;return h&&"object"===typeof h&&r.call(h,"__await")?t.resolve(h.__await).then((function(e){n("next",e,o,a)}),(function(e){n("throw",e,o,a)})):t.resolve(h).then((function(e){l.value=e,o(l)}),(function(e){return n("throw",e,o,a)}))}a(c.arg)}var i;function s(e,r){function s(){return new t((function(t,i){n(e,r,t,i)}))}return i=i?i.then(s,s):s()}this._invoke=s}function I(e,t,n){var r=h;return function(i,s){if(r===f)throw new Error("Generator is already running");if(r===p){if("throw"===i)throw s;return R()}n.method=i,n.arg=s;while(1){var o=n.delegate;if(o){var a=S(o,n);if(a){if(a===g)continue;return a}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(r===h)throw r=p,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r=f;var c=u(e,t,n);if("normal"===c.type){if(r=n.done?p:d,c.arg===g)continue;return{value:c.arg,done:n.done}}"throw"===c.type&&(r=p,n.method="throw",n.arg=c.arg)}}}function S(e,n){var r=e.iterator[n.method];if(r===t){if(n.delegate=null,"throw"===n.method){if(e.iterator["return"]&&(n.method="return",n.arg=t,S(e,n),"throw"===n.method))return g;n.method="throw",n.arg=new TypeError("The iterator does not provide a 'throw' method")}return g}var i=u(r,e.iterator,n.arg);if("throw"===i.type)return n.method="throw",n.arg=i.arg,n.delegate=null,g;var s=i.arg;return s?s.done?(n[e.resultName]=s.value,n.next=e.nextLoc,"return"!==n.method&&(n.method="next",n.arg=t),n.delegate=null,g):s:(n.method="throw",n.arg=new TypeError("iterator result is not an object"),n.delegate=null,g)}function k(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function C(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function A(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(k,this),this.reset(!0)}function x(e){if(e){var n=e[s];if(n)return n.call(e);if("function"===typeof e.next)return e;if(!isNaN(e.length)){var i=-1,o=function n(){while(++i<e.length)if(r.call(e,i))return n.value=e[i],n.done=!1,n;return n.value=t,n.done=!0,n};return o.next=o}}return{next:R}}function R(){return{value:t,done:!0}}return v.prototype=y,c(E,"constructor",y),c(y,"constructor",v),v.displayName=c(y,a,"GeneratorFunction"),e.isGeneratorFunction=function(e){var t="function"===typeof e&&e.constructor;return!!t&&(t===v||"GeneratorFunction"===(t.displayName||t.name))},e.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,y):(e.__proto__=y,c(e,a,"GeneratorFunction")),e.prototype=Object.create(E),e},e.awrap=function(e){return{__await:e}},O(T.prototype),c(T.prototype,o,(function(){return this})),e.AsyncIterator=T,e.async=function(t,n,r,i,s){void 0===s&&(s=Promise);var o=new T(l(t,n,r,i),s);return e.isGeneratorFunction(n)?o:o.next().then((function(e){return e.done?e.value:o.next()}))},O(E),c(E,a,"Generator"),c(E,s,(function(){return this})),c(E,"toString",(function(){return"[object Generator]"})),e.keys=function(e){var t=[];for(var n in e)t.push(n);return t.reverse(),function n(){while(t.length){var r=t.pop();if(r in e)return n.value=r,n.done=!1,n}return n.done=!0,n}},e.values=x,A.prototype={constructor:A,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=t,this.done=!1,this.delegate=null,this.method="next",this.arg=t,this.tryEntries.forEach(C),!e)for(var n in this)"t"===n.charAt(0)&&r.call(this,n)&&!isNaN(+n.slice(1))&&(this[n]=t)},stop:function(){this.done=!0;var e=this.tryEntries[0],t=e.completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var n=this;function i(r,i){return a.type="throw",a.arg=e,n.next=r,i&&(n.method="next",n.arg=t),!!i}for(var s=this.tryEntries.length-1;s>=0;--s){var o=this.tryEntries[s],a=o.completion;if("root"===o.tryLoc)return i("end");if(o.tryLoc<=this.prev){var c=r.call(o,"catchLoc"),l=r.call(o,"finallyLoc");if(c&&l){if(this.prev<o.catchLoc)return i(o.catchLoc,!0);if(this.prev<o.finallyLoc)return i(o.finallyLoc)}else if(c){if(this.prev<o.catchLoc)return i(o.catchLoc,!0)}else{if(!l)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return i(o.finallyLoc)}}}},abrupt:function(e,t){for(var n=this.tryEntries.length-1;n>=0;--n){var i=this.tryEntries[n];if(i.tryLoc<=this.prev&&r.call(i,"finallyLoc")&&this.prev<i.finallyLoc){var s=i;break}}s&&("break"===e||"continue"===e)&&s.tryLoc<=t&&t<=s.finallyLoc&&(s=null);var o=s?s.completion:{};return o.type=e,o.arg=t,s?(this.method="next",this.next=s.finallyLoc,g):this.complete(o)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),g},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.finallyLoc===e)return this.complete(n.completion,n.afterLoc),C(n),g}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.tryLoc===e){var r=n.completion;if("throw"===r.type){var i=r.arg;C(n)}return i}}throw new Error("illegal catch attempt")},delegateYield:function(e,n,r){return this.delegate={iterator:x(e),resultName:n,nextLoc:r},"next"===this.method&&(this.arg=t),g}},e}(e.exports);try{regeneratorRuntime=r}catch(i){"object"===typeof globalThis?globalThis.regeneratorRuntime=r:Function("r","regeneratorRuntime = r")(r)}},"9a1f":function(e,t,n){var r=n("da84"),i=n("c65b"),s=n("59ed"),o=n("825a"),a=n("0d51"),c=n("35a1"),l=r.TypeError;e.exports=function(e,t){var n=arguments.length<2?c(e):t;if(s(n))return o(i(n,e));throw l(a(e)+" is not iterable")}},"9bf2":function(e,t,n){var r=n("da84"),i=n("83ab"),s=n("0cfb"),o=n("aed9"),a=n("825a"),c=n("a04b"),l=r.TypeError,u=Object.defineProperty,h=Object.getOwnPropertyDescriptor,d="enumerable",f="configurable",p="writable";t.f=i?o?function(e,t,n){if(a(e),t=c(t),a(n),"function"===typeof e&&"prototype"===t&&"value"in n&&p in n&&!n[p]){var r=h(e,t);r&&r[p]&&(e[t]=n.value,n={configurable:f in n?n[f]:r[f],enumerable:d in n?n[d]:r[d],writable:!1})}return u(e,t,n)}:u:function(e,t,n){if(a(e),t=c(t),a(n),s)try{return u(e,t,n)}catch(r){}if("get"in n||"set"in n)throw l("Accessors not supported");return"value"in n&&(e[t]=n.value),e}},"9ed3":function(e,t,n){"use strict";var r=n("ae93").IteratorPrototype,i=n("7c73"),s=n("5c6c"),o=n("d44e"),a=n("3f8c"),c=function(){return this};e.exports=function(e,t,n,l){var u=t+" Iterator";return e.prototype=i(r,{next:s(+!l,n)}),o(e,u,!1,!0),a[u]=c,e}},"9ff4":function(e,t,n){"use strict";(function(e){function r(e,t){const n=Object.create(null),r=e.split(",");for(let i=0;i<r.length;i++)n[r[i]]=!0;return t?e=>!!n[e.toLowerCase()]:e=>!!n[e]}n.d(t,"a",(function(){return T})),n.d(t,"b",(function(){return O})),n.d(t,"c",(function(){return S})),n.d(t,"d",(function(){return I})),n.d(t,"e",(function(){return J})),n.d(t,"f",(function(){return te})),n.d(t,"g",(function(){return se})),n.d(t,"h",(function(){return x})),n.d(t,"i",(function(){return ce})),n.d(t,"j",(function(){return re})),n.d(t,"k",(function(){return j})),n.d(t,"l",(function(){return ee})),n.d(t,"m",(function(){return c})),n.d(t,"n",(function(){return ie})),n.d(t,"o",(function(){return L})),n.d(t,"p",(function(){return Y})),n.d(t,"q",(function(){return F})),n.d(t,"r",(function(){return s})),n.d(t,"s",(function(){return m})),n.d(t,"t",(function(){return G})),n.d(t,"u",(function(){return D})),n.d(t,"v",(function(){return A})),n.d(t,"w",(function(){return B})),n.d(t,"x",(function(){return C})),n.d(t,"y",(function(){return W})),n.d(t,"z",(function(){return z})),n.d(t,"A",(function(){return K})),n.d(t,"B",(function(){return v})),n.d(t,"C",(function(){return P})),n.d(t,"D",(function(){return a})),n.d(t,"E",(function(){return U})),n.d(t,"F",(function(){return V})),n.d(t,"G",(function(){return b})),n.d(t,"H",(function(){return w})),n.d(t,"I",(function(){return r})),n.d(t,"J",(function(){return f})),n.d(t,"K",(function(){return l})),n.d(t,"L",(function(){return R})),n.d(t,"M",(function(){return _})),n.d(t,"N",(function(){return ne})),n.d(t,"O",(function(){return oe})),n.d(t,"P",(function(){return H}));const i="Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt",s=r(i);const o="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",a=r(o);function c(e){return!!e||""===e}function l(e){if(L(e)){const t={};for(let n=0;n<e.length;n++){const r=e[n],i=U(r)?d(r):l(r);if(i)for(const e in i)t[e]=i[e]}return t}return U(e)||B(e)?e:void 0}const u=/;(?![^(]*\))/g,h=/:(.+)/;function d(e){const t={};return e.split(u).forEach(e=>{if(e){const n=e.split(h);n.length>1&&(t[n[0].trim()]=n[1].trim())}}),t}function f(e){let t="";if(U(e))t=e;else if(L(e))for(let n=0;n<e.length;n++){const r=f(e[n]);r&&(t+=r+" ")}else if(B(e))for(const n in e)e[n]&&(t+=n+" ");return t.trim()}const p="html,body,base,head,link,meta,style,title,address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot",g="svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistanceLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view",m=r(p),v=r(g);function y(e,t){if(e.length!==t.length)return!1;let n=!0;for(let r=0;n&&r<e.length;r++)n=b(e[r],t[r]);return n}function b(e,t){if(e===t)return!0;let n=M(e),r=M(t);if(n||r)return!(!n||!r)&&e.getTime()===t.getTime();if(n=L(e),r=L(t),n||r)return!(!n||!r)&&y(e,t);if(n=B(e),r=B(t),n||r){if(!n||!r)return!1;const i=Object.keys(e).length,s=Object.keys(t).length;if(i!==s)return!1;for(const n in e){const r=e.hasOwnProperty(n),i=t.hasOwnProperty(n);if(r&&!i||!r&&i||!b(e[n],t[n]))return!1}}return String(e)===String(t)}function w(e,t){return e.findIndex(e=>b(e,t))}const _=e=>U(e)?e:null==e?"":L(e)||B(e)&&(e.toString===$||!F(e.toString))?JSON.stringify(e,E,2):String(e),E=(e,t)=>t&&t.__v_isRef?E(e,t.value):D(t)?{[`Map(${t.size})`]:[...t.entries()].reduce((e,[t,n])=>(e[t+" =>"]=n,e),{})}:P(t)?{[`Set(${t.size})`]:[...t.values()]}:!B(t)||L(t)||W(t)?t:String(t),O={},T=[],I=()=>{},S=()=>!1,k=/^on[^a-z]/,C=e=>k.test(e),A=e=>e.startsWith("onUpdate:"),x=Object.assign,R=(e,t)=>{const n=e.indexOf(t);n>-1&&e.splice(n,1)},N=Object.prototype.hasOwnProperty,j=(e,t)=>N.call(e,t),L=Array.isArray,D=e=>"[object Map]"===q(e),P=e=>"[object Set]"===q(e),M=e=>e instanceof Date,F=e=>"function"===typeof e,U=e=>"string"===typeof e,V=e=>"symbol"===typeof e,B=e=>null!==e&&"object"===typeof e,z=e=>B(e)&&F(e.then)&&F(e.catch),$=Object.prototype.toString,q=e=>$.call(e),H=e=>q(e).slice(8,-1),W=e=>"[object Object]"===q(e),G=e=>U(e)&&"NaN"!==e&&"-"!==e[0]&&""+parseInt(e,10)===e,K=r(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),Y=r("bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"),Q=e=>{const t=Object.create(null);return n=>{const r=t[n];return r||(t[n]=e(n))}},X=/-(\w)/g,J=Q(e=>e.replace(X,(e,t)=>t?t.toUpperCase():"")),Z=/\B([A-Z])/g,ee=Q(e=>e.replace(Z,"-$1").toLowerCase()),te=Q(e=>e.charAt(0).toUpperCase()+e.slice(1)),ne=Q(e=>e?"on"+te(e):""),re=(e,t)=>!Object.is(e,t),ie=(e,t)=>{for(let n=0;n<e.length;n++)e[n](t)},se=(e,t,n)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,value:n})},oe=e=>{const t=parseFloat(e);return isNaN(t)?e:t};let ae;const ce=()=>ae||(ae="undefined"!==typeof globalThis?globalThis:"undefined"!==typeof self?self:"undefined"!==typeof window?window:"undefined"!==typeof e?e:{})}).call(this,n("c8ba"))},a04b:function(e,t,n){var r=n("c04e"),i=n("d9b5");e.exports=function(e){var t=r(e,"string");return i(t)?t:t+""}},a4b4:function(e,t,n){var r=n("342f");e.exports=/web0s(?!.*chrome)/i.test(r)},a640:function(e,t,n){"use strict";var r=n("d039");e.exports=function(e,t){var n=[][e];return!!n&&r((function(){n.call(null,t||function(){throw 1},1)}))}},a79d:function(e,t,n){"use strict";var r=n("23e7"),i=n("c430"),s=n("fea9"),o=n("d039"),a=n("d066"),c=n("1626"),l=n("4840"),u=n("cdf9"),h=n("6eeb"),d=!!s&&o((function(){s.prototype["finally"].call({then:function(){}},(function(){}))}));if(r({target:"Promise",proto:!0,real:!0,forced:d},{finally:function(e){var t=l(this,a("Promise")),n=c(e);return this.then(n?function(n){return u(t,e()).then((function(){return n}))}:e,n?function(n){return u(t,e()).then((function(){throw n}))}:e)}}),!i&&c(s)){var f=a("Promise").prototype["finally"];s.prototype["finally"]!==f&&h(s.prototype,"finally",f,{unsafe:!0})}},abc5:function(e,t,n){"use strict";(function(e){function r(){return i().__VUE_DEVTOOLS_GLOBAL_HOOK__}function i(){return"undefined"!==typeof navigator&&"undefined"!==typeof window?window:"undefined"!==typeof e?e:{}}n.d(t,"a",(function(){return r})),n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return s}));const s="function"===typeof Proxy}).call(this,n("c8ba"))},ae93:function(e,t,n){"use strict";var r,i,s,o=n("d039"),a=n("1626"),c=n("7c73"),l=n("e163"),u=n("6eeb"),h=n("b622"),d=n("c430"),f=h("iterator"),p=!1;[].keys&&(s=[].keys(),"next"in s?(i=l(l(s)),i!==Object.prototype&&(r=i)):p=!0);var g=void 0==r||o((function(){var e={};return r[f].call(e)!==e}));g?r={}:d&&(r=c(r)),a(r[f])||u(r,f,(function(){return this})),e.exports={IteratorPrototype:r,BUGGY_SAFARI_ITERATORS:p}},aed9:function(e,t,n){var r=n("83ab"),i=n("d039");e.exports=r&&i((function(){return 42!=Object.defineProperty((function(){}),"prototype",{value:42,writable:!1}).prototype}))},b041:function(e,t,n){"use strict";var r=n("00ee"),i=n("f5df");e.exports=r?{}.toString:function(){return"[object "+i(this)+"]"}},b0c0:function(e,t,n){var r=n("83ab"),i=n("5e77").EXISTS,s=n("e330"),o=n("9bf2").f,a=Function.prototype,c=s(a.toString),l=/function\b(?:\s|\/\*[\S\s]*?\*\/|\/\/[^\n\r]*[\n\r]+)*([^\s(/]*)/,u=s(l.exec),h="name";r&&!i&&o(a,h,{configurable:!0,get:function(){try{return u(l,c(this))[1]}catch(e){return""}}})},b50d:function(e,t,n){"use strict";var r=n("c532"),i=n("467f"),s=n("7aac"),o=n("30b5"),a=n("83b9"),c=n("c345"),l=n("3934"),u=n("cafa"),h=n("7917"),d=n("fb60"),f=n("b68a");e.exports=function(e){return new Promise((function(t,n){var p,g=e.data,m=e.headers,v=e.responseType;function y(){e.cancelToken&&e.cancelToken.unsubscribe(p),e.signal&&e.signal.removeEventListener("abort",p)}r.isFormData(g)&&r.isStandardBrowserEnv()&&delete m["Content-Type"];var b=new XMLHttpRequest;if(e.auth){var w=e.auth.username||"",_=e.auth.password?unescape(encodeURIComponent(e.auth.password)):"";m.Authorization="Basic "+btoa(w+":"+_)}var E=a(e.baseURL,e.url);function O(){if(b){var r="getAllResponseHeaders"in b?c(b.getAllResponseHeaders()):null,s=v&&"text"!==v&&"json"!==v?b.response:b.responseText,o={data:s,status:b.status,statusText:b.statusText,headers:r,config:e,request:b};i((function(e){t(e),y()}),(function(e){n(e),y()}),o),b=null}}if(b.open(e.method.toUpperCase(),o(E,e.params,e.paramsSerializer),!0),b.timeout=e.timeout,"onloadend"in b?b.onloadend=O:b.onreadystatechange=function(){b&&4===b.readyState&&(0!==b.status||b.responseURL&&0===b.responseURL.indexOf("file:"))&&setTimeout(O)},b.onabort=function(){b&&(n(new h("Request aborted",h.ECONNABORTED,e,b)),b=null)},b.onerror=function(){n(new h("Network Error",h.ERR_NETWORK,e,b,b)),b=null},b.ontimeout=function(){var t=e.timeout?"timeout of "+e.timeout+"ms exceeded":"timeout exceeded",r=e.transitional||u;e.timeoutErrorMessage&&(t=e.timeoutErrorMessage),n(new h(t,r.clarifyTimeoutError?h.ETIMEDOUT:h.ECONNABORTED,e,b)),b=null},r.isStandardBrowserEnv()){var T=(e.withCredentials||l(E))&&e.xsrfCookieName?s.read(e.xsrfCookieName):void 0;T&&(m[e.xsrfHeaderName]=T)}"setRequestHeader"in b&&r.forEach(m,(function(e,t){"undefined"===typeof g&&"content-type"===t.toLowerCase()?delete m[t]:b.setRequestHeader(t,e)})),r.isUndefined(e.withCredentials)||(b.withCredentials=!!e.withCredentials),v&&"json"!==v&&(b.responseType=e.responseType),"function"===typeof e.onDownloadProgress&&b.addEventListener("progress",e.onDownloadProgress),"function"===typeof e.onUploadProgress&&b.upload&&b.upload.addEventListener("progress",e.onUploadProgress),(e.cancelToken||e.signal)&&(p=function(e){b&&(n(!e||e&&e.type?new d:e),b.abort(),b=null)},e.cancelToken&&e.cancelToken.subscribe(p),e.signal&&(e.signal.aborted?p():e.signal.addEventListener("abort",p))),g||(g=null);var I=f(E);I&&-1===["http","https","file"].indexOf(I)?n(new h("Unsupported protocol "+I+":",h.ERR_BAD_REQUEST,e)):b.send(g)}))}},b575:function(e,t,n){var r,i,s,o,a,c,l,u,h=n("da84"),d=n("0366"),f=n("06cf").f,p=n("2cf4").set,g=n("1cdc"),m=n("d4c3"),v=n("a4b4"),y=n("605d"),b=h.MutationObserver||h.WebKitMutationObserver,w=h.document,_=h.process,E=h.Promise,O=f(h,"queueMicrotask"),T=O&&O.value;T||(r=function(){var e,t;y&&(e=_.domain)&&e.exit();while(i){t=i.fn,i=i.next;try{t()}catch(n){throw i?o():s=void 0,n}}s=void 0,e&&e.enter()},g||y||v||!b||!w?!m&&E&&E.resolve?(l=E.resolve(void 0),l.constructor=E,u=d(l.then,l),o=function(){u(r)}):y?o=function(){_.nextTick(r)}:(p=d(p,h),o=function(){p(r)}):(a=!0,c=w.createTextNode(""),new b(r).observe(c,{characterData:!0}),o=function(){c.data=a=!a})),e.exports=T||function(e){var t={fn:e,next:void 0};s&&(s.next=t),i||(i=t,o()),s=t}},b622:function(e,t,n){var r=n("da84"),i=n("5692"),s=n("1a2d"),o=n("90e3"),a=n("4930"),c=n("fdbf"),l=i("wks"),u=r.Symbol,h=u&&u["for"],d=c?u:u&&u.withoutSetter||o;e.exports=function(e){if(!s(l,e)||!a&&"string"!=typeof l[e]){var t="Symbol."+e;a&&s(u,e)?l[e]=u[e]:l[e]=c&&h?h(t):d(t)}return l[e]}},b639:function(e,t,n){"use strict";(function(e){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <http://feross.org>
 * @license  MIT
 */
var r=n("1fb5"),i=n("9152"),s=n("e3db");function o(){try{var e=new Uint8Array(1);return e.__proto__={__proto__:Uint8Array.prototype,foo:function(){return 42}},42===e.foo()&&"function"===typeof e.subarray&&0===e.subarray(1,1).byteLength}catch(t){return!1}}function a(){return l.TYPED_ARRAY_SUPPORT?2147483647:1073741823}function c(e,t){if(a()<t)throw new RangeError("Invalid typed array length");return l.TYPED_ARRAY_SUPPORT?(e=new Uint8Array(t),e.__proto__=l.prototype):(null===e&&(e=new l(t)),e.length=t),e}function l(e,t,n){if(!l.TYPED_ARRAY_SUPPORT&&!(this instanceof l))return new l(e,t,n);if("number"===typeof e){if("string"===typeof t)throw new Error("If encoding is specified then the first argument must be a string");return f(this,e)}return u(this,e,t,n)}function u(e,t,n,r){if("number"===typeof t)throw new TypeError('"value" argument must not be a number');return"undefined"!==typeof ArrayBuffer&&t instanceof ArrayBuffer?m(e,t,n,r):"string"===typeof t?p(e,t,n):v(e,t)}function h(e){if("number"!==typeof e)throw new TypeError('"size" argument must be a number');if(e<0)throw new RangeError('"size" argument must not be negative')}function d(e,t,n,r){return h(t),t<=0?c(e,t):void 0!==n?"string"===typeof r?c(e,t).fill(n,r):c(e,t).fill(n):c(e,t)}function f(e,t){if(h(t),e=c(e,t<0?0:0|y(t)),!l.TYPED_ARRAY_SUPPORT)for(var n=0;n<t;++n)e[n]=0;return e}function p(e,t,n){if("string"===typeof n&&""!==n||(n="utf8"),!l.isEncoding(n))throw new TypeError('"encoding" must be a valid string encoding');var r=0|w(t,n);e=c(e,r);var i=e.write(t,n);return i!==r&&(e=e.slice(0,i)),e}function g(e,t){var n=t.length<0?0:0|y(t.length);e=c(e,n);for(var r=0;r<n;r+=1)e[r]=255&t[r];return e}function m(e,t,n,r){if(t.byteLength,n<0||t.byteLength<n)throw new RangeError("'offset' is out of bounds");if(t.byteLength<n+(r||0))throw new RangeError("'length' is out of bounds");return t=void 0===n&&void 0===r?new Uint8Array(t):void 0===r?new Uint8Array(t,n):new Uint8Array(t,n,r),l.TYPED_ARRAY_SUPPORT?(e=t,e.__proto__=l.prototype):e=g(e,t),e}function v(e,t){if(l.isBuffer(t)){var n=0|y(t.length);return e=c(e,n),0===e.length?e:(t.copy(e,0,0,n),e)}if(t){if("undefined"!==typeof ArrayBuffer&&t.buffer instanceof ArrayBuffer||"length"in t)return"number"!==typeof t.length||te(t.length)?c(e,0):g(e,t);if("Buffer"===t.type&&s(t.data))return g(e,t.data)}throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")}function y(e){if(e>=a())throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+a().toString(16)+" bytes");return 0|e}function b(e){return+e!=e&&(e=0),l.alloc(+e)}function w(e,t){if(l.isBuffer(e))return e.length;if("undefined"!==typeof ArrayBuffer&&"function"===typeof ArrayBuffer.isView&&(ArrayBuffer.isView(e)||e instanceof ArrayBuffer))return e.byteLength;"string"!==typeof e&&(e=""+e);var n=e.length;if(0===n)return 0;for(var r=!1;;)switch(t){case"ascii":case"latin1":case"binary":return n;case"utf8":case"utf-8":case void 0:return Q(e).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*n;case"hex":return n>>>1;case"base64":return Z(e).length;default:if(r)return Q(e).length;t=(""+t).toLowerCase(),r=!0}}function _(e,t,n){var r=!1;if((void 0===t||t<0)&&(t=0),t>this.length)return"";if((void 0===n||n>this.length)&&(n=this.length),n<=0)return"";if(n>>>=0,t>>>=0,n<=t)return"";e||(e="utf8");while(1)switch(e){case"hex":return M(this,t,n);case"utf8":case"utf-8":return N(this,t,n);case"ascii":return D(this,t,n);case"latin1":case"binary":return P(this,t,n);case"base64":return R(this,t,n);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return F(this,t,n);default:if(r)throw new TypeError("Unknown encoding: "+e);e=(e+"").toLowerCase(),r=!0}}function E(e,t,n){var r=e[t];e[t]=e[n],e[n]=r}function O(e,t,n,r,i){if(0===e.length)return-1;if("string"===typeof n?(r=n,n=0):n>2147483647?n=2147483647:n<-2147483648&&(n=-2147483648),n=+n,isNaN(n)&&(n=i?0:e.length-1),n<0&&(n=e.length+n),n>=e.length){if(i)return-1;n=e.length-1}else if(n<0){if(!i)return-1;n=0}if("string"===typeof t&&(t=l.from(t,r)),l.isBuffer(t))return 0===t.length?-1:T(e,t,n,r,i);if("number"===typeof t)return t&=255,l.TYPED_ARRAY_SUPPORT&&"function"===typeof Uint8Array.prototype.indexOf?i?Uint8Array.prototype.indexOf.call(e,t,n):Uint8Array.prototype.lastIndexOf.call(e,t,n):T(e,[t],n,r,i);throw new TypeError("val must be string, number or Buffer")}function T(e,t,n,r,i){var s,o=1,a=e.length,c=t.length;if(void 0!==r&&(r=String(r).toLowerCase(),"ucs2"===r||"ucs-2"===r||"utf16le"===r||"utf-16le"===r)){if(e.length<2||t.length<2)return-1;o=2,a/=2,c/=2,n/=2}function l(e,t){return 1===o?e[t]:e.readUInt16BE(t*o)}if(i){var u=-1;for(s=n;s<a;s++)if(l(e,s)===l(t,-1===u?0:s-u)){if(-1===u&&(u=s),s-u+1===c)return u*o}else-1!==u&&(s-=s-u),u=-1}else for(n+c>a&&(n=a-c),s=n;s>=0;s--){for(var h=!0,d=0;d<c;d++)if(l(e,s+d)!==l(t,d)){h=!1;break}if(h)return s}return-1}function I(e,t,n,r){n=Number(n)||0;var i=e.length-n;r?(r=Number(r),r>i&&(r=i)):r=i;var s=t.length;if(s%2!==0)throw new TypeError("Invalid hex string");r>s/2&&(r=s/2);for(var o=0;o<r;++o){var a=parseInt(t.substr(2*o,2),16);if(isNaN(a))return o;e[n+o]=a}return o}function S(e,t,n,r){return ee(Q(t,e.length-n),e,n,r)}function k(e,t,n,r){return ee(X(t),e,n,r)}function C(e,t,n,r){return k(e,t,n,r)}function A(e,t,n,r){return ee(Z(t),e,n,r)}function x(e,t,n,r){return ee(J(t,e.length-n),e,n,r)}function R(e,t,n){return 0===t&&n===e.length?r.fromByteArray(e):r.fromByteArray(e.slice(t,n))}function N(e,t,n){n=Math.min(e.length,n);var r=[],i=t;while(i<n){var s,o,a,c,l=e[i],u=null,h=l>239?4:l>223?3:l>191?2:1;if(i+h<=n)switch(h){case 1:l<128&&(u=l);break;case 2:s=e[i+1],128===(192&s)&&(c=(31&l)<<6|63&s,c>127&&(u=c));break;case 3:s=e[i+1],o=e[i+2],128===(192&s)&&128===(192&o)&&(c=(15&l)<<12|(63&s)<<6|63&o,c>2047&&(c<55296||c>57343)&&(u=c));break;case 4:s=e[i+1],o=e[i+2],a=e[i+3],128===(192&s)&&128===(192&o)&&128===(192&a)&&(c=(15&l)<<18|(63&s)<<12|(63&o)<<6|63&a,c>65535&&c<1114112&&(u=c))}null===u?(u=65533,h=1):u>65535&&(u-=65536,r.push(u>>>10&1023|55296),u=56320|1023&u),r.push(u),i+=h}return L(r)}t.Buffer=l,t.SlowBuffer=b,t.INSPECT_MAX_BYTES=50,l.TYPED_ARRAY_SUPPORT=void 0!==e.TYPED_ARRAY_SUPPORT?e.TYPED_ARRAY_SUPPORT:o(),t.kMaxLength=a(),l.poolSize=8192,l._augment=function(e){return e.__proto__=l.prototype,e},l.from=function(e,t,n){return u(null,e,t,n)},l.TYPED_ARRAY_SUPPORT&&(l.prototype.__proto__=Uint8Array.prototype,l.__proto__=Uint8Array,"undefined"!==typeof Symbol&&Symbol.species&&l[Symbol.species]===l&&Object.defineProperty(l,Symbol.species,{value:null,configurable:!0})),l.alloc=function(e,t,n){return d(null,e,t,n)},l.allocUnsafe=function(e){return f(null,e)},l.allocUnsafeSlow=function(e){return f(null,e)},l.isBuffer=function(e){return!(null==e||!e._isBuffer)},l.compare=function(e,t){if(!l.isBuffer(e)||!l.isBuffer(t))throw new TypeError("Arguments must be Buffers");if(e===t)return 0;for(var n=e.length,r=t.length,i=0,s=Math.min(n,r);i<s;++i)if(e[i]!==t[i]){n=e[i],r=t[i];break}return n<r?-1:r<n?1:0},l.isEncoding=function(e){switch(String(e).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},l.concat=function(e,t){if(!s(e))throw new TypeError('"list" argument must be an Array of Buffers');if(0===e.length)return l.alloc(0);var n;if(void 0===t)for(t=0,n=0;n<e.length;++n)t+=e[n].length;var r=l.allocUnsafe(t),i=0;for(n=0;n<e.length;++n){var o=e[n];if(!l.isBuffer(o))throw new TypeError('"list" argument must be an Array of Buffers');o.copy(r,i),i+=o.length}return r},l.byteLength=w,l.prototype._isBuffer=!0,l.prototype.swap16=function(){var e=this.length;if(e%2!==0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(var t=0;t<e;t+=2)E(this,t,t+1);return this},l.prototype.swap32=function(){var e=this.length;if(e%4!==0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(var t=0;t<e;t+=4)E(this,t,t+3),E(this,t+1,t+2);return this},l.prototype.swap64=function(){var e=this.length;if(e%8!==0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(var t=0;t<e;t+=8)E(this,t,t+7),E(this,t+1,t+6),E(this,t+2,t+5),E(this,t+3,t+4);return this},l.prototype.toString=function(){var e=0|this.length;return 0===e?"":0===arguments.length?N(this,0,e):_.apply(this,arguments)},l.prototype.equals=function(e){if(!l.isBuffer(e))throw new TypeError("Argument must be a Buffer");return this===e||0===l.compare(this,e)},l.prototype.inspect=function(){var e="",n=t.INSPECT_MAX_BYTES;return this.length>0&&(e=this.toString("hex",0,n).match(/.{2}/g).join(" "),this.length>n&&(e+=" ... ")),"<Buffer "+e+">"},l.prototype.compare=function(e,t,n,r,i){if(!l.isBuffer(e))throw new TypeError("Argument must be a Buffer");if(void 0===t&&(t=0),void 0===n&&(n=e?e.length:0),void 0===r&&(r=0),void 0===i&&(i=this.length),t<0||n>e.length||r<0||i>this.length)throw new RangeError("out of range index");if(r>=i&&t>=n)return 0;if(r>=i)return-1;if(t>=n)return 1;if(t>>>=0,n>>>=0,r>>>=0,i>>>=0,this===e)return 0;for(var s=i-r,o=n-t,a=Math.min(s,o),c=this.slice(r,i),u=e.slice(t,n),h=0;h<a;++h)if(c[h]!==u[h]){s=c[h],o=u[h];break}return s<o?-1:o<s?1:0},l.prototype.includes=function(e,t,n){return-1!==this.indexOf(e,t,n)},l.prototype.indexOf=function(e,t,n){return O(this,e,t,n,!0)},l.prototype.lastIndexOf=function(e,t,n){return O(this,e,t,n,!1)},l.prototype.write=function(e,t,n,r){if(void 0===t)r="utf8",n=this.length,t=0;else if(void 0===n&&"string"===typeof t)r=t,n=this.length,t=0;else{if(!isFinite(t))throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");t|=0,isFinite(n)?(n|=0,void 0===r&&(r="utf8")):(r=n,n=void 0)}var i=this.length-t;if((void 0===n||n>i)&&(n=i),e.length>0&&(n<0||t<0)||t>this.length)throw new RangeError("Attempt to write outside buffer bounds");r||(r="utf8");for(var s=!1;;)switch(r){case"hex":return I(this,e,t,n);case"utf8":case"utf-8":return S(this,e,t,n);case"ascii":return k(this,e,t,n);case"latin1":case"binary":return C(this,e,t,n);case"base64":return A(this,e,t,n);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return x(this,e,t,n);default:if(s)throw new TypeError("Unknown encoding: "+r);r=(""+r).toLowerCase(),s=!0}},l.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};var j=4096;function L(e){var t=e.length;if(t<=j)return String.fromCharCode.apply(String,e);var n="",r=0;while(r<t)n+=String.fromCharCode.apply(String,e.slice(r,r+=j));return n}function D(e,t,n){var r="";n=Math.min(e.length,n);for(var i=t;i<n;++i)r+=String.fromCharCode(127&e[i]);return r}function P(e,t,n){var r="";n=Math.min(e.length,n);for(var i=t;i<n;++i)r+=String.fromCharCode(e[i]);return r}function M(e,t,n){var r=e.length;(!t||t<0)&&(t=0),(!n||n<0||n>r)&&(n=r);for(var i="",s=t;s<n;++s)i+=Y(e[s]);return i}function F(e,t,n){for(var r=e.slice(t,n),i="",s=0;s<r.length;s+=2)i+=String.fromCharCode(r[s]+256*r[s+1]);return i}function U(e,t,n){if(e%1!==0||e<0)throw new RangeError("offset is not uint");if(e+t>n)throw new RangeError("Trying to access beyond buffer length")}function V(e,t,n,r,i,s){if(!l.isBuffer(e))throw new TypeError('"buffer" argument must be a Buffer instance');if(t>i||t<s)throw new RangeError('"value" argument is out of bounds');if(n+r>e.length)throw new RangeError("Index out of range")}function B(e,t,n,r){t<0&&(t=65535+t+1);for(var i=0,s=Math.min(e.length-n,2);i<s;++i)e[n+i]=(t&255<<8*(r?i:1-i))>>>8*(r?i:1-i)}function z(e,t,n,r){t<0&&(t=4294967295+t+1);for(var i=0,s=Math.min(e.length-n,4);i<s;++i)e[n+i]=t>>>8*(r?i:3-i)&255}function $(e,t,n,r,i,s){if(n+r>e.length)throw new RangeError("Index out of range");if(n<0)throw new RangeError("Index out of range")}function q(e,t,n,r,s){return s||$(e,t,n,4,34028234663852886e22,-34028234663852886e22),i.write(e,t,n,r,23,4),n+4}function H(e,t,n,r,s){return s||$(e,t,n,8,17976931348623157e292,-17976931348623157e292),i.write(e,t,n,r,52,8),n+8}l.prototype.slice=function(e,t){var n,r=this.length;if(e=~~e,t=void 0===t?r:~~t,e<0?(e+=r,e<0&&(e=0)):e>r&&(e=r),t<0?(t+=r,t<0&&(t=0)):t>r&&(t=r),t<e&&(t=e),l.TYPED_ARRAY_SUPPORT)n=this.subarray(e,t),n.__proto__=l.prototype;else{var i=t-e;n=new l(i,void 0);for(var s=0;s<i;++s)n[s]=this[s+e]}return n},l.prototype.readUIntLE=function(e,t,n){e|=0,t|=0,n||U(e,t,this.length);var r=this[e],i=1,s=0;while(++s<t&&(i*=256))r+=this[e+s]*i;return r},l.prototype.readUIntBE=function(e,t,n){e|=0,t|=0,n||U(e,t,this.length);var r=this[e+--t],i=1;while(t>0&&(i*=256))r+=this[e+--t]*i;return r},l.prototype.readUInt8=function(e,t){return t||U(e,1,this.length),this[e]},l.prototype.readUInt16LE=function(e,t){return t||U(e,2,this.length),this[e]|this[e+1]<<8},l.prototype.readUInt16BE=function(e,t){return t||U(e,2,this.length),this[e]<<8|this[e+1]},l.prototype.readUInt32LE=function(e,t){return t||U(e,4,this.length),(this[e]|this[e+1]<<8|this[e+2]<<16)+16777216*this[e+3]},l.prototype.readUInt32BE=function(e,t){return t||U(e,4,this.length),16777216*this[e]+(this[e+1]<<16|this[e+2]<<8|this[e+3])},l.prototype.readIntLE=function(e,t,n){e|=0,t|=0,n||U(e,t,this.length);var r=this[e],i=1,s=0;while(++s<t&&(i*=256))r+=this[e+s]*i;return i*=128,r>=i&&(r-=Math.pow(2,8*t)),r},l.prototype.readIntBE=function(e,t,n){e|=0,t|=0,n||U(e,t,this.length);var r=t,i=1,s=this[e+--r];while(r>0&&(i*=256))s+=this[e+--r]*i;return i*=128,s>=i&&(s-=Math.pow(2,8*t)),s},l.prototype.readInt8=function(e,t){return t||U(e,1,this.length),128&this[e]?-1*(255-this[e]+1):this[e]},l.prototype.readInt16LE=function(e,t){t||U(e,2,this.length);var n=this[e]|this[e+1]<<8;return 32768&n?4294901760|n:n},l.prototype.readInt16BE=function(e,t){t||U(e,2,this.length);var n=this[e+1]|this[e]<<8;return 32768&n?4294901760|n:n},l.prototype.readInt32LE=function(e,t){return t||U(e,4,this.length),this[e]|this[e+1]<<8|this[e+2]<<16|this[e+3]<<24},l.prototype.readInt32BE=function(e,t){return t||U(e,4,this.length),this[e]<<24|this[e+1]<<16|this[e+2]<<8|this[e+3]},l.prototype.readFloatLE=function(e,t){return t||U(e,4,this.length),i.read(this,e,!0,23,4)},l.prototype.readFloatBE=function(e,t){return t||U(e,4,this.length),i.read(this,e,!1,23,4)},l.prototype.readDoubleLE=function(e,t){return t||U(e,8,this.length),i.read(this,e,!0,52,8)},l.prototype.readDoubleBE=function(e,t){return t||U(e,8,this.length),i.read(this,e,!1,52,8)},l.prototype.writeUIntLE=function(e,t,n,r){if(e=+e,t|=0,n|=0,!r){var i=Math.pow(2,8*n)-1;V(this,e,t,n,i,0)}var s=1,o=0;this[t]=255&e;while(++o<n&&(s*=256))this[t+o]=e/s&255;return t+n},l.prototype.writeUIntBE=function(e,t,n,r){if(e=+e,t|=0,n|=0,!r){var i=Math.pow(2,8*n)-1;V(this,e,t,n,i,0)}var s=n-1,o=1;this[t+s]=255&e;while(--s>=0&&(o*=256))this[t+s]=e/o&255;return t+n},l.prototype.writeUInt8=function(e,t,n){return e=+e,t|=0,n||V(this,e,t,1,255,0),l.TYPED_ARRAY_SUPPORT||(e=Math.floor(e)),this[t]=255&e,t+1},l.prototype.writeUInt16LE=function(e,t,n){return e=+e,t|=0,n||V(this,e,t,2,65535,0),l.TYPED_ARRAY_SUPPORT?(this[t]=255&e,this[t+1]=e>>>8):B(this,e,t,!0),t+2},l.prototype.writeUInt16BE=function(e,t,n){return e=+e,t|=0,n||V(this,e,t,2,65535,0),l.TYPED_ARRAY_SUPPORT?(this[t]=e>>>8,this[t+1]=255&e):B(this,e,t,!1),t+2},l.prototype.writeUInt32LE=function(e,t,n){return e=+e,t|=0,n||V(this,e,t,4,4294967295,0),l.TYPED_ARRAY_SUPPORT?(this[t+3]=e>>>24,this[t+2]=e>>>16,this[t+1]=e>>>8,this[t]=255&e):z(this,e,t,!0),t+4},l.prototype.writeUInt32BE=function(e,t,n){return e=+e,t|=0,n||V(this,e,t,4,4294967295,0),l.TYPED_ARRAY_SUPPORT?(this[t]=e>>>24,this[t+1]=e>>>16,this[t+2]=e>>>8,this[t+3]=255&e):z(this,e,t,!1),t+4},l.prototype.writeIntLE=function(e,t,n,r){if(e=+e,t|=0,!r){var i=Math.pow(2,8*n-1);V(this,e,t,n,i-1,-i)}var s=0,o=1,a=0;this[t]=255&e;while(++s<n&&(o*=256))e<0&&0===a&&0!==this[t+s-1]&&(a=1),this[t+s]=(e/o>>0)-a&255;return t+n},l.prototype.writeIntBE=function(e,t,n,r){if(e=+e,t|=0,!r){var i=Math.pow(2,8*n-1);V(this,e,t,n,i-1,-i)}var s=n-1,o=1,a=0;this[t+s]=255&e;while(--s>=0&&(o*=256))e<0&&0===a&&0!==this[t+s+1]&&(a=1),this[t+s]=(e/o>>0)-a&255;return t+n},l.prototype.writeInt8=function(e,t,n){return e=+e,t|=0,n||V(this,e,t,1,127,-128),l.TYPED_ARRAY_SUPPORT||(e=Math.floor(e)),e<0&&(e=255+e+1),this[t]=255&e,t+1},l.prototype.writeInt16LE=function(e,t,n){return e=+e,t|=0,n||V(this,e,t,2,32767,-32768),l.TYPED_ARRAY_SUPPORT?(this[t]=255&e,this[t+1]=e>>>8):B(this,e,t,!0),t+2},l.prototype.writeInt16BE=function(e,t,n){return e=+e,t|=0,n||V(this,e,t,2,32767,-32768),l.TYPED_ARRAY_SUPPORT?(this[t]=e>>>8,this[t+1]=255&e):B(this,e,t,!1),t+2},l.prototype.writeInt32LE=function(e,t,n){return e=+e,t|=0,n||V(this,e,t,4,2147483647,-2147483648),l.TYPED_ARRAY_SUPPORT?(this[t]=255&e,this[t+1]=e>>>8,this[t+2]=e>>>16,this[t+3]=e>>>24):z(this,e,t,!0),t+4},l.prototype.writeInt32BE=function(e,t,n){return e=+e,t|=0,n||V(this,e,t,4,2147483647,-2147483648),e<0&&(e=4294967295+e+1),l.TYPED_ARRAY_SUPPORT?(this[t]=e>>>24,this[t+1]=e>>>16,this[t+2]=e>>>8,this[t+3]=255&e):z(this,e,t,!1),t+4},l.prototype.writeFloatLE=function(e,t,n){return q(this,e,t,!0,n)},l.prototype.writeFloatBE=function(e,t,n){return q(this,e,t,!1,n)},l.prototype.writeDoubleLE=function(e,t,n){return H(this,e,t,!0,n)},l.prototype.writeDoubleBE=function(e,t,n){return H(this,e,t,!1,n)},l.prototype.copy=function(e,t,n,r){if(n||(n=0),r||0===r||(r=this.length),t>=e.length&&(t=e.length),t||(t=0),r>0&&r<n&&(r=n),r===n)return 0;if(0===e.length||0===this.length)return 0;if(t<0)throw new RangeError("targetStart out of bounds");if(n<0||n>=this.length)throw new RangeError("sourceStart out of bounds");if(r<0)throw new RangeError("sourceEnd out of bounds");r>this.length&&(r=this.length),e.length-t<r-n&&(r=e.length-t+n);var i,s=r-n;if(this===e&&n<t&&t<r)for(i=s-1;i>=0;--i)e[i+t]=this[i+n];else if(s<1e3||!l.TYPED_ARRAY_SUPPORT)for(i=0;i<s;++i)e[i+t]=this[i+n];else Uint8Array.prototype.set.call(e,this.subarray(n,n+s),t);return s},l.prototype.fill=function(e,t,n,r){if("string"===typeof e){if("string"===typeof t?(r=t,t=0,n=this.length):"string"===typeof n&&(r=n,n=this.length),1===e.length){var i=e.charCodeAt(0);i<256&&(e=i)}if(void 0!==r&&"string"!==typeof r)throw new TypeError("encoding must be a string");if("string"===typeof r&&!l.isEncoding(r))throw new TypeError("Unknown encoding: "+r)}else"number"===typeof e&&(e&=255);if(t<0||this.length<t||this.length<n)throw new RangeError("Out of range index");if(n<=t)return this;var s;if(t>>>=0,n=void 0===n?this.length:n>>>0,e||(e=0),"number"===typeof e)for(s=t;s<n;++s)this[s]=e;else{var o=l.isBuffer(e)?e:Q(new l(e,r).toString()),a=o.length;for(s=0;s<n-t;++s)this[s+t]=o[s%a]}return this};var W=/[^+\/0-9A-Za-z-_]/g;function G(e){if(e=K(e).replace(W,""),e.length<2)return"";while(e.length%4!==0)e+="=";return e}function K(e){return e.trim?e.trim():e.replace(/^\s+|\s+$/g,"")}function Y(e){return e<16?"0"+e.toString(16):e.toString(16)}function Q(e,t){var n;t=t||1/0;for(var r=e.length,i=null,s=[],o=0;o<r;++o){if(n=e.charCodeAt(o),n>55295&&n<57344){if(!i){if(n>56319){(t-=3)>-1&&s.push(239,191,189);continue}if(o+1===r){(t-=3)>-1&&s.push(239,191,189);continue}i=n;continue}if(n<56320){(t-=3)>-1&&s.push(239,191,189),i=n;continue}n=65536+(i-55296<<10|n-56320)}else i&&(t-=3)>-1&&s.push(239,191,189);if(i=null,n<128){if((t-=1)<0)break;s.push(n)}else if(n<2048){if((t-=2)<0)break;s.push(n>>6|192,63&n|128)}else if(n<65536){if((t-=3)<0)break;s.push(n>>12|224,n>>6&63|128,63&n|128)}else{if(!(n<1114112))throw new Error("Invalid code point");if((t-=4)<0)break;s.push(n>>18|240,n>>12&63|128,n>>6&63|128,63&n|128)}}return s}function X(e){for(var t=[],n=0;n<e.length;++n)t.push(255&e.charCodeAt(n));return t}function J(e,t){for(var n,r,i,s=[],o=0;o<e.length;++o){if((t-=2)<0)break;n=e.charCodeAt(o),r=n>>8,i=n%256,s.push(i),s.push(r)}return s}function Z(e){return r.toByteArray(G(e))}function ee(e,t,n,r){for(var i=0;i<r;++i){if(i+n>=t.length||i>=e.length)break;t[i+n]=e[i]}return i}function te(e){return e!==e}}).call(this,n("c8ba"))},b68a:function(e,t,n){"use strict";e.exports=function(e){var t=/^([-+\w]{1,25})(:?\/\/|:)/.exec(e);return t&&t[1]||""}},b727:function(e,t,n){var r=n("0366"),i=n("e330"),s=n("44ad"),o=n("7b0b"),a=n("07fa"),c=n("65f0"),l=i([].push),u=function(e){var t=1==e,n=2==e,i=3==e,u=4==e,h=6==e,d=7==e,f=5==e||h;return function(p,g,m,v){for(var y,b,w=o(p),_=s(w),E=r(g,m),O=a(_),T=0,I=v||c,S=t?I(p,O):n||d?I(p,0):void 0;O>T;T++)if((f||T in _)&&(y=_[T],b=E(y,T,w),e))if(t)S[T]=b;else if(b)switch(e){case 3:return!0;case 5:return y;case 6:return T;case 2:l(S,y)}else switch(e){case 4:return!1;case 7:l(S,y)}return h?-1:i||u?u:S}};e.exports={forEach:u(0),map:u(1),filter:u(2),some:u(3),every:u(4),find:u(5),findIndex:u(6),filterReject:u(7)}},bb57:function(e,t,n){"use strict";n.d(t,"a",(function(){return s}));var r=n("216d"),i=n("7a23"),s={name:"Button",props:{label:{type:String},icon:{type:String},iconPos:{type:String,default:"left"},badge:{type:String},badgeClass:{type:String,default:null},loading:{type:Boolean,default:!1},loadingIcon:{type:String,default:"pi pi-spinner pi-spin"}},computed:{buttonClass(){return{"p-button p-component":!0,"p-button-icon-only":this.icon&&!this.label,"p-button-vertical":("top"===this.iconPos||"bottom"===this.iconPos)&&this.label,"p-disabled":this.$attrs.disabled||this.loading,"p-button-loading":this.loading,"p-button-loading-label-only":this.loading&&!this.icon&&this.label}},iconClass(){return[this.loading?"p-button-loading-icon "+this.loadingIcon:this.icon,"p-button-icon",{"p-button-icon-left":"left"===this.iconPos&&this.label,"p-button-icon-right":"right"===this.iconPos&&this.label,"p-button-icon-top":"top"===this.iconPos&&this.label,"p-button-icon-bottom":"bottom"===this.iconPos&&this.label}]},badgeStyleClass(){return["p-badge p-component",this.badgeClass,{"p-badge-no-gutter":this.badge&&1===String(this.badge).length}]},disabled(){return this.$attrs.disabled||this.loading}},directives:{ripple:r["a"]}};const o=["disabled"],a={class:"p-button-label"};function c(e,t,n,r,s,c){const l=Object(i["K"])("ripple");return Object(i["S"])((Object(i["B"])(),Object(i["h"])("button",{class:Object(i["u"])(c.buttonClass),type:"button",disabled:c.disabled},[Object(i["I"])(e.$slots,"default",{},()=>[n.loading&&!n.icon?(Object(i["B"])(),Object(i["h"])("span",{key:0,class:Object(i["u"])(c.iconClass)},null,2)):Object(i["g"])("",!0),n.icon?(Object(i["B"])(),Object(i["h"])("span",{key:1,class:Object(i["u"])(c.iconClass)},null,2)):Object(i["g"])("",!0),Object(i["i"])("span",a,Object(i["M"])(n.label||" "),1),n.badge?(Object(i["B"])(),Object(i["h"])("span",{key:2,class:Object(i["u"])(c.badgeStyleClass)},Object(i["M"])(n.badge),3)):Object(i["g"])("",!0)])],10,o)),[[l]])}s.render=c},bc3a:function(e,t,n){e.exports=n("cee4")},c04e:function(e,t,n){var r=n("da84"),i=n("c65b"),s=n("861d"),o=n("d9b5"),a=n("dc4a"),c=n("485a"),l=n("b622"),u=r.TypeError,h=l("toPrimitive");e.exports=function(e,t){if(!s(e)||o(e))return e;var n,r=a(e,h);if(r){if(void 0===t&&(t="default"),n=i(r,e,t),!s(n)||o(n))return n;throw u("Can't convert object to primitive value")}return void 0===t&&(t="number"),c(e,t)}},c345:function(e,t,n){"use strict";var r=n("c532"),i=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];e.exports=function(e){var t,n,s,o={};return e?(r.forEach(e.split("\n"),(function(e){if(s=e.indexOf(":"),t=r.trim(e.substr(0,s)).toLowerCase(),n=r.trim(e.substr(s+1)),t){if(o[t]&&i.indexOf(t)>=0)return;o[t]="set-cookie"===t?(o[t]?o[t]:[]).concat([n]):o[t]?o[t]+", "+n:n}})),o):o}},c401:function(e,t,n){"use strict";var r=n("c532"),i=n("4c3d");e.exports=function(e,t,n){var s=this||i;return r.forEach(n,(function(n){e=n.call(s,e,t)})),e}},c430:function(e,t){e.exports=!1},c532:function(e,t,n){"use strict";var r=n("1d2b"),i=Object.prototype.toString,s=function(e){return function(t){var n=i.call(t);return e[n]||(e[n]=n.slice(8,-1).toLowerCase())}}(Object.create(null));function o(e){return e=e.toLowerCase(),function(t){return s(t)===e}}function a(e){return Array.isArray(e)}function c(e){return"undefined"===typeof e}function l(e){return null!==e&&!c(e)&&null!==e.constructor&&!c(e.constructor)&&"function"===typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)}var u=o("ArrayBuffer");function h(e){var t;return t="undefined"!==typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&u(e.buffer),t}function d(e){return"string"===typeof e}function f(e){return"number"===typeof e}function p(e){return null!==e&&"object"===typeof e}function g(e){if("object"!==s(e))return!1;var t=Object.getPrototypeOf(e);return null===t||t===Object.prototype}var m=o("Date"),v=o("File"),y=o("Blob"),b=o("FileList");function w(e){return"[object Function]"===i.call(e)}function _(e){return p(e)&&w(e.pipe)}function E(e){var t="[object FormData]";return e&&("function"===typeof FormData&&e instanceof FormData||i.call(e)===t||w(e.toString)&&e.toString()===t)}var O=o("URLSearchParams");function T(e){return e.trim?e.trim():e.replace(/^\s+|\s+$/g,"")}function I(){return("undefined"===typeof navigator||"ReactNative"!==navigator.product&&"NativeScript"!==navigator.product&&"NS"!==navigator.product)&&("undefined"!==typeof window&&"undefined"!==typeof document)}function S(e,t){if(null!==e&&"undefined"!==typeof e)if("object"!==typeof e&&(e=[e]),a(e))for(var n=0,r=e.length;n<r;n++)t.call(null,e[n],n,e);else for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&t.call(null,e[i],i,e)}function k(){var e={};function t(t,n){g(e[n])&&g(t)?e[n]=k(e[n],t):g(t)?e[n]=k({},t):a(t)?e[n]=t.slice():e[n]=t}for(var n=0,r=arguments.length;n<r;n++)S(arguments[n],t);return e}function C(e,t,n){return S(t,(function(t,i){e[i]=n&&"function"===typeof t?r(t,n):t})),e}function A(e){return 65279===e.charCodeAt(0)&&(e=e.slice(1)),e}function x(e,t,n,r){e.prototype=Object.create(t.prototype,r),e.prototype.constructor=e,n&&Object.assign(e.prototype,n)}function R(e,t,n){var r,i,s,o={};t=t||{};do{r=Object.getOwnPropertyNames(e),i=r.length;while(i-- >0)s=r[i],o[s]||(t[s]=e[s],o[s]=!0);e=Object.getPrototypeOf(e)}while(e&&(!n||n(e,t))&&e!==Object.prototype);return t}function N(e,t,n){e=String(e),(void 0===n||n>e.length)&&(n=e.length),n-=t.length;var r=e.indexOf(t,n);return-1!==r&&r===n}function j(e){if(!e)return null;var t=e.length;if(c(t))return null;var n=new Array(t);while(t-- >0)n[t]=e[t];return n}var L=function(e){return function(t){return e&&t instanceof e}}("undefined"!==typeof Uint8Array&&Object.getPrototypeOf(Uint8Array));e.exports={isArray:a,isArrayBuffer:u,isBuffer:l,isFormData:E,isArrayBufferView:h,isString:d,isNumber:f,isObject:p,isPlainObject:g,isUndefined:c,isDate:m,isFile:v,isBlob:y,isFunction:w,isStream:_,isURLSearchParams:O,isStandardBrowserEnv:I,forEach:S,merge:k,extend:C,trim:T,stripBOM:A,inherits:x,toFlatObject:R,kindOf:s,kindOfTest:o,endsWith:N,toArray:j,isTypedArray:L,isFileList:b}},c5e1:function(e,t,n){"use strict";n.d(t,"a",(function(){return s}));var r=n("dd76"),i=n("7a23"),s={name:"Portal",props:{appendTo:{type:String,default:"body"},disabled:{type:Boolean,default:!1}},data(){return{mounted:!1}},mounted(){this.mounted=r["b"].isClient()},computed:{inline(){return this.disabled||"self"===this.appendTo}}};function o(e,t,n,r,s,o){return o.inline?Object(i["I"])(e.$slots,"default",{key:0}):s.mounted?(Object(i["B"])(),Object(i["f"])(i["b"],{key:1,to:n.appendTo},[Object(i["I"])(e.$slots,"default")],8,["to"])):Object(i["g"])("",!0)}s.render=o},c65b:function(e,t,n){var r=n("40d5"),i=Function.prototype.call;e.exports=r?i.bind(i):function(){return i.apply(i,arguments)}},c6b6:function(e,t,n){var r=n("e330"),i=r({}.toString),s=r("".slice);e.exports=function(e){return s(i(e),8,-1)}},c6cd:function(e,t,n){var r=n("da84"),i=n("ce4e"),s="__core-js_shared__",o=r[s]||i(s,{});e.exports=o},c8af:function(e,t,n){"use strict";var r=n("c532");e.exports=function(e,t){r.forEach(e,(function(n,r){r!==t&&r.toUpperCase()===t.toUpperCase()&&(e[t]=n,delete e[r])}))}},c8ba:function(e,t){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(r){"object"===typeof window&&(n=window)}e.exports=n},ca84:function(e,t,n){var r=n("e330"),i=n("1a2d"),s=n("fc6a"),o=n("4d64").indexOf,a=n("d012"),c=r([].push);e.exports=function(e,t){var n,r=s(e),l=0,u=[];for(n in r)!i(a,n)&&i(r,n)&&c(u,n);while(t.length>l)i(r,n=t[l++])&&(~o(u,n)||c(u,n));return u}},cafa:function(e,t,n){"use strict";e.exports={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1}},cc12:function(e,t,n){var r=n("da84"),i=n("861d"),s=r.document,o=i(s)&&i(s.createElement);e.exports=function(e){return o?s.createElement(e):{}}},cca6:function(e,t,n){var r=n("23e7"),i=n("60da");r({target:"Object",stat:!0,forced:Object.assign!==i},{assign:i})},cdf9:function(e,t,n){var r=n("825a"),i=n("861d"),s=n("f069");e.exports=function(e,t){if(r(e),i(t)&&t.constructor===e)return t;var n=s.f(e),o=n.resolve;return o(t),n.promise}},ce4e:function(e,t,n){var r=n("da84"),i=Object.defineProperty;e.exports=function(e,t){try{i(r,e,{value:t,configurable:!0,writable:!0})}catch(n){r[e]=t}return t}},cee4:function(e,t,n){"use strict";var r=n("c532"),i=n("1d2b"),s=n("0a06"),o=n("4a7b"),a=n("4c3d");function c(e){var t=new s(e),n=i(s.prototype.request,t);return r.extend(n,s.prototype,t),r.extend(n,t),n.create=function(t){return c(o(e,t))},n}var l=c(a);l.Axios=s,l.CanceledError=n("fb60"),l.CancelToken=n("8df4"),l.isCancel=n("2e67"),l.VERSION=n("5cce").version,l.toFormData=n("e467"),l.AxiosError=n("7917"),l.Cancel=l.CanceledError,l.all=function(e){return Promise.all(e)},l.spread=n("0df6"),l.isAxiosError=n("5f02"),e.exports=l,e.exports.default=l},d012:function(e,t){e.exports={}},d039:function(e,t){e.exports=function(e){try{return!!e()}catch(t){return!0}}},d066:function(e,t,n){var r=n("da84"),i=n("1626"),s=function(e){return i(e)?e:void 0};e.exports=function(e,t){return arguments.length<2?s(r[e]):r[e]&&r[e][t]}},d1e7:function(e,t,n){"use strict";var r={}.propertyIsEnumerable,i=Object.getOwnPropertyDescriptor,s=i&&!r.call({1:2},1);t.f=s?function(e){var t=i(this,e);return!!t&&t.enumerable}:r},d2bb:function(e,t,n){var r=n("e330"),i=n("825a"),s=n("3bbe");e.exports=Object.setPrototypeOf||("__proto__"in{}?function(){var e,t=!1,n={};try{e=r(Object.getOwnPropertyDescriptor(Object.prototype,"__proto__").set),e(n,[]),t=n instanceof Array}catch(o){}return function(n,r){return i(n),s(r),t?e(n,r):n.__proto__=r,n}}():void 0)},d3b7:function(e,t,n){var r=n("00ee"),i=n("6eeb"),s=n("b041");r||i(Object.prototype,"toString",s,{unsafe:!0})},d44e:function(e,t,n){var r=n("9bf2").f,i=n("1a2d"),s=n("b622"),o=s("toStringTag");e.exports=function(e,t,n){e&&!n&&(e=e.prototype),e&&!i(e,o)&&r(e,o,{configurable:!0,value:t})}},d4c3:function(e,t,n){var r=n("342f"),i=n("da84");e.exports=/ipad|iphone|ipod/i.test(r)&&void 0!==i.Pebble},d6d6:function(e,t,n){var r=n("da84"),i=r.TypeError;e.exports=function(e,t){if(e<t)throw i("Not enough arguments");return e}},d925:function(e,t,n){"use strict";e.exports=function(e){return/^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)}},d9b5:function(e,t,n){var r=n("da84"),i=n("d066"),s=n("1626"),o=n("3a9b"),a=n("fdbf"),c=r.Object;e.exports=a?function(e){return"symbol"==typeof e}:function(e){var t=i("Symbol");return s(t)&&o(t.prototype,c(e))}},da84:function(e,t,n){(function(t){var n=function(e){return e&&e.Math==Math&&e};e.exports=n("object"==typeof globalThis&&globalThis)||n("object"==typeof window&&window)||n("object"==typeof self&&self)||n("object"==typeof t&&t)||function(){return this}()||Function("return this")()}).call(this,n("c8ba"))},dc4a:function(e,t,n){var r=n("59ed");e.exports=function(e,t){var n=e[t];return null==n?void 0:r(n)}},dd76:function(e,t,n){"use strict";n.d(t,"a",(function(){return i})),n.d(t,"b",(function(){return r})),n.d(t,"c",(function(){return u})),n.d(t,"d",(function(){return s})),n.d(t,"e",(function(){return l})),n.d(t,"f",(function(){return a}));var r={innerWidth(e){let t=e.offsetWidth,n=getComputedStyle(e);return t+=parseFloat(n.paddingLeft)+parseFloat(n.paddingRight),t},width(e){let t=e.offsetWidth,n=getComputedStyle(e);return t-=parseFloat(n.paddingLeft)+parseFloat(n.paddingRight),t},getWindowScrollTop(){let e=document.documentElement;return(window.pageYOffset||e.scrollTop)-(e.clientTop||0)},getWindowScrollLeft(){let e=document.documentElement;return(window.pageXOffset||e.scrollLeft)-(e.clientLeft||0)},getOuterWidth(e,t){if(e){let n=e.offsetWidth;if(t){let t=getComputedStyle(e);n+=parseFloat(t.marginLeft)+parseFloat(t.marginRight)}return n}return 0},getOuterHeight(e,t){if(e){let n=e.offsetHeight;if(t){let t=getComputedStyle(e);n+=parseFloat(t.marginTop)+parseFloat(t.marginBottom)}return n}return 0},getClientHeight(e,t){if(e){let n=e.clientHeight;if(t){let t=getComputedStyle(e);n+=parseFloat(t.marginTop)+parseFloat(t.marginBottom)}return n}return 0},getViewport(){let e=window,t=document,n=t.documentElement,r=t.getElementsByTagName("body")[0],i=e.innerWidth||n.clientWidth||r.clientWidth,s=e.innerHeight||n.clientHeight||r.clientHeight;return{width:i,height:s}},getOffset(e){var t=e.getBoundingClientRect();return{top:t.top+(window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0),left:t.left+(window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0)}},index(e){let t=e.parentNode.childNodes,n=0;for(var r=0;r<t.length;r++){if(t[r]===e)return n;1===t[r].nodeType&&n++}return-1},addMultipleClasses(e,t){if(e.classList){let n=t.split(" ");for(let t=0;t<n.length;t++)e.classList.add(n[t])}else{let n=t.split(" ");for(let t=0;t<n.length;t++)e.className+=" "+n[t]}},addClass(e,t){e.classList?e.classList.add(t):e.className+=" "+t},removeClass(e,t){e.classList?e.classList.remove(t):e.className=e.className.replace(new RegExp("(^|\\b)"+t.split(" ").join("|")+"(\\b|$)","gi")," ")},hasClass(e,t){return!!e&&(e.classList?e.classList.contains(t):new RegExp("(^| )"+t+"( |$)","gi").test(e.className))},find(e,t){return e.querySelectorAll(t)},findSingle(e,t){return e.querySelector(t)},getHeight(e){let t=e.offsetHeight,n=getComputedStyle(e);return t-=parseFloat(n.paddingTop)+parseFloat(n.paddingBottom)+parseFloat(n.borderTopWidth)+parseFloat(n.borderBottomWidth),t},getWidth(e){let t=e.offsetWidth,n=getComputedStyle(e);return t-=parseFloat(n.paddingLeft)+parseFloat(n.paddingRight)+parseFloat(n.borderLeftWidth)+parseFloat(n.borderRightWidth),t},absolutePosition(e,t){let n,r,i=e.offsetParent?{width:e.offsetWidth,height:e.offsetHeight}:this.getHiddenElementDimensions(e),s=i.height,o=i.width,a=t.offsetHeight,c=t.offsetWidth,l=t.getBoundingClientRect(),u=this.getWindowScrollTop(),h=this.getWindowScrollLeft(),d=this.getViewport();l.top+a+s>d.height?(n=l.top+u-s,e.style.transformOrigin="bottom",n<0&&(n=u)):(n=a+l.top+u,e.style.transformOrigin="top"),r=l.left+o>d.width?Math.max(0,l.left+h+c-o):l.left+h,e.style.top=n+"px",e.style.left=r+"px"},relativePosition(e,t){let n=e.offsetParent?{width:e.offsetWidth,height:e.offsetHeight}:this.getHiddenElementDimensions(e);const r=t.offsetHeight,i=t.getBoundingClientRect(),s=this.getViewport();let o,a;i.top+r+n.height>s.height?(o=-1*n.height,e.style.transformOrigin="bottom",i.top+o<0&&(o=-1*i.top)):(o=r,e.style.transformOrigin="top"),a=n.width>s.width?-1*i.left:i.left+n.width>s.width?-1*(i.left+n.width-s.width):0,e.style.top=o+"px",e.style.left=a+"px"},getParents(e,t=[]){return null===e["parentNode"]?t:this.getParents(e.parentNode,t.concat([e.parentNode]))},getScrollableParents(e){let t=[];if(e){let n=this.getParents(e);const r=/(auto|scroll)/,i=e=>{let t=window["getComputedStyle"](e,null);return r.test(t.getPropertyValue("overflow"))||r.test(t.getPropertyValue("overflowX"))||r.test(t.getPropertyValue("overflowY"))};for(let e of n){let n=1===e.nodeType&&e.dataset["scrollselectors"];if(n){let r=n.split(",");for(let n of r){let r=this.findSingle(e,n);r&&i(r)&&t.push(r)}}9!==e.nodeType&&i(e)&&t.push(e)}}return t},getHiddenElementOuterHeight(e){e.style.visibility="hidden",e.style.display="block";let t=e.offsetHeight;return e.style.display="none",e.style.visibility="visible",t},getHiddenElementOuterWidth(e){e.style.visibility="hidden",e.style.display="block";let t=e.offsetWidth;return e.style.display="none",e.style.visibility="visible",t},getHiddenElementDimensions(e){var t={};return e.style.visibility="hidden",e.style.display="block",t.width=e.offsetWidth,t.height=e.offsetHeight,e.style.display="none",e.style.visibility="visible",t},fadeIn(e,t){e.style.opacity=0;var n=+new Date,r=0,i=function(){r=+e.style.opacity+((new Date).getTime()-n)/t,e.style.opacity=r,n=+new Date,+r<1&&(window.requestAnimationFrame&&requestAnimationFrame(i)||setTimeout(i,16))};i()},fadeOut(e,t){var n=1,r=50,i=t,s=r/i;let o=setInterval(()=>{n-=s,n<=0&&(n=0,clearInterval(o)),e.style.opacity=n},r)},getUserAgent(){return navigator.userAgent},appendChild(e,t){if(this.isElement(t))t.appendChild(e);else{if(!t.el||!t.elElement)throw new Error("Cannot append "+t+" to "+e);t.elElement.appendChild(e)}},scrollInView(e,t){let n=getComputedStyle(e).getPropertyValue("borderTopWidth"),r=n?parseFloat(n):0,i=getComputedStyle(e).getPropertyValue("paddingTop"),s=i?parseFloat(i):0,o=e.getBoundingClientRect(),a=t.getBoundingClientRect(),c=a.top+document.body.scrollTop-(o.top+document.body.scrollTop)-r-s,l=e.scrollTop,u=e.clientHeight,h=this.getOuterHeight(t);c<0?e.scrollTop=l+c:c+h>u&&(e.scrollTop=l+c-u+h)},clearSelection(){if(window.getSelection)window.getSelection().empty?window.getSelection().empty():window.getSelection().removeAllRanges&&window.getSelection().rangeCount>0&&window.getSelection().getRangeAt(0).getClientRects().length>0&&window.getSelection().removeAllRanges();else if(document["selection"]&&document["selection"].empty)try{document["selection"].empty()}catch(e){}},calculateScrollbarWidth(){if(null!=this.calculatedScrollbarWidth)return this.calculatedScrollbarWidth;let e=document.createElement("div");e.className="p-scrollbar-measure",document.body.appendChild(e);let t=e.offsetWidth-e.clientWidth;return document.body.removeChild(e),this.calculatedScrollbarWidth=t,t},getBrowser(){if(!this.browser){let e=this.resolveUserAgent();this.browser={},e.browser&&(this.browser[e.browser]=!0,this.browser["version"]=e.version),this.browser["chrome"]?this.browser["webkit"]=!0:this.browser["webkit"]&&(this.browser["safari"]=!0)}return this.browser},resolveUserAgent(){let e=navigator.userAgent.toLowerCase(),t=/(chrome)[ ]([\w.]+)/.exec(e)||/(webkit)[ ]([\w.]+)/.exec(e)||/(opera)(?:.*version|)[ ]([\w.]+)/.exec(e)||/(msie) ([\w.]+)/.exec(e)||e.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e)||[];return{browser:t[1]||"",version:t[2]||"0"}},isVisible(e){return null!=e.offsetParent},invokeElementMethod(e,t,n){e[t].apply(e,n)},isClient(){return!("undefined"===typeof window||!window.document||!window.document.createElement)},getFocusableElements(e){let t=this.find(e,'button:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden]),\n                [href][clientHeight][clientWidth]:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden]),\n                input:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden]), select:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden]),\n                textarea:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden]), [tabIndex]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden]),\n                [contenteditable]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])'),n=[];for(let r of t)"none"!=getComputedStyle(r).display&&"hidden"!=getComputedStyle(r).visibility&&n.push(r);return n},getFirstFocusableElement(e){const t=this.getFocusableElements(e);return t.length>0?t[0]:null},isClickable(e){const t=e.nodeName,n=e.parentElement&&e.parentElement.nodeName;return"INPUT"==t||"BUTTON"==t||"A"==t||"INPUT"==n||"BUTTON"==n||"A"==n||this.hasClass(e,"p-button")||this.hasClass(e.parentElement,"p-button")||this.hasClass(e.parentElement,"p-checkbox")||this.hasClass(e.parentElement,"p-radiobutton")},applyStyle(e,t){if("string"===typeof t)e.style.cssText=t;else for(let n in t)e.style[n]=t[n]},isIOS(){return/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window["MSStream"]},isAndroid(){return/(android)/i.test(navigator.userAgent)},isTouchDevice(){return"ontouchstart"in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0},exportCSV(e,t){let n=new Blob([e],{type:"application/csv;charset=utf-8;"});if(window.navigator.msSaveOrOpenBlob)navigator.msSaveOrOpenBlob(n,t+".csv");else{let r=document.createElement("a");void 0!==r.download?(r.setAttribute("href",URL.createObjectURL(n)),r.setAttribute("download",t+".csv"),r.style.display="none",document.body.appendChild(r),r.click(),document.body.removeChild(r)):(e="data:text/csv;charset=utf-8,"+e,window.open(encodeURI(e)))}}};class i{constructor(e,t=(()=>{})){this.element=e,this.listener=t}bindScrollListener(){this.scrollableParents=r.getScrollableParents(this.element);for(let e=0;e<this.scrollableParents.length;e++)this.scrollableParents[e].addEventListener("scroll",this.listener)}unbindScrollListener(){if(this.scrollableParents)for(let e=0;e<this.scrollableParents.length;e++)this.scrollableParents[e].removeEventListener("scroll",this.listener)}destroy(){this.unbindScrollListener(),this.element=null,this.listener=null,this.scrollableParents=null}}var s={equals(e,t,n){return n?this.resolveFieldData(e,n)===this.resolveFieldData(t,n):this.deepEquals(e,t)},deepEquals(e,t){if(e===t)return!0;if(e&&t&&"object"==typeof e&&"object"==typeof t){var n,r,i,s=Array.isArray(e),o=Array.isArray(t);if(s&&o){if(r=e.length,r!=t.length)return!1;for(n=r;0!==n--;)if(!this.deepEquals(e[n],t[n]))return!1;return!0}if(s!=o)return!1;var a=e instanceof Date,c=t instanceof Date;if(a!=c)return!1;if(a&&c)return e.getTime()==t.getTime();var l=e instanceof RegExp,u=t instanceof RegExp;if(l!=u)return!1;if(l&&u)return e.toString()==t.toString();var h=Object.keys(e);if(r=h.length,r!==Object.keys(t).length)return!1;for(n=r;0!==n--;)if(!Object.prototype.hasOwnProperty.call(t,h[n]))return!1;for(n=r;0!==n--;)if(i=h[n],!this.deepEquals(e[i],t[i]))return!1;return!0}return e!==e&&t!==t},resolveFieldData(e,t){if(e&&Object.keys(e).length&&t){if(this.isFunction(t))return t(e);if(-1===t.indexOf("."))return e[t];{let i=t.split("."),s=e;for(var n=0,r=i.length;n<r;++n){if(null==s)return null;s=s[i[n]]}return s}}return null},isFunction(e){return!!(e&&e.constructor&&e.call&&e.apply)},filter(e,t,n){var r=[];if(e)for(let i of e)for(let e of t)if(String(this.resolveFieldData(i,e)).toLowerCase().indexOf(n.toLowerCase())>-1){r.push(i);break}return r},reorderArray(e,t,n){let r;if(e&&t!==n){if(n>=e.length){r=n-e.length;while(1+r--)e.push(void 0)}e.splice(n,0,e.splice(t,1)[0])}},findIndexInList(e,t){let n=-1;if(t)for(let r=0;r<t.length;r++)if(t[r]===e){n=r;break}return n},contains(e,t){if(null!=e&&t&&t.length)for(let n of t)if(this.equals(e,n))return!0;return!1},insertIntoOrderedArray(e,t,n,r){if(n.length>0){let i=!1;for(let s=0;s<n.length;s++){let o=this.findIndexInList(n[s],r);if(o>t){n.splice(s,0,e),i=!0;break}}i||n.push(e)}else n.push(e)},removeAccents(e){return e&&e.search(/[\xC0-\xFF]/g)>-1&&(e=e.replace(/[\xC0-\xC5]/g,"A").replace(/[\xC6]/g,"AE").replace(/[\xC7]/g,"C").replace(/[\xC8-\xCB]/g,"E").replace(/[\xCC-\xCF]/g,"I").replace(/[\xD0]/g,"D").replace(/[\xD1]/g,"N").replace(/[\xD2-\xD6\xD8]/g,"O").replace(/[\xD9-\xDC]/g,"U").replace(/[\xDD]/g,"Y").replace(/[\xDE]/g,"P").replace(/[\xE0-\xE5]/g,"a").replace(/[\xE6]/g,"ae").replace(/[\xE7]/g,"c").replace(/[\xE8-\xEB]/g,"e").replace(/[\xEC-\xEF]/g,"i").replace(/[\xF1]/g,"n").replace(/[\xF2-\xF6\xF8]/g,"o").replace(/[\xF9-\xFC]/g,"u").replace(/[\xFE]/g,"p").replace(/[\xFD\xFF]/g,"y")),e},getVNodeProp(e,t){let n=e.props;if(n){let r=t.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase(),i=Object.prototype.hasOwnProperty.call(n,r)?r:t;return e.type.props[t].type===Boolean&&""===n[i]||n[i]}return null},isEmpty(e){return null===e||void 0===e||""===e||Array.isArray(e)&&0===e.length||!(e instanceof Date)&&"object"===typeof e&&0===Object.keys(e).length},isNotEmpty(e){return!this.isEmpty(e)}};function o(){let e=[];const t=(t,n)=>{let r=e.length>0?e[e.length-1]:{key:t,value:n},i=r.value+(r.key===t?0:n)+1;return e.push({key:t,value:i}),i},n=t=>{e=e.filter(e=>e.value!==t)},r=()=>e.length>0?e[e.length-1].value:0,i=e=>e&&parseInt(e.style.zIndex,10)||0;return{get:i,set:(e,n,r)=>{n&&(n.style.zIndex=String(t(e,r)))},clear:e=>{e&&(n(i(e)),e.style.zIndex="")},getCurrent:()=>r()}}var a=o(),c=0;function l(e="pv_id_"){return c++,`${e}${c}`}function u(){const e=new Map;return{on(t,n){let r=e.get(t);r?r.push(n):r=[n],e.set(t,r)},off(t,n){let r=e.get(t);r&&r.splice(r.indexOf(n)>>>0,1)},emit(t,n){let r=e.get(t);r&&r.slice().map(e=>{e(n)})}}}},ddb0:function(e,t,n){var r=n("da84"),i=n("fdbc"),s=n("785a"),o=n("e260"),a=n("9112"),c=n("b622"),l=c("iterator"),u=c("toStringTag"),h=o.values,d=function(e,t){if(e){if(e[l]!==h)try{a(e,l,h)}catch(r){e[l]=h}if(e[u]||a(e,u,t),i[t])for(var n in o)if(e[n]!==o[n])try{a(e,n,o[n])}catch(r){e[n]=o[n]}}};for(var f in i)d(r[f]&&r[f].prototype,f);d(s,"DOMTokenList")},df75:function(e,t,n){var r=n("ca84"),i=n("7839");e.exports=Object.keys||function(e){return r(e,i)}},df7c:function(e,t,n){(function(e){function n(e,t){for(var n=0,r=e.length-1;r>=0;r--){var i=e[r];"."===i?e.splice(r,1):".."===i?(e.splice(r,1),n++):n&&(e.splice(r,1),n--)}if(t)for(;n--;n)e.unshift("..");return e}function r(e){"string"!==typeof e&&(e+="");var t,n=0,r=-1,i=!0;for(t=e.length-1;t>=0;--t)if(47===e.charCodeAt(t)){if(!i){n=t+1;break}}else-1===r&&(i=!1,r=t+1);return-1===r?"":e.slice(n,r)}function i(e,t){if(e.filter)return e.filter(t);for(var n=[],r=0;r<e.length;r++)t(e[r],r,e)&&n.push(e[r]);return n}t.resolve=function(){for(var t="",r=!1,s=arguments.length-1;s>=-1&&!r;s--){var o=s>=0?arguments[s]:e.cwd();if("string"!==typeof o)throw new TypeError("Arguments to path.resolve must be strings");o&&(t=o+"/"+t,r="/"===o.charAt(0))}return t=n(i(t.split("/"),(function(e){return!!e})),!r).join("/"),(r?"/":"")+t||"."},t.normalize=function(e){var r=t.isAbsolute(e),o="/"===s(e,-1);return e=n(i(e.split("/"),(function(e){return!!e})),!r).join("/"),e||r||(e="."),e&&o&&(e+="/"),(r?"/":"")+e},t.isAbsolute=function(e){return"/"===e.charAt(0)},t.join=function(){var e=Array.prototype.slice.call(arguments,0);return t.normalize(i(e,(function(e,t){if("string"!==typeof e)throw new TypeError("Arguments to path.join must be strings");return e})).join("/"))},t.relative=function(e,n){function r(e){for(var t=0;t<e.length;t++)if(""!==e[t])break;for(var n=e.length-1;n>=0;n--)if(""!==e[n])break;return t>n?[]:e.slice(t,n-t+1)}e=t.resolve(e).substr(1),n=t.resolve(n).substr(1);for(var i=r(e.split("/")),s=r(n.split("/")),o=Math.min(i.length,s.length),a=o,c=0;c<o;c++)if(i[c]!==s[c]){a=c;break}var l=[];for(c=a;c<i.length;c++)l.push("..");return l=l.concat(s.slice(a)),l.join("/")},t.sep="/",t.delimiter=":",t.dirname=function(e){if("string"!==typeof e&&(e+=""),0===e.length)return".";for(var t=e.charCodeAt(0),n=47===t,r=-1,i=!0,s=e.length-1;s>=1;--s)if(t=e.charCodeAt(s),47===t){if(!i){r=s;break}}else i=!1;return-1===r?n?"/":".":n&&1===r?"/":e.slice(0,r)},t.basename=function(e,t){var n=r(e);return t&&n.substr(-1*t.length)===t&&(n=n.substr(0,n.length-t.length)),n},t.extname=function(e){"string"!==typeof e&&(e+="");for(var t=-1,n=0,r=-1,i=!0,s=0,o=e.length-1;o>=0;--o){var a=e.charCodeAt(o);if(47!==a)-1===r&&(i=!1,r=o+1),46===a?-1===t?t=o:1!==s&&(s=1):-1!==t&&(s=-1);else if(!i){n=o+1;break}}return-1===t||-1===r||0===s||1===s&&t===r-1&&t===n+1?"":e.slice(t,r)};var s="b"==="ab".substr(-1)?function(e,t,n){return e.substr(t,n)}:function(e,t,n){return t<0&&(t=e.length+t),e.substr(t,n)}}).call(this,n("4362"))},e163:function(e,t,n){var r=n("da84"),i=n("1a2d"),s=n("1626"),o=n("7b0b"),a=n("f772"),c=n("e177"),l=a("IE_PROTO"),u=r.Object,h=u.prototype;e.exports=c?u.getPrototypeOf:function(e){var t=o(e);if(i(t,l))return t[l];var n=t.constructor;return s(n)&&t instanceof n?n.prototype:t instanceof u?h:null}},e177:function(e,t,n){var r=n("d039");e.exports=!r((function(){function e(){}return e.prototype.constructor=null,Object.getPrototypeOf(new e)!==e.prototype}))},e1ae:function(e,t,n){},e260:function(e,t,n){"use strict";var r=n("fc6a"),i=n("44d2"),s=n("3f8c"),o=n("69f3"),a=n("9bf2").f,c=n("7dd0"),l=n("c430"),u=n("83ab"),h="Array Iterator",d=o.set,f=o.getterFor(h);e.exports=c(Array,"Array",(function(e,t){d(this,{type:h,target:r(e),index:0,kind:t})}),(function(){var e=f(this),t=e.target,n=e.kind,r=e.index++;return!t||r>=t.length?(e.target=void 0,{value:void 0,done:!0}):"keys"==n?{value:r,done:!1}:"values"==n?{value:t[r],done:!1}:{value:[r,t[r]],done:!1}}),"values");var p=s.Arguments=s.Array;if(i("keys"),i("values"),i("entries"),!l&&u&&"values"!==p.name)try{a(p,"name",{value:"values"})}catch(g){}},e2cc:function(e,t,n){var r=n("6eeb");e.exports=function(e,t,n){for(var i in t)r(e,i,t[i],n);return e}},e330:function(e,t,n){var r=n("40d5"),i=Function.prototype,s=i.bind,o=i.call,a=r&&s.bind(o,o);e.exports=r?function(e){return e&&a(e)}:function(e){return e&&function(){return o.apply(e,arguments)}}},e3db:function(e,t){var n={}.toString;e.exports=Array.isArray||function(e){return"[object Array]"==n.call(e)}},e467:function(e,t,n){"use strict";(function(t){var r=n("c532");function i(e,n){n=n||new FormData;var i=[];function s(e){return null===e?"":r.isDate(e)?e.toISOString():r.isArrayBuffer(e)||r.isTypedArray(e)?"function"===typeof Blob?new Blob([e]):t.from(e):e}function o(e,t){if(r.isPlainObject(e)||r.isArray(e)){if(-1!==i.indexOf(e))throw Error("Circular reference detected in "+t);i.push(e),r.forEach(e,(function(e,i){if(!r.isUndefined(e)){var a,c=t?t+"."+i:i;if(e&&!t&&"object"===typeof e)if(r.endsWith(i,"{}"))e=JSON.stringify(e);else if(r.endsWith(i,"[]")&&(a=r.toArray(e)))return void a.forEach((function(e){!r.isUndefined(e)&&n.append(c,s(e))}));o(e,c)}})),i.pop()}else n.append(t,s(e))}return o(e),n}e.exports=i}).call(this,n("b639").Buffer)},e667:function(e,t){e.exports=function(e){try{return{error:!1,value:e()}}catch(t){return{error:!0,value:t}}}},e683:function(e,t,n){"use strict";e.exports=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}},e691:function(e,t,n){"use strict";n.d(t,"a",(function(){return i})),n.d(t,"b",(function(){return l})),n.d(t,"c",(function(){return u})),n.d(t,"d",(function(){return h}));
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const r=[];var i;(function(e){e[e["DEBUG"]=0]="DEBUG",e[e["VERBOSE"]=1]="VERBOSE",e[e["INFO"]=2]="INFO",e[e["WARN"]=3]="WARN",e[e["ERROR"]=4]="ERROR",e[e["SILENT"]=5]="SILENT"})(i||(i={}));const s={debug:i.DEBUG,verbose:i.VERBOSE,info:i.INFO,warn:i.WARN,error:i.ERROR,silent:i.SILENT},o=i.INFO,a={[i.DEBUG]:"log",[i.VERBOSE]:"log",[i.INFO]:"info",[i.WARN]:"warn",[i.ERROR]:"error"},c=(e,t,...n)=>{if(t<e.logLevel)return;const r=(new Date).toISOString(),i=a[t];if(!i)throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`);console[i](`[${r}]  ${e.name}:`,...n)};class l{constructor(e){this.name=e,this._logLevel=o,this._logHandler=c,this._userLogHandler=null,r.push(this)}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in i))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel="string"===typeof e?s[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if("function"!==typeof e)throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,i.DEBUG,...e),this._logHandler(this,i.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,i.VERBOSE,...e),this._logHandler(this,i.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,i.INFO,...e),this._logHandler(this,i.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,i.WARN,...e),this._logHandler(this,i.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,i.ERROR,...e),this._logHandler(this,i.ERROR,...e)}}function u(e){r.forEach(t=>{t.setLogLevel(e)})}function h(e,t){for(const n of r){let r=null;t&&t.level&&(r=s[t.level]),n.userLogHandler=null===e?null:(t,n,...s)=>{const o=s.map(e=>{if(null==e)return null;if("string"===typeof e)return e;if("number"===typeof e||"boolean"===typeof e)return e.toString();if(e instanceof Error)return e.message;try{return JSON.stringify(e)}catch(t){return null}}).filter(e=>e).join(" ");n>=(null!==r&&void 0!==r?r:t.logLevel)&&e({level:i[n].toLowerCase(),message:o,args:s,type:t.name})}}}},e6cf:function(e,t,n){"use strict";var r,i,s,o,a=n("23e7"),c=n("c430"),l=n("da84"),u=n("d066"),h=n("c65b"),d=n("fea9"),f=n("6eeb"),p=n("e2cc"),g=n("d2bb"),m=n("d44e"),v=n("2626"),y=n("59ed"),b=n("1626"),w=n("861d"),_=n("19aa"),E=n("8925"),O=n("2266"),T=n("1c7e"),I=n("4840"),S=n("2cf4").set,k=n("b575"),C=n("cdf9"),A=n("44de"),x=n("f069"),R=n("e667"),N=n("01b4"),j=n("69f3"),L=n("94ca"),D=n("b622"),P=n("6069"),M=n("605d"),F=n("2d00"),U=D("species"),V="Promise",B=j.getterFor(V),z=j.set,$=j.getterFor(V),q=d&&d.prototype,H=d,W=q,G=l.TypeError,K=l.document,Y=l.process,Q=x.f,X=Q,J=!!(K&&K.createEvent&&l.dispatchEvent),Z=b(l.PromiseRejectionEvent),ee="unhandledrejection",te="rejectionhandled",ne=0,re=1,ie=2,se=1,oe=2,ae=!1,ce=L(V,(function(){var e=E(H),t=e!==String(H);if(!t&&66===F)return!0;if(c&&!W["finally"])return!0;if(F>=51&&/native code/.test(e))return!1;var n=new H((function(e){e(1)})),r=function(e){e((function(){}),(function(){}))},i=n.constructor={};return i[U]=r,ae=n.then((function(){}))instanceof r,!ae||!t&&P&&!Z})),le=ce||!T((function(e){H.all(e)["catch"]((function(){}))})),ue=function(e){var t;return!(!w(e)||!b(t=e.then))&&t},he=function(e,t){var n,r,i,s=t.value,o=t.state==re,a=o?e.ok:e.fail,c=e.resolve,l=e.reject,u=e.domain;try{a?(o||(t.rejection===oe&&me(t),t.rejection=se),!0===a?n=s:(u&&u.enter(),n=a(s),u&&(u.exit(),i=!0)),n===e.promise?l(G("Promise-chain cycle")):(r=ue(n))?h(r,n,c,l):c(n)):l(s)}catch(d){u&&!i&&u.exit(),l(d)}},de=function(e,t){e.notified||(e.notified=!0,k((function(){var n,r=e.reactions;while(n=r.get())he(n,e);e.notified=!1,t&&!e.rejection&&pe(e)})))},fe=function(e,t,n){var r,i;J?(r=K.createEvent("Event"),r.promise=t,r.reason=n,r.initEvent(e,!1,!0),l.dispatchEvent(r)):r={promise:t,reason:n},!Z&&(i=l["on"+e])?i(r):e===ee&&A("Unhandled promise rejection",n)},pe=function(e){h(S,l,(function(){var t,n=e.facade,r=e.value,i=ge(e);if(i&&(t=R((function(){M?Y.emit("unhandledRejection",r,n):fe(ee,n,r)})),e.rejection=M||ge(e)?oe:se,t.error))throw t.value}))},ge=function(e){return e.rejection!==se&&!e.parent},me=function(e){h(S,l,(function(){var t=e.facade;M?Y.emit("rejectionHandled",t):fe(te,t,e.value)}))},ve=function(e,t,n){return function(r){e(t,r,n)}},ye=function(e,t,n){e.done||(e.done=!0,n&&(e=n),e.value=t,e.state=ie,de(e,!0))},be=function(e,t,n){if(!e.done){e.done=!0,n&&(e=n);try{if(e.facade===t)throw G("Promise can't be resolved itself");var r=ue(t);r?k((function(){var n={done:!1};try{h(r,t,ve(be,n,e),ve(ye,n,e))}catch(i){ye(n,i,e)}})):(e.value=t,e.state=re,de(e,!1))}catch(i){ye({done:!1},i,e)}}};if(ce&&(H=function(e){_(this,W),y(e),h(r,this);var t=B(this);try{e(ve(be,t),ve(ye,t))}catch(n){ye(t,n)}},W=H.prototype,r=function(e){z(this,{type:V,done:!1,notified:!1,parent:!1,reactions:new N,rejection:!1,state:ne,value:void 0})},r.prototype=p(W,{then:function(e,t){var n=$(this),r=Q(I(this,H));return n.parent=!0,r.ok=!b(e)||e,r.fail=b(t)&&t,r.domain=M?Y.domain:void 0,n.state==ne?n.reactions.add(r):k((function(){he(r,n)})),r.promise},catch:function(e){return this.then(void 0,e)}}),i=function(){var e=new r,t=B(e);this.promise=e,this.resolve=ve(be,t),this.reject=ve(ye,t)},x.f=Q=function(e){return e===H||e===s?new i(e):X(e)},!c&&b(d)&&q!==Object.prototype)){o=q.then,ae||(f(q,"then",(function(e,t){var n=this;return new H((function(e,t){h(o,n,e,t)})).then(e,t)}),{unsafe:!0}),f(q,"catch",W["catch"],{unsafe:!0}));try{delete q.constructor}catch(we){}g&&g(q,W)}a({global:!0,wrap:!0,forced:ce},{Promise:H}),m(H,V,!1,!0),v(V),s=u(V),a({target:V,stat:!0,forced:ce},{reject:function(e){var t=Q(this);return h(t.reject,void 0,e),t.promise}}),a({target:V,stat:!0,forced:c||ce},{resolve:function(e){return C(c&&this===s?H:this,e)}}),a({target:V,stat:!0,forced:le},{all:function(e){var t=this,n=Q(t),r=n.resolve,i=n.reject,s=R((function(){var n=y(t.resolve),s=[],o=0,a=1;O(e,(function(e){var c=o++,l=!1;a++,h(n,t,e).then((function(e){l||(l=!0,s[c]=e,--a||r(s))}),i)})),--a||r(s)}));return s.error&&i(s.value),n.promise},race:function(e){var t=this,n=Q(t),r=n.reject,i=R((function(){var i=y(t.resolve);O(e,(function(e){h(i,t,e).then(n.resolve,r)}))}));return i.error&&r(i.value),n.promise}})},e71f:function(e,t,n){"use strict";var r=n("0829");n.d(t,"a",(function(){return r["a"]})),n.d(t,"b",(function(){return r["b"]})),n.d(t,"c",(function(){return r["c"]})),n.d(t,"d",(function(){return r["d"]})),n.d(t,"e",(function(){return r["e"]})),n.d(t,"f",(function(){return r["f"]})),n.d(t,"g",(function(){return r["g"]}))},e893:function(e,t,n){var r=n("1a2d"),i=n("56ef"),s=n("06cf"),o=n("9bf2");e.exports=function(e,t,n){for(var a=i(t),c=o.f,l=s.f,u=0;u<a.length;u++){var h=a[u];r(e,h)||n&&r(n,h)||c(e,h,l(t,h))}}},e8b5:function(e,t,n){var r=n("c6b6");e.exports=Array.isArray||function(e){return"Array"==r(e)}},e95a:function(e,t,n){var r=n("b622"),i=n("3f8c"),s=r("iterator"),o=Array.prototype;e.exports=function(e){return void 0!==e&&(i.Array===e||o[s]===e)}},f069:function(e,t,n){"use strict";var r=n("59ed"),i=function(e){var t,n;this.promise=new e((function(e,r){if(void 0!==t||void 0!==n)throw TypeError("Bad Promise constructor");t=e,n=r})),this.resolve=r(t),this.reject=r(n)};e.exports.f=function(e){return new i(e)}},f36a:function(e,t,n){var r=n("e330");e.exports=r([].slice)},f5df:function(e,t,n){var r=n("da84"),i=n("00ee"),s=n("1626"),o=n("c6b6"),a=n("b622"),c=a("toStringTag"),l=r.Object,u="Arguments"==o(function(){return arguments}()),h=function(e,t){try{return e[t]}catch(n){}};e.exports=i?o:function(e){var t,n,r;return void 0===e?"Undefined":null===e?"Null":"string"==typeof(n=h(t=l(e),c))?n:u?o(t):"Object"==(r=o(t))&&s(t.callee)?"Arguments":r}},f6b4:function(e,t,n){"use strict";var r=n("c532");function i(){this.handlers=[]}i.prototype.use=function(e,t,n){return this.handlers.push({fulfilled:e,rejected:t,synchronous:!!n&&n.synchronous,runWhen:n?n.runWhen:null}),this.handlers.length-1},i.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},i.prototype.forEach=function(e){r.forEach(this.handlers,(function(t){null!==t&&e(t)}))},e.exports=i},f772:function(e,t,n){var r=n("5692"),i=n("90e3"),s=r("keys");e.exports=function(e){return s[e]||(s[e]=i(e))}},fb60:function(e,t,n){"use strict";var r=n("7917"),i=n("c532");function s(e){r.call(this,null==e?"canceled":e,r.ERR_CANCELED),this.name="CanceledError"}i.inherits(s,r,{__CANCEL__:!0}),e.exports=s},fc6a:function(e,t,n){var r=n("44ad"),i=n("1d80");e.exports=function(e){return r(i(e))}},fdbc:function(e,t){e.exports={CSSRuleList:0,CSSStyleDeclaration:0,CSSValueList:0,ClientRectList:0,DOMRectList:0,DOMStringList:0,DOMTokenList:1,DataTransferItemList:0,FileList:0,HTMLAllCollection:0,HTMLCollection:0,HTMLFormElement:0,HTMLSelectElement:0,MediaList:0,MimeTypeArray:0,NamedNodeMap:0,NodeList:1,PaintRequestList:0,Plugin:0,PluginArray:0,SVGLengthList:0,SVGNumberList:0,SVGPathSegList:0,SVGPointList:0,SVGStringList:0,SVGTransformList:0,SourceBufferList:0,StyleSheetList:0,TextTrackCueList:0,TextTrackList:0,TouchList:0}},fdbf:function(e,t,n){var r=n("4930");e.exports=r&&!Symbol.sham&&"symbol"==typeof Symbol.iterator},fea9:function(e,t,n){var r=n("da84");e.exports=r.Promise}}]);
//# sourceMappingURL=chunk-vendors.3ea15cf5.js.map