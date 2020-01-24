
/*
* Function Sections
* INITIALIZE
*
*
*
* Create JField Elements
* Create JField Buttons
* Create Elements
* Event Handlers
*
* */




/* ========= INITIALIZE ============   */
function initJField() {

	let jFieldElements = document.getElementsByClassName("JField");

	/*
	 * Remove Event Handler for existing items
	 */
	Array.from(jFieldElements).forEach((el) => {
		StartContainerContent(el);
	});

}

function StartContainerContent(jFieldInputContainer){

	let container = CreateJFieldContainer();

	let JField = CreateJField();

	let button = AddValueButton();



	container.append(JField);

	container.append(button);



	jFieldInputContainer.append(container);
}


/* ========= Create JField Element ============   */
/*
* This field needs the following triggers
* 1) Add another JField to the column below
* 2) Replace Itself with a key value pair Element (value is another JField)
* */
function CreateJField(property = false) {

	/*
	* Create the main field container
	* */
	let JField = createElement("div","row JField-Div JField-Div-Value", {"attr":"data-JFieldType", "value":"JFieldValue"});

	/*
	* Create the button that would convert the single value field to a double
	* */
	let KeyValuePairReplaceButton = KeyValuePairButton();

	/*
	* Create the input
	* */
	let Input = createElement("input", "JField-Row",[{"attr":"data-JFieldType", "value":"Input"},{"attr":"placeholder", "value":"value"}]);

	/*
	* Append the created elements
	* */
	JField.append(Input);

	JField.append(KeyValuePairReplaceButton);

	/*
	* Return these elements
	* */
	return JField;
}

function CreateKeyValuePairField(){

	let JField = createElement("div","row JField-Div JField-Div-KeyValue");

	/*
	* Create Property Field
	* */
	let fieldProperty = createElement("div","col JField-Div", {"attr":"data-JFieldType", "value":"JFieldProperty"});


	/*
	* Create the input
	* */
	let input = createElement("input", "JField-Row row",[{"attr":"data-JFieldType", "value":"Input"},{"attr":"placeholder", "value":"Property Name"}]);

	fieldProperty.append(input);

	let container = CreateJFieldContainer();

	/*
	* Create Value Field
	* */
	let fieldValue = createElement("div","col JField-Div", {"attr":"data-JFieldType", "value":"JFieldValue"});;

	input = createElement("input", "row JField-Row",[{"attr":"data-JFieldType", "value":"Input"},{"attr":"placeholder", "value":"Value"}]);

	/*
	* Create the button that would convert the single value field to a double
	* */
	let KeyValuePairReplaceButton = KeyValuePairButton();

	/*
	* Create the button that would convert the single value field to a double
	* */
	let valueButton = AddValueButton();

	fieldValue.append(input);

	fieldValue.append(KeyValuePairReplaceButton);
	container.append(fieldValue);
	container.append(valueButton);

	JField.append(fieldProperty);
	JField.append(container);

	return JField;

}

function CreateJFieldContainer() {
	return createElement("div","col JFieldContainer-Div array-container no-gutters");
}

/* ========= Create JField Buttons ============   */

function KeyValuePairButton() {
	let KeyValuePairReplaceButton = createElement("button", "JField-KeyValuePair-button",[{"attr":"type", "value":"button"}]);
	KeyValuePairReplaceButton.innerHTML = "KeyValuePair";
	KeyValuePairReplaceButton.addEventListener("click", OnJFieldKeyValuePairClick);
	return KeyValuePairReplaceButton;
}

function AddValueButton() {
	let KeyValuePairReplaceButton = createElement("button", "JField-value-button row",[{"attr":"type", "value":"button"}]);
	KeyValuePairReplaceButton.innerHTML = "+ ADD";
	KeyValuePairReplaceButton.addEventListener("click", OnAddValueClick);
	return KeyValuePairReplaceButton;
}


/* ========= Create Elements ============   */

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
			for (let i = classNames.length - 1; i >= 0; i--) {
				element.classList.add(classNames[i]);
			}
		} else {
			element.classList.add(classNames);
		}

	}

	return element;
}

// [{ attr, value }]
function addAttributes (element, attributes) {

	if (attributes !== undefined) {
		// if the attributes is an array
		if (Array.isArray(attributes)){
			for (let i = attributes.length - 1; i >= 0; i--) {
				element.setAttribute(attributes[i].attr, attributes[i].value);
			}
		}else {
			element.setAttribute(attributes.attr, attributes.value);
		}
	}

	return element;
}



/* ========= Event Handlers ============   */

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

function OnJFieldKeyValuePairClick() {

	let JField = CreateKeyValuePairField();

	let thisGrandParent = this.parentElement;

	thisGrandParent.classList.remove("row");


	this.parentElement.innerHTML = "";

	thisGrandParent.append(JField );

}

function OnAddValueClick() {

	let JField = CreateJField();

	let thisParent = this.parentElement;

	let numOfChildren = thisParent.childNodes.length;

	thisParent.insertBefore(JField, thisParent.childNodes[numOfChildren - 1]);

}
