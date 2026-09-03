const input = document.getElementById('cepInput');
const btnBuscar = document.getElementById('btnBuscar');

// Máscara: formata para 00000-000 enquanto digita
input.addEventListener('input', function () {
  let valor = this.value.replace(/\D/g, '');

  if (valor.length > 5) {
    valor = valor.slice(0, 5) + '-' + valor.slice(5, 8);
  }

  this.value = valor;
});

// Evento do botão
btnBuscar.addEventListener('click', buscar);

async function buscar() {
  const cep = input.value.replace(/\D/g, '');
  const erro = document.getElementById('erro');
  const resultado = document.getElementById('resultado');

  // Validação básica
  if (cep.length !== 8) {
    erro.textContent = 'Digite um CEP válido com 8 dígitos.';
    resultado.style.display = 'none';
    return;
  }

  erro.textContent = '';

  // Chama a API
  const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
  const dados = await resposta.json();

  if (dados.erro) {
    erro.textContent = 'CEP não encontrado.';
    resultado.style.display = 'none';
    return;
  }

  // Preenche o resultado
  document.getElementById('cep').textContent = dados.cep;
  document.getElementById('logradouro').textContent = dados.logradouro || '—';
  document.getElementById('bairro').textContent = dados.bairro || '—';
  document.getElementById('cidade').textContent = dados.localidade;
  document.getElementById('estado').textContent = `${dados.estado} (${dados.uf})`;

  resultado.style.display = 'block';
}