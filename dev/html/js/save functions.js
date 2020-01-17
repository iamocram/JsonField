function GetJsonObjectFromJField( jFieldElement ) {
    var jsonObject = {};

    var dataType =  getJsonDataType(jFieldElement.children[0]);

    if (dataType === "object") {
        let objectName = getJsonPropertyName(jFieldElement.children[0]);
        console.log(objectName);

        let objectValues = GetJFieldValues(jFieldElement.children[0]);
        console.log(objectValues);

        var JSONconversion = JSON.parse( "{" + objectValues[0] + "," + objectValues[1] + "}" );

        JSONconversion[objectValues[2]] = objectValues[2];
        console.log( );

    }
}

function getJsonDataType(element) {
    return element.getAttribute("data-json-type");
}
function getJsonContainerType(element) {

    for (let i = 0; i < element.children.length; i++) {

        if (element.children[i].getAttribute("data-jsonfieldcontainer") === "object") {

            return element.children[i];
        }

    }
}
