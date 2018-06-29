$(function() {
    var items = [];
    var currentOrientation = 'asc';
    var currentBoolean = true;
    _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;

    function mySort(items, by, orientation) {
        currentOrientation = currentOrientation === 'asc' ? 'desc' : 'asc';
        return _.orderBy(items, by, currentOrientation);
    }

    function myFilter(items, by) {
        currentBoolean = currentBoolean ? false : true;
        return _.filter(items, function(item) {
            return item[by] === currentBoolean;
        });
    }

    function onClickBtnStatus(e) {
        var id = $(this).parents('.todo-item').attr('id');
        var item = _.find(items, function(item) {
            return item._id == id;
        });

        if (item && item._id) {
            item.completed = !item.completed;
            item.$el.find('.icon-status')
                .removeClass('fa far fa-circle fa-check-circle')
                .addClass(item.completed ? 'fa fa-check-circle' : 'far fa-circle');
        }
    }

    function renderItem(item) {
        var $li = $(_.template($('#tpl').html())(item));
        $li.find('#btn-completed').on('click', onClickBtnStatus);
        item.$el = $li;
        return $li;
    }

    function renderItems(items) {
        $('#todo-list').empty().append(_.map(items, renderItem));
    }

    var btns = {
        $btnSortByAlpha: $('#btn-sort-by-alpha').on('click', function(e) {
            e.preventDefault();
            renderItems(mySort(items, 'title', 'asc'));
        }),
        $btnFilterByCompleted: $('#btn-filter-completed').on('click', function(e) {
            e.preventDefault();
            renderItems(myFilter(items, 'completed', 'asc'));
        })
    };

    function setFlags(item, flag) {
        item.flags = item.flags || {};
        item.flags[flag] = true;
        return item;
    }

    function getLevelsAndCareers() {
        var ENDPOINT = 'https://api.coderhouse.com/';
        async.parallel([function(cb) {
            $.ajax({
                url: ENDPOINT + 'careers',
                success: function(res) {
                    items = _.concat(items, _.map(res, (item) => {
                        return setFlags(item, 'career');
                    }));
                    cb(null);
                },
                error: cb
            });
        }, function(cb) {
            $.ajax({
                url: ENDPOINT + 'levels',
                success: function(res) {
                    items = _.concat(items, _.map(res, (item) => {
                        return setFlags(item, 'level');
                    }));
                    cb(null);
                },
                error: cb
            });
        }, function(cb) {
            $.ajax({
                url: ENDPOINT + 'workshops',
                success: function(res) {
                    items = _.concat(items, _.map(res, (item) => {
                        return setFlags(item, 'workshop');
                    }));
                    cb(null);
                },
                error: cb
            });
        }], function(err) {
            items = _.map(items, (item) => {
                return {
                    _id: item._id,
                    title: item.title,
                    flags: item.flags,
                    completed: false
                };
            });

            console.log(items);

            renderItems(items);
        });
    }

    getLevelsAndCareers();

    $('#form-new-task').on('submit', function(e) {
        e.preventDefault();
        e.stopPropagation();

        items.push({
            _id: items.length,
            title: $('#input-new-task').val(),
            date: Date.now,
            completed: false
        });

        $('#input-new-task').val('');

        renderItems(items);
    });
});