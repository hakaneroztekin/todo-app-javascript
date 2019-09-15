// remove icon in SVG format
let removeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><g><g><path class="fill" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6L16.3,18.7L16.3,18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2c0.6,0,1.1,0.5,1.1,1.1V7z"/></g><g><g><path class="fill" d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"/></g><g><path class="fill" d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8C7.4,10.2,7.7,10,8,10c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z"/></g><g><path class="fill" d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C14.6,17.7,14.3,18,14,18z"/></g></g></g></svg>\n';

// complete icon in SVG format
let completeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect y="0" class="noFill" width="22" height="22"/><g><path class="fill" d="M9.7,14.4L9.7,14.4c-0.2,0-0.4-0.1-0.5-0.2l-2.7-2.7c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0l2.1,2.1l4.8-4.8c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.3,5.3C10.1,14.3,9.9,14.4,9.7,14.4z"/></g></svg>            </button>\n';

// user clicks on the add button
document.getElementById('add').addEventListener('click', function () {
    addItemToDoList(document.getElementById('item'))
});

document.getElementById('item').addEventListener('keydown', function (event) {
    if(event.code === 'Enter') {
        addItemToDoList(this);
    }
});

function addItemToDoList(item) {
    if(item.value) {
        addItemToDOM(item.value, 'todo', false);
        sendItemToAPI(item.value);
        item.value = ''; // clear the input field
    }
}

// store data
function dataObjectUpdated() {
    // we convert data object to JSON string to store it
    // we need it because we can't directly store an object with the method
    // todo refactor to API
}

// remove item
function removeItem() {
    let listItem = this.parentNode.parentNode; // "listItem" is the parent of "buttons", which is the parent of "remove" button
    let list = listItem.parentNode; // to do list
    // todo refactor to API (change item states)
    list.removeChild(listItem);
    dataObjectUpdated();
}

// complete item
function completeItem() {
    let listItem = this.parentNode.parentNode; // "listItem" is the parent of "buttons", which is the parent of "remove" button
    let parentList = listItem.parentNode; // "listItem" is the parent of "buttons", which is the parent of "remove" button
    let toDoList = document.getElementById('todo');
    let completedList = document.getElementById('completed');

    if(parentList === toDoList) {
        // item to be completed
        // todo execute todoList changes on API
        toDoList.removeChild(listItem);

        completedList.insertBefore(listItem, completedList.childNodes[0]);

    } else if (parentList === completedList) {
        // item is completed
        // todo execute completedList changes on API
        completedList.removeChild(listItem);

        toDoList.insertBefore(listItem, toDoList.childNodes[0]);
    }
    dataObjectUpdated();
}

// add new item to the to do list
function addItemToDOM(text, listName, loadingFromStorage) {
    let list = document.getElementById(listName);

    // <li>
    let listItem = document.createElement('li');
    listItem.textContent = text;

    // <div class="buttons">
    let buttons = document.createElement('div');
    buttons.classList.add('buttons');

    // <button class="remove">
    let remove = document.createElement('button');
    remove.classList.add('remove');
    remove.innerHTML = removeSVG;

    // Add click event for removing item
    remove.addEventListener('click', removeItem);

    // <button class="complete">
    let complete = document.createElement('button');
    complete.classList.add('complete');
    complete.innerHTML = completeSVG;

    // Add click event for completing list items
    complete.addEventListener('click', completeItem);

    // relate variables with each other
    list.insertBefore(listItem, list.childNodes[0]);
    listItem.appendChild(buttons);
    buttons.appendChild(remove);
    buttons.appendChild(complete);
    dataObjectUpdated();
}

/**
 * Method for sending to-do item to API
 */
function sendItemToAPI(value) {
    executeHTTPRequest(value, 'POST', '/add');
}

function executeHTTPRequest(value, request, endpoint) {
    if(request === 'POST') {
        post(value, endpoint);
    }
}

function post(value, endpoint) {
    let request = new XMLHttpRequest();
    let valueJSON = JSON.stringify({description: value});
    console.log('POST ' + value + " to " + endpoint);
    console.log(valueJSON);

    // Configure the request: POST method to the endpoint
    request.open('POST', endpoint);

    // Let API know it's JSON data
    request.setRequestHeader('Content-Type', 'application/json');

    // Send the request
    request.send(valueJSON);

    request.addEventListener('load', () => {
        console.log('Response received');
        console.log(request.response);
    });

    request.addEventListener('error', (e) => {
        console.log('Error occurred.');
        console.log(e);
    });
}