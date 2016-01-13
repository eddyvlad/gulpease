'use strict';

module.exports = {
	/**
	 * Add a watch using glob expression and define a callback
	 * 
	 * @param {string|array} glob_expr Glob expression(s)
	 * @returns {watch}
	 */
	addWatch: function(glob_exp) {
		var Watch = require('./lib/watch');
		return new Watch(glob_exp);
	}
};
