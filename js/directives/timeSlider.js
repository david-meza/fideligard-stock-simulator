stocks.directive('timeSlider', function() {
    var updateCurrentTime, updateEndTime, updateStartTime;
    updateStartTime = function(span, value) {
      var sd, startDate, startTime;
      sd = new Date(value);
      startDate = sd.toLocaleDateString();
      startTime = sd.toLocaleTimeString();
      return span.innerHTML = startDate + ':' + startTime;
    };
    updateEndTime = function(span, value) {
      var ed, endDate, endTime;
      ed = new Date(value);
      endDate = ed.toLocaleDateString();
      endTime = ed.toLocaleTimeString();
      return span.innerHTML = endDate + ':' + endTime;
    };
    updateCurrentTime = function(span, value) {
      var cd, curDate, curTime;
      cd = new Date(value);
      curDate = cd.toLocaleDateString();
      curTime = cd.toLocaleTimeString();
      return span.innerHTML = curDate + ':' + curTime;
    };
    return {
      templateUrl: 'js/directives/time_slider.html',
      restrict: 'E',
      scope: {
        min: '=',
        max: '=',
        callback: '='
      },
      link: function(scope, element, attrs) {
        var adjusting, curTimeDiv, moveCurTimeDiv, rangeInput, rangeInputElement, rangeInputOffset, spans;
        rangeInput = element.find('input')[0];
        rangeInputElement = angular.element(rangeInput);
        spans = element.find('span');
        curTimeDiv = element.find('div')[1];
        rangeInputOffset = $(rangeInput).offset();
        adjusting = false;
        rangeInput.min = scope.min;
        rangeInput.max = scope.max;
        rangeInput.step = attrs.step;
        rangeInput.value = scope.min;
        updateStartTime(spans[1], rangeInput.min);
        updateEndTime(spans[3], rangeInput.max);
        moveCurTimeDiv = function(curValue) {
          var ctdElement, curPercentage, curValueLocation;
          curPercentage = (curValue - scope.min) / (scope.max - scope.min);
          curValueLocation = (rangeInput.clientWidth * curPercentage) + rangeInputOffset.left;
          ctdElement = angular.element(curTimeDiv);
          ctdElement.css('left', curValueLocation - curTimeDiv.clientWidth + 'px');
          return ctdElement.css('top', rangeInput.clientHeight - curTimeDiv.clientHeight + 'px');
        };
        rangeInputElement.bind('change', function(event) {
          var curValue;
          adjusting = true;
          curValue = parseInt(event.target.value);
          updateCurrentTime(spans[4], curValue);
          return moveCurTimeDiv(curValue);
        });
        rangeInputElement.bind('mouseup', function(event) {
          adjusting = false;
          return scope.callback.call(this, parseInt(event.target.value));
        });
        scope.$watch('min', function(newValue, oldValue) {
          updateStartTime(spans[1], parseInt(newValue));
          rangeInput.min = scope.min;
          rangeInput.value = scope.min;
          return spans[4].innerHTML = '';
        });
        return scope.$watch('max', function(newValue, oldValue) {
          updateEndTime(spans[3], parseInt(newValue));
          return rangeInput.max = scope.max;
        });
      }
    };
  });



