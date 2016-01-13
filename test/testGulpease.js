var chai = require('chai');
var expect = chai.expect;
var gulpease = require('../gulpease');
var helper = require('./lib/helper');
var fs = require('fs');

describe('Gulpease', function(){
	describe('addWatch', function () {
		var maxFiles = 10;

		before(function() {
			// Create dummy files
			helper.makeTmpDir();

			helper.makeDummyFiles(maxFiles, 'txt');
			helper.makeDummyFiles(maxFiles, 'txt', 'dump');
			helper.makeDummyFiles(maxFiles, 'md');
			helper.makeDummyFiles(maxFiles, 'md', 'dump');
		});

		it('should watch ' + maxFiles + ' files', function () {
			var watch = gulpease.addWatch('./test/lib/tmp/*.txt');
			expect(watch.watching).to.have.length(maxFiles);
		});

		it('should watch ' + (maxFiles * 2) + ' files', function () {
			var watch = gulpease.addWatch('./test/lib/tmp/*.{txt,md}');
			expect(watch.watching).to.have.length(maxFiles * 2);
		});

		it('should watch ' + (maxFiles * 4) + ' files', function () {
			var watch = gulpease.addWatch(['./test/lib/tmp/*.{txt,md}', './test/lib/tmp/dump/*.{txt,md}']);
			expect(watch.watching).to.have.length(maxFiles * 4);
		});

		it('should watch 2 directories & ' + (maxFiles * 4) + ' files', function () {
			var watch = gulpease.addWatch('./test/lib/tmp/*');
			expect(watch.watching).to.have.length(maxFiles * 4 + 2);
		});

		it('should fire `onChange` event when file is changed', function(){
			var fire = false;
			gulpease.addWatch(['./test/lib/tmp/**/*'])
				.onChange(function(){
					fire = true;
				});

			fs.writeFile('./test/lib/tmp/1.txt', 'Test');

			expect(fire).to.be.true;
		});

		after(function(){
			// Remove dummy files
			helper.cleanUp();
		});

	});
});


