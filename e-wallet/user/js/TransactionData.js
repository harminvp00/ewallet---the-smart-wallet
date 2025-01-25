


let TOTAL_AMOUNT;
let transaction = "";
let warning = document.getElementsByClassName('customWarning');
let uiTotalAmount = document.getElementById('totalAmount');
// let navabarLeftCorner = document.getElementsByClassName('navbar-top-left-corner')[0];

// to init total everytime
function initTotal(new_Total) {
    localStorage.setItem('TotalAmount', new_Total);
    uiTotalAmount.innerText = `₹ ${localStorage.getItem('TotalAmount')}.00`;
}

function spendType() {
    return document.getElementById('spendType').value;
}

function getTransactionData() {

    if (spendType() === 'default') {
        warning[0].removeAttribute('hidden');
        return;
    }
    if (document.getElementById('amountInput').value <= 0) {
        warning[1].removeAttribute('hidden');
        return;
    }
    if (document.getElementById('spendCatagory').value === 'default') {
        warning[2].removeAttribute('hidden');
        return;
    }
    if (document.getElementById('SpendReason').value === "") {
        warning[3].removeAttribute('hidden');
    }

    // console.log(document.getElementById('transaction-date').value);
    transaction = `${document.getElementById('transaction-date').value},${spendType()},${document.getElementById('amountInput').value},${document.getElementById('spendCatagory').value},${document.getElementById('SpendReason').value}`;

    // console.log(transaction.contain('eating'));

    let isFirst = localStorage.getItem('transaction-1');
    if (isFirst == null) {
        localStorage.setItem(`transaction-1`, transaction)
    } else {
        let len = localStorage.length;
        localStorage.setItem(`transaction-${len}`, transaction)
    }
}

function cleanWarning() {
    /* this function is doing simple thing which is it set 'hidden' attribute into all warning which are not hidden at the time. these warning are specially create for aware user about data inputing warning on webpage.  */
    for (let i = 0; i < warning.length; i++) {
        warning[i].setAttribute('hidden', true);
    }
}

function initTable(amountColor) {
    // init amount first : if amountColor is red that means user transaction is about the spending money and else all transactions are for earning and non-spending, also seen as green color in table.
    (amountColor === 'red') ? document.getElementById('usedAmount').innerText = `-${document.getElementById('amountInput').value}` : document.getElementById('usedAmount').innerText = `+${document.getElementById('amountInput').value}`;

    // change color of amount into table for example if user transaction is about spending its red else green on earning 
    document.getElementById('usedAmount').style.color = amountColor;

    // init table row with input element spendCatagory direct using its input id
    document.getElementById('usedIn').innerText = `${document.getElementById('spendCatagory').value}`;

    // init table row with input element spendReason direct using its input id
    document.getElementById('usedWhy').innerText = `${document.getElementById('SpendReason').value}`;
}


try {
    let isNull = localStorage.key('TotalAmount');
    if (isNull == null) {
        UpdateTotalAmount();
    }

    document.getElementById('saveBtn').addEventListener('click', (e) => {
        /*  :: This is Event Listener on form > save btn.
            -> one of the biggest reponsible function because all small-function are connects with this one.
            -> e.preventDefault : for ensure that no default actions are perform during event listening.
            -> spend type checking condtions is for checking that user want to add money to tatal or he want to cut from total.
            -> contains error handing to ensure program flow can't be break during run state. */
        e.preventDefault();
        cleanWarning();
        getTransactionData();
        if (spendType() === 'spend') {
            initTable('red');
            localStorage.setItem('TotalAmount', `${Number.parseInt(localStorage.getItem('TotalAmount')) - document.getElementById('amountInput').value} `)
            TOTAL_AMOUNT = `BALANCE = ₹${localStorage.getItem('TotalAmount')}`
            uiTotalAmount.innerText = TOTAL_AMOUNT;
        } else {
            initTable('green');
        }
    });
}
catch (error) {
    // All event listener error are handle here 
    console.warn('warning : ' + error.message)
}
