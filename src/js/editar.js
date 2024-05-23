'use strict'

const idFilme = localStorage.getItem('idFilme')

console.log(idFilme);

import { getFilmes, getFilme, getFilmeFiltro, postFilme, putFilme, deleteFilme } from './filmes.js'

const campoEdicao = document.getElementById('campoEdicao')

const confirmar=document.getElementById('botaoConfirmarECriar')
abrirFilme(idFilme)
async function abrirFilme(idFilme) {
const filmeAntigo = await getFilme(idFilme)
  console.log(filmeAntigo)
  const titulo = document.getElementById('tituloFilme')
  titulo.value=filmeAntigo.nome
  const descricao = document.getElementById('sinopse')
  descricao.value=filmeAntigo.sinopse
  const duracao = document.getElementById('tempoDuracao')
  duracao.value=filmeAntigo.duracao.substring(11, 19)
  const dataLancamento = document.getElementById('dataLancamento')
dataLancamento.value = filmeAntigo.data_lancamento.substring(0, 10)    
  const dataRelancamento = document.getElementById('dataRelancamento')
  if (filmeAntigo.dataRelancamento) {
    dataRelancamento.value = filmeAntigo.data_lancamento
  }
  const foto_capa = document.getElementById('fotoCapa')
  foto_capa.value = filmeAntigo.foto_capa
  const valor_unitario = document.getElementById('valorUnitario')
  valor_unitario.value=filmeAntigo.valor_unitario.toFixed(2).replace('.', ',')
  const classificacao = document.getElementById('idClassificacao')
  classificacao.value=filmeAntigo.id_classificacao
}

confirmar.addEventListener('click', ()=> editarFilme(idFilme))
async function editarFilme(id) {
  const titulo = document.getElementById('tituloFilme').value
  const descricao = document.getElementById('sinopse').value
  const duracao = document.getElementById('tempoDuracao').value
  const dataLancamento = document.getElementById('dataLancamento').value
  const dataRelancamento = document.getElementById('dataRelancamento').value
  const foto_capa = document.getElementById('fotoCapa').value
  const valor_unitario = document.getElementById('valorUnitario').value
  const classificacao = document.getElementById('idClassificacao').value
  const genero = document.getElementById('idGenero')
  const optionSelecionado = `${genero.selectedIndex}`

  const novosDados = {
    nome: titulo,
    sinopse: descricao,
    duracao: duracao,
    data_lancamento: dataLancamento,
    data_relancamento: null,
    foto_capa: foto_capa,
    valor_unitario: valor_unitario,
    id_classificacao: classificacao,
    id_genero: optionSelecionado
    // idUsuario: idPerfil
  }
  if (novosDados) {
    let status=putFilme(novosDados,id)
    if (status) {
      alert('Item Editado com sucesso')
      window.location.href = './home.html'
      console.log(novosDados)
    }
    else{
      alert('Não foi possivel criar o item')
      window.location.href = './home.html'
    }
}
}
function fecharcampoEdicao() {
    window.location.href = './home.html'
}
const fecharCampo = document.getElementById('fecharcampoEdicao')
fecharCampo.addEventListener('click', fecharcampoEdicao)

