const inputBox = document.getElementById("input-box")
const listContainer = document.getElementById("list-container")
const addTask = () => {
    if(inputBox.value === '') {
        alert('ban can nhap vao gi do')
    }
    else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value ;
        listContainer.appendChild(li);
        //them dau x vao cuoi 
        let span = document.createElement('span');
        span.innerHTML = "\u00d7"
        li.appendChild(span)
    }
    // reset form input
    inputBox.value = '';
    saveData()
}
// them even click cho listContainer
listContainer.addEventListener('click', function(e) {
    // neu la the li thi them class checked vao 
    //(toggle: neu da co phan tu co class la checked thi xoa chua co thi them moi)
    if(e.target.tagName === "LI") {
        e.target.classList.toggle('checked')
        saveData()
    }
    // neu click vao li thi xoa parentElement (phan tu cha truc tiep)
    else if(e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData()
    }
}, false)
// luu data vao localStorage
const saveData = () => {
    localStorage.setItem('data', listContainer.innerHTML);
}
// chen data tu localStore len 
const showTask =() => {
    listContainer.innerHTML = localStorage.getItem('data')
}
showTask()
