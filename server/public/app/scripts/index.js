/* ----------------------------- INNIT FUNCTION ----------------------------- */
function init() {
    profileFetch()
    homeFetch()
    generateTaskbar()
    dragElement(document.getElementById('page-profile'))
    dragElement(document.getElementById('page-home'))
    dragElement(document.getElementById('edit-profile'))
    dragElement(document.getElementById('add-post'))
    initInteractJS()
    initEventListeners()
    setInterval(() => {
        homeFetch()
    }, 500);
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
    /* ------------------------------ START BUTTON ------------------------------ */
    document.getElementById('start-button').addEventListener('click', e => { // start button click even listener
        if (document.getElementById('start-button').getAttribute('src') === '../../ui/task_bar/start/index.png') {
            document.getElementById('start-button').setAttribute('src', '../../ui/task_bar/start/pressed.png')
            document.getElementById('start-container').classList.toggle('hide')
        } else {
            document.getElementById('start-button').setAttribute('src', '../../ui/task_bar/start/index.png')
            document.getElementById('start-container').classList.toggle('hide')
        }
    })

    /* ------------------------------- EDIT BUTTON ------------------------------ */
    document.getElementById('edit-button').addEventListener('click', e => {
        document.getElementById('edit-profile').classList.remove('hide')
    })

    /* ----------------------------- NEW POST BUTTON ---------------------------- */
    document.getElementById('post-button').addEventListener('click', e => {
        document.getElementById('add-post').classList.remove('hide')
    })

    /* --------------------------- SUBMIT PROFILE EDIT -------------------------- */
    document.getElementById('submit-profile-edit').addEventListener('click', e => {
        if (document.getElementById('edit-profile-name').value != '') { // update profile name if exists
            fetch(`/update/${getCookie('user_id')}`, {
                method: 'PUT',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ name: document.getElementById('edit-profile-name').value })
            })
            .then(res => {
                document.getElementById('profile-name').innerHTML = decodeURI(getCookie('username')).toUpperCase()
                res.json(res)
            })
            .catch(err => {
                console.log(err);
            })
        }
        if (document.getElementById('edit-profile-bio').value != '') { // update profile bio if exists
            fetch(`/update/${getCookie('user_id')}`, {
                method: 'PUT',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ bio: document.getElementById('edit-profile-bio').value })
            })
            .then(data => {
                document.getElementById('profile-bio').innerHTML = decodeURI(getCookie('bio'))
                res.json(data)
            })
            .catch(err => {
                console.log(err);
            })

        }
    })

    /* ------------------------------ LOGOUT BUTTON ----------------------------- */
    document.getElementById('logout-button').addEventListener('click', e => {
        document.cookie = '' 
        window.location.href = "/login";
    })

    /* ------------------------- SUBMIT NEW POST BUTTON ------------------------- */
    document.getElementById('submit-new-post').addEventListener('click', e => {
        fetch('/comment', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                comment: document.getElementById('post-content').value,
                user_id: getCookie('user_id')
            })
        })
        .then(data => {
            homeFetch()
            profileFetch()
            res.json(data)
        })
        .catch(err => {
            console.log(err);
        })
    })
}

function closeWindow(task, window, selector) {
    task.classList.add('hide')
    window.classList.add('hide')
    task.children[0].setAttribute('src', `../../ui/task_bar/tasks/${selector}/index.png`)
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

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function profileFetch() {
    document.getElementById('profile-name').innerHTML = decodeURI(getCookie('username')).toUpperCase()
    document.getElementById('profile-bio').innerHTML = decodeURI(getCookie('bio'))
    fetch(`/users/${getCookie('user_id')}`)
    .then(data => data.json())
    .then(data => {
        document.getElementById('profile-posts').innerHTML = ''
        data.comments.forEach(e => {
            document.getElementById('profile-posts').innerHTML = `
                ${document.getElementById('profile-posts').innerHTML}
                <div class="post">
                    <p class="text">${e.comment}</p>
                    <p class="data">${new Date(e.createdAt).getMonth()}/${new Date(e.createdAt).getDay()}/${new Date(e.createdAt).getFullYear()}</p>
                </div>
            `
        });
    })
    .catch(err => console.log(err))
    document.getElementById('page-profile').style.width = '500px'
}

function homeFetch() {
    fetch('/comment')
    .then(data => data.json())
    .then(data => {
        document.getElementById('home-profile-posts').innerHTML = ''
        data.forEach(e => {
            document.getElementById('home-profile-posts').innerHTML = `
                ${document.getElementById('home-profile-posts').innerHTML}
                <div class="post" style="margin: 5px">
                    <p class="data">${e.user.name.toUpperCase()}</p>
                    <p class="text">${e.comment}</p>
                    <p class="data">${new Date(e.createdAt).getMonth()}/${new Date(e.createdAt).getDay()}/${new Date(e.createdAt).getFullYear()}</p>
                </div>
            `
        });
        console.log(data);
    })
} 

/* ---------------------------------- INNIT --------------------------------- */
init()