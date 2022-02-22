//Recieve msg and convert to String "data" then send to http


//Libraries
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>


//Object creation to use libraries
HTTPClient http;


//Variable creation to use libraries
const char* ssid     = ""; //WIFI NAME
const char* password = ""; //WIFI PASSWORD
String webUrl = ""; //url to send data to


//Source code local variables
unsigned long time2 = 0;
unsigned long timepassed = 0;
String data = "";
String multiData = "";
int county = 0;


//My Own Functions.............START.............
void initializeWifi()
{
  WiFi.begin(ssid, password);
  while(WiFi.status() != WL_CONNECTED){
    delay(500);
  }
  Serial.println("It has Started");
}


void reconnectWifi()
{
    Serial.println("Error: Disconnected!");
    delay(5000);
    WiFi.disconnect();
    initializeWifi();
}


void uploadTime()
{
  timepassed = millis() - time2;
  time2 = millis();
  Serial.print("Time:");
  Serial.println(millis());
  Serial.print("Difference");
  Serial.println(timepassed);
}


void sendHttp(String data2) //parameter: your data of type string
{ 
  data2.replace(" ", "+");
  if(WiFi.status() == WL_CONNECTED)
  {
    //uploadTime();
    http.begin(webUrl+data2);
    http.GET();
    http.end();
  }
  else
  {
    reconnectWifi();
  }
}


void sendMultiDocs(String multiData2, int county2) //send multiple strings, just keep putting all strings like in sendHttp and its will combine them itself; county is the number of strings you want to concatenate
{
  if(county < county2)
  {
    multiData += multiData2;
    county += 1;
  }
  else
  {
    sendHttp(multiData);
    multiData = "";
    county = 0;
  }
}
//My Own Functions.............END.............




void setup() {
  Serial.begin(115200);
  initializeWifi();
}


void loop() {
  sendMultiDocs(data, 5);
}
