(this.webpackJsonpscrumtools=this.webpackJsonpscrumtools||[]).push([[0],{29:function(e,t,a){},30:function(e,t,a){},31:function(e,t,a){},33:function(e,t,a){},34:function(e,t,a){},52:function(e,t,a){},53:function(e,t,a){"use strict";a.r(t);var n,s=a(0),c=a.n(s),i=a(9),l=a.n(i),o=(a(29),a(6)),r=a(2),m=(a(30),a(31),a.p+"static/media/play.b31da51e.svg"),d=a.p+"static/media/pause.418b9d2a.svg",u=a.p+"static/media/reset.377fbb94.svg",b=a.p+"static/media/next.178cb9e4.svg",j=a(1),h=function(e){var t=e.getDate(),a=e.getMonth()+1,n=e.getFullYear(),s=t.toString(),c=a.toString();return t<10&&(s="0"+t),a<10&&(c="0"+a),n+c+s},g=function(e){var t=Object(s.useState)(0),a=Object(r.a)(t,2),n=a[0],c=a[1],i=Object(s.useState)(180),l=Object(r.a)(i,2),o=l[0],h=l[1],g=O(0,e.setIndex,e.index,e.members,c,h),f=g.timer,x=g.isActive,v=g.isPaused,p=g.handleStart,y=g.handlePause,N=g.handleResume,D=g.handleReset,S=g.handlePrev,k=g.handleNext,I=Object(s.useState)(new Date),w=Object(r.a)(I,2),C=w[0],T=w[1],_=function(){c(n+10),h(o-10)};return setInterval((function(){0===(new Date).getSeconds()&&T(new Date)}),1e3),Object(j.jsx)("div",{className:"stopWatch-container",children:Object(j.jsx)("div",{className:"stopWatch",children:Object(j.jsxs)("div",{className:"stopwatch-card",style:{color:"rgb(".concat(n,",").concat(o,",0)")},children:[Object(j.jsx)("div",{className:"currentTime "+function(e){var t="beforeTime";return e.getHours()>=10?t="overTime":9===e.getHours()&&e.getMinutes()>=30&&(t=e.getMinutes()>=55?"closeToEnd":"inTime"),t}(C),children:C.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}),Object(j.jsx)("p",{className:"stopWatch__timer",children:function(e){var t=Math.floor(e/60),a=parseInt("".concat(e%60).slice(-2));return x&&v&&t<3&&setTimeout((function(){a>0&&a%10===0&&_()}),1e3),function(e){var t="0".concat(e%60).slice(-2),a="".concat(Math.floor(e/60)),n="0".concat(a%60).slice(-2),s="0".concat(Math.floor(e/3600)).slice(-2);return"".concat(s," : ").concat(n," : ").concat(t)}(e)}(f)}),Object(j.jsxs)("div",{className:"buttons",children:[x||v?v?Object(j.jsx)("button",{className:"pauseButton",onClick:y,children:Object(j.jsx)("img",{src:d,alt:"Pause"})}):Object(j.jsx)("button",{className:"resumeButton",onClick:N,children:Object(j.jsx)("img",{src:m,alt:"Resume"})}):Object(j.jsx)("button",{className:"startButton",onClick:p,children:Object(j.jsx)("img",{src:m,alt:"Play"})}),Object(j.jsx)("button",{className:"resetButton",onClick:function(){D()},disabled:!x,children:Object(j.jsx)("img",{src:u,alt:"Reset"})}),Object(j.jsx)("button",{className:"prevButton"+(0===e.index?" disabled":""),onClick:function(){S()},children:Object(j.jsx)("img",{src:b,alt:"Prev"})}),Object(j.jsx)("button",{className:"nextButton"+(e.index===e.members.length-1?" disabled":""),onClick:function(){k()},children:Object(j.jsx)("img",{src:b,alt:"Next"})})]})]})})})},O=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1?arguments[1]:void 0,a=arguments.length>2?arguments[2]:void 0,n=arguments.length>3?arguments[3]:void 0,s=arguments.length>4?arguments[4]:void 0,i=arguments.length>5?arguments[5]:void 0,l=c.a.useState(e),o=Object(r.a)(l,2),m=o[0],d=o[1],u=c.a.useState(!1),b=Object(r.a)(u,2),j=b[0],g=b[1],O=c.a.useState(!1),f=Object(r.a)(O,2),x=f[0],v=f[1],p=c.a.useRef(),y=document.getElementsByClassName("listContainer")[0],N=function(){g(!0),D()},D=function(){v(!0),p.current=setInterval((function(){d((function(e){return e+1}))}),1e3)},S=function(){clearInterval(p.current),v(!1)},k=function(){S(),g(!1),d(0),setTimeout((function(){s(0),i(180)}),1e3)},I=function(){a>0&&(m>0&&(C(),k()),t(a-1),a>1&&a<n.length-2&&(n.length-a)%2===0&&y.scroll({top:y.scrollTop-96,behavior:"smooth"}))},w=function(){a<n.length-1&&(m>0&&(C(),k()),t(a+1),a>1&&a<n.length-2&&a%2===0&&y.scroll({top:y.scrollTop+96,behavior:"smooth"}))},C=function(){var e=localStorage.getItem("scrumtools-members");if(e&&(null===e||void 0===e?void 0:e.length)>0&&n[a]){var t=n[a];h(new Date);0===t.dailyData.time?t.dailyData.time=m:t.dailyData.time+=m,localStorage.setItem("scrumtools-members",JSON.stringify(n))}};return{timer:m,isActive:j,isPaused:x,handleStart:N,handlePause:S,handleResume:D,handleReset:k,handlePrev:I,handleNext:w}};a(33);!function(e){e[e.none=0]="none",e[e.OK=1]="OK",e[e.NEEDSHELP=2]="NEEDSHELP",e[e.BLOCKED=3]="BLOCKED"}(n||(n={}));var f=function(e){var t="0".concat(e%60).slice(-2),a="".concat(Math.floor(e/60)),n="0".concat(a%60).slice(-2),s="0".concat(Math.floor(e/3600)).slice(-2);return"".concat(s," : ").concat(n," : ").concat(t)},x=function(e){var t=e.members,a=e.setMembers;Object(s.useEffect)((function(){console.log("members",t)}),[t]);var c="",i=0;Object(s.useEffect)((function(){localStorage.removeItem("scrumtools-members"),localStorage.setItem("scrumtools-members",JSON.stringify(t))}),[t]);return Object(j.jsxs)("div",{children:[Object(j.jsx)("ul",{className:"listContainer",children:t&&t.map((function(s,l){return c=l===e.speakingIndex?"active listItem":"listItem",c+=l%2===0?" left":" right",t&&e.speakingIndex>=t.length&&e.setSpeakingIndex(0),i+=s.dailyData.time,Object(j.jsxs)("li",{className:c,children:[Object(j.jsx)("p",{className:"memberName",onClick:function(){!function(t){e.setSpeakingIndex(t)}(l)},children:s.name}),Object(j.jsx)("p",{className:"memberFlag",children:Object(j.jsx)("span",{className:"memberFlagIcon","data-status":s.dailyData.status.toString(),onClick:function(){!function(e){t[e].dailyData.status+=1,t[e].dailyData.status>n.BLOCKED&&(t[e].dailyData.status=n.none),a(Object(o.a)(t))}(l),console.log("member.dailyData.status",s.dailyData.status)}})}),Object(j.jsxs)("p",{className:"memberTime",children:[Object(j.jsx)("button",{className:"resetDailyTime",onClick:function(){!function(e){t[e].dailyData.time=0,a(Object(o.a)(t))}(l)},children:Object(j.jsx)("img",{src:u,alt:"Reset"})}),Object(j.jsx)("span",{style:{color:s.dailyData.time>=180?"rgb(180,0,0)":s.dailyData.time>=120?"orange":"rgb(0,180,0)"},children:f(s.dailyData.time).replace(/ /g,"")})]})]},s.name)}))}),Object(j.jsxs)("div",{className:"totalDailyTime",children:[Object(j.jsx)("h4",{children:"Total daily time:"}),Object(j.jsx)("span",{className:"totalDailyTimeValue "+(i>180*t.length?"overTime":i>180*t.length-300?"closeToEnd":i>0?"inTime":""),children:f(i).replace(/ /g,"")})]})]})},v=(a(34),function(e){return Object(j.jsxs)("div",{className:"pdContainer",children:[Object(j.jsx)("h3",{className:"pdTitle",children:"Prime Directive"}),Object(j.jsx)("p",{className:"pdContent",children:e.content}),Object(j.jsx)("p",{className:"pdAuthor",children:e.author})]})}),p=a(23),y=(a(50),a(51),a(52),{lg:2400,md:1800,sm:1100,xs:700,xxs:0}),N={lg:20,md:16,sm:12,xs:8,xxs:4},D=function(e){var t=e.TeamMembers,a=e.setMembers,n=[],s=function(e){var n=e.target.parentNode.querySelector(".memberName").innerHTML;a(t.filter((function(e){return e.name!==n})))};return Object(j.jsx)(p.Responsive,{isDraggable:!0,isResizable:!1,style:{width:"450px",overflowY:"auto",minHeight:"10rem",maxHeight:"10rem"},containerPadding:[0,0],breakpoints:y,cols:N,rowHeight:6,margin:[10,10],onLayoutChange:function(e){console.log("layoutChanged",e),e.sort((function(e,t){return e.y>t.y?1:e.y<t.y?-1:0})),e.map((function(e){return n.push({name:e.i})})),a(n)},width:450,children:t.map((function(e,t){return Object(j.jsxs)("div",{className:"layoutItem active","data-grid":{x:0,y:t,w:3,h:3},children:[Object(j.jsx)("p",{className:"memberName",children:e.name}),Object(j.jsx)("span",{className:"removeMember",onClick:s,children:"x"})]},e.name)}))})};var S=a.p+"static/media/theme-icon.9a0c0f53.svg";var k=function(){var e=Object(s.useState)(+(localStorage.getItem("scrumtools-speaking")||"0")),t=Object(r.a)(e,2),a=t[0],c=t[1],i=Object(s.useState)(function(){var e=localStorage.getItem("scrumtools-members");if(e&&(null===e||void 0===e?void 0:e.length)>0)return JSON.parse(e);return[]}()),l=Object(r.a)(i,2),m=l[0],d=l[1],u=Object(s.useState)(!1),b=Object(r.a)(u,2),h=b[0],O=b[1],f=Object(s.useState)(localStorage.getItem("scrumtools-theme")||"dark"),p=Object(r.a)(f,2),y=p[0],N=p[1],k=Object(s.useState)(""),w=Object(r.a)(k,2),C=w[0],T=w[1];Object(s.useEffect)((function(){localStorage.setItem("scrumtools-theme",y)}),[y]),Object(s.useEffect)((function(){localStorage.setItem("scrumtools-speaking",a.toString())}),[a]);var _=function(){if(""!==C){var e={name:C,dailyData:{date:new Date,status:n.none,time:0}};localStorage.setItem("scrumtools-members",JSON.stringify([].concat(Object(o.a)(m),[e]))),d([].concat(Object(o.a)(m),[e]))}};return Object(j.jsxs)("div",{className:"App "+y,children:[Object(j.jsx)("div",{className:"themeSwitcher",onClick:function(){N("dark"===y?"light":"dark")},children:Object(j.jsx)("img",{src:S,alt:"Change theme"})}),Object(j.jsx)(g,{index:a,setIndex:c,members:m}),Object(j.jsx)("div",{className:"daily-script",children:Object(j.jsxs)("ul",{className:"daily-script__list",children:[Object(j.jsx)("li",{className:"daily-script__list_item",children:"What I did last day"}),Object(j.jsx)("li",{className:"daily-script__list_item",children:"What I am going to do today"}),Object(j.jsx)("li",{className:"daily-script__list_item",children:"I have (not) blockers"}),Object(j.jsx)("li",{className:"daily-script__list_item",children:"I think AC & SP for my task are (not) OK"})]})}),Object(j.jsxs)("div",{className:"memberList",children:[Object(j.jsx)("h3",{className:"members-title",children:"Members"}),Object(j.jsxs)("button",{className:"editButton",onClick:function(){return O(!h)},children:[" ",h?"Save":"Edit"]}),h?Object(j.jsxs)("div",{children:[Object(j.jsx)("div",{className:"generate-members",children:Object(j.jsx)("button",{className:"generate-members__button",onClick:I,children:"Generate Pandora members"})}),Object(j.jsxs)("li",{className:"listItem inputMember",children:[Object(j.jsx)("div",{className:"form-field__control",children:Object(j.jsx)("input",{className:"form-field__input",type:"text",value:C,onChange:function(e){return T(e.target.value)},placeholder:"New member's name",onKeyDown:function(e){"NumpadEnter"!==e.code&&"Enter"!==e.code||_()}})}),Object(j.jsx)("button",{className:"addMember",onClick:_,children:"+"})]}),Object(j.jsx)(D,{TeamMembers:m,setMembers:d})]}):Object(j.jsx)(x,{members:m,setMembers:d,speakingIndex:a,setSpeakingIndex:c})]}),Object(j.jsx)(v,{content:" Regardless of what we discover, we understand and truly believe that everyone did the best job they could, given what they knew at the time, their skills and abilities, the resources available, and the situation at hand. ",author:"--Norm Kerth"})]})};function I(){var e=[{name:"Chao",email:"chao.hu@alten.es",dailyData:{date:new Date,status:n.none,time:0}},{name:"Mike",email:"miguel.garciac@alten.es",dailyData:{date:new Date,status:n.none,time:0}},{name:"Javi",email:"franciscoj.cuevas@alten.es",dailyData:{date:new Date,status:n.none,time:0}},{name:"Yon",email:"yon.cuadrado@alten.es",dailyData:{date:new Date,status:n.none,time:0}},{name:"Luismi",email:"luism.rambla@alten.es",dailyData:{date:new Date,status:n.none,time:0}},{name:"Fran",email:"fjose.cruz@alten.es",dailyData:{date:new Date,status:n.none,time:0}},{name:"Ale",email:"alejandro.hidalgo@alten.es",dailyData:{date:new Date,status:n.none,time:0}},{name:"Diego",email:"diego.ortegav@alten.es",dailyData:{date:new Date,status:n.none,time:0}},{name:"Jes\xfas",email:"jesusm.guzman@alten.es",dailyData:{date:new Date,status:n.none,time:0}},{name:"Martin",email:"martin.sollenberg@se.abb.com",dailyData:{date:new Date,status:n.none,time:0}}];localStorage.setItem("scrumtools-members",JSON.stringify(e))}var w=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,54)).then((function(t){var a=t.getCLS,n=t.getFID,s=t.getFCP,c=t.getLCP,i=t.getTTFB;a(e),n(e),s(e),c(e),i(e)}))},C=a(24);l.a.render(Object(j.jsx)(C.a,{basename:"",children:Object(j.jsx)(k,{})}),document.getElementById("root")),w()}},[[53,1,2]]]);
//# sourceMappingURL=main.f7f1e758.chunk.js.map