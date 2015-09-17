stocks.directive('timeSlider', function() {

    return {
      templateUrl: 'js/directives/time_slider.html',
      restrict: 'E',
      scope: {
        min: '=',
        max: '=',
        callback: '='
      },
      link: function() {

        // webshim.polyfill('forms forms-ext');

        jQuery(function($) {

            $('#dateControlledByRange').on('input', function() {
                $('#rangeControlledByDate').prop('valueAsNumber', $.prop(this, 'valueAsNumber'));
            });
            $('#rangeControlledByDate').on('input', function() {
                $('#dateControlledByRange').prop('valueAsNumber', $.prop(this, 'valueAsNumber'));
            });
        });
      }
    };
  });



