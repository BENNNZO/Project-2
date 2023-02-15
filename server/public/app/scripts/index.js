/* ----------------------------- INNIT FUNCTION ----------------------------- */
function init() {
    // if (getCookie('logged_in') === '1') {
        profileFetch()
        generateTaskbar()
        dragElement(document.getElementById('page-profile'))
        dragElement(document.getElementById('page-home'))
        initInteractJS()
        initEventListeners()
    // } else {

    // }
}

/* -------------------------- DRAG ELEMENT FUNCTION ------------------------- */
function dragElement(element) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0
    document.getElementById(`${element.id}-header`).onmousedown = (e) => {
        console.log(e)
        e.preventDefault()
        pos3 = e.clientX // get mouse position
        pos4 = e.clientY
        document.onmouseup = () => { // stop moving if the mouse is released
            document.onmouseup = null
            document.onmousemove = null
            element.style.zIndex = 1
        }
        document.onmousemove = (e) => { // function is called when mouse is moved
            e.preventDefault()
            pos1 = pos3 - e.clientX // caculate mouse position / offset before moving the element
            pos2 = pos4 - e.clientY
            pos3 = e.clientX
            pos4 = e.clientY
            element.style.top = `${Math.max(0, Math.min(element.getBoundingClientRect().top - pos2, document.body.clientHeight - 95))}px`
            element.style.left = `${Math.max(0, Math.min(element.getBoundingClientRect().left - pos1, document.body.clientWidth - element.clientWidth))}px`
        }
    }
}

/* ----------------------- RESIZEABLE WINDOW FUNCTION ----------------------- */
function initInteractJS() {
    interact('.resizable').resizable({
        edges: { top: false, left: false, bottom: true, right: true },
        margin: 10,
        listeners: {
            move: function (event) {
                let { x, y } = event.target.dataset
    
                x = (parseFloat(x) || 0) + event.deltaRect.left
                y = (parseFloat(y) || 0) + event.deltaRect.top
    
                Object.assign(event.target.style, {
                    width: `${event.rect.width}px`,
                    height: `${event.rect.height}px`,
                    // transform: `translate(${x}px, ${y}px)`
                })
    
                Object.assign(event.target.dataset, { x, y })
            }
        }
    })
}


/* --------------------- MISC / FUNCTIONALITY FUNCTIONS --------------------- */
function taskClick(e, selector) {
    e.classList.remove('hide')
    document.getElementById(selector).classList.toggle('hide')
    console.log(document.getElementById(selector).children);
    console.log(e.children[0].getAttribute('src'));
    if (e.children[0].getAttribute('src') === `../../ui/task_bar/tasks/${selector.replace('page-', '')}/index.png`) {
        e.children[0].setAttribute('src', `../../ui/task_bar/tasks/${selector.replace('page-', '')}/pressed.png`)
    } else {
        e.children[0].setAttribute('src', `../../ui/task_bar/tasks/${selector.replace('page-', '')}/index.png`)
    }
}

function generateTaskbar() {
    document.getElementById('taskbar-middle').style.width = `${document.body.clientWidth - 20}px`
    document.getElementById('taskbar-icons').style.width = `${document.body.clientWidth - 20}px`
    document.getElementById('time').innerHTML = `${Math.abs((new Date().getHours() !== 12) ? new Date().getHours() - 12 : new Date().getHours())}:${(new Date().getMinutes() < 10) ? '0' + new Date().getMinutes() : new Date().getMinutes()}`
    setInterval(() => {
        document.getElementById('time').innerHTML = `${Math.abs((new Date().getHours() !== 12) ? new Date().getHours() - 12 : new Date().getHours())}:${(new Date().getMinutes() < 10) ? '0' + new Date().getMinutes() : new Date().getMinutes()}`
        console.log('Updated Time');
    }, 5000);
}

function initEventListeners() {
    document.getElementById('start-button').addEventListener('click', e => { // start button click even listener
        if (document.getElementById('start-button').getAttribute('src') === '../../ui/task_bar/start/index.png') {
            document.getElementById('start-button').setAttribute('src', '../../ui/task_bar/start/pressed.png')
            document.getElementById('start-container').classList.toggle('hide')
        } else {
            document.getElementById('start-button').setAttribute('src', '../../ui/task_bar/start/index.png')
            document.getElementById('start-container').classList.toggle('hide')
        }
    })
    document.getElementById('edit-button').addEventListener('click', e => {

    })
    document.getElementById('logout-button').addEventListener('click', e => {
        
    })
}

function closeWindow(task, window) {
    task.classList.add('hide')
    window.classList.add('hide')
}

function fullscreenWindow(e) {
    if (e.style.width === '100vw' && e.style.height === 'calc(100vh - 65px)') {
        e.style.width = '500px'
        e.style.height = '600px'
    } else {
        e.style.top = 0
        e.style.left = 0
        e.style.width = '100vw'
        e.style.height = 'calc(100vh - 65px)'
    }
}

/* ------------------------------- FETCH CALLS ------------------------------ */
function profileFetch() {
    document.getElementById('profile-name').innerHTML = getCookie('username').toUpperCase()
}

/* ---------------------------------- MISC ---------------------------------- */
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

/* ---------------------------------- INNIT --------------------------------- */
init()