const tableName = document.querySelector('#table-name-select')
const selectedTable = JSON.parse(localStorage.getItem('user'))
const sliderItem1 = document.getElementById('sliderItem1')
const sliderItem2 = document.getElementById('sliderItem2')
const sliderItem3 = document.getElementById('sliderItem3')
const sliderItem4 = document.getElementById('sliderItem4')
const sliderItem5 = document.getElementById('sliderItem5')
const sliderItem6 = document.getElementById('sliderItem6')
const sliderItem7 = document.getElementById('sliderItem7')
const sliderItem8 = document.getElementById('sliderItem8')
// const sliderItem9 = document.getElementById('sliderItem9')
const sliderItem10 = document.getElementById('sliderItem10')
// const sliderItem11 = document.getElementById('sliderItem11')
// const sliderItem12 = document.getElementById('sliderItem12')
// const sliderItem13 = document.getElementById('sliderItem13')
// const sliderItem14 = document.getElementById('sliderItem14')
const orderModal = document.querySelector("#orderModal")
const allergens = document.querySelector("#allergens")
const btncart = document.querySelector("#btncart")
const modalimg = document.querySelector("#modalImg")
const modalimg1 = document.querySelector("#modalImg1")
const modaldesc = document.querySelector(".modaldesc p")
const mdltitle = document.querySelector("#mdltitle")
const catCon = document.querySelector(".catCon")
const prCon = document.querySelector('.prCon')
const counter = document.getElementById('counter')
const btndec = document.querySelector("#btndec")
const btninc = document.querySelector("#btninc")
const ingCheck = document.querySelector(".ingCheck ul")
const exCheck = document.querySelector(".exCheck ul")
const ingHead = document.querySelector(".ingHead")
const exHead = document.querySelector(".exHead")
const formShow = document.querySelector(".formShow")
const biSearch = document.querySelector(".bi-search")
const pdngbtom = document.querySelector(".pdngbtom")
const xMark = document.querySelector(".fa-xmark")
const navheadUl = document.querySelector(".navheader ul")
const navheader = document.querySelector(".navheader")
const navheaderLinks = document.querySelectorAll(".navheader ul li")
const accordionButton = document.querySelector(".accordion-button")
const choiceGoOrder = document.getElementsByClassName("choiceGoOrder")[0]
const countTotalOrder = document.querySelector(".countTotalOrder")
let username = selectedTable?.username ? selectedTable.username : 'user'


tableName.innerHTML = selectedTable?.username ? selectedTable.username : 'Not joined/ created a table'





biSearch.addEventListener("click", () => {
    formShow.classList.add('active')
    window.scrollY === 0 && pdngbtom.classList.add("active")

})
xMark.addEventListener("click", () => {
    formShow.classList.remove("active")
    pdngbtom.classList.remove("active")
})






let section = document.querySelectorAll('section');
let navlinks = document.querySelectorAll('ul li a');
let bodyHeight = document.querySelector('body').offsetHeight
let navulWidth = navheadUl.offsetWidth
console.log(bodyHeight);
var scrolled = false;
window.onscroll = () => {
    if (!scrolled) {
        scrolled = true;
        section.forEach(sec => {
            let top = window.scrollY + 350;
            let offset = sec.offsetTop;
            let height = sec.offsetHeight;
            let id = sec.getAttribute('id');


            if (top >= offset && top < offset + height) {
                navlinks.forEach(links => {
                    links.classList.remove('active');
                    links.classList.remove('bg_img');
                    document.querySelector('ul li a[href*=' + id + ']').classList.add('active');
                    document.querySelector('ul li a[href*=' + id + ']').classList.add('bg_img');
                });
            }
            navheadUl.scrollLeft = window.scrollY / 4
        })
        scrolled = false;
    };


}





// for (let i = 0; i < navheaderLinks.length; i++) {
//     const element = navheaderLinks[i];
//     element.addEventListener("click", () => {
//         navheaderLinks.forEach(val => {
//             return val.style = "background-image: unset;"
//         });
//         // navheaderLinks.style.background = "unset !important;"
//         navheaderLinks[i].style = "background-image: url(./img/activemenu.fw.png);"
//     })
// }
$('.navheader ul li a').on('click', function (event) {
    var $anchor = $(this);
    $('html, body').animate({
        scrollTop: $($anchor.attr('href')).offset().top - 150 + "px"
    }, 100);
    event.preventDefault();
});








$('.collapse').each(function () {
    var targetColls = $(this);

    targetColls.on('show.bs.collapse', function () {
        var target = document.querySelector(".collapsed")
        var scrollContainer = target;
        do { //find scroll container
            scrollContainer = scrollContainer.parentNode;
            if (!scrollContainer) return;
            scrollContainer.scrollTop += 1;
        } while (scrollContainer.scrollTop == 0);

        var targetY = 0;
        do { //find the top of target relatively to the container
            if (target == scrollContainer) break;
            targetY += target.offsetTop;
        } while (target = target.offsetParent);

        scroll = function (c, a, b, i) {
            i++; if (i > 30) return;
            c.scrollTop = a + (b - a) / 50 * i;
            setTimeout(function () { scroll(c, a, b, i); }, 10);
        }
        // start scrolling
        scroll(scrollContainer, scrollContainer.scrollTop, targetY, 0);
    });
});







try {
    fetch("https://menu-save.herokuapp.com/api/")
        .then(response => response.json())
        .then(async (json) => {
            let kidsVal = json.filter(val => {
                return val.category === 'kids'
            })
            let insalateVal = json.filter(val => {
                return val.category === 'insalate'
            })
            let risottoVal = json.filter(val => {
                return val.category === 'risotto'
            })
            let pinsaVal = json.filter(val => {
                return val.category === 'pinsa'
            })
            let antipastiVal = json.filter(val => {
                return val.category === 'antipasti'
            })
            let pastaVal = json.filter(val => {
                return val.category === 'pasta'
            })
            let drinkVal = json.filter(val => {
                return val.category === 'drinks'
            })
            let kidsHold = ''
            let insalateHold = ''
            let risottoHold = ''
            let pinsaHold = ''
            let antipastiHold = ''
            let pastaHold = ''
            let drinkHold = ''
            kidsVal.forEach((element, index) => {
                return kidsHold += !element.disabled ? `
                    <div class="slideWraper carousel-cell">
                    <div class="itemWrapper">

                        <div class="itemWrapTop" id=${element._id} onclick='getInfo(this.id)'>
                        <h1>${element.title}</h1>

                        <div class="itemImgWrap">
                            <img src=${'https://menu-save.herokuapp.com/' + element.image} class="img-fluid">
                        </div>
                        </div>

                        <div class="item_btm">

                            <div class="item_info" data-bs-toggle="modal" data-bs-target="#allergens">

                                <i class="bi bi-info-circle"></i>

                            </div>

                            <div class="item_price">€ ${element.price}</div>

                        </div>

                    </div>

                    </div>
                    ` :
                    `
                    <div class="slideWraper carousel-cell">
                    <div class="itemWrapper fordis">

                        <div class="itemWrapTop" id=${element._id}>
                        <h1>${element.title}</h1>
                        <div class="itemImgWrap">
                            <img src=${'https://menu-save.herokuapp.com/' + element.image} class="img-fluid">
                        </div>
                        </div>

                        <div class="item_btm">

                            <div class="item_info" data-bs-toggle="modal" data-bs-target="#allergens">

                                <i class="bi bi-info-circle"></i>

                            </div>

                            <div class="item_price">€ ${element.price}</div>

                        </div>

                    </div>

                    </div>
                    `

            })
            insalateVal.forEach((element, index) => {
                return insalateHold += !element.disabled ? `
                <div class="slideWraper carousel-cell">
                <div class="itemWrapper">

                    <div class="itemWrapTop" id=${element._id} onclick='getInfo(this.id)'>
                    <h1>${element.title}</h1>

                    <div class="itemImgWrap">
                        <img src=${'https://menu-save.herokuapp.com/' + element.image} class="img-fluid">
                    </div>
                    </div>

                    <div class="item_btm">

                        <div class="item_info" data-bs-toggle="modal" data-bs-target="#allergens">

                            <i class="bi bi-info-circle"></i>

                        </div>

                        <div class="item_price">€ ${element.price}</div>

                    </div>

                </div>

                </div>
                ` :
                    `
                <div class="slideWraper carousel-cell">
                <div class="itemWrapper fordis">

                    <div class="itemWrapTop" id=${element._id}>
                    <h1>${element.title}</h1>
                    <div class="itemImgWrap">
                        <img src=${'https://menu-save.herokuapp.com/' + element.image} class="img-fluid">
                    </div>
                    </div>

                    <div class="item_btm">

                        <div class="item_info" data-bs-toggle="modal" data-bs-target="#allergens">

                            <i class="bi bi-info-circle"></i>

                        </div>

                        <div class="item_price">€ ${element.price}</div>

                    </div>

                </div>

                </div>
                `
            })
            pinsaVal.forEach((element, index) => {
                return pinsaHold += !element.disabled ? `
                <div class="slideWraper carousel-cell">
                <div class="itemWrapper">

                    <div class="itemWrapTop" id=${element._id} onclick='getInfo(this.id)'>
                    <h1>${element.title}</h1>

                    <div class="itemImgWrap">
                        <img src=${'https://menu-save.herokuapp.com/' + element.image} class="img-fluid">
                    </div>
                    </div>

                    <div class="item_btm">

                        <div class="item_info" data-bs-toggle="modal" data-bs-target="#allergens">

                            <i class="bi bi-info-circle"></i>

                        </div>

                        <div class="item_price">€ ${element.price}</div>

                    </div>

                </div>

                </div>
                ` :
                    `
                <div class="slideWraper carousel-cell">
                <div class="itemWrapper fordis">

                    <div class="itemWrapTop" id=${element._id}>
                    <h1>${element.title}</h1>
                    <div class="itemImgWrap">
                        <img src=${'https://menu-save.herokuapp.com/' + element.image} class="img-fluid">
                    </div>
                    </div>

                    <div class="item_btm">

                        <div class="item_info" data-bs-toggle="modal" data-bs-target="#allergens">

                            <i class="bi bi-info-circle"></i>

                        </div>

                        <div class="item_price">€ ${element.price}</div>

                    </div>

                </div>

                </div>
                `
            })
            risottoVal.forEach((element, index) => {
                return risottoHold += !element.disabled ? `
                <div class="slideWraper carousel-cell">
                <div class="itemWrapper">

                    <div class="itemWrapTop" id=${element._id} onclick='getInfo(this.id)'>
                    <h1>${element.title}</h1>

                    <div class="itemImgWrap">
                        <img src=${'https://menu-save.herokuapp.com/' + element.image} class="img-fluid">
                    </div>
                    </div>

                    <div class="item_btm">

                        <div class="item_info" data-bs-toggle="modal" data-bs-target="#allergens">

                            <i class="bi bi-info-circle"></i>

                        </div>

                        <div class="item_price">€ ${element.price}</div>

                    </div>

                </div>

                </div>
                ` :
                    `
                <div class="slideWraper carousel-cell">
                <div class="itemWrapper fordis">

                    <div class="itemWrapTop" id=${element._id}>
                    <h1>${element.title}</h1>
                    <div class="itemImgWrap">
                        <img src=${'https://menu-save.herokuapp.com/' + element.image} class="img-fluid">
                    </div>
                    </div>

                    <div class="item_btm">

                        <div class="item_info" data-bs-toggle="modal" data-bs-target="#allergens">

                            <i class="bi bi-info-circle"></i>

                        </div>

                        <div class="item_price">€ ${element.price}</div>

                    </div>

                </div>

                </div>
                `
            })
            antipastiVal.forEach((element, index) => {
                return antipastiHold += !element.disabled ? `
                <div class="slideWraper carousel-cell">
                <div class="itemWrapper">

                    <div class="itemWrapTop" id=${element._id} onclick='getInfo(this.id)'>
                    <h1>${element.title}</h1>

                    <div class="itemImgWrap">
                        <img src=${'https://menu-save.herokuapp.com/' + element.image} class="img-fluid">
                    </div>
                    </div>

                    <div class="item_btm">

                        <div class="item_info" data-bs-toggle="modal" data-bs-target="#allergens">

                            <i class="bi bi-info-circle"></i>

                        </div>

                        <div class="item_price">€ ${element.price}</div>

                    </div>

                </div>

                </div>
                ` :
                    `
                <div class="slideWraper carousel-cell">
                <div class="itemWrapper fordis">

                    <div class="itemWrapTop" id=${element._id}>
                    <h1>${element.title}</h1>
                    <div class="itemImgWrap">
                        <img src=${'https://menu-save.herokuapp.com/' + element.image} class="img-fluid">
                    </div>
                    </div>

                    <div class="item_btm">

                        <div class="item_info" data-bs-toggle="modal" data-bs-target="#allergens">

                            <i class="bi bi-info-circle"></i>

                        </div>

                        <div class="item_price">€ ${element.price}</div>

                    </div>

                </div>

                </div>
                `
            })
            pastaVal.forEach((element, index) => {
                return pastaHold += !element.disabled ? `
                <div class="slideWraper carousel-cell">
                <div class="itemWrapper">

                    <div class="itemWrapTop" id=${element._id} onclick='getInfo(this.id)'>
                    <h1>${element.title}</h1>

                    <div class="itemImgWrap">
                        <img src=${'https://menu-save.herokuapp.com/' + element.image} class="img-fluid">
                    </div>
                    </div>

                    <div class="item_btm">

                        <div class="item_info" data-bs-toggle="modal" data-bs-target="#allergens">

                            <i class="bi bi-info-circle"></i>

                        </div>

                        <div class="item_price">€ ${element.price}</div>

                    </div>

                </div>

                </div>
                ` :
                    `
                <div class="slideWraper carousel-cell">
                <div class="itemWrapper fordis">

                    <div class="itemWrapTop" id=${element._id}>
                    <h1>${element.title}</h1>
                    <div class="itemImgWrap">
                        <img src=${'https://menu-save.herokuapp.com/' + element.image} class="img-fluid">
                    </div>
                    </div>

                    <div class="item_btm">

                        <div class="item_info" data-bs-toggle="modal" data-bs-target="#allergens">

                            <i class="bi bi-info-circle"></i>

                        </div>

                        <div class="item_price">€ ${element.price}</div>

                    </div>

                </div>

                </div>
                `
            })
            drinkVal.forEach((element, index) => {
                return drinkHold += !element.disabled ? `
                <div class="slideWraper carousel-cell">
                <div class="itemWrapper">

                    <div class="itemWrapTop" id=${element._id} onclick='getInfo(this.id)'>
                    <h1>${element.title}</h1>

                    <div class="itemImgWrap">
                        <img src=${'https://menu-save.herokuapp.com/' + element.image} class="img-fluid">
                    </div>
                    </div>

                    <div class="item_btm">

                        <div class="item_info" data-bs-toggle="modal" data-bs-target="#allergens">

                            <i class="bi bi-info-circle"></i>

                        </div>

                        <div class="item_price">€ ${element.price}</div>

                    </div>

                </div>

                </div>
                ` :
                    `
                <div class="slideWraper carousel-cell">
                <div class="itemWrapper fordis">

                    <div class="itemWrapTop" id=${element._id}>
                    <h1>${element.title}</h1>
                    <div class="itemImgWrap">
                        <img src=${'https://menu-save.herokuapp.com/' + element.image} class="img-fluid">
                    </div>
                    </div>

                    <div class="item_btm">

                        <div class="item_info" data-bs-toggle="modal" data-bs-target="#allergens">

                            <i class="bi bi-info-circle"></i>

                        </div>

                        <div class="item_price">€ ${element.price}</div>

                    </div>

                </div>

                </div>
                `
            })

            let singleItemHolder = ''
            json.forEach((element, index) => {
                singleItemHolder += !element.disabled ? `
                <div class="slideWraper carousel-cell">
                <div class="itemWrapper">

                    <div class="itemWrapTop" id=${element._id} onclick='getInfo(this.id)'>
                    <h1>${element.title}</h1>

                    <div class="itemImgWrap">
                        <img src=${'https://menu-save.herokuapp.com/' + element.image} class="img-fluid">
                    </div>
                    </div>

                    <div class="item_btm">

                        <div class="item_info" data-bs-toggle="modal" data-bs-target="#allergens">

                            <i class="bi bi-info-circle"></i>

                        </div>

                        <div class="item_price">€ ${element.price}</div>

                    </div>

                </div>

                </div>
                ` :
                    `
                <div class="slideWraper carousel-cell">
                <div class="itemWrapper fordis">

                    <div class="itemWrapTop" id=${element._id}>
                    <h1>${element.title}</h1>
                    <div class="itemImgWrap">
                        <img src=${'https://menu-save.herokuapp.com/' + element.image} class="img-fluid">
                    </div>
                    </div>

                    <div class="item_btm">

                        <div class="item_info" data-bs-toggle="modal" data-bs-target="#allergens">

                            <i class="bi bi-info-circle"></i>

                        </div>

                        <div class="item_price">€ ${element.price}</div>

                    </div>

                </div>

                </div>
                `
            });



            sliderItem1.innerHTML = singleItemHolder
            sliderItem3.innerHTML = antipastiHold
            sliderItem4.innerHTML = pastaHold
            sliderItem5.innerHTML = pinsaHold
            sliderItem6.innerHTML = risottoHold
            sliderItem7.innerHTML = insalateHold
            sliderItem8.innerHTML = kidsHold
            sliderItem10.innerHTML = drinkHold





            // 2 random array value 
            const items11 = json;
            let newItems = [];

            for (let i = 0; i < 2; i++) {
                const idx = Math.floor(Math.random() * items11.length);
                newItems.push(items11[idx]);
                items11.splice(idx, 1);
            }
            let newItemHold = ''
            newItems.forEach((element) => {
                newItemHold += `
                <div class="slideWraper newRandom" id=${element._id} data-bs-dismiss="modal">
                <div class="itemWrapper">

                    <div class="itemWrapTop" id=${element._id} onclick='getInfo(this.id)'>
                    <h1>${element.title}</h1>

                    <img src=${'https://menu-save.herokuapp.com/' + element.image} class="img-fluid">
                    </div>

                    <div class="item_btm">

                        <div class="item_info" data-bs-toggle="modal" data-bs-target="#allergens">

                            <i class="bi bi-info-circle"></i>

                        </div>

                        <div class="item_price">€ ${element.price}</div>

                    </div> 
                </div>

                </div>
                `
            })
            const suggestItems = document.querySelector(".suggestItems")
            suggestItems.innerHTML = newItemHold



            console.log(json);


            $('.main-carousel').flickity({
                cellAlign: 'left',
                contain: true,
                freeScroll: true,
                prevNextButtons: false,
                pageDots: false
            });

            $('.news-carousel').flickity({
                cellAlign: 'left',
                contain: true,
                prevNextButtons: false,
                pageDots: false
            });
            $('.header-carousel').flickity({
                cellAlign: 'left',
                contain: true,
                prevNextButtons: false,
                pageDots: false,
                autoPlay: 3500,
                pauseAutoPlayOnHover: false
            });
        });
} catch (error) {
    console.log(error);
}
function thankmodaldismiss() {
    $("#choiceModal").modal('hide')
}





let initialquantity = 1
function getInfo(get) {
    try {
        fetch('https://menu-save.herokuapp.com/api/loadSingle', {
            method: 'POST',
            body: JSON.stringify({
                id: get
            }),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(json => {
                modalimg1.setAttribute('src', `https://menu-save.herokuapp.com/${json.image}`)
                mdltitle.innerHTML = json.title
                catCon.innerHTML = json.category
                prCon.innerHTML = json.price
                counter.value = 1
                modaldesc.innerHTML = json.desc
                let ingValStore = ''
                const ingVal = json.ingredients && json.ingredients.forEach((val, ind) => {
                    return ingValStore += `
                                <li>
                                    <label for="ingredients11">${val}</label>
                                    <span><i class="fa-solid fa-plus"></i></span>
                                </li>
                            `
                })
                ingHead.innerHTML = ingValStore && "INGREDIENTS"
                ingCheck.innerHTML = ingValStore && ingValStore




                let exValStore = ''
                const exVal = json.extras && json.extras.forEach((val, ind) => {
                    return exValStore += `
                                <li>
                                    <label for="check8">${val}</label>
                                    <span><i class="fa-solid fa-plus"></i></span>
                                </li>
                            `
                })
                exHead.innerHTML = exValStore && "EXTRAS"
                exCheck.innerHTML = exValStore && exValStore

                ingValStore || exValStore ? accordionButton.style = "display: flex" : accordionButton.style = "display: none"

                $("#orderModal").modal('show')
                loadNew()





            });
    } catch (error) {
        console.log(err);
    }
}

function showAllergen() {
    // $("#orderModal").modal('hide')
    orderModal.classList.add("active")
    $("#allergens").modal('show')
}
$('#allergens').on('hide.bs.modal', function () {
    orderModal.classList.remove("active")
});
$('#orderModal').on('hidden.bs.modal', function () {
    const collapse = document.querySelector(".collapse")
    collapse.classList.remove("show")
    accordionButton.classList.add("collapsed")
});
let standSpan = document.querySelectorAll(".standList li span")
for (let e = 0; e < standSpan.length; e++) {
    const element = standSpan[e];
    element.addEventListener("click", () => {
        element.classList.toggle("active")
    })
}
function loadNew() {
    const elementPro = document.querySelectorAll(".accordion-body ul li span")
    for (let e = 0; e < elementPro.length; e++) {
        const element = elementPro[e];
        element.addEventListener("click", () => {
            element.classList.toggle("active")
        })
    }
}








btninc.addEventListener('click', () => {
    const finVal = ++initialquantity
    counter.value = finVal
})
btndec.addEventListener('click', () => {
    const finVal = counter.value > 1 ? --initialquantity : 1
    counter.value = finVal
})




btncart.addEventListener('click', () => {
    if (selectedTable?.username) {
        try {
            fetch('https://menu-save.herokuapp.com/api/order', {
                method: 'POST',
                body: JSON.stringify({
                    username: selectedTable.username,
                    title: mdltitle.innerHTML,
                    category: catCon.innerHTML,
                    quantity: initialquantity,
                    price: prCon.innerHTML
                }),
                headers: {
                    'content-type': 'application/json'
                }
            })
                .then(response => response.json())
                .then((json) => {
                    console.log(json);
                    initialquantity = 1
                    $("#choiceModal").modal('show')
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
                });
        } catch (error) {
            console.log(error);
        }
    } else {
        window.alert('Join or create a table first')
    }
})


choiceGoOrder.addEventListener("click", () => {
    window.location = '/order.html'
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



const randomPick = () => {
    try {
        fetch("https://menu-save.herokuapp.com/api/")
            .then(response => response.json())
            .then(json => {
                const random = Math.floor(Math.random() * json.length);
                const storeRandom = json[random]
                modalimg1.setAttribute('src', `https://menu-save.herokuapp.com/${storeRandom.image}`)
                mdltitle.innerHTML = storeRandom.title
                catCon.innerHTML = storeRandom.category
                prCon.innerHTML = storeRandom.price
                counter.value = 1
                modaldesc.innerHTML = storeRandom.desc
                let ingValStore = ''
                const ingVal = storeRandom.ingredients && storeRandom.ingredients.forEach((val, ind) => {
                    return ingValStore += `
                                <li>
                                    <label for="ingredients11">${val}</label>
                                    <input type="checkbox">
                                </li>
                            `
                })
                ingHead.innerHTML = ingValStore && "INGREDIENTS"

                ingCheck.innerHTML = ingValStore && ingValStore
                let exValStore = ''
                const exVal = storeRandom.extras && storeRandom.extras.forEach((val, ind) => {
                    return exValStore += `
                                <li>
                                    <label for="check8">${val}</label>
                                    <input type="checkbox">
                                </li>
                            `
                })
                exHead.innerHTML = exValStore && "EXTRAS"

                exCheck.innerHTML = exValStore && exValStore
                $("#orderModal").modal('show')

            })
    } catch (error) {
        console.log(error);
    }
}




