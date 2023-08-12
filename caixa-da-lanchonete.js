class CaixaDaLanchonete {
    constructor() {
        this.menu = {
            "cafe": {"descricao": "Café", "valor": 3.00},
            "chantily": {"descricao": "Chantily (extra do Café)", "valor": 1.50},
            "suco": {"descricao": "Suco Natural", "valor": 6.20},
            "sanduiche": {"descricao": "Sanduíche", "valor": 6.50},
            "queijo": {"descricao": "Queijo (extra do Sanduíche)", "valor": 2.00},
            "salgado": {"descricao": "Salgado", "valor": 7.25},
            "combo1": {"descricao": "1 Suco e 1 Sanduíche", "valor": 9.50},
            "combo2": {"descricao": "1 Café e 1 Sanduíche", "valor": 7.50}
        };
    }

    calcularValorDaCompra(formaDePagamento, itens) {
        const itensPedido = this.construirItensPedido(itens);
        const erro = this.validarPedido(itensPedido, formaDePagamento);

        if (erro) {
            return erro;
        }

        const valorTotal = this.calcularValorCompra(itensPedido);
        const valorFinal = this.aplicarDescontoOuAcrescimo(valorTotal, formaDePagamento);
        return `R$ ${valorFinal.toFixed(2)}`;
    }

    construirItensPedido(itens) {
        const itensPedido = {};

        for (const item of itens) {
            const [codigo, quantidade] = item.split(',');
            if (this.menu[codigo]) {
                itensPedido[codigo] = (itensPedido[codigo] || 0) + parseInt(quantidade);
            }
        }

        return itensPedido;
    }

    validarPedido(itensPedido, formaDePagamento) {
        if (Object.keys(itensPedido).length === 0) {
            return "Não há itens no carrinho de compra!";
        }

        for (const item in itensPedido) {
            if (!this.menu[item]) {
                return "Item inválido!";
            }

            if (item.endsWith("extra")) {
                const itemPrincipal = item.replace("extra", "");
                if (!itensPedido[itemPrincipal]) {
                    return "Item extra não pode ser pedido sem o principal.";
                }
            }

            if (itensPedido[item] <= 0) {
                return "Quantidade inválida!";
            }
        }

        if (!["dinheiro", "debito", "credito"].includes(formaDePagamento)) {
            return "Forma de pagamento inválida!";
        }

        return "";
    }

    calcularValorCompra(itensPedido) {
        let total = 0.0;
        for (const item in itensPedido) {
            total += this.menu[item].valor * itensPedido[item];
        }
        return total;
    }

    aplicarDescontoOuAcrescimo(valorTotal, formaDePagamento) {
        if (formaDePagamento === "dinheiro") {
            return valorTotal * 0.95;
        } else if (formaDePagamento === "credito") {
            return valorTotal * 1.03;
        }
        return valorTotal;
    }
}

/*
const caixa = new CaixaDaLanchonete();

console.log(caixa.calcularValorDaCompra('debito', ['chantily,1']));
console.log(caixa.calcularValorDaCompra('debito', ['cafe,1', 'chantily,1']));
console.log(caixa.calcularValorDaCompra('credito', ['combo1,1', 'cafe,2']));*/


    
    


