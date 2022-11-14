// import { JSEncrypt } from "jsencrypt";
import { KEYUTIL, KJUR, hextob64u,RSAKey } from "jsrsasign";
// import * as rsu from "jsrsasign-util";

// import Cryptico from "cryptico";

// var encrypt = new JSEncrypt();
// encrypt.setPbluicKey("tAfjzjheRM6LWE/H6gkal7BKFJuk972VZvZkGvHuCzMipeWhVz7r7P+T4IXM4JoLbUD0sbjFmy5B5yNOacFlF/8JZPxmXL5IMb0sQrfSnYXF1/v7Jigynrje2Pe5olIBZCOULR+xt/c4++uh+/BGda7g5jxpjZZyQtNoRwQA9Mj9siBblFe71EFxzc6DU/7jryZ28aPfxtJHKSoDMnSh5EjZ2qERLwPZ9ptXHYFYnVm6EmeUcnr5P6Fss5KkR1UAZ7buqEdgcT76Yw15MyTLLkYuBqOuFHRNaExsIf/aZD1KV05AOXqSf3JfI3lx0cSTkZhF5KBCuwHrw3VpmCJeSQ==");
// var encrypted = encrypt.encrypt("aaaa");
// console.log(encrypted);

// var key = KEYUTIL.getKey(priK);
// console.log(key);
// // 创建 Signature 对象
// let signature=new KJUR.crypto.Signature({alg:"SHA1withRSA"});
// // 传入key实例, 初始化signature实例
// signature.init(key);
// // 传入待签明文
// signature.updateString(src);
// // 签名, 得到16进制字符结果
// let a = signature.sign();
// let sign = hextob64(a);

// console.log(sign);
let pk = "tAfjzjheRM6LWE/H6gkal7BKFJuk972VZvZkGvHuCzMipeWhVz7r7P+T4IXM4JoLbUD0sbjFmy5B5yNOacFlF/8JZPxmXL5IMb0sQrfSnYXF1/v7Jigynrje2Pe5olIBZCOULR+xt/c4++uh+/BGda7g5jxpjZZyQtNoRwQA9Mj9siBblFe71EFxzc6DU/7jryZ28aPfxtJHKSoDMnSh5EjZ2qERLwPZ9ptXHYFYnVm6EmeUcnr5P6Fss5KkR1UAZ7buqEdgcT76Yw15MyTLLkYuBqOuFHRNaExsIf/aZD1KV05AOXqSf3JfI3lx0cSTkZhF5KBCuwHrw3VpmCJeSQ==";
let src = "aaa";

var rsa = KEYUTIL.getKey(pk);
var sig = new KJUR.crypto.Signature({"alg": "SHA256withRSA"});
sig.init(rsa)
sig.updateString(src);

var ret = hextob64u(sig.sign());
console.log(ret);
