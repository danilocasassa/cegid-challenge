import pytest
from src.api_client import create_user, get_user, delete_user
from src.data import USER_PAYLOAD

# This fixture will return the user id created for these scenarios
@pytest.fixture(scope="module")
def created_user_id():
    response = create_user(USER_PAYLOAD)
    assert response.status_code == 201
    user_id = response.json()["id"]
    return user_id 

# Create the user on api
def test_create_user(created_user_id):
    assert created_user_id is not None

# Collect the user data from the api and check if the data is correct
def test_validate_user(created_user_id):
    response = get_user(created_user_id)
    assert response.status_code == 200
    data = response.json()

    assert data["id"] == created_user_id
    assert data["name"] == USER_PAYLOAD["name"]
    assert data["gender"] == USER_PAYLOAD["gender"]
    assert data["email"] == USER_PAYLOAD["email"]
    assert data["status"] == USER_PAYLOAD["status"]

# Delete the user created and check if the data was deleted
def test_delete_user(created_user_id):
    response = delete_user(created_user_id)
    assert response.status_code == 204

    response = get_user(created_user_id)
    assert response.status_code == 404
    assert response.json()['message'] == "Resource not found"