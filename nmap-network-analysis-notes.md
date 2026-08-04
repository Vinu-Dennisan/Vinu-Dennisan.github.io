<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Nmap Scan Simulator</title>
<style>
  :root{
    --bg:#0D1117;
    --surface:#161B22;
    --ink:#C9D1D9;
    --muted:#6E7681;
    --line:#30363D;
    --accent:#3FB950;
    --accent2:#58A6FF;
    --warn:#D29922;
  }
  *{box-sizing:border-box; margin:0; padding:0;}
  body{
    font-family:'Segoe UI', system-ui, sans-serif;
    background:var(--bg);
    color:var(--ink);
    min-height:100vh;
  }
  header{
    padding:20px 32px;
    border-bottom:1px solid var(--line);
    display:flex;
    justify-content:space-between;
    align-items:center;
  }
  .logo{
    font-size:18px;
    font-weight:700;
    color:var(--accent);
    font-family:'Consolas', monospace;
  }
  header a{
    font-size:13px;
    color:var(--accent2);
    text-decoration:none;
  }
  .wrap{
    max-width:760px;
    margin:0 auto;
    padding:40px 20px;
  }
  .intro{
    text-align:center;
    margin-bottom:30px;
  }
  .intro h1{
    font-size:24px;
    margin-bottom:8px;
  }
  .intro p{
    color:var(--muted);
    font-size:13px;
    max-width:520px;
    margin:0 auto;
  }
  .disclaimer{
    background:rgba(210,153,34,0.1);
    border:1px solid var(--warn);
    color:var(--warn);
    font-size:12px;
    padding:10px 14px;
    border-radius:8px;
    margin-bottom:24px;
    text-align:center;
  }
  .controls{
    display:flex;
    gap:10px;
    margin-bottom:20px;
    flex-wrap:wrap;
  }
  .controls input, .controls select{
    padding:12px 14px;
    border-radius:8px;
    border:1px solid var(--line);
    background:var(--surface);
    color:var(--ink);
    font-family:'Consolas', monospace;
    font-size:13px;
  }
  .controls input{ flex:1; min-width:200px; }
  .controls button{
    padding:12px 24px;
    border-radius:8px;
    border:none;
    background:var(--accent);
    color:#0D1117;
    font-weight:700;
    font-size:13px;
    cursor:pointer;
  }
  .controls button:disabled{
    opacity:0.5;
    cursor:not-allowed;
  }
  .presets{
    display:flex;
    gap:8px;
    margin-bottom:20px;
    flex-wrap:wrap;
  }
  .presets button{
    background:var(--surface);
    border:1px solid var(--line);
    color:var(--muted);
    padding:6px 12px;
    border-radius:20px;
    font-size:12px;
    cursor:pointer;
  }
  .terminal{
    background:#010409;
    border:1px solid var(--line);
    border-radius:10px;
    padding:20px;
    font-family:'Consolas', 'Courier New', monospace;
    font-size:13px;
    min-height:300px;
    white-space:pre-wrap;
    line-height:1.6;
    overflow-x:auto;
  }
  .terminal .prompt{ color:var(--accent2); }
  .terminal .open{ color:var(--accent); }
  .terminal .closed{ color:var(--muted); }
  .terminal .header-line{ color:var(--ink); font-weight:700; }
  .cursor{
    display:inline-block;
    width:8px;
    height:14px;
    background:var(--accent);
    animation:blink 1s step-start infinite;
    vertical-align:middle;
  }
  @keyframes blink{ 50%{ opacity:0; } }
</style>
</head>
<body>

<header>
  <div class="logo">$ nmap-simulator</div>
  <a href="index.html">← Back to Portfolio</a>
</header>

<div class="wrap">
  <div class="intro">
    <h1>🔒 Nmap Scan Simulator</h1>
    <p>An interactive demo that recreates what a real Nmap scan looks like — type an IP (or pick a preset), choose a scan type, and watch it run.</p>
  </div>

  <div class="disclaimer">
    ⚠️ This is a simulation for demonstration purposes. It does not scan real devices or networks —
    real Nmap requires direct network access and permission from the network owner.
  </div>

  <div class="presets">
    <button onclick="setIP('192.168.1.1')">192.168.1.1 (router)</button>
    <button onclick="setIP('192.168.1.5')">192.168.1.5 (device)</button>
    <button onclick="setIP('10.0.0.8')">10.0.0.8 (server)</button>
  </div>

  <div class="controls">
    <input type="text" id="ipInput" placeholder="Enter an IP address, e.g. 192.168.1.1" value="192.168.1.1">
    <select id="scanType">
      <option value="basic">Basic Scan (-sV)</option>
      <option value="aggressive">Aggressive Scan (-A)</option>
      <option value="ping">Ping Scan (-sn)</option>
    </select>
    <button id="scanBtn" onclick="runScan()">Start Scan</button>
  </div>

  <div class="terminal" id="terminal">nmap-simulator ready. Enter an IP and click "Start Scan" to begin.<span class="cursor"></span></div>
</div>

<script>
  function setIP(ip){
    document.getElementById('ipInput').value = ip;
  }

  const servicePool = [
    { port: 21, service: 'ftp', state: 'closed' },
    { port: 22, service: 'ssh', state: 'open', version: 'OpenSSH 8.9p1' },
    { port: 23, service: 'telnet', state: 'closed' },
    { port: 25, service: 'smtp', state: 'closed' },
    { port: 53, service: 'domain', state: 'open', version: 'dnsmasq 2.85' },
    { port: 80, service: 'http', state: 'open', version: 'nginx 1.24.0' },
    { port: 110, service: 'pop3', state: 'closed' },
    { port: 139, service: 'netbios-ssn', state: 'closed' },
    { port: 443, service: 'https', state: 'open', version: 'nginx 1.24.0 (SSL)' },
    { port: 445, service: 'microsoft-ds', state: 'closed' },
    { port: 3306, service: 'mysql', state: 'closed' },
    { port: 8080, service: 'http-proxy', state: 'open', version: 'Node.js Express' },
  ];

  function seededSubset(ip, type){
    let hash = 0;
    for(let i=0;i<ip.length;i++){ hash = (hash * 31 + ip.charCodeAt(i)) % 1000; }
    const count = type === 'ping' ? 0 : 5 + (hash % 4);
    const shuffled = [...servicePool].sort((a,b) => ((hash + a.port) % 7) - ((hash + b.port) % 7));
    return shuffled.slice(0, count).sort((a,b) => a.port - b.port);
  }

  async function typeLine(term, text, cls){
    return new Promise(resolve => {
      const span = document.createElement('span');
      if(cls) span.className = cls;
      term.appendChild(span);
      let i = 0;
      const interval = setInterval(() => {
        span.textContent += text[i];
        i++;
        term.scrollTop = term.scrollHeight;
        if(i >= text.length){
          clearInterval(interval);
          term.appendChild(document.createTextNode('\\n'));
          resolve();
        }
      }, 8);
    });
  }

  async function runScan(){
    const ip = document.getElementById('ipInput').value.trim() || '192.168.1.1';
    const type = document.getElementById('scanType').value;
    const btn = document.getElementById('scanBtn');
    const term = document.getElementById('terminal');

    btn.disabled = true;
    term.innerHTML = '';

    const scanFlag = type === 'aggressive' ? '-A' : type === 'ping' ? '-sn' : '-sV';
    await typeLine(term, `$ nmap ${scanFlag} ${ip}`, 'prompt');
    await typeLine(term, `Starting Nmap scan for ${ip}...`);
    await new Promise(r => setTimeout(r, 400));
    await typeLine(term, `Host is up (0.00${10 + Math.floor(Math.random()*40)}s latency).`);

    if(type === 'ping'){
      await new Promise(r => setTimeout(r, 300));
      await typeLine(term, `Nmap done: 1 host up.`);
      btn.disabled = false;
      return;
    }

    await new Promise(r => setTimeout(r, 300));
    await typeLine(term, `PORT     STATE    SERVICE       ${type === 'aggressive' ? 'VERSION' : ''}`, 'header-line');

    const results = seededSubset(ip, type);
    for(const r of results){
      await new Promise(res => setTimeout(res, 150));
      const portStr = `${r.port}/tcp`.padEnd(9);
      const stateStr = r.state.padEnd(9);
      const serviceStr = r.service.padEnd(14);
      const versionStr = type === 'aggressive' && r.version ? r.version : '';
      await typeLine(term, `${portStr}${stateStr}${serviceStr}${versionStr}`, r.state === 'open' ? 'open' : 'closed');
    }

    await new Promise(r => setTimeout(r, 300));
    const openCount = results.filter(r => r.state === 'open').length;
    await typeLine(term, `Nmap done: 1 host up, ${openCount} open port(s) found.`);

    btn.disabled = false;
  }
</script>
</body>
</html>
