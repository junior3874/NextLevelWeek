const myHeaders = new Headers();


myHeaders.append('Content-Type', 'Access-Control-Allow-Origin: *');




const cep = document.querySelector("input[name=cep]");
cep.onkeyup = () => {

    cep.value = cep.value.replaceAll(/-/g, "");

    console.log(cep.value);

    if (cep.value.length === 8) {




        let urlApiForCep = `https://viacep.com.br/ws/${cep.value}/json/`;

        fetch(urlApiForCep)
            .then(response => {

                const contentType = response.headers.get('Content-Type');
                if (!contentType || !contentType.includes('application/json')) {
                    throw new TypeError("Oops, we haven't got JSON!");
                }
                return response.json();
            })
            .then(dadosForCep => {
                console.log(dadosForCep);
                const streetForCep = document.querySelector('input[name=address]');
                streetForCep.value = dadosForCep.logradouro;

                const stateForCep = document.querySelectorAll('select[name=UF] option');
                for (states of stateForCep) {

                    if (states.value === dadosForCep.uf) {
                        const selectStateForCep = document.querySelector('select[name=UF]');

                        selectStateForCep.selectedIndex = states.index;


                        const citySelect = document.querySelector('select[name=city]');


                        const linkApiMunincipios = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${dadosForCep.uf}/municipios`;
                        fetch(linkApiMunincipios).then(res => res.json()).then(cities => {



                            for (const positionCities of cities) {
                                citySelect.innerHTML += `<option value ="${positionCities.nome}">${positionCities.nome}</option>`

                            }
                            const cityOptionSelect = document.querySelectorAll('select[name=city] option')
                            for (indexCity of cityOptionSelect) {
                                if (indexCity.value === dadosForCep.localidade) {
                                    citySelect.selectedIndex = indexCity.index;
                                }
                            }


                            citySelect.disabled = false;
                        })

                    }
                }

            })
            .catch(error => console.error("Errão bunito" + error));
        //     fetch(urlApiForCep).then(res => res.json()).then(dadosForCep => {

    }
}