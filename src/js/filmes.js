export async function getFilmes() {
    const url = 'http://localhost:8080/V2/ACMEFilmes/filmes'
    const response=await fetch(url)
    const data=await response.json()
    
    return data.filmes
}
export async function getFilme(id) {
    const url =`http://localhost:8080/V2/ACMEFilmes/filme/${id}`
    const response=await fetch(url)
    const data= await response.json()
    return data.filme[0]
}
export async function getFilmeFiltro(filtro) {
    const url =`http://localhost:8080/V2/ACMEFilmes/filmes/filtro?nome=${filtro}`
    const response=await fetch(url)
    const data= await response.json()
    return data.filme
}

export async function postFilme(filme) {
    const url='http://localhost:8080/V2/ACMEFilmes/filme'
    const options={
        method:'POST',
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify(filme)
    }
    const response=await fetch(url,options)
    return response.ok
}

export async function putFilme(filme,id) {
    const url=`http://localhost:8080/V2/ACMEFilmes/filme/${id}`
    const options={
        method:'PUT',
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify(filme)
    }
    console.log(filme);
    const response=await fetch(url,options)
    console.log(response);
    console.log(response.ok);
    return response.ok
}
export async function deleteFilme(id) {
    const url=`http://localhost:8080/V2/ACMEFilmes/filme/${id}`
    const options={
        method:'DELETE'
    }
    const response=await fetch(url,options)
    return response.ok
}