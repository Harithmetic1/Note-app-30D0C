var listArr = [];
var inputDOM = document.querySelector('#user');
var button = document.querySelector('#add');
var lists = document.querySelector('#userText');
var lis;
var text;
var arrPos;
var update;
button.addEventListener('click', function(e){
	e.preventDefault();
	listArr.push(inputDOM.value);
	inputDOM.value = "";
	populateList();
})

// listen to li clicks
lists.addEventListener('click', checkClick);

function populateList() {
	lists.innerHTML = listArr.map(item => {
		return `
				<div class="item">${item}</div><div class="delete">x</div>
			`
	}).join('');
	lis = Array.from(document.querySelectorAll('div#show p'));
}

function checkClick (e) {
	if (e.target.className == 'item') {
		updateItem(e);
		populateList();
	} else if(e.target.className == 'delete') {
		deleteItem(e);
		populateList();
	}
}

function deleteItem (e) {
	text = e.target.parentNode.childNodes[1].innerHTML;
	arrPos = listArr.indexOf(text);
	listArr.splice(arrPos,1);
}

function updateItem (e) {
	update = prompt("Update Item", "enter new value");
	text = e.target.parentNode.childNodes[1].innerHTML;
	arrPos = listArr.indexOf(text);
	listArr[arrPos] = update;
}

function check_web_storage_support() {
    if(typeof(Storage) !== "undefined") {
        return(true);
    }
    else {
        alert("Web storage unsupported!");
        return(false);
    }
}
function display_saved_note() {
    if(check_web_storage_support() == true) {
        result = localStorage.getItem('userText');
    }
    if(result === null) {
        result = "No note saved";
    }
    document.getElementById('userText').value = result;
}
function save() {
    if(check_web_storage_support() == true) {
        var area = document.getElementById("userText");
        if(area.value != '') {
            localStorage.setItem("userText", area.value);
        }
        else {
            alert("Nothing to save");
        }
    }
    console.log(area.value)
}

window.onload = display_saved_note, check_web_storage_support;
   
