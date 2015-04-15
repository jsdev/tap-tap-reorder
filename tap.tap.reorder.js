/**
 * Created by jsdev on 11/15/10.
 */
Element.prototype.indexAt = function() {
	return Array.prototype.indexOf.call(this.parentNode.children, this);
}

Element.prototype.moveBefore = function (referenceNode) {
	referenceNode.parentNode.insertBefore(this, referenceNode);
};

Element.prototype.moveAfter = function (referenceNode) {
	this.moveBefore(referenceNode.nextSibling);
};

var smartPlacement = function (e) {
	if (e.target.tagName !== 'A') return;
	var tappedLi = e.target.parentNode;
	var list = tappedLi.parentNode;
	var selectedLi = list.attributes.selectedItem;
	if (selectedLi) {
		list.attributes.selectedItem = undefined;
		selectedLi[selectedLi.indexAt() > tappedLi.indexAt() ? 'moveBefore' : 'moveAfter'](tappedLi);
		selectedLi.focus();
		selectedLi.classList.toggle('highlight');
	} else {
		list.attributes.selectedItem = tappedLi;
		tappedLi.classList.toggle('highlight');
	}
};

