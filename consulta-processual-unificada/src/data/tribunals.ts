export interface System {
  name: string;
  url1: string;
  url2: string;
}

export interface Section {
  name: string;
  url: string;
}

export interface LoginInfo {
  multiSystem?: boolean;
  systems?: System[];
  sections?: Section[];
  url1?: string;
  url2?: string;
}

export interface Tribunal {
  name: string;
  url1aInstancia?: string;
  url2aInstancia?: string;
  url?: string; // For superior courts
  loginInfo?: LoginInfo;
}

export const TRIBUNALS: Record<string, Tribunal> = {
  // TRIBUNAIS DE JUSTIÇA (ESTADUAIS)
  "801": {
    name: "TJAC",
    url1aInstancia: "https://esaj.tjac.jus.br/cpopg/open.do",
    url2aInstancia: "https://esaj.tjac.jus.br/cposg5/open.do",
    loginInfo: {
      multiSystem: true,
      systems: [
        { name: "SAJ", url1: "https://esaj.tjac.jus.br/sajpg/login.do", url2: "https://esaj.tjac.jus.br/sajsg/login.do" },
        { name: "Eproc", url1: "https://eproc1g.tjac.jus.br/eproc/", url2: "https://eproc2g.tjac.jus.br/" }
      ]
    }
  },
  "802": {
    name: "TJAL",
    url1aInstancia: "https://www2.tjal.jus.br/cpopg/open.do",
    url2aInstancia: "https://www2.tjal.jus.br/cposg5/open.do",
    loginInfo: {
      multiSystem: true,
      systems: [
        { name: "SAJ", url1: "https://www2.tjal.jus.br/esaj?servico=820000", url2: "https://www2.tjal.jus.br/esaj?servico=820000" },
        { name: "Eproc", url1: "https://eproc1g.tjal.jus.br/", url2: "https://eproc2g.tjal.jus.br/" }
      ]
    }
  },
  "803": {
    name: "TJAP",
    url1aInstancia: "https://www.tjap.jus.br/portal/",
    url2aInstancia: "https://www.tjap.jus.br/portal/",
    loginInfo: {
      multiSystem: true,
      systems: [
        { name: "Tucujuris", url1: "https://tucujuris.tjap.jus.br/pages/login/", url2: "https://tucujuris.tjap.jus.br/pages/login/" },
        { name: "PJe", url1: "https://pje.tjap.jus.br/1g/login.seam", url2: "https://pje.tjap.jus.br/2g/login.seam" }
      ]
    }
  },
  "804": {
    name: "TJAM",
    url1aInstancia: "https://consultasaj.tjam.jus.br/cpopg/open.do",
    url2aInstancia: "https://consultasaj.tjam.jus.br/cposg5/open.do",
    loginInfo: {
      multiSystem: true,
      systems: [
        { name: "Projudi", url1: "https://projudi.tjam.jus.br/projudi/", url2: "https://projudi.tjam.jus.br/projudi/" },
        { name: "SAJ", url1: "https://consultasaj.tjam.jus.br/sajpg/login.do", url2: "https://consultasaj.tjam.jus.br/sajsg/login.do" }
      ]
    }
  },
  "805": {
    name: "TJBA",
    url1aInstancia: "https://www.tjba.jus.br/portal/",
    url2aInstancia: "https://www.tjba.jus.br/portal/",
    loginInfo: {
      multiSystem: true,
      systems: [
        { name: "Projudi", url1: "https://projudi.tjba.jus.br/projudi/", url2: "https://projudi.tjba.jus.br/projudi/" },
        { name: "PJe", url1: "https://pje.tjba.jus.br/pje/login.seam", url2: "https://pje2g.tjba.jus.br/pje/login.seam" }
      ]
    }
  },
  "806": {
    name: "TJCE",
    url1aInstancia: "https://consultaprocesso.tjce.jus.br/scpu-web/pages/administracao/consultaProcessual.jsf",
    url2aInstancia: "https://consultaprocesso.tjce.jus.br/scpu-web/pages/administracao/consultaProcessual.jsf",
    loginInfo: {
      multiSystem: true,
      systems: [
        { name: "PJe", url1: "https://pje.tjce.jus.br/pje/", url2: "https://pje.tjce.jus.br/pje2grau/" },
        { name: "SAJ", url1: "https://esaj.tjce.jus.br/sajpg/login.do", url2: "https://esaj.tjce.jus.br/sajsg/login.do" }
      ]
    }
  },
  "807": {
    name: "TJDFT",
    url1aInstancia: "https://pje.tjdft.jus.br/pje/ConsultaPublica/listView.seam",
    url2aInstancia: "https://pje2i.tjdft.jus.br/pje/ConsultaPublica/listView.seam",
    loginInfo: {
      url1: "https://pje.tjdft.jus.br/pje/",
      url2: "https://pje2i.tjdft.jus.br/pje/"
    }
  },
  "808": {
    name: "TJES",
    url1aInstancia: "https://pje.tjes.jus.br/pje/ConsultaPublica/listView.seam",
    url2aInstancia: "https://pje.tjes.jus.br/pje2g/ConsultaPublica/listView.seam",
    loginInfo: {
      url1: "https://pje.tjes.jus.br/pje/",
      url2: "https://pje.tjes.jus.br/pje2g/"
    }
  },
  "809": {
    name: "TJGO",
    url1aInstancia: "https://www.tjgo.jus.br/",
    url2aInstancia: "https://www.tjgo.jus.br/",
    loginInfo: {
      url1: "https://projudi.tjgo.jus.br/",
      url2: "https://projudi.tjgo.jus.br/"
    }
  },
  "810": {
    name: "TJMA",
    url1aInstancia: "https://pje.tjma.jus.br/pje/ConsultaPublica/listView.seam",
    url2aInstancia: "https://pje2.tjma.jus.br/pje2g/ConsultaPublica/listView.seam",
    loginInfo: {
      url1: "https://pje.tjma.jus.br/pje/",
      url2: "https://pje2.tjma.jus.br/pje2g/"
    }
  },
  "811": {
    name: "TJMT",
    url1aInstancia: "https://consultaprocessual.tjmt.jus.br/",
    url2aInstancia: "https://consultaprocessual.tjmt.jus.br/",
    loginInfo: {
      url1: "https://pje.tjmt.jus.br/pje/",
      url2: "https://pje.tjmt.jus.br/pje/"
    }
  },
  "812": {
    name: "TJMS",
    url1aInstancia: "https://esaj.tjms.jus.br/cpopg5/open.do",
    url2aInstancia: "https://esaj.tjms.jus.br/cposg5/open.do",
    loginInfo: {
      url1: "https://esaj.tjms.jus.br/sajpg/login.do",
      url2: "https://esaj.tjms.jus.br/sajsg/login.do"
    }
  },
  "813": {
    name: "TJMG",
    url1aInstancia: "https://pje-consulta-publica.tjmg.jus.br/",
    url2aInstancia: "https://www.tjmg.jus.br/",
    loginInfo: {
      multiSystem: true,
      systems: [
        { name: "PJe/JPe", url1: "https://pje.tjmg.jus.br/pje/", url2: "https://jpe.tjmg.jus.br/" },
        { name: "Eproc", url1: "https://eproc1g.tjmg.jus.br/eproc/", url2: "https://eproc2g.tjmg.jus.br/eproc/" }
      ]
    }
  },
  "814": {
    name: "TJPA",
    url1aInstancia: "https://consultas.tjpa.jus.br/consultaunificada/consulta/principal",
    url2aInstancia: "https://consultas.tjpa.jus.br/consultaunificada/consulta/principal",
    loginInfo: {
      url1: "https://pje.tjpa.jus.br/pje/",
      url2: "https://pje.tjpa.jus.br/pje/"
    }
  },
  "815": {
    name: "TJPB",
    url1aInstancia: "http://pje.tjpb.jus.br/pje/ConsultaPublica/listView.seam",
    url2aInstancia: "http://pje.tjpb.jus.br/pje2g/ConsultaPublica/listView.seam",
    loginInfo: {
      url1: "https://pje.tjpb.jus.br/pje/",
      url2: "https://pje.tjpb.jus.br/pje2g/"
    }
  },
  "816": {
    name: "TJPR",
    url1aInstancia: "https://consulta.tjpr.jus.br/projudi_consulta/processo/consultaPublica.do?actionType=iniciar",
    url2aInstancia: "https://consulta.tjpr.jus.br/projudi_consulta/processo/consultaPublica.do?actionType=iniciar",
    loginInfo: {
      multiSystem: true,
      systems: [
        { name: "Projudi", url1: "https://projudi.tjpr.jus.br/projudi/", url2: "https://projudi.tjpr.jus.br/projudi/" },
        { name: "Eproc", url1: "http://eproc1g.tjpr.jus.br/", url2: "http://eproc2g.tjpr.jus.br/" }
      ]
    }
  },
  "817": {
    name: "TJPE",
    url1aInstancia: "https://srv01.tjpe.jus.br/consultaprocessualunificada/processo/",
    url2aInstancia: "https://srv01.tjpe.jus.br/consultaprocessualunificada/processo/",
    loginInfo: {
      url1: "https://pje.tjpe.jus.br/1g/",
      url2: "https://pje.tjpe.jus.br/2g/"
    }
  },
  "818": {
    name: "TJPI",
    url1aInstancia: "https://pje.tjpi.jus.br/1g/ConsultaPublica/listView.seam",
    url2aInstancia: "https://pje.tjpi.jus.br/2g/ConsultaPublica/listView.seam",
    loginInfo: {
      url1: "https://pje.tjpi.jus.br/1g/",
      url2: "https://pje.tjpi.jus.br/2g/"
    }
  },
  "819": {
    name: "TJRJ",
    url1aInstancia: "https://www.tjrj.jus.br/sistemas-judiciais",
    url2aInstancia: "https://www.tjrj.jus.br/sistemas-judiciais",
    loginInfo: {
      multiSystem: true,
      systems: [
        { name: "PJe", url1: "https://tjrj.pje.jus.br/1g/", url2: "https://tjrj.pje.jus.br/2g/" },
        { name: "Eproc", url1: "https://eproc1g.tjrj.jus.br/eproc/", url2: "https://eproc2g.tjrj.jus.br/eproc/" }
      ]
    }
  },
  "820": {
    name: "TJRN",
    url1aInstancia: "https://pje1gconsulta.tjrn.jus.br/consultapublica/ConsultaPublica/listView.seam",
    url2aInstancia: "https://pje2gconsulta.tjrn.jus.br/consultapublica/ConsultaPublica/listView.seam",
    loginInfo: {
      url1: "https://pje1g.tjrn.jus.br/pje/",
      url2: "https://pje2g.tjrn.jus.br/pje/"
    }
  },
  "821": {
    name: "TJRS",
    url1aInstancia: "https://www.tjrs.jus.br/novo/busca/?return=proc&client=wp_index",
    url2aInstancia: "https://www.tjrs.jus.br/novo/busca/?return=proc&client=wp_index",
    loginInfo: {
      url1: "https://eproc1g.tjrs.jus.br/eproc/",
      url2: "https://eproc2g.tjrs.jus.br/eproc/"
    }
  },
  "822": {
    name: "TJRO",
    url1aInstancia: "https://pjepg.tjro.jus.br/consulta/ConsultaPublica/listView.seam",
    url2aInstancia: "https://pjesg.tjro.jus.br/consulta/ConsultaPublica/listView.seam",
    loginInfo: {
      url1: "https://pjepg.tjro.jus.br/pje/",
      url2: "https://pjesg.tjro.jus.br/pje/"
    }
  },
  "823": {
    name: "TJRR",
    url1aInstancia: "https://projudi.tjrr.jus.br/projudi/consultaPublica.jsp",
    url2aInstancia: "https://projudi.tjrr.jus.br/projudi/consultaPublica.jsp",
    loginInfo: {
      url1: "https://projudi.tjrr.jus.br/projudi/",
      url2: "https://projudi.tjrr.jus.br/projudi/"
    }
  },
  "824": {
    name: "TJSC",
    url1aInstancia: "https://eprocwebcon.tjsc.jus.br/consulta1g/externo_controlador.php?acao=processo_consulta_publica",
    url2aInstancia: "https://eprocwebcon.tjsc.jus.br/consulta2g/externo_controlador.php?acao=processo_consulta_publica",
    loginInfo: {
      url1: "https://eproc1g.tjsc.jus.br/eproc/",
      url2: "https://eproc2g.tjsc.jus.br/eproc/"
    }
  },
  "825": {
    name: "TJSE",
    url1aInstancia: "https://www.tjse.jus.br/portal/consultas/nova-consulta-processual",
    url2aInstancia: "https://www.tjse.jus.br/portal/consultas/nova-consulta-processual",
    loginInfo: {
      multiSystem: true,
      systems: [
        { name: "SCPV", url1: "https://www.tjse.jus.br/controleacesso/paginas/loginTJSE.tjse", url2: "https://www.tjse.jus.br/controleacesso/paginas/loginTJSE.tjse" },
        { name: "Eproc", url1: "https://eproc1g.tjse.jus.br/eproc/", url2: "https://eproc2g.tjse.jus.br/eproc/" }
      ]
    }
  },
  "826": {
    name: "TJSP",
    url1aInstancia: "https://esaj.tjsp.jus.br/cpopg/open.do",
    url2aInstancia: "https://esaj.tjsp.jus.br/cposg/open.do",
    loginInfo: {
      multiSystem: true,
      systems: [
        { name: "E-Saj", url1: "https://esaj.tjsp.jus.br/esaj?servico=819999", url2: "https://esaj.tjsp.jus.br/esaj?servico=819999" },
        { name: "Eproc", url1: "https://eproc1g.tjsp.jus.br/eproc", url2: "https://eproc2g.tjsp.jus.br/eproc" }
      ]
    }
  },
  "827": {
    name: "TJTO",
    url1aInstancia: "https://eproc1.tjto.jus.br/eprocV2_prod_1grau/externo_controlador.php?acao=tjto@md_tjto_consulta_publica/paginaLogin",
    url2aInstancia: "https://eproc2.tjto.jus.br/eprocV2_prod_2grau/externo_controlador.php?acao=tjto@md_tjto_consulta_publica/paginaLogin",
    loginInfo: {
      url1: "https://eproc1.tjto.jus.br/eprocV2_prod_1grau/",
      url2: "https://eproc2.tjto.jus.br/eprocV2_prod_2grau/"
    }
  },

  // TRIBUNAIS REGIONAIS FEDERAIS
  "401": {
    name: "TRF1",
    url1aInstancia: "https://pje1g.trf1.jus.br/consultapublica/ConsultaPublica/listView.seam",
    url2aInstancia: "https://pje2g.trf1.jus.br/consultapublica/ConsultaPublica/listView.seam",
    loginInfo: {
      url1: "https://pje1g.trf1.jus.br/pje/",
      url2: "https://pje2g.trf1.jus.br/pje/"
    }
  },
  "402": {
    name: "TRF2",
    url1aInstancia: "https://www.trf2.jus.br/jf2/acesso-aos-sistemas-processuais",
    url2aInstancia: "https://eproc.trf2.jus.br/eproc/externo_controlador.php?acao=processo_consulta_publica",
    loginInfo: {
      sections: [
        { name: "TRF2 (2ª Instância / Geral)", url: "https://eproc.trf2.jus.br/eproc/" },
        { name: "JFES (Espírito Santo)", url: "https://eproc.jfes.jus.br/eproc/" },
        { name: "JFRJ (Rio de Janeiro)", url: "https://eproc.jfrj.jus.br/eproc/" }
      ]
    }
  },
  "403": {
    name: "TRF3",
    url1aInstancia: "https://pje1g.trf3.jus.br/pje/ConsultaPublica/listView.seam",
    url2aInstancia: "https://pje2g.trf3.jus.br/pje/ConsultaPublica/listView.seam",
    loginInfo: {
      url1: "https://pje1g.trf3.jus.br/pje/",
      url2: "https://pje2g.trf3.jus.br/pje/"
    }
  },
  "404": {
    name: "TRF4",
    url1aInstancia: "https://www.trf4.jus.br/trf4/controlador.php?acao=principal&",
    url2aInstancia: "https://www.trf4.jus.br/trf4/controlador.php?acao=principal&",
    loginInfo: {
      sections: [
        { name: "TRF4 (2ª Instância)", url: "https://eproc.trf4.jus.br/eproc2trf4/" },
        { name: "JFPR (Paraná)", url: "https://eproc.jfpr.jus.br/eprocV2/" },
        { name: "JFRS (Rio Grande do Sul)", url: "https://eproc.jfrs.jus.br/eprocV2/" },
        { name: "JFSC (Santa Catarina)", url: "https://eproc.jfsc.jus.br/eprocV2/" }
      ]
    }
  },
  "405": {
    name: "TRF5",
    url1aInstancia: "https://portalbi.trf5.jus.br/portal-bi/painel.html?id=3002",
    url2aInstancia: "https://portalbi.trf5.jus.br/portal-bi/painel.html?id=3002",
    loginInfo: {
      url1: "https://pje1g.trf5.jus.br/pje/login.seam",
      url2: "https://pjett.trf5.jus.br/pje/login.seam"
    }
  },
  "406": {
    name: "TRF6",
    url1aInstancia: "https://eproc1g.trf6.jus.br/eproc/externo_controlador.php?acao=processo_consulta_publica",
    url2aInstancia: "https://eproc2g.trf6.jus.br/eproc/externo_controlador.php?acao=processo_consulta_publica",
    loginInfo: {
      multiSystem: true,
      systems: [
        { name: "PJe", url1: "https://pje1g.trf6.jus.br/", url2: "https://pje2g.trf6.jus.br/" },
        { name: "Eproc", url1: "http://eproc1g.trf6.jus.br/", url2: "http://eproc2g.trf6.jus.br/" }
      ]
    }
  },

  // Tribunais Superiores
  "00": { name: "STF", url: "https://portal.stf.jus.br/processos/detalhe.asp?incidente=" },
  "90": { name: "STJ", url: "https://www.stj.jus.br/sites/portalp/Processos/Consulta-Processual/Consulta-Processual-Completa?num_registro=" },
  "91": { name: "TST", url: "https://consultas.tst.jus.br/processos/consultaProcessual/consultaProcessual.tst?numeroProcesso=" },
  "92": { name: "TSE", url: "https://www.tse.jus.br/servicos/processos/consulta-publica-unificada?numeroProcesso=" },
  "93": { name: "STM", url: "https://www.stm.jus.br/servicos-do-stm/consulta-processual?numeroProcesso=" }
};
