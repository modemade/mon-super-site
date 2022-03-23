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

const usersRef = dbRef.child('Contact');
const sendMessage = document.querySelector('#send');
sendMessage.addEventListener('click', saveMessage);

function saveMessage(event){
    event.preventDefault();
    let newMessage = {};
    const inputsForm = document.querySelectorAll('.inputUI');
    for(let i=0; i<inputsForm.length; i++){
        let key = inputsForm[i].getAttribute('data-key');
        let value = inputsForm[i].value;
        newMessage[key] = value;
    }
    usersRef.push(newMessage);
    console.log("votre message a été enregistré !!");
};