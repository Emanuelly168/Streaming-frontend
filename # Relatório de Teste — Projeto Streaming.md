# Relatório de Teste – Sistema Moovix

## Objetivo - Lara

Consolidar os resultados da execução de testes no módulo de cadastro e login do Sistema Moovix. O objetivo foi validar a funcionalidade, robustez e segurança da aplicação, que utiliza HTML, CSS e JavaScript no front-end e uma API REST com Node.js e Express no back-end.

**Observação:** O Plano de Teste original foi adaptado durante o ciclo devido à mudança de arquitetura — migração para uma API REST real com JavaScript full-stack, eliminando simulações. Todos os testes foram executados diretamente na interface e na API (manual / Postman / curl).

---

## Resumo Executivo e Metadados

### Status do Ciclo

* **Status:** Concluído com ressalvas
* **Confiabilidade para Release:** Moderada

### Principais Destaques

* Fluxos principais (cadastro, login) foram cobertos por testes manuais e via Postman.
* Defeitos encontrados estão relacionados a validações (nome, telefone) e integração com ferramentas de teste automatizado.
* Foi priorizado a validação server-side do campo nome, correção de paths e garantia de um ambiente de testes consistente.

### Metadados do Ciclo

* **Projeto/Sistema:** Sistema Moovix
* **Versão testada (build/tag):** v3.1 (workspace local)
* **Período de execução:** 10/11/2025 a 16/11/2025
* **Responsáveis pelo relatório:** Guilherme Emanuel, Lara Magalhães, Emanuelly Lima, Samara Santos, Giovanna Chaves e Lucas Pereira
* **Plano de teste de referência:** Adaptado ao workspace local
* **Ambiente:** Local (Node.js v22 + Express + MySQL local)
* **Requisitos de base:** Especificação funcional: cadastro/login via API REST

---

## Escopo e Itens de Teste

### Escopo Coberto

* Cadastro via `POST /register`
* Login via `POST /login`
* Validações de campos, unicidade e persistência em MySQL
* UI estática (Front-end)

### Fora de Escopo

* Recuperação de senha
* Logoff (gerenciamento de sessão/token)
* Testes de Carga

### Itens de Teste

* Front-end (HTML/CSS/JS)
* API REST (Node.js/Express)
* Banco de dados (MySQL)

---

## Ambiente e Abordagem de Teste - Lara

### Ambiente de Teste

| Categoria | Detalhe |
| :--- | :--- |
| Sistema Operacional | Windows (local) |
| Runtime | Node.js v22 |
| Banco de Dados | MySQL local (database `moovix`) |
| Ferramentas | Postman, curl, DevTools do navegador, logs do Node.js |

### Abordagem e Níveis - Guilherme

* **Níveis:** Integração (API + BD), Sistema (fluxos manuais).
* **Técnicas:** Testes funcionais manuais, partições de equivalência, análise de valor limite, testes negativos.
* **Critérios de Entrada:** Servidor iniciado, DB acessível, front servido. (Status: Atendido)
* **Critérios de Saída:** Fluxos críticos funcionando para dados válidos. (Status: Parcial - validações pendentes)

---

## Critérios de Entrada e Saída

### Critérios de Entrada

* **Servidor Iniciado:**
    * O servidor Node.js deve estar em execução sem erros.
    * O comando `node Server/server.js` deve ser executado com sucesso.
* **Banco de Dados Acessível:**
    * O banco de dados MySQL deve estar em execução e acessível.
    * A conexão com o banco de dados deve ser estabelecida corretamente (testar com um cliente MySQL).
* **Estrutura de Diretórios:**
    * A estrutura de diretórios do projeto deve estar conforme esperado:
    * `Front` com arquivos HTML.
    * `Server` com `server.js` e `users.json`.
    * `Script` com scripts de cadastro e login.
    * `css` e `imagens` devem estar presentes (mesmo que vazios).
* **Requisitos Funcionais:**
    * Os requisitos funcionais para cadastro e login devem estar definidos e documentados.
    * As validações mínimas para os campos (nome, email, senha, telefone) devem estar especificadas.
* **Ambiente de Teste Preparado:**
    * Ferramentas de teste (Postman, curl) devem estar instaladas e configuradas.
    * O ambiente deve estar livre de conflitos de porta (ex.: porta 3000).

### Critérios de Saída

* **Fluxos Críticos Funcionando:**
    * Todos os fluxos críticos (cadastro e login) devem funcionar corretamente para dados válidos.
    * As respostas da API devem ser consistentes e retornar os códigos de status HTTP apropriados (200, 201, 400, 401, 409).
* **Validações Implementadas:**
    * As validações server-side devem estar implementadas e funcionando conforme especificado.
    * Mensagens de erro devem ser retornadas para entradas inválidas.
* **Feedback do Usuário:**
    * O front-end deve fornecer feedback adequado ao usuário (ex.: mensagens de sucesso ou erro).
    * Elementos de feedback (como `#message`) devem estar presentes e visíveis.
* **Persistência de Dados:**
    * Os dados de cadastro devem ser persistidos corretamente no banco de dados.
    * As tentativas de cadastro com dados duplicados devem ser tratadas adequadamente.
* **Relatório de Teste Completo:**
    * Um relatório de teste deve ser gerado, documentando os resultados dos testes executados, defeitos encontrados e recomendações.
    * O relatório deve incluir métricas de cobertura e rastreabilidade.
* **Ajustes e Correções:**
    * As correções recomendadas devem ser implementadas e testadas.
    * O sistema deve ser re-testado para garantir que as correções não introduziram novos problemas.

---

## Cronograma: Planejado × Realizado – Guilherme

* Setup e execução: Setembro /2025 a 16/11/2025 — realizado conforme planejado com pequenos desvios operacionais.

---

## Casos de Teste Executados - Guilherme

(Executados manualmente / Postman / curl)

| ID | Descrição | Passos | Resultado |
| :--- | :--- | :--- | :--- |
| CT-01 | Cadastro com dados válidos | Enviar POST /register com name ≥10 chars, senha ≥8, phone ≥11 digits. | PASS (Registro criado, senha hasheada). |
| CT-02 | Cadastro com nome contendo números | Enviar POST /register com name composto por dígitos (≥10). | FAIL (Aceitação indevida) — validação server-side faltante; dado foi persistido. |
| CT-03 | Cadastro com senha curta (<8) | Enviar POST /register com senha curta. | PASS (Rejeitado pelo servidor/DB), mensagem de erro retornada. |
| CT-04 | Cadastro com telefone incompleto (<11 dígitos) | Enviar POST /register com telefone curto. | PASS (Rejeitado; CHECK do DB pode bloquear; mensagem de validação no server recomendada). |
| CT-05 | Cadastro com email duplicado | Tentar cadastrar dois usuários com mesmo email. | PASS (Servidor retorna erro de duplicidade); Observação: Risco de race condition. |
| CT-06 | Login com credenciais corretas | POST /login com email/senha corretos. | PASS (Retorna success: true e dados do usuário). |
| CT-07 | Login com senha incorreta | POST /login com email correto e senha errada. | PASS (Retorna 401 / mensagem genérica de falha). |
| CT-08 | Login com email inexistente | POST /login com email não cadastrado. | PASS (Retorna 401 / mensagem genérica). |
| CT-09 | Login com campos vazios | Enviar POST /login sem email ou sem senha. | PASS (Retorna 400 / mensagem de campos obrigatórios). |

---

## Resultado por Tipo e Nível - Giovanna

Total de casos executados: 9 (CT-01…CT-09)

### Por Tipo

* **Funcionais (API / fluxo usuário):** 7 (cadastro, login, validações)
    * Pass: 6 / Fail: 1
* **Integração (API ↔ DB):** 2 (inserção com constraints, duplicidade)
    * Pass: 2 / Fail: 0
* Não houve testes unitários automatizados neste ciclo.

### Por Nível

* **System / E2E (fluxos via navegador + API):** 3
    * Pass: 2 / Fail: 1 (UX / assets)
* **Integration (API ↔ MySQL):** 4
    * Pass: 4
* **Smoke / Sanity (servidor up + rotas):** 2
    * Pass: 2

### Taxas

* **Pass rate geral:** 88.9% (8/9)
* **Pass rate funcional:** 85.7% (6/7)

---

## Testes Não-Funcionais - Emanuelly

* **Performance:** Não executado (fora do escopo). Risco: desconhecido para picos de usuários.
* **Segurança:**
    * Senhas: hash com `bcryptjs` aplicado — positivo.
    * Falta TLS/HTTPS em ambiente local — recomendado para produção.
    * Validação server-side insuficiente (nome aceita números) — risco de integridade de dados.
* **Robustez / Confiabilidade:**
    * Banco com CHECKs protege integridade, porém inserções inválidas geram erros SQL; servidor deveria validar e tratar antes do INSERT.
* **Usabilidade / Acessibilidade:**
    * Mensagens de feedback dependem de elemento `#message` (nem sempre presente) — piora UX.
    * Assets (imagens, CSS path) inconsistentes → degradação visual.
* **Manutenibilidade / Operacional:**
    * Mistura ESM/CommonJS e config Cypress inválido mostrou fragilidade em infra de teste.
    * Recomenda-se padronizar module type e documentar startup.
* **Compatibilidade:**
    * Testado em navegador desktop (DevTools). Mobile/responsividade parcial (CSS media queries presentes).

---

## Defeitos e Análise - Lucas

Lista priorizada de defeitos, com causa e ação recomendada:

### D-001 — Validação de nome aceita números

* **Severidade:** Alto
* **Sintoma:** Usuário cadastrado com nome numérico (violação de regra de negócio).
* **Causa raiz:** Falta de regex server-side; front apenas valida length.
* **Impacto:** Integridade dos dados, inconsistência com CHECKs esperados.
* **Correção:** Aplicar regex Unicode no `/register` e no `cadastro.js`: `/^[\p{L}\s'-]+$/u`; length >= 10.
* **Estimativa de Esforço:** 1–2 horas (implementar regex + testes manuais).

### D-002 — Potencial race condition / duplicidade de cadastro

* **Severidade:** Médio
* **Sintoma:** Tentativas concorrentes podem gerar `ER_DUP_ENTRY` sem tratamento elegante.
* **Causa raiz:** Falta de índice único consistente e tratamento do erro no servidor.
* **Correção:** Garantir `UNIQUE (email)` e tratar `ER_DUP_ENTRY` no catch retornando 409; usar transação/semaphores se necessário.
* **Estimativa de Esforço:** 1–3 horas (alteração DB + tratamento de erro).

### D-003 — Mensagens não exibidas quando #message ausente

* **Severidade:** Baixo
* **Sintoma:** Feedback invisível no front.
* **Causa raiz:** Scripts assumem elemento presente.
* **Correção:** Criar dinamicamente element`#message` nos scripts ou incluir no HTML.
* **Estimativa de Esforço:** 30 min.

---

## Cobertura e Rastreabilidade - Lucas

### Requisitos Mapeados → Casos de Teste (Exemplo)

* **RQ-01:** Cadastro de usuário (validações mínimas) → CT-01, CT-02, CT-03, CT-04, CT-05
* **RQ-02:** Autenticação (login) → CT-06, CT-07, CT-08, CT-09
* **RQ-03:** Servir front e assets → CT-10 (integração manual; verificar paths)
* **RQ-04:** Persistência correta em MySQL → CT-01, CT-03, CT-04, CT-05

### Cobertura Atual - Giovanna

* **Requisitos críticos (RQ-01, RQ-02, RQ-04):** Cobertos por casos manuais → cobertura funcional: 100% (em nível de verificação manual)
* **Requisitos de UI/Assets (RQ-03):** Cobertura parcial (issues com assets detectadas)
* **Automação:** 0% (nenhum teste automatizado mantido no repositório)

### Matriz de Rastreabilidade (Exemplo Resumido)

| Caso de Teste | Requisito(s) Coberto(s) |
| :--- | :--- |
| CT-01 | RQ-01, RQ-04 |
| CT-02 | RQ-01 |
| CT-03 | RQ-01, RQ-04 |
| CT-06 | RQ-02 |
| CT-07..CT-09 | RQ-02 |
| CT-10 | RQ-03 |

---

## Recomendações e Ações Corretivas - Samara

* Implementar validação de nome no servidor (Prioridade: Alta):
    * Regex recomendado: `/^[\p{L}\s'-]+$/u` e length >= 10.
* Garantir índice `UNIQUE` em email no MySQL e tratar o erro `ER_DUP_ENTRY` na API.
* Popular pasta `imagens/` e usar paths absolutos (ex: `/imagens/`).
* Incluir elemento de mensagens (`#message`) em `login.html` / `cadastro.html` ou criá-lo via JS.
* Revisar tipo e formato do campo telefone (usar `VARCHAR(20)` ou garantir extração de dígitos no servidor).
* Usar Postman/curl para regressão automatizada local; considerar introduzir suíte de testes automatizados no próximo ciclo.

### Plano de Verificação Pós-Correção - Samara

* Re-executar CT-02 (Nome com números) e CT-05 (Email duplicado) após aplicar validações e índice único.
* Executar bateria manual completa + scripts curl para cobertura rápida de regressão.

---

## Conclusão – Lara & Guilherme

O projeto está funcional em seus fluxos críticos quando os dados obedecem às validações esperadas. No entanto, requer correções imediatas de validação de entrada (especialmente no campo nome).

Não há uso de Cypress no projeto; todos os testes foram manuais ou via Postman/curl. Recomenda-se priorizar a validação do campo nome, ajustar o tratamento do campo telefone e garantir a unicidade de dados em banco antes do próximo release.

---

## 14) Anexos
- Exemplos curl para teste rápido:
```bash
# Cadastro válido
 POST http://localhost:3000/register \
  
  -d '{"name":"Caio Lucas", "phone":"11999999999", "email":"caio@gmail.com", "password":"12345678", "confirmPasswod": "12345678"}'

# Login
 POST http://localhost:3000/login \
 
  -d '{"email":"kaio@gmail.com","password":"12345678"}'
```

---

### Mini-Checklist de Entrega
- [x] Metadados completos  
- [x] Casos de teste atualizados (removidos CT-01 e CT-02 originais; novos casos adicionados)  
- [x] Defeitos priorizados  
- [x] Recomendações operacionais concluídas