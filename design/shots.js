const {chromium}=require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
(async()=>{const b=await chromium.launch();
 for(const lang of ['kk','ru','en']){
 const p=await b.newPage({viewport:{width:360,height:640},deviceScaleFactor:3});
 await p.addInitScript(l=>{try{localStorage.setItem('belka-set',JSON.stringify({deck:'premium',felt:'lazurit',lang:l}))}catch(e){}},lang);
 await p.goto('file:///home/claude/belka-app/www/index.html');await p.waitForTimeout(1800);
 await p.screenshot({path:`store/${lang}-1-title.png`});
 await p.click('#btnStart');await p.waitForTimeout(500);await p.screenshot({path:`store/${lang}-4-rules.png`});
 await p.click('[data-act="go"]');await p.waitForTimeout(1200);
 let got=0;
 for(let k=0;k<400&&got<2;k++){
  const n=await p.evaluate(()=>document.querySelectorAll('#trick .tc').length);
  const my=await p.$('#hand .card.ok');
  if(!got&&n===3&&my){await p.waitForTimeout(600);await p.screenshot({path:`store/${lang}-2-play.png`});got=1}
  const nx=await p.$('#overlay [data-act="next"]');if(nx){await p.waitForTimeout(2600);await p.screenshot({path:`store/${lang}-3-result.png`});got=2;break}
  const rd=await p.$('#overlay [data-act="redeal"]');if(rd){await rd.click();await p.waitForTimeout(300);continue}
  const fx=await p.$('.fx');if(fx){await p.waitForTimeout(1000);await fx.click().catch(()=>{});continue}
  if(my)await my.click();await p.waitForTimeout(120)}
 await p.evaluate(()=>{document.getElementById('overlay').innerHTML=''});
 await p.evaluate(()=>{const f=[...document.scripts];});
 await p.close()}
 await b.close()})();
