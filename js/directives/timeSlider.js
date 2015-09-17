stocks.directive('timeSlider', function() {

    return {
      templateUrl: 'js/directives/time_slider.html',
      restrict: 'E',
      scope: {
        // min: '=',
        // max: '=',
        changeDate: '&',
        dateSelected: '=',
        convertToDate: '&'
      },

      link: function() {

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



