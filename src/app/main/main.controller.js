(function() {
  'use strict';

  angular
    .module('angularTest')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, webDevTec, toastr, $log) {
    var vm = this;

    vm.awesomeThings = [];
    vm.classAnimation = '';
    vm.creationDate = 1470759496403;
    vm.add_record = add_record;
    vm.update_record = update_record;
    vm.remove_record = remove_record;
    vm.selectTopping = selectTopping;
    vm.newName = "";
    vm.selectedTopping = undefined;

    vm.toppings = [
      { name: 'Nick1', wanted: true },
      { name: 'Nick2', wanted: false },
      { name: 'Nick3', wanted: true },
      { name: 'Nick4', wanted: false },
      { name: 'Nick5', wanted: false }
    ];

    activate();

    function selectTopping(index) {
      vm.selectedTopping = vm.toppings[index];
      vm.newName = vm.toppings[index].name;
    }

    function add_record(){
      vm.toppings.push({ name: vm.newName, wanted: false});
      vm.newName = "";
      toastr.info('Added New Record!');
      sort();
    }

    function update_record(){
      vm.selectedTopping.name = vm.newName;
      vm.newName = "";
      toastr.warning('Updated Record');
      sort();
    }

    function remove_record() {
      vm.toppings = vm.toppings.filter( function( item ){
        return !item.wanted
      });
      toastr.warning('Deleted Records');
      sort();
    }

    function sort(){
      vm.toppings.sort(function(a, b){
        return a.name > b.name
      })
    }

    function activate() {
      getWebDevTec();
      $timeout(function() {
        vm.classAnimation = 'rubberBand';
      }, 4000);
    }

    function getWebDevTec() {
      vm.awesomeThings = webDevTec.getTec();

      angular.forEach(vm.awesomeThings, function(awesomeThing) {
        awesomeThing.rank = Math.random();
      });
    }
  }
})();
