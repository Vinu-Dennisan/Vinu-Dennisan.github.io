# Network Analysis using Nmap — Project Notes

## What this project is
A hands-on exercise in network discovery and basic security analysis using
**Nmap** (Network Mapper), a widely-used open-source tool for scanning
networks to find active devices, open ports, and running services.

## What I did
1. Scanned a local network to discover active hosts (devices connected to
   the network).
2. Performed port scanning on those hosts to find which ports were open.
3. Identified which services were running on those open ports (e.g. web
   server, SSH, FTP).
4. Reviewed the results to understand basic security exposure — i.e.
   which services were unnecessarily open or potentially risky.

## Key commands used and what they do

| Command | Purpose |
|---|---|
| `nmap -sn 192.168.1.0/24` | Discover live hosts on the network (ping scan, no port scan) |
| `nmap 192.168.1.1` | Scan the most common ports on a specific device |
| `nmap -p 1-1000 192.168.1.1` | Scan a specific range of ports |
| `nmap -sV 192.168.1.1` | Detect the version of services running on open ports |
| `nmap -O 192.168.1.1` | Attempt to detect the device's operating system |
| `nmap -A 192.168.1.1` | Aggressive scan — combines OS detection, version detection, and script scanning |

## Sample output (for reference/explanation)

```
Starting Nmap scan report for 192.168.1.5
Host is up (0.0021s latency).
PORT     STATE  SERVICE
22/tcp   open   ssh
80/tcp   open   http
443/tcp  open   https
3306/tcp closed mysql
```

This tells you: SSH, HTTP, and HTTPS are active and reachable on that
device, while MySQL's default port is closed (not exposed to the network).

## What I learned
- How devices on a network can be discovered and mapped.
- The difference between open, closed, and filtered ports.
- Why leaving unnecessary ports/services open is a security risk (larger
  "attack surface").
- Basic reconnaissance is the first step in both security auditing and
  penetration testing.

## How to explain this in an interview
- **What it is:** "I used Nmap to scan a network, identify live devices,
  and check which ports and services were open — as a way to understand
  basic network security concepts."
- **Why it matters:** "It helps you see your network the way an attacker
  might — showing you what's exposed, so you can close unnecessary
  services."
- **If asked to demo it:** Nmap needs to be run on an actual network you
  have permission to scan (never scan networks you don't own or have
  explicit permission for — it can be illegal). You can mention you
  practiced on your own home network or a local virtual lab.
