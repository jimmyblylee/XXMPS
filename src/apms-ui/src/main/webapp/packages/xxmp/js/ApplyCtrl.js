/* ***************************************************************************
 * EZ.JWAF/EZ.JCWAP: Easy series Production.
 * Including JWAF(Java-based Web Application Framework)
 * and JCWAP(Java-based Customized Web Application Platform).
 * Copyright (C) 2016-2017 the original author or authors.
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
 * Description: BlankCtrl.<br>
 * Created by Jimmybly Lee on 2017/6/30.
 * @author Jimmybly Lee
 */
/* Setup blank page controller */
angular.module('WebApp').controller('ApplyCtrl', ['$rootScope', '$scope', "$listService", "$ajaxCall", function($rootScope, $scope, $listService, $ajaxCall) {
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

    $listService.initJsonData($scope, {
        "url": "packages/xxmp/data/apply.json",
        callback: function (success) {
            $scope.list = success.list;
        }
    });
    $scope.load = function () {
        $scope.pageRequest.getResponse();
    };
    $scope.load();

    $scope.prepareToModify = function (item) {
        var divId = "modifyAuxploiceApplyModalDiv";
        var scope = $("#" + divId).scope();
        scope.title = "修改门楼牌信息";
        scope.method = "update";
        scope.entity = item;

        scope.$on("submitted", function () {
            $scope.load();
        });
        $('#form_wizard').find('.button-first').click();
    };

    $scope.prepareToView = function (item) {
        var divId = "viewAuxploiceApplyModalDiv";
        var scope = $("#" + divId).scope();
        scope.title = "查看门牌信息";
        scope.method = "update";
        scope.entity = item;

        scope.$on("submitted", function () {
            $scope.load();
        });
    };

    $scope.prepareToGenerate = function (item) {
        var divId = "generateModalDiv";
        var scope = $("#" + divId).scope();
        scope.title = "查看门牌防伪码信息";
        scope.method = "update";
        scope.entity = item;

        scope.$on("submitted", function () {
            $scope.load();
        });
    };

    $scope.prepareToAdd = function () {
        var divId = "modifyAuxploiceApplyModalDiv";
        var scope = $("#" + divId).scope();
        scope.title = "登记申请门楼牌信息";
        scope.method = "create";
        scope.entity = {
            "bureau": "西湖分局",
            "station": "小唐派出所",
            "type": "m",
            "status": {"code": "TO_APPLY", "value": "待提交"},
            "tjr": "系统测试员-吴迪",
            "shr": "系统测试员-沈建",
            "WangGe": "爱民广场",
            "WangGeFZR": "李志民",
            "WangGeFZRTel": "0857-432676",
            "WangGeFZRMobile": "13412625502",
            "Sheng": "",
            "Shi": "",
            "QuXian": "",
            "XiangZhenJieDao": "",
            "LuXiangXingZhengCun": "",
            "XiaoQuZiRanCun":"",
            "MenPaiCunZu": "",
            "LouHaoDanWei": "",
            "DanYuanHaoFangHao": "",
            "FangJianHao": "",
            "lastUpdateUser": {
                "name": "系统测试员-吴迪",
                "id": "575432"
            },
            "lastUpdateDate": "2018-10-12 16:23:15",
            "lastUpdateIp": "10.30.127.233",
            "lastApproveUser": {
                "name": "系统测试员-沈建",
                "id": "433532"
            },
            "lastApproveDate": "2018-10-12 16:23:15",
            "lastApproveIp": "10.30.127.233"
        };

        scope.$on("submitted", function () {
            $scope.load();
        });
        $('#form_wizard').find('.button-first').click();
    };

    $scope.take = function(item, method) {
        var op = "";
        if ("apply" == method) {
            op = "上报";
        } else if ("accept" == method) {
            op = "受理";
        } else if ("reject" == method) {
            op = "驳回";
        } else {
            op = "通过";
        }
        bootbox.dialog({
            title: "请确认",
            message: "是否确认" + op + "该门楼牌？",
            buttons: {
                main: {label: " 取 消 ", className: "dark icon-ban btn-outline"},
                danger: {
                    label: op,
                    className: "fa fa-check red",
                    callback: function () {
                        alert(op + "门楼牌数据成功！");
                    }
                }
            }
        });
    };

    $.getJSON("packages/xxmp/data/apply.json", function(data) {
        $scope.dataList = data.list;
    });
    $scope.validate = function() {
        var valid = false;
        $.each($scope.dataList, function(key, data) {
            if (data.sn == $scope.condition.sn && data.guid == $scope.condition.guid && data.rd == $scope.condition.rd) {
                valid = true;
                $scope.entity = data;
            }
        });
        $scope.valid = valid;
    }
}]);
