const tablePerson = document.getElementById("table-person")
const joinForm = document.getElementsByClassName('joinForm')[0]
const createForm = document.getElementsByClassName('createForm')[0]
const vapianoTableJoin = document.getElementById('vapiano-table-join')
const vapianoTableCreate = document.getElementById("vapiano-table-create")
const fillForm1 = document.getElementsByClassName('fill-form1')[0]
const fillForm2 = document.getElementsByClassName('fill-form2')[0]
const btnJoin = document.querySelector(".btnJoin")
const btnCreate = document.querySelector(".btnCreate")



joinForm.addEventListener('submit', (e) => {
    e.preventDefault()
    btnJoin.style = 'cursor: no-drop;background-color:#abf4be'
    setTimeout(() => {
        btnJoin.style = 'cursor: pointer;background-color:#33AB53'
    }, 7000);
    if (vapianoTableJoin.value) {
        fetch('https://menu-save.herokuapp.com/api/createUser', {
            method: 'post',
            body: JSON.stringify({
                username: vapianoTableJoin.value
            }),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(json => {
                localStorage.setItem('user', JSON.stringify(json));
                window.location = '/home.html'
            });
    } else {
        fillForm1.classList.add('active')
    }
})

btnJoin.addEventListener('click', () => {
    btnJoin.style = 'cursor: no-drop;background-color:#abf4be'
    setTimeout(() => {
        btnJoin.style = 'cursor: pointer;background-color:#33AB53'
    }, 7000);
})
btnCreate.addEventListener('click', () => {
    btnCreate.style = 'cursor: no-drop; background-color:#7ee1ea'
    setTimeout(() => {
        btnCreate.style = 'cursor: pointer; background-color:#17B5C2'
    }, 7000);
})
createForm.addEventListener('submit', (e) => {
    e.preventDefault()
    btnCreate.style = 'cursor: no-drop; background-color:#7ee1ea'
    setTimeout(() => {
        btnCreate.style = 'cursor: pointer; background-color:#17B5C2'
    }, 7000);
    if (vapianoTableCreate.value) {
        fetch('https://menu-save.herokuapp.com/api/createUser', {
            method: 'POST',
            body: JSON.stringify({
                username: vapianoTableCreate.value
            }),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(json => {
                localStorage.setItem('user', JSON.stringify(json));
                window.location = '/home.html'
            });
    } else {
        fillForm2.classList.add('active')
    }
})

