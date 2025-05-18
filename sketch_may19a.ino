
#include <SPI.h>
#include <MFRC522.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

#define WIFI_SSID "V2027"
#define WIFI_PASSWORD "12345678"
const String serverUrl = "http://192.168.239.40:3000";

#define SS_PIN 22
#define RST_PIN 21
#define SCK_PIN 19
#define MOSI_PIN 23
#define MISO_PIN 25

MFRC522 rfid(SS_PIN, RST_PIN);

void setup() {
  Serial.begin(115200);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWiFi connected");

  SPI.begin(SCK_PIN, MISO_PIN, MOSI_PIN, SS_PIN);
  rfid.PCD_Init();
}

void loop() {
  if (!rfid.PICC_IsNewCardPresent() || !rfid.PICC_ReadCardSerial()) return;

  String uidStr = "";
  for (byte i = 0; i < rfid.uid.size; i++) {
    if (rfid.uid.uidByte[i] < 0x10) uidStr += "0";
    uidStr += String(rfid.uid.uidByte[i], HEX);
  }

  Serial.println("UID Scanned: " + uidStr);

  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(serverUrl + "/api/rfid");
    http.addHeader("Content-Type", "application/json");

    StaticJsonDocument<128> doc;
    doc["uid"] = uidStr;
    String json;
    serializeJson(doc, json);

    int response = http.POST(json);
    Serial.print("POST Response: ");
    Serial.println(response);
    http.end();
  }

  rfid.PICC_HaltA();
  delay(1500);
}



