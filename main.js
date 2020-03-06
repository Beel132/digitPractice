window.onload = () => {
    add = (element, event, func) => element.addEventListener(event, func);

    //! vars

    const changeWordBtn = document.querySelector('#changeWord--btn');

    const startBtn = document.querySelector('#start');
    const stopBtn = document.querySelector('#stop');
    const restartBtn = document.querySelector('#restart');

    var c = 1;

    const score = document.querySelector('#score span');
    const time = 60;

    const timer = document.querySelector('#timer');

    const url = `https://random-word-api.herokuapp.com/word?number=10`;

    const word = document.getElementById('wordCatcher');
    const input = document.querySelector('#inputCatcher');

    const arr = [];
    var timerCounter = time;

    //! evtListener to start button

    add(startBtn, 'click', () => {
        score.innerHTML = 0;

        fetch(url)
            .then(data => data.json())
            .then(res => {
                word.innerHTML = res[0];
                arr[0] = res[1];
            })

        //! Timer

        const timerThing = setInterval(() => {
            timer.innerHTML = timerCounter;

            if (timerCounter == 0) {
                input.value = '';

                alert('good job!');
                clearInterval(timerThing);
                stopBtn.style.display = 'none';
                restartBtn.style.display = 'block';

                word.innerHTML = '&nbsp;'
                changeWordBtn.style.display = 'none';

                add(restartBtn, 'click', () => {
                    restartBtn.style.display = 'none';
                    startBtn.style.display = 'block';
                })

                timerCounter = time;
            }


            timerCounter--;
        }, 1000);

        startBtn.style.display = 'none';
        stopBtn.style.display = 'block';

        add(stopBtn, 'click', () => {
            clearInterval(timerThing);

            timerCounter = time;

            word.innerHTML = '&nbsp;';

            startBtn.style.display = 'block';
            stopBtn.style.display = 'none';
            changeWordBtn.style.display = 'none';
        })

        changeWordBtn.style.display = 'block';
    })

    //! check if the word is equal to
    add(input, 'keyup', checkWord);

    function checkWord() {
        if (input.value === word.innerText.toLowerCase()) {
            let scoreNumber = c;

            word.innerHTML = arr[0];
            score.innerHTML = scoreNumber;

            c += 1;

            fetch(url)
                .then(data => data.json())
                .then(res => {
                    arr[0] = res[0];
                    console.log(res);
                })

            input.value = '';
        }
    }

    function change() {
        word.innerHTML = arr[0];
        input.value = '';
        input.focus();

        fetch(url)
            .then(data => data.json())
            .then(res => {
                arr[0] = res[1];
            })
    }

    add(changeWordBtn, 'click', change);
}