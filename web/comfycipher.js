var comfyCipher = {
	Encode: {},
	Decode: {},
};

comfyCipher.Encrypt = comfyCipher.Encode;
comfyCipher.Decrypt = comfyCipher.Decode;

comfyCipher.Encode[ "Reverse" ] = function( text ) {
	return text.split( "" ).reverse().join( "" );
};
comfyCipher.Decode[ "Reverse" ] = comfyCipher.Encode[ "Reverse" ];

comfyCipher.Encode[ "Base64" ] = function( text ) { return btoa( text ) };
comfyCipher.Decode[ "Base64" ] = function( text ) { return atob( text ) };

comfyCipher.Encode[ "Caesar" ] = function( str, amount ) { // From: https://gist.github.com/EvanHahn/2587465
	if (amount < 0) {
		return caesarShift(str, amount + 26);
	}

	var output = '';
	for (var i = 0; i < str.length; i ++) {
		var c = str[i];
		if (c.match(/[a-z]/i)) {
			var code = str.charCodeAt(i);

			// Uppercase letters
			if ((code >= 65) && (code <= 90))
				c = String.fromCharCode(((code - 65 + amount) % 26) + 65);

			// Lowercase letters
			else if ((code >= 97) && (code <= 122))
				c = String.fromCharCode(((code - 97 + amount) % 26) + 97);
		}
		output += c;
	}

	return output;
};
comfyCipher.Decode[ "Caesar" ] = function( text, number ) {
	return comfyCipher.Encode.Caesar( text, 26 - number );
};

comfyCipher.Encode[ "Rot13" ] = function( text ) {
	return comfyCipher.Encode.Caesar( text, 13 );
};
comfyCipher.Decode[ "Rot13" ] = function( text ) {
	return comfyCipher.Encode.Caesar( text, 13 );
};

// Binary, Pig Latin,

// From: https://stackoverflow.com/a/26059399
var morseAlphabet = {
    'a': '.-',    'b': '-...',  'c': '-.-.', 'd': '-..',
    'e': '.',     'f': '..-.',  'g': '--.',  'h': '....',
    'i': '..',    'j': '.---',  'k': '-.-',  'l': '.-..',
    'm': '--',    'n': '-.',    'o': '---',  'p': '.--.',
    'q': '--.-',  'r': '.-.',   's': '...',  't': '-',
    'u': '..-',   'v': '...-',  'w': '.--',  'x': '-..-',
    'y': '-.--',  'z': '--..',  ' ': '/',
    '1': '.----', '2': '..---', '3': '...--', '4': '....-',
    '5': '.....', '6': '-....', '7': '--...', '8': '---..',
    '9': '----.', '0': '-----', '!': '-.-.--', '.': '.-.-.-', ',': '--..--'
};
var morseReverse = {};
Object.keys( morseAlphabet ).forEach( x => morseReverse[ morseAlphabet[ x ] ] = x );
comfyCipher.Encode[ "Morse" ] = function( text ) {
	return text.toLowerCase().split( "" ).map( x => morseAlphabet[ x ] ).join( " " );
};
comfyCipher.Decode[ "Morse" ] = function( text ) {
	return text.split( " " ).map( x => morseReverse[ x ] ).join( "" );
};

// Expose everything, for browser and Node..
if (typeof module !== "undefined" && module.exports) {
    module.exports = comfyCipher;
}
if (typeof window !== "undefined") {
    window.ComfyCipher = comfyCipher;
}
