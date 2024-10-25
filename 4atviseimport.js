var ACLIB = {};
(function make_aclib(ACLIB){
//
const COLS_ATDP = {
	LOCAL_NAME: 0,
	COMMENT: 1,
	FOLDERS: 2,
	ATVISE_NAME: 3,
	DATATYPE: 4,  	
	SERVER_NAME: 5,  	
	NAMESPACE: 6,  	
	DEVICE_NAME: 7, 
	COMMUNICATION: 8,  	
	OBJECT_TYPE: 9,  	
	HISTORY_GROUPS: 10,
	INTERCEPT: 11,  
	SLOPE: 12,  
	DISPLAY: 13,  
	DP_ID: 14,  
	AKS_CODE: 15,  
	TEXT: 16,  
	CUSTOM1: 17,  
	CUSTOM2: 18,  
	CUSTOM3: 19,  
	CUSTOM4: 20,  
	CUSTOM5: 21,  
	CUSTOM6: 22,  
	CUSTOM7: 23,  
	CUSTOM8: 24,  
	CUSTOM9: 25,  
	CUSTOM10: 26,  
	NODE_VALUE: 27,    	
}

//
const COLS_GDPL = {
	LOCALNAME: 92,
	LAUFNBR: 0,
	OBJ_NAME: 2,
	COMMENT: 5,
	AKS: 22,  	
	DATATYPE: 49,  	
	MELD01: 65,  	
	MELD02: 66,  
	MELD03: 67,  
	MELD04: 68,  
	MELD05: 69,  
	MELD06: 70,  
	MELD07: 71,  
	MELD08: 72,  
	MELD09: 73,  
	MELD10: 74,  	
	MELD11: 75,  
	MxA1: 76,
	MxA2: 77,
	MxS: 78,
	ALARM: 79,  
	STOER: 80,  
	MELD: 81,  
}
  
//  GDPL lesen
function readGDPLEntries(arGDPLData) {
  let oGDPLRows = new Object();
  //
  for (let i = 0; i < arGDPLData.length; i++) {
    //
    let oRow = new Object();
    
    let arGDPLRowEntries = arGDPLData[i].split(';'); 
    let sLocName = arGDPLRowEntries[COLS_GDPL.LOCALNAME];
    if (sLocName && (sLocName.length > 0)) {
      //  maybe more than 1 entry (comma separated)  
      let arLocName = sLocName.split(','); 
      for (let j = 0; j < arLocName.length; j++) {
        //
        let sLocNameEntry = arLocName[j].trim();
        if (sLocNameEntry.length > 0) {
          oRow.LocName = sLocNameEntry;
          console.log("oGDPLRows - oRow.LocName : " + oRow.LocName);   
          //
          oRow.LaufNr = arGDPLRowEntries[COLS_GDPL.LAUFNBR] + j.toString();
          oRow.ObjName = arGDPLRowEntries[COLS_GDPL.OBJ_NAME];
          oRow.Comment = arGDPLRowEntries[COLS_GDPL.COMMENT];
          oRow.Aks = arGDPLRowEntries[COLS_GDPL.AKS];
          oRow.Datatype = arGDPLRowEntries[COLS_GDPL.DATATYPE];
          //
          oRow.Meld01 = arGDPLRowEntries[COLS_GDPL.MELD01];
          oRow.Meld02 = arGDPLRowEntries[COLS_GDPL.MELD02];
          oRow.Meld03 = arGDPLRowEntries[COLS_GDPL.MELD03];
          oRow.Meld04 = arGDPLRowEntries[COLS_GDPL.MELD04];
          oRow.Meld05 = arGDPLRowEntries[COLS_GDPL.MELD05];
          oRow.Meld06 = arGDPLRowEntries[COLS_GDPL.MELD06];
          oRow.Meld07 = arGDPLRowEntries[COLS_GDPL.MELD07];
          oRow.Meld08 = arGDPLRowEntries[COLS_GDPL.MELD08];
          oRow.Meld09 = arGDPLRowEntries[COLS_GDPL.MELD09];      
          oRow.Meld10 = arGDPLRowEntries[COLS_GDPL.MELD10];     
          oRow.Meld11 = arGDPLRowEntries[COLS_GDPL.MELD11];     
          //
          oRow.MxA1 = arGDPLRowEntries[COLS_GDPL.MxA1];    
          oRow.MxA2 = arGDPLRowEntries[COLS_GDPL.MxA2]; 
          oRow.MxS = arGDPLRowEntries[COLS_GDPL.MxS]; 
          oRow.Alarm = arGDPLRowEntries[COLS_GDPL.ALARM]; 
          oRow.Stoer = arGDPLRowEntries[COLS_GDPL.STOER]; 
          oRow.Meld = arGDPLRowEntries[COLS_GDPL.MELD];   
          //
          oGDPLRows[oRow.LocName] = oRow;
        }
      }
    }
  }
  //
  return oGDPLRows;
}

//  AtDP lesen
function readAtDPCells(range) {
  //
  let atdpValues = range.values;
  let atdpAddresses = range.address;
  //  alert("cell values : " + atdpValues);  
  let atdpRows = [];
  let iAtdpRowNbr = 0;
  //
  for (let i = 0; i < atdpValues.length; i++) {
    //
    let oRow = new Object();
    oRow.LocName = atdpValues[i][COLS_ATDP.LOCAL_NAME];
    //  alert("oRow.LocName : " + oRow.LocName); 
    if (oRow.LocName && (oRow.LocName != "")) {
      //
      oRow.Comment = atdpValues[i][COLS_ATDP.COMMENT];
      oRow.Folders = atdpValues[i][COLS_ATDP.FOLDERS];
      oRow.AtviseName = atdpValues[i][COLS_ATDP.ATVISE_NAME];
      oRow.DataType = atdpValues[i][COLS_ATDP.DATATYPE];
      oRow.ServerName = atdpValues[i][COLS_ATDP.SERVER_NAME];
      oRow.Namespace = atdpValues[i][COLS_ATDP.NAMESPACE];
      oRow.DeviceName = atdpValues[i][COLS_ATDP.DEVICE_NAME];
      oRow.Communication = atdpValues[i][COLS_ATDP.COMMUNICATION];
      //
      oRow.ObjectType = atdpValues[i][COLS_ATDP.OBJECT_TYPE];
      oRow.HistoryGroups = atdpValues[i][COLS_ATDP.HISTORY_GROUPS];
      oRow.Intercept = atdpValues[i][COLS_ATDP.INTERCEPT];
      oRow.Slope = atdpValues[i][COLS_ATDP.SLOPE];
      oRow.Display = atdpValues[i][COLS_ATDP.DISPLAY];
       //
      oRow.DpId = atdpValues[i][COLS_ATDP.DP_ID];
      oRow.AksCode = atdpValues[i][COLS_ATDP.AKS_CODE];
      //  console.log("atdpRows - oRow.AksCode : " + oRow.AksCode); 
      oRow.Text = atdpValues[i][COLS_ATDP.TEXT];
      oRow.Custom1 = atdpValues[i][COLS_ATDP.CUSTOM1];
      oRow.Custom2 = atdpValues[i][COLS_ATDP.CUSTOM2];
      oRow.Custom3 = atdpValues[i][COLS_ATDP.CUSTOM3];
      oRow.Custom4 = atdpValues[i][COLS_ATDP.CUSTOM4];
      oRow.Custom5 = atdpValues[i][COLS_ATDP.CUSTOM5];
      oRow.Custom6 = atdpValues[i][COLS_ATDP.CUSTOM6];
      oRow.Custom7 = atdpValues[i][COLS_ATDP.CUSTOM7];
      oRow.Custom8 = atdpValues[i][COLS_ATDP.CUSTOM8];
      oRow.Custom9 = atdpValues[i][COLS_ATDP.CUSTOM9];
      oRow.Custom10 = atdpValues[i][COLS_ATDP.CUSTOM10];
      //
      oRow.NodeValue = atdpValues[i][COLS_ATDP.NODE_VALUE];     
      //  console.log("oRow : " + JSON.stringify(oRow));
      
      //
      atdpRows[iAtdpRowNbr] = oRow;
      iAtdpRowNbr++;        
    }
  }
  //
  return atdpRows;
}

function testFoo(callParam) {
	let test = "hall" + callParam;
	return test;
}

//
ACLibrary.readGDPLEntries = readGDPLEntries;
ACLibrary.readAtDPCells = readAtDPCells;
ACLibrary.testFoo = testFoo;
//
})(ACLIB);
