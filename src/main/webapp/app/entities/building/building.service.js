(function() {
    'use strict';
    angular
        .module('masterfaceproApp')
        .factory('Building', Building);

    Building.$inject = ['$resource'];

    function Building ($resource) {
        var resourceUrl =  'api/buildings/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
