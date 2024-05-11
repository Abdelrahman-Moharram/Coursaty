import paypalrestsdk
import os

paypalrestsdk.configure({
    "mode": "sandbox", # Use "live" for production
    "client_id": os.getenv('PAYPAL_CLIENT_ID'),
    "client_secret": os.getenv('PAYPAL_SECRET_KEY')
})


def paypal_place_order():
    payment = paypalrestsdk.Payment({
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "<YOUR_RETURN_URL>",
            "cancel_url": "<YOUR_CANCEL_URL>"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "Item 1",
                    "sku": "item_1",
                    "price": "10.00",
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "total": "10.00",
                "currency": "USD"
            },
            "description": "This is a test transaction."
        }]
    })
    return payment

    