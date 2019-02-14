<template>
  <v-app>
   <v-content>
  <v-container>
  <v-layout align-center justify-center>
  <v-flex xs12>
  	 <div id="toolbar">
 	   	<div id="items">	
 	       	Järjestan:
 	       	<v-btn  round small dark  :color="getColor(1)">Metsasõbrad</v-btn>
     		<v-btn  round small dark  :color="getColor(2)">Elukoht</v-btn>
     		<v-btn  round small dark  :color="getColor(3)">Erakond</v-btn>
 		</div>
 	</div>
  <div id="metsakompass">

  	  <div id="diagram1"> 
 	  	<div id="responded"></div>
 	  	<div id="notresponded"></div>
 	  	<div id="repondedChip">Vastanud kandidaate {{respondersTotal }}</div>
 	  	<div id="notrepondedChip">Mittevastanud kandidaate {{notRespondersTotal }}</div>
 	  </div>
 	   <div id="table">

 		<div id="nimekiri">
 	   <v-data-table  hide-actions hide-headers
   			 :headers="tableHeaders"
   			 :items="candidates"
  		>
  		<template slot="items" slot-scope="props">
     		 <td>{{ props.item.name }}</td>
      		 <td class="text-xs-right">{{ props.item.erakond }}</td>
    		 <td class="text-xs-right">
    		 	<v-btn color="success" fab dark>
    		 		{{ props.item.nr }}
    		 	</v-btn>
    		 </td>
    </template>
  		
  		</v-data-table>
  		</div>
 	   </div>
  </div>
  </v-flex>
  </v-layout>
  </v-container>
  </v-content>
  </v-app>
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
	    	sheet1: "https://sheets.googleapis.com/v4/spreadsheets/11r-tkO-eiBq-Nwj3au7UPEDq4hvc8xuvykwGDIgvgW8/values/Sheet1!A1:H1025",
	    	candidates:[],
	    	headers:[],
	    	sort: 1,
	    	respondersTotal: 0,
	    	notRespondersTotal: 0,
	    	parties:{
	    		"Erakond Eestimaa Rohelised":{code:"ER",color:"#89B046",image:"/images/rohelised.png",candidates:0,responded:0,notresponded:0},
	    		"Elurikkuse Erakond":{code:"EE",color:"#F7C640",image:"/images/ere.png",candidates:0,responded:0,notresponded:0},
	    		"Erakond Eesti 200":{code:"E200",color:"#31758A",image:"/images/eesti200.png",candidates:0,responded:0,notresponded:0},
	    		"Isamaa Erakond":{code:"IE",color:"#009CE2",image:"/images/isamaa.png",candidates:0,responded:0,notresponded:0},
	    		"Eesti Reformierakond":{code:"RE",color:"#FFE200",image:"/images/reform.png",candidates:0,responded:0,notresponded:0},
	    		"Eesti Keskerakond":{code:"KE",color:"#007557",image:"/images/kesk.png",candidates:0,responded:0,notresponded:0},
	    		"Eesti Vabaerakond":{code:"EV",color:"#0089D1",image:"/images/vaba.png",candidates:0,responded:0,notresponded:0},
	    		"Eesti Konservatiivne Rahvaerakond":{code:"EK",image:"/images/ekre.png",color:"#0077BD",candidates:0,responded:0,notresponded:0},
	    		"Sotsiaaldemokraatlik Erakond":{code:"SE",color:"#E10600",image:"/images/sde.png",candidates:0,responded:0,notresponded:0}
	    	},
	    	responded:{
	    		name:"responded",
	    		color:"transparent",
	    		children:[]
	    	},notresponded:{
	    		name:"notresponded",
	    		color:"transparent",
	    		children:[]
	    	},
	    	tableHeaders: [
	    		
	    		{name: "Kandidaat", sortable:false},
	    		{name: "Erakond", sortable:false},
	    		{name: "Number", sortable:false},
	    	]
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
			    var f = headers.indexOf('First Name');
			    var l = headers.indexOf('Last Name');
			    var nr = headers.indexOf('Kandidaadi number');
			    for(var c in response.body.values){
		        	var canditate =  response.body.values[c]; 	
		        	
		        	var p = this.parties[canditate[party]];
		        	var r = canditate[responded];
		        	var n = canditate[nr];
		        	
		        	canditate.nr  = n;
		        	canditate.erakond = canditate[party];
		        	canditate.name = canditate[f]+" "+canditate[l];
		        	this.candidates.push(canditate);
		        	
		        	if(p != undefined){
			        	p.candidates++;
			        	if(r != undefined && r == "x"){
			        		this.respondersTotal++;
			        		p.responded++;
			        	}else{
			        		p.notresponded++;
			        		this.notRespondersTotal++;
			        	}
		        		
		        	}

		        }
		        

			    for(var p in this.parties){
			    	var party = this.parties[p];
			    	if(party.responded > 0){
			    		this.responded.children.push(
			    			{name:p,
			    				total:party.candidates,
			    				code:party.code, 
			    				color: party.color,
			    				responded: party.responded,
			    				size: this.calculateRespondedPercent(party)
			    			});	
			    		this.notresponded.children.push(
			    			{name:p,
			    				total:party.candidates, 
			    				code:party.code,
			    				color: party.color,
			    				notresponded: party.notresponded,
			    				size:this.calculateNotRespondedPercent(party)
			    			});
			    	}else{
			    		this.notresponded.children.push(
			    			{name:p,
			    				total:party.candidates,
			    				code:party.code, 
			    				color: party.color,
			    				notresponded: party.notresponded,
			    				size:this.calculateNotRespondedPercent(party)
			    			});
			    	}
			    	
			    	
			    }
			      
		        this.drawFeedbackChart(this.responded,"#responded");
		        this.drawFeedbackChart(this.notresponded,"#notresponded");

		        
		  });	      
	   });
  },
  methods:{
	  drawFeedbackChart: function(data,element){
		  var w = 400,h = 300,format = d3.format(",d");
		  var nodes = d3.layout.pack().size([w - 4, h - 4]).value(function(d) { return d.size; }).nodes(data);
		
		  var feedback = d3.select(element)
		  	.append("svg:svg").attr("width", w).attr("height", h).attr("class", "pack")
		  	.append("svg:g").attr("transform", "translate(2, 2)");
		  
		 var defs = feedback.append("svg:defs"); 
		 for(var p in this.parties){
			 var party = this.parties[p];
			  defs.append("svg:filter")
			  	.attr("id",party.code).attr("x","0%").attr("y","0%")
			  	.attr("height","100%").attr("width","100%")
			  	.append("feImage").attr("xlink:href",party.image);			 
		 }
		 


		  
		  var node = feedback.selectAll('g.node').data(nodes).enter()
		  .append("svg:g").attr("class", function(d) { return d.children ? "node" : "leaf node"; })
      		.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
		  
		  if(element == "#responded"){
			  node.append("svg:title").attr("class","percentTitle").text(function(d) { return d.name +" Vastanuid "+d.responded+" kandidaati.  "+d.size +" %"}); 
		  }else{
			  node.append("svg:title").text(function(d) { return d.name +" Mittevastanuid "+d.notresponded+" kandidaati.  "+d.size +" %"});
		  }
		 
		  
	      node.append('svg:circle')
	        .attr('r', function(d) { return d.r; })
	        .attr('class', function(d) { return d.responded ? "responded" : "notresponded"; })
	        .attr('fill', function(d) { return d.color; })
	        .attr('filter', function(d) { return "url(#"+d.code+")"; })
	        .attr('title', function(d) { return d.name; });

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
	  },
	  getColor: function(i){
		  if (this.sort == i){
			  return "light-green lighten-1";
		  }else{
			  return "blue-grey lighten-1";
		  }
	  }
  }
}
</script>

<style>
#metsakompass {
  font-family: 'Verdana', Helvetica, Arial, sans-serif;
}

#metsakompass{
	display: flex; /* or inline-flex */
	flex-direction: row wrap ;
	
}

#table {
	width: 620px;
	flex-grow: 1;
	padding-left: 30px;
}

#toolbar{
  position: sticky;
  top: 40px;
  height: 40px;
  padding-bottom: 45px;
  background-color: white;
}

#items{
 	padding-right: 45px;
	float: right;
}

#nimekiri{
	margin-top: 100px;
}


#diagram1 {
  background: transparent url("./assets/liivakell.png") no-repeat top left;
  width:  400px;
  height: 602px;
  position: sticky;
  top: 100px;
}


#responded, #notresponded{
	width:  400px;
	background-color:transparent;
}

#repondedChip{
	position: relative;
	top: -605px;
	left: 10px;
	color: white;
	background-color: #37474F;
	opacity: 0.8;
	font-size: 16px;
	width: 380px;
	height: 42px;
	text-align: center;
	border-radius: 5px;
	vertical-align: middle;
	line-height:40px;
	
}

#notrepondedChip{
	position: relative;
	bottom:93px;
	left: 10px;
	color: white;
	background-color: #37474F;
	opacity: 0.8;
	font-size: 16px;
	width: 380px;
	height: 39px;
	text-align: center;
	border-radius: 5px;
	vertical-align: middle;
	line-height:40px;
	
}

.percentTitle{
	font: bold 18px sans-serif; 
	fill: white;
	visibility: hidden;
	
}

.responded:hover .percentTitle {
    visibility: visible;
}

circle:hover {
   transform: scale(1.1);
}

</style>
