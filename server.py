import http.server
import json
import os

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))
ORDERS_FILE = os.path.join(DIRECTORY, "orders.json")

MOCK_ORDERS = [
    {
        "id": "MM-7491",
        "timestamp": "2026-07-06 14:32",
        "customer": {
            "name": "Ananya Sen",
            "phone": "9830012345",
            "email": "ananya@gmail.com",
            "address": "Flat 4B, Greenwood Apts, Koramangala",
            "city": "Bengaluru",
            "zip": "560034",
            "notes": "Please call 10 mins before arrival."
        },
        "items": [
            {"id": "p3", "name": "Finger Millet (Premium Ragi)", "price": 120, "weight": "1 kg", "quantity": 2},
            {"id": "p1", "name": "Organic Barnyard Millet", "price": 180, "weight": "1 kg", "quantity": 1}
        ],
        "subtotal": 420,
        "shipping": 50,
        "total": 470,
        "status": "pending"
    },
    {
        "id": "MM-9102",
        "timestamp": "2026-07-05 09:15",
        "customer": {
            "name": "Dr. Vikram Seth",
            "phone": "9444056789",
            "email": "vikram.seth@health.org",
            "address": "32, Temple Road, Alwarpet",
            "city": "Chennai",
            "zip": "600018",
            "notes": "Deliver in the morning hours."
        },
        "items": [
            {"id": "p2", "name": "Foxtail Millet Whole Grains", "price": 160, "weight": "1 kg", "quantity": 3},
            {"id": "p8", "name": "Millet Muesli & Berries", "price": 240, "weight": "500g", "quantity": 1}
        ],
        "subtotal": 720,
        "shipping": 0,
        "total": 720,
        "status": "completed"
    }
]

def load_orders():
    if not os.path.exists(ORDERS_FILE):
        save_orders(MOCK_ORDERS)
        return MOCK_ORDERS
    try:
        with open(ORDERS_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return []

def save_orders(orders):
    try:
        with open(ORDERS_FILE, "w", encoding="utf-8") as f:
            json.dump(orders, f, indent=4)
    except Exception as e:
        print(f"Error saving orders: {e}")

class MilletMitraHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        # Disable caching for API calls to ensure fresh data
        if self.path.startswith("/api/"):
            self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
            self.send_header("Pragma", "no-cache")
            self.send_header("Expires", "0")
        super().end_headers()

    def do_GET(self):
        if self.path == "/api/orders":
            orders_data = load_orders()
            self.send_response(200)
            self.send_header("Content-type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps(orders_data).encode("utf-8"))
        else:
            # Serve static files normally
            super().do_GET()

    def do_POST(self):
        if self.path == "/api/orders":
            content_length = int(self.headers["Content-Length"])
            post_data = self.rfile.read(content_length)
            try:
                new_order = json.loads(post_data.decode("utf-8"))
                current_orders = load_orders()
                current_orders.insert(0, new_order)
                save_orders(current_orders)
                
                self.send_response(200)
                self.send_header("Content-type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({"status": "success", "id": new_order["id"]}).encode("utf-8"))
            except Exception as e:
                self.send_response(400)
                self.send_header("Content-type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({"status": "error", "message": str(e)}).encode("utf-8"))

        elif self.path == "/api/orders/status":
            content_length = int(self.headers["Content-Length"])
            post_data = self.rfile.read(content_length)
            try:
                data = json.loads(post_data.decode("utf-8"))
                order_id = data.get("id")
                new_status = data.get("status")
                
                current_orders = load_orders()
                updated = False
                for o in current_orders:
                    if o["id"] == order_id:
                        o["status"] = new_status
                        updated = True
                        break
                
                if updated:
                    save_orders(current_orders)
                    self.send_response(200)
                    self.send_header("Content-type", "application/json")
                    self.end_headers()
                    self.wfile.write(json.dumps({"status": "success"}).encode("utf-8"))
                else:
                    self.send_response(404)
                    self.send_header("Content-type", "application/json")
                    self.end_headers()
                    self.wfile.write(json.dumps({"status": "error", "message": "Order not found"}).encode("utf-8"))
            except Exception as e:
                self.send_response(400)
                self.send_header("Content-type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({"status": "error", "message": str(e)}).encode("utf-8"))

        elif self.path == "/api/orders/delete":
            content_length = int(self.headers["Content-Length"])
            post_data = self.rfile.read(content_length)
            try:
                data = json.loads(post_data.decode("utf-8"))
                order_id = data.get("id")
                
                current_orders = load_orders()
                filtered_orders = [o for o in current_orders if o["id"] != order_id]
                
                if len(filtered_orders) < len(current_orders):
                    save_orders(filtered_orders)
                    self.send_response(200)
                    self.send_header("Content-type", "application/json")
                    self.end_headers()
                    self.wfile.write(json.dumps({"status": "success"}).encode("utf-8"))
                else:
                    self.send_response(404)
                    self.send_header("Content-type", "application/json")
                    self.end_headers()
                    self.wfile.write(json.dumps({"status": "error", "message": "Order not found"}).encode("utf-8"))
            except Exception as e:
                self.send_response(400)
                self.send_header("Content-type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({"status": "error", "message": str(e)}).encode("utf-8"))
        else:
            self.send_response(404)
            self.end_headers()

if __name__ == "__main__":
    print(f"Starting Millet Mitra Backend Server on port {PORT}...")
    server_address = ("", PORT)
    httpd = http.server.HTTPServer(server_address, MilletMitraHandler)
    httpd.serve_forever()
