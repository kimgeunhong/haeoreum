function calculateArea() {
    var inputText = document.getElementById('inputText').value;
    var approvalDate = inputText.match(/사용승인일\s*:\s*([0-9-]+)/);
    var privateArea = inputText.match(/전용면적\s*:\s*([\d.]+)/);
    var publicArea = inputText.match(/공용면적\s*:\s*([\d.]+)/);
    var totalArea = inputText.match(/총 면적\s*:\s*([\d.]+)/);
    var groundArea = inputText.match(/대지면적\s*\(㎡\)\s*:\s*([\d.]+)/);
    var buildingArea = inputText.match(/건축면적\s*\(㎡\)\s*:\s*([\d.]+)/);
    var combinedArea = inputText.match(/연면적\s*\(㎡\)\s*:\s*([\d.]+)/);
    var floorInfo = inputText.match(/지상\/지하 층수\(층\)\s*:\s*([\d\s\/]+)/);

    var resultText = '';

    if (approvalDate) resultText += '사용승인일: ' + approvalDate[1] + '<br>';
    if (privateArea) resultText += '전용면적: ' + privateArea[1] + '㎡ [' + squareMeterToPyung(privateArea[1]) + '평]<br>';
    if (publicArea) resultText += '공용면적: ' + publicArea[1] + '㎡ [' + squareMeterToPyung(publicArea[1]) + '평]<br>';
    if (totalArea) resultText += '총 면적: ' + totalArea[1] + '㎡ [' + squareMeterToPyung(totalArea[1]) + '평]<br>';
    if (groundArea) resultText += '대지면적: ' + groundArea[1] + '㎡ [' + squareMeterToPyung(groundArea[1]) + '평]<br>';
    if (buildingArea) resultText += '건축면적: ' + buildingArea[1] + '㎡ [' + squareMeterToPyung(buildingArea[1]) + '평]<br>';
    if (combinedArea) resultText += '연면적: ' + combinedArea[1] + '㎡ [' + squareMeterToPyung(combinedArea[1]) + '평]<br>';
    if (floorInfo) resultText += '지상/지하 층수: ' + floorInfo[1] + '<br>';

    document.getElementById('result').innerHTML = resultText;
}

function squareMeterToPyung(value) {
    return (parseFloat(value) / 3.3058).toFixed(3);
}

function copyToClipboard() {
    var text = document.getElementById('result').innerText;
    navigator.clipboard.writeText(text);
}

function clearInputText() {
    document.getElementById('inputText').value = '';
    document.getElementById('result').innerHTML = '';
}

function calculateHug() {
    var deposit = parseFloat(document.getElementById('deposit').value);
    var assessedValue = parseFloat(document.getElementById('assessedValue').value);
    var loan = parseFloat(document.getElementById('loan').value);
    var resultText = '';
    var loanPercentage = 1.26;
    var loanThreshold = assessedValue * loanPercentage;

    if (deposit && assessedValue && loan && deposit > 0 && assessedValue > 0 && loan > 0) {
        var bankPayment = loanThreshold - (loanThreshold - loan);
        var landlordIncome = loanThreshold - loan;
        resultText += '<span class="success">안심 대출이 가능합니다!</span><br>';
        resultText += '<p class="small">(공시지가의 126%의 금액이 현재 융자금 보다 크면 가능합니다)</p><br><br>';
        resultText += '안심 대출 가능 최대 금액: ' + formatCurrency(loanThreshold * 10000) + '<br>';
        resultText += '은행 납부 금액: ' + formatCurrency(bankPayment * 10000) + '<br>';
        resultText += '임대인 소득: ' + formatCurrency(landlordIncome * 10000);
    } else {
        resultText = '전세 보증금, 공시지가, 그리고 현재 융자를 모두 입력해주세요.';
    }

    document.getElementById('hugResult').innerHTML = resultText;
}

function formatCurrency(value) {
    return value.toLocaleString('ko-KR', { style: 'currency', currency: 'KRW' });
}

function copyHugToClipboard() {
    var text = document.getElementById('hugResult').innerText;
    navigator.clipboard.writeText(text);
}

function clearHugInput() {
    document.getElementById('deposit').value = '';
    document.getElementById('assessedValue').value = '';
    document.getElementById('loan').value = '';
    document.getElementById('hugResult').innerHTML = '';
}
