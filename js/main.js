/* Global */
const tagcolor = {
  Biologique: "green",
  IA: "red",
  Quantique: "orange",
  Espace: "blue",
  Social: "pink",
};

const auteur = [
  "Ethan Delcroix",
  "Arthur Prudhomme",
  "Thea Blachon",
  "Pierre-Louis Sans",
];

const url =
  "https://raw.githubusercontent.com/Speculat-IF/blog/main/biblioteque.json";

const urlImage = "https://github.com/Speculat-IF/blog/blob/main/imgArticle/";

function separateStrings(baseString, delimiter) {
    const index = baseString.indexOf(delimiter);
    if (index !== -1) {
      const firstString = baseString.slice(0, index + delimiter.length);
      const secondString = baseString.slice(index + delimiter.length);
      return [firstString, secondString];
    } else {
      return [baseString, ''];
    }
}

function redirectForm() {
  window.location.href = "apropos.html";
}

function VerifAndSend() {

  let nom = document.getElementById("nom").value;
  let prenom = document.getElementById("prenom").value;
  let email = document.getElementById("email").value;
  let Object = document.getElementById("subject-select").value;
  let message = document.getElementById("message").value;
  
  if (nom == "") {
    document.getElementById("nom").style.borderColor = "red";
    document.getElementById("nom").placeholder = "Veuillez entrer votre nom";
    return false;
  }
  document.getElementById("nom").style.borderColor = "black";
  if (email == "" || !email.includes("@") || !email.includes(".")) {
    document.getElementById("email").style.borderColor = "red";
    document.getElementById("email").value = "";
    document.getElementById("email").placeholder =
      "Veuillez entrer votre email : example@example.com";
    return false;
  }
  document.getElementById("email").style.borderColor = "black";
  if (Object == "") {
    document.getElementById("subject-select").style.borderColor = "red";
    document.getElementById("subject-select").placeholder =
      "Veuillez entrer un objet";
    return false;
  }
  document.getElementById("subject-select").style.borderColor = "black";
  if (message == "") {
    document.getElementById("message").style.borderColor = "red";
    document.getElementById("message").placeholder =
      "Veuillez entrer votre message";
    return false;
  }
  document.getElementById("message").style.borderColor = "black";
  let data = {
    nom: nom,
    prenom: prenom,
    email: email,
    object: Object,
    message: message,
  };
  localStorage.setItem("SpeculatifEmail", JSON.stringify(data));
  window.location.reload();
}

function separateIllustration(inputString) {

  var stringsArray = inputString.split('/');
  if (stringsArray.length >= 2) {
      var stringOne = stringsArray[0];
      var stringTwo = stringsArray[1];
      return { stringOne: stringOne, stringTwo: stringTwo };
  } else {
      return { error: 'Invalid input string' };
  }
}

const delimiter =' : ';

const searchBar = document.querySelector("#searchBar");

fetch('https://raw.githubusercontent.com/Speculat-IF/blog/main/biblioteque.json')
.then(response => response.json())
  .then(data => {
      for (let i = 0; i < data.articles.length; i++) {
          document.getElementById('Input').innerHTML += `<option id="${data.articles[i].id}" value="${data.articles[i].titre}">`
      }
      // auteur.forEach(element => {
      //   document.getElementById('Input').innerHTML += `<option value="${element}">`
      // });
})

const loope = document.querySelector("#loope");

loope.addEventListener("click", () => {
  let id = null;
  let titre = searchBar.value;
  for (let i = 0; i < document.getElementById('Input').options.length; i++) {
    if (document.getElementById('Input').options[i].value == titre) {
      id = document.getElementById('Input').options[i].id;
    }
  }
  if (id != null) {
    window.location.href = "article.html?id=" + id;
  }
  else {
    alert("L'article n'existe pas");
  }
})

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
        let span = document.createElement("span");
        let titre = reverse[i].titre;
        let [firstString, secondString] = separateStrings(titre, delimiter);
        span.innerHTML = firstString;
        postTitle.appendChild(span);
        postTitle.innerHTML += secondString;
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
            reverse[i].contenu[0].intro.split(" ").slice(0, 30).join(" ") + "...";
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

  // auteur.forEach((auteur) => {
  //   let button = document.createElement("button");
  //   button.innerHTML = auteur;
  //   button.classList.add("filter");
  //   filters.appendChild(button);
  // });

  fetch(url)
    .then((response) => response.json())
    .then((allArticle) => {
      let dataLength = allArticle.articles.length;
      var reverse = allArticle.articles.reverse();
      let posts = document.querySelector(".posts");
      for (let i = 0; i < dataLength; i++) {
        let curentArticle = reverse[i];
        let post = document.createElement("div");
        post.classList.add("post");
        var imagePath = "images/Barghest.png";
        var img = new Image();
        img.onload = () => console.log("No error detected");
        let tumbnail = document.createElement("img");
        tumbnail.src = urlImage + curentArticle.tumbnail + "?raw=true";
        tumbnail.alt = "tubnail de l'article";
        let info = document.createElement("div");
        info.classList.add("info");
        let data = document.createElement("div");
        let titre = document.createElement("h3");
        let span = document.createElement("span");
        let titreString = curentArticle.titre;
        let [firstString, secondString] = separateStrings(titreString, delimiter);
        span.innerHTML = firstString;
        titre.appendChild(span);
        titre.innerHTML += secondString;
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
        console.log(data);
        let searchParams = new URLSearchParams(window.location.search);
        let id = searchParams.get("id");
        let searchedArticle = data.articles.find((article) => article.id == id);
        console.log(searchedArticle);
        let titre = document.querySelector(".titre");
        let span = document.createElement("span");
        let titreString = searchedArticle.titre;
        let [firstString, secondString] = separateStrings(titreString, delimiter);
        span.innerHTML = firstString;
        titre.appendChild(span);
        titre.innerHTML += secondString;
        let date = document.querySelector(".date");
        date.innerHTML = searchedArticle.date;
        let auteur = document.querySelector(".auteur");
        auteur.innerHTML = searchedArticle.auteur;
        let intro = document.querySelector("#intro");
        let partOneOne = document.querySelector("#partOneOne");
        let partOneTwo = document.querySelector("#partOneTwo");
        let partTwoOne = document.querySelector("#partTwoOne");
        let partTwoTwo = document.querySelector("#partTwoTwo");
        let conclusion = document.querySelector("#conclusion");
        intro.innerHTML = searchedArticle.contenu[0].intro;
        let partOne = searchedArticle.contenu[1].partieOne;
        let partOneLength = partOne.length;
        let partOneOneLength = Math.round(partOneLength * 0.3);
        partOneOne.innerHTML = partOne.slice(0, partOneOneLength);
        partOneTwo.innerHTML = partOne.slice(partOneOneLength, partOneLength);
        let partTwo = searchedArticle.contenu[2].partiTwo;
        let partTwoLength = partTwo.length;
        let partTwoOneLength = Math.round(partTwoLength * 0.3);
        partTwoOne.innerHTML = partTwo.slice(0, partTwoOneLength);
        partTwoTwo.innerHTML = partTwo.slice(partTwoOneLength, partTwoLength);
        conclusion.innerHTML = searchedArticle.contenu[3].conslusion;
        let illustrationOne = document.querySelector("#illustrationOne");
        let illustrationTwo = document.querySelector("#illustrationTwo");
        illustrationOne.src = urlImage + separateIllustration(searchedArticle.illustration).stringOne + "?raw=true";
        illustrationTwo.src = urlImage + separateIllustration(searchedArticle.illustration).stringTwo + "?raw=true";
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




let favtag= true;
let darktag = false;
function dark_mode(){
  const body = document.querySelector("body");
  const header = document.querySelector("header");
  const h1 = document.querySelector("h1");
  const p = document.querySelectorAll("p");
  const button = document.querySelectorAll(".cat");
  const h3 = document.querySelectorAll("h3");
  const img = document.querySelectorAll("img");
  const info = document.querySelectorAll(".info h3");
  const moon = document.querySelector(".moon");
  const sun = document.querySelector(".sun");
  const faviconblack = document.querySelector(".faviconblack");
  const label = document.querySelectorAll("label");
  body.classList.toggle("darkmode");
  console.log(h3)
  button.forEach(element => {
    element.classList.toggle("darkmodeCat");
  });
  h1.classList.toggle("darkmode");
  p.forEach(element => {
    element.classList.toggle("t-darkmode");
  });
  h3.forEach(element => {
    console.log(element);
    element.classList.toggle("t-darkmode");
  });
  img.forEach(element => {
    element.classList.toggle("t-darkmode");
  });
  info.forEach(element => {
    element.classList.toggle("darkmode");
  });
  moon.classList.toggle("hidden");
  sun.classList.toggle("block");
  if (favtag === true) {
    faviconblack.href = "images/logo_blanc.png";
    favtag = false;
  }

  else {
    faviconblack.href = "images/logo_noir.png";
    favtag = true;
  }
  if(header){
    header.classList.toggle("darkmode");
  }
  label.forEach(element => {
    element.classList.toggle("t-darkmode");
  });
  if (darktag === false) {
    localStorage.setItem("darkmode", "true");
    console.log(localStorage.getItem("darkmode"));
    darktag = true;

  }
  else {
    localStorage.setItem("darkmode", "false");
    console.log(localStorage.getItem("darkmode"));
    darktag = false;
  }

}

if (localStorage.getItem("darkmode") === "true") {
  setTimeout(startdarkmode, 100)
}
function startdarkmode(){

  dark_mode();


}

