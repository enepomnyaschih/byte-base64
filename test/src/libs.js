import "source-map-support/browser-source-map-support";
import "chai/chai";
import "mocha/mocha";
import {TextEncoder, TextDecoder} from "./encoding";

window.TextEncoder = TextEncoder;
window.TextDecoder = TextDecoder;
