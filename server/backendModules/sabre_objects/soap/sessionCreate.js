module.exports = function () {
  const request =
   `<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:eb="http://www.ebxml.org/namespaces/messageHeader" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsd="http://www.w3.org/1999/XMLSchema">
    <SOAP-ENV:Header><eb:MessageHeader SOAP-ENV:mustUnderstand="1" eb:version="1.0">
      <eb:ConversationId>${process.env.SABRE_CONVERSATION_ID.trim()}</eb:ConversationId><eb:From>
    <eb:PartyId type="urn:x12.org:IO5:01">http://demo.sabre.com.ng</eb:PartyId>
    </eb:From><eb:To><eb:PartyId type="urn:x12.org:IO5:01">123123</eb:PartyId>
    </eb:To><eb:CPAId>${process.env.SABRE_IPCC.trim()}</eb:CPAId>
    <eb:Service eb:type="OTA">SessionCreateRQ</eb:Service>
    <eb:Action>SessionCreateRQ</eb:Action>
    <eb:MessageData><eb:MessageId>1000</eb:MessageId>
    <eb:Timestamp>2001-02-15T11:15:12Z</eb:Timestamp>
    <eb:TimeToLive>2001-02-15T11:15:12Z</eb:TimeToLive></eb:MessageData></eb:MessageHeader>
    <wsse:Security xmlns:wsse="http://schemas.xmlsoap.org/ws/2002/12/secext" xmlns:wsu="http://schemas.xmlsoap.org/ws/2002/12/utility">
    <wsse:UsernameToken>
      <wsse:Username>${process.env.SABRE_USERNAME.trim()}</wsse:Username>
      <wsse:Password>${process.env.SABRE_PASSWORD.trim()}</wsse:Password>
      <Organization>${process.env.SABRE_IPCC.trim()}</Organization>
      <Domain>${process.env.SABRE_DOMAIN.trim()}</Domain>
    </wsse:UsernameToken>
    </wsse:Security>
    </SOAP-ENV:Header>
    <SOAP-ENV:Body>
     <SessionCreateRQ>
        <POS>
           <Source PseudoCityCode="${process.env.SABRE_IPCC.trim()}"/>
        </POS>
     </SessionCreateRQ>
  </SOAP-ENV:Body>
        </SOAP-ENV:Envelope>`;
  return request;
};
