(function() {
    'use strict';

    angular
        .module('masterfaceproApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('record', {
            parent: 'entity',
            url: '/record',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'masterfaceproApp.record.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/record/records.html',
                    controller: 'RecordController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('record');
                    $translatePartialLoader.addPart('recordStatus');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('record-detail', {
            parent: 'record',
            url: '/record/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'masterfaceproApp.record.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/record/record-detail.html',
                    controller: 'RecordDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('record');
                    $translatePartialLoader.addPart('recordStatus');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Record', function($stateParams, Record) {
                    return Record.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'record',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('record-detail.edit', {
            parent: 'record-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/record/record-dialog.html',
                    controller: 'RecordDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Record', function(Record) {
                            return Record.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('record.new', {
            parent: 'record',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/record/record-dialog.html',
                    controller: 'RecordDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                insert: null,
                                path: null,
                                fileSentDate: null,
                                fileCreationDate: null,
                                processStartDate: null,
                                processFinishDate: null,
                                status: null,
                                afid: null,
                                afidContentType: null,
                                isProcessed: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('record', null, { reload: 'record' });
                }, function() {
                    $state.go('record');
                });
            }]
        })
        .state('record.edit', {
            parent: 'record',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/record/record-dialog.html',
                    controller: 'RecordDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Record', function(Record) {
                            return Record.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('record', null, { reload: 'record' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('record.delete', {
            parent: 'record',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/record/record-delete-dialog.html',
                    controller: 'RecordDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Record', function(Record) {
                            return Record.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('record', null, { reload: 'record' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
