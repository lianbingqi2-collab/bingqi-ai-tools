'use strict';
let selected='home';
async function show(tool){
 if(!['home','performance','ess'].includes(tool))tool='home';
 selected=tool;document.querySelectorAll('nav [data-tool]').forEach(b=>b.classList.toggle('selected',b.dataset.tool===tool));
 document.getElementById('home').hidden=tool!=='home';document.getElementById('workspace').hidden=tool==='home';
 const loading=document.getElementById('loading'),error=document.getElementById('error');error.hidden=true;loading.hidden=true;
 for(const kind of ['performance','ess'])document.getElementById(kind+'-frame').hidden=kind!==tool;
 if(tool==='home')return;
 const frame=document.getElementById(tool+'-frame');if(frame.getAttribute('src'))return;
 loading.hidden=false;frame.hidden=true;
 try{const url=tool==='ess'?'./ess/':'./performance/';
 frame.onload=()=>{if(selected===tool){loading.hidden=true;frame.hidden=false;}};frame.src=url;
 }catch(e){if(selected===tool){loading.hidden=true;error.textContent=e.message;error.hidden=false;}}
}
document.querySelectorAll('[data-tool]').forEach(b=>b.onclick=()=>{location.hash=b.dataset.tool;});
window.addEventListener('hashchange',()=>show(location.hash.slice(1)));show(location.hash.slice(1));
