
console.log('open')

let LastTransaction = document.getElementById('showLastTrasaction');
LastTransaction.removeAttribute('hidden');

let trsn_from_ls;
let trsn_array = [];

for (let i = 1; i < localStorage.length; i++){
    // trsn_from_ls = transaction from localStorage 
    trsn_from_ls = localStorage.getItem(`transaction-${i}`);
    trsn_array.push(trsn_from_ls);
}

let sorted_trsn_array = trsn_array.sort();

console.log(sorted_trsn_array[sorted_trsn_array.length - 1])

let [, spendtype, amount, catogory, exact_reason] = sorted_trsn_array[sorted_trsn_array.length - 1].split(',');

if (spendtype == 'earn') {
    document.getElementById('usedAmount').style.color = 'green';
    document.getElementById('usedAmount').innerText = `+${amount}`;
    
} else {
    document.getElementById('usedAmount').style.color = 'red';
    document.getElementById('usedAmount').innerText = `-${amount}`;
}

document.getElementById('usedIn').innerText = `${catogory}`;
document.getElementById('usedWhy').innerText = `${exact_reason}`;



console.log('close')