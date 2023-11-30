/* Afficher les articles sur la page d'accueil */

// check si the url contient index.html
if (window.location.href.includes("index.html")) {
    const cards = document.getElementById("cards");
    const url ="https://raw.githubusercontent.com/Speculat-IF/blog/main/biblioteque.json?token=GHSAT0AAAAAACJML635MY35KEL56R2C4NI4ZLIWF4Q"
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
        console.log(data);
        const cards = document.getElementById("cards");
        let card = document.createElement("div");
        card.classList.add("card");
        let tag = document.createElement("div");
        tag.classList.add("tag");
        let titre = document.createElement("h3");
        let resume = document.createElement("p");
        titre.innerHTML = data.articles[1].titre;
        // select the first 20 words of the resume
        resume.innerHTML = data.articles[1].contenu.split(" ").slice(0,20).join(" ");
        card.appendChild(tag);
        card.appendChild(titre);
        card.appendChild(resume);
        cards.appendChild(card);
    })
    .catch((error) => {
        console.error('Error fetching data:', error);
    });
}