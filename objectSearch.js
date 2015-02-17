jQuery.sap.declare("sap.ui.demo.util.objectSearch");
sap.ui.demo.util.objectSearch={
		getPath:function(oData,sProperty,oValue){
			return this._getPath(oData,sProperty,oValue,"/");
		},
		
		_getPath:function(oData,sProperty,oValue,sPath){
			for(var p in oData){
				if(oData[p] instanceof Array){
					for(var i=0;i<oData[p].length;i++){
						var result = this._getPath(oData[p][i],sProperty,oValue,sPath+p+"/"+i+"/");
						if(result){
							return result;
						}
					}
				}else{
					if(p==sProperty && oData[p]===oValue){
						return sPath;
					}
				}
			}
			return null;
		},
};