angular.module('myApp')
    .controller("FooterBtnCtrl", [
        '$scope', 'footerBtnService', 'globalIdService', 'cordovaReadyService', 'notificationDlgService',
            function ($scope, footerBtnService, globalIdService, cordovaReadyService, notificationDlgService) {

                $scope.idList = globalIdService.getIDs;

                $scope.rightButton = footerBtnService.getRight();
                $scope.middleButton = footerBtnService.getMiddle();
                $scope.leftButton = footerBtnService.getLeft();

                $scope.buttonClicked = function () {
                    window.location = $scope.rightButton.click;
                };

                function alertDismissed() {
                    // do something
                }

                $scope.btnCancel = function () {
                   // cordovaReadyService(navigator.notification.alert(
                   //    'You are the winner!',  // message
                   //    alertDismissed,         // callback
                   //    'Game Over',            // title
                   //    'Done'                  // buttonName
                    //));
                    window.location = '#/';
                };
                

                function success(devices) {
                    devices.forEach(function (device) {
                        alert(device.name);
                    });
                };

                function failure() {
                    alert("No List");
                };

                //$scope.btnCancel = function () {
                //    cordovaReadyService( bluetoothSerial.list(success, failure));
                //};


                //refreshDeviceList: function() {
                //    bluetoothSerial.list(onDeviceList, onError);
                //},
                //onDeviceList = function(devices) {
                //    var option;

                //    // remove existing devices
                //    deviceList.innerHTML = "";
                //    app.setStatus("");

                //    devices.forEach(function(device) {

                //        var listItem = document.createElement('li'),
                //            html = '<b>' + device.name + '</b><br/>' + device.id;

                //        listItem.innerHTML = html;

                //        if (cordova.platformId === 'windowsphone') {
                //            // This is a temporary hack until I get the list tap working
                //            var button = document.createElement('button');
                //            button.innerHTML = "Connect";
                //            button.addEventListener('click', app.connect, false);
                //            button.dataset = {};
                //            button.dataset.deviceId = device.id;
                //            listItem.appendChild(button);
                //        } else {
                //            listItem.dataset.deviceId = device.id;
                //        }
                //        deviceList.appendChild(listItem);
                //    });

                //    if (devices.length === 0) {

                //        option = document.createElement('option');
                //        option.innerHTML = "No Bluetooth Devices";
                //        deviceList.appendChild(option);

                //        if (cordova.platformId === "ios") { // BLE
                //            app.setStatus("No Bluetooth Peripherals Discovered.");
                //        } else { // Android or Windows Phone
                //            app.setStatus("Please Pair a Bluetooth Device.");
                //        }

                //    } else {
                //        app.setStatus("Found " + devices.length + " device" + (devices.length === 1 ? "." : "s."));
                //    }

                //},
                //connect: function(e) {
                //    var onConnect = function() {
                //        // subscribe for incoming data
                //        bluetoothSerial.subscribe('\n', app.onData, app.onError);

                //        resultDiv.innerHTML = "";
                //        app.setStatus("Connected");
                //        app.showDetailPage();
                //    };

                //    var deviceId = e.target.dataset.deviceId;
                //    if (!deviceId) { // try the parent
                //        deviceId = e.target.parentNode.dataset.deviceId;
                //    }

                //    bluetoothSerial.connect(deviceId, onConnect, app.onError);
                //},
                //onData: function(data) { // data received from Arduino
                //    console.log(data);
                //    resultDiv.innerHTML = resultDiv.innerHTML + "Received: " + data + "<br/>";
                //    resultDiv.scrollTop = resultDiv.scrollHeight;
                //},
                //sendData: function(event) { // send data to Arduino

                //    var success = function() {
                //        console.log("success");
                //        resultDiv.innerHTML = resultDiv.innerHTML + "Sent: " + messageInput.value + "<br/>";
                //        resultDiv.scrollTop = resultDiv.scrollHeight;
                //    };

                //    var failure = function() {
                //        alert("Failed writing data to Bluetooth peripheral");
                //    };

                //    var data = messageInput.value;
                //    bluetoothSerial.write(data, success, failure);
                //},
                //disconnect: function(event) {
                //    bluetoothSerial.disconnect(app.showMainPage, app.onError);
                //},
                //showMainPage: function() {
                //    mainPage.style.display = "";
                //    detailPage.style.display = "none";
                //},
                //showDetailPage: function() {
                //    mainPage.style.display = "none";
                //    detailPage.style.display = "";
                //},
                //setStatus: function(message) {
                //    console.log(message);

                //    window.clearTimeout(app.statusTimeout);
                //    statusDiv.innerHTML = message;
                //    statusDiv.className = 'fadein';

                //    // automatically clear the status with a timer
                //    app.statusTimeout = setTimeout(function () {
                //        statusDiv.className = 'fadeout';
                //    }, 5000);
                //},
                //onError: function(reason) {
                //    alert("ERROR: " + reason); // real apps should use notification.alert
                //}

            }
    ]);