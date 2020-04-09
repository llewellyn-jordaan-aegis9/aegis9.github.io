import $ from 'jquery';

/* eslint-disable */

// TYPE WRITER
// values to keep track of the number of letters typed, which quote to use. etc. Don't change these values.
var i = 0,
    a = 0,
    isBackspacing = false,
    isParagraph = false;


// Speed (in milliseconds) of typing.
var speedForward = 120, //Typing Speed
    speedWait = 1000, // Wait between typing and backspacing
    speedBetweenLines = 1000, //Wait between first and second lines
    speedBackspace = 70; //Backspace Speed

 
function typeWriter(id, ar) {
    var element = $("#" + id),
    aString = ar[a],
    eHeader = element.children("span"), //Header element
    eParagraph = element.children("p"); //Subheader element


    // Determine if animation should be typing or backspacing
    if (!isBackspacing) {
        
        if (i < aString.length) {
            if (!isParagraph) {
                eHeader.text(eHeader.text() + aString.charAt(i));
            } else {
                eParagraph.text(eParagraph.text() + aString.charAt(i));
            }

            i++;

            setTimeout(function(){ typeWriter(id, ar); }, speedForward);
        } else if (i == aString.length) {
            isBackspacing = true;

            setTimeout(function(){ typeWriter(id, ar); }, speedWait);
        }
        
    // If backspacing is enabled
    } else {
        // If either the header or the paragraph still has text, continue backspacing
        if (eHeader.text().length > 0 || eParagraph.text().length > 0) {
        
        // If paragraph still has text, continue erasing, otherwise switch to the header.
        if (eParagraph.text().length > 0) {
            eParagraph.text(eParagraph.text().substring(0, eParagraph.text().length - 1));
        } else if (eHeader.text().length > 0) {
            eParagraph.removeClass("cursor");
            eHeader.addClass("cursor");
            eHeader.text(eHeader.text().substring(0, eHeader.text().length - 1));
        }
        setTimeout(function(){ typeWriter(id, ar); }, speedBackspace);
        
        // If neither head or paragraph still has text, switch to next quote in array and start typing.
        } else { 
        
        isBackspacing = false;
        i = 0;
        isParagraph = false;
        a = (a + 1) % ar.length; //Moves to next position in array, always looping back to 0
        setTimeout(function(){ typeWriter(id, ar); }, 50);
        
        }
    }
}

$(document).ready(function () {
    "use strict";

    // Smooth scroll to inner links
    var innerLinks = $('a.inner-link');

    if(innerLinks.length){
        innerLinks.each(function(){
            var link = $(this);
            var href = link.attr('href');
            if(href.charAt(0) !== "#"){
                link.removeClass('inner-link');
            }
        });

    }

    var textArray = [
        "Service Providers",
        "Organisations",
        "Small Businesses",
        "Government Agencies",
        "Private Enterprise",
        "Industry Leaders"
    ];

     //Run the loop
    typeWriter("type-output", textArray);
     
    // Mobile Menu
    /*
    $('.mobile-toggle').click(function() {
        $('.nav-bar').toggleClass('nav-open');
        $(this).toggleClass('active');
    });

    $('.menu li').click(function(e) {
        if (!e) e = window.event;
        e.stopPropagation();
        if ($(this).find('ul').length) {
            $(this).toggleClass('toggle-sub');
        } else {
            $(this).parents('.toggle-sub').removeClass('toggle-sub');
        }
    });

    $('.menu li a').click(function() {
        if ($(this).hasClass('inner-link')){
            $(this).closest('.nav-bar').removeClass('nav-open');
        }
    });

    $('.module.widget-handle').click(function() {
        $(this).toggleClass('toggle-widget-handle');
    });

    $('.search-widget-handle .search-form input').click(function(e){
        if (!e) e = window.event;
        e.stopPropagation();
    });
    
    // Offscreen Nav
    
    if($('.offscreen-toggle').length){
    	$('body').addClass('has-offscreen-nav');
    }
    else{
        $('body').removeClass('has-offscreen-nav');
    }
    
    $('.offscreen-toggle').click(function(){
    	$('.main-container').toggleClass('reveal-nav');
    	$('nav').toggleClass('reveal-nav');
    	$('.offscreen-container').toggleClass('reveal-nav');
    });
    
    $('.main-container').click(function(){
    	if($(this).hasClass('reveal-nav')){
    		$(this).removeClass('reveal-nav');
    		$('.offscreen-container').removeClass('reveal-nav');
    		$('nav').removeClass('reveal-nav');
    	}
    });
    
    $('.offscreen-container a').click(function(){
    	$('.offscreen-container').removeClass('reveal-nav');
    	$('.main-container').removeClass('reveal-nav');
    	$('nav').removeClass('reveal-nav');
    });

    
    // Disable parallax on mobile

    if ((/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)) {
        $('section').removeClass('parallax');
    }
    */
}); 