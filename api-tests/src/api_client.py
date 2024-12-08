import requests
from .data import USERS_ENDPOINT, HEADERS

def create_user(payload):
    """
    Create the user on the app with the payload
    :param payload: Payload data from data source
    :return: none
    """
    response = requests.post(USERS_ENDPOINT, headers=HEADERS, json=payload)
    return response

def get_user(user_id):
    """
    Get the user data from api by user id
    :param user_id: user id to get the info from api
    :return: none
    """
    response = requests.get(f"{USERS_ENDPOINT}/{user_id}", headers=HEADERS)
    return response

def delete_user(user_id):
    """
    Delete the user from api using the user id
    :param user_id: user id to be deleted from api
    :return: none
    """
    response = requests.delete(f"{USERS_ENDPOINT}/{user_id}", headers=HEADERS)
    return response