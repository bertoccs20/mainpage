const allBillItems = document.getElementsByClassName("allBillItems")[0]
const priceHold = document.querySelector(".priceHold h1 span")
const formShow = document.querySelector(".formShow")
const scbginner = document.querySelector(".scbginner")
const biSearch = document.querySelector(".bi-search")
const xMark = document.querySelector(".fa-xmark")
const tableNameSelected = document.getElementById('table-name-select')
const selectedTable = JSON.parse(localStorage.getItem('user'))
const tableName = selectedTable?.username ? selectedTable.username : null

tableNameSelected.innerHTML = tableName ? tableName : 'Join or create a table'



const totalPr = document.querySelector(".totalPr span")
const divInput = document.querySelector('#people')
const eachPay = document.querySelector(".eachPay span")
const divide = document.querySelector('.divide')
const divideCalc = document.querySelector('.divideCalc')
const closeBtnDivide = document.querySelector('.closeBtnDivide')
const billOverlay = document.querySelector('.billOverlay')
const dividePr = document.querySelector(".divInp button")
const payBtn = document.querySelector(".payBtn")
let totalPr2 = document.querySelector(".totalPr2 span")
let totalPrSp = document.querySelector(".prSp span")

const countTotalOrder = document.querySelector(".countTotalOrder")



biSearch.addEventListener("click", () => {
    formShow.classList.add('active')
    scbginner.classList.add('active')
})
xMark.addEventListener("click", () => {
    formShow.classList.remove("active")
    scbginner.classList.remove("active")
})



try {
    fetch('https://menu-save.herokuapp.com/api/billing/billItems', {
        method: 'post',
        body: JSON.stringify({
            username: tableName
        }),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(json => {
            let holdItems = ''
            const finalOrderInd = json.length - 1
            const finalItems = json[finalOrderInd]
            finalItems.items.forEach((val, ind) => {
                holdItems += `
                <div class="row ">
                <div class="col-2">
                    <div class="quantity billstyle">
                        ${val.quantity}
                    </div>
                </div>
                <div class="col-6 billstyle">
                    ${val.title}
                </div>
                <div class="col-3 billstyle">${parseFloat(val.price * val.quantity).toFixed(2)} &euro;</div>
                <input type="checkbox" style="height:25px;transform: scale(.8);" class="col-1" onclick="checkHandle(this.checked, ${ind})">
            </div>
                `
            });
            allBillItems.innerHTML = holdItems
            console.log(finalItems);

            const priceCon = finalItems.items.reduce((currentTotal, value) => {
                return (
                    (value.quantity * value.price) + currentTotal
                )
            }, 0)
            priceHold.innerHTML = parseFloat(priceCon).toFixed(2)




            const totalCon = finalItems.items.reduce((currentTotal, value) => {
                return (
                    (value.quantity * value.price) + currentTotal
                )
            }, 0)
            totalPr.innerHTML = parseFloat(totalCon).toFixed(2)
            localStorage.setItem('finalCheck', JSON.stringify(finalItems))

        });

} catch (error) {
    console.log(error);
}


window.onload = localStorage.removeItem('checkedItems')
function checkHandle(check, index) {
    // console.log(check);
    const getLocVal = JSON.parse(localStorage.getItem('finalCheck')).items
    !localStorage.getItem('checkedItems') && localStorage.setItem("checkedItems", JSON.stringify(getLocVal))
    const getChecked = JSON.parse(localStorage.getItem('checkedItems'))
    const checkedPrice = getChecked.map((val, ind) => {
        return Number(ind) === Number(index) ? { ...val, isChecked: check } : val
    })
    localStorage.setItem('checkedItems', JSON.stringify(checkedPrice))

    const showfin = checkedPrice.reduce((currentTotal, value) => {
        const ifchecked = value?.isChecked ? value.price : 0
        const ifquan = value?.isChecked ? value.quantity : 0
        const valtot = ifchecked * ifquan
        return (
            parseFloat(valtot) + parseInt(currentTotal)
        )

    }, 0)

    console.log(showfin);


}






// $('.header1-carousel').flickity({
//     cellAlign: 'left',
//     contain: true,
//     freeScroll: true,
//     prevNextButtons: false,
//     pageDots: false
// });






// dividePr.addEventListener('click', () => {
//     const getPr = JSON.parse(localStorage.getItem('finalCheck'))

//     const eachCon = getPr.items.reduce((currentTotal, value) => {
//         return (
//             divInput.value ? (((value.quantity * value.price / divInput.value)) + currentTotal) : (value.quantity * value.price) + currentTotal
//         )
//     }, 0)
//     eachPay.innerHTML = parseFloat(eachCon).toFixed(2)
//     payBtn.classList.add('active')
// })


const payoverlay = document.querySelector('.payoverlay')
const paymentWrapper = document.querySelector('.paymentWrapper')
const payOpFull = document.querySelector(".payOpFull")
const divide2 = document.querySelector(".divide2")
const divide3 = document.querySelector(".divide3")
const divideSp = document.querySelector(".divideSp")
const closeBtnDivideSp = document.querySelector(".closeBtnDivideSp")


function showDivide() {
    $("#dividemodal").modal('show')
}





const closeBtnDivide2 = document.querySelector(".closeBtnDivide2")
const closeBtnDivide3 = document.querySelector(".closeBtnDivide3")

function paymentShow() {
    $("#dividemodal").modal('hide')
    $("#divide2modal").modal('show')
    const finalItems = JSON.parse(localStorage.getItem("finalCheck"))
    const totalCon = finalItems.items.reduce((currentTotal, value) => {
        return (
            (value.quantity * value.price) / divInput.value + currentTotal
        )
    }, 0)
    totalPr2.innerHTML = parseFloat(totalCon).toFixed(2)


}
function paymentShow1() {
    $("#dividemodal").modal('hide')
    $("#divide2modal").modal('show')
    const finalItems = JSON.parse(localStorage.getItem("finalCheck"))
    const totalCon = finalItems.items.reduce((currentTotal, value) => {
        return (
            (value.quantity * value.price) + currentTotal
        )
    }, 0)
    totalPr2.innerHTML = parseFloat(totalCon).toFixed(2)
}





function splitHan() {
    // divideSp.classList.add('active')
    // billOverlay.classList.add("active")
    if (!localStorage.getItem("checkedItems") || JSON.parse(localStorage.getItem("checkedItems")).filter(val => val.isChecked).length < 1) {
        return
    }
    $("#splitModal").modal('show')
    const checkedPrice = JSON.parse(localStorage.getItem('checkedItems'))
    let upPrice = checkedPrice.reduce((currentTotal, value) => {
        const checkedPrice = value?.isChecked ? value.price : 0
        const checkedQuantity = value?.isChecked ? value.quantity : 0
        const valtot = checkedPrice * checkedQuantity
        return (
            valtot + currentTotal
        )
    }, 0)
    totalPrSp.innerHTML = parseFloat(upPrice).toFixed(2)


}




function showDiv3() {
    $("#divide3modal").modal('show')
    // timer logic codes 
    const timer = document.querySelector(".timer");
    let timeSecond = 600;

    displayTime(timeSecond);

    const countDown = setInterval(() => {
        timeSecond--;
        displayTime(timeSecond);
        if (timeSecond == 0 || timeSecond < 1) {
            clearInterval(countDown);
        }
    }, 1000);


    function displayTime(second) {
        const min = Math.floor(second / 60);
        const sec = Math.floor(second % 60);
        timer.innerHTML = `${min < 10 ? "0" : ""}${min}'${sec < 10 ? "0" : ""}${sec}`;
    }

    $('.header1-carousel').slick({
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        infinite: true,
        variableWidth: true,
        dots: false,
        speed: 500,
        // cssEase: 'linear',
        useTransform: false,
        autoplaySpeed: 2000,
        arrows: false,
    });




}




try {
    fetch('https://menu-save.herokuapp.com/api/order/getItems', {
        method: 'POST',
        body: JSON.stringify({
            username: tableName
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






const tipCheck = document.querySelectorAll(".tipCheck")
for (let i = 0; i < tipCheck.length; i++) {
    const checkEle = tipCheck[i];
    checkEle.addEventListener("click", () => {
        console.log(checkEle.value);
        for (var checkbox of tipCheck) {
            checkbox.checked = false;
        }
        checkEle.checked = true
        const finalItems = JSON.parse(localStorage.getItem("finalCheck"))
        const totalCon = finalItems.items.reduce((currentTotal, value) => {
            return (
                (value.quantity * value.price) + currentTotal
            )
        }, 0)
        let checkvalfix = checkEle.value > 0 ? (Number(totalCon) / 100) * checkEle.value : 0
        totalPr2.innerHTML = (Number(totalCon) + checkvalfix).toFixed(2)
    })
}


function calcRandomTip() {
    const finalItems = JSON.parse(localStorage.getItem("finalCheck"))
    const totalCon = finalItems.items.reduce((currentTotal, value) => {
        return (
            (value.quantity * value.price) + currentTotal
        )
    }, 0)
    const randomTip = document.querySelector(".randomTip")
    totalPr2.innerHTML = (parseFloat(totalCon) + Number(randomTip.value)).toFixed(2)
}






const tipCheckSplit = document.querySelectorAll(".tipCheckSplit")
for (let i = 0; i < tipCheckSplit.length; i++) {
    const checkEleSp = tipCheckSplit[i];
    checkEleSp.addEventListener("click", () => {
        console.log(checkEleSp.value);
        for (var checkbox of tipCheckSplit) {
            checkbox.checked = false;
        }
        checkEleSp.checked = true
        const finalItemsCheck = JSON.parse(localStorage.getItem("checkedItems"))
        const checkIsPrice = finalItemsCheck.filter(val => val.isChecked)
        const totalConSp = checkIsPrice.reduce((currentTotal, value) => {
            return (
                (value.quantity * value.price) + currentTotal
            )
        }, 0)
        let checkvalfix = checkEleSp.value > 0 ? (Number(totalConSp) / 100) * checkEleSp.value : 0
        totalPrSp.innerHTML = (Number(totalConSp) + checkvalfix).toFixed(2)
    })
}

const splitTipCalc = () => {
    const finalItems = JSON.parse(localStorage.getItem("checkedItems"))
    const checkIsPrice = finalItems.filter(val => val.isChecked)
    const totalCon = checkIsPrice.reduce((currentTotal, value) => {
        return (
            (value.quantity * value.price) + currentTotal
        )
    }, 0)
    const randomTipSplit = document.querySelector(".randomTipSplit")
    totalPrSp.innerHTML = (Number(totalCon) + Number(randomTipSplit.value)).toFixed(2)
}