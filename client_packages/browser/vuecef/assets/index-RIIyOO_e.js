(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();const{createApp:d}=Vue;d({data(){return{}},methods:{startAuth(){window.open("http://188.245.200.237:5000/auth/discord","auth","width=500,height=600"),window.addEventListener("message",r=>{r.data.jwt&&mp.trigger("auth:loginJwt",r.data.jwt)})}},template:`
    <div style="height: 100vh; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.6); color: white;">
      <div style="padding: 20px; background: #222; border-radius: 12px;">
        <h2>Willkommen bei Veyron RP</h2>
        <button @click="startAuth">Mit Discord einloggen</button>
      </div>
    </div>
  `}).mount("#app");
