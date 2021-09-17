# Deleta orden

> ## Caso de sucesso

1. ❌ Recebe uma requisição do tipo **DELETE** na rota **/api/orders/:id**
2. ❌ Valida dado obrigatório **id**
3. ❌ Atualiza deletion_flag para 1
4. ❌ Retorna **204**, sem dados

> ## Exceções

1. ❌ Retorna erro **404** se a API não existir
2. ❌ Retorna erro **400** se id não for fornecido pelo client
3. ❌ Retorna erro **500** se der erro ao tentar buscar as ordens