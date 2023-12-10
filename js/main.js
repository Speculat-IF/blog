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

/* Array des tags */
const tagcolor = {
    "Biologique": "green",
    "IA": "grey",
    "Quantique": "orange",
    "Espace": "blue",
    "Social": "pink"
};


/* Afficher les articles sur la page d'accueil */
if (window.location.href.includes("index.html") || window.location.href.includes("https://speculat-if.github.io/blog/")) {
    const url ="https://raw.githubusercontent.com/Speculat-IF/blog/main/biblioteque.json"
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
        // console.log(data);
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
                tag.classList.add(tagcolor[data.articles[i].tags[j]]);
                alltags.appendChild(tag);
            }
            alltags.style.display = "flex";
            alltags.style.gap = "10px";
            card.appendChild(alltags);
            card.appendChild(titre);
            card.appendChild(resume);
            cards.appendChild(card);
            card.addEventListener("click", () => {
                window.location.href = "article.html?id=" + data.articles[i].id;
            });
        }
    })
    .catch((error) => {
        console.error('Error fetching data:', error);
    });


}


/* Afficher un article cliquer */

if (window.location.href.includes("article.html")) {
    const url ="https://raw.githubusercontent.com/Speculat-IF/blog/main/biblioteque.json"
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
        // console.log(data);
        let searchParams = new URLSearchParams(window.location.search);
        let id = searchParams.get("id");
        let searchedArticle = data.articles.find((article) => article.id == id);
        console.log(searchedArticle);
        let firstdiv = document.createElement("div");
        let seconddiv = document.createElement("div");
        let thirddiv = document.createElement("div");
        let fourthdiv = document.createElement("div");

        let titre = document.createElement("h1");
        titre.innerHTML = searchedArticle.titre;
        let underTitre = document.createElement("h2");
        underTitre.innerHTML = searchedArticle.date + " - " + searchedArticle.auteur;
        firstdiv.appendChild(titre);
        firstdiv.appendChild(underTitre);

        let halftext = document.createElement("p");
        halftext.innerHTML = searchedArticle.contenu.split(" ").slice(0,searchedArticle.contenu.split(" ").length/2).join(" ");
        let firstillustration = document.createElement("img");
        firstillustration.src = searchedArticle.illustration;
        seconddiv.appendChild(halftext);
        seconddiv.appendChild(firstillustration);

        let secondhalftext = document.createElement("p");
        secondhalftext.innerHTML = searchedArticle.contenu.split(" ").slice(searchedArticle.contenu.split(" ").length/2,searchedArticle.contenu.split(" ").length).join(" ");
        let secondillustration = document.createElement("img");
        secondillustration.src = searchedArticle.illustration;
        thirddiv.appendChild(secondillustration);
        thirddiv.appendChild(secondhalftext);
        
        let h2 = document.createElement("h2");
        h2.innerHTML = "Sources :";
        let ul = document.createElement("ul");
        let sourcesLength = searchedArticle.source.length;
        for (let i = 0; i < sourcesLength; i++) {
            let li = document.createElement("li");
            let a = document.createElement("a");
            a.innerHTML = searchedArticle.source[i].lien;
            li.appendChild(a);
            ul.appendChild(li);
        }
        fourthdiv.appendChild(h2);
        fourthdiv.appendChild(ul);

        let articlepage = document.getElementById("articlepage");
        articlepage.appendChild(firstdiv);
        articlepage.appendChild(seconddiv);
        articlepage.appendChild(thirddiv);
        articlepage.appendChild(fourthdiv);
    })
    .catch((error) => {
        console.error('Error fetching data:', error);
    });
}
