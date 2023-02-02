const inputField = document.querySelector('input')
const pushBtn = document.querySelector('#push')
const tasks = document.querySelector('#tasks')


pushBtn.addEventListener('click', () => {
    if (inputField.value.length == 0) {
        alert('Please Enter a Task! ✌🏼')
    } else {
       tasks.innerHTML +=  `
            <div class="task">
                <span id="taskName">
                    ${inputField.value}
                </span>
                <button class="delete">
                    <i class="fa-regular fa-trash-can"></i>
                </button>
            </div>
       `
       const currentTask = document.querySelectorAll('.delete')
        for(let i = 0; i < currentTask.length; i++) {
            currentTask[i].onclick = function() {
                this.parentNode.remove()
            }
        }

        const crossingOut = document.querySelectorAll('.task')
        for(let i = 0; i < crossingOut.length; i++) {
            crossingOut[i].onclick = function() {
                this.classList.toggle('completed')
            }
        }

    }
    inputField.value = ''
})