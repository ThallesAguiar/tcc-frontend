(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-13587e3a"],{"0fd9":function(t,e,n){"use strict";n("99af"),n("4160"),n("caad"),n("13d5"),n("4ec9"),n("b64b"),n("d3b7"),n("ac1f"),n("2532"),n("3ca3"),n("5319"),n("159b"),n("ddb0");var a=n("ade3"),r=n("5530"),i=(n("4b85"),n("2b0e")),c=n("d9f7"),o=n("80d2"),s=["sm","md","lg","xl"],l=["start","end","center"];function u(t,e){return s.reduce((function(n,a){return n[t+Object(o["z"])(a)]=e(),n}),{})}var d=function(t){return[].concat(l,["baseline","stretch"]).includes(t)},f=u("align",(function(){return{type:String,default:null,validator:d}})),v=function(t){return[].concat(l,["space-between","space-around"]).includes(t)},b=u("justify",(function(){return{type:String,default:null,validator:v}})),g=function(t){return[].concat(l,["space-between","space-around","stretch"]).includes(t)},p=u("alignContent",(function(){return{type:String,default:null,validator:g}})),h={align:Object.keys(f),justify:Object.keys(b),alignContent:Object.keys(p)},y={align:"align",justify:"justify",alignContent:"align-content"};function m(t,e,n){var a=y[t];if(null!=n){if(e){var r=e.replace(t,"");a+="-".concat(r)}return a+="-".concat(n),a.toLowerCase()}}var j=new Map;e["a"]=i["a"].extend({name:"v-row",functional:!0,props:Object(r["a"])(Object(r["a"])(Object(r["a"])({tag:{type:String,default:"div"},dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:d}},f),{},{justify:{type:String,default:null,validator:v}},b),{},{alignContent:{type:String,default:null,validator:g}},p),render:function(t,e){var n=e.props,r=e.data,i=e.children,o="";for(var s in n)o+=String(n[s]);var l=j.get(o);return l||function(){var t,e;for(e in l=[],h)h[e].forEach((function(t){var a=n[t],r=m(e,t,a);r&&l.push(r)}));l.push((t={"no-gutters":n.noGutters,"row--dense":n.dense},Object(a["a"])(t,"align-".concat(n.align),n.align),Object(a["a"])(t,"justify-".concat(n.justify),n.justify),Object(a["a"])(t,"align-content-".concat(n.alignContent),n.alignContent),t)),j.set(o,l)}(),t(n.tag,Object(c["a"])(r,{staticClass:"row",class:l}),i)}})},"10d2":function(t,e,n){"use strict";var a=n("8dd9");e["a"]=a["a"]},"615b":function(t,e,n){},"62ad":function(t,e,n){"use strict";n("4160"),n("caad"),n("13d5"),n("45fc"),n("4ec9"),n("a9e3"),n("b64b"),n("d3b7"),n("ac1f"),n("3ca3"),n("5319"),n("2ca0"),n("159b"),n("ddb0");var a=n("ade3"),r=n("5530"),i=(n("4b85"),n("2b0e")),c=n("d9f7"),o=n("80d2"),s=["sm","md","lg","xl"],l=function(){return s.reduce((function(t,e){return t[e]={type:[Boolean,String,Number],default:!1},t}),{})}(),u=function(){return s.reduce((function(t,e){return t["offset"+Object(o["z"])(e)]={type:[String,Number],default:null},t}),{})}(),d=function(){return s.reduce((function(t,e){return t["order"+Object(o["z"])(e)]={type:[String,Number],default:null},t}),{})}(),f={col:Object.keys(l),offset:Object.keys(u),order:Object.keys(d)};function v(t,e,n){var a=t;if(null!=n&&!1!==n){if(e){var r=e.replace(t,"");a+="-".concat(r)}return"col"!==t||""!==n&&!0!==n?(a+="-".concat(n),a.toLowerCase()):a.toLowerCase()}}var b=new Map;e["a"]=i["a"].extend({name:"v-col",functional:!0,props:Object(r["a"])(Object(r["a"])(Object(r["a"])(Object(r["a"])({cols:{type:[Boolean,String,Number],default:!1}},l),{},{offset:{type:[String,Number],default:null}},u),{},{order:{type:[String,Number],default:null}},d),{},{alignSelf:{type:String,default:null,validator:function(t){return["auto","start","end","center","baseline","stretch"].includes(t)}},tag:{type:String,default:"div"}}),render:function(t,e){var n=e.props,r=e.data,i=e.children,o=(e.parent,"");for(var s in n)o+=String(n[s]);var l=b.get(o);return l||function(){var t,e;for(e in l=[],f)f[e].forEach((function(t){var a=n[t],r=v(e,t,a);r&&l.push(r)}));var r=l.some((function(t){return t.startsWith("col-")}));l.push((t={col:!r||!n.cols},Object(a["a"])(t,"col-".concat(n.cols),n.cols),Object(a["a"])(t,"offset-".concat(n.offset),n.offset),Object(a["a"])(t,"order-".concat(n.order),n.order),Object(a["a"])(t,"align-self-".concat(n.alignSelf),n.alignSelf),t)),b.set(o,l)}(),t(n.tag,Object(c["a"])(r,{class:l}),i)}})},b0af:function(t,e,n){"use strict";n("0481"),n("4069"),n("a9e3");var a=n("5530"),r=(n("615b"),n("10d2")),i=n("297c"),c=n("1c87"),o=n("58df");e["a"]=Object(o["a"])(i["a"],c["a"],r["a"]).extend({name:"v-card",props:{flat:Boolean,hover:Boolean,img:String,link:Boolean,loaderHeight:{type:[Number,String],default:4},raised:Boolean},computed:{classes:function(){return Object(a["a"])(Object(a["a"])({"v-card":!0},c["a"].options.computed.classes.call(this)),{},{"v-card--flat":this.flat,"v-card--hover":this.hover,"v-card--link":this.isClickable,"v-card--loading":this.loading,"v-card--disabled":this.disabled,"v-card--raised":this.raised},r["a"].options.computed.classes.call(this))},styles:function(){var t=Object(a["a"])({},r["a"].options.computed.styles.call(this));return this.img&&(t.background='url("'.concat(this.img,'") center center / cover no-repeat')),t}},methods:{genProgress:function(){var t=i["a"].options.methods.genProgress.call(this);return t?this.$createElement("div",{staticClass:"v-card__progress",key:"progress"},[t]):null}},render:function(t){var e=this.generateRouteLink(),n=e.tag,a=e.data;return a.style=this.styles,this.isClickable&&(a.attrs=a.attrs||{},a.attrs.tabindex=0),t(n,this.setBackgroundColor(this.color,a),[this.genProgress(),this.$slots["default"]])}})},d89c:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("v-main",[n("v-container",{staticClass:"py-8 px-6"},[n("v-row",t._l(t.cards,(function(e){return n("v-col",{key:e,attrs:{cols:"12"}},[n("v-card",[n("v-subheader",[t._v(t._s(e))]),n("v-list",{attrs:{"two-line":""}},[t._l(6,(function(e){return[n("v-list-item",{key:e},[n("v-list-item-avatar",{attrs:{color:"grey darken-1"}}),n("v-list-item-content",[n("v-list-item-title",[t._v("Message "+t._s(e))]),n("v-list-item-subtitle",[t._v(" Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil repellendus distinctio similique ")])],1)],1),6!==e?n("v-divider",{key:"divider-"+e,attrs:{inset:""}}):t._e()]}))],2)],1)],1)})),1)],1)],1)],1)},r=[],i={data:function(){return{cards:["Today","Yesterday"]}}},c=i,o=n("2877"),s=n("6544"),l=n.n(s),u=n("b0af"),d=n("62ad"),f=n("a523"),v=n("ce7e"),b=n("8860"),g=n("da13"),p=n("8270"),h=n("5d23"),y=n("f6c4"),m=n("0fd9"),j=n("e0c7"),O=Object(o["a"])(c,a,r,!1,null,null,null);e["default"]=O.exports;l()(O,{VCard:u["a"],VCol:d["a"],VContainer:f["a"],VDivider:v["a"],VList:b["a"],VListItem:g["a"],VListItemAvatar:p["a"],VListItemContent:h["a"],VListItemSubtitle:h["b"],VListItemTitle:h["c"],VMain:y["a"],VRow:m["a"],VSubheader:j["a"]})}}]);
//# sourceMappingURL=chunk-13587e3a.1c398005.js.map