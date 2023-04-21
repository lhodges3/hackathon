document.addEventListener('DOMContentLoaded', async () => {
    const body = document.querySelector('body');
    const news = new Messages();
    news.fetchData()
  });


class Messages {
    constructor() {
      this.node = document.querySelector('.newsStories')
      this.SPEED = 10000;
    //   setTimeout(this.fetchData.bind(this), this.SPEED);
    }
    
    async fetchData(){
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
          }
