# Policijski Informacioni Sistem

Sistem namjenjen efikasnom upravljanju kriminalnim slučajevima, omogućavajući administratorima, policajcima i inspektorima pristup različitim funkcionalnostima.

## Tehnologije

Projekat koristi MERN tehnologije:
- **MySQL**: Baza podataka za skladištenje informacija o korisnicima, kriminalnim slučajevima i njihovim detaljima.
- **Express.js**: Back-end framework za brzo i jednostavno kreiranje API-ja.
- **React**: Front-end framework za interaktivno korisničko iskustvo.
- **Node.js**: Izvršno okruženje za izvođenje server-side koda.

## Funkcionalnosti po korisnicima

### Admin
- Kreiranje naloga na osnovu broja značke.
- Dodjeljivanje naloga policajcu i inspektoru.
- Upravljanje korisnicima: pregled, uređivanje, brisanje.
- Pregled svih aktivnih i završenih kriminalnih slučajeva.
- Mogućnost pritanja krimilanih slučajeva.
- Mogućnost pretraživanja po imenu, prezimenu ili broju slučaja.

### Policajac
- Pregled dodijeljenih kriminalnih djela.
- Izrada i dorada izjava uz mogućnost postavljanja statusa ("Started", "In Progress", "Completed").
- Mogućnost pritanja krimilanih slučajeva.
- Dodavanja izjave za taj kriminalni slučaj.
- Mogućnost pretraživanja po imenu, prezimenu ili broju slučaja.

### Inspektor
- Kreiranje novog kriminalnog djela sa detaljima kao što su ime tužioca, broj, zanimanje, godine, spol, adresa, regija, distrikt, lokacija i tip krivičnog dela.
- Dodjeljivanje slučaja policajcu.
- Mogućnost pritanja krimilanih slučajeva.
- Pregled svih slučajeva sa opcijama za detalje, uređivanje, brisanje.
- Dodavanje izvještaja o istrazi i praćenje statusa istraživanja.
- Mogućnost pretraživanja po imenu, prezimenu ili broju slučaja.

## Uputstva za pokretanje

1. Instalirajte potrebne pakete koristeći `npm install` u glavnom direktorijumu i u direktorijumima `client` i `server`.
2. Pokrenite back-end server komandom `npm run devStart` u direktorijumu `server`.
3. Pokrenite front-end aplikaciju komandom `npm start` u direktorijumu `client`.
4. Posetite [http://localhost:3000](http://localhost:3000) da pristupite aplikaciji.

# Deploy na GitHub

1. **Fork**-ujte ovaj repozitorijum.
2. Klonejte svoj **fork** lokalno na vaš računar.
3. Slijedite upute za pokretanje kako biste postavili sistem lokalno.
4. Prilagodite sistem prema vašim potrebama.
