!function(){function o(o,t){if(!(o instanceof t))throw new TypeError("Cannot call a class as a function")}function t(o,t){for(var n=0;n<t.length;n++){var e=t[n];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(o,e.key,e)}}function n(o,n,e){return n&&t(o.prototype,n),e&&t(o,e),o}(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{"1mLW":function(t,e,r){"use strict";r.r(e),r.d(e,"ReportPageModule",(function(){return y}));var i,a,c,b,s=r("ofXK"),l=r("3Pt+"),p=r("TEn/"),d=r("tyNb"),u=r("mR7G"),g=r("fXoL"),f=r("2lXd"),m=((i=function(){function t(n,e,r){o(this,t),this.router=n,this.activeRoute=e,this.ibgeService=r}return n(t,[{key:"ngOnInit",value:function(){var o=this;this.activeRoute.data.subscribe((function(t){t&&t.list&&(o.report=t.list[0])}))}},{key:"goToFavorites",value:function(){this.router.navigateByUrl(u.a.favorite.home)}}]),t}()).\u0275fac=function(o){return new(o||i)(g.Hb(d.g),g.Hb(d.a),g.Hb(f.a))},i.\u0275cmp=g.Bb({type:i,selectors:[["app-report"]],decls:63,vars:13,consts:[[3,"translucent"],["color","primary"],["slot","start"],[1,"region-report"],["size","8"],[1,"region-report-row","region-report-row-confirmed"],["size","2"],["src","assets/icon/confirmed.svg"],[1,"region-report-detail"],[1,"region-report-row","region-report-row-death"],["src","assets/icon/death.svg"],["horizontal","center","vertical","bottom","slot","fixed"],[3,"click"],["name","heart"]],template:function(o,t){1&o&&(g.Mb(0,"ion-header",0),g.Mb(1,"ion-toolbar",1),g.Mb(2,"ion-buttons",2),g.Ib(3,"ion-menu-button"),g.Lb(),g.Mb(4,"ion-title"),g.mc(5,"Report"),g.Lb(),g.Lb(),g.Lb(),g.Mb(6,"ion-content",3),g.Mb(7,"ion-card"),g.Mb(8,"ion-card-header"),g.Mb(9,"ion-card-subtitle",1),g.mc(10),g.Xb(11,"date"),g.Lb(),g.Mb(12,"ion-card-title"),g.mc(13),g.Lb(),g.Lb(),g.Mb(14,"ion-card-content"),g.Mb(15,"ion-grid"),g.Mb(16,"ion-row"),g.Mb(17,"ion-col",4),g.mc(18," Popula\xe7\xe3o estimada "),g.Lb(),g.Mb(19,"ion-col"),g.Mb(20,"strong"),g.mc(21),g.Lb(),g.Lb(),g.Lb(),g.Mb(22,"ion-row",5),g.Mb(23,"ion-col",6),g.Ib(24,"img",7),g.Lb(),g.Mb(25,"ion-col"),g.Mb(26,"div",8),g.Mb(27,"small"),g.mc(28,"Casos confirmados"),g.Lb(),g.Mb(29,"strong"),g.mc(30),g.Lb(),g.Mb(31,"small"),g.mc(32,"Casos novos confirmados"),g.Lb(),g.Mb(33,"strong"),g.mc(34),g.Lb(),g.Lb(),g.Lb(),g.Lb(),g.Mb(35,"ion-row",9),g.Mb(36,"ion-col",6),g.Ib(37,"img",10),g.Lb(),g.Mb(38,"ion-col"),g.Mb(39,"div",8),g.Mb(40,"small"),g.mc(41,"\xd3bitos"),g.Lb(),g.Mb(42,"strong"),g.mc(43),g.Lb(),g.Mb(44,"small"),g.mc(45,"\xd3bitos novos"),g.Lb(),g.Mb(46,"strong"),g.mc(47),g.Lb(),g.Lb(),g.Lb(),g.Lb(),g.Mb(48,"ion-row"),g.Mb(49,"ion-col",4),g.mc(50," Confirmados por 100mil hab. "),g.Lb(),g.Mb(51,"ion-col"),g.Mb(52,"strong"),g.mc(53),g.Lb(),g.Lb(),g.Lb(),g.Mb(54,"ion-row"),g.Mb(55,"ion-col",4),g.mc(56," \xd3bitos por caso "),g.Lb(),g.Mb(57,"ion-col"),g.Mb(58,"strong"),g.mc(59),g.Lb(),g.Lb(),g.Lb(),g.Lb(),g.Lb(),g.Lb(),g.Mb(60,"ion-fab",11),g.Mb(61,"ion-fab-button",12),g.Ub("click",(function(){return t.goToFavorites()})),g.Ib(62,"ion-icon",13),g.Lb(),g.Lb(),g.Lb()),2&o&&(g.bc("translucent",!0),g.xb(10),g.oc("\xdaltima atualiza\xe7\xe3o: ",g.Yb(11,10,t.report.last_available_date,"dd/MM/yyyy"),""),g.xb(3),g.nc(t.report.city),g.xb(8),g.nc(t.report.estimated_population),g.xb(9),g.nc(t.report.last_available_confirmed),g.xb(4),g.nc(t.report.new_confirmed),g.xb(9),g.nc(t.report.last_available_deaths),g.xb(4),g.nc(t.report.new_deaths),g.xb(6),g.nc(t.report.last_available_confirmed_per_100k_inhabitants),g.xb(6),g.nc(t.report.last_available_death_rate))},directives:[p.o,p.I,p.c,p.z,p.H,p.j,p.d,p.f,p.g,p.h,p.e,p.n,p.D,p.i,p.k,p.l,p.p],pipes:[s.d],styles:[".region-report[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{font-size:larger}.region-report[_ngcontent-%COMP%]   ion-card-title[_ngcontent-%COMP%]{font-size:x-large}.region-report[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{position:absolute;top:50%;transform:translateY(-50%)}.region-report[_ngcontent-%COMP%]   .region-report-detail[_ngcontent-%COMP%]{display:flex;flex-direction:column;text-align:center}.region-report[_ngcontent-%COMP%]   .region-report-row[_ngcontent-%COMP%]{border-radius:30px;margin-bottom:15px}.region-report[_ngcontent-%COMP%]   .region-report-row.region-report-row-confirmed[_ngcontent-%COMP%]{border:1px dotted #f73838}.region-report[_ngcontent-%COMP%]   .region-report-row.region-report-row-death[_ngcontent-%COMP%]{border:1px dotted #333030}"]}),i),M=r("nYR2"),v=r("QdKM"),L=r("cRds"),h=r("TZpv"),w=[{path:"",component:m,resolve:{list:(a=function(){function t(n,e,r,i){o(this,t),this.datasetDataFullService=n,this.spinnerService=e,this.router=r,this.notificationService=i}return n(t,[{key:"resolve",value:function(o,t){var n=this,e=this.router.getCurrentNavigation().extras.state,r=e&&e.vo?e.vo:null;if(r){this.spinnerService.showLoading("Consultando regi\xe3o...");var i=new v.a;return i.city=r.name,this.datasetDataFullService.report(i).pipe(Object(M.a)((function(){return n.spinnerService.dismissLoading()})))}this.notificationService.showInfo("Busca regi\xe3o","N\xe3o foi poss\xedvel identificar a Regi\xe3o selecionada")}}]),t}(),a.\u0275fac=function(o){return new(o||a)(g.Qb(v.b),g.Qb(L.a),g.Qb(d.g),g.Qb(h.a))},a.\u0275prov=g.Db({token:a,factory:a.\u0275fac,providedIn:"root"}),a)}}],_=((b=function t(){o(this,t)}).\u0275mod=g.Fb({type:b}),b.\u0275inj=g.Eb({factory:function(o){return new(o||b)},imports:[[d.i.forChild(w)],d.i]}),b),y=((c=function t(){o(this,t)}).\u0275mod=g.Fb({type:c}),c.\u0275inj=g.Eb({factory:function(o){return new(o||c)},imports:[[s.b,l.e,p.K,_]]}),c)}}])}();