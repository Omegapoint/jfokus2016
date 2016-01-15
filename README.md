# QBasic Gorillas
### Monteruppgift för Jfokus 2016

#### HOWTO
Installera genom att köra `npm install`.
Starta applikation genom `npm run start`

#### TODO
* Spelaren får inte poäng när solen träffas, detta måste ske!
* Spelarens Agent får inte in alla variabler som den behöver i dagsläget. _Wind_, _OtherPlayerPosition_ och _bananHitPosition_ behöver skickas till agenten. Detta görs endast för default spelare idag.
* ~~Spelet fortsätter i all evighet. När ska det sluta? Hur hämtar bestämmer vi hur många poäng ett spel skall generera?~~
* ~~Vissa spel tenderar att hålla på i all evighet för ingen av agenterna kan träffa den andre... man bör ha en limit på antal kast per agent och spel~~.
* Inputfältet som användaren kodar i är otydligt, fult och måste uppdateras. Fanske skriva ut det som en funktion som tar in argument och returnerar velocity och angle?
* Snygga till menyer och liknande. Kanske i Något Qbasic-liknande tema likt spelet?
* Möjlighet att persistera koden så att man kan komma tillbaka vid ett senare tillfälle och spela?
* Highscore?
* Spela spelare mot varandra isället för en förbestämd bot?
