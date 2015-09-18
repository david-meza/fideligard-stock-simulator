stocks.directive('timeSlider', function() {

    return {
      templateUrl: 'js/directives/time_slider.html',
      restrict: 'E',
      scope: {
        max: '=',
        min: '=',
        dateSelected: '=',
        slider: '=',
        convertToDate: '&'
      },

      link: function(scope, elem, attrs) {

        $(document).ready(function () {

          // $('input[type="range"]').on('focus', function(event) {
          //   console.log("moving")
          //   //Set tooltip position according to mouse position
          //   $('.tooltip').css({
          //     "position": "relative",
          //     "left": event.pageX + 'px',
          //   })
          // });

        });
      }
    };
  });



