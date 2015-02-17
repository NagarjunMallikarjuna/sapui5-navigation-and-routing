jQuery.sap.declare("sap.ui.demo.Component");
jQuery.sap.require("sap.ui.demo.MyRouter");
sap.ui.core.UIComponent.extend("sap.ui.demo.Component",{
	
	
	metadata:{
		
		routing:{
				
			config:{
				routerClass: sap.ui.demo.MyRouter,
				viewType:"JS",
				viewPath:"sap.ui.demo.view",
				targetControl:"splitApp",
				clearTarget:false,
			},
			
			routes:[
			       {
			        	pattern:"",
			        	name:"main",
			        	view:"Master",
			        	targetAggregation:"masterPages",
			        },
			        {
			        	pattern:"Detail/{contextPath}",
     	        	   name:"Detail",
     	        	   view:"Detail",
     	        	   targetAggregation:"detailPages",
     	        	   targetControl:"splitApp",
			        },
			        {
			        	 pattern:"Detail/{contextPath}/lineItemId/:lineItemId:",
   	            	  name:"LineItem",
   	            	  view:"LineItem",
   	            	  targetAggregation:"detailPages",
			        },
			        ]
		}
	},

	
	
	init:function(){
		
		
		console.log("Hi inside the init method of the component")
		//jQuery.sap.require("sap.ui.core.routing.History");
		jQuery.sap.require("sap.ui.demo.MyRouter");
		jQuery.sap.require("sap.m.routing.RouteMatchedHandler");
		
		sap.ui.core.UIComponent.prototype.init.apply(this, arguments);
		var router = this.getRouter();
		console.log(router);
		
		
		/*router.myNavBack=sap.ui.demo.MyRouter.myNavBack;
		router.myNavToWithoutHash=sap.ui.demo.MyRouter.myNavToWithoutHash;*/
		
		/*if (!sap.ui.Device.system.phone) {
			router.myNavToWithoutHash("sap.ui.demo.view.Empty", "JS", false);
		}*/
		
		this.routeHandler = new sap.m.routing.RouteMatchedHandler(router);
		console.log("before Initialize "+this.routeHandler);
		console.log(this.routeHandler);
		router.initialize();
		
		/*jQuery.sap.require("sap.m.routing.RouteMatchedHandler");
		jQuery.sap.require("sap.ui.demo.MyRouter");
		jQuery.sap.require("sap.ui.demo.model.Config");
		jQuery.sap.require("sap.ui.demo.util.objectSearch");
		var oRouter = this.getRouter();
		oRouter.myNavBack = sap.ui.demo.MyRouter.myNavBack;
		//oRouter.myNavToWithoutHash = sap.ui.demo.myRouter.myNavToWithoutHash;
		
		this.oRouterHandler = new sap.m.routing.RouteMatchedHandler(oRouter);
		oRouter.initialize();*/
		
	},
	
	
	destroy:function(){
		if(this.routeHandler){
			this.routeHandler.destroy();
		}
		sap.ui.core.UIComponent.prototype.destroy.apply(this,arguments);
	},
	
	
	
	
	
	
	createContent:function(){
		var oView = sap.ui.view({
			id:"app",
			viewName:"sap.ui.demo.view.App",
			type:"JS",
			viewData:{ component:this }
		});
	
		var oModel = new sap.ui.model.json.JSONModel("model/Demo.json");
		oView.setModel(oModel);
		
		var i18nModel =  new sap.ui.model.resource.ResourceModel({
			bundleUrl:"i18n/messageBundle.properties",
		});
		oView.setModel(i18nModel,"i18n");
		
		var deviceModel = new sap.ui.model.json.JSONModel({
			isPhone: sap.ui.Device.system.phone,
			listMode:(sap.ui.Device.system.phone)?"None":"SingleSelectMaster",
			listItemType:(sap.ui.Device.system.phone)?"Active":"Inactive"	
		});
		deviceModel.setDefaultBindingMode("OneWay");
		oView.setModel(deviceModel,"device");
		
		return oView;
	},
});	
