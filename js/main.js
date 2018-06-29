$(function() {
    var items = [{
        _id: 1,
        title: 'Primer tarea',
        date: Date.now,
        completed: false
    }, {
        _id: 2,
        title: 'Segunda tarea',
        date: Date.now,
        completed: true
    }, {
        _id: 3,
        title: 'Tercer tarea',
        date: Date.now,
        completed: false
    }, {
        _id: 4,
        title: 'Cuarto tarea',
        date: Date.now,
        completed: true
    }];
    var currentOrientation = 'asc';
    var currentBoolean = true;

    function mySort(items, by, orientation) {
        currentOrientation = currentOrientation === 'asc' ? 'desc' : 'asc';
        return items.sort(function(a, b) {
            return (currentOrientation === 'asc' ? a[by] > b[by] : a[by] < b[by]) ? 1 : -1;
        });
    }

    function myFilter(items, by) {
        currentBoolean = currentBoolean ? false : true;
        return items.filter(function(item) {
            return item[by] === currentBoolean;
        });
    }

    function onClickBtnStatus(e) {
        var $el = $(this).parents('.todo-item');
        var id = parseInt($el.attr('id'), 10);
        var item = null;

        for (var i = 0, l = items.length; i < l; i++) {
            if (items[i]._id === id) {
                item = items[i];
                break;
            }
        }

        if (item && item._id) {
            item.completed = !item.completed;
            $el.find('.icon-status')
                .removeClass('fa far fa-circle fa-check-circle')
                .addClass(item.completed ? 'fa fa-check-circle' : 'far fa-circle');
        }
    }

    function renderItem(item) {
        var $li = $('<li class="todo-item list-group-item d-flex justify-content-between align-items-center"/>');
        var $btnsContainer = $('<div class="btn-group" role="group"/>');
        var $btnStatus = $('<button id="btn-filter-completed" type="button" class="btn btn-light"/>');

        $li.attr('id', item._id);
        $li.append($('<span>#' + item._id + ' - ' + item.title + '</span>'));
        $btnStatus.append($('<i class="icon-status ' + (item.completed ? 'fa fa-check-circle' : 'far fa-circle') + '"></i>'))
        $btnStatus.on('click', onClickBtnStatus);
        $btnsContainer.append($btnStatus);
        $li.append($btnsContainer);
        return $li;
    }

    function renderItems(items) {
        var $lis = [];

        for (var i = 0, l = items.length; i < l; i++) {
            item = items[i];
            $lis.push(renderItem(items[i]));
        }

        $('#todo-list').empty().append($lis);
    }

    renderItems(items);

    var btns = {
        $btnSortById: $('#btn-sort-by-id').on('click', function(e) {
            e.preventDefault();
            renderItems(mySort(items, '_id', 'asc'));
        }),
        $btnSortByAlpha: $('#btn-sort-by-alpha').on('click', function(e) {
            e.preventDefault();
            renderItems(mySort(items, 'title', 'asc'));
        }),
        $btnSortByDate: $('#btn-sort-by-date').on('click', function(e) {
            e.preventDefault();
            renderItems(mySort(items, 'date', 'asc'));
        }),
        $btnFilterByCompleted: $('#btn-filter-completed').on('click', function(e) {
            e.preventDefault();
            renderItems(myFilter(items, 'completed', 'asc'));
        })
    };

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