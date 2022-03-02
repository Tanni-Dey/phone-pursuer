const searchInput = document.getElementById('search-input');//search input id
const allCard = document.getElementById('all-card');//all cards id

//display sppiner function
const displaySppiner = style => document.getElementById('spinner').style.display = style

//load data function
const loadPhone = () => {
    displaySppiner('block')
    const searchText = searchInput.value;
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhone(data.data))
    searchInput.value = ''
}

//error display function
const errorDisplay = (style, border) => {
    document.getElementById('phone-empty-error').style.display = style
    searchInput.style.border = border
}

//all div show
const showPhoneCard = (image, name, brand, slug) => {
    const div = document.createElement('div');
    div.classList.add('card')
    div.classList.add('p-4')
    div.classList.add('col-md-4')
    div.innerHTML = `<img src="${image}" width: "10em" class="card-img-fluid mx-auto" alt="...">
    <div class="card-body">
      <h5 class="card-title">${name}</h5>
      <p class="card-text">Brand : ${brand}</p>
      <button onclick="loadSinglePhone('${slug}')" class="btn btn-warning">Phone Details</button>
    </div>`
    allCard.appendChild(div);
}

//All search result
const displayPhone = AllData => {
    allCard.textContent = ''
    document.getElementById('single-card').textContent = ''
    //result not fond error message
    if (AllData.length === 0) {
        errorDisplay('block', '1px solid red')
        displaySppiner('none')
    }
    else {
        AllData.forEach(data => {
            //only 20 phone display
            if (AllData.indexOf(data) < 20) {
                showPhoneCard(data.image, data.phone_name, data.brand, data.slug);
                errorDisplay('none', '1px solid gainsboro')
                document.getElementById('see-all-btn').style.display = 'block'
            }
            else {
                document.getElementById('see-all-btn').addEventListener('click', function () {
                    showPhoneCard(data.image, data.phone_name, data.brand, data.slug);
                    document.getElementById('see-all-btn').style.display = 'none'

                })
            }
            displaySppiner('none')
        });
    }
}

//load single phone details
const loadSinglePhone = slug => {
    const url = `https://openapi.programming-hero.com/api/phone/${slug}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displaySinglePhone(data.data))
}

//display single phone details
const displaySinglePhone = data => {
    const singleCard = document.getElementById('single-card')
    singleCard.textContent = ''
    const div = document.createElement('div');
    div.classList.add('card')
    div.classList.add('p-4')
    div.innerHTML = `<img src="${data.image}" width="300em" class="card-img-fluid mx-auto" alt="...">
            <div class="card-body">
              <h4 class="card-title">${data.name}</h4>
              <h5 class="card-text">Brand : ${data.brand}</h5>
             <p> <strong>Chip Set : </strong> ${data.mainFeatures.chipSet}</p>
             <p><strong>Display Size  :</strong> ${data.mainFeatures.displaySize}</p>
             <p><strong>Memory :</strong> ${data.mainFeatures.memory}</p>
             <p><strong>Sensors :</strong> ${data.mainFeatures.sensors.filter(sData => sData)}</p>
             <p><strong>Storage  :</strong> ${data.mainFeatures.storage}</p>
             <p><strong>Others  :</strong> ${data?.others?.Bluetooth ? data?.others?.Bluetooth : ''} ${data?.others?.GPS ? data.others.GPS : ''} ${data?.others?.NFC ? data.others.NFC : ''} ${data?.others?.Radio ? data.others.Radio : ''} ${data?.others?.USB ? data.others.USB : ''} ${data?.others?.WLAN ? data.others.WLAN : ''}
                
             </p>
              <p>${data.releaseDate ? data.releaseDate : 'No Release Date Found'}</p>
            </div>`
    singleCard.appendChild(div);
}