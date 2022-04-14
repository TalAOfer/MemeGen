//COLOR 

var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: []
}

const gCurrUserSettings = {
    stroke: 'black',
    fill: 'white',
    fontSize: 40,
    fontType: 'david',
    align: 'left'
}

function saveLine(ev) {
    ev.preventDefault()
    const text = ev.target.elements[0].value
    addLine(text)
    ev.target.elements[0].value = ''
    // gMeme.selectedLineIdx++
}

function addLine(text) {
    const settings = gCurrUserSettings
    gMeme.lines.push({
        text: text,
        size: settings.fontSize,
        font: settings.fontType,
        align: settings.align,
        fillColor: settings.fill,
        strokeColor: settings.stroke,
        isMarked: false,
        position: null
    })
    renderMeme()
    // setTimeout(() => {gMeme.selectedLineIdx++}, 1500);

}


function getCurrUserSettings() {
    return gCurrUserSettings
}



function renderMeme() {
    imgId = gMeme.selectedImgId
    var img = new Image();
    img.src = `img/squareTemp/${imgId}.jpg`
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
        let lines = gMeme.lines
        lines.forEach((line, idx) => {
            drawText(line.text, idx)
        });
    };

}

// TEXT

function drawText(txt, idx) {

    gElCanvas = document.getElementById('my-canvas')
    const settings = gCurrUserSettings
    const currLine = gMeme.lines[idx]
    const x = gElCanvas.offsetWidth / 2
    const lines = gMeme.lines

    let y = null
    if (!currLine.position) {
        if (idx === 0) y = gElCanvas.offsetHeight / 10
        if (idx === 1) y = gElCanvas.offsetHeight - 30
        if (idx > 1) y = gElCanvas.offsetHeight / 2
    } else { y = currLine.position }


    gCtx.beginPath()
    gCtx.font = `${currLine.size}px ${settings.fontType}`;
    // gCtx.textBaseline = 'middle';
    gCtx.textAlign = 'center';
    gCtx.lineWidth = 2;
    gCtx.fillStyle = settings.fill;
    gCtx.strokeStyle = settings.stroke;

    gCtx.fillText(txt, x, y);
    gCtx.strokeText(txt, x, y);

    gCtx.closePath()

    currLine.position = y

    if (currLine.isMarked) {
        currLine.metric = getTextMetric(idx)
        drawRect(x, y, idx)
    }


}

function drawRect(x, y, idx) {
    const currLine = gMeme.lines[idx]
    const width = currLine.metric.width
    const height = currLine.metric.height
    gCtx.lineWidth = 1;
    gCtx.rect(x - (width / 2), y - height + 10, width, height);
    gCtx.strokeStyle = 'black'
    gCtx.stroke();
}

function moveText(direction) {
    _markFirst()
    const currLine = gMeme.lines[searchSelected()]

    if (direction === 'down') currLine.position += 2
    else if (direction === 'up') currLine.position -= 2
    renderMeme()
}



function renderCanvas() {
    const elContainer = document.querySelector('.main-container')

    var strHtml = `<div class="generator-container">
        <div class="canvas-container">
        <canvas id="my-canvas" width="400" height="400">
        
        </canvas>
        </div>
        <div class="controller-container">
        
        <div class="form-container">
        <form onsubmit="saveLine(event)">
        <input class="text-input" oninput1="drawText(event, this.value)" type="text" placeholder="enter your text here">
        </form>
        </div>
        
        <div class="main-buttons-container">
        <button onclick ="onMoveText('up')" class="control-btn up-btn"> ⬆️ </button>
        <button onclick ="onMoveText('down')" class="control-btn down-btn"> ⬇️ </button>
        <button onclick ="onChangeLine()" class="control-btn change-line-btn"> 🔃</button>
        <button class="control-btn down-btn"> ➕	</button>
        <button class="control-btn down-btn"> 🗑️ </button>
        </div>
        
        <div class="secondary-buttons-container">
        <button onclick="changeFontSize('up')" class="control-btn down-btn"> 🗚 </button>
        <button onclick="changeFontSize('down')" class="control-btn down-btn"> 🗛 </button>
        <button onclick="" class="control-btn down-btn"> LR </button>
        <button class="control-btn down-btn"> CR </button>
        <button class="control-btn down-btn"> RL </button>
        <select name="fonts">
        <option value="font1">font1</option>
        <option value="font2">font2</option>
        <option value="font3">font3</option>
        </select>
        <label class="color-btn"> 🎨
        <input type="color" name="fillColor" onchange="onChangeColor('fill', this.value)" hidden>
        </label>
        <label class="color-btn"> S
        <input type="color" name="strokeColor" onchange="onChangeColor('stroke', this.value)" hidden>
        </label>
        </div>
        
        </div>
        
        </div>`
    elContainer.innerHTML = strHtml

    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')
}




function changeColor(type, val) {
    const settings = gCurrUserSettings
    if (type === 'stroke') {
        settings.stroke = val
    }
    else if (type === 'fill') {
        settings.fill = val
    }
}

function changeLine() {
    const selectedLine = gMeme.lines[gMeme.selectedLineIdx]

    if ((gMeme.lines).length === 0) return
    else if ((gMeme.lines).length === 1) {
        if (selectedLine.isMarked) {
            selectedLine.isMarked = false
        } else {
            selectedLine.isMarked = true
        }
    }


    else if ((gMeme.lines).length > 1) {
        
        gMeme.lines.forEach((line, idx) => {
            if (idx !== gMeme.selectedLineIdx) line.isMarked = false
            else line.isMarked = true
        });

        gMeme.selectedLineIdx++
        if (gMeme.selectedLineIdx > (gMeme.lines).length - 1) {
            gMeme.selectedLineIdx = 0
        }
    }
    renderMeme()
}



function changeFontSize(direction) {
    _markFirst()
    const currLine = gMeme.lines[searchSelected()]
    if (direction === 'up') currLine.size += 2
    else if (direction === 'down') currLine.size -= 2

    renderMeme()
}

function getTextMetric(idx) {
    const currLine = gMeme.lines[idx]

    const text = document.createElement("span");
    document.body.appendChild(text);

    text.style.font = currLine.font;
    text.style.fontSize = currLine.size + "px";
    text.style.height = 'auto';
    text.style.width = 'auto';
    text.style.position = 'absolute';
    text.style.whiteSpace = 'no-wrap';
    text.innerHTML = `${currLine.text}`;

    const width = Math.ceil(text.clientWidth);
    const height = Math.ceil(text.clientHeight)

    document.body.removeChild(text);
    return ({ width, height })
}


function searchSelected () {
    let selected
    gMeme.lines.forEach((line, idx) => {
        if (line.isMarked) selected = idx
    });
    return selected
}


function _markFirst() {
    if (gMeme.lines.length === 1) {
        gMeme.lines[0].isMarked = true
    }
}









// function findLineById(id) {
//     const currMeme = gMeme.find(meme => {
//         meme.selectedImgId === id
//     }
//     )
//     return currMeme
// }


// function drawImg(imgId) {
    //     gMeme.selectedImgId = imgId
//     gIsDone = false
//     var img = new Image();
//     img.src = `img/squareTemp/${imgId}.jpg`
//     img.onload = () => {
    //         gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
    //         // drawText()
    //     };
    // }