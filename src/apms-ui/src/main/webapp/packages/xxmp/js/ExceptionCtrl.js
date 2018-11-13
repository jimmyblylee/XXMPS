/* ***************************************************************************
 * Copyright (C) 2018-2019 the original author Jimmybly Lee
 * or authors of NAPTUNE.COM
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of MIT License as published by
 * the Free Software Foundation;
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the MIT License for more details.
 *
 * You should have received a copy of the MIT License along
 * with this library; if not, write to the Free Software Foundation.
 * ***************************************************************************/

/**
 * Description: TODO.<br>
 * Created by jimmy on 2018/11/13.
 * @author Jimmybly Lee
 */
angular.module('WebApp').controller('ExceptionCtrl', ['$rootScope', '$scope', "$listService", "$ajaxCall", function($rootScope, $scope, $listService, $ajaxCall) {
    $scope.$on('$viewContentLoaded', function() {
        // initialize core components
        App.initAjax();

        // set default layout mode
        $rootScope.settings.layout.pageContentWhite = true;
        $rootScope.settings.layout.pageBodySolid = false;
        $rootScope.settings.layout.pageSidebarClosed = false;
    });

    $.getJSON("packages/auxpolice/js/com/config.json", function(data) {
        $scope.cfg = data;
    });

    $scope.color = {
        "损坏": "blue",
        "丢失": "yellow",
        "假冒": "purple",
        "纠错": "red"
    }
    $listService.initJsonData($scope, {
        "url": "packages/xxmp/data/exception.json",
        callback: function (success) {
            $scope.list = success.list;
        }
    });
    $scope.load = function () {
        $scope.pageRequest.getResponse();
    };
    $scope.load();
}]);
