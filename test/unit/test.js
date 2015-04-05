import chai from 'chai';
const assert = chai.assert;
import Translator from '../../src/translator';

var translator = new Translator();

describe('Translator', function() {
	describe('#translate', function() {
		it('should make Apple be Samsung', function() {
			var t = {
				nodeValue: "Apple"
			};
			translator.translate(t);
			assert.equal("Samsung",t.nodeValue);
		});

		it('should make Samsung be Apple', function() {
			var t = {
				nodeValue: "Samsung"
			};
			translator.translate(t);
			assert.equal("Apple",t.nodeValue);
		});

		it('should make APPLE be SAMSUNG', function() {
			var t = {
				nodeValue: "APPLE"
			};
			translator.translate(t);
			assert.equal("SAMSUNG",t.nodeValue);
		});

		it('should make SAMSUNG be APPLE', function() {
			var t = {
				nodeValue: "SAMSUNG"
			};
			translator.translate(t);
			assert.equal("APPLE",t.nodeValue);
		});

		it('should make  be Samsung (with a space after)', function() {
			var t = {
				nodeValue: ""
			};

			translator.translate(t);
			assert.equal("Samsung ",t.nodeValue);
		});

		it('should make iPhone be Galaxy S', function() {
			var t = {
				nodeValue: "iPhone"
			};
			translator.translate(t);
			assert.equal("Galaxy S",t.nodeValue)
		});

		it('should make iPhone 3G/5/4S be Galaxy S 3G (etc.)', function() {
			var t = {
				nodeValue: "iPhone 3G"
			};
			translator.translate(t);
			assert.equal("Galaxy S 3G", t.nodeValue);

			t.nodeValue = "iPhone 5";
			translator.translate(t);
			assert.equal("Galaxy S 5", t.nodeValue);

			t.nodeValue = "iPhone 4S";
			translator.translate(t);
			assert.equal("Galaxy S 4S", t.nodeValue);
		});

		it('should make Galaxy S3 be iPhone 3', function() {
			var t = {
				nodeValue: "Galaxy S3"
			}
			translator.translate(t);
			assert.equal("iPhone 3", t.nodeValue);
		});

		it('should make Galaxy S II-III be iPhone 1-3', function() {
			var t1 = {
				nodeValue: "Galaxy S II"
			};
			var t2 = {
				nodeValue: "Galaxy S III"
			};
			translator.translate(t1);
			translator.translate(t2);
			assert.equal("iPhone 2", t1.nodeValue);
			assert.equal("iPhone 3", t2.nodeValue);
		});
	});
});