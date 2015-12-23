from SpinPapiClient import SpinPapiClient
import urllib, json

client = SpinPapiClient('uid', 'secret')

url = client.query({
    'method': 'getRegularShowsInfo', 
    'When' : 'now',
    'station': 'ksdt'})
response = urllib.urlopen(url)
data = json.loads(response.read())

#print json.dumps(data, indent=4)

if data['success'] is True and data['results'] is not None:
    print data['results'][0]['ShowName']
else:
    print '-1'

