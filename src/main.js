import 'bootstrap/dist/css/bootstrap.min.css'; //import bootstrap styling
import DataTable from 'datatables.net-dt'; //import DataTable

let rowId = 0;

// finds a table on the page with the matching selector
// when a row is added, creates a default column (6th) with a delete button
let table = new DataTable('#inventoryTable', {
  sorting: false,
  columns: [
    null, 
    null, 
    null, 
    null,
    null,
    {
      data: null,
      defaultContent: '<button class="p-2 btn btn-danger btn-sm delete-item" title="Delete Item">Delete</button>',
    },
  ],
  createdRow: function (row) {
    row.setAttribute('id', rowId);
    rowId++;
  },
});

document.getElementById('newRowBtn').addEventListener('click', () => {
  table.row.add([
    `<input type="text">`,
    `<input type="text">`,
    `<input type="text">`,
    `<input type="text">`,
    `<input type="text">`,
  ]).draw();
});

document.getElementById('inventoryTable').addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-item')) {
    const row = e.target.closest('tr');

    try {
      table.row(row).remove().draw();
    } catch {
      console.error('Failed to delete item. Please try again later.');
    }
  }
});

// add test row into the table
document.getElementById('testRow').addEventListener('click', () => {
  table.row.add([
    1,
    2,
    3,
    4,
    5,
  ]);
  table.draw();
});