var idArray = [11, 12, 13, 21, 22, 23, 31, 32, 33]; //contains ID's
var domArray = []; //contains references to parent divs
var domChildArray = []; //contains reference to child divs
var positionArray = ["0px 0px", "-150px 0px", "-300px 0px", "0px -150px", "-150px -150px", "-300px -150px", "0px -300px", "-150px -300px", "empty"];  //contains background positions

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

/*function checkWin(){  //untested
    let win = false;
    for(i=0; i < positionArray.length; i++{
        if(domArray[i].firstChild.style.backgroundPosition != positionArray[i]{
            win = false;
        }
    }
    if(win= true){
        var endPic = document.createElement("div");
        endPic.style.width = 450px;
        endPic.style.height = 450px;
        endpic.style.backgroundImage = url('pic.jpg');
        endpic.z-index = 2;  //never used this
        document.querySelector("body").appendChild(endPic);
    }
}
*/


function switchDivs(e){  //this function doesn't work 100%
    let parentTarget = e.target;
    if(e.target.className != "empty"){  //need to add adjacent movement only 
        //console.log("childTargetID: "+  e.target.parentElement.firstChild.id);
        let childTargetId = e.target.parentElement.firstChild.id;
        console.log("childTargetID: " + childTargetId);
        let childTarget = domChildArray[childTargetId];
        console.log("childTarget: " + childTarget);
        let emptyDiv = document.getElementsByClassName("empty").item(0);

        let emptyDivIndex = domChildArray.indexOf("empty");
        
        emptyDiv.classList.remove("empty");
        parentTarget.parentElement.className = "empty";

        var newChildDiv = document.createElement("div");
        newChildDiv.style.backgroundImage = "url('pic.jpg')";
        newChildDiv.style.backgroundPosition = positionArray[childTargetId];
        newChildDiv.id = childTargetId;
        emptyDiv.appendChild(newChildDiv);

        domChildArray[childTargetId] = "empty";
        domChildArray[emptyDivIndex] = newChildDiv;  //just changed the target of this and the preceding line

        e.target.parentElement.innerHTML = " "; 

        positionArray[emptyDivIndex] = positionArray[childTargetId];
        positionArray[childTargetId] = "empty";

        //checkWin();
        console.log("position array: " + positionArray);
        console.log("domChildArray: "+ domChildArray);
        console.log("domArray" + domArray);

        //fix position array and dom array
    }
    

}

//event listeners
for(let i = 0; i < idArray.length; i++){
    domArray[i].addEventListener("click", switchDivs);
}


