const firebaseConfig = {
    apiKey: "AIzaSyCm3pRvFPPDtqmUwnWfNqPYJVxx2PdHJX8",
    authDomain: "monsupersite-cyberdev.firebaseapp.com",
    databaseURL: "https://monsupersite-cyberdev-default-rtdb.europe-west1.firebasedatabase.app/",
    projectId: "monsupersite-cyberdev",
    storageBucket: "monsupersite-cyberdev.appspot.com",
    messagingSenderId: "718540300731",
    appId: "1:718540300731:web:8ecc2f08fc0887fe42249e"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const dbRef = firebase.database().ref();

const articlesRef = dbRef.child('articles');
const section = document.querySelector('section');
readUserData();


function readUserData(){
    articlesRef.on('value', snap=>{
        snap.forEach(childSnap=>{
            let $article = document.createElement('article');
            let key = childSnap.key;
            let value = childSnap.val();
            $article.innerHTML = `<h2 data-key="titre">${value.titre}</h2>
            <p data-key="content">${value.content}</p>
            <p>${value.date}</p>
            <img data-key="img1" src=${value.img1} alt="image article">
            <i class="uil uil-trash-alt" userid="${key}"></i>`;
            section.appendChild($article);
            let iconDelete = document.querySelector(`[userid="${key}"]`);
            iconDelete.addEventListener('click', buttonDelete);
            console.log(iconDelete);
        })
        console.log(iconDelete);
    });
};


const addButton = document.querySelector('.btnSend');
addButton.addEventListener('click', addArticle);


function addArticle(e){
    e.preventDefault();
    const inputs = document.querySelectorAll('.inputForm');
    let newArticle = {};
    for(let i=0; i<inputs.length; i++){
        let key = inputs[i].getAttribute('data-key');
        console.log(key);
        let value = inputs[i].value;
        console.log(value);
        newArticle[key] = value;
    }
    console.log(newArticle);
    articlesRef.push(newArticle);
    console.log('votre article a été ajouté');
    document.querySelector('.monForm').reset();
};


function buttonDelete(e){
    e.stopPropagation();
    let articleId = e.target.getAttribute('userid');
    const articleRef = dbRef.child("articles/" + articleId);
    articleRef.remove();
}


