/**
 * Created by jsdev on 11/15/10.
 * By tapping (100% 508 accessible so must be links or buttons)
 * if you move an element up, it places it above target
 * if you move an element down, it places it below target
 *
 * Added additional optional tapTapReorderInit click handles enter and tap events because...
 * #AccessibilityMatters
 */
Element.prototype.indexAt = function() {
	return Array.prototype.indexOf.call(this.parentNode.children, this);
}

Element.prototype.moveAbove = function (referenceNode) {
	referenceNode.parentNode.insertBefore(this, referenceNode);
};

Element.prototype.moveBelow = function (referenceNode) {
	this.moveAbove(referenceNode.nextSibling);
};

var smartPlacement = function (e) {
	if (e.target.tagName !== 'A') return;
	e.preventDefault();
	var tappedLi = e.target.parentNode;
	var list = tappedLi.parentNode;
	var selectedLi = list.attributes.selectedItem;
	if (selectedLi) {
		list.attributes.selectedItem = undefined;
		selectedLi[selectedLi.indexAt() > tappedLi.indexAt() ? 'moveAbove' : 'moveBelow'](tappedLi);
		selectedLi.focus();
		selectedLi.classList.toggle('highlight');
	} else {
		list.attributes.selectedItem = tappedLi;
		tappedLi.classList.toggle('highlight');
	}
};

var smartPlacementRows = function (e) {
	if (e.target.tagName !== 'A') return;
	e.preventDefault();
	var tappedRow = e.target.parentNode.parentNode;
	console.log(tappedRow);
	var table = tappedRow.parentNode;
	var selectedRow = table.attributes.selectedItem;
	if (selectedRow) {
		table.attributes.selectedItem = undefined;
		selectedRow[selectedRow.indexAt() > tappedRow.indexAt() ? 'moveAbove' : 'moveBelow'](tappedRow);
		selectedRow.focus();
		selectedRow.classList.toggle('highlight');
	} else {
		table.attributes.selectedItem = tappedRow;
		tappedRow.classList.toggle('highlight');
	}
};

HTMLOListElement.prototype.tapTapReorderInit = function() {
	this.addEventListener('click', smartPlacement);
};

HTMLUListElement.prototype.tapTapReorderInit = function() {
	this.addEventListener('click', smartPlacement);
};

HTMLTableElement.prototype.tapTapReorderInit = function() {
	this.addEventListener('click', smartPlacementRows);
};

