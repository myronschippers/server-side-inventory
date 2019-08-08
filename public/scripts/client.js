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
    const addObject = mapFormArrayToObject(formDataArray);

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

function submitSearch(event) {
    event.preventDefault();
    console.log('SEARCH event: ', event);
    const $searchForm = $(this);
    const formDataArray = $searchForm.serializeArray();
    const searchObject = mapFormArrayToObject(formDataArray);

    $.ajax({
        type: 'POST',
        url: '/api/inventory/search',
        data: searchObject,
    })
    .then(function(response) {
        console.log('SEARCH response: ', response);
        render(response, true);
    });
}

function mapFormArrayToObject(formArray) {
    const formObject = {};

    for (let fieldData of formArray) {
        formObject[fieldData.name] = fieldData.value;
    }

    return formObject;
}

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

function render(inventoryList, isSearch) {
    const $inventoryElem = $('.js-inventory-results');

    if (isSearch && inventoryList.length === 0) {
        $inventoryElem.append(`<li>No matches have been found.</li>`);
    } else if (inventoryList.length === 0) {
        $inventoryElem.append(`<li>There is nothing in inventory</li>`);
    }

    $inventoryElem.empty()
    for (let inventoryItem of inventoryList) {
        $inventoryElem.append(`
            <li>
                <strong>${inventoryItem.name}:</strong> ${inventoryItem.description}
            </li>
        `);
    }
}


