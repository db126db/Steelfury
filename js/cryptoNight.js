/*

Start of CryptoNight hash function
Created: 13/4/2016

Process taken from: https://cryptonote.org/cns/cns008.txt

1. Hash input with Keccak (1600, 512)
2. Use bytes 0 - 31 from Keccak output to create a 256 bit AES key 
2a. Think we need to use AES key expansion to turn this one key in to 10 keys for use in 5 below
3. Create a scrathpad of 2097152 bytes
4. Bytes 64 - 191 taken form the Keccak output and split into 8 blocks of 16 bytes (128 bytes total)
5. Each block is run through:
				for i = 0..9 do:
	          block = aes_round(block, round_keys[i])
6. Write the outputs of 5 in to the first 128 bytes of the scratchpad
7. Take the 128 bytes just written and do 5 again. Repeat until the scrathpad is full

*/

if (!arguments[0]){
	print("useage:\n $ jsc args.js -- hashInput")
	quit()
}

load('keccak.js')

var hashInput = arguments[0]
var hashOutput = keccak_512(hashInput)

print(hashInput + ": "+ hashOutput)