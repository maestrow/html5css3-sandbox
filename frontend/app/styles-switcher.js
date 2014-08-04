define(['jquery', 'cssbeautify', 'treetemplator', 'bootstrap'], 
	function($, cssbeautify, tt){

	var templates = {
		_delimeter: '\n',
		_: [
			'<div class="rule">',
			'	<div class="selector">',
			'		<input type="checkbox" id="rule-$0"> <label for="rule-$0">.${selector}</label>',
			'	</div>',
			'	<div class="cssText">',
			'		${css}',
			'	</div>',
			'</div>'
		].join('\n'),
		css: {
			_delimeter: '<br/>\n'
		}
	};

	var headSheet,
		rules = [];

	for (var i = 0; i < document.styleSheets.length; i++) {
		var sheet = document.styleSheets[i];
		if(sheet.href == null) {
			headSheet = sheet;
			break;
		}
	};

	for (var i = 0; i < headSheet.rules.length; i++) {
		var rule = headSheet.rules[i];
		var css = cssbeautify(rule.cssText)
		css = css.substr(rule.selectorText.length + 2);
		css = css.substr(0, css.length-2);
		rules.push({
			selector: rule.selectorText.substr(1),
			css: css.split('\n').filter(function(row) { 
				return !row.match(/^\s*$/)
			})
		});
	}
	
	//console.dir(rules);
	var styleBlock = tt.create().apply(rules, templates);
	$('#styleList').html(styleBlock);

	var i = 0;
	rules.forEach(function (rule) {
		i++;
		var id = '#rule-' + i;
		$(id).on('change', function (e) {
			if (e.target.checked) {
				$(options.elementId).addClass(rule.selector);
			} else {
				$(options.elementId).removeClass(rule.selector);
			}
		})
	});

});