export const formatAddress = (address) => {
    if (address[0] === null || address[0] === '') {
        return '';
    }

    address.filter(lineItem => lineItem);

    return address.join(', ');
}

export const objectToArray = (object) => {
    return Object.entries(object).map(([k, v]) => ({ [k] : v }));
}

export const formatTinyInt = (object) => {
    Object.keys(object).map((key, index) => { 
        if (object[key] === 1)
            object[key] = "Yes";
        else if (object[key] === 0)
            object[key] = "No";
    });

    return object;
}

export const floatToCurrency = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
});