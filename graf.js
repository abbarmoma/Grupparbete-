window.onload = function () {

    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        theme: "light2",
        title:{
            
        },
        data: [{        
            type: "line",
              indexLabelFontSize: 16,
            dataPoints: [
                { y: 21 },
                { y: 22},
                { y: 23, indexLabel: "\u2191 highest",markerColor: "red", markerType: "triangle" },
                { y: 19 },
                { y: 19 },
                { y: 19 },
                { y: 19 },
                { y: 19 },
                { y: 19 , indexLabel: "\u2193 lowest",markerColor: "DarkSlateGrey", markerType: "cross" },
                { y: 19 },
                { y: 19 },
                { y: 19 }
            ]
        }]
    });
    chart.render();
    
    }