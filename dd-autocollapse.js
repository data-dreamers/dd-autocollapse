angular.module('dd-autocollapse', [])

  //  Auto-collapse inline elements inside a container when the con-
  //  tainer becomes too narrow to accommodate everything on one line.
  //
  //  Current behavior is to measure widths of any children specified
  //  with the [dd-ac-child] attribute, and compare that sum
  //  to the width of the parent element that this directive is called on.
  //--------------------------------------------------------------------------//
  .directive('ddAutocollapse', ['$window', '$timeout', function($window, $timeout) {
    
    function link($scope, $element, $attrs) {


      var name = typeof $attrs.ddAcName === 'undefined' ?                        // User can give each autocollapse'd element a name, allowing
                   '' : '-' + $attrs.ddAcName;                                   // them to style against each element.

      var $container = $element.find('[dd-ac-container]').length === 0 ?         // Find the containing element to use for the width test,
                         $element : $element.find('[dd-ac-container]');          // which defaults to the directive's root element, but
                                                                                 // can be specified on an alternate child element

      var breakpointWidth = 0;                                                   // Calculate breakpoint width based on total width of
                                                                                 // all children labeled with [dd-ac-child] attribute


      // This runs once when Angular is ready, and sets the breakpoint
      // width for this directive element, so that it stays consistent
      // as the element width (and the widths of its child elements)
      // stays consistent
      function ddAcInit() {

        var offset = $attrs.ddAcOffset;                                          // Allow user to specify an arbitrary amount to be added to
                                                                                 // breakpointWidth

        breakpointWidth = 0;                                                     // reset the breakpoint width to zero


        // Loop through each element that should contribute to the
        // 'total children width' value, and add it to the sum total
        $element.find('[dd-ac-child]').each(function(i, e) {

          // convert the outer width from a string to an integer
          var widthInt = parseInt($(this).outerWidth(), 10);
          
          // Add current element's outer width to child widths total
          breakpointWidth += widthInt;
        });


        // Add arbitrary offset value (if specified) to child widths sum,
        if (typeof offset !== 'undefined') {
          breakpointWidth += parseInt(offset, 10);
        }

        console.log('Total width of children: ', breakpointWidth);
      }



      function checkWidth() {
 
        var containerWidth = $container.outerWidth();                            // get the container's current width, and compare to the breakpoint width

        // Compare total width of child elements to container elements,
        // and set the appropriate class on both the container element
        // and the root HTML element, for styling purposes
        if (breakpointWidth > containerWidth) {
          $element
            .removeClass('dd-ac-element-false')
            .removeClass('dd-ac-element' + name + '-false')
            .addClass('dd-ac-element-true')
            .addClass('dd-ac-element' + name + '-true');
          $('html')
            .removeClass('dd-ac-false')
            .removeClass('dd-ac' + name + '-false')
            .addClass('dd-ac-true')
            .addClass('dd-ac' + name + '-true');
        } else {
          $element
            .removeClass('dd-ac-element-true')
            .removeClass('dd-ac-element' + name + '-true')
            .addClass('dd-ac-element-false')
            .addClass('dd-ac-element' + name + '-false');
          $('html')
            .removeClass('dd-ac-true')
            .removeClass('dd-ac' + name + '-true')
            .addClass('dd-ac-false')
            .addClass('dd-ac' + name + '-false');
        }

      }

      // run the width check once, when Angular is ready...
      // $timeout(ddAcInit, 0);

      // TODO: THIS IS A TERRIBLE HACK
      // run the initial width check once, after a completely
      // arbitrary amount of time, to give all styles a
      // chance to load.
      $timeout(ddAcInit, 1000);

      // ...and any time the window is resized
      angular.element($window).on('resize', checkWidth);
    }


    // Directive Definition Object
    return {
      restrict: 'A',
      link: link
    };
  }])
;