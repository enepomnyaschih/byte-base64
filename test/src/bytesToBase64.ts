/*
MIT License

Copyright (c) 2020 Egor Nepomnyaschih

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

import {bytesToBase64} from "byte-base64";
import {expect} from "chai";

describe("bytesToBase64", () => {
	it("should support empty native array", () => {
		expect(bytesToBase64([])).equal("");
	});

	it("should support empty Uint8array", () => {
		expect(bytesToBase64(new Uint8Array(0))).equal("");
	});

	it("should support base64 alphabet", () => {
		expect(bytesToBase64([0x00])).equal("AA=="); // 000000|00 0000
		expect(bytesToBase64([0x64])).equal("ZA=="); // 011001|00 0000
		expect(bytesToBase64([0x68])).equal("aA=="); // 011010|00 0000
		expect(bytesToBase64([0xCC])).equal("zA=="); // 110011|00 0000
		expect(bytesToBase64([0xD0])).equal("0A=="); // 110100|00 0000
		expect(bytesToBase64([0xF4])).equal("9A=="); // 111101|00 0000
		expect(bytesToBase64([0xF8])).equal("+A=="); // 111110|00 0000
		expect(bytesToBase64([0xFC])).equal("/A=="); // 111111|00 0000
	});

	it("should support single-character native array", () => {
		expect(bytesToBase64([0x01])).equal("AQ=="); // 000000|01 0000
		expect(bytesToBase64([0x0A])).equal("Cg=="); // 000010|10 0000
		expect(bytesToBase64([0x96])).equal("lg=="); // 100101|10 0000
		expect(bytesToBase64([0xFF])).equal("/w=="); // 111111|11 0000
	});

	it("should support single-character Uint8Array", () => {
		expect(bytesToBase64(new Uint8Array([0x00]))).equal("AA==");
		expect(bytesToBase64(new Uint8Array([0x01]))).equal("AQ==");
		expect(bytesToBase64(new Uint8Array([0x0A]))).equal("Cg==");
		expect(bytesToBase64(new Uint8Array([0x96]))).equal("lg==");
		expect(bytesToBase64(new Uint8Array([0xFF]))).equal("/w==");
	});

	it("should support double-character native array", () => {
		expect(bytesToBase64([0x00, 0x00])).equal("AAA="); // 000000|00 0000|0000 00
		expect(bytesToBase64([0x01, 0x01])).equal("AQE="); // 000000|01 0000|0001 00
		expect(bytesToBase64([0x78, 0xA9])).equal("eKk="); // 011110|00 1010|1001 00
		expect(bytesToBase64([0xF0, 0xD5])).equal("8NU="); // 111100|00 1101|0101 00
		expect(bytesToBase64([0xFF, 0xFF])).equal("//8="); // 111111|11 1111|1111 00
	});

	it("should support double-character Uint8Array", () => {
		expect(bytesToBase64(new Uint8Array([0x00, 0x00]))).equal("AAA="); // 000000|00 0000|0000 00
		expect(bytesToBase64(new Uint8Array([0x01, 0x01]))).equal("AQE="); // 000000|01 0000|0001 00
		expect(bytesToBase64(new Uint8Array([0x78, 0xA9]))).equal("eKk="); // 011110|00 1010|1001 00
		expect(bytesToBase64(new Uint8Array([0xF0, 0xD5]))).equal("8NU="); // 111100|00 1101|0101 00
		expect(bytesToBase64(new Uint8Array([0xFF, 0xFF]))).equal("//8="); // 111111|11 1111|1111 00
	});

	it("should support triple-character native array", () => {
		expect(bytesToBase64([0x00, 0x00, 0x00])).equal("AAAA"); // 000000|00 0000|0000 00|000000
		expect(bytesToBase64([0x01, 0x01, 0x01])).equal("AQEB"); // 000000|01 0000|0001 00|000001
		expect(bytesToBase64([0xAA, 0xBD, 0xB7])).equal("qr23"); // 101010|10 1011|1101 10|110111
		expect(bytesToBase64([0x80, 0x09, 0x9C])).equal("gAmc"); // 100000|00 0000|1001 10|011100
		expect(bytesToBase64([0xFF, 0xFF, 0xFF])).equal("////"); // 111111|11 1111|1111 11|111111
	});

	it("should support triple-character Uint8Array", () => {
		expect(bytesToBase64(new Uint8Array([0x00, 0x00, 0x00]))).equal("AAAA"); // 000000|00 0000|0000 00|000000
		expect(bytesToBase64(new Uint8Array([0x01, 0x01, 0x01]))).equal("AQEB"); // 000000|01 0000|0001 00|000001
		expect(bytesToBase64(new Uint8Array([0xAA, 0xBD, 0xB7]))).equal("qr23"); // 101010|10 1011|1101 10|110111
		expect(bytesToBase64(new Uint8Array([0x80, 0x09, 0x9C]))).equal("gAmc"); // 100000|00 0000|1001 10|011100
		expect(bytesToBase64(new Uint8Array([0xFF, 0xFF, 0xFF]))).equal("////"); // 111111|11 1111|1111 11|111111
	});

	it("should support quadruple-character native array", () => {
		expect(bytesToBase64([0x00, 0x00, 0x00, 0x00])).equal("AAAAAA=="); // 000000|00 0000|0000 00|000000 000000|00 0000
		expect(bytesToBase64([0x01, 0x01, 0x01, 0x01])).equal("AQEBAQ=="); // 000000|01 0000|0001 00|000001 000000|01 0000
		expect(bytesToBase64([0xD7, 0xE1, 0xE0, 0x38])).equal("1+HgOA=="); // 110101|11 1110|0001 11|100000 001110|00 0000
		expect(bytesToBase64([0xFF, 0xFF, 0xFF, 0xFF])).equal("/////w=="); // 111111|11 1111|1111 11|111111 111111|11 0000
	});

	it("should support quadruple-character Uint8Array", () => {
		expect(bytesToBase64(new Uint8Array([0x00, 0x00, 0x00, 0x00]))).equal("AAAAAA=="); // 000000|00 0000|0000 00|000000 000000|00 0000
		expect(bytesToBase64(new Uint8Array([0x01, 0x01, 0x01, 0x01]))).equal("AQEBAQ=="); // 000000|01 0000|0001 00|000001 000000|01 0000
		expect(bytesToBase64(new Uint8Array([0xD7, 0xE1, 0xE0, 0x38]))).equal("1+HgOA=="); // 110101|11 1110|0001 11|100000 001110|00 0000
		expect(bytesToBase64(new Uint8Array([0xFF, 0xFF, 0xFF, 0xFF]))).equal("/////w=="); // 111111|11 1111|1111 11|111111 111111|11 0000
	});

	it("should support long native array", () => {
		expect(bytesToBase64([
			0x90, 0x53, 0x2B, // 100100|00 0101|0011 00|101011 = kFMr
			0xBF, 0xD1, 0xAA, // 101111|11 1101|0001 10|101010 = v9Gq
			0x7F, 0x7D, 0x36, // 011111|11 0111|1101 00|110110 = f302
			0x78, 0x25, 0x19, // 011110|00 0010|0101 00|011001 = eCUZ
			0xDB, 0xF3, 0x23, // 110110|11 1111|0011 00|100011 = 2/Mj
			0x3C, 0x8C, 0x4B, // 001111|00 1000|1100 01|001011 = PIxL
			0x1B, 0x32, 0x73, // 000110|11 0011|0010 01|110011 = GzJz
			0xCA, 0xFD, 0x9F, // 110010|10 1111|1101 10|011111 = yv2f
			0x56, 0xAF, 0xF0, // 010101|10 1010|1111 11|110000 = Vq/w
			0xE3, 0xD2, 0x9D, // 111000|11 1101|0010 10|011101 = 49Kd
			0x84, 0xFC, 0xAF, // 100001|00 1111|1100 10|101111 = hPyv
			0xE1, 0x4C, 0x0A, // 111000|01 0100|1100 00|001010 = 4UwK
			0x25, 0x31, 0xC8, // 001001|01 0011|0001 11|001000 = JTHI
			0xC4              // 110001|00 0000                = xA==
		])).equal("kFMrv9Gqf302eCUZ2/MjPIxLGzJzyv2fVq/w49KdhPyv4UwKJTHIxA==");
	});

	it("should support long Uint8Array", () => {
		expect(bytesToBase64(new Uint8Array([
			0x90, 0x53, 0x2B,
			0xBF, 0xD1, 0xAA,
			0x7F, 0x7D, 0x36,
			0x78, 0x25, 0x19,
			0xDB, 0xF3, 0x23,
			0x3C, 0x8C, 0x4B,
			0x1B, 0x32, 0x73,
			0xCA, 0xFD, 0x9F,
			0x56, 0xAF, 0xF0,
			0xE3, 0xD2, 0x9D,
			0x84, 0xFC, 0xAF,
			0xE1, 0x4C, 0x0A,
			0x25, 0x31, 0xC8,
			0xC4
		]))).equal("kFMrv9Gqf302eCUZ2/MjPIxLGzJzyv2fVq/w49KdhPyv4UwKJTHIxA==");
	});
});
