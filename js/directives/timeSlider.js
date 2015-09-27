stocks.directive('timeSlider', function() {

    return {
      templateUrl: 'templates/directives/time_slider.html',
      restrict: 'E',
      scope: {
        max: '=',
        min: '=',
        dateSelected: '=',
        slider: '=',
        convertToDate: '&'
      },

      link: function(scope, elem, attrs) {

      }
    };
  });



