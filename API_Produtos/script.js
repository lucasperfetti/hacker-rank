let countId = 31;

function getApi(){
    fetch('https://dummyjson.com/products')
    .then(res => res.json())
    .then(json => {
        let body = document.body;
        for(let i = 0; i < json.products.length; i++){
                let div = document.createElement("div");
                div.id = "div" + json.products[i].id;
                let img = document.createElement("img");
                img.src = json.products[i].images[0];
                img.width = 200;
                img.height = 200;
                img.alt = json.products[i].title;
                let pPrice = document.createElement("p");
                let pTitle = document.createElement("p");
                let pCategory = document.createElement("p");
                let pId = document.createElement("p");
                let rmBtn = document.createElement("button");
                rmBtn.classList.add("rm-btn");
                rmBtn.innerHTML = "Remover produto";
                rmBtn.id = "btn" + json.products[i].id;
                pPrice.innerHTML = "$" + json.products[i].price;
                pTitle.innerHTML = json.products[i].title;
                pCategory.innerHTML = json.products[i].category;
                pId.innerHTML = json.products[i].id;
                div.appendChild(pId);
                div.appendChild(img); //interagindo diretamente com html
                div.appendChild(pPrice);
                div.appendChild(pTitle);
                div.appendChild(pCategory);
                div.appendChild(rmBtn);
                body.appendChild(div);
            }
            document.querySelectorAll(".rm-btn").forEach(el => {
                el.addEventListener("click", remove => {
                    let div = "";
                    let id = "";
                    if(remove.target.id.length === 4){
                        div = document.querySelector("#div" + remove.target.id[3]);
                        id = remove.target.id[3];
                    } else{
                        div = document.querySelector("#div" + (remove.target.id).slice(3,5));
                        id = (remove.target.id).slice(3,5)
                    }
                    document.body.removeChild(div);
                    fetch('https://dummyjson.com/products/' + id, {
                        method: 'DELETE',
                      })
                      .then(res => res.json())
                      .then(console.log);
                });
            });
        });
    document.querySelector("#add-btn").addEventListener("click", evt => {
        let titulo = document.querySelector("#nome").value;
        let preco = document.querySelector("#preco").value;
        let imagem = document.querySelector("#imagem").value;
        let categoria = document.querySelector("#categoria").value;
        fetch('https://dummyjson.com/products/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                },
            body: JSON.stringify({
                "title": titulo,
                "price": preco,
                "description": titulo,
                "images": imagem,
                "category": categoria
            })
          })
          .then(res => res.json())
          .then(json => {
            let div = document.createElement("div");
            div.id = "div" + countId;
            let img = document.createElement("img");
            img.src = document.querySelector("#imagem").value,
            img.width = 200;
            img.height = 200;
            img.alt = json.title;
            let rmBtn = document.createElement("button");
            rmBtn.classList.add("rm-btn");
            rmBtn.innerHTML = "Remover produto";
            rmBtn.id = "btn" + countId;
            let pPrice = document.createElement("p");
            let pTitle = document.createElement("p");
            let pCategory = document.createElement("p");
            let pId = document.createElement("p");
            pPrice.innerHTML = "$" + document.querySelector("#preco").value,
            pTitle.innerHTML = document.querySelector("#nome").value,
            pCategory.innerHTML = document.querySelector("#categoria").value,
            pId.innerHTML = countId;
            div.appendChild(pId);
            div.appendChild(img);
            div.appendChild(pPrice);
            div.appendChild(pTitle);
            div.appendChild(pCategory);
            div.appendChild(rmBtn);
            document.body.insertBefore(div, document.querySelector("div"));
            countId++;
        document.querySelectorAll(".rm-btn").forEach(el => {
            el.addEventListener("click", remove => {
                let div = "";
                let id = "";
                if(remove.target.id.length === 4){
                    div = document.querySelector("#div" + remove.target.id[3]);
                    id = remove.target.id[3];
                } else{
                    div = document.querySelector("#div" + (remove.target.id).slice(3,5));
                    id = (remove.target.id).slice(3,5)
                }
                document.body.removeChild(div);
                fetch('https://dummyjson.com/products/' + id, {
                    method: 'DELETE',
                    })
                    .then(res => res.json())
                    .then(console.log);
            });
        });
        });
    });
    document.querySelector("#update-btn").addEventListener("click", evt => {
        /* updating title of product with id 1 */
        let titulo = document.querySelector("#nome-up").value;
        let preco = document.querySelector("#preco-up").value;
        let imagem = document.querySelector("#imagem-up").value;
        let categoria = document.querySelector("#categoria-up").value;
        let id = document.querySelector("#id").value;
        fetch('https://dummyjson.com/products/1', {
            method: 'PUT', /* or PATCH */
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
            title: 'iPhone 15 Pro Max',
            })
        })
        .then(res => res.json())
        .then(json => {
            let ps = document.querySelectorAll("#div" + id + " p");
            ps[1].innerHTML = preco;
            ps[2].innerHTML = titulo;
            ps[3].innerHTML = categoria;
            document.querySelector("#div" + id + " img").src = imagem;
        });
    });
};

window.onload = getApi;