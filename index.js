var _btnCarica, _btnCarica2, _txtFile;

window.onload= function(){
    //Contesto: window -> perché function() è richiamata da window
    console.log(this);


    _btnCarica = document.querySelector("button");
    _btnCarica2 = document.getElementById("btnCarica2");
    _txtFile = document.querySelector("input[type=file]");

    //leggiFile() è richiamata in modo SINCRONO
    //_btnCarica.addEventListener("click", leggiFile());

    //leggiFile è richiamata in modo ASINCRONO dal bottone
    //.bind(contesto, eventuali parametri presenti nella funzione)
    _btnCarica.addEventListener("click", leggiFile1.bind(_txtFile, "TEST"));
    _btnCarica2.addEventListener("click", leggiFile2);
};

function leggiFile2(){
    //Prendere file, mandare e ricevere info sul server
    //ASINCRONA
    let dati = fetch("dati.json");
    console.log(dati);
}

function leggiFile1(testo){
    //SENZA BIND -> this è uguale al bottone 
    console.log(this);
    console.log(testo);

    console.log(this.value);

    //Istanzio la classe FileReader
    let reader = new FileReader();
    //SINCRONIZZO Flusso principale con quello secondario 
    //avvia da readAsDataURL tramite callback
    reader.onload = fineLettura;
    //E' una chiamata SINCRONA readAsDataURL che nasconde al suo interno 
    //una chiamata di sistema ASINCRONA
    reader.readAsDataURL(this.files[0]);
    alert("Lettura avviata");
}

function fineLettura(e){
    console.log(e);
    alert("file letto veramente");
    
    //Prendo i dati
    let datiFile = e.target.result;
    //Separo i dati dall'intestazione
    let stringa = datiFile.split(",")[1];
    //Decodificare i dati in formato base 64
    alert(atob(stringa));
}