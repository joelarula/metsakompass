<template>
  <v-app>
   <v-content>
  <v-container>
  <v-layout align-center justify-center>


  </v-flex>
  <v-flex xs12 md12>
     <div id="logo">
     	<span class=" logotext display-1">EMA kandidaadiküsitlus 2019</span>
     </div>
		
  	 <div id="toolbar">
  	 	<div id="diagrams">
  	 		<v-btn  round small dark  :color="getDColor(1)" @click.native="setDiagram(1)">Osalus</v-btn>
  	 		<v-btn  round small dark  :color="getDColor(2)" @click.native="setDiagram(2)">Osalejad</v-btn>
  	 		<v-btn  round small dark  :color="getDColor(3)" @click.native="setDiagram(3)">Tulemus</v-btn>
  	 	</div>
 	   	<div id="items">	
 	       	Järjestan:
 	       	<v-btn  round small dark  :color="getColor(1)" @click.native="setSort(1)">Metsasõbrad</v-btn>
     		<v-btn  round small dark  :color="getColor(2)" @click.native="setSort(2)">Ringkond</v-btn>
     		<v-btn  round small dark  :color="getColor(3)" @click.native="setSort(3)">Erakond</v-btn>
 		</div>
 	</div>
  <div id="metsakompass">
	  <div id="diagrammid">
  	  <div id="diagram2" :class="showDiagram(1)">
  	   		<div id="respondedTotal"></div>
  	  </div> 
	  <div id="diagram1" :class="showDiagram(2)"> 
 	  	<div id="d1">
 	  		<div id="responded"></div>
 	  		<div id="notresponded"></div>
 	  	</div>
 	  	<div id="repondedChip">Vastanud kandidaate {{respondersTotal }}</div>
 	  	<div id="notrepondedChip">Mittevastanud kandidaate {{notRespondersTotal }}</div>
 	  </div>
 	  <div id="diagram3" :class="showDiagram(3)"> 
 	  	<div v-for="p in sortParties">
 	  	  <v-layout>
 	  	  <v-flex sm1 xs1 md1>
 	  	  </v-flex>
 	  	  	<v-flex sm3 xs3 md3>
 	  			<div class="plogo" :style="getStyle(p)" :title="p.name">
 	  			</div>
 	  		</v-flex>
 	  		<v-flex sm3 xs3 md3>
 	  		<v-btn :color="getCandidateColor(p.total)" fab dark  >
    		 </v-btn>
 	  		</v-flex>
 	  	</v-layout>	
 	  	</div>
 	  </div>
 	  </div>
 	  	
 	   <div id="table">

 		<div id="nimekiri">
 	   <v-data-table  hide-actions hide-headers
   			 :headers="tableHeaders"
   			 :items="sortCandidates"
  		>
  		<template slot="items" slot-scope="props">
     		<template v-if="!props.item.divider">
    
     		 	<td>
     		 		<a :href="getLink(props.item)" class="nimi" title = "Ava Piirkonna Leht">{{ props.item.name }}</a>
     		 		</td>
      		 	<td class="text-xs-right">
      		 	<template v-if="sort==1">
      		 		{{ props.item.erakond }}
      		 	</template>
      		 	<template v-else>
      		 		<template v-if="sort==3">
      		 			{{ props.item.ringkond }}
      		 		</template>
      		 		<template v-else>
      		 			{{ props.item.erakond }}
      		 		</template>
      		 	
      		 	</template>
      		 	</td>
    		 	
    		 	<td class="text-xs-right" >
    		 	
    		 		<v-tooltip right>
      					<template >
        					<v-btn slot="activator" :color="getCandidateColor(props.item.total)" fab dark  @click.native="openAnkeet(props.item)">
    		 					{{ props.item.nr }}
    		 				</v-btn>
  						</template>
      					<div>
      						<div> Petitsioon:  <span class="cbullet" :style="getCandidateColorB(props.item.petitsioon)" >&#9632;</span> 						
      						</div>
      						<div> Biomass: <span class="cbullet" :style="getCandidateColorB(props.item.biomass)" >&#9632;</span> 
      						</div>
      						<div> Raiemaht: <span class="cbullet" :style="getCandidateColorB(props.item.raiemaht)" >&#9632;</span> 
      						</div>
      						<div> Metsamajandus: <span class="cbullet" :style="getCandidateColorB(props.item.majandus)" >&#9632;</span> 
      						</div>
      						<div> Jaht: <span class="cbullet" :style="getCandidateColorB(props.item.jaht)" >&#9632;</span> 
      						</div>
      						<div> Poliitika: <span class="cbullet" :style="getCandidateColorB(props.item.poliitika)" >&#9632;</span> 
      						</div>
      					</div>
    				</v-tooltip>
    		 	

    		 	</td>
    		 
       			</template>
    			<template v-else>
    				<td colspan="3"><a class="elabel" :href="props.item.code" >{{props.item.name}}</a></td>
    			</template>
    		</template>
  		
  		</v-data-table>
  		</div>
 	   </div>
  </div>
  </v-flex>
   <template v-if="!loaded">
   <v-flex xs12>
  
    	<v-progress-circular  align-center
      :size="200"
      color="green"
      :width="15"
      indeterminate
    >Metsakompass 
    laen andmeid 
    ...</v-progress-circular>
    
  
  </v-flex>	
  </template>
  </v-layout>
  </v-container>
  </v-content>
  </v-app>
</template>

<script>
import Vue from 'vue';
import VueResource from 'vue-resource';
import backup from './assets/backup.json';

import LoadScript from 'vue-plugin-load-script';
Vue.use(LoadScript);
Vue.use(VueResource);

export default {
  name: 'app',
  data: function (){
	    return {
	    	API_KEY: "AIzaSyBm00X5S1A4rNc4MlyR6yRyQaR5un7Qb40", // "AIzaSyDoaUoLlpzmIqWpYg_eAhlbFtRvuAjUcPg", 
	    	api: "https://sheets.googleapis.com/v4/spreadsheets/11r-tkO-eiBq-Nwj3au7UPEDq4hvc8xuvykwGDIgvgW8",
	    	sheet1: "https://sheets.googleapis.com/v4/spreadsheets/11r-tkO-eiBq-Nwj3au7UPEDq4hvc8xuvykwGDIgvgW8/values/Sheet1!A1:M1025",
	    	root:"http://eestimetsaabiks.emaliikumine.ee/index.php/",
	    	candidates:[],
	    	headers:[],
	    	loaded: false,
	    	sort: 1,
	    	diagram: 1,
	    	candidatesTotal:0,
	    	respondersTotal: 0,
	    	notRespondersTotal: 0,
	    	chars:["a","b","c","d","e","f","g","h","i","j","k","l"],
	    	parties:{
	    		"Erakond Eestimaa Rohelised":{code:"ER",color:"#89B046",image:"/images/rohelised.png",candidates:0,responded:0,notresponded:0,order:"a",total:0},
	    		"Elurikkuse Erakond":{code:"EE",color:"#F7C640",image:"/images/ere.png",candidates:0,responded:0,notresponded:0,order:"b",total:0},
	    		"Erakond Eesti 200":{code:"E200",color:"#31758A",image:"/images/eesti200.png",candidates:0,responded:0,notresponded:0,order:"c",total:0},
	    		"Isamaa Erakond":{code:"IE",color:"#009CE2",image:"/images/isamaa.png",candidates:0,responded:0,notresponded:0,order:"d",total:0},
	    		"Eesti Reformierakond":{code:"RE",color:"#FFE200",image:"/images/reform.png",candidates:0,responded:0,notresponded:0,order:"e",total:0},
	    		"Eesti Keskerakond":{code:"KE",color:"#007557",image:"/images/kesk.png",candidates:0,responded:0,notresponded:0,order:"f",total:0},
	    		"Eesti Vabaerakond":{code:"EV",color:"#0089D1",image:"/images/vaba.png",candidates:0,responded:0,notresponded:0,order:"g",total:0},
	    		"Eesti Konservatiivne Rahvaerakond":{code:"EK",image:"/images/ekre.png",color:"#0077BD",candidates:0,responded:0,notresponded:0,order:"h",total:0},
	    		"Sotsiaaldemokraatlik Erakond":{code:"SE",color:"#E10600",image:"/images/sde.png",candidates:0,responded:0,notresponded:0,order:"i",total:0}
	    	},
	    	yksik:{code:"SE",color:"#E10600",image:"/images/sde.png",candidates:0,responded:0,notresponded:0,order:"i",total:0},

	    	responded:{
	    		name:"responded",
	    		color:"transparent",
	    		children:[]
	    	},notresponded:{
	    		name:"notrespondedTotal",
	    		color:"transparent",
	    		children:[]
	    	},
	    	respondedTotal:{
	    		name:"responded",
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
	      
		  this.$http.get(this.sheet1,{params:{key:this.API_KEY}}).then(
		
			response => {   
			  this.dataLloaded( {body: response.body});
		  	},
			response => {
			    this.dataLloaded({body: backup});
			}

		  );	      
	   }
	    
	    
	    
	    
	    
	    );
  },
  computed:{
		
	  sortParties: function(){
		var i = 1;
		var list = [];
		for(var p in this.parties){
			var pa = this.parties[p];
			pa.name = p;
			pa.i = i;
			list.push(pa);
			i++;
		}
		list.sort((a, b) => {return a.order.localeCompare(b.order)});
		return list;
	},
	sortCandidates: function(){
		if(this.sort == 1){
			return this.candidates.sort((a, b) => {
				//var c = a[2]+a[1];
				//var d = b[2]+b[1];
				//return c.localeCompare(d)
				return a.total - b.total;	
			}
			);
		}else if (this.sort == 3){
			
			var erakond = "";
			var sorted = this.candidates.sort((a, b) => {
				var c = (a.party != undefined ? a.party.order : "j" )+a.erakond+a[2]+a[1];
				var d = (b.party != undefined ? b.party.order : "j" )+b.erakond+b[2]+b[1];
				return c.localeCompare(d)}
			);
			var  result = [];
			for(var i in sorted){
				var c = sorted[i];
				if(c.erakond.localeCompare(erakond) !=0){
					erakond = c.erakond;
					result.push({name:c.erakond, divider: true,code:c.party ? "#"+c.party.code: "#YX"});
				}
				result.push(c);
			
			}
			
			return result
			
		}else{
			var ringkond = "";
			var sorted = this.candidates.sort((a, b) => {
				var c = a.ringkond+a.erakond+a[2]+a[1];
				var d = b.ringkond+b.erakond+b[2]+b[1];
				return c.localeCompare(d)}
			);
			var  result = [];
			for(var i in sorted){
				var c = sorted[i];
				if(c.ringkond.localeCompare(ringkond) !=0){
					ringkond = c.ringkond;
					result.push({name:c.ringkond, divider: true,code:"#"+c.ringkond});
				}
				result.push(c);
			
			}
			
			return result
			
		}
		
	}  
  },
  methods:{
	  drawTotalChart: function(data,element){
		  var w = 380,h = 280,format = d3.format(",d");
		  var nodes = d3.layout.pack().size([w - 10, h - 0]).value(function(d) { return d.size; }).nodes(data);
		  
		  var feedback = d3.select(element)
		  	.append("svg:svg").attr("width", w).attr("height", h).attr("class", "pack")
		  	.append("svg:g").attr("transform", "translate(2, 2)");
		  
		  var node = feedback.selectAll('g.node').data(nodes).enter()
		  .append("svg:g").attr("class", function(d) { return d.children ? "node" : "leaf node"; })
      		.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
		  
	      node.append('svg:circle')
	        .attr('r', function(d) { return d.r; })
	        .attr('fill', function(d) { return d.color; });
	      
	      node.append("svg:text")
	       .attr("text-anchor", "middle")
	        .attr('class', "ptotals")
	         .attr('fill', "white")
	         .attr('font-size', "18")
	         .attr('font-weight', "bold")
	        .text(function(d) { return d.size +"%" });
		  
	  },
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
	        .attr('title', function(d) { return d.name; })
	        .on("click", function(d){console.log(d)}) 

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
	  calculateRespondedTotal: function(){
		  return parseFloat((100 / this.candidatesTotal ) * this.respondersTotal).toFixed(0);
	  },
  	  calculatenotRespondedTotal: function(){
  		  return parseFloat((100 / this.candidatesTotal ) * this.notRespondersTotal).toFixed(0);	
	  },
	  getColor: function(i){
		  if (this.sort == i){
			  return "light-green lighten-1";
		  }else{
			  return "blue-grey lighten-1";
		  }
	  },
	  getDColor: function(i){
		  if (this.diagram == i){
			  return "light-green lighten-1";
		  }else{
			  return "blue-grey lighten-1";
		  }
	  },
	  setSort: function(i){
		 this.sort = i;
	  },
	  setDiagram: function(i){
			 this.diagram = i;
		  },
	  computeLoaded: function(){
		  return this.loaded ? "loaded" : "unloaded";
	  },
	  showDiagram: function(i){
		  if (this.diagram == i){
			  return "vis";
		  }else{
			  return "hid";
		  }
	  },
	  getStyle: function(p){
		  return "background-image: url('"+p.image+"');"
	  },
	  getCandidateColor: function(i){
		  if (i == 0){
			  return "black";
		  }else if(i < 1.22){
			  return "#75F212";
		  }else if(i < 1.44){
			  return "lime";
		  }else if(i < 1.66){
			  return "lime";
		  }else if(i < 1.88){
			  return "orange";  
		  }else if(i < 2.10){
			  return "orange";  
		  }else if(i < 2.32){
			  return "orange";  
		  }else if(i < 2.54){
			  return "red";  
		  }else if(i < 2.76){
			  return "red";  
		  }else if(i > 2.76 ){
			  return "red";  
		  }
	  },
	  getCandidateColorB: function(i){
		  var c = "";
		  if (i == 0){
			  c = "black";
		  }else if(i < 1.22){
			  c = "#75F212";
		  }else if(i < 1.44){
			  c = "lime";
		  }else if(i < 1.66){
			  c = "lime";
		  }else if(i < 1.88){
			  c = "orange";  
		  }else if(i < 2.10){
			  c = "orange";  
		  }else if(i < 2.32){
			  c = "orange";  
		  }else if(i < 2.54){
			  c = "red";  
		  }else if(i < 2.76){
			  c = "red";  
		  }else if(i > 2.76 ){
			  c = "red";  
		  }
		  return "color: "+c+";"
	  },
	  getLink: function(c){
		  var link = "#";
		  if (c.ringkond == "Harju- ja Raplamaa"){
			 link = "4578-2";
		  }else if(c.ringkond ==  "Hiiu-, Lääne- ja Saaremaa"){
			  link = "eesti-metsa-abiks-kandidaadikusitlus-2019-laane-virumaa";
		  }else if(c.ringkond ==  "Ida-Virumaa"){
			  link = "#1";
		  }else if(c.ringkond ==  "Jõgeva- ja Tartumaa"){
			  link = "4740-2";
		  }else if(c.ringkond == "Järva- ja Viljandimaa"){
			  link = "4758-2";
		  }else if(c.ringkond ==  "Kesklinn, Lasnamäe ja Pirita"){
			  link = "4491-2";
		  }else if(c.ringkond == "Lääne-Virumaa"){
			  link = "eesti-metsa-abiks-kandidaadikusitlus-2019-laane-virumaa";
		  }else if(c.ringkond ==  "Nõmme ja Mustamäe"){
			  link = "4566-2";
		  }else if(c.ringkond ==  "Põhja Tallinn, Kristiine, Haabersti"){
			  link = "4527-2";
		  }else if(c.ringkond ==   "Pärnumaa"){
			  link = "4650-2";
		  }else if(c.ringkond ==   "Saare, - Lääne – ja Hiiumaa"){
			  link = "4616-2";
		  }else if(c.ringkond ==   "Tallinn Kesklinn, Lasnamäe ja Pirita"){
			  link = "4491-2";
		  }else if(c.ringkond ==    "Tartu linn"){
			  link = "4669-2";
		  }else if(c.ringkond ==    "Võru-, Valga- ja Põlvamaa"){
			  link = "4714-2";
		  }
		  
		  
		  return this.root+link+"#"+c.name;
		  
	  },
	  openAnkeet: function(c){
		  var win = window.open(this.getLink(c), '_blank');
	  },
	  dataLloaded(response){

		    var headers = response.body.values.shift();
		    this.headers = headers;
		    var party = headers.indexOf('Erakonna nimekiri');
		    var responded = headers.indexOf('Vastanud');
		    var f = headers.indexOf('First Name');
		    var l = headers.indexOf('Last Name');
		    var nr = headers.indexOf('Kandidaadi number');
		    var rk = headers.indexOf('Omavalitsus');
		    
		    var petitsioon = headers.indexOf('Petitsioon');
		    var biomass = headers.indexOf('Biomass');
		    var raiemaht = headers.indexOf('Raiemaht');
		    var majandus = headers.indexOf('Metsamajandus');
		    var jaht = headers.indexOf('Jaht');
		    var poliitika = headers.indexOf('Poliitika');
		     
		    for(var c in response.body.values){
	        	var canditate =  response.body.values[c]; 	
	        	
	        	var p = this.parties[canditate[party]];
	        	var r = canditate[responded];
	        	var n = canditate[nr];
	        	var ring = canditate[rk] != null ? canditate[rk] : "x";
	        	
	        	canditate.nr  = n;
	        	
	        	canditate.ringkond = ring;
	        	canditate.divider=false;
	        	canditate.erakond = canditate[party];
	        	canditate.name = canditate[f]+" "+canditate[l];
	        
	        	
			    canditate.petitsioon = canditate[petitsioon].length != 0  ? parseInt(canditate[petitsioon]) : 0;
			    canditate.biomass = canditate[biomass].length != 0  ? parseInt(canditate[biomass]) : 0;
			    canditate.raiemaht = canditate[raiemaht].length != 0  ? parseInt(canditate[raiemaht]) : 0;
			    canditate.majandus = canditate[majandus].length != 0  ? parseInt(canditate[majandus]) : 0;
			    canditate.jaht = canditate[jaht].length != 0  ? parseInt(canditate[jaht]) : 0;
			    canditate.poliitika =canditate[poliitika].length != 0 ? parseInt(canditate[poliitika]) : 0;
			    
			    var divider = 0;
			    divider = divider + (canditate.petitsioon == 0 ? 0 : 1);
			    divider = divider + (canditate.biomass == 0 ? 0 : 1);
			    divider = divider + (canditate.raiemaht == 0 ? 0 : 1);
			    divider = divider + (canditate.majandus == 0 ? 0 : 1);
			    divider = divider + (canditate.jaht == 0 ? 0 : 1);
			    divider = divider + (canditate.poliitika == 0 ? 0 : 1);
			    divider = divider == 0 ? 1 : divider;
				
			    canditate.total  = 		    
			    	parseFloat((canditate.petitsioon +
			    	canditate.biomass +
			    	canditate.raiemaht +
			    	canditate.majandus +
			    	canditate.jaht +
			    	canditate.poliitika) / divider );
	        	
			    if(isNaN(canditate.total)){
			    	canditate.total = 3;
			    }else if(canditate.total == 0){
			    	canditate.total = 3;
			    }
			    
			    
			    
	        	if(p != undefined){
	        		canditate.party  = p;
		        	p.candidates++;
		        	this.candidatesTotal++;
		        	if(r != undefined && r == "x"){
		        		this.respondersTotal++;
		        		p.responded++;
		        		p.total = p.total +  canditate.total;
		        		this.candidates.push(canditate);
		        	}else{
		        		p.notresponded++;
		        		this.notRespondersTotal++;
		        	}
	        		
	        	}else{
	        		 		
	        		canditate.party  = this.yksik;
		        	if(r != undefined && r == "x"){
		        		this.candidates.push(canditate);
		        	}	        		
	        		
	        	}

	        }
	        
			var weights =  [];
		    for(var p in this.parties){
		    	var party = this.parties[p];
		    	party.total = parseFloat(party.total / party.responded);
		    	weights.push({responded:party.responded,party:p});
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
		    
    		this.respondedTotal.children.push(
	    		{name:"responded",
	    			color: "#75F212",
	    			size: this.calculateRespondedTotal()
	    		}
	    	);	
    		
    		this.respondedTotal.children.push(
		    	{name:"notresponded",
		    		color: "red",
		    		size: this.calculatenotRespondedTotal()
		    	}
		    );	
		    
		    weights.sort((a, b) => {return b.responded-a.responded});
		    for(var i in weights){
		    	var p = weights[i];
		    	this.parties[p.party].order = this.chars[i];
		    }
		    
		    this.drawTotalChart(this.respondedTotal,"#respondedTotal");		    
	        this.drawFeedbackChart(this.responded,"#responded");
	        this.drawFeedbackChart(this.notresponded,"#notresponded");
	    	
	        this.loaded=true;

 
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

#diagrammid{
	width: 400px;
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
 	padding-right: 95px;
	float: right;
}

#diagrams{
	float: left;
}

#nimekiri{
	margin-top: 100px;
}


#logo{
	height: 100px;
	background-image:  url("./assets/emasmall.png");
	padding-left: 150px;
	padding-top: 40px;
	  position: sticky;
}

.logotext{
	color: #37474F;
}


#diagram1 {
  background-image:  url("./assets/liivakell.png");
  width:  400px;
  height: 602px;
  top: 100px;
}

#diagram2 {
  width:  400px;
  height: 300px;
  position: sticky;
  top: 100px;
}

#diagram3 {
  width:  400px;
  height: 300px;
  position: sticky;
  top: 100px;
  padding-left: 40px;
}


#responded, #notresponded{
	width:  400px;
	background-color:transparent;
}

#respondedTotal, #notrespondedTotal{
	width:  400px;
	height: 300px;
	background-color:transparent;
}

#repondedChip{
	position: relative;
	top: -604px;
	left: 10px;
	color: white;
	background-color: #37474F;
	opacity: 0.8;
	font-size: 16px;
	width: 380px;
	height: 40px;
	text-align: center;
	border-radius: 5px;
	vertical-align: middle;
	line-height:40px;
	
}

#notrepondedChip{
	position: relative;
	bottom:90px;
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

.elabel{
	display: inline-block;
	text-decoration: none;
	font-size: 16px;
	color: #37474F;
	font-weight: bold;
	margin-top: 35px;
	margin-bottom: 5px;
}

.unloaded{
	display: none;
}

.vis{
	display: block;
}

.hid{
	display: none;
}

.plogo{
	height: 70px;
	width: 70px;
	background-size: cover;
	margin: 5px;
	font-size: 16px;
}

.ix{
	vertical-align: middle;
	line-height: 70px;
	font-weight: bold;
}

.nimi{
	color: #424242;
	text-decoration: none;
}


.logo{
	height: 150px;
}

</style>
