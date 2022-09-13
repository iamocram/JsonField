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
* Json to Form
* Small Logic Functions
* Event Handlers
*
* */

let JFieldSingleValues = false;

/* ========= INITIALIZE ============   */
function initJFields() {
	let jFieldElements = document.getElementsByClassName("JField");

	/*
	 * Remove Event Handler for existing items
	 */
	Array.from(jFieldElements).forEach((el) => {
		initJField(el);
	});
}

/* ========= INITIALIZE ============   */
function initJField(jFieldElement) {
	StartContainerContent(jFieldElement);
}

function CreateJFieldElement(parentElement,id,result)
{
	if (parentElement == null && id == null) {
		console.log("Needs parent element and ID");
		return;
	}

	let JFieldElement = createElement("div","JField",{"attr":"id", "value":id});
	parentElement.appendChild(JFieldElement);
	if (result == null)
	{
		let JFieldResultElement = createElement("input",undefined,[{"attr":"type", "value":"hidden"},{"attr":"data-JFieldID", "value":id}]);
		parentElement.appendChild(JFieldResultElement);
	}
	StartContainerContent(JFieldElement);
}

function StartContainerContent(jFieldInputContainer){

	let container = CreateJFieldContainer();

	let JField = CreateJField();

	let ColumnOptions = AddColumnOptions();

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

	Input.addEventListener("keyup", function(e){
		let JFieldFormElement = GetThisJFieldFormElement(e);
		if (ResultsContainerExist(JFieldFormElement.getAttribute("id")))
			ShowResults(GetResultsContainer(JFieldFormElement),CreateJsonObject(JFieldFormElement));
	});
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
	input.addEventListener("keyup", function(e){
		let JFieldFormElement = GetThisJFieldFormElement(e);
		if (ResultsContainerExist(JFieldFormElement.getAttribute("id")))
			ShowResults(GetResultsContainer(JFieldFormElement),CreateJsonObject(JFieldFormElement));
	});

	fieldProperty.append(input);

	let container = CreateJFieldContainer();

	/*
	* Create Value Field
	* */
	let fieldValue = createElement("div","col JField-Div", {"attr":"data-JFieldType", "value":"JFieldValue"});

	input = createElement("input", "row JField-Row",[{"attr":"data-JFieldType", "value":"Input"},{"attr":"placeholder", "value":"Value"}]);
	input.addEventListener("keyup", function(e){
		let JFieldFormElement = GetThisJFieldFormElement(e);
		if (ResultsContainerExist(JFieldFormElement.getAttribute("id")))
			ShowResults(GetResultsContainer(JFieldFormElement),CreateJsonObject(JFieldFormElement));
	});

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
	fieldValue.append(new ArraySingleSwapButton("[]"));

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

function ArraySingleSwapButton(type) {
	let JField = createElement("button","JField-ArraySingleSwap-button",{"attr":"type","value":"button"});
	if (type === "[]")
	{
		JField.value = "[]";
		JField.innerHTML = "[ ]";
	}
	else
	{
		JField.value = "str";
		JField.innerHTML = '""';
	}
	JField.addEventListener("click",function (){ new OnJFieldArraySingleSwap(this,JField.value)});
	return JField;
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
		if (classNames.includes(' '))
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

// attributes = [{ "attr", "value" }]
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

/* ========= Result Logic ============   */
function CreateJsonObject(JFieldElement){
	if (JFieldElement === undefined  || JFieldElement === null)
		JFieldElement = document.getElementsByClassName("JField")[0];
	return ConvertHTMLToJason(JFieldElement);
}

function ShowResults(resultsContainerId,JsonData) {
	SetResultToInput(resultsContainerId,JsonData);
	resultsContainerId.innerHTML = JSON.stringify(JsonData.length > 1 ? JsonData : JsonData[0] );
}

function SetResultToInput(resultsContainerId,JsonData) {
	if (resultsContainerId.hasAttribute("type")) 	resultsContainerId.value = JsonData;
}


/* ========= Json to Form ===========   */
function JsonToForm(jsonData) {
	let jFieldElements = document.getElementsByClassName("JField")[0].childNodes[0];
	jFieldElements.innerHTML = "";
	jFieldElements.appendChild(AddColumnOptions());
	if (Object.keys(jsonData).length > 0 && jsonData.constructor === Object && thisArray.length === 0)
	{

	}
	else if (jsonData.length > 0)
	{
		for (let i = 0; i < jsonData.length; i++) {
			CreateFieldFromJsonData(jFieldElements,jsonData[i]);
		}
	}
	// Fix Spacing for top level items
	for (let i = 0; i < jFieldElements.childNodes.length; i++) {
		if (CheckElementForJFieldType(jFieldElements.childNodes[i],"JFieldValue") && CheckElementForJFieldType(jFieldElements.childNodes[i].childNodes[0],"KeyValue"))
		jFieldElements.childNodes[i].classList.remove("row");
	}
	ShowResults(GetResultsContainer(document.getElementsByClassName("JField")[0]),CreateJsonObject(document.getElementsByClassName("JField")[0]));
}


/* ========= Small Logic Functions ============   */

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
	let layerIsAllKVP = true;

	// Are all fields key value pairs
	let singleStringToArrayType = arrayContainer.childNodes[0].hasAttribute("data-jfieldarray");

	let jfields = GetJFieldElements(arrayContainer.childNodes);

	for (let i = 0; i < jfields.length; i++) {
		let Jnode = jfields[i];
		if (Jnode.childNodes.length === 0) continue;

		let kvpField = Jnode.childNodes[0];

		if (!CheckElementForJFieldType(kvpField,"KeyValue")) layerIsAllKVP = false;
	}

	for (let i = 0; i < arrayContainer.childNodes.length; i++) {
		if (!layerIsAllKVP) thisObject = {};

		let thisNode = arrayContainer.childNodes[i];

		if (CheckElementForJFieldType(thisNode,"JFieldValue")){

			let Jnode = thisNode.childNodes[0];

			if (CheckElementForJFieldType(Jnode,"KeyValue"))
			{

				let propName = RetrievePropertyName(Jnode);

				thisObject[ propName ] = GetValuesFromArrayContainer(Jnode.childNodes[1] );

				if (!layerIsAllKVP) {
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
	if (thisArray.length === 1 && !singleStringToArrayType)
		return thisArray[0];

	return thisArray.length > 0 ? thisArray : thisObject;
}

function GetJFieldElements(ele) {
	let elements = [];

	for (let i = 0; i < ele.length; i++) {
		let childNode = ele[i];
		if (childNode.hasAttribute("data-jfieldtype") && childNode.getAttribute("data-jfieldtype") !== "ColumnOptions")
			elements.push(childNode);
	}
	return elements;
}

function CheckElementForJFieldType(ele, type) {
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

function DetermineValueType(item) {
	if (item.constructor === Object) return "object";
	else if (Array.isArray(item)) return "Array";
	else return "Value";
}

function CreateFieldFromJsonData(parentEle,value) {
	let fieldType = DetermineValueType(value);
	switch (fieldType) {
		case "Value":
			let jField = CreateJField();
			SetJFieldData(jField,value);
			let numOfChildren = parentEle.childNodes.length;
			parentEle.insertBefore(jField, parentEle.childNodes[numOfChildren - 1]);
			break;
		case "Array":
			for (let i = 0; i < value.length; i++) {
				let jField = CreateJField();
				SetJFieldData(jField,value[i]);

				let numOfArrayChildren = parentEle.childNodes.length;
				parentEle.insertBefore(jField, parentEle.childNodes[numOfArrayChildren - 1]);
			}
			break;
		case "object":
			/* Create JField */
			let jFieldKeyValue = CreateJField();
			jFieldKeyValue.innerHTML = "";

			/* Create KeyValue */
			let KeyValuePair = new CreateKeyValuePairField();
			let container = KeyValuePair.childNodes[1];
			container.innerHTML = "";
			container.append(AddColumnOptions());

			// If the object has a single property Value
			if (Object.entries(value).length === 1)
			{
				for (const [key, val] of Object.entries(value)) {
					SetJFieldData(KeyValuePair, "", key)
					CreateFieldFromJsonData(container,val);
					jFieldKeyValue.append(KeyValuePair);
				}
				parentEle.insertBefore(jFieldKeyValue, parentEle.childNodes[parentEle.childNodes.length - 1]);
			}
			else // If the object has multiple property values
			{
				for (const [key, val] of Object.entries(value)) {
					jFieldKeyValue = CreateJField();
					jFieldKeyValue.innerHTML = "";
					jFieldKeyValue.classList.remove("row")
					KeyValuePair = new CreateKeyValuePairField();
					container = KeyValuePair.childNodes[1];
					container.innerHTML = "";
					SetJFieldData(KeyValuePair, "", key)
					jFieldKeyValue.append(KeyValuePair);
					CreateFieldFromJsonData(container,val);
					parentEle.insertBefore(jFieldKeyValue, parentEle.childNodes[parentEle.childNodes.length - 1]);
				}
			}
			break;
	}
}

function SetJFieldData(ele, value, propertyName) {
	 if (CheckElementForJFieldType(ele,"JFieldValue"))
	 {
		 ele.childNodes[0].value = value;
	 } else if (CheckElementForJFieldType(ele,"KeyValue") && propertyName !== "")
	{
		let JFieldProperty = ele.childNodes[0];
		JFieldProperty.childNodes[0].value = propertyName;
	} else if (CheckElementForJFieldType(ele,"KeyValue") && value !== "")
	{
		let arrayContainer = ele.childNodes[1];
		arrayContainer.childNodes[0].childNodes[0].value = value;
	}
}

function ConvertHTMLToJason(JFieldElement){
	if (!JFieldElement.classList.contains("JField")) {
		console.log("You need to pass in the top level form element \".JField\"");
		return;
	}
	let result = [];
	for (let i = 0; i < JFieldElement.childNodes.length; i++) result.push(GetValuesFromArrayContainer(JFieldElement.childNodes[i]));
	return result;
}

function GetThisJFieldFormElement(element) {
	if (element === undefined || element == null) return document.getElementsByClassName("JField")[0];
	let JFieldID = "";

	if (element["path"] !== undefined) {
		let breadCrumbs = element["path"];
		for (let i = 0; i < breadCrumbs.length; i++) {
			let ele = breadCrumbs[i];
			if (ele.classList !== undefined && ele.classList.contains("JField")) {
				JFieldID = ele.getAttribute("id");
				break;
			}
		}
	}
	if (element.parentElement != null)
	{
		let parent = element;
		while (JFieldID === "")
		{
			if (parent.classList !== null && parent.classList.contains("JField"))
				JFieldID = parent.getAttribute("id");
			parent = parent.parentElement;
			if (parent.tagName === "BODY") break;
		}
	}
	console.log(JFieldID);
	if (JFieldID === "" || JFieldID === null) return document.getElementsByClassName("JField")[0];
	return document.getElementById(JFieldID);
}

function ResultsContainerExist(formIdName) {
	return !!(document.querySelector("#JFieldResult") || document.querySelector('*[data-JFieldID="' + formIdName + '"]'));
}

function GetResultsContainer(JFieldElement) {
	let JFieldIdName = JFieldElement.getAttribute("id");
	if (JFieldIdName !== null) {
		return document.querySelector('*[data-JFieldID="'+JFieldIdName+'"]');
	} else if (document.getElementById("JFieldResult")) {
		return document.getElementById("JFieldResult");
	}
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

function OnJFieldArraySingleSwap(thisEvent,type) {

	let thisParent = thisEvent.parentElement;
	 if (type === "[]") {
		 thisParent.setAttribute("data-JFieldArray","");
		 thisEvent.value = "str";
		 thisEvent.innerHTML = '""';
	 }
	 else {
		 thisParent.removeAttribute("data-JFieldArray");
		 thisEvent.value = "[]";
		 thisEvent.innerHTML = "[]";
	 }

	let JFieldFormElement = GetThisJFieldFormElement(thisParent);
	if (ResultsContainerExist(JFieldFormElement.getAttribute("id")))
		ShowResults(GetResultsContainer(JFieldFormElement),CreateJsonObject(JFieldFormElement));
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
