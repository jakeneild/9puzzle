var idArray = [11, 12, 13, 21, 22, 23, 31, 32, 33]; //contains ID's
var domArray = []; //contains references to parent divs
var domChildArray = []; //contains reference to child divs
var positionArray = ["0px 0px", "-150px 0px", "-300px 0px", "0px -150px", "-150px -150px", "-300px -150px", "0px -300px", "-150px -300px", "empty"];  //contains background positions

//check writing for new positionArray position

//assign divs to variables
for(let i = 0; i < idArray.length; i++){
    domArray[i] = document.getElementById(idArray[i]);
}
domArray[8].className = "empty";

//populates divs
for(let i = 0; i < idArray.length - 1; i++){
    domChildArray[i] = document.createElement("div");
    domChildArray[i].style.backgroundImage = "url('pic.jpg')";
    domChildArray[i].style.backgroundPosition = positionArray[i];
    domChildArray[i].id = i;
    domArray[i].appendChild(domChildArray[i]);
}
domChildArray[8] = "empty";
console.log(domChildArray);


//randomize position

//check for win

//click events
function switchDivs(e){
    let parentTarget = e.target;
    if(e.target.className != "empty"){  //need to add adjacent movement only 
        console.log("childTargetID: "+  e.target.parentElement.firstChild.id);
        let childTargetId = e.target.parentElement.firstChild.id;
        console.log(childTargetId);
        let childTarget = domChildArray[childTargetId];
        console.log(childTarget);
        let emptyDiv = document.getElementsByClassName("empty").item(0);
        let emptyDivIndex = domChildArray.indexOf("empty");
        
        emptyDiv.classList.remove("empty");
        parentTarget.parentElement.className = "empty";

        var newChildDiv = document.createElement("div");
        newChildDiv.style.backgroundImage = "url('pic.jpg')";
        newChildDiv.style.backgroundPosition = positionArray[childTargetId];
        newChildDiv.id = childTargetId;
        emptyDiv.appendChild(newChildDiv);

        domChildArray[childTargetId] = newChildDiv;
        domChildArray[emptyDivIndex] = "empty";  //just changed the target of this and the preceding line

        e.target.parentElement.innerHTML = " "; 

        positionArray[emptyDivIndex] = newChildDiv;
        positionArray[childTargetId] = "empty";

        //console.log(positionArray);
        //console.log(domChildArray);
        //console.log(domArray);

        //fix position array and dom array
    }
    

}

//event listeners
for(let i = 0; i < idArray.length; i++){
    domArray[i].addEventListener("click", switchDivs);
}


