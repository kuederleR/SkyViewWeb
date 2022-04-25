const amountElement = document.getElementById("amount")
// Execute a function when the user presses a key on the keyboard
document.getElementById("amount").addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("submit").click();
  }
});
const projects = new Map()
projects.set("2222", 180.00)
projects.set("1111", 260.00)
projects.set("000124", 320.00)
projects.set("0001", 0.05)
projects.set("22041601", 375.00)
var amtDue = 0
var intAmt = 0

function setPrice(){
  try{
    //const price = projects.get(input.value)
    //amtDue = price
    var id = document.getElementById("amount").value
    var price = projects.get(id);
    if(price == undefined){
      document.getElementById("due").innerHTML = "Enter valid project identification number."
    }
    else{
      document.getElementById("due").innerHTML = "Due: $" + price.toFixed(2)
      amtDue = price
    }
  }
  catch(e){
    document.getElementById("due").innerHTML = "Enter valid project identification number."
  }
}


console.log(amountElement.value)

paypal.Buttons({
    style:{
      color: 'blue'
    },
    // Sets up the transaction when a payment button is clicked
    createOrder: function(data, actions) {
      return actions.order.create({
        purchase_units: [{
          description:"Payment for invoice #" + document.getElementById("amount").value,
          invoice_id: document.getElementById("amount").value,
          amount: {
            value: amtDue // Can reference variables or functions. Example: `value: document.getElementById('...').value`
          }
          
        }]
      });
    },

    // Finalize the transaction after payer approval
    onApprove: function(data, actions) {
      return actions.order.capture().then(function(orderData) {
        // Successful capture! For dev/demo purposes:
        
        console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));
            var transaction = orderData.purchase_units[0].payments.captures[0];
            alert('Transaction '+ transaction.status + ': ' + transaction.id + '\n\nSee console for all available details');
          

        // When ready to go live, remove the alert and show a success message within this page. For example:
        // var element = document.getElementById('paypal-button-container');
        // element.innerHTML = '';
        // element.innerHTML = '<h3>Thank you for your payment!</h3>';
        // Or go to another URL:  actions.redirect('thank_you.html');
      });
    }
  }).render('#paypal');
