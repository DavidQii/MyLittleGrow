document.addEventListener('DOMContentLoaded', function () {

plotUpdate('https://raw.githubusercontent.com/DavidQii/MyLittleGrow/main/lhfa_boys_0-to-2-years_zscores.json')
}
);

// Update the selectors to point to the new dropdowns.
const genderSelect = document.getElementById('gender-select');
const ageGroupSelect = document.getElementById('age-group-select');
const metricSelect = document.getElementById('metric-select');

genderSelect.addEventListener('change', function() {
    plotUpdate(checkSelection());
});
ageGroupSelect.addEventListener('change', function() {
    plotUpdate(checkSelection());
});
metricSelect.addEventListener('change', function() {
    plotUpdate(checkSelection());
});


// Data transformation function for multiple keys
        function transformData(jsonData) {
            let labels = jsonData.map(item => item.Month);
            let datasets = [];

            // Assuming the structure of jsonData is consistent with the first item
            let excludedKeys = ['Month', 'S', 'L', 'SD'];
    	    let keys = Object.keys(jsonData[0]).filter(key => !excludedKeys.includes(key));


            keys.forEach(key => {
                datasets.push({
                    label: key,
                    data: jsonData.map(item => item[key]),
                    fill: false,
                    // Add more colors as needed
                    borderColor: getRandomColor(),
                });
            });

            return { labels, datasets };
        }

 function getRandomColor() {
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) {
              color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }

// Check selection class

function checkSelection() {
// Get the selected values
    const gender = genderSelect.value;
    const metric = metricSelect.value;
    const ageGroup = ageGroupSelect.value;

    // Concatenate the selections into a single string to simplify the switch cases
    const selectionKey = `${gender}-${metric}-${ageGroup}`;
let fetchedLink = "" 

switch (selectionKey) {
        case "0-0-0": // Boy, Height, Up to 2 years
            fetchedLink = "https://raw.githubusercontent.com/DavidQii/MyLittleGrow/main/lhfa_boys_0-to-2-years_zscores.json";
            break;
        case "0-0-1": // Boy, Height, 2 to 5 years
            fetchedLink = "https://raw.githubusercontent.com/DavidQii/MyLittleGrow/main/lhfa_boys_2-to-5-years_zscores%202.json";
            break;
        case "0-1-0": // Boy, Weight, Up to 2 years
            fetchedLink = "https://raw.githubusercontent.com/DavidQii/MyLittleGrow/main/wfa_boys_0-to-2-years_zscores.json";
            break;
        case "0-1-1": // Boy, Weight, 2 to 5 years
            fetchedLink = "https://raw.githubusercontent.com/DavidQii/MyLittleGrow/main/wfa_boys_2-to-5-years_zscores%20copy.json";
            break;
        
        case "1-0-0": // Girl, Height, Up to 2 years
            fetchedLink = "https://raw.githubusercontent.com/DavidQii/MyLittleGrow/main/lhfa_girls_0-to-2-years_zscores.json";
            break;
        case "1-0-1": // Girl, Height, 2 to 5 years
            fetchedLink = "https://raw.githubusercontent.com/DavidQii/MyLittleGrow/main/lhfa_girls_2-to-5-years_zscores.json";
            break;
        case "1-1-0": // Girl, Weight, Up to 2 years
            fetchedLink = "https://raw.githubusercontent.com/DavidQii/MyLittleGrow/main/wfa_girls_0-to-2-years_zscores%20copy.json";
            break;
        case "1-1-1": // Girl, Weight, 2 to 5 years
            fetchedLink = "https://raw.githubusercontent.com/DavidQii/MyLittleGrow/main/wfa_girls_2-to-5-years_zscores.json";
            break;
        
        default:
            // Handle default case or invalid combination
            fetchedLink = "Invalid selection";
            break;
        
    }
return fetchedLink;
}

var growthChart; 

function plotUpdate(link) {
// Fetch data from hosted JSON file
let linkData = link
    fetch(linkData) // 	Replace with actual URL
        .then(response => response.json())
        .then(jsonData => {
                // Transform the data
                const { labels, datasets } = transformData(jsonData);

 	if (growthChart && growthChart instanceof Chart) {
        // Destroy the existing chart if it exists
        	growthChart.destroy();
    	}


    var ctx = document.getElementById('growth-chart').getContext('2d');

    growthChart = new Chart(ctx, {
        type: 'line', // Assuming a line chart is appropriate
        data: {
            labels: labels, // Will be populated dynamically
            datasets: datasets
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }

});

});
}