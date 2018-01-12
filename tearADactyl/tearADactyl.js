'use strict';

/* 
*This function takes a string input and returns a 4 character hex cipher(fingerprint) of the input using UTF Zero-Width Characters(ZWC).
16 different ZWC's are mapped to represent the four hex values of the UTF point.
The 'finger print' is a 4 character(per input character) hex representation of the UTF point reference for all characters in the input string.
Ref: https://unicode-table.com/en/
The input is limited to UTF characters within the point range of 0-65535. This includes every character listed on the Ref site above as of January 9th 2018.
* @namespace tearADactyl
* @method cipher
* @param {String} stringUserID - Text to hide.
* @return {String} - 'Invisible' cipher.
*/ 
function cipher(stringUserID) {

    /*
    Character Map

        Hex    Point   Unicode Name
    ------------------------------------------------
        0x0	   200B    Zero Width Space
        0x1	   200C    Zero Width Non-joiner
        0x2	   200D    Zero Width Joiner
        0x3	   202D    Left-to-right Override
        0x4	   2062    Invisible Times
        0x5	   2063    Invisible Separator
        0x6	   2064    Invisible Plus
        0x7	   206A    Inhibit Symmetric Swapping
        0x8	   206B    Activate Symmetric Swapping
        0x9	   206C    Inhibit Arabic Form Shaping
        0xA	   206D    Activate Arabic Form Shaping
        0xB	   206E    National Digit Shapes
        0xC	   206F    Nominal Digit Shapes
        0xD	   200E    Left-to-right Mark
        0xE	   200F    Right-to-left Mark
        0xF	   202C    Pop Directional Formatting
    -------------------------------------------------
    */

    var arrayMapHexUnicode = [
        /*
        [Hex, UTF point(ZWC)]
        */
        [0x0, 0x200B],
        [0x1, 0x200C],
        [0x2, 0x200D],
        [0x3, 0x202D],
        [0x4, 0x2062],
        [0x5, 0x2063],
        [0x6, 0x2064],
        [0x7, 0x206A],
        [0x8, 0x206B],
        [0x9, 0x206C],
        [0xa, 0x206D],
        [0xb, 0x206E],
        [0xc, 0x206F],
        [0xd, 0x200E],
        [0xe, 0x200F],
        [0xf, 0x202C]
    ];

    var stringFingerPrint = '';

    for (var i = 0; i < stringUserID.length; i++) { //iterate through each character of the input string.

        var stringChar = stringUserID.codePointAt(i)

        var decChar = parseInt(stringUserID.codePointAt(i));//grabs the Decimal value each character's UTF point.

        var hexChar = ("000" + decChar.toString(16)).slice(-4).toString(16);//grabs a 4 digit Hexadecimal value for each character's UTF point.

        //console.log('Int: ' + decChar + ' Hex: ' + hexChar)

        for (var j = 0; j < hexChar.length; j++) {//iterates through all of the 4 Hexadecimal values that represent 1 chatacters UTF point.

            for (var arrayIndex in arrayMapHexUnicode) {//iterate through all 16 mapped hex values and adds new value to fingerprint

                if (hexChar.charAt(j) == arrayMapHexUnicode[arrayIndex][0].toString(16)) {

                    stringFingerPrint += String.fromCodePoint(arrayMapHexUnicode[arrayIndex][1]);//creates fingerprint.
                    //console.log(' Hex:' + arrayMapHexUnicode[arrayIndex][1].toString(16) + 'Char: ' +
                    //    ''.charCodeAt((parseInt(arrayMapHexUnicode[arrayIndex][1]).toString())) + 'FP: ' + stringFingerPrint);
                }
            }
        }

    }
    
    return stringFingerPrint;
}

//Reverse cipher.
function deCipher(stringCipher) {
    /*
    Character Map

        Hex    Point    Unicode Name
    ------------------------------------------------
        0x0	   200B     Zero Width Space
        0x1	   200C     Zero Width Non-joiner
        0x2	   200D     Zero Width Joiner
        0x3	   202D     Left-to-right Override
        0x4	   2062     Invisible Times
        0x5	   2063     Invisible Separator
        0x6	   2064     Invisible Plus
        0x7	   206A     Inhibit Symmetric Swapping
        0x8	   206B     Activate Symmetric Swapping
        0x9	   206C     Inhibit Arabic Form Shaping
        0xA	   206D     Activate Arabic Form Shaping
        0xB	   206E     National Digit Shapes
        0xC	   206F     Nominal Digit Shapes
        0xD	   200E     Left-to-right Mark
        0xE	   200F     Right-to-left Mark
        0xF	   202C     Pop Directional Formatting
    -------------------------------------------------
    */

    var arrayMapHexUnicode = [
        /*
        [Hex, UTF point(ZWC)]
        */
        [0x0, 0x200B],
        [0x1, 0x200C],
        [0x2, 0x200D],
        [0x3, 0x202D],
        [0x4, 0x2062],
        [0x5, 0x2063],
        [0x6, 0x2064],
        [0x7, 0x206A],
        [0x8, 0x206B],
        [0x9, 0x206C],
        [0xA, 0x206D],
        [0xB, 0x206E],
        [0xC, 0x206F],
        [0xD, 0x200E],
        [0xE, 0x200F],
        [0xF, 0x202C]
    ];

    if (stringCipher.length % 4 !== 0) {

        var stringError = 'Invalid cipher character length.' + stringCipher.length;

        return stringError;

    }

    var stringClearText = "";

    var intHexPointValues = [];

    for (var i = 0; i < stringCipher.length; i++) {

        for (var arrayIndex in arrayMapHexUnicode) { //Decode.

            //console.log(stringCipher.charCodeAt(i).toString(16) + '?=' + arrayMapHexUnicode[arrayIndex][1]);

            if (stringCipher.charCodeAt(i) == arrayMapHexUnicode[arrayIndex][1]) {

                intHexPointValues.push(arrayMapHexUnicode[arrayIndex][0]);

                //console.log(intHexPointValues[i].toString(16))

            }
        }
    }

    for (var j = 0; j < stringCipher.length; j += 4) {

        var stringHexCode = '' + intHexPointValues[j].toString(16) + intHexPointValues[j + 1].toString(16) + intHexPointValues[j + 2].toString(16) + intHexPointValues[j + 3].toString(16);

        //console.log(parseInt(stringHexCode))

        stringClearText += String.fromCodePoint(parseInt(stringHexCode, 16)); 
    }

    return "Code:" + stringClearText;

}