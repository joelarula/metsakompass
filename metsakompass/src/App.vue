<template>
  <div id="metsakompass">
 	  <div>Vastanud</div>
 	  <div id="responded"></div>
 	  <div>Mittevastanud</div>
 	  <div id="notresponded"></div>
  </div>
</template>

<script>
import Vue from 'vue';
import VueResource from 'vue-resource';

import LoadScript from 'vue-plugin-load-script';
Vue.use(LoadScript);
Vue.use(VueResource);

export default {
  name: 'app',
  data: function (){
	    return {
	    	API_KEY: "AIzaSyBm00X5S1A4rNc4MlyR6yRyQaR5un7Qb40", // "AIzaSyDoaUoLlpzmIqWpYg_eAhlbFtRvuAjUcPg", 
	    	api: "https://sheets.googleapis.com/v4/spreadsheets/11r-tkO-eiBq-Nwj3au7UPEDq4hvc8xuvykwGDIgvgW8",
	    	sheet1: "https://sheets.googleapis.com/v4/spreadsheets/11r-tkO-eiBq-Nwj3au7UPEDq4hvc8xuvykwGDIgvgW8/values/Sheet1!A1:F1025",
	    	candidates:{},
	    	headers:[],
	    	parties:{
	    		"Erakond Eestimaa Rohelised":{code:"ER",color:"#89B046",candidates:0,responded:0},
	    		"Elurikkuse Erakond":{code:"EE",color:"#F7C640",candidates:0,responded:0},
	    		"Erakond Eesti 200":{code:"E200",color:"#31758A",candidates:0,responded:0},
	    		"Isamaa Erakond":{code:"IE",color:"#009CE2",candidates:0,responded:0},
	    		"Eesti Reformierakond":{code:"ER",color:"#FFE200",candidates:0,responded:0},
	    		"Eesti Keskerakond":{code:"KE",color:"#007557",candidates:0,responded:0},
	    		"Eesti Vabaerakond":{code:"EV",color:"#0089D1",candidates:0,responded:0},
	    		"Eesti Konservatiivne Rahvaerakond":{code:"EK",color:"#0077BD",candidates:0,responded:0},
	    		"Sotsiaaldemokraatlik Erakond":{code:"SE",color:"#E10600",candidates:0,responded:0}
	    	},
	    	responded:{
	    		name:"responded",
	    		color:"white",stroke:"black",
	    		children:[]
	    	},notresponded:{
	    		name:"notresponded",
	    		color:"white",stroke:"black",
	    		children:[]
	    	}
	    }
  },
  created: function(){
	  Vue.loadScript("http://d3js.org/d3.v2.js")
	    .then(() => {
	      console.log("done loading");
	      
	      //d3.select("body").style("background-color", "black");
		  this.$http.get(this.sheet1,{params:{key:this.API_KEY}}).then(response => {
		       
			    var headers = response.body.values.shift();
			    console.log(headers);
			    this.headers = headers;
			    var party = headers.indexOf('Erakonna nimekiri');
			    var responded = headers.indexOf('Vastanud');
			    for(var c in response.body.values){
		        	var canditate =  response.body.values[c]; 	
		        	//console.log(canditate);
		        	var p = this.parties[canditate[party]];
		        	var r = canditate[responded];
		        	p.candidates++;
		        	if(r != undefined && r == "x"){
		        		p.responded++;
		        	}
		        }
		        

			    for(var p in this.parties){
			    	var party = this.parties[p];
			    	if(party.responded > 0){
			    		this.responded.children.push({"name":p,total:party.candidates,code:party.code
			    			, color: party.color,size: this.calculateRespondedPercent(party)});	
			    		this.notresponded.children.push({"name":p,total:party.candidates, 
			    			code:party.code, color: party.color,size:this.calculateNotRespondedPercent(party)});
			    	}else{
			    		this.notresponded.children.push({"name":p,total:party.candidates,
			    			code:party.code, color: party.color,size:this.calculateNotRespondedPercent(party)});
			    	}
			    	
			    	
			    }
			      
		        this.drawFeedbackChart(this.responded,"#responded");
		        this.drawFeedbackChart(this.notresponded,"#notresponded");

		        
		  });	      
	   });
  },
  methods:{
	  drawFeedbackChart: function(data,element){
		  var w = 400,h = 400,format = d3.format(",d");
		  var nodes = d3.layout.pack().size([w - 4, h - 4]).value(function(d) { return d.size; }).nodes(data);
		
		  var feedback = d3.select(element)
		  	.append("svg:svg").attr("width", w).attr("height", h).attr("class", "pack")
		  	.append("svg:g").attr("transform", "translate(2, 2)");
		  
		  var node = feedback.selectAll('g.node').data(nodes).enter()
		  .append("svg:g").attr("class", function(d) { return d.children ? "node" : "leaf node"; })
      		.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
		  
		  node.append("svg:title").text(function(d) { return d.name +" "+d.total+" kandidaati osavõtt "+d.percent +" %"});
		  
	      node.append('svg:circle')
	        .attr('r', function(d) { return d.r; })
	        .attr('fill', function(d) { return d.color; })
	        .attr('class', function(d) { return d.code; })
	        .attr('title', function(d) { return d.name; })
	        .attr('stroke', 'grey')

	      node.filter(function(d) { return !d.children; }).append("svg:text")
	        .attr("text-anchor", "middle")
	        .attr('class', "percentTitle")
	        .text(function(d) { return d.size +" %" });
	       
	  },
	  calculateRespondedPercent: function(p){
		  return parseFloat((100 / p.candidates ) * p.responded).toFixed(0);		  
	  },
	  calculateNotRespondedPercent: function(p){
		  
		  return parseFloat((100 / p.candidates ) * (p.candidates - p.responded)).toFixed(0);		  
	  }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}



.percentTitle{
	font: bold 16px sans-serif; 
	fill: black;
}


</style>
