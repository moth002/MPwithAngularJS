angular.module('myApp')
    .factory('globalIdService', function () {
        var idList = {
            userId: '',
            patientId: '',
            tokenId: '',
            printerId: '',

            getIDs: function () {
                return idList;
            },
            setIDs: function (u, p, t) {
                idList.userId = u;
                idList.patientId = p;
                idList.tokenId = t;
            },
            setPrinter: function(p) {
                idList.printerId = p;
            }
        };

    return idList;
});