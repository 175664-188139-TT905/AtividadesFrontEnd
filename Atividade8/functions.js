let url = "https://tt905-175664-188139.herokuapp.com/gameslib/"
let url2 = "https://tt905-175664-188139.herokuapp.com/database/"

async function callFetchWithGet(){
    let headers = new Headers();
    const options = {
        method : 'GET',
        mode: 'cors',
        headers: headers
    }
    const output = document.getElementById("json");
    const response = await fetch(url, options);
    const response = await fetch(url2, options);

    if (response.status >= 200 && response.status <= 300){
        console.log("Funcionou");
        output.innerHTML = await response.text();
    } else {
        console.log("Deu errado");
    }
}

async function callFetchWithPost(name, genero, producer){
    const options = {
        method : 'POST',
        mode: 'cors',
        headers: {
            'Accept' : 'application/json',
            'content-type' : 'application/json'
        },
        body :JSON.stringify({
            "game":{
                "Nome": name,
                "Genero": genero,
                "Produtora": producer}
        })
    }
    await fetch(url, options);
    await fetch(url2, options);
}

async function callFetchWithPut(id, name, genero, producer){
    const options = {
        method : 'PUT',
        mode: 'cors',
        headers: {
            'Accept' : 'application/json',
            'content-type' : 'application/json'            
        }, 
        body :JSON.stringify({
            "game":{
                "Nome": name,
                "Genero": genero,
                "Produtora": producer}
        })
    }
    await fetch(`${url}${id}`, options);
    await fetch(`${url2}${id}`, options);
}

async function callFetchWithDelete(id){
    const options = {
        method : 'DELETE',
        mode: 'cors',
        headers: {
            'Accept' : 'application/json',
            'content-type' : 'application/json' 
        }
    }
    await fetch(`${url}${id}`, options);
    await fetch(`${url2}${id}`, options);
}

/*
    Formulários
*/

function submitPost(){
    console.log("entrei na função");
    
    const form = document.forms['postForm'];    
    const Nome = form["namegame"].value;
    const Genero = form["generogame"].value;
    const Produtora = form["producergame"].value;
    if((Nome != '') && (Genero != '') && (Produtora != '')){
        callFetchWithPost(Nome, Genero, Produtora);}
        else{ alert('Preencha todos os campos!!!');}

    return false; // Evitar o reload da tela.
}

function submitPut(){
    const form = document.forms['putForm'];  
    const id = form["id"].value;  
    const Nome = form["namegame"].value;
    const Genero = form["generogame"].value;
    const Produtora = form["producergame"].value;
    if((id != '') && (Nome != '') && (Genero != '') && (Produtora != '')){
        callFetchWithPut(id, Nome, Genero, Produtora);}
        else{ alert('Preencha todos os campos!!!');}
    return false; // Evitar o reload da tela.
}

function submitDelete(){
    const form = document.forms['deleteForm'];  
    const id = form["id"].value;  
    callFetchWithDelete(id);
    return false; // Evitar o reload da tela.
}