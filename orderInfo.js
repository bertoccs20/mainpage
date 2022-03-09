const btnorderpi = document.querySelector('#btnorderpi')
const btnorderpi1 = document.querySelector('#btnorderpi1')
const sortable = document.getElementsByClassName('sortable1')[0]
const formShow = document.querySelector(".formShow")
const scbginner = document.querySelector(".scbginner")
const biSearch = document.querySelector(".bi-search")
const xMark = document.querySelector(".fa-xmark")
const tableNameSelected = document.getElementById('table-name-select')
const btnplace = document.getElementById("btnplace")
const selectedTable = JSON.parse(localStorage.getItem('user'))
tableNameSelected.innerHTML = selectedTable?.username ? selectedTable.username : 'Not joined/ created a table'
let username = selectedTable?.username ? selectedTable.username : 'user'
const countTotalOrder = document.querySelector(".countTotalOrder")




biSearch.addEventListener("click", ()=> {
    formShow.classList.add('active')
    scbginner.classList.add('active')
})
xMark.addEventListener("click", ()=> {
    formShow.classList.remove("active")
    scbginner.classList.remove("active")
})



try {
    fetch('https://menu-save.herokuapp.com/api/order/getItems', {
        method: 'POST',
        body: JSON.stringify({
            username: username
        }),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(json => {
            let sortItems = ''
            localStorage.setItem('allCart', JSON.stringify(json))
            json.forEach((element, index) => {
                sortItems += `
                <div class="orderlist ">

                    <div class="billstyle orderQuan handle-counter">
                        <button class="incDecBtn" class=${index} onclick="decHandle(${index})">-</button>
                        <input type="number" value=${element.quantity} class="valInp">
                        <button class="incDecBtn" itemInd=${index} onclick="incHandle(${index})">+</button>
                        <button class="quanUpdate" onclick="updateSingleHandle(${index})">UPDATE</button>
                    </div>

                    <div class="billstyle">${element.title}</div>

                    <div class="billstyle billPr"><div class="billTotlaPrice">${parseFloat(element.price * element.quantity).toFixed(2)}</div> &euro;</div>
                    
                    <div class="billRemove removeitem"><button id=${element._id} onclick="itemDrop(this.id)"><i class="fas fa-times"></i></button></div>
                    <div class="billstyle caretupdown">
                        <span>&#9650;</span>
                        <span>&#9660;</span>
                    </div>

                </div>
                `
            });
            sortable.innerHTML = sortItems
        });
} catch (error) {
    console.log(error);
}

function incHandle(getInd) {
    const valInp = document.querySelectorAll(".valInp")
    let initialVal = valInp[getInd].value
    valInp[getInd].value = ++initialVal
    const getLocVal = JSON.parse(localStorage.getItem("allCart"))
    let indVal = { ...getLocVal[getInd], quantity: valInp[getInd].value }
    localStorage.setItem('quanUpdated', JSON.stringify(indVal))
    const allQuanBtn = document.querySelectorAll('.quanUpdate')
    // allQuanBtn.style = 'display: none'
    for (let i = 0; i < allQuanBtn.length; i++) {
        const element = allQuanBtn[i];
        element.style = "display: none"
    }
    allQuanBtn[getInd].style = 'display: block !important'
    const billTotlaPrice = document.querySelectorAll('.billTotlaPrice')
    billTotlaPrice[getInd].innerHTML = parseInt(initialVal) * parseInt(JSON.parse(localStorage.getItem('allCart'))[getInd].price)
}
function decHandle(getInd) {
    const valInp = document.querySelectorAll('.valInp')
    let initialVal = valInp[getInd].value
    valInp[getInd].value = initialVal > 1 ? --initialVal : 1
    const getLocVal = JSON.parse(localStorage.getItem("allCart"))
    let indVal = { ...getLocVal[getInd], quantity: valInp[getInd].value }
    localStorage.setItem('quanUpdated', JSON.stringify(indVal))
    const allQuanBtn = document.querySelectorAll('.quanUpdate')
    // allQuanBtn.style = 'display: none'
    for (let i = 0; i < allQuanBtn.length; i++) {
        const element = allQuanBtn[i];
        element.style = "display: none"
    }
    allQuanBtn[getInd].style = 'display: block !important'
    const billTotlaPrice = document.querySelectorAll('.billTotlaPrice')
    billTotlaPrice[getInd].innerHTML = parseInt(initialVal) * parseInt(JSON.parse(localStorage.getItem('allCart'))[getInd].price)
}


const updateSingleHandle = (getInd) => {

    const getUpdatedItem = JSON.parse(localStorage.getItem('quanUpdated'))
    console.log(getUpdatedItem);
    fetch(`https://menu-save.herokuapp.com/api/order/${getUpdatedItem._id}`, {
        method: 'PUT',
        body: JSON.stringify({
            quantity: getUpdatedItem.quantity
        }),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(res => res.json())
        .then((json) => {
            let getAllCart = JSON.parse(localStorage.getItem('allCart'))
            getAllCart[getInd] = json
            localStorage.setItem('allCart', JSON.stringify(getAllCart))
            console.log(JSON.parse(localStorage.getItem('allCart')));
            const allQuanBtn = document.querySelectorAll('.quanUpdate')
            // allQuanBtn.style = 'display: none'
            for (let i = 0; i < allQuanBtn.length; i++) {
                const element = allQuanBtn[i];
                element.style = "display: none"
            }
        })
}
const itemDrop = (getid) => {
    fetch('https://menu-save.herokuapp.com/api/order/deleteItem', {
        method: 'DELETE',
        body: JSON.stringify({
            id: getid
        }),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(json => {
            console.log(json);
            location.reload()
        })
}


btnplace.addEventListener('click', () => {
    const totalItem = JSON.parse(localStorage.getItem('allCart'))
    const username = JSON.parse(localStorage.getItem('user')).username
    try {
        fetch('https://menu-save.herokuapp.com/api/billing/', {
            method: 'POST',
            body: JSON.stringify({
                username: username,
                items: totalItem
            }),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(() => {
                try {
                    fetch('https://menu-save.herokuapp.com/api/order/deleteMany', {
                        method: 'DELETE',
                        body: JSON.stringify({
                            username: username
                        }),
                        headers: {
                            'content-type': 'application/json'
                        }
                    })
                        .then(response => response.json())
                        .then(json => {
                            window.location = '/bill.html'
                            try {
                                fetch('https://menu-save.herokuapp.com/api/order/getItems', {
                                    method: 'POST',
                                    body: JSON.stringify({
                                        username: username
                                    }),
                                    headers: {
                                        'content-type': 'application/json'
                                    }
                                })
                                    .then(response => response.json())
                                    .then(json => {
                                        if (json.length > 0) {
                                            countTotalOrder.style = 'display: block'
                                            countTotalOrder.innerHTML = json.length
                                        } else {
                                            countTotalOrder.style = 'display: none'
                                        }
                                    });
                            } catch (error) {
                                console.log(error);
                            }
                        })
                } catch (error) {
                    console.log(error);
                }
            })
    } catch (error) {
        console.log(error);
    }
})






try {
    fetch('https://menu-save.herokuapp.com/api/order/getItems', {
        method: 'POST',
        body: JSON.stringify({
            username: username
        }),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(json => {
            if (json.length > 0) {
                countTotalOrder.style = 'display: block'
                countTotalOrder.innerHTML = json.length
            } else {
                countTotalOrder.style = 'display: none'
            }
        });
} catch (error) {
    console.log(error);
}