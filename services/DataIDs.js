angular.module('myApp')
    .factory('dataIdService', function () {
        var idList = {
            userId: '',
            patientId: '',
            tokenId: ''
        };

        return {
            getIDs: function () {
                return idList;
            },
            setIDs: function (u, p, t) {              
                idList.userId = u;
                idList.patientId = p;
                idList.tokenId = t;
            }
        }
    });