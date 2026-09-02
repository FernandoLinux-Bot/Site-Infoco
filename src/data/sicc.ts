/**
 * Conteúdo do SICC destilado do FAQ oficial (repo nandovitor/faq-sicc).
 * Fonte: sintese/*.md e _deploy/ia/kb.md — mapeamento real das telas do sistema.
 * Nenhuma captura de tela é usada; apenas a informação funcional.
 */

export type Modulo = {
    id: string;
    grupo: 'planejamento' | 'execucao' | 'solicitacoes' | 'transparencia';
    nome: string;
    resumo: string;
    descricao: string;
    destaques: string[];
    fundamento?: string;
};

/** Os módulos do SICC, na ordem do menu real do sistema. */
export const MODULOS: Modulo[] = [
    {
        id: 'pca',
        grupo: 'planejamento',
        nome: 'PCA e DFD',
        resumo: 'Plano de Contratação Anual',
        descricao:
            'O exercício inteiro em um cartão: DFDs cadastrados, itens, valor planejado e a barra de consolidação. Cada demanda do ano nasce de um Documento de Formalização de Demanda aprovado aqui.',
        destaques: [
            'Seis prazos do ciclo preenchidos automaticamente a partir do exercício',
            'Consolidação por Unidade ou por Setores, detalhamento por Item ou Objeto',
            'Sincronização com o PNCP e indicador de publicação no cartão',
            'Aba Operacional mede adesão ao plano, contratações fora do PCA e DFDs em atraso',
        ],
        fundamento: 'Inciso VII do art. 12 da Lei 14.133/2021',
    },
    {
        id: 'etp',
        grupo: 'planejamento',
        nome: 'ETP',
        resumo: 'Estudo Técnico Preliminar',
        descricao:
            'Do problema à declaração de viabilidade. O estudo nasce da justificativa da demanda e percorre necessidade, requisitos, soluções de mercado, quantidades, parcelamento e conclusão.',
        destaques: [
            'Assistente que redige o rascunho inteiro a partir do problema identificado',
            'Quantidades e valores por lote, com importação de planilha',
            'Declaração de viabilidade: Viável, Viável com restrições ou Inviável',
            'Revisão com notificação por e-mail e WhatsApp antes de encerrar a edição',
        ],
    },
    {
        id: 'riscos',
        grupo: 'planejamento',
        nome: 'Mapa de Riscos',
        resumo: 'Matriz 5×5 de impacto e probabilidade',
        descricao:
            'Vinculado ao ETP, herda unidade, equipe e objeto do estudo. Cada risco recebe etapa, impacto, probabilidade, dano, ações preventivas e ações de contingência.',
        destaques: [
            'Níveis Baixo, Médio, Alto e Extremo com a matriz 5×5 no documento',
            'Sugestão de riscos a partir do objeto, para a equipe aceitar ou recusar',
            'Vínculo direto ao ETP evita divergência entre os dois documentos',
        ],
        fundamento: 'Art. 18, inciso X da Lei 14.133/2021',
    },
    {
        id: 'cotacoes',
        grupo: 'planejamento',
        nome: 'Cotações',
        resumo: 'Pesquisa de preços com trilha',
        descricao:
            'Cada cotação nasce de uma demanda e devolve a média para o processo administrativo. Situações separadas em Aguardando Autuação, Em Cotação, Concluídas e Canceladas.',
        destaques: [
            'Vínculo ao processo administrativo da demanda de origem',
            'Média calculada por item e devolvida ao planejamento',
            'Reabertura da fase de cotação quando o preço precisa ser refeito',
        ],
    },
    {
        id: 'demandas',
        grupo: 'planejamento',
        nome: 'Demandas',
        resumo: 'O coração da tramitação',
        descricao:
            'Um kanban de duas colunas — Em Elaboração e Em Contratação — onde cada cartão é um processo administrativo com selos de SRP, DFD e PCA, prazo, valor e a unidade responsável.',
        destaques: [
            'Três formas de abrir: simples, com ETP ou com DFD do PCA',
            'Menu Ações sensível ao status: só aparece o que a fase permite',
            'Abas de Itens, Participantes, Dotações, Cotação, Movimentações e Documentos',
            'Contador de dias para conclusão e de dias de atraso em cada cartão',
        ],
    },
    {
        id: 'processo',
        grupo: 'planejamento',
        nome: 'Processo Eletrônico',
        resumo: 'Mesa virtual e tramitação',
        descricao:
            'O processo carrega o mesmo número da demanda. Mesa Virtual, Caixa de Entrada, Processos do Meu Setor e a área de trabalho com documentos, notas, tarefas, prazos e e-mails.',
        destaques: [
            'Timeline de movimentações: criado, distribuído, iniciado — com autor e data',
            'Fluxos processuais cadastráveis definem as etapas que todo processo segue',
            'Partes interessadas e distribuições com tempo de acesso registrado',
        ],
    },
    {
        id: 'adesoes',
        grupo: 'planejamento',
        nome: 'Portal de Adesões',
        resumo: 'Carona em atas de registro de preço',
        descricao:
            'Adesão a partir do Portal de Atas ou de um PDF. O sistema registra gerenciador, unidade aderente, vigência e valor, e leva direto para a demanda.',
        destaques: [
            'Duas origens de adesão: Portal de Atas ou arquivo PDF',
            'Iniciar Demanda direto do cartão da adesão concluída',
            'Consulta ao PNCP a partir da própria ata',
        ],
    },
    {
        id: 'solicitacoes',
        grupo: 'solicitacoes',
        nome: 'Solicitações e Pedidos',
        resumo: 'Do carrinho ao recebimento',
        descricao:
            'O servidor monta o pedido a partir dos contratos e atas vigentes com saldo. O sistema desmembra automaticamente uma solicitação por contrato e fornecedor.',
        destaques: [
            'Estoque e saldo conferidos item a item na hora de pedir',
            'Painel de Solicitações aprova ou rejeita em massa',
            'Recebimento parcial, notas fiscais, empenhos e termo de recebimento',
            'Rascunho automático de pedido não finalizado',
        ],
    },
    {
        id: 'compra-direta',
        grupo: 'solicitacoes',
        nome: 'Compra Direta',
        resumo: 'Pronto pagamento',
        descricao:
            'Fluxo próprio para pronto pagamento: fornecedor, objeto, orçamentos anexados e itens digitados ou importados do próprio orçamento. Gera uma única solicitação.',
        destaques: [
            'Anexo de orçamentos em JPG, PNG ou PDF',
            'Leitura dos itens direto do orçamento anexado',
            'Status próprio de Aguardando Orçamento',
        ],
        fundamento: 'Art. 95, § 2º da Lei 14.133/2021',
    },
    {
        id: 'contratos',
        grupo: 'execucao',
        nome: 'Contratos e ARPs',
        resumo: 'Execução com saldo à vista',
        descricao:
            'Valor original, valor atualizado, utilizado e saldo em cada cartão, com a barra de percentual consumido. Termos aditivos de reajuste, reequilíbrio e prazo ficam agrupados na própria ata.',
        destaques: [
            'Filtros por Vigentes, Vencendo em 90 dias e Vencidos',
            'Gestores e fiscais visíveis no cartão do contrato',
            'Apostilamentos de itens em lista própria',
            'Selos de integração SIAFIC e PNCP',
        ],
    },
    {
        id: 'assinaturas',
        grupo: 'execucao',
        nome: 'Assinaturas',
        resumo: 'Central de assinatura eletrônica',
        descricao:
            'DFD, TR, ETP, Ata-RP e autuação assinados dentro do sistema. Pendências, revisões e assinaturas solicitadas com contador próprio.',
        destaques: [
            'Fluxo de revisão antes de congelar o documento',
            'Status por signatário, com notificação de pedido de assinatura',
            'Documento gerado com timbre do órgão',
        ],
    },
    {
        id: 'relatorios',
        grupo: 'transparencia',
        nome: 'Relatórios',
        resumo: 'Contratos, solicitações e gastos',
        descricao:
            'Gasto total, média mensal e total de solicitações por secretaria, fornecedor ou usuário, com série mensal e exportação para impressão.',
        destaques: [
            'Relatório de contratos, atas e itens com filtro por situação e validade',
            'Relatório de solicitações licitadas e não licitadas',
            'Gastos totais por secretaria, fornecedor e usuário',
        ],
    },
    {
        id: 'integracoes',
        grupo: 'transparencia',
        nome: 'Integrações',
        resumo: 'PNCP e SIGA / TCM-BA',
        descricao:
            'Publicação no Portal Nacional de Contratações Públicas e envio ao SIGA do Tribunal de Contas dos Municípios da Bahia, a partir dos mesmos dados já cadastrados.',
        destaques: [
            'Sincronização do PCA e das unidades com o PNCP',
            'Envio ao SIGA / TCM-BA sem redigitação',
            'Selos de publicação visíveis no cartão de cada contrato',
        ],
    },
    {
        id: 'catalogos',
        grupo: 'transparencia',
        nome: 'Catálogos',
        resumo: 'Objetos e itens padronizados',
        descricao:
            'Catálogo de objetos resumidos e catálogo de itens com código interno, categorias e histórico de consumo — a base que mantém DFD, ETP e pedido falando a mesma língua.',
        destaques: [
            'Objeto resumido reutilizado em DFD, ETP, demanda e contrato',
            'Código interno por item e agrupamento por categoria',
            'Histórico de consumo consultável na hora de estimar valor',
        ],
    },
];

/** As fases pelas quais uma demanda passa, na ordem real do ciclo de vida. */
export const CICLO_DEMANDA = [
    {
        fase: 'Elaboração',
        detalhe: 'A unidade abre a demanda — simples, com ETP ou a partir de um DFD do PCA — e completa itens, participantes e dotações.',
    },
    {
        fase: 'Análises',
        detalhe: 'Orçamentária, controle interno, jurídica e técnica. Qualquer uma pode devolver para revisão interna, com o motivo registrado nas movimentações.',
    },
    {
        fase: 'Cotação',
        detalhe: 'A pesquisa de preços roda vinculada ao processo administrativo e devolve a média. A fase pode ser reaberta quando o preço precisa ser refeito.',
    },
    {
        fase: 'Mapa de Riscos',
        detalhe: 'Cada risco recebe impacto, probabilidade, dano e as ações preventivas e de contingência, na matriz 5×5.',
    },
    {
        fase: 'Autoridade',
        detalhe: 'A autoridade competente aprova. Em registro de preço, a IRP é divulgada e depois encerrada.',
    },
    {
        fase: 'Contratação',
        detalhe: 'A demanda vira licitação ou contratação direta, aguarda a autuação e passa a exibir o número do processo resultante.',
    },
] as const;

/** Números verificáveis do sistema — sem promessa de resultado. */
export const NUMEROS = [
    { valor: '14.133', rotulo: 'A lei que o sistema implementa', sufixo: '/2021' },
    { valor: String(MODULOS.length), rotulo: 'Módulos integrados no mesmo cadastro' },
    { valor: '2', rotulo: 'Integrações oficiais', sufixo: ' PNCP · SIGA' },
    { valor: '1', rotulo: 'Cadastro que alimenta todo o ciclo' },
];

/** Perguntas reais do FAQ do SICC, reescritas para o público institucional. */
export const PERGUNTAS = [
    {
        p: 'Qual a diferença entre DFD e demanda?',
        r: 'O DFD é o registro de planejamento que compõe o PCA do exercício. A demanda é a execução daquele planejamento — dela saem o ETP, a cotação e a contratação. Por isso existe a opção de abrir uma nova demanda já a partir de um DFD do PCA. DFD sem demanda é planejamento não executado, e é exatamente isso que a aba Operacional do plano mede.',
    },
    {
        p: 'Consolidar o PCA é o mesmo que publicar no PNCP?',
        r: 'Não. Consolidar é interno: fecha o plano do exercício somando os DFDs aprovados e o cartão passa a exibir o status Consolidado. Sincronizar com o PNCP é externo: publica o plano no Portal Nacional de Contratações Públicas. A sincronização só faz sentido depois da consolidação.',
    },
    {
        p: 'Por que o menu de ações muda de uma demanda para outra?',
        r: 'Porque ele é sensível ao status. No início aparecem as análises básicas; na fase intermediária entram controle interno, autoridade, elaboração de ETP e o início da contratação; depois de a cotação ser concluída aparece a reabertura; e quando a demanda já está em contratação o bloco de andamento some. O menu mostra apenas o que a fase permite.',
    },
    {
        p: 'Uma demanda foi devolvida. E agora?',
        r: 'A aba Movimentações guarda o motivo da devolução, com autor e data. Corrija pela ação de editar e reenvie para a análise de onde ela voltou. O histórico permanece — devolver não apaga nada.',
    },
    {
        p: 'Por que um pedido virou várias solicitações?',
        r: 'Porque o sistema desmembra o carrinho em uma solicitação por contrato e por fornecedor. Cada uma segue seu próprio trâmite de aprovação e recebimento, já que o empenho e a nota fiscal são de cada fornecedor.',
    },
    {
        p: 'Alterei uma seção depois de gerar o documento. Preciso fazer algo?',
        r: 'Sim: gerar o documento de novo. Ele não se atualiza sozinho quando a seção muda. É o descuido mais comum do fluxo, e o próprio sistema mantém o aviso visível enquanto o documento está em edição.',
    },
    {
        p: 'O texto gerado pela assistência vale como documento oficial?',
        r: 'Não. É rascunho. A responsabilidade técnica continua sendo da equipe de planejamento, que revisa, corrige e assina. A assistência acelera a redação; ela não substitui a decisão.',
    },
    {
        p: 'O que significam valor original, atualizado, utilizado e saldo?',
        r: 'Original é o valor de assinatura. Atualizado incorpora os termos aditivos de reajuste, reequilíbrio e prazo. Utilizado é o que já foi consumido pelas solicitações. Saldo é o que resta — e é ele que limita o próximo pedido.',
    },
];

/** Perfis de usuário observados no sistema. */
export const PERFIS = [
    { nome: 'Funcionário da Unidade', papel: 'Abre demandas e faz pedidos para a sua secretaria.' },
    { nome: 'Secretário / Responsável', papel: 'Aprova as solicitações da unidade antes de irem para compras.' },
    { nome: 'Setor de Compras', papel: 'Analisa, aprova em massa e conduz a contratação.' },
    { nome: 'Cotações', papel: 'Conduz a pesquisa de preços e devolve a média ao processo.' },
];
