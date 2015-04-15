var getOrdinalSuffix = function (i) {
	var j = i % 10, k = i % 100;
	return j == 1 && k != 11 ? "ST" : j == 2 && k != 12 ? "ND" : j == 3 && k != 13 ? "RD" : "TH";
}.

HTMLOListElement.prototype.setOrdinals = function(){
	for(var i=0; i<this.children.length; i++) {
		this.children[i].setAttribute('ordinal', getOrdinalSuffix(i+1));
	}
};