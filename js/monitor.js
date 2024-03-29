const path = require('path');
const osu = require('node-os-utils');

const cpu = osu.cpu;
const memory = osu.mem;
const os = osu.os;

let cpuOverload = 80;

// Run every 2 sec
setInterval(() => {
  // Cpu usage
  cpu.usage().then((info) => {
    let usage = info + '%';

    document.getElementById('cpu-usage').innerText = usage;

    document.getElementById('cpu-progress').style.width = usage;

    if (info > cpuOverload) {
      document.getElementById('cpu-progress').style.background = 'red';
    } else {
      document.getElementById('cpu-progress').style.background = '#30c88b';
    }
  });

  cpu.free().then((info) => {
    document.getElementById('cpu-free').innerText = info + '%';
  });

  // Uptime

  document.getElementById('sys-uptime').innerText = sectoDhms(os.uptime());
}, 2000);

// Set model
document.getElementById('cpu-model').innerText = cpu.model();

// Comp name
document.getElementById('comp-name').innerText = os.hostname();

// OS
document.getElementById('os').innerText = `${os.type()} ${os.arch()}`;

// Total Mem
memory.info().then((info) => {
  document.getElementById('mem-total').innerText = info.totalMemMb;
});

// Show time

function sectoDhms(seconds) {
  seconds = +seconds;
  const d = Math.floor(seconds / (3600 * 24));
  const h = Math.floor((seconds % (3600 * 24)) / 3600);

  const m = Math.floor((seconds % 3600) / 60);

  const s = Math.floor(seconds % 60);

  return `${d}d,${h}h,${m}m,${s}s`;
}
