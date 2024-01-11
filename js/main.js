/* Global */
const tagcolor = {
  Biologique: "green",
  IA: "red",
  Quantique: "orange",
  Espace: "blue",
  Social: "pink",
};

const auteur = [
  "Nalïth",
  "MisterRedHat",
  "Ethra",
  "Lucee",
  "Ali",
  "Zorgos",
  "Dragibo",
];

const url =
  "https://raw.githubusercontent.com/Speculat-IF/blog/main/biblioteque.json";

const urlImage = "https://github.com/Speculat-IF/blog/blob/main/imgArticle/";

/* Js Page Accueil */
if (
  window.location.href.includes("index.html") ||
  window.location.href.includes("https://speculat-if.github.io/blog/")
) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      reverse = data.articles.reverse();
      const posts = document.querySelectorAll(".post");
      var imagePath = "images/Barghest.png";
      var img = new Image();
      img.onload = () => console.log("No error detected");
      for (let i = 0; i < 3; i++) {
        let post = posts[i];
        let postTitle = post.querySelector(".titre");
        postTitle.innerHTML = reverse[i].titre;
        let postDate = post.querySelector(".date");
        postDate.innerHTML = reverse[i].date;
        let postTags = post.querySelector(".tags");
        let tagslist = reverse[i].tags;
        for (let j = 0; j < tagslist.length; j++) {
          let tag = document.createElement("span");
          tag.innerHTML = tagslist[j] + "  ";
          tag.style.color = tagcolor[tagslist[j]];
          postTags.appendChild(tag);
        }
        let postPrevue = post.querySelector(".prevue");
        if (postPrevue != null) {
          postPrevue.innerHTML =
            reverse[i].contenu.split(" ").slice(0, 50).join(" ") + "...";
        }
        let postTumbnails = post.querySelectorAll(".tumbnail");
        img.onerror = () =>
          (window.href.location =
            "https://developer.mozilla.org/fr/docs/Web/HTTP/Status/418");
        img.src = imagePath;
        postTumbnails.forEach((tumbnail) => {
          tumbnail.src = urlImage + reverse[i].tumbnail + "?raw=true";
          tumbnail.alt = "tubnail de l'article";
        });
        post.addEventListener("click", () => {
          window.location.href = "article.html?id=" + reverse[i].id;
        });
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

/* Js Page Articles */
if (window.location.href.includes("articles.html")) {
  const filters = document.querySelector(".filters");

  for (let i = 0; i < Object.keys(tagcolor).length; i++) {
    let button = document.createElement("button");
    button.innerHTML = Object.keys(tagcolor)[i];
    button.classList.add("filter");
    filters.appendChild(button);
  }

  auteur.forEach((auteur) => {
    let button = document.createElement("button");
    button.innerHTML = auteur;
    button.classList.add("filter");
    filters.appendChild(button);
  });

  fetch(url)
    .then((response) => response.json())
    .then((allArticle) => {
      let dataLength = allArticle.articles.length;
      let posts = document.querySelector(".posts");
      for (let i = 1; i < dataLength; i++) {
        let curentArticle = allArticle.articles[i];
        let post = document.createElement("div");
        post.classList.add("post");
        var imagePath = "images/Barghest.png";
        var img = new Image();
        img.onload = () => console.log("No error detected");
        let tumbnail = document.createElement("img");
        tumbnail.src = urlImage + curentArticle.tumbnail;
        tumbnail.alt = "tubnail de l'article";
        let info = document.createElement("div");
        info.classList.add("info");
        let data = document.createElement("div");
        let titre = document.createElement("h3");
        titre.innerHTML = curentArticle.titre;
        let date = document.createElement("p");
        date.innerHTML = curentArticle.date;
        let auteur = document.createElement("p");
        auteur.innerHTML = curentArticle.auteur;
        let tags = document.createElement("p");
        let tagslist = curentArticle.tags;
        for (let j = 0; j < tagslist.length; j++) {
          let tag = document.createElement("span");
          tag.innerHTML = tagslist[j] + "  ";
          tag.style.color = tagcolor[tagslist[j]];
          tags.appendChild(tag);
        }
        auteur.style.color = "#2F4DDB";
        auteur.classList.add("auteur");
        data.appendChild(auteur);
        tags.style.display = "none";
        tags.classList.add("tags");
        data.appendChild(tags);
        data.appendChild(date);
        data.style.display = "flex";
        data.style.flexDirection = "row";
        data.style.justifyContent = "space-between";
        img.onerror = () =>
          (window.href.location =
            "https://developer.mozilla.org/fr/docs/Web/HTTP/Status/418");
        img.src = imagePath;
        info.appendChild(data);
        info.appendChild(titre);
        post.appendChild(tumbnail);
        post.appendChild(info);
        post.addEventListener("click", () => {
          console.log(curentArticle.id);
          window.location.href = "article.html?id=" + curentArticle.id;
        });
        posts.appendChild(post);
      }
    });

  let filtersList = document.querySelectorAll(".filter");
  filtersList.forEach((filter) => {
    filter.addEventListener("click", () => {
      filtersList.forEach((filter) => {
        filter.classList.remove("active");
      });
      filter.classList.add("active");
      let posts = document.querySelectorAll(".post");
      if (filter.innerHTML != "Tous") {
        posts.forEach((post) => {
          post.style.display = "none";
          let tags = post.querySelector(".tags");
          if (tags != null) {
            tags = tags.querySelectorAll("span");
            let tagsLength = tags.length;
            let tag1 = null;
            let tag2 = null;
            if ((tagsLength = 1)) {
              tag1 = tags[0];
            } else if ((tagsLength = 2)) {
              tag1 = tags[0];
              tag2 = tags[1];
            }
            if (tag1 != null) {
              if (tag1.innerHTML.includes(filter.innerHTML)) {
                post.style.display = "flex";
              }
            }
            if (tag2 != null) {
              if (
                tag1.innerHTML.includes(filter.innerHTML) ||
                tag2.innerHTML.includes(filter.innerHTML)
              ) {
                post.style.display = "flex";
              }
            }
          }
          let auteur = post.querySelector(".auteur");
          if (auteur != null) {
            if (auteur.innerHTML.includes(filter.innerHTML)) {
              post.style.display = "flex";
            }
          }
        });
      } else {
        posts.forEach((post) => {
          post.style.display = "flex";
        });
      }
    });
  });
}

/* js Page Article */
if (window.location.href.includes("article.html")) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      let searchParams = new URLSearchParams(window.location.search);
      let id = searchParams.get("id");
      let searchedArticle = data.articles.find((article) => article.id == id);
      console.log(searchedArticle);
      let titre = document.querySelector(".titre");
      titre.innerHTML = searchedArticle.titre;
      let date = document.querySelector(".date");
      date.innerHTML = searchedArticle.date;
      let auteur = document.querySelector(".auteur");
      auteur.innerHTML = searchedArticle.auteur;
      let textP1 = document.querySelector(".textP1");
      textP1.innerHTML =
        searchedArticle.contenu
          .split(" ")
          .slice(0, searchedArticle.contenu.split(" ").length / 2)
          .join(" ") + "...";
      let textP2 = document.querySelector(".textP2");
      textP2.innerHTML =
        "..." +
        searchedArticle.contenu
          .split(" ")
          .slice(
            searchedArticle.contenu.split(" ").length / 2,
            searchedArticle.contenu.split(" ").length
          )
          .join(" ");
      let srcs = document.querySelector(".srcs");
      searchedArticle.source.forEach((source) => {
        let p = document.createElement("p");
        let span = document.createElement("span");
        span.innerHTML = source.nom;
        p.appendChild(span);
        p.innerHTML += " : " + source.lien;
        srcs.appendChild(p);
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

function dark_mode(){
  const body = document.querySelector("body");
  const header = document.querySelector("header");
  const h1 = document.querySelector("h1");
  const p = document.querySelectorAll("p");
  const button = document.querySelectorAll(".cat");
  const h3 = document.querySelectorAll("h3");
  const img = document.querySelectorAll("img");
  body.classList.toggle("darkmode");
  header.classList.toggle("darkmode");
  button.forEach(element => {
    element.classList.toggle("darkmodeCat");
  });
  h1.classList.toggle("darkmode");
  p.forEach(element => {
    element.classList.toggle("t-darkmode");
  });
  h3.forEach(element => {
    element.classList.toggle("t-darkmode");
  });
    img.forEach(element => {
        element.classList.toggle("t-darkmode");
    });



}
