const consultarCEP = async () => {
    const cep = document.getElementById('cepInput').value.trim();
    const resultado = document.getElementById('resultado');
    
    if (cep.length !== 8 || isNaN(cep)) {
        resultado.innerHTML = 'Por favor, insira um CEP válido com 8 dígitos.';
        return;
    }

    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        if (data.erro) {
            resultado.innerHTML = 'CEP não encontrado.';
        } else {
            resultado.innerHTML = `
                <strong>Logradouro:</strong> ${data.logradouro}<br>
                <strong>Bairro:</strong> ${data.bairro}<br>
                <strong>Cidade:</strong> ${data.localidade}<br>
                <strong>Estado:</strong> ${data.uf}
            `;
        }
    } catch (error) {
        resultado.innerHTML = 'Erro ao consultar o CEP. Tente novamente mais tarde.';
    }
};
