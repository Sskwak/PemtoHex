document.addEventListener('DOMContentLoaded', async () => {
    async function initWasm() {
        const go = new Go();
        const response = await fetch('/PemtoHex/main.wasm'); // 경로 확인
        const buffer = await response.arrayBuffer();
        const wasmObj = await WebAssembly.instantiate(buffer, go.importObject);
        go.run(wasmObj.instance);

        // Go 함수를 JavaScript에서 사용할 수 있도록 export 했다면 여기서 접근
        window.pemToHexArray = wasmObj.instance.exports.pemToHexArray;

        const convertButton = document.getElementById('convertButton');
        const pemInput = document.getElementById('pemInput');
        const resultDiv = document.getElementById('result');

        convertButton.addEventListener('click', () => {
            const pemText = pemInput.value;
            if (window.pemToHexArray) {
                const cArrayResult = window.pemToHexArray(pemText);
                resultDiv.textContent = cArrayResult;
            } else {
                resultDiv.textContent = "WASM 함수가 아직 로드되지 않았습니다.";
            }
        });
    }

    await initWasm();
});
