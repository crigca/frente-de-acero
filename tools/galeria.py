# Genera mapas-frente-de-acero.html: una lámina con capturas de los 20 mapas, sacadas del juego con un navegador sin pantalla.
# Uso (desde la raíz del proyecto):  python3 tools/galeria.py
# Requiere:  pip install playwright pillow numpy  &&  playwright install chromium
import asyncio,io,base64,re
from PIL import Image
from playwright.async_api import async_playwright
import os
ROOT=os.getcwd();CHROME=os.environ.get('CHROME')   # CHROME=/usr/bin/google-chrome para usar el Chrome instalado en vez del de Playwright
async def main():
    shots={}
    async with async_playwright() as p:
        b=await (p.chromium.launch(executable_path=CHROME,args=['--no-sandbox']) if CHROME else p.chromium.launch())
        pg=await b.new_page(viewport={'width':1600,'height':900})
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
        await pg.goto('file://'+ROOT+'/frente-de-acero.html');await pg.wait_for_timeout(800)
        for n in range(20):
            await pg.click('#btnMenu');await pg.click('#btnMap');await pg.click('#btnPause')   # el click en pausa cierra el menú y congela
            num=int(re.search(r'(\d+) DE',(await pg.inner_text('#btnMap')).upper()).group(1))
            await pg.mouse.move(800,350)
            for i in range(24): await pg.mouse.wheel(0,300)
            await pg.mouse.move(800,860);await pg.wait_for_timeout(350)
            box=await pg.locator('#map').bounding_box()
            png=await pg.screenshot(clip={'x':box['x']+3,'y':box['y']+3,'width':box['width']-6,'height':box['height']-6})
            im=Image.open(io.BytesIO(png)).convert('RGB')
            # recorto la mesa de los costados: columnas iguales a la primera columna (la mesa es igual en toda la fila)
            import numpy as np
            A=np.asarray(im).astype(int);d=np.abs(A-A[:,:1,:]).sum(axis=2).mean(axis=0);cols=np.where(d>12)[0]
            if len(cols):im=im.crop((max(0,cols[0]-4),0,min(im.width,cols[-1]+5),im.height))
            im=im.resize((620,round(620*im.height/im.width)),Image.LANCZOS)
            buf=io.BytesIO();im.save(buf,'JPEG',quality=80);shots[num]=base64.b64encode(buf.getvalue()).decode()
        await b.close();print('mapas',sorted(shots),'errores',errs)
    cards=''.join('<figure><img src="data:image/jpeg;base64,%s" alt="Mapa %d"><figcaption><span>MAPA %d</span><a href="frente-de-acero.html#%d" target="_blank">&#9654; JUGAR</a></figcaption></figure>'%(shots[n],n,n,n) for n in sorted(shots))
    html='''<!DOCTYPE html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Frente de Acero · los 20 mapas</title>
<style>
body{margin:0;padding:18px;background:linear-gradient(#3a4129,#272c1c);color:#e8e2c0;font-family:"Courier New",Courier,monospace}
h1{font:400 26px "Stencil","Impact","Arial Black",sans-serif;letter-spacing:3px;margin:0 0 4px}
p{margin:0 0 16px;font-size:13px;color:#c9c5a0}
.g{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:14px}
figure{margin:0;background:#14170f;border:2px solid #14170f;border-radius:3px;box-shadow:0 3px 10px rgba(0,0,0,.5);cursor:zoom-in}
figure img{display:block;width:100%}
figcaption{display:flex;justify-content:space-between;align-items:center;padding:5px 10px;font:400 15px "Stencil","Impact","Arial Black",sans-serif;letter-spacing:2px;background:#4d5638}
figcaption a{color:#1d1705;background:linear-gradient(#c9a13a,#93711c);border:2px solid #14170f;border-radius:3px;padding:3px 12px;text-decoration:none;font-size:14px}
figcaption a:hover{filter:brightness(1.15)}
figure.big{position:fixed;inset:10px;z-index:9;cursor:zoom-out;display:flex;flex-direction:column;justify-content:center;background:#0c100f}
figure.big img{max-height:calc(100% - 34px);object-fit:contain}
</style></head><body>
<h1>FRENTE DE ACERO · LOS 20 MAPAS</h1>
<p>Zona verde: azul. Zona ocre: rojo. Banderas grises: libres. Click en un mapa para verlo grande; JUGAR lo abre en el juego (los dos archivos tienen que estar en la misma carpeta y el juego llamarse frente-de-acero.html).</p>
<div class="g">'''+cards+'''</div>
<script>document.querySelectorAll('figure').forEach(function(f){f.addEventListener('click',function(e){if(e.target.tagName!=='A')f.classList.toggle('big');});});</script>
</body></html>'''
    open('./mapas-frente-de-acero.html','w',encoding='utf-8').write(html);print(len(html)//1024,'KB')
asyncio.run(main())
