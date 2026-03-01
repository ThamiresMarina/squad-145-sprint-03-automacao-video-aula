Feature: Reprodução de Vídeo

  Background:
    Given que acesso o site da Iterasys
    When preencho minhas credenciais
    And clico em entrar
    And que estou na página Meus Cursos
    And clico em Visualizar Curso no "Preparatório CTFL"
    And acesso a aula "Introdução"

  Scenario: CT01 - Validação de carregamento inicial do vídeo
    Then o vídeo deve iniciar sem erros

  Scenario: CT02 - Validação de reprodução contínua
    Then o vídeo deve reproduzir sem travamentos

  Scenario: CT03 - Validação em rede lenta
    Given que simulo uma rede lenta
    Then o vídeo deve carregar após buffering sem erros
