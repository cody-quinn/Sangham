import requests
from decouple import config


def get_address(latitude: float, longitude: float):

    api_key = config("GOOGLE_GEOCODE_API_KEY")

    url = f"https://maps.googleapis.com/maps/api/geocode/json?latlng={latitude},{longitude}&key={api_key}"
    data = requests.get(url)
    data = data.json()['results']
    try:
        return data[0]['formatted_address']
    except:
        return "adddress cannot be found"