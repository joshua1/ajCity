const sessionManage = function(tokenId) {
  
    const request=`
        <SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:eb="http://www.ebxml.org/namespaces/messageHeader" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsd="http://www.w3.org/1999/XMLSchema">
        <SOAP-ENV:Header><eb:MessageHeader SOAP-ENV:mustUnderstand="1" eb:version="1.0">
        <eb:ConversationId>${process.env.SABRE_CONVERSATION_ID.trim()}</eb:ConversationId><eb:From>
        <eb:PartyId type="urn:x12.org:IO5:01">9999</eb:PartyId>
        </eb:From><eb:To><eb:PartyId type="urn:x12.org:IO5:01">123123</eb:PartyId>
        </eb:To><eb:CPAId>${process.env.SABRE_IPCC.trim()}</eb:CPAId>
        <eb:Service eb:type="OTA">OTA_PingRQ</eb:Service>
        <eb:Action>OTA_PingRQ</eb:Action>
        <eb:MessageData><eb:MessageId>1000</eb:MessageId>
        <eb:Timestamp>2001-02-15T11:15:12Z</eb:Timestamp>
        <eb:TimeToLive>2001-02-15T11:15:12Z</eb:TimeToLive></eb:MessageData></eb:MessageHeader>
        <wsse:Security xmlns:wsse="http://schemas.xmlsoap.org/ws/2002/12/secext" xmlns:wsu="http://schemas.xmlsoap.org/ws/2002/12/utility">
        <wsse:BinarySecurityToken>${tokenId}</wsse:BinarySecurityToken>
        </wsse:Security>
        </SOAP-ENV:Header>
        <SOAP-ENV:Body>
        <OTA_PingRQ xmlns="http://www.opentravel.org/OTA/2003/05" TimeStamp="2011-02-18T10:15:00-06:00" Version="1.0.0">
        <EchoData>Are you there</EchoData>
        </OTA_PingRQ>
        </SOAP-ENV:Body>
        </SOAP-ENV:Envelope>`;
    return request;
}

export default sessionManage;
