from fastapi import FastAPI

app = FastAPI()

@app.get("/api/offers")
def get_offers():
    return [
        {
            "id": 1,
            "user": "TraderA",
            "payMethod": "СБП",
            "from": "USDT",
            "to": "RUB",
            "price": "92.30",
            "limits": "5,000 - 100,000 RUB",
            "available": "50,000 USDT",
            "action": "Купить"
        },
        # ... остальные заявки
    ]
