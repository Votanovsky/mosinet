function ratesInit() {
    let ratePrices = document.querySelectorAll('.rate .price');
    let rateNames = [...ratePrices].map(p => p.parentElement.parentElement.parentElement.querySelector('.name').innerText);
    let rateModalText = document.querySelector('.modal .modal_t');
    window.lastRateName = '';

    for (let [i, price] of ratePrices.entries()) {
        price.addEventListener('click', () => {
            setlastRateName(rateNames[i]);
        })
    }

    function setlastRateName(name) {
        window.lastRateName = name;
        rateModalText.innerHTML = "Оставьте заявку на тариф<br/><strong>" + window.lastRateName + "</strong><br/>и наш менеджер свяжется с вами";
    }
}