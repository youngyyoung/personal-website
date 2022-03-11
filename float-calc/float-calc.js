var exponentBits;
var mantissaBits;
var offset;

var decInt = "0";
var decFrac = "0";


function calculate() {
    var inputs = document.getElementsByTagName('input')

    exponentBits = parseInt(inputs[0].value);
    mantissaBits = parseInt(inputs[1].value);
    offset = (2 ** (exponentBits - 1)) - 1;

    var binVal = inputs[2].value;

    var decVal = inputs[3].value;
    
    var decStr = decVal.split(".");
    decInt = decStr[0];
    decFrac = decStr[1];

    setSN_SB();
    setSN_B();
    setSN_D();
    setLN_SB();
    setLN_B();
    setLN_D();
    setSD_SB();
    setSD_B();
    setSD_D();
    setLD_SB();
    setLD_B();
    setLD_D();
    //dec2bin();
}
function dec2bin() {
    //var minval = 

    var fraction = BigInt(decFrac);
    fraction = fraction * shiftTen;


    var integer = BigInt(decInt);


}
function setLD_SB() {
    var LD_SB = "0.";
    for(let i = 0; i < mantissaBits; i ++) {
        LD_SB += "1";
    }
    LD_SB += " x 2e";
    LD_SB += "" + (1 - offset);

    document.getElementById("LD_SB").textContent = LD_SB;
}
function setLD_B() {
    var LD_B = "0 "
    for(let i = 0; i < exponentBits - 1; i ++) {
        LD_B += "0";
    }
    LD_B += "0 ";
    for(let i = 0; i < mantissaBits; i ++) {
        LD_B += "1";
    }
    document.getElementById("LD_B").textContent = LD_B;
}
function setLD_D() {
    var divby = BigInt(2) ** BigInt(offset - 1 + mantissaBits);
    var total = BigInt(0);
    for(let i = 0; i < mantissaBits; i ++) {
        total += divby / (BigInt(2) ** BigInt(i + offset));
    }
    var counter = 0;
    while(total % divby != BigInt(0)){
        total = total * BigInt(10);
        counter ++;
    }
    total = total / divby;

    var retStr = total.toString();
    retStr = retStr.substring(0, 1) + "." + retStr.substring(1) + " X 10e" + (counter * -1 + retStr.length-1);
    document.getElementById("LD_D").textContent = retStr;
}
function setSD_SB() {
    var SD_SB = "1.0 x 2e" + (1 - offset - mantissaBits);

    document.getElementById("SD_SB").textContent = SD_SB;
}
function setSD_B() {
    var SD_B = "0 "
    for(let i = 0; i < exponentBits; i ++) {
        SD_B += "0";
    }
    SD_B += " ";
    for(let i = 0; i < mantissaBits -1; i ++) {
        SD_B += "0";
    }
    SD_B += "1";
    document.getElementById("SD_B").textContent = SD_B;
}
function setSD_D() {
    var value = BigInt(2) ** BigInt(-1 * (1 - offset - mantissaBits));
    
    var val = value;
    var counter = 0;

    while(val > 0) {
        val = val / BigInt(10);
        counter ++;
    }
    var final = counter;

    var cumquat;
    do {
        cumquat = (BigInt(10) ** BigInt(counter)) / value;
        if(cumquat % BigInt(100) == BigInt(0))
            break;
        counter ++;
    }
    while(true);


    var retval = cumquat.toString();
    retval = retval.slice(0,1) + "." + retval.slice(1, retval.length - 2) + " X 10e" + (final * -1);


    document.getElementById("SD_D").textContent = retval;
}
function setLN_SB() {
    var LN_SB = "1.";
    for(let i = 0; i < mantissaBits; i ++) {
        LN_SB += "1";
    }
    LN_SB += " x 2e";
    LN_SB += "" + ((2 ** (exponentBits))-2 - offset);

    document.getElementById("LN_SB").textContent = LN_SB;
}
function setLN_B() {
    var LN_B = "0 "
    for(let i = 0; i < exponentBits - 1; i ++) {
        LN_B += "1";
    }
    LN_B += "0 ";
    for(let i = 0; i < mantissaBits; i ++) {
        LN_B += "1";
    }
    document.getElementById("LN_B").textContent = LN_B;
}
function setLN_D() {
    var whatever = BigInt(0);
    var decAmount = 1;
    for(let i = 0; i <= mantissaBits; i ++) {
        whatever = whatever + BigInt(2) ** BigInt(i);
    }
    
    for(let i = 0; i < ((2 ** (exponentBits))-2 - offset - mantissaBits); i ++) {
        whatever = whatever * BigInt(2);
    }
    if(((2 ** (exponentBits))-2 - offset - mantissaBits) <= 0) {
        whatever = whatever * BigInt(1000);
        whatever = whatever / (BigInt(2) ** BigInt((2 ** (exponentBits)) - offset - mantissaBits));
        decAmount = 4;
    }
   
    
    var retval = whatever.toString();


    retval = retval.slice(0,1) + "." + retval.slice(1, retval.length) + " X 10e" + (retval.length - decAmount);
    document.getElementById("LN_D").textContent = retval;
}
function setSN_SB() {
    var SN_SB = "1.";
    for(let i = 0; i < mantissaBits; i ++) {
        SN_SB += "0";
    }
    SN_SB += " x 2e";
    SN_SB += "" + (1 - offset);

    document.getElementById("SN_SB").textContent = SN_SB;
}
function setSN_B() {
    var SN_B = "0 "
    for(let i = 0; i < exponentBits - 1; i ++) {
        SN_B += "0";
    }
    SN_B += "1 ";
    for(let i = 0; i < mantissaBits; i ++) {
        SN_B += "0";
    }
    document.getElementById("SN_B").textContent = SN_B;
}
function setSN_D() {
    var value = BigInt(2) ** (BigInt(offset) - BigInt(1));
    
    var val = value;
    var counter = 0;

    while(val > 0) {
        val = val / BigInt(10);
        counter ++;
    }
    var final = counter;

    var cumquat;
    do {
        cumquat = (BigInt(10) ** BigInt(counter)) / value;
        if(cumquat % BigInt(100) == BigInt(0))
            break;
        counter ++;
    }
    while(true);


    var retval = cumquat.toString();
    retval = retval.slice(0,1) + "." + retval.slice(1, retval.length - 2) + " X 10e" + (final * -1);


    document.getElementById("SN_D").textContent = retval;
}
