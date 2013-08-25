/*global angular, jQuery */

angular.module('sbtl').directive('sbtlSelectOptionList', [function() {
  'use strict';
  return {
    restrict: 'AE',
    replace: true,
    scope: {sbtlOptions: '=', sbtlListIsVisible: '=', sbtlCallback: '='},
    template: [
      '<span ng-show="sbtlListIsVisible" class="sbtl-option-list" ng-mouseleave="hideSbtlList()">',
        '<span sbtl-select-option ng-repeat="opt in sbtlOptions" sbtl-option="opt" sbtl-callback="sbtlCallback">',
        '</span>',
      '</span>'
    ].join(''),
    link: function(scope, element, attrs) {
      scope.hideSbtlList = function() {
        scope.sbtlListIsVisible = false;
      };
    }
  };
}]);

