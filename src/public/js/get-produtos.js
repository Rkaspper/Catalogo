const divProdutos = document.querySelector('#produtos')

const divCategoria = document.querySelector('#categoria')

const inputElement = document.querySelector('#search-input')

const typeElement = document.querySelector('#search-type')

//const buttonElement = document.querySelector('#search-button')

inputElement.addEventListener('input', (e) => {
  const result = e.target.value.toUpperCase() 
  const type = typeElement.value
  pesquisaProdutos(result, type)
})

//async function searchItens(){
//  const result = inputElement.value.toUpperCase() 
//  const type = typeElement.value
//  pesquisaProdutos(result, type)
//}

async function pesquisaProdutos (result, type) {
  if (type == '') {
    const retorno = await fetch('http://localhost:8000/api/products/categoria/' + result, {
      headers: {"Acess-Control-Allow-Origin": "*"}
    })
    const produtos = await retorno.json()
    preencheTela(produtos)   
  } else {
    if (result == ''){ 
      const retorno = await fetch('http://localhost:8000/api/products')
      const produtos = await retorno.json()
      preencheTela(produtos) 
    } else {
      const retorno = await fetch('http://localhost:8000/api/products/' + type + '/' + result)
      const produtos = await retorno.json()
      preencheTela(produtos)
    }
  }  
}

async function pesquisaProdutoUni (result) {
  const retorno = await fetch('http://localhost:8000/api/products/codigo/' + result)
  const produto = await retorno.json()
  preencheTelaUni(produto) 
}

async function listaCategorias () {
  const retorno = await fetch('http://localhost:8000/api/products/categorias')
  const categorias = await retorno.json()
  preencheCategorias(categorias)
}


function preencheTela (produto) {
  divProdutos.innerHTML = ''

  produto.forEach(produto => {
    
  
    const novoProdutoHTML = `
        <div class="card style="width: 18rem;"> 
          <!-- Product image-->
          <img class="card-img-top" src=${produto.imagem} alt="Image" height="250" />
          <!-- Product details-->
          <div class="card-body p-4">
              <div class="text-center">
                  <!-- Product name-->
                  <h5 class="fw-bolder">${produto.codigo}</h5>
                  <!-- Product price-->
                  ${produto.mini_descricao}
              </div>
          </div>
          <!-- Product actions-->
          <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
              <div class="text-center">
                 <a class="btn btn-primary" href="#" onclick="getProdUni('${produto.codigo}')" id="codigo">Detalhe</a>
                 <script>
                 $("#codigo").attr("src", video);
                 </script>
              </div>
              <!-- START Widget WhastApp hospedagemwordpresspro -->
              <a href="https://api.whatsapp.com/send?phone=5551980258026&text=Ola%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20do%20item%20${produto.codigo}" class="bt-whatsApp" target="_blank">
              <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pjxzdmcgdmlld0JveD0iMjYxOSA1MDYgMTIwIDEyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48c3R5bGU+CiAgICAgIC5jbHMtMSB7CiAgICAgICAgZmlsbDogIzI3ZDA0NTsKICAgICAgfQoKICAgICAgLmNscy0yLCAuY2xzLTUgewogICAgICAgIGZpbGw6IG5vbmU7CiAgICAgIH0KCiAgICAgIC5jbHMtMiB7CiAgICAgICAgc3Ryb2tlOiAjZmZmOwogICAgICAgIHN0cm9rZS13aWR0aDogNXB4OwogICAgICB9CgogICAgICAuY2xzLTMgewogICAgICAgIGZpbGw6ICNmZmY7CiAgICAgIH0KCiAgICAgIC5jbHMtNCB7CiAgICAgICAgc3Ryb2tlOiBub25lOwogICAgICB9CiAgICA8L3N0eWxlPjwvZGVmcz48ZyBkYXRhLW5hbWU9Ikdyb3VwIDM2IiBpZD0iR3JvdXBfMzYiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIzMDAgNzMpIj48Y2lyY2xlIGNsYXNzPSJjbHMtMSIgY3g9IjYwIiBjeT0iNjAiIGRhdGEtbmFtZT0iRWxsaXBzZSAxOCIgaWQ9IkVsbGlwc2VfMTgiIHI9IjYwIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzMTkgNDMzKSIvPjxnIGRhdGEtbmFtZT0iR3JvdXAgMzUiIGlkPSJHcm91cF8zNSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjU0IDM4NikiPjxnIGRhdGEtbmFtZT0iR3JvdXAgMzQiIGlkPSJHcm91cF8zNCI+PGcgY2xhc3M9ImNscy0yIiBkYXRhLW5hbWU9IkVsbGlwc2UgMTkiIGlkPSJFbGxpcHNlXzE5IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg5NCA3NSkiPjxjaXJjbGUgY2xhc3M9ImNscy00IiBjeD0iMzEuNSIgY3k9IjMxLjUiIHI9IjMxLjUiLz48Y2lyY2xlIGNsYXNzPSJjbHMtNSIgY3g9IjMxLjUiIGN5PSIzMS41IiByPSIyOSIvPjwvZz48cGF0aCBjbGFzcz0iY2xzLTMiIGQ9Ik0xNDI0LDE5MWwtNC42LDE2LjMsMTYuOS00LjcuOS01LjItMTEsMy41LDIuOS0xMC41WiIgZGF0YS1uYW1lPSJQYXRoIDEyNiIgaWQ9IlBhdGhfMTI2IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTMyNSAtNjgpIi8+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNMTI2Niw5MGMwLS4xLDMuNS0xMS43LDMuNS0xMS43bDguNCw3LjlaIiBkYXRhLW5hbWU9IlBhdGggMTI3IiBpZD0iUGF0aF8xMjciIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xMTY1IDQzKSIvPjwvZz48cGF0aCBjbGFzcz0iY2xzLTMiIGQ9Ik0xNDM5LjMsMTYwLjZhOS40LDkuNCwwLDAsMC0zLjksNi4xYy0uNSwzLjksMS45LDcuOSwxLjksNy45YTUwLjg3Niw1MC44NzYsMCwwLDAsOC42LDkuOCwzMC4xODEsMzAuMTgxLDAsMCwwLDkuNiw1LjEsMTEuMzc4LDExLjM3OCwwLDAsMCw2LjQuNiw5LjE2Nyw5LjE2NywwLDAsMCw0LjgtMy4yLDkuODUxLDkuODUxLDAsMCwwLC42LTIuMiw1Ljg2OCw1Ljg2OCwwLDAsMCwwLTJjLS4xLS43LTcuMy00LTgtMy44cy0xLjMsMS41LTIuMSwyLjYtMS4xLDEuNi0xLjksMS42LTQuMy0xLjQtNy42LTQuNGExNS44NzUsMTUuODc1LDAsMCwxLTQuMy02cy42LS43LDEuNC0xLjhhNS42NjQsNS42NjQsMCwwLDAsMS4zLTIuNGMwLS41LTIuOC03LjYtMy41LTcuOUExMS44NTIsMTEuODUyLDAsMCwwLDE0MzkuMywxNjAuNloiIGRhdGEtbmFtZT0iUGF0aCAxMjgiIGlkPSJQYXRoXzEyOCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTEzMjYuMzMyIC02OC40NjcpIi8+PC9nPjwvZz48L3N2Zz4=" alt="" width="60px">
              </a>
              <!-- END Widget WhastApp -->
          </div>
        </div>
       `

    divProdutos.innerHTML = divProdutos.innerHTML + novoProdutoHTML
  })
}

function preencheTelaUni (produto) {
  divProdutos.innerHTML = ''
  produto.forEach(produto => {
    const novoProdutoHTML = `
      <img class="card-img-top" src=${produto.imagem} alt="Card image cap" height="400" width="600">

      <div class="card-body">
        <h5 class="card-title">${produto.codigo}</h5>
        <button href="#" value=${produto.categoria} id="cate" onclick="getCateProds('${produto.categoria}')" >${produto.categoria}</button>
        <p class="card-text">${produto.descricao_completa}</p>
      </div>
    `

    divProdutos.innerHTML = divProdutos.innerHTML + novoProdutoHTML
  })
}

function preencheCategorias (categorias) {
  divCategoria.innerHTML = ''
  categorias.forEach(categorias => {
  
    const listaCategoriasHTML = `    
          <li><a class="dropdown-item" href="#" value=${categorias.categoria} id="cate" onclick="getCateProds('${categorias.categoria}')" >${categorias.categoria}</a></li>
        `

       divCategoria.innerHTML = divCategoria.innerHTML + listaCategoriasHTML
  })
}


pesquisaProdutos('MAQUINAS', '')
listaCategorias()
