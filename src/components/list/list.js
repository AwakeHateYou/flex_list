var listUtils = {
    height: 300,
    width: 200,
    groups: null,
    items: [],
    groupBy: null,
    root: null,

    setHeight: function (value) {
        if (value) {
            height = value;
        }
    },
    setWidth: function (value) {
        if (value) {
            width = value;
        }
    },
    createList: function (list, groupBy, root) {
        this.items = list;
        this.groupBy = groupBy;
        this.root = root;
        list.sort(function (first, second) {
            return (first[groupBy] > second[groupBy]) ? 1 : ((second[groupBy] > first[groupBy]) ? -1 : 0);
        });
        this.splitByField(list, groupBy);
        console.log(this.groups);
        $(document).ready(function () {
            listUtils.initMarkup();
            listUtils.placeData();
        });
    },
    splitByField: function () {
        var getGroups = function () {
            var groups = new Set();
            for(var i = 0; i < listUtils.items.length; i++){
                groups.add(listUtils.items[i][listUtils.groupBy][0]);
            }
            listUtils.groups = Array.from(groups);
        };
        getGroups();
    },
    initMarkup: function () {

        var box = $('<div id="element"></div>');
        var header = $('<h1 id="element-header"></h1>');
        var body = $('<div id="element-body"></div>');
        var slice = $('<div id="element-slice"></div>');



        listUtils.root.append(box);
        box.append(header);
        box.append(body);
        body.append(slice);

        box.height(listUtils.height);
        box.width(listUtils.width);

        listUtils.groups.forEach(function (group) {
            var newGroupFlag = true;
            for (var j = 0; j < listUtils.items.length; j++) {
                var curName = listUtils.items[j][listUtils.groupBy];

                if (group === curName[0]) {
                    if (newGroupFlag) {
                        var alpha = $('<div class="groupHeader" id=' + 'header-' + group + '>' + group + '</div>');
                        var table = $('<table cellspacing="0" class="' + 'elementTable" id=' + 'elementTableFor-' + group + '></table>');
                        slice.append(alpha);
                        slice.append(table);
                        newGroupFlag = false;
                    }
                    var text = '<tr><td><span class="' + 'elementText">' + listUtils.items[j]["name"] +'<b>' + ' ' +curName + '</b> ' + '</span></td></tr>';
                    table.append(text);
                }
            }
        });
    },
    placeData: function(){

    },

    drawComponent: function () {

    }
};