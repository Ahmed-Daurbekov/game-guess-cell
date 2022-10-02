let board = document.querySelector('.board');
let size = document.querySelector('.size');
let start = document.querySelector('.start');
let reboot = document.querySelector('.reboot');
let seconds = document.querySelector('.seconds');
let numberMisses = document.querySelector('.numberMisses')
let numberMissesFrom = document.querySelector('.numberMissesFrom')
let range = document.querySelector('.range')
let counter = 0;
let miss = 0;
let attempts;
let secund = 0

start.addEventListener('click', game)
document.addEventListener('keydown', (e) => {
    if(e.keyCode === 13) {
        game()
    }
})

function timer() {
    secund++
    seconds.innerHTML = addZero(secund)
}

function addZero(a) {
    if(a < 10) {
        a = '0' + a
    }
    return a
}

function setDisabled() {
    start.disabled = false
    reboot.disabled = true

    document.querySelectorAll('input').forEach(input => {
        input.disabled = false
    })
}
range.addEventListener('input', () => {
    attempts = Number(range.value)
    numberMisses.innerHTML = attempts
    numberMissesFrom.innerHTML = attempts
})

function game() {
    counter = 0
    miss = 0

    attempts = Number(range.value)
    numberMisses.innerHTML = attempts
    numberMissesFrom.innerHTML = attempts

    start.disabled = true
    reboot.disabled = false
    document.querySelectorAll('input').forEach(input => {
        input.disabled = true
    })
    board.innerHTML = ''
    let field = parseInt(size.value) ** 2
    
    for (let i = 1; i <= field; i++) {
        let div = document.createElement('div')
        div.classList.add('cell')
        div.setAttribute('data-num', `${i}`)
        div.innerHTML = i
        board.append(div)
    }

    let interval = setInterval(timer, 1000);

    let cells = document.querySelectorAll('.cell');
    let arr = [];
    let numberCells = document.querySelector('.activeCells')
    let returnArr = randomNum(0, field)
    
    board.style.width = `${(cells[0].offsetWidth+4) * parseInt(size.value)}px`
    board.style.height = `${(cells[0].offsetWidth+4) * parseInt(size.value)}px`
    returnArr.forEach(item => {
        cells[item].classList.add('cell-active')
    })

    cells.forEach(item => {
        item.addEventListener('click', () => {
            if(item.classList.contains('cell-active') && !item.classList.contains('show-active')) {
                item.style.background = 'green'
                counter++
                if(counter == parseInt(numberCells.value)) {
                    clearInterval(interval)
                    setDisabled()
                    board.innerHTML = `
                    <div class="game-over">
                        <div class="game-over__title">Вы выиграли</div>
                        <div class="game-over__time">Вы справились за ${secund} секунд</div>
                        <div class="game-over__counter">Ваш счет: <span class="recruited">${counter}</span></div>         
                        <div class="game-over__miss">Ваши промахи: <span class="miss">${miss}</span></div>
                    </div>
                    `
                    secund = 0
                    seconds.innerHTML = `00`
                }
            } else if(item.classList.contains('show-active')) {
                item.style.background = ''
            } else {
                item.style.background = 'red'
                miss++
                attempts--
                numberMisses.innerHTML = attempts
                
                if (attempts == 0) {
                    gameOver()
                }
            }
        })
    });

    function gameOver() {
        clearInterval(interval)
        secund = 0
        setDisabled()
        seconds.innerHTML = `00`
        board.innerHTML = `
            <div class="game-over">
                <div class="game-over__title">Вы проиграли<br>Вы достигли истратили<br>лимит промахов</div>
                <div class="game-over__counter">Вы смогли отгадать <span class="recruited">${counter}</span> ячеек</div>
            </div>
        `
    }

    function randomNum(max, min) {
        while (arr.length < parseInt(numberCells.value)) {
            let number = Math.floor(Math.random() * (max-min)+min)
            if (!arr.includes(number)) {
                arr.push(number)
            }
        }
        return arr
    }
    
    function showCells() {
        let timeInput = document.querySelector('.timeInput')
        let time = parseInt(timeInput.value) * 1000
        cells.forEach(item => {
            if (item.classList.contains('cell-active')) {
                item.classList.add('show-active')
            }
        })

        setTimeout(() => {
            cells.forEach(item => {
                if (item.classList.contains('show-active')) {
                    item.classList.remove('show-active')
                }
            })
        }, time);
    }
    showCells()

    reboot.addEventListener('click', () => {
        clearInterval(interval)
        secund = 0
        seconds.innerHTML = `00`
        board.innerHTML = `
            <div class="game-over">
                <div class="game-over__title">Вы завершили игру заного</div>
                <div class="game-over__counter">Чтобы начать нажмите на кнопку<br><i>Начать</div>
            </div>
        `
        setDisabled()
    })    
}
