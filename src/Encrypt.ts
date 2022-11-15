import { RSACryptoServiceProvider } from "./RSACryptoServiceProvider";
import * as System from "./System";

namespace System {
  
}
function Encrypt(textToEncrypt: string) {
  const publicKeyString =
    "<RSAKeyValue><Exponent>AQAB</Exponent><Modulus>tAfjzjheRM6LWE/H6gkal7BKFJuk972VZvZkGvHuCzMipeWhVz7r7P+T4IXM4JoLbUD0sbjFmy5B5yNOacFlF/8JZPxmXL5IMb0sQrfSnYXF1/v7Jigynrje2Pe5olIBZCOULR+xt/c4++uh+/BGda7g5jxpjZZyQtNoRwQA9Mj9siBblFe71EFxzc6DU/7jryZ28aPfxtJHKSoDMnSh5EjZ2qERLwPZ9ptXHYFYnVm6EmeUcnr5P6Fss5KkR1UAZ7buqEdgcT76Yw15MyTLLkYuBqOuFHRNaExsIf/aZD1KV05AOXqSf3JfI3lx0cSTkZhF5KBCuwHrw3VpmCJeSQ==</Modulus></RSAKeyValue>";
  var bytesToEncrypt = Encoding.UTF8.GetBytes(textToEncrypt);
  var rsa = new RSACryptoServiceProvider(2048);
  try {
    rsa.FromXmlString(publicKeyString);
    var encryptedData = rsa.Encrypt(bytesToEncrypt, RSAEncryptionPadding.Pkcs1);
    var base64Encrypted = System.Convert.ToBase64String(encryptedData)
      .Replace("+", "-")
      .Replace("/", "_")
      .Replace("=", "");
    return base64Encrypted;
  } finally {
    rsa.PersistKeyInCsp = false;
  }
}
