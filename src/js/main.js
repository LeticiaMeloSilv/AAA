'use strict'
import { getFilmes, getFilme, getFilmeFiltro, postFilme, putFilme, deleteFilme } from './filmes.js'

// const idPerfil = localStorage.getItem('idusuario')
// console.log(idPerfil);
// if (!idPerfil) {
//     window.location.href = '../index.html'
// }

const search = new URLSearchParams(window.location.search).get('search')
const searchBar = document.getElementById('navegar')

async function pesquisar() {
  const pesquisarFilme = await getFilmeFiltro(searchBar.value)
  console.log(pesquisarFilme)
  const listaFilmes = pesquisarFilme
  apagarListaFilmes()

  listaFilmes.forEach(filme => {
    console.log(filme)
    criarCard(filme)
  })
}

searchBar.addEventListener('keypress', (event) => {
  if (event.key === "Enter") {
    pesquisar()
  }
})

function apagarListaFilmes() {
  while (container.firstChild) {
    container.removeChild(container.firstChild)
  }
}

const campoCriacaoEdicao = document.getElementById('campoCriacaoEdicao')

const botaoConfirmarECriar = document.getElementById('botaoConfirmarECriar')

const container = document.getElementById('container')
function criarCard(filme) {
  const card = document.createElement('div')
  card.classList.add('grid', 'grid-cols-10', 'col-span-10', 'p-1', 'm-1', 'rounded-full', 'bg-white')

  const status = document.createElement('img')
  status.classList.add('col-span-1', 'self-center', 'justify-self-center')
  status.src = '../img/elevacao.png'

  const id = document.createElement('h6')
  id.classList.add('col-span-1', 'self-center', 'justify-self-center')
  id.textContent = filme.id

  const titulo = document.createElement('h6')
  titulo.classList.add('col-span-4', 'self-center')
  titulo.textContent = filme.nome

  const preco = document.createElement('h6')
  preco.classList.add('col-span-2', 'self-center', 'justify-self-center')
  preco.textContent = `R$ ${filme.valor_unitario.toFixed(2).replace('.', ',')}`

  const btn_editar = document.createElement('img')
  btn_editar.classList.add('col-span-1', 'self-center', 'justify-self-center')
  btn_editar.src = '../img/editar.png'
  btn_editar.addEventListener('click', () => {
    localStorage.setItem('idFilme', filme.id)
    window.location.href = './editar.html'
  }
  )
  // btn_editar.addEventListener('click', () => abrirCampoEditar(filme.id));

  const btn_excluir = document.createElement('img')
  btn_excluir.classList.add('col-span-1', 'self-center', 'justify-self-center')
  btn_excluir.src = '../img/excluir.png'
  btn_excluir.addEventListener('click', async () => {
    var confirmado = confirm(`Deseja deletar o item?${filme.id}`);
    if (confirmado) {
      var certezaDeConfirmacao = confirm(`Tem certeza de que deseja deletar o item ${filme.id}? essa alteração é irreversivel`);
      if (certezaDeConfirmacao) {
        deleteFilme(filme.id)
        window.location.reload();
        alert('Item deletado com sucesso');
      } else {
        alert('Operação cancelada');
      }
    } else {
      alert('Operação cancelada');
    }
  })

  card.replaceChildren(status, id, titulo, preco, btn_editar, btn_excluir)

  container.appendChild(card)

  return container
}

let usuarioTemporario = {
  "usuarios": [
    {
      "id": 1,
      "foto": "../img/foto-perfil.png",
      "nome": "O Segredo do Vale",
      "status": "../img/adicionar.png"
    },
    {
      "id": 2,
      "foto": "../img/foto-perfil.png",
      "nome": "O Segredo do Vale",
      "status": "../img/editar.png"
    },
    {
      "id": 3,
      "foto": "../img/foto-perfil.png",
      "nome": "A origem do guardião",
      "status": "../img/adicionar.png"
    }
  ]
}

function criarCardUsuario(usuario, filme) {

  const div_atualizacao = document.getElementById('div_atualizacao')
  const header = document.getElementById('h1_atualizacao')

  const card = document.createElement('div')
  card.classList.add('flex', 'justify-between', 'items-center')

  const foto_perfil = document.createElement('img')
  foto_perfil.src = usuario.foto

  const titulo = document.createElement('h4')
  titulo.textContent = filme.nome

  const status = document.createElement('img')
  status.src = '../img/elevacao.png'

  card.replaceChildren(foto_perfil, titulo, status)

  div_atualizacao.replaceChildren(header, card)

  return div_atualizacao
}

async function preencherContainerFilme() {
  const container = document.querySelector('main')
  const filmes = await getFilmes()
  filmes.forEach(filme => {
    const main = criarCard(filme)
    container.appendChild(main)
  });
}

async function preencherContainerAtualizacoes() {
  const container = document.querySelector('main')
  const filmes = await getFilmes()

  const usuarios = usuarioTemporario
  filmes.forEach(filme => {
    const main = criarCardUsuario(usuarios, filme)
    container.appendChild(main)
  });

  //ainda não tem nenhuma função que manipula as atualizaçoes 
}
preencherContainerAtualizacoes()

preencherContainerFilme()

const btn_adicionar = document.getElementById('btn_adicionar')
btn_adicionar.addEventListener('click', abrirCampoCadastro)

async function abrirCampoCadastro() {
  campoCriacaoEdicao.classList.remove('hidden')
}
// async function abrirCampoEditar(idFilme) {
//   campoCriacaoEdicao.classList.remove('hidden')
//   abrirFilme(idFilme)
// }

async function adicionarFilme() {
  console.log('oi, estou aqui no adicionar filme');
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

  let novosDados = {
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
    let status = postFilme(novosDados)
    if (status) {
      alert('Item criado com sucesso')
      campoCriacaoEdicao.classList.add('hidden')
      console.log(novosDados)
    }
    else {
      alert('Não foi possivel criar o item')
      campoCriacaoEdicao.classList.add('hidden')
    }

  }
}

// async function abrirFilme(idFilme) {
//   const filmeAntigo = await getFilme(idFilme)
//   console.log(filmeAntigo)
//   const titulo = document.getElementById('tituloFilme')
//   titulo.value=filmeAntigo.nome
//   const descricao = document.getElementById('sinopse')
//   descricao.value=filmeAntigo.sinopse
//   const duracao = document.getElementById('tempoDuracao')
//   duracao.value=filmeAntigo.duracao
//   const dataLancamento = document.getElementById('dataLancamento')
//     dataLancamento.value = filmeAntigo.data_lancamento.substring(11, 19)    
//     console.log(filmeAntigo.data_lancamento.substring(11, 19) );
//   const dataRelancamento = document.getElementById('dataRelancamento')
//   if (filmeAntigo.dataRelancamento) {
//     dataRelancamento.value = filmeAntigo.data_lancamento
//   }
//   const foto_capa = document.getElementById('fotoCapa')
//   foto_capa.value = filmeAntigo.foto_capa
//   const valor_unitario = document.getElementById('valorUnitario')
//   valor_unitario.value=filmeAntigo.valor_unitario.toFixed(2).replace('.', ',')
//   const classificacao = document.getElementById('idClassificacao')
//   classificacao.value=filmeAntigo.id_classificacao

//   editarFilme(idFilme)
// }
// async function editarFilme(id) {
//   const titulo = document.getElementById('tituloFilme').value
//   const descricao = document.getElementById('sinopse').value
//   const duracao = document.getElementById('tempoDuracao').value
//   const dataLancamento = document.getElementById('dataLancamento').value
//   const dataRelancamento = document.getElementById('dataRelancamento').value
//   const foto_capa = document.getElementById('fotoCapa').value
//   const valor_unitario = document.getElementById('valorUnitario').value
//   const classificacao = document.getElementById('idClassificacao').value
//   const genero = document.getElementById('idGenero')
//   const optionSelecionado = `${genero.selectedIndex}`

//   const novosDados = {
//     nome: titulo,
//     sinopse: descricao,
//     duracao: duracao,
//     data_lancamento: dataLancamento,
//     data_relancamento: null,
//     foto_capa: foto_capa,
//     valor_unitario: valor_unitario,
//     id_classificacao: classificacao,
//     id_genero: optionSelecionado
//     // idUsuario: idPerfil
//   }
//   if (novosDados) {
//     let status=putFilme(novosDados,id)
//     if (status) {
//       alert('Item criado com sucesso')
//       campoCriacaoEdicao.classList.add('hidden')
//       console.log(novosDados)
//     }
//     else{
//       alert('Não foi possivel criar o item')
//       campoCriacaoEdicao.classList.add('hidden')
//     }
// }
// }
botaoConfirmarECriar.addEventListener('click', adicionarFilme)

function fecharcampoCriacaoEdicao() {
  campoCriacaoEdicao.classList.add('hidden')
}
const fecharCampo = document.getElementById('fecharcampoCriacaoEdicao')
fecharCampo.addEventListener('click', fecharcampoCriacaoEdicao)

