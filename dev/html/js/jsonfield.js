/*
* Function Sections
* INITIALIZE
*
*
*
* Create JField Elements
* Create JField Buttons
* Create Elements
* Result Logic
* Small Logic Functions
* Event Handlers
*
* */

var JFieldSingleValues = false;

/* ========= INITIALIZE ============   */
function initJField(options = null) {

	if (options !== null) {
		if (options["SingleValues"] !== undefined) {
			JFieldSingleValues = options["SingleValues"];
		}
	}


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

	let ColumnOptions = AddColumnOptions();

	//button.setAttribute("style","display:block;");

	container.append(JField);

	container.append(ColumnOptions);



	jFieldInputContainer.append(container);
}


/* ========= Create JField Element ============   */
/*
* This field needs the following triggers
* 1) Add another JField to the column below
* 2) Replace Itself with a key value pair Element (value is another JField)
* */
function CreateJField() {

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
	Input.addEventListener("keyup",CreateJsonObject);


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

	let JField = createElement("div","row JField-Div JField-Div-KeyValue",{"attr":"data-JFieldType", "value":"KeyValue"});

	/*
	* Create Property Field
	* */
	let fieldProperty = createElement("div","col JField-Div", {"attr":"data-JFieldType", "value":"JFieldProperty"});


	/*
	* Create the input
	* */
	let input = createElement("input", "JField-Row row",[{"attr":"data-JFieldType", "value":"Input"},{"attr":"placeholder", "value":"Property Name"}]);
	input.addEventListener("keyup", CreateJsonObject);

	fieldProperty.append(input);

	let container = CreateJFieldContainer();

	/*
	* Create Value Field
	* */
	let fieldValue = createElement("div","col JField-Div", {"attr":"data-JFieldType", "value":"JFieldValue"});;

	input = createElement("input", "row JField-Row",[{"attr":"data-JFieldType", "value":"Input"},{"attr":"placeholder", "value":"Value"}]);
	input.addEventListener("keyup", CreateJsonObject);

	/*
	* Create the button that would convert the single value field to a double
	* */
	let KeyValuePairReplaceButton = KeyValuePairButton();

	/*
	* Create the button that would convert the single value field to a double
	* */
	let ColumnOptions = AddColumnOptions();




	fieldValue.append(input);

	fieldValue.append(KeyValuePairReplaceButton);
	container.append(fieldValue);
	container.append(ColumnOptions);


	JField.append(fieldProperty);
	JField.append(container);

	return JField;

}

function CreateJFieldContainer() {
	return createElement("div","col JFieldContainer-Div array-container no-gutters", [{"attr":"data-jfieldtype","value":"array-container"}]);
}

/* ========= Create JField Buttons ============   */

function KeyValuePairButton() {
	let KeyValuePairReplaceButton = createElement("button", "JField-KeyValuePair-button",[{"attr":"type", "value":"button"}]);
	KeyValuePairReplaceButton.innerHTML = "KVP";
	KeyValuePairReplaceButton.addEventListener("click", OnJFieldKeyValuePairClick);
	KeyValuePairReplaceButton.addEventListener("keyup",CreateJsonObject);
	return KeyValuePairReplaceButton;
}


function AddColumnOptions(){
	let columnOptionButtons = createElement("div", "row",[{"attr":"data-jfieldtype", "value":"ColumnOptions"}]);

	let addButton = AddValueButton();
	let removeButton = AddRemoveButton();

	columnOptionButtons.append(addButton);
	columnOptionButtons.append(removeButton);

	return  columnOptionButtons;

}


function AddValueButton() {
	let KeyValuePairReplaceButton = createElement("button", "JField-value-button col",[{"attr":"type", "value":"button"}]);
	KeyValuePairReplaceButton.innerHTML = "+";
	KeyValuePairReplaceButton.addEventListener("click", OnAddValueClick);
	return KeyValuePairReplaceButton;
}

function AddRemoveButton(){
	let deleteButton = createElement("button", "JField-value-button col",[{"attr":"type", "value":"button"}]);
	deleteButton.innerHTML = "-";
	deleteButton.addEventListener("click", OnRemoveValueClick);
	return deleteButton;

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


/* ========= Result Logic============   */
function CreateJsonObject(){

	let jFieldElements = document.getElementsByClassName("JField")[0];

	let jsonResultContainer = document.getElementById("jsonResult");

	let result = [];


	for (let i = 0; i < jFieldElements.childNodes.length; i++) {

		if (jFieldElements.childNodes[i].className.includes('array-container')){

			result = GetValuesFromArrayContainer(jFieldElements.childNodes[i]);
		}
	}

	jsonResultContainer.innerHTML = JSON.stringify(result);


}


function RetrievePropertyName(ele){

	for (let i = 0; i < ele.childNodes.length; i++) {

		let thisEle = ele.childNodes[i];

		if (CheckElementForJFieldType(thisEle, "Input")) {
			return thisEle.value;
		}
		else {
			let loop = RetrievePropertyName(thisEle);

			if (loop != null) {
				return loop;
			}
		}
	}
}


function GetValuesFromArrayContainer(arrayContainer){
	let thisArray = [];
	let thisObject = {};

	for (let i = 0; i < arrayContainer.childNodes.length; i++) {

		let thisNode = arrayContainer.childNodes[i];


		if (CheckElementForJFieldType(thisNode,"JFieldValue")){

			let Jnode = thisNode.childNodes[0];

			if (CheckElementForJFieldType(Jnode,"KeyValue"))
			{

				let propName = RetrievePropertyName(Jnode);

				thisObject[ propName ] = GetValuesFromArrayContainer(Jnode.childNodes[1] );

				if (thisArray.length > 0) {

					thisArray.push(thisObject);
				}

			}
			else
			{
				thisArray.push(thisNode.childNodes[0].value);

			}

		}
	}

	if (Object.keys(thisObject).length > 0 && thisObject.constructor === Object && thisArray.length === 0)
		return thisObject;
	if (thisArray.length === 1)
		return thisArray[0];

	return thisArray.length > 0 ? thisArray : thisObject;
}

function CheckElementForJFieldType(ele, type){
	return (ele.hasAttribute("data-jfieldtype") && ele.getAttribute("data-jfieldtype") === type)
}

function GetArrayOfAllValues(ele){
	let elements = [];

	for (let i = 0; i < ele.childNodes.length; i++) {

		if (ele.childNodes[i].getAttribute("data-jfieldtype") === "JFieldValue") {
			elements.push(ele.childNodes[i]);
		}
	}

	return elements;
}



/* ========= Event Handlers ============   */



function OnJFieldKeyValuePairClick() {

	let JField = CreateKeyValuePairField();

	let thisGrandParent = this.parentElement;

	JField.childNodes[0].childNodes[0].value = thisGrandParent.childNodes[0].value;

	thisGrandParent.classList.remove("row");

	this.parentElement.innerHTML = "";

	thisGrandParent.append(JField );

}

function OnAddValueClick() {

	let JField = CreateJField();

	let thisParent = this.parentElement.parentElement;



	let numOfChildren = thisParent.childNodes.length;

	thisParent.insertBefore(JField, thisParent.childNodes[numOfChildren - 1]);

	CreateJsonObject();
}

function OnRemoveValueClick() {

	let columnOptions = this.parentElement;

	let valueContainer = columnOptions.parentElement;

	let columnContainer = valueContainer.parentElement;



	let valuesInThisArray = GetArrayOfAllValues(valueContainer);

	let remainingValues = valuesInThisArray.length;

	if (remainingValues > 0) {

		if (remainingValues === 1 ) {

			if (columnContainer.getAttribute("data-jfieldtype") === "KeyValue") {

				let columnContainerParent = columnContainer.parentElement;

				columnContainerParent.classList.add("row")

				columnContainer.remove();

				let jField = CreateJField()

				let keyValueButton = KeyValuePairButton();

				columnContainerParent.append(jField.childNodes[0]);

				columnContainerParent.append(keyValueButton);
			}
		}
		else {
			valuesInThisArray[valuesInThisArray.length - 1].remove();
		}

		CreateJsonObject();
	}
}
