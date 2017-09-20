var osar=function(elem){
	this.elem=document.querySelector(elem);
};

var $= function(elem){
	return new osar(elem);
} 

osar.prototype.addClass=function(str){
	var elem=this.elem;
	var arr = elem.className.split(" ");
	if(arr.indexOf(str)===-1){
		arr.push(str);
		elem.className = arr.join(" ");
	}
};

osar.prototype.removeClass = function(str){
	var elem=this.elem;
	var arr = elem.className.split(" ");
	var index = arr.indexOf(str);
	if(index !==-1){
		if(index === 0){
			elem.className = arr.slice(1).join(" ");
		}else if(index === arr.length-1){
			elem.className = arr.slice(0, index).join(" ");
		}else {
			elem.className = arr.slice(0,index).join(" ")+" "+arr.slice(index+1);
		}
	}
};
