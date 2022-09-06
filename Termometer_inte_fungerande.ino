#include <AM2320.h>
#include "FirebaseESP8266.h"
#include <ESP8266WiFi.h>
#include <WiFiUdp.h>
#include <NTPClient.h>



#define FIREBASE_HOST "termometer-projekt-basgrupp3.firebaseio.com"
#define FIREBASE_AUTH "1jWU7x3k3q9n8KBfFj7QvfzEEMtmAKF4zrfHAa4L"
#define WIFI_SSID "ABB_Indgym_Guest"
#define WIFI_PASSWORD "Welcome2abb"
//Define Firebase Data objects

const long utcOffsetInSeconds = 7200;
WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, "pool.ntp.org", utcOffsetInSeconds);

FirebaseData firebaseData;
String path = "/temps";
String nodeID = "tempNode";
AM2320 sensor;
void setup()  {     //Startar programmet utan att retunera ett värde en gång
  //enable serial communication
  Serial.begin(115200); //Startar så att kortet kan kommunicera med serial monitor på datorn(115200 står för hur snabbt det uppdateras)
  sensor.begin(14,12); //(SDA,SCL) -(d5,D6) pinne 14(dvs d5) är serial data, pinne 12(dvs d6) är serial clock
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-fi");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    
    delay(300);
  }
  
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  Firebase.reconnectWiFi(true);
  timeClient.begin();
}
void loop(){ //En loop som går hela tiden utan att retunera ett värde
    static uint32_t previousTime = 0;
    uint32_t currentTime = millis();
    
  if (sensor.measure()) {     //Loopa mätningen så länge som sensorn mäter nåt
    Serial.print("Temperature: "); //Skriver temperaturen
    Serial.println(sensor.getTemperature()); //Skriver temperaturen och gör en ny rad

        if (currentTime-previousTime >= 60*60*1000){
          previousTime = currentTime;
        
          String dateTime = getFormattedDate(); 
       
          Serial.println(dateTime);
          if(Firebase.setDouble(firebaseData, "/temp-time/temp-time5/" + dateTime, sensor.getTemperature())) {
            Serial.println("Success!");
          } else {
            Serial.println("Failed!");
          }
      }
    }
      
    if(Firebase.setDouble(firebaseData, path + "/" + "temp5", sensor.getTemperature())) {
      Serial.println("Success!");
    } else {
      Serial.println("Failed!");
    }

     if(Firebase.setDouble(firebaseData, "humidity/humidity5", sensor.getHumidity())) {
      Serial.println("Success!");
    } else {
      Serial.println("Failed!");
    }
  if (sensor.measure()) {
    Serial.print("Humidity: ") ;  //Skriver ut luftfuktigheten
    Serial.println(sensor.getHumidity());   //Skriver ut luftfuktigheten och gör en ny rad
  }
  else{     //Om inte sensorn mäter ett värde
    int errorCode = sensor.getErrorCode(); //definerar variablen errorcode
    switch (errorCode) {                   //Kör switchen errorcode
      case 1: Serial.println("ERR: Sensor is offline"); break; //skriver sensor is offline om errorcode caset är 1
      case 2: Serial.println("ERR: CRC validation failed.") ;break; //skriver crc validation failed om error caset är 2
    }
  }
  delay(900000);   //Delayar loopen så att det inte skrivs för snabbt
}

String getFormattedDate(){
    timeClient.update();
   
    //Räkna ut Datum och skriv till currentDate
    unsigned long epochTime = timeClient.getEpochTime();
    struct tm *ptm = gmtime ((time_t *)&epochTime);
    int monthDay = ptm->tm_mday;
    int currentMonth = ptm->tm_mon+1;
    int currentYear = ptm->tm_year+1900;
    String currentDate = String(currentYear) + "-" + String(currentMonth) + "-" + String(monthDay);
    Serial.print("Current date: ");
    Serial.println(currentDate);
    String currentTime = timeClient.getFormattedTime();
   
    //Serial.println("/temp/" + currentDate + "/" + currentTime);
    return(currentDate + "/" + currentTime);
 
  }
