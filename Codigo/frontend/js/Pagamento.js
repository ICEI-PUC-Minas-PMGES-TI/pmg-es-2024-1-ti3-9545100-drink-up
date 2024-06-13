document.addEventListener("DOMContentLoaded", () => {
    // Recuperar o valor total do localStorage
    const valorTotal = sessionStorage.getItem('TotalComFrete');
    const valorFrete = localStorage.getItem('valorFrete');
    // Verificar se o valor total está disponível e atualizar a página
    if (valorTotal) {
        document.getElementById("cart-subtotal").innerText = valorTotal;
    } else {
        console.error("Valor total não encontrado no localStorage.");
    }
});
