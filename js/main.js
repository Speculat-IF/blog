/* Afficher les articles sur la page d'accueil */
if (window.location.href.includes("index.html") || window.location.href.includes("https://speculat-if.github.io/blog/")) {
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


/* menu deroulant */

const downbtn = document.getElementById("down");
const header = document.querySelector("header");
const section1 = header.querySelector("section:nth-child(1)");
const section1Nav = section1.querySelector("nav");
downbtn.addEventListener("click", () => {
    if (header.classList.contains("collapsed")) {
        header.classList.remove("collapsed");
        header.classList.add("expanded");
        section1.style.display = "flex";
        section1.style.flexDirection = "column";
        section1.style.gap = "10%";
        section1Nav.style.display = "flex";
        section1Nav.style.flexDirection = "column";
        section1Nav.style.gap = "20px";
        downbtn.style.transform = "rotate(180deg)";
    } else {
        header.classList.remove("expanded");
        header.classList.add("collapsed");
        section1.style.flexDirection = "row";
        section1.style.gap = "25%";
        section1Nav.style.display = "none";
        section1Nav.style.flexDirection = "row";
        section1Nav.style.gap = "0";
        downbtn.style.transform = "rotate(0deg)";
    }
});
