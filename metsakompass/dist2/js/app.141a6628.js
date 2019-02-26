(function(e){function t(t){for(var r,d,s=t[0],i=t[1],c=t[2],u=0,p=[];u<s.length;u++)d=s[u],a[d]&&p.push(a[d][0]),a[d]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r]);l&&l(t);while(p.length)p.shift()();return o.push.apply(o,c||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],r=!0,s=1;s<n.length;s++){var i=n[s];0!==a[i]&&(r=!1)}r&&(o.splice(t--,1),e=d(d.s=n[0]))}return e}var r={},a={app:0},o=[];function d(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,d),n.l=!0,n.exports}d.m=e,d.c=r,d.d=function(e,t,n){d.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},d.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},d.t=function(e,t){if(1&t&&(e=d(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(d.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)d.d(n,r,function(t){return e[t]}.bind(null,r));return n},d.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return d.d(t,"a",t),t},d.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},d.p="/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],i=s.push.bind(s);s.push=t,s=s.slice();for(var c=0;c<s.length;c++)t(s[c]);var l=i;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";var r=n("64a9"),a=n.n(r);a.a},1:function(e,t){},"56d7":function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("f751"),n("097d");var r=n("2b0e"),a=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},o=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"metsakompass"}},[n("div",{attrs:{id:"diagram1"}},[n("div",{attrs:{id:"responded"}}),n("div",{attrs:{id:"notresponded"}})]),n("div",{attrs:{id:"legend"}},[e._v("...")])])}],d=n("59ad"),s=n.n(d),i=(n("7f7f"),n("ac6a"),n("28dd")),c=n("67b0");r["a"].use(c["a"]),r["a"].use(i["a"]);var l={name:"app",data:function(){return{API_KEY:"AIzaSyBm00X5S1A4rNc4MlyR6yRyQaR5un7Qb40",api:"https://sheets.googleapis.com/v4/spreadsheets/11r-tkO-eiBq-Nwj3au7UPEDq4hvc8xuvykwGDIgvgW8",sheet1:"https://sheets.googleapis.com/v4/spreadsheets/11r-tkO-eiBq-Nwj3au7UPEDq4hvc8xuvykwGDIgvgW8/values/Sheet1!A1:H1025",candidates:{},headers:[],parties:{"Erakond Eestimaa Rohelised":{code:"ER",color:"#89B046",candidates:0,responded:0},"Elurikkuse Erakond":{code:"EE",color:"#F7C640",candidates:0,responded:0},"Erakond Eesti 200":{code:"E200",color:"#31758A",candidates:0,responded:0},"Isamaa Erakond":{code:"IE",color:"#009CE2",candidates:0,responded:0},"Eesti Reformierakond":{code:"ER",color:"#FFE200",candidates:0,responded:0},"Eesti Keskerakond":{code:"KE",color:"#007557",candidates:0,responded:0},"Eesti Vabaerakond":{code:"EV",color:"#0089D1",candidates:0,responded:0},"Eesti Konservatiivne Rahvaerakond":{code:"EK",color:"#0077BD",candidates:0,responded:0},"Sotsiaaldemokraatlik Erakond":{code:"SE",color:"#E10600",candidates:0,responded:0}},responded:{name:"responded",color:"transparent",children:[]},notresponded:{name:"notresponded",color:"transparent",children:[]}}},created:function(){var e=this;r["a"].loadScript("http://d3js.org/d3.v2.js").then(function(){console.log("done loading"),e.$http.get(e.sheet1,{params:{key:e.API_KEY}}).then(function(t){var n=t.body.values.shift();console.log(n),e.headers=n;var r=n.indexOf("Erakonna nimekiri"),a=n.indexOf("Vastanud"),o=n.indexOf("Kandidaadi number");for(var d in t.body.values){var s=t.body.values[d],i=e.parties[s[r]],c=s[a],l=s[o];e.candidates[l]=s,void 0!=i&&(i.candidates++,void 0!=c&&"x"==c&&i.responded++)}for(var i in e.parties){r=e.parties[i];r.responded>0?(e.responded.children.push({name:i,total:r.candidates,code:r.code,color:r.color,size:e.calculateRespondedPercent(r)}),e.notresponded.children.push({name:i,total:r.candidates,code:r.code,color:r.color,size:e.calculateNotRespondedPercent(r)})):e.notresponded.children.push({name:i,total:r.candidates,code:r.code,color:r.color,size:e.calculateNotRespondedPercent(r)})}e.drawFeedbackChart(e.responded,"#responded"),e.drawFeedbackChart(e.notresponded,"#notresponded")})})},methods:{drawFeedbackChart:function(e,t){var n=400,r=300,a=(d3.format(",d"),d3.layout.pack().size([n-4,r-4]).value(function(e){return e.size}).nodes(e)),o=d3.select(t).append("svg:svg").attr("width",n).attr("height",r).attr("class","pack").append("svg:g").attr("transform","translate(2, 2)"),d=o.selectAll("g.node").data(a).enter().append("svg:g").attr("class",function(e){return e.children?"node":"leaf node"}).attr("transform",function(e){return"translate("+e.x+","+e.y+")"});"#responded"==t?d.append("svg:title").text(function(e){return e.name+" "+e.total+" kandidaati. Vastanuid "+e.size+" %"}):d.append("svg:title").text(function(e){return e.name+" "+e.total+" kandidaati. Mittevastanuid "+e.size+" %"}),d.append("svg:circle").attr("r",function(e){return e.r}).attr("fill",function(e){return e.color}).attr("class",function(e){return e.code}).attr("title",function(e){return e.name}),d.filter(function(e){return!e.children}).append("svg:text").attr("text-anchor","middle").attr("class","percentTitle").text(function(e){return e.size+" %"})},calculateRespondedPercent:function(e){return s()(100/e.candidates*e.responded).toFixed(0)},calculateNotRespondedPercent:function(e){return s()(100/e.candidates*(e.candidates-e.responded)).toFixed(0)}}},u=l,p=(n("034f"),n("2877")),f=Object(p["a"])(u,a,o,!1,null,null,null),v=f.exports;r["a"].config.productionTip=!1,new r["a"]({render:function(e){return e(v)}}).$mount("#app")},"64a9":function(e,t,n){}});
//# sourceMappingURL=app.141a6628.js.map