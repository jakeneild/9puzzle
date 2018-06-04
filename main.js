document.getElementById("playAgain").style.visibility = "hidden";
document.getElementById("winText").style.visibility = "hidden";
document.getElementById("playAgain").addEventListener("click", playAgain);

var domArray = []; //contains references to parent divs
var domChildArray = []; //contains reference to child divs
var positionArray = ["0px 0px", "-150px 0px", "-300px 0px", "0px -150px", "-150px -150px", "-300px -150px", "0px -300px", "-150px -300px", "empty"];  //contains background positions
var objArray = [];
var winArray = [];

for(let i = 0; i < 9; i++){
    domArray[i] = document.getElementById(i);
}

positionArray.forEach(function createObj(content, index){  //This isn't working yet
    let obj = {
        position: content,
        location: index
    }
    objArray.push(obj);
});

for(let i = 0; i < 9; i ++){
    winArray[i] = objArray[i].position;
}

//console.log("Win array at start: ", winArray);
//console.log("Object array at start: ", objArray);

//assign divs to variables
for(let i = 0; i < 9; i++){
    if(i< 8){
        domArray[i].style.backgroundImage = "url('pic.jpg')";
        domArray[i].style.backgroundPosition = objArray[i].position;
    } else {
        domArray[i].className = "empty";
        domArray[i].style.backgroundImage = " ";
    }
}

//populates divs
/*for(let i = 0; i < idArray.length - 1; i++){
    domChildArray[i] = document.createElement("div");
    domChildArray[i].style.backgroundImage = "url('pic.jpg')";
    domChildArray[i].style.backgroundPosition = positionArray[i];
    domChildArray[i].id = i;
    domArray[i].appendChild(domChildArray[i]);
}
domChildArray[8] = "empty";
console.log(domChildArray);*/


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

//play again function
function playAgain(){
    console.log("Play again hit");
    document.getElementById("playAgain").style.visibility = "hidden";
    document.getElementById("winText").style.visibility = "hidden";
    document.getElementById("randomize").style.visibility = "visible";
    for(let i = 0; i< 9; i ++){
        document.getElementById(i).style.border = "1px solid black";
    }
    document.getElementsByClassName("empty")[0].style.backgroundImage = null;
    document.getElementsByClassName("empty")[0].style.backgroundPosition = null;

}

function checkWin(){
    let win = true;
    for(let i = 0; i < 9; i ++){
        if(objArray[i].position != winArray[i]){
            win = false;
        }
    }
    if(win==true){
        document.getElementsByClassName("empty")[0].style.backgroundImage = "url('pic.jpg')";
        document.getElementsByClassName("empty")[0].style.backgroundPosition = "-300px -300px";
        for(let i = 0; i< 9; i ++){
            document.getElementById(i).style.border = "0px solid black";
        }
        document.getElementById("randomize").style.visibility = "hidden";
        document.getElementById("playAgain").style.visibility = "visible";
        document.getElementById("winText").style.visibility = "visible";

        
    }
}

function randomize(){
    for(let i = 0; i < 100; i++){
        let rand = Math.floor((Math.random() * 10));
        //console.log(rand);
        let emptyDiv = document.getElementsByClassName("empty")[0];
        if(rand != emptyDiv.id && rand != 9){
            //
            emptyDiv.style.backgroundImage = "url('pic.jpg')";
            emptyDiv.style.backgroundPosition = document.getElementById(rand).style.backgroundPosition;
            //remove old classname
            emptyDiv.className = "";
            //edit object for empty div to refelct new position
            let x = 0;

            for(let i = 0; i < objArray.length; i++){
                if (objArray[i].position == "empty"){
                    objArray[i].position = document.getElementById(rand).style.backgroundPosition;
                    x = i;
                }
            }
            //set old object position to empty
            for(let i = 0; i < objArray.length; i++){
                if (objArray[i].position == document.getElementById(rand).style.backgroundPosition && i != x){
                    objArray[i].position = "empty";
                }
            }
        
            //set old div to empty
            document.getElementById(rand).style.backgroundImage = null;
            document.getElementById(rand).style.backgroundPosition = null;
            console.log("Obj Array after", objArray);
            console.log("Win Array after", winArray);
            //give old div classname
            document.getElementById(rand).className = "empty";
            
        }
    }
}

function checkIfCompatible(targetId, emptyId){
    targetId = parseInt(targetId);
    emptyId = parseInt(emptyId);
    if(targetId == 0 && (emptyId == 1 || emptyId == 3)){
        return true;
    }else if (targetId == 1 && (emptyId == 0 || emptyId == 2 || emptyId == 4)){
        return true;
    } else if (targetId ==2 && (emptyId == 1 || emptyId == 5)){
        return true;
    } else if (targetId ==3 && (emptyId == 0 || emptyId == 4 || emptyId == 6)){
        return true;
    } else if (targetId ==4 && (emptyId == 1 || emptyId == 3 || emptyId == 5 || emptyId ==7)){
        return true;
    } else if (targetId ==5 && (emptyId == 2 || emptyId == 4 || emptyId == 8)){
        return true;
    } else if (targetId ==6 && (emptyId == 3 || emptyId == 7)){
        return true;
    } else if (targetId ==7 && (emptyId == 4 || emptyId == 6 || emptyId == 8)){
        return true;
    } else if (targetId ==8 && (emptyId == 5 || emptyId == 7)){
        return true;
    } else {
        return false;
    }

}

function switchDivs(e){  
    let parentTarget = e.target;
    let emptyDiv = document.getElementsByClassName("empty")[0];
    //console.log(e.target.id + 1);
    //console.log(emptyDiv.id + 1);
    if(e.target.className != "empty"){
        console.log("if statement reached");
        if(checkIfCompatible(e.target.id, emptyDiv.id)){  //need to add adjacent movement only 
            //console.log("Win array before: ", winArray)
            //console.log("if statement passed");

            //set position and background image for empty div
            emptyDiv.style.backgroundImage = "url('pic.jpg')";
            emptyDiv.style.backgroundPosition = e.target.style.backgroundPosition;
            //remove old classname
            emptyDiv.className = "";
            //edit object for empty div to refelct new position
            let x = 0;

            for(let i = 0; i < objArray.length; i++){
                if (objArray[i].position == "empty"){
                    objArray[i].position = e.target.style.backgroundPosition;
                    x = i;
                }
            }
            //set old object position to empty
            for(let i = 0; i < objArray.length; i++){
                if (objArray[i].position == e.target.style.backgroundPosition && i != x){
                    objArray[i].position = "empty";
                }

            }
            //set old div to empty
            e.target.style.backgroundImage = null;
            e.target.style.backgroundPosition = null;
            //console.log("Obj Array after", objArray);
            //console.log("Win Array after", winArray);
            //give old div classname
            e.target.className = "empty";
            

            //check for win
            checkWin();


            /*//console.log("childTargetID: "+  e.target.parentElement.firstChild.id);
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
            //console.log("new child: " + domChildArray[emptyDivIndex]);

            e.target.parentElement.innerHTML = " "; 

            positionArray[emptyDivIndex] = positionArray[childTargetId];
            positionArray[childTargetId] = "empty";

            //checkWin();
            console.log("position array: " + positionArray);
            console.log("domChildArray: "+ domChildArray);
        // console.log("domArray" + domArray);

            //fix position array and dom array

            */
        }
    }

}

//event listeners
for(let i = 0; i < 9; i++){
    domArray[i].addEventListener("click", switchDivs);
}

document.getElementById("randomize").addEventListener("click", randomize);
