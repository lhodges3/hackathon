async function fetchData(){

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'b59b05111emsh072b9d3685b2611p1deed7jsnfbf2bf3d7ddd',
            'X-RapidAPI-Host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
        }
    };
    
    

    const res = await fetch('https://apidojo-yahoo-finance-v1.p.rapidapi.com/auto-complete?q=tesla&region=US', options)
    const record = await res.json()

    console.log('record', record)

}
fetchData()