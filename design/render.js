const {chromium}=require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'),path=require('path');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1024,height:1024}});
 await p.goto('file://'+path.resolve('design/icon.html'));
 const shot=async(file,size,mode)=>{await p.evaluate(([m])=>{const bg=document.getElementById('bgl'),fg=document.getElementById('fg'),svg=document.getElementById('ic');
   bg.style.display=m==='fg'?'none':'';fg.style.display=m==='bg'?'none':'';
   fg.setAttribute('transform',m==='fg'?'translate(512 512) scale(.62) translate(-512 -520)':m==='round'?'translate(512 512) scale(.78) translate(-512 -520)':'translate(512 512) scale(.86) translate(-512 -520)');
   svg.style.borderRadius=m==='round'?'50%':'0';svg.style.overflow='hidden'},[mode]);
   await p.setViewportSize({width:1024,height:1024});const buf=await p.locator('#ic').screenshot({omitBackground:true});
   const q=await b.newPage({viewport:{width:size,height:size}});await q.setContent(`<html><body style="margin:0;background:transparent"><img src="data:image/png;base64,${buf.toString('base64')}" style="width:${size}px;height:${size}px;display:block;${mode==='round'?'border-radius:50%':''}"></body></html>`);
   fs.mkdirSync(path.dirname(file),{recursive:true});await q.screenshot({path:file,omitBackground:true});await q.close()};
 const res='android/app/src/main/res';
 const d={mdpi:[48,108],hdpi:[72,162],xhdpi:[96,216],xxhdpi:[144,324],xxxhdpi:[192,432]};
 for(const [k,[s,f]] of Object.entries(d)){await shot(`${res}/mipmap-${k}/ic_launcher.png`,s,'full');await shot(`${res}/mipmap-${k}/ic_launcher_round.png`,s,'round');await shot(`${res}/mipmap-${k}/ic_launcher_foreground.png`,f,'fg')}
 await shot('store/icon-512.png',512,'full');
 await b.close()})();
