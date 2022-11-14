class Base64Array {
  /// <summary>
  /// Array which makes base64 encoding and decoding faster.
  /// </ summary>
  // Declare string of available chars inside base64.
  this.S = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  this.CA = [];
  this.IA = [];
  //---------------------------------------------------------
  // INIT: Class
  //---------------------------------------------------------
  constructor() {
    var c = "";
    for (var i = 0; i < this.S.length; i++) {
      c = this.S.charAt(i);
      this.CA[i] = c;
      this.IA[c] = i;
    }
  };
  this.InitializeClass();
}

export function FromBase64String(s, fix) {
  /// <summary>
  /// Converts the specified System.String, which encodes binary data as base 64
  /// digits, to an equivalent 8-bit unsigned integer array.
  /// </summary>
  /// <param type="string" name="s">A string.</param>
  /// <param type="bool" name="fix">Fix base64 string by removing all ilegal chars.</param>
  /// <returns type="byte[]">
  /// An array of 8-bit unsigned integers equivalent to s.
  /// </returns>
  /// <remarks>
  /// A very fast and memory efficient class to encode and decode to and from BASE64
  /// in full accordance with RFC 2045. Based on http://migbase64.sourceforge.net/
  /// Converted to JavaScript by Evaldas Jocys [evaldas@jocys.com], https://www.jocys.com
  /// </remarks>
  var B64 = new System.Convert.Base64Array();
  // Check special case
  if (fix) {
    // Remove illegal chars
    var regex = new RegExp("[^" + B64.S + "]", "g");
    s = s.replace(regex, "");
  }
  var sLen = s.length;
  if (sLen === 0) return new Array(0);
  // Start and end index after trimming.
  var sIx = 0,
    eIx = sLen - 1;
  // Get the padding count (=) (0, 1 or 2).
  var pad = s.charAt(eIx) === "=" ? (s.charAt(eIx - 1) === "=" ? 2 : 1) : 0; // Count '=' at end.
  // Content count including possible separators.
  var cCnt = eIx - sIx + 1;
  var sepLn = s.charAt(76) === "\r" ? cCnt / 78 : 0;
  var sepCnt = sLen > 76 ? sepLn << 1 : 0;
  // The number of decoded bytes.
  var len = (((cCnt - sepCnt) * 6) >> 3) - pad;
  // Preallocate byte[] of exact length.
  var bytes = new Array(len);
  // Decode all but the last 0 - 2 bytes.
  var d = 0;
  var eLen = Math.floor(len / 3) * 3;
  var i;
  for (var cc = 0; d < eLen; ) {
    // Assemble three bytes into an var from four "valid" characters.
    i =
      (B64.IA[s.charAt(sIx++)] << 18) |
      (B64.IA[s.charAt(sIx++)] << 12) |
      (B64.IA[s.charAt(sIx++)] << 6) |
      B64.IA[s.charAt(sIx++)];
    // Add the bytes
    bytes[d++] = i >> 16;
    bytes[d++] = (i & 0xffff) >> 8;
    bytes[d++] = i & 0xff;
    // If line separator, jump over it.
    if (sepCnt > 0 && ++cc === 19) {
      sIx += 2;
      cc = 0;
    }
  }
  if (d < len) {
    // Decode last 1-3 bytes (incl '=') into 1-3 bytes.
    i = 0;
    for (var j = 0; sIx <= eIx - pad; j++) {
      i |= B64.IA[s.charAt(sIx++)] << (18 - j * 6);
    }
    for (var r = 16; d < len; r -= 8) {
      var cropBits = Math.pow(2, r + 8) - 1;
      bytes[d++] = (i & cropBits) >> r;
    }
  }
  return bytes;
}
