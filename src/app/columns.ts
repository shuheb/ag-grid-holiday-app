export const columnDefinition = [
  { headerName: 'ACTIONS', cellRenderer: 'actionRenderer' },
  {
    headerName: 'STATUS',
    field: 'status',
    sort: 'asc',
    cellClassRules: {
      'status-completed': function (params) {
        if (!params.node.footer) {
          return params.data.status == 'COMPLETED';
        }
      },
      'status-pending': function (params) {
        if (!params.node.footer) {
          return params.data.status == 'PENDING';
        }
      },
      'status-approved': function (params) {
        if (!params.node.footer) {
          return params.data.status == 'APPROVED';
        }
      },
    },
    comparator: function (valueA, valueB, nodeA, nodeB, isInverted) {
      let a;
      let b;
      if (valueA == 'COMPLETED') a = 3;
      if (valueA == 'APPROVED') a = 2;
      if (valueA == 'PENDING') a = 1;

      if (valueB == 'COMPLETED') b = 3;
      if (valueB == 'APPROVED') b = 2;
      if (valueB == 'PENDING') b = 1;

      return b - a;
    },
  },
  {
    headerName: 'FROM',
    field: 'from',
    editable: true,

    cellEditor: 'primeCellEditor',
    filter: 'agDateColumnFilter',
    filterParams: {
      comparator: myDateComparator,
    },
  },
  {
    headerName: 'TO',
    field: 'to',

    editable: true,
    cellEditor: 'primeCellEditor',
    filter: 'agDateColumnFilter',
    filterParams: {
      comparator: myDateComparator,
    },
    valueFormatter: (params) => (params.value ? params.value : 'Total'),
  },
  {
    headerName: 'PENDING',
    field: 'totalPending',
    aggFunc: 'sum',
    valueGetter: totalPendingValueGetter,
  },
  {
    headerName: 'APPROVED',
    field: 'totalApproved',
    aggFunc: 'sum',
    valueGetter: totalApprovedValueGetter,
  },
  {
    headerName: 'COMPLETED',
    field: 'totalCompleted',
    aggFunc: 'sum',
    valueGetter: totalCompletedValueGetter,
  },
  {
    headerName: 'TOTAL',
    field: 'total',
    aggFunc: 'sum',

    valueGetter: (params) =>
      !params.node.footer
        ? params.getValue('totalPending') +
          params.getValue('totalApproved') +
          params.getValue('totalCompleted')
        : false,
  },
];

function convertStringToDate(cellValue) {
  var dateAsString = cellValue;
  var dateParts = dateAsString.split('/');
  var year = Number(dateParts[2]);
  var month = Number(dateParts[1]) - 1;
  var day = Number(dateParts[0]);
  var cellDate = new Date(year, month, day);
  return cellDate;
}

function myDateComparator(filterLocalDateAtMidnight, cellValue) {
  var dateAsString = cellValue;

  if (dateAsString == null) {
    return 0;
  }

  var dateParts = dateAsString.split('/');
  var year = Number(dateParts[2]);
  var month = Number(dateParts[1]) - 1;
  var day = Number(dateParts[0]);
  var cellDate = new Date(year, month, day);

  if (cellDate < filterLocalDateAtMidnight) {
    return -1;
  } else if (cellDate > filterLocalDateAtMidnight) {
    return 1;
  } else {
    return 0;
  }
}

function totalApprovedValueGetter(params) {
  if (!params.node.footer) {
    if (params.data.from && params.data.to) {
      if (params.data.status === 'APPROVED') {
        let date1 = convertStringToDate(params.data.from);

        let date2 = convertStringToDate(params.data.to);

        var timeDifference = date2.getTime() - date1.getTime();

        var dayDifference = Math.round(timeDifference / (1000 * 3600 * 24));

        if (dayDifference < 0) {
          dayDifference = 0;
        }

        return dayDifference;
      } else {
        return 0;
      }
    }
  }
}

function totalPendingValueGetter(params) {
  if (!params.node.footer) {
    if (params.data.from && params.data.to) {
      if (params.data.status === 'PENDING') {
        let date1 = convertStringToDate(params.data.from);

        let date2 = convertStringToDate(params.data.to);

        var timeDifference = date2.getTime() - date1.getTime();

        var dayDifference = Math.round(timeDifference / (1000 * 3600 * 24));

        if (dayDifference < 0) {
          dayDifference = 0;
        }

        return dayDifference;
      } else {
        return 0;
      }
    }
  }
}

function totalCompletedValueGetter(params) {
  if (!params.node.footer) {
    if (params.data.from && params.data.to) {
      if (params.data.status === 'COMPLETED') {
        let date1 = convertStringToDate(params.data.from);

        let date2 = convertStringToDate(params.data.to);

        var timeDifference = date2.getTime() - date1.getTime();

        var dayDifference = Math.round(timeDifference / (1000 * 3600 * 24));

        if (dayDifference < 0) {
          dayDifference = 0;
        }

        return dayDifference;
      } else {
        return 0;
      }
    }
  }
}
