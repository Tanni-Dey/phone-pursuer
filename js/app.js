const searchInput = document.getElementById('search-input');

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

//All search result
const displayPhone = AllData => {
    //console.log(AllData)
    const allCard = document.getElementById('all-card');
    allCard.textContent = ''
    document.getElementById('single-card').textContent = ''
    //result not fond error message
    if (AllData.length === 0) {
        errorDisplay('block', '1px solid red')
        displaySppiner('none')
    }
    else {
        AllData.forEach(data => {
            // console.log(data)
            //only 20 phone display
            if (AllData.indexOf(data) < 20) {
                const div = document.createElement('div');
                div.classList.add('card')
                div.classList.add('p-4')
                div.classList.add('col-md-4')
                div.innerHTML = `<img src="${data.image}" width: "10em" class="card-img-fluid mx-auto" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${data.phone_name}</h5>
                  <p class="card-text">Brand : ${data.brand}</p>
                  <button onclick="loadSinglePhone('${data.slug}')" class="btn btn-warning">Phone Details</button>
                </div>`
                allCard.appendChild(div);
                errorDisplay('none', '1px solid gainsboro')
                //document.getElementById('see-all-btn').style.display = 'block'
            }
            displaySppiner('none')
        });
    }
}
// single phone details
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