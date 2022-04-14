var gElCanvas
var gCtx
var gCurrPage



function onInit () {
    if (!gCurrPage || gCurrPage === 'gallery') {
        gCurrPage = 'gallery'
        toggleChosenBtn('gallery')
        renderGallery()
    }
    else if (gCurrPage = 'meme') {
        toggleChosenBtn('meme')
        renderCanvas()
        resizeCanvas()
        clearCanvas()    
    }
    addListeners()
    }

function resizeCanvas() {
    if (gCurrPage = 'gallery') return
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth - 50
    gElCanvas.height = elContainer.offsetHeight - 50
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()
    window.addEventListener('resize', () => {
        if (gCurrPage = 'gallery') return
        resizeCanvas()
        renderMeme()
    })
}

function clearCanvas() {
    gCtx.fillStyle = "white"
    gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)
}

function addMouseListeners() {
    // gElCanvas.addEventListener('mousemove', onMove)
    // gElCanvas.addEventListener('mousedown', onDown)
    // gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    // gElCanvas.addEventListener('touchmove', onMove)
    // gElCanvas.addEventListener('touchstart', onDown)
    // gElCanvas.addEventListener('touchend', onUp)
}

function onLoadMeme() { 
    gCurrPage = 'meme'
    onInit()
}

function onLoadGallery() {
    gCurrPage = 'gallery'
    onInit()
}

function onPickImg (imgId) {
    gCurrPage = 'meme' 
    onInit()
    gMeme.selectedImgId = imgId
    renderMeme()
}

function onChangeColor(type, val) {
    changeColor(type, val)
}

function onChangeLine() {
    changeLine()
}

function onMoveText(direction) {
    moveText(direction)
}

function toggleChosenBtn(page) {
    const elMemeBtn = document.querySelector('.meme-btn')
    const elGalleryBtn = document.querySelector('.gallery-btn')

    if (page === 'gallery') {
        elGalleryBtn.classList.remove('unchosen-btn')
        elMemeBtn.classList.add('unchosen-btn')

    } else if (page === 'meme') {
        elMemeBtn.classList.remove('unchosen-btn')
        elGalleryBtn.classList.add('unchosen-btn')
    }
}