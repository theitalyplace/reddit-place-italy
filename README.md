# Reddit Place Italia
Questo programma coordina gli sforzi di [/r/italy](https://www.reddit.com/r/italy/) su [/r/place](https://www.reddit.com/r/place/). Discussioni su [/r/theitalyplace](https://www.reddit.com/r/theitalyplace/) e sulla chat live nel [canale discord](https://discord.gg/YjCM7uv)

![reddit italy logo](r_italy_logo.png)

## Installazione - Windows
1. Installare [Node.js versione 6](https://nodejs.org/it/)
2. Scaricare ed estrarre [reddit-place-italy](https://github.com/theitalyplace/reddit-place-italy/archive/master.zip)
3. Aprire il prompt comandi nella cartella scaricata
	- Con Windows 10: SHIFT + tasto destro del mouse sulla cartella, "Apri finestra di comando qui"
	- Con gli altri bisogna navigare [manualmente](http://it.wikihow.com/Cambiare-Directory-dal-Prompt-dei-Comandi)
4. Eseguire dal prompt comandi `npm install`

## Installazione - Linux
```
apt-get install nodejs
git clone git@github.com:theitalyplace/reddit-place-italy.git
cd reddit-place-italy
npm install
```
Nota: serve Node versione 6

## Configurazione
Rinominare `users.EMPTY.json` in `users.json`.
Aprire `users.json` con un editor di testo e inserire gli account di reddit disponibili con nome utente e password.

## Avvio
```
npm start
```

## Creare un'immagine della board
Eseguire `node board.js`, la board viene salvata in `board.png`

## Aggiornare il target
Il target viene automaticamente aggiornato con l'ultima versione disponibile in questa repo. Per chiedere modifiche al target o ottenere la password contattare: [/u/EnderStarways](https://www.reddit.com/user/EnderStarways) (giorno), [/u/TheHammerstein](https://www.reddit.com/user/TheHammerstein) (notte).

## Progetto corrente (target.png)

![Target](https://raw.githubusercontent.com/theitalyplace/reddit-place-italy/master/target.png)

## Progetto difensivo
da copiare su target.png quando nessuno sta supervisionando un progetto corrente

![Target](https://raw.githubusercontent.com/theitalyplace/reddit-place-italy/master/target_difensivo.png)

## Changelog

2017-04-03 12:55 CSET
* Terminato il legionario ora parte il progetto spaghetti

2017-04-03 10:29 CSET
* Nuovo repo condiviso, aggiornato target, aggiornati link vari

2017-04-02 23:10 CET
* Corretto bug per cui multipli account correggono contemporaneamente lo stesso pixel

2017-04-02 22:05 CET
* Gestione di utenti multipli

2017-04-02 17:30 CET
* Prima versione
