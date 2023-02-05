function generateTaskbar() {
    let width = document.body.clientWidth
    const d = new Date()
    let timeM = d.getMinutes()
    let timeH = d.getHours()
    console.log(timeH, timeM);
    timeM = 8
    if (timeM < 10) {
        timeM = `0${timeM}`
    }
    document.getElementById('taskbar-middle').style.width = `${width - 20}px`
    document.getElementById('taskbar-icons').style.width = `${width - 20}px`
    document.getElementById('time').innerHTML = `${Math.abs(timeH - 12)}:${timeM}`
}

generateTaskbar()