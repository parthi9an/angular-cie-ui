function DataTable(params) {

    var that = this;
    var _callback = null;

    this.onColumnCreate = function(callback) {
        if (callback) {
            _callback = callback;
        } else {
            return _callback;
        }
    }
    
    this.showLoading = function(){
    	
    }

    this.load = function(data) {

        var colNames = params.colNames;

        var len = data.length;
        var table = $('#' + params.target);
        table.html('');
        var rowData = null;
        var tr = '';

        var thead = $('<thead>');
        if (len > 0) {
            rowData = data[0];
            tr = '<tr>';
            colNames.forEach(function(col) {
                if (col != 'id') {
                    tr += '<th>'
                            + col.replace(/([a-z\d])([A-Z])/g, '$1 $2')
                                    .toUpperCase() + '</th>'
                }
            });
            tr += '</tr>';
            thead.append(tr);
        }
        table.append(thead);
        var tbody = $('<tbody>');

        for (var i = 0; i < len; i++) {
            tr = '<tr>';
            rowData = data[i];
            colNames.forEach(function(col) {
                if (col != 'id') {
                    tr += '<td>';
                    if (that.onColumnCreate() != null) {
                        tr += that.onColumnCreate().call(that, rowData,
                                rowData[col], col);
                    } else {
                        tr += rowData[col];
                    }
                    tr += '</td>'
                }
            });
            tr += '</tr>';
            tbody.append(tr);
        }
        table.append(tbody);
    }
}