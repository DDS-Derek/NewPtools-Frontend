import{k as a,l as s,p as r,d as i}from"./index-3acd25b9.js";const{message:e}=i(),u=async()=>await a("config/log"),g=async n=>await a("config/log/content",{file_name:n}),d=async n=>await s("config/log/download",{file_name:n},{responseType:"blob"}),f=async n=>{const{code:o,msg:t}=await r("config/log",{file_name:n});switch(o){case 0:return t.length>0&&(e==null||e.success(t,{keepAliveOnHover:!0})),!0;default:return e==null||e.warning(t,{keepAliveOnHover:!0}),!1}},w=async n=>{const{code:o,msg:t,data:c}=await s("config/shell",{command:n});switch(o){case 0:return t.length>0&&(e==null||e.success(t,{keepAliveOnHover:!0})),c;default:return e==null||e.warning(t,{keepAliveOnHover:!0}),!1}};export{w as $,u as a,g as b,d as c,f as d};