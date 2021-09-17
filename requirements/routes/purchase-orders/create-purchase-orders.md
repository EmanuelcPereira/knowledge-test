# Criar ordem

> ## Caso de sucesso

1. ✅ Recebe uma requisição do tipo **POST** na rota **/api/orders**
2. ✅ Valida dados obrigatórios **product_id** e **price**
3. ✅ **Cria** uma ordem com os dados fornecidos
4. ✅ Retorna **204**, sem dados

> ## Exceções


1. ✅ Retorna erro **400** se product_id e price não forem fornecidos pelo client
3. ✅ Retorna erro **500** se der erro ao tentar criar a ordem