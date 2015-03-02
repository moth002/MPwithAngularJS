angular.module('myApp')
    .factory('dataIdService', function () {
        var idList = {
            userId: '',
            patientId: ''
        };

        return {
            getIDs: function () {
                return idList;
            },
            setIDs: function (u, p) {              
                idList.userId = u;
                idList.patientId = p;
            }
        }
    });