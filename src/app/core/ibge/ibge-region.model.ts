//ref: https://servicodados.ibge.gov.br/api/v1/localidades/municipios?orderBy=nome

export interface IbgeRegion {
    id: number;
    nome: string;
    microrregiao: Microrregiao;
}

export interface Microrregiao {
    id: number;
    nome: string;
    mesorregiao: Mesorregiao;
}

export interface Mesorregiao {
    id: number;
    nome: string;
    UF: Uf;
}

export interface Uf {
    id: number;
    sigla: Sigla;
    nome: Nome;
    regiao?: Uf;
}

export enum Nome {
    Acre = 'Acre',
    Alagoas = 'Alagoas',
    Amapa = 'Amapá',
    Amazonas = 'Amazonas',
    Bahia = 'Bahia',
    Ceara = 'Ceará',
    CentroOeste = 'Centro-Oeste',
    DistritoFederal = 'Distrito Federal',
    EspiritoSanto = 'Espírito Santo',
    Goias = 'Goiás',
    Maranhao = 'Maranhão',
    MatoGrosso = 'Mato Grosso',
    MatoGrossoDoSul = 'Mato Grosso do Sul',
    MinasGerais = 'Minas Gerais',
    Nordeste = 'Nordeste',
    Norte = 'Norte',
    Parana = 'Paraná',
    Paraiba = 'Paraíba',
    Para = 'Pará',
    Pernambuco = 'Pernambuco',
    Piaui = 'Piauí',
    RioDeJaneiro = 'Rio de Janeiro',
    RioGrandeDoNorte = 'Rio Grande do Norte',
    RioGrandeDoSul = 'Rio Grande do Sul',
    Rondonia = 'Rondônia',
    Roraima = 'Roraima',
    SantaCatarina = 'Santa Catarina',
    Sergipe = 'Sergipe',
    Sudeste = 'Sudeste',
    Sul = 'Sul',
    SaoPaulo = 'São Paulo',
    Tocantins = 'Tocantins',
}

export enum Sigla {
    AC = 'AC',
    AL = 'AL',
    AM = 'AM',
    AP = 'AP',
    BA = 'BA',
    CE = 'CE',
    CO = 'CO',
    DF = 'DF',
    ES = 'ES',
    GO = 'GO',
    MS = 'MS',
    MT = 'MT',
    MA = 'MA',
    MG = 'MG',
    N = 'N',
    NE = 'NE',
    PE = 'PE',
    PR = 'PR',
    PA = 'PA',
    PB = 'PB',
    PI = 'PI',
    RJ = 'RJ',
    RN = 'RN',
    RO = 'RO',
    RR = 'RR',
    RS = 'RS',
    S = 'S',
    SE = 'SE',
    SP = 'SP',
    SC = 'SC',
    TO = 'TO',
}



