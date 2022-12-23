function checkForName(inputText) {
    console.log("::: Running checkForName :::", inputText);
    let regex = /^(https:\/\/www\.|http:\/\/www\.|https:\/\/|)[a-zA-Z0-9\-_$]+\.[a-zA-Z]{2,5}(\/[a-zA-Z0-9\-_$]*)*(\?[a-zA-Z0-9\-_$&=]*){0,1}$/gm

    if(regex.test(inputText)) {
        alert("Success!")
    }else{
        alert("Error!")
    }
}

export { checkForName }