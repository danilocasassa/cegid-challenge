from dotenv import load_dotenv
import os

load_dotenv()

BASE_URL = "https://gorest.co.in"
API_VERSION = "/public/v2"
API_TOKEN = os.getenv("API_TOKEN")
USERS_ENDPOINT = f"{BASE_URL}{API_VERSION}/users"

HEADERS = {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Authorization": f"Bearer {API_TOKEN}",
}

USER_PAYLOAD = {
    "name": "Danilo Casassa",
    "gender": "male",
    "email": "danilo_casassa@hotmail.com",
    "status": "active",
}
