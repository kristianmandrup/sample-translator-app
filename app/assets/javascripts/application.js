// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require lib/jquery-1.11.3.min.js
//= require lib/i18next-1.10.1.min.js
//= require jquery_ujs
//= require turbolinks
//= require_tree .


var CLIENT = function() {

};


CLIENT.localeFilePath = 'locale.json';
CLIENT.serverPath = 'http://localhost:3000/translations';
CLIENT.localemsg = 'Please, Select locale!!!'
CLIENT.keymsg = 'Please, Select key!!!'

/**
 * function to get all locals from locale.json
 */
CLIENT.loadJSON = function(callback) {   
    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', CLIENT.localeFilePath, true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(JSON.parse(xobj.responseText));
          }
    };
    xobj.send(null);  
 }

/**
 * function to get locale values from translator manager
 */
CLIENT.get = function(locale){
	var xmlhttp;

	if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest();
	} else {// code for IE6, IE5
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var jsonResponse = JSON.parse(xmlhttp.responseText);
			localStorage.setItem(locale, JSON.stringify(jsonResponse));
		}
	}
	xmlhttp.open("GET", CLIENT.serverPath + "?locale="+locale, true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send();
}

/**
 * function to get locale transaction
 */
CLIENT.getLocaleTranslations = function(locale) {

	var localeList = "<select id='lngValue' class='dropdown-menu custom-background' onchange='CLIENT.translate()'>";
  
	localeList += "<option id='en'>en</option>"
	localeList += "<option id='tr'>tr</option>"
	localeList += "<option id='fr'>fr</option>"
	localeList += "<option id='hi'>hi</option>"
	localeList += "<option id='ja'>ja</option>"
	localeList += "<option id='lo'>lo</option>"
	localeList += "<option id='ro'>ro</option>"
	localeList += "<option id='th'>th</option>"
	localeList += "<option id='uk'>uk</option>"
	
	//for (i=0; i<locale.data.length; i++) {
  	//	CLIENT.get(locale.data[i].locale);
  	//	localeList += "<option id='"+locale.data[i].locale+"'>"+locale.data[i].locale+"</option>";
	//}
	document.getElementById('locales').innerHTML=localeList;
	CLIENT.translate();
};

/**
 * function to translate using i18next
 */
CLIENT.translate = function() {
	var lngValue = document.getElementById('lngValue').value;
	if(lngValue!='Select Locale'){
		var locale_en = localStorage.getItem(lngValue);
		var resource = {'en' : { translation : JSON.parse(locale_en) }};
		i18n.init({ resStore: resource});
		CLIENT.translateValues()
	}
};



/**
 * function to get locale values
 */
CLIENT.getLocaleValues = function(){
	CLIENT.loadJSON(CLIENT.getLocaleTranslations);
	CLIENT.syncTranslation();
};

CLIENT.translateValues = function(){	
	//Using Jquery
	$('#withJquery').i18n();

	//Using Core Java script
	
	document.getElementById('date.order.2').innerHTML = i18n.t("date.order.2");
	document.getElementById('date.day_names.0').innerHTML = i18n.t("date.day_names.0");
	document.getElementById('date.day_names.1').innerHTML = i18n.t("date.day_names.1");
	document.getElementById('date.day_names.2').innerHTML = i18n.t("date.day_names.2");
	document.getElementById('date.day_names.3').innerHTML = i18n.t("date.day_names.3");
	document.getElementById('date.day_names.4').innerHTML = i18n.t("date.day_names.4");
	document.getElementById('date.day_names.5').innerHTML = i18n.t("date.day_names.5");
	document.getElementById('date.day_names.6').innerHTML = i18n.t("date.day_names.6");

	document.getElementById('date.order.1').innerHTML = i18n.t("date.order.1");
	document.getElementById('date.month_names.1').innerHTML = i18n.t("date.month_names.1");
	document.getElementById('date.month_names.2').innerHTML = i18n.t("date.month_names.2");
	document.getElementById('date.month_names.3').innerHTML = i18n.t("date.month_names.3");
	document.getElementById('date.month_names.4').innerHTML = i18n.t("date.month_names.4");
	document.getElementById('date.month_names.5').innerHTML = i18n.t("date.month_names.5");
	document.getElementById('date.month_names.6').innerHTML = i18n.t("date.month_names.6");
	document.getElementById('date.month_names.7').innerHTML = i18n.t("date.month_names.7");
	document.getElementById('date.month_names.8').innerHTML = i18n.t("date.month_names.8");
	document.getElementById('date.month_names.9').innerHTML = i18n.t("date.month_names.9");
	document.getElementById('date.month_names.10').innerHTML = i18n.t("date.month_names.10");
	document.getElementById('date.month_names.11').innerHTML = i18n.t("date.month_names.11");
	document.getElementById('date.month_names.12').innerHTML = i18n.t("date.month_names.12");

	document.getElementById('errors.messages.accepted').innerHTML = i18n.t("errors.messages.accepted");
	document.getElementById('errors.messages.blank').innerHTML = i18n.t("errors.messages.blank");
	document.getElementById('errors.messages.confirmation').innerHTML = i18n.t("errors.messages.confirmation");
	document.getElementById('errors.messages.empty').innerHTML = i18n.t("errors.messages.empty");
	

	
};

CLIENT.syncTranslation = function(){
	if (window.realtime.enabled && window.realtime.eventBus){
		// handle events in the queue with eventing
		var realtimeMessageEventConsoleLogger = function(message) {
			console.log('TEST => ' + message);
			localStorage.setItem(Object.keys(message)[0], JSON.stringify(message));
		};
		window.realtime.eventBus.on('realtimeMessage', realtimeMessageEventConsoleLogger);

	} else if (window.realtime.enabled) {
		// handle events in the queue without eventing
		messageQueueConsoleLogger = function() {
			message = window.realtime.messageQueue.shift();
			if (message) {
				console.log('TEST => ' + message);
				localStorage.setItem(Object.keys(message)[0], JSON.stringify(message));
			}
		};
		setInterval(messageQueueConsoleLogger, 100);

	} else {
		console.log('Error: Realtime was not enabled.')
	}
}
