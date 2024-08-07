let wealthChart;

document.getElementById('wealthForm').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        let inputs = Array.from(this.querySelectorAll('input'));
        let currentIndex = inputs.indexOf(document.activeElement);
        let nextIndex = currentIndex + 1;

        if (nextIndex < inputs.length) {
            inputs[nextIndex].focus();
        }
    }
});

function calculateWealthScore() {
    const income = parseFloat(document.getElementById('income').value);
    const savings = parseFloat(document.getElementById('savings').value);
    const investments = parseFloat(document.getElementById('investments').value);
    const realEstate = parseFloat(document.getElementById('realEstate').value);
    const debt = parseFloat(document.getElementById('debt').value);
    const otherAssets = parseFloat(document.getElementById('otherAssets').value);

    const w1 = 0.25;
    const w2 = 0.20;
    const w3 = 0.20;
    const w4 = 0.15;
    const w5 = -0.10;
    const w6 = 0.10;

    const wealthScore = (w1 * income) + (w2 * savings) + (w3 * investments) + (w4 * realEstate) + (w5 * debt) + (w6 * otherAssets);

    document.getElementById('result').innerText = wealthScore.toFixed(2);

    const ctx = document.getElementById('wealthChart').getContext('2d');
    const data = {
        labels: ['Income', 'Savings', 'Investments', 'Real Estate', 'Debt', 'Other Assets'],
        datasets: [{
            label: 'Wealth Components',
            data: [
                w1 * income,
                w2 * savings,
                w3 * investments,
                w4 * realEstate,
                w5 * debt,
                w6 * otherAssets
            ],
            backgroundColor: [
                '#4CAF50', // Color for Income
                '#FF9800', // Color for Savings
                '#2196F3', // Color for Investments
                '#9C27B0', // Color for Real Estate
                '#F44336', // Color for Debt
                '#FFC107'  // Color for Other Assets
            ]
        }]
    };

    if (wealthChart) {
        wealthChart.data = data;
        wealthChart.update();
    } else {
        wealthChart = new Chart(ctx, {
            type: 'pie',
            data: data,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top'
                    },
                    title: {
                        display: true,
                        text: 'Wealth Score Components'
                    }
                }
            }
        });
    }

const resultContainer = document.querySelector('.result-container');
resultContainer.style.visibility = 'visible';

resultContainer.scrollIntoView({ behavior: 'smooth' });
}