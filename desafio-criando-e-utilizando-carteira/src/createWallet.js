//importando as dependẽncias
const bip32 = require('bip32');
const bip39 = require('bip39');
const bitcoin = require('bitcoinjs-lib');

//definir a rede
const network = bitcoin.networks.testnet;

//derivação de carteira
const path = `m/49'/1'/0'/0`;

//criando o mnemonic para a seed
let mnemonic = bip39.generateMnemonic();
const seed = bip39.mnemonicToSeedSync(mnemonic);

//criando a raiz da carteira HD
let root = bip32.fromSeed(seed, network);

//criando uma conta
let account = root.derivePath(path);
let node = account.derive(0).derive(0);

let btcAddres = bitcoin.payments.p2pkh(
    {
        pubkey: node.publicKey,
        network: network,
    }
).address;

console.log("Carteira gerada:");
console.log("Endereço: ", btcAddres);
console.log("Chave privada: ", node.toWIF());
console.log("Seed: ", mnemonic);