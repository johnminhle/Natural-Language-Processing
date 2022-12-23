import * as Client from "./nameChecker.js"


function handleSubmit(event) {
    event.preventDefault()
    // check what text was put into the form field
    let formText = document.getElementById('name').value
    Client.checkForName(formText)
  
    fetch('http://localhost:8081/sentiment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            formText
        })
    })
        .then(res => res.json())
        .then(function(res){
            if(res.agreement){
                const agreement = res.agreement
                const confidence = res.confidence
                const irony = res.irony
                const subjectivity = res.subjectivity
                const text = res.text
                document.getElementById('results').innerHTML = `agreement: ${agreement}, confidence: ${confidence}, irony: ${irony}, subjectivity: ${subjectivity}, text: ${text}`
            }else{
                const message = res.msg
                document.getElementById('results').innerHTML = `${message}`
            }
        })
        // .then( ({agreement, confidence, irony, subjectivity, text}) => {
        //     document.getElementById('results').innerHTML = `agreement: ${agreement}, confidence: ${confidence}, irony: ${irony}, subjectivity: ${subjectivity}, text: ${text}`
        //     // document.getElementById('results').innerHTML = `${msg}`
        // })
        // .then( ({msg}) => {
        //     document.getElementById('results').innerHTML = `${msg}`
        // })
    
}

export { handleSubmit }
