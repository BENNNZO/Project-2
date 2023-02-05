function generateTaskbar() {
    let date = new Date()
    document.getElementById('taskbar-middle').style.width = `${document.body.clientWidth - 20}px`
    document.getElementById('taskbar-icons').style.width = `${document.body.clientWidth - 20}px`
    document.getElementById('time').innerHTML = `${Math.abs(new Date().getHours() - 12)}:${new Date().getMinutes()}`
}


let startButton = document.getElementById('start-button'),
    shortcutProfile = document.getElementById('shortcut-profile'),
    shortcutHome = document.getElementById('shortcut--home')
startButton.addEventListener('click', e => { // start button click even listener
    if (startButton.getAttribute('src') === '../../ui/task_bar/start/index.png') {
        startButton.setAttribute('src', '../../ui/task_bar/start/pressed.png')
    } else {
        startButton.setAttribute('src', '../../ui/task_bar/start/index.png')
    }
})

function openProfile() {
    console.log('lololo');
}



generateTaskbar()

dragElement(document.getElementById('page-profile'))

function dragElement(element) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0
    document.getElementById('page-header').onmousedown = dragMouseDown

    function dragMouseDown(e) {
        console.log(e)
        e.preventDefault()
        // get the mouse cursor position at startup:
        pos3 = e.clientX
        pos4 = e.clientY
        document.onmouseup = closeDragElement
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag
    }

    function elementDrag(e) {
        console.log(e)
        e.preventDefault()
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX
        pos2 = pos4 - e.clientY
        pos3 = e.clientX
        pos4 = e.clientY
        // set the element's new position:
        console.log(element.offsetTop);
        if (element.offsetTop - pos2 >= 0 && element.offsetTop - pos2 <= (document.body.clientHeight - 95) && element.offsetLeft - pos1 >= 0 && element.offsetLeft - pos1 <= (document.body.clientWidth - 100)) {
            element.style.top = (element.offsetTop - pos2) + "px"
            element.style.left = (element.offsetLeft - pos1) + "px"
        }
    }

    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null
        document.onmousemove = null
    }
}