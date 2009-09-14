/*
* jQuery wordCounter plugin v0.0.2
* Source: http://peterfisher.me.uk/wordcounter.html
* Author: pfwd
* Copyright (c) 2009 peterfisher.me.uk
* Free for all; but please leave in this comment
*
*/
(function($) {
	/**
	* wordCounter plugin
	* Requres jQuery
	*
	* @param String textElement
	* @param String counterElement
	* @param array options - Optional
	* @return void
	*/
	$.fn.wordCounter = function(textElement, counterElement, options){
		var settings = jQuery.extend({
			limit					: null,
			defaultNoLimitFormat	: "Word count: count%",
			limitExceededFormat		: "Remove count% word(s)",
			limitNotExceededFormat	: "Words left: count% ",
			defaultSearch			: "count%",
			showNegativeNumbers		: 0
		}, options);

		// Run execute when the window loads
		$(window).load(function () {
			execute();
		});

		// Run execute each time the keys have been pressed
		$('#'+textElement).keyup(function () {
			execute();
		});
		/**
		* Executes the logic for the plugin
		* Generates the counter
		* Updates the counterElement with the final counter
		*
		* Requres:
		* wordCounter.countWords() 
		* wordCounter.formatOutput()
		*
		* @return void
		*/
		function execute(){
			var currentCount = countWords();
			var outPutCount = 0;
			var outPutFormat = 'Problem with word counter';
			// Check if  this.limit param is supplied
			if(settings.limit != null){
				outPutCounter = settings.limit - currentCount;
			}else{
				// Set to default incrmental counter if limit is null
				outPutCounter = currentCount;
			}

			// Check if outPutCounter is greater than 0 (and negative numbers)
			// If it is the user has exceeded the limit
			// Generate the outPutFormat
			if(outPutCounter < 0 && settings.limit != null){
				// change the negative number to a positve number and set to outPutCounter
				if(settings.showNegativeNumbers == 0){
					outPutCounter = outPutCounter * -1;
				}
				outPutFormat = formatOutput(settings.limitExceededFormat, outPutCounter);
			}else if(outPutCounter >= 0 && settings.limit != null){
				outPutFormat = formatOutput(settings.limitNotExceededFormat, outPutCounter);
			}else if(settings.limit == null){
				outPutFormat = formatOutput(settings.defaultNoLimitFormat, outPutCounter);
			}
			// Update the updateElement using Jquery
			$('#'+counterElement).html(outPutFormat);
		}
		/**
		* Counts the words in the textElement
		*
		* @return integer
		*/
		function countWords(){
			var counter = 0;
			// Replace the spaces at the start of the string /^\s* and all the spaces at the end \s*$
			// while keeping those in-between.
			counter = $('#'+textElement).val().replace(/^\s*|\s*$/g,'');
			return counter.split(/\s+/).length;
		}
		/**
		* Formats and returns output for the counter
		*
		* @return string
		*/
		function formatOutput(format, counter){
			return format.replace(settings.defaultSearch, counter);
		}
	}
})(jQuery);