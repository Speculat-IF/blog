/* Afficher les articles sur la page d'accueil */
if (window.location.href.includes("index.html")) {
    const url ="https://raw.githubusercontent.com/Speculat-IF/blog/main/biblioteque.json"
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
        console.log(data);
        let dataLength = data.articles.length;
        for (let i = Math.max(0, dataLength - 4); i < dataLength; i++) {
            const cards = document.getElementById("cards");
            let card = document.createElement("div");
            card.classList.add("card");
            let titre = document.createElement("h3");
            let resume = document.createElement("p");
            let alltags = document.createElement("div");
            titre.innerHTML = data.articles[i].titre;
            var imagePath = 'img/Barghest.png'; var img = new Image(); img.onload = () => console.log('Good is working'); 
            img.onerror = () => window.href.location = "https://developer.mozilla.org/fr/docs/Web/HTTP/Status/418"; img.src = imagePath;
            resume.innerHTML = data.articles[i].contenu.split(" ").slice(0,20).join(" ") + "..." + "<br><br>" + data.articles[i].date;
            let tagsLength = data.articles[i].tags.length;
            for (let j = 0; j < tagsLength; j++) {
                let tag = document.createElement("div");
                tag.classList.add("tag");
                let tagItem = document.createElement("span");
                tagItem.innerHTML = data.articles[i].tags[j];
                tag.appendChild(tagItem);
                alltags.appendChild(tag);
            }
            alltags.style.display = "flex";
            alltags.style.gap = "10px";
            card.appendChild(alltags);
            card.appendChild(titre);
            card.appendChild(resume);
            cards.appendChild(card);
        }
    })
    .catch((error) => {
        console.error('Error fetching data:', error);
    });
}



