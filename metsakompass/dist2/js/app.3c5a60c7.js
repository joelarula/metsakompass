(function(e){function t(t){for(var n,d,s=t[0],i=t[1],c=t[2],l=0,u=[];l<s.length;l++)d=s[l],a[d]&&u.push(a[d][0]),a[d]=0;for(n in i)Object.prototype.hasOwnProperty.call(i,n)&&(e[n]=i[n]);p&&p(t);while(u.length)u.shift()();return o.push.apply(o,c||[]),r()}function r(){for(var e,t=0;t<o.length;t++){for(var r=o[t],n=!0,s=1;s<r.length;s++){var i=r[s];0!==a[i]&&(n=!1)}n&&(o.splice(t--,1),e=d(d.s=r[0]))}return e}var n={},a={app:0},o=[];function d(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,d),r.l=!0,r.exports}d.m=e,d.c=n,d.d=function(e,t,r){d.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},d.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},d.t=function(e,t){if(1&t&&(e=d(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(d.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)d.d(r,n,function(t){return e[t]}.bind(null,n));return r},d.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return d.d(t,"a",t),t},d.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},d.p="/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],i=s.push.bind(s);s.push=t,s=s.slice();for(var c=0;c<s.length;c++)t(s[c]);var p=i;o.push([0,"chunk-vendors"]),r()})({0:function(e,t,r){e.exports=r("56d7")},"034f":function(e,t,r){"use strict";var n=r("64a9"),a=r.n(n);a.a},1:function(e,t){},"56d7":function(e,t,r){"use strict";r.r(t);r("cadf"),r("551c"),r("f751"),r("097d");var n=r("2b0e"),a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-app",[r("v-content",[r("v-container",[r("v-layout",{attrs:{"align-center":"","justify-center":""}},[r("v-flex",{attrs:{xs12:""}},[r("div",{attrs:{id:"toolbar"}},[r("div",{attrs:{id:"items"}},[e._v("\t\n\t       \tJärjestan:\n\t       \t"),r("v-btn",{attrs:{round:"",small:"",dark:"",color:e.getColor(1)},nativeOn:{click:function(t){return e.setSort(1)}}},[e._v("Metsasõbrad")]),r("v-btn",{attrs:{round:"",small:"",dark:"",color:e.getColor(2)},nativeOn:{click:function(t){return e.setSort(2)}}},[e._v("Elukoht")]),r("v-btn",{attrs:{round:"",small:"",dark:"",color:e.getColor(3)},nativeOn:{click:function(t){return e.setSort(3)}}},[e._v("Erakond")])],1)]),r("div",{attrs:{id:"metsakompass"}},[r("div",{attrs:{id:"diagram1"}},[r("div",{attrs:{id:"responded"}}),r("div",{attrs:{id:"notresponded"}}),r("div",{attrs:{id:"repondedChip"}},[e._v("Vastanud kandidaate "+e._s(e.respondersTotal))]),r("div",{attrs:{id:"notrepondedChip"}},[e._v("Mittevastanud kandidaate "+e._s(e.notRespondersTotal))])]),r("div",{attrs:{id:"table"}},[r("div",{attrs:{id:"nimekiri"}},[r("v-data-table",{attrs:{"hide-actions":"","hide-headers":"",headers:e.tableHeaders,items:e.sortCandidates},scopedSlots:e._u([{key:"items",fn:function(t){return[t.item.divider?[r("td",{attrs:{colspan:"3"}},[r("a",{staticClass:"elabel",attrs:{href:t.item.code}},[e._v(e._s(t.item.name))])])]:[r("td",[e._v(e._s(t.item.name))]),r("td",{staticClass:"text-xs-right"},[e._v(e._s(t.item.erakond))]),r("td",{staticClass:"text-xs-right"},[r("v-btn",{attrs:{color:"success",fab:"",dark:""}},[e._v("\n   \t\t \t\t\t"+e._s(t.item.nr)+"\n   \t\t \t\t")])],1)]]}}])})],1)])])])],1)],1)],1)],1)},o=[],d=r("59ad"),s=r.n(d),i=(r("7f7f"),r("55dd"),r("ac6a"),r("28dd")),c=r("67b0");n["a"].use(c["a"]),n["a"].use(i["a"]);var p={name:"app",data:function(){return{API_KEY:"AIzaSyBm00X5S1A4rNc4MlyR6yRyQaR5un7Qb40",api:"https://sheets.googleapis.com/v4/spreadsheets/11r-tkO-eiBq-Nwj3au7UPEDq4hvc8xuvykwGDIgvgW8",sheet1:"https://sheets.googleapis.com/v4/spreadsheets/11r-tkO-eiBq-Nwj3au7UPEDq4hvc8xuvykwGDIgvgW8/values/Sheet1!A1:H1025",candidates:[],headers:[],sort:1,respondersTotal:0,notRespondersTotal:0,chars:["a","b","c","d","e","f","g","h","i","j","k","l"],parties:{"Erakond Eestimaa Rohelised":{code:"ER",color:"#89B046",image:"/images/rohelised.png",candidates:0,responded:0,notresponded:0,order:"a"},"Elurikkuse Erakond":{code:"EE",color:"#F7C640",image:"/images/ere.png",candidates:0,responded:0,notresponded:0,order:"b"},"Erakond Eesti 200":{code:"E200",color:"#31758A",image:"/images/eesti200.png",candidates:0,responded:0,notresponded:0,order:"c"},"Isamaa Erakond":{code:"IE",color:"#009CE2",image:"/images/isamaa.png",candidates:0,responded:0,notresponded:0,order:"d"},"Eesti Reformierakond":{code:"RE",color:"#FFE200",image:"/images/reform.png",candidates:0,responded:0,notresponded:0,order:"e"},"Eesti Keskerakond":{code:"KE",color:"#007557",image:"/images/kesk.png",candidates:0,responded:0,notresponded:0,order:"f"},"Eesti Vabaerakond":{code:"EV",color:"#0089D1",image:"/images/vaba.png",candidates:0,responded:0,notresponded:0,order:"g"},"Eesti Konservatiivne Rahvaerakond":{code:"EK",image:"/images/ekre.png",color:"#0077BD",candidates:0,responded:0,notresponded:0,order:"h"},"Sotsiaaldemokraatlik Erakond":{code:"SE",color:"#E10600",image:"/images/sde.png",candidates:0,responded:0,notresponded:0,order:"i"}},responded:{name:"responded",color:"transparent",children:[]},notresponded:{name:"notresponded",color:"transparent",children:[]},tableHeaders:[{name:"Kandidaat",sortable:!1},{name:"Erakond",sortable:!1},{name:"Number",sortable:!1}]}},created:function(){var e=this;n["a"].loadScript("http://d3js.org/d3.v2.js").then(function(){console.log("done loading"),e.$http.get(e.sheet1,{params:{key:e.API_KEY}}).then(function(t){var r=t.body.values.shift();e.headers=r;var n=r.indexOf("Erakonna nimekiri"),a=r.indexOf("Vastanud"),o=r.indexOf("First Name"),d=r.indexOf("Last Name"),s=r.indexOf("Kandidaadi number");for(var i in t.body.values){var c=t.body.values[i],p=e.parties[c[n]],l=c[a],u=c[s];c.nr=u,c.divider=!1,c.erakond=c[n],c.name=c[o]+" "+c[d],void 0!=p&&(c.party=p,p.candidates++,void 0!=l&&"x"==l?(e.respondersTotal++,p.responded++,e.candidates.push(c)):(p.notresponded++,e.notRespondersTotal++))}var f=[];for(var p in e.parties){n=e.parties[p];f.push({responded:n.responded,party:p}),n.responded>0?(e.responded.children.push({name:p,total:n.candidates,code:n.code,color:n.color,responded:n.responded,size:e.calculateRespondedPercent(n)}),e.notresponded.children.push({name:p,total:n.candidates,code:n.code,color:n.color,notresponded:n.notresponded,size:e.calculateNotRespondedPercent(n)})):e.notresponded.children.push({name:p,total:n.candidates,code:n.code,color:n.color,notresponded:n.notresponded,size:e.calculateNotRespondedPercent(n)})}for(var v in f.sort(function(e,t){return t.responded-e.responded}),f){p=f[v];e.parties[p.party].order=e.chars[v]}e.drawFeedbackChart(e.responded,"#responded"),e.drawFeedbackChart(e.notresponded,"#notresponded")})})},computed:{sortCandidates:function(){if(1==this.sort)return this.candidates.sort(function(e,t){var r=e[2]+e[1],n=t[2]+t[1];return r.localeCompare(n)});if(3==this.sort){var e="",t=this.candidates.sort(function(e,t){var r=(void 0!=e.party?e.party.order:"j")+e.erakond+e[2]+e[1],n=(void 0!=t.party?t.party.order:"j")+t.erakond+t[2]+t[1];return r.localeCompare(n)}),r=[];for(var n in t){var a=t[n];0!=a.erakond.localeCompare(e)&&(e=a.erakond,r.push({name:a.erakond,divider:!0,code:a.party?"#"+a.party.code:"#YX"})),r.push(a)}return r}return this.candidates}},methods:{drawFeedbackChart:function(e,t){var r=400,n=300,a=(d3.format(",d"),d3.layout.pack().size([r-4,n-4]).value(function(e){return e.size}).nodes(e)),o=d3.select(t).append("svg:svg").attr("width",r).attr("height",n).attr("class","pack").append("svg:g").attr("transform","translate(2, 2)"),d=o.append("svg:defs");for(var s in this.parties){var i=this.parties[s];d.append("svg:filter").attr("id",i.code).attr("x","0%").attr("y","0%").attr("height","100%").attr("width","100%").append("feImage").attr("xlink:href",i.image)}var c=o.selectAll("g.node").data(a).enter().append("svg:g").attr("class",function(e){return e.children?"node":"leaf node"}).attr("transform",function(e){return"translate("+e.x+","+e.y+")"});"#responded"==t?c.append("svg:title").attr("class","percentTitle").text(function(e){return e.name+" Vastanuid "+e.responded+" kandidaati.  "+e.size+" %"}):c.append("svg:title").text(function(e){return e.name+" Mittevastanuid "+e.notresponded+" kandidaati.  "+e.size+" %"}),c.append("svg:circle").attr("r",function(e){return e.r}).attr("class",function(e){return e.responded?"responded":"notresponded"}).attr("fill",function(e){return e.color}).attr("filter",function(e){return"url(#"+e.code+")"}).attr("title",function(e){return e.name}).on("click",function(e){console.log(e)}),c.filter(function(e){return!e.children}).append("svg:text").attr("text-anchor","middle").attr("class","percentTitle").text(function(e){return e.size+" %"})},calculateRespondedPercent:function(e){return s()(100/e.candidates*e.responded).toFixed(0)},calculateNotRespondedPercent:function(e){return s()(100/e.candidates*(e.candidates-e.responded)).toFixed(0)},getColor:function(e){return this.sort==e?"light-green lighten-1":"blue-grey lighten-1"},setSort:function(e){this.sort=e}}},l=p,u=(r("034f"),r("2877")),f=Object(u["a"])(l,a,o,!1,null,null,null),v=f.exports,h=r("bb71"),m=r("a722"),g=r("549c"),k=r("a523"),b=r("2a7f"),y=r("7496"),E=r("71d9"),x=r("132d"),_=r("8336"),C=r("0e8f"),O=r("8fea"),w=r("cc20");r("da64"),r("d1e7");n["a"].use(h["a"],{components:{VLayout:m["a"],VContent:g["a"],VContainer:k["a"],VToolbarItems:b["a"],VApp:y["a"],VToolbar:E["a"],VIcon:x["a"],VBtn:_["a"],VFlex:C["a"],VDataTable:O["a"],VChip:w["a"]}}),n["a"].config.productionTip=!1,new n["a"]({render:function(e){return e(v)}}).$mount("#app")},"64a9":function(e,t,r){}});
//# sourceMappingURL=app.3c5a60c7.js.map