function populateUFs() {
    const ufSelect = document.querySelector("select[name=UF]");

    const linkApiEstados = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome'


    fetch(linkApiEstados)
        .then(res => res.json())
        .then(states => {
            for (const positionStates of states) {
                ufSelect.innerHTML += `<option value="${positionStates.sigla}">${positionStates.nome}</option>`
            }

        })

}
populateUFs();

function getCities(event) {

    const selectInput = document.querySelector('input[name=state]')

    const selectInputId = event.target.selectedIndex;

    console.log(selectInput);

    selectInput.value = event.target.options[selectInputId].text;

    const ufValue = event.target.value;

    
    function cityValueAttr(){
    const citySelect = document.querySelector('select[name=city]');

    const linkApiMunincipios = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

    citySelect.innerHTML = `<option value="">Selecione a Cidade</option>`;
    citySelect.disable = true;


    fetch(linkApiMunincipios).then(res => res.json()).then(cities => {

        for (const positionCities of cities) {
            citySelect.innerHTML += `<option value ="${positionCities.nome}">${positionCities.nome}</option>`
        }

        citySelect.disabled = false;

    })
}
    cityValueAttr();
    
    

}

document
    .querySelector("select[name=UF")
    .addEventListener("change", getCities);

// Itens de coleta

const itemsToCollect = document.querySelectorAll('.items-grid li')
for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItems)
}

const collectItems = document.querySelector("input[name=item]");
let selectedItems = [];

function handleSelectedItems(event) {
    const itemLi = event.target

    itemLi.classList.toggle("selected");

    const itemId = itemLi.dataset.id;

    const alreadySelect = selectedItems.findIndex(item => {

        const itemFound = item == itemId;
        return itemFound;
    })

    if (alreadySelect >= 0) {
        const filteredItems = selectedItems.filter(item => {

            const itensIsDiferrent = item != itemId;
            return itensIsDiferrent;

        });
        selectedItems = filteredItems;

    } else {

        selectedItems.push(itemId);

    }
    console.log(selectedItems);
    collectItems.value = selectedItems;
    console.log(collectItems);

}