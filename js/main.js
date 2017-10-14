
//receber valor inputado pela barra de texto
(function (){
    
    $('#user').on('keyup', function(e){
        let username = e.target.value;
        
//realizar o request para o github
$.ajax({
    url:'https://api.github.com/users/'+username,
    data:{
        client_id:'1dc65264b4cd3aada7ee',
        client_secret:'891c7f6a077a55aa76f80c8ec09b94d908fe967c'
    }
    
})
    //nome e avatar do usuário
.done(function(user){
$.ajax({
    url:'https://api.github.com/users/'+username+'/starred',
    data:{
        client_id:'1dc65264b4cd3aada7ee',
        client_secret:'891c7f6a077a55aa76f80c8ec09b94d908fe967c',
    }
        
})
    //exibir array com repositórios que o usuário deu star 
.done(function(repos){

    $("input[name=filter]").change(function (){//recer o parâmetro "value" dos radios
        var radios = ($(this).attr("value"));

    if(radios =="name"){//provávelmente essa não é a melhor foram de fazer isso, mas foi a unica que der certo

        /*eu compreendo que json é nada mais que um array, logo, eu crio um método sort para ordenar ele, mas, o grande problema aqui
        é que eu não consigo setar o valor de um radio na variável e ler ela nesse método sort. Se eu conseguir isso, da pra reduzir 
        esse código */
        
        repos.sort(function(a,b) {
        return a.name < b.name ? 1 : a.name > b.name ? -1 : 0;
  })
    }
    if(radios =="stargazers_count"){

        repos.sort(function(a,b) {
        return a.stargazers_count < b.stargazers_count ? 1 : a.stargazers_count > b.stargazers_count ? -1 : 0;
  })     
    }
    if(radios =="open_issues_count"){

        repos.sort(function(a,b) {
        return a.open_issues_count < b.open_issues_count ? 1 : a.open_issues_count > b.open_issues_count ? -1 : 0;
  })
    }
        
     $("#repos").empty() //método para apagar os dados obtidos préviamente
    
        $.each(repos, function(index, repo){ //função para receber os dados do array e gravar no html
               
            $("#repos").append(`

<ul id="cards">
<div class="infos">
<li ><label class="label">Name: ${repo.name}</label></li>
<li ><label class="label">Owner/Repo: ${repo.full_name}</label></li>
<li ><label class="label">Stars: ${repo.stargazers_count}</label></li>
<li ><label class="label">Linguagem ${repo.language}</label></li>
<li ><label class="label">Open Issues ${repo.open_issues_count}</label></li>
<li ><a href="${repo.html_url}" target="parent"><button>Repo URL </button><a/></li>
</div>
</ul>
`)
    })//fim da função each
    })//fim da função para receber os métodos do array       
});//fim da função repo 
    
    $('#container').html(`
<img class="picture" src="${user.avatar_url}"></img>
<header id="profile">${user.name}</header>
<div id="repos"></div>
`)
    
    
  });//fim da função user        
 });//fim da função e
})();//fim da função mestre
