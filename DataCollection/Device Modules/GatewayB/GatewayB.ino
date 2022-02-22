//Gateway
//For uint8_t* arguments input "c" character


//Libraries
#include <Console.h>
#include <SPI.h>
#include <RH_RF95.h>


//Definitions
#define BAUDRATE 115200  //NOTE: Gateways only work at 115200


//Object creation to use libraries
RH_RF95 rf95;


//Variable creation to use libraries
float frequency = 433.0;


//My Own Functions.............START.............
void initializeGateway() //You can change values of radio here
{
  Console.println("[GATEWAY CLIENT B STARTING]");

  if (!rf95.init())
    Console.println("[GATEWAY CLIENT B INITIALIZATION FAILED]");

  rf95.setFrequency(frequency);
  rf95.setTxPower(19);
  rf95.setSpreadingFactor(7);
  rf95.setSignalBandwidth(125000);
  rf95.setCodingRate4(5);

  Console.println("[GATEWAY CLIENT 1 STARTED]");
}


void msgSend(uint8_t* msgS) //s = msg to send
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


void receiveThenSend(uint8_t* ch, uint8_t* ch2)
{
  if( (int)ch[0] == msgReceive() )
  {
    msgSend(ch2);
  }
}
//My Own Functions.............End.............




void setup() {
  Bridge.begin(BAUDRATE);
  Console.begin();
  initializeGateway();
}


void loop() {
  receiveThenSend("b", "2");
}
