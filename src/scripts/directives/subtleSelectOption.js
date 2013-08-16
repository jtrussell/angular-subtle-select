/*global angular */

angular.module('sbtl').directive('sbtlSelectOption', [function() {
  'use strict';
  return {
    restrict: 'AE',
    replace: true,
    scope: {sbtlOption: '='},
    template: [
      '<span class="sbtl-option">',
        '<a href="#">{{sbtlOption.text}}</a>',
        '<br />',
      '</span>'
    ].join(''),
    link: function(scope, element, attrs) {}
  };
}]);

