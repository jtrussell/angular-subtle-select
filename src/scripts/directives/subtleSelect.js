/*global angular, jQuery */

angular.module('sbtl').directive('sbtlSelect', [
    '$rootScope',
    function($rootScope) {
  'use strict';
  return {
    restrict: 'AE',
    replace: true,
    transclude: true,
    scope: {sbtlOptions: '=', sbtlListIsVisible: '='},
    template: [
      '<span class="sbtl-select">',
        '<span ng-transclude></span>',
        '<sbtl-select-option-list ',
            'sbtl-list-is-visible="sbtlListIsVisible" ',
            'sbtl-options="sbtlOptions">',
        '</sbtl-select-option-list>',
      '</span>'
    ].join(''),
    link: function(scope, element, attrs) {
      (function($) {
        $(element[0]).mouseover(function() {
          scope.sbtlListIsVisible = true;
          $rootScope.$apply();
        });
      }(jQuery));
    }
  };
}]);
