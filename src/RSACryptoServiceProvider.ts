class RSAParameters {
  Exponent: number[] | null = [];
  Modulus: number[] | null = [];
  // Non serialized parameters.
  D: number[] | null = [];
  DP: number[] | null = [];
  DQ: number[] | null = [];
  InverseQ: number[] | null = [];
  P: number[] | null = [];
  Q: number[] | null = [];
  Clone(includePrivateParameters: boolean): RSAParameters {
    var parameters = new RSAParameters();
    System.Array.Copy(
      this.Exponent,
      parameters.Exponent,
      this.Exponent!.length
    );
    System.Array.Copy(this.Modulus, parameters.Modulus, this.Modulus!.length);
    if (includePrivateParameters) {
      if (this.D) System.Array.Copy(this.D, parameters.D, this.D.length);
      if (this.DP) System.Array.Copy(this.DP, parameters.DP, this.DP.length);
      if (this.DQ) System.Array.Copy(this.DQ, parameters.DQ, this.DQ.length);
      if (this.InverseQ)
        System.Array.Copy(
          this.InverseQ,
          parameters.InverseQ,
          this.InverseQ.length
        );
      if (this.P) System.Array.Copy(this.P, parameters.P, this.P.length);
      if (this.Q) System.Array.Copy(this.Q, parameters.Q, this.Q.length);
    }
    return parameters;
  }
}

function getXmlValue(xmlString, tag) {
  var rx = new RegExp("<" + tag + ">(.*?)</" + tag + ">", "gi");
  var tagMatch = xmlString.match(rx);
  if (!tagMatch) return null;
  var base64 = tagMatch[0].replace(rx, "$1");
  var bytes = System.Convert.FromBase64String(base64);
  return bytes;
}

export class RSACryptoServiceProvider {
  KeySize: number;
  BlockSize: number;
  FeedbackSize: number;
  IV: number[] = [];
  HashSize: number = 20 * 8;

  private rsaParams: RSAParameters | null = null;
  private rsaParamsBi: RSAParameters | null = null;
  constructor(size: number = 512) {
    this.KeySize = size;
    this.BlockSize = this.KeySize;
    this.FeedbackSize = this.KeySize;
  }
  //---------------------------------------------------------
  ImportParameters(parameters: RSAParameters) {
    this.rsaParams = parameters.Clone(true);
    this.rsaParamsBi = null;
    this.KeySize = this.rsaParams!.Modulus!.length * 8;
    this.BlockSize = this.KeySize;
    this.FeedbackSize = this.KeySize;
  }
  FromXmlString(xmlString: String) {
    var parameters = new RSAParameters();
    // Remove white spaces.
    var tagSpace = new RegExp("\\s", "gi");
    xmlString = xmlString.replace(tagSpace, "");
    parameters.Exponent = getXmlValue(xmlString, "Exponent");
    parameters.Modulus = getXmlValue(xmlString, "Modulus");
    parameters.D = getXmlValue(xmlString, "D");
    parameters.DP = getXmlValue(xmlString, "DP");
    parameters.DQ = getXmlValue(xmlString, "DQ");
    parameters.InverseQ = getXmlValue(xmlString, "InverseQ");
    parameters.P = getXmlValue(xmlString, "P");
    parameters.Q = getXmlValue(xmlString, "Q");
    this.ImportParameters(parameters);
  }
}

export namespace System {
  export namespace Convert {}
  export namespace Array {
    export function Copy<T>(
      src: Array<T> | null,
      dest: Array<T> | null,
      length: number
    ) {}
  }
}
