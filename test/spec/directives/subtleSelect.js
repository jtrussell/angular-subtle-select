/*global describe, beforeEach, module, jasmine, inject, angular, it, expect, spyOn */

'use strict';

describe('Directive: sbtlSelect', function() {
  beforeEach(module('sbtl'));

  var tpl = [
        '<sbtl-select ',
        '    ng-model="modelValue" ',
        '    sbtl-options="sbtlOpts">',
        '</sbtl-select>'
      ].join('');

  var element
    , scope;

  beforeEach(inject(function($rootScope, $compile) {
    scope = $rootScope.$new();

    scope.modelValue = 'foo';

    scope.sbtlOpt = [{
      value: 'foo',
      text: 'For me it is Foo!',
    },{
      value: 'bar',
      text: 'Bar is the best!'
    }];

    element = angular.element(tpl);
    element = $compile(element)(scope);
  }));

  describe('behaviour', function() {

  });
});
