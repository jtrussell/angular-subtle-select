/*global angular */

angular.module('sbtl').directive('sbtlSelectOption', [function() {
  'use strict';
  return {
    restrict: 'AE',
    replace: true,
    scope: {sbtlOption: '=', sbtlCallback: '='},
    template: [
      '<span class="sbtl-option">',
        '<a ng-click="onSbtlOptionClick()">{{sbtlOption.text}}</a>',
        '<br />',
      '</span>'
    ].join(''),
    link: function(scope, element, attrs) {
      scope.onSbtlOptionClick = function() {
        scope.sbtlCallback(scope.sbtlOption);
      };
    }
  };
}]);

