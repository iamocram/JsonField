
(function(){

var jsonObjectField = CreateJsonObjectField();


AppendToChildWithAttribute(jsonObjectField, {"attr": "data-jsonfieldcontainer","value":"keyValuePair"}, CreateKeyValuePairElements());
AppendToChildWithAttribute(jsonObjectField, {"attr": "data-jsonfieldcontainer","value":"keyValuePair"}, CreateKeyValuePairElements());
AppendToChildWithAttribute(jsonObjectField, {"attr": "data-jsonfieldcontainer","value":"keyValuePair"}, CreateKeyValuePairElements());

document.getElementsByTagName("BODY")[0].append(jsonObjectField);



})();


function AppendToChildWithAttribute(element, attribute , appendThis) {
	var children = element.children;
	for (var i = children.length - 1; i >= 0; i--) {
		if (children[i].getAttribute(attribute.attr) === attribute.value) {
			children[i].append(appendThis);
		}
		
	}
}


function CreateJsonObjectField() {
	let div = createElement("div",["row","object"]);
	let inputObjectName = createElement("input", "col",
		[
			{
				"attr" :"type",
				"value":"text"},
			{
				"attr":"placeholder",
				"value":"Object Name"
			},
			{
				"attr":"data-jsonField",
				"value":"kvp-objectPropertyName"
			}
		]);
	let propertyContainer = createElement("div", "col",
		[
			{
				"attr":"data-jsonFieldContainer",
				"value":"keyValuePair"
			}
		]);


	div.append(inputObjectName);
	div.append(propertyContainer);
	return div;
}



function CreateKeyValuePairElements() {

	/*
	*  Create Elements
	*/
	let div = createElement("div",["keyvaluepair","row"]);
	let property = createElement(
		"input",
		"col",
		[
			{
				"attr" :"type",
				"value":"text"},
			{
				"attr":"placeholder",
				"value":"property"
			},
			{
				"attr":"data-jsonField",
				"value":"kvp-property"
			}
		]
	);
	let value = createElement(
		"input",
		"col",
		[
			{
				"attr":"type",
				"value":"text"
			},
			{
				"attr":"placeholder",
				"value":"value"
			},
			{
				"attr":"data-jsonField",
				"value":"kvp-value"
			}
		]
	);
	
	div.append(property);
	div.append(value);

	return div;
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


