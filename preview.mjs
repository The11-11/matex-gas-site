import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const root=fileURLToPath(new URL('./dist/',import.meta.url));
const port=Number(process.env.PORT||8772);
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml'};
const server=http.createServer(async(req,res)=>{try{const u=new URL(req.url,'http://127.0.0.1');let file=u.pathname==='/'?'index.html':decodeURIComponent(u.pathname).slice(1);if(!/^[a-zA-Z0-9/_.-]+$/.test(file)||file.split('/').includes('..'))throw new Error();file=path.resolve(root,file);if(!file.startsWith(root))throw new Error();const data=await readFile(file);res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});res.end(data);}catch{res.writeHead(404,{'Content-Type':'text/plain'});res.end('Not found');}});
server.listen(port,'127.0.0.1',()=>console.log(`Local: http://127.0.0.1:${port}`));for(const signal of ['SIGINT','SIGTERM'])process.on(signal,()=>server.close(()=>process.exit(0)));
