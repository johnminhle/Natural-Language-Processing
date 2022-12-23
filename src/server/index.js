const dotenv = require('dotenv');
dotenv.config();
var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const fetch = require('node-fetch');
const FormData = require('form-data')

const apikey = process.env.API_KEY
// const apikey = ({
//     key: process.env.API_KEY
// })

let url = [];

const app = express()

app.use(express.static('dist'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

console.log(__dirname)
console.log(`Your API key is ${apikey}`);

app.get('/', function (req, res) {
    res.sendFile(path.resolve('dist/index.html'))
    // res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

app.post('/sentiment', function(req, res){
    // console.log(req.body.formText)
    const formdata = new FormData();
    formdata.append("key", apikey);
    formdata.append("url", req.body.formText);
    formdata.append("lang", "en");  // 2-letter code, like en es fr ...

    const requestOptions = {
    method: 'POST',
    body: formdata,
    // body: JSON.stringify({
    //     key: apikey,
    //     url: req.body.formText,
    //     lang: 'en'
    // }),
    redirect: 'follow'
    };
    fetch("https://api.meaningcloud.com/sentiment-2.1", requestOptions)
    .then(apires => apires.json())
    .then(function(apidata){
        if (apidata.agreement){
        console.log(apidata)
        const agreement = apidata.agreement
        const confidence = apidata.confidence
        const irony = apidata.irony
        const subjectivity = apidata.subjectivity
        // const text = apidata.sentence_list[1].text
        const text = apidata.sentence_list.slice(0, 5).map((entry) => entry.text).join(" ");
        console.log(apidata.sentence_list)
        res.json({agreement, confidence, irony, subjectivity, text})
        // document.getElementById('results').innerHTML = `agreement: ${agreement}, confidence: ${confidence}, irony: ${irony}, subjectivity: ${subjectivity}, text: ${text}`
    }else {
        // console.log(apidata)
        const message = apidata.status.msg
        // console.log(message)
        const msg = 'Please enter a valid url'
        console.log(msg)
        res.json({msg})
    }})
    .catch(error => console.log('error', error));

})
// app.get('/key', function (req, res) {
//     res.send(apikey)
// })

// app.post('/url', async function(req, res){
//     const data = await req.body;
//     url = data;
//     console.log(url);
//     res.send(url);
// });