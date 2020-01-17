function jFieldInit() {

	jFieldElements = document.getElementsByClassName("jfield");

	/*
	 * Remove Event Handler for existing items
	 */
	Array.from(jFieldElements).forEach((el) => {
	   StartContainerContent(el);
	});
}


/*  GET ALL AS JSON DATA */
function GetJsonObjectFromJField( jFieldElement ) {
	let jsonObject = {};

	let dataType =  getJsonDataType(jFieldElement.children[0]);

	if (dataType === "object") {
		let objectName = getJsonPropertyName(jFieldElement.children[0]);

		let objectValues = GetJFieldValues(jFieldElement.children[0]);

	}
}

function GetJFieldValues(element) {

	let jsonObject = {};


	for (let i = 0; i < element.children.length ; i++) {

		let thisChild = element.children.length;

		switch (thisChild.getAttribute("data-jsonfield")) {
			case "kvp-objectPropertyName":

				break;
			case "kvp-objectPropertyName":

				break;
		}






	}






	let container = getJsonContainerType(element);
	let values = [];
	for (let i = 0; i < container.children.length; i++) {

		let thisChild = container.children[i];

		if (thisChild.hasAttribute("data-jsonfieldcontainer")) {


		} else if (element.classList.contains("keyvaluepair")) {
			values.push(GetKeyValuePairJsonValues());
		}




	}
	return values;
}


function GetKeyValuePairJsonValues(element) {

	if (!element.classList.contains("keyvaluepair")) return;

	var propertyName = element.children[0].value;
	var propertyValue = element.children[1].value;

	return {propertyName:propertyName, propertyValue:propertyValue};

}

function getJsonPropertyName(element) {
	for (let i = 0; i < element.children.length; i++) {
		if (element.children[i].getAttribute("data-jsonfield") === "kvp-objectPropertyName") {
			return element.children[i].value;
		}
	}
}



/* SETUP  */
function StartContainerContent(element) {

	element.append(JFieldOptions());
}


function JFieldOptions() {

	let buttonPanel = createElement("div","jfield-option-pannels");

	let arrayButton = createElement("Button","btn btn-dark jfield-button", {"attr":"type","value":"button"});
	arrayButton.addEventListener("click", JFieldArrayClick);

	let objectButton = createElement("Button","btn btn-dark jfield-button", {"attr":"type","value":"button"});
	objectButton.addEventListener("click", JFieldObjectClick);

	arrayButton.innerHTML = "<span class='jfield-plus'>+</span> Array";
	objectButton.innerHTML = "<span class='jfield-plus'>+</span> Object";

	buttonPanel.append(arrayButton);
	buttonPanel.append(objectButton);

	return buttonPanel;
}

function JFieldOptionsObject() {
	let buttonPanelForObjects = createElement("div","jfield-option-object-pannels");

	let keyValuePairAddButton = createElement("Button","btn btn-dark jfield-button", {"attr":"type","value":"button"});
	keyValuePairAddButton.addEventListener("click", JFieldAddKeyValuePairClick);
	keyValuePairAddButton.innerHTML = "<span class='jfield-plus'>+</span> Property";


	buttonPanelForObjects.append(keyValuePairAddButton);

	return buttonPanelForObjects;
}


function AppendToChildWithAttribute(element, attribute , appendThis) {
	var children = element.children;
	for (var i = children.length - 1; i >= 0; i--) {
		if (children[i].getAttribute(attribute.attr) === attribute.value) {
			children[i].append(appendThis);
		}
	}
}


function CreateJsonObjectField() {
	let div = createElement("div",["row","object"], [ {"attr":"data-json-type", "value":"object"},{"attr":"data-jsonField","value":"json-type"}]);
	let propertyContainer = createElement("div", "col jfield-container no-padding",
		[
			{
				"attr":"data-jsonFieldContainer",
				"value":"object"
			},
			{
				"attr":"data-jsonField",
				"value":"container"
			}
		]);

	/* add initial key value pair */
	propertyContainer.append(CreateKeyValuePairElements());
	propertyContainer.append(JFieldOptionsObject());

	div.append(propertyContainer);
	return div;
}

/* Creates the array field */
function CreateArrayField() {
	let div = createElement("div",["row","array"],[ {"attr":"data-json-type", "value":"array"},{"attr":"data-jsonField","value":"json-type"}]);
	let inputObjectName = createElement("input", "col",
		[
			{
				"attr" :"type",
				"value":"text"
			},
			{
				"attr":"placeholder",
				"value":"Value"
			},
			{
				"attr":"data-jsonField",
				"value":"kvp-arrayPropertyValue"
			}
		]);
	let propertyContainer = createElement("div", "col jfield-container",
		[
			{
				"attr":"data-jsonFieldContainer",
				"value":"array"
			},
			{
				"attr":"data-jsonField",
				"value":"container"
			}
		]);


	div.append(inputObjectName);
	div.append(propertyContainer);
	return div;
}


function CreateValueOnlyElement() {
	let value = createElement(
			"input",
			"row",
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
		return value;
}


function CreateKeyValuePairElements() {

	/*
	*  Create Elements
	*/
	let div = createElement("div","keyvaluepair row no-gutters");
	let property = CreateJsonPropertyField(createElement(
		"input",
		"col",
		[
			{
				"attr" :"type",
				"value":"text"
			},
			{
				"attr":"placeholder",
				"value":"property"
			},
			{
				"attr":"data-jsonField",
				"value":"kvp-property"
			}
		]
	));
	let value = CreateJsonValueField(createElement(
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
	));

	div.append(property);
	div.append(value);

	return div;
}



function CreateJsonValueField(element) {

	let ele = createElement("div", "col", {"attr":"data-jsonField","value":"value"});

	ele.append(element);
	return ele;
}
function CreateJsonPropertyField(element) {

	let ele = createElement("div", "col", {"attr":"data-jsonField","value":"property"});

	ele.append(element);
	return ele;
}


function createElement(elementName, classNames, attributes) {

	let element = document.createElement(elementName);

	addClassNames(element, classNames);

	addAttributes(element, attributes);

	return element;
}

function addClassNames (element, classNames) {
	if (classNames !== undefined) {

		// convert to array if string as spaces in it
		if (classNames.indexOf(' ') >= 0)
		{
			classNames = classNames.split(" ");
		}

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


/*
* Get Child Containers
* */
function GetChildByAttribute(element,attribute, value) {
	let children = element.childNodes;

	if (children == null) return;

	for (let i = 0; i < children.length; i++) {

		if (children[i].getAttribute(attribute) === value ) {
			return children[i];
		}
	}
	return children;
}
function GetJsonFieldContainer(element, value) {
	return GetChildByAttribute(element, "data-jsonfieldcontainer", value);
}
function GetFieldContainer(element) {

	let children = element.childNodes;

	if (children == null) return;

	for (let i = 0; i < children.length; i++) {
		if (children[i].hasAttribute("data-jsonfieldcontainer")) {
			return children[i];
		}
	}
}



/* EVENT HANDLERS */
function JFieldObjectClick(e) {

	this.parentElement.parentElement.append(CreateJsonObjectField());

	this.parentElement.remove();
}
function JFieldArrayClick(e) {

	let arrayPanel = CreateArrayField();
	let containerField = GetFieldContainer(arrayPanel);
	containerField.append( JFieldOptions() );

	let arrayPanel2 = CreateArrayField();
	let containerField2 = GetFieldContainer(arrayPanel2);
	containerField2.append( JFieldOptions() );

	this.parentElement.parentElement.append(arrayPanel);
	this.parentElement.parentElement.append(arrayPanel2);
	this.parentElement.remove();
}

function JFieldAddKeyValuePairClick() {

	let numberOfChildren = this.parentElement.parentElement.childNodes.length;

	this.parentElement.parentElement.insertBefore(CreateKeyValuePairElements(),this.parentElement.parentElement.childNodes[numberOfChildren - 1]);

	GetJsonFromJField( document.getElementsByClassName("jfield")[0] );
}

