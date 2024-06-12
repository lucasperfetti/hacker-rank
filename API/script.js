function getApi(){
    fetch('https://dummyjson.com/products')
    .then(res => res.json())
    .then(json => {
        let body = document.body;
        for(let i = 0; i < json.products.length; i++){
            let div = document.createElement("div");
            let img = document.createElement("img");
            img.src = json.products[i].images[0];
            img.width = 200;
            img.height = 200;
            let pPrice = document.createElement("p");
            let pTitle = document.createElement("p");
            let pCategory = document.createElement("p");
            pPrice.innerHTML = json.products[i].price;
            pTitle.innerHTML = json.products[i].title;
            pCategory.innerHTML = json.products[i].category;
            if(i === 0){
                div.id = "div1"; //cria id para o primeiro elemento para depois dar update
            }
            div.appendChild(img); //interagindo diretamente com html
            div.appendChild(pPrice);
            div.appendChild(pTitle);
            div.appendChild(pCategory);
            body.appendChild(div);
        }
    });
    let contProduto = 1;
    document.querySelector("#btn").addEventListener("click", evt => {
        fetch('https://dummyjson.com/products/' + contProduto, {
            method: 'DELETE',
          })
          .then(res => res.json())
          .then(console.log);
        document.body.removeChild(document.querySelector("div"));
        contProduto++;
    });
    document.querySelector("#add-btn").addEventListener("click", evt => {
        fetch('https://dummyjson.com/products/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              title: 'Orange',
              images: 'https://th.bing.com/th/id/R.b766ef9b44221f94af453bae0ce4d356?rik=vRoa2wU6ATNEzg&pid=ImgRaw&r=0',
              price: '2.49',
              category: 'groceries'
              /* other product data */
            })
          })
          .then(res => res.json())
          .then(json => {
            let div = document.createElement("div");
            let img = document.createElement("img");
            img.src = json.images;
            img.width = 200;
            img.height = 200;
            let pPrice = document.createElement("p");
            let pTitle = document.createElement("p");
            let pCategory = document.createElement("p");
            pPrice.innerHTML = json.price;
            pTitle.innerHTML = json.title;
            pCategory.innerHTML = json.category;
            div.appendChild(img);
            div.appendChild(pPrice);
            div.appendChild(pTitle);
            div.appendChild(pCategory);
            document.body.appendChild(div);
          });
    });
    document.querySelector("#up-btn").addEventListener("click", evt => {
        /* updating title of product with id 1 */
        fetch('https://dummyjson.com/products/1', {
            method: 'PUT', /* or PATCH */
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
            title: 'iPhone 15 Pro Max',
            images: 'https://mobileinto.com/images/Apple-iPhone-15-Pro-Max.jpg',
            category: 'electronic',
            price: '1000.0'
            })
        })
        .then(res => res.json())
        .then(json => {
            let divP = document.querySelectorAll("#div1 p");
            let divImg = document.querySelector("#div1 img");
            divImg.src = json.images;
            divP[0].innerHTML = json.price;
            divP[1].innerHTML = json.title;
            divP[2].innerHTML = json.category;
        });
     });
};

window.onload = getApi;