$(function() {
    var ENDPOINT = 'https://reqres.in/api/users';
    var mock_users = [];

    async.parallel([function(cb) {
        $.ajax({
            url: ENDPOINT + '?page=1',
            success: function(res) {
                mock_users = _.concat(mock_users, res.data);
                cb(null);
            },
            error: cb
        });
    }, function(cb) {
        $.ajax({
            url: ENDPOINT + '?page=2',
            success: function(res) {
                mock_users = _.concat(mock_users, res.data);
                cb(null);
            },
            error: cb
        });
    }, function(cb) {
        $.ajax({
            url: ENDPOINT + '?page=3',
            success: function(res) {
                mock_users = _.concat(mock_users, res.data);
                cb(null);
            },
            error: cb
        });
    }], function(err) {
        console.log(mock_users);
    });

});