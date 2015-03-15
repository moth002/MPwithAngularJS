angular.module('myApp')
    .factory('globalIdService', function () {
        var idList = {
            userId: '',
            patientId: '',
            tokenId: '',

            getIDs: function () {
                return idList;
            },
            setIDs: function (u, p, t) {
                idList.userId = u;
                idList.patientId = p;
                idList.tokenId = t;
            }
        };

    return idList;
});