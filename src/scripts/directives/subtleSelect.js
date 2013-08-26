/*global angular */

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
      '<span class="sbtl-select" ng-click="showSbtlList()" ng-mouseenter="showSbtlList()">',
        '{{getValueText(ngModel)}}',
        '<span sbtl-select-option-list ',
            'sbtl-list-is-visible="sbtlListIsVisible" ',
            'sbtl-options="sbtlOptions" ',
            'sbtl-callback="sbtlSelectCallback">',
        '</span>',
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

      scope.showSbtlList = function() {
        scope.sbtlListIsVisible = true;
      };

      scope.sbtlSelectCallback = function(opt) {
        selectOpt(opt);
        makeOptFirst(opt);
        hideSbtlList();
      };

      var selectOpt = function(opt) {
        scope.ngModel = opt.value;
      };

      var hideSbtlList = function() {
        scope.sbtlListIsVisible = false;
      };

      var makeOptFirst = function(opt) {
        var ix, optIx;
        for(ix = scope.sbtlOptions.length; ix--;) {
          if(opt.value === scope.sbtlOptions[ix].value) {
            optIx = ix;
            ix = 0;
          }
        }

        if(!angular.isUndefined(optIx)) {
          scope.sbtlOptions.splice(optIx,1);
          scope.sbtlOptions.unshift(opt);
        }
        
      };
    }
  };
}]);
