<section id="list" style="background-color: gray;">
    <div class="layout" id="Menu">
        <button class="button" id="add training day">Add training day</button>
        <button class="button" id="delete training day">Delete training day</button>
        <button class="button" id="set number courts">Courts:</button>
        <button class="button" id="add team">Add team</button>
        <button class="saveLoadButton" id="save button">Save</button>
        <div class = "dropdown">
            <button class="saveLoadButton" id="load button">Load</button>
            <div class="dropdown-content" id="load-dropdown">

            </div>
        </div>
        <button class="saveLoadButton" id="done button">Done</button>
    </div>
    <div class="layout" id="Menu2" style="display: none;">

        <div class = "dropdownclick">
            <button class="saveLoadButton" id="create team clash button">Create Team Clash</button>
            <div class="dropdownclick-content" id="load create team clash dropdown">

            </div>
        </div>

        <div class = "dropdown">
            <button class="saveLoadButton" id="team clash button">Team Clashes</button>
            <div class="dropdown-content" id="load team clash dropdown">

            </div>
        </div>

        <div class = "dropdownclick">
            <button class="saveLoadButton" id="create time clash button">Create Timeslot Clash</button>
            <div class="dropdownclick-content" id="load create time clash dropdown">

            </div>
        </div>

        <div class = "dropdown">
            <button class="saveLoadButton" id="time clash button">Timeslot Clashes</button>
            <div class="dropdown-content" id="load time clash dropdown">

            </div>
        </div>

        
        <button class="saveLoadButton" id="save2 button">Save</button>
        <div class = "dropdown">
            <button class="saveLoadButton" id="load2 button">Load</button>
            <div class="dropdown-content" id="load2-dropdown">

            </div>
        </div>
        <button class="saveLoadButton" id="done2 button">Done</button>
    </div>
    <div class="layout" id="Menu3" style="display: none;">
        <button class="saveLoadButton" id="lock button">lock</button>
        <button class="saveLoadButton" id="unlock button">unlock</button>
    </div>
</section>

<div class="grid-container" id="grid">
    
</div>

<script>

startCourtColor = '#c5c5c5';
document.body.style.backgroundColor = "black";

var numberOfDays = 0;
var numberOfCourts = 3;
var draggingOver = null;
var courtNumber = 0;
var currentSchedule;
var justSaved = false;
var teamClashList = [];
var timeClashList = [];
var clickToLock = false;
var clickToUnlock = false;

setupMenu1Buttons();
setupLoadSchedule();
window.onresize = windowResize;

function getTeamNameList() {
    var teams = document.getElementsByClassName('team');
    var nameList = [];
    for (i = 0; i < teams.length; i++){
        if (!nameList.includes(teams[i].innerHTML)){
            nameList.push(teams[i].innerHTML);
        }
    }
    nameList.sort();
    return nameList;
}

function setupComplete(){
    if (!justSaved){
        if (!confirm('Continue without saving the current schedule?')) {
            return;
        }
    }
    var currentSchedule = makeJSONSchedule();
    document.getElementById("Menu2").style.display = "none";
    document.getElementById("Menu3").style.display = "block";
    setupMenu3Buttons();
} 
//----------------------------------------------------------------------------------
function updateTeamClashDropDown(){
    if (teamClashList == []){
        return;
    }
    var dropDownArea = document.getElementById('load team clash dropdown');
    removeAllChildren(dropDownArea);
    var dropDownList = [];
    for (let i = 0; i < teamClashList.length; i++){
        dropDown = document.createElement('a');
        dropDownList.push(dropDown);
        dropDownList[i].id = i;
        dropDownList[i].innerHTML = teamClashList[i][0] + " - " + teamClashList[i][1];
        dropDownList[i].classList += 'a';
        dropDownArea.appendChild(dropDownList[i]);
        dropDownList[i].onclick = function(event) {showTeamClash(teamClashList[i])};
    }
}

function showTeamClash(clash){
    if (event.ctrlKey){
        removeTeamClash(clash);
        return;
    }
    var teams = document.getElementsByClassName('team');
    for (let i = 0; i < teams.length; i++){

        if(teams[i].id == clash[0] || teams[i].id == clash[1]){
            teams[i].style.backgroundColor = '#8ea754';
        }
    }
    
    window.onclick = function(event) {
        if(event.target.innerHTML != getTeamClashName(clash) && event.target.id != 'team clash dropdown button'){
            for (let i = 0; i < teams.length; i++){
                teams[i].style.backgroundColor = startCourtColor;
            }
        }
    }
}

function arrayRemove(arr, value){
    for( var i = 0; i < arr.length; i++){                         
        if ( arr[i] === value) { 
            arr.splice(i, 1); 
            i--; 
        }
    }
}

function removeTeamClash(clash){
    arrayRemove(teamClashList, clash);
    updateTeamClashDropDown();
    justSaved = false;
}

function createTeamClashButton(){
    console.log("clicked")
    var teamNames = getTeamNameList();
    var dropDownArea = document.getElementById('load create team clash dropdown');
    removeAllChildren(dropDownArea);
    var dropDownList = [];
    for (let i = 0; i < teamNames.length; i++){
        dropDown = document.createElement('a');
        dropDownList.push(dropDown);
        dropDownList[i].id = "team clash dropdown button";
        dropDownList[i].innerHTML = teamNames[i];
        dropDownList[i].className = "a";
        dropDownArea.appendChild(dropDownList[i]);
        dropDownList[i].onclick = function() {nextTeamClashSelect(dropDownList[i].innerHTML, dropDownArea)};
    }
    dropDownArea.style.display = 'block';
    window.onclick = function(event) {
        if (!event.target.matches('.saveloadbutton') && !event.target.matches('a')) {
            dropDownArea.style.display = 'none';
        }
    }
}

function teamClashSelectComplete(first, second, dropDownArea){
    dropDownArea.style.display = 'none';
    removeAllChildren(dropDownArea);
    var thisClash = [first, second];
    teamClashList.push(thisClash);
    updateTeamClashDropDown();
    showTeamClash(thisClash);
    justSaved = false;
}

function nextTeamClashSelect(lastName, dropDownArea){
    removeAllChildren(dropDownArea);
    var teamNames = getTeamNameList();
    var dropDownList = [];
    for (let i = 0; i < teamNames.length; i++){
        dropDown = document.createElement('a');
        dropDownList.push(dropDown);
        dropDownList[i].id = "team clash dropdown button";
        dropDownList[i].innerHTML = teamNames[i];
        dropDownList[i].className = "a";
        if (teamNames[i] == lastName){
            dropDownList[i].style.backgroundColor = 'green';
        }
        dropDownArea.appendChild(dropDownList[i]);
        dropDownList[i].onclick = function() {teamClashSelectComplete(lastName, dropDownList[i].innerHTML, dropDownArea)};
    }
    window.onclick = function(event) {
        if (!event.target.matches('.saveloadbutton') && !event.target.matches('a')) {
            dropDownArea.style.display = 'none';
        }
    }
}
//------------------------------------------------------------------------------------------------
function getTimeNameList() {
    var times = document.getElementsByClassName('timeSlotGrid');
    var nameList = [];
    for (i = 0; i < times.length; i++){
        var name = times[i].parentElement.parentElement.firstChild.firstChild.innerHTML + ": " + times[i].firstChild.innerHTML;
        nameList.push(name);
    }
    nameList.sort();
    return nameList;
}


function updateTimeClashDropDown(){
    if (timeClashList == []){
        return;
    }
    var dropDownArea = document.getElementById('load time clash dropdown');
    removeAllChildren(dropDownArea);
    var dropDownList = [];
    for (let i = 0; i < timeClashList.length; i++){
        dropDown = document.createElement('a');
        dropDownList.push(dropDown);
        dropDownList[i].id = i;
        dropDownList[i].innerHTML = getTeamClashName(timeClashList[i]);
        dropDownList[i].classList += 'a';
        dropDownArea.appendChild(dropDownList[i]);
        dropDownList[i].onclick = function(event) {showTimeClash(timeClashList[i])};
    }
}

function getTeamClashName(clash){
    return clash[0] + " - " + clash[1];
}

function getTimeClashName(clash){
    return clash[0] + " - " + clash[1];
}

function showTimeClash(clash){
    if (event.ctrlKey){
        removeTimeClash(clash);
        return;
    }
    var times = document.getElementsByClassName('timeSlotGrid');
    for (let i = 0; i < times.length; i++){
        var completeSlotName = times[i].parentElement.parentElement.firstChild.firstChild.innerHTML + ": " + times[i].firstChild.innerHTML;
        if(completeSlotName == clash[0] || completeSlotName == clash[1]){
            times[i].firstChild.style.backgroundColor = '#8ea754';
        }
    }
    
    window.onclick = function(event) {
        if(event.target.innerHTML != getTimeClashName(clash) && event.target.id != 'time clash dropdown button'){
            for (let i = 0; i < times.length; i++){
                times[i].firstChild.style.backgroundColor = '#ffffff';
            }
        }
    }
}

function removeTimeClash(clash){
    arrayRemove(timeClashList, clash);
    updateTimeClashDropDown();
    justSaved = false;
}

function createTimeClashButton(){
    var timeNames = getTimeNameList();
    var dropDownArea = document.getElementById('load create time clash dropdown');
    removeAllChildren(dropDownArea);
    var dropDownList = [];
    for (let i = 0; i < timeNames.length; i++){
        dropDown = document.createElement('a');
        dropDownList.push(dropDown);
        dropDownList[i].id = "time clash dropdown button";
        dropDownList[i].innerHTML = timeNames[i];
        dropDownList[i].className = "a";
        dropDownArea.appendChild(dropDownList[i]);
        dropDownList[i].onclick = function() {nextTimeClashSelect(dropDownList[i].innerHTML, dropDownArea)};
    }
    dropDownArea.style.display = 'block';
    window.onclick = function(event) {
        if (!event.target.matches('.saveloadbutton') && !event.target.matches('a')) {
            dropDownArea.style.display = 'none';
        }
    }
}

function timeClashSelectComplete(first, second, dropDownArea){
    dropDownArea.style.display = 'none';
    removeAllChildren(dropDownArea);
    var thisClash = [first, second];
    timeClashList.push(thisClash);
    updateTimeClashDropDown();
    showTimeClash(thisClash);
    justSaved = false;
}

function nextTimeClashSelect(lastName, dropDownArea){

    removeAllChildren(dropDownArea);
    var timeNames = getTimeNameList();
    var dropDownList = [];
    for (let i = 0; i < timeNames.length; i++){
        dropDown = document.createElement('a');
        dropDownList.push(dropDown);
        dropDownList[i].id = "time clash dropdown button";
        dropDownList[i].innerHTML = timeNames[i];
        dropDownList[i].className = "a";
        if (timeNames[i] == lastName){
            dropDownList[i].style.backgroundColor = 'green';
        }
        dropDownArea.appendChild(dropDownList[i]);
        dropDownList[i].onclick = function() {timeClashSelectComplete(lastName, dropDownList[i].innerHTML, dropDownArea)};
    }
    window.onclick = function(event) {
        if (!event.target.matches('.saveloadbutton') && !event.target.matches('a')) {
            dropDownArea.style.display = 'none';
        }
    }
}

//-----------------------------------------------------------------------------

function setupMenu1Buttons() {
    document.getElementById("add training day").addEventListener ("click", createTrainingDay);
    document.getElementById("delete training day").addEventListener ("click", deleteTrainingDay);
    document.getElementById("set number courts").addEventListener ("click", setNumberCourts);
    document.getElementById("add team").addEventListener ("click", addTeam);
    document.getElementById("save button").addEventListener ("click", saveSchedule);
    document.getElementById("load button").addEventListener ("click", setupLoadSchedule);
    document.getElementById("done button").addEventListener ("click", scheduleDoneButton);
}

function setupMenu2Buttons(){
    document.getElementById("save2 button").onclick = function() {saveSchedulePlusClashes()};
    document.getElementById("load2 button").onclick = function() {setupLoad2Schedule()};
    document.getElementById("done2 button").onclick = function() {setupComplete()};
    // document.getElementById("team clash button").onclick = function() {teamClashButton()};
    document.getElementById("create team clash button").onclick = function() {createTeamClashButton()};
    document.getElementById("create time clash button").onclick = function() {createTimeClashButton()};
    updateTeamClashDropDown();
    updateTimeClashDropDown();
    removeTimeSlotButtons();
}

function setupMenu3Buttons(){
    console.log("settingUp");
    document.getElementById("lock button").onclick = function() {lockTeamPosition()};
    document.getElementById("unlock button").onclick = function() {unlockTeamPosition()};
}

function lockTeamPosition(){
    clickToLock = true;
}

function unlockTeamPosition(){
    clickToUnlock = true;
}

function updateDraggableProperty(team){
    if (clickToLock){
        team.draggable = false;
        clickToLock = false;
    }
    if (clickToUnlock){
        team.draggable = true;
        clickToUnlock = false
    }
}

function removeTimeSlotButtons(){
    var buttons1 = document.getElementsByClassName('timeSlotButton');
    var buttons2 = document.getElementsByClassName('deleteTimeSlotButton');
    for (let i = 0; i < buttons1.length; i++){
        buttons1[i].style.display = 'none';
        buttons2[i].style.display = 'none';
    }

}

function saveSchedulePlusClashes() {
    schedule = makeJSONSchedule();
    changeTeamIds();
    var inputField = document.createElement("INPUT");
    inputField.setAttribute("type", "text");
    inputField.setAttribute("value", "Save as:");
    var maxlength = 15;
    var button = document.getElementById("save2 button");
    button.replaceWith(inputField);
    inputField.addEventListener("keyup", function(event){
    
        if (event.key === "Enter"){
            if (inputField.value.length > maxlength) {
                inputField.value = inputField.value.substring(0, maxlength);
                return;
            }
            var scheduleName = inputField.value;
            inputField.replaceWith(button);
            localStorage.setItem(scheduleName, JSON.stringify(schedule));
        }
    });
    setupLoadSchedule();
    justSaved = true;
}

function changeTeamIds() {
    var teams = document.getElementsByClassName('team');
    for (let i = 0; i < teams.length; i++){
        teams[i].id = teams[i].innerHTML;
    }
}

function scheduleDoneButton(){
    var currentSchedule = makeJSONSchedule();
    document.getElementById("Menu").style.display = "none";
    document.getElementById("Menu2").style.display = "block";
    changeTeamIds();
    setupMenu2Buttons();
    setupLoad2Schedule()
}

function renameAllEmptyCourts(name) {
    var allCourts = document.getElementsByClassName('court');
    for (i = 0; i < allCourts.length; i++){
        allCourts[i].innerHTML = name;
    }
}

function makeJSONSchedule() {
    var dayNameList = [];
    var numberTimeslotPerDayList = [];
    var numberOfCourtsPerTimeslotList = [];
    var timeslotDescriptionList = [];
    var courtNamesList = [];
    var dayCounter = numberOfDays;
    var days = document.getElementsByClassName("divDay");
    for (let i = 0; i < days.length; i++){
        dayNameList.push(days[i].firstChild.firstChild.innerHTML);
        var timeslots = days[i].getElementsByClassName("timeslotDescription");
        numberTimeslotPerDayList.push(timeslots.length);
        for (let j = 0; j < timeslots.length; j++){
            var courts = timeslots[j].parentElement.children;
            timeslotDescriptionList.push(timeslots[j].innerHTML);
            numberOfCourtsPerTimeslotList.push(courts.length - 1);
            for (let k = 1; k < courts.length; k++){
                courtNamesList.push(courts[k].innerHTML);
            }
        }
    }
    const schedule = {
        "number of days": numberOfDays,
        "day names": dayNameList,
        "timeslots per day": numberTimeslotPerDayList,
        "timeslot descriptions": timeslotDescriptionList,
        "courts per timeslot": numberOfCourtsPerTimeslotList,
        "court names": courtNamesList,
        "team clashes": teamClashList,
        "timeslot clashes": timeClashList
    };
    return schedule;
}

function saveSchedule() {
    renameAllEmptyCourts('-');
    changeTeamIds();
    schedule = makeJSONSchedule();

    var inputField = document.createElement("INPUT");
    inputField.setAttribute("type", "text");
    inputField.setAttribute("value", "Save as:");
    var maxlength = 15;
    var button = document.getElementById("save button");
    button.replaceWith(inputField);
    inputField.addEventListener("keyup", function(event){
    
        if (event.key === "Enter"){
            if (inputField.value.length > maxlength) {
                inputField.value = inputField.value.substring(0, maxlength);
                
                return;
            }
            var scheduleName = inputField.value;
            inputField.replaceWith(button);
            localStorage.setItem(scheduleName, JSON.stringify(schedule));
        }
    });
    setupLoadSchedule();
    justSaved = true;
}

function deleteFromLocalStorage(str){
    localStorage.removeItem(str);
    setupLoadSchedule();
}

function loadSchedule(str) {
    if(event.ctrlKey){
        deleteFromLocalStorage(str);
        return;
    }
    
    var schedule = JSON.parse(localStorage.getItem(str));
    removeAllChildren(document.getElementById('grid'));
    numberOfDays = 0;
    var timeslot = 0;
    for (let i = 0; i < schedule["number of days"]; i++){
        createTrainingDay();
    }

    var days = document.getElementsByClassName('divDay');
    for (let i = 0; i < days.length; i++) {
        days[i].firstChild.firstChild.innerHTML = schedule["day names"][i];
        for (let j = 0; j < schedule["timeslots per day"][i]; j++){
            numberOfCourts = schedule["courts per timeslot"][timeslot];
            timeslot++
            addTimeSlot(days[i]);
        }
    }
    
    var timeslotCounter = 0;
    var courtNamesCounter = 0;
    var timeslots = document.getElementsByClassName('timeSlotGrid');
    for (let i = 0; i < timeslots.length; i++){
        children = timeslots[i].children;
        children[0].innerHTML = schedule["timeslot descriptions"][timeslotCounter];
        timeslotCounter++;
        if (children.length >= 1){
            for (let j = 1; j < children.length; j++){
                if (schedule["court names"][courtNamesCounter] != "-"){
                    children[j].className = 'team';
                }
                children[j].innerHTML = schedule["court names"][courtNamesCounter];
                courtNamesCounter++;
            }
        }
    }
    teamClashList = schedule["team clashes"];
    if (!teamClashList){
        teamClashList = [];
    }
    timeClashList = schedule["timeslot clashes"];
    if (!timeClashList){
        timeClashList = [];
    }
    updateTeamClashDropDown();
    updateTimeClashDropDown();
    if(document.getElementById('Menu2').style.display != 'none'){
        removeTimeSlotButtons();
    }
    justSaved = true;
}

function removeAllChildren(parent){
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function setupLoad2Schedule() {
    var scheduleNameList = [];
    for (let i = 0, len = localStorage.length; i < len; ++i ) {
        scheduleNameList.push(  localStorage.key( i ) );
    }
    scheduleNameList.sort();
    removeAllChildren(document.getElementById('load2-dropdown'));
    for (let i = 0; i < localStorage.length; i++){ 
        //localStorage.removeItem(localStorage.key( i ));
        var droppingDown = document.createElement('a')
        droppingDown.className = 'a';
        droppingDown.innerHTML = scheduleNameList[i];
        droppingDown.id = droppingDown.innerHTML;
        droppingDown.onclick = function(event) {loadSchedule(scheduleNameList[i])};
        document.getElementById('load2-dropdown').appendChild(droppingDown);
    }
}

function setupLoadSchedule() {
    var scheduleNameList = [];
    for (let i = 0, len = localStorage.length; i < len; ++i ) {
        scheduleNameList.push(  localStorage.key( i ) );
    }
    scheduleNameList.sort();
    removeAllChildren(document.getElementById('load-dropdown'));
    for (let i = 0; i < localStorage.length; i++){ 
        //localStorage.removeItem(localStorage.key( i ));
        var droppingDown = document.createElement('a')
        droppingDown.className = 'a';
        droppingDown.innerHTML = scheduleNameList[i];
        droppingDown.id = droppingDown.innerHTML;
        droppingDown.onclick = function(event) {loadSchedule(scheduleNameList[i])};
        document.getElementById('load-dropdown').appendChild(droppingDown);
    }
}

function addTeam() {
    
    var inputField = document.createElement("INPUT");
    inputField.setAttribute("type", "text");
    inputField.setAttribute("value", "Team name");
    document.getElementById("Menu").appendChild(inputField)
    var maxlength = 15;
    var button = document.getElementById("add team");
    button.replaceWith(inputField);
    inputField.addEventListener("keyup", function(event){
    
        if (event.key === "Enter"){
            if (inputField.value.length > maxlength) {
                inputField.value = inputField.value.substring(0, maxlength);
                return;
            }
            var teamName = inputField.value;
            
            var inputField2 = document.createElement("INPUT");
            inputField2.setAttribute("type", "text");
            inputField2.setAttribute("value", "Number of Practices");
            var maxlength = 1;
            inputField.replaceWith(inputField2);
            inputField2.addEventListener("keyup", function(event){
                if (event.key === "Enter"){
                    if (inputField2.value.length > maxlength) {
                        inputField2.value = 2;
                        return;
                    }
                    var numberOfPractices = parseInt(inputField2.value);
                    inputField2.replaceWith(button);
                    for (let i = 0; i < numberOfPractices; i++) {
                        var cell = document.getElementsByClassName('court');
                        if (cell[0]){
                            cell[0].innerHTML = teamName;
                            cell[0].className = 'team';
                        }
                    }
                    justSaved = false;
                }
            });
        } 
    });    
}

function setNumberCourts() {
    var inputField = document.createElement("INPUT");
    inputField.setAttribute("type", "text");
    inputField.setAttribute("value", numberOfCourts);
    document.getElementById("Menu").appendChild(inputField)
    var maxlength = 1;
    inputField.addEventListener("keyup", function(event){
        if (event.key === "Enter"){
            if (inputField.value.length > maxlength) {
                inputField.value = numberOfCourts
                return
            }
            numberOfCourts = parseInt(inputField.value);
            inputField.remove();
        }
    });
}

function windowResize() {
    numberOfCols = Math.max(1, Math.floor(document.getElementById('grid').offsetWidth/410));
    numberOfRows = Math.ceil(numberOfDays/numberOfCols);

    const width = "400px ";
    const auto = "auto "
    document.getElementById("grid").style.gridTemplateColumns = width.repeat(numberOfCols);
    document.getElementById("grid").style.gridTemplateRows = auto.repeat(numberOfRows);
}

function addTimeSlot(day){
    var newTimeSlot = document.createElement("divTimeSlot");
    newTimeSlot.className = "timeSlotGrid";

    var description = document.createElement("description");
    description.className = "timeslotDescription";
    description.innerHTML = "Time...";
    description.addEventListener('click', function(){editDayDescription(description)});
    newTimeSlot.appendChild(description);
    var courts = [];
    for (let i = 0; i < numberOfCourts; i++){
        courtNumber++;
        var id = "court_" + i;
        courts[i] = document.createElement(id);
        courts[i].className = "court";
        courts[i].draggable = true;
        courts[i].addEventListener('dragend', function(){endDrag(courts[i])});
        courts[i].addEventListener('dragenter', function(){dragEnter(courts[i])});
        courts[i].addEventListener('dragleave', function(){dragLeave(courts[i])});
        courts[i].addEventListener('mouseenter', function(){mouseEnter(courts[i])});
        courts[i].addEventListener('mouseleave', function(){mouseLeave(courts[i])});
        courts[i].addEventListener('click', function(){updateDraggableProperty(courts[i])});
        newTimeSlot.appendChild(courts[i]);
        courts[i].innerHTML = courtNumber;
    }

    day.lastChild.appendChild(newTimeSlot);
    
    resizeTimeSlot(newTimeSlot);
    justSaved = false;
}

function swapNodes(n1, n2) {

    var p1 = n1.parentNode;
    var p2 = n2.parentNode;
    var i1, i2;

    if ( !p1 || !p2 || p1.isEqualNode(n2) || p2.isEqualNode(n1) ) return;

    for (var i = 0; i < p1.children.length; i++) {
        if (p1.children[i].isEqualNode(n1)) {
            i1 = i;
        }
    }
    for (var i = 0; i < p2.children.length; i++) {
        if (p2.children[i].isEqualNode(n2)) {
            i2 = i;
        }
    }

    if ( p1.isEqualNode(p2) && i1 < i2 ) {
        i2++;
    }
    p1.insertBefore(n2, p1.children[i1]);
    p2.insertBefore(n1, p2.children[i2]);
}

function endDrag(ele) {
    if (draggingOver){
        swapNodes(ele, draggingOver);
        if(ele != draggingOver){
            justSaved = false;
        }
        draggingOver = null;
    }
}

function dragEnter(ele) {
    if (ele.draggable){
        ele.style.backgroundColor = 'red';
        draggingOver = ele;
    }
    
}

function dragLeave(ele) {
    ele.style.backgroundColor = startCourtColor;
}

function mouseEnter(ele) {
    ele.style.backgroundColor = 'rgb(255, 255, 177)';
}

function mouseLeave(ele) {
    ele.style.backgroundColor = startCourtColor;
}

function resizeTimeSlot(slot) {
    var width = (400 - 10*(numberOfCourts + 2)) / (numberOfCourts + 1) ;
    var string1 = "repeat( auto-fill, minmax(";
    var string2 = Math.floor(width).toString();
    var string3 = "px, 1fr) )";
    var fullstring = string1 + string2 + string3;

    slot.style.gridTemplateColumns = fullstring;
}

function deleteTimeSlot(day){
    if (day.lastChild.lastChild){
    day.lastChild.lastChild.remove()
    }
    justSaved = false;
}

function makeHeader(day){
    var header = document.createElement("header");
    header.className = "dayHeader";
    
    var description = document.createElement("description");
    description.className = "dayDescription";
    description.innerHTML = "Day";
    description.addEventListener('click', function(){editDayDescription(description)});
    
    var newTimeSlotButton = document.createElement("divTimeSlotButton");
    newTimeSlotButton.className = "timeSlotButton";
    newTimeSlotButton.innerHTML = "+ slot"
    newTimeSlotButton.onclick = function() {addTimeSlot(day)}

    var deleteTimeSlotButton = document.createElement("divDeleteTimeSlotButton");
    deleteTimeSlotButton.className = "deleteTimeSlotButton";
    deleteTimeSlotButton.innerHTML = "- slot"
    deleteTimeSlotButton.onclick = function() {deleteTimeSlot(day)}

    header.appendChild(description);
    header.appendChild(newTimeSlotButton);
    header.appendChild(deleteTimeSlotButton);

    day.appendChild(header);
}

function makeGrid(day){
    var dayGrid = document.createElement("dayGrid");
    dayGrid.id = "dayGrid";
    dayGrid.className = "dayGrid";

    day.appendChild(dayGrid);
}

function createTrainingDay() {
    numberOfDays++;
    var newDay = document.createElement("div");
    newDay.className = "divDay";
    
    makeHeader(newDay);
    makeGrid(newDay);

    document.getElementById("grid").appendChild(newDay);

    windowResize();
    justSaved = false;
}

function editDayDescription(description) {

    var inputField = document.createElement("INPUT");
    inputField.setAttribute("type", "text");
    inputField.setAttribute("value", description.innerHTML);
    description.replaceWith(inputField);
    var maxlength = 15;
    inputField.addEventListener("keyup", function(event){
        if (event.key === "Enter"){
            if (inputField.value.length > maxlength) {
                inputField.value = inputField.value.substring(0, maxlength);
            }
            description.innerHTML = inputField.value;
            inputField.replaceWith(description);
            justSaved = false;
        }
    });
    


}

function deleteTrainingDay() {
    numberOfDays--;
    if (document.getElementById("grid").lastChild){
        document.getElementById("grid").lastChild.remove();
    }
    windowResize();
    justSaved = false;
}

</script>

<style>

    .grid-container {
    background-color: gray;
    margin: 0;
    padding: 15px 10px;
    list-style: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    display: grid;
    grid-gap: 5px;
    grid-template-columns: auto;
    /*   grid-template-columns: repeat(auto-fit, minmax(300px, 300px));
    grid-template-rows: repeat(5, 200px); */
    grid-auto-flow: row dense;
    min-height: 500px;
    }

    
    .layout {
    color: rgb(0, 0, 0);
    margin-bottom: 15px;
    }

    .label {
        margin-right: 15px;
        cursor: pointer;
    }

    .inside {
      background-color: #8ea754;
    }
    
    .divDay {
        cursor: move;
        padding: 10px 10px;
        font-size: 10px;
        background-color: #e0e0e0;
        min-height: 200px;
    }
    
    .dayHeader {
        display: grid;
        grid-gap: 5px;
        grid-template-columns: repeat( auto-fill, minmax(100px, 1fr) );
        grid-template-rows: 30px;
        grid-auto-flow: row dense;
    }

    .timeSlotGrid {
        display: grid;
        grid-gap: 5px;
        grid-template-columns: repeat( auto-fill, minmax(20px, 1fr) );
        grid-template-rows: 40px;
        grid-auto-flow: row dense;
    }

    .dayGrid {
        display: grid;
        padding: 10px 0px;
        grid-gap: 5px;
        grid-template-columns: auto;
        grid-template-rows: auto;
        grid-auto-flow: row dense;
    }
    
    .dayDescription {
        background-color: #ffffff; /* Green */
        border-radius: 5px;
        color: rgb(0, 0, 0);
        padding: 5px 10px;
        width: fill;
        max-height: 100%;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
    }
    .timeslotDescription {
        background-color: #ffffff; /* Green */
        border-radius: 5px;
        color: rgb(0, 0, 0);
        padding: 5px 10px;
        width: fill;
        max-height: 100%;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
    }
    .timeSlotButton {
        background-color: white; /* Green */
        border: 4px solid #4CAF50;
        color: rgb(0, 0, 0);
        padding: 3px 3px;
        width: fill;
        max-height: 100%;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
    }
    .timeSlotButton:hover {
        background-color: #4CAF50;
    }
    .deleteTimeSlotButton {
        background-color: white; /* Green */
        border: 4px solid red;
        color: rgb(0, 0, 0);
        padding: 3px 3px;
        width: fill;
        max-height: 100%;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
    }
    .deleteTimeSlotButton:hover{
        background-color: red;
    }

    .button {
        background-color: white; /* Green */
        border: 4px solid #4CAF50;
        border-radius: 6px;
        color: #000000;
        margin: 3px 3px;
        padding: 15px 32px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
    }
    .button:hover{
        background-color: #4CAF50;
    }
    .court {
        background-color: #c5c5c5; /* Green */
        border: red;
        color: rgb(0, 0, 0);
        padding: 5px 10px;
        width: fill;
        max-height: 100%;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
    }
    .court:hover {
        background-color: rgb(255, 255, 177);
    }
    .team {
        background-color: #c5c5c5; /* Green */
        border: red;
        color: rgb(0, 0, 0);
        padding: 10px 0px;
        width: fill;
        max-height: 100%;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
    }
    .team:hover {
        background-color: rgb(255, 255, 177);
    }   
    

    .saveLoadButton:hover{
        background-color: #4CAF50;
    }
    .saveLoadButton {
    background-color: #04AA6D;
    color: white;
    padding: 16px;
    font-size: 16px;
    border: none;
    }
    /* The container <div> - needed to position the dropdown content */
    .dropdownclick {
    position: relative;
    display: inline-block;
    }

    /* Dropdown Content (Hidden by Default) */
    .dropdownclick-content {
    display: none;
    position: absolute;
    background-color: #f1f1f1;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
    }

    /* Links inside the dropdown */
    .dropdownclick-content a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    }

    /* Change color of dropdown links on hover */
    .dropdownclick-content a:hover {background-color: rgb(219, 240, 195);}

    /* Change the background color of the dropdown button when the dropdown content is shown */
    .dropdownclick:hover .saveLoadButton {background-color: #3e8e41;}



    /* The container <div> - needed to position the dropdown content */
    .dropdown {
    position: relative;
    display: inline-block;
    }

    /* Dropdown Content (Hidden by Default) */
    .dropdown-content {
    display: none;
    position: absolute;
    background-color: #f1f1f1;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
    }

    /* Links inside the dropdown */
    .dropdown-content a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    }

    /* Change color of dropdown links on hover */
    .dropdown-content a:hover {background-color: rgb(219, 240, 195);}

    /* Show the dropdown menu on hover */
    .dropdown:hover .dropdown-content {display: block;}

    /* Change the background color of the dropdown button when the dropdown content is shown */
    .dropdown:hover .saveLoadButton {background-color: #3e8e41;}
    
    </style>
    
