const puzzleBoard = document.querySelector('#puzzle')
const solveButton = document.querySelector('#solve-button')
const solutionText = document.querySelector('#solution')
const squares = 81
let submission = []

for (let i = 1; i <= squares; i++) {
    const inputElement = document.createElement('input')
    inputElement.setAttribute('type', 'number')
    inputElement.setAttribute('min', 1)
    inputElement.setAttribute('max', 9)
    if (
        ((i % 9 == 1 || i % 9 == 2 || i % 9 == 3) && i < 22) ||
        ((i % 9 == 7 || i % 9 == 8 || i % 9 == 0) && i < 28) ||
        ((i % 9 == 4 || i % 9 == 5 || i % 9 == 6) && (i > 28 && i < 54)) ||
        ((i % 9 == 1 || i % 9 == 2 || i % 9 == 3) && i > 54) ||
        ((i % 9 == 7 || i % 9 == 8 || i % 9 == 0) && i > 54)
    ) {
        inputElement.classList.add('odd-section')
    }
    puzzleBoard.appendChild(inputElement)
}

const joinValues = () => {
    const inputs = document.querySelectorAll('input')

    inputs.forEach(input => {
        if (input.value) {
            submission.push(input.value)
        }
        else {
            submission.push('.')
        }
    })
    console.log(submission)
}
const populateValues = (isSolvable, solution) => {
   const inputs = document.querySelectorAll('input')
   if (isSolvable && solution) {
    inputs.forEach((input, i) => {
        input.value = solution[i]
    })
    solutionText.innerHTML = 'Here is the answer!'
   }
   else {
       solutionText.innerHTML = "This is not solvable!"
   }
}
const solve = () => {
    joinValues()
    const data = { numbers: submission.join('') }
    console.log('data', data)

    fetch('http://localhost:8000/solve', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    })  .then(response => response.json())
        .then(data => {
            console.log(data)
            populateValues(data.solvable, data.solution)
            submission = []
        })
        .catch(error => {
            console.error('Error:', error)
        })
}

solveButton.addEventListener('click', solve)