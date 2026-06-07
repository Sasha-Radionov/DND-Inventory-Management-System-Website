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

// store modal for multiple functions
const newRowModal = document.getElementById('newRowModal');

// create new row funct
// opens modal with input fields for user to input data
document.getElementById('newRowBtn').addEventListener('click', () => {
  newRowModal.style.display = 'block';
});

// accept inputs in the modal and create a row with these inputs
// clear input fields and clos modal
document.getElementById('acceptInputsBtn').addEventListener('click', () => {
  const icon = document.getElementById('modalIcon');
  const name = document.getElementById('modalName');
  const desc = document.getElementById('modalDescription');
  const wght = document.getElementById('modalWeight');
  const prce = document.getElementById('modalPrice');

  table.row.add([
    `${icon.value}`,
    `${name.value}`,
    `${desc.value}`,
    `${wght.value}`,
    `${prce.value}`,
  ]).draw();

  icon.value = null;
  name.value = null;
  desc.value = null;
  wght.value = null;
  prce.value = null;

  newRowModal.style.display = 'none'
});

//close modal funct
document.getElementById('closeModalBtn').addEventListener('click', function CloseModal() {
  newRowModal.style.display = 'none';
});

// delete a row from a table
// later a database data removal will be added
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