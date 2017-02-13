function S4() {
	return(((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
};

function guid() {
	return(S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
};

var Store = function(name) {
	//通过键值对获取值 
	this.name = name;
	var store = localStorage.getItem(this.name);
	this.data = (store && JSON.parse(store)) || {};
};

var createAssigner = function(keysFunc, undefinedOnly) {
	return function(obj) {
		var length = arguments.length;
		if(length < 2 || obj == null) return obj;
		for(var index = 1; index < length; index++) {
			var source = arguments[index],
				keys = keysFunc(source),
				l = keys.length;
			for(var i = 0; i < l; i++) {
				var key = keys[i];
				if(!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
			}
		}
		return obj;
	};
};

Store.prototype={
	save: function() {
		localStorage.setItem(this.name, JSON.stringify(this.data));
	},
	create: function(model) {
		if(!model.id) model.id = guid();
		this.data[model.id] = model;
		this.save();
		return model;
	},
	update: function(model) {
		this.data[model.id] = model;
		this.save();
		return model;
	},
	find: function(model) {
		return this.data[model.id];
	},
	findAll: function() {
		return this.data;

	},
	destroy: function(model) {
		delete this.data[model.id];
		this.save();
		return model;
	}
};