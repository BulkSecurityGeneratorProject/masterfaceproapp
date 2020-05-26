(function() {
    'use strict';

    angular
        .module('masterfaceproApp')
        .controller('RecordDialogController', RecordDialogController);

    RecordDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'DataUtils', 'entity', 'Record', 'Device', 'Image', 'Person'];

    function RecordDialogController ($timeout, $scope, $stateParams, $uibModalInstance, DataUtils, entity, Record, Device, Image, Person) {
        var vm = this;

        vm.record = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;
        vm.save = save;
        vm.devices = Device.query();
        vm.images = Image.query();
        vm.people = Person.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.record.id !== null) {
                Record.update(vm.record, onSaveSuccess, onSaveError);
            } else {
                Record.save(vm.record, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('masterfaceproApp:recordUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }

        vm.datePickerOpenStatus.insert = false;
        vm.datePickerOpenStatus.fileSentDate = false;
        vm.datePickerOpenStatus.fileCreationDate = false;
        vm.datePickerOpenStatus.processStartDate = false;
        vm.datePickerOpenStatus.processFinishDate = false;

        vm.setAfid = function ($file, record) {
            if ($file) {
                DataUtils.toBase64($file, function(base64Data) {
                    $scope.$apply(function() {
                        record.afid = base64Data;
                        record.afidContentType = $file.type;
                    });
                });
            }
        };

        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }
    }
})();
