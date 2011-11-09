/*
* jQuery wordCounter plugin v0.1.0
* Source: http://blog.peterfisher.me.uk/code/wordcounter/
* Author: Peter Fisher
* Copyright (c) 2011 http://peterfisher.me.uk
*
*/
(function($) {
	/**
	* wordCounter plugin
	* Requires jQuery
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
			showNegativeNumbers		: 0,
			preventInput			: false
		}, options);
		
		// Private variables
		// Has the ilimit been reached
		var limitReached = false;
		// Has the limit been exceeded
		var limitExceededBy = 0;
		// The key code which is pressed
		var keyCode;
		//The current word count
		var currentCount = 0;
		// The output displayed in the counter div
		var counterOutput = '';

		// Run execute each time the keys have been pressed
		$('#'+textElement).keypress(function (e) {
			// Set the key code
			keyCode = e.keycode;
			// Execute the word counter
			execute(e);
		});
		
		/**
		* Executes the wordCounter
		* Formats the counter div
		* Updates the counterElement with the final counter
		*
		* @return void
		*/
		function execute(e){
			// Count the words
			currentCount = countWords();
			// Check if the limit has been reached
			limitReached = checkLimitReached();
			// Default output
			output = 'There is a problem with the word counter';
			
			// Make sure the counter is set to zero if the 
			// value is blank
			if(currentCount >= 1 && $('#'+textElement).val() == '')
			{
				currentCount = 0;
			}
			
			// First deal with the limit being reached
			if(limitReached)
			{
				// Check if the limit has been breached
				limitExceededBy = checkLimitExceeded();
				
				// Stop further input
				if(settings.preventInput === true)
				{
					preventFurtherInput(e);
				}
				
				// Deal with any breaches to the limit
				if(limitExceededBy > 0)
				{
					// Update the currentCount to be negative if required
					if(settings.showNegativeNumbers === true)
					{
						currentCount = Math.abs(limitExceededBy) * -1;
					}
					output = formatOutput(settings.limitExceededFormat, currentCount);
				}
				// The limit has been reached but it hasn't been breached
				else
				{
					output = formatOutput(settings.defaultNoLimitFormat, currentCount);
				}
				
			}
			// Limit has not been reached
			else
			{
				output = formatOutput(settings.defaultNoLimitFormat, currentCount);
			}
			
		
			// Update the updateElement using Jquery
			$('#'+counterElement).html(output);
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
		 * Checks if the limit has been reached
		 *
		 * @return boolean
		 */
		function checkLimitReached()
		{
			var hasBeenReached = false;
			if(settings.limit == null)
			{
				return hasBeenReached;
			}
			
			if(currentCount >= settings.limit)
			{
				hasBeenReached = true;
			}
			
			return hasBeenReached;
		}
		
		/**
		 * Checks if the limit has been exceeded
		 *
		 * @return integer of how much the limit has been exceeded
		 */
		function checkLimitExceeded()
		{
			if(!limitReached)
			{
				return 0;
			}
			
			if(currentCount >= settings.limit)
			{
				exccededBy = currentCount - settings.limit;
			}
			
			return exccededBy;
		}
	
		/**
		 * Turns of any furhter input unless the backspace key is pressed
		 * - KeyCode 8
		 *
		 * @return boolean
		 */
		function preventFurtherInput(e)
		{
			if(window.event) 
			 {
				keycode = window.event.keyCode;
			 }
			 else
			 {
				keycode = e.which;
			 }
			 
			if((keycode != 8))
			{
				e.preventDefault();
			}
					
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
