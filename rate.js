const ratePrices = document.querySelectorAll('.rate .price')
const rateNames = [...ratePrices].map(p => p.parentElement.parentElement.parentElement.querySelector('.name').innerText)
const rateModalText = document.querySelector('.modal .modal_t')
let lastRateName = ''

for (let [i, price] of ratePrices.entries()) {
    price.addEventListener('click', () => {
        setlastRateName(rateNames[i])
    })
}

function setlastRateName(name) {
    lastRateName = name
    rateModalText.innerHTML = "Оставьте заявку на тариф<br/><strong>" + lastRateName + "</strong><br/>и наш менеджер свяжется с вами"
}