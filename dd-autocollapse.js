angular.module('dd-autocollapse', [])

  //  Auto-collapse inline elements inside a container when the con-
  //  tainer becomes too narrow to accommodate everything on one line.
  //
  //  Current behavior is to measure widths of any children specified
  //  with the [dd-autocollapse-child] attribute, and compare that sum
  //  to the width of the parent element that this directive is called on.
  //--------------------------------------------------------------------------//
  .directive('ddAutocollapse', ['$window', '$timeout', function($window, $timeout) {
    
    function link($scope, $element, $attrs) {

      function checkWidth() {

        var name = typeof $attrs.ddAutocollapseName === 'undefined' ?         // User can give each autocollapse'd element a name, allowing
                   '' : '-' + $attrs.ddAutocollapseName;                      //   them to style against each element.
        var $container = $element.find('[dd-autocollapse-container]');        // Find the containing element to use for the width test
        var containerWidth = $container.outerWidth();                         // Tell the width calculation to NOT include margins
        var childWidthSum = 0;                                                // Initialize a var to aggregate the total width of all children
        var offset = $attrs.ddAutocollapseOffset;                             // Allow user to specify an arbitrary amount to be added to
                                                                              //   child widths sum

        console.log('registering autocollapse element: ', name);

        // Loop through each element that should contribute to the
        // 'total children width' value, and add it to the sum total
        $element.find('[dd-autocollapse-child]').each(function(i, e) {

          // convert the outer width from a string to an integer
          var widthInt = parseInt($(this).outerWidth(), 10);
          
          // Add current element's outer width to child widths total
          childWidthSum += widthInt;
        });


        // Add arbitrary offset value (if specified) to child widths sum,
        if (typeof offset !== 'undefined') {
          childWidthSum += parseInt(offset, 10);
        }


        // Compare total width of child elements to container elements,
        // and set the appropriate class on both the container element
        // and the root HTML element, for styling purposes
        if (childWidthSum > containerWidth) {
          $element
            .removeClass('dd-autocollapse-element-false')
            .removeClass('dd-autocollapse-element' + name + '-false')
            .addClass('dd-autocollapse-element-true')
            .addClass('dd-autocollapse-element' + name + '-true');
          $('html')
            .removeClass('dd-autocollapse-false')
            .removeClass('dd-autocollapse' + name + '-false')
            .addClass('dd-autocollapse-true')
            .addClass('dd-autocollapse' + name + '-true');
        } else {
          $element
            .removeClass('dd-autocollapse-element-true')
            .removeClass('dd-autocollapse-element' + name + '-true')
            .addClass('dd-autocollapse-element-false')
            .addClass('dd-autocollapse-element' + name + '-false');
          $('html')
            .removeClass('dd-autocollapse-true')
            .removeClass('dd-autocollapse' + name + '-true')
            .addClass('dd-autocollapse-false')
            .addClass('dd-autocollapse' + name + '-false');
        }

        console.log('Container width: ', containerWidth);
        console.log('Total width of children: ', childWidthSum);
      }

      $timeout(checkWidth, 0);
      angular.element($window).on('resize', checkWidth);
    }

    return {
      restrict: 'A',
      link: link
    };
  }])
;