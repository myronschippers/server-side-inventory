$(document).ready(init);

function init() {
    $('.js-form-addInventory').on('submit', submitAddToInventory);
    $('.js-form-search').on('submit', submitSearch);

    getInventory();
}

// EVENT HANDLERS

function submitAddToInventory(event) {
    event.preventDefault();
    const $addForm = $(this);
    const formDataArray = $addForm.serializeArray();
    const addObject = {};

    for (let fieldData of formDataArray) {
        addObject[fieldData.name] = fieldData.value;
    }

    $addForm.children().each(function() {
        $(this).val('');
    });

    $.ajax({
        type: 'POST',
        url: '/api/inventory',
        data: addObject,
    })
    .then(function(response) {
        getInventory();
    });
}

function submitSearch(event) {}

// API / AJAX CALLS

function getInventory() {
    $.ajax({
        type: 'GET',
        url: '/api/inventory',
    })
    .then(function(response) {
        console.log('GET response: ', response);
        render(response);
    });
}

// RENDER TO DOM

function render(inventoryList) {
    const $inventoryElem = $('.js-inventory-results');

    $inventoryElem.empty()
    for (let inventoryItem of inventoryList) {
        $inventoryElem.append(`
            <li>
                <strong>${inventoryItem.name}:</strong> ${inventoryItem.description}
            </li>
        `);
    }
}


