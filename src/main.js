import 'bootstrap/dist/css/bootstrap.min.css'; //import bootstrap styling
import DataTable from 'datatables.net-dt'; //import DataTable

let rowId = 0;

// finds a table on the page with the matching selector
// when a row is added, creates a default column (6th) with a delete button
const table = new DataTable('#inventoryTable', {
  sorting: false,
  columns: [
    null,
    null, 
    null, 
    null,
    null,
    {
      data: null,
      defaultContent: '<button class="p-2 btn btn-danger btn-sm delete-item" title="delete-item">Delete</button>',
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

// close modal funct
function closeModal() { 
  newRowModal.style.display = 'none';
}

// close modal on 'X' being pressed
document.getElementById('closeModalBtn').addEventListener('click', () => closeModal());

// store icon and iconPreview input fields for multiple functions
const icon = document.getElementById('modalIcon');
const iconPrvw = document.getElementById('iconPreview')

// callback function that renders uploaded image
function renderIcon(callback) {
  const file = icon.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onload = function() {
    callback(this.result);
  }
}

// on file being uploaded display a preview of the chosen image
icon.addEventListener('change', () => {
  renderIcon((src) => { iconPrvw.src = src});
});

// accept inputs in the modal and create a row with these inputs
// then clear input fields and close modal
document.getElementById('acceptInputsBtn').addEventListener('click', () => {
  const name = document.getElementById('modalName');
  const desc = document.getElementById('modalDescription');
  const wght = document.getElementById('modalWeight');
  const prce = document.getElementById('modalPrice');
  
  renderIcon((src) => {
    table.row.add([
      `<img class="item-icon" src="${src}">`,
      `${name.value}`,
      `${desc.value}`,
      `${wght.value}`,
      `${prce.value}`,
    ]).draw();

    iconPrvw.src = "";
    icon.value = null;
    name.value = null;
    desc.value = null;
    wght.value = null;
    prce.value = null;

    closeModal();
  });
});

// delete a row from a table
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


// TODO: 
// inputs validation, 
// try-catch methods should display the error to th user, not the console,
// display uploaded icons in the table, 
// table data transfer to csv using python(and other way around), 
// uploading and downloading csv data to/from the database, 
// registration and log-in/out functions with personal inventories,
// styling
