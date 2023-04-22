document.addEventListener('DOMContentLoaded', async () => {
    const body = document.querySelector('body');
    const teslaNews = new MessagesOne();
    teslaNews.fetchTeslaDataOne()
    teslaNews.fetchTeslaDataTwo()
    const appleNews = new MessagesTwo();
    appleNews.fetchAppleDataOne()
    appleNews.fetchAppleDataTwo()
    const microsoftNews= new MessagesThree();
    microsoftNews.fetchMicrosoftDataOne()
    microsoftNews.fetchMicrosoftDataTwo()
  });

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  });
}


class MessagesOne {
    constructor() {
      this.node = document.querySelector('.newsStoriesOne')
      this.SPEED = 10000;
    //   setTimeout(this.fetchData.bind(this), this.SPEED);
    }
    
    async fetchTeslaDataOne(){
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'b59b05111emsh072b9d3685b2611p1deed7jsnfbf2bf3d7ddd',
                'X-RapidAPI-Host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
            }
        };
        fetch('https://apidojo-yahoo-finance-v1.p.rapidapi.com/auto-complete?q=tesla&region=US', options)
            .then(response => response.json())
            .then(response => {
                const ticker = document.querySelector('.tickerOne')
                ticker.innerText = response.quotes[0].symbol


                response.news.forEach(article =>{
                    const newsArticle = document.createElement('div');
                    newsArticle.setAttribute('class', 'newsArticle');
                    // append to message
                    
                    const text = document.createElement('a');
                    const link = article.link
                    text.setAttribute('href',link);
                    text.innerHTML = `${article.title}`


                    const publisher = document.createElement('div');
                    publisher.setAttribute('class', 'publisher');

                    publisher.innerText = article.publisher

                    newsArticle.appendChild(publisher);
                    newsArticle.appendChild(text);
                    this.node.appendChild(newsArticle);
                })
            })
            .catch(err => console.error(err));
            // setTimeout(this.fetchData.bind(this), this.SPEED);
    }
    async fetchTeslaDataTwo(){
        var url = 'https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=TSLA&apikey=S3NUXHCE6KZIP0HC';
        let xyValues = []
        let lowest = Infinity
        let highest = 0
        let length

        const options = {
            url: url,
            json: true,
            method: 'GET',
            headers: {'User-Agent': 'request'}
        };
        await fetch(url, options)
            .then(response => response.json())
            .then(response => {
                const startValue = response['Weekly Time Series'][Object.keys(response['Weekly Time Series'])[0]]['1. open']
                const endValue = response['Weekly Time Series'][Object.keys(response['Weekly Time Series'])[0]]['4. close']
                const percentChange = Math.round((((endValue - startValue)/(Math.abs(startValue)))*100)*10)/10

                const price = document.querySelector('.priceOne')
                price.innerText = 'Weekly Open Price: $' + startValue 
                const percentChangeHTMl = document.querySelector('.percentChangeOne')
                percentChangeHTMl.innerText = 'Percent Change: ' + percentChange + " %"
                length = Object.keys(response['Weekly Time Series']).length
                let count = 0
                Object.keys(response['Weekly Time Series']).forEach(week => {
                    let curr = {}
                    curr['x'] = count
                    curr['y'] = Number(response['Weekly Time Series'][week]['1. open'])
                    xyValues.push(curr)
                    if (Number(response['Weekly Time Series'][week]['1. open']) < lowest){
                        lowest = Number(response['Weekly Time Series'][week]['1. open'])
                    }
                    if (Number(response['Weekly Time Series'][week]['1. open']) > highest){
                        highest = Number(response['Weekly Time Series'][week]['1. open'])
                    }
                    count ++
                 })
            }
            )
            .catch(err => console.error(err));


            new Chart("teslaChart", {
            type: "scatter",
            data: {
                datasets: [{
                pointRadius: 1,
                pointBackgroundColor: "rgb(0,0,255)",
                data: xyValues
                }]
            },
            options: {
                legend: {display: false},
                scales: {
                xAxes: [{ticks: {min: 0, max: length}}],
                yAxes: [{ticks: {min: lowest, max: highest}}],
                }
            }
            });
            console.log(xyValues)
    }

}

class MessagesTwo {
    constructor() {
      this.node = document.querySelector('.newsStoriesTwo')
      this.SPEED = 10000;
    //   setTimeout(this.fetchData.bind(this), this.SPEED);
    }
    async fetchAppleDataOne(){
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'b59b05111emsh072b9d3685b2611p1deed7jsnfbf2bf3d7ddd',
                'X-RapidAPI-Host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
            }
        };
        fetch('https://apidojo-yahoo-finance-v1.p.rapidapi.com/auto-complete?q=apple&region=US', options)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                const ticker =document.querySelector('.tickerTwo')
                ticker.innerText = response.quotes[0].symbol
                response.news.forEach(article =>{
                    const newsArticle = document.createElement('div');
                    newsArticle.setAttribute('class', 'newsArticle');
                    // append to message
                    
                    const text = document.createElement('a');
                    const link = article.link
                    text.setAttribute('href',link);
                    text.innerHTML = `${article.title}`


                    const publisher = document.createElement('div');
                    publisher.setAttribute('class', 'publisher');

                    publisher.innerText = article.publisher

                    newsArticle.appendChild(publisher);
                    newsArticle.appendChild(text);
                    this.node.appendChild(newsArticle);
                })
            })
            .catch(err => console.error(err));
            // setTimeout(this.fetchData.bind(this), this.SPEED);
    }
    async fetchAppleDataTwo(){
        var url = 'https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=AAPL&apikey=S3NUXHCE6KZIP0HC';
        let xyValues = []
        let lowest = Infinity
        let highest = 0
        let length

        const options = {
            url: url,
            json: true,
            method: 'GET',
            headers: {'User-Agent': 'request'}
        };
        await fetch(url, options)
            .then(response => response.json())
            .then(response => {
                const startValue = response['Weekly Time Series'][Object.keys(response['Weekly Time Series'])[0]]['1. open']
                const endValue = response['Weekly Time Series'][Object.keys(response['Weekly Time Series'])[0]]['4. close']
                const percentChange = Math.round((((endValue - startValue)/(Math.abs(startValue)))*100)*10)/10

                const price = document.querySelector('.priceTwo')
                price.innerText = 'Weekly Open Price: $' + startValue 
                const percentChangeHTMl = document.querySelector('.percentChangeTwo')
                percentChangeHTMl.innerText = 'Percent Change: ' + percentChange + " %"
                length = Object.keys(response['Weekly Time Series']).length
                let count = 0
                Object.keys(response['Weekly Time Series']).forEach(week => {
                    let curr = {}
                    curr['x'] = count
                    curr['y'] = Number(response['Weekly Time Series'][week]['1. open'])
                    xyValues.push(curr)
                    if (Number(response['Weekly Time Series'][week]['1. open']) < lowest){
                        lowest = Number(response['Weekly Time Series'][week]['1. open'])
                    }
                    if (Number(response['Weekly Time Series'][week]['1. open']) > highest){
                        highest = Number(response['Weekly Time Series'][week]['1. open'])
                    }
                    count ++
                 })
            }
            )
            .catch(err => console.error(err));


            new Chart("appleChart", {
            type: "scatter",
            data: {
                datasets: [{
                pointRadius: 1,
                pointBackgroundColor: "rgb(0,0,255)",
                data: xyValues
                }]
            },
            options: {
                legend: {display: false},
                scales: {
                xAxes: [{ticks: {min: 0, max: length}}],
                yAxes: [{ticks: {min: lowest, max: highest}}],
                }
            }
            });
            console.log(xyValues)
    }    
}

class MessagesThree {
    constructor() {
      this.node = document.querySelector('.newsStoriesThree')
      this.SPEED = 10000;
    //   setTimeout(this.fetchData.bind(this), this.SPEED);
    }

    async fetchMicrosoftDataOne(){
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'b59b05111emsh072b9d3685b2611p1deed7jsnfbf2bf3d7ddd',
                'X-RapidAPI-Host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
            }
        };
        fetch('https://apidojo-yahoo-finance-v1.p.rapidapi.com/auto-complete?q=microsoft&region=US', options)
            .then(response => response.json())
            .then(response => {
                const ticker =document.querySelector('.tickerThree')
                ticker.innerText = response.quotes[0].symbol
                console.log(response)
                response.news.forEach(article =>{
                    const newsArticle = document.createElement('div');
                    newsArticle.setAttribute('class', 'newsArticle');
                    // append to message
                    
                    const text = document.createElement('a');
                    const link = article.link
                    text.setAttribute('href',link);
                    text.innerHTML = `${article.title}`


                    const publisher = document.createElement('div');
                    publisher.setAttribute('class', 'publisher');

                    publisher.innerText = article.publisher

                    newsArticle.appendChild(publisher);
                    newsArticle.appendChild(text);
                    this.node.appendChild(newsArticle);
                })
            })
            .catch(err => console.error(err));
            // setTimeout(this.fetchData.bind(this), this.SPEED);
    }
    async fetchMicrosoftDataTwo(){
        var url = 'https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=MSFT&apikey=S3NUXHCE6KZIP0HC';
        let xyValues = []
        let lowest = Infinity
        let highest = 0
        let length

        const options = {
            url: url,
            json: true,
            method: 'GET',
            headers: {'User-Agent': 'request'}
        };
        await fetch(url, options)
            .then(response => response.json())
            .then(response => {
                const startValue = response['Weekly Time Series'][Object.keys(response['Weekly Time Series'])[0]]['1. open']
                const endValue = response['Weekly Time Series'][Object.keys(response['Weekly Time Series'])[0]]['4. close']
                const percentChange = Math.round((((endValue - startValue)/(Math.abs(startValue)))*100)*10)/10

                const price = document.querySelector('.priceThree')
                price.innerText = 'Weekly Open Price: $' + startValue 
                const percentChangeHTMl = document.querySelector('.percentChangeThree')
                percentChangeHTMl.innerText = 'Percent Change: ' + percentChange + " %"
                length = Object.keys(response['Weekly Time Series']).length
                let count = 0
                Object.keys(response['Weekly Time Series']).forEach(week => {
                    let curr = {}
                    curr['x'] = count
                    curr['y'] = Number(response['Weekly Time Series'][week]['1. open'])
                    xyValues.push(curr)
                    if (Number(response['Weekly Time Series'][week]['1. open']) < lowest){
                        lowest = Number(response['Weekly Time Series'][week]['1. open'])
                    }
                    if (Number(response['Weekly Time Series'][week]['1. open']) > highest){
                        highest = Number(response['Weekly Time Series'][week]['1. open'])
                    }
                    count ++
                 })
            }
            )
            .catch(err => console.error(err));


            new Chart("msftChart", {
            type: "scatter",
            data: {
                datasets: [{
                pointRadius: 1,
                pointBackgroundColor: "rgb(0,0,255)",
                data: xyValues
                }]
            },
            options: {
                legend: {display: false},
                scales: {
                xAxes: [{ticks: {min: 0, max: length}}],
                yAxes: [{ticks: {min: lowest, max: highest}}],
                }
            }
            });
            console.log(xyValues)
    }           
}