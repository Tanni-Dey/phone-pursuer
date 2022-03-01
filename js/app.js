const searchInput = document.getElementById('search-input');
const loadPhone = () => {
    const searchText = searchInput.value;
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhone(data))
    searchInput.value = ''
}
const displayPhone = AllData => {
    console.log(AllData)
    if (AllData.status === false) {
        document.getElementById('phone-empty-error').style.display = 'block'
        searchInput.style.border = '1px solid red'
    }
}