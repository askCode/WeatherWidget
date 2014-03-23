/*
 * Constructor function for a WeatherWidget instance.
 * 
 * container_element : a DOM element inside which the widget will place its UI
 *
 */
 
function WeatherWidget(container_element){
	var _towns = [];   //will store the towns selected by the user
	var _weather = [];   //an array of WLines
	var _ui = {     //an object representing the widget's UI
		sort_order  :   null,
		container	:	null,
		titlebar	:	null,
		toolbar		: 	null,
		list 		: 	null,
	};
	
    /*********************************************************
    * Constructor function for the WLine object to hold the 
    * full weather data for a town
    ********************************************************/
    
    var WLine = function(wtown, woutlook, wmin, wmax){
        /*********************************************************
         *  Declare the properties for this object to store the 
         *  relevant data
         ********************************************************/
        
        var _wtown = wtown;
        var _woutlook = woutlook;
        var _wmin = wmin;
        var _wmax = wmax;
        
        var _ui = {
            dom_element  : null,
            name_label   : null,
            outlook_label : null,
        };
        
        var _createUI = function(){
            
        /*********************************************************
         *
         * Add code here to create and configure the DOM elements
         *
         *  - for the name and outlook labels
         *
         * constructing an appropriate DOM subtree
         *
         ********************************************************/
            _ui.dom_element = document.createElement('div');
            _ui.dom_element.className = "section";
            
            _ui.name_label = document.createElement('span');
            _ui.name_label.className = 'section_label';
            _ui.name_label.innerHTML = _wtown;
            
            _ui.outlook_label = document.createElement('span');
            _ui.outlook_label.className = 'numeric';
            _ui.outlook_label.innerHTML = _woutlook + '    ' +_wmin + '    ' + _wmax;
            
            //outlook = document.createElement('span');
            //outlook.className = 'outlook';
            //outlook.innerHTML = _woutlook;
            
            //minMaxSpan = document.createElement('span');
            //minMaxSpan.className = 'details';
            //minMaxSpan.innerHTML = _wmin + '  ' + _wmax;
            
            //_ui.outlook_label.appendChild(outlook);
            //_ui.outlook_label.appendChild(minMaxSpan);
            //_ui.outlook_label.appendChild(minTemp);
            //_ui.outlook_label.appendChild(maxTemp);
            //_ui.outlook_label.innerHTML = _woutlook + '    ' +_wmin + '    ' + _wmax;
            
            _ui.dom_element.appendChild(_ui.name_label);
            _ui.dom_element.appendChild(_ui.outlook_label);
            //_ui.dom_element.appendChild(outlook_label1);
            
        }
        
        
        this.getTown = function(){
            return _wtown;
        }
            
        this.getMaxTemp = function(){
            return _wmax;
        }
        
        this.getDomElement = function(){
            return _ui.dom_element;
        }
        
        /*The below code updates the weather list values stored in the object array and is 
         * called via the update button in the weather widget */
        this.updateWLine = function(outlook,min,max){
            _woutlook = outlook;
            _wmin = min;
            _wmax = max;
            
            //_ui.name_label.innerHTML = _wtown + '  ' + _woutlook;
            /*The below code updates the values displayed in the weather widget on index.html*/
            _ui.outlook_label.innerHTML = _woutlook + '    ' +_wmin + '    ' + _wmax;
        }
        
        _createUI();
        
  };  //this is the end of the function constructor for the WLine object 
    
	
	
	//public method to get the array of selected towns
	this.getTowns = function(){
		return _towns;
	}
	
	
	/*********************************************************
	 *   
	 *  Add code here for a private method to read the state of the sort radio buttons 
	 *  and update sort order and refresh list display
	 *  
	 ********************************************************/
	var _setSortOrder = function(sort_order){
	    _sortTown = document.getElementById(_ui.container.id + '_townRadio');
		if (_sortTown.checked){
		    _ui.sort_order = 'town';
		}
		else {
		    _ui.sort_order = 'maxTemp';
		}
		
		_refreshWeatherDisplay();
	}
	
	
	var _createUI = function(){
		_ui.sort_order = "town";    //default value
		_ui.container = container_element;
		_ui.container.className = "monitor";
		
		/*********************************************************
		 *
		 * Add code here to create and configure the DOM elements
		 *
		 * 	- for the titlebar
		 *  - for the selection within the titlebar
		 *  - for the sort radio buttons
		 *  - for the weather list
		 *
		 * constructing an appropriate DOM subtree
		 *
		 ********************************************************/
		
		_ui.title_bar = document.createElement('div');
		_ui.title_bar.className = 'title';
		
		selectLabel = document.createElement('span');
		selectLabel.className = 'section_label';
		selectLabel.innerHTML = 'Town: ';
		
		selectContainer = document.createElement('select');
		selectContainer.id = _ui.container.id + "_selectTown";
		selectContainer.onchange = function (){
		    var town = this.value
		    //alert('town: ' + town);
		    if (town != ''){
		        _getWeatherInfo(town);
		    }
		}
		
		/*selectContainer.onmouseover = function(){
		    var selectCtn = document.getElementById(_ui.container.id + '_selectTown')
		    var len = selectCtn.options.length;
		    selectCtn.size = len;
		}
		
		selectContainer.onmouseout = function(){
		    this.size = 1;
		}
		*/
		var blankTown = document.createElement('option');
		blankTown.text = '';
		blankTown.value = '';
		selectContainer.options.add(blankTown);
		
		/* _getTownList and _createTownDropdown are used to create the town list 
		 * in the weather widget dynamically*/
		var _getTownList = function (){
                dojo.xhrGet({
                    url         : "PHP/getTowns.php",
                    handleAs    : "json",
                    timeout     : 5000,
                    load        : function (response) {
                        _createTownDropdown(response);
                    },
                    error       : function(error_msg){
                        _handleError(error_msg);
                    }
                 });
        };
         
       var _createTownDropdown = function(response){
           var selectTown = document.getElementById(_ui.container.id + '_selectTown');
           
            for (var i = 0 ; i < response.length; i++){
                var towns = response[i];
                var town = document.createElement('option');
                town.text = towns.town;
                town.value = towns.town;
                selectTown.options.add(town);
            }
       };
            
	  _getTownList();
	  
	  //br = document.createElement('br');
	  
	  updateBtn = document.createElement('input');
	  updateBtn.type = 'button';
	  updateBtn.id =_ui.container.id + '_updateBtn';
	  updateBtn.className = 'button';
	  updateBtn.value = 'Update';
	  
	  updateBtn.onclick = function(){
	      //selectTown = document.getElementById(_ui.container.id + '_selectTown');
	      //if (selectTown.value != ''){
	      //    _getWeatherInfo(selectTown.value);
	          //alert('selected Town: ' + selectedTown.value);
	      //};  
	     if (_towns.length > 0) 
	       _updateWeatherInfo();
	  }
	  
	  _ui.title_bar.appendChild(selectLabel);
	  _ui.title_bar.appendChild(selectContainer);
	  //_ui.title_bar.appendChild(br);
	  _ui.title_bar.appendChild(updateBtn);
	  
	  _ui.container.appendChild(_ui.title_bar);
	  
	  
	  _ui.toolbar = document.createElement('div');
	  _ui.toolbar.className = 'toolbar';
	  
	  sortByLabel = document.createElement('label');
	  sortByLabel.className = 'section_name';
	  sortByLabel.innerHTML = 'Sort by: ';
	  
	  townRadio = document.createElement('input');
	  townRadio.type = 'radio';
	  townRadio.id = _ui.container.id + '_townRadio';
	  townRadio.name = _ui.container.id + '_sort'
	  townRadio.checked = 'yes';
	  townRadio.onclick = function(){
	      _setSortOrder();
	  }
	  
	  townRadioLabel = document.createElement('label');
	  townRadioLabel.className = 'section_name';
	  townRadioLabel.innerHTML = 'town'
	  
	  tempRadio = document.createElement('input');
	  tempRadio.type = 'radio';
	  tempRadio.id = _ui.container.id + '_tempRadio';
	  tempRadio.name = _ui.container.id + '_sort';
	  tempRadio.onclick = function(){
	      _setSortOrder();
	  }
	  
	  tempRadioLabel = document.createElement('label');
	  tempRadioLabel.className = 'section_name';
	  tempRadioLabel.innerHTML = 'max temp';
	  
	  _ui.toolbar.appendChild(sortByLabel);
	  _ui.toolbar.appendChild(townRadio);
	  _ui.toolbar.appendChild(townRadioLabel);
	  _ui.toolbar.appendChild(tempRadio);
	  _ui.toolbar.appendChild(tempRadioLabel);
	  
	  _ui.container.appendChild(_ui.toolbar);
	  
	  _ui.list = document.createElement('div');
	  _ui.list.className = 'list';
	  _ui.list.id = _ui.container.id + '_weatherList';
	  
	  _ui.container.appendChild(_ui.list);
    }
	

	 var _checkNewTown =  function(ntown){
	/*********************************************************
	 *
	 * Add code here to check if a selected town is already in the 
	 * list. If not, add it to the list and call _getWeatherInfo 
	 * and update the display, if yes, do nothing
	 *
	 ********************************************************/
	   for(i = 0; i < _towns.length; i++){
	       if (_towns[i] == ntown) 
	       return false;
	   }
	   _towns.push(ntown); /* if town is new it gets added to the _towns[] array*/
	   return true;
	 }
	
	/* The below code is used to update the weather list by calling the _getWeatherInfo function
	 * for all the towns stored in the _towns[] array 
	 */
	 var _updateWeatherInfo = function(){
	     for (var i = 0; i < _towns.length; i++){
	         _getWeatherInfo(_towns[i]);
	     }
	 }
	 
	 var _getWeatherInfo = function(ntown){
	 /*********************************************************
	 *
	 * Add code here to create the AJAX request and update with 
	 * the server's response
	 *
	 ********************************************************/
    	 dojo.xhrGet({
    	 	url			: "PHP/weather.php?town=" + ntown,
    	 	handleAs	: "json",
    	 	timeout 	: 5000,
    	 	load		: function (response) {
    	 		_refreshWeatherList(response);
    	 	},
    	 	error		: function(error_msg){
    	 		_handleError(error_msg);
    	 	}
    	 	
    	 });
	 } 
	 
	 var _handleError = function(error_msg){
	 	alert("Error: " + error_msg);
	 }
	   
	 var _refreshWeatherList = function(weather_info) {
	/*********************************************************
	 *
	 * Add code here to iterate through the returned JSON data
	 * and add each new item into the _weather array, then call
	 * the _refreshWeatherDisplay method
	 *
	 ********************************************************/
    	var _weather_info = weather_info;
    	for (var i=0; i < _weather_info.length; i++){
    	    
    	    var info = _weather_info[i];
    	    var town = info.town;
    	    var outlook = info.outlook;
    	    var minTemp = info.min_temp;
    	    var maxTemp = info.max_temp;
    	    
    	    /* If the town is new then a new _wline object is created and store in _weather[] array 
    	     else just update the _wline object for that particular town in the _weather[] array*/
    	    if (_checkNewTown(town) == true){
    	        var _wline = new WLine(town,outlook,minTemp,maxTemp);
    	        _weather.push(_wline); 
    	    }
    	    else {
    	        for (var i = 0; i < _weather.length; i++){
    	            if (_weather[i].getTown() == town){
    	                _weather[i].updateWLine(outlook,minTemp,maxTemp);
    	                //_refreshWeatherDisplay();
    	                break;
    	            }
    	        }
    	    }
    	}
    	
    	_refreshWeatherDisplay();


   }

	 var _refreshWeatherDisplay = function() {
	     
	 
	 /*********************************************************
	 *
	 * Add code here to update the displayed weather items
	 * - remove the existing nodes of the _ui.list div
	 * - check the required sort order of the data and sort accordingly
	 * - append the items in _weather to _ui.list
	 *
	 ********************************************************/
    	var wlist = _ui.list;
    	while (wlist.hasChildNodes()){
    	    wlist.removeChild(wlist.firstChild);
    	}
    	
    	for( var i=0; i < _weather.length; i++){
    	    if (_ui.sort_order == 'town')
    	        _weather.sort(_sortByTown);
    	    else if (_ui.sort_order == 'maxTemp')
    	        _weather.sort(_sortByTemp);
    	}
    	
    	for (var i=0; i < _weather.length; i++){
    	    var wline = _weather[i].getDomElement();
    	    wlist.appendChild(wline);
    	}
	}
	 

	 var _sortByTown = function(w1, w2) {
	     
	/*********************************************************
	 *
	 * Add code here to define sorting of WLine objects
	 * by town name
	 *
	 ********************************************************/
	   	 if (w1.getTown() > w2.getTown())
	   	 return 1;
	   	 else if (w1.getTown() < w2.getTown())
	   	 return -1;
	   	 
	   return 0;
	 }

	  var _sortByTemp = function(w1, w2) {
	 /*********************************************************
	 *
	 * Add code here to define sorting of WLine objects
	 * by max temp
	 *
	 ********************************************************/	
	 	 if (w1.getMaxTemp() > w2.getMaxTemp())
	 	 return -1;
	 	 else if (w1.getMaxTemp() < w2.getMaxTemp())
	 	 return 1;
	 	 
	   return 0;
	 }
	 
	 /**
	  * private method to intialise the widget's UI on start up
	  */
	  var _initialise = function(container_element){
	  	_createUI(container_element);
	  	}
	  	
	  _initialise(container_element);
}
	 
		 	 
	 
	 