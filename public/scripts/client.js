$(document).ready(init);

function init() {
    $('.js-form-addInventory').on('submit', submitAddToInventory);
    $('.js-form-search').on('submit', submitSearch);

    getInventory();
}

// EVENT HANDLERS

function submitAddToInventory(event) {}

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


