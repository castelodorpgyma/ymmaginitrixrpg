(function () {
  "use strict";

  var STYLE = `
    #call-activities-modal{position:fixed;inset:0;z-index:100100;display:none;align-items:center;justify-content:center;padding:18px;background:rgba(3,5,10,.82);backdrop-filter:blur(12px)}
    #call-activities-modal.is-open{display:flex}
    .ca-window{width:min(1040px,96vw);max-height:min(820px,94vh);display:flex;flex-direction:column;overflow:hidden;border:1px solid rgba(255,255,255,.13);border-radius:18px;background:linear-gradient(145deg,#171923,#0c0e14 65%);box-shadow:0 28px 100px #000b;color:#f5f6fa;font-family:Rajdhani,system-ui,sans-serif}
    .ca-head{display:flex;align-items:center;gap:14px;padding:17px 20px;border-bottom:1px solid #ffffff12;background:linear-gradient(100deg,#da34341c,transparent 58%)}
    .ca-title{flex:1}.ca-kicker,.ca-label{font:600 .65rem "Share Tech Mono",monospace;letter-spacing:.13em;color:#9da4b6;text-transform:uppercase}
    .ca-title h2{margin:2px 0 0;font:700 1.55rem Rajdhani,sans-serif;letter-spacing:.06em}
    .ca-close,.ca-sound{border:1px solid #ffffff1a;border-radius:10px;background:#ffffff09;color:#eef0f5;padding:9px 12px;cursor:pointer}
    .ca-close{font-size:1.1rem}.ca-close:hover,.ca-sound:hover{background:#ffffff18}
    .ca-layout{display:grid;grid-template-columns:205px minmax(0,1fr);min-height:0;flex:1}
    .ca-nav{padding:14px 10px;border-right:1px solid #ffffff12;background:#090b10a8}
    .ca-tab{display:flex;width:100%;align-items:center;gap:11px;margin:3px 0;padding:11px 12px;border:1px solid transparent;border-radius:11px;background:transparent;color:#aab0be;text-align:left;font:600 .94rem Rajdhani,sans-serif;cursor:pointer;transition:.16s}
    .ca-tab:hover{background:#ffffff09;color:#fff}.ca-tab.is-active{border-color:#e94b4b55;background:linear-gradient(100deg,#d9363628,#ffffff06);color:#fff}
    .ca-tab-icon{width:24px;text-align:center;font-size:1.15rem}.ca-nav-note{margin:18px 8px 0;padding-top:13px;border-top:1px solid #ffffff12;color:#828a9b;font: .65rem/1.6 "Share Tech Mono",monospace}
    .ca-main{min-width:0;overflow:auto;padding:20px}
    .ca-game-top{display:flex;align-items:flex-start;gap:12px;margin-bottom:16px}
    .ca-game-top h3{margin:0;font:700 1.38rem Rajdhani,sans-serif;letter-spacing:.04em}
    .ca-game-top p{margin:3px 0 0;color:#9da4b6;font-size:.83rem}
    .ca-game-top>div:first-child{flex:1}
    .ca-primary,.ca-secondary,.ca-danger{border:1px solid #e6535355;border-radius:9px;background:linear-gradient(120deg,#c83232,#9e202b);color:white;padding:9px 14px;font:700 .82rem Rajdhani,sans-serif;letter-spacing:.04em;cursor:pointer}
    .ca-primary:hover{filter:brightness(1.13)}.ca-primary:disabled{opacity:.45;cursor:not-allowed}
    .ca-secondary{border-color:#ffffff20;background:#ffffff09;color:#e6e8ed}.ca-secondary:hover{background:#ffffff16}
    .ca-danger{border-color:#ff5b5b40;background:#9e202b55}
    .ca-panel{border:1px solid #ffffff12;border-radius:13px;background:linear-gradient(145deg,#ffffff08,#ffffff03);padding:14px}
    .ca-columns{display:grid;grid-template-columns:minmax(0,1fr) 230px;gap:14px;align-items:start}
    .ca-board-wrap{display:flex;flex-direction:column;align-items:center;gap:10px}
    .ca-status{min-height:23px;color:#c5cad5;font: .73rem "Share Tech Mono",monospace;text-align:center}
    .ca-canvas{display:block;width:min(100%,360px);height:auto;max-height:54vh;border:1px solid #ffffff1a;border-radius:9px;background:#080a0f;touch-action:none}
    .ca-mobile-controls{display:flex;gap:6px;flex-wrap:wrap;justify-content:center}
    .ca-mobile-controls button{min-width:42px}
    .ca-side{display:flex;flex-direction:column;gap:10px}
    .ca-score{display:flex;align-items:baseline;gap:8px;margin-top:3px;font:700 2rem "Share Tech Mono",monospace;color:#fff}
    .ca-score small{font: .66rem "Share Tech Mono",monospace;color:#a0a8b7}
    .ca-score-lines{color:#a7adbb;font:.7rem "Share Tech Mono",monospace}
    .ca-rank{margin-top:14px}.ca-rank h4{margin:0 0 8px;font:700 .8rem Rajdhani,sans-serif;letter-spacing:.08em;text-transform:uppercase}
    .ca-rank-list{display:flex;flex-direction:column;gap:6px}.ca-rank-row{display:flex;gap:8px;align-items:center;padding:7px 8px;border-radius:8px;background:#ffffff07;font:.7rem "Share Tech Mono",monospace}
    .ca-rank-row strong{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-weight:400}.ca-rank-row em{color:#f1ce7b;font-style:normal}
    .ca-muted{color:#8f97a8;font:.68rem/1.6 "Share Tech Mono",monospace}
    .ca-chess-board{display:grid;grid-template-columns:repeat(8,minmax(28px,1fr));width:min(100%,440px);aspect-ratio:1;border:5px solid #242832;border-radius:8px;overflow:hidden;box-shadow:0 12px 30px #0008}
    .ca-square{position:relative;display:grid;place-items:center;min-width:0;border:0;padding:0;cursor:pointer;color:#12151c;font-size:clamp(1.35rem,4vw,2.4rem);line-height:1}
    .ca-square.light{background:#d5c8ae}.ca-square.dark{background:#6e7887}
    .ca-square.is-selected{box-shadow:inset 0 0 0 4px #4bd7c7}
    .ca-square.is-target:after{content:"";position:absolute;width:24%;height:24%;border-radius:50%;background:#10231f66}
    .ca-square.is-capture:after{content:"";position:absolute;inset:5px;border:4px solid #e64f55aa;border-radius:50%}
    .ca-square .ca-piece{filter:drop-shadow(0 2px 1px #0008);z-index:1}
    .ca-game-list{display:flex;flex-direction:column;gap:7px;margin-top:10px}
    .ca-game-item{display:flex;align-items:center;gap:8px;padding:8px;border:1px solid #ffffff12;border-radius:9px;background:#ffffff06;font:.67rem "Share Tech Mono",monospace}
    .ca-game-item span{flex:1;line-height:1.4}.ca-game-item button{padding:6px 9px}
    .ca-block-board{display:grid;grid-template-columns:repeat(8,minmax(20px,1fr));width:min(100%,390px);aspect-ratio:1;gap:3px;padding:7px;border:1px solid #ffffff1a;border-radius:10px;background:#090b11}
    .ca-block-cell{border:1px solid #ffffff0a;border-radius:4px;background:#191d27;cursor:pointer;aspect-ratio:1}
    .ca-block-cell.filled{border-color:#ffffff2e;background:linear-gradient(145deg,#53bed0,#317691);box-shadow:inset 0 1px #ffffff38}
    .ca-block-cell.preview{background:#67e5c777;border-color:#79f4df}
    .ca-trays{display:flex;gap:7px;justify-content:center;min-height:62px}
    .ca-piece-option{display:grid;grid-template-columns:repeat(4,13px);grid-template-rows:repeat(4,13px);gap:2px;align-content:center;justify-content:center;min-width:72px;min-height:58px;border:1px solid #ffffff17;border-radius:9px;background:#ffffff08;cursor:pointer}
    .ca-piece-option.is-selected{border-color:#6ce4d0;box-shadow:0 0 0 2px #6ce4d033}
    .ca-piece-dot{border-radius:3px;background:#56bdd0}.ca-piece-dot.empty{background:transparent}
    .ca-calc{width:min(100%,360px);margin:auto}.ca-calc-display{width:100%;height:68px;margin-bottom:10px;padding:12px;border:1px solid #ffffff16;border-radius:10px;background:#080a0f;color:#f4f6fb;text-align:right;font:1.8rem "Share Tech Mono",monospace}
    .ca-calc-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:7px}.ca-calc-key{min-height:50px;border:1px solid #ffffff12;border-radius:9px;background:#ffffff08;color:#e7eaf0;font:700 1rem Rajdhani,sans-serif;cursor:pointer}.ca-calc-key:hover{background:#ffffff18}.ca-calc-key.operator{color:#ffaaa3;background:#b92b2b1d}.ca-calc-key.equal{background:#a82a32;color:#fff}
    .ca-toast{position:fixed;left:50%;bottom:24px;z-index:100110;transform:translateX(-50%);padding:10px 15px;border:1px solid #ffffff22;border-radius:10px;background:#141721;color:#fff;box-shadow:0 8px 30px #0009;font:.74rem "Share Tech Mono",monospace}
    .ca-public-status{margin:14px 0 2px;padding-top:12px;border-top:1px solid #ffffff12}
    .ca-public-status-title{margin-bottom:8px;font:700 .8rem Rajdhani,sans-serif;letter-spacing:.08em;text-transform:uppercase}
    .ca-public-status-list{display:flex;flex-direction:column;gap:8px}
    .ca-public-person{padding:9px;border:1px solid #ffffff12;border-radius:9px;background:linear-gradient(120deg,#ffffff08,#ffffff03)}
    .ca-public-person-head{display:flex;align-items:center;gap:8px;margin-bottom:7px}
    .ca-public-avatar{display:grid;width:27px;height:27px;place-items:center;border:1px solid #ffffff22;border-radius:50%;background:#c4313533;color:#fff;font:700 .7rem Rajdhani,sans-serif}
    .ca-public-name{font:700 .78rem Rajdhani,sans-serif;color:#f2f3f6}
    .ca-public-owner{margin-left:auto;color:#929aaa;font:.58rem "Share Tech Mono",monospace}
    .ca-public-stat{display:grid;grid-template-columns:24px 1fr 54px;gap:6px;align-items:center;margin-top:5px;color:#b6bdca;font:.62rem "Share Tech Mono",monospace}
    .ca-public-track{height:6px;overflow:hidden;border-radius:10px;background:#ffffff13}
    .ca-public-fill{height:100%;border-radius:inherit;background:linear-gradient(90deg,#c83232,#ff7474)}
    .ca-window{border-color:#ffffff20;background:radial-gradient(ellipse at 82% 0%,#8d394329,transparent 34%),linear-gradient(145deg,#171923,#0c0e14 65%);box-shadow:0 28px 100px #000c,0 0 0 1px #ffffff08 inset}
    .ca-head{min-height:72px}.ca-main{scrollbar-color:#454c5d #11141b;scrollbar-width:thin}
    .ca-panel{border-color:#ffffff17;background:linear-gradient(145deg,#ffffff0b,#ffffff04);box-shadow:0 10px 24px #0003}
    .ca-game-top{align-items:center;padding:0 0 13px;border-bottom:1px solid #ffffff12}
    .ca-game-top h3{font-size:1.55rem}.ca-primary{box-shadow:0 6px 18px #9e202b44}
    .ca-rank-row,.ca-game-item{border:1px solid #ffffff0d;background:linear-gradient(110deg,#ffffff0a,#ffffff04)}
    .ca-chess-board{border-color:#343b49;box-shadow:0 16px 38px #0009,0 0 0 1px #ffffff12}
    .ca-block-board{box-shadow:inset 0 2px 12px #0008}
    .ca-canvas,.ca-calc-display{box-shadow:inset 0 2px 12px #0008,0 8px 20px #0004}
    #call-party-status-hud{--cph-accent:#7ee0d1;position:fixed;z-index:10021;left:16px;bottom:94px;width:min(380px,calc(100vw - 32px));max-height:42vh;overflow:auto;padding:12px;border:1px solid color-mix(in srgb,var(--cph-accent) 48%,transparent);border-radius:15px;background:linear-gradient(145deg,#111827f2,#090d15f2);box-shadow:0 16px 44px #0009,0 0 26px color-mix(in srgb,var(--cph-accent) 14%,transparent);color:#f3f5fa;backdrop-filter:blur(14px);scrollbar-width:thin;scrollbar-color:#495164 #10141d}
    #call-party-status-hud[hidden]{display:none}
    #call-party-status-hud[data-position="top-left"]{top:14px;bottom:auto;left:16px}
    #call-party-status-hud[data-position="top-right"]{top:14px;right:16px;bottom:auto;left:auto}
    #call-party-status-hud[data-position="bottom-right"]{right:16px;bottom:94px;left:auto}
    #call-party-status-hud[data-style="minimal"]{background:#090d15eF;box-shadow:0 8px 26px #0007}
    #call-party-status-hud[data-style="arcade"]{border:2px solid var(--cph-accent);border-radius:8px;box-shadow:4px 4px 0 color-mix(in srgb,var(--cph-accent) 35%,transparent),0 0 20px color-mix(in srgb,var(--cph-accent) 16%,transparent)}
    .cph-title{display:flex;align-items:center;gap:8px;margin:0 0 10px;font-size:.78rem;font-weight:700;letter-spacing:.07em;text-transform:uppercase}
    .cph-title:before{content:"";width:7px;height:7px;border-radius:50%;background:var(--cph-accent);box-shadow:0 0 10px var(--cph-accent)}
    .cph-list{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:8px}
    .cph-person{min-width:0;padding:9px;border:1px solid #ffffff12;border-radius:11px;background:linear-gradient(135deg,#ffffff0a,#ffffff04)}
    .cph-person-head{display:flex;align-items:center;gap:7px;margin-bottom:7px}
    .cph-avatar{display:grid;width:25px;height:25px;flex:0 0 25px;place-items:center;border:1px solid color-mix(in srgb,var(--cph-accent) 54%,transparent);border-radius:9px;background:color-mix(in srgb,var(--cph-accent) 14%,transparent);font-size:.65rem}
    .cph-name{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:.78rem;font-weight:700}
    .cph-owner{margin-left:auto;color:#929aaa;font-size:.6rem;white-space:nowrap}
    .cph-stat{display:grid;grid-template-columns:18px minmax(32px,1fr) 42px;gap:6px;align-items:center;margin-top:5px;color:#c0c6d2;font-size:.64rem}
    .cph-track{height:6px;overflow:hidden;border-radius:8px;background:#ffffff14}
    .cph-fill{height:100%;border-radius:inherit;background:var(--cph-accent);transition:width .25s ease}
    #call-character-options .cph-options{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:8px 0;padding:10px;border:1px solid rgba(126,224,255,.15);border-radius:9px;background:rgba(126,224,255,.035)}
    #call-character-options .cph-option{display:grid;gap:4px;color:#c9d1e4;font-size:.62rem}
    #call-character-options .cph-option select{width:100%;max-width:none;padding:6px;border:1px solid rgba(126,224,255,.2);border-radius:6px;background:#101322;color:#edf2ff}
    #call-character-options .cph-option input[type=color]{width:100%;height:28px}
    #call-character-hud{display:none!important}
    #call-participants-area .call-part-stats{display:none!important}
    #view-sessao .grid2{grid-template-columns:minmax(0,.92fr) minmax(0,1.08fr)!important;align-items:start}
    #view-sessao .grid2>div,#view-sessao .card{min-width:0;max-width:100%}
    #view-sessao #chat-box{height:min(720px,76vh);min-height:340px;max-height:82vh;min-width:0;resize:vertical}
    #view-sessao #live-display{min-height:clamp(190px,28vw,340px);aspect-ratio:16/9}
    #dh-ov{align-items:center;padding:16px;background:rgba(3,5,10,.78);backdrop-filter:blur(10px)}
    #dh-box{width:min(720px,96vw);max-height:calc(100vh - 32px);overflow:auto;padding:22px;border:1px solid #ffffff1b;border-radius:18px;background:radial-gradient(ellipse at 88% 0%,#8d394322,transparent 38%),linear-gradient(145deg,#171923,#0c0e14);box-shadow:0 24px 80px #000b}
    #dh-sel{min-height:40px;border-color:#ffffff1a;border-radius:10px;background:#12151d;font-family:Rajdhani,system-ui,sans-serif;font-size:.9rem}
    .dh-stats{gap:10px;padding:14px;border-color:#ffffff12;border-radius:12px;background:#ffffff06}
    .dh-sv{font-family:Rajdhani,system-ui,sans-serif;font-weight:700;font-size:1.8rem}
    .dh-sl{font-family:Rajdhani,system-ui,sans-serif;font-size:.68rem;letter-spacing:.1em}
    .dh-row{gap:12px;padding:10px 12px;border-color:#ffffff0d;border-radius:10px;background:#ffffff06;font-family:Rajdhani,system-ui,sans-serif;font-size:.86rem}
    .dh-expr,.dh-time{font-family:"Share Tech Mono",monospace;font-size:.68rem}
    .dh-res{font-family:Rajdhani,system-ui,sans-serif;font-size:1.45rem;font-weight:700}
    #modal-roleta{padding:16px!important;align-items:center!important}
    #modal-roleta>.modal{width:min(980px,96vw)!important;max-width:980px!important;max-height:94vh!important;overflow:auto!important;border:1px solid #ffffff1b;background:linear-gradient(145deg,#171923,#0c0e14)!important;box-shadow:0 24px 80px #000b}
    #modal-roleta .roleta-header{padding:16px 20px;border-bottom:1px solid #ffffff12;background:linear-gradient(100deg,#da34341c,transparent 60%)}
    #modal-roleta .roleta-body{min-height:0;max-height:calc(94vh - 66px)}
    #modal-roleta .roleta-left{flex:0 0 min(340px,38%);border-right-color:#ffffff12;background:#090b1080}
    #modal-roleta .roleta-right{min-width:0;justify-content:center;gap:10px;padding:24px;background:radial-gradient(ellipse at center,#a5313118,transparent 67%)}
    #modal-roleta #roleta-canvas{width:min(420px,100%);height:auto;max-height:52vh;box-shadow:0 14px 42px #0009,0 0 44px #d228282e}
    #modal-roleta .roleta-spin-btn{max-width:420px;border-radius:12px}
    #modal-roleta .roleta-result{max-width:420px}
    @media(max-width:850px){#view-sessao .grid2{grid-template-columns:minmax(0,1fr)!important}#view-sessao #chat-box{height:min(620px,72vh)}#modal-roleta .roleta-body{flex-direction:column;max-height:calc(94vh - 66px);overflow:auto}#modal-roleta .roleta-left{flex:0 0 auto;border-right:0;border-bottom:1px solid #ffffff12;max-height:42vh}#modal-roleta .roleta-right{padding:16px}#modal-roleta #roleta-canvas{width:min(320px,74vw);max-height:36vh}}
    @media(max-width:600px){#call-party-status-hud{left:8px!important;right:8px!important;bottom:80px!important;top:auto!important;width:auto;max-height:32vh;padding:9px}.cph-list{grid-template-columns:1fr 1fr}.cph-person{padding:7px}.cph-stat{grid-template-columns:16px minmax(25px,1fr) 38px;font-size:.58rem}#view-sessao #chat-box{min-height:300px}#dh-ov{padding:8px}#dh-box{padding:16px}.dh-stats{grid-template-columns:repeat(2,1fr)}#modal-roleta{padding:8px!important}#modal-roleta .roleta-left{padding:12px}#modal-roleta .roleta-right{padding:12px}}
    @media(max-width:700px){#call-activities-modal{padding:7px}.ca-window{width:100%;max-height:96vh;border-radius:13px}.ca-layout{grid-template-columns:1fr;grid-template-rows:auto minmax(0,1fr)}.ca-nav{display:flex;gap:4px;padding:6px;overflow:auto;border-right:0;border-bottom:1px solid #ffffff12}.ca-tab{flex:0 0 auto;width:auto;margin:0;padding:8px 10px;font-size:.8rem}.ca-tab-icon{width:auto}.ca-nav-note{display:none}.ca-main{padding:12px}.ca-columns{grid-template-columns:minmax(0,1fr)}.ca-side{display:grid;grid-template-columns:1fr 1fr}.ca-rank{grid-column:1/-1}.ca-head{padding:12px}.ca-title h2{font-size:1.25rem}.ca-game-top{flex-wrap:wrap}}
  `;

  var gameNames = { tetris: "Tetris", chess: "Xadrez", blocks: "Block Blast" };
  var modal, main, nav, selectedGame = "tetris", canvas, ctx, scores = {}, games = {};
  var scoreUnsub = null, gamesUnsub = null, statusUnsub = null, scoresLoaded = false, activeGameId = null, selectedSquare = null;
  var statusCampaign = null, statusWasOnline = false, lastStatusSignature = "", statusErrorShown = false;
  var lastStatusVisible = null, statusRemovalPending = false;
  var statusHudSignature = "";
  var chessState = null, chessMoves = [], audioCtx = null, lastClickCell = null;
  var tetris = { board: [], piece: null, next: null, score: 0, lines: 0, timer: null, ended: true, paused: false };
  var blocks = { board: [], pieces: [], selected: -1, score: 0, ended: true };
  var calcDisplay = "0", calcStored = null, calcOperator = null, calcFresh = false;
  var shapes = [
    [[0,0],[1,0],[2,0],[3,0]], [[0,0],[1,0],[0,1],[1,1]],
    [[0,0],[1,0],[2,0],[1,1]], [[0,0],[0,1],[0,2],[1,2]],
    [[1,0],[2,0],[0,1],[1,1]], [[1,0],[0,1],[1,1],[2,1]],
    [[0,0],[1,0],[1,1],[2,1]], [[0,0],[1,0],[2,0]]
  ];

  function safeKey(value) {
    return String(value || "main").replace(/[.#$\[\]\/]/g, "_").slice(0, 100) || "main";
  }
  function identity() {
    var u = window.currentUser || {};
    var firebaseUser = window.auth && window.auth.currentUser;
    return {
      id: safeKey(firebaseUser && firebaseUser.uid || window._myCallId || u.id || u.username || "guest"),
      name: String(u.username || u.nome || firebaseUser && firebaseUser.displayName || "Jogador").slice(0, 40)
    };
  }
  function campaignKey() { return safeKey(window._activeCampanhaId || "sala-principal"); }
  function roomKey() {
    return safeKey(typeof window._curCallRoom === "function" ? window._curCallRoom() : campaignKey());
  }
  function scorePath() { return "sharedData/callActivities/v1/" + campaignKey() + "/scores"; }
  function gamesPath() { return "sharedData/callActivities/v1/" + campaignKey() + "/" + roomKey() + "/chess"; }
  function onlineReady() {
    return !!(window._fbReady && window.db && window._ref && window._set && window._onValue && window.currentUser);
  }
  function toast(message) {
    var old = document.querySelector(".ca-toast");
    if (old) old.remove();
    var el = document.createElement("div");
    el.className = "ca-toast";
    el.textContent = message;
    document.body.appendChild(el);
    setTimeout(function () { el.remove(); }, 3200);
  }
  function soundEnabled() {
    try { return localStorage.getItem("ymm_call_activity_sounds") !== "false"; }
    catch (error) { console.warn("[Call activities] Não foi possível ler a preferência de som:", error); return true; }
  }
  function sound(kind) {
    if (!soundEnabled()) return;
    try {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      audioCtx = audioCtx || new AC();
      if (audioCtx.state === "suspended") audioCtx.resume().catch(function (error) { console.warn("[Call activities] Áudio indisponível:", error); });
      var notes = { click: [520], move: [420, 590], capture: [240, 360], clear: [520, 660, 820], win: [520, 660, 780], lose: [340, 230] };
      var sequence = notes[kind] || notes.click;
      sequence.forEach(function (frequency, index) {
        var oscillator = audioCtx.createOscillator(), gain = audioCtx.createGain(), start = audioCtx.currentTime + index * .085;
        oscillator.type = kind === "capture" ? "triangle" : "sine";
        oscillator.frequency.setValueAtTime(frequency, start);
        gain.gain.setValueAtTime(.0001, start);
        gain.gain.exponentialRampToValueAtTime(.045, start + .012);
        gain.gain.exponentialRampToValueAtTime(.0001, start + .12);
        oscillator.connect(gain); gain.connect(audioCtx.destination);
        oscillator.start(start); oscillator.stop(start + .13);
      });
    } catch (error) { console.warn("[Call activities] Não foi possível tocar o efeito:", error); }
  }
  function scoreDefaults() { return { wins: 0, tetrisBest: 0, blocksBest: 0, chessWins: 0, username: identity().name }; }
  function localScoreKey(id) { return "ymm_call_activity_score_" + id; }
  function readLocalScore(id) {
    try { return JSON.parse(localStorage.getItem(localScoreKey(id)) || "null"); }
    catch (error) { console.warn("[Call activities] Não foi possível ler o placar local:", error); return null; }
  }
  function cacheLocalScore(id, value) {
    try { localStorage.setItem(localScoreKey(id), JSON.stringify(value)); }
    catch (error) { console.warn("[Call activities] Não foi possível guardar o placar local:", error); }
  }
  function getMyScore() { return scores[identity().id] || readLocalScore(identity().id) || scoreDefaults(); }
  function saveScore(updates) {
    if (onlineReady() && !scoresLoaded && typeof window._get === "function") {
      return window._get(window._ref(window.db, scorePath())).then(function (snapshot) {
        scores = snapshot && snapshot.val() || {};
        scoresLoaded = true;
        var local = readLocalScore(identity().id);
        if (local && (!scores[identity().id] || (Number(local.updatedAt) || 0) > (Number(scores[identity().id].updatedAt) || 0))) scores[identity().id] = local;
        return saveScore(updates);
      }).catch(function (error) {
        console.error("[Call activities] Não foi possível carregar o placar antes de atualizá-lo:", error);
        scoresLoaded = true;
        return saveScore(updates);
      });
    }
    var me = identity(), previous = getMyScore(), next = Object.assign({}, previous, updates, { username: me.name, updatedAt: Date.now() });
    scores[me.id] = next;
    cacheLocalScore(me.id, next);
    renderCurrent();
    if (!onlineReady()) {
      toast("Pontuação local; entre na conta e conecte ao Firebase para o placar da campanha.");
      return Promise.resolve(false);
    }
    return window._set(window._ref(window.db, scorePath() + "/" + me.id), next).then(function () {
      return true;
    }).catch(function (error) {
      console.error("[Call activities] Falha ao salvar o placar:", error);
      toast("Não foi possível sincronizar o placar. Verifique a conexão e as regras do Firebase.");
      return false;
    });
  }
  function recordWin(game, resultId, score) {
    var key = "ymm_activity_counted_" + game + "_" + resultId;
    try { if (localStorage.getItem(key)) return; localStorage.setItem(key, "1"); }
    catch (error) { console.warn("[Call activities] Não foi possível guardar a vitória localmente:", error); }
    var current = getMyScore(), updates = { wins: (Number(current.wins) || 0) + 1 };
    if (game === "tetris") updates.tetrisBest = Math.max(Number(current.tetrisBest) || 0, score);
    if (game === "blocks") updates.blocksBest = Math.max(Number(current.blocksBest) || 0, score);
    if (game === "chess") updates.chessWins = (Number(current.chessWins) || 0) + 1;
    sound("win");
    saveScore(updates);
    toast("Vitória registrada no placar da campanha!");
  }
  function recordBest(game, score) {
    var current = getMyScore(), field = game === "tetris" ? "tetrisBest" : "blocksBest";
    if (score > (Number(current[field]) || 0)) saveScore((function () { var o = {}; o[field] = score; return o; })());
  }
  function listenScores() {
    if (scoreUnsub) { scoreUnsub(); scoreUnsub = null; }
    if (!onlineReady()) return;
    scoresLoaded = false;
    scoreUnsub = window._onValue(window._ref(window.db, scorePath()), function (snapshot) {
      scores = snapshot && snapshot.val() || {};
      scoresLoaded = true;
      var local = readLocalScore(identity().id), remote = scores[identity().id];
      if (local && (!remote || (Number(local.updatedAt) || 0) > (Number(remote.updatedAt) || 0))) scores[identity().id] = local;
      renderCurrent();
    }, function (error) {
      console.error("[Call activities] Falha ao carregar o placar:", error);
      toast("O placar da campanha não carregou. Verifique as permissões do Firebase.");
    });
  }
  function listenGames() {
    if (gamesUnsub) { gamesUnsub(); gamesUnsub = null; }
    if (!onlineReady()) return;
    gamesUnsub = window._onValue(window._ref(window.db, gamesPath()), function (snapshot) {
      games = snapshot && snapshot.val() || {};
      if (activeGameId && !games[activeGameId]) {
        activeGameId = null;
        chessMoves = [];
        selectedSquare = null;
      }
      renderCurrent();
    }, function (error) {
      console.error("[Call activities] Falha ao carregar partidas:", error);
      toast("As partidas não carregaram. Verifique as permissões do Firebase.");
    });
  }
  function rankMarkup(field) {
    var entries = Object.keys(scores || {}).map(function (id) {
      var item = scores[id] || {};
      return { id: id, name: String(item.username || "Jogador"), wins: Number(item.wins) || 0, best: Number(item[field]) || 0 };
    }).sort(function (a, b) { return b.wins - a.wins || b.best - a.best || a.name.localeCompare(b.name); }).slice(0, 6);
    if (!onlineReady()) return '<div class="ca-muted">Entre na conta para compartilhar o placar.</div>';
    if (!entries.length) return '<div class="ca-muted">Ainda sem resultados nesta campanha.</div>';
    return entries.map(function (item, index) {
      return '<div class="ca-rank-row"><span>' + (index + 1) + '.</span><strong>' + escapeHtml(item.name) + '</strong><em>' + item.wins + ' vit.</em></div>';
    }).join("");
  }
  function escapeHtml(text) {
    return String(text).replace(/[&<>"']/g, function (char) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char];
    });
  }
  function rankSection(field) {
    return '<section class="ca-panel ca-rank"><h4>🏆 Vitórias da campanha</h4><div class="ca-rank-list">' + rankMarkup(field) + '</div></section>';
  }
  function frame(title, description, body, buttons) {
    return '<div class="ca-game-top"><div><h3>' + title + '</h3><p>' + description + '</p></div>' + (buttons || "") + '</div>' + body;
  }
  function renderCurrent() {
    if (!main || !modal || !modal.classList.contains("is-open")) return;
    nav.querySelectorAll(".ca-tab").forEach(function (button) {
      button.classList.toggle("is-active", button.dataset.game === selectedGame);
    });
    if (selectedGame === "tetris") renderTetris();
    else if (selectedGame === "chess") renderChess();
    else if (selectedGame === "blocks") renderBlocks();
    else renderCalculator();
  }
  function setGame(game) {
    if (game !== "tetris") { clearInterval(tetris.timer); tetris.timer = null; }
    selectedGame = game;
    if (game === "chess") listenGames();
    renderCurrent();
    sound("click");
  }

  function createModal() {
    if (modal) return;
    var style = document.createElement("style");
    style.textContent = STYLE;
    document.head.appendChild(style);
    modal = document.createElement("div");
    modal.id = "call-activities-modal";
    modal.innerHTML =
      '<section class="ca-window" role="dialog" aria-modal="true" aria-label="Atividades da call">' +
        '<header class="ca-head"><div class="ca-title"><div class="ca-kicker">YMMAGINITRIX · ATIVIDADES DA CALL</div><h2>JOGUE COM A CAMPANHA</h2></div>' +
        '<button class="ca-sound" type="button" aria-label="Alternar efeitos sonoros"></button><button class="ca-close" type="button" aria-label="Fechar atividades">✕</button></header>' +
        '<div class="ca-layout"><nav class="ca-nav" aria-label="Atividades">' +
          '<button class="ca-tab" data-game="tetris"><span class="ca-tab-icon">🧱</span>Tetris</button>' +
          '<button class="ca-tab" data-game="chess"><span class="ca-tab-icon">♟</span>Xadrez</button>' +
          '<button class="ca-tab" data-game="blocks"><span class="ca-tab-icon">🟦</span>Block Blast</button>' +
          '<button class="ca-tab" data-game="calc"><span class="ca-tab-icon">🧮</span>Calculadora</button>' +
          '<div class="ca-nav-note">JOGOS INDIVIDUAIS<br>pontuações e vitórias<br>compartilhadas por campanha</div>' +
        '</nav><main class="ca-main"></main></div></section>';
    document.body.appendChild(modal);
    main = modal.querySelector(".ca-main");
    nav = modal.querySelector(".ca-nav");
    nav.addEventListener("click", function (event) {
      var button = event.target.closest(".ca-tab");
      if (button) setGame(button.dataset.game);
    });
    modal.querySelector(".ca-close").addEventListener("click", close);
    modal.addEventListener("click", function (event) { if (event.target === modal) close(); });
    modal.querySelector(".ca-sound").addEventListener("click", function () {
      try { localStorage.setItem("ymm_call_activity_sounds", soundEnabled() ? "false" : "true"); }
      catch (error) { console.warn("[Call activities] Não foi possível salvar a preferência de som:", error); }
      updateSoundButton();
      if (soundEnabled()) sound("click");
    });
    document.addEventListener("keydown", handleKeys);
    updateSoundButton();
  }
  function updateSoundButton() {
    var button = modal && modal.querySelector(".ca-sound");
    if (button) button.textContent = soundEnabled() ? "🔊 Sons" : "🔇 Sons";
  }
  function open() {
    createModal();
    modal.classList.add("is-open");
    document.body.style.overflow = "hidden";
    scores = {};
    listenScores();
    if (selectedGame === "chess") listenGames();
    renderCurrent();
    if (!onlineReady()) toast("Os jogos funcionam; entre na conta para sincronizar placares e partidas.");
  }
  function close() {
    if (!modal) return;
    modal.classList.remove("is-open");
    document.body.style.overflow = "";
    clearInterval(tetris.timer);
    tetris.timer = null;
    if (scoreUnsub) { scoreUnsub(); scoreUnsub = null; }
    if (gamesUnsub) { gamesUnsub(); gamesUnsub = null; }
  }
  function handleKeys(event) {
    if (!modal || !modal.classList.contains("is-open")) return;
    if (event.key === "Escape") { close(); return; }
    if (selectedGame === "calc") {
      var calcKey = event.key, calcHandled = true;
      if (/^\d$/.test(calcKey) || calcKey === ".") calcInput(calcKey);
      else if (calcKey === "Enter" || calcKey === "=") calcInput("=");
      else if (calcKey === "Backspace") calcInput("⌫");
      else if (calcKey.toLowerCase() === "c") calcInput("C");
      else if (calcKey === "+") calcInput("+");
      else if (calcKey === "-") calcInput("−");
      else if (calcKey === "*") calcInput("×");
      else if (calcKey === "/") calcInput("÷");
      else if (calcKey === "%") calcInput("%");
      else calcHandled = false;
      if (calcHandled) event.preventDefault();
      return;
    }
    if (selectedGame !== "tetris" || tetris.ended || tetris.paused) return;
    var handled = true;
    if (event.key === "ArrowLeft") moveTetris(-1, 0);
    else if (event.key === "ArrowRight") moveTetris(1, 0);
    else if (event.key === "ArrowDown") moveTetris(0, 1);
    else if (event.key === "ArrowUp" || event.key.toLowerCase() === "x") rotateTetris();
    else if (event.key === " ") hardDrop();
    else if (event.key.toLowerCase() === "p") togglePause();
    else handled = false;
    if (handled) event.preventDefault();
  }

  var tetrominoes = [
    { color: "#53d6c6", cells: [[0,1],[1,1],[2,1],[3,1]] },
    { color: "#eac45c", cells: [[1,0],[2,0],[1,1],[2,1]] },
    { color: "#a58bff", cells: [[1,0],[0,1],[1,1],[2,1]] },
    { color: "#ff9d59", cells: [[0,0],[0,1],[1,1],[2,1]] },
    { color: "#67aaff", cells: [[2,0],[0,1],[1,1],[2,1]] },
    { color: "#f16b8c", cells: [[1,0],[2,0],[0,1],[1,1]] },
    { color: "#72d26f", cells: [[0,0],[1,0],[1,1],[2,1]] }
  ];
  function randomTetromino() {
    var piece = tetrominoes[Math.floor(Math.random() * tetrominoes.length)];
    return { cells: piece.cells.map(function (cell) { return cell.slice(); }), color: piece.color, x: 3, y: 0 };
  }
  function freshTetris() {
    clearInterval(tetris.timer);
    tetris.board = Array.from({ length: 20 }, function () { return Array(10).fill(null); });
    tetris.piece = randomTetromino(); tetris.next = randomTetromino();
    tetris.score = 0; tetris.lines = 0; tetris.ended = false; tetris.paused = false;
    tetris.timer = setInterval(function () { if (!tetris.paused) stepTetris(); }, 560);
    renderTetris();
  }
  function tetrisFits(piece, dx, dy, cells) {
    return (cells || piece.cells).every(function (cell) {
      var x = piece.x + cell[0] + dx, y = piece.y + cell[1] + dy;
      return x >= 0 && x < 10 && y < 20 && (y < 0 || !tetris.board[y][x]);
    });
  }
  function moveTetris(dx, dy) {
    if (tetris.ended || tetris.paused || !tetrisFits(tetris.piece, dx, dy)) return false;
    tetris.piece.x += dx; tetris.piece.y += dy;
    drawTetris(); return true;
  }
  function rotateTetris() {
    if (tetris.ended || tetris.paused) return;
    var rotated = tetris.piece.cells.map(function (cell) { return [3 - cell[1], cell[0]]; });
    var maxX = Math.max.apply(null, rotated.map(function (cell) { return cell[0]; }));
    rotated = rotated.map(function (cell) { return [cell[0] - Math.max(0, maxX - 3), cell[1]]; });
    if (tetrisFits(tetris.piece, 0, 0, rotated)) {
      tetris.piece.cells = rotated; sound("move"); drawTetris();
    }
  }
  function stepTetris() {
    if (!moveTetris(0, 1)) lockTetris();
  }
  function hardDrop() {
    if (tetris.ended || tetris.paused) return;
    while (tetrisFits(tetris.piece, 0, 1)) tetris.piece.y++;
    lockTetris();
  }
  function lockTetris() {
    tetris.piece.cells.forEach(function (cell) {
      var x = tetris.piece.x + cell[0], y = tetris.piece.y + cell[1];
      if (y >= 0 && y < 20 && x >= 0 && x < 10) tetris.board[y][x] = tetris.piece.color;
    });
    var before = tetris.board.length;
    tetris.board = tetris.board.filter(function (row) { return row.some(function (cell) { return !cell; }); });
    var cleared = before - tetris.board.length;
    if (cleared) {
      for (var i = 0; i < cleared; i++) tetris.board.unshift(Array(10).fill(null));
      tetris.lines += cleared;
      tetris.score += [0, 100, 300, 500, 800][cleared] || cleared * 200;
      sound("clear");
    } else { tetris.score += 10; sound("move"); }
    tetris.piece = tetris.next; tetris.piece.x = 3; tetris.piece.y = 0; tetris.next = randomTetromino();
    if (!tetrisFits(tetris.piece, 0, 0)) endTetris();
    renderTetris();
  }
  function endTetris() {
    tetris.ended = true; clearInterval(tetris.timer); tetris.timer = null;
    recordBest("tetris", tetris.score);
    if (tetris.score >= 1200 || tetris.lines >= 12) recordWin("tetris", Date.now().toString(36), tetris.score);
    else sound("lose");
  }
  function togglePause() {
    tetris.paused = !tetris.paused;
    var status = main.querySelector("#ca-tetris-status");
    if (status) status.textContent = tetris.paused ? "Jogo pausado · pressione P para continuar" : "← → mover · ↑ girar · espaço queda rápida · P pausar";
  }
  function drawTetris() {
    if (!canvas || !ctx) return;
    var width = canvas.width, height = canvas.height, cellW = width / 10, cellH = height / 20;
    ctx.clearRect(0, 0, width, height);
    for (var y = 0; y < 20; y++) for (var x = 0; x < 10; x++) drawCell(ctx, x * cellW, y * cellH, cellW, cellH, tetris.board[y][x]);
    if (tetris.piece) tetris.piece.cells.forEach(function (cell) {
      var x = tetris.piece.x + cell[0], y = tetris.piece.y + cell[1];
      if (y >= 0) drawCell(ctx, x * cellW, y * cellH, cellW, cellH, tetris.piece.color);
    });
    if (tetris.paused) { ctx.fillStyle = "#080a0dbb"; ctx.fillRect(0,0,width,height); ctx.fillStyle="#fff"; ctx.font="bold 22px Rajdhani"; ctx.textAlign="center"; ctx.fillText("PAUSADO",width/2,height/2); }
    if (tetris.ended) { ctx.fillStyle = "#080a0dbb"; ctx.fillRect(0,0,width,height); ctx.fillStyle="#fff"; ctx.font="bold 22px Rajdhani"; ctx.textAlign="center"; ctx.fillText("FIM DE JOGO",width/2,height/2); }
  }
  function drawCell(context, x, y, width, height, color) {
    context.fillStyle = color || "#131722";
    context.fillRect(x + 1, y + 1, width - 2, height - 2);
    if (color) { context.fillStyle = "#ffffff28"; context.fillRect(x + 3, y + 3, width - 6, 3); }
    else { context.strokeStyle = "#ffffff0b"; context.strokeRect(x + .5, y + .5, width - 1, height - 1); }
  }
  function renderTetris() {
    clearInterval(tetris.timer); tetris.timer = null;
    var body = '<div class="ca-columns"><section class="ca-panel ca-board-wrap"><div class="ca-status" id="ca-tetris-status"></div><canvas class="ca-canvas" id="ca-tetris-canvas" width="300" height="600" aria-label="Tabuleiro de Tetris"></canvas>' +
      '<div class="ca-mobile-controls"><button class="ca-secondary" data-tetris="left">←</button><button class="ca-secondary" data-tetris="rotate">↻</button><button class="ca-secondary" data-tetris="right">→</button><button class="ca-secondary" data-tetris="down">↓</button><button class="ca-secondary" data-tetris="drop">⤓</button><button class="ca-secondary" data-tetris="pause">Ⅱ</button></div></section>' +
      '<aside class="ca-side"><section class="ca-panel"><div class="ca-label">Pontuação</div><div class="ca-score" id="ca-tetris-score">0</div><div class="ca-score-lines" id="ca-tetris-lines">Linhas: 0</div><div class="ca-muted" style="margin-top:8px">Meta de vitória: 1.200 pontos ou 12 linhas.</div>' +
      '<button class="ca-primary" id="ca-tetris-start" style="width:100%;margin-top:12px">▶ COMEÇAR / REINICIAR</button></section>' + rankSection("tetrisBest") + '</aside></div>';
    main.innerHTML = frame("🧱 Tetris", "Jogue no teclado ou use os controles na tela. Seu recorde e suas vitórias ficam no placar da campanha.", body);
    canvas = main.querySelector("#ca-tetris-canvas"); ctx = canvas.getContext("2d");
    main.querySelector("#ca-tetris-start").addEventListener("click", function () { sound("click"); freshTetris(); });
    main.querySelectorAll("[data-tetris]").forEach(function (button) {
      button.addEventListener("click", function () {
        var action = button.dataset.tetris;
        if (action === "left") moveTetris(-1,0); else if (action === "right") moveTetris(1,0);
        else if (action === "down") stepTetris(); else if (action === "rotate") rotateTetris();
        else if (action === "drop") hardDrop(); else togglePause();
      });
    });
    if (!tetris.board.length) { tetris.board = Array.from({ length: 20 }, function () { return Array(10).fill(null); }); tetris.ended = true; }
    if (tetris.piece && !tetris.ended) {
      tetris.timer = setInterval(function () { if (!tetris.paused) stepTetris(); }, 560);
    }
    updateTetrisScore(); drawTetris();
  }
  function updateTetrisScore() {
    var score = main && main.querySelector("#ca-tetris-score"), lines = main && main.querySelector("#ca-tetris-lines");
    if (score) score.textContent = tetris.score;
    if (lines) lines.textContent = "Linhas: " + tetris.lines;
    var status = main && main.querySelector("#ca-tetris-status");
    if (status && !tetris.paused) status.textContent = tetris.ended ? "Pronto para jogar" : "← → mover · ↑ girar · espaço queda rápida · P pausar";
  }

  var initialBoard = [
    ["r","n","b","q","k","b","n","r"], ["p","p","p","p","p","p","p","p"],
    [null,null,null,null,null,null,null,null], [null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null], [null,null,null,null,null,null,null,null],
    ["P","P","P","P","P","P","P","P"], ["R","N","B","Q","K","B","N","R"]
  ];
  function newChessState() { return { board: initialBoard.map(function (row) { return row.slice(); }), turn: "w", castling: "KQkq", ep: null, lastMove: null }; }
  function colorOf(piece) { return piece === piece.toUpperCase() ? "w" : "b"; }
  function inBounds(row, col) { return row >= 0 && row < 8 && col >= 0 && col < 8; }
  function cloneState(state) { return { board: state.board.map(function (row) { return row.slice(); }), turn: state.turn, castling: state.castling, ep: state.ep && state.ep.slice(), lastMove: state.lastMove }; }
  function kingSquare(state, color) {
    var target = color === "w" ? "K" : "k";
    for (var r = 0; r < 8; r++) for (var c = 0; c < 8; c++) if (state.board[r][c] === target) return [r,c];
    return null;
  }
  function isAttacked(state, row, col, byColor) {
    var b = state.board, pawnRow = row + (byColor === "w" ? 1 : -1), pawn = byColor === "w" ? "P" : "p";
    for (var dc of [-1,1]) if (inBounds(pawnRow,col+dc) && b[pawnRow][col+dc] === pawn) return true;
    var knight = byColor === "w" ? "N" : "n";
    for (var n of [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]]) {
      var nr=row+n[0], nc=col+n[1]; if (inBounds(nr,nc) && b[nr][nc]===knight) return true;
    }
    var king = byColor === "w" ? "K" : "k";
    for (var dr=-1;dr<=1;dr++) for (var dc2=-1;dc2<=1;dc2++) if (dr||dc2) {
      var kr=row+dr,kc=col+dc2; if (inBounds(kr,kc) && b[kr][kc]===king) return true;
    }
    var rays = [[-1,0],[1,0],[0,-1],[0,1],[-1,-1],[-1,1],[1,-1],[1,1]];
    for (var i=0;i<rays.length;i++) {
      var ray=rays[i], rr=row+ray[0], cc=col+ray[1], distance=1;
      while (inBounds(rr,cc)) {
        var piece=b[rr][cc];
        if (piece) {
          if (colorOf(piece)===byColor) {
            var type=piece.toLowerCase();
            if (type==="q" || type==="r" && i<4 || type==="b" && i>=4 || type==="k" && distance===1) return true;
          }
          break;
        }
        rr+=ray[0]; cc+=ray[1]; distance++;
      }
    }
    return false;
  }
  function applyChessMove(state, move) {
    var next=cloneState(state), b=next.board, piece=b[move.from[0]][move.from[1]], target=b[move.to[0]][move.to[1]];
    if (!piece) return null;
    var type=piece.toLowerCase(), color=colorOf(piece), from=move.from, to=move.to;
    if (type==="k") next.castling=next.castling.replace(color==="w"?/[KQ]/g:/[kq]/g,"");
    if (type==="r") {
      if (from[0]===7&&from[1]===0) next.castling=next.castling.replace("Q","");
      if (from[0]===7&&from[1]===7) next.castling=next.castling.replace("K","");
      if (from[0]===0&&from[1]===0) next.castling=next.castling.replace("q","");
      if (from[0]===0&&from[1]===7) next.castling=next.castling.replace("k","");
    }
    if (target==="R") { if (to[0]===7&&to[1]===0) next.castling=next.castling.replace("Q",""); if (to[0]===7&&to[1]===7) next.castling=next.castling.replace("K",""); }
    if (target==="r") { if (to[0]===0&&to[1]===0) next.castling=next.castling.replace("q",""); if (to[0]===0&&to[1]===7) next.castling=next.castling.replace("k",""); }
    if (type==="p" && next.ep && to[0]===next.ep[0] && to[1]===next.ep[1] && !target) b[from[0]][to[1]]=null;
    b[from[0]][from[1]]=null;
    b[to[0]][to[1]]=move.promotion ? (color==="w"?move.promotion.toUpperCase():move.promotion.toLowerCase()) : piece;
    if (type==="k" && Math.abs(to[1]-from[1])===2) {
      var rookCol=to[1]===6?7:0, rookTo=to[1]===6?5:3;
      b[from[0]][rookTo]=b[from[0]][rookCol]; b[from[0]][rookCol]=null;
    }
    next.ep=type==="p"&&Math.abs(to[0]-from[0])===2?[(from[0]+to[0])/2,from[1]]:null;
    next.turn=color==="w"?"b":"w"; next.lastMove={from:from.slice(),to:to.slice()};
    return next;
  }
  function pseudoMoves(state, row, col) {
    var board=state.board,piece=board[row][col]; if(!piece) return [];
    var color=colorOf(piece), type=piece.toLowerCase(), moves=[];
    function add(r,c,extra) {
      if(!inBounds(r,c)) return false;
      var occupant=board[r][c];
      if(occupant&&colorOf(occupant)===color) return false;
      moves.push(Object.assign({from:[row,col],to:[r,c]},extra||{}));
      return !occupant;
    }
    if(type==="p") {
      var dir=color==="w"?-1:1, start=color==="w"?6:1, end=color==="w"?0:7, nr=row+dir;
      if(inBounds(nr,col)&&!board[nr][col]) {
        moves.push({from:[row,col],to:[nr,col],promotion:nr===end?"q":null});
        if(row===start&&!board[nr+dir][col]) moves.push({from:[row,col],to:[nr+dir,col]});
      }
      for(var dc of [-1,1]) {
        var nc=col+dc;
        if(inBounds(nr,nc)&&board[nr][nc]&&colorOf(board[nr][nc])!==color) moves.push({from:[row,col],to:[nr,nc],promotion:nr===end?"q":null});
        else if(state.ep&&state.ep[0]===nr&&state.ep[1]===nc) moves.push({from:[row,col],to:[nr,nc],enPassant:true});
      }
    } else if(type==="n") {
      [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]].forEach(function(v){add(row+v[0],col+v[1]);});
    } else if(type==="k") {
      for(var dr=-1;dr<=1;dr++) for(var dc2=-1;dc2<=1;dc2++) if(dr||dc2) add(row+dr,col+dc2);
      var home=color==="w"?7:0, enemy=color==="w"?"b":"w";
      if(row===home&&!isAttacked(state,row,col,enemy)) {
        var kingSide=color==="w"?"K":"k", queenSide=color==="w"?"Q":"q";
        if(state.castling.indexOf(kingSide)>=0&&!board[home][5]&&!board[home][6]&&board[home][7]===(color==="w"?"R":"r")&&!isAttacked(state,home,5,enemy)&&!isAttacked(state,home,6,enemy)) moves.push({from:[row,col],to:[home,6]});
        if(state.castling.indexOf(queenSide)>=0&&!board[home][1]&&!board[home][2]&&!board[home][3]&&board[home][0]===(color==="w"?"R":"r")&&!isAttacked(state,home,3,enemy)&&!isAttacked(state,home,2,enemy)) moves.push({from:[row,col],to:[home,2]});
      }
    } else {
      var dirs=type==="r"?[[-1,0],[1,0],[0,-1],[0,1]]:type==="b"?[[-1,-1],[-1,1],[1,-1],[1,1]]:[[-1,0],[1,0],[0,-1],[0,1],[-1,-1],[-1,1],[1,-1],[1,1]];
      dirs.forEach(function(v){var r=row+v[0],c=col+v[1];while(inBounds(r,c)){var canContinue=add(r,c);if(!canContinue)break;r+=v[0];c+=v[1];}});
    }
    return moves;
  }
  function legalMoves(state,row,col) {
    var piece=state.board[row][col]; if(!piece||colorOf(piece)!==state.turn) return [];
    var enemy=state.turn==="w"?"b":"w";
    return pseudoMoves(state,row,col).filter(function(move){
      var next=applyChessMove(state,move),king=kingSquare(next,state.turn);
      return !!king&&!isAttacked(next,king[0],king[1],enemy);
    });
  }
  function allLegalMoves(state,color) {
    var copy=cloneState(state); copy.turn=color; var list=[];
    for(var r=0;r<8;r++)for(var c=0;c<8;c++)if(copy.board[r][c]&&colorOf(copy.board[r][c])===color) list=list.concat(legalMoves(copy,r,c));
    return list;
  }
  function replayMoves(game) {
    var state=newChessState(), entries=game&&game.moves||{};
    var keys=Object.keys(entries).sort();
    chessMoves=[];
    keys.forEach(function(key){
      var move=entries[key], from=move&&move.from, to=move&&move.to;
      if(!from||!to||!inBounds(from[0],from[1])||!inBounds(to[0],to[1])) return;
      var valid=legalMoves(state,from[0],from[1]).find(function(item){return item.to[0]===to[0]&&item.to[1]===to[1];});
      if(!valid) return;
      valid.promotion=move.promotion||valid.promotion;
      state=applyChessMove(state,valid);
      chessMoves.push(move);
    });
    return state;
  }
  function newGameId() { return Date.now().toString(36) + "_" + Math.random().toString(36).slice(2,9); }
  function writeAt(path, value) {
    if (!onlineReady()) { toast("Entre na conta para jogar xadrez em tempo real."); return Promise.resolve(false); }
    return window._set(window._ref(window.db,path),value).then(function(){return true;}).catch(function(error){
      console.error("[Call activities] Falha ao sincronizar a partida:",error);
      toast("Não foi possível sincronizar. Verifique as permissões do Firebase.");
      return false;
    });
  }
  function createChessGame() {
    if(!onlineReady()) return toast("Entre na conta para criar uma partida multiplayer.");
    var me=identity(), id=newGameId(), data={id:id,campaign:campaignKey(),room:roomKey(),whiteId:me.id,whiteName:me.name,blackId:"",blackName:"",createdAt:Date.now(),moves:{}};
    writeAt(gamesPath()+"/"+id,data).then(function(ok){if(ok){activeGameId=id;selectedSquare=null;chessMoves=[];renderCurrent();toast("Partida criada. Compartilhe a call para o adversário entrar.");}});
  }
  function joinChessGame(id) {
    var game=games[id],me=identity();
    if(!game||game.whiteId===me.id||game.blackId&&game.blackId!==me.id) return;
    if(game.blackId) return toast("Esta partida já tem dois jogadores.");
    writeAt(gamesPath()+"/"+id+"/blackId",me.id).then(function(ok){
      if(ok) writeAt(gamesPath()+"/"+id+"/blackName",me.name).then(function(){activeGameId=id;selectedSquare=null;renderCurrent();sound("move");});
    });
  }
  function activeChessGame() { return activeGameId&&games[activeGameId]||null; }
  function submitChessMove(move) {
    var game=activeChessGame(), me=identity();
    if(!game||!onlineReady()) return;
    var state=replayMoves(game), side=me.id===game.whiteId?"w":me.id===game.blackId?"b":null;
    if(!side||side!==state.turn) return toast("Aguarde a vez do seu lado.");
    var legal=legalMoves(state,move.from[0],move.from[1]).find(function(item){return item.to[0]===move.to[0]&&item.to[1]===move.to[1];});
    if(!legal) return toast("Esse movimento não é permitido.");
    var key=newGameId(), entry={from:move.from,to:move.to,promotion:move.promotion||legal.promotion||"q",uid:me.id,name:me.name,at:Date.now()};
    writeAt(gamesPath()+"/"+game.id+"/moves/"+key,entry).then(function(ok){if(ok)sound("move");});
    selectedSquare=null;
  }
  function finishChessIfNeeded(game,state) {
    if(!game) return "Crie uma partida ou entre em uma aberta.";
    if(!game.blackId) return "Aguardando alguém entrar · " + (game.whiteName||"Brancas") + " joga de brancas.";
    var legal=allLegalMoves(state,state.turn), king=kingSquare(state,state.turn);
    var check=king&&isAttacked(state,king[0],king[1],state.turn==="w"?"b":"w");
    if(legal.length===0) {
      if(check) {
        var winner=state.turn==="w"?game.blackId:game.whiteId;
        if(identity().id===winner) recordWin("chess",game.id,0);
        return "Xeque-mate · vitória de " + (state.turn==="w"?game.blackName:game.whiteName) + "!";
      }
      return "Empate por afogamento.";
    }
    var mySide=identity().id===game.whiteId?"w":identity().id===game.blackId?"b":null;
    return (check?"XEQUE · ":"") + (state.turn==="w"?"Vez das brancas":"Vez das pretas") +
      (mySide===state.turn?" · sua vez":"") + (mySide?"":" · você está assistindo") +
      " · " + (game.whiteName||"Brancas") + " × " + (game.blackName||"aguardando jogador");
  }
  function renderChess() {
    var game=activeChessGame(), state=game?replayMoves(game):newChessState();
    chessState=state;
    var turn=finishChessIfNeeded(game,state);
    var role=game&&identity().id===game.whiteId?"Brancas":game&&identity().id===game.blackId?"Pretas":game?"Espectador":"—";
    var body='<div class="ca-columns"><section class="ca-panel ca-board-wrap"><div class="ca-status" id="ca-chess-status">'+escapeHtml(turn)+'</div><div class="ca-chess-board" id="ca-chess-board" role="grid" aria-label="Tabuleiro de xadrez"></div>' +
      '<div class="ca-muted">Seu lado: '+escapeHtml(role)+' · As jogadas aparecem para todos na call.</div></section><aside class="ca-side"><section class="ca-panel"><div class="ca-label">Partida da campanha</div><div class="ca-muted" style="margin:5px 0 12px">Crie uma sala ou entre em uma partida aguardando adversário.</div>' +
      '<button class="ca-primary" id="ca-chess-create" style="width:100%">＋ NOVA PARTIDA</button><div class="ca-game-list" id="ca-chess-list"></div></section>' + rankSection("chessWins") + '</aside></div>';
    main.innerHTML=frame("♟ Xadrez multiplayer","Partidas em tempo real com movimentos legais, roque, captura en passant e promoção.",body);
    var board=main.querySelector("#ca-chess-board"), selected=selectedSquare, legal=selected?legalMoves(state,selected[0],selected[1]):[];
    var targetSquares=legal.map(function(move){return move.to[0]+","+move.to[1];});
    var symbols={K:"♔",Q:"♕",R:"♖",B:"♗",N:"♘",P:"♙",k:"♚",q:"♛",r:"♜",b:"♝",n:"♞",p:"♟"};
    for(var r=0;r<8;r++) for(var c=0;c<8;c++){
      var square=document.createElement("button"),piece=state.board[r][c],key=r+","+c;
      square.type="button";square.className="ca-square "+((r+c)%2?"dark":"light");
      if(selected&&selected[0]===r&&selected[1]===c)square.classList.add("is-selected");
      if(targetSquares.indexOf(key)>=0)square.classList.add(piece?"is-capture":"is-target");
      square.setAttribute("aria-label",String.fromCharCode(97+c)+(8-r)+(piece?" "+piece:""));
      if(piece){var span=document.createElement("span");span.className="ca-piece";span.textContent=symbols[piece];square.appendChild(span);}
      square.dataset.row=r;square.dataset.col=c;
      square.addEventListener("click",onChessSquare);
      board.appendChild(square);
    }
    main.querySelector("#ca-chess-create").addEventListener("click",createChessGame);
    var list=main.querySelector("#ca-chess-list");
    var openGames=Object.keys(games||{}).map(function(id){return games[id];}).filter(function(item){return item&&item.id&&item.id!==activeGameId&&(!item.blackId||item.blackId===identity().id);}).sort(function(a,b){return (b.createdAt||0)-(a.createdAt||0);}).slice(0,5);
    if(!openGames.length)list.innerHTML='<div class="ca-muted" style="margin-top:10px">Nenhuma partida aberta nesta call.</div>';
    else openGames.forEach(function(item){
      var row=document.createElement("div");row.className="ca-game-item";
      var text=document.createElement("span");text.textContent=(item.whiteName||"Jogador")+" · "+(item.blackId?(item.blackName||"Adversário"):"aguardando adversário");
      var button=document.createElement("button");button.className="ca-secondary";button.type="button";
      button.textContent=item.blackId?"Assistir":"Entrar";button.addEventListener("click",function(){
        if(item.blackId){activeGameId=item.id;selectedSquare=null;renderCurrent();}
        else joinChessGame(item.id);
      });
      row.appendChild(text);row.appendChild(button);list.appendChild(row);
    });
  }
  function onChessSquare(event) {
    var row=Number(event.currentTarget.dataset.row),col=Number(event.currentTarget.dataset.col),game=activeChessGame();
    if(!game||!game.blackId) return;
    var mySide=identity().id===game.whiteId?"w":identity().id===game.blackId?"b":null;
    if(!mySide) return;
    var state=replayMoves(game);
    if(mySide!==state.turn) return toast("Ainda não é a sua vez.");
    var piece=state.board[row][col];
    if(selectedSquare) {
      var move=legalMoves(state,selectedSquare[0],selectedSquare[1]).find(function(item){return item.to[0]===row&&item.to[1]===col;});
      if(move) { var captured=!!piece||!!move.enPassant; submitChessMove(move); if(captured)sound("capture"); renderCurrent(); return; }
    }
    if(piece&&colorOf(piece)===mySide) selectedSquare=[row,col]; else selectedSquare=null;
    renderCurrent();
  }

  function freshBlocks() {
    blocks.board=Array.from({length:8},function(){return Array(8).fill(false);});
    blocks.pieces=[0,1,2].map(function(){return randomShape();});
    blocks.score=0;blocks.ended=false;blocks.selected=-1;renderBlocks();
  }
  function randomShape() { return shapes[Math.floor(Math.random()*shapes.length)].map(function(cell){return cell.slice();}); }
  function canPlace(shape,row,col) {
    return shape.every(function(cell){var r=row+cell[1],c=col+cell[0];return r>=0&&r<8&&c>=0&&c<8&&!blocks.board[r][c];});
  }
  function hasPlacement() {
    return blocks.pieces.some(function(shape){return shape&&blocks.board.some(function(row,r){return row.some(function(_,c){return canPlace(shape,r,c);});});});
  }
  function placeBlocks(row,col) {
    var shape=blocks.pieces[blocks.selected];
    if(!shape||!canPlace(shape,row,col)) return;
    shape.forEach(function(cell){blocks.board[row+cell[1]][col+cell[0]]=true;});
    blocks.score+=shape.length*10;blocks.pieces[blocks.selected]=null;blocks.selected=-1;
    var fullRows=[],fullCols=[];
    for(var i=0;i<8;i++){
      if(blocks.board[i].every(Boolean))fullRows.push(i);
      if(blocks.board.every(function(line){return line[i];}))fullCols.push(i);
    }
    if(fullRows.length||fullCols.length){
      fullRows.forEach(function(r){blocks.board[r]=Array(8).fill(false);});
      fullCols.forEach(function(c){for(var r=0;r<8;r++)blocks.board[r][c]=false;});
      blocks.score+=(fullRows.length+fullCols.length)*100;
      sound("clear");
    } else sound("move");
    if(blocks.pieces.every(function(piece){return !piece;})) blocks.pieces=[0,1,2].map(function(){return randomShape();});
    if(!hasPlacement()) endBlocks();
    renderBlocks();
  }
  function endBlocks() {
    blocks.ended=true;recordBest("blocks",blocks.score);
    if(blocks.score>=500)recordWin("blocks",Date.now().toString(36),blocks.score);
    else sound("lose");
  }
  function blockPreview(shape,row,col) {
    if(blocks.selected<0||!shape||!shape.length)return "";
    var cells=shape.map(function(cell){return (row+cell[1])+","+(col+cell[0]);});
    if(!cells.every(function(key){var p=key.split(","),r=Number(p[0]),c=Number(p[1]);return r>=0&&r<8&&c>=0&&c<8&&blocks.board[r]&&!blocks.board[r][c];}))return "";
    return cells;
  }
  function renderBlocks() {
    var my= getMyScore();
    var body='<div class="ca-columns"><section class="ca-panel ca-board-wrap"><div class="ca-status" id="ca-block-status"></div><div class="ca-block-board" id="ca-block-board" aria-label="Tabuleiro de Block Blast"></div><div class="ca-trays" id="ca-block-tray"></div></section>' +
      '<aside class="ca-side"><section class="ca-panel"><div class="ca-label">Pontuação da rodada</div><div class="ca-score" id="ca-block-score">'+blocks.score+'</div><div class="ca-muted">Seu recorde: '+(Number(my.blocksBest)||0)+' · vitória a partir de 500 pontos.</div><button class="ca-primary" id="ca-block-start" style="width:100%;margin-top:12px">▶ NOVA RODADA</button></section>' +
      rankSection("blocksBest")+'</aside></div>';
    main.innerHTML=frame("🟦 Block Blast","Escolha uma peça e coloque-a no tabuleiro. Complete linhas ou colunas para abrir espaço.",body);
    var board=main.querySelector("#ca-block-board"),tray=main.querySelector("#ca-block-tray");
    if(!blocks.board.length){blocks.board=Array.from({length:8},function(){return Array(8).fill(false);});blocks.pieces=[0,1,2].map(function(){return randomShape();});blocks.ended=true;}
    for(var r=0;r<8;r++)for(var c=0;c<8;c++){
      var cell=document.createElement("button");cell.type="button";cell.className="ca-block-cell"+(blocks.board[r][c]?" filled":"");
      if(!blocks.ended&&blocks.selected>=0&&lastClickCell){var preview=blockPreview(blocks.pieces[blocks.selected],lastClickCell[0],lastClickCell[1]);if(preview&&preview.indexOf(r+","+c)>=0)cell.classList.add("preview");}
      cell.dataset.row=r;cell.dataset.col=c;
      cell.addEventListener("mouseenter",function(e){lastClickCell=[Number(e.currentTarget.dataset.row),Number(e.currentTarget.dataset.col)];updateBlockPreview();});
      cell.addEventListener("mouseleave",function(){lastClickCell=null;updateBlockPreview();});
      cell.addEventListener("click",function(e){
        if(blocks.ended||blocks.selected<0)return toast("Escolha uma peça antes de jogar.");
        placeBlocks(Number(e.currentTarget.dataset.row),Number(e.currentTarget.dataset.col));
      });
      board.appendChild(cell);
    }
    blocks.pieces.forEach(function(shape,index){
      var option=document.createElement("button");option.type="button";option.className="ca-piece-option"+(blocks.selected===index?" is-selected":"");
      if(!shape){option.style.visibility="hidden";tray.appendChild(option);return;}
      for(var i=0;i<16;i++){var dot=document.createElement("span"),x=i%4,y=Math.floor(i/4);dot.className="ca-piece-dot"+(shape.some(function(cell){return cell[0]===x&&cell[1]===y;})?"":" empty");option.appendChild(dot);}
      option.setAttribute("aria-label","Selecionar peça "+(index+1));
      option.addEventListener("click",function(){if(blocks.ended)return;blocks.selected=index;renderBlocks();sound("click");});
      tray.appendChild(option);
    });
    var status=main.querySelector("#ca-block-status");
    status.textContent=blocks.ended?"Selecione NOVA RODADA para começar.":blocks.selected<0?"Escolha uma das peças abaixo.":"Clique em uma posição livre para colocar a peça.";
    main.querySelector("#ca-block-start").addEventListener("click",function(){sound("click");freshBlocks();});
  }
  function updateBlockPreview() {
    if(!main||!main.querySelector("#ca-block-board"))return;
    main.querySelectorAll(".ca-block-cell").forEach(function(cell){cell.classList.remove("preview");});
    if(blocks.selected<0||!lastClickCell)return;
    var cells=blockPreview(blocks.pieces[blocks.selected],lastClickCell[0],lastClickCell[1]);
    if(cells) cells.forEach(function(key){var parts=key.split(","),cell=main.querySelector('.ca-block-cell[data-row="'+parts[0]+'"][data-col="'+parts[1]+'"]');if(cell&&!cell.classList.contains("filled"))cell.classList.add("preview");});
  }

  function renderCalculator() {
    var keys=["C","±","%","÷","7","8","9","×","4","5","6","−","1","2","3","+","⌫","0",".","="];
    var buttons=keys.map(function(key){
      var cls=["÷","×","−","+","="].indexOf(key)>=0?" operator":"";
      if(key==="=")cls+=" equal";
      return '<button type="button" class="ca-calc-key'+cls+'" data-key="'+key+'">'+key+'</button>';
    }).join("");
    var body='<section class="ca-panel ca-calc"><div class="ca-label" style="margin-bottom:7px">Cálculo rápido durante a sessão</div><input id="ca-calc-display" class="ca-calc-display" value="'+escapeHtml(calcDisplay)+'" aria-label="Visor da calculadora" readonly><div class="ca-calc-grid">'+buttons+'</div></section>';
    main.innerHTML=frame("🧮 Calculadora","Operações básicas, porcentagem e suporte ao teclado.",body);
    main.querySelectorAll(".ca-calc-key").forEach(function(button){button.addEventListener("click",function(){calcInput(button.dataset.key);});});
  }
  function calcInput(key) {
    sound("click");
    if(key==="C"){calcDisplay="0";calcStored=null;calcOperator=null;calcFresh=false;}
    else if(key==="⌫"){calcDisplay=calcDisplay.length>1?calcDisplay.slice(0,-1):"0";}
    else if(key==="±"){calcDisplay=String(-(Number(calcDisplay)||0));}
    else if(key==="%"){calcDisplay=String((Number(calcDisplay)||0)/100);}
    else if(["÷","×","−","+"].indexOf(key)>=0){calcStored=Number(calcDisplay)||0;calcOperator=key;calcFresh=true;}
    else if(key==="="&&calcOperator){
      var current=Number(calcDisplay)||0,result=current;
      if(calcOperator==="+")result=calcStored+current;
      if(calcOperator==="−")result=calcStored-current;
      if(calcOperator==="×")result=calcStored*current;
      if(calcOperator==="÷")result=current===0?NaN:calcStored/current;
      calcDisplay=Number.isFinite(result)?String(Number(result.toPrecision(10))):"Erro";
      calcOperator=null;calcStored=null;calcFresh=true;
    } else if(key==="."){if(calcFresh){calcDisplay="0.";calcFresh=false;}else if(calcDisplay.indexOf(".")<0)calcDisplay+=".";}
    else if(/^\d$/.test(key)){if(calcFresh||calcDisplay==="0"||calcDisplay==="Erro"){calcDisplay=key;calcFresh=false;}else if(calcDisplay.length<16)calcDisplay+=key;}
    var display=main&&main.querySelector("#ca-calc-display");if(display)display.value=calcDisplay;
  }

  function addStatusVisibility() {
    var anchor=document.getElementById("call-char-nome-inp");
    if(!anchor||document.getElementById("call-char-public-status"))return;
    var parent=anchor.closest(".call-setting-row")||anchor.parentElement;
    if(!parent||!parent.parentNode)return;
    var row=document.createElement("div");
    row.className="call-setting-row";row.id="call-char-public-status";
    row.style.cssText="align-items:center;margin-top:8px;padding:10px 12px;border:1px solid rgba(255,255,255,.08);border-radius:8px;background:rgba(255,255,255,.025)";
    row.innerHTML='<div style="flex:1"><div class="call-setting-lbl">Compartilhar status do personagem</div><div class="call-setting-sub">Todos na campanha e na call veem vida, sanidade e esforço do personagem selecionado.</div></div><label style="display:flex;align-items:center;gap:6px;color:rgba(220,225,238,.8);font-size:.68rem;white-space:nowrap"><input id="call-char-share-status" type="checkbox" checked> visível para todos</label>';
    parent.parentNode.insertBefore(row,parent.nextSibling);
    var checkbox=row.querySelector("#call-char-share-status");
    checkbox.checked=readStatusVisibility();
    checkbox.addEventListener("change",function(){
      writeStatusVisibility(checkbox.checked);
      lastStatusVisible=checkbox.checked;
      if(typeof window.callSaveCustomChar==="function")window.callSaveCustomChar(true);
      else if(typeof window._callSyncCustomCharToRoom==="function")window._callSyncCustomCharToRoom(window.callGetCustomChar?window.callGetCustomChar():null);
      if(checkbox.checked)publishCampaignStatus();else removePublishedStatuses();
      if(typeof window.renderCallParticipants==="function")window.renderCallParticipants();
      if(typeof window._refreshLocalCallCardIdentity==="function")window._refreshLocalCallCardIdentity();
      toast(checkbox.checked?"Status do personagem visível para a call.":"Status do personagem oculto para a call.");
    });
  }
  function statusPreferenceKey() {
    var user=window.currentUser||{};
    return "ymm_call_status_visibility_"+safeKey(window._myCallId||user.id||user.username||"anon");
  }
  function readStatusVisibility() {
    try { return localStorage.getItem(statusPreferenceKey())!=="false"; }
    catch(error) { console.warn("[Call activities] Não foi possível ler a visibilidade do personagem:",error); return true; }
  }
  function writeStatusVisibility(value) {
    try { localStorage.setItem(statusPreferenceKey(),value?"true":"false"); }
    catch(error) { console.warn("[Call activities] Não foi possível salvar a visibilidade do personagem:",error); }
  }
  function statusRoot(campaign) { return "sharedData/callActivities/v1/" + safeKey(campaign) + "/publicStatuses"; }
  function currentCharacterStatus() {
    var user=window.currentUser||{}, source=typeof window.callGetCustomChar==="function"&&window.callGetCustomChar()||{};
    var character=String(source.nome||"").trim();
    if(!character)return null;
    return {
      username:String(user.username||user.nome||"Jogador").slice(0,40),
      character:character.slice(0,40),
      vida:Number(source.vida)||0,vidaMax:Number(source.vidaMax)||0,
      sanidade:Number(source.sanidade)||0,sanidadeMax:Number(source.sanidadeMax)||0,
      estamina:Number(source.estamina)||0,estaminaMax:Number(source.estaminaMax)||0,
      updatedAt:Date.now()
    };
  }
  function hasVisibleStats(item) {
    return !!item && !!String(item.character||item.nome||"").trim() &&
      ["vidaMax","sanidadeMax","estaminaMax"].some(function(key){return Number(item[key])>0;});
  }
  function renderPublicStatuses(items) {
    var anchor=document.getElementById("live-players-status");
    if(!anchor)return;
    var section=document.getElementById("ca-campaign-public-statuses");
    if(!section) {
      section=document.createElement("section");section.className="ca-public-status";section.id="ca-campaign-public-statuses";
      section.innerHTML='<div class="ca-public-status-title">✦ Personagens compartilhados</div><div class="ca-public-status-list"></div>';
      anchor.insertAdjacentElement("afterend",section);
    }
    var list=section.querySelector(".ca-public-status-list");
    var visibleItems=items&&Object.keys(items).filter(function(id){return hasVisibleStats(items[id]);});
    if(items===null||items===undefined||!visibleItems.length) {
      list.textContent=!statusCampaign?"Selecione uma campanha para ver os status públicos.":!onlineReady()?"Entre na conta para ver os status públicos desta campanha.":items==null?"Não foi possível carregar os status desta campanha.":"Ninguém está compartilhando status nesta campanha.";
      list.className="ca-public-status-list ca-muted";
      return;
    }
    list.className="ca-public-status-list";list.textContent="";
    visibleItems.sort(function(a,b){return String(items[a].username||"").localeCompare(String(items[b].username||""));}).forEach(function(id){
      var item=items[id]||{},card=document.createElement("div"),head=document.createElement("div"),avatar=document.createElement("span"),name=document.createElement("span"),owner=document.createElement("span");
      card.className="ca-public-person";head.className="ca-public-person-head";avatar.className="ca-public-avatar";name.className="ca-public-name";owner.className="ca-public-owner";
      avatar.textContent=String(item.character||"?").trim().charAt(0).toUpperCase()||"?";
      name.textContent=String(item.character||"Personagem");owner.textContent="@" + String(item.username||"jogador");
      head.appendChild(avatar);head.appendChild(name);head.appendChild(owner);card.appendChild(head);
      [{key:"vida",label:"❤",color:"linear-gradient(90deg,#c83232,#ff7474)"},{key:"sanidade",label:"🧠",color:"linear-gradient(90deg,#435fc4,#7a9cff)"},{key:"estamina",label:"⚡",color:"linear-gradient(90deg,#20834b,#5dd990)"}].forEach(function(stat){
        var max=Number(item[stat.key+"Max"])||0,current=Math.max(0,Number(item[stat.key])||0);
        if(!max)return;
        var row=document.createElement("div"),icon=document.createElement("span"),track=document.createElement("div"),fill=document.createElement("div"),value=document.createElement("span");
        row.className="ca-public-stat";icon.textContent=stat.label;track.className="ca-public-track";fill.className="ca-public-fill";fill.style.width=Math.max(0,Math.min(100,current/max*100))+"%";fill.style.background=stat.color;value.textContent=Math.min(current,max)+"/"+max;
        track.appendChild(fill);row.appendChild(icon);row.appendChild(track);row.appendChild(value);card.appendChild(row);
      });
      list.appendChild(card);
    });
  }
  function removePublishedStatuses() {
    if(!onlineReady()||typeof window._remove!=="function"){statusRemovalPending=true;return;}
    statusRemovalPending=false;
    var key="ymm_call_status_campaigns_"+identity().id,campaigns=[];
    try{campaigns=JSON.parse(localStorage.getItem(key)||"[]");}catch(error){console.warn("[Call activities] Não foi possível ler campanhas compartilhadas:",error);}
    if(window._activeCampanhaId){var current=safeKey(window._activeCampanhaId);if(campaigns.indexOf(current)<0)campaigns.push(current);}
    campaigns.forEach(function(campaign){
      window._remove(window._ref(window.db,statusRoot(campaign)+"/"+identity().id)).catch(function(error){
        console.error("[Call activities] Falha ao remover status público:",error);
        if(!statusErrorShown){statusErrorShown=true;toast("Não foi possível ocultar o status em todas as campanhas.");}
      });
    });
    try{localStorage.removeItem(key);}catch(error){console.warn("[Call activities] Não foi possível limpar as campanhas compartilhadas:",error);}
    lastStatusSignature="";
  }
  function publishCampaignStatus() {
    var me=identity();
    if(!readStatusVisibility()){removePublishedStatuses();return;}
    var record=currentCharacterStatus();
    if(!hasVisibleStats(record)){removePublishedStatuses();return;}
    if(!onlineReady()||!window._activeCampanhaId)return;
    var path=statusRoot(window._activeCampanhaId)+"/"+me.id;
    var signature=JSON.stringify({username:record.username,character:record.character,vida:record.vida,vidaMax:record.vidaMax,sanidade:record.sanidade,sanidadeMax:record.sanidadeMax,estamina:record.estamina,estaminaMax:record.estaminaMax});
    if(signature===lastStatusSignature)return;
    lastStatusSignature=signature;
    record.updatedAt=Date.now();
    window._set(window._ref(window.db,path),record).then(function(){
      var key="ymm_call_status_campaigns_"+me.id,campaigns=[];
      try{campaigns=JSON.parse(localStorage.getItem(key)||"[]");}catch(error){campaigns=[];}
      var campaign=safeKey(window._activeCampanhaId);
      if(campaigns.indexOf(campaign)<0){campaigns.push(campaign);try{localStorage.setItem(key,JSON.stringify(campaigns));}catch(error){console.warn("[Call activities] Não foi possível registrar a campanha compartilhada:",error);}}
      statusErrorShown=false;
    }).catch(function(error){
      console.error("[Call activities] Falha ao publicar status para a campanha:",error);
      if(!statusErrorShown){statusErrorShown=true;toast("Status não sincronizado; verifique a conexão e as permissões do Firebase.");}
    });
  }
  function watchCampaignStatuses() {
    var campaign=window._activeCampanhaId||null;
    var connected=onlineReady();
    if(campaign===statusCampaign&&connected===statusWasOnline)return;
    if(statusUnsub){statusUnsub();statusUnsub=null;}
    statusCampaign=campaign;statusWasOnline=connected;lastStatusSignature="";
    if(!campaign){renderPublicStatuses(null);return;}
    if(!connected){renderPublicStatuses(null);return;}
    statusUnsub=window._onValue(window._ref(window.db,statusRoot(campaign)),function(snapshot){
      renderPublicStatuses(snapshot&&snapshot.val()||{});
    },function(error){
      console.error("[Call activities] Falha ao receber status da campanha:",error);
      renderPublicStatuses(null);
    });
    publishCampaignStatus();
  }
  function wrapCallStatusSharing() {
    if(typeof window._callSyncCustomCharToRoom==="function"&&!window._ymmStatusSyncWrapped) {
      var oldSync=window._callSyncCustomCharToRoom;
      window._callSyncCustomCharToRoom=function(value) {
        var payload=Object.assign({},value||{},{showStatus:readStatusVisibility()});
        return oldSync(payload);
      };
      window._ymmStatusSyncWrapped=true;
    }
    if(typeof window.callSaveCustomChar==="function"&&!window._ymmStatusSaveWrapped) {
      var oldSave=window.callSaveCustomChar;
      window.callSaveCustomChar=function() {
        var result=oldSave.apply(this,arguments);
        publishCampaignStatus();
        return result;
      };
      window._ymmStatusSaveWrapped=true;
    }
    if(typeof window.buildParticipantCard==="function"&&!window._ymmStatusCardWrapped) {
      var oldBuild=window.buildParticipantCard;
      window.buildParticipantCard=function(member,isLocal) {
        var html=oldBuild.apply(this,arguments);
        var custom=member&&member.customChar;
        var visible=isLocal?hasVisibleStats(currentCharacterStatus())&&readStatusVisibility():hasVisibleStats({character:custom&&custom.nome,vidaMax:custom&&custom.vidaMax,sanidadeMax:custom&&custom.sanidadeMax,estaminaMax:custom&&custom.estaminaMax})&&custom.showStatus!==false;
        return html.replace('<div class="call-participant" ','<div class="call-participant" data-status-visible="'+(visible?"true":"false")+'" ');
      };
      window._ymmStatusCardWrapped=true;
      var css=document.createElement("style");
      css.textContent='#call-participants-area .call-part-stats{display:none!important}';
      document.head.appendChild(css);
    }
  }
  function statusHudKey(){return "ymm_call_status_hud_"+identity().id;}
  function readStatusHudPrefs(){
    var defaults={enabled:true,color:"#7ee0d1",style:"glass",font:"Rajdhani",position:"bottom-left"};
    try{return Object.assign(defaults,JSON.parse(localStorage.getItem(statusHudKey())||"{}"));}
    catch(error){console.warn("[Call activities] Não foi possível ler a personalização do painel:",error);return defaults;}
  }
  function writeStatusHudPrefs(prefs){
    try{localStorage.setItem(statusHudKey(),JSON.stringify(prefs));}
    catch(error){console.warn("[Call activities] Não foi possível salvar a personalização do painel:",error);}
  }
  function addStatusHudOptions(){
    var options=document.getElementById("call-character-options");
    if(!options||document.getElementById("cph-options"))return;
    var prefs=readStatusHudPrefs(),row=document.createElement("div");
    row.className="cph-options";row.id="cph-options";
    row.innerHTML='<label class="cph-option">Painel dos status<select id="cph-enabled"><option value="true">Mostrar na call</option><option value="false">Ocultar na call</option></select></label><label class="cph-option">Fonte<select id="cph-font"><option value="Rajdhani">Rajdhani</option><option value="Share Tech Mono">Share Tech Mono</option><option value="Cinzel">Cinzel</option><option value="system-ui">Padrão</option></select></label><label class="cph-option">Visual<select id="cph-style"><option value="glass">Vidro</option><option value="minimal">Minimalista</option><option value="arcade">Arcade</option></select></label><label class="cph-option">Posição<select id="cph-position"><option value="bottom-left">Inferior esquerdo</option><option value="bottom-right">Inferior direito</option><option value="top-left">Superior esquerdo</option><option value="top-right">Superior direito</option></select></label><label class="cph-option">Cor de destaque<input id="cph-color" type="color" aria-label="Cor de destaque dos status"></label>';
    options.appendChild(row);
    ["enabled","font","style","position","color"].forEach(function(key){
      var input=row.querySelector("#cph-"+key);
      if(!input)return;
      input.value=key==="enabled"?String(prefs.enabled):prefs[key];
      input.addEventListener(key==="color"?"input":"change",function(){
        var next=readStatusHudPrefs();next[key]=key==="enabled"?input.value==="true":input.value;
        writeStatusHudPrefs(next);renderCallStatusHud();
      });
    });
  }
  function ensureStatusHud(){
    var root=document.getElementById("call-party-status-hud");
    if(root)return root;
    root=document.createElement("aside");root.id="call-party-status-hud";
    root.setAttribute("aria-label","Status dos personagens escolhidos na call");
    root.innerHTML='<div class="cph-title">Status dos personagens</div><div class="cph-list"></div>';
    (document.getElementById("call-overlay")||document.body).appendChild(root);
    return root;
  }
  function renderCallStatusHud(){
    var root=ensureStatusHud(),prefs=readStatusHudPrefs(),active=!!(window.callState&&window.callState.active);
    root.dataset.style=["glass","minimal","arcade"].indexOf(prefs.style)>=0?prefs.style:"glass";
    root.dataset.position=["bottom-left","bottom-right","top-left","top-right"].indexOf(prefs.position)>=0?prefs.position:"bottom-left";
    root.style.setProperty("--cph-accent",/^#[0-9a-f]{6}$/i.test(prefs.color||"")?prefs.color:"#7ee0d1");
    var fonts={"Rajdhani":"Rajdhani,system-ui,sans-serif","Share Tech Mono":'"Share Tech Mono",monospace',"Cinzel":"Cinzel,serif","system-ui":"system-ui,sans-serif"};
    root.style.fontFamily=fonts[prefs.font]||fonts.Rajdhani;
    var members=window._callMembersCache||{},entries=[],localId=String(window._myCallId||"");
    Object.keys(members).forEach(function(id){
      if(id===localId)return;
      var member=members[id]||{},custom=member.customChar||{};
      if(member.customChar&&custom.showStatus!==false&&hasVisibleStats({character:custom.nome,vidaMax:custom.vidaMax,sanidadeMax:custom.sanidadeMax,estaminaMax:custom.estaminaMax}))entries.push({id:id,owner:member.username||"jogador",character:custom});
    });
    var local=typeof window.callGetCustomChar==="function"&&window.callGetCustomChar()||{};
    if(localId&&readStatusVisibility()&&hasVisibleStats({character:local.nome,vidaMax:local.vidaMax,sanidadeMax:local.sanidadeMax,estaminaMax:local.estaminaMax}))
      entries.push({id:localId,owner:(window.currentUser||{}).username||"Você",character:local});
    var signature=JSON.stringify({active:active,enabled:prefs.enabled,entries:entries,prefs:prefs});
    root.hidden=!active||!prefs.enabled||!entries.length;
    if(signature===statusHudSignature)return;
    statusHudSignature=signature;
    var list=root.querySelector(".cph-list");list.textContent="";
    entries.forEach(function(entry){
      var card=document.createElement("article"),head=document.createElement("div"),avatar=document.createElement("span"),name=document.createElement("span"),owner=document.createElement("span");
      card.className="cph-person";head.className="cph-person-head";avatar.className="cph-avatar";name.className="cph-name";owner.className="cph-owner";
      avatar.textContent=String(entry.character.nome||"?").trim().charAt(0).toUpperCase()||"?";
      name.textContent=String(entry.character.nome||"Personagem").trim();owner.textContent="@"+entry.owner;
      head.appendChild(avatar);head.appendChild(name);head.appendChild(owner);card.appendChild(head);
      [{key:"vida",label:"❤",color:"#ff687d"},{key:"sanidade",label:"🧠",color:"#a78bfa"},{key:"estamina",label:"⚡",color:"#f5c451"}].forEach(function(stat){
        var max=Number(entry.character[stat.key+"Max"])||0;if(max<=0)return;
        var current=Math.max(0,Number(entry.character[stat.key])||0),row=document.createElement("div"),icon=document.createElement("span"),track=document.createElement("div"),fill=document.createElement("div"),value=document.createElement("span");
        row.className="cph-stat";icon.textContent=stat.label;track.className="cph-track";fill.className="cph-fill";fill.style.width=Math.max(0,Math.min(100,current/max*100))+"%";fill.style.background=stat.color;value.textContent=Math.min(current,max)+"/"+max;
        track.appendChild(fill);row.appendChild(icon);row.appendChild(track);row.appendChild(value);card.appendChild(row);
      });
      list.appendChild(card);
    });
  }
  function addCallButton() {
    var controls=document.getElementById("call-controls");
    if(!controls||controls.querySelector(".call-activity-open"))return;
    var button=document.createElement("button");
    button.type="button";button.className="call-ctrl-btn call-activity-open";button.title="Abrir atividades e jogos da campanha";
    button.setAttribute("aria-label","Abrir atividades");button.textContent="🎮";
    button.addEventListener("click",open);
    var more=controls.querySelector(".call-more-wrap");
    controls.insertBefore(button,more||controls.querySelector(".call-end-btn"));
  }
  function updateUI() {
    addCallButton();addStatusVisibility();wrapCallStatusSharing();addStatusHudOptions();renderCallStatusHud();
    var visible=readStatusVisibility();
    if(lastStatusVisible===null){if(!visible)removePublishedStatuses();}
    else if(lastStatusVisible!==visible){if(visible)publishCampaignStatus();else removePublishedStatuses();}
    lastStatusVisible=visible;
    if(statusRemovalPending&&onlineReady())removePublishedStatuses();
    watchCampaignStatuses();publishCampaignStatus();
    var checkbox=document.getElementById("call-char-share-status");
    if(checkbox)checkbox.checked=readStatusVisibility();
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",updateUI);
  else updateUI();
  setInterval(updateUI,1400);
  window.addEventListener("beforeunload",function(){clearInterval(tetris.timer);});
})();
