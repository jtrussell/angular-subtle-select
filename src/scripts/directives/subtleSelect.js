/*global angular, jQuery */

angular.module('sbtl').directive('sbtlSelect', [function() {
  'use strict';
  return {
    restrict: 'AE',
    replace: true,
    scope: {
      ngModel: '=',
      sbtlOptions: '=',
      sbtlListIsVisible: '@'
    },
    template: [
      '<span class="sbtl-select">',
        '{{getValueText(ngModel)}}',
        '<sbtl-select-option-list ',
            'sbtl-list-is-visible="sbtlListIsVisible" ',
            'sbtl-options="sbtlOptions">',
        '</sbtl-select-option-list>',
      '</span>'
    ].join(''),
    link: function(scope, element, attrs) {
      scope.getValueText = function(value) {
        var text = '';
        angular.forEach(scope.sbtlOptions, function(opt) {
          if(opt.value === value) {
            text = opt.text;
            return false;
          }
        });
        return text;
      };

      (function($) {
        $(element[0]).mouseover(function() {
          scope.sbtlListIsVisible = true;
          scope.$apply();
        });
      }(jQuery));
    }
  };
}]);
