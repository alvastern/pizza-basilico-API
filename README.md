# 🍕 Pizza Basilico API
Ett REST API med funktionaliteten att boka bord och beställa takeaway. Det finns även funktionalitet för att medarbetare opå restaurangen ska kunna 
redigera befintliga pizzor i menyn, lägga till pizzor i menyn, redigera öppettider texter om företaget. Detta API är utvecklat med express och node.js, stödjer CURD 
och stödjer en relationsdatabas som är framtagen med MySQL.

## API Endpoints
| Metod | Endpoint | Beskrivning |
|--------|----------|-------------|
| GET | /api/pizzas | Hämta alla pizzor |
| GET | /api/pizzas/:id | Hämta en pizza via ID |
| POST | /api/pizzas | Skapa en ny pizza |
| PUT | /api/pizzas/:id | Uppdatera en pizza |
| DELETE | /api/pizzas/:id | Ta bort en pizza |

## Exempel på en POST-request i JSON
{
  "name": "Pizza Margherita",
  "price": 109,
  "toppings": [
    "Mozzarella",
    "Tomatsås",
    "Basilika"
  ]
}
