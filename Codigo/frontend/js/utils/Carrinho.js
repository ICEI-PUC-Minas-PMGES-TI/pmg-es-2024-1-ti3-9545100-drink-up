export class Carrinho {
    constructor() {
        this.produtos = this.carregarProdutosDoCookie() || [];
        this.valorFrete = 0; // Adicionando a propriedade valorFrete
    }

    increase(produtoId) {
        const existingProductIndex = this.produtos.findIndex(p => p.id === produtoId);

        if(existingProductIndex !== -1) {
            this.produtos[existingProductIndex].quant++;
            this.salvarProdutosNoCookie();
            return;
        }

        console.log("Produto nao encontrado");
    }

    decrease(produtoId) {
        const existingProductIndex = this.produtos.findIndex(p => p.id === produtoId);

        if(existingProductIndex !== -1) {
            this.produtos[existingProductIndex].quant--;
            this.salvarProdutosNoCookie();
            return;
        }

        console.log("Produto nao encontrado");
    }

    adicionarProduto(produto) {
        const existingProductIndex = this.produtos.findIndex(p => p.id === produto.id);
    
        if (existingProductIndex !== -1) {
            this.produtos[existingProductIndex].quant += produto.quant;
            this.salvarProdutosNoCookie();
            console.log(`Produto ${produto.nome} já adicionado ao carrinho! Quantidade atualizada.`);
            return;
        }
        
        this.produtos.push(produto);
        this.salvarProdutosNoCookie();
        console.log(`Produto ${produto.nome} adicionado ao carrinho.`);
    }

    salvarProdutosNoCookie() {
        const jsonProdutos = JSON.stringify(this.produtos);
        document.cookie = `carrinho=${jsonProdutos}; expires=${this.getCookieExpiration()}; path=/`;
    }

    carregarProdutosDoCookie() {
        const cookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('carrinho='));
        if (cookie) {
            const jsonProdutos = cookie.split('=')[1];
            return JSON.parse(jsonProdutos);
        }
        return null;
    }

    removerItem(id) {
        const index = this.produtos.findIndex(p => p.id === id);

        if (index !== -1) {
            this.produtos.splice(index, 1);
            this.salvarProdutosNoCookie();
            alert(`Produto removido do carrinho.`);
        } else {
            alert(`Não foi possivel remover o produto.`);
        }
    }

    updateCarrinhoTotalValue() {
        let formatter = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        });

        let somaProduto = this.produtos.reduce((acc, p) => acc + p.valor * p.quant, 0);
        somaProduto = formatter.format(somaProduto);
        
        document.getElementById("cart-total").innerText = `${somaProduto}`;
    }

    somaProdutoTotal() {
        return this.produtos.reduce((acc, p) => acc + p.valor * p.quant, 0);
    }

    getCookieExpiration() {
        const date = new Date();
        date.setDate(date.getDate() + 1);
        return date.toUTCString();
    }

    exibirProdutos() {
        if (this.produtos.length === 0) {
            console.log("Carrinho vazio.");
        } else {
            console.log("Produtos no carrinho:");
            this.produtos.forEach(produto => {
                console.table(produto);
            });
        }
    }

    limparCarrinho() {
        this.produtos = [];
        this.salvarProdutosNoCookie();
        console.log("Carrinho limpo.");
    }

    setupCounter(initialCount, produtoId) {
        let count = initialCount;
      
        const updateValue = (id) => {
          document.getElementById(`quantity${id}`).innerHTML = count;
        };
      
        const handleDecrease = (produtoId) => {
          if (count > 0) {
            count -= 1;
            updateValue(produtoId);
            this.decrease(produtoId);
          }
        };
      
        const handleIncrease = (produtoId) => {
          count += 1;
          updateValue(produtoId);
          this.increase(produtoId);
        };
      
        if (document.getElementById(`decrease-button${produtoId}`) && document.getElementById(`increase-button${produtoId}`)) {
            let decreaseButton = document.getElementById(`decrease-button${produtoId}`);
            let increaseButton = document.getElementById(`increase-button${produtoId}`);

            decreaseButton.addEventListener("click", () => {
                handleDecrease(produtoId);
                this.updateCarrinhoTotalValue();
            });
        
            increaseButton.addEventListener("click", () => {
                handleIncrease(produtoId);
                this.updateCarrinhoTotalValue();
            });
        }
    }

    async calculaFrete() {
        try {
            const response = await fetch('http://localhost:3000/frete/calcular', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': window.sessionStorage.getItem('authorization')
                },
                body: JSON.stringify({total: this.somaProdutoTotal()})
            });
    
            const data = await response.json();
            
            this.valorFrete = parseFloat(data.valorFrete); // Armazenar o valor do frete
            document.getElementById('valorFrete').textContent = this.valorFrete.toFixed(2);

            // Chamar o método para calcular o valor total com frete
            this.calculaValorTotalComFrete();

        } catch (error) {
            console.error('Erro ao buscar dados:', error);
        }
    }

    calculaValorTotalComFrete() {
        let totalProdutos = this.somaProdutoTotal();
        let totalComFrete = totalProdutos + this.valorFrete;
        
        let formatter = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        });

        totalComFrete = formatter.format(totalComFrete);
        document.getElementById("cart-subtotal").innerText = `${totalComFrete}`;


        sessionStorage.setItem("TotalComFrete", totalComFrete);
    }
}