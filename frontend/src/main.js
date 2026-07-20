import 'bootstrap/dist/css/bootstrap.min.css'; //import bootstrap styling
import DataTable from 'datatables.net-dt'; //import DataTable
import { createElement } from 'react';

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
    row.setAttribute('id', "row-" + rowId);
    rowId++;
  },
});

// store modal for multiple functions
const newRowModal = document.getElementById('newRowModal');

// [MODAL FUNCTIONS]
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
document.getElementById('closeModalBtn').addEventListener('click', () => {
  closeModal();
});

// close modal on 'Escape' being pressed
document.addEventListener('keydown', (e) => {
  if (e.keyCode == 27 && newRowModal.style.display == 'block') {
    closeModal();
    resetFormInputs();
  }
});

// [ICONS RENDERING]
// store icon and iconPreview input fields for multiple functions
const icon = document.getElementById('modalIcon');
const iconPrvw = document.getElementById('iconPreview')
const name = document.getElementById('modalName');
const desc = document.getElementById('modalDescription');
const wght = document.getElementById('modalWeight');
const prce = document.getElementById('modalPrice');

// callback function that renders uploaded image
function renderIcon(callback) {
  if (icon.files.length != 0) {
    const file = icon.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function() {
      callback(this.result); };
  } else { 
    callback(iconPrvw.src);
  }
}

// on file being uploaded display a preview of the chosen image
icon.addEventListener('change', () => {
  renderIcon((src) => { iconPrvw.src = src});
});

// [ROWS MANAGEMENT]
// accept inputs in the modal and create a row with these inputs
// then clear input fields and close modal
document.getElementById('newRowForm').addEventListener('submit', (event) => {
  event.preventDefault();
  
  renderIcon((src) => {
    table.row.add(
      addRowData(src, name.value, desc.value, wght.value, prce.value)
    ).draw();

    resetFormInputs();
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

// [HELPER FUNCTIONS]
// resets previous inputs and selected files in the form
function resetFormInputs() {
  iconPrvw.src = "src/assets/250px-PlaceholderLC.png";
  icon.value = null;
  name.value = null;
  desc.value = null;
  wght.value = null;
  prce.value = null;
} 

// single function for inserting data into the new row columns
function addRowData(imgSrc, name, desc, wght, prce) {
  return [
      `<img class="item-icon" src="${imgSrc}">`,
      `${htmlToText(name)}`,
      `${htmlToText(desc)}`,
      `${htmlToText(wght)}`,
      `${htmlToText(prce)}`
    ];
}

// converts HTML code to text inserting it into div element
function htmlToText(str) {
  const el = document.createElement('div');
  el.textContent = str;
  return el.innerHTML;
}

fetch('http://127.0.0.1:5000/api/home')
.then(res => res.json())
.then((data) => {
  if (!Array.isArray(data)) {
    table.row.add(addRowData(data.icon, data.name, data.desc, data.wght, data.prce));
  } else {
    for(const obj of data) {
      table.row.add(addRowData(obj.icon, obj.name, obj.desc, obj.wght, obj.prce));
    }
  }
  table.draw();
});


// TODO: 
// rescale the image before storing it,
// delete confirmation,
// inputs validation (weight in kgs/lbs (for multiple(e.g. 5) items: 1kg (5kg)), price in pc/gc/sc/cc), 
// try-catch methods should display the error to the user, not the console,
// table data transfer to csv using python(and other way around), 
// uploading and downloading csv data to/from the database, 
// registration and log-in/out functions with personal inventories,
// styling

// ISSUE:
// if an item is being added for example 3rd in order it gets id = row-2, if row-1 is being deleted, 
// on the next data fetch row-2 data gets row-1 id even tho api data still states it is row-2