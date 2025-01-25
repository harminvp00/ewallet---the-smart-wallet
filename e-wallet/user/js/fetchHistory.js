


try {
    function fetchTransactions() {
        console.log('start');

        let image = document.getElementById('Image');
        let heading = document.getElementById('data');

        let Transactions = localStorage.getItem('transaction-2');
        let Transactions_details = []
        Transactions_details = Transactions.split('.');

        let [date, , amount, spendArea, reason] = [...Transactions_details];
        
         
        image.setAttribute('src', `../../icons/${spendArea}.png`);
        heading.innerHTML = `<b style="font-size: 25px;"> ${amount} rs Used into ${spendArea} </b> <br> Used on ${date} for ${reason}.`;
        console.log('end');
    }
    
} catch (err) {
    console.log(err.message)
}
