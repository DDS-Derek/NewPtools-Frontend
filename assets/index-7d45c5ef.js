import{H as k}from"./core-0c93702d.js";import{$ as C}from"./tools-02fa809c.js";import{W as w,r as p,d as z,$ as B,I as u,J as m,K as f,U as r,O as s,N,S as d,c as g,F as R,a6 as U,R as V}from"./vue-2fe8e408.js";import{d as $,b as j}from"./index-3b7beba8.js";import{S as q,E,r as F,M as H,aq as I}from"./naiveUI-b2d6307e.js";import"./lodash-79346de8.js";import"./ionicons5-79f37bee.js";const J=w("shell",()=>{const{message:t}=$(),e=p(""),n=p([""]),c=p([{label:"清除屏幕",key:"clear"},{label:"更新依赖",key:"pip install -r requirements.txt -U"},{label:"更新代码",key:"git pull"},{label:"初始化代码",key:"git clean -df && git reset --hard"},{label:"同步数据库",key:"python manage.py migrate"}]),o=async l=>await C(l);return{shell:e,results:n,options:c,exec_shell:async l=>{if(l.length<=0){t==null||t.error("命令不能为空！"),e.value="";return}if(n.value.unshift(e.value),e.value==="clear")n.value.length=0;else{const a=await o(e.value);n.value.splice(1,0,a)}e.value=""},sendCommand:o}}),T={class:"pt-5px"},G={class:"mb-2 px-5px"},K={class:"code"},L=z({__name:"index",setup(t){const e=J(),{shell:n,results:c,options:o}=B(e),{exec_shell:_}=e;return(l,a)=>{const h=q,v=E,x=F,y=H,S=I;return u(),m("div",T,[f("div",G,[r(h,{value:s(n),"onUpdate:value":a[0]||(a[0]=i=>N(n)?n.value=i:null),size:"small",class:"mr-2",onChange:s(_)},null,8,["value","onChange"]),r(x,{size:"small",trigger:"hover",options:s(o),onSelect:s(_)},{default:d(()=>[r(v,{size:"tiny",type:"warning"},{default:d(()=>[g(" 选择命令 ")]),_:1})]),_:1},8,["options","onSelect"]),r(y,{type:"error",size:"small"},{default:d(()=>[g(" 回车发送命令，危险动作，不懂勿动。 ")]),_:1})]),f("div",K,[(u(!0),m(R,null,U(s(c),(i,b)=>(u(),V(S,{key:b,class:"px-3px",language:"Shell",code:i,hljs:s(k)},null,8,["code","hljs"]))),128))])])}}});const X=j(L,[["__scopeId","data-v-45a0fcde"]]);export{X as default};
