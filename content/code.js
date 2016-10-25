// RELOGIO
relogio = function () {
   var data = new Date();
   var dia = data.getDate();
   var mes = data.getMonth() + 1;
   if (mes < 10) {
      mes = "0" + mes;
    }
  var ano = data.getFullYear();
  var horas = new Date().getHours();
  if (horas < 10) {
      horas = "0" + horas;
  }
  var minutos = new Date().getMinutes();
  if (minutos < 10) {
      minutos = "0" + minutos;
  }
  var segundos = new Date().getSeconds();
  if (segundos < 10) {
      segundos = "0" + segundos;
  }
  var result = dia+"/"+mes+"/"+ano+" - "+horas + ":" + minutos + ":" + segundos;
  return result;
}

//CODIGO APP ANGULAR
var app = angular.module("offChat", []);
app.controller("offChatCtrl", function ($scope, $http, $interval) {
  $scope.titulo = "Off Chat";
  $scope.messages = [];

  var loadMessages = function () {
		$http.get("http://localhost:3000/messages").success(function (data) {
			$scope.messages = data;
		}).error(function (data, status) {
			$scope.message = "Aconteceu um problema: " + data;
		});
	};

  $scope.sendMessage = function (message) {
    message.time = relogio();
		$http.post("http://localhost:3000/sendMessage", message).success(function (data) {
			delete $scope.message.text;
			$scope.messageForm.$setPristine();
			loadMessages();
		});
	};

  $interval(loadMessages, 1000);
});