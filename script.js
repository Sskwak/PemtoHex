async function initWasm() {
    const go = new Go();
    const response = await fetch('main.wasm');
    const buffer = await response.arrayBuffer();
    const wasmObj = await WebAssembly.instantiate(buffer, go.importObject);
    go.run(wasmObj.instance);
}

initWasm();

document.addEventListener('DOMContentLoaded', () => {
    const convertButton = document.getElementById('convertButton');
    const pemInput = document.getElementById('pemInput');
    const resultDiv = document.getElementById('result');

    convertButton.addEventListener('click', () => {
        const pemText = pemInput.value;
        // Go WASM 함수 호출 (배열 형식으로 변환)
        if (window.pemToHexArray) {
            const cArrayResult = window.pemToHexArray(pemText);
            resultDiv.textContent = cArrayResult;
        } else {
            resultDiv.textContent = "WASM 함수가 아직 로드되지 않았습니다.";
        }
    });
});
