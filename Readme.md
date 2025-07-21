## TODO List

- [x] Implementar função 'atualizar'.
- [x] Implementar função 'excluir'.
- [x] Melhorar lógica dos query parameters da função 'buscar' (spread req.query).
- [x] Criar middleware para exibir os payloads em ambiente 'dev' (reusar logger).
- [x] Testar o que acontece com o petstore se o auth não estiver rodando.
- [x] [Monitor] Criar um middleware para validar se o alarme a ser ativado/desativado existe.
- [x] [Monitor] Juntar ativar e desativar numa única função.
- [x] [Monitor] Refletir se está correto usar POST no ativar/desativar.
- [x] [Monitor] Incluir validação do token para a requisição de listagem dos alarmes.
- [x] [Monitor] Criar um mecanismo para só permitir que alarmes sejam ativados/desativados por serviços e não pelo cliente.
- [x] [Monitor] Incluir mais um alarme para situações em que o Auth está fora do ar (é possível? Como lidar com essa situação?).