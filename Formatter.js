jQuery.sap.declare("sap.ui.demo.util.Formatter");

jQuery.sap.require("sap.ui.core.format.dateFormat");

sap.ui.demo.util.Formatter={
		
		_statusStateMap : {
			"Neu" : "Warning",
			//"Initial" : "Success"
		},
		
		statusState :  function (value) {
			return (value && sap.ui.demo.util.formatter._statusStateMap[value]) ? sap.ui.demo.util.formatter._statusStateMap[value] : "None";
		},
		
		date : function (value) {
			if (value) {
				var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern: "yyyy-MM-dd"}); 
				return oDateFormat.format(new Date(value));
			} else {
				return value;
			}
		},
		
		quantity :  function (value) {
			try {
				return (value) ? parseFloat(value).toFixed(0) : value;
			} catch (err) {
				return "Not-A-Number";
			}
		},
		
		
		uppercaseFirstChar : function(sStr) {
			return sStr.charAt(0).toUpperCase() + sStr.slice(1);
		},

		discontinuedStatusState : function(sDate) {
			return sDate ? "Error" : "None";
		},

		discontinuedStatusValue : function(sDate) {
			return sDate ? "Discontinued" : "";
		},

		currencyValue : function (value) {
			return parseFloat(value).toFixed(2);
		}
		
}
