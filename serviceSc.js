const formShow = document.querySelector(".formShow")
const biSearch = document.querySelector(".bi-search")
const xMark = document.querySelector(".fa-xmark")
const thnkuModal = document.querySelector(".thnkuModal")




biSearch.addEventListener("click", ()=> {
    formShow.classList.add('active')
    thnkuModal.classList.add('active')
})
xMark.addEventListener("click", ()=> {
    formShow.classList.remove("active")
    thnkuModal.classList.remove("active")
})
