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
dragElement(document.getElementById('page-home'))

function dragElement(element) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0
    console.log(element.id);
    document.getElementById(`${element.id}-header`).onmousedown = dragMouseDown

    function dragMouseDown(e) {
        console.log(e)
        e.preventDefault()
        pos3 = e.clientX // get mouse position
        pos4 = e.clientY
        document.onmouseup = () => { // stop moving if the mouse is released
            document.onmouseup = null
            document.onmousemove = null
        }
        document.onmousemove = (e) => { // function is called when mouse is moved
            e.preventDefault()
            pos1 = pos3 - e.clientX // caculate mouse position / offset before moving the element
            pos2 = pos4 - e.clientY
            pos3 = e.clientX
            pos4 = e.clientY
            if (element.offsetTop - pos2 >= 0 && element.offsetTop - pos2 <= (document.body.clientHeight - 95) && element.offsetLeft - pos1 >= 0 && element.offsetLeft - pos1 <= (document.body.clientWidth - element.clientWidth)) {
                element.style.top = (element.offsetTop - pos2) + "px"
                element.style.left = (element.offsetLeft - pos1) + "px"
            }
        }
    }
}