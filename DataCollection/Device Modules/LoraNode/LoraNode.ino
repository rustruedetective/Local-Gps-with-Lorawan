//Gateway RSSI Values collector
//For uint8_t* arguments input "c" character


//Libraries
#include <SPI.h>
#include <RH_RF95.h>


//Object creation to use libraries
RH_RF95 rf95;


//Variable creation to use libraries
float frequency = 433.0;


//Local source code variables
String data = "";


//My Own Functions.............START.............
void initializeLoraShield() //You can change values of radio here
{
  Serial.println("[LORAWAN STARTING]");

  if (!rf95.init())
    Serial.println("[LORAWAN INITIALIZATION FAILED]");

  rf95.setFrequency(frequency);
  rf95.setTxPower(19);  
  rf95.setSpreadingFactor(7);
  rf95.setSignalBandwidth(125000);
  rf95.setCodingRate4(5);

  Serial.println("[LORAWAN STARTED]");
}


void msgSend(uint8_t* msgS) //s = character to send
{
  uint8_t* s = msgS;
  rf95.send(s, sizeof(s));
  rf95.waitPacketSent();
}


int msgReceive()
{
  while(!rf95.available());
  if (rf95.available())
    {
      uint8_t r[RH_RF95_MAX_MESSAGE_LEN]; //r = msg to receive
      uint8_t len = sizeof(r);
      if (rf95.recv(r, &len))
        {
          return (int)r[0];
        }
    }
}


int msgReceive2(unsigned long timeout) //this one has a timeout
{
  unsigned long timepassed = millis();
  while(!rf95.available())
  {
    if(millis() - timepassed >= timeout)
      {
        return -1;
      }
  }
  if (rf95.available())
    {
      uint8_t r[RH_RF95_MAX_MESSAGE_LEN]; //r = msg to receive
      uint8_t len = sizeof(r);
      if (rf95.recv(r, &len))
        {
          return (int)r[0];
        }
    }
}


//Note this function does not handle the case that it recieves some other wrong character input, so for that you can make it return 3 int values, 3rd for receiving wrong character
bool sendThenReceive(uint8_t* ch, uint8_t* ch2, unsigned long timeout) //ch = character want to send and recieve back
{
  msgSend(ch);
  int temp = msgReceive2(timeout);

  if( (int)ch2[0] == temp )
  {
    return true; //character matched
  }
  else if( -1 == temp)
  {
    return false; //timeout
  }
}


void strictRssi(unsigned long timeout)  //should be called first
{
  data = "";
  if( true == sendThenReceive("a", "1", timeout) )
    {
      data += "GateA: " + String(rf95.lastRssi()) + " ";

      
      if( true == sendThenReceive("b", "2", timeout) )
        {
          data += "GateB: " + String(rf95.lastRssi()) + " ";


          if( true == sendThenReceive("c", "3", timeout) )
            {
              data += "GateC: " + String(rf95.lastRssi()) + " ";
              
            }
            else
            {
              Serial.println("c not received");
            }
        }
        else
        {
          Serial.println("b not received");
        }
    }
    else
    {
      Serial.println("a not received");
    }
}


void looseRssi(unsigned long timeout)  //should be called first
{
  data = "";
  if( true == sendThenReceive("a", "1", timeout) )
    {
      data += "GateA: " + String(rf95.lastRssi()) + " ";
    }
  else
    {
      Serial.println("a not received");
    }


  if( true == sendThenReceive("b", "2", timeout) )
    {
      data += "GateB: " + String(rf95.lastRssi()) + " ";
    }
  else
    {
      Serial.println("b not received");
    }


  if( true == sendThenReceive("c", "3", timeout) )
    {
      data += "GateC: " + String(rf95.lastRssi()) + " ";
    }
  else
    {
      Serial.println("c not received");
    }         
}
//My Own Functions.............End.............




void setup() { 
  Serial.begin(9600);
  initializeLoraShield();
}

void loop() {
  looseRssi(500);
  Serial.println(data);
}







/*We need to try these*/
/*
  //Different Combination for distance and speed examples: 
  Example 1: Bw = 125 kHz, Cr = 4/5, Sf = 128chips/symbol, CRC on. Default medium range
    rf95.setSignalBandwidth(125000);
    rf95.setCodingRate4(5);
    rf95.setSpreadingFactor(7);
  Example 2: Bw = 500 kHz, Cr = 4/5, Sf = 128chips/symbol, CRC on. Fast+short range
    rf95.setSignalBandwidth(500000);
    rf95.setCodingRate4(5);
    rf95.setSpreadingFactor(7);
  Example 3: Bw = 31.25 kHz, Cr = 4/8, Sf = 512chips/symbol, CRC on. Slow+long range
    rf95.setSignalBandwidth(31250);
    rf95.setCodingRate4(8);
    rf95.setSpreadingFactor(9);
  Example 4: Bw = 125 kHz, Cr = 4/8, Sf = 4096chips/symbol, CRC on. Slow+long range
    rf95.setSignalBandwidth(125000);
    rf95.setCodingRate4(8);
    rf95.setSpreadingFactor(12); 
  */
