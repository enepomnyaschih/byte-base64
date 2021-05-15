/*
MIT License

Copyright (c) 2021 Egor Nepomnyaschih

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

import {base64decode} from "byte-base64";
import {expect} from "chai";

describe("base64decode", () => {
	it("should support empty string", () => {
		expect(base64decode("")).equal("");
	});

	it("should support single-character ASCII string", () => {
		expect(base64decode("QQ==")).equal("A"); // 0x41 = 010000|01 0000
	});

	it("should support double-character ASCII string", () => {
		expect(base64decode("QkM=")).equal("BC"); // 0x42 0x43 = 010000|10 0100|0011 00
	});

	it("should support triple-character ASCII string", () => {
		expect(base64decode("N0cy")).equal("7G2"); // 0x37 0x47 0x32 = 001101|11 0100|0111 00|110010
	});

	it("should support quadriple-character ASCII string", () => {
		expect(base64decode("KkBuOA==")).equal("*@n8"); // 0x2A 0x40 0x6E 0x38 = 001010|10 0100|0000 01|101110 001110|00 0000
	});

	it("should support UTF-8 encoding", () => {
		// Man = 0x4D, 0x61, 0x6E = TWFu (example from https://en.wikipedia.org/wiki/Base64)
		// Space = 0x20 = 0010 0000
		// Ё = 1101 0000 1000 0001
		// 𤭢 = 1111 0000 1010 0100 1010 1101 1010 0010
		// So, we get sixtets: 001000 001101 000010 000001 111100 001010 010010 101101 101000 10____
		//                     I      N      C      B      8      K      S      t      o      g = =
		expect(base64decode("TWFuINCB8KStog==")).equal("Man Ё𤭢");
	});

	it("should support custom encoding", () => {
		const decoder = {
			decode: (array: Uint8Array) => {
				expect(Array.from(array)).eql([0xD7, 0xE1, 0xE0, 0x38]);
				return "Hello!";
			}
		};
		expect(base64decode("1+HgOA==", decoder)).equal("Hello!");
	});

	it("should throw an exception if not a base64 string", () => {
		expect(() => base64decode("AA")).throw(Error, "Unable to parse base64 string.");
		expect(() => base64decode("AA=")).throw(Error, "Unable to parse base64 string.");
		expect(() => base64decode("A===")).throw(Error, "Unable to parse base64 string.");
		expect(() => base64decode("====")).throw(Error, "Unable to parse base64 string.");
		expect(() => base64decode("A-==")).throw(Error, "Unable to parse base64 string.");
		expect(() => base64decode("AAA-")).throw(Error, "Unable to parse base64 string.");
		expect(() => base64decode("AAAAAA")).throw(Error, "Unable to parse base64 string.");
		expect(() => base64decode("AAAAAA=")).throw(Error, "Unable to parse base64 string.");
		expect(() => base64decode("AAAAA===")).throw(Error, "Unable to parse base64 string.");
		expect(() => base64decode("AAAA====")).throw(Error, "Unable to parse base64 string.");
		expect(() => base64decode("AAAAA-==")).throw(Error, "Unable to parse base64 string.");
		expect(() => base64decode("AAAAAAA-")).throw(Error, "Unable to parse base64 string.");

		// https://github.com/enepomnyaschih/byte-base64/issues/2
		expect(() => base64decode("B{==")).throw(Error, "Unable to parse base64 string.");
	});
});
