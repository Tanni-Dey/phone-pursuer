const searchInput = document.getElementById('search-input');
//load data function
const loadPhone = () => {
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
    console.log(AllData)
    const allCard = document.getElementById('all-card');
    allCard.textContent = ''
    //result not fond error message
    if (AllData.length === 0) {
        errorDisplay('block', '1px solid red')
    }
    else {
        AllData.forEach(data => {
            console.log(data)
            const div = document.createElement('div');
            div.classList.add('card')
            div.classList.add('p-4')
            div.classList.add('col-md-4')
            div.innerHTML = `<img src="${data.image}" class="card-img-fluid" alt="...">
            <div class="card-body">
              <h5 class="card-title">${data.phone_name}</h5>
              <p class="card-text">Brand : ${data.brand}</p>
              <a href="#" class="btn btn-warning">Phone Details</a>
            </div>`
            allCard.appendChild(div);
            errorDisplay('none', '1px solid gainsboro')
        });
    }
}