/*global angular */

angular.module('sbtl').directive('sbtlSelectOptionList', [function() {
  'use strict';
  return {
    restrict: 'AE',
    replace: true,
    scope: {sbtlOptions: '=', sbtlListIsVisible: '='},
    template: [
      '<span ng-show="sbtlListIsVisible" class="sbtl-option-list">',
        '<sbtl-select-option ng-repeat="opt in sbtlOptions" sbtl-option="opt">',
        '</sbtl-select-option>',
      '</span>'
    ].join(''),
    link: function(scope, element, attrs) {
    }
  };
}]);

