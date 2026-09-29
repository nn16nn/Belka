const {chromium}=require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
(async()=>{const b=await chromium.launch();
 for(const [lang,title,sub] of [['kk','БЕЛКА','Қарағанды карта ойыны'],['ru','БЕЛКА','Карточная игра из Караганды'],['en','BELKA','The Karaganda card game']]){
 const p=await b.newPage({viewport:{width:1024,height:500}});
 await p.addInitScript(l=>{try{localStorage.setItem('belka-set',JSON.stringify({deck:'premium',felt:'lazurit',lang:l}))}catch(e){}},lang);
 await p.goto('file:///home/claude/belka-app/www/index.html');await p.waitForTimeout(1500);
 await p.evaluate(([title,sub])=>{
  const src=[...document.querySelectorAll('#fan .card')];const cards=src.map((c,i)=>{const el=document.createElement('div');el.className=c.className;el.innerHTML=c.innerHTML;el.style.cssText=`position:absolute;width:138px;height:196px;left:${636+i*70}px;top:${128+[20,0,-6,14][i]}px;transform:rotate(${[-16,-5,6,17][i]}deg);transform-origin:50% 120%;box-shadow:0 30px 40px -18px rgba(0,0,0,.8);border-radius:12px`;return el.outerHTML}).join('');
  const defs=document.querySelector('svg[width="0"]').outerHTML;document.body.innerHTML=defs+`<div id="fg" style="position:fixed;inset:0;overflow:hidden;background:radial-gradient(70% 90% at 72% 45%,#1f5870,#0f2f40 55%,#081620);font-family:Manrope">
   <div style="position:absolute;inset:0;background:repeating-linear-gradient(45deg,rgba(214,163,76,.05) 0 1px,transparent 1px 24px),repeating-linear-gradient(-45deg,rgba(214,163,76,.05) 0 1px,transparent 1px 24px)"></div>
   <div style="position:absolute;left:64px;top:118px;display:flex;flex-direction:column;gap:14px">
     <div style="display:flex;align-items:center;gap:12px;color:#f1cb80;font:700 16px Manrope;letter-spacing:.24em;text-transform:uppercase"><i style="width:34px;height:1px;background:#d6a34c"></i>♣ ♠ ♥ ♦</div>
     <div style="font:800 104px/0.9 Unbounded;letter-spacing:-.03em;color:#f5e7c4;text-shadow:0 6px 0 rgba(0,0,0,.25)">${title}</div>
     <div style="font:600 26px Manrope;color:#c9d6db">${sub}</div>
   </div>${cards}</div>`;
 },[title,sub]);
 await p.waitForTimeout(500);await p.screenshot({path:`store/${lang}-feature-1024x500.png`});await p.close()}
 await b.close()})();
