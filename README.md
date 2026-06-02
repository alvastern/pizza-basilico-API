# 🍕 Pizza Basilico API
Ett REST API med funktionaliteten att boka bord och beställa takeaway. Det finns även funktionalitet för att medarbetare opå restaurangen ska kunna 
redigera befintliga pizzor i menyn, lägga till pizzor i menyn, redigera öppettider texter om företaget. Detta API är utvecklat med express och node.js, stödjer CRUD 
och stödjer en relationsdatabas som är framtagen med MySQL.

## Databas
Projektet använder en relationsdatabas byggd i MySQL för att lagra och hantera data. Databasen består av sammankopplade tabeller som stödjer systemets funktioner:

users – lagrar användarkonton.
- menu_items – innehåller meny med pizzor, beskrivningar, priser och bilder.
- takeaway_orders – lagrar kunders takeaway-beställningar.
- takeaway_order_items – hanterar produkter som ingår i varje beställning.
- table_bookings – lagrar bordsbokningar.
- opening_hours – lagrar restaurangens öppettider.
- pages – lagra innehåll som kan.

Databasen använder primary och foreigen keys för att säkerställa dataintegritet. Relationerna mellan tabellerna gör det möjligt att koppla samman beställningar med produkter och hantera data på ett strukturerat sätt.

## API Endpoints
| Metod | Endpoint | Beskrivning |
|--------|----------|-------------|
| GET | /api/pizzas | Hämta alla pizzor |
| GET | /api/pizzas/:id | Hämta en pizza via ID |
| POST | /api/pizzas | Skapa en ny pizza |
| PUT | /api/pizzas/:id | Uppdatera en pizza |
| DELETE | /api/pizzas/:id | Ta bort en pizza |

## Autentisering och säkerhet
API:t använder JSON Web Tokens (JWT) för autentisering av användare i en administrations-sida. Efter inloggning får användaren en JWT-token som skickas med i efterföljande anrop till skyddade endpoints.

Skyddade funktioner inkluderar bland annat:

- Uppdatera produkter i menyn
- Skapa nya produkter i menyn
- Redigera webbplatsens innehåll
