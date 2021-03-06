(function() {
  var ddi_imports;

  ddi_imports = angular.module('archivist.data_manager.ddi_imports', ['ngResource']);

  ddi_imports.factory('DdiImports', [
    'WrappedResource', function(WrappedResource) {
      return new WrappedResource('imports/:id.json', {
        id: '@id',
        instrument_id: '@instrument_id'
      }, {
        save: {
          method: 'PUT'
        },
        create: {
          method: 'POST'
        }
      });
    }
  ]);

}).call(this);
