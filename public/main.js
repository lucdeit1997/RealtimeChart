const form = $('#vote-form');
form.on('submit', (e) =>{
   
    const choice = $("input[name=os]:checked").val();
    const data = { os: choice }
    fetch('poll', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: ({
            'Content-Type': 'application/json'
        })
    })
        .then(res => res.json())
        .then(function (data) { console.log(data) })
        .catch(function (err) { console.log(err) })
    e.preventDefault();
    // Optionally the request above could also be done as

    function1();
})

const function1 = () => {
    axios.get('/poll')
    .then(data => {
        const votes = data.data.votes;
        const totalVotes = votes.length;
        const voteCounts = votes.reduce( (acc, vote) => {
            const AAA =  acc[vote.os] || 0;
            const BBB = parseInt(vote.points);
            acc[vote.os] = AAA + BBB;
            return acc;            
        }, {});
    
    
        let dataPoints = [
            { label: 'Windows', y: voteCounts.Windows },
            { label: 'MacOS', y: voteCounts.MacOS },
            { label: 'Linux', y: voteCounts.Linux },
            { label: 'Orther', y: voteCounts.Orther },
        ]
        const chartContainer = document.querySelector('#chartContainer');
        if (chartContainer) {
            const chart = new CanvasJS.Chart("chartContainer", {
                animationEnabled: true,
                theme: 'theme1',
                title: {
                    text: 'OS Result'
                },
                data: [
                    {
                        type: "column",
                        dataPoints: dataPoints
                    }
                ]
            });
    
            chart.render();
            // Enable pusher logging - don't include this in production
            Pusher.logToConsole = true;
    
            var pusher = new Pusher('f67f697d0ed6495d89de', {
                cluster: 'ap1',
                encrypted: true
            });
    
            var channel = pusher.subscribe('os-poll');
            channel.bind('os-vote', function (data) {
                // alert(JSON.stringify(data));
                dataPoints = dataPoints.map(x => {
                    if (x.label == data.os) {
                        x.y += data.points;
                        return x;
                    }
                    else {
                        return x;
                    }
                });
                chart.render();
            });
        }
    });
}

function1();