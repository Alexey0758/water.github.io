let totalWater = 0;
const goal = 2000;

function updateDisplay() {
    document.getElementById('waterAmount').textContent = 
        `${totalWater} / ${goal} мл`;
    const percentage = Math.min((totalWater / goal) * 100, 100);
    document.getElementById('progressBar').style.width = `${percentage}%`;
    
    // Обновляем историю
    const history = JSON.parse(localStorage.getItem('waterHistory')) || [];
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = history.map(item => 
        `<li>${item.amount}мл в ${new Date(item.time).toLocaleTimeString()} 
         <button onclick="removeEntry(${item.time})">×</button></li>`
    ).join('');
}

function addWater(amount) {
    totalWater += amount;
    saveToHistory(amount);
    localStorage.setItem('totalWater', totalWater);
    updateDisplay();
}

function addCustomWater() {
    const amount = parseInt(document.getElementById('customAmount').value);
    if (amount > 0) {
        addWater(amount);
        document.getElementById('customAmount').value = '';
    }
}

function saveToHistory(amount) {
    const history = JSON.parse(localStorage.getItem('waterHistory')) || [];
    history.unshift({
        amount: amount,
        time: Date.now()
    });
    localStorage.setItem('waterHistory', JSON.stringify(history));
}

function removeEntry(timestamp) {
    let history = JSON.parse(localStorage.getItem('waterHistory')) || [];
    history = history.filter(item => item.time !== timestamp);
    localStorage.setItem('waterHistory', JSON.stringify(history));
    
    // Пересчитываем общее количество
    totalWater = history.reduce((sum, item) => sum + item.amount, 0);
    localStorage.setItem('totalWater', totalWater);
    updateDisplay();
}

// Инициализация
window.onload = function() {
    totalWater = parseInt(localStorage.getItem('totalWater')) || 0;
    updateDisplay();
};