var readmore = {
	readMoreCls: ".readMoreApply",
	minVisibleElement: 5,

	init: function() {
		this.hideElements();
		this.bindEvents();
	},

	bindEvents: function() {
		var _this = this;

		$('.readMore').unbind('click').bind('click', function(e) {
			e.preventDefault();
			var currentElement = $(this).prev(_this.readMoreCls)
				, acutalHeight = currentElement.attr('data-actualHeight')
				, updatedHeight = currentElement.attr('data-updatedHeight');

			if (currentElement.attr('data-fullView') == 'hide') {
				currentElement.animate({
					height:acutalHeight+'px'
				},200);

				currentElement.attr('data-fullView', 'show')
				$(this).text('Less..');
			} else {
				currentElement.animate({
					height:updatedHeight+'px'
				},200);
				currentElement.attr('data-fullView', 'hide')
				$(this).text('Read More...');
			}
		});
	},

	hideElements: function() {
		var _this = this
		 , showElementLine = _this.minVisibleElement;


		$(_this.readMoreCls).each(function() {
			var innerElement = $(this)
				, txtLineHeight = parseInt(innerElement.css('lineHeight'))
				, txtheight = parseInt(innerElement.outerHeight())
				, lineNumber = parseInt(txtheight/txtLineHeight);

			if (typeof innerElement.attr('data-show') != 'undefined')
				showElementLine = parseInt(innerElement.attr('data-show'));

			var updatedHeight = txtLineHeight * showElementLine

			if (lineNumber > showElementLine) {
				innerElement.attr('data-actualHeight', txtheight);
				innerElement.attr('data-updatedHeight', updatedHeight);
				innerElement.attr('data-fullView', 'hide');
				innerElement.after( "<a href='#' class='readMore'>Read More...</a>" );
				innerElement.css({height: updatedHeight +'px', overflow: 'hidden'})
			}
		});
	}
};