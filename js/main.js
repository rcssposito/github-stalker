
//receber valor inputado
(function (){
    $('#user').on('focusout', function(e){
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
   
    $("input[name=filter]:radio").on('click', function (filter){
        let radios = filter.target.value;
         console.log(radios);
     })
 
    repos.sort(function(a,b) {
    return a.radios < b.radios ? 1 : a.radios > b.radios ? -1 : 0;

});   
  
      
    $.each(repos, function(index, repo){
       $("#repos").append(`
<div>
<label>${repo.name}</label>
<label>${repo.full_name}</label>
<label>Stars: ${repo.stargazers_count}</label>
<label>Linguagem ${repo.language}</label>
<label>Open Issues ${repo.open_issues_count}</label>
<a href="${repo.html_url}"><button>Repo URL </button><a/>
</div>
`)
    })
});//fim da função repo 
    
    $('#container').html(`
<img class="picture" src="${user.avatar_url}"></img>
<header id="profile">${user.name}</header>
<div id="repos"></div>
`)
    
    
  });//fim da função user        
 });//fim da função e
})();//fim da função mestre
