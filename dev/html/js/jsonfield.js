

function CreateKeyValuePairElements() {

	var div = createElement("div",["keyvaluepair","row"]);

	document.getElementsByTagName("BODY")[0].append(div);


}

function createElement(elementName, classNames, attributes) {
	
	let element = document.createElement(elementName);

	addClassNames(element, classNames);

	addAttributes(element, attributes);

	return element;
}

function addClassNames (element, classNames) {
	if (classNames !== undefined) {
		// if the class is an array
		if (Array.isArray(classNames)){
			for (var i = classNames.length - 1; i >= 0; i--) {
				element.classList.add(classNames[i]);
			}
		} else {
			element.classList.add(classNames);
		}

	} 

	return element;
}

function addAttributes (element, attributes) {

	if (attributes !== undefined) {
		// if the attributes is an array
		if (Array.isArray(attributes)){
			for (var i = attributes.length - 1; i >= 0; i--) {
				element.setAttribute(attributes[i].attr, attributes[i].value);
			}
		}else {
			element.setAttribute(attributes.attr, attributes.value);
		}
	} 

	return element;
}


