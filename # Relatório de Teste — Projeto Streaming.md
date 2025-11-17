# 📘 Relatório de Teste – Sistema Moovix

> **Objetivo**: Consolidar os resultados da execução de testes no módulo de **cadastro e login** do Sistema Moovix, validando funcionalidade, robustez e segurança com **HTML, CSS e JavaScript no front-end** e **JavaScript no back-end (API REST com Node.js e Express)**.  
> **Observação**: O Plano de Teste original foi adaptado durante o ciclo devido à **mudança de arquitetura** — migração para uma **API REST real com JavaScript full-stack**, eliminando simulações. Todos os testes foram executados diretamente na interface e na API (manual / Postman / curl).

---

## 1) Metadados do Ciclo
- **Projeto/Sistema**: _Sistema Moovix_  
- **Versão testada (build/tag)**: _v1.0.0 (workspace local)_  
- **Período de execução**: _10/11/2025 a 16/11/2025_  
- **Responsável pelo relatório**: _Guilherme Emanuel, Lara Magalhães, Emanuelly Lima, Samara Santos, Giovanna Chaves e Lucas Pereira_  
- **Plano de teste de referência**: _adaptado ao workspace local_  
- **Ambiente**: _Local (Node.js v22 + Express + MySQL local)_  
- **Requisitos de base**: _Especificação funcional: cadastro/login via API REST_

---

## 2) Resumo Executivo
**Status do ciclo**: _Concluído com ressalvas_  
**Confiabilidade para release**: _Moderada_  
**Principais destaques**:
- Fluxos principais (cadastro, login) cobertos por testes manuais e Postman.
- Defeitos encontrados relacionados a validações (nome, telefone), assets (imagens) e integração com ferramentas de teste automatizado.
- Recomenda-se priorizar validação server-side do nome, correção de paths de assets e garantir ambiente de testes consistente.

---

## 3) Escopo & Itens de Teste
- **Escopo coberto**: 
  - Cadastro via `POST /register`
  - Login via `POST /login`
  - Validações de campos, unicidade e persistência em MySQL
  - UI estática (Front/)
- **Fora de escopo**: 
  - Recuperação de senha, logoff, testes de carga
- **Itens de teste**: Front-end (HTML/CSS/JS), API REST (Node.js/Express), Banco de dados (MySQL)

---

## 4) Ambiente de Teste
- **SO**: Windows (local)  
- **Node.js**: v22  
- **MySQL**: local (database `moovix`)  
- **Ferramentas**: Postman, curl, DevTools do navegador, logs do Node.js

---

## 5) Abordagem & Níveis
- Níveis: Integração (API + BD), Sistema (fluxos manuais).  
- Técnicas: testes funcionais manuais, partições de equivalência, limites, testes negativos.

---

## 6) Critérios de Entrada/Saída – Status
- Entrada: servidor iniciado, DB acessível, front servido — **Atendido**  
- Saída esperada: fluxos críticos funcionando para dados válidos — **Parcial** (validações pendentes)

---

## 7) Cronograma: Planejado × Realizado
- Setup e execução: Setembro/2025 a 16/11/2025 — realizado conforme planejado com pequenos desvios operacionais.

---

## 8) Casos de Teste Executados (atualizado)
(Executados manualmente / Postman / curl)

CT-01 — Cadastro com dados válidos  
- Passos: enviar POST /register com name ≥10 chars, senha ≥8, phone ≥11 digits.  
- Resultado: PASS (registro criado, senha hasheada).

CT-02 — Cadastro com nome contendo números  
- Passos: enviar POST /register com name composto por dígitos (>=10).  
- Resultado: FAIL (aceitação indevida) — validação server-side faltante; dado foi persistido.

CT-03 — Cadastro com senha curta (<8)  
- Passos: enviar POST /register com senha curta.  
- Resultado: PASS (rejeitado pelo servidor/DB), mensagem de erro retornada.

CT-04 — Cadastro com telefone incompleto (<11 dígitos)  
- Passos: enviar POST /register com telefone curto.  
- Resultado: PASS (rejeitado; CHECK do DB pode bloquear; mensagem de validação no server recomendada).

CT-05 — Cadastro com email duplicado  
- Passos: tentar cadastrar dois usuários com mesmo email.  
- Resultado: PASS (servidor retorna erro de duplicidade quando verificado); em casos concorrentes, race condition possível — recomenda-se índice único e tratamento de erro.

CT-06 — Login com credenciais corretas  
- Passos: POST /login com email/senha corretos.  
- Resultado: PASS (retorna success true e dados do usuário).

CT-07 — Login com senha incorreta  
- Passos: POST /login com email correto e senha errada.  
- Resultado: PASS (401 / mensagem genérica de falha).

CT-08 — Login com email inexistente  
- Passos: POST /login com email não cadastrado.  
- Resultado: PASS (401 / mensagem genérica).

CT-09 — Login com campos vazios  
- Passos: enviar POST /login sem email ou sem senha.  
- Resultado: PASS (400 / mensagem de campos obrigatórios).

---

## 9) Defeitos Identificados (priorizados)
- D-001 (Alto) — Validação de nome aceita números. Ação: aplicar regex no server e client.  
- D-002 (Médio) — Pasta imagens vazia / assets não carregados. Ação: popul ar imagens e ajustar paths.  
- D-003 (Médio) — Potencial race condition ao cadastrar com mesmo email; ação: índice único no DB + tratamento de ER_DUP_ENTRY.  
- D-004 (Baixo) — Mensagens de feedback no front dependem de elemento #message; ação: criar dinamicamente no script ou incluir no HTML.

---

## 10) Causas raiz (resumido)
- Validações parciais no back-end e algumas ausentes no front.  
- Assets não versionados/comitados.  
- Testes automatizados não utilizados no projeto (testes manuais / Postman).

---

## 11) Recomendações e ações corretivas
1. Implementar validação de nome no servidor:
   - Regex recomendado: /^[\p{L}\s'-]+$/u e length >= 10.
2. Garantir índice único em email e nome no MySQL, e tratar ER_DUP_ENTRY.
3. Revisar tipo e formato do campo telefone (usar VARCHAR(20) ou garantir extração de dígitos no server).
4. Incluir elemento de mensagens (#message) em login.html / cadastro.html ou criá-lo via JS.
5. Popular pasta imagens/ e usar paths absolutos (/imagens/...).
6. Usar Postman/curl para regressão automatizada local; considerar introduzir suíte de testes automatizados no próximo ciclo.

---

## 12) Plano de verificação pós-correção
- Re-executar CT-02, CT-05, CT-10 após aplicar validações e índice único.  
- Executar bateria manual + scripts curl para cobertura rápida.

---

## 13) Conclusão
O projeto está funcional em fluxos críticos quando os dados obedecem às validações esperadas, porém requer correções de validação de entrada e organização de assets. Não há uso de Cypress no projeto; todos os testes foram manuais ou via Postman/curl. Recomenda-se priorizar validação do campo nome, ajustar tratamento de telefone e garantir unicidade em banco antes do próximo release.

---

## 14) Anexos
- Exemplos curl para teste rápido:
```bash
# Cadastro válido
curl -i -X POST http://localhost:3000/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Usuario Teste Valido","email":"teste@ex.com","password":"senhaSegura1","phone":"11999999999"}'

# Login
curl -i -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{"email":"teste@ex.com","password":"senhaSegura1"}'
```

---

### Mini-Checklist de Entrega
- [x] Metadados completos  
- [x] Casos de teste atualizados (removidos CT-01 e CT-02 originais; novos casos adicionados)  
- [x] Defeitos priorizados  
- [x] Recomendações operacionais concluídas